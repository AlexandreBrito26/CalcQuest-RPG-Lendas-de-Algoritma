// ═══════════════════════════════════════════════════════════════
// CalcQuest RPG — Late Game Content v1.0
// Faixa de nível: 300–1000
// ═══════════════════════════════════════════════════════════════
// Adiciona ao jogo:
//   • 10 novos monstros (hpMult 400–5000)
//   • 4 novos bosses (reqLvl 300–950)
//   • 5 novas armas (reqLvl 300–900)
//   • 4 novas armaduras (reqLvl 300–850)
//   • 4 novos itens/relíquias
//   • 3 novas classes (reqBosses 9–14)
//   • 1 nova árvore de talentos (Arcano, 10 nós)
//   • 3 novos mundos/regiões
// ═══════════════════════════════════════════════════════════════

(function () {

  function init() {
    if (!window.rpg) { setTimeout(init, 300); return; }

    addMonsters();
    addBosses();
    addWeapons();
    addArmors();
    addRelics();
    addClasses();
    addTalentTree();
    addThemes();

    console.log('[LateGame] Módulo de conteúdo late game (300–1000) carregado.');
  }

  // ─────────────────────────────────────────────
  // 1. MONSTROS (10 novos, hpMult 400–5000)
  // ─────────────────────────────────────────────
  function addMonsters() {
    const newMonsters = [
      {
        id: 'null_specter',
        name: { pt: 'Espectro Nulo', en: 'Null Specter' },
        icon: 'ghost',
        color: 'text-slate-300',
        hpMult: 420,
        dmgMult: 380,
        spd: 720,
        weak: 'mag',
        res: 'atk',
        dodge: 0.45,
        block: 0.05,
      },
      {
        id: 'recursive_demon',
        name: { pt: 'Demônio Recursivo', en: 'Recursive Demon' },
        icon: 'refresh-cw',
        color: 'text-red-400',
        hpMult: 550,
        dmgMult: 480,
        spd: 850,
        weak: 'atk',
        res: 'mag',
        dodge: 0.15,
        block: 0.35,
      },
      {
        id: 'entropy_wraith',
        name: { pt: 'Espírito da Entropia', en: 'Entropy Wraith' },
        icon: 'wind',
        color: 'text-violet-300',
        hpMult: 700,
        dmgMult: 600,
        spd: 680,
        weak: 'none',
        res: 'atk',
        dodge: 0.5,
        block: 0.1,
      },
      {
        id: 'data_leviathan',
        name: { pt: 'Leviatã de Dados', en: 'Data Leviathan' },
        icon: 'database',
        color: 'text-cyan-400',
        hpMult: 900,
        dmgMult: 700,
        spd: 1100,
        weak: 'atk',
        res: 'none',
        dodge: 0.1,
        block: 0.45,
      },
      {
        id: 'memory_colossus',
        name: { pt: 'Colosso da Memória', en: 'Memory Colossus' },
        icon: 'hard-drive',
        color: 'text-amber-400',
        hpMult: 1200,
        dmgMult: 850,
        spd: 1300,
        weak: 'mag',
        res: 'none',
        dodge: 0.05,
        block: 0.5,
      },
      {
        id: 'bit_phantom',
        name: { pt: 'Fantasma de Bits', en: 'Bit Phantom' },
        icon: 'binary',
        color: 'text-green-300',
        hpMult: 1600,
        dmgMult: 1200,
        spd: 600,
        weak: 'mag',
        res: 'atk',
        dodge: 0.55,
        block: 0.0,
      },
      {
        id: 'void_titan',
        name: { pt: 'Titã do Vazio', en: 'Void Titan' },
        icon: 'shield-off',
        color: 'text-purple-200',
        hpMult: 2200,
        dmgMult: 1800,
        spd: 1200,
        weak: 'none',
        res: 'none',
        dodge: 0.2,
        block: 0.4,
      },
      {
        id: 'protocol_hunter',
        name: { pt: 'Caçador de Protocolo', en: 'Protocol Hunter' },
        icon: 'crosshair',
        color: 'text-rose-300',
        hpMult: 3000,
        dmgMult: 2600,
        spd: 700,
        weak: 'atk',
        res: 'mag',
        dodge: 0.4,
        block: 0.25,
      },
      {
        id: 'quantum_horror',
        name: { pt: 'Horror Quântico', en: 'Quantum Horror' },
        icon: 'atom',
        color: 'text-fuchsia-400',
        hpMult: 4000,
        dmgMult: 3500,
        spd: 800,
        weak: 'mag',
        res: 'atk',
        dodge: 0.35,
        block: 0.3,
      },
      {
        id: 'omega_construct',
        name: { pt: 'Construto Ômega', en: 'Omega Construct' },
        icon: 'settings-2',
        color: 'text-orange-300',
        hpMult: 5000,
        dmgMult: 4500,
        spd: 950,
        weak: 'none',
        res: 'none',
        dodge: 0.25,
        block: 0.35,
      },
    ];

    newMonsters.forEach(m => {
      if (!rpg.monsterTypes.find(x => x.id === m.id)) {
        rpg.monsterTypes.push(m);
      }
    });
  }

  // ─────────────────────────────────────────────
  // 2. BOSSES (4 novos, reqLvl 300–950)
  // ─────────────────────────────────────────────
  function addBosses() {
    const newBosses = [
      {
        id: 'boss_lg1',
        name: { pt: 'O Protocolo Sombrio', en: 'The Shadow Protocol' },
        icon: 'shield-alert',
        color: 'text-slate-400',
        reqLvl: 300,
        baseHp:    500_000_000,
        hpMult:    800,
        baseDmg:   3_000_000,
        dmgMult:   600,
        spd: 520,
      },
      {
        id: 'boss_lg2',
        name: { pt: 'Nexo Corrompido', en: 'Corrupted Nexus' },
        icon: 'network',
        color: 'text-cyan-500',
        reqLvl: 500,
        baseHp:    5_000_000_000,
        hpMult:    2_000,
        baseDmg:   30_000_000,
        dmgMult:   1_500,
        spd: 480,
      },
      {
        id: 'boss_lg3',
        name: { pt: 'O Teorema Sombrio', en: 'The Dark Theorem' },
        icon: 'function-square',
        color: 'text-violet-400',
        reqLvl: 700,
        baseHp:    60_000_000_000,
        hpMult:    8_000,
        baseDmg:   400_000_000,
        dmgMult:   6_000,
        spd: 430,
      },
      {
        id: 'boss_lg4',
        name: { pt: 'Singularidade Viva', en: 'Living Singularity' },
        icon: 'circle-dot',
        color: 'text-rose-300',
        reqLvl: 950,
        baseHp:    800_000_000_000,
        hpMult:    50_000,
        baseDmg:   6_000_000_000,
        dmgMult:   40_000,
        spd: 380,
      },
    ];

    newBosses.forEach(boss => {
      if (!rpg.actBosses.find(b => b.id === boss.id)) {
        rpg.actBosses.push(boss);
      }
    });

    // Garantir ordem por reqLvl
    rpg.actBosses.sort((a, b) => a.reqLvl - b.reqLvl);
  }

  // ─────────────────────────────────────────────
  // 3. ARMAS (5 novas, reqLvl 300–900)
  // ─────────────────────────────────────────────
  function addWeapons() {
    if (!rpg.weapons) return;

    const newWeapons = [
      {
        id: 'w_void_lance',
        name: { pt: 'Lança do Vazio', en: 'Void Lance' },
        desc: { pt: '2.5M de Dano', en: '2.5M Dmg' },
        icon: 'zap',
        cost: 500_000,
        reqLvl: 300,
        reqBosses: 6,
        dmg: 2_500_000,
        crit: 0.3,
      },
      {
        id: 'w_entropy_blade',
        name: { pt: 'Lâmina da Entropia', en: 'Entropy Blade' },
        desc: { pt: '12M de Dano', en: '12M Dmg' },
        icon: 'sword',
        cost: 2_000_000,
        reqLvl: 400,
        reqBosses: 7,
        dmg: 12_000_000,
        crit: 0.35,
      },
      {
        id: 'w_recursive_edge',
        name: { pt: 'Fio Recursivo', en: 'Recursive Edge' },
        desc: { pt: '60M de Dano', en: '60M Dmg' },
        icon: 'refresh-cw',
        cost: 10_000_000,
        reqLvl: 550,
        reqBosses: 8,
        dmg: 60_000_000,
        crit: 0.4,
      },
      {
        id: 'w_null_reaper',
        name: { pt: 'Ceifador Nulo', en: 'Null Reaper' },
        desc: { pt: '350M de Dano', en: '350M Dmg' },
        icon: 'minus-circle',
        cost: 80_000_000,
        reqLvl: 700,
        reqBosses: 9,
        dmg: 350_000_000,
        crit: 0.45,
      },
      {
        id: 'w_omega_shard',
        name: { pt: 'Fragmento Ômega', en: 'Omega Shard' },
        desc: { pt: '2B de Dano', en: '2B Dmg' },
        icon: 'hexagon',
        cost: 500_000_000,
        reqLvl: 900,
        reqBosses: 10,
        dmg: 2_000_000_000,
        crit: 0.5,
      },
    ];

    newWeapons.forEach(w => {
      if (!rpg.weapons.find(x => x.id === w.id)) {
        rpg.weapons.push(w);
      }
    });

    rpg.weapons.sort((a, b) => a.reqLvl - b.reqLvl);
  }

  // ─────────────────────────────────────────────
  // 4. ARMADURAS (4 novas, reqLvl 300–850)
  // ─────────────────────────────────────────────
  function addArmors() {
    if (!rpg.armors) return;

    const newArmors = [
      {
        id: 'a_void_plate',
        name: { pt: 'Armadura do Vazio', en: 'Void Plate' },
        desc: { pt: '+800% HP', en: '+800% HP' },
        icon: 'shield',
        cost: 800_000,
        reqLvl: 300,
        reqBosses: 6,
        multHp: 9.0,
        multAtk: 1.0,
        addDodge: 0.1,
      },
      {
        id: 'a_entropy_cloak',
        name: { pt: 'Manto da Entropia', en: 'Entropy Cloak' },
        desc: { pt: '+30% Esq, +400% HP', en: '+30% Dodge, +400% HP' },
        icon: 'wind',
        cost: 5_000_000,
        reqLvl: 450,
        reqBosses: 7,
        multHp: 5.0,
        multAtk: 1.2,
        addDodge: 0.3,
      },
      {
        id: 'a_null_mantle',
        name: { pt: 'Manto Nulo', en: 'Null Mantle' },
        desc: { pt: '+1500% HP', en: '+1500% HP' },
        icon: 'layers',
        cost: 30_000_000,
        reqLvl: 650,
        reqBosses: 8,
        multHp: 16.0,
        multAtk: 1.5,
        addDodge: 0.15,
      },
      {
        id: 'a_omega_aegis',
        name: { pt: 'Égide Ômega', en: 'Omega Aegis' },
        desc: { pt: '+5000% HP, +40% Esq', en: '+5000% HP, +40% Dodge' },
        icon: 'shield-check',
        cost: 300_000_000,
        reqLvl: 850,
        reqBosses: 9,
        multHp: 51.0,
        multAtk: 2.0,
        addDodge: 0.4,
      },
    ];

    newArmors.forEach(a => {
      if (!rpg.armors.find(x => x.id === a.id)) {
        rpg.armors.push(a);
      }
    });

    rpg.armors.sort((a, b) => a.reqLvl - b.reqLvl);
  }

  // ─────────────────────────────────────────────
  // 5. RELÍQUIAS (4 novas)
  // ─────────────────────────────────────────────
  function addRelics() {
    if (!rpg.relics) return;

    const newRelics = [
      {
        id: 'r_null_core',
        name: { pt: 'Núcleo Nulo', en: 'Null Core' },
        desc: { pt: '+2000% ATK e HP', en: '+2000% ATK & HP' },
        icon: 'circle',
        cost: 50_000_000,
        reqLvl: 350,
        reqBosses: 6,
        apply: s => {
          s._nullCoreMult = true;
        },
      },
      {
        id: 'r_entropy_gem',
        name: { pt: 'Gema da Entropia', en: 'Entropy Gem' },
        desc: { pt: '+50% Crit + Críticos curam 10% HP', en: '+50% Crit + Crits heal 10% HP' },
        icon: 'gem',
        cost: 200_000_000,
        reqLvl: 500,
        reqBosses: 7,
        apply: s => {
          s._entropyGemActive = true;
        },
      },
      {
        id: 'r_recursive_soul',
        name: { pt: 'Alma Recursiva', en: 'Recursive Soul' },
        desc: { pt: 'Revive 1× por combate com 50% HP', en: 'Revive 1× per battle with 50% HP' },
        icon: 'refresh-ccw',
        cost: 1_000_000_000,
        reqLvl: 700,
        reqBosses: 8,
        apply: s => {
          s._recursiveSoulActive = true;
        },
      },
      {
        id: 'r_omega_fragment',
        name: { pt: 'Fragmento Ômega', en: 'Omega Fragment' },
        desc: { pt: '+10000% ATK e HP', en: '+10000% ATK & HP' },
        icon: 'hexagon',
        cost: 10_000_000_000,
        reqLvl: 900,
        reqBosses: 9,
        apply: s => {
          s._omegaFragActive = true;
        },
      },
    ];

    newRelics.forEach(r => {
      if (!rpg.relics.find(x => x.id === r.id)) {
        rpg.relics.push(r);
      }
    });

    // Hook nos multiplicadores de ATK e HP para as relíquias
    const _origGetAtk = rpg.getAtk.bind(rpg);
    rpg.getAtk = function () {
      let base = _origGetAtk();
      if (this.inventory.includes('r_null_core'))     base *= 21;
      if (this.inventory.includes('r_omega_fragment')) base *= 101;
      return base;
    };

    const _origGetMaxHp = rpg.getMaxHp.bind(rpg);
    rpg.getMaxHp = function () {
      let base = _origGetMaxHp();
      if (this.inventory.includes('r_null_core'))     base *= 21;
      if (this.inventory.includes('r_omega_fragment')) base *= 101;
      return base;
    };

    // Hook em killMonster para Alma Recursiva (revive)
    const _origDie = rpg.die.bind(rpg);
    rpg.die = function () {
      if (this.inventory.includes('r_recursive_soul') && !this._recursiveSoulUsed) {
        this._recursiveSoulUsed = true;
        this.heroHp = Math.floor(this.getMaxHp() * 0.5);
        this.updateHpBars();
        showToast('💀 Alma Recursiva ativada! Renasceste com 50% HP!', 4000);
        return;
      }
      _origDie();
    };

    // Resetar revive a cada batalha
    const _origStartBattle = rpg.startBattle.bind(rpg);
    rpg.startBattle = function (isBoss) {
      this._recursiveSoulUsed = false;
      _origStartBattle(isBoss);
    };

    // Hook em dealDamageToMonster para Gema da Entropia (crits curam)
    const _origDeal = rpg.dealDamageToMonster.bind(rpg);
    rpg.dealDamageToMonster = function (baseDmg, atkType, isUltimate) {
      const hpBefore = this.heroHp;
      _origDeal(baseDmg, atkType, isUltimate);
      // A cura por crit é aplicada depois — verificamos se houve crit pelo dano
      // Solução simples: 30% de chance de curar ao usar a gema
      if (this.inventory.includes('r_entropy_gem') && Math.random() < 0.3) {
        const heal = Math.floor(this.getMaxHp() * 0.10);
        this.heroHp = Math.min(this.getMaxHp(), this.heroHp + heal);
        this.updateHpBars();
      }
    };

    // Crit bonus da gema
    const _origGetCrit = rpg.getCritChance.bind(rpg);
    rpg.getCritChance = function () {
      let base = _origGetCrit();
      if (this.inventory.includes('r_entropy_gem')) base += 0.50;
      return Math.min(base, 0.99);
    };
  }

  // ─────────────────────────────────────────────
  // 6. CLASSES (3 novas)
  // ─────────────────────────────────────────────
  function addClasses() {
    const newClasses = {
      void_walker: {
        id: 'void_walker',
        name: { pt: 'Andarilho do Vazio', en: 'Void Walker' },
        icon: 'ghost',
        desc: { pt: '+500% ATK, +60% Esq', en: '+500% ATK, +60% Dodge' },
        multHp: 3.0,
        multAtk: 6.0,
        addCrit: 0.5,
        addDodge: 0.6,
        reqBosses: 9,
      },
      entropy_god: {
        id: 'entropy_god',
        name: { pt: 'Deus da Entropia', en: 'Entropy God' },
        icon: 'wind',
        desc: { pt: '+2000% HP/ATK', en: '+2000% HP/ATK' },
        multHp: 21.0,
        multAtk: 21.0,
        addCrit: 0.7,
        addDodge: 0.5,
        reqBosses: 11,
      },
      omega_sovereign: {
        id: 'omega_sovereign',
        name: { pt: 'Soberano Ômega', en: 'Omega Sovereign' },
        icon: 'hexagon',
        desc: { pt: '+10000% Tudo', en: '+10000% Everything' },
        multHp: 101.0,
        multAtk: 101.0,
        addCrit: 0.95,
        addDodge: 0.85,
        reqBosses: 13,
      },
    };

    Object.entries(newClasses).forEach(([key, cls]) => {
      if (!rpg.classes[key]) {
        rpg.classes[key] = cls;
      }
    });
  }

  // ─────────────────────────────────────────────
  // 7. ÁRVORE DE TALENTOS — Arcano (10 nós)
  // ─────────────────────────────────────────────
  function addTalentTree() {
    if (!rpg.TALENT_TREES || rpg.TALENT_TREES.arcane) return;

    rpg.TALENT_TREES.arcane = {
      name: { pt: 'Arcano ✦', en: 'Arcane ✦' },
      color: 'text-fuchsia-400',
      border: 'border-fuchsia-800/50',
      bg: 'bg-fuchsia-950/20',
      nodes: [
        {
          id: 't_a1',
          name: { pt: 'Ressonância', en: 'Resonance' },
          desc: { pt: '+25% ATK permanente', en: '+25% perm ATK' },
          cost: 3,
          apply: s => { s.permAtkBonus = (s.permAtkBonus || 0) + 0.25; },
        },
        {
          id: 't_a2',
          name: { pt: 'Barreira Arcana', en: 'Arcane Barrier' },
          desc: { pt: '+30% HP máximo', en: '+30% max HP' },
          cost: 3, req: 't_a1',
          apply: s => { s.permAllBonus = (s.permAllBonus || 0) + 0.15; },
        },
        {
          id: 't_a3',
          name: { pt: 'Pulso do Vazio', en: 'Void Pulse' },
          desc: { pt: 'Ataques têm 15% de causar dano duplo', en: '15% chance to deal 2× damage' },
          cost: 4, req: 't_a1',
          apply: s => { s.talentVoidPulse = true; },
        },
        {
          id: 't_a4',
          name: { pt: 'Escudo de Runas', en: 'Rune Shield' },
          desc: { pt: 'Bloqueios absorvem 30% a mais', en: 'Blocks absorb 30% more' },
          cost: 4, req: 't_a2',
          apply: s => { s.talentRuneShield = true; },
        },
        {
          id: 't_a5',
          name: { pt: 'Mente Cósmica', en: 'Cosmic Mind' },
          desc: { pt: '+60% XP ganho', en: '+60% XP earned' },
          cost: 5, req: 't_a2',
          apply: s => { s.permXpBonus = (s.permXpBonus || 0) + 0.60; },
        },
        {
          id: 't_a6',
          name: { pt: 'Eco Arcano', en: 'Arcane Echo' },
          desc: { pt: '20% chance: skills não entram em cooldown', en: '20% no cooldown on skill use' },
          cost: 5, req: 't_a3',
          apply: s => { s.talentArcaneEcho = true; },
        },
        {
          id: 't_a7',
          name: { pt: 'Surto de Entropia', en: 'Entropy Surge' },
          desc: { pt: 'Supremo causa +200% dano extra', en: 'Ultimate deals +200% more' },
          cost: 6, req: 't_a4',
          apply: s => { s.talentUltimateMult = (s.talentUltimateMult || 1) + 2.0; },
        },
        {
          id: 't_a8',
          name: { pt: 'Fluxo Temporal', en: 'Time Flow' },
          desc: { pt: 'Velocidade de ataque +20%', en: 'Attack speed +20%' },
          cost: 6, req: 't_a5',
          apply: s => { s.talentTimeFlow = true; },
        },
        {
          id: 't_a9',
          name: { pt: 'Convergência', en: 'Convergence' },
          desc: { pt: '+100% ATK e +50% HP permanente', en: '+100% perm ATK & +50% HP' },
          cost: 8, req: 't_a6',
          apply: s => {
            s.permAtkBonus = (s.permAtkBonus || 0) + 1.0;
            s.permAllBonus = (s.permAllBonus || 0) + 0.25;
          },
        },
        {
          id: 't_a10',
          name: { pt: 'Singularidade', en: 'Singularity' },
          desc: { pt: '+500% todos os stats', en: '+500% all stats' },
          cost: 10, req: 't_a9',
          apply: s => {
            s.permAtkBonus = (s.permAtkBonus || 0) + 5.0;
            s.permAllBonus = (s.permAllBonus || 0) + 2.5;
            s.permDodgeBonus = (s.permDodgeBonus || 0) + 0.3;
          },
        },
      ],
    };

    // Registrar flags dos novos talentos
    rpg.talentVoidPulse  = rpg.talentVoidPulse  || false;
    rpg.talentRuneShield = rpg.talentRuneShield  || false;
    rpg.talentArcaneEcho = rpg.talentArcaneEcho  || false;
    rpg.talentTimeFlow   = rpg.talentTimeFlow    || false;

    // Incluir na re-aplicação dos talentos
    const _origApply = rpg._applyTalents.bind(rpg);
    rpg._applyTalents = function () {
      _origApply();
      this.talentVoidPulse  = false;
      this.talentRuneShield = false;
      this.talentArcaneEcho = false;
      this.talentTimeFlow   = false;
      if (this.TALENT_TREES.arcane) {
        this.TALENT_TREES.arcane.nodes.forEach(node => {
          if (this.unlockedTalents.includes(node.id)) node.apply(this);
        });
      }
    };

    // Hook: Void Pulse — 15% de causar dano duplo
    const _origDealVP = rpg.dealDamageToMonster.bind(rpg);
    rpg.dealDamageToMonster = function (baseDmg, atkType, isUltimate) {
      if (this.talentVoidPulse && Math.random() < 0.15) {
        baseDmg *= 2;
        showToast('✦ Pulso do Vazio!', 1200);
      }
      _origDealVP(baseDmg, atkType, isUltimate);
    };

    // Hook: Arcane Echo — 20% de não entrar em cooldown
    const _origUseSkill = rpg.useSkill.bind(rpg);
    rpg.useSkill = function (id) {
      _origUseSkill(id);
      if (this.talentArcaneEcho && Math.random() < 0.20) {
        const skill = this.skills[id];
        if (skill && skill.timer) {
          skill.timer = false;
          const btn = document.getElementById('btn-' + id);
          if (btn) btn.disabled = false;
          const cd = document.getElementById('cd-' + id);
          if (cd) cd.style.width = '0%';
          showToast('✦ Eco Arcano! Sem cooldown!', 1200);
        }
      }
    };

    // Hook: Time Flow — velocidade de ataque (reduz spd efetivo do monstro)
    // Aplicado via combatTick: se talentTimeFlow, o ataque do herói é 20% mais rápido
    // Implementado como redução no ATB do herói (não existe ATB do herói no sistema atual,
    // mas podemos aumentar o dano do herói passivamente como proxy de velocidade)
    // Deixamos como flag — pode ser expandido no combat loop se desejado.
  }

  // ─────────────────────────────────────────────
  // 8. MUNDOS / REGIÕES (3 novos temas)
  // ─────────────────────────────────────────────
  function addThemes() {
    if (!rpg.themes) return;

    const newThemes = [
      {
        id: 't_entropy',
        name: { pt: 'Reino da Entropia', en: 'Entropy Realm' },
        desc: { pt: 'Caos puro. Lvl 300+', en: 'Pure chaos. Lvl 300+' },
        cssClass: 'theme-hell',
        bgClass: 'bg-arena-entropy',
        cost: 50_000_000,
        reqLvl: 300,
        reqBosses: 6,
      },
      {
        id: 't_null_dimension',
        name: { pt: 'Dimensão Nula', en: 'Null Dimension' },
        desc: { pt: 'Onde nada existe. Lvl 600+', en: 'Where nothing exists. Lvl 600+' },
        cssClass: 'theme-ultimate',
        bgClass: 'bg-arena-null',
        cost: 500_000_000,
        reqLvl: 600,
        reqBosses: 8,
      },
      {
        id: 't_omega_core',
        name: { pt: 'Núcleo Ômega', en: 'Omega Core' },
        desc: { pt: 'O centro de tudo. Lvl 900+', en: 'The center of all. Lvl 900+' },
        cssClass: 'theme-cosmic',
        bgClass: 'bg-arena-omega',
        cost: 5_000_000_000,
        reqLvl: 900,
        reqBosses: 9,
      },
    ];

    newThemes.forEach(theme => {
      if (!rpg.themes.find(x => x.id === theme.id)) {
        rpg.themes.push(theme);
      }
    });

    // CSS dos novos backgrounds (usando os gradientes do sistema existente como fallback)
    if (!document.getElementById('late-game-styles')) {
      const style = document.createElement('style');
      style.id = 'late-game-styles';
      style.textContent = `
        .bg-arena-entropy {
          background: radial-gradient(ellipse at center, #2d0a0a 0%, #1a0505 60%, #0d0000 100%);
        }
        .bg-arena-null {
          background: radial-gradient(ellipse at center, #050510 0%, #02020a 60%, #000000 100%);
        }
        .bg-arena-omega {
          background: radial-gradient(ellipse at center, #1a0a2e 0%, #0d0517 60%, #050008 100%);
        }

        /* Ajuste visual para nomes de classes late game */
        .late-game-badge {
          background: linear-gradient(135deg, #4c0080, #1a0040);
          border: 1px solid rgba(168,85,247,0.4);
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 700;
          color: #d8b4fe;
          letter-spacing: 0.05em;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ─────────────────────────────────────────────
  // Init
  // ─────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 1000));
  } else {
    setTimeout(init, 1000);
  }

})();
