/**
 * living-village.js — CalcQuest: Lendas de Algoritma
 * ──────────────────────────────────────────────────────
 * Aldeia Viva com Eventos: NPCs comentam o progresso
 * do herói e a aldeia muda visualmente conforme avança.
 * Integra com rpg.NPCS, rpg.bossKills e o sistema de NPCs.
 */
;(function () {
  'use strict';

  // ── ESTADOS DA ALDEIA ──────────────────────────────────────────────────────
  // Determinados por bossKills
  const VILLAGE_STATES = [
    {
      id: 'destroyed',
      label: 'Em Ruínas',
      icon: '🏚️',
      color: '#ef4444',
      minBossKills: 0,
      desc: 'A aldeia mal sobreviveu ao despertar dos monstros. Silêncio e destruição.',
      ambience: 'Fumaça, pedras partidas, silêncio perturbador.',
    },
    {
      id: 'rebuilding',
      label: 'Em Reconstrução',
      icon: '🏗️',
      color: '#f59e0b',
      minBossKills: 3,
      desc: 'Com os primeiros bosses derrotados, a esperança regressa. Andaimes e martelos.',
      ambience: 'Barulho de construção, rostos menos assustados.',
    },
    {
      id: 'thriving',
      label: 'Próspera',
      icon: '🏡',
      color: '#34d399',
      minBossKills: 8,
      desc: 'A aldeia floresce. Novos NPCs chegam, o mercado reabre, crianças brincam.',
      ambience: 'Música, risadas, bandeiras coloridas, colheitas abundantes.',
    },
  ];

  // ── COMENTÁRIOS DOS NPCs ───────────────────────────────────────────────────
  // { npc, trigger: fn(rpg), lines: [] }
  const NPC_COMMENTS = [
    // Ferreiro Koda
    {
      npc: 'Koda',
      icon: '⚒️',
      color: '#f59e0b',
      triggers: [
        { cond: (r) => (r.bossKills||0) === 1,  line: '"Então é verdade. Eliminaste o Paradoxo. Nunca pensei ver isso." — Koda' },
        { cond: (r) => (r.bossKills||0) === 3,  line: '"Três bosses. Minha forja já cheirava a ferrugem de medo. Obrigado." — Koda' },
        { cond: (r) => (r.bossKills||0) === 5,  line: '"Com cinco guardiões caídos, decidi reconstruir a ala norte. Podes contar comigo." — Koda' },
        { cond: (r) => (r.bossKills||0) === 10, line: '"Dez. Minha filha perguntou se o herói é real. Disse que sim." — Koda' },
        { cond: (r) => (r.bossKills||0) === 15, line: '"Quinze bosses. Comecei a forjar armas de história. A tua história." — Koda' },
        { cond: (r) => (r.level||1) >= 50,      line: '"Nível 50. Lembro quando eras um aventureiro perdido. Agora assustas." — Koda' },
        { cond: (r) => (r.kills||0) >= 500,     line: '"Quinhentos abates. A terra de Algoritma respira mais fácil." — Koda' },
        { cond: (r) => (r.ngLevel||r.prestigeLevel||0) >= 1, line: '"NG+. Sabias que os antigos chamavam a isso transcendência? Eu chamo-lhe loucura corajosa." — Koda' },
      ],
    },
    // Sábia Lyra
    {
      npc: 'Lyra',
      icon: '📚',
      color: '#a855f7',
      triggers: [
        { cond: (r) => (r.bossKills||0) === 2,  line: '"Os tomes falam de um Destruidor. Eu estava errada. É um Reconstrutor." — Lyra' },
        { cond: (r) => (r.bossKills||0) === 6,  line: '"Seis bosses. Registei tudo. Serás capítulo, não nota de rodapé." — Lyra' },
        { cond: (r) => (r.level||1) >= 100,     line: '"Nível 100. Os meus livros sobre limites humanos precisam de revisão." — Lyra' },
        { cond: (r) => (r.bossKills||0) === 19, line: '"Dezoito bosses e o Protocolo Primordial. Lyra fecha o livro. Não há mais nada a escrever." — Lyra' },
        { cond: (r) => (r.ngLevel||r.prestigeLevel||0) >= 1, line: '"NG+. Reli os arcanjos de Algoritma. Todos mencionam um \'ciclo eterno\'. Eras tu." — Lyra' },
      ],
    },
    // Mercador Errante
    {
      npc: 'Errante',
      icon: '🛒',
      color: '#fbbf24',
      triggers: [
        { cond: (r) => (r.gold||0) >= 10000,    line: '"Dez mil de ouro. Já vi impérios construídos com menos. Compras alguma coisa?" — Errante' },
        { cond: (r) => (r.bossKills||0) === 4,  line: '"Quatro bosses! As minhas rotas estão seguras agora. Tenho stock de artigos raros." — Errante' },
        { cond: (r) => (r.kills||0) >= 100,     line: '"Cem abates. Oficialmente, as estradas de Algoritma são tuas." — Errante' },
      ],
    },
    // Guardião Veterano
    {
      npc: 'Veterano',
      icon: '⚔️',
      color: '#60a5fa',
      triggers: [
        { cond: (r) => (r.bossKills||0) === 7,  line: '"Sete bosses. Servi 30 anos na guarda. Nunca vi nada assim." — Guardião Ret.' },
        { cond: (r) => (r.level||1) >= 200,     line: '"Nível 200. Quando atingi o meu pico, era nível 12. Desculpa a comparação." — Guardião Ret.' },
        { cond: (r) => (r.prestigeLevel||0) >= 1, line: '"Prestígio. Morreu e renasceu mais forte. Os textos antigos dizem que isso só aconteceu uma vez." — Guardião Ret.' },
      ],
    },
  ];

  // ── EVENTOS DA ALDEIA ──────────────────────────────────────────────────────
  const VILLAGE_EVENTS = [
    {
      id: 'surprise_attack',
      name: '⚠️ Ataque Surpresa',
      color: '#ef4444',
      desc: 'Monstros atacam a aldeia! Protege os habitantes.',
      trigger: () => Math.random() < 0.08, // 8% chance por verificação
      effect: (rpg) => {
        // Buff de urgência: +20% ATK por 5 batalhas
        if (rpg) { rpg._villageEventBuff = { type: 'atk', mult: 1.2, remaining: 5 }; }
      },
      reward: '+20% ATK · 5 batalhas',
    },
    {
      id: 'festival',
      name: '🎉 Festival de Algoritma',
      color: '#fbbf24',
      desc: 'A aldeia celebra as vitórias do herói! Ouro duplicado por 10 batalhas.',
      trigger: (rpg) => (rpg?.bossKills||0) > 0 && Math.random() < 0.05,
      effect: (rpg) => {
        if (rpg) { rpg._villageEventBuff = { type: 'gold', mult: 2.0, remaining: 10 }; }
      },
      reward: '+100% Ouro · 10 batalhas',
    },
    {
      id: 'mysterious_traveler',
      name: '🧙 Viajante Misterioso',
      color: '#a855f7',
      desc: 'Um estranho de terras distantes chega com conhecimento proibido.',
      trigger: () => Math.random() < 0.04,
      effect: (rpg) => {
        if (rpg && rpg.xp !== undefined) { rpg.xp = Math.floor((rpg.xp||0) * 1.5); }
      },
      reward: '+50% XP actual',
    },
  ];

  // ── ESTADO LOCAL ───────────────────────────────────────────────────────────
  let lastComment = null;
  let lastBossKills = -1;
  let activeEvent = null;

  // ── OBTER ESTADO DA ALDEIA ─────────────────────────────────────────────────
  function getVillageState() {
    const bk = window.rpg?.bossKills || 0;
    let state = VILLAGE_STATES[0];
    for (const s of VILLAGE_STATES) {
      if (bk >= s.minBossKills) state = s;
    }
    return state;
  }

  // ── OBTER COMENTÁRIO RELEVANTE ─────────────────────────────────────────────
  function getRelevantComment() {
    if (!window.rpg) return null;
    for (const npc of NPC_COMMENTS) {
      for (const t of npc.triggers) {
        const key = `${npc.npc}_${t.line.substring(0,20)}`;
        if (t.cond(rpg) && !rpg._villageCommentsShown?.includes(key)) {
          return { npc, line: t.line, key };
        }
      }
    }
    return null;
  }

  // ── MOSTRAR COMENTÁRIO ─────────────────────────────────────────────────────
  function showNpcComment(comment) {
    if (!comment) return;

    // Registar como mostrado
    if (window.rpg) {
      if (!rpg._villageCommentsShown) rpg._villageCommentsShown = [];
      if (!rpg._villageCommentsShown.includes(comment.key)) {
        rpg._villageCommentsShown.push(comment.key);
      }
    }

    let toast = document.getElementById('village-npc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'village-npc-toast';
      toast.style.cssText = `
        position:fixed; bottom:80px; left:16px; z-index:8000;
        max-width:260px; background:rgba(8,8,18,0.96);
        border:1px solid rgba(255,255,255,0.1); border-radius:14px;
        padding:12px 14px; font-family:'Rajdhani',sans-serif;
        box-shadow:0 8px 30px rgba(0,0,0,0.8);
        opacity:0; transform:translateY(10px);
        transition:all 0.3s ease; pointer-events:none;
      `;
      document.body.appendChild(toast);
    }

    toast.style.borderColor = comment.npc.color || 'rgba(255,255,255,0.1)';
    toast.innerHTML = `
      <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:${comment.npc.color};letter-spacing:0.1em;margin-bottom:5px;">
        ${comment.npc.icon} ${comment.npc.npc.toUpperCase()}
      </div>
      <div style="font-size:11px;font-weight:600;color:#c4c4cc;line-height:1.4;font-style:italic;">
        ${comment.line}
      </div>
    `;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 6000);
  }

  // ── ATUALIZAR INDICADOR DE ESTADO DA ALDEIA ────────────────────────────────
  function updateVillageIndicator() {
    let indicator = document.getElementById('village-state-indicator');
    if (!indicator) {
      // Injeta perto do header do menu
      const menuHeader = document.querySelector('#view-menu .menu-container, #view-menu > div');
      if (!menuHeader) return;
      indicator = document.createElement('div');
      indicator.id = 'village-state-indicator';
      indicator.style.cssText = `
        display:flex; align-items:center; gap:6px;
        padding:4px 10px; border-radius:8px; margin-bottom:6px;
        background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.06);
        font-family:'Orbitron',monospace; font-size:7px; font-weight:900;
        letter-spacing:0.1em; cursor:pointer; transition:border-color 0.2s;
      `;
      indicator.onclick = openVillageModal;
      menuHeader.prepend(indicator);
    }

    const state = getVillageState();
    indicator.style.borderColor = state.color.replace(')', ',0.3)').replace('rgb', 'rgba');
    indicator.innerHTML = `
      <span>${state.icon}</span>
      <span style="color:${state.color};">ALDEIA: ${state.label.toUpperCase()}</span>
      ${activeEvent ? `<span style="color:#fbbf24;margin-left:4px;">${activeEvent.name}</span>` : ''}
    `;
  }

  // ── EVENTO DA ALDEIA ───────────────────────────────────────────────────────
  function checkVillageEvent() {
    if (activeEvent) return; // só 1 evento por vez
    const state = getVillageState();
    if (state.id === 'destroyed') return; // sem eventos em ruínas

    for (const ev of VILLAGE_EVENTS) {
      if (ev.trigger(window.rpg)) {
        activeEvent = ev;
        ev.effect(window.rpg);
        showEventNotification(ev);
        // Evento dura 5 minutos
        setTimeout(() => {
          activeEvent = null;
          updateVillageIndicator();
        }, 5 * 60 * 1000);
        break;
      }
    }
  }

  function showEventNotification(ev) {
    let notif = document.getElementById('village-event-notif');
    if (!notif) {
      notif = document.createElement('div');
      notif.id = 'village-event-notif';
      notif.style.cssText = `
        position:fixed; top:55px; right:16px; z-index:8500;
        max-width:220px; background:rgba(8,8,18,0.97);
        border-radius:12px; padding:12px 14px;
        box-shadow:0 8px 30px rgba(0,0,0,0.8);
        opacity:0; transform:translateX(20px);
        transition:all 0.3s ease; pointer-events:auto; cursor:pointer;
      `;
      notif.onclick = () => { notif.style.opacity = '0'; };
      document.body.appendChild(notif);
    }
    notif.style.border = `1px solid ${ev.color}40`;
    notif.innerHTML = `
      <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:${ev.color};letter-spacing:0.1em;margin-bottom:4px;">EVENTO NA ALDEIA</div>
      <div style="font-family:'Orbitron',monospace;font-size:9px;font-weight:900;color:#fff;margin-bottom:4px;">${ev.name}</div>
      <div style="font-family:'Fira Code',monospace;font-size:8px;color:#9ca3af;margin-bottom:4px;">${ev.desc}</div>
      <div style="font-family:'Fira Code',monospace;font-size:8px;color:#34d399;">${ev.reward}</div>
    `;
    requestAnimationFrame(() => {
      notif.style.opacity = '1';
      notif.style.transform = 'translateX(0)';
    });
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transform = 'translateX(20px)';
    }, 8000);
  }

  // ── MODAL DA ALDEIA ────────────────────────────────────────────────────────
  function createVillageModal() {
    if (document.getElementById('village-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'village-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/90 w-11/12 max-w-md rounded-2xl p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-3">
          <h2 class="text-xl font-black text-white flex items-center gap-2 uppercase tracking-widest">
            🏡 <span>Aldeia de Algoritma</span>
          </h2>
          <button onclick="closeModal('village-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">✕</button>
        </div>
        <div id="village-modal-body" class="max-h-[65vh] overflow-y-auto pr-1 pb-2 hide-scrollbar"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function renderVillageModal() {
    const body = document.getElementById('village-modal-body');
    if (!body) return;
    const state = getVillageState();
    const bk = window.rpg?.bossKills || 0;
    const nextState = VILLAGE_STATES.find(s => s.minBossKills > bk);

    // Agrupa comentários por NPC
    const allComments = [];
    for (const npc of NPC_COMMENTS) {
      const shown = npc.triggers.filter(t => {
        const key = `${npc.npc}_${t.line.substring(0,20)}`;
        return window.rpg?._villageCommentsShown?.includes(key);
      });
      if (shown.length) {
        allComments.push({ npc, lines: shown.map(t => t.line) });
      }
    }

    body.innerHTML = `
      <!-- Estado actual -->
      <div style="background:rgba(0,0,0,0.4);border:1px solid ${state.color}40;border-radius:12px;padding:14px;margin-bottom:12px;text-align:center;">
        <div style="font-size:40px;margin-bottom:6px;">${state.icon}</div>
        <div style="font-family:'Orbitron',monospace;font-size:11px;font-weight:900;color:${state.color};letter-spacing:0.1em;margin-bottom:4px;">
          ${state.label.toUpperCase()}
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#9ca3af;line-height:1.5;margin-bottom:6px;">${state.desc}</div>
        <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;font-style:italic;">${state.ambience}</div>
      </div>

      <!-- Progresso para próximo estado -->
      ${nextState ? `
        <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px 12px;margin-bottom:12px;">
          <div style="font-family:'Orbitron',monospace;font-size:7px;font-weight:900;color:#52525b;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px;">
            Próximo: ${nextState.icon} ${nextState.label}
          </div>
          <div style="height:4px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden;">
            <div style="height:100%;width:${Math.min(100,Math.round((bk/nextState.minBossKills)*100))}%;background:linear-gradient(90deg,${state.color},${nextState.color});border-radius:99px;transition:width 0.5s;"></div>
          </div>
          <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;text-align:right;margin-top:3px;">${bk}/${nextState.minBossKills} bosses</div>
        </div>
      ` : `
        <div style="background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.2);border-radius:10px;padding:10px 12px;margin-bottom:12px;text-align:center;">
          <div style="font-family:'Fira Code',monospace;font-size:9px;color:#34d399;">✓ Aldeia no estado máximo de prosperidade</div>
        </div>
      `}

      <!-- Evento activo -->
      ${activeEvent ? `
        <div style="background:rgba(0,0,0,0.4);border:1px solid ${activeEvent.color}40;border-radius:10px;padding:10px 12px;margin-bottom:12px;">
          <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:${activeEvent.color};letter-spacing:0.1em;margin-bottom:4px;">EVENTO ATIVO</div>
          <div style="font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:#fff;margin-bottom:3px;">${activeEvent.name}</div>
          <div style="font-family:'Fira Code',monospace;font-size:8px;color:#9ca3af;">${activeEvent.desc}</div>
          <div style="font-family:'Fira Code',monospace;font-size:8px;color:#34d399;margin-top:3px;">🎁 ${activeEvent.reward}</div>
        </div>
      ` : ''}

      <!-- NPCs e os seus comentários -->
      <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:#52525b;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">
        💬 Comentários dos NPCs (${allComments.reduce((a,c) => a + c.lines.length, 0)} desbloqueados)
      </div>
      ${allComments.length ? allComments.map(c => `
        <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px 12px;margin-bottom:6px;">
          <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:${c.npc.color};letter-spacing:0.1em;margin-bottom:6px;">${c.npc.icon} ${c.npc.npc.toUpperCase()}</div>
          ${c.lines.map(l => `
            <div style="font-family:'Rajdhani',sans-serif;font-size:11px;font-weight:600;color:#9ca3af;font-style:italic;margin-bottom:4px;padding-left:8px;border-left:2px solid ${c.npc.color}40;">${l}</div>
          `).join('')}
        </div>
      `).join('') : `<div style="font-family:'Fira Code',monospace;font-size:9px;color:#52525b;text-align:center;padding:12px;">Derrota bosses para desbloquear comentários dos NPCs.</div>`}

      <!-- Todos os eventos possíveis -->
      <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:#52525b;letter-spacing:0.15em;text-transform:uppercase;margin:12px 0 8px;">
        📅 Eventos Possíveis (aleatórios)
      </div>
      ${VILLAGE_EVENTS.map(ev => `
        <div style="background:rgba(0,0,0,0.3);border:1px solid ${ev.color}20;border-radius:8px;padding:8px 12px;margin-bottom:4px;display:flex;gap:8px;align-items:flex-start;">
          <div style="flex:1;">
            <div style="font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:700;color:#e4e4e7;">${ev.name}</div>
            <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;">${ev.desc}</div>
            <div style="font-family:'Fira Code',monospace;font-size:8px;color:#34d399;margin-top:2px;">${ev.reward}</div>
          </div>
        </div>
      `).join('')}
    `;
  }

  window.openVillageModal = function() {
    createVillageModal();
    renderVillageModal();
    const m = document.getElementById('village-modal');
    if (m) {
      if (window.openModal) openModal('village-modal');
      else m.classList.add('active');
    }
  };

  // ── INJETAR NO PAINEL DE NPCs ──────────────────────────────────────────────
  function injectIntoNpcs() {
    const origOpenNpcs = window.openNpcs;
    window.openNpcs = function(...args) {
      if (origOpenNpcs) origOpenNpcs(...args);
      setTimeout(() => {
        const npcBody = document.getElementById('npc-body');
        if (npcBody && !document.getElementById('village-status-in-npc')) {
          const state = getVillageState();
          const btn = document.createElement('div');
          btn.id = 'village-status-in-npc';
          btn.onclick = openVillageModal;
          btn.style.cssText = `
            display:flex; align-items:center; gap:10px; cursor:pointer;
            background:rgba(0,0,0,0.4); border:1px solid ${state.color}30;
            border-radius:12px; padding:12px 14px; margin-bottom:10px;
            transition:border-color 0.2s;
          `;
          btn.innerHTML = `
            <span style="font-size:24px;">${state.icon}</span>
            <div>
              <div style="font-family:'Orbitron',monospace;font-size:8px;font-weight:900;color:${state.color};letter-spacing:0.1em;text-transform:uppercase;">Aldeia: ${state.label}</div>
              <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;margin-top:2px;">${state.desc.substring(0,55)}...</div>
              <div style="font-family:'Fira Code',monospace;font-size:7px;color:#52525b;margin-top:2px;">Toca para ver detalhes →</div>
            </div>
          `;
          npcBody.insertBefore(btn, npcBody.firstChild);
        }
      }, 200);
    };
  }

  // ── HOOK EM killMonster PARA COMENTÁRIOS ───────────────────────────────────
  function hookKillMonster() {
    if (!window.rpg || !rpg.killMonster) return;
    const orig = rpg.killMonster.bind(rpg);
    rpg.killMonster = function(...args) {
      const r = orig(...args);
      setTimeout(() => {
        const comment = getRelevantComment();
        if (comment) showNpcComment(comment);
        updateVillageIndicator();
      }, 500);
      return r;
    };
  }

  // ── MAIN LOOP ──────────────────────────────────────────────────────────────
  function startLoop() {
    // Verifica comentários e eventos periodicamente
    setInterval(() => {
      try {
        const bk = window.rpg?.bossKills || 0;
        if (bk !== lastBossKills) {
          lastBossKills = bk;
          const comment = getRelevantComment();
          if (comment) showNpcComment(comment);
          updateVillageIndicator();
        }
        // Evento aleatório
        if (Math.random() < 0.002) checkVillageEvent(); // ~12% por min
      } catch(e) {}
    }, 10000);

    // Update visual a cada 30s
    setInterval(updateVillageIndicator, 30000);
  }

  // ── INIT ───────────────────────────────────────────────────────────────────
  function init() {
    createVillageModal();
    injectIntoNpcs();
    hookKillMonster();
    updateVillageIndicator();
    startLoop();

    window._livingVillage = {
      VILLAGE_STATES,
      NPC_COMMENTS,
      VILLAGE_EVENTS,
      getState: getVillageState,
      getComment: getRelevantComment,
      triggerEvent: checkVillageEvent,
      open: openVillageModal,
    };

    console.log('[LivingVillage] ✅ Carregado — Aldeia viva e 3 estados activos');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 2000));
  } else {
    setTimeout(init, 2000);
  }

})();
