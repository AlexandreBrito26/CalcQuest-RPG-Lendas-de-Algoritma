// ═══════════════════════════════════════════════════════════════
// MODULE: class-synergy.js  —  SINERGIAS DE CLASSES NG+
// ─────────────────────────────────────────────────────────────
// Como funciona:
//   1. Ao completar a campanha (todos os bosses), a classe atual
//      é registada em rpg_class_history no localStorage.
//   2. Quando o jogador tem ≥2 classes diferentes registadas,
//      as sinergias correspondentes ficam desbloqueadas.
//   3. Cada sinergia é uma skill passiva que se aplica por cima
//      da skill ativa já existente — sem substituí-la.
//   4. As sinergias são aplicadas via patch em getAtk, getMaxHp,
//      dealDamageToMonster e useClassSkill (mesma abordagem dos
//      outros módulos do projeto).
//   5. O modal é acessível no menu de NG+ e no perfil.
// ═══════════════════════════════════════════════════════════════
(function ClassSynergyModule() {
  'use strict';

  const HISTORY_KEY  = 'rpg_class_history';   // array de class ids jogadas até ao fim
  const UNLOCKED_KEY = 'rpg_synergies';        // array de synergy ids desbloqueadas

  // ── Tabela de sinergias ──────────────────────────────────────
  // key: [classA, classB] em ordem alfabética (sempre ordenar ao consultar)
  // passive: aplicado continuamente via patch em getAtk/getMaxHp
  // onKill:  chamado em killMonster
  // onSkill: chamado no fim de useClassSkill
  // onHit:   chamado em dealDamageToMonster (recebe dmg, retorna dmg modificado)
  const SYNERGIES = [
    {
      id: 'mage_warrior',
      classes: ['warrior', 'mage'],
      name: { pt: 'Espadachim Arcano',   en: 'Arcane Bladesman' },
      icon: 'flame',
      color: '#f97316',
      desc: {
        pt: 'Ataques físicos ganham +25% do teu ATK mágico. Skill de classe causa Queimado.',
        en: 'Physical attacks gain +25% of your magic ATK. Class skill inflicts Burn.',
      },
      lore: {
        pt: 'Quando a espada aprendeu a arder, o inimigo deixou de ter onde fugir.',
        en: 'When the blade learned to burn, the enemy had nowhere left to run.',
      },
      passive: s => {
        s._synergyAtkBonus = (s._synergyAtkBonus || 0);
      },
      onHit: (s, dmg, type) => {
        if (type === 'atk') return Math.floor(dmg * 1.25);
        return dmg;
      },
      onSkill: s => {
        if (s.monster && Math.random() < 0.6) s.applyStatus('burn');
      },
    },

    {
      id: 'rogue_warrior',
      classes: ['rogue', 'warrior'],
      name: { pt: 'Executor Sombrio',    en: 'Shadow Executioner' },
      icon: 'scissors',
      color: '#a855f7',
      desc: {
        pt: 'Críticos também aplicam Sangramento. Após esquivar, próximo ataque é sempre crítico.',
        en: 'Crits also apply Bleed. After dodging, next attack is always a crit.',
      },
      lore: {
        pt: 'Golpear nas sombras não é covardia — é eficiência.',
        en: 'Striking from shadows is not cowardice — it is efficiency.',
      },
      onHit: (s, dmg, type, isCrit) => {
        if (isCrit && s.monster) {
          setTimeout(() => s.applyStatus && s.applyStatus('bleed'), 100);
        }
        return dmg;
      },
      onDodge: s => {
        s._synergyNextCrit = true;
      },
      modCrit: s => {
        if (s._synergyNextCrit) { s._synergyNextCrit = false; return 1.0; }
        return null;
      },
    },

    {
      id: 'paladin_warrior',
      classes: ['paladin', 'warrior'],
      name: { pt: 'Guardião Inabalável', en: 'Unbreakable Guardian' },
      icon: 'shield',
      color: '#3b82f6',
      desc: {
        pt: '+20% HP máximo. Ao ativar a skill, cura 8% do HP máximo.',
        en: '+20% max HP. Activating the class skill also heals 8% max HP.',
      },
      lore: {
        pt: 'A força sem resistência é efémera. A resistência com força é eterna.',
        en: 'Strength without endurance is fleeting. Endurance with strength is eternal.',
      },
      hpMult: 1.20,
      onSkill: s => {
        const heal = Math.floor(s.getMaxHp() * 0.08);
        s.heroHp = Math.min(s.getMaxHp(), s.heroHp + heal);
        s.showDamage(`✨ +${formatNumber(heal)}`, 'heal');
      },
    },

    {
      id: 'mage_rogue',
      classes: ['mage', 'rogue'],
      name: { pt: 'Ilusionista Letal',   en: 'Lethal Illusionist' },
      icon: 'sparkles',
      color: '#00e5ff',
      desc: {
        pt: '+10% esquiva. Magia tem 30% de chance de aplicar Congelado.',
        en: '+10% dodge. Magic has 30% chance to apply Frozen.',
      },
      lore: {
        pt: 'O mago que aprende a desaparecer torna-se indistinguível da morte.',
        en: 'The mage who learns to vanish becomes indistinguishable from death.',
      },
      dodgeBonus: 0.10,
      onHit: (s, dmg, type) => {
        if (type === 'mag' && s.monster && Math.random() < 0.30) {
          setTimeout(() => s.applyStatus && s.applyStatus('freeze'), 150);
        }
        return dmg;
      },
    },

    {
      id: 'mage_paladin',
      classes: ['mage', 'paladin'],
      name: { pt: 'Arauto Sagrado',       en: 'Sacred Herald' },
      icon: 'sun',
      color: '#ffd60a',
      desc: {
        pt: 'Skill de classe cura +15% HP adicional. Magia tem elemento "sagrado" (ignora resistências).',
        en: 'Class skill heals +15% HP extra. Magic uses "holy" element (ignores resistances).',
      },
      lore: {
        pt: 'Quando a luz aprendeu a queimar, até a escuridão teve medo.',
        en: 'When light learned to burn, even darkness feared it.',
      },
      onSkill: s => {
        const heal = Math.floor(s.getMaxHp() * 0.15);
        s.heroHp = Math.min(s.getMaxHp(), s.heroHp + heal);
        s.showDamage(`✨ +${formatNumber(heal)}`, 'heal');
      },
      onHit: (s, dmg, type) => {
        // Magia ignora resistências (trata como neutro)
        if (type === 'mag') return Math.floor(dmg * 1.10);
        return dmg;
      },
    },

    {
      id: 'paladin_rogue',
      classes: ['paladin', 'rogue'],
      name: { pt: 'Cavaleiro Phantom',    en: 'Phantom Knight' },
      icon: 'eye-off',
      color: '#34d399',
      desc: {
        pt: '+12% esquiva. Ao esquivar, 25% de chance de contra-atacar com 150% ATK.',
        en: '+12% dodge. On dodge, 25% chance to counter-attack at 150% ATK.',
      },
      lore: {
        pt: 'Um cavaleiro que ninguém vê não é um cavaleiro — é um fantasma com armadura.',
        en: 'A knight nobody sees is not a knight — it is a ghost in armour.',
      },
      dodgeBonus: 0.12,
      onDodge: s => {
        if (s.monster && Math.random() < 0.25) {
          const dmg = Math.floor(s.getAtk() * 1.5);
          setTimeout(() => {
            if (!s.monster) return;
            s.dealDamageToMonster(dmg, 'atk', false);
            s.showDamage('⚡ Contra!', 'crit');
          }, 200);
        }
      },
    },
  ];

  // ─────────────────────────────────────────────────────────────
  // UTILS
  // ─────────────────────────────────────────────────────────────
  function getSynergyKey(a, b) {
    return [a, b].sort().join('_');
  }

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
  }

  function saveHistory(arr) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
  }

  function getUnlocked() {
    try { return JSON.parse(localStorage.getItem(UNLOCKED_KEY) || '[]'); } catch { return []; }
  }

  function saveUnlocked(arr) {
    localStorage.setItem(UNLOCKED_KEY, JSON.stringify(arr));
  }

  function getSynergyById(id) {
    return SYNERGIES.find(s => s.id === id) || null;
  }

  // Retorna as sinergias desbloqueadas para as classes em `history`
  function computeUnlocked(history) {
    const unlocked = [];
    for (let i = 0; i < history.length; i++) {
      for (let j = i + 1; j < history.length; j++) {
        const key = getSynergyKey(history[i], history[j]);
        const syn = SYNERGIES.find(s => s.id === key);
        if (syn && !unlocked.includes(syn.id)) unlocked.push(syn.id);
      }
    }
    return unlocked;
  }

  // Sinergias activas agora (classe actual + histórico)
  function getActiveSynergies() {
    if (typeof rpg === 'undefined') return [];
    const unlocked = getUnlocked();
    const current  = rpg.eqClass;
    return SYNERGIES.filter(s =>
      unlocked.includes(s.id) && s.classes.includes(current)
    );
  }

  function lang() {
    return (typeof rpg !== 'undefined' && rpg.lang) ? rpg.lang : 'pt';
  }

  function showToastSafe(msg, dur) {
    if (typeof showToast === 'function') showToast(msg, dur || 3000);
  }

  // ─────────────────────────────────────────────────────────────
  // 1. REGISTO DA CLASSE AO COMPLETAR A CAMPANHA
  // ─────────────────────────────────────────────────────────────
  function hookKillMonster() {
    const _orig = rpg.killMonster;
    rpg.killMonster = function() {
      const result = _orig ? _orig.apply(this, arguments) : undefined;

      // Verifica se acabou de completar todos os bosses
      const total = (this.actBosses || []).length;
      if (this.bossKills >= total && total > 0) {
        registerCurrentClass();
      }

      return result;
    };
  }

  function registerCurrentClass() {
    if (typeof rpg === 'undefined') return;
    const cls = rpg.eqClass;
    if (!cls) return;

    const history = getHistory();
    if (history.includes(cls)) return; // já registada

    history.push(cls);
    saveHistory(history);

    // Recalcula sinergias desbloqueadas
    const newUnlocked = computeUnlocked(history);
    const previouslyUnlocked = getUnlocked();
    const genuinelyNew = newUnlocked.filter(id => !previouslyUnlocked.includes(id));

    saveUnlocked(newUnlocked);

    // Notifica sobre novas sinergias
    genuinelyNew.forEach(id => {
      const syn = getSynergyById(id);
      if (!syn) return;
      const name = syn.name[lang()] || syn.name.pt;
      setTimeout(() => {
        showToastSafe(`🔗 Sinergia desbloqueada: ${name}!`, 5000);
      }, 1500);
    });

    if (genuinelyNew.length > 0) {
      console.log('[ClassSynergy] Novas sinergias desbloqueadas:', genuinelyNew);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 2. PATCHES NOS SISTEMAS DE COMBATE
  // ─────────────────────────────────────────────────────────────

  // 2a. getAtk — aplica bónus de ATK das sinergias
  function patchGetAtk() {
    const _orig = rpg.getAtk;
    rpg.getAtk = function() {
      let atk = _orig ? _orig.apply(this, arguments) : (this.atk || 10);
      // Sem bónus de ATK directo nas sinergias actuais — reservado para futuro
      return atk;
    };
  }

  // 2b. getMaxHp — aplica multiplicadores de HP
  function patchGetMaxHp() {
    const _orig = rpg.getMaxHp;
    rpg.getMaxHp = function() {
      let hp = _orig ? _orig.apply(this, arguments) : (this.heroHp || 100);
      const active = getActiveSynergies();
      for (const syn of active) {
        if (syn.hpMult) hp = Math.floor(hp * syn.hpMult);
      }
      return hp;
    };
  }

  // 2c. dealDamageToMonster — onHit de cada sinergia
  function patchDealDamage() {
    const _orig = rpg.dealDamageToMonster;
    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      // Aplica modificadores de dano das sinergias
      let dmg = baseDmg;
      const active = getActiveSynergies();
      for (const syn of active) {
        if (syn.onHit) dmg = syn.onHit(this, dmg, atkType, isUltimate);
      }
      return _orig ? _orig.call(this, dmg, atkType, isUltimate) : undefined;
    };
  }

  // 2d. useClassSkill — onSkill de cada sinergia (após a skill original)
  function patchClassSkill() {
    const _orig = rpg.useClassSkill;
    rpg.useClassSkill = function() {
      const result = _orig ? _orig.apply(this, arguments) : undefined;
      const active = getActiveSynergies();
      setTimeout(() => {
        for (const syn of active) {
          if (syn.onSkill) syn.onSkill(this);
        }
      }, 500); // após os efeitos da skill original
      return result;
    };
  }

  // 2e. Patch na esquiva — hook em takeDamage ou no loop de combate
  function patchDodgeHook() {
    // Monitoriza o evento de esquiva: o rpg chama showDamage('Esquivou!', 'dodge')
    // Fazemos override de showDamage para detectar dodges
    const _origShowDamage = rpg.showDamage;
    rpg.showDamage = function(text, type) {
      if (type === 'dodge' || type === 'monster-dodge') {
        const active = getActiveSynergies();
        for (const syn of active) {
          if (syn.onDodge) syn.onDodge(this);
        }
      }
      return _origShowDamage ? _origShowDamage.apply(this, arguments) : undefined;
    };
  }

  // 2f. Esquiva: modifica addCrit dinamicamente para o "próximo crit garantido"
  function patchCritCheck() {
    // Intercept antes do roll de crit no loop de combate
    // O rpg usa Math.random() < (this.getCrit()) para calcular crits
    // Patchamos getCrit para devolver 1.0 quando _synergyNextCrit === true
    const _origGetCrit = rpg.getCrit;
    if (!_origGetCrit) return;
    rpg.getCrit = function() {
      const active = getActiveSynergies();
      for (const syn of active) {
        if (syn.modCrit) {
          const override = syn.modCrit(this);
          if (override !== null && override !== undefined) return override;
        }
      }
      // Aplica bónus de esquiva das sinergias no addDodge
      return _origGetCrit.apply(this, arguments);
    };
  }

  // 2g. getDodge — aplica dodgeBonus das sinergias
  function patchGetDodge() {
    const _origGetDodge = rpg.getDodge;
    if (!_origGetDodge) return;
    rpg.getDodge = function() {
      let dodge = _origGetDodge.apply(this, arguments);
      const active = getActiveSynergies();
      for (const syn of active) {
        if (syn.dodgeBonus) dodge += syn.dodgeBonus;
      }
      return Math.min(dodge, 0.85); // tecto de 85%
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 3. MODAL DE SINERGIAS
  // ─────────────────────────────────────────────────────────────
  window.openClassSynergy = function() {
    let modal = document.getElementById('class-synergy-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'class-synergy-modal';
      modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
      modal.style.zIndex = '500';
      document.body.appendChild(modal);
    }

    const history   = getHistory();
    const unlocked  = getUnlocked();
    const active    = getActiveSynergies();
    const l         = lang();

    // Nomes legíveis das classes
    const classNames = {
      warrior: { pt: 'Guerreiro', en: 'Warrior' },
      mage:    { pt: 'Mago',      en: 'Mage'    },
      rogue:   { pt: 'Assassino', en: 'Rogue'   },
      paladin: { pt: 'Cavaleiro', en: 'Paladin' },
    };

    function clsName(id) {
      return classNames[id] ? (classNames[id][l] || classNames[id].pt) : id;
    }

    // Constrói os cards de sinergias
    const allSynCards = SYNERGIES.map(syn => {
      const isUnlocked = unlocked.includes(syn.id);
      const isActive   = active.some(a => a.id === syn.id);
      const [c1, c2]   = syn.classes;
      const h1 = history.includes(c1);
      const h2 = history.includes(c2);
      const name = syn.name[l] || syn.name.pt;
      const desc = syn.desc[l] || syn.desc.pt;
      const lore = syn.lore[l] || syn.lore.pt;

      return `
        <div class="syn-card ${isUnlocked ? 'syn-unlocked' : 'syn-locked'} ${isActive ? 'syn-active' : ''}"
             style="${isUnlocked ? `border-color:${syn.color}44;` : ''}
                    ${isActive   ? `background:${syn.color}11;box-shadow:0 0 12px ${syn.color}22;` : ''}">
          <div class="syn-card-top">
            <div class="syn-icon" style="color:${isUnlocked ? syn.color : '#44445a'}">
              <i data-lucide="${syn.icon}" style="width:18px;height:18px;"></i>
            </div>
            <div class="syn-info">
              <div class="syn-name" style="${isUnlocked ? `color:${syn.color}` : 'color:#44445a'}">${isUnlocked ? name : '???'}</div>
              <div class="syn-classes">
                <span class="syn-cls ${h1 ? 'syn-cls-done' : ''}">${clsName(c1)}</span>
                <span class="syn-cls-plus">+</span>
                <span class="syn-cls ${h2 ? 'syn-cls-done' : ''}">${clsName(c2)}</span>
              </div>
            </div>
            ${isActive ? `<span class="syn-badge-active">ATIVA</span>` : ''}
            ${isUnlocked && !isActive ? `<span class="syn-badge-ready">PRONTA</span>` : ''}
          </div>
          ${isUnlocked ? `
            <div class="syn-desc">${desc}</div>
            <div class="syn-lore">"${lore}"</div>
          ` : `
            <div class="syn-desc syn-desc-locked">
              Completa a campanha como ${clsName(c1)} e ${clsName(c2)}
              ${!h1 && !h2 ? '' : !h1 ? `(falta ${clsName(c1)})` : `(falta ${clsName(c2)})`}
            </div>
          `}
        </div>
      `;
    }).join('');

    // Classes já completadas
    const historyBadges = history.length > 0
      ? history.map(cls => `<span class="syn-hist-badge">${clsName(cls)}</span>`).join('')
      : `<span style="color:rgba(150,150,170,0.5);font-size:9px;">Nenhuma campanha completa ainda</span>`;

    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/95 w-11/12 max-w-md rounded-2xl p-5 shadow-2xl"
           style="max-height:90vh;display:flex;flex-direction:column;">
        <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-3" style="flex-shrink:0;">
          <h2 style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:900;
                     color:#fff;letter-spacing:0.1em;text-transform:uppercase;
                     display:flex;align-items:center;gap:8px;">
            <i data-lucide="link-2" style="width:16px;height:16px;color:#00e5ff;"></i>
            Sinergias de Classe
          </h2>
          <button onclick="closeModal('class-synergy-modal')"
                  class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">
            <i data-lucide="x" style="width:14px;height:14px;"></i>
          </button>
        </div>

        <!-- Classes completadas -->
        <div style="flex-shrink:0;margin-bottom:12px;">
          <p style="font-family:'Orbitron',sans-serif;font-size:7px;font-weight:900;
                    color:rgba(0,229,255,0.6);letter-spacing:0.12em;
                    text-transform:uppercase;margin-bottom:6px;">
            Campanhas Completas
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:5px;">${historyBadges}</div>
        </div>

        <!-- Cards de sinergias -->
        <div class="hide-scrollbar" style="overflow-y:auto;flex:1;padding-right:4px;padding-bottom:8px;">
          <p style="font-family:'Orbitron',sans-serif;font-size:7px;font-weight:900;
                    color:rgba(150,150,170,0.5);letter-spacing:0.12em;
                    text-transform:uppercase;margin-bottom:8px;">
            ${unlocked.length} / ${SYNERGIES.length} desbloqueadas
            ${active.length > 0 ? ` · ${active.length} ativa(s) agora` : ''}
          </p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${allSynCards}
          </div>
        </div>
      </div>
    `;

    injectSynergyStyles();
    modal.classList.add('active');
    try { lucide.createIcons(); } catch(e) {}
  };

  // ─────────────────────────────────────────────────────────────
  // 4. INDICADOR NO HUD DE COMBATE
  // ─────────────────────────────────────────────────────────────
  function injectCombatIndicator() {
    // Adiciona um indicador discreto abaixo do HUD quando há sinergia ativa
    const check = setInterval(() => {
      const arena = document.getElementById('arena-container');
      if (!arena || document.getElementById('syn-combat-indicator')) return;

      const indicator = document.createElement('div');
      indicator.id = 'syn-combat-indicator';
      indicator.style.cssText = `
        display: none;
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(0,229,255,0.7);
        text-align: center;
        padding: 2px 0;
        letter-spacing: 0.06em;
      `;
      arena.appendChild(indicator);
      clearInterval(check);
    }, 500);

    // Atualiza o indicador ao entrar em combate
    const _origStart = rpg.startBattle;
    if (_origStart) {
      rpg.startBattle = function() {
        const result = _origStart.apply(this, arguments);
        setTimeout(updateCombatIndicator, 200);
        return result;
      };
    }
  }

  function updateCombatIndicator() {
    const el = document.getElementById('syn-combat-indicator');
    if (!el) return;
    const active = getActiveSynergies();
    if (active.length === 0) { el.style.display = 'none'; return; }
    const l = lang();
    const names = active.map(s => s.name[l] || s.name.pt).join(' · ');
    el.textContent = `🔗 ${names}`;
    el.style.display = 'block';
  }

  // ─────────────────────────────────────────────────────────────
  // 5. BOTÃO NO MENU / NG+
  // ─────────────────────────────────────────────────────────────
  function addMenuButton() {
    const check = setInterval(() => {
      // Tenta adicionar ao accordion de NG+
      const ngAcc = document.getElementById('acc-ngplus') ||
                    document.querySelector('[id*="ngplus"]') ||
                    document.querySelector('[id*="ng-plus"]');
      if (!ngAcc) return;
      if (document.getElementById('syn-menu-pill')) { clearInterval(check); return; }

      const pill = document.createElement('button');
      pill.id = 'syn-menu-pill';
      pill.onclick = window.openClassSynergy;
      pill.className = 'sub-pill';
      pill.style.cssText = 'border-color:rgba(0,229,255,0.35);color:#00e5ff;';
      pill.innerHTML = `<i data-lucide="link-2" class="w-3 h-3"></i><span>Sinergias</span>`;
      ngAcc.appendChild(pill);
      try { lucide.createIcons(); } catch(e) {}
      clearInterval(check);
    }, 700);
  }

  // ─────────────────────────────────────────────────────────────
  // 6. HOOK NO NG+ — preservar histórico entre ciclos
  // ─────────────────────────────────────────────────────────────
  function hookNgTransition() {
    // O ng-plus-v2.js usa localStorage diretamente na transição.
    // Basta garantir que as nossas keys estão na lista de "keep".
    // Interceptamos startNewGamePlus para injetar as nossas keys.
    const _orig = rpg.startNewGamePlus;
    rpg.startNewGamePlus = function() {
      // Salva os nossos dados antes do localStorage.clear()
      const histBackup     = localStorage.getItem(HISTORY_KEY)  || '[]';
      const unlockedBackup = localStorage.getItem(UNLOCKED_KEY) || '[]';

      // Chama o original (que faz localStorage.clear())
      const result = _orig ? _orig.apply(this, arguments) : undefined;

      // Restaura as nossas keys (se o .clear() já correu neste tick,
      // o setTimeout garante que corremos após o reload)
      setTimeout(() => {
        if (!localStorage.getItem(HISTORY_KEY)) {
          localStorage.setItem(HISTORY_KEY,  histBackup);
          localStorage.setItem(UNLOCKED_KEY, unlockedBackup);
        }
      }, 100);

      return result;
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 7. CSS
  // ─────────────────────────────────────────────────────────────
  function injectSynergyStyles() {
    if (document.getElementById('class-synergy-styles')) return;
    const s = document.createElement('style');
    s.id = 'class-synergy-styles';
    s.textContent = `
      .syn-card {
        background: rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 12px;
        padding: 12px 12px 10px;
        transition: all 0.15s;
      }
      .syn-card:hover { background: rgba(0,0,0,0.55); }
      .syn-card-top {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 7px;
      }
      .syn-icon {
        width: 32px; height: 32px;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        background: rgba(0,0,0,0.4);
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.06);
      }
      .syn-info { flex: 1; min-width: 0; }
      .syn-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 9px; font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 3px;
      }
      .syn-classes {
        display: flex; align-items: center; gap: 4px;
      }
      .syn-cls {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(150,150,170,0.6);
        padding: 1px 5px;
        background: rgba(0,0,0,0.4);
        border-radius: 4px;
        border: 1px solid rgba(255,255,255,0.06);
      }
      .syn-cls-done {
        color: #34d399;
        border-color: rgba(52,211,153,0.3);
        background: rgba(52,211,153,0.07);
      }
      .syn-cls-plus {
        font-size: 9px;
        color: rgba(150,150,170,0.4);
      }
      .syn-badge-active {
        font-family: 'Orbitron', sans-serif;
        font-size: 7px; font-weight: 900;
        letter-spacing: 0.1em;
        color: #00e5ff;
        background: rgba(0,229,255,0.1);
        border: 1px solid rgba(0,229,255,0.3);
        border-radius: 4px;
        padding: 2px 6px;
        flex-shrink: 0;
      }
      .syn-badge-ready {
        font-family: 'Orbitron', sans-serif;
        font-size: 7px; font-weight: 900;
        letter-spacing: 0.1em;
        color: #34d399;
        background: rgba(52,211,153,0.1);
        border: 1px solid rgba(52,211,153,0.25);
        border-radius: 4px;
        padding: 2px 6px;
        flex-shrink: 0;
      }
      .syn-desc {
        font-family: 'Rajdhani', sans-serif;
        font-size: 10px;
        color: rgba(200,200,220,0.85);
        line-height: 1.5;
        margin-bottom: 5px;
      }
      .syn-desc-locked {
        color: rgba(100,100,120,0.7);
        font-style: italic;
      }
      .syn-lore {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(150,150,170,0.5);
        font-style: italic;
        line-height: 1.5;
        border-left: 2px solid rgba(255,255,255,0.06);
        padding-left: 8px;
      }
      .syn-hist-badge {
        font-family: 'Orbitron', sans-serif;
        font-size: 8px; font-weight: 900;
        letter-spacing: 0.06em;
        padding: 3px 8px;
        border-radius: 6px;
        background: rgba(0,229,255,0.08);
        border: 1px solid rgba(0,229,255,0.2);
        color: #00e5ff;
        text-transform: uppercase;
      }
    `;
    document.head.appendChild(s);
  }

  // ─────────────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────────────
  function init() {
    hookKillMonster();
    patchGetAtk();
    patchGetMaxHp();
    patchDealDamage();
    patchClassSkill();
    patchDodgeHook();
    patchCritCheck();
    patchGetDodge();
    hookNgTransition();
    injectCombatIndicator();
    addMenuButton();

    // Aplica sinergias passivas imediatamente (ex: HP bonus)
    // forçando recalculo do HP actual se necessário
    const active = getActiveSynergies();
    if (active.length > 0 && rpg.heroHp > 0) {
      const newMax = rpg.getMaxHp();
      if (rpg.heroHp > newMax) rpg.heroHp = newMax;
    }

    console.log(
      '[ClassSynergy] OK —',
      getHistory().length, 'classes no histórico,',
      getUnlocked().length, 'sinergias desbloqueadas,',
      getActiveSynergies().length, 'ativas agora'
    );
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.killMonster && rpg.getAtk && rpg.getMaxHp) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
    else console.warn('[ClassSynergy] rpg não encontrado após timeout.');
  }

  waitForRpg(init);

})();
