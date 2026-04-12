// ═══════════════════════════════════════════════════════════════
// CalcQuest RPG — Módulo Multiplayer Co-op v1.0
// ═══════════════════════════════════════════════════════════════
// Modo: Co-op assíncrono em tempo real via Firebase RTDB
// Dois jogadores compartilham o HP do mesmo monstro.
// Cada cliente calcula o próprio dano localmente e publica
// o resultado — o Firebase sincroniza o HP entre ambos.
// ═══════════════════════════════════════════════════════════════
//
// SETUP (fazer uma vez):
//  1. Criar projeto em https://firebase.google.com (free tier basta)
//  2. Ativar "Realtime Database" no modo teste
//  3. Copiar as credenciais do projeto e colar em MP_CONFIG abaixo
//  4. Adicionar no index.html (ANTES de multiplayer.js):
//       <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
//       <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js"></script>
//       <script src="modules/multiplayer.js"></script>
//
// ═══════════════════════════════════════════════════════════════


// Credenciais Firebase — SDK compat (firebase.initializeApp)
var MP_CONFIG = {
  apiKey: "AIzaSyBlOGbNsXnvA9zzEy07zCN_SqneV8tX0WU",
  authDomain: "calcquest-coop-7bb68.firebaseapp.com",
  databaseURL: "https://calcquest-coop-7bb68-default-rtdb.firebaseio.com",
  projectId: "calcquest-coop-7bb68",
  storageBucket: "calcquest-coop-7bb68.firebasestorage.app",
  messagingSenderId: "573611104396",
  appId: "1:573611104396:web:1b0ddc3cb312bec5a383a9"
};
// Nota: NÃO chamar initializeApp aqui — o SDK compat é inicializado
// dentro de initFirebase() via firebase.initializeApp(MP_CONFIG)

(function() {
  const MP = {
    enabled:    false,      // true quando numa sala ativa
    roomCode:   null,       // código de 6 letras da sala
    playerId:   null,       // "p1" ou "p2"
    db:         null,       // referência Firebase Database
    roomRef:    null,       // referência da sala no RTDB
    listener:   null,       // unsubscribe do listener principal
    partnerName: "...",     // nome do parceiro
    partnerHp:  null,       // HP do parceiro (para mostrar na HUD)
    partnerMaxHp: null,
    _killLock:  false,      // evita duplo processamento de kill
    _lastSeenHp: null,      // último HP que enviamos ao Firebase
  };

  // ── 3. Inicializar Firebase (só uma vez) ──
  function initFirebase() {
    if (MP.db) return true;
    try {
      if (!firebase || !firebase.apps) { console.warn("[MP] Firebase SDK não carregado."); return false; }
      const app = firebase.apps.length
        ? firebase.app()
        : firebase.initializeApp(MP_CONFIG);
      MP.db = firebase.database(app);
      return true;
    } catch (e) {
      console.error("[MP] Erro ao inicializar Firebase:", e);
      return false;
    }
  }

  // ── 4. Gerar código de sala aleatório ──
  function genCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  // ── 5. Criar sala ──
  function createRoom() {
    // Mostrar estado de loading no modal
    var modalBody = document.getElementById('mp-modal-body');
    function setStatus(html) { if (modalBody) modalBody.innerHTML = html; }

    setStatus('<div style="text-align:center;padding:20px 0;"><div style="font-size:28px;margin-bottom:12px;">⏳</div><div style="color:#a78bfa;font-family:Orbitron,monospace;font-size:11px;font-weight:700;letter-spacing:.1em;">A CONECTAR AO FIREBASE...</div></div>');

    // 1. Verificar Firebase
    if (!initFirebase()) {
      setStatus('<div style="padding:12px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:10px;color:#f87171;font-size:11px;text-align:center;">❌ Firebase SDK não carregou.<br>Verifica a ligação à internet e recarrega a página.</div>');
      return;
    }

    // 2. Aviso se não estiver em combate (mas não bloqueia — P2 pode entrar sem combate)
    var monster = (rpg.inCombat && rpg.monster) ? rpg.monster : null;

    setStatus('<div style="text-align:center;padding:20px 0;"><div style="font-size:28px;margin-bottom:12px;">🔥</div><div style="color:#a78bfa;font-family:Orbitron,monospace;font-size:11px;font-weight:700;letter-spacing:.1em;">A CRIAR SALA...</div><div style="color:#52525b;font-size:9px;margin-top:6px;">A escrever no Firebase...</div></div>');

    var code = genCode();
    var heroName = rpg.heroName || 'Herói';
    var roomRef = MP.db.ref('rooms/' + code);

    var payload = {
      monster: {
        id:    monster ? String(monster.id    || 'unknown') : 'waiting',
        name:  monster ? String(monster.name  || 'Monstro') : 'Aguardando combate...',
        icon:  monster ? String(monster.icon  || 'sword')   : 'sword',
        color: monster ? String(monster.color || 'text-violet-400') : 'text-violet-400',
        hp:    monster ? Number(monster.hp    || 100) : 0,
        maxHp: monster ? Number(monster.maxHp || 100) : 0,
        dmg:   monster ? Number(monster.dmg   || 10)  : 0,
        spd:   monster ? Number(monster.spd   || 1)   : 1,
        weak:  monster ? String(monster.weak  || 'none') : 'none',
        res:   monster ? String(monster.res   || 'none') : 'none',
        dodge: monster ? Number(monster.dodge || 0) : 0,
        block: monster ? Number(monster.block || 0) : 0,
        lvl:   monster ? Number(monster.lvl   || 1)   : 1,
      },
      isBoss:    rpg.isBossFight ? true : false,
      killed:    false,
      p1:        { name: heroName, dmg: 0, hp: Number(rpg.heroHp || 100), maxHp: Number(rpg.getMaxHp ? rpg.getMaxHp() : 100), online: true },
      p2:        false,
      createdAt: Date.now(),
    };

    // Timeout de 10s manual
    var timedOut = false;
    var timer = setTimeout(function() {
      timedOut = true;
      setStatus('<div style="padding:12px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:10px;color:#f87171;font-size:10px;text-align:center;">⏱️ <b>Timeout!</b> O Firebase não respondeu em 10s.<br><br>Verifica em <b>console.firebase.google.com</b>:<br>Realtime Database → Regras → confirma que<br><code style="color:#a78bfa">.read: true, .write: true</code> está publicado.<br><br><button onclick="window.mpOpen()" style="margin-top:8px;padding:6px 16px;background:#7c3aed;border:none;border-radius:8px;color:white;font-size:10px;cursor:pointer;font-weight:700;">← Tentar novamente</button></div>');
    }, 10000);

    roomRef.set(payload).then(function() {
      clearTimeout(timer);
      if (timedOut) return;

      MP.roomCode  = code;
      MP.playerId  = 'p1';
      MP.roomRef   = roomRef;
      MP._killLock = false;
      MP.enabled   = true;

      setTimeout(function() { if (MP.roomRef) MP.roomRef.remove(); }, 7200000);

      attachListener();
      renderHudPartner();

      // Mostrar código no modal
      setStatus(
        '<div style="text-align:center;padding:8px 0;">' +
        '<div style="font-size:11px;color:#52525b;font-family:Fira Code,monospace;margin-bottom:6px;letter-spacing:.1em;">SALA CRIADA ✅</div>' +
        '<div style="font-size:36px;font-weight:900;color:#a78bfa;font-family:Orbitron,monospace;letter-spacing:.25em;padding:12px;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.3);border-radius:12px;margin-bottom:10px;">' + code + '</div>' +
        '<div style="font-size:10px;color:#71717a;margin-bottom:12px;">Partilha este código com o teu parceiro</div>' +
        '<button onclick="navigator.clipboard.writeText(\'' + code + '\').then(()=>showToast(\'📋 Código copiado!\'))" style="padding:8px 20px;background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.4);border-radius:8px;color:#a78bfa;font-size:10px;cursor:pointer;font-weight:700;font-family:Orbitron,monospace;">📋 COPIAR CÓDIGO</button>' +
        '<br><br><button onclick="window.mpLeave()" style="padding:6px 16px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);border-radius:8px;color:#f87171;font-size:9px;cursor:pointer;">Sair da Sala</button>' +
        '</div>'
      );
      showToast('🎮 Sala criada! Código: ' + code, 6000);

    }).catch(function(err) {
      clearTimeout(timer);
      if (timedOut) return;
      var msg = err && err.message ? err.message : String(err);
      console.error('[MP] Firebase set() erro:', err);
      setStatus('<div style="padding:12px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:10px;color:#f87171;font-size:10px;text-align:center;">❌ Erro Firebase:<br><code style="color:#fca5a5;font-size:9px;">' + msg.substring(0,200) + '</code><br><br><button onclick="window.mpOpen()" style="margin-top:8px;padding:6px 16px;background:#7c3aed;border:none;border-radius:8px;color:white;font-size:10px;cursor:pointer;font-weight:700;">← Tentar novamente</button></div>');
    });
  }

  // ── 6. Entrar em sala ──
  async function joinRoom(code) {
    code = code.toUpperCase().trim();
    if (!code || code.length !== 6) { showToast("❌ Código inválido."); return; }
    if (!initFirebase()) { showToast("❌ Firebase não configurado!"); return; }

    const ref = MP.db.ref("rooms/" + code);
    const snap = await ref.get();
    if (!snap.exists()) { showToast("❌ Sala não encontrada."); return; }

    const data = snap.val();
    if (data.p2) { showToast("❌ Sala cheia."); return; }

    const heroName = document.getElementById("profile-hero-name")?.value || rpg.heroName || "Herói 2";

    MP.roomCode  = code;
    MP.playerId  = "p2";
    MP.roomRef   = ref;
    MP._killLock = false;

    // Sincronizar monstro local com o da sala
    rpg.monster = Object.assign({}, data.monster);
    rpg.isBossFight = data.isBoss || false;

    // Registrar P2 na sala
    await ref.child("p2").set({
      name: heroName,
      dmg:  0,
      hp:   rpg.heroHp,
      maxHp: rpg.getMaxHp(),
      online: true,
    });

    MP.enabled = true;
    attachListener();
    renderHudPartner();

    // Atualizar UI de combate com o monstro da sala
    if (rpg.inCombat) {
      rpg.updateHpBars();
      const nameEl = document.getElementById("monster-name");
      if (nameEl) nameEl.innerText = rpg.monster.name;
    }

    showToast("🎮 Conectado à sala " + code + "!", 4000);
    closeModal("mp-modal");
  }

  // ── 7. Listener principal — ouve mudanças na sala ──
  function attachListener() {
    if (!MP.roomRef) return;
    if (MP.listener) { MP.roomRef.off("value", MP.listener); }

    MP.listener = MP.roomRef.on("value", snap => {
      if (!snap.exists() || !MP.enabled) return;
      const data = snap.val();

      // Sincronizar HP do monstro (se foi o parceiro que atacou)
      if (data.monster && rpg.monster && data.monster.hp !== rpg.monster.hp) {
        const incoming = data.monster.hp;
        // Só aceitar se for menor (dano) ou se a diferença for maior que nosso último envio
        if (incoming < rpg.monster.hp || incoming !== MP._lastSeenHp) {
          rpg.monster.hp = Math.max(0, incoming);
          rpg.updateHpBars();
        }
      }

      // Monstro morto pelo parceiro
      if (data.killed && !MP._killLock && rpg.monster && rpg.monster.hp > 0) {
        MP._killLock = true;
        rpg.monster.hp = 0;
        rpg.updateHpBars();
        showToast("💀 Monstro derrotado pelo parceiro!", 3000);
        // Dar recompensa parcial (50%)
        const goldGain = Math.floor(data.monster.maxHp * 0.35 * 0.5);
        const xpGain   = Math.floor(data.monster.maxHp * 0.40 * 0.5);
        rpg.gold += goldGain;
        rpg.xp   += xpGain;
        rpg.kills++;
        showToast(`+${formatNumber(goldGain)}g +${formatNumber(xpGain)}xp (co-op)`, 3000);
        rpg.save();
        rpg.updateUI();
        // Spawn próximo monstro após delay
        setTimeout(() => {
          MP._killLock = false;
          MP.roomRef.child("killed").set(false);
          if (rpg.inCombat && !rpg.isBossFight) rpg.spawnMonster();
        }, 1200);
      }

      // Atualizar info do parceiro na HUD
      const partnerKey = MP.playerId === "p1" ? "p2" : "p1";
      const partner = data[partnerKey];
      if (partner) {
        MP.partnerName   = partner.name || "Parceiro";
        MP.partnerHp     = partner.hp   || 0;
        MP.partnerMaxHp  = partner.maxHp || 1;
        updatePartnerHud();
      }

      // Atualizar log
      if (data.log) updateMpLog(data.log);
    });
  }

  // ── 8. Publicar dano causado no Firebase ──
  function publishDamage(dmg) {
    if (!MP.enabled || !MP.roomRef || !rpg.monster) return;

    const newHp = Math.max(0, rpg.monster.hp);
    MP._lastSeenHp = newHp;

    const heroName = document.getElementById("profile-hero-name")?.value || "Herói";
    const timestamp = Date.now();

    const updates = {
      [`monster/hp`]: newHp,
      [`${MP.playerId}/dmg`]: dmg,
      [`${MP.playerId}/hp`]: rpg.heroHp,
    };

    // Adicionar ao log (máx 8 entradas)
    MP.roomRef.child("log").get().then(snap => {
      let log = snap.val() ? Object.values(snap.val()) : [];
      log.push({ who: heroName, dmg: dmg, t: timestamp });
      if (log.length > 8) log = log.slice(-8);
      const logObj = {};
      log.forEach((entry, i) => { logObj[i] = entry; });
      updates["log"] = logObj;
      MP.roomRef.update(updates);
    });

    // Se monstro morreu, sinalizar
    if (newHp <= 0 && !MP._killLock) {
      MP._killLock = true;
      MP.roomRef.child("killed").set(true);
    }
  }

  // ── 9. Publicar HP do herói periodicamente ──
  function publishHeroHp() {
    if (!MP.enabled || !MP.roomRef) return;
    MP.roomRef.child(MP.playerId + "/hp").set(rpg.heroHp);
  }

  // ── 10. HUD do parceiro ──
  function renderHudPartner() {
    const combat = document.getElementById("view-combat");
    if (!combat) return;

    let hud = document.getElementById("mp-partner-hud");
    if (!hud) {
      hud = document.createElement("div");
      hud.id = "mp-partner-hud";
      hud.style.cssText = `
        position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.75); border: 1px solid rgba(139,92,246,0.5);
        border-radius: 10px; padding: 5px 12px; min-width: 180px;
        display: flex; flex-direction: column; gap: 3px; z-index: 50;
        backdrop-filter: blur(4px);
      `;
      combat.style.position = "relative";
      combat.appendChild(hud);
    }

    hud.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:11px;color:#a78bfa;font-weight:700;">🤝 CO-OP</span>
        <span style="font-size:10px;color:#71717a;">Sala: <b style="color:#e4e4e7;">${MP.roomCode}</b></span>
        <button onclick="window.mpCopyCode()" style="font-size:9px;color:#a78bfa;background:none;border:none;cursor:pointer;">📋</button>
      </div>
      <div id="mp-partner-row" style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:10px;color:#a1a1aa;" id="mp-partner-name">${MP.partnerName}</span>
        <div style="flex:1;height:4px;background:#27272a;border-radius:2px;">
          <div id="mp-partner-bar" style="height:100%;background:#7c3aed;border-radius:2px;width:100%;transition:width 0.3s;"></div>
        </div>
        <span style="font-size:9px;color:#71717a;" id="mp-partner-hp-text">...</span>
      </div>
      <div id="mp-log" style="font-size:9px;color:#52525b;max-height:32px;overflow:hidden;"></div>
    `;
  }

  function updatePartnerHud() {
    const nameEl = document.getElementById("mp-partner-name");
    const barEl  = document.getElementById("mp-partner-bar");
    const hpEl   = document.getElementById("mp-partner-hp-text");
    if (!nameEl) return;

    const pct = MP.partnerMaxHp > 0 ? Math.max(0, Math.min(100, (MP.partnerHp / MP.partnerMaxHp) * 100)) : 0;
    nameEl.textContent = MP.partnerName;
    if (barEl) {
      barEl.style.width = pct + "%";
      barEl.style.background = pct > 50 ? "#059669" : pct > 25 ? "#b45309" : "#991b1b";
    }
    if (hpEl) hpEl.textContent = formatNumber(Math.ceil(MP.partnerHp || 0));
  }

  function updateMpLog(logObj) {
    const el = document.getElementById("mp-log");
    if (!el || !logObj) return;
    const entries = Object.values(logObj).slice(-3);
    el.innerHTML = entries.map(e =>
      `<span style="color:#6d28d9;">${e.who}</span> <span style="color:#52525b;">-${formatNumber(e.dmg)}</span>`
    ).join(" · ");
  }

  function updateCodeDisplay(code) {
    const el = document.getElementById("mp-room-code-display");
    if (el) el.textContent = code;
  }

  // ── 11. Sair da sala ──
  function leaveRoom() {
    if (MP.roomRef && MP.listener) {
      MP.roomRef.off("value", MP.listener);
      MP.roomRef.child(MP.playerId + "/online").set(false);
    }
    MP.enabled   = false;
    MP.roomCode  = null;
    MP.playerId  = null;
    MP.roomRef   = null;
    MP.listener  = null;
    MP._killLock = false;

    const hud = document.getElementById("mp-partner-hud");
    if (hud) hud.remove();

    showToast("👋 Saíste da sala co-op.", 2500);
  }

  // ── 12. Modal principal ──
  function openMpModal() {
    let modal = document.getElementById("mp-modal");
    if (modal) {
      modal.remove();
    }
    modal = document.createElement("div");
    modal.id = "mp-modal";
    modal.className = "modal-overlay fixed inset-0 flex items-center justify-center";
    modal.style.zIndex = "9999";
    modal.onclick = function(e) { if (e.target === modal) closeMpModal(); };
    modal.innerHTML = `
        <div class="bg-zinc-900 border border-violet-800/50 rounded-2xl p-5 w-[320px] max-w-[95vw] shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-black text-violet-300 uppercase tracking-widest flex items-center gap-2">
              🤝 Co-op Multiplayer
            </h2>
            <button onclick="window.mpClose()" class="p-1.5 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white">✕</button>
          </div>
          <div id="mp-modal-body">
          ${MP.enabled ? `
            <div class="bg-violet-950/40 border border-violet-700/40 rounded-xl p-3 mb-4 text-center">
              <p class="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Sala ativa</p>
              <p class="text-2xl font-black text-violet-300 tracking-widest" id="mp-room-code-display">${MP.roomCode}</p>
              <p class="text-[10px] text-zinc-500 mt-1">Jogador: <span class="text-violet-400 font-bold">${MP.playerId?.toUpperCase()}</span></p>
            </div>
            <button onclick="window.mpLeave()" class="w-full py-2.5 bg-red-900/40 border border-red-700/50 text-red-400 rounded-xl text-sm font-bold hover:bg-red-900/60 transition">
              Sair da Sala
            </button>
          ` : `
            <p class="text-xs text-zinc-400 mb-4">Lute junto com um amigo no mesmo monstro em tempo real. Cada um ataca à sua vez e o HP é compartilhado.</p>

            <div class="mb-4">
              <p class="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Criar nova sala</p>
              <p class="text-[10px] text-zinc-600 mb-2">Entre em combate primeiro, depois crie a sala.</p>
              <button onclick="window.mpCreate()" class="w-full py-2.5 bg-violet-700 hover:bg-violet-600 text-white rounded-xl text-sm font-bold transition shadow">
                ⚔️ Criar Sala
              </button>
            </div>

            <div class="border-t border-zinc-800 pt-4">
              <p class="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Entrar em sala existente</p>
              <div class="flex gap-2">
                <input id="mp-join-code" type="text" maxlength="6" placeholder="CÓDIGO" class="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm font-bold text-white uppercase tracking-widest text-center" />
                <button onclick="window.mpJoin()" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition shadow">
                  Entrar
                </button>
              </div>
            </div>

            <div class="mt-4 bg-zinc-950/60 border border-zinc-800 rounded-xl p-3">
              <p class="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">🔥 Firebase configurado</p>
              <p class="text-[10px] text-zinc-600 leading-relaxed">Projeto: <code class="text-violet-400">calcquest-coop-7bb68</code></p>
            </div>
          `}
          </div>
        </div>
      `;
    document.body.appendChild(modal);
    // Usar classe .active para respeitar o CSS do modal-overlay
    requestAnimationFrame(() => modal.classList.add("active"));
  }

  function closeMpModal() {
    const modal = document.getElementById("mp-modal");
    if (!modal) return;
    modal.classList.remove("active");
    setTimeout(() => { if (modal.parentNode) modal.remove(); }, 300);
  }

  // ── 13. Hooks no combate (instalados dentro do init para evitar crash) ──
  function installCombatHooks() {
    try {
      if (typeof rpg === 'undefined') return;

      if (typeof rpg.dealDamageToMonster === 'function' && !rpg.dealDamageToMonster._mpPatched) {
        const _origDeal = rpg.dealDamageToMonster.bind(rpg);
        rpg.dealDamageToMonster = function (baseDmg, atkType, isUltimate) {
          const hpBefore = this.monster ? this.monster.hp : 0;
          _origDeal(baseDmg, atkType, isUltimate);
          if (MP.enabled && this.monster) {
            const actualDmg = hpBefore - this.monster.hp;
            if (actualDmg > 0) publishDamage(actualDmg);
          }
        };
        rpg.dealDamageToMonster._mpPatched = true;
      }

      if (typeof rpg.executeMonsterAttack === 'function' && !rpg.executeMonsterAttack._mpPatched) {
        const _origExecMonster = rpg.executeMonsterAttack.bind(rpg);
        rpg.executeMonsterAttack = function () {
          _origExecMonster();
          if (MP.enabled) publishHeroHp();
        };
        rpg.executeMonsterAttack._mpPatched = true;
      }

      // Hook startCombat: sincroniza monstro com sala se P1 criou sala antes de entrar em combate
      if (typeof rpg.startCombat === 'function' && !rpg.startCombat._mpPatched) {
        const _origStart = rpg.startCombat.bind(rpg);
        rpg.startCombat = function () {
          _origStart.apply(this, arguments);
          if (MP.enabled && this.monster && MP.playerId === 'p1' && MP.roomRef) {
            MP._killLock = false;
            MP.roomRef.update({
              monster: {
                id:    String(this.monster.id    || 'unknown'),
                name:  String(this.monster.name  || 'Monstro'),
                icon:  String(this.monster.icon  || 'sword'),
                color: String(this.monster.color || 'text-violet-400'),
                hp:    Number(this.monster.hp    || 100),
                maxHp: Number(this.monster.maxHp || 100),
                dmg:   Number(this.monster.dmg   || 10),
                spd:   Number(this.monster.spd   || 1),
                weak:  String(this.monster.weak  || 'none'),
                res:   String(this.monster.res   || 'none'),
                dodge: Number(this.monster.dodge || 0),
                block: Number(this.monster.block || 0),
                lvl:   Number(this.monster.lvl   || 1),
              },
              isBoss: this.isBossFight ? true : false,
              killed: false,
            });
            showToast('🔄 Monstro sincronizado com a sala co-op!', 2500);
          }
        };
        rpg.startCombat._mpPatched = true;
      }

      if (typeof rpg.spawnMonster === 'function' && !rpg.spawnMonster._mpPatched) {
        const _origSpawn = rpg.spawnMonster.bind(rpg);
        rpg.spawnMonster = function () {
          _origSpawn();
          if (MP.enabled && this.monster && MP.playerId === "p1") {
            MP._killLock = false;
            MP.roomRef && MP.roomRef.update({
              monster: {
                id:    this.monster.id,
                name:  this.monster.name,
                icon:  this.monster.icon,
                color: this.monster.color,
                hp:    this.monster.hp,
                maxHp: this.monster.maxHp,
                dmg:   this.monster.dmg,
                spd:   this.monster.spd,
                weak:  this.monster.weak,
                res:   this.monster.res,
                dodge: this.monster.dodge,
                block: this.monster.block,
                lvl:   this.monster.lvl,
              },
              killed: false,
            });
          }
        };
        rpg.spawnMonster._mpPatched = true;
      }
    } catch(e) {
      console.warn("[CalcQuest MP] Aviso ao instalar hooks de combate:", e);
    }
  }

  // ── 14. Botão no menu (já incluído no HTML — só atualiza se não existir) ──
  function injectMenuButton() {
    // Botão já está no index.html — só garante que o id não conflita
    const existing = document.getElementById('mp-menu-btn');
    if (existing) {
      existing.onclick = () => openMpModal();
      return;
    }
    // Fallback: injetar se por algum motivo não existir no DOM
    const accMapa = document.getElementById('acc-mapa');
    if (!accMapa) return;
    const btn = document.createElement('button');
    btn.id = 'mp-menu-btn';
    btn.className = 'sub-pill';
    btn.style.cssText = 'border-color:rgba(124,58,237,0.5);color:#a78bfa;';
    btn.innerHTML = `<i data-lucide="users" class="w-3 h-3"></i><span>Co-op</span>`;
    btn.onclick = () => openMpModal();
    accMapa.appendChild(btn);
    try { lucide.createIcons({ nodes: [btn] }); } catch (e) {}
  }

  // ── 15. Funções globais (acessíveis pelo HTML inline) ──
  window.mpCreate    = () => createRoom();
  window.mpJoin      = () => joinRoom(document.getElementById("mp-join-code")?.value || "");
  window.mpLeave     = () => { leaveRoom(); closeMpModal(); };
  window.mpOpen      = () => openMpModal();
  window.mpClose     = () => closeMpModal();
  window.mpCopyCode  = () => {
    if (!MP.roomCode) return;
    navigator.clipboard.writeText(MP.roomCode).then(() => showToast("📋 Código copiado: " + MP.roomCode));
  };

  // ── 16. Init ──
  function init() {
    installCombatHooks();
    injectMenuButton();
    console.log("[CalcQuest MP] Módulo co-op carregado. Abra o menu → Co-op para começar.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 800); // aguardar outros módulos
  }

})();
