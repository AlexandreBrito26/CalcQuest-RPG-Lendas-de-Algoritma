// ═══════════════════════════════════════════════════════════════
// MODULE: alchemy-system.js  —  ALQUIMIA DE POÇÕES
// ─────────────────────────────────────────────────────────────
// • Ingredientes caem de monstros por região/bioma
// • 8 receitas base + 3 secretas descobertas ao explorar
// • Interface de caldeirão com drag & drop de ingredientes
// • Poções especiais com efeitos únicos (além da cura normal)
// • Integra com craft-modal existente (nova aba "Alquimia")
// • Ingredientes guardados no save
// ═══════════════════════════════════════════════════════════════
(function AlchemySystem() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. INGREDIENTES — por bioma
  // ══════════════════════════════════════════════════════════════
  const INGREDIENTS = {
    // ── Ruínas / Medievais ──────────────────────────────────
    'erva_cinza':    { id:'erva_cinza',    icon:'🌿', name:{pt:'Erva Cinzenta',   en:'Grey Herb'},      biomes:['medieval','ruins'],   rarity:0.35, desc:{pt:'Cresce entre pedras antigas.',en:'Grows among ancient stones.'} },
    'pedra_caos':    { id:'pedra_caos',    icon:'🪨', name:{pt:'Pedra do Caos',    en:'Chaos Stone'},    biomes:['medieval','cave'],    rarity:0.20, desc:{pt:'Fragmento de boss derrotado.',en:'Fragment of a defeated boss.'} },
    // ── Pântano ─────────────────────────────────────────────
    'veneno_verde':  { id:'veneno_verde',  icon:'☠️', name:{pt:'Veneno Verde',     en:'Green Venom'},    biomes:['swamp'],              rarity:0.30, desc:{pt:'Tóxico mas útil em doses certas.',en:'Toxic but useful in right doses.'} },
    'fungo_sombrio': { id:'fungo_sombrio', icon:'🍄', name:{pt:'Fungo Sombrio',    en:'Dark Fungus'},    biomes:['swamp','cave'],       rarity:0.25, desc:{pt:'Cresce onde a luz não chega.',en:'Grows where light cannot reach.'} },
    // ── Floresta ─────────────────────────────────────────────
    'seiva_antiga':  { id:'seiva_antiga',  icon:'🌱', name:{pt:'Seiva Antiga',     en:'Ancient Sap'},    biomes:['forest'],             rarity:0.28, desc:{pt:'Memória de árvores centenárias.',en:'Memory of century-old trees.'} },
    'pena_fada':     { id:'pena_fada',     icon:'🪶', name:{pt:'Pena de Fada',     en:'Fairy Feather'},  biomes:['forest','astral'],    rarity:0.15, desc:{pt:'Cai quando uma fada passa.',en:'Falls when a fairy passes.'} },
    // ── Vulcão ───────────────────────────────────────────────
    'cinza_vulcao':  { id:'cinza_vulcao',  icon:'🔥', name:{pt:'Cinza do Vulcão',  en:'Volcano Ash'},    biomes:['volcano'],            rarity:0.30, desc:{pt:'Calor preservado em forma sólida.',en:'Heat preserved in solid form.'} },
    'cristal_fogo':  { id:'cristal_fogo',  icon:'💎', name:{pt:'Cristal de Fogo',  en:'Fire Crystal'},   biomes:['volcano','storm'],    rarity:0.12, desc:{pt:'Nasce na lava mais profunda.',en:'Born in the deepest lava.'} },
    // ── Tundra / Gelo ────────────────────────────────────────
    'gelo_eterno':   { id:'gelo_eterno',   icon:'❄️', name:{pt:'Gelo Eterno',      en:'Eternal Ice'},    biomes:['tundra'],             rarity:0.28, desc:{pt:'Nunca derrete, mesmo no calor.',en:'Never melts, even in heat.'} },
    'cristal_gelo':  { id:'cristal_gelo',  icon:'🔷', name:{pt:'Cristal de Gelo',  en:'Ice Crystal'},    biomes:['tundra','cave'],      rarity:0.14, desc:{pt:'Puro como o código primordial.',en:'Pure as primordial code.'} },
    // ── Astral / Plano ───────────────────────────────────────
    'poeira_astral': { id:'poeira_astral', icon:'✨', name:{pt:'Poeira Astral',    en:'Astral Dust'},    biomes:['astral','cyber'],     rarity:0.20, desc:{pt:'Deixada por entidades dimensionais.',en:'Left by dimensional entities.'} },
    'eco_vazio':     { id:'eco_vazio',     icon:'🌀', name:{pt:'Eco do Vazio',     en:'Void Echo'},      biomes:['astral','void'],      rarity:0.10, desc:{pt:'Um fragmento de nada.',en:'A fragment of nothing.'} },
    // ── Deserto ──────────────────────────────────────────────
    'areia_dados':   { id:'areia_dados',   icon:'⏳', name:{pt:'Areia de Dados',   en:'Data Sand'},      biomes:['desert'],             rarity:0.32, desc:{pt:'Informação perdida em forma de areia.',en:'Lost information in sand form.'} },
    'osso_digital':  { id:'osso_digital',  icon:'🦴', name:{pt:'Osso Digital',     en:'Digital Bone'},   biomes:['desert','cave'],      rarity:0.18, desc:{pt:'Restos de um ser que foi dados.',en:'Remains of a being that was data.'} },
    // ── Universal (boss drops) ───────────────────────────────
    'essencia_boss': { id:'essencia_boss', icon:'👑', name:{pt:'Essência de Boss', en:'Boss Essence'},   biomes:['boss'],               rarity:0.60, desc:{pt:'Condensado do poder de um guardião.',en:'Condensed power of a guardian.'} },
    'memoria_codigo':{ id:'memoria_codigo',icon:'💾', name:{pt:'Memória de Código',en:'Code Memory'},    biomes:['cyber','boss'],       rarity:0.08, desc:{pt:'Fragmento da estrutura do universo.',en:'Fragment of the universe\'s structure.'} },
  };

  // ══════════════════════════════════════════════════════════════
  // 2. RECEITAS
  // ══════════════════════════════════════════════════════════════
  const RECIPES = [
    // ── Básicas ─────────────────────────────────────────────
    {
      id:'p_regen', secret:false, icon:'💚',
      name:{pt:'Poção de Regeneração',  en:'Regeneration Potion'},
      desc:{pt:'Cura 60% HP ao longo de 3 turnos (+20% por turno)',en:'Heals 60% HP over 3 turns (+20%/turn)'},
      ingredients:['erva_cinza','seiva_antiga'],
      qty:2,
      effect: s => {
        s._regenTurns = (s._regenTurns||0) + 3;
        showToast('💚 Regeneração ativada! +20% HP por turno', 2500);
      }
    },
    {
      id:'p_power', secret:false, icon:'⚔️',
      name:{pt:'Elixir de Poder',        en:'Power Elixir'},
      desc:{pt:'+40% ATK durante 5 turnos',en:'+40% ATK for 5 turns'},
      ingredients:['cinza_vulcao','pedra_caos'],
      qty:2,
      effect: s => {
        s._powerTurns = (s._powerTurns||0) + 5;
        showToast('⚔️ Poder ativado! +40% ATK por 5 turnos', 2500);
      }
    },
    {
      id:'p_antidote', secret:false, icon:'💜',
      name:{pt:'Antídoto Total',         en:'Full Antidote'},
      desc:{pt:'Remove todos os debuffs e cura 25% HP',en:'Removes all debuffs and heals 25% HP'},
      ingredients:['veneno_verde','fungo_sombrio'],
      qty:2,
      effect: s => {
        s.statusEffects = [];
        const h = Math.floor(s.getMaxHp() * 0.25);
        s.heroHp = Math.min(s.getMaxHp(), s.heroHp + h);
        s.updateHpBars && s.updateHpBars();
        s.showDamage && s.showDamage(`💜 +${formatNumber(h)}`, 'heal');
        showToast('💜 Antídoto! Todos os debuffs removidos', 2500);
      }
    },
    {
      id:'p_shield', secret:false, icon:'🛡️',
      name:{pt:'Poção de Escudo',        en:'Shield Potion'},
      desc:{pt:'Absorve o próximo ataque recebido',en:'Absorbs the next incoming attack'},
      ingredients:['gelo_eterno','pedra_caos'],
      qty:2,
      effect: s => {
        s._shieldActive = true;
        showToast('🛡️ Escudo ativo! Próximo ataque absorvido', 2500);
      }
    },
    {
      id:'p_speed', secret:false, icon:'⚡',
      name:{pt:'Poção de Celeridade',    en:'Speed Potion'},
      desc:{pt:'Dobra a velocidade de recarga por 4 turnos',en:'Doubles reload speed for 4 turns'},
      ingredients:['poeira_astral','areia_dados'],
      qty:2,
      effect: s => {
        s._speedTurns = (s._speedTurns||0) + 4;
        showToast('⚡ Celeridade! Cooldowns 2× mais rápidos por 4 turnos', 2500);
      }
    },
    {
      id:'p_gold', secret:false, icon:'💰',
      name:{pt:'Elixir da Fortuna',      en:'Fortune Elixir'},
      desc:{pt:'+100% Ouro nas próximas 10 mortes de monstros',en:'+100% Gold for next 10 monster kills'},
      ingredients:['areia_dados','seiva_antiga'],
      qty:2,
      effect: s => {
        s._fortuneKills = (s._fortuneKills||0) + 10;
        showToast('💰 Fortuna! Próximas 10 mortes dão +100% Ouro', 2500);
      }
    },
    {
      id:'p_crit', secret:false, icon:'🎯',
      name:{pt:'Elixir do Crítico',      en:'Critical Elixir'},
      desc:{pt:'+35% chance de crítico por 6 turnos',en:'+35% crit chance for 6 turns'},
      ingredients:['cristal_fogo','pena_fada'],
      qty:2,
      effect: s => {
        s._critTurns = (s._critTurns||0) + 6;
        showToast('🎯 Crítico! +35% crit chance por 6 turnos', 2500);
      }
    },
    {
      id:'p_full', secret:false, icon:'✨',
      name:{pt:'Grande Elixir',          en:'Grand Elixir'},
      desc:{pt:'Cura 100% HP e dá +3 poções normais',en:'Full HP heal and +3 normal potions'},
      ingredients:['erva_cinza','seiva_antiga','poeira_astral'],
      qty:1,
      effect: s => {
        s.heroHp = s.getMaxHp();
        s.potions += 3;
        s.updateHpBars && s.updateHpBars();
        showToast('✨ Grande Elixir! HP cheio + 3 Poções', 3000);
      }
    },
    // ── Secretas ────────────────────────────────────────────
    {
      id:'p_void', secret:true, icon:'🌀',
      name:{pt:'Essência do Vazio',      en:'Void Essence'},
      desc:{pt:'Mata o monstro instantaneamente (não funciona em boss)',en:'Instantly kills the monster (not on boss)'},
      ingredients:['eco_vazio','memoria_codigo','essencia_boss'],
      qty:1,
      hint:{pt:'Combina fragmentos do além...',en:'Combine fragments from beyond...'},
      effect: s => {
        if (s.inCombat && s.monster && !s.isBossFight) {
          s.monster.hp = 0;
          s.killMonster && s.killMonster();
          showToast('🌀 Essência do Vazio! Monstro eliminado instantaneamente!', 3000);
        } else {
          showToast('🌀 Não funciona em Boss!', 2000);
          // Devolve ingredientes
          const r = getRpg();
          addIngredient('eco_vazio', 1);
          addIngredient('memoria_codigo', 1);
          addIngredient('essencia_boss', 1);
        }
      }
    },
    {
      id:'p_berserker', secret:true, icon:'💀',
      name:{pt:'Poção Berserk',          en:'Berserk Potion'},
      desc:{pt:'Fúria instantânea a 100% + ATK ×3 por 3 turnos (você e o monstro)',en:'Instant 100% Fury + ATK ×3 for 3 turns (you and monster)'},
      ingredients:['cristal_fogo','veneno_verde','essencia_boss'],
      qty:1,
      hint:{pt:'Mistura o que queima com o que envenena...',en:'Mix what burns with what poisons...'},
      effect: s => {
        s.fury = 100;
        s.addFury && s.addFury(0);
        s._berserkTurns = 3;
        showToast('💀 BERSERK! Fúria máxima + ATK ×3!', 3000);
      }
    },
    {
      id:'p_eternal', secret:true, icon:'♾️',
      name:{pt:'Elixir Eterno',          en:'Eternal Elixir'},
      desc:{pt:'+50% todos os stats permanentemente (só 1 vez por ciclo)',en:'+50% all stats permanently (once per cycle)'},
      ingredients:['memoria_codigo','pena_fada','eco_vazio','cristal_gelo'],
      qty:1,
      hint:{pt:'Quatro elementos, uma verdade...',en:'Four elements, one truth...'},
      effect: s => {
        const key = 'rpg_eternal_elixir_used';
        if (localStorage.getItem(key)) {
          showToast('♾️ Já usaste o Elixir Eterno neste ciclo!', 3000);
          return;
        }
        s.permAllBonus = (s.permAllBonus||0) + 0.50;
        localStorage.setItem(key, '1');
        showToast('♾️ ELIXIR ETERNO! +50% todos os stats permanentemente!', 5000);
        s.save && s.save();
      }
    },
  ];

  // ══════════════════════════════════════════════════════════════
  // 3. ESTADO — ingredientes guardados no localStorage
  // ══════════════════════════════════════════════════════════════
  const SAVE_KEY = 'rpg_alchemy_ingredients';
  const DISC_KEY = 'rpg_alchemy_discovered'; // receitas secretas descobertas

  function loadIngredients() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || '{}'); } catch(e) { return {}; }
  }
  function saveIngredients(inv) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(inv));
  }
  function loadDiscovered() {
    try { return JSON.parse(localStorage.getItem(DISC_KEY) || '[]'); } catch(e) { return []; }
  }
  function saveDiscovered(d) {
    localStorage.setItem(DISC_KEY, JSON.stringify(d));
  }

  function addIngredient(id, qty) {
    const inv = loadIngredients();
    inv[id] = (inv[id] || 0) + qty;
    saveIngredients(inv);
  }
  function getIngredientCount(id) {
    return loadIngredients()[id] || 0;
  }

  function getRpg() { return (typeof rpg !== 'undefined') ? rpg : null; }

  // ══════════════════════════════════════════════════════════════
  // 4. DROP DE INGREDIENTES (hook em killMonster)
  // ══════════════════════════════════════════════════════════════
  const BIOME_MAP = {
    't_ruins':       ['medieval','ruins'],
    't_swamp':       ['swamp'],
    't_forest':      ['forest'],
    't_cave':        ['cave'],
    't_volcano':     ['volcano'],
    't_underground': ['tundra','cyber'],
    't_astral':      ['astral','storm'],
  };

  function getCurrentBiome() {
    const r = getRpg();
    if (!r) return ['medieval'];
    const theme = r.eqTheme || 't_ruins';
    return BIOME_MAP[theme] || ['medieval'];
  }

  function rollIngredientDrop(isBoss) {
    const biomes = getCurrentBiome();
    const pool = Object.values(INGREDIENTS).filter(ing => {
      if (isBoss) return ing.biomes.includes('boss') || Math.random() < 0.3;
      return ing.biomes.some(b => biomes.includes(b));
    });
    if (!pool.length) return null;

    const dropped = [];
    pool.forEach(ing => {
      const chance = isBoss ? Math.min(ing.rarity * 2, 0.9) : ing.rarity;
      if (Math.random() < chance) {
        const qty = isBoss ? (Math.random() < 0.3 ? 2 : 1) : 1;
        dropped.push({ ing, qty });
      }
    });
    return dropped.length ? dropped : null;
  }

  function patchKillMonster() {
    const r = getRpg();
    if (!r || !r.killMonster) return;
    const _orig = r.killMonster.bind(r);
    r.killMonster = function() {
      const result = _orig.call(this);
      // Drop de ingredientes (10% chance em mob normal, 70% em boss)
      const dropChance = this.isBossFight ? 0.70 : 0.10;
      if (Math.random() < dropChance) {
        const drops = rollIngredientDrop(this.isBossFight);
        if (drops && drops.length) {
          drops.forEach(({ ing, qty }) => {
            addIngredient(ing.id, qty);
          });
          // Mostra o primeiro drop (não sobrecarregar a tela)
          const main = drops[0];
          const lang = this.lang || 'pt';
          showToast(`${main.ing.icon} +${drops.reduce((a,d)=>a+d.qty,0)} Ingrediente${drops.length>1?'s':''} (Alquimia)`, 1800);
          // Atualiza badge
          updateAlchemyBadge();
          // Verifica se descobriu receita secreta
          checkSecretDiscovery();
        }
      }
      return result;
    };
    console.log('[AlchemySystem] killMonster patched — drops ativos');
  }

  // ══════════════════════════════════════════════════════════════
  // 5. VERIFICAÇÃO DE RECEITAS SECRETAS
  // ══════════════════════════════════════════════════════════════
  function checkSecretDiscovery() {
    const inv  = loadIngredients();
    const disc = loadDiscovered();
    const r    = getRpg();
    const lang = r?.lang || 'pt';

    RECIPES.filter(rec => rec.secret && !disc.includes(rec.id)).forEach(rec => {
      // Descobre se tiver pelo menos 1 de cada ingrediente
      const hasAll = rec.ingredients.every(id => (inv[id] || 0) >= 1);
      if (hasAll) {
        disc.push(rec.id);
        saveDiscovered(disc);
        showToast(`🔬 Receita Secreta Descoberta: ${rec.name[lang]}!`, 4000);
      }
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 6. CRAFT DE POÇÃO
  // ══════════════════════════════════════════════════════════════
  function craftPotion(recipeId) {
    const r = getRpg();
    if (!r) return;

    const recipe = RECIPES.find(rec => rec.id === recipeId);
    if (!recipe) return;

    // Verifica descoberta (secretas)
    if (recipe.secret) {
      const disc = loadDiscovered();
      if (!disc.includes(recipe.id)) {
        showToast('🔒 Receita ainda não descoberta!', 2000);
        return;
      }
    }

    // Verifica ingredientes
    const inv = loadIngredients();
    const missing = recipe.ingredients.filter(id => (inv[id] || 0) < 1);
    if (missing.length) {
      const lang = r.lang || 'pt';
      const names = missing.map(id => INGREDIENTS[id]?.name[lang] || id).join(', ');
      showToast(`❌ Falta: ${names}`, 3000);
      return;
    }

    // Confirma se não está em batalha
    if (r.inCombat) {
      showToast('⚗️ Não podes alquimiar durante batalha!', 2000);
      return;
    }

    // Consome ingredientes
    recipe.ingredients.forEach(id => { inv[id] = Math.max(0, (inv[id]||0) - 1); });
    saveIngredients(inv);

    // Adiciona às poções de alquimia (separado das poções normais)
    const alchPotions = loadAlchPotions();
    alchPotions.push({ id: recipeId, uses: recipe.qty });
    saveAlchPotions(alchPotions);

    const lang = r.lang || 'pt';
    showToast(`⚗️ ${recipe.name[lang]} criada! (${recipe.qty}×)`, 3000);

    renderAlchemy(); // Atualiza UI
    updateAlchemyBadge();
  }

  // ══════════════════════════════════════════════════════════════
  // 7. USAR POÇÃO DE ALQUIMIA
  // ══════════════════════════════════════════════════════════════
  const ALCH_KEY = 'rpg_alch_potions';

  function loadAlchPotions() {
    try { return JSON.parse(localStorage.getItem(ALCH_KEY) || '[]'); } catch(e) { return []; }
  }
  function saveAlchPotions(p) { localStorage.setItem(ALCH_KEY, JSON.stringify(p)); }

  window.useAlchPotion = function(recipeId) {
    const r = getRpg();
    if (!r || !r.inCombat) { showToast('Entra em batalha primeiro!', 2000); return; }

    const potions = loadAlchPotions();
    const idx = potions.findIndex(p => p.id === recipeId);
    if (idx === -1) { showToast('Poção não encontrada!', 2000); return; }

    const recipe = RECIPES.find(rec => rec.id === recipeId);
    if (!recipe) return;

    // Aplica efeito
    recipe.effect(r);
    r.updateHpBars && r.updateHpBars();

    // Decrementa usos
    potions[idx].uses--;
    if (potions[idx].uses <= 0) potions.splice(idx, 1);
    saveAlchPotions(potions);
    renderBattleAlchBar(); // Atualiza barra de batalha
  };

  window.craftPotion = craftPotion;

  // ══════════════════════════════════════════════════════════════
  // 8. EFEITOS PASSIVOS (hooks em combate)
  // ══════════════════════════════════════════════════════════════
  function applyPassiveEffects() {
    const r = getRpg();
    if (!r) return;

    // Hook em dealDamageToHero para escudo e regen
    const _origDmgHero = r.executeMonsterAttack || r.monsterAttack;
    if (_origDmgHero && !r._alchMonsterAttackHooked) {
      r._alchMonsterAttackHooked = true;
      const fn = r.executeMonsterAttack ? 'executeMonsterAttack' : 'monsterAttack';
      const _o = r[fn].bind(r);
      r[fn] = function() {
        // Escudo absorve
        if (r._shieldActive) {
          r._shieldActive = false;
          r.showDamage && r.showDamage('🛡️ ABSORVIDO!', 'dodge');
          return;
        }
        _o.call(this);
        // Regen após dano
        if ((r._regenTurns||0) > 0) {
          r._regenTurns--;
          const heal = Math.floor(r.getMaxHp() * 0.20);
          r.heroHp = Math.min(r.getMaxHp(), r.heroHp + heal);
          r.showDamage && r.showDamage(`💚 +${formatNumber(heal)}`, 'heal');
          r.updateHpBars && r.updateHpBars();
        }
      };
    }

    // Hook em getAtk para power/berserk turns
    if (!r._alchAtkHooked) {
      r._alchAtkHooked = true;
      const _origAtk = r.getAtk.bind(r);
      r.getAtk = function() {
        let base = _origAtk.call(this);
        if ((this._powerTurns||0) > 0) base = Math.floor(base * 1.40);
        if ((this._berserkTurns||0) > 0) base = Math.floor(base * 3.0);
        return base;
      };
    }

    // Hook em getCritChance para crit turns
    if (!r._alchCritHooked) {
      r._alchCritHooked = true;
      const _origCrit = r.getCritChance.bind(r);
      r.getCritChance = function() {
        let base = _origCrit.call(this);
        if ((this._critTurns||0) > 0) base = Math.min(0.95, base + 0.35);
        return base;
      };
    }

    // Hook em killMonster para fortune gold
    const _origKill2 = r.killMonster.bind(r);
    if (!r._alchFortuneHooked) {
      r._alchFortuneHooked = true;
      const _ok = r.killMonster.bind(r);
      r.killMonster = function() {
        if ((r._fortuneKills||0) > 0) {
          const goldBefore = r.gold || 0;
          const res = _ok.call(this);
          const gained = (r.gold||0) - goldBefore;
          if (gained > 0) { r.gold = goldBefore + Math.floor(gained * 2); }
          r._fortuneKills--;
          return res;
        }
        return _ok.call(this);
      };
    }

    // Tick dos turns por ataque do herói
    const _origUseSkill = r.useSkill.bind(r);
    if (!r._alchTurnHooked) {
      r._alchTurnHooked = true;
      r.useSkill = function(id) {
        const res = _origUseSkill.call(this, id);
        if (id === 'atk' || id === 'mag') {
          if ((this._powerTurns||0) > 0)   this._powerTurns--;
          if ((this._critTurns||0) > 0)    this._critTurns--;
          if ((this._berserkTurns||0) > 0) this._berserkTurns--;
          if ((this._speedTurns||0) > 0) {
            this._speedTurns--;
            // Cooldown reduzido — zera todos os cooldowns imediatamente
            Object.values(this.skills||{}).forEach(s => { s.timer = false; });
            document.querySelectorAll('[id^="cd-"]').forEach(el => { el.style.width = '0%'; });
            document.querySelectorAll('[id^="btn-atk"],[id^="btn-mag"],[id^="btn-def"],[id^="btn-heal"]').forEach(b => { b.disabled = false; });
          }
        }
        return res;
      };
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 9. UI — MODAL DE ALQUIMIA
  // ══════════════════════════════════════════════════════════════
  function injectCSS() {
    if (document.getElementById('alchemy-css')) return;
    const s = document.createElement('style');
    s.id = 'alchemy-css';
    s.textContent = `
      /* ── Abas do Craft Modal ── */
      #craft-tabs {
        display: flex; gap: 4px; margin-bottom: 12px; padding: 4px;
        background: rgba(0,0,0,0.4); border-radius: 10px;
      }
      .craft-tab-btn {
        flex: 1; padding: 6px; border-radius: 8px; border: none;
        font-family: 'Orbitron', monospace; font-size: 8px; font-weight: 900;
        letter-spacing: 0.08em; text-transform: uppercase;
        cursor: pointer; transition: all 0.15s; touch-action: manipulation;
        background: transparent; color: rgba(148,163,184,0.6);
      }
      .craft-tab-btn.active {
        background: rgba(0,229,255,0.12); color: #00e5ff;
        border: 1px solid rgba(0,229,255,0.3);
      }

      /* ── Ingredientes ── */
      .alch-ing-grid {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 12px;
      }
      .alch-ing-card {
        background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.07);
        border-radius: 8px; padding: 6px 4px; text-align: center;
        position: relative;
      }
      .alch-ing-card.has-items { border-color: rgba(0,229,255,0.25); }
      .alch-ing-icon { font-size: 18px; line-height: 1; margin-bottom: 2px; }
      .alch-ing-name {
        font-family: 'Orbitron', monospace; font-size: 6px; font-weight: 700;
        color: rgba(148,163,184,0.7); line-height: 1.2;
      }
      .alch-ing-qty {
        position: absolute; top: 3px; right: 4px;
        font-family: 'Orbitron', monospace; font-size: 7px; font-weight: 900;
        color: #00e5ff;
      }

      /* ── Receitas ── */
      .alch-recipe-card {
        background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.07);
        border-radius: 10px; padding: 10px 12px; margin-bottom: 7px;
        display: flex; align-items: center; gap: 10px;
      }
      .alch-recipe-card.can-craft { border-color: rgba(0,229,255,0.3); background: rgba(0,229,255,0.04); }
      .alch-recipe-card.secret-locked { opacity: 0.4; filter: blur(1px); }
      .alch-recipe-icon { font-size: 22px; flex-shrink: 0; }
      .alch-recipe-info { flex: 1; min-width: 0; }
      .alch-recipe-name {
        font-family: 'Orbitron', monospace; font-size: 9px; font-weight: 700;
        color: #e2e8f0; margin-bottom: 3px;
      }
      .alch-recipe-desc { font-size: 8.5px; color: rgba(148,163,184,0.65); line-height: 1.4; }
      .alch-recipe-ings {
        display: flex; flex-wrap: wrap; gap: 3px; margin-top: 4px;
      }
      .alch-ing-tag {
        font-size: 7px; padding: 1px 5px; border-radius: 4px;
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(148,163,184,0.6);
      }
      .alch-ing-tag.has { border-color: rgba(52,211,153,0.4); color: #34d399; }
      .alch-ing-tag.missing { border-color: rgba(239,68,68,0.3); color: #f87171; }
      .alch-craft-btn {
        font-family: 'Orbitron', monospace; font-size: 7px; font-weight: 900;
        letter-spacing: 0.08em; padding: 6px 10px; border-radius: 7px;
        border: 1px solid rgba(0,229,255,0.35); color: #00e5ff;
        background: rgba(0,229,255,0.1); cursor: pointer;
        touch-action: manipulation; flex-shrink: 0; transition: all 0.12s;
      }
      .alch-craft-btn:disabled { opacity: 0.35; cursor: not-allowed; }
      .alch-craft-btn:not(:disabled):active { transform: scale(0.93); }

      /* ── Poções crafted ── */
      .alch-potion-bar {
        display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 6px;
      }
      .alch-potion-pill {
        display: flex; align-items: center; gap: 4px;
        background: rgba(0,0,0,0.5); border: 1px solid rgba(168,85,247,0.3);
        border-radius: 8px; padding: 4px 8px; cursor: pointer;
        touch-action: manipulation; transition: background 0.12s;
      }
      .alch-potion-pill:active { background: rgba(168,85,247,0.15); }
      .alch-potion-pill-icon { font-size: 12px; }
      .alch-potion-pill-name {
        font-family: 'Orbitron', monospace; font-size: 7px; font-weight: 700;
        color: #c084fc;
      }
      .alch-potion-pill-qty {
        font-size: 7px; color: rgba(148,163,184,0.6);
      }

      /* ── Badge no botão Craft ── */
      #craft-alchemy-badge {
        position: absolute; top: -4px; right: -4px;
        width: 14px; height: 14px; background: #a855f7;
        border-radius: 50%; font-size: 8px; font-weight: 900; color: #fff;
        display: flex; align-items: center; justify-content: center;
        border: 1.5px solid rgba(8,8,18,0.9);
        animation: alchBadgePulse 1.5s ease-in-out infinite;
      }
      @keyframes alchBadgePulse { 0%,100%{transform:scale(1);}50%{transform:scale(1.2);} }

      /* ── Barra de batalha de poções alquímicas ── */
      #alch-battle-bar {
        display: flex; flex-wrap: wrap; gap: 4px;
        padding: 4px 0; margin-bottom: 4px;
      }
      .alch-battle-pill {
        display: flex; align-items: center; gap: 3px;
        background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.35);
        border-radius: 7px; padding: 3px 7px; cursor: pointer;
        font-family: 'Orbitron', monospace; font-size: 7px; font-weight: 700; color: #c084fc;
        touch-action: manipulation; transition: background 0.1s;
      }
      .alch-battle-pill:active { background: rgba(168,85,247,0.3); }
    `;
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════
  // 10. RENDER DO MODAL
  // ══════════════════════════════════════════════════════════════
  let _activeTab = 'craft'; // 'craft' | 'ingredients' | 'potions'

  function renderAlchemy() {
    const el = document.getElementById('craft-body');
    if (!el) return;

    const r   = getRpg();
    const lang = r?.lang || 'pt';
    const inv  = loadIngredients();
    const disc = loadDiscovered();
    const alchPots = loadAlchPotions();
    const totalIngs = Object.values(inv).reduce((a,b)=>a+b,0);

    el.innerHTML = `
      <!-- Tabs -->
      <div id="craft-tabs">
        <button class="craft-tab-btn ${_activeTab==='craft'?'active':''}" onclick="window._alchTab('craft')">⚗️ Receitas</button>
        <button class="craft-tab-btn ${_activeTab==='ingredients'?'active':''}" onclick="window._alchTab('ingredients')">🌿 Ingredientes (${totalIngs})</button>
        <button class="craft-tab-btn ${_activeTab==='potions'?'active':''}" onclick="window._alchTab('potions')">🧪 Criadas (${alchPots.length})</button>
      </div>

      <div id="alch-tab-content"></div>
    `;

    renderTab(_activeTab, lang, inv, disc, alchPots);
  }

  window._alchTab = function(tab) {
    _activeTab = tab;
    const r = getRpg();
    renderAlchemy();
  };

  function renderTab(tab, lang, inv, disc, alchPots) {
    const el = document.getElementById('alch-tab-content');
    if (!el) return;

    if (tab === 'ingredients') {
      renderIngredients(el, lang, inv);
    } else if (tab === 'potions') {
      renderPotions(el, lang, alchPots);
    } else {
      renderRecipes(el, lang, inv, disc);
    }
  }

  function renderIngredients(el, lang, inv) {
    const ings = Object.values(INGREDIENTS);
    const owned = ings.filter(i => (inv[i.id]||0) > 0);
    const empty = ings.filter(i => !(inv[i.id]||0));

    let html = '';
    if (owned.length) {
      html += `<div style="font-family:'Orbitron',monospace;font-size:7px;color:rgba(148,163,184,0.4);letter-spacing:0.15em;margin-bottom:6px;">DISPONÍVEIS</div>`;
      html += '<div class="alch-ing-grid">';
      owned.forEach(ing => {
        html += `
          <div class="alch-ing-card has-items">
            <div class="alch-ing-qty">${inv[ing.id]||0}</div>
            <div class="alch-ing-icon">${ing.icon}</div>
            <div class="alch-ing-name">${ing.name[lang]||ing.name.pt}</div>
          </div>`;
      });
      html += '</div>';
    }
    if (empty.length) {
      html += `<div style="font-family:'Orbitron',monospace;font-size:7px;color:rgba(148,163,184,0.25);letter-spacing:0.15em;margin-bottom:6px;margin-top:8px;">AINDA NÃO ENCONTRADOS</div>`;
      html += '<div class="alch-ing-grid">';
      empty.forEach(ing => {
        html += `
          <div class="alch-ing-card" style="opacity:0.3;">
            <div class="alch-ing-icon" style="filter:grayscale(1);">?</div>
            <div class="alch-ing-name">${ing.name[lang]||ing.name.pt}</div>
          </div>`;
      });
      html += '</div>';
    }
    if (!owned.length) {
      html = `<div style="text-align:center;padding:24px;font-family:'Fira Code',monospace;font-size:9px;color:rgba(148,163,184,0.35);">
        Sem ingredientes ainda.<br>
        <span style="font-size:8px;opacity:0.7;">Derrota monstros para recolher!</span>
      </div>`;
    }
    el.innerHTML = html;
  }

  function renderRecipes(el, lang, inv, disc) {
    const normal = RECIPES.filter(r => !r.secret);
    const secret = RECIPES.filter(r => r.secret);

    let html = `<div style="font-family:'Fira Code',monospace;font-size:8px;color:rgba(148,163,184,0.45);margin-bottom:8px;text-align:center;">
      Mata monstros para recolher ingredientes por região 🌍
    </div>`;

    normal.forEach(rec => html += buildRecipeCard(rec, lang, inv));

    html += `<div style="font-family:'Orbitron',monospace;font-size:7px;color:rgba(168,85,247,0.5);letter-spacing:0.15em;margin:10px 0 6px;">🔬 RECEITAS SECRETAS</div>`;
    secret.forEach(rec => {
      if (disc.includes(rec.id)) {
        html += buildRecipeCard(rec, lang, inv);
      } else {
        html += `
          <div class="alch-recipe-card secret-locked">
            <div class="alch-recipe-icon">🔒</div>
            <div class="alch-recipe-info">
              <div class="alch-recipe-name">Receita Desconhecida</div>
              <div class="alch-recipe-desc">${rec.hint?.[lang]||'Recolhe ingredientes especiais...'}</div>
            </div>
          </div>`;
      }
    });
    el.innerHTML = html;
  }

  function buildRecipeCard(rec, lang, inv) {
    const canCraft = rec.ingredients.every(id => (inv[id]||0) >= 1);
    return `
      <div class="alch-recipe-card ${canCraft?'can-craft':''}">
        <div class="alch-recipe-icon">${rec.icon}</div>
        <div class="alch-recipe-info">
          <div class="alch-recipe-name">${rec.name[lang]||rec.name.pt}</div>
          <div class="alch-recipe-desc">${rec.desc[lang]||rec.desc.pt}</div>
          <div class="alch-recipe-ings">
            ${rec.ingredients.map(id => {
              const ing = INGREDIENTS[id];
              const has = (inv[id]||0) >= 1;
              return `<span class="alch-ing-tag ${has?'has':'missing'}">${ing?ing.icon:'?'} ${ing?ing.name[lang]:'?'} (${inv[id]||0})</span>`;
            }).join('')}
          </div>
        </div>
        <button class="alch-craft-btn" ${canCraft?'':'disabled'} onclick="craftPotion('${rec.id}')">
          CRIAR<br><span style="font-size:6px;opacity:0.8;">${rec.qty}×</span>
        </button>
      </div>`;
  }

  function renderPotions(el, lang, alchPots) {
    if (!alchPots.length) {
      el.innerHTML = `<div style="text-align:center;padding:24px;font-family:'Fira Code',monospace;font-size:9px;color:rgba(148,163,184,0.35);">
        Sem poções alquímicas.<br>
        <span style="font-size:8px;opacity:0.7;">Cria na aba Receitas!</span>
      </div>`;
      return;
    }

    let html = `<div style="font-family:'Fira Code',monospace;font-size:8px;color:rgba(148,163,184,0.45);margin-bottom:8px;">
      Usa em batalha tocando no botão da poção
    </div>`;

    // Agrupa por tipo
    const grouped = {};
    alchPots.forEach(p => { grouped[p.id] = (grouped[p.id]||0) + p.uses; });

    Object.entries(grouped).forEach(([id, uses]) => {
      const rec = RECIPES.find(r => r.id === id);
      if (!rec) return;
      html += `
        <div class="alch-recipe-card can-craft" style="cursor:pointer;" onclick="useAlchPotion('${id}')">
          <div class="alch-recipe-icon">${rec.icon}</div>
          <div class="alch-recipe-info">
            <div class="alch-recipe-name">${rec.name[lang]||rec.name.pt} ×${uses}</div>
            <div class="alch-recipe-desc">${rec.desc[lang]||rec.desc.pt}</div>
          </div>
          <button class="alch-craft-btn" onclick="event.stopPropagation();useAlchPotion('${id}')">USAR</button>
        </div>`;
    });

    el.innerHTML = html;
  }

  // ══════════════════════════════════════════════════════════════
  // 11. BARRA DE BATALHA COM POÇÕES ALQUÍMICAS
  // ══════════════════════════════════════════════════════════════
  function injectBattleAlchBar() {
    // Injeta abaixo do shield-bar na batalha
    const target = document.querySelector('#view-battle .flex.items-center.justify-between.mb-1');
    if (!target || document.getElementById('alch-battle-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'alch-battle-bar';
    target.parentNode.insertBefore(bar, target);
    renderBattleAlchBar();
  }

  function renderBattleAlchBar() {
    const bar = document.getElementById('alch-battle-bar');
    if (!bar) return;
    const r = getRpg();
    const lang = r?.lang || 'pt';
    const alchPots = loadAlchPotions();

    if (!alchPots.length) { bar.innerHTML = ''; return; }

    const grouped = {};
    alchPots.forEach(p => { grouped[p.id] = (grouped[p.id]||0) + p.uses; });

    bar.innerHTML = Object.entries(grouped).map(([id, uses]) => {
      const rec = RECIPES.find(r => r.id === id);
      if (!rec) return '';
      return `<div class="alch-battle-pill" onclick="useAlchPotion('${id}')">
        <span>${rec.icon}</span>
        <span>${rec.name[lang]?.split(' ')[0]||rec.id} ×${uses}</span>
      </div>`;
    }).join('');
  }

  // ══════════════════════════════════════════════════════════════
  // 12. BADGE NO BOTÃO CRAFT DO MENU
  // ══════════════════════════════════════════════════════════════
  function updateAlchemyBadge() {
    const totalIngs = Object.values(loadIngredients()).reduce((a,b)=>a+b,0);
    const alchPots  = loadAlchPotions().length;

    // Adiciona badge no botão Craft do menu
    const craftBtns = document.querySelectorAll('[onclick="openCraft()"]');
    craftBtns.forEach(btn => {
      let badge = btn.querySelector('#craft-alchemy-badge');
      if (totalIngs > 0 || alchPots > 0) {
        if (!badge) {
          badge = document.createElement('div');
          badge.id = 'craft-alchemy-badge';
          btn.style.position = 'relative';
          btn.appendChild(badge);
        }
        badge.textContent = totalIngs + alchPots;
      } else {
        badge?.remove();
      }
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 13. PATCH openCraft — usa aba Alquimia
  // ══════════════════════════════════════════════════════════════
  function patchOpenCraft() {
    window.openCraft = function() {
      renderAlchemy();
      const modal = document.getElementById('craft-modal');
      if (modal) modal.classList.add('active');
      try { lucide.createIcons(); } catch(e) {}
    };
  }

  // ══════════════════════════════════════════════════════════════
  // 14. INIT
  // ══════════════════════════════════════════════════════════════
  function init() {
    injectCSS();
    patchKillMonster();
    applyPassiveEffects();
    patchOpenCraft();

    setTimeout(() => {
      injectBattleAlchBar();
      updateAlchemyBadge();
    }, 800);

    // Atualiza barra de batalha ao entrar em batalha
    const r = getRpg();
    if (r && r.startBattle) {
      const _sb = r.startBattle.bind(r);
      r.startBattle = function(isBoss) {
        _sb.call(this, isBoss);
        setTimeout(renderBattleAlchBar, 400);
      };
    }

    console.log('[AlchemySystem] ✅ OK — ' + Object.keys(INGREDIENTS).length + ' ingredientes | ' + RECIPES.length + ' receitas');
  }

  function waitForRpg(n) {
    if (typeof rpg !== 'undefined' && rpg.killMonster && rpg.getAtk) {
      setTimeout(init, 200);
    } else if ((n||0) < 50) {
      setTimeout(() => waitForRpg((n||0)+1), 200);
    } else {
      injectCSS(); patchOpenCraft();
      console.warn('[AlchemySystem] rpg não disponível');
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => waitForRpg(0))
    : waitForRpg(0);

})();
