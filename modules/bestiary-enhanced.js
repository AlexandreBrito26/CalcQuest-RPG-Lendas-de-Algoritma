// ═══════════════════════════════════════════════════════════════
// MODULE: bestiary-enhanced.js  —  BESTIÁRIO MELHORADO
// ─────────────────────────────────────────────────────────────
// • Sistema de Domínio (0–100) por monstro com 5 tiers
// • Marcos de kills com recompensas automáticas (XP, Gold, bónus)
// • Lore de cada monstro gerado via Anthropic API (lazy, com cache)
// • UI completamente redesenhada: grid de cards com barra de domínio
// • Detalhe de monstro com stats, fraquezas e lore
// • Totalmente compatível — patcha rpg.renderBestiary()
// ═══════════════════════════════════════════════════════════════
(function BestiaryEnhancedModule() {
  'use strict';

  // ── Marcos de domínio por monstro ─────────────────────────────
  // Formato: { kills, tier, label, color, reward }
  const MASTERY_TIERS = [
    { kills:    1, tier: 0, label: 'Avistado',   color: '#94a3b8', glow: 'rgba(148,163,184,0.2)' },
    { kills:   10, tier: 1, label: 'Aprendiz',   color: '#22c55e', glow: 'rgba(34,197,94,0.25)',
      reward: { type: 'gold', mult: 0.02, label: '+2% Gold deste monstro' } },
    { kills:   50, tier: 2, label: 'Caçador',    color: '#3b82f6', glow: 'rgba(59,130,246,0.3)',
      reward: { type: 'xp',   mult: 0.03, label: '+3% XP deste monstro' } },
    { kills:  100, tier: 3, label: 'Especialista',color: '#a855f7', glow: 'rgba(168,85,247,0.3)',
      reward: { type: 'crit', val: 0.01,  label: '+1% Crit permanente' } },
    { kills:  250, tier: 4, label: 'Mestre',      color: '#f97316', glow: 'rgba(249,115,22,0.3)',
      reward: { type: 'gold', mult: 0.05, label: '+5% Gold global' } },
    { kills:  500, tier: 5, label: 'Lenda',       color: '#ffd60a', glow: 'rgba(255,214,10,0.4)',
      reward: { type: 'all',  mult: 0.02, label: '+2% Todos os stats' } },
  ];

  // Kills necessários para próximo marco
  const NEXT_KILLS = MASTERY_TIERS.map(t => t.kills);

  // ── Cache de lore gerado pela API ─────────────────────────────
  const LORE_CACHE_KEY = 'rpg_bestiary_lore_v2';
  let loreCache = {};
  try { loreCache = JSON.parse(localStorage.getItem(LORE_CACHE_KEY) || '{}'); } catch(e) {}

  // ── Estado UI ─────────────────────────────────────────────────
  let currentFilter  = 'all';   // 'all' | 'discovered' | 'mastered'
  let currentSort    = 'kills'; // 'kills' | 'name' | 'mastery'
  let activeMonster  = null;    // id do monstro no painel de detalhe

  // ── Domínio de um monstro ─────────────────────────────────────
  function getMastery(monsterId) {
    const kills  = (rpg.bestiary[monsterId] || 0);
    const tiers  = MASTERY_TIERS;
    let   tier   = tiers[0];

    for (let i = tiers.length - 1; i >= 0; i--) {
      if (kills >= tiers[i].kills) { tier = tiers[i]; break; }
    }

    // Progresso até próximo marco
    const nextIdx   = Math.min(tier.tier + 1, tiers.length - 1);
    const nextTier  = tiers[nextIdx];
    const fromKills = tier.kills;
    const toKills   = nextTier.kills;
    const pct = tier.tier >= tiers.length - 1
      ? 100
      : Math.min(100, ((kills - fromKills) / (toKills - fromKills)) * 100);

    return { kills, tier, nextTier, pct, isMaxed: tier.tier >= tiers.length - 1 };
  }

  // ── Obtém todos os monstros (normais + bosses) ─────────────────
  function getAllMonsters() {
    const normal = (rpg.monsterTypes || []).map(m => ({ ...m, isBoss: false }));
    const bosses = (rpg.actBosses    || []).map(b => ({
      id: b.id, name: b.name, icon: b.icon, color: b.color,
      weak: 'none', res: 'none', dodge: 0.15, block: 0.25,
      hpMult: b.hpMult || 10, dmgMult: b.dmgMult || 5,
      isBoss: true,
    }));
    return [...normal, ...bosses];
  }

  // ── Verifica e aplica recompensas de marco ────────────────────
  function checkMasteryMilestones(monsterId, killsBefore, killsAfter) {
    const lang = rpg.lang || 'pt';

    MASTERY_TIERS.forEach(tier => {
      if (tier.tier === 0) return; // tier 0 não tem recompensa
      if (killsBefore < tier.kills && killsAfter >= tier.kills) {
        applyMasteryReward(monsterId, tier, lang);
      }
    });
  }

  function applyMasteryReward(monsterId, tier, lang) {
    const monster = getAllMonsters().find(m => m.id === monsterId);
    const name    = monster ? (monster.name[lang] || monster.name.pt || monsterId) : monsterId;
    const r       = tier.reward;
    if (!r) return;

    // Aplica o bónus
    if (r.type === 'crit') {
      rpg.permCritBonus = (rpg.permCritBonus || 0) + r.val;
    } else if (r.type === 'all') {
      rpg.permAllBonus = (rpg.permAllBonus || 0) + r.mult;
    } else if (r.type === 'gold') {
      // Bónus de gold para esse monstro — guardado por ID
      const key = 'rpg_mastery_gold_' + monsterId;
      const cur = parseFloat(localStorage.getItem(key) || '0');
      localStorage.setItem(key, cur + r.mult);
    } else if (r.type === 'xp') {
      const key = 'rpg_mastery_xp_' + monsterId;
      const cur = parseFloat(localStorage.getItem(key) || '0');
      localStorage.setItem(key, cur + r.mult);
    }

    // Salva conquistas de domínio
    const mastKey = 'rpg_mastery_claimed';
    const claimed = JSON.parse(localStorage.getItem(mastKey) || '[]');
    const claimId = monsterId + '_' + tier.tier;
    if (!claimed.includes(claimId)) {
      claimed.push(claimId);
      localStorage.setItem(mastKey, JSON.stringify(claimed));
    }

    rpg.save && rpg.save();

    // Notificação visual
    if (typeof window.showAchievementNotif === 'function') {
      window.showAchievementNotif({
        type:    'achievement',
        icon:    monster ? monster.icon : 'star',
        title:   'Domínio: ' + name,
        reward:  tier.label + ' — ' + r.label,
        duration: 5000,
      });
    } else if (typeof showToast === 'function') {
      showToast('🏆 Domínio ' + tier.label + ': ' + name + ' — ' + r.label, 5000);
    }
  }

  // ── Gera lore via Anthropic API ───────────────────────────────
  async function generateLore(monster) {
    const lang    = rpg.lang || 'pt';
    const cacheId = monster.id + '_' + lang;

    // Usa cache se disponível
    if (loreCache[cacheId]) return loreCache[cacheId];

    const name   = monster.name[lang] || monster.name.pt || monster.id;
    const isBoss = monster.isBoss;
    const weak   = monster.weak || 'none';
    const res    = monster.res  || 'none';

    const prompt = lang === 'pt'
      ? `Escreve um lore de RPG de 2 frases (máximo 60 palavras no total) para um monstro chamado "${name}" num universo cyberpunk/digital chamado Algoritma. ${isBoss ? 'É um boss poderoso.' : ''} Fraqueza: ${weak === 'mag' ? 'magia' : weak === 'atk' ? 'ataque físico' : 'nenhuma'}. Resistência: ${res === 'mag' ? 'magia' : res === 'atk' ? 'ataque físico' : 'nenhuma'}. Escreve APENAS o lore, sem introdução nem aspas.`
      : `Write a 2-sentence RPG lore (max 60 words total) for a monster called "${name}" in a cyberpunk/digital universe called Algoritma. ${isBoss ? 'It is a powerful boss.' : ''} Weakness: ${weak === 'mag' ? 'magic' : weak === 'atk' ? 'physical attack' : 'none'}. Resistance: ${res === 'mag' ? 'magic' : res === 'atk' ? 'physical attack' : 'none'}. Write ONLY the lore, no intro or quotes.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 120,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();
      const text = (data.content || []).map(b => b.text || '').join('').trim();

      if (text) {
        loreCache[cacheId] = text;
        try { localStorage.setItem(LORE_CACHE_KEY, JSON.stringify(loreCache)); } catch(e) {}
        return text;
      }
    } catch(e) {
      console.warn('[BestiaryEnhanced] API error:', e);
    }

    // Fallback estático
    return lang === 'pt'
      ? `${name} habita os corredores corrompidos de Algoritma, alimentando-se do caos digital que permeia o sistema.`
      : `${name} dwells in Algoritma's corrupted corridors, feeding on the digital chaos that permeates the system.`;
  }

  // ── Render principal do bestiário ──────────────────────────────
  function renderBestiaryEnhanced() {
    const modal = document.getElementById('bestiary-modal');
    if (!modal) return;

    // Substitui o conteúdo do modal
    let content = modal.querySelector('.modal-content');
    if (!content) {
      content = modal.querySelector('div');
      if (!content) return;
    }

    // Injeta nova estrutura dentro do modal existente
    const bodyEl = document.getElementById('bestiary-list');
    if (!bodyEl) return;

    // Substitui o elemento pai que continha o bodyEl
    const parent = bodyEl.parentElement;
    if (!parent) return;

    parent.innerHTML = buildBestiaryHTML();
    injectStyles();

    try { lucide.createIcons(); } catch(e) {}
    attachEvents();
    renderGrid();
  }

  // ── HTML base da UI ───────────────────────────────────────────
  function buildBestiaryHTML() {
    const lang      = rpg.lang || 'pt';
    const all       = getAllMonsters();
    const discovered = all.filter(m => (rpg.bestiary[m.id] || 0) > 0).length;
    const mastered   = all.filter(m => {
      const m2 = getMastery(m.id);
      return m2.isMaxed && m2.kills > 0;
    }).length;
    const totalKills = Object.values(rpg.bestiary || {}).reduce((a, b) => a + b, 0);

    return `
      <!-- Stats row -->
      <div class="best-stats-row">
        <div class="best-stat-card">
          <div class="best-stat-num" style="color:#00e5ff">${discovered}</div>
          <div class="best-stat-lbl">${lang === 'pt' ? 'Descobertos' : 'Discovered'}</div>
        </div>
        <div class="best-stat-card">
          <div class="best-stat-num" style="color:#ffd60a">${mastered}</div>
          <div class="best-stat-lbl">${lang === 'pt' ? 'Dominados' : 'Mastered'}</div>
        </div>
        <div class="best-stat-card">
          <div class="best-stat-num" style="color:#ef4444">${formatNumber(totalKills)}</div>
          <div class="best-stat-lbl">${lang === 'pt' ? 'Total Kills' : 'Total Kills'}</div>
        </div>
      </div>

      <!-- Filtros e sort -->
      <div class="best-controls">
        <div class="best-filter-row">
          <button class="best-filter-btn best-filter-active" data-filter="all">${lang === 'pt' ? 'Todos' : 'All'}</button>
          <button class="best-filter-btn" data-filter="discovered">${lang === 'pt' ? 'Descobertos' : 'Found'}</button>
          <button class="best-filter-btn" data-filter="mastered">${lang === 'pt' ? 'Dominados' : 'Mastered'}</button>
          <button class="best-filter-btn" data-filter="boss">${lang === 'pt' ? 'Bosses' : 'Bosses'}</button>
        </div>
        <select class="best-sort-sel" id="best-sort-sel">
          <option value="kills">${lang === 'pt' ? 'Por Kills' : 'By Kills'}</option>
          <option value="name">${lang === 'pt' ? 'Por Nome' : 'By Name'}</option>
          <option value="mastery">${lang === 'pt' ? 'Por Domínio' : 'By Mastery'}</option>
        </select>
      </div>

      <!-- Grid de monstros -->
      <div id="best-grid" class="best-grid"></div>

      <!-- Painel de detalhe (hidden por padrão) -->
      <div id="best-detail" class="best-detail hidden"></div>
    `;
  }

  // ── Renderiza o grid de cards ──────────────────────────────────
  function renderGrid() {
    const grid = document.getElementById('best-grid');
    if (!grid) return;

    const lang = rpg.lang || 'pt';
    let monsters = getAllMonsters();

    // Filtro
    if (currentFilter === 'discovered') {
      monsters = monsters.filter(m => (rpg.bestiary[m.id] || 0) > 0);
    } else if (currentFilter === 'mastered') {
      monsters = monsters.filter(m => {
        const ms = getMastery(m.id);
        return ms.isMaxed && ms.kills > 0;
      });
    } else if (currentFilter === 'boss') {
      monsters = monsters.filter(m => m.isBoss);
    }

    // Sort
    if (currentSort === 'kills') {
      monsters.sort((a, b) => (rpg.bestiary[b.id] || 0) - (rpg.bestiary[a.id] || 0));
    } else if (currentSort === 'name') {
      monsters.sort((a, b) => {
        const na = a.name[lang] || a.name.pt || '';
        const nb = b.name[lang] || b.name.pt || '';
        return na.localeCompare(nb);
      });
    } else if (currentSort === 'mastery') {
      monsters.sort((a, b) => {
        const ma = getMastery(a.id);
        const mb = getMastery(b.id);
        return mb.tier.tier - ma.tier.tier || mb.kills - ma.kills;
      });
    }

    if (monsters.length === 0) {
      grid.innerHTML = `<div class="best-empty">${lang === 'pt' ? 'Nenhum monstro encontrado' : 'No monsters found'}</div>`;
      return;
    }

    grid.innerHTML = monsters.map(m => {
      const kills  = rpg.bestiary[m.id] || 0;
      const disc   = kills > 0;
      const ms     = getMastery(m.id);
      const tier   = ms.tier;
      const name   = disc ? (m.name[lang] || m.name.pt) : '???';
      const active = activeMonster === m.id;

      return `
        <div class="best-card ${disc ? '' : 'best-card-hidden'} ${active ? 'best-card-active' : ''} ${m.isBoss ? 'best-card-boss' : ''}"
             onclick="window._bestSelectMonster('${m.id}')"
             style="${disc ? 'border-color:' + tier.color + '22;' : ''}">
          ${disc && ms.isMaxed ? '<div class="best-card-maxed">★</div>' : ''}
          ${m.isBoss ? '<div class="best-card-boss-badge">BOSS</div>' : ''}

          <div class="best-card-icon" style="color:${disc ? getColorHex(m.color) : '#3f3f46'}">
            <i data-lucide="${disc ? m.icon : 'help-circle'}" style="width:26px;height:26px;"></i>
          </div>

          <div class="best-card-name">${name.length > 14 ? name.slice(0, 13) + '…' : name}</div>

          ${disc ? `
            <div class="best-card-tier" style="color:${tier.color};">${tier.label}</div>

            <div class="best-mastery-bar-wrap">
              <div class="best-mastery-bar-track">
                <div class="best-mastery-bar-fill"
                     style="width:${ms.pct}%;background:${tier.color};box-shadow:0 0 6px ${tier.glow};">
                </div>
              </div>
            </div>

            <div class="best-card-kills">${formatNumber(kills)} kills</div>
          ` : `
            <div class="best-card-tier" style="color:#3f3f46;">Desconhecido</div>
            <div class="best-mastery-bar-wrap">
              <div class="best-mastery-bar-track"><div class="best-mastery-bar-fill" style="width:0%"></div></div>
            </div>
            <div class="best-card-kills">—</div>
          `}
        </div>
      `;
    }).join('');

    try { lucide.createIcons(); } catch(e) {}
  }

  // ── Painel de detalhe do monstro ──────────────────────────────
  window._bestSelectMonster = function(id) {
    activeMonster = (activeMonster === id) ? null : id;
    renderGrid(); // atualiza active state no grid

    const detail = document.getElementById('best-detail');
    if (!detail) return;

    if (!activeMonster) {
      detail.classList.add('hidden');
      return;
    }

    const monster = getAllMonsters().find(m => m.id === id);
    if (!monster) return;

    const kills = rpg.bestiary[id] || 0;
    const disc  = kills > 0;
    const ms    = getMastery(id);
    const lang  = rpg.lang || 'pt';
    const name  = monster.name[lang] || monster.name.pt || id;

    detail.classList.remove('hidden');

    // Mapa de fraquezas
    const weakLabel = { mag:'Magia 🔥', atk:'Físico ⚔️', none:'—' };
    const weakStr   = weakLabel[monster.weak] || '—';
    const resStr    = weakLabel[monster.res]  || '—';

    // Próximos marcos
    const tiersHTML = MASTERY_TIERS.filter(t => t.tier > 0).map(t => {
      const reached = kills >= t.kills;
      return `
        <div class="best-milestone ${reached ? 'best-milestone-done' : ''}">
          <div class="best-milestone-icon" style="background:${reached ? t.color + '20' : 'rgba(0,0,0,0.4)'};border-color:${reached ? t.color + '60' : 'rgba(255,255,255,0.06)'};">
            ${reached ? '✓' : t.kills >= 1000 ? '★' : '○'}
          </div>
          <div class="best-milestone-info">
            <div class="best-milestone-label" style="color:${reached ? t.color : '#52525b'}">${t.label}</div>
            <div class="best-milestone-kills">${formatNumber(t.kills)} kills${t.reward ? ' — ' + t.reward.label : ''}</div>
          </div>
        </div>
      `;
    }).join('');

    detail.innerHTML = `
      <div class="best-detail-header">
        <div class="best-detail-icon" style="color:${getColorHex(monster.color)}; border-color:${ms.tier.color}40">
          <i data-lucide="${disc ? monster.icon : 'help-circle'}" style="width:32px;height:32px;"></i>
        </div>
        <div class="best-detail-title-block">
          <div class="best-detail-name">${disc ? name : '???'}</div>
          <div class="best-detail-tier" style="color:${ms.tier.color}">${ms.tier.label} ${monster.isBoss ? '· BOSS' : ''}</div>
        </div>
        <button onclick="window._bestSelectMonster('${id}')" class="best-detail-close">✕</button>
      </div>

      ${disc ? `
        <!-- Stats -->
        <div class="best-detail-stats">
          <div class="best-stat-mini"><span>Kills</span><strong style="color:#ef4444">${formatNumber(kills)}</strong></div>
          <div class="best-stat-mini"><span>Fraco a</span><strong style="color:#34d399">${weakStr}</strong></div>
          <div class="best-stat-mini"><span>Resiste a</span><strong style="color:#f97316">${resStr}</strong></div>
          <div class="best-stat-mini"><span>Esquiva</span><strong style="color:#00e5ff">${Math.round((monster.dodge || 0) * 100)}%</strong></div>
        </div>

        <!-- Barra de domínio grande -->
        <div class="best-detail-mastery">
          <div class="best-detail-mastery-header">
            <span style="color:${ms.tier.color};font-family:'Orbitron',sans-serif;font-size:9px;font-weight:900;letter-spacing:0.1em;">
              DOMÍNIO — ${ms.isMaxed ? 'MAX' : ms.pct.toFixed(0) + '%'}
            </span>
            ${!ms.isMaxed ? `<span style="font-size:9px;color:#71717a;font-family:'Fira Code',monospace;">${formatNumber(kills)} / ${formatNumber(ms.nextTier.kills)}</span>` : ''}
          </div>
          <div class="best-mastery-bar-track best-mastery-bar-lg">
            <div class="best-mastery-bar-fill"
                 style="width:${ms.pct}%;background:linear-gradient(90deg,${ms.tier.color},${ms.nextTier.color || ms.tier.color});box-shadow:0 0 10px ${ms.tier.glow}">
            </div>
          </div>
        </div>

        <!-- Marcos -->
        <div class="best-milestones">${tiersHTML}</div>

        <!-- Lore box -->
        <div class="best-lore-box" id="best-lore-${id}">
          <div class="best-lore-loading">
            <div class="best-lore-spinner"></div>
            <span>${lang === 'pt' ? 'Carregando lore...' : 'Loading lore...'}</span>
          </div>
        </div>
      ` : `
        <div style="text-align:center;padding:20px 0;color:#52525b;font-size:12px;">
          ${lang === 'pt' ? 'Derrota este monstro para desbloquear informações.' : 'Defeat this monster to unlock information.'}
        </div>
      `}
    `;

    try { lucide.createIcons(); } catch(e) {}

    // Carrega o lore de forma assíncrona se descoberto
    if (disc) {
      loadLoreForMonster(monster, id, lang);
    }
  };

  // ── Carrega e exibe lore ──────────────────────────────────────
  async function loadLoreForMonster(monster, id, lang) {
    const box = document.getElementById('best-lore-' + id);
    if (!box) return;

    const lore = await generateLore(monster);

    // Verifica se o painel ainda está aberto para este monstro
    if (activeMonster !== id) return;
    const currentBox = document.getElementById('best-lore-' + id);
    if (!currentBox) return;

    currentBox.innerHTML = `
      <div class="best-lore-icon">📜</div>
      <p class="best-lore-text">"${lore}"</p>
    `;
  }

  // ── Eventos ────────────────────────────────────────────────────
  function attachEvents() {
    // Filtros
    document.querySelectorAll('.best-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.best-filter-btn').forEach(b => b.classList.remove('best-filter-active'));
        btn.classList.add('best-filter-active');
        currentFilter  = btn.dataset.filter;
        activeMonster  = null;
        const detail   = document.getElementById('best-detail');
        if (detail) detail.classList.add('hidden');
        renderGrid();
      });
    });

    // Sort
    const sortSel = document.getElementById('best-sort-sel');
    if (sortSel) {
      sortSel.value = currentSort;
      sortSel.addEventListener('change', () => {
        currentSort = sortSel.value;
        renderGrid();
      });
    }
  }

  // ── Patch rpg.renderBestiary ──────────────────────────────────
  function patchRenderBestiary() {
    rpg.renderBestiary = function() {
      // Pequeno delay para o modal estar visível
      setTimeout(renderBestiaryEnhanced, 30);
    };
  }

  // ── Patch rpg.killMonster para sistema de domínio ─────────────
  function patchKillMonster() {
    const _orig = rpg.killMonster;
    if (!_orig) return;

    rpg.killMonster = function() {
      const mId        = this.monster ? this.monster.id : null;
      const killBefore = mId ? (this.bestiary[mId] || 0) : 0;

      const result = _orig.apply(this, arguments);

      if (mId) {
        const killAfter = this.bestiary[mId] || 0;
        if (killAfter > killBefore) {
          checkMasteryMilestones(mId, killBefore, killAfter);
        }
      }

      return result;
    };
  }

  // ── Helper: converte classe Tailwind de cor → hex ─────────────
  function getColorHex(colorClass) {
    const MAP = {
      'text-green-500':  '#22c55e', 'text-green-400':  '#4ade80',
      'text-orange-500': '#f97316', 'text-orange-600': '#ea580c',
      'text-red-500':    '#ef4444', 'text-red-600':    '#dc2626',
      'text-purple-400': '#c084fc', 'text-purple-300': '#d8b4fe',
      'text-cyan-500':   '#06b6d4', 'text-cyan-400':   '#22d3ee',
      'text-yellow-500': '#eab308', 'text-yellow-400': '#facc15',
      'text-yellow-300': '#fde047', 'text-yellow-200': '#fef08a',
      'text-pink-400':   '#f472b6', 'text-pink-500':   '#ec4899',
      'text-blue-300':   '#93c5fd', 'text-blue-500':   '#3b82f6',
      'text-emerald-400':'#34d399', 'text-emerald-300':'#6ee7b7',
      'text-rose-600':   '#e11d48', 'text-violet-400': '#a78bfa',
      'text-white':      '#ffffff', 'text-zinc-400':   '#a1a1aa',
    };
    return MAP[colorClass] || '#94a3b8';
  }

  // ── CSS ───────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('bestiary-enhanced-styles')) return;
    const s = document.createElement('style');
    s.id = 'bestiary-enhanced-styles';
    s.textContent = `
      /* ══ Stats row ══ */
      .best-stats-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-bottom: 12px;
      }
      .best-stat-card {
        background: rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 10px;
        padding: 10px 6px;
        text-align: center;
      }
      .best-stat-num {
        font-family: 'Orbitron', monospace;
        font-size: 18px;
        font-weight: 900;
        line-height: 1;
        margin-bottom: 4px;
      }
      .best-stat-lbl {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(148,163,184,0.7);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      /* ══ Controles ══ */
      .best-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }
      .best-filter-row {
        display: flex;
        gap: 4px;
        flex: 1;
        flex-wrap: wrap;
      }
      .best-filter-btn {
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(0,0,0,0.4);
        color: rgba(148,163,184,0.7);
        font-size: 9px;
        font-weight: 700;
        font-family: 'Orbitron', sans-serif;
        letter-spacing: 0.06em;
        cursor: pointer;
        transition: all 0.15s;
        text-transform: uppercase;
      }
      .best-filter-btn:hover { color: #fff; border-color: rgba(0,229,255,0.3); }
      .best-filter-active {
        background: rgba(0,229,255,0.1) !important;
        border-color: rgba(0,229,255,0.4) !important;
        color: #00e5ff !important;
      }
      .best-sort-sel {
        background: rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 6px;
        color: rgba(148,163,184,0.8);
        font-size: 9px;
        font-family: 'Orbitron', sans-serif;
        padding: 4px 8px;
        cursor: pointer;
        outline: none;
      }

      /* ══ Grid de cards ══ */
      .best-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        max-height: 300px;
        overflow-y: auto;
        scrollbar-width: none;
        padding-bottom: 4px;
      }
      .best-grid::-webkit-scrollbar { display: none; }

      .best-card {
        background: rgba(0,0,0,0.45);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 12px;
        padding: 10px 8px 8px;
        cursor: pointer;
        transition: all 0.18s;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        position: relative;
        min-height: 110px;
      }
      .best-card:hover { background: rgba(0,0,0,0.6); transform: translateY(-2px); }
      .best-card-hidden { opacity: 0.45; filter: grayscale(0.8); }
      .best-card-active {
        background: rgba(0,229,255,0.05) !important;
        border-color: rgba(0,229,255,0.3) !important;
        transform: translateY(-2px);
        box-shadow: 0 0 16px rgba(0,229,255,0.12);
      }
      .best-card-boss {
        background: rgba(239,68,68,0.04);
      }

      .best-card-maxed {
        position: absolute;
        top: 5px;
        right: 6px;
        font-size: 9px;
        color: #ffd60a;
        text-shadow: 0 0 8px rgba(255,214,10,0.8);
        line-height: 1;
      }
      .best-card-boss-badge {
        position: absolute;
        top: 4px;
        left: 5px;
        font-family: 'Orbitron', monospace;
        font-size: 5px;
        font-weight: 900;
        letter-spacing: 0.12em;
        color: #ef4444;
        background: rgba(239,68,68,0.12);
        border: 1px solid rgba(239,68,68,0.3);
        border-radius: 3px;
        padding: 1px 3px;
        line-height: 1.4;
      }

      .best-card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2px;
      }
      .best-card-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 9px;
        font-weight: 700;
        color: rgba(210,210,230,0.9);
        text-align: center;
        line-height: 1.2;
      }
      .best-card-tier {
        font-family: 'Fira Code', monospace;
        font-size: 7.5px;
        font-weight: 700;
        letter-spacing: 0.06em;
        line-height: 1;
      }
      .best-mastery-bar-wrap {
        width: 100%;
        padding: 0 2px;
      }
      .best-mastery-bar-track {
        width: 100%;
        height: 3px;
        background: rgba(0,0,0,0.7);
        border-radius: 99px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.04);
      }
      .best-mastery-bar-fill {
        height: 100%;
        border-radius: 99px;
        transition: width 0.5s ease;
      }
      .best-mastery-bar-lg {
        height: 5px;
      }
      .best-card-kills {
        font-family: 'Fira Code', monospace;
        font-size: 7px;
        color: rgba(148,163,184,0.6);
        line-height: 1;
      }
      .best-empty {
        grid-column: 1/-1;
        text-align: center;
        padding: 24px;
        color: rgba(82,82,91,0.8);
        font-size: 12px;
      }

      /* ══ Painel de detalhe ══ */
      .best-detail {
        margin-top: 12px;
        background: rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 14px;
        padding: 14px;
        animation: bestDetailIn 0.22s cubic-bezier(0.34, 1.3, 0.64, 1);
      }
      @keyframes bestDetailIn {
        from { opacity: 0; transform: translateY(8px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      .best-detail.hidden { display: none; }

      .best-detail-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }
      .best-detail-icon {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        border: 1px solid;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .best-detail-title-block { flex: 1; min-width: 0; }
      .best-detail-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 13px;
        font-weight: 900;
        color: #fff;
        letter-spacing: 0.04em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .best-detail-tier {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.1em;
        margin-top: 2px;
      }
      .best-detail-close {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 8px;
        color: rgba(148,163,184,0.7);
        width: 28px; height: 28px;
        font-size: 10px;
        cursor: pointer;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s;
      }
      .best-detail-close:hover { color: #fff; background: rgba(255,255,255,0.12); }

      .best-detail-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 12px;
      }
      .best-stat-mini {
        background: rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 8px;
        padding: 6px 4px;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .best-stat-mini span {
        font-family: 'Fira Code', monospace;
        font-size: 7px;
        color: rgba(148,163,184,0.6);
        letter-spacing: 0.05em;
      }
      .best-stat-mini strong {
        font-family: 'Orbitron', monospace;
        font-size: 10px;
        font-weight: 900;
      }

      .best-detail-mastery { margin-bottom: 12px; }
      .best-detail-mastery-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
      }

      /* ══ Marcos ══ */
      .best-milestones {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 12px;
      }
      .best-milestone {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 8px;
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.04);
        border-radius: 8px;
        opacity: 0.45;
        transition: all 0.2s;
      }
      .best-milestone-done {
        opacity: 1;
        border-color: rgba(255,255,255,0.08);
        background: rgba(0,0,0,0.5);
      }
      .best-milestone-icon {
        width: 22px; height: 22px;
        border-radius: 6px;
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
        flex-shrink: 0;
        font-weight: 900;
      }
      .best-milestone-info { flex: 1; min-width: 0; }
      .best-milestone-label {
        font-family: 'Orbitron', sans-serif;
        font-size: 8px;
        font-weight: 900;
        letter-spacing: 0.08em;
        line-height: 1.2;
      }
      .best-milestone-kills {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(148,163,184,0.55);
        margin-top: 1px;
      }

      /* ══ Lore box ══ */
      .best-lore-box {
        background: rgba(168,85,247,0.04);
        border: 1px solid rgba(168,85,247,0.15);
        border-radius: 10px;
        padding: 12px;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .best-lore-loading {
        display: flex;
        align-items: center;
        gap: 8px;
        color: rgba(168,85,247,0.6);
        font-family: 'Fira Code', monospace;
        font-size: 9px;
      }
      .best-lore-spinner {
        width: 12px; height: 12px;
        border: 2px solid rgba(168,85,247,0.2);
        border-top-color: rgba(168,85,247,0.7);
        border-radius: 50%;
        animation: loreSpin 0.7s linear infinite;
      }
      @keyframes loreSpin { to { transform: rotate(360deg); } }
      .best-lore-icon {
        font-size: 16px;
        opacity: 0.7;
      }
      .best-lore-text {
        font-family: 'Rajdhani', 'Georgia', serif;
        font-size: 11px;
        color: rgba(200,180,240,0.85);
        line-height: 1.6;
        text-align: center;
        font-style: italic;
        margin: 0;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    patchRenderBestiary();
    patchKillMonster();
    console.log('[BestiaryEnhancedModule] OK — domínio, marcos, lore API');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.renderBestiary && rpg.killMonster) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }

  waitForRpg(init);
})();
