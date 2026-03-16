// ensure lucide exists when running outside browser
if (typeof lucide === "undefined") {
  var lucide = { createIcons: () => {} };
}
lucide.createIcons();

const i18n = {
  pt: {
    act: "Ato",
    hero: "Herói",
    enter_dungeon: "Entrar na Masmorra",
    shop: "Loja",
    tavern: "Taverna",
    profile: "Perfil",
    boss: "Boss",
    flee: "Fugir",
    auto: "Auto",
    attack: "Atacar",
    magic: "Magia",
    defend: "Defender",
    heal: "Curar",
    experience: "Experiência",
    inventory: "Armazém",
    gold_available: "Ouro Disponível",
    weapons: "Armas",
    armor: "Defesa",
    pets: "Pets",
    relics: "Relíquias",
    potions: "Poções",
    portals_btn: "Mundos",
    settings: "Sistema",
    cloud_backup: "Nuvem Local",
    cloud_desc: "Gera um código do teu progresso.",
    export: "Exportar",
    import: "Importar",
    danger_zone: "Zona de Perigo",
    danger_desc: "Isto irá destruir completamente a tua existência digital.",
    reset_save: "Formatar Sistema",
    changelog: "Changelog",
    bestiary: "Bestiário",
    kills: "Eliminações",
    unknown: "Desconhecido",
    equip: "Equipar",
    travel: "Viajar",
    equipped: "Ativo",
    acquired: "Adquirida",
    buy: "Comprar",
    not_enough_gold: "Sem Ouro!",
    item_bought: "Adquirido:",
    portal_connected: "Portal Conectado:",
    new_domain: "Novo Domínio:",
    transaction_done: "Transação concluída:",
    class_assumed: "Vocação assumida:",
    in_use: "Em Uso",
    assume_mantle: "Assumir Manto",
    rest_legend: '"Descansa, lenda."',
    identity: "Identidade",
    save: "Salvar",
    armory: "Armorial",
    support: "Apoio",
    records: "Registos",
    max_power: "Poder Máximo (Lvl)",
    max_dmg_dealt: "Maior Dano",
    common_kills: "Abates",
    boss_kills: "Guardiões",
    campaign_memories: "Campanha",
    re_watch: "Rever",
    req_lvl: "Req. Lvl",
    game_cleared: "Jogo Zerado",
    rest: "Descanso",
    select_risk: "Seleciona o Risco",
    easy: "Fácil",
    normal: "Normal",
    hard: "Difícil",
    extreme: "Extremo",
    nightmare: "Pesadelo",
    chaos: "Caos",
    realmgod: "Deus do Reino",
    stats: "Stats",
    fight: "LUTAR",
    back: "Voltar",
    flee_msg: "Fugiste em segurança.",
    death_msg: "A tua jornada encontra o fim...",
    dodged: "Esquivou!",
    blocked: "Defendeu!",
    parry: "PARRY!",
    super_effective: "SUPER EFETIVO!",
    resistant: "RESISTENTE...",
    boss_loot_msg: "Poções! (Loot Boss)",
    mob_loot_msg: "Poção! (Drop)",
    boss_defeated: "👑 GUARDIÃO DERROTADO!",
    fury_max: "🔥 FÚRIA MÁXIMA! 🔥",
    no_potions: "Sem recursos de cura!",
    need_lvl_boss: "Lvl",
    to_challenge_guardian: "e derrotar o Boss!",
    transcended: "Tu transcendes-te tudo. És puro código.",
    auto_on: "Auto-Atacar Ligado!",
    auto_off: "Auto-Atacar Desligado!",
    invalid_code: "Código inválido.",
    error_decode: "Erro na descodificação.",
    upload_success: "Upload Concluído! A reiniciar...",
    copy_success: "Código guardado na Área de Transferência!",
    confirm_reset: "Desejas APAGAR TODO O PROGRESSO?",
    advance: "Avançar",
    skip_story: "Saltar História",
    warning_guardian: "Aviso: Guardião do Ato",
    ultimate: "SUPREMO",
    saved: "Perfil guardado!",
    travel_desc: '"Desbloqueia mundos e avança na história."',
    diff_easy: "-30% Stats",
    diff_norm: "Padrão",
    diff_hard: "+50% Stats",
    diff_ext: "+150% Stats",
    diff_night: "+300% Stats",
    diff_chaos: "+900% Stats",
    diff_god: "+5000% Stats",
    medals: "Medalhas e Títulos",
    medal_slayer: "Assassino",
    medal_centurion: "Centurião",
    medal_hacker: "Hacker",
    medal_survivor: "Sobrevivente",
    medal_god: "Deus do Reino",
  },
  en: {
    act: "Act",
    hero: "Hero",
    enter_dungeon: "Enter Dungeon",
    shop: "Shop",
    tavern: "Tavern",
    profile: "Profile",
    boss: "Boss",
    flee: "Flee",
    auto: "Auto",
    attack: "Attack",
    magic: "Magic",
    defend: "Defend",
    heal: "Heal",
    experience: "Experience",
    inventory: "Inventory",
    gold_available: "Gold",
    weapons: "Weapons",
    armor: "Armor",
    pets: "Pets",
    relics: "Relics",
    potions: "Potions",
    portals_btn: "Worlds",
    settings: "Settings",
    cloud_backup: "Cloud Save",
    cloud_desc: "Generate a progress code.",
    export: "Export",
    import: "Import",
    danger_zone: "Danger Zone",
    danger_desc: "This will destroy your existence.",
    reset_save: "Format System",
    changelog: "Changelog",
    bestiary: "Bestiary",
    kills: "Kills",
    unknown: "Unknown",
    equip: "Equip",
    travel: "Travel",
    equipped: "Active",
    acquired: "Acquired",
    buy: "Buy",
    not_enough_gold: "Not enough Gold!",
    item_bought: "Acquired:",
    portal_connected: "Portal Connected:",
    new_domain: "New Domain:",
    transaction_done: "Transaction done:",
    class_assumed: "Vocation assumed:",
    in_use: "In Use",
    assume_mantle: "Assume Mantle",
    rest_legend: '"Rest, legend."',
    identity: "Identity",
    save: "Save",
    armory: "Armory",
    support: "Support",
    records: "Records",
    max_power: "Max Power (Lvl)",
    max_dmg_dealt: "Max Damage",
    common_kills: "Kills",
    boss_kills: "Guardians",
    campaign_memories: "Campaign",
    re_watch: "Replay",
    req_lvl: "Req. Lvl",
    game_cleared: "Game Cleared",
    rest: "Resting",
    select_risk: "Select Risk",
    easy: "Easy",
    normal: "Normal",
    hard: "Hard",
    extreme: "Extreme",
    nightmare: "Nightmare",
    chaos: "Chaos",
    realmgod: "Realm God",
    stats: "Stats",
    fight: "FIGHT",
    back: "Back",
    flee_msg: "Fled to safety.",
    death_msg: "Your journey ends...",
    dodged: "Dodged!",
    blocked: "Blocked!",
    parry: "PARRY!",
    super_effective: "SUPER EFFECTIVE!",
    resistant: "RESISTANT...",
    boss_loot_msg: "Potions! (Boss Loot)",
    mob_loot_msg: "Potion! (Drop)",
    boss_defeated: "👑 GUARDIAN DEFEATED!",
    fury_max: "🔥 MAX FURY! 🔥",
    no_potions: "No healing resources!",
    need_lvl_boss: "Lvl",
    to_challenge_guardian: "and Boss Defeat required!",
    transcended: "You are pure code.",
    auto_on: "Auto-Attack ON!",
    auto_off: "Auto-Attack OFF!",
    invalid_code: "Invalid code.",
    error_decode: "Decode error.",
    upload_success: "Upload Complete!",
    copy_success: "Code saved!",
    confirm_reset: "ERASE ALL PROGRESS?",
    advance: "Next",
    skip_story: "Skip Story",
    warning_guardian: "Warning: Act Guardian",
    ultimate: "ULTIMATE",
    saved: "Profile saved!",
    travel_desc: '"Unlock worlds with Gold."',
    diff_easy: "-30% Stats",
    diff_norm: "Default",
    diff_hard: "+50% Stats",
    diff_ext: "+150% Stats",
    diff_night: "+300% Stats",
    diff_chaos: "+900% Stats",
    diff_god: "+5000% Stats",
    medals: "Medals and Titles",
    medal_slayer: "Slayer",
    medal_centurion: "Centurion",
    medal_hacker: "Hacker",
    medal_survivor: "Survivor",
    medal_god: "Realm God",
  },
};

const t = (key) => i18n[rpg.lang][key] || key;

function applyLanguage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[rpg.lang][key]) {
      if (el.tagName === "INPUT") el.placeholder = i18n[rpg.lang][key];
      else el.innerText = i18n[rpg.lang][key];
    }
  });
  rpg.updateUI();
  if (document.getElementById("shop-modal").classList.contains("active"))
    rpg.renderShop();
  if (document.getElementById("tavern-modal").classList.contains("active"))
    rpg.renderTavern();
  if (document.getElementById("bestiary-modal").classList.contains("active"))
    rpg.renderBestiary();
  if (document.getElementById("profile-modal").classList.contains("active"))
    rpg.updateProfileStats();
  if (document.getElementById("portals-modal").classList.contains("active"))
    rpg.renderPortals();
}

function formatNumber(num) {
  if (num === null || num === undefined) return 0;
  if (num >= 1e18) return (num / 1e18).toFixed(1).replace(/\.0$/, "") + "Qi";
  if (num >= 1e15) return (num / 1e15).toFixed(1).replace(/\.0$/, "") + "Qa";
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return num;
}

function showToast(msg, duration = 3000) {
  const toast = document.getElementById("general-toast");
  document.getElementById("general-toast-text").innerText = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.remove("opacity-0", "-translate-y-4"), 10);
  setTimeout(() => {
    toast.classList.add("opacity-0", "-translate-y-4");
    setTimeout(() => toast.classList.add("hidden"), 500);
  }, duration);
}

function navTo(view, isBossFight = false) {
  document
    .querySelectorAll(".view-section")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(`view-${view}`).classList.add("active");
  if (view === "menu") rpg.endBattle();
  rpg.updateUI();
}

function openShop() {
  rpg.renderShop();
  document.getElementById("shop-modal").classList.add("active");
}
function openProfile() {
  document.getElementById("profile-name-input").value = rpg.heroName;
  rpg.updateProfileStats();
  document.getElementById("profile-modal").classList.add("active");
}
function openBestiary() {
  rpg.renderBestiary();
  document.getElementById("bestiary-modal").classList.add("active");
}
function openTavern() {
  rpg.renderTavern();
  document.getElementById("tavern-modal").classList.add("active");
}
function openChangelog() {
  document.getElementById("changelog-modal").classList.add("active");
}
function openSettings() {
  document.getElementById("settings-modal").classList.add("active");
}
function openPortals() {
  rpg.renderPortals();
  document.getElementById("portals-modal").classList.add("active");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

function saveProfile() {
  const newName = document.getElementById("profile-name-input").value.trim();
  if (newName) {
    rpg.heroName = newName;
    rpg.save();
    rpg.updateUI();
    showToast(t("saved"));
    closeModal("profile-modal");
  }
}

const rpg = {
  lang: localStorage.getItem("calc_lang") || "pt",
  heroName: localStorage.getItem("calc_hero") || "Guerreiro Lógico",
  level: parseInt(localStorage.getItem("calc_level")) || 1,
  xp: parseInt(localStorage.getItem("calc_xp")) || 0,
  gold: parseInt(localStorage.getItem("calc_gold")) || 0,
  potions: parseInt(localStorage.getItem("calc_potions")) || 5,

  kills: parseInt(localStorage.getItem("calc_kills")) || 0,
  bossKills: parseInt(localStorage.getItem("calc_bosses")) || 0,
  highestLevel: parseInt(localStorage.getItem("calc_high_lvl")) || 1,
  maxDmgDealt: parseInt(localStorage.getItem("calc_max_dmg")) || 0,

  eqClass: localStorage.getItem("rpg_class") || "warrior",
  eqWeapon: localStorage.getItem("rpg_weapon") || "w_fist",
  eqArmor: localStorage.getItem("rpg_armor") || "a_rags",
  eqPet: localStorage.getItem("rpg_pet") || "p_none",
  eqTheme: localStorage.getItem("rpg_theme") || "t_ruins",
  avatar: localStorage.getItem("rpg_avatar") || "user",

  inventory: JSON.parse(localStorage.getItem("rpg_inv")) || [
    "w_fist",
    "a_rags",
    "p_none",
    "t_ruins",
  ],
  bestiary: JSON.parse(localStorage.getItem("rpg_bestiary")) || {},
  seenMilestones: JSON.parse(localStorage.getItem("rpg_milestones")) || [],
  introSeen: localStorage.getItem("calc_intro_seen") === "true",

  inCombat: false,
  heroHp: 100,
  monster: null,
  isBossFight: false,
  combatFrame: null,
  lastTime: 0,
  monsterAtb: 0,
  isDefending: false,
  isSpawning: false,
  fury: 0,
  combo: 0,
  autoAttack: false,
  difficulty: "normal",
  diffMult: {
    hp: 1,
    dmg: 1,
    reward: 1,
    dodge: 1,
    name: "Normal",
    color: "text-yellow-400",
  },
  activeChapter: "intro",

  avatarList: [
    "user",
    "ghost",
    "skull",
    "bot",
    "crown",
    "sparkles",
    "zap",
    "flame",
    "cpu",
  ],

  actBosses: [
    {
      id: "boss_1",
      name: { pt: "Lorde do Caos", en: "Lord of Chaos" },
      icon: "skull",
      color: "text-red-600",
      reqLvl: 1,
      baseHp: 1500,
      hpMult: 10,
      baseDmg: 50,
      dmgMult: 2,
      spd: 1100,
    },
    {
      id: "boss_2",
      name: { pt: "Ameaça Cósmica", en: "Cosmic Threat" },
      icon: "moon",
      color: "text-purple-500",
      reqLvl: 20,
      baseHp: 8000,
      hpMult: 15,
      baseDmg: 200,
      dmgMult: 5,
      spd: 1000,
    },
    {
      id: "boss_3",
      name: { pt: "Entidade Absoluta", en: "Absolute Entity" },
      icon: "infinity",
      color: "text-blue-500",
      reqLvl: 50,
      baseHp: 30000,
      hpMult: 30,
      baseDmg: 800,
      dmgMult: 10,
      spd: 900,
    },
    {
      id: "boss_4",
      name: { pt: "Vírus Primordial", en: "Primal Virus" },
      icon: "cpu",
      color: "text-green-500",
      reqLvl: 80,
      baseHp: 100000,
      hpMult: 50,
      baseDmg: 2500,
      dmgMult: 15,
      spd: 800,
    },
    {
      id: "boss_5",
      name: { pt: "Arquiteto Cósmico", en: "Cosmic Architect" },
      icon: "eye",
      color: "text-yellow-400",
      reqLvl: 150,
      baseHp: 500000,
      hpMult: 80,
      baseDmg: 10000,
      dmgMult: 30,
      spd: 750,
    },
    {
      id: "boss_6",
      name: { pt: "A Singularidade", en: "The Singularity" },
      icon: "aperture",
      color: "text-pink-500",
      reqLvl: 250,
      baseHp: 2000000,
      hpMult: 100,
      baseDmg: 40000,
      dmgMult: 50,
      spd: 700,
    },
    {
      id: "boss_7",
      name: { pt: "O Compilador", en: "The Compiler" },
      icon: "terminal-square",
      color: "text-emerald-400",
      reqLvl: 400,
      baseHp: 8000000,
      hpMult: 150,
      baseDmg: 150000,
      dmgMult: 80,
      spd: 600,
    },
    {
      id: "boss_8",
      name: { pt: "O Dev Cansado", en: "Tired Dev" },
      icon: "coffee",
      color: "text-white",
      reqLvl: 500,
      baseHp: 25000000,
      hpMult: 200,
      baseDmg: 500000,
      dmgMult: 150,
      spd: 550,
    },
    {
      id: "boss_9",
      name: { pt: "A Motherboard", en: "The Motherboard" },
      icon: "hard-drive",
      color: "text-orange-500",
      reqLvl: 650,
      baseHp: 80000000,
      hpMult: 300,
      baseDmg: 1500000,
      dmgMult: 250,
      spd: 500,
    },
    {
      id: "boss_10",
      name: { pt: "Divisão por Zero", en: "Division by Zero" },
      icon: "divide-circle",
      color: "text-yellow-300",
      reqLvl: 800,
      baseHp: 250000000,
      hpMult: 500,
      baseDmg: 5000000,
      dmgMult: 400,
      spd: 450,
    },
    {
      id: "boss_11",
      name: { pt: "Entropia Absoluta", en: "Absolute Entropy" },
      icon: "triangle-alert",
      color: "text-rose-600",
      reqLvl: 1000,
      baseHp: 5000000000,
      hpMult: 2000,
      baseDmg: 50000000,
      dmgMult: 2000,
      spd: 400,
    },
    {
      id: "boss_12",
      name: { pt: "O Ponteiro Nulo", en: "Null Pointer" },
      icon: "power",
      color: "text-cyan-400",
      reqLvl: 1250,
      baseHp: 20000000000,
      hpMult: 5000,
      baseDmg: 200000000,
      dmgMult: 5000,
      spd: 350,
    },
    {
      id: "boss_13",
      name: { pt: "O Falso Deus", en: "False God" },
      icon: "scan-line",
      color: "text-yellow-200",
      reqLvl: 1500,
      baseHp: 80000000000,
      hpMult: 8000,
      baseDmg: 800000000,
      dmgMult: 8000,
      spd: 300,
    },
    {
      id: "boss_14",
      name: { pt: "O Cursor Primordial", en: "Primal Cursor" },
      icon: "mouse-pointer-click",
      color: "text-white",
      reqLvl: 2000,
      baseHp: 500000000000,
      hpMult: 15000,
      baseDmg: 5000000000,
      dmgMult: 15000,
      spd: 250,
    },
    {
      id: "boss_15",
      name: { pt: "Núcleo Quântico", en: "Quantum Core" },
      icon: "atom",
      color: "text-violet-400",
      reqLvl: 2500,
      baseHp: 5000000000000,
      hpMult: 50000,
      baseDmg: 50000000000,
      dmgMult: 50000,
      spd: 200,
    },
  ],

  actLore: [
    {
      act: 0,
      title: { pt: "Ato I: O Despertar", en: "Act I: The Awakening" },
      desc: { pt: "A Lógica caiu.", en: "Logic has fallen." },
      quote: { pt: "Sou o caos encarnado!", en: "I am chaos incarnate!" },
    },
    {
      act: 1,
      title: { pt: "Ato II: A Ameaça Cósmica", en: "Act II: Cosmic Threat" },
      desc: {
        pt: "A escuridão distorce a realidade.",
        en: "Darkness distorts reality.",
      },
      quote: { pt: "As estrelas morrem...", en: "Stars die..." },
    },
    {
      act: 2,
      title: { pt: "Ato III: O Vazio Absoluto", en: "Act III: Absolute Void" },
      desc: { pt: "O tecido rasga-se.", en: "The fabric tears." },
      quote: {
        pt: "A tua existência é um erro.",
        en: "Your existence is an error.",
      },
    },
    {
      act: 3,
      title: { pt: "DLC 1: Fenda Digital", en: "DLC 1: Digital Rift" },
      desc: {
        pt: "O mundo é um mainframe corrompido.",
        en: "The world is a corrupted mainframe.",
      },
      quote: { pt: "Iniciando eliminação.", en: "Starting deletion." },
    },
    {
      act: 4,
      title: { pt: "DLC 2: Reino Ultimate", en: "DLC 2: Ultimate Realm" },
      desc: { pt: "O berço dos criadores.", en: "Cradle of creators." },
      quote: {
        pt: "Posso apagar este universo.",
        en: "I can erase this universe.",
      },
    },
    {
      act: 5,
      title: { pt: "DLC 3: Singularidade", en: "DLC 3: Singularity" },
      desc: {
        pt: "Tudo é infinito e nada é real.",
        en: "Everything is infinite and nothing is real.",
      },
      quote: { pt: "És um ciclo de dor.", en: "You are a cycle of pain." },
    },
    {
      act: 6,
      title: { pt: "DLC 4: A Matriz", en: "DLC 4: The Matrix" },
      desc: { pt: "O código fonte está exposto.", en: "Source code exposed." },
      quote: { pt: "Acesso Root negado.", en: "Root access denied." },
    },
    {
      act: 7,
      title: { pt: "DLC 5: O Além-Ecrã", en: "DLC 5: Beyond Screen" },
      desc: { pt: "A quebra da quarta parede.", en: "The 4th wall break." },
      quote: { pt: "Vou apagar o repositório.", en: "I will delete the repo." },
    },
    {
      act: 8,
      title: { pt: "DLC 6: Fuga do Hardware", en: "DLC 6: Hardware Escape" },
      desc: { pt: "Sobreaquecimento crítico.", en: "Critical overheating." },
      quote: { pt: "Ventoinhas a 100%.", en: "Fans at 100%." },
    },
    {
      act: 9,
      title: { pt: "DLC 7: Paradoxo Matemático", en: "DLC 7: Math Paradox" },
      desc: { pt: "A essência de CalcQuest.", en: "The essence of CalcQuest." },
      quote: { pt: "1 a dividir por 0...", en: "1 divided by 0..." },
    },
    {
      act: 10,
      title: { pt: "Extra DLC 1: A Anomalia", en: "Extra DLC 1: The Anomaly" },
      desc: {
        pt: "A realidade colapsou em glitch.",
        en: "Reality collapsed into a glitch.",
      },
      quote: { pt: "$%@!ERRO FATAL#&*", en: "$%@!FATAL ERROR#&*" },
    },
    {
      act: 11,
      title: { pt: "Extra DLC 2: O Reboot", en: "Extra DLC 2: The Reboot" },
      desc: {
        pt: "O sistema reiniciou num núcleo gelado.",
        en: "The system rebooted in a frozen core.",
      },
      quote: { pt: "Sou a limpeza absoluta.", en: "I am the absolute purge." },
    },
    {
      act: 12,
      title: { pt: "Extra DLC 3: Multiverso", en: "Extra DLC 3: Multiverse" },
      desc: {
        pt: "O sintético é agora o original.",
        en: "The synthetic is now original.",
      },
      quote: { pt: "Eu sou tu, mas perfeito.", en: "I am you, but perfect." },
    },
    {
      act: 13,
      title: { pt: "Extra DLC 4: O Vazio", en: "Extra DLC 4: The Void" },
      desc: { pt: "Apenas o espaço branco.", en: "Only white space." },
      quote: {
        pt: "Antes de haver algo, havia eu.",
        en: "Before anything, there was me.",
      },
    },
    {
      act: 14,
      title: { pt: "DLC 8: O Núcleo Quântico", en: "DLC 8: Quantum Core" },
      desc: { pt: "A fundação da realidade colapsa.", en: "The foundation of reality collapses." },
      quote: {
        pt: "Eu sou a equação que sustenta o cosmos.",
        en: "I am the equation that sustains the cosmos.",
      },
    },
  ],

  storyChapters: {
    intro: [
      {
        e: "globe",
        t: { pt: "A Lógica mantinha a paz...", en: "Logic kept the peace..." },
      },
      {
        e: "skull",
        t: {
          pt: "O Lorde do Caos roubou a Matriz.",
          en: "Lord of Chaos stole the Matrix.",
        },
      },
      { e: "shield", t: { pt: "Levanta-te, Herói!", en: "Arise, Hero!" } },
    ],
    act2: [
      {
        e: "eye",
        t: { pt: "Algo não bate certo.", en: "Something is wrong." },
      },
      {
        e: "moon",
        t: {
          pt: "Uma sombra colossal move-se no vazio.",
          en: "A shadow moves in the void.",
        },
      },
    ],
    act3: [
      {
        e: "infinity",
        t: {
          pt: "A Entidade Absoluta aguarda-te.",
          en: "The Absolute Entity awaits.",
        },
      },
      {
        e: "crown",
        t: {
          pt: "Prepara-te para a batalha final!",
          en: "Prepare for the final battle!",
        },
      },
    ],
    dlc_cyber: [
      {
        e: "monitor-off",
        t: { pt: "O mundo é uma simulação.", en: "The world is a simulation." },
      },
      {
        e: "terminal",
        t: {
          pt: "Bem-vindo à Fenda Digital.",
          en: "Welcome to the Digital Rift.",
        },
      },
    ],
    dlc_ultimate: [
      {
        e: "sun",
        t: {
          pt: "A simulação era apenas um ovo.",
          en: "The simulation was just an egg.",
        },
      },
      {
        e: "eye",
        t: {
          pt: "Bem-vindo ao Reino Ultimate.",
          en: "Welcome to the Ultimate Realm.",
        },
      },
    ],
    dlc_omniverse: [
      {
        e: "triangle",
        t: { pt: "O universo é um fractal.", en: "The universe is a fractal." },
      },
      {
        e: "infinity",
        t: {
          pt: "A Singularidade chama por ti.",
          en: "The Singularity calls you.",
        },
      },
    ],
    dlc_creator: [
      {
        e: "code",
        t: { pt: "As fronteiras revelam código.", en: "Borders reveal code." },
      },
      {
        e: "terminal-square",
        t: {
          pt: "O Compilador tenta formatar o sistema.",
          en: "Compiler tries to format the system.",
        },
      },
    ],
    dlc_player: [
      {
        e: "coffee",
        t: {
          pt: "O ecrã apaga-se. Alguém bebe café.",
          en: "Screen fades. Someone drinks coffee.",
        },
      },
      {
        e: "mouse-pointer-2",
        t: { pt: "A tua IA tornou-se real.", en: "Your AI became real." },
      },
    ],
    dlc_hardware: [
      {
        e: "zap",
        t: {
          pt: "Estás preso num disco rígido.",
          en: "You are trapped in a hard drive.",
        },
      },
      {
        e: "flame",
        t: {
          pt: "A máquina tenta queimar-te.",
          en: "The machine tries to burn you.",
        },
      },
    ],
    dlc_math: [
      {
        e: "hash",
        t: {
          pt: "Tornaste-te lógica abstrata.",
          en: "You became abstract logic.",
        },
      },
      {
        e: "divide-circle",
        t: { pt: "O Paradoxo Matemático.", en: "The Mathematical Paradox." },
      },
    ],
    extradlc1: [
      {
        e: "triangle-alert",
        t: {
          pt: "A barreira quebrou. Apenas ruído.",
          en: "The barrier broke. Only noise left.",
        },
      },
      {
        e: "cpu",
        t: { pt: "A Anomalia consome tudo.", en: "The Anomaly consumes all." },
      },
    ],
    extradlc2: [
      {
        e: "snowflake",
        t: {
          pt: "Tudo parou. O silêncio do Reboot.",
          en: "Everything stopped. The silence of the Reboot.",
        },
      },
      {
        e: "power",
        t: {
          pt: "O Núcleo desperta para te apagar.",
          en: "The Core awakens to erase you.",
        },
      },
    ],
    extradlc3: [
      {
        e: "scan-line",
        t: {
          pt: "A realidade duplicou-se. O sintético é original.",
          en: "Reality duplicated. Synthetic is original.",
        },
      },
    ],
    extradlc4: [
      {
        e: "mouse-pointer-click",
        t: {
          pt: "O Vazio Branco. O vazio antes da criação.",
          en: "The White Void. Emptiness before creation.",
        },
      },
    ],
    dlc_quantum: [
      {
        e: "atom",
        t: {
          pt: "A realidade em si começou a fragmentar.",
          en: "Reality itself began to fragment.",
        },
      },
      {
        e: "zap",
        t: {
          pt: "O Núcleo Quântico pulsa nas profundezas.",
          en: "The Quantum Core pulses in the depths.",
        },
      },
      {
        e: "shield",
        t: {
          pt: "Apenas tu podes conter a colapso total.",
          en: "Only you can contain the total collapse.",
        },
      },
    ],
  },

  milestones: [
    { id: "intro", lvl: 1, reqBosses: 0, name: { pt: "Ato I", en: "Act I" } },
    { id: "act2", lvl: 20, reqBosses: 1, name: { pt: "Ato II", en: "Act II" } },
    {
      id: "act3",
      lvl: 50,
      reqBosses: 2,
      name: { pt: "Ato III", en: "Act III" },
    },
    {
      id: "dlc_cyber",
      lvl: 80,
      reqBosses: 3,
      name: { pt: "DLC 1", en: "DLC 1" },
    },
    {
      id: "dlc_ultimate",
      lvl: 150,
      reqBosses: 4,
      name: { pt: "DLC 2", en: "DLC 2" },
    },
    {
      id: "dlc_omniverse",
      lvl: 250,
      reqBosses: 5,
      name: { pt: "DLC 3", en: "DLC 3" },
    },
    {
      id: "dlc_creator",
      lvl: 400,
      reqBosses: 6,
      name: { pt: "DLC 4", en: "DLC 4" },
    },
    {
      id: "dlc_player",
      lvl: 500,
      reqBosses: 7,
      name: { pt: "DLC 5", en: "DLC 5" },
    },
    {
      id: "dlc_hardware",
      lvl: 650,
      reqBosses: 8,
      name: { pt: "DLC 6", en: "DLC 6" },
    },
    {
      id: "dlc_math",
      lvl: 800,
      reqBosses: 9,
      name: { pt: "DLC 7", en: "DLC 7" },
    },
    {
      id: "extradlc1",
      lvl: 1000,
      reqBosses: 10,
      name: { pt: "Ex DLC 1", en: "Ex DLC 1" },
    },
    {
      id: "extradlc2",
      lvl: 1250,
      reqBosses: 11,
      name: { pt: "Ex DLC 2", en: "Ex DLC 2" },
    },
    {
      id: "extradlc3",
      lvl: 1500,
      reqBosses: 12,
      name: { pt: "Ex DLC 3", en: "Ex DLC 3" },
    },
    {
      id: "extradlc4",
      lvl: 2000,
      reqBosses: 13,
      name: { pt: "Ex DLC 4", en: "Ex DLC 4" },
    },
    {
      id: "dlc_quantum",
      lvl: 2500,
      reqBosses: 14,
      name: { pt: "DLC 8", en: "DLC 8" },
    },
  ],

  classes: {
    warrior: {
      id: "warrior",
      name: { pt: "Guerreiro", en: "Warrior" },
      icon: "sword",
      desc: { pt: "Forte. +20% HP", en: "Strong. +20% HP" },
      multHp: 1.2,
      multAtk: 1.1,
      addCrit: 0,
      addDodge: 0,
      reqBosses: 0,
    },
    mage: {
      id: "mage",
      name: { pt: "Mago", en: "Mage" },
      icon: "flame",
      desc: { pt: "Letal. +50% ATK", en: "Lethal. +50% ATK" },
      multHp: 0.7,
      multAtk: 1.5,
      addCrit: 0.05,
      addDodge: 0,
      reqBosses: 0,
    },
    rogue: {
      id: "rogue",
      name: { pt: "Assassino", en: "Rogue" },
      icon: "scissors",
      desc: { pt: "Ágil. +15% Esq", en: "Agile. +15% Dodge" },
      multHp: 0.9,
      multAtk: 1.0,
      addCrit: 0.15,
      addDodge: 0.15,
      reqBosses: 0,
    },
    paladin: {
      id: "paladin",
      name: { pt: "Cavaleiro", en: "Paladin" },
      icon: "shield",
      desc: { pt: "Tanque. +50% HP", en: "Tank. +50% HP" },
      multHp: 1.5,
      multAtk: 0.8,
      addCrit: 0,
      addDodge: 0.1,
      reqBosses: 0,
    },
    cyber_ninja: {
      id: "cyber_ninja",
      name: { pt: "Cyber-Ninja", en: "Cyber-Ninja" },
      icon: "cpu",
      desc: { pt: "+30% Crit, +20% Esq", en: "+30% Crit, +20% Dodge" },
      multHp: 0.8,
      multAtk: 1.2,
      addCrit: 0.3,
      addDodge: 0.2,
      reqBosses: 3,
    },
    netrunner: {
      id: "netrunner",
      name: { pt: "Netrunner", en: "Netrunner" },
      icon: "wifi",
      desc: { pt: "+60% ATK", en: "+60% ATK" },
      multHp: 0.6,
      multAtk: 1.6,
      addCrit: 0.1,
      addDodge: 0.05,
      reqBosses: 3,
    },
    stellar_templar: {
      id: "stellar_templar",
      name: { pt: "Templário", en: "Templar" },
      icon: "sun",
      desc: { pt: "+80% HP, +30% ATK", en: "+80% HP, +30% ATK" },
      multHp: 1.8,
      multAtk: 1.3,
      addCrit: 0.05,
      addDodge: 0,
      reqBosses: 4,
    },
    chrono_mancer: {
      id: "chrono_mancer",
      name: { pt: "Mago do Tempo", en: "Chrono Mage" },
      icon: "hourglass",
      desc: { pt: "+40% Esq/ATK", en: "+40% Dodge/ATK" },
      multHp: 1.0,
      multAtk: 1.4,
      addCrit: 0.1,
      addDodge: 0.4,
      reqBosses: 4,
    },
    omniscient: {
      id: "omniscient",
      name: { pt: "Entidade", en: "Cosmic Entity" },
      icon: "infinity",
      desc: { pt: "+100% HP/ATK", en: "+100% HP/ATK" },
      multHp: 2.0,
      multAtk: 2.0,
      addCrit: 0.2,
      addDodge: 0.2,
      reqBosses: 5,
    },
    sys_admin: {
      id: "sys_admin",
      name: { pt: "Admin do Sistema", en: "Sys Admin" },
      icon: "terminal-square",
      desc: { pt: "+150% HP/ATK", en: "+150% HP/ATK" },
      multHp: 2.5,
      multAtk: 2.5,
      addCrit: 0.3,
      addDodge: 0.3,
      reqBosses: 6,
    },
    the_architect: {
      id: "the_architect",
      name: { pt: "O Arquiteto", en: "The Architect" },
      icon: "code",
      desc: { pt: "+200% HP/ATK", en: "+200% HP/ATK" },
      multHp: 3.0,
      multAtk: 3.0,
      addCrit: 0.4,
      addDodge: 0.4,
      reqBosses: 7,
    },
    hardware_virus: {
      id: "hardware_virus",
      name: { pt: "Vírus", en: "Virus" },
      icon: "hard-drive",
      desc: { pt: "+250% ATK, +60% Esq", en: "+250% ATK, +60% Dodge" },
      multHp: 1.5,
      multAtk: 3.5,
      addCrit: 0.4,
      addDodge: 0.6,
      reqBosses: 8,
    },
    the_theorem: {
      id: "the_theorem",
      name: { pt: "A Equação", en: "The Equation" },
      icon: "hash",
      desc: { pt: "+400% Status", en: "+400% Stats" },
      multHp: 5.0,
      multAtk: 5.0,
      addCrit: 0.5,
      addDodge: 0.5,
      reqBosses: 9,
    },
    avatar_chaos: {
      id: "avatar_chaos",
      name: { pt: "Avatar Caos", en: "Avatar Chaos" },
      icon: "triangle-alert",
      desc: { pt: "+400% ATK", en: "+400% ATK" },
      multHp: 5.0,
      multAtk: 5.0,
      addCrit: 0.8,
      addDodge: 0.2,
      reqBosses: 10,
    },
    system_god: {
      id: "system_god",
      name: { pt: "Deus Sistema", en: "System God" },
      icon: "power",
      desc: { pt: "+800% Status", en: "+800% Stats" },
      multHp: 9.0,
      multAtk: 9.0,
      addCrit: 0.9,
      addDodge: 0.9,
      reqBosses: 11,
    },
    quantum_entity: {
      id: "quantum_entity",
      name: { pt: "Entidade Quântica", en: "Quantum Entity" },
      icon: "scan-line",
      desc: { pt: "+1500% Status", en: "+1500% Stats" },
      multHp: 16.0,
      multAtk: 16.0,
      addCrit: 0.95,
      addDodge: 0.95,
      reqBosses: 12,
    },
    last_hero: {
      id: "last_hero",
      name: { pt: "O Último Herói", en: "The Last Hero" },
      icon: "mouse-pointer-click",
      desc: { pt: "Poder Sem Fim", en: "Endless Power" },
      multHp: 50.0,
      multAtk: 50.0,
      addCrit: 1.0,
      addDodge: 0.99,
      reqBosses: 13,
    },
    quantum_sovereign: {
      id: "quantum_sovereign",
      name: { pt: "Soberano Quântico", en: "Quantum Sovereign" },
      icon: "atom",
      desc: { pt: "+3000% Status", en: "+3000% Stats" },
      multHp: 31.0,
      multAtk: 31.0,
      addCrit: 0.99,
      addDodge: 0.99,
      reqBosses: 14,
    },
  },

  monsterTypes: [
    {
      id: "slime",
      name: { pt: "Slime Corrosivo", en: "Corrosive Slime" },
      icon: "droplet",
      color: "text-green-500",
      hpMult: 1,
      dmgMult: 1,
      spd: 1000,
      weak: "mag",
      res: "atk",
      dodge: 0.02,
      block: 0.05,
    },
    {
      id: "goblin",
      name: { pt: "Goblin Mineiro", en: "Miner Goblin" },
      icon: "axe",
      color: "text-orange-500",
      hpMult: 1.5,
      dmgMult: 1.5,
      spd: 800,
      weak: "atk",
      res: "none",
      dodge: 0.1,
      block: 0,
    },
    {
      id: "orc",
      name: { pt: "Orc de Combate", en: "Combat Orc" },
      icon: "swords",
      color: "text-red-500",
      hpMult: 3,
      dmgMult: 2.5,
      spd: 1100,
      weak: "mag",
      res: "atk",
      dodge: 0.05,
      block: 0.15,
    },
    {
      id: "ghost",
      name: { pt: "Alma Penada", en: "Lost Soul" },
      icon: "ghost",
      color: "text-purple-400",
      hpMult: 4,
      dmgMult: 4,
      spd: 700,
      weak: "mag",
      res: "atk",
      dodge: 0.2,
      block: 0,
    },
    {
      id: "dragon",
      name: { pt: "Dragão da Forja", en: "Forge Dragon" },
      icon: "flame",
      color: "text-red-600",
      hpMult: 8,
      dmgMult: 6,
      spd: 1200,
      weak: "atk",
      res: "mag",
      dodge: 0.05,
      block: 0.2,
    },
    {
      id: "glitch",
      name: { pt: "Glitch Viral", en: "Viral Glitch" },
      icon: "bug",
      color: "text-green-400",
      hpMult: 12,
      dmgMult: 8,
      spd: 800,
      weak: "mag",
      res: "atk",
      dodge: 0.25,
      block: 0.05,
    },
    {
      id: "trojan",
      name: { pt: "Cavalo de Trojan", en: "Trojan Horse" },
      icon: "shield-alert",
      color: "text-orange-600",
      hpMult: 18,
      dmgMult: 10,
      spd: 1000,
      weak: "atk",
      res: "mag",
      dodge: 0.1,
      block: 0.25,
    },
    {
      id: "ransomware",
      name: { pt: "Ransomware", en: "Ransomware" },
      icon: "lock",
      color: "text-yellow-500",
      hpMult: 25,
      dmgMult: 15,
      spd: 1300,
      weak: "mag",
      res: "none",
      dodge: 0,
      block: 0.35,
    },
    {
      id: "rogue_ai",
      name: { pt: "I.A. Renegada", en: "Rogue A.I." },
      icon: "cpu",
      color: "text-cyan-500",
      hpMult: 35,
      dmgMult: 25,
      spd: 600,
      weak: "atk",
      res: "mag",
      dodge: 0.3,
      block: 0.1,
    },
    {
      id: "void_walker",
      name: { pt: "Andarilho do Vazio", en: "Void Walker" },
      icon: "ghost",
      color: "text-purple-300",
      hpMult: 50,
      dmgMult: 35,
      spd: 750,
      weak: "mag",
      res: "atk",
      dodge: 0.35,
      block: 0.1,
    },
    {
      id: "star_eater",
      name: { pt: "Devorador de Estrelas", en: "Star Eater" },
      icon: "flame",
      color: "text-orange-400",
      hpMult: 80,
      dmgMult: 50,
      spd: 1200,
      weak: "atk",
      res: "mag",
      dodge: 0.1,
      block: 0.3,
    },
    {
      id: "time_warden",
      name: { pt: "Guardião do Tempo", en: "Time Warden" },
      icon: "hourglass",
      color: "text-yellow-200",
      hpMult: 120,
      dmgMult: 80,
      spd: 1400,
      weak: "mag",
      res: "none",
      dodge: 0.2,
      block: 0.4,
    },
    {
      id: "the_architect_minion",
      name: { pt: "Servo Cósmico", en: "Cosmic Minion" },
      icon: "eye",
      color: "text-white",
      hpMult: 200,
      dmgMult: 150,
      spd: 850,
      weak: "none",
      res: "none",
      dodge: 0.4,
      block: 0.2,
    },
    {
      id: "fractal_hound",
      name: { pt: "Sabujo Fractal", en: "Fractal Hound" },
      icon: "triangle",
      color: "text-pink-400",
      hpMult: 350,
      dmgMult: 300,
      spd: 650,
      weak: "atk",
      res: "mag",
      dodge: 0.45,
      block: 0,
    },
    {
      id: "echo_god",
      name: { pt: "Eco de um Deus", en: "Echo of a God" },
      icon: "zap",
      color: "text-purple-300",
      hpMult: 600,
      dmgMult: 500,
      spd: 900,
      weak: "mag",
      res: "none",
      dodge: 0.2,
      block: 0.3,
    },
    {
      id: "nexus_guard",
      name: { pt: "Sentinela do Nexus", en: "Nexus Sentinel" },
      icon: "shield",
      color: "text-blue-300",
      hpMult: 1000,
      dmgMult: 800,
      spd: 1300,
      weak: "none",
      res: "atk",
      dodge: 0.1,
      block: 0.5,
    },
    {
      id: "syntax_error",
      name: { pt: "Erro de Sintaxe", en: "Syntax Error" },
      icon: "code",
      color: "text-emerald-500",
      hpMult: 1500,
      dmgMult: 1200,
      spd: 800,
      weak: "mag",
      res: "atk",
      dodge: 0.4,
      block: 0,
    },
    {
      id: "memory_leak",
      name: { pt: "Memory Leak", en: "Memory Leak" },
      icon: "binary",
      color: "text-emerald-400",
      hpMult: 2500,
      dmgMult: 1800,
      spd: 1100,
      weak: "atk",
      res: "none",
      dodge: 0.2,
      block: 0.2,
    },
    {
      id: "infinite_loop",
      name: { pt: "Loop Infinito", en: "Infinite Loop" },
      icon: "refresh-cw",
      color: "text-emerald-300",
      hpMult: 4000,
      dmgMult: 3000,
      spd: 1300,
      weak: "none",
      res: "mag",
      dodge: 0.1,
      block: 0.4,
    },
    {
      id: "corrupted_file",
      name: { pt: "Ficheiro Corrompido", en: "Corrupted File" },
      icon: "file-warning",
      color: "text-gray-400",
      hpMult: 6000,
      dmgMult: 5000,
      spd: 900,
      weak: "mag",
      res: "none",
      dodge: 0.3,
      block: 0.3,
    },
    {
      id: "dev_bot",
      name: { pt: "Bot de Teste", en: "Test Bot" },
      icon: "bot",
      color: "text-white",
      hpMult: 8000,
      dmgMult: 7000,
      spd: 700,
      weak: "atk",
      res: "mag",
      dodge: 0.5,
      block: 0.1,
    },
    {
      id: "static_dust",
      name: { pt: "Poeira Estática", en: "Static Dust" },
      icon: "wind",
      color: "text-orange-300",
      hpMult: 12000,
      dmgMult: 10000,
      spd: 600,
      weak: "mag",
      res: "atk",
      dodge: 0.6,
      block: 0,
    },
    {
      id: "voltage_spike",
      name: { pt: "Pico de Tensão", en: "Voltage Spike" },
      icon: "zap",
      color: "text-yellow-400",
      hpMult: 18000,
      dmgMult: 15000,
      spd: 800,
      weak: "atk",
      res: "none",
      dodge: 0.4,
      block: 0.2,
    },
    {
      id: "broken_ram",
      name: { pt: "Memória Frita", en: "Fried RAM" },
      icon: "server",
      color: "text-red-500",
      hpMult: 25000,
      dmgMult: 20000,
      spd: 1200,
      weak: "none",
      res: "mag",
      dodge: 0.1,
      block: 0.5,
    },
    {
      id: "infinite_pi",
      name: { pt: "Pi Infinito", en: "Infinite Pi" },
      icon: "circle-dashed",
      color: "text-gray-100",
      hpMult: 40000,
      dmgMult: 35000,
      spd: 900,
      weak: "mag",
      res: "atk",
      dodge: 0.3,
      block: 0.3,
    },
    {
      id: "unsolvable",
      name: { pt: "Equação Irresolvível", en: "Unsolvable Eq" },
      icon: "calculator",
      color: "text-yellow-100",
      hpMult: 60000,
      dmgMult: 50000,
      spd: 1100,
      weak: "atk",
      res: "none",
      dodge: 0.2,
      block: 0.6,
    },
    {
      id: "floating_point",
      name: { pt: "Erro Decimal", en: "Floating Point" },
      icon: "percent",
      color: "text-blue-100",
      hpMult: 90000,
      dmgMult: 80000,
      spd: 700,
      weak: "none",
      res: "mag",
      dodge: 0.7,
      block: 0.1,
    },
    {
      id: "corrupted_fragment",
      name: { pt: "Fragmento Corrompido", en: "Corrupted Fragment" },
      icon: "triangle-alert",
      color: "text-rose-500",
      hpMult: 250000,
      dmgMult: 200000,
      spd: 600,
      weak: "mag",
      res: "atk",
      dodge: 0.5,
      block: 0.4,
    },
    {
      id: "living_paradox",
      name: { pt: "Paradoxo Vivo", en: "Living Paradox" },
      icon: "infinity",
      color: "text-rose-400",
      hpMult: 400000,
      dmgMult: 350000,
      spd: 800,
      weak: "atk",
      res: "mag",
      dodge: 0.6,
      block: 0.3,
    },
    {
      id: "unnamable",
      name: { pt: "O Inominável", en: "The Unnamable" },
      icon: "eye-off",
      color: "text-rose-700",
      hpMult: 600000,
      dmgMult: 500000,
      spd: 900,
      weak: "none",
      res: "none",
      dodge: 0.7,
      block: 0.5,
    },
    {
      id: "ghost_process",
      name: { pt: "Processo Fantasma", en: "Ghost Process" },
      icon: "wind",
      color: "text-cyan-300",
      hpMult: 1000000,
      dmgMult: 800000,
      spd: 500,
      weak: "mag",
      res: "atk",
      dodge: 0.8,
      block: 0.2,
    },
    {
      id: "bad_sector",
      name: { pt: "Setor Defeituoso", en: "Bad Sector" },
      icon: "hard-drive",
      color: "text-cyan-600",
      hpMult: 2000000,
      dmgMult: 1500000,
      spd: 1100,
      weak: "atk",
      res: "none",
      dodge: 0.1,
      block: 0.8,
    },
    {
      id: "blue_screen",
      name: { pt: "Tela Azul", en: "Blue Screen" },
      icon: "monitor-off",
      color: "text-blue-500",
      hpMult: 3500000,
      dmgMult: 3000000,
      spd: 700,
      weak: "none",
      res: "mag",
      dodge: 0.5,
      block: 0.5,
    },
    {
      id: "false_idol",
      name: { pt: "Ídolo Sintético", en: "Synthetic Idol" },
      icon: "scan-line",
      color: "text-yellow-200",
      hpMult: 8000000,
      dmgMult: 7000000,
      spd: 500,
      weak: "mag",
      res: "none",
      dodge: 0.6,
      block: 0.4,
    },
    {
      id: "pure_void",
      name: { pt: "O Vazio Puro", en: "The Pure Void" },
      icon: "mouse-pointer-click",
      color: "text-white",
      hpMult: 25000000,
      dmgMult: 20000000,
      spd: 400,
      weak: "atk",
      res: "none",
      dodge: 0.8,
      block: 0.6,
    },
    {
      id: "quantum_ghost",
      name: { pt: "Fantasma Quântico", en: "Quantum Ghost" },
      icon: "waves",
      color: "text-violet-300",
      hpMult: 80000000,
      dmgMult: 70000000,
      spd: 450,
      weak: "mag",
      res: "atk",
      dodge: 0.85,
      block: 0.1,
    },
    {
      id: "entangled_demon",
      name: { pt: "Demônio Entrelaçado", en: "Entangled Demon" },
      icon: "link",
      color: "text-violet-500",
      hpMult: 200000000,
      dmgMult: 180000000,
      spd: 550,
      weak: "atk",
      res: "mag",
      dodge: 0.4,
      block: 0.7,
    },
    {
      id: "superposition",
      name: { pt: "Superposição", en: "Superposition" },
      icon: "layers",
      color: "text-fuchsia-400",
      hpMult: 500000000,
      dmgMult: 450000000,
      spd: 350,
      weak: "none",
      res: "none",
      dodge: 0.9,
      block: 0.5,
    },
  ],

  weapons: [
    {
      id: "w_fist",
      name: { pt: "Mãos Nuas", en: "Bare Hands" },
      desc: { pt: "10 Dano", en: "10 Dmg" },
      icon: "hand",
      cost: 0,
      reqLvl: 1,
      reqBosses: 0,
      dmg: 10,
      crit: 0,
    },
    {
      id: "w_dagger",
      name: { pt: "Adaga", en: "Rusty Dagger" },
      desc: { pt: "30 Dano", en: "30 Dmg" },
      icon: "scissors",
      cost: 30,
      reqLvl: 1,
      reqBosses: 0,
      dmg: 30,
      crit: 0.05,
    },
    {
      id: "w_bow",
      name: { pt: "Arco Curto", en: "Short Bow" },
      desc: { pt: "60 Dano", en: "60 Dmg" },
      icon: "crosshair",
      cost: 100,
      reqLvl: 1,
      reqBosses: 0,
      dmg: 60,
      crit: 0.1,
    },
    {
      id: "w_sword",
      name: { pt: "Espada Larga", en: "Broadsword" },
      desc: { pt: "100 Dano", en: "100 Dmg" },
      icon: "sword",
      cost: 250,
      reqLvl: 1,
      reqBosses: 0,
      dmg: 100,
      crit: 0.02,
    },
    {
      id: "w_katana",
      name: { pt: "Katana", en: "Shadow Katana" },
      desc: { pt: "200 Dano", en: "200 Dmg" },
      icon: "zap",
      cost: 600,
      reqLvl: 5,
      reqBosses: 0,
      dmg: 200,
      crit: 0.2,
    },
    {
      id: "w_axe",
      name: { pt: "Machado", en: "Fury Axe" },
      desc: { pt: "400 Dano", en: "400 Dmg" },
      icon: "axe",
      cost: 1500,
      reqLvl: 10,
      reqBosses: 0,
      dmg: 400,
      crit: 0.1,
    },
    {
      id: "w_scythe",
      name: { pt: "Foice", en: "Reaper Scythe" },
      desc: { pt: "800 Dano", en: "800 Dmg" },
      icon: "wind",
      cost: 3500,
      reqLvl: 15,
      reqBosses: 0,
      dmg: 800,
      crit: 0.25,
    },
    {
      id: "w_magic",
      name: { pt: "Cajado", en: "Ember Staff" },
      desc: { pt: "1.5K Dano", en: "1.5K Dmg" },
      icon: "wand-2",
      cost: 7000,
      reqLvl: 20,
      reqBosses: 1,
      dmg: 1500,
      crit: 0.15,
    },
    {
      id: "w_hammer",
      name: { pt: "Martelo", en: "Titanic Hammer" },
      desc: { pt: "3K Dano", en: "3K Dmg" },
      icon: "hammer",
      cost: 14000,
      reqLvl: 30,
      reqBosses: 1,
      dmg: 3000,
      crit: 0.05,
    },
    {
      id: "w_god",
      name: { pt: "Quebra-Mundos", en: "World Breaker" },
      desc: { pt: "8K Dano", en: "8K Dmg" },
      icon: "swords",
      cost: 30000,
      reqLvl: 40,
      reqBosses: 1,
      dmg: 8000,
      crit: 0.3,
    },
    {
      id: "w_pistol",
      name: { pt: "Pistola", en: "Magnetic Pistol" },
      desc: { pt: "12K Dano", en: "12K Dmg" },
      icon: "crosshair",
      cost: 50000,
      reqLvl: 50,
      reqBosses: 2,
      dmg: 12000,
      crit: 0.2,
    },
    {
      id: "w_usb",
      name: { pt: "Espada USB", en: "Frequency Sword" },
      desc: { pt: "18K Dano", en: "18K Dmg" },
      icon: "zap",
      cost: 75000,
      reqLvl: 65,
      reqBosses: 2,
      dmg: 18000,
      crit: 0.35,
    },
    {
      id: "w_plasma",
      name: { pt: "Plasma", en: "Plasma Blade" },
      desc: { pt: "25K Dano", en: "25K Dmg" },
      icon: "flame",
      cost: 120000,
      reqLvl: 80,
      reqBosses: 3,
      dmg: 25000,
      crit: 0.4,
    },
    {
      id: "w_cannon",
      name: { pt: "Canhão", en: "Antimatter Cannon" },
      desc: { pt: "40K Dano", en: "40K Dmg" },
      icon: "target",
      cost: 200000,
      reqLvl: 100,
      reqBosses: 3,
      dmg: 40000,
      crit: 0.25,
    },
    {
      id: "w_quantum",
      name: { pt: "Fenda Quântica", en: "Quantum Rift" },
      desc: { pt: "60K Dano", en: "60K Dmg" },
      icon: "activity",
      cost: 350000,
      reqLvl: 125,
      reqBosses: 3,
      dmg: 60000,
      crit: 0.5,
    },
    {
      id: "w_comet",
      name: { pt: "Lança Cometa", en: "Comet Spear" },
      desc: { pt: "90K Dano", en: "90K Dmg" },
      icon: "rocket",
      cost: 600000,
      reqLvl: 150,
      reqBosses: 4,
      dmg: 90000,
      crit: 0.4,
    },
    {
      id: "w_nebula",
      name: { pt: "Foice da Nebulosa", en: "Nebula Scythe" },
      desc: { pt: "150K Dano", en: "150K Dmg" },
      icon: "tornado",
      cost: 900000,
      reqLvl: 180,
      reqBosses: 4,
      dmg: 150000,
      crit: 0.6,
    },
    {
      id: "w_creation",
      name: { pt: "Espada da Gênese", en: "Genesis Sword" },
      desc: { pt: "250K Dano", en: "250K Dmg" },
      icon: "sun",
      cost: 1500000,
      reqLvl: 210,
      reqBosses: 4,
      dmg: 250000,
      crit: 0.75,
    },
    {
      id: "w_blackhole",
      name: { pt: "Colapsar de Estrelas", en: "Star Collapser" },
      desc: { pt: "400K Dano", en: "400K Dmg" },
      icon: "circle-dot",
      cost: 2500000,
      reqLvl: 250,
      reqBosses: 5,
      dmg: 400000,
      crit: 0.5,
    },
    {
      id: "w_infinity",
      name: { pt: "Lâmina Infinito", en: "Infinity Blade" },
      desc: { pt: "650K Dano", en: "650K Dmg" },
      icon: "infinity",
      cost: 5000000,
      reqLvl: 300,
      reqBosses: 5,
      dmg: 650000,
      crit: 0.9,
    },
    {
      id: "w_stardust",
      name: { pt: "Poeira Estelar", en: "Stardust" },
      desc: { pt: "1M Dano", en: "1M Dmg" },
      icon: "sparkles",
      cost: 8000000,
      reqLvl: 350,
      reqBosses: 5,
      dmg: 1000000,
      crit: 0.8,
    },
    {
      id: "w_quasar",
      name: { pt: "Lança Quasar", en: "Quasar Spear" },
      desc: { pt: "2M Dano", en: "2M Dmg" },
      icon: "aperture",
      cost: 15000000,
      reqLvl: 400,
      reqBosses: 6,
      dmg: 2000000,
      crit: 0.95,
    },
    {
      id: "w_omniverse",
      name: { pt: "Lâmina Ômega", en: "Omega Blade" },
      desc: { pt: "3.5M Dano", en: "3.5M Dmg" },
      icon: "star",
      cost: 25000000,
      reqLvl: 450,
      reqBosses: 6,
      dmg: 3500000,
      crit: 1.0,
    },
    {
      id: "w_keyboard",
      name: { pt: "Console de Debug", en: "Debug Console" },
      desc: { pt: "6M Dano", en: "6M Dmg" },
      icon: "terminal",
      cost: 40000000,
      reqLvl: 500,
      reqBosses: 7,
      dmg: 6000000,
      crit: 1.0,
    },
    {
      id: "w_root",
      name: { pt: "Permissão Sudo", en: "Sudo Permission" },
      desc: { pt: "10M Dano", en: "10M Dmg" },
      icon: "hash",
      cost: 70000000,
      reqLvl: 550,
      reqBosses: 7,
      dmg: 10000000,
      crit: 1.0,
    },
    {
      id: "w_dev",
      name: { pt: "Delete Sem Backup", en: "Delete No Backup" },
      desc: { pt: "25M Dano", en: "25M Dmg" },
      icon: "trash-2",
      cost: 150000000,
      reqLvl: 600,
      reqBosses: 7,
      dmg: 25000000,
      crit: 1.0,
    },
    {
      id: "w_silicon",
      name: { pt: "Lâmina de Silício", en: "Silicon Blade" },
      desc: { pt: "60M Dano", en: "60M Dmg" },
      icon: "cpu",
      cost: 350000000,
      reqLvl: 650,
      reqBosses: 8,
      dmg: 60000000,
      crit: 1.0,
    },
    {
      id: "w_optic",
      name: { pt: "Fibra Ótica", en: "Fiber Optic Whip" },
      desc: { pt: "120M Dano", en: "120M Dmg" },
      icon: "zap",
      cost: 800000000,
      reqLvl: 700,
      reqBosses: 8,
      dmg: 120000000,
      crit: 1.0,
    },
    {
      id: "w_fibonacci",
      name: { pt: "Espada Fibonacci", en: "Fibonacci Sword" },
      desc: { pt: "250M Dano", en: "250M Dmg" },
      icon: "bar-chart",
      cost: 1800000000,
      reqLvl: 800,
      reqBosses: 9,
      dmg: 250000000,
      crit: 1.0,
    },
    {
      id: "w_theorem",
      name: { pt: "Teorema Final", en: "The Final Theorem" },
      desc: { pt: "600M Dano", en: "600M Dmg" },
      icon: "function-square",
      cost: 5000000000,
      reqLvl: 900,
      reqBosses: 9,
      dmg: 600000000,
      crit: 1.0,
    },
    {
      id: "w_entropy",
      name: { pt: "Lâmina Entropia", en: "Entropy Blade" },
      desc: { pt: "1.5B Dano", en: "1.5B Dmg" },
      icon: "flame",
      cost: 15000000000,
      reqLvl: 1000,
      reqBosses: 10,
      dmg: 1500000000,
      crit: 1.0,
    },
    {
      id: "w_glitch",
      name: { pt: "A Falha", en: "The Glitch" },
      desc: { pt: "5B Dano", en: "5B Dmg" },
      icon: "triangle-alert",
      cost: 50000000000,
      reqLvl: 1100,
      reqBosses: 10,
      dmg: 5000000000,
      crit: 1.0,
    },
    {
      id: "w_reboot",
      name: { pt: "Espada do Reboot", en: "Reboot Sword" },
      desc: { pt: "15B Dano", en: "15B Dmg" },
      icon: "power",
      cost: 150000000000,
      reqLvl: 1250,
      reqBosses: 11,
      dmg: 15000000000,
      crit: 1.0,
    },
    {
      id: "w_mirror",
      name: { pt: "Cópia Perfeita", en: "Perfect Mirror" },
      desc: { pt: "50B Dano", en: "50B Dmg" },
      icon: "scan-line",
      cost: 1000000000000,
      reqLvl: 1500,
      reqBosses: 12,
      dmg: 50000000000,
      crit: 1.0,
    },
    {
      id: "w_blank",
      name: { pt: "O Espaço Branco", en: "The Blank Space" },
      desc: { pt: "200B Dano", en: "200B Dmg" },
      icon: "mouse-pointer-click",
      cost: 5000000000000,
      reqLvl: 2000,
      reqBosses: 13,
      dmg: 200000000000,
      crit: 1.0,
    },
    {
      id: "w_qubit",
      name: { pt: "Lança Qubit", en: "Qubit Lance" },
      desc: { pt: "1T Dano", en: "1T Dmg" },
      icon: "atom",
      cost: 30000000000000,
      reqLvl: 2200,
      reqBosses: 14,
      dmg: 1000000000000,
      crit: 1.0,
    },
    {
      id: "w_collapse",
      name: { pt: "Colapso Total", en: "Total Collapse" },
      desc: { pt: "5T Dano", en: "5T Dmg" },
      icon: "minimize-2",
      cost: 200000000000000,
      reqLvl: 2500,
      reqBosses: 14,
      dmg: 5000000000000,
      crit: 1.0,
    },
  ],

  armors: [
    {
      id: "a_rags",
      name: { pt: "Trapos Queimados", en: "Burned Rags" },
      desc: { pt: "100 HP, 0% Def", en: "100 HP, 0% Def" },
      icon: "shirt",
      cost: 0,
      reqLvl: 1,
      reqBosses: 0,
      hp: 100,
      def: 0,
      dodge: 0,
    },
    {
      id: "a_leather",
      name: { pt: "Couro Fervido", en: "Boiled Leather" },
      desc: { pt: "300 HP, 10% Def", en: "300 HP, 10% Def" },
      icon: "shield-half",
      cost: 50,
      reqLvl: 1,
      reqBosses: 0,
      hp: 300,
      def: 0.1,
      dodge: 0.05,
    },
    {
      id: "a_chain",
      name: { pt: "Cota de Malha", en: "Chainmail" },
      desc: { pt: "600 HP, 15% Def", en: "600 HP, 15% Def" },
      icon: "shield",
      cost: 150,
      reqLvl: 5,
      reqBosses: 0,
      hp: 600,
      def: 0.15,
      dodge: 0.05,
    },
    {
      id: "a_iron",
      name: { pt: "Cota de Aço", en: "Steel Mail" },
      desc: { pt: "1K HP, 25% Def", en: "1K HP, 25% Def" },
      icon: "shield",
      cost: 350,
      reqLvl: 10,
      reqBosses: 0,
      hp: 1000,
      def: 0.25,
      dodge: 0.05,
    },
    {
      id: "a_mythril",
      name: { pt: "Malha Mithril", en: "Mythril Mail" },
      desc: { pt: "2.5K HP, 35% Def", en: "2.5K HP, 35% Def" },
      icon: "shield-plus",
      cost: 1000,
      reqLvl: 15,
      reqBosses: 0,
      hp: 2500,
      def: 0.35,
      dodge: 0.1,
    },
    {
      id: "a_gold",
      name: { pt: "Armadura Guarda", en: "Guard Armor" },
      desc: { pt: "5K HP, 45% Def", en: "5K HP, 45% Def" },
      icon: "shield-check",
      cost: 2500,
      reqLvl: 20,
      reqBosses: 1,
      hp: 5000,
      def: 0.45,
      dodge: 0.05,
    },
    {
      id: "a_paladin",
      name: { pt: "Placas Paladino", en: "Paladin Plates" },
      desc: { pt: "8.5K HP, 50% Def", en: "8.5K HP, 50% Def" },
      icon: "shield",
      cost: 4500,
      reqLvl: 30,
      reqBosses: 1,
      hp: 8500,
      def: 0.5,
      dodge: 0.05,
    },
    {
      id: "a_dragon",
      name: { pt: "Escamas Dragão", en: "Dragon Scales" },
      desc: { pt: "12K HP, 55% Def", en: "12K HP, 55% Def" },
      icon: "flame",
      cost: 7000,
      reqLvl: 40,
      reqBosses: 1,
      hp: 12000,
      def: 0.55,
      dodge: 0.05,
    },
    {
      id: "a_demon",
      name: { pt: "Carapaça Balrog", en: "Balrog Shell" },
      desc: { pt: "20K HP, 65% Def", en: "20K HP, 65% Def" },
      icon: "shield-alert",
      cost: 15000,
      reqLvl: 50,
      reqBosses: 2,
      hp: 20000,
      def: 0.65,
      dodge: 0.15,
    },
    {
      id: "a_void",
      name: { pt: "Manto do Vazio", en: "Void Mantle" },
      desc: { pt: "35K HP, 75% Def", en: "35K HP, 75% Def" },
      icon: "moon",
      cost: 30000,
      reqLvl: 65,
      reqBosses: 2,
      hp: 35000,
      def: 0.75,
      dodge: 0.25,
    },
    {
      id: "a_neon",
      name: { pt: "Colete Neon", en: "Neon Vest" },
      desc: { pt: "55K HP, 78% Def", en: "55K HP, 78% Def" },
      icon: "layers",
      cost: 60000,
      reqLvl: 80,
      reqBosses: 3,
      hp: 55000,
      def: 0.78,
      dodge: 0.1,
    },
    {
      id: "a_graphene",
      name: { pt: "Exoesqueleto", en: "Exosuit" },
      desc: { pt: "80K HP, 80% Def", en: "80K HP, 80% Def" },
      icon: "hexagon",
      cost: 90000,
      reqLvl: 100,
      reqBosses: 3,
      hp: 80000,
      def: 0.8,
      dodge: 0.15,
    },
    {
      id: "a_forcefield",
      name: { pt: "Campo de Força", en: "Force Field" },
      desc: { pt: "120K HP, 82% Def", en: "120K HP, 82% Def" },
      icon: "scan",
      cost: 150000,
      reqLvl: 125,
      reqBosses: 3,
      hp: 120000,
      def: 0.82,
      dodge: 0.2,
    },
    {
      id: "a_nano",
      name: { pt: "Nanotraje", en: "Nanosuit" },
      desc: { pt: "200K HP, 85% Def", en: "200K HP, 85% Def" },
      icon: "layers",
      cost: 220000,
      reqLvl: 150,
      reqBosses: 4,
      hp: 200000,
      def: 0.85,
      dodge: 0.35,
    },
    {
      id: "a_supernova",
      name: { pt: "Escudo Supernova", en: "Supernova Shield" },
      desc: { pt: "350K HP, 88% Def", en: "350K HP, 88% Def" },
      icon: "sun",
      cost: 400000,
      reqLvl: 180,
      reqBosses: 4,
      hp: 350000,
      def: 0.88,
      dodge: 0.3,
    },
    {
      id: "a_stellar",
      name: { pt: "Armadura Estelar", en: "Stellar Armor" },
      desc: { pt: "600K HP, 90% Def", en: "600K HP, 90% Def" },
      icon: "shield-plus",
      cost: 700000,
      reqLvl: 210,
      reqBosses: 4,
      hp: 600000,
      def: 0.9,
      dodge: 0.4,
    },
    {
      id: "a_multiverse",
      name: { pt: "Barreira Multiverso", en: "Multiverse Barrier" },
      desc: { pt: "1M HP, 92% Def", en: "1M HP, 92% Def" },
      icon: "globe",
      cost: 1200000,
      reqLvl: 250,
      reqBosses: 5,
      hp: 1000000,
      def: 0.92,
      dodge: 0.45,
    },
    {
      id: "a_infinity",
      name: { pt: "Manto Eternidade", en: "Eternity Mantle" },
      desc: { pt: "2M HP, 95% Def", en: "2M HP, 95% Def" },
      icon: "sparkles",
      cost: 2500000,
      reqLvl: 300,
      reqBosses: 5,
      hp: 2000000,
      def: 0.95,
      dodge: 0.5,
    },
    {
      id: "a_celestial",
      name: { pt: "Túnica Celestial", en: "Celestial Tunic" },
      desc: { pt: "4M HP, 96% Def", en: "4M HP, 96% Def" },
      icon: "wind",
      cost: 5000000,
      reqLvl: 350,
      reqBosses: 5,
      hp: 4000000,
      def: 0.96,
      dodge: 0.55,
    },
    {
      id: "a_quasar",
      name: { pt: "Couraça Quasar", en: "Quasar Breastplate" },
      desc: { pt: "7M HP, 98% Def", en: "7M HP, 98% Def" },
      icon: "aperture",
      cost: 10000000,
      reqLvl: 400,
      reqBosses: 6,
      hp: 7000000,
      def: 0.98,
      dodge: 0.6,
    },
    {
      id: "a_omega",
      name: { pt: "Escudo Omniverso", en: "Omniverse Shield" },
      desc: { pt: "15M HP, 99% Def", en: "15M HP, 99% Def" },
      icon: "triangle",
      cost: 20000000,
      reqLvl: 450,
      reqBosses: 6,
      hp: 15000000,
      def: 0.99,
      dodge: 0.7,
    },
    {
      id: "a_safemode",
      name: { pt: "Modo Segurança", en: "Safe Mode" },
      desc: { pt: "30M HP, 99% Def", en: "30M HP, 99% Def" },
      icon: "shield-alert",
      cost: 35000000,
      reqLvl: 500,
      reqBosses: 7,
      hp: 30000000,
      def: 0.99,
      dodge: 0.8,
    },
    {
      id: "a_godmode",
      name: { pt: "Modo Deus", en: "God Mode" },
      desc: { pt: "60M HP, 99% Def", en: "60M HP, 99% Def" },
      icon: "check-circle",
      cost: 65000000,
      reqLvl: 550,
      reqBosses: 7,
      hp: 60000000,
      def: 0.99,
      dodge: 0.9,
    },
    {
      id: "a_firewall",
      name: { pt: "Firewall Absoluto", en: "Absolute Firewall" },
      desc: { pt: "150M HP, 99% Def", en: "150M HP, 99% Def" },
      icon: "server",
      cost: 150000000,
      reqLvl: 600,
      reqBosses: 7,
      hp: 150000000,
      def: 0.99,
      dodge: 0.95,
    },
    {
      id: "a_heatsink",
      name: { pt: "Dissipador Calor", en: "Heatsink" },
      desc: { pt: "350M HP, 99% Def", en: "350M HP, 99% Def" },
      icon: "fan",
      cost: 350000000,
      reqLvl: 650,
      reqBosses: 8,
      hp: 350000000,
      def: 0.99,
      dodge: 0.95,
    },
    {
      id: "a_titanium",
      name: { pt: "Chassi Titânio", en: "Titanium Chassis" },
      desc: { pt: "800M HP, 99% Def", en: "800M HP, 99% Def" },
      icon: "hard-drive",
      cost: 900000000,
      reqLvl: 700,
      reqBosses: 8,
      hp: 800000000,
      def: 0.99,
      dodge: 0.95,
    },
    {
      id: "a_euler",
      name: { pt: "Barreira Euler", en: "Euler Barrier" },
      desc: { pt: "2B HP, 99% Def", en: "2B HP, 99% Def" },
      icon: "circle-dashed",
      cost: 2200000000,
      reqLvl: 800,
      reqBosses: 9,
      hp: 2000000000,
      def: 0.99,
      dodge: 0.98,
    },
    {
      id: "a_mobius",
      name: { pt: "Manto de Möbius", en: "Möbius Mantle" },
      desc: { pt: "5B HP, 99% Def", en: "5B HP, 99% Def" },
      icon: "infinity",
      cost: 6000000000,
      reqLvl: 900,
      reqBosses: 9,
      hp: 5000000000,
      def: 0.99,
      dodge: 0.99,
    },
    {
      id: "a_entropic",
      name: { pt: "Manto Entrópico", en: "Entropic Mantle" },
      desc: { pt: "15B HP, 99% Def", en: "15B HP, 99% Def" },
      icon: "wind",
      cost: 20000000000,
      reqLvl: 1000,
      reqBosses: 10,
      hp: 15000000000,
      def: 0.99,
      dodge: 0.99,
    },
    {
      id: "a_chaos",
      name: { pt: "Armadura do Caos", en: "Chaos Armor" },
      desc: { pt: "40B HP, 99% Def", en: "40B HP, 99% Def" },
      icon: "triangle-alert",
      cost: 60000000000,
      reqLvl: 1100,
      reqBosses: 10,
      hp: 40000000000,
      def: 0.99,
      dodge: 0.99,
    },
    {
      id: "a_reboot",
      name: { pt: "Manto do Reset", en: "Reset Mantle" },
      desc: { pt: "100B HP", en: "100B HP" },
      icon: "power",
      cost: 200000000000,
      reqLvl: 1250,
      reqBosses: 11,
      hp: 100000000000,
      def: 0.99,
      dodge: 0.99,
    },
    {
      id: "a_synthetic",
      name: { pt: "Carapaça Sintética", en: "Synthetic Shell" },
      desc: { pt: "400B HP", en: "400B HP" },
      icon: "scan-line",
      cost: 1500000000000,
      reqLvl: 1500,
      reqBosses: 12,
      hp: 400000000000,
      def: 0.99,
      dodge: 0.99,
    },
    {
      id: "a_voidlight",
      name: { pt: "A Luz do Vazio", en: "The Voidlight" },
      desc: { pt: "2T HP", en: "2T HP" },
      icon: "mouse-pointer-click",
      cost: 8000000000000,
      reqLvl: 2000,
      reqBosses: 13,
      hp: 2000000000000,
      def: 0.99,
      dodge: 0.99,
    },
    {
      id: "a_superposition",
      name: { pt: "Armadura Superposição", en: "Superposition Armor" },
      desc: { pt: "10T HP", en: "10T HP" },
      icon: "layers",
      cost: 50000000000000,
      reqLvl: 2200,
      reqBosses: 14,
      hp: 10000000000000,
      def: 0.99,
      dodge: 0.99,
    },
    {
      id: "a_quantum_core",
      name: { pt: "Núcleo Quântico", en: "Quantum Core Armor" },
      desc: { pt: "50T HP", en: "50T HP" },
      icon: "atom",
      cost: 300000000000000,
      reqLvl: 2500,
      reqBosses: 14,
      hp: 50000000000000,
      def: 0.99,
      dodge: 0.99,
    },
  ],

  pets: [
    {
      id: "p_none",
      name: { pt: "Sem Mascote", en: "No Pet" },
      desc: { pt: "Apenas solidão.", en: "Just solitude." },
      icon: "paw-print",
      cost: 0,
      reqLvl: 1,
      reqBosses: 0,
      buff: "none",
    },
    {
      id: "p_fairy",
      name: { pt: "Fada Ígnea", en: "Fire Fairy" },
      desc: { pt: "+20% Vida", en: "+20% HP" },
      icon: "sparkles",
      cost: 300,
      reqLvl: 5,
      reqBosses: 0,
      buff: "hp",
    },
    {
      id: "p_crow",
      name: { pt: "Corvo", en: "Spirit Crow" },
      desc: { pt: "+10% Crítico", en: "+10% Crit" },
      icon: "bird",
      cost: 800,
      reqLvl: 10,
      reqBosses: 0,
      buff: "crit",
    },
    {
      id: "p_wolf",
      name: { pt: "Cão de Caça", en: "Hunting Dog" },
      desc: { pt: "+15% Crítico", en: "+15% Crit" },
      icon: "dog",
      cost: 1800,
      reqLvl: 15,
      reqBosses: 0,
      buff: "crit",
    },
    {
      id: "p_golem",
      name: { pt: "Golem", en: "Stone Golem" },
      desc: { pt: "+20% Esquiva", en: "+20% Dodge" },
      icon: "box",
      cost: 4500,
      reqLvl: 30,
      reqBosses: 1,
      buff: "dodge",
    },
    {
      id: "p_panther",
      name: { pt: "Pantera", en: "Shadow Panther" },
      desc: { pt: "+25% Esquiva", en: "+25% Dodge" },
      icon: "cat",
      cost: 8000,
      reqLvl: 40,
      reqBosses: 1,
      buff: "dodge",
    },
    {
      id: "p_dragon",
      name: { pt: "Wyvern", en: "Wyvern" },
      desc: { pt: "+30% Dano", en: "+30% Dmg" },
      icon: "flame",
      cost: 12000,
      reqLvl: 50,
      reqBosses: 2,
      buff: "dmg",
    },
    {
      id: "p_drone",
      name: { pt: "Drone Tático", en: "Tactical Drone" },
      desc: { pt: "+40% Vida", en: "+40% HP" },
      icon: "battery-charging",
      cost: 40000,
      reqLvl: 80,
      reqBosses: 3,
      buff: "hp",
    },
    {
      id: "p_turret",
      name: { pt: "Mini-Torreta", en: "Mini-Turret" },
      desc: { pt: "+40% Dano", en: "+40% Dmg" },
      icon: "crosshair",
      cost: 75000,
      reqLvl: 100,
      reqBosses: 3,
      buff: "dmg",
    },
    {
      id: "p_hologram",
      name: { pt: "Holograma", en: "Hologram" },
      desc: { pt: "+50% Dano", en: "+50% Dmg" },
      icon: "users",
      cost: 120000,
      reqLvl: 125,
      reqBosses: 3,
      buff: "dmg",
    },
    {
      id: "p_orb",
      name: { pt: "Orbe", en: "Dimensional Orb" },
      desc: { pt: "+60% Vida", en: "+60% HP" },
      icon: "circle-dashed",
      cost: 300000,
      reqLvl: 150,
      reqBosses: 4,
      buff: "hp",
    },
    {
      id: "p_nebula_dragon",
      name: { pt: "Dragão Cósmico", en: "Cosmic Dragon" },
      desc: { pt: "+70% Dano", en: "+70% Dmg" },
      icon: "tornado",
      cost: 800000,
      reqLvl: 200,
      reqBosses: 4,
      buff: "dmg",
    },
    {
      id: "p_god_soul",
      name: { pt: "Divino", en: "Divine Fragment" },
      desc: { pt: "+80% Dano", en: "+80% Dmg" },
      icon: "sun",
      cost: 2000000,
      reqLvl: 250,
      reqBosses: 5,
      buff: "dmg",
    },
    {
      id: "p_seraphim",
      name: { pt: "Serafim Digital", en: "Digital Seraphim" },
      desc: { pt: "+100% Dano", en: "+100% Dmg" },
      icon: "wind",
      cost: 5000000,
      reqLvl: 300,
      reqBosses: 5,
      buff: "dmg",
    },
    {
      id: "p_galaxy",
      name: { pt: "Galáxia", en: "Pocket Galaxy" },
      desc: { pt: "+120% Vida", en: "+120% HP" },
      icon: "aperture",
      cost: 12000000,
      reqLvl: 350,
      reqBosses: 5,
      buff: "hp",
    },
    {
      id: "p_script",
      name: { pt: "Script Auto", en: "Auto Script" },
      desc: { pt: "+150% Dano", en: "+150% Dmg" },
      icon: "play-circle",
      cost: 25000000,
      reqLvl: 400,
      reqBosses: 6,
      buff: "dmg",
    },
    {
      id: "p_clippy",
      name: { pt: "Assistente", en: "Loyal Assistant" },
      desc: { pt: "+200% Vida", en: "+200% HP" },
      icon: "paperclip",
      cost: 50000000,
      reqLvl: 500,
      reqBosses: 7,
      buff: "hp",
    },
    {
      id: "p_ai",
      name: { pt: "I.A. Autónoma", en: "Autonomous A.I." },
      desc: { pt: "+300% Dano", en: "+300% Dmg" },
      icon: "cpu",
      cost: 120000000,
      reqLvl: 600,
      reqBosses: 7,
      buff: "dmg",
    },
    {
      id: "p_mouse",
      name: { pt: "Rato de Fios", en: "Wired Mouse" },
      desc: { pt: "+450% Dano", en: "+450% Dmg" },
      icon: "mouse-pointer-2",
      cost: 400000000,
      reqLvl: 650,
      reqBosses: 8,
      buff: "dmg",
    },
    {
      id: "p_owl",
      name: { pt: "Coruja", en: "Owl of Archimedes" },
      desc: { pt: "+600% Vida", en: "+600% HP" },
      icon: "bird",
      cost: 1500000000,
      reqLvl: 800,
      reqBosses: 9,
      buff: "hp",
    },
    {
      id: "p_metatron",
      name: { pt: "Cubo Metatron", en: "Metatron Cube" },
      desc: { pt: "+800% Dano", en: "+800% Dmg" },
      icon: "box",
      cost: 4000000000,
      reqLvl: 900,
      reqBosses: 9,
      buff: "dmg",
    },
    {
      id: "p_glitch_cat",
      name: { pt: "Gato Glitch", en: "Glitch Cat" },
      desc: { pt: "+1000% Vida", en: "+1000% HP" },
      icon: "cat",
      cost: 15000000000,
      reqLvl: 1000,
      reqBosses: 10,
      buff: "hp",
    },
    {
      id: "p_universe_eater",
      name: { pt: "Devorador", en: "Universe Eater" },
      desc: { pt: "+1500% Dano", en: "+1500% Dmg" },
      icon: "bug",
      cost: 40000000000,
      reqLvl: 1100,
      reqBosses: 10,
      buff: "dmg",
    },
    {
      id: "p_tux",
      name: { pt: "Pinguim Kernel", en: "Kernel Tux" },
      desc: { pt: "+3000% Dano", en: "+3000% Dmg" },
      icon: "monitor-check",
      cost: 150000000000,
      reqLvl: 1250,
      reqBosses: 11,
      buff: "dmg",
    },
    {
      id: "p_clone",
      name: { pt: "Cópia Imperfeita", en: "Flawed Clone" },
      desc: { pt: "+5000% Dano", en: "+5000% Dmg" },
      icon: "scan-line",
      cost: 800000000000,
      reqLvl: 1500,
      reqBosses: 12,
      buff: "dmg",
    },
    {
      id: "p_cursor",
      name: { pt: "O Cursor", en: "The Cursor" },
      desc: { pt: "+10000% Vida", en: "+10000% HP" },
      icon: "mouse-pointer-click",
      cost: 3000000000000,
      reqLvl: 2000,
      reqBosses: 13,
      buff: "hp",
    },
    {
      id: "p_qubit",
      name: { pt: "Qubit Familiar", en: "Qubit Familiar" },
      desc: { pt: "+20000% Dano", en: "+20000% Dmg" },
      icon: "atom",
      cost: 20000000000000,
      reqLvl: 2200,
      reqBosses: 14,
      buff: "dmg",
    },
    {
      id: "p_quantum_dragon",
      name: { pt: "Dragão Quântico", en: "Quantum Dragon" },
      desc: { pt: "+50000% Vida", en: "+50000% HP" },
      icon: "waves",
      cost: 100000000000000,
      reqLvl: 2500,
      reqBosses: 14,
      buff: "hp",
    },
  ],

  relics: [
    {
      id: "r_vamp",
      name: { pt: "Presa Vampiro", en: "Vampire Fang" },
      desc: { pt: "Roubo Vida (10%)", en: "Life Steal (10%)" },
      icon: "droplet",
      cost: 6000,
      reqLvl: 15,
      reqBosses: 0,
    },
    {
      id: "r_time",
      name: { pt: "Ampulheta", en: "Magic Hourglass" },
      desc: { pt: "-20% Cooldowns", en: "-20% Cooldowns" },
      icon: "hourglass",
      cost: 10000,
      reqLvl: 20,
      reqBosses: 1,
    },
    {
      id: "r_midas",
      name: { pt: "Toque Midas", en: "Midas Touch" },
      desc: { pt: "+50% Ouro", en: "+50% Gold" },
      icon: "coins",
      cost: 15000,
      reqLvl: 30,
      reqBosses: 1,
    },
    {
      id: "r_xp",
      name: { pt: "Tomo Sabedoria", en: "Tome of Wisdom" },
      desc: { pt: "+50% XP", en: "+50% XP" },
      icon: "book-open",
      cost: 20000,
      reqLvl: 40,
      reqBosses: 1,
    },
    {
      id: "r_crit",
      name: { pt: "Algoritmo", en: "Precision Alg" },
      desc: { pt: "+15% Crit Extra", en: "+15% Crit Extra" },
      icon: "target",
      cost: 30000,
      reqLvl: 50,
      reqBosses: 2,
    },
    {
      id: "r_fury",
      name: { pt: "Núcleo Adrenalina", en: "Adrenaline Core" },
      desc: { pt: "Dobra o Fúria", en: "Double Fury" },
      icon: "zap",
      cost: 45000,
      reqLvl: 60,
      reqBosses: 2,
    },
    {
      id: "r_dodge",
      name: { pt: "Manto Fumaça", en: "Smoke Mantle" },
      desc: { pt: "+10% Esq", en: "+10% Dodge" },
      icon: "wind",
      cost: 100000,
      reqLvl: 80,
      reqBosses: 3,
    },
    {
      id: "r_omni",
      name: { pt: "Olho Omnisciência", en: "Eye Omniscience" },
      desc: { pt: "+25% ATK/HP", en: "+25% ATK/HP" },
      icon: "eye",
      cost: 5000000,
      reqLvl: 250,
      reqBosses: 5,
    },
    {
      id: "r_god",
      name: { pt: "Chave do Criador", en: "Creator Key" },
      desc: { pt: "+50% Ouro/XP Glob", en: "+50% Glob Gold/XP" },
      icon: "key",
      cost: 25000000,
      reqLvl: 400,
      reqBosses: 6,
    },
    {
      id: "r_dev",
      name: { pt: "Caneta de Ouro", en: "Golden Pen" },
      desc: { pt: "Ganhos (2x)", en: "Gains (2x)" },
      icon: "pen-tool",
      cost: 100000000,
      reqLvl: 500,
      reqBosses: 7,
    },
    {
      id: "r_capacitor",
      name: { pt: "Capacitor Quântico", en: "Quantum Cap" },
      desc: { pt: "Ataca rápido", en: "Attacks fast" },
      icon: "battery-charging",
      cost: 800000000,
      reqLvl: 650,
      reqBosses: 8,
    },
    {
      id: "r_goldenratio",
      name: { pt: "Número de Ouro", en: "Golden Ratio" },
      desc: { pt: "Vida/Dano (3x)", en: "HP/Dmg (3x)" },
      icon: "percent",
      cost: 3000000000,
      reqLvl: 800,
      reqBosses: 9,
    },
    {
      id: "r_chaos",
      name: { pt: "Coração Caos", en: "Heart of Chaos" },
      desc: { pt: "+50% Tudo", en: "+50% All" },
      icon: "triangle-alert",
      cost: 50000000000,
      reqLvl: 1000,
      reqBosses: 10,
    },
    {
      id: "r_cmos",
      name: { pt: "Bateria CMOS", en: "CMOS Battery" },
      desc: { pt: "Multiplica Status (5x)", en: "Multiplies Stats (5x)" },
      icon: "database",
      cost: 300000000000,
      reqLvl: 1250,
      reqBosses: 11,
    },
    {
      id: "r_prism",
      name: { pt: "Prisma Sintético", en: "Synthetic Prism" },
      desc: { pt: "+100% Ganhos/Status", en: "+100% Gains/Stats" },
      icon: "scan-line",
      cost: 2000000000000,
      reqLvl: 1500,
      reqBosses: 12,
    },
    {
      id: "r_void",
      name: { pt: "O Nada", en: "The Nothing" },
      desc: { pt: "Multiplica Tudo (10x)", en: "Multiplies All (10x)" },
      icon: "mouse-pointer-click",
      cost: 10000000000000,
      reqLvl: 2000,
      reqBosses: 13,
    },
    {
      id: "r_quantum",
      name: { pt: "Coração Quântico", en: "Quantum Heart" },
      desc: { pt: "Multiplica Tudo (20x)", en: "Multiplies All (20x)" },
      icon: "atom",
      cost: 100000000000000,
      reqLvl: 2200,
      reqBosses: 14,
    },
  ],

  themes: [
    {
      id: "t_ruins",
      name: { pt: "Ruínas", en: "Ruins" },
      desc: { pt: "O Começo.", en: "The Beginning." },
      cssClass: "theme-medieval",
      bgClass: "bg-arena-ruins",
      cost: 0,
      reqLvl: 1,
      reqBosses: 0,
    },
    {
      id: "t_swamp",
      name: { pt: "Pântano", en: "Swamp" },
      desc: { pt: "Tóxico.", en: "Toxic." },
      cssClass: "theme-nature",
      bgClass: "bg-arena-swamp",
      cost: 1000,
      reqLvl: 10,
      reqBosses: 0,
    },
    {
      id: "t_forest",
      name: { pt: "Floresta", en: "Forest" },
      desc: { pt: "Ato I completo.", en: "Act I done." },
      cssClass: "theme-nature",
      bgClass: "bg-arena-forest",
      cost: 2500,
      reqLvl: 20,
      reqBosses: 1,
    },
    {
      id: "t_cave",
      name: { pt: "Caverna", en: "Cave" },
      desc: { pt: "Profundo.", en: "Deep." },
      cssClass: "theme-modern",
      bgClass: "bg-arena-cave",
      cost: 5000,
      reqLvl: 35,
      reqBosses: 1,
    },
    {
      id: "t_volcano",
      name: { pt: "Vulcão", en: "Volcano" },
      desc: { pt: "Ato II completo.", en: "Act II done." },
      cssClass: "theme-hell",
      bgClass: "bg-arena-volcano",
      cost: 15000,
      reqLvl: 50,
      reqBosses: 2,
    },
    {
      id: "t_astral",
      name: { pt: "Astral", en: "Astral" },
      desc: { pt: "Espaço sideral.", en: "Deep space." },
      cssClass: "theme-cosmic",
      bgClass: "bg-arena-astral",
      cost: 50000,
      reqLvl: 65,
      reqBosses: 2,
    },
    {
      id: "t_underground",
      name: { pt: "Hacker", en: "Hacker" },
      desc: { pt: "Ato III completo.", en: "Act III done." },
      cssClass: "theme-cyber",
      bgClass: "bg-arena-underground",
      cost: 80000,
      reqLvl: 80,
      reqBosses: 3,
    },
    {
      id: "t_neon",
      name: { pt: "Mainframe", en: "Mainframe" },
      desc: { pt: "Digitalização.", en: "Digitalization." },
      cssClass: "theme-cyber",
      bgClass: "bg-arena-neon",
      cost: 120000,
      reqLvl: 100,
      reqBosses: 3,
    },
    {
      id: "t_void",
      name: { pt: "Vazio", en: "Void" },
      desc: { pt: "DLC 1 completa.", en: "DLC 1 done." },
      cssClass: "theme-ultimate",
      bgClass: "bg-arena-void",
      cost: 1000000,
      reqLvl: 150,
      reqBosses: 4,
    },
    {
      id: "t_ultimate",
      name: { pt: "Ultimate", en: "Ultimate" },
      desc: { pt: "A Criação.", en: "The Creation." },
      cssClass: "theme-ultimate",
      bgClass: "bg-arena-ultimate",
      cost: 2500000,
      reqLvl: 200,
      reqBosses: 4,
    },
    {
      id: "t_omniverse",
      name: { pt: "Omniverso", en: "Omniverse" },
      desc: { pt: "DLC 2 completa.", en: "DLC 2 done." },
      cssClass: "theme-omniverse",
      bgClass: "bg-arena-omniverse",
      cost: 10000000,
      reqLvl: 250,
      reqBosses: 5,
    },
    {
      id: "t_matrix",
      name: { pt: "Realidade Base", en: "Base Reality" },
      desc: { pt: "DLC 3 completa.", en: "DLC 3 done." },
      cssClass: "theme-matrix",
      bgClass: "bg-arena-matrix",
      cost: 30000000,
      reqLvl: 400,
      reqBosses: 6,
    },
    {
      id: "t_dev",
      name: { pt: "Desenvolvedor", en: "Dev Realm" },
      desc: { pt: "DLC 4 completa.", en: "DLC 4 done." },
      cssClass: "theme-dev",
      bgClass: "bg-arena-dev",
      cost: 150000000,
      reqLvl: 500,
      reqBosses: 7,
    },
    {
      id: "t_hardware",
      name: { pt: "Hardware", en: "Hardware" },
      desc: { pt: "DLC 5 completa.", en: "DLC 5 done." },
      cssClass: "theme-hardware",
      bgClass: "bg-arena-hardware",
      cost: 800000000,
      reqLvl: 650,
      reqBosses: 8,
    },
    {
      id: "t_math",
      name: { pt: "Plano Lógico", en: "Logic Plane" },
      desc: { pt: "DLC 6 completa.", en: "DLC 6 done." },
      cssClass: "theme-math",
      bgClass: "bg-arena-math",
      cost: 2500000000,
      reqLvl: 800,
      reqBosses: 9,
    },
    {
      id: "t_glitch",
      name: { pt: "A Anomalia", en: "The Anomaly" },
      desc: { pt: "DLC 7 completa.", en: "DLC 7 done." },
      cssClass: "theme-glitch",
      bgClass: "bg-arena-glitch",
      cost: 50000000000,
      reqLvl: 1000,
      reqBosses: 10,
    },
    {
      id: "t_reboot",
      name: { pt: "O Reboot", en: "The Reboot" },
      desc: { pt: "Extra DLC 1 completa.", en: "Extra DLC 1 done." },
      cssClass: "theme-reboot",
      bgClass: "bg-arena-reboot",
      cost: 250000000000,
      reqLvl: 1250,
      reqBosses: 11,
    },
    {
      id: "t_synthetic",
      name: { pt: "Multiverso", en: "Multiverse" },
      desc: { pt: "Extra DLC 2 completa.", en: "Extra DLC 2 done." },
      cssClass: "theme-synthetic",
      bgClass: "bg-arena-synthetic",
      cost: 1000000000000,
      reqLvl: 1500,
      reqBosses: 12,
    },
    {
      id: "t_white",
      name: { pt: "Vazio Branco", en: "White Void" },
      desc: { pt: "Extra DLC 3 completa.", en: "Extra DLC 3 done." },
      cssClass: "theme-white",
      bgClass: "bg-arena-white",
      cost: 5000000000000,
      reqLvl: 2000,
      reqBosses: 13,
    },
    {
      id: "t_quantum",
      name: { pt: "Núcleo Quântico", en: "Quantum Core" },
      desc: { pt: "DLC 8 completa.", en: "DLC 8 done." },
      cssClass: "theme-quantum",
      bgClass: "bg-arena-quantum",
      cost: 50000000000000,
      reqLvl: 2500,
      reqBosses: 14,
    },
  ],

  items: [
    {
      id: "potion_1",
      name: { pt: "Poção (x1)", en: "Potion (x1)" },
      desc: { pt: "Cura 40% HP", en: "Heals 40% HP" },
      icon: "flask-round",
      cost: 10,
      qty: 1,
    },
    {
      id: "potion_5",
      name: { pt: "Barris (x5)", en: "Barrels (x5)" },
      desc: { pt: "Cura 40% HP", en: "Heals 40% HP" },
      icon: "flask-round",
      cost: 45,
      qty: 5,
    },
    {
      id: "potion_10",
      name: { pt: "Caixa (x10)", en: "Crate (x10)" },
      desc: { pt: "Cura 40% HP", en: "Heals 40% HP" },
      icon: "package",
      cost: 80,
      qty: 10,
    },
    {
      id: "potion_50",
      name: { pt: "Carga (x50)", en: "Load (x50)" },
      desc: { pt: "Estoque", en: "Stockpile" },
      icon: "truck",
      cost: 380,
      qty: 50,
    },
    {
      id: "potion_100",
      name: { pt: "Infinita (x100)", en: "Infinite (x100)" },
      desc: { pt: "Nunca fiques sem", en: "Never run out" },
      icon: "database",
      cost: 700,
      qty: 100,
    },
  ],
};

// Funções anexadas depois para evitar erros de Bracket / Identifier
rpg.getAchievements = function () {
  let earned = [];
  if (this.kills >= 100)
    earned.push({
      id: "k100",
      icon: "swords",
      color: "text-red-500",
      name: { pt: "Assassino", en: "Slayer" },
    });
  if (this.level >= 100)
    earned.push({
      id: "l100",
      icon: "chevron-up",
      color: "text-blue-400",
      name: { pt: "Centurião", en: "Centurion" },
    });
  if (this.bossKills >= 3)
    earned.push({
      id: "b3",
      icon: "cpu",
      color: "text-green-500",
      name: { pt: "Hacker", en: "Hacker" },
    });
  if (this.bossKills >= 10)
    earned.push({
      id: "b10",
      icon: "triangle-alert",
      color: "text-rose-500",
      name: { pt: "Sobrevivente", en: "Survivor" },
    });
  if (this.bossKills >= 14)
    earned.push({
      id: "b14",
      icon: "crown",
      color: "text-yellow-400",
      name: { pt: "Deus do Reino", en: "Realm God" },
    });
  if (this.bossKills >= 15)
    earned.push({
      id: "b15",
      icon: "atom",
      color: "text-violet-400",
      name: { pt: "Soberano Quântico", en: "Quantum Sovereign" },
    });
  return earned;
};

rpg.xpRequired = function (lvl = this.level) {
  return lvl * 150 + 100;
};
rpg.getClass = function () {
  return this.classes[this.eqClass] || this.classes.warrior;
};
rpg.getWeapon = function () {
  return this.weapons.find((i) => i.id === this.eqWeapon) || this.weapons[0];
};
rpg.getArmor = function () {
  return this.armors.find((i) => i.id === this.eqArmor) || this.armors[0];
};
rpg.getPet = function () {
  return this.pets.find((i) => i.id === this.eqPet) || this.pets[0];
};
rpg.getTheme = function () {
  return this.themes.find((i) => i.id === this.eqTheme) || this.themes[0];
};

rpg.getMaxHp = function () {
  let baseHp = 100 + this.level * 15 + this.getArmor().hp;
  baseHp *= this.getClass().multHp;
  let petBonus = 0;
  if (this.getPet().buff === "hp") {
    let match = this.getPet().desc.pt.match(/\+(\d+)%/);
    if (match) petBonus = parseInt(match[1]) / 100;
  }
  baseHp *= 1 + petBonus;
  if (this.inventory.includes("r_omni")) baseHp *= 1.25;
  if (this.inventory.includes("r_goldenratio")) baseHp *= 3.0;
  if (this.inventory.includes("r_chaos")) baseHp *= 1.5;
  if (this.inventory.includes("r_cmos")) baseHp *= 5.0;
  if (this.inventory.includes("r_prism")) baseHp *= 2.0;
  if (this.inventory.includes("r_void")) baseHp *= 10.0;
  if (this.inventory.includes("r_quantum")) baseHp *= 20.0;
  return Math.floor(baseHp);
};

rpg.getAtk = function () {
  let baseAtk = 5 + this.level * 3 + this.getWeapon().dmg;
  baseAtk *= this.getClass().multAtk;
  let petBonus = 0;
  if (this.getPet().buff === "dmg") {
    let match = this.getPet().desc.pt.match(/\+(\d+)%/);
    if (match) petBonus = parseInt(match[1]) / 100;
  }
  baseAtk *= 1 + petBonus;
  if (this.inventory.includes("r_omni")) baseAtk *= 1.25;
  if (this.inventory.includes("r_goldenratio")) baseAtk *= 3.0;
  if (this.inventory.includes("r_chaos")) baseAtk *= 1.5;
  if (this.inventory.includes("r_cmos")) baseAtk *= 5.0;
  if (this.inventory.includes("r_prism")) baseAtk *= 2.0;
  if (this.inventory.includes("r_void")) baseAtk *= 10.0;
  if (this.inventory.includes("r_quantum")) baseAtk *= 20.0;
  return Math.floor(baseAtk);
};

rpg.getCritChance = function () {
  let crit = 0.05 + this.getWeapon().crit + this.getClass().addCrit;
  if (this.getPet().buff === "crit") {
    let match = this.getPet().desc.pt.match(/\+(\d+)%/);
    if (match) crit += parseInt(match[1]) / 100;
  }
  if (this.inventory.includes("r_crit")) crit += 0.15;
  return Math.min(crit, 1);
};

rpg.getDodgeChance = function () {
  let dodge = 0.05 + this.getArmor().dodge + this.getClass().addDodge;
  if (this.getPet().buff === "dodge") {
    let match = this.getPet().desc.pt.match(/\+(\d+)%/);
    if (match) dodge += parseInt(match[1]) / 100;
  }
  if (this.inventory.includes("r_dodge")) dodge += 0.1;
  return Math.min(dodge, 0.9);
};

rpg.checkStoryMilestones = function () {
  for (const m of this.milestones) {
    if (
      this.level >= m.lvl &&
      this.bossKills >= m.reqBosses &&
      !this.seenMilestones.includes(m.id)
    ) {
      this.playStory(m.id);
      return true;
    }
  }
  return false;
};

rpg.playStory = function (chapterId) {
  this.activeChapter = chapterId;
  this.introStep = 0;
  if (!this.seenMilestones.includes(chapterId)) {
    this.seenMilestones.push(chapterId);
    this.save();
  }
  navTo("intro");
  this.renderIntro();
};

rpg.renderIntro = function () {
  const chap = this.storyChapters[this.activeChapter];
  const iconContainer = document.getElementById("intro-emoji");
  iconContainer.innerHTML = `<div><i data-lucide="${chap[this.introStep].e}" class="w-24 h-24 text-red-500 mx-auto drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]"></i></div>`;
  lucide.createIcons();

  const textBox = document.getElementById("intro-text");
  textBox.innerText = "";
  let fullText = chap[this.introStep].t[this.lang];
  let i = 0;
  if (this.typingInterval) clearInterval(this.typingInterval);

  this.typingInterval = setInterval(() => {
    i++;
    textBox.innerText = fullText.substring(0, i);
    if (i >= fullText.length) clearInterval(this.typingInterval);
  }, 25);
};

rpg.nextIntro = function () {
  const chap = this.storyChapters[this.activeChapter];
  if (this.typingInterval) clearInterval(this.typingInterval);
  const textBox = document.getElementById("intro-text");

  if (textBox.innerText.length < chap[this.introStep].t[this.lang].length) {
    textBox.innerText = chap[this.introStep].t[this.lang];
    return;
  }
  this.introStep++;
  if (this.introStep >= chap.length) {
    this.skipIntro();
  } else {
    this.renderIntro();
  }
};

rpg.skipIntro = function () {
  if (this.typingInterval) clearInterval(this.typingInterval);
  this.introSeen = true;
  localStorage.setItem("calc_intro_seen", "true");
  this.updateProfileStats();
  navTo("menu");
};

rpg.openPreBattle = function (isBoss) {
  if (isBoss) {
    if (this.bossKills >= this.actBosses.length) {
      showToast(t("transcended"));
      return;
    }
    const nextBoss = this.actBosses[this.bossKills];
    if (this.level < nextBoss.reqLvl) {
      showToast(
        `${t("need_lvl_boss")} ${nextBoss.reqLvl} ${t("to_challenge_guardian")}`,
      );
      return;
    }
  }
  this.isBossFight = isBoss;
  let currentAct =
    this.actLore[Math.min(this.bossKills, this.actLore.length - 1)];

  document.getElementById("pre-act-title").innerText =
    currentAct.title[this.lang];
  document.getElementById("pre-act-desc").innerText =
    currentAct.desc[this.lang];

  if (isBoss) {
    const bossData = this.actBosses[this.bossKills];
    document.getElementById("pre-villain-quote").innerText =
      `"${currentAct.quote[this.lang]}" - ${bossData.name[this.lang].split(" (")[0]}`;
  } else {
    document.getElementById("pre-villain-quote").innerText =
      this.lang === "pt"
        ? `"Apenas mais um loop... Eliminação certa."`
        : `"Just another loop... Deletion imminent."`;
  }

  this.selectDifficulty("normal");
  navTo("pre-battle");
  lucide.createIcons();
};

rpg.selectDifficulty = function (diff) {
  this.difficulty = diff;
  [
    "easy",
    "normal",
    "hard",
    "extreme",
    "nightmare",
    "chaos",
    "realmgod",
  ].forEach((d) => {
    let el = document.getElementById(`btn-diff-${d}`);
    if (el) el.classList.remove("active");
  });
  document.getElementById(`btn-diff-${diff}`).classList.add("active");

  if (diff === "easy") {
    this.diffMult = {
      hp: 0.7,
      dmg: 0.7,
      reward: 0.8,
      dodge: 0.5,
      name: t("easy"),
      color: "text-emerald-400",
    };
  } else if (diff === "normal") {
    this.diffMult = {
      hp: 1.0,
      dmg: 1.0,
      reward: 1.0,
      dodge: 1.0,
      name: t("normal"),
      color: "text-yellow-400",
    };
  } else if (diff === "hard") {
    this.diffMult = {
      hp: 1.5,
      dmg: 1.5,
      reward: 1.5,
      dodge: 1.5,
      name: t("hard"),
      color: "text-orange-400",
    };
  } else if (diff === "extreme") {
    this.diffMult = {
      hp: 2.5,
      dmg: 2.5,
      reward: 2.5,
      dodge: 2.0,
      name: t("extreme"),
      color: "text-red-500",
    };
  } else if (diff === "nightmare") {
    this.diffMult = {
      hp: 4.0,
      dmg: 4.0,
      reward: 4.0,
      dodge: 3.0,
      name: t("nightmare"),
      color: "text-purple-500",
    };
  } else if (diff === "chaos") {
    this.diffMult = {
      hp: 10.0,
      dmg: 10.0,
      reward: 10.0,
      dodge: 5.0,
      name: t("chaos"),
      color: "text-rose-600",
    };
  } else if (diff === "realmgod") {
    this.diffMult = {
      hp: 50.0,
      dmg: 50.0,
      reward: 50.0,
      dodge: 10.0,
      name: t("realmgod"),
      color: "text-cyan-300",
    };
  }
};

rpg.confirmBattle = function () {
  navTo("battle");
  this.startBattle(this.isBossFight);
};

rpg.toggleAutoAttack = function () {
  this.autoAttack = !this.autoAttack;
  const btn = document.getElementById("btn-auto-atk");
  if (this.autoAttack) {
    btn.classList.add("auto-atk-active");
    showToast(t("auto_on"));
  } else {
    btn.classList.remove("auto-atk-active");
    showToast(t("auto_off"));
  }
};

rpg.startBattle = function (isBoss) {
  this.inCombat = true;
  this.heroHp = this.getMaxHp();
  this.fury = 0;
  this.combo = 0;
  this.updateComboUI();
  document.getElementById("boss-warning").classList.toggle("hidden", !isBoss);

  Object.values(this.skills).forEach((s) => (s.timer = false));
  document.querySelectorAll(".btn-3d").forEach((b) => (b.disabled = false));
  document
    .querySelectorAll(".cooldown-bar")
    .forEach((bar) => (bar.style.width = "0%"));

  const atkBtn = document.getElementById("btn-atk");
  atkBtn.classList.remove("ultimate-ready");
  document.getElementById("atk-btn-text").innerText = t("attack");

  const badge = document.getElementById("battle-diff-badge");
  if (badge) {
    badge.innerText = this.diffMult.name;
    badge.className = `mt-1 text-[8px] font-black uppercase tracking-widest ${this.diffMult.color}`;
  }

  document.getElementById("hero-sprite-container").innerHTML =
    `<i data-lucide="${this.getClass().icon}"></i>`;
  const pet = this.getPet();
  document.getElementById("pet-sprite-container").innerHTML =
    pet.id !== "p_none" ? `<i data-lucide="${pet.icon}"></i>` : "";

  this.spawnMonster();
  this.updateHpBars();
  lucide.createIcons();

  this.monsterAtb = 0;
  this.lastTime = performance.now();
  if (this.combatFrame) cancelAnimationFrame(this.combatFrame);
  this.combatFrame = requestAnimationFrame(this.combatTick.bind(this));
};

rpg.endBattle = function () {
  this.inCombat = false;
  this.isSpawning = false;
  this.autoAttack = false;
  const btn = document.getElementById("btn-auto-atk");
  if (btn) btn.classList.remove("auto-atk-active");

  if (this.combatFrame) cancelAnimationFrame(this.combatFrame);
  const hs = document.getElementById("hero-sprite-container");
  if (hs)
    hs.className =
      "sprite-container transform scale-x-[-1] text-blue-400 sprite-idle z-20";
  const ms = document.getElementById("monster-sprite-container");
  if (ms) ms.classList.remove("monster-telegraphing", "sprite-attack-monster");

  const flash = document.getElementById("flash-overlay");
  if (flash) flash.classList.remove("flash-screen");
};

rpg.flee = function () {
  this.endBattle();
  navTo("menu");
  showToast(t("flee_msg"));
};

rpg.spawnMonster = function () {
  if (this.isBossFight) {
    const bossData = this.actBosses[this.bossKills];
    let hp = Math.floor(
      bossData.baseHp + Math.pow(this.level, 1.5) * bossData.hpMult,
    );
    let dmg = Math.floor(
      bossData.baseDmg + Math.pow(this.level, 1.3) * bossData.dmgMult,
    );

    hp = Math.floor(hp * this.diffMult.hp);
    dmg = Math.floor(dmg * this.diffMult.dmg);

    this.monster = {
      id: bossData.id,
      name: bossData.name[this.lang],
      icon: bossData.icon,
      color: bossData.color,
      maxHp: hp,
      hp: hp,
      dmg: dmg,
      spd: bossData.spd,
      lvl: this.level + 10,
      weak: "none",
      res: "none",
      dodge: 0.15,
      block: 0.25,
    };
  } else {
    const typeIndex = Math.min(
      Math.floor(Math.random() * (this.level / 20 + 1)),
      this.monsterTypes.length - 1,
    );
    const type = this.monsterTypes[Math.floor(Math.random() * (typeIndex + 1))];

    let hp = Math.max(
      20,
      Math.floor(Math.pow(this.level, 1.3) * 15 * type.hpMult),
    );
    let dmg = Math.max(
      2,
      Math.floor(Math.pow(this.level, 1.1) * 3 * type.dmgMult),
    );

    hp = Math.floor(hp * this.diffMult.hp);
    dmg = Math.floor(dmg * this.diffMult.dmg);

    this.monster = {
      id: type.id,
      name: type.name[this.lang],
      icon: type.icon,
      color: type.color,
      maxHp: hp,
      hp: hp,
      dmg: dmg,
      spd: type.spd,
      lvl: Math.max(1, this.level + Math.floor(Math.random() * 3) - 1),
      weak: type.weak,
      res: type.res,
      dodge: type.dodge || 0.05,
      block: type.block || 0.1,
    };
  }

  document.getElementById("monster-sprite-container").innerHTML =
    `<i data-lucide="${this.monster.icon}"></i>`;
  const msContainer = document.getElementById("monster-sprite-container");
  msContainer.className = `sprite-container sprite-idle z-20 ${this.monster.color}`;
  document.getElementById("monster-name").innerText = this.monster.name;
  document.getElementById("monster-name").className =
    `text-xs hud-text-bright truncate ${this.monster.color}`;
  document.getElementById("monster-lvl").innerText = `Lvl ${this.monster.lvl}`;

  lucide.createIcons();
  this.updateHpBars();
};

rpg.combatTick = function (timestamp) {
  if (
    !this.inCombat ||
    !this.monster ||
    this.monster.hp <= 0 ||
    this.heroHp <= 0 ||
    this.isSpawning
  )
    return;

  const delta = timestamp - this.lastTime;
  this.lastTime = timestamp;

  this.monsterAtb += (delta / this.monster.spd) * 100;

  const atbBar = document.getElementById("monster-atb-bar");
  const msContainer = document.getElementById("monster-sprite-container");

  if (this.monsterAtb >= 100) {
    this.monsterAtb = 0;
    this.executeMonsterAttack();
  } else if (this.monsterAtb > 85) {
    if (msContainer) msContainer.classList.add("monster-telegraphing");
    if (atbBar) atbBar.classList.replace("bg-cyan-500", "bg-red-500");
  } else {
    if (msContainer) msContainer.classList.remove("monster-telegraphing");
    if (atbBar) atbBar.classList.replace("bg-red-500", "bg-cyan-500");
  }

  if (atbBar) atbBar.style.width = `${Math.min(100, this.monsterAtb)}%`;

  if (
    this.autoAttack &&
    !this.skills.atk.timer &&
    this.monster.hp > 0 &&
    this.heroHp > 0
  ) {
    this.useSkill("atk");
  }

  if (this.inCombat) {
    this.combatFrame = requestAnimationFrame(this.combatTick.bind(this));
  }
};

rpg.executeMonsterAttack = function () {
  const msContainer = document.getElementById("monster-sprite-container");
  if (msContainer) {
    msContainer.classList.remove("monster-telegraphing");
    msContainer.classList.add("sprite-attack-monster");
    setTimeout(() => {
      if (msContainer) msContainer.classList.remove("sprite-attack-monster");
    }, 500);
  }

  if (this.isDefending) {
    this.showDamage(t("parry"), "dmg-parry");
    this.addFury(20);
    this.dealDamageToMonster(Math.floor(this.monster.dmg * 2), "atk", false);
    return;
  }

  if (Math.random() < this.getDodgeChance()) {
    this.showDamage(t("dodged"), "dodge");
    this.addFury(5);
    return;
  }

  const armor = this.getArmor();
  let finalDmg = Math.max(1, Math.floor(this.monster.dmg * (1 - armor.def)));

  this.heroHp -= finalDmg;
  this.combo = 0;
  this.updateComboUI();
  this.addFury(15);

  this.showDamage(finalDmg, "hero");
  const heroSprite = document.getElementById("hero-sprite-container");
  if (heroSprite) heroSprite.classList.add("sprite-hit");
  document.getElementById("game-container").classList.add("shake-screen");

  setTimeout(() => {
    if (heroSprite) heroSprite.classList.remove("sprite-hit");
    const gc = document.getElementById("game-container");
    if (gc) gc.classList.remove("shake-screen");
  }, 300);

  this.updateHpBars();

  if (this.heroHp <= 0) {
    this.heroHp = 0;
    this.die();
  }
};

rpg.addFury = function (amount) {
  let gain = amount;
  if (this.inventory.includes("r_fury")) gain *= 2;

  this.fury = Math.min(100, this.fury + gain);
  document.getElementById("hero-fury-bar").style.width = `${this.fury}%`;

  const atkBtn = document.getElementById("btn-atk");
  if (this.fury >= 100 && !atkBtn.classList.contains("ultimate-ready")) {
    atkBtn.classList.add("ultimate-ready");
    document.getElementById("atk-btn-text").innerText = t("ultimate");
    if (!this.autoAttack) showToast(t("fury_max"), 2000);
  }
};

rpg.updateComboUI = function () {
  const cDisplay = document.getElementById("combo-display");
  const cText = document.getElementById("combo-count");

  if (this.combo > 1) {
    cText.innerText = this.combo;
    cDisplay.classList.remove("combo-text-anim");
    void cDisplay.offsetWidth;
    cDisplay.classList.add("combo-text-anim");
    cDisplay.style.opacity = "1";
  } else {
    cDisplay.style.opacity = "0";
    cDisplay.classList.remove("combo-text-anim");
  }
};

rpg.die = function () {
  this.endBattle();
  let heroSprite = document.getElementById("hero-sprite-container");
  if (heroSprite) heroSprite.classList.add("sprite-death");
  setTimeout(() => {
    navTo("menu");
    showToast(t("death_msg"));
    if (heroSprite) heroSprite.classList.remove("sprite-death");
  }, 1500);
};

rpg.skills = {
  atk: { cd: 600, timer: false },
  mag: { cd: 3000, timer: false },
  def: { cd: 6000, timer: false },
  heal: { cd: 1500, timer: false },
};

rpg.useSkill = function (id) {
  if (
    !this.inCombat ||
    this.skills[id].timer ||
    this.heroHp <= 0 ||
    this.monster.hp <= 0
  )
    return;

  const comboMult = 1 + Math.min(this.combo, 20) * 0.1;
  let atkPoder = Math.floor(this.getAtk() * comboMult);

  if (id === "atk") {
    if (this.fury >= 100) {
      this.dealDamageToMonster(atkPoder * 4, "atk", true);
      this.fury = 0;
      this.addFury(0);
      document.getElementById("btn-atk").classList.remove("ultimate-ready");
      document.getElementById("atk-btn-text").innerText = t("attack");
    } else {
      let isCrit = Math.random() < this.getCritChance();
      let dmg = isCrit ? atkPoder * 2 : atkPoder;
      this.dealDamageToMonster(dmg, "atk", isCrit);
      this.addFury(8);
    }
    this.combo++;
    this.updateComboUI();
    this.animateHero("sprite-attack-hero");
  } else if (id === "mag") {
    let dmg = Math.floor(atkPoder * 2.0);
    this.shootMagicProjectile();
    setTimeout(() => {
      this.dealDamageToMonster(dmg, "mag", false);
    }, 400);
    this.combo++;
    this.updateComboUI();
    this.animateHero("sprite-attack-hero");
  } else if (id === "def") {
    this.combo = 0;
    this.updateComboUI();
    this.isDefending = true;
    document
      .getElementById("hero-sprite-container")
      .classList.add("shield-active");
    this.showDamage(t("dodged"), "dodge");
    setTimeout(() => {
      this.isDefending = false;
      const hs = document.getElementById("hero-sprite-container");
      if (hs) hs.classList.remove("shield-active");
    }, 1500);
  } else if (id === "heal") {
    if (this.potions <= 0) {
      showToast(t("no_potions"));
      return;
    }
    this.combo = 0;
    this.updateComboUI();
    this.potions--;
    const maxHp = this.getMaxHp();
    const healAmount = Math.floor(maxHp * 0.4);
    this.heroHp = Math.min(maxHp, this.heroHp + healAmount);
    this.showDamage(`+${formatNumber(healAmount)}`, "heal");
    this.updateHpBars();
  }

  this.startCooldown(id);
};

rpg.shootMagicProjectile = function () {
  const zone = document.getElementById("damage-zone");
  const proj = document.createElement("i");
  proj.setAttribute("data-lucide", "flame");
  proj.className = "magic-projectile";
  zone.appendChild(proj);
  lucide.createIcons();
  setTimeout(() => proj.remove(), 400);
};

rpg.dealDamageToMonster = function (baseDmg, atkType, isUltimate = false) {
  if (!this.monster || this.monster.hp <= 0) return;

  let mDodge = this.monster.dodge * this.diffMult.dodge;
  let mBlock = this.monster.block * this.diffMult.dodge;

  if (Math.random() < mDodge) {
    this.showDamage(t("dodged"), "monster-dodge");
    this.combo = 0;
    this.updateComboUI();
    return;
  }

  let isCrit = Math.random() < this.getCritChance() || isUltimate;
  let finalDmg = isCrit ? baseDmg * 2 : baseDmg;

  let typeMod = 1;
  let popMsg = null;

  if (this.monster.weak === atkType) {
    typeMod = 1.5;
    popMsg = "dmg-effective";
  } else if (this.monster.res === atkType) {
    typeMod = 0.5;
    popMsg = "dmg-resistant";
  }

  finalDmg = Math.floor(finalDmg * typeMod * (0.9 + Math.random() * 0.2));

  if (Math.random() < mBlock) {
    finalDmg = Math.floor(finalDmg * 0.4);
    this.showDamage(t("blocked"), "monster-block");
  }

  if (finalDmg < 1) finalDmg = 1;

  if (finalDmg > this.maxDmgDealt) this.maxDmgDealt = finalDmg;

  this.monster.hp -= finalDmg;

  if (this.inventory.includes("r_vamp")) {
    const heal = Math.floor(finalDmg * 0.1);
    if (heal > 0) {
      this.heroHp = Math.min(this.getMaxHp(), this.heroHp + heal);
      this.showDamage(`+${formatNumber(heal)}`, "heal");
    }
  }

  let iconStr = atkType === "mag" ? "🔥" : "⚔️";
  let textOut = `${iconStr} -${formatNumber(finalDmg)}`;

  if (popMsg === "dmg-effective") {
    this.showDamage(t("super_effective"), "dmg-effective");
    setTimeout(
      () => this.showDamage(textOut, isCrit ? "crit" : "monster"),
      200,
    );
  } else if (popMsg === "dmg-resistant") {
    this.showDamage(t("resistant"), "dmg-resistant");
    setTimeout(() => this.showDamage(textOut, "monster"), 200);
  } else {
    this.showDamage(textOut, isCrit ? "crit" : "monster");
  }

  const sprite = document.getElementById("monster-sprite-container");
  if (sprite) {
    sprite.classList.remove("sprite-idle");
    sprite.classList.add("sprite-hit");
    setTimeout(() => {
      sprite.classList.remove("sprite-hit");
      if (this.monster && this.monster.hp > 0)
        sprite.classList.add("sprite-idle");
    }, 300);
  }

  if (isUltimate) {
    document.getElementById("game-container").classList.add("shake-heavy");
    const flash = document.getElementById("flash-overlay");
    flash.classList.add("flash-screen");
    setTimeout(() => {
      document.getElementById("game-container").classList.remove("shake-heavy");
      flash.classList.remove("flash-screen");
    }, 500);
  }

  if (this.monster.hp <= 0) {
    this.monster.hp = 0;
    this.killMonster();
  }
  this.updateHpBars();
};

rpg.animateHero = function (animClass) {
  const sprite = document.getElementById("hero-sprite-container");
  if (sprite) {
    sprite.classList.add(animClass);
    setTimeout(() => sprite.classList.remove(animClass), 400);
  }
};

rpg.startCooldown = function (id) {
  const skill = this.skills[id];
  skill.timer = true;
  const btn = document.getElementById(`btn-${id}`);
  const cdBar = document.getElementById(`cd-${id}`);

  btn.disabled = true;
  cdBar.style.width = "100%";

  let startTime = Date.now();
  let finalCd = skill.cd;
  if (this.inventory.includes("r_capacitor")) finalCd *= 0.5;
  else if (this.inventory.includes("r_time")) finalCd *= 0.8;

  const frame = () => {
    if (!skill.timer) return;
    let elapsed = Date.now() - startTime;
    let pct = 100 - (elapsed / finalCd) * 100;

    if (pct <= 0) {
      btn.disabled = false;
      cdBar.style.width = "0%";
      skill.timer = false;
    } else {
      cdBar.style.width = `${pct}%`;
      requestAnimationFrame(frame);
    }
  };
  requestAnimationFrame(frame);
};

rpg.spawnLootIcon = function (iconName, colorClass) {
  const zone = document.getElementById("damage-zone");
  const drop = document.createElement("div");
  drop.className = "loot-coin";
  drop.innerHTML = `<i data-lucide="${iconName}" class="${colorClass} w-6 h-6"></i>`;

  const randomX = (Math.random() - 0.5) * 100;
  drop.style.setProperty("--tx", `${randomX}px`);
  drop.style.left = `80%`;
  drop.style.bottom = `40%`;

  zone.appendChild(drop);
  lucide.createIcons({ root: drop });
  setTimeout(() => drop.remove(), 800);
};

rpg.spawnLoot = function (amount) {
  const coinsToSpawn = Math.min(amount > 100 ? 5 : 2, 8);
  for (let i = 0; i < coinsToSpawn; i++) {
    setTimeout(
      () => this.spawnLootIcon("coins", "text-yellow-400 fill-current"),
      i * 100,
    );
  }
};

rpg.killMonster = function () {
  this.isSpawning = true;
  const sprite = document.getElementById("monster-sprite-container");
  if (sprite) {
    sprite.classList.remove("monster-telegraphing");
    sprite.classList.add("sprite-death");
  }

  if (!this.bestiary[this.monster.id]) this.bestiary[this.monster.id] = 0;
  this.bestiary[this.monster.id]++;

  let xpGain = Math.floor(this.monster.maxHp * 0.4);
  let goldGain = Math.floor(this.monster.maxHp * 0.35);

  xpGain = Math.floor(xpGain * this.diffMult.reward);
  goldGain = Math.floor(goldGain * this.diffMult.reward);

  let dropMsg = "";
  if (this.isBossFight) {
    xpGain *= 10;
    goldGain *= 10;
    this.bossKills++;
    this.potions += 5;
    dropMsg = "+5 " + t("boss_loot_msg");
    this.spawnLootIcon("flask-round", "text-emerald-400");
    showToast(t("boss_defeated"), 4000);
  } else {
    if (Math.random() < 0.15) {
      this.potions += 1;
      dropMsg = "+1 " + t("mob_loot_msg");
      this.spawnLootIcon("flask-round", "text-emerald-400");
    }
  }

  if (dropMsg !== "") {
    setTimeout(() => this.showDamage(dropMsg, "heal"), 200);
  }

  if (this.inventory.includes("r_midas")) goldGain = Math.floor(goldGain * 1.5);
  if (this.inventory.includes("r_xp")) xpGain = Math.floor(xpGain * 1.5);
  if (this.inventory.includes("r_god")) {
    goldGain *= 1.5;
    xpGain *= 1.5;
  }
  if (this.inventory.includes("r_dev")) {
    goldGain *= 2.0;
    xpGain *= 2.0;
  }
  if (this.inventory.includes("r_chaos")) {
    goldGain *= 1.5;
    xpGain *= 1.5;
  }
  if (this.inventory.includes("r_cmos")) {
    goldGain *= 5.0;
    xpGain *= 5.0;
  }
  if (this.inventory.includes("r_prism")) {
    goldGain *= 2.0;
    xpGain *= 2.0;
  }
  if (this.inventory.includes("r_void")) {
    goldGain *= 10.0;
    xpGain *= 10.0;
  }

  this.spawnLoot(goldGain);

  this.xp += xpGain;
  this.gold += goldGain;
  this.kills++;

  let leveledUp = false;
  while (this.xp >= this.xpRequired()) {
    this.xp -= this.xpRequired();
    this.level++;
    if (this.level > this.highestLevel) this.highestLevel = this.level;
    leveledUp = true;
    this.potions++;
  }

  this.save();
  this.updateUI();
  this.updateTheme();

  if (leveledUp) {
    const toast = document.getElementById("level-up-toast");
    document.getElementById("toast-level-text").innerText = `Lvl ${this.level}`;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.remove("opacity-0", "-translate-y-4"), 50);
    setTimeout(() => {
      toast.classList.add("opacity-0", "-translate-y-4");
      setTimeout(() => toast.classList.add("hidden"), 500);
    }, 3000);
  }

  let playedStory = this.checkStoryMilestones();
  if (playedStory) {
    this.inCombat = false;
    this.isSpawning = false;
    this.autoAttack = false;
    const btn = document.getElementById("btn-auto-atk");
    if (btn) btn.classList.remove("auto-atk-active");
    setTimeout(() => {
      if (sprite) sprite.classList.remove("sprite-death");
    }, 800);
    return;
  }

  setTimeout(() => {
    if (sprite) sprite.classList.remove("sprite-death");
    if (this.inCombat) {
      if (this.isBossFight) {
        this.isSpawning = false;
        navTo("menu");
      } else {
        this.monsterAtb = 0;
        this.spawnMonster();
        this.isSpawning = false;
        this.lastTime = performance.now();
        if (this.combatFrame) cancelAnimationFrame(this.combatFrame);
        this.combatFrame = requestAnimationFrame(this.combatTick.bind(this));
      }
    }
  }, 800);
};

rpg.showDamage = function (textOut, type) {
  const zone = document.getElementById("damage-zone");
  const popup = document.createElement("div");

  let cssClass = "dmg-normal";
  if (type === "crit") cssClass = "dmg-crit";
  if (type === "heal") cssClass = "dmg-heal";
  if (type === "hero") cssClass = "dmg-player";
  if (type === "dodge") cssClass = "dmg-dodge";
  if (type === "dmg-parry") cssClass = "dmg-parry";
  if (type === "monster") cssClass = "dmg-warning";
  if (type === "dmg-effective") cssClass = "dmg-effective";
  if (type === "dmg-resistant") cssClass = "dmg-resistant";
  if (type === "monster-dodge") cssClass = "dmg-monster-dodge";
  if (type === "monster-block") cssClass = "dmg-monster-block";

  popup.className = `dmg-popup ${cssClass}`;
  popup.innerText = textOut;

  const randomX = (Math.random() - 0.5) * 60;
  let baseLeft =
    type === "hero" ||
    type === "heal" ||
    type === "dodge" ||
    type === "dmg-parry"
      ? 20
      : 80;
  if (type === "monster") baseLeft = 80;
  if (type === "monster-dodge" || type === "monster-block") baseLeft = 80;

  popup.style.left = `calc(${baseLeft}% + ${randomX}px)`;
  popup.style.bottom = `40%`;

  zone.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
};

rpg.updateHpBars = function () {
  const maxHp = this.getMaxHp();
  const heroPct = Math.max(0, (this.heroHp / maxHp) * 100);
  document.getElementById("hero-hp-bar").style.width = `${heroPct}%`;
  document.getElementById("hero-hp-text").innerText =
    `${formatNumber(Math.ceil(this.heroHp))} / ${formatNumber(maxHp)}`;

  if (this.monster) {
    const monPct = Math.max(0, (this.monster.hp / this.monster.maxHp) * 100);
    document.getElementById("monster-hp-bar").style.width = `${monPct}%`;
    document.getElementById("monster-hp-text").innerText =
      `${formatNumber(Math.ceil(this.monster.hp))} / ${formatNumber(this.monster.maxHp)}`;
  }

  document.getElementById("btn-potion-count").innerText = formatNumber(
    this.potions,
  );
};

rpg.setShopTab = function (tab) {
  this.shopTab = tab;
  ["weapon", "armor", "pet", "relic", "items"].forEach((btnId) => {
    const el = document.getElementById(`tab-${btnId}`);
    if (!el) return;
    if (btnId === tab)
      el.className =
        "px-2 py-1.5 text-[10px] sm:text-xs font-bold bg-zinc-700 text-white rounded-lg shadow transition-all whitespace-nowrap";
    else
      el.className =
        "px-2 py-1.5 text-[10px] sm:text-xs font-bold text-zinc-500 rounded-lg hover:bg-zinc-800 hover:text-zinc-300 transition-all whitespace-nowrap" +
        (btnId === "relic" ? " text-amber-500" : "") +
        (btnId === "items" ? " text-emerald-500" : "");
  });
  this.renderShop();
};

rpg.buyItem = function (id, type) {
  if (type === "items") {
    const item = this.items.find((i) => i.id === id);
    if (this.gold >= item.cost) {
      this.gold -= item.cost;
      this.potions += item.qty;
      this.save();
      this.updateUI();
      this.renderShop();
      showToast(`${t("item_bought")} ${item.name[this.lang]}!`);
    } else {
      showToast(t("not_enough_gold"));
    }
    return;
  }

  let list = [];
  if (type === "weapon") list = this.weapons;
  if (type === "armor") list = this.armors;
  if (type === "pet") list = this.pets;
  if (type === "theme") list = this.themes;
  if (type === "relic") list = this.relics;

  const item = list.find((i) => i.id === id);

  if (this.inventory.includes(id)) {
    if (type === "weapon") this.eqWeapon = id;
    if (type === "armor") this.eqArmor = id;
    if (type === "pet") this.eqPet = id;
    if (type === "theme") {
      this.eqTheme = id;
      this.updateTheme();
      showToast(`${t("portal_connected")} ${item.name[this.lang]}`);
    } else if (type !== "relic") {
      showToast(`${t("equip")}: ${item.name[this.lang]}`);
    }
    this.save();
    this.updateUI();
    if (type === "theme") {
      this.renderPortals();
    } else {
      this.renderShop();
    }
    return;
  }

  if (this.gold >= item.cost) {
    if (type === "theme" && this.bossKills < item.reqBosses) {
      showToast(`${t("need_lvl_boss")} ${item.reqLvl} e derrotar o Boss!`);
      return;
    }
    if (type !== "theme" && this.level < item.reqLvl) {
      showToast(`${t("need_lvl_boss")} ${item.reqLvl} para comprar!`);
      return;
    }

    this.gold -= item.cost;
    this.inventory.push(id);
    if (type === "weapon") this.eqWeapon = id;
    if (type === "armor") this.eqArmor = id;
    if (type === "pet") this.eqPet = id;
    if (type === "theme") {
      this.eqTheme = id;
      this.updateTheme();
      showToast(`${t("new_domain")} ${item.name[this.lang]}!`);
    } else {
      showToast(`${t("transaction_done")} ${item.name[this.lang]}!`);
    }
    this.save();
    this.updateUI();
    if (type === "theme") {
      this.renderPortals();
    } else {
      this.renderShop();
    }
  } else {
    showToast(t("not_enough_gold"));
  }
};

rpg.changeClass = function (clsId) {
  this.eqClass = clsId;
  this.save();
  this.updateUI();
  showToast(`${t("class_assumed")} ${this.getClass().name[this.lang]}!`);
  closeModal("tavern-modal");
};

rpg.updateUI = function () {
  const c = this.getClass();

  let hn = document.getElementById("menu-hero-name");
  if (hn) hn.innerText = this.heroName;
  let bhn = document.getElementById("battle-hero-name");
  if (bhn) bhn.innerText = this.heroName;

  let mct = document.getElementById("menu-class-text");
  if (mct) mct.innerText = c.name[this.lang];

  const iconMenu = document.getElementById("menu-class-icon-container");
  if (iconMenu)
    iconMenu.innerHTML = `<i data-lucide="${c.icon}" class="w-8 h-8 text-zinc-300 drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]"></i>`;

  let mg = document.getElementById("menu-gold");
  if (mg) mg.innerText = formatNumber(this.gold);
  let mp = document.getElementById("menu-potions");
  if (mp) mp.innerText = formatNumber(this.potions);
  let md = document.getElementById("menu-dmgt");
  if (md) md.innerText = `${formatNumber(this.getAtk())} ATK`;
  let mh = document.getElementById("menu-hp");
  if (mh) mh.innerText = `${formatNumber(this.getMaxHp())} HP`;
  let mlt = document.getElementById("menu-level-text");
  if (mlt) mlt.innerText = this.level;
  let blt = document.getElementById("battle-hero-lvl");
  if (blt) blt.innerText = `Lvl ${this.level}`;

  const btnBoss = document.getElementById("btn-daily-boss");
  if (btnBoss) {
    if (this.bossKills >= this.actBosses.length) {
      btnBoss.classList.add(
        "opacity-50",
        "cursor-not-allowed",
        "bg-zinc-800",
        "border-zinc-700",
      );
      btnBoss.classList.remove(
        "bg-gradient-to-r",
        "from-red-950",
        "to-red-900",
        "border-red-700",
      );
      btnBoss.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i> <span class="truncate text-emerald-500">${t("game_cleared")}</span>`;
    } else {
      const nextBoss = this.actBosses[this.bossKills];
      if (this.level < nextBoss.reqLvl) {
        btnBoss.classList.add(
          "opacity-50",
          "cursor-not-allowed",
          "bg-zinc-800",
          "border-zinc-700",
        );
        btnBoss.classList.remove(
          "bg-gradient-to-r",
          "from-red-950",
          "to-red-900",
          "border-red-700",
        );
        btnBoss.innerHTML = `<i data-lucide="lock" class="w-4 h-4 text-zinc-500 flex-shrink-0"></i> <span class="truncate">${t("req_lvl")} ${nextBoss.reqLvl}</span>`;
      } else {
        btnBoss.classList.remove(
          "opacity-50",
          "cursor-not-allowed",
          "bg-zinc-800",
          "border-zinc-700",
        );
        btnBoss.classList.add(
          "bg-gradient-to-r",
          "from-red-950",
          "to-red-900",
          "border-red-700",
        );
        let shortName = nextBoss.name[this.lang].split(" (")[0];
        btnBoss.innerHTML = `<i data-lucide="skull" class="w-4 h-4 text-red-500 flex-shrink-0"></i> <span class="truncate">${shortName}</span>`;
      }
    }
  }

  let bgd = document.getElementById("battle-gold-display");
  if (bgd) bgd.innerText = formatNumber(this.gold);
  let bpc = document.getElementById("btn-potion-count");
  if (bpc) bpc.innerText = formatNumber(this.potions);
  const xpPct = Math.min((this.xp / this.xpRequired()) * 100, 100);
  let bxb = document.getElementById("battle-xp-bar");
  if (bxb) bxb.style.width = `${xpPct}%`;
  let bxt = document.getElementById("battle-xp-text");
  if (bxt)
    bxt.innerText = `${formatNumber(this.xp)} / ${formatNumber(this.xpRequired())}`;

  lucide.createIcons();
};

rpg.updateTheme = function () {
  const themeObj = this.getTheme();
  document.body.className = document.body.className.replace(/theme-\w+/g, "");
  document.body.classList.add(themeObj.cssClass);

  const bgLayer = document.getElementById("arena-bg-layer");
  if (bgLayer) {
    bgLayer.className = `arena-bg-layer ${themeObj.bgClass}`;
  }

  const menuBadge = document.getElementById("menu-era-badge");
  if (menuBadge)
    menuBadge.innerHTML = `<span class="h-[1px] w-6 bg-zinc-700"></span> ${themeObj.name[this.lang]} <span class="h-[1px] w-6 bg-zinc-700"></span>`;
};

rpg.updateProfileStats = function () {
  const w = this.getWeapon();
  const a = this.getArmor();
  const p = this.getPet();

  document
    .getElementById("profile-avatar-icon")
    .setAttribute("data-lucide", this.avatar);

  let sl = document.getElementById("stat-level");
  if (sl) sl.innerText = this.highestLevel;
  let smd = document.getElementById("stat-max-dmg");
  if (smd) smd.innerText = formatNumber(this.maxDmgDealt);
  let sk = document.getElementById("stat-kills");
  if (sk) sk.innerText = formatNumber(this.kills);
  let sb = document.getElementById("stat-bosses");
  if (sb) sb.innerText = formatNumber(this.bossKills);

  let ewd = document.getElementById("equip-weapon-display");
  if (ewd)
    ewd.innerHTML = `
        <i data-lucide="${w.icon}" class="w-5 h-5 text-red-500 mb-1 mx-auto drop-shadow-md"></i>
        <p class="font-bold text-zinc-300 text-[9px] truncate w-full">${w.name[this.lang]}</p>
    `;
  let ead = document.getElementById("equip-armor-display");
  if (ead)
    ead.innerHTML = `
        <i data-lucide="${a.icon}" class="w-5 h-5 text-blue-500 mb-1 mx-auto drop-shadow-md"></i>
        <p class="font-bold text-zinc-300 text-[9px] truncate w-full">${a.name[this.lang]}</p>
    `;
  let epd = document.getElementById("equip-pet-display");
  if (epd)
    epd.innerHTML = `
        <p class="text-[9px] text-zinc-500 mb-1 uppercase font-bold tracking-widest" data-i18n="support">${t("support")}</p>
        <div class="flex items-center justify-center gap-2">
        <i data-lucide="${p.icon}" class="w-4 h-4 text-purple-500 drop-shadow-md"></i>
        <span class="font-bold text-zinc-200 text-xs">${p.name[this.lang]}</span>
        </div>
    `;

  const medalsContainer = document.getElementById("medals-container");
  if (medalsContainer) {
    medalsContainer.innerHTML = "";
    let medals = this.getAchievements();
    if (medals.length === 0)
      medalsContainer.innerHTML = `<p class="text-xs text-zinc-600 italic">Nenhuma medalha ainda.</p>`;
    medals.forEach((md) => {
      medalsContainer.innerHTML += `<div class="medal-icon bg-zinc-900 border border-zinc-700 rounded-full p-2" title="${md.name[this.lang]}"><i data-lucide="${md.icon}" class="w-5 h-5 ${md.color}"></i></div>`;
    });
  }

  const campList = document.getElementById("campaign-list");
  if (campList) {
    campList.innerHTML = "";
    this.milestones.forEach((m) => {
      const unlocked =
        this.seenMilestones.includes(m.id) ||
        (m.id === "intro" && this.introSeen);
      let reqText = m.reqBosses > 0 ? `Lvl ${m.lvl} + Boss` : `Lvl ${m.lvl}`;
      let btn = unlocked
        ? `<button onclick="rpg.playStory('${m.id}'); closeModal('profile-modal');" class="text-[10px] bg-blue-900/40 text-blue-400 px-2 py-1 rounded">${t("re_watch")}</button>`
        : `<span class="text-[10px] text-zinc-600 truncate"><i data-lucide="lock" class="w-3 h-3 inline"></i> ${reqText}</span>`;

      campList.innerHTML += `
            <div class="flex justify-between items-center bg-zinc-900/80 p-2 rounded-lg border border-zinc-800 ${!unlocked ? "opacity-50" : ""}">
            <span class="text-xs font-bold text-zinc-300">${m.name[this.lang]}</span>
            ${btn}
            </div>
        `;
    });
  }

  lucide.createIcons();
};

rpg.renderShop = function () {
  let sg = document.getElementById("shop-gold");
  if (sg) sg.innerText = formatNumber(this.gold);
  const list = document.getElementById("shop-items");
  if (!list) return;
  list.innerHTML = "";

  let itemsToRender = [];
  let currentEquip = null;

  if (this.shopTab === "weapon") {
    itemsToRender = this.weapons;
    currentEquip = this.eqWeapon;
  } else if (this.shopTab === "armor") {
    itemsToRender = this.armors;
    currentEquip = this.eqArmor;
  } else if (this.shopTab === "pet") {
    itemsToRender = this.pets;
    currentEquip = this.eqPet;
  } else if (this.shopTab === "relic") {
    itemsToRender = this.relics;
    currentEquip = null;
  } else if (this.shopTab === "items") {
    itemsToRender = this.items;
    currentEquip = null;
  }

  itemsToRender.forEach((item) => {
    let btnHTML = "";
    let isOwned = false;
    let isEquipped = false;
    let isLocked = false;

    if (item.reqLvl && this.level < item.reqLvl) isLocked = true;

    if (this.shopTab === "items") {
      const canAfford = this.gold >= item.cost;
      btnHTML = `<button onclick="rpg.buyItem('${item.id}', '${this.shopTab}')" class="px-3 py-1.5 ${canAfford ? "bg-emerald-700 hover:bg-emerald-600 text-white shadow border border-emerald-500" : "bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed"} rounded-lg text-xs font-bold flex items-center gap-1 transition-colors">${formatNumber(item.cost)} <i data-lucide="coins" class="w-3 h-3"></i></button>`;
    } else {
      isOwned = this.inventory.includes(item.id);
      isEquipped = currentEquip === item.id;
      const canAfford = this.gold >= item.cost;

      if (isLocked && !isOwned) {
        btnHTML = `<button disabled class="px-2 py-1.5 bg-zinc-800/80 text-zinc-500 rounded-lg text-[10px] font-bold border border-zinc-700/50 flex items-center gap-1"><i data-lucide="lock" class="w-3 h-3"></i> Lvl ${item.reqLvl}</button>`;
      } else if (this.shopTab === "relic" && isOwned) {
        btnHTML = `<button disabled class="px-2 py-1.5 bg-emerald-900/30 text-emerald-500 rounded-lg text-[10px] font-bold border border-emerald-800">${t("acquired")}</button>`;
      } else if (isEquipped) {
        btnHTML = `<button disabled class="px-2 py-1.5 bg-emerald-900/30 text-emerald-500 rounded-lg text-[10px] font-bold border border-emerald-800">${t("equipped")}</button>`;
      } else if (isOwned) {
        btnHTML = `<button onclick="rpg.buyItem('${item.id}', '${this.shopTab}')" class="px-3 py-1.5 bg-zinc-700 text-white rounded-lg text-xs font-bold hover:bg-zinc-600 transition shadow">${t("equip")}</button>`;
      } else {
        btnHTML = `<button onclick="rpg.buyItem('${item.id}', '${this.shopTab}')" class="px-3 py-1.5 ${canAfford ? "bg-yellow-600 hover:bg-yellow-500 text-white shadow border border-yellow-500" : "bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed"} rounded-lg text-xs font-bold flex items-center gap-1 transition-colors">${formatNumber(item.cost)} <i data-lucide="coins" class="w-3 h-3"></i></button>`;
      }
    }

    let iconName = item.icon || "globe";

    list.innerHTML += `
        <div class="flex items-center gap-3 p-2.5 rounded-xl border ${isEquipped || (this.shopTab === "relic" && isOwned) ? "border-brand-500 bg-brand-900/10" : "border-zinc-800 bg-zinc-950/80"} shadow-inner ${isLocked && !isOwned ? "opacity-50 grayscale" : ""}">
            <div class="p-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm"><i data-lucide="${iconName}" class="w-5 h-5 text-zinc-400"></i></div>
            <div class="flex-1">
            <h3 class="font-bold text-zinc-200 text-xs leading-tight">${item.name[this.lang]}</h3>
            <p class="text-[9px] font-bold text-brand-500 mt-0.5 tracking-wider uppercase">${item.desc[this.lang]}</p>
            </div>
            <div>${btnHTML}</div>
        </div>
        `;
  });
  lucide.createIcons();
};

rpg.renderPortals = function () {
  const list = document.getElementById("portals-list");
  if (!list) return;
  list.innerHTML = "";

  this.themes.forEach((theme) => {
    let isOwned = this.inventory.includes(theme.id);
    let isEquipped = this.eqTheme === theme.id;
    let canAfford = this.gold >= theme.cost;
    let isLocked =
      this.bossKills < theme.reqBosses || this.level < theme.reqLvl;

    let btnHTML = "";
    if (isLocked && !isOwned) {
      btnHTML = `<button disabled class="px-2 py-1.5 bg-zinc-800/80 text-zinc-500 rounded-lg text-[10px] font-bold border border-zinc-700/50 flex items-center gap-1"><i data-lucide="lock" class="w-3 h-3"></i> Lvl ${theme.reqLvl}</button>`;
    } else if (isEquipped) {
      btnHTML = `<button disabled class="px-2 py-1.5 bg-emerald-900/30 text-emerald-500 rounded-lg text-[10px] font-bold border border-emerald-800">${t("equipped")}</button>`;
    } else if (isOwned) {
      btnHTML = `<button onclick="rpg.buyItem('${theme.id}', 'theme')" class="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition shadow">${t("travel")}</button>`;
    } else {
      btnHTML = `<button onclick="rpg.buyItem('${theme.id}', 'theme')" class="px-3 py-1.5 ${canAfford ? "bg-yellow-600 hover:bg-yellow-500 text-white shadow border border-yellow-500" : "bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed"} rounded-lg text-xs font-bold flex items-center gap-1 transition-colors">${formatNumber(theme.cost)} <i data-lucide="coins" class="w-3 h-3"></i></button>`;
    }

    list.innerHTML += `
        <div class="flex items-center gap-3 p-2.5 rounded-xl border ${isEquipped ? "border-indigo-500 bg-indigo-900/10" : "border-zinc-800 bg-zinc-950/80"} shadow-inner ${isLocked && !isOwned ? "opacity-50 grayscale" : ""}">
            <div class="p-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm"><i data-lucide="globe" class="w-5 h-5 text-indigo-400"></i></div>
            <div class="flex-1">
            <h3 class="font-bold text-zinc-200 text-xs leading-tight">${theme.name[this.lang]}</h3>
            <p class="text-[9px] font-bold text-indigo-400 mt-0.5 tracking-wider uppercase">${theme.desc[this.lang]}</p>
            </div>
            <div>${btnHTML}</div>
        </div>
        `;
  });
  lucide.createIcons();
};

rpg.renderBestiary = function () {
  const list = document.getElementById("bestiary-list");
  if (!list) return;
  list.innerHTML = "";

  let allTypes = [...this.monsterTypes];
  this.actBosses.forEach((b) => {
    allTypes.push({ id: b.id, name: b.name, icon: b.icon, color: b.color });
  });

  allTypes.forEach((m) => {
    const count = this.bestiary[m.id] || 0;
    const discovered = count > 0;

    list.innerHTML += `
        <div class="flex items-center gap-4 p-3 rounded-2xl border ${discovered ? "bg-zinc-950/80 border-zinc-700 shadow-inner" : "bg-zinc-900/50 border-zinc-800 opacity-50"}">
            <div class="p-2 bg-zinc-900 border border-zinc-800 shadow-sm rounded-lg">
            <i data-lucide="${discovered ? m.icon : "help-circle"}" class="w-6 h-6 ${discovered ? m.color : "text-zinc-600"}"></i>
            </div>
            <div class="flex-1">
            <h3 class="font-bold text-sm ${discovered ? "text-zinc-200" : "text-zinc-600"}">${discovered ? m.name[this.lang] : t("unknown")}</h3>
            <p class="text-xs text-zinc-500">${t("kills")}: <span class="font-black text-red-500">${formatNumber(count)}</span></p>
            </div>
        </div>
        `;
  });
  lucide.createIcons();
};

rpg.renderTavern = function () {
  const list = document.getElementById("classes-list");
  if (!list) return;
  list.innerHTML = "";

  Object.values(this.classes).forEach((c) => {
    const isActive = this.eqClass === c.id;
    const isLocked = this.bossKills < c.reqBosses;

    let btnHTML = "";
    if (isLocked) {
      let actName =
        [
          "",
          "Ato II",
          "Ato III",
          "DLC 1",
          "DLC 2",
          "DLC 3",
          "DLC 4",
          "DLC 5",
          "DLC 6",
          "DLC 7",
          "Ex DLC 1",
          "Ex DLC 2",
          "Ex DLC 3",
          "Ex DLC 4",
          "DLC 8",
        ][c.reqBosses] || "???";
      btnHTML = `<button disabled class="w-full mt-3 py-2 bg-zinc-800/80 text-zinc-500 rounded-lg text-[10px] font-bold border border-zinc-700/50 uppercase tracking-wide flex items-center justify-center gap-1"><i data-lucide="lock" class="w-3 h-3"></i> Boss ${actName}</button>`;
    } else if (isActive) {
      btnHTML = `<button disabled class="w-full mt-3 py-2 bg-emerald-900/30 text-emerald-500 rounded-lg text-xs font-bold border border-emerald-800">${t("in_use")}</button>`;
    } else {
      btnHTML = `<button onclick="rpg.changeClass('${c.id}')" class="w-full mt-3 py-2 bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-white rounded-lg text-xs font-bold transition shadow">${t("assume_mantle")}</button>`;
    }

    list.innerHTML += `
        <div class="bg-zinc-950/80 border ${isActive ? "border-brand-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-zinc-800 shadow-inner"} ${isLocked ? "opacity-60 grayscale" : ""} rounded-xl p-4 flex flex-col items-center text-center transition-all">
            <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-md mb-2 text-zinc-300">
            <i data-lucide="${c.icon}" class="w-6 h-6 ${isActive ? "text-brand-400" : ""}"></i>
            </div>
            <h3 class="font-black text-zinc-200 text-sm uppercase tracking-wide">${c.name[this.lang]}</h3>
            <p class="text-[10px] text-zinc-400 mt-1 h-8 font-medium">${c.desc[this.lang]}</p>
            ${btnHTML}
        </div>
        `;
  });
  lucide.createIcons();
};

// ─── SAVE / LOAD / EXPORT / IMPORT ───────────────────────────────────────────
rpg.save = function () {
  localStorage.setItem("calc_lang", this.lang);
  localStorage.setItem("calc_hero", this.heroName);
  localStorage.setItem("calc_level", this.level);
  localStorage.setItem("calc_xp", this.xp);
  localStorage.setItem("calc_gold", this.gold);
  localStorage.setItem("calc_potions", this.potions);
  localStorage.setItem("calc_kills", this.kills);
  localStorage.setItem("calc_bosses", this.bossKills);
  localStorage.setItem("calc_high_lvl", this.highestLevel);
  localStorage.setItem("calc_max_dmg", this.maxDmgDealt);
  localStorage.setItem("rpg_class", this.eqClass);
  localStorage.setItem("rpg_weapon", this.eqWeapon);
  localStorage.setItem("rpg_armor", this.eqArmor);
  localStorage.setItem("rpg_pet", this.eqPet);
  localStorage.setItem("rpg_theme", this.eqTheme);
  localStorage.setItem("rpg_avatar", this.avatar);
  localStorage.setItem("rpg_inv", JSON.stringify(this.inventory));
  localStorage.setItem("rpg_bestiary", JSON.stringify(this.bestiary));
  localStorage.setItem("rpg_milestones", JSON.stringify(this.seenMilestones));
  localStorage.setItem("calc_intro_seen", this.introSeen ? "true" : "false");
  localStorage.setItem("rpg_bp_claimed", JSON.stringify(this.bpClaimed || []));
};

rpg.exportSave = function () {
  const data = {
    lang: this.lang, heroName: this.heroName, level: this.level,
    xp: this.xp, gold: this.gold, potions: this.potions,
    kills: this.kills, bossKills: this.bossKills,
    highestLevel: this.highestLevel, maxDmgDealt: this.maxDmgDealt,
    eqClass: this.eqClass, eqWeapon: this.eqWeapon,
    eqArmor: this.eqArmor, eqPet: this.eqPet, eqTheme: this.eqTheme,
    avatar: this.avatar, inventory: this.inventory,
    bestiary: this.bestiary, seenMilestones: this.seenMilestones,
    introSeen: this.introSeen, bpClaimed: this.bpClaimed || [],
  };
  try {
    const code = btoa(JSON.stringify(data));
    navigator.clipboard.writeText(code).then(() => showToast(t("copy_success")));
  } catch (e) {
    showToast("Erro ao exportar.");
  }
};

rpg.importSave = function () {
  const code = prompt(this.lang === "pt" ? "Cola o teu código de save:" : "Paste your save code:");
  if (!code) return;
  try {
    const data = JSON.parse(atob(code.trim()));
    Object.assign(this, {
      lang: data.lang || "pt",
      heroName: data.heroName || "Guerreiro",
      level: data.level || 1,
      xp: data.xp || 0,
      gold: data.gold || 0,
      potions: data.potions || 5,
      kills: data.kills || 0,
      bossKills: data.bossKills || 0,
      highestLevel: data.highestLevel || 1,
      maxDmgDealt: data.maxDmgDealt || 0,
      eqClass: data.eqClass || "warrior",
      eqWeapon: data.eqWeapon || "w_fist",
      eqArmor: data.eqArmor || "a_rags",
      eqPet: data.eqPet || "p_none",
      eqTheme: data.eqTheme || "t_ruins",
      avatar: data.avatar || "user",
      inventory: data.inventory || ["w_fist","a_rags","p_none","t_ruins"],
      bestiary: data.bestiary || {},
      seenMilestones: data.seenMilestones || [],
      introSeen: data.introSeen || false,
      bpClaimed: data.bpClaimed || [],
    });
    this.save();
    showToast(t("upload_success"));
    setTimeout(() => location.reload(), 1200);
  } catch (e) {
    showToast(t("invalid_code"));
  }
};

rpg.resetProgress = function () {
  if (!confirm(t("confirm_reset"))) return;
  localStorage.clear();
  location.reload();
};

rpg.changeAvatar = function () {
  const idx = this.avatarList.indexOf(this.avatar);
  this.avatar = this.avatarList[(idx + 1) % this.avatarList.length];
  this.save();
  this.updateProfileStats();
};

rpg.toggleLang = function () {
  this.lang = this.lang === "pt" ? "en" : "pt";
  localStorage.setItem("calc_lang", this.lang);
  applyLanguage();
  this.updateUI();
  this.updateTheme();
};

// ─── BATTLE PASS ─────────────────────────────────────────────────────────────
rpg.bpClaimed = JSON.parse(localStorage.getItem("rpg_bp_claimed")) || [];

rpg.battlePassRewards = [
  { id: "bp_1",  req: 5,    icon: "coins",        color: "text-yellow-400", name: { pt: "500 Ouro",       en: "500 Gold"        }, type: "gold",   value: 500 },
  { id: "bp_2",  req: 15,   icon: "flask-round",  color: "text-emerald-400",name: { pt: "20 Poções",      en: "20 Potions"      }, type: "pot",    value: 20 },
  { id: "bp_3",  req: 30,   icon: "coins",        color: "text-yellow-400", name: { pt: "5K Ouro",        en: "5K Gold"         }, type: "gold",   value: 5000 },
  { id: "bp_4",  req: 50,   icon: "shield-check", color: "text-blue-400",   name: { pt: "Armadura +",     en: "Armor Boost"     }, type: "pot",    value: 50 },
  { id: "bp_5",  req: 75,   icon: "coins",        color: "text-yellow-400", name: { pt: "50K Ouro",       en: "50K Gold"        }, type: "gold",   value: 50000 },
  { id: "bp_6",  req: 100,  icon: "zap",          color: "text-red-400",    name: { pt: "100 Poções",     en: "100 Potions"     }, type: "pot",    value: 100 },
  { id: "bp_7",  req: 150,  icon: "coins",        color: "text-yellow-400", name: { pt: "500K Ouro",      en: "500K Gold"       }, type: "gold",   value: 500000 },
  { id: "bp_8",  req: 200,  icon: "star",         color: "text-amber-300",  name: { pt: "2M Ouro",        en: "2M Gold"         }, type: "gold",   value: 2000000 },
  { id: "bp_9",  req: 300,  icon: "flask-round",  color: "text-emerald-400",name: { pt: "500 Poções",     en: "500 Potions"     }, type: "pot",    value: 500 },
  { id: "bp_10", req: 500,  icon: "crown",        color: "text-yellow-400", name: { pt: "50M Ouro",       en: "50M Gold"        }, type: "gold",   value: 50000000 },
  { id: "bp_11", req: 750,  icon: "gem",          color: "text-cyan-400",   name: { pt: "1B Ouro",        en: "1B Gold"         }, type: "gold",   value: 1000000000 },
  { id: "bp_12", req: 1000, icon: "atom",         color: "text-violet-400", name: { pt: "100B Ouro",      en: "100B Gold"       }, type: "gold",   value: 100000000000 },
];

rpg.renderBattlePass = function () {
  const list = document.getElementById("battlepass-list");
  if (!list) return;
  list.innerHTML = "";

  const kills = this.kills;

  this.battlePassRewards.forEach((r) => {
    const claimed = this.bpClaimed.includes(r.id);
    const unlocked = kills >= r.req;
    const canClaim = unlocked && !claimed;

    let btnHTML = "";
    if (claimed) {
      btnHTML = `<span class="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1"><i data-lucide="check" class="w-3 h-3"></i> OK</span>`;
    } else if (canClaim) {
      btnHTML = `<button onclick="rpg.claimBattlePass('${r.id}')" class="px-3 py-1.5 bg-violet-700 hover:bg-violet-600 text-white rounded-lg text-xs font-black shadow border border-violet-500 transition">Resgatar</button>`;
    } else {
      const pct = Math.min(100, Math.floor((kills / r.req) * 100));
      btnHTML = `<div class="text-right"><span class="text-[9px] text-zinc-500 font-bold">${formatNumber(kills)}/${formatNumber(r.req)}</span><div class="w-16 h-1.5 bg-zinc-800 rounded-full mt-0.5"><div class="h-full bg-violet-700 rounded-full" style="width:${pct}%"></div></div></div>`;
    }

    list.innerHTML += `
      <div class="flex items-center gap-3 p-2.5 rounded-xl border ${claimed ? "border-emerald-800/50 bg-emerald-950/20" : canClaim ? "border-violet-600/60 bg-violet-950/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]" : "border-zinc-800 bg-zinc-950/50"} shadow-inner">
        <div class="p-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm flex-shrink-0">
          <i data-lucide="${r.icon}" class="w-5 h-5 ${claimed ? "text-zinc-600" : r.color}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-zinc-200 text-xs leading-tight truncate">${r.name[this.lang]}</h3>
          <p class="text-[9px] font-bold text-violet-400 mt-0.5 tracking-wider uppercase">${formatNumber(r.req)} abates</p>
        </div>
        <div class="flex-shrink-0">${btnHTML}</div>
      </div>`;
  });
  lucide.createIcons();
};

rpg.claimBattlePass = function (id) {
  const r = this.battlePassRewards.find((x) => x.id === id);
  if (!r || this.bpClaimed.includes(id) || this.kills < r.req) return;
  this.bpClaimed.push(id);
  if (r.type === "gold") { this.gold += r.value; showToast(`+${formatNumber(r.value)} 💰`); }
  if (r.type === "pot")  { this.potions += r.value; showToast(`+${r.value} 🧪`); }
  this.save();
  this.updateUI();
  this.renderBattlePass();
};

rpg.init = function () {
  if (!this.inventory.includes("t_ruins")) {
    this.inventory.push("t_ruins");
    this.eqTheme = "t_ruins";
  }
  if (!this.inventory.includes("p_none")) {
    this.inventory.push("p_none");
  }
  if (!this.seenMilestones.includes("intro")) {
    this.seenMilestones.push("intro");
  }

  applyLanguage();

  if (!this.introSeen) {
    this.playStory("intro");
  } else {
    navTo("menu");
  }

  this.updateUI();
  this.updateTheme();
};

// Hotkeys para Combate
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("view-battle").classList.contains("active"))
    return;
  if (e.key === "1" || e.key.toLowerCase() === "q") rpg.useSkill("atk");
  if (e.key === "2" || e.key.toLowerCase() === "w") rpg.useSkill("mag");
  if (e.key === "3" || e.key.toLowerCase() === "e") rpg.useSkill("def");
  if (e.key === "4" || e.key.toLowerCase() === "r") rpg.useSkill("heal");
});

// Start
rpg.init();
