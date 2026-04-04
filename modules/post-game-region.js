/**
 * post-game-region.js — CalcQuest: Lendas de Algoritma
 * ──────────────────────────────────────────────────────
 * Região Pós-Jogo: O Vazio — Novo mundo desbloqueado
 * após completar o primeiro ciclo de NG+.
 * Integra com MAP_REGIONS e o sistema de portais.
 */
;(function () {
  'use strict';

  // ── DEFINIÇÃO DA REGIÃO ────────────────────────────────────────────────────
  const VOID_REGION = {
    id: 'post_void',
    name: 'O Vazio',
    icon: '🌑',
    color: '#e879f9',
    border: 'rgba(232,121,249,0.4)',
    bg: 'radial-gradient(circle at center, #1a0030 0%, #000000 100%)',
    unlockCondition: (rpg) => (rpg.ngLevel || rpg.prestigeLevel || 0) >= 1,
    unlockHint: 'Complete o primeiro ciclo de NG+ para desbloquear.',
    description: 'Um plano além do código. Aqui, a realidade é apenas uma sugestão.',
    loreFragments: [
      '"Antes do primeiro código, havia o Vazio. Não trevas — ausência." — Fragmento I',
      '"Os servidores antigos ainda sussurram aqui. Ouvem-se os primeiros erros de compilação." — Fragmento II',
      '"Quem entra no Vazio pela primeira vez vê a sua própria morte." — Fragmento III',
      '"Os monstros aqui não foram criados. Foram descartados." — Fragmento IV',
      '"O Vazio tem memória. Lembra-se de cada herói que passou. Nenhum saiu igual." — Fragmento V',
      '"No início do tempo, um programador escreveu: void main(). E o universo nasceu." — Fragmento VI',
      '"A corrupção aqui não é um bug — é a língua nativa." — Fragmento VII',
      '"Diz-se que o Protocolo Primordial veio daqui. Não foi banido — voltou para casa." — Fragmento VIII',
      '"Os drops daqui não existem noutro plano. Materializam-se ao sair do Vazio." — Fragmento IX',
      '"Há uma última câmara. Ninguém que entrou conseguiu descrever o que lá está." — Fragmento X',
    ],
  };

  // ── MONSTROS DO VAZIO ──────────────────────────────────────────────────────
  const VOID_MONSTERS = [
    {
      id: 'void_shade',
      name: 'Sombra do Vazio',
      icon: '👁️',
      statMultiplier: 3.0,
      description: 'Um eco de herói que falhou. Usa os teus próprios padrões de luta.',
      special: 'Copia a última skill que usaste',
      drop: 'Fragmento de Ego',
      dropChance: 0.25,
    },
    {
      id: 'void_construct',
      name: 'Constructo Corrompido',
      icon: '⬛',
      statMultiplier: 3.5,
      description: 'Um golem de dados corrompidos. Cada golpe remove um bit da tua memória.',
      special: '-5% stats por round (máx 3 stacks)',
      drop: 'Bloco de Dados Puros',
      dropChance: 0.20,
    },
    {
      id: 'void_paradox',
      name: 'O Paradoxo',
      icon: '🔄',
      statMultiplier: 4.0,
      description: 'Existe e não existe. Os teus ataques têm 30% de chance de se voltarem contra ti.',
      special: '30% reflecte dano',
      drop: 'Núcleo do Paradoxo',
      dropChance: 0,
      isBoss: true,
      bossHint: 'Boss do Vazio — Requer estratégia pura',
    },
  ];

  // ── ARMAS EXCLUSIVAS ───────────────────────────────────────────────────────
  const VOID_WEAPONS = [
    { name: 'Lâmina do Vazio',    icon: '🗡️', stat: 'atk', mult: 4.5, desc: '+350% ATK · Golpes têm 10% de drain de HP do inimigo' },
    { name: 'Cetro da Ausência',  icon: '🪄', stat: 'mag', mult: 4.5, desc: '+400% MAG · Magia ignora DEF' },
    { name: 'Arco Paradoxal',     icon: '🏹', stat: 'atk', mult: 4.0, desc: '+300% ATK · 20% duplo ataque automático' },
    { name: 'Garra do Vazio',     icon: '🌑', stat: 'atk', mult: 5.0, desc: '+500% ATK · Activa ao 3º hit consecutivo' },
    { name: 'Tomo da Corrupção',  icon: '📕', stat: 'mag', mult: 5.5, desc: '+600% MAG · Chance de silenciar inimigo' },
  ];

  // ── RELÍQUIAS LENDÁRIAS ────────────────────────────────────────────────────
  const VOID_RELICS = [
    { name: 'Coração do Vazio',   icon: '💜', desc: '+800% todos os stats · Ressuscita uma vez com 50% HP' },
    { name: 'Olho do Paradoxo',   icon: '👁️', desc: '+500% Crit · 40% esquiva · Vê a próxima acção do inimigo' },
  ];

  // ── VERIFICAÇÃO DE DESBLOQUEIO ─────────────────────────────────────────────
  function isUnlocked() {
    try {
      return VOID_REGION.unlockCondition(window.rpg || {});
    } catch(e) { return false; }
  }

  // ── RENDER DO MODAL DO VAZIO ───────────────────────────────────────────────
  function renderVoidModal() {
    const body = document.getElementById('void-region-body');
    if (!body) return;
    const unlocked = isUnlocked();

    if (!unlocked) {
      body.innerHTML = `
        <div style="text-align:center;padding:30px 20px;">
          <div style="font-size:48px;margin-bottom:12px;filter:grayscale(1);opacity:0.4;">🌑</div>
          <div style="font-family:'Orbitron',monospace;font-size:10px;font-weight:900;color:#52525b;letter-spacing:0.1em;margin-bottom:8px;">REGIÃO BLOQUEADA</div>
          <div style="font-family:'Fira Code',monospace;font-size:10px;color:#52525b;line-height:1.6;">${VOID_REGION.unlockHint}</div>
        </div>
      `;
      return;
    }

    const lore = VOID_REGION.loreFragments;
    const unlockedLore = Math.min(lore.length, Math.floor((window.rpg?.bossKills || 0) / 2));

    body.innerHTML = `
      <!-- Header da região -->
      <div style="background:${VOID_REGION.bg};border:1px solid ${VOID_REGION.border};border-radius:12px;padding:16px;margin-bottom:14px;text-align:center;">
        <div style="font-size:36px;margin-bottom:6px;">${VOID_REGION.icon}</div>
        <div style="font-family:'Orbitron',monospace;font-size:14px;font-weight:900;color:${VOID_REGION.color};letter-spacing:0.1em;margin-bottom:4px;">${VOID_REGION.name.toUpperCase()}</div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#9ca3af;font-style:italic;">"${VOID_REGION.description}"</div>
      </div>

      <!-- Monstros -->
      <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:#52525b;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">👾 Monstros do Vazio (+200% stats)</div>
      ${VOID_MONSTERS.map(m => `
        <div style="background:rgba(0,0,0,0.4);border:1px solid ${m.isBoss ? VOID_REGION.border : 'rgba(255,255,255,0.06)'};border-radius:10px;padding:10px 12px;margin-bottom:6px;${m.isBoss ? `box-shadow:0 0 20px rgba(232,121,249,0.2);` : ''}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span style="font-size:18px;">${m.icon}</span>
            <div>
              <div style="font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:${m.isBoss ? VOID_REGION.color : '#e4e4e7'};">${m.name}${m.isBoss ? ' <span style="font-size:8px;background:rgba(232,121,249,0.2);border:1px solid rgba(232,121,249,0.4);border-radius:4px;padding:1px 5px;font-family:Orbitron,monospace;">BOSS</span>' : ''}</div>
              <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;">${m.description}</div>
            </div>
          </div>
          <div style="font-family:'Fira Code',monospace;font-size:8px;color:#a855f7;">⚡ ${m.special}</div>
          ${m.drop ? `<div style="font-family:'Fira Code',monospace;font-size:8px;color:#34d399;margin-top:3px;">💎 Drop: ${m.drop} (${Math.round(m.dropChance*100)}%)</div>` : ''}
        </div>
      `).join('')}

      <!-- Armas -->
      <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:#52525b;letter-spacing:0.15em;text-transform:uppercase;margin:12px 0 8px;">⚔️ Armas Exclusivas (5)</div>
      ${VOID_WEAPONS.map(w => `
        <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px 12px;margin-bottom:4px;display:flex;gap:8px;align-items:center;">
          <span style="font-size:16px;">${w.icon}</span>
          <div>
            <div style="font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:700;color:#e4e4e7;">${w.name}</div>
            <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;">${w.desc}</div>
          </div>
        </div>
      `).join('')}

      <!-- Relíquias -->
      <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:#52525b;letter-spacing:0.15em;text-transform:uppercase;margin:12px 0 8px;">💜 Relíquias Lendárias (2)</div>
      ${VOID_RELICS.map(r => `
        <div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:8px;padding:8px 12px;margin-bottom:4px;display:flex;gap:8px;align-items:center;">
          <span style="font-size:16px;">${r.icon}</span>
          <div>
            <div style="font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:700;color:#c084fc;">${r.name}</div>
            <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;">${r.desc}</div>
          </div>
        </div>
      `).join('')}

      <!-- Lore -->
      <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:#52525b;letter-spacing:0.15em;text-transform:uppercase;margin:12px 0 8px;">📜 Fragmentos de Lore (${unlockedLore}/${lore.length})</div>
      ${lore.map((l, i) => `
        <div style="background:rgba(0,0,0,0.3);border:1px solid ${i < unlockedLore ? 'rgba(232,121,249,0.2)' : 'rgba(255,255,255,0.04)'};border-radius:8px;padding:8px 12px;margin-bottom:4px;">
          ${i < unlockedLore
            ? `<div style="font-family:'Fira Code',monospace;font-size:9px;color:#9ca3af;font-style:italic;line-height:1.5;">${l}</div>`
            : `<div style="font-family:'Fira Code',monospace;font-size:9px;color:#52525b;">🔒 Derrota ${(i+1)*2} bosses para desbloquear</div>`
          }
        </div>
      `).join('')}
    `;
  }

  // ── CRIAR MODAL ────────────────────────────────────────────────────────────
  function createVoidModal() {
    if (document.getElementById('void-region-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'void-region-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/90 w-11/12 max-w-md rounded-2xl p-6 shadow-2xl" style="border-color:rgba(232,121,249,0.3)!important;">
        <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-3">
          <h2 class="text-xl font-black flex items-center gap-2 uppercase tracking-widest" style="color:#e879f9;">
            🌑 <span>O Vazio — Pós-Jogo</span>
          </h2>
          <button onclick="closeModal('void-region-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">✕</button>
        </div>
        <p class="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style="color:#a855f7;">
          Desbloqueado após NG+ · Monstros corrompidos · Lore final
        </p>
        <div id="void-region-body" class="max-h-[65vh] overflow-y-auto pr-1 pb-2 hide-scrollbar"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // ── FUNÇÃO GLOBAL ──────────────────────────────────────────────────────────
  window.openVoidRegion = function() {
    createVoidModal();
    renderVoidModal();
    const m = document.getElementById('void-region-modal');
    if (m) {
      if (window.openModal) openModal('void-region-modal');
      else m.classList.add('active');
    }
  };

  // ── INJETAR NO MAPA ────────────────────────────────────────────────────────
  // Adiciona entrada do Vazio no mapa quando abrir
  function injectIntoMap() {
    const origOpenMap = window.openMap;
    window.openMap = function(...args) {
      if (origOpenMap) origOpenMap(...args);
      setTimeout(() => {
        const mapBody = document.getElementById('map-body');
        if (!mapBody || document.getElementById('void-region-map-entry')) return;
        const unlocked = isUnlocked();
        const entry = document.createElement('div');
        entry.id = 'void-region-map-entry';
        entry.style.cssText = `
          margin-top: 12px;
          background: ${unlocked ? 'rgba(232,121,249,0.06)' : 'rgba(0,0,0,0.3)'};
          border: 1px solid ${unlocked ? 'rgba(232,121,249,0.3)' : 'rgba(255,255,255,0.05)'};
          border-radius: 12px; padding: 12px; cursor: ${unlocked ? 'pointer' : 'default'};
        `;
        entry.innerHTML = `
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:24px;${unlocked ? '' : 'filter:grayscale(1);opacity:0.3;'}">🌑</span>
            <div style="flex:1;">
              <div style="font-family:'Orbitron',monospace;font-size:10px;font-weight:900;color:${unlocked ? '#e879f9' : '#52525b'};letter-spacing:0.08em;">
                O VAZIO <span style="font-size:7px;background:rgba(232,121,249,0.15);border:1px solid rgba(232,121,249,0.3);border-radius:4px;padding:1px 5px;margin-left:4px;">PÓS-JOGO</span>
              </div>
              <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;margin-top:2px;">
                ${unlocked ? '3 monstros · 5 armas · 2 relíquias · 10 lore' : '🔒 ' + VOID_REGION.unlockHint}
              </div>
            </div>
            ${unlocked ? '<span style="font-size:16px;color:#e879f9;">→</span>' : ''}
          </div>
        `;
        if (unlocked) entry.onclick = openVoidRegion;
        mapBody.appendChild(entry);
      }, 300);
    };
  }

  // ── NOTIFICAÇÃO DE DESBLOQUEIO ─────────────────────────────────────────────
  function checkAndNotifyUnlock() {
    if (!window.rpg) return;
    const unlocked = isUnlocked();
    const wasNotified = rpg._voidNotified;
    if (unlocked && !wasNotified) {
      rpg._voidNotified = true;
      // Toast de desbloqueio
      const toast = document.createElement('div');
      toast.style.cssText = `
        position:fixed; top:60px; left:50%; transform:translateX(-50%) translateY(-30px);
        z-index:9500; background:linear-gradient(135deg,#1a0030,#3b0a6e);
        border:1px solid rgba(232,121,249,0.6); border-radius:14px;
        padding:14px 22px; font-family:'Orbitron',monospace; font-size:10px;
        font-weight:900; letter-spacing:0.12em; color:#e879f9; text-align:center;
        box-shadow:0 0 40px rgba(232,121,249,0.4);
        opacity:0; transition:all 0.4s ease; pointer-events:none;
      `;
      toast.innerHTML = '🌑 REGIÃO DESBLOQUEADA<br><span style="font-size:8px;color:#a855f7;font-weight:400;letter-spacing:0.1em;">O VAZIO aguarda — Vê o Mapa</span>';
      document.body.appendChild(toast);
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });
      setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 5000);
    }
  }

  // ── HOOK NG+ ───────────────────────────────────────────────────────────────
  function hookNgPlus() {
    // Verifica após cada mudança de estado
    setInterval(checkAndNotifyUnlock, 3000);
  }

  // ── INIT ───────────────────────────────────────────────────────────────────
  function init() {
    createVoidModal();
    injectIntoMap();
    hookNgPlus();

    window._postGameRegion = {
      VOID_REGION,
      VOID_MONSTERS,
      VOID_WEAPONS,
      VOID_RELICS,
      isUnlocked,
      open: openVoidRegion,
    };

    console.log('[PostGameRegion] ✅ Carregado — O Vazio pronto');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 1800));
  } else {
    setTimeout(init, 1800);
  }

})();
