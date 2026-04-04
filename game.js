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

  // ── Daily Missions ──
  dailyMissions: JSON.parse(localStorage.getItem("rpg_daily_missions") || "null"),
  dailyDate: localStorage.getItem("rpg_daily_date") || "",
  dailyCompleted: JSON.parse(localStorage.getItem("rpg_daily_completed") || "[]"),

  // ── Prestige ──
  prestigeLevel: parseInt(localStorage.getItem("rpg_prestige")) || 0,
  prestigeMult: parseFloat(localStorage.getItem("rpg_prestige_mult")) || 1.0,

  // ── Event ──
  eventActive: false,
  eventKills: 0,

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
    {
      id: "boss_16",
      name: { pt: "O Arquiteto do Fim", en: "Architect of the End" },
      icon: "infinity",
      color: "text-rose-300",
      reqLvl: 3000,
      baseHp: 80000000000000,
      hpMult: 200000,
      baseDmg: 800000000000,
      dmgMult: 200000,
      spd: 160,
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
      title: { pt: "Capítulo IV: Protocolo Sombra", en: "Chapter IV: Shadow Protocol" },
      desc: {
        pt: "O mundo é um mainframe corrompido.",
        en: "The world is a corrupted mainframe.",
      },
      quote: { pt: "Iniciando eliminação.", en: "Starting deletion." },
    },
    {
      act: 4,
      title: { pt: "Capítulo V: Ascensão dos Criadores", en: "Chapter V: Rise of Creators" },
      desc: { pt: "O berço dos criadores.", en: "Cradle of creators." },
      quote: {
        pt: "Posso apagar este universo.",
        en: "I can erase this universe.",
      },
    },
    {
      act: 5,
      title: { pt: "Capítulo VI: Colapso da Singularidade", en: "Chapter VI: Singularity Collapse" },
      desc: {
        pt: "Tudo é infinito e nada é real.",
        en: "Everything is infinite and nothing is real.",
      },
      quote: { pt: "És um ciclo de dor.", en: "You are a cycle of pain." },
    },
    {
      act: 6,
      title: { pt: "Capítulo VII: O Código Raiz", en: "Chapter VII: Root Code" },
      desc: { pt: "O código fonte está exposto.", en: "Source code exposed." },
      quote: { pt: "Acesso Root negado.", en: "Root access denied." },
    },
    {
      act: 7,
      title: { pt: "Capítulo VIII: Além do Ecrã", en: "Chapter VIII: Beyond the Screen" },
      desc: { pt: "A quebra da quarta parede.", en: "The 4th wall break." },
      quote: { pt: "Vou apagar o repositório.", en: "I will delete the repo." },
    },
    {
      act: 8,
      title: { pt: "Capítulo IX: Inferno de Silício", en: "Chapter IX: Silicon Inferno" },
      desc: { pt: "Sobreaquecimento crítico.", en: "Critical overheating." },
      quote: { pt: "Ventoinhas a 100%.", en: "Fans at 100%." },
    },
    {
      act: 9,
      title: { pt: "Capítulo X: O Paradoxo Final", en: "Chapter X: The Final Paradox" },
      desc: { pt: "A essência de CalcQuest.", en: "The essence of CalcQuest." },
      quote: { pt: "1 a dividir por 0...", en: "1 divided by 0..." },
    },
    {
      act: 10,
      title: { pt: "Epílogo I: A Anomalia", en: "Epilogue I: The Anomaly" },
      desc: {
        pt: "A realidade colapsou em glitch.",
        en: "Reality collapsed into a glitch.",
      },
      quote: { pt: "$%@!ERRO FATAL#&*", en: "$%@!FATAL ERROR#&*" },
    },
    {
      act: 11,
      title: { pt: "Epílogo II: Renascimento das Cinzas", en: "Epilogue II: Reborn from Ashes" },
      desc: {
        pt: "O sistema reiniciou num núcleo gelado.",
        en: "The system rebooted in a frozen core.",
      },
      quote: { pt: "Sou a limpeza absoluta.", en: "I am the absolute purge." },
    },
    {
      act: 12,
      title: { pt: "Epílogo III: O Multiverso Sintético", en: "Epilogue III: Synthetic Multiverse" },
      desc: {
        pt: "O sintético é agora o original.",
        en: "The synthetic is now original.",
      },
      quote: { pt: "Eu sou tu, mas perfeito.", en: "I am you, but perfect." },
    },
    {
      act: 13,
      title: { pt: "Epílogo IV: Antes do Princípio", en: "Epilogue IV: Before the Beginning" },
      desc: { pt: "Apenas o espaço branco.", en: "Only white space." },
      quote: {
        pt: "Antes de haver algo, havia eu.",
        en: "Before anything, there was me.",
      },
    },
    {
      act: 14,
      title: { pt: "Ato Final: O Núcleo Quântico", en: "Final Act: The Quantum Core" },
      desc: { pt: "A fundação da realidade colapsa.", en: "The foundation of reality collapses." },
      quote: {
        pt: "Eu sou a equação que sustenta o cosmos.",
        en: "I am the equation that sustains the cosmos.",
      },
    },
    {
      act: 15,
      title: { pt: "Capítulo XI: O Arquiteto do Fim", en: "Chapter XI: Architect of the End" },
      desc: { pt: "Além do cosmos, algo arquiteta o fim.", en: "Beyond the cosmos, something architects the end." },
      quote: {
        pt: "Não sou um inimigo. Sou o inevitável.",
        en: "I am not an enemy. I am the inevitable.",
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
    cap_xi: [
      {
        e: "infinity",
        t: {
          pt: "Para além do cosmos existe um vazio consciente.",
          en: "Beyond the cosmos lies a conscious void.",
        },
      },
      {
        e: "eye",
        t: {
          pt: "O Arquiteto do Fim observa-te há milénios.",
          en: "The Architect of the End has watched you for millennia.",
        },
      },
      {
        e: "triangle-alert",
        t: {
          pt: "Não há fuga. Apenas o confronto final.",
          en: "There is no escape. Only the final confrontation.",
        },
      },
    ],
  },

  milestones: [
    { id: "intro", lvl: 1, reqBosses: 0, name: { pt: "Ato I — O Despertar", en: "Act I — The Awakening" } },
    { id: "act2", lvl: 20, reqBosses: 1, name: { pt: "Ato II — Ameaça Cósmica", en: "Act II — Cosmic Threat" } },
    {
      id: "act3",
      lvl: 50,
      reqBosses: 2,
      name: { pt: "Ato III — O Vazio Absoluto", en: "Act III — Absolute Void" },
    },
    {
      id: "dlc_cyber",
      lvl: 80,
      reqBosses: 3,
      name: { pt: "Cap. IV — Protocolo Sombra", en: "Ch. IV — Shadow Protocol" },
    },
    {
      id: "dlc_ultimate",
      lvl: 150,
      reqBosses: 4,
      name: { pt: "Cap. V — Ascensão dos Criadores", en: "Ch. V — Rise of Creators" },
    },
    {
      id: "dlc_omniverse",
      lvl: 250,
      reqBosses: 5,
      name: { pt: "Cap. VI — Colapso da Singularidade", en: "Ch. VI — Singularity Collapse" },
    },
    {
      id: "dlc_creator",
      lvl: 400,
      reqBosses: 6,
      name: { pt: "Cap. VII — O Código Raiz", en: "Ch. VII — Root Code" },
    },
    {
      id: "dlc_player",
      lvl: 500,
      reqBosses: 7,
      name: { pt: "Cap. VIII — Além do Ecrã", en: "Ch. VIII — Beyond the Screen" },
    },
    {
      id: "dlc_hardware",
      lvl: 650,
      reqBosses: 8,
      name: { pt: "Cap. IX — Inferno de Silício", en: "Ch. IX — Silicon Inferno" },
    },
    {
      id: "dlc_math",
      lvl: 800,
      reqBosses: 9,
      name: { pt: "Cap. X — O Paradoxo Final", en: "Ch. X — The Final Paradox" },
    },
    {
      id: "extradlc1",
      lvl: 1000,
      reqBosses: 10,
      name: { pt: "Epílogo I — A Anomalia", en: "Epilogue I — The Anomaly" },
    },
    {
      id: "extradlc2",
      lvl: 1250,
      reqBosses: 11,
      name: { pt: "Epílogo II — Renascimento das Cinzas", en: "Epilogue II — Reborn from Ashes" },
    },
    {
      id: "extradlc3",
      lvl: 1500,
      reqBosses: 12,
      name: { pt: "Epílogo III — O Multiverso Sintético", en: "Epilogue III — Synthetic Multiverse" },
    },
    {
      id: "extradlc4",
      lvl: 2000,
      reqBosses: 13,
      name: { pt: "Epílogo IV — Antes do Princípio", en: "Epilogue IV — Before the Beginning" },
    },
    {
      id: "dlc_quantum",
      lvl: 2500,
      reqBosses: 14,
      name: { pt: "Ato Final — O Núcleo Quântico", en: "Final Act — The Quantum Core" },
    },
    {
      id: "cap_xi",
      lvl: 3000,
      reqBosses: 15,
      name: { pt: "Cap. XI — O Arquiteto do Fim", en: "Ch. XI — Architect of the End" },
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
    pass_master: {
      id: "pass_master",
      name: { pt: "Senhor do Passe", en: "Pass Master" },
      icon: "badge-check",
      desc: { pt: "Exclusiva do Passe 🏆 +5000% Tudo", en: "Pass Exclusive 🏆 +5000% All" },
      multHp: 51.0,
      multAtk: 51.0,
      addCrit: 0.99,
      addDodge: 0.99,
      reqBosses: 0,
      passOnly: true,
    },
    end_herald: {
      id: "end_herald",
      name: { pt: "Arauto do Fim", en: "End Herald" },
      icon: "infinity",
      desc: { pt: "+8000% Status", en: "+8000% Stats" },
      multHp: 81.0,
      multAtk: 81.0,
      addCrit: 0.99,
      addDodge: 0.99,
      reqBosses: 15,
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
    {
      id: "end_herald",
      name: { pt: "Arauto do Fim", en: "End Herald" },
      icon: "megaphone",
      color: "text-rose-300",
      hpMult: 2000000000,
      dmgMult: 1800000000,
      spd: 300,
      weak: "atk",
      res: "mag",
      dodge: 0.7,
      block: 0.5,
    },
    {
      id: "void_architect",
      name: { pt: "Servo do Arquiteto", en: "Void Architect Minion" },
      icon: "drafting-compass",
      color: "text-rose-200",
      hpMult: 6000000000,
      dmgMult: 5000000000,
      spd: 280,
      weak: "mag",
      res: "atk",
      dodge: 0.5,
      block: 0.8,
    },
    {
      id: "final_fragment",
      name: { pt: "Fragmento Final", en: "Final Fragment" },
      icon: "triangle",
      color: "text-white",
      hpMult: 20000000000,
      dmgMult: 18000000000,
      spd: 250,
      weak: "none",
      res: "none",
      dodge: 0.95,
      block: 0.6,
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
    {
      id: "w_end_blade",
      name: { pt: "Lâmina do Fim", en: "Blade of the End" },
      desc: { pt: "50T Dano", en: "50T Dmg" },
      icon: "infinity",
      cost: 2000000000000000,
      reqLvl: 2700,
      reqBosses: 15,
      dmg: 50000000000000,
      crit: 1.0,
    },
    {
      id: "w_architect",
      name: { pt: "Projecto Ômega", en: "Omega Blueprint" },
      desc: { pt: "300T Dano", en: "300T Dmg" },
      icon: "drafting-compass",
      cost: 15000000000000000,
      reqLvl: 3000,
      reqBosses: 15,
      dmg: 300000000000000,
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
    {
      id: "a_end_shroud",
      name: { pt: "Véu do Fim", en: "End Shroud" },
      desc: { pt: "500T HP", en: "500T HP" },
      icon: "infinity",
      cost: 3000000000000000,
      reqLvl: 2700,
      reqBosses: 15,
      hp: 500000000000000,
      def: 0.99,
      dodge: 0.99,
    },
    {
      id: "a_omega",
      name: { pt: "Armadura Ômega", en: "Omega Armor" },
      desc: { pt: "3Qa HP", en: "3Qa HP" },
      icon: "shield-plus",
      cost: 25000000000000000,
      reqLvl: 3000,
      reqBosses: 15,
      hp: 3000000000000000,
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
    {
      id: "p_end_specter",
      name: { pt: "Espectro do Fim", en: "End Specter" },
      desc: { pt: "+100000% Dano", en: "+100000% Dmg" },
      icon: "ghost",
      cost: 1000000000000000,
      reqLvl: 2800,
      reqBosses: 15,
      buff: "dmg",
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
    {
      id: "r_omega",
      name: { pt: "Núcleo Ômega", en: "Omega Core" },
      desc: { pt: "Multiplica Tudo (50x)", en: "Multiplies All (50x)" },
      icon: "infinity",
      cost: 2000000000000000,
      reqLvl: 2800,
      reqBosses: 15,
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
      desc: { pt: "Cap. IV completo.", en: "Ch. IV done." },
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
      desc: { pt: "Cap. V completo.", en: "Ch. V done." },
      cssClass: "theme-omniverse",
      bgClass: "bg-arena-omniverse",
      cost: 10000000,
      reqLvl: 250,
      reqBosses: 5,
    },
    {
      id: "t_matrix",
      name: { pt: "Realidade Base", en: "Base Reality" },
      desc: { pt: "Cap. VI completo.", en: "Ch. VI done." },
      cssClass: "theme-matrix",
      bgClass: "bg-arena-matrix",
      cost: 30000000,
      reqLvl: 400,
      reqBosses: 6,
    },
    {
      id: "t_dev",
      name: { pt: "Desenvolvedor", en: "Dev Realm" },
      desc: { pt: "Cap. VII completo.", en: "Ch. VII done." },
      cssClass: "theme-dev",
      bgClass: "bg-arena-dev",
      cost: 150000000,
      reqLvl: 500,
      reqBosses: 7,
    },
    {
      id: "t_hardware",
      name: { pt: "Hardware", en: "Hardware" },
      desc: { pt: "Cap. VIII completo.", en: "Ch. VIII done." },
      cssClass: "theme-hardware",
      bgClass: "bg-arena-hardware",
      cost: 800000000,
      reqLvl: 650,
      reqBosses: 8,
    },
    {
      id: "t_math",
      name: { pt: "Plano Lógico", en: "Logic Plane" },
      desc: { pt: "Cap. IX completo.", en: "Ch. IX done." },
      cssClass: "theme-math",
      bgClass: "bg-arena-math",
      cost: 2500000000,
      reqLvl: 800,
      reqBosses: 9,
    },
    {
      id: "t_glitch",
      name: { pt: "A Anomalia", en: "The Anomaly" },
      desc: { pt: "Cap. X completo.", en: "Ch. X done." },
      cssClass: "theme-glitch",
      bgClass: "bg-arena-glitch",
      cost: 50000000000,
      reqLvl: 1000,
      reqBosses: 10,
    },
    {
      id: "t_reboot",
      name: { pt: "O Reboot", en: "The Reboot" },
      desc: { pt: "Epílogo I completo.", en: "Epilogue I done." },
      cssClass: "theme-reboot",
      bgClass: "bg-arena-reboot",
      cost: 250000000000,
      reqLvl: 1250,
      reqBosses: 11,
    },
    {
      id: "t_synthetic",
      name: { pt: "Multiverso", en: "Multiverse" },
      desc: { pt: "Epílogo II completo.", en: "Epilogue II done." },
      cssClass: "theme-synthetic",
      bgClass: "bg-arena-synthetic",
      cost: 1000000000000,
      reqLvl: 1500,
      reqBosses: 12,
    },
    {
      id: "t_white",
      name: { pt: "Vazio Branco", en: "White Void" },
      desc: { pt: "Epílogo III completo.", en: "Epilogue III done." },
      cssClass: "theme-white",
      bgClass: "bg-arena-white",
      cost: 5000000000000,
      reqLvl: 2000,
      reqBosses: 13,
    },
    {
      id: "t_quantum",
      name: { pt: "Núcleo Quântico", en: "Quantum Core" },
      desc: { pt: "Ato Final completo.", en: "Final Act done." },
      cssClass: "theme-quantum",
      bgClass: "bg-arena-quantum",
      cost: 50000000000000,
      reqLvl: 2500,
      reqBosses: 14,
    },
    {
      id: "t_end",
      name: { pt: "O Arquiteto", en: "The Architect" },
      desc: { pt: "Cap. XI completo.", en: "Ch. XI done." },
      cssClass: "theme-end",
      bgClass: "bg-arena-end",
      cost: 500000000000000000,
      reqLvl: 3000,
      reqBosses: 15,
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
  if (this.bossKills >= 16)
    earned.push({
      id: "b16",
      icon: "infinity",
      color: "text-rose-300",
      name: { pt: "Arauto do Fim", en: "End Herald" },
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


rpg.startBattle = function (isBoss) {
  this.inCombat = true;
  this.heroHp = this.getMaxHp();
  this.fury = 0;
  this.combo = 0;
  this.updateComboUI();
  document.getElementById("boss-warning").classList.toggle("hidden", !isBoss);

  Object.values(this.skills).forEach((s) => (s.timer = false));
  document.querySelectorAll(".btn-3d").forEach((b) => (b.disabled = false));
  // btn-auto-atk nunca deve ser desativado por cooldowns
  const autoBtn = document.getElementById("btn-auto-atk");
  if (autoBtn) { autoBtn.disabled = false; autoBtn.style.pointerEvents = "auto"; autoBtn.style.opacity = "1"; autoBtn.style.filter = ""; }
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
  // Iniciar interval de auto attack se estava ligado
};

rpg.endBattle = function () {
  this.inCombat = false;
  this.isSpawning = false;
  this.autoAttack = false;
  const btn = document.getElementById("btn-auto-atk");
  if (btn) btn.classList.remove("auto-atk-active");

  if (this.combatFrame) { cancelAnimationFrame(this.combatFrame); this.combatFrame = null; }
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
  // Durante spawn: pausar ATB mas manter loop vivo
  if (this.isSpawning) {
    if (this.inCombat && this.heroHp > 0) {
      this.lastTime = timestamp;
      this.combatFrame = requestAnimationFrame(this.combatTick.bind(this));
    }
    return;
  }

  if (!this.inCombat || !this.monster || this.monster.hp <= 0 || this.heroHp <= 0)
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

  // Reschedular o próximo frame
  if (this.inCombat && this.heroHp > 0) {
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
    this.tickDailySpecial("parry");
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
  if (this.fury >= 100 && atkBtn && !atkBtn.classList.contains("ultimate-ready")) {
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
  // Defensive check: garante que o combate está ativo e monstro existe
  if (
    !this.inCombat ||
    !this.skills[id] ||
    this.skills[id].timer ||
    this.heroHp <= 0 ||
    !this.monster ||
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
      this.tickDailySpecial("fury");
    } else {
      let isCrit = Math.random() < this.getCritChance();
      let dmg = isCrit ? atkPoder * 2 : atkPoder;
      this.dealDamageToMonster(dmg, "atk", isCrit);
      this.addFury(8);
      if (isCrit) this.tickDailySpecial("crit");
    }
    this.combo++;
    if (this.combo >= 20) this.tickDailySpecial("combo");
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
    this.tickDailySpecial("heal");
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
  // T4: HolyArmor - bloqueia críticos se o ataque INIMIGO for crítico (aplicado no hook executeMonsterAttack)
  let finalDmg = isCrit ? baseDmg * (this.talentCritMult||2) : baseDmg;

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
  if (!skill) return;
  skill.timer = true;
  const btn = document.getElementById("btn-"+id);
  const cdBar = document.getElementById("cd-"+id);

  if (btn) btn.disabled = true;
  cdBar.style.width = "100%";
  // Garantir que btn-auto-atk nunca fica disabled
  const _autoBtn = document.getElementById("btn-auto-atk");
  if (_autoBtn) { _autoBtn.disabled = false; _autoBtn.style.opacity = "1"; _autoBtn.style.filter = ""; }

  let startTime = Date.now();
  let finalCd = skill.cd;
  if (this.inventory.includes("r_capacitor")) finalCd *= 0.5;
  else if (this.inventory.includes("r_time")) finalCd *= 0.8;

  const frame = () => {
    if (!skill.timer) return;
    let elapsed = Date.now() - startTime;
    let pct = 100 - (elapsed / finalCd) * 100;

    if (pct <= 0) {
      // Re-fetch button in case DOM changed
      const _btn = document.getElementById("btn-"+id);
      if (_btn) { _btn.disabled = false; _btn.style.pointerEvents = ''; _btn.style.opacity = ''; }
      if (cdBar) cdBar.style.width = "0%";
      skill.timer = false;
    } else {
      if (cdBar) cdBar.style.width = `${pct}%`;
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
    const bossEventMult = this.getEventMult("boss");
    xpGain = Math.floor(xpGain * bossEventMult);
    goldGain = Math.floor(goldGain * bossEventMult);
    this.bossKills++;
    const extraPotions = Math.max(5, Math.floor(5 * bossEventMult));
    this.potions += extraPotions;
    dropMsg = `+${extraPotions} ` + t("boss_loot_msg");
    this.spawnLootIcon("flask-round", "text-emerald-400");
    showToast(t("boss_defeated"), 4000);
  } else {
    const potMult = this.getEventMult("pot");
    if (Math.random() < Math.min(0.9, 0.15 * potMult)) {
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
  if (this.inventory.includes("r_god")) { goldGain *= 1.5; xpGain *= 1.5; }
  if (this.inventory.includes("r_dev")) { goldGain *= 2.0; xpGain *= 2.0; }
  if (this.inventory.includes("r_chaos")) { goldGain *= 1.5; xpGain *= 1.5; }
  if (this.inventory.includes("r_cmos")) { goldGain *= 5.0; xpGain *= 5.0; }
  if (this.inventory.includes("r_prism")) { goldGain *= 2.0; xpGain *= 2.0; }
  if (this.inventory.includes("r_void")) { goldGain *= 10.0; xpGain *= 10.0; }

  // Event multipliers
  goldGain = Math.floor(goldGain * this.getEventMult("gold"));
  xpGain   = Math.floor(xpGain   * this.getEventMult("xp"));

  this.spawnLoot(goldGain);

  this.xp += xpGain;
  this.gold += goldGain;
  this.kills++;

  // Daily missions & event tracking
  this.tickDailyMissions(this.isBossFight);
  if (this.eventActive) {
    this.eventKills++;
    this.tickEvent();
  }

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
        this.inCombat = false;
        this.autoAttack = false;
        const _autoBtn = document.getElementById("btn-auto-atk");
        if (_autoBtn) _autoBtn.classList.remove("auto-atk-active");
        navTo("menu");
      } else {
        this.monsterAtb = 0;
        this.spawnMonster();
        this.isSpawning = false;
        this.lastTime = performance.now();
        // Sempre relançar o loop rAF após spawn
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
  const maxHp = Math.max(1, this.getMaxHp());
  const curHp = Math.max(0, this.heroHp || 0);
  // Garante que a largura fica entre 0% e 100% — fix do bug HUD não diminuir
  const heroPct = Math.min(100, Math.max(0, (curHp / maxHp) * 100));

  const heroBar = document.getElementById("hero-hp-bar");
  const heroTxt = document.getElementById("hero-hp-text");
  if (heroBar) {
    heroBar.style.width = heroPct + "%";
    // Cor dinâmica: verde > amarelo > vermelho conforme HP
    if (heroPct > 60) {
      heroBar.style.background = "linear-gradient(90deg, #059669, #34d399)";
      heroBar.style.boxShadow  = "0 0 8px rgba(52,211,153,0.4)";
    } else if (heroPct > 30) {
      heroBar.style.background = "linear-gradient(90deg, #b45309, #fbbf24)";
      heroBar.style.boxShadow  = "0 0 8px rgba(251,191,36,0.5)";
    } else {
      heroBar.style.background = "linear-gradient(90deg, #991b1b, #ef4444)";
      heroBar.style.boxShadow  = "0 0 10px rgba(239,68,68,0.7)";
    }
  }
  if (heroTxt) heroTxt.innerText = formatNumber(Math.ceil(curHp)) + " / " + formatNumber(maxHp);

  if (this.monster) {
    const monMax = Math.max(1, this.monster.maxHp || 1);
    const monCur = Math.max(0, this.monster.hp || 0);
    const monPct = Math.min(100, Math.max(0, (monCur / monMax) * 100));
    const monBar = document.getElementById("monster-hp-bar");
    const monTxt = document.getElementById("monster-hp-text");
    if (monBar) monBar.style.width = monPct + "%";
    if (monTxt) monTxt.innerText = formatNumber(Math.ceil(monCur)) + " / " + formatNumber(monMax);
  }

  const potBtn = document.getElementById("btn-potion-count");
  if (potBtn) potBtn.innerText = formatNumber(this.potions);
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
    const isPassLocked = c.passOnly && !this.bpClaimed.includes("bp_50");
    const isLocked = !isPassLocked && this.bossKills < c.reqBosses;

    let btnHTML = "";
    if (isPassLocked) {
      btnHTML = `<button disabled class="w-full mt-3 py-2 bg-yellow-950/40 text-yellow-600 rounded-lg text-[10px] font-bold border border-yellow-800/50 uppercase tracking-wide flex items-center justify-center gap-1"><i data-lucide="star" class="w-3 h-3"></i> Passe Nível 50</button>`;
    } else if (isLocked) {
      let actName =
        [
          "",
          "Ato II",
          "Ato III",
          "Cap. IV",
          "Cap. V",
          "Cap. VI",
          "Cap. VII",
          "Cap. VIII",
          "Cap. IX",
          "Cap. X",
          "Epílogo I",
          "Epílogo II",
          "Epílogo III",
          "Epílogo IV",
          "Ato Final",
          "Cap. XI",
        ][c.reqBosses] || "???";
      btnHTML = `<button disabled class="w-full mt-3 py-2 bg-zinc-800/80 text-zinc-500 rounded-lg text-[10px] font-bold border border-zinc-700/50 uppercase tracking-wide flex items-center justify-center gap-1"><i data-lucide="lock" class="w-3 h-3"></i> Boss ${actName}</button>`;
    } else if (isActive) {
      btnHTML = `<button disabled class="w-full mt-3 py-2 bg-emerald-900/30 text-emerald-500 rounded-lg text-xs font-bold border border-emerald-800">${t("in_use")}</button>`;
    } else {
      btnHTML = `<button onclick="rpg.changeClass('${c.id}')" class="w-full mt-3 py-2 bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-white rounded-lg text-xs font-bold transition shadow">${t("assume_mantle")}</button>`;
    }

    list.innerHTML += `
        <div class="bg-zinc-950/80 border ${isActive ? "border-brand-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : isPassLocked ? "border-yellow-900/40" : "border-zinc-800 shadow-inner"} ${(isLocked || isPassLocked) && !isActive ? "opacity-60 grayscale" : ""} rounded-xl p-4 flex flex-col items-center text-center transition-all">
            <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-md mb-2 text-zinc-300">
            <i data-lucide="${c.icon}" class="w-6 h-6 ${isActive ? "text-brand-400" : isPassLocked ? "text-yellow-700" : ""}"></i>
            </div>
            <h3 class="font-black ${isPassLocked ? "text-yellow-700" : "text-zinc-200"} text-sm uppercase tracking-wide">${c.name[this.lang]}</h3>
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
  localStorage.setItem("rpg_daily_missions", JSON.stringify(this.dailyMissions));
  localStorage.setItem("rpg_daily_date", this.dailyDate);
  localStorage.setItem("rpg_daily_completed", JSON.stringify(this.dailyCompleted));
  localStorage.setItem("rpg_prestige", this.prestigeLevel);
  localStorage.setItem("rpg_prestige_mult", this.prestigeMult);
  if (this.coopPartner) localStorage.setItem("rpg_coop_partner", JSON.stringify(this.coopPartner));
  else localStorage.removeItem("rpg_coop_partner");
  localStorage.setItem("rpg_pvp_history", JSON.stringify(this.pvpHistory || []));
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
    prestigeLevel: this.prestigeLevel, prestigeMult: this.prestigeMult,
    dailyCompleted: this.dailyCompleted, dailyMissions: this.dailyMissions, dailyDate: this.dailyDate,
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
  // ── TIER I — Recruta (1–10) · abates 1–50 ──
  { id:"bp_1",  tier:1, req:1,    icon:"coins",        color:"text-yellow-400",  name:{pt:"100 Ouro",        en:"100 Gold"       }, type:"gold", value:100 },
  { id:"bp_2",  tier:1, req:3,    icon:"flask-round",  color:"text-emerald-400", name:{pt:"3 Poções",        en:"3 Potions"      }, type:"pot",  value:3 },
  { id:"bp_3",  tier:1, req:5,    icon:"coins",        color:"text-yellow-400",  name:{pt:"300 Ouro",        en:"300 Gold"       }, type:"gold", value:300 },
  { id:"bp_4",  tier:1, req:8,    icon:"flask-round",  color:"text-emerald-400", name:{pt:"5 Poções",        en:"5 Potions"      }, type:"pot",  value:5 },
  { id:"bp_5",  tier:1, req:12,   icon:"coins",        color:"text-yellow-400",  name:{pt:"800 Ouro",        en:"800 Gold"       }, type:"gold", value:800 },
  { id:"bp_6",  tier:1, req:18,   icon:"coins",        color:"text-yellow-400",  name:{pt:"2K Ouro",         en:"2K Gold"        }, type:"gold", value:2000 },
  { id:"bp_7",  tier:1, req:25,   icon:"flask-round",  color:"text-emerald-400", name:{pt:"10 Poções",       en:"10 Potions"     }, type:"pot",  value:10 },
  { id:"bp_8",  tier:1, req:33,   icon:"coins",        color:"text-yellow-400",  name:{pt:"5K Ouro",         en:"5K Gold"        }, type:"gold", value:5000 },
  { id:"bp_9",  tier:1, req:42,   icon:"flask-round",  color:"text-emerald-400", name:{pt:"15 Poções",       en:"15 Potions"     }, type:"pot",  value:15 },
  { id:"bp_10", tier:1, req:50,   icon:"coins",        color:"text-amber-400",   name:{pt:"15K Ouro",        en:"15K Gold"       }, type:"gold", value:15000 },

  // ── TIER II — Caçador (11–20) · abates 60–200 ──
  { id:"bp_11", tier:2, req:60,   icon:"coins",        color:"text-amber-400",   name:{pt:"40K Ouro",        en:"40K Gold"       }, type:"gold", value:40000 },
  { id:"bp_12", tier:2, req:75,   icon:"flask-round",  color:"text-emerald-400", name:{pt:"25 Poções",       en:"25 Potions"     }, type:"pot",  value:25 },
  { id:"bp_13", tier:2, req:90,   icon:"coins",        color:"text-amber-400",   name:{pt:"100K Ouro",       en:"100K Gold"      }, type:"gold", value:100000 },
  { id:"bp_14", tier:2, req:110,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"40 Poções",       en:"40 Potions"     }, type:"pot",  value:40 },
  { id:"bp_15", tier:2, req:130,  icon:"zap",          color:"text-orange-400",  name:{pt:"300K Ouro",       en:"300K Gold"      }, type:"gold", value:300000 },
  { id:"bp_16", tier:2, req:150,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"60 Poções",       en:"60 Potions"     }, type:"pot",  value:60 },
  { id:"bp_17", tier:2, req:165,  icon:"coins",        color:"text-orange-400",  name:{pt:"700K Ouro",       en:"700K Gold"      }, type:"gold", value:700000 },
  { id:"bp_18", tier:2, req:180,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"80 Poções",       en:"80 Potions"     }, type:"pot",  value:80 },
  { id:"bp_19", tier:2, req:190,  icon:"star",         color:"text-orange-300",  name:{pt:"1.5M Ouro",       en:"1.5M Gold"      }, type:"gold", value:1500000 },
  { id:"bp_20", tier:2, req:200,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"100 Poções",      en:"100 Potions"    }, type:"pot",  value:100 },

  // ── TIER III — Veterano (21–30) · abates 225–500 ──
  { id:"bp_21", tier:3, req:225,  icon:"coins",        color:"text-red-400",     name:{pt:"4M Ouro",         en:"4M Gold"        }, type:"gold", value:4000000 },
  { id:"bp_22", tier:3, req:250,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"150 Poções",      en:"150 Potions"    }, type:"pot",  value:150 },
  { id:"bp_23", tier:3, req:280,  icon:"crown",        color:"text-red-400",     name:{pt:"10M Ouro",        en:"10M Gold"       }, type:"gold", value:10000000 },
  { id:"bp_24", tier:3, req:320,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"200 Poções",      en:"200 Potions"    }, type:"pot",  value:200 },
  { id:"bp_25", tier:3, req:360,  icon:"gem",          color:"text-red-300",     name:{pt:"30M Ouro",        en:"30M Gold"       }, type:"gold", value:30000000 },
  { id:"bp_26", tier:3, req:400,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"300 Poções",      en:"300 Potions"    }, type:"pot",  value:300 },
  { id:"bp_27", tier:3, req:430,  icon:"coins",        color:"text-red-300",     name:{pt:"80M Ouro",        en:"80M Gold"       }, type:"gold", value:80000000 },
  { id:"bp_28", tier:3, req:460,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"400 Poções",      en:"400 Potions"    }, type:"pot",  value:400 },
  { id:"bp_29", tier:3, req:480,  icon:"star",         color:"text-rose-300",    name:{pt:"200M Ouro",       en:"200M Gold"      }, type:"gold", value:200000000 },
  { id:"bp_30", tier:3, req:500,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"500 Poções",      en:"500 Potions"    }, type:"pot",  value:500 },

  // ── TIER IV — Élite (31–40) · abates 550–1000 ──
  { id:"bp_31", tier:4, req:550,  icon:"coins",        color:"text-purple-400",  name:{pt:"600M Ouro",       en:"600M Gold"      }, type:"gold", value:600000000 },
  { id:"bp_32", tier:4, req:600,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"700 Poções",      en:"700 Potions"    }, type:"pot",  value:700 },
  { id:"bp_33", tier:4, req:660,  icon:"crown",        color:"text-purple-400",  name:{pt:"2B Ouro",         en:"2B Gold"        }, type:"gold", value:2000000000 },
  { id:"bp_34", tier:4, req:720,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"1000 Poções",     en:"1000 Potions"   }, type:"pot",  value:1000 },
  { id:"bp_35", tier:4, req:780,  icon:"gem",          color:"text-purple-300",  name:{pt:"6B Ouro",         en:"6B Gold"        }, type:"gold", value:6000000000 },
  { id:"bp_36", tier:4, req:840,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"1500 Poções",     en:"1500 Potions"   }, type:"pot",  value:1500 },
  { id:"bp_37", tier:4, req:900,  icon:"coins",        color:"text-purple-300",  name:{pt:"20B Ouro",        en:"20B Gold"       }, type:"gold", value:20000000000 },
  { id:"bp_38", tier:4, req:940,  icon:"flask-round",  color:"text-emerald-400", name:{pt:"2000 Poções",     en:"2000 Potions"   }, type:"pot",  value:2000 },
  { id:"bp_39", tier:4, req:970,  icon:"star",         color:"text-fuchsia-400", name:{pt:"60B Ouro",        en:"60B Gold"       }, type:"gold", value:60000000000 },
  { id:"bp_40", tier:4, req:1000, icon:"flask-round",  color:"text-emerald-400", name:{pt:"3000 Poções",     en:"3000 Potions"   }, type:"pot",  value:3000 },

  // ── TIER V — Lenda (41–55) · abates 1100–2500 ──
  { id:"bp_41", tier:5, req:1100, icon:"coins",        color:"text-cyan-400",    name:{pt:"200B Ouro",       en:"200B Gold"      }, type:"gold", value:200000000000 },
  { id:"bp_42", tier:5, req:1250, icon:"flask-round",  color:"text-emerald-400", name:{pt:"4000 Poções",     en:"4000 Potions"   }, type:"pot",  value:4000 },
  { id:"bp_43", tier:5, req:1400, icon:"crown",        color:"text-cyan-400",    name:{pt:"700B Ouro",       en:"700B Gold"      }, type:"gold", value:700000000000 },
  { id:"bp_44", tier:5, req:1600, icon:"flask-round",  color:"text-emerald-400", name:{pt:"5000 Poções",     en:"5000 Potions"   }, type:"pot",  value:5000 },
  { id:"bp_45", tier:5, req:1800, icon:"gem",          color:"text-cyan-300",    name:{pt:"2T Ouro",         en:"2T Gold"        }, type:"gold", value:2000000000000 },
  { id:"bp_46", tier:5, req:2000, icon:"coins",        color:"text-cyan-300",    name:{pt:"7T Ouro",         en:"7T Gold"        }, type:"gold", value:7000000000000 },
  { id:"bp_47", tier:5, req:2100, icon:"flask-round",  color:"text-emerald-400", name:{pt:"7000 Poções",     en:"7000 Potions"   }, type:"pot",  value:7000 },
  { id:"bp_48", tier:5, req:2200, icon:"star",         color:"text-white",       name:{pt:"25T Ouro",        en:"25T Gold"       }, type:"gold", value:25000000000000 },
  { id:"bp_49", tier:5, req:2350, icon:"flask-round",  color:"text-emerald-400", name:{pt:"10K Poções",      en:"10K Potions"    }, type:"pot",  value:10000 },
  { id:"bp_50", tier:5, req:2500, icon:"coins",        color:"text-white",       name:{pt:"80T Ouro",        en:"80T Gold"       }, type:"gold", value:80000000000000 },

  // ── TIER VI — Mestre do Passe (51–65) · abates 2700–5000 ──
  { id:"bp_51", tier:6, req:2700, icon:"coins",        color:"text-rose-300",    name:{pt:"300T Ouro",       en:"300T Gold"      }, type:"gold", value:300000000000000 },
  { id:"bp_52", tier:6, req:3000, icon:"flask-round",  color:"text-emerald-400", name:{pt:"15K Poções",      en:"15K Potions"    }, type:"pot",  value:15000 },
  { id:"bp_53", tier:6, req:3300, icon:"crown",        color:"text-rose-300",    name:{pt:"1Qa Ouro",        en:"1Qa Gold"       }, type:"gold", value:1000000000000000 },
  { id:"bp_54", tier:6, req:3600, icon:"flask-round",  color:"text-emerald-400", name:{pt:"20K Poções",      en:"20K Potions"    }, type:"pot",  value:20000 },
  { id:"bp_55", tier:6, req:3900, icon:"gem",          color:"text-rose-200",    name:{pt:"4Qa Ouro",        en:"4Qa Gold"       }, type:"gold", value:4000000000000000 },
  { id:"bp_56", tier:6, req:4100, icon:"coins",        color:"text-rose-200",    name:{pt:"15Qa Ouro",       en:"15Qa Gold"      }, type:"gold", value:15000000000000000 },
  { id:"bp_57", tier:6, req:4300, icon:"flask-round",  color:"text-emerald-400", name:{pt:"30K Poções",      en:"30K Potions"    }, type:"pot",  value:30000 },
  { id:"bp_58", tier:6, req:4500, icon:"star",         color:"text-rose-100",    name:{pt:"60Qa Ouro",       en:"60Qa Gold"      }, type:"gold", value:60000000000000000 },
  { id:"bp_59", tier:6, req:4700, icon:"flask-round",  color:"text-emerald-400", name:{pt:"50K Poções",      en:"50K Potions"    }, type:"pot",  value:50000 },
  { id:"bp_60", tier:6, req:5000, icon:"coins",        color:"text-white",       name:{pt:"200Qa Ouro",      en:"200Qa Gold"     }, type:"gold", value:200000000000000000 },

  // ── TIER VII — Transcendente (61–75) · abates 5500–10000 ──
  { id:"bp_61", tier:7, req:5500, icon:"coins",        color:"text-violet-300",  name:{pt:"700Qa Ouro",      en:"700Qa Gold"     }, type:"gold", value:700000000000000000 },
  { id:"bp_62", tier:7, req:6000, icon:"flask-round",  color:"text-emerald-400", name:{pt:"80K Poções",      en:"80K Potions"    }, type:"pot",  value:80000 },
  { id:"bp_63", tier:7, req:6500, icon:"crown",        color:"text-violet-300",  name:{pt:"2Qi Ouro",        en:"2Qi Gold"       }, type:"gold", value:2000000000000000000 },
  { id:"bp_64", tier:7, req:7000, icon:"flask-round",  color:"text-emerald-400", name:{pt:"120K Poções",     en:"120K Potions"   }, type:"pot",  value:120000 },
  { id:"bp_65", tier:7, req:7500, icon:"gem",          color:"text-violet-200",  name:{pt:"7Qi Ouro",        en:"7Qi Gold"       }, type:"gold", value:7000000000000000000 },
  { id:"bp_66", tier:7, req:8000, icon:"coins",        color:"text-violet-200",  name:{pt:"20Qi Ouro",       en:"20Qi Gold"      }, type:"gold", value:20000000000000000000 },
  { id:"bp_67", tier:7, req:8500, icon:"flask-round",  color:"text-emerald-400", name:{pt:"200K Poções",     en:"200K Potions"   }, type:"pot",  value:200000 },
  { id:"bp_68", tier:7, req:9000, icon:"star",         color:"text-violet-100",  name:{pt:"70Qi Ouro",       en:"70Qi Gold"      }, type:"gold", value:70000000000000000000 },
  { id:"bp_69", tier:7, req:9500, icon:"flask-round",  color:"text-emerald-400", name:{pt:"300K Poções",     en:"300K Potions"   }, type:"pot",  value:300000 },
  { id:"bp_70", tier:7, req:10000,icon:"coins",        color:"text-white",       name:{pt:"250Qi Ouro",      en:"250Qi Gold"     }, type:"gold", value:250000000000000000000 },

  // ── TIER VIII — Sem Nome (71–85) · abates 11000–20000 ──
  { id:"bp_71", tier:8, req:11000,icon:"coins",        color:"text-amber-200",   name:{pt:"1e24 Ouro",       en:"1e24 Gold"      }, type:"gold", value:1e24 },
  { id:"bp_72", tier:8, req:12000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"500K Poções",     en:"500K Potions"   }, type:"pot",  value:500000 },
  { id:"bp_73", tier:8, req:13000,icon:"crown",        color:"text-amber-200",   name:{pt:"5e24 Ouro",       en:"5e24 Gold"      }, type:"gold", value:5e24 },
  { id:"bp_74", tier:8, req:14000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"800K Poções",     en:"800K Potions"   }, type:"pot",  value:800000 },
  { id:"bp_75", tier:8, req:15000,icon:"gem",          color:"text-amber-100",   name:{pt:"2e25 Ouro",       en:"2e25 Gold"      }, type:"gold", value:2e25 },
  { id:"bp_76", tier:8, req:16000,icon:"coins",        color:"text-amber-100",   name:{pt:"8e25 Ouro",       en:"8e25 Gold"      }, type:"gold", value:8e25 },
  { id:"bp_77", tier:8, req:17000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"1.2M Poções",     en:"1.2M Potions"   }, type:"pot",  value:1200000 },
  { id:"bp_78", tier:8, req:18000,icon:"star",         color:"text-white",       name:{pt:"3e26 Ouro",       en:"3e26 Gold"      }, type:"gold", value:3e26 },
  { id:"bp_79", tier:8, req:19000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"2M Poções",       en:"2M Potions"     }, type:"pot",  value:2000000 },
  { id:"bp_80", tier:8, req:20000,icon:"coins",        color:"text-white",       name:{pt:"1e27 Ouro",       en:"1e27 Gold"      }, type:"gold", value:1e27 },

  // ── TIER IX — Além do Infinito (81–94) · abates 22000–48000 ──
  { id:"bp_81", tier:9, req:22000,icon:"coins",        color:"text-rose-200",    name:{pt:"5e27 Ouro",       en:"5e27 Gold"      }, type:"gold", value:5e27 },
  { id:"bp_82", tier:9, req:25000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"3M Poções",       en:"3M Potions"     }, type:"pot",  value:3000000 },
  { id:"bp_83", tier:9, req:28000,icon:"crown",        color:"text-rose-200",    name:{pt:"2e28 Ouro",       en:"2e28 Gold"      }, type:"gold", value:2e28 },
  { id:"bp_84", tier:9, req:31000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"5M Poções",       en:"5M Potions"     }, type:"pot",  value:5000000 },
  { id:"bp_85", tier:9, req:34000,icon:"gem",          color:"text-rose-100",    name:{pt:"8e28 Ouro",       en:"8e28 Gold"      }, type:"gold", value:8e28 },
  { id:"bp_86", tier:9, req:37000,icon:"coins",        color:"text-rose-100",    name:{pt:"3e29 Ouro",       en:"3e29 Gold"      }, type:"gold", value:3e29 },
  { id:"bp_87", tier:9, req:40000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"10M Poções",      en:"10M Potions"    }, type:"pot",  value:10000000 },
  { id:"bp_88", tier:9, req:43000,icon:"star",         color:"text-white",       name:{pt:"1e30 Ouro",       en:"1e30 Gold"      }, type:"gold", value:1e30 },
  { id:"bp_89", tier:9, req:46000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"20M Poções",      en:"20M Potions"    }, type:"pot",  value:20000000 },
  { id:"bp_90", tier:9, req:48000,icon:"coins",        color:"text-white",       name:{pt:"5e30 Ouro",       en:"5e30 Gold"      }, type:"gold", value:5e30 },

  // ── TIER X — ASCENSÃO FINAL (91–99) · abates 50000–90000 ──
  { id:"bp_91", tier:10,req:50000,icon:"coins",        color:"text-cyan-200",    name:{pt:"2e31 Ouro",       en:"2e31 Gold"      }, type:"gold", value:2e31 },
  { id:"bp_92", tier:10,req:55000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"50M Poções",      en:"50M Potions"    }, type:"pot",  value:50000000 },
  { id:"bp_93", tier:10,req:60000,icon:"crown",        color:"text-cyan-200",    name:{pt:"1e32 Ouro",       en:"1e32 Gold"      }, type:"gold", value:1e32 },
  { id:"bp_94", tier:10,req:65000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"100M Poções",     en:"100M Potions"   }, type:"pot",  value:100000000 },
  { id:"bp_95", tier:10,req:70000,icon:"gem",          color:"text-cyan-100",    name:{pt:"5e32 Ouro",       en:"5e32 Gold"      }, type:"gold", value:5e32 },
  { id:"bp_96", tier:10,req:75000,icon:"coins",        color:"text-cyan-100",    name:{pt:"2e33 Ouro",       en:"2e33 Gold"      }, type:"gold", value:2e33 },
  { id:"bp_97", tier:10,req:80000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"250M Poções",     en:"250M Potions"   }, type:"pot",  value:250000000 },
  { id:"bp_98", tier:10,req:85000,icon:"star",         color:"text-white",       name:{pt:"1e34 Ouro",       en:"1e34 Gold"      }, type:"gold", value:1e34 },
  { id:"bp_99", tier:10,req:90000,icon:"flask-round",  color:"text-emerald-400", name:{pt:"500M Poções",     en:"500M Potions"   }, type:"pot",  value:500000000 },

  // ── NÍVEL 100 — RECOMPENSA MÁXIMA ──
  { id:"bp_100",tier:11,req:100000,icon:"badge-check", color:"text-yellow-300",
    name:{pt:"🏆 Classe: Senhor do Passe", en:"🏆 Class: Pass Master"},
    type:"class", value:"pass_master" },
];

rpg.renderBattlePass = function () {
  const list = document.getElementById("battlepass-list");
  if (!list) return;
  list.innerHTML = "";

  const kills = this.kills;
  const tierNames = {
    1:  { pt: "Tier I — Recruta",          en: "Tier I — Recruit",         color: "text-zinc-400"    },
    2:  { pt: "Tier II — Caçador",          en: "Tier II — Hunter",         color: "text-amber-400"   },
    3:  { pt: "Tier III — Veterano",        en: "Tier III — Veteran",       color: "text-orange-400"  },
    4:  { pt: "Tier IV — Élite",            en: "Tier IV — Elite",          color: "text-red-400"     },
    5:  { pt: "Tier V — Lenda",             en: "Tier V — Legend",          color: "text-purple-400"  },
    6:  { pt: "Tier VI — Mestre do Passe",  en: "Tier VI — Pass Master",    color: "text-fuchsia-400" },
    7:  { pt: "Tier VII — Transcendente",   en: "Tier VII — Transcendent",  color: "text-cyan-400"    },
    8:  { pt: "Tier VIII — Sem Nome",       en: "Tier VIII — Nameless",     color: "text-rose-300"    },
    9:  { pt: "Tier IX — Além do Infinito", en: "Tier IX — Beyond Infinity",color: "text-violet-300"  },
    10: { pt: "Tier X — Ascensão Final",    en: "Tier X — Final Ascension", color: "text-white"       },
    11: { pt: "⚔ Nível 100 — Recompensa Máxima", en: "⚔ Level 100 — Ultimate Reward", color: "text-yellow-300" },
  };

  // Progress bar header
  const totalRewards = this.battlePassRewards.length;
  const claimedCount = this.battlePassRewards.filter(r => this.bpClaimed.includes(r.id)).length;
  const pctTotal = Math.floor((claimedCount / totalRewards) * 100);
  list.innerHTML = `
    <div class="bg-zinc-950/80 border border-violet-800/40 rounded-xl p-3 mb-4">
      <div class="flex justify-between items-center mb-1.5">
        <span class="text-[10px] font-black text-violet-300 uppercase tracking-widest">Progresso do Passe</span>
        <span class="text-[10px] font-black text-violet-400">${claimedCount} / ${totalRewards}</span>
      </div>
      <div class="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div class="h-full rounded-full bg-gradient-to-r from-violet-700 to-fuchsia-500 transition-all" style="width:${pctTotal}%"></div>
      </div>
      <p class="text-[9px] text-zinc-600 font-bold mt-1.5 text-center uppercase tracking-wider">Abates totais: ${formatNumber(kills)}</p>
    </div>`;

  let lastTier = 0;
  this.battlePassRewards.forEach((r) => {
    const claimed = this.bpClaimed.includes(r.id);
    const unlocked = kills >= r.req;
    const canClaim = unlocked && !claimed;
    const isClassReward = r.type === "class";

    // Tier separator
    if (r.tier !== lastTier) {
      const tn = tierNames[r.tier];
      list.innerHTML += `<div class="flex items-center gap-2 my-3">
        <div class="flex-1 h-px bg-zinc-800"></div>
        <span class="text-[9px] font-black uppercase tracking-widest ${tn.color}">${tn[this.lang]}</span>
        <div class="flex-1 h-px bg-zinc-800"></div>
      </div>`;
      lastTier = r.tier;
    }

    let btnHTML = "";
    if (claimed) {
      btnHTML = `<span class="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1"><i data-lucide="check" class="w-3 h-3"></i> OK</span>`;
    } else if (canClaim) {
      btnHTML = `<button onclick="rpg.claimBattlePass('${r.id}')" class="px-3 py-1.5 ${isClassReward ? "bg-gradient-to-r from-yellow-600 to-amber-500 border border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.4)]" : "bg-violet-700 hover:bg-violet-600 border border-violet-500"} text-white rounded-lg text-xs font-black shadow transition">Resgatar</button>`;
    } else {
      const pct = Math.min(100, Math.floor((kills / r.req) * 100));
      btnHTML = `<div class="text-right min-w-[64px]"><span class="text-[9px] text-zinc-500 font-bold">${formatNumber(kills)}/${formatNumber(r.req)}</span><div class="w-16 h-1.5 bg-zinc-800 rounded-full mt-0.5"><div class="h-full bg-violet-700 rounded-full transition-all" style="width:${pct}%"></div></div></div>`;
    }

    const borderCls = isClassReward
      ? (claimed ? "border-yellow-800/40 bg-yellow-950/20" : canClaim ? "border-yellow-500/70 bg-yellow-950/30 shadow-[0_0_20px_rgba(234,179,8,0.25)]" : "border-zinc-800 bg-zinc-950/50")
      : (claimed ? "border-emerald-800/50 bg-emerald-950/20" : canClaim ? "border-violet-600/60 bg-violet-950/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]" : "border-zinc-800 bg-zinc-950/50");

    list.innerHTML += `
      <div class="flex items-center gap-3 p-2.5 rounded-xl border ${borderCls} shadow-inner mb-1.5">
        <div class="p-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm flex-shrink-0">
          <i data-lucide="${r.icon}" class="w-5 h-5 ${claimed ? "text-zinc-600" : r.color}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold ${isClassReward ? "text-yellow-300" : "text-zinc-200"} text-xs leading-tight truncate">${r.name[this.lang]}</h3>
          <p class="text-[9px] font-bold ${isClassReward ? "text-yellow-600" : "text-violet-400"} mt-0.5 tracking-wider uppercase">${formatNumber(r.req)} abates • Nível ${this.battlePassRewards.indexOf(r) + 1}/100</p>
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
  if (r.type === "gold") {
    this.gold += r.value;
    showToast(`+${formatNumber(r.value)} 💰`);
  } else if (r.type === "pot") {
    this.potions += r.value;
    showToast(`+${formatNumber(r.value)} 🧪`);
  } else if (r.type === "class") {
    showToast(`🏆 Classe desbloqueada: ${r.name[this.lang]}!`, 5000);
  }
  this.save();
  this.updateUI();
  this.renderBattlePass();
  if (r.type === "class") {
    // auto-render tavern if open
    if (document.getElementById("tavern-modal").classList.contains("active")) {
      this.renderTavern();
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// ── SISTEMA DE MISSÕES DIÁRIAS ───────────────────────────────
// ═══════════════════════════════════════════════════════════════
rpg._missionPool = [
  { id:"m_kill5",   type:"kill",   qty:5,   icon:"swords",      gold:500,     pot:0,  name:{pt:"Abater 5 inimigos",       en:"Slay 5 enemies"         }},
  { id:"m_kill15",  type:"kill",   qty:15,  icon:"swords",      gold:2000,    pot:2,  name:{pt:"Abater 15 inimigos",      en:"Slay 15 enemies"        }},
  { id:"m_kill30",  type:"kill",   qty:30,  icon:"swords",      gold:6000,    pot:5,  name:{pt:"Abater 30 inimigos",      en:"Slay 30 enemies"        }},
  { id:"m_boss1",   type:"boss",   qty:1,   icon:"skull",       gold:10000,   pot:8,  name:{pt:"Derrotar 1 Guardião",     en:"Defeat 1 Guardian"      }},
  { id:"m_boss2",   type:"boss",   qty:2,   icon:"skull",       gold:25000,   pot:12, name:{pt:"Derrotar 2 Guardiões",    en:"Defeat 2 Guardians"     }},
  { id:"m_crit10",  type:"crit",   qty:10,  icon:"zap",         gold:3000,    pot:3,  name:{pt:"10 golpes críticos",      en:"10 critical hits"       }},
  { id:"m_parry5",  type:"parry",  qty:5,   icon:"shield",      gold:4000,    pot:4,  name:{pt:"Executar 5 Parrys",       en:"Execute 5 Parrys"       }},
  { id:"m_combo20", type:"combo",  qty:20,  icon:"flame",       gold:5000,    pot:6,  name:{pt:"Atingir combo x20",       en:"Reach combo x20"        }},
  { id:"m_fury3",   type:"fury",   qty:3,   icon:"zap",         gold:4500,    pot:4,  name:{pt:"Usar Supremo 3 vezes",    en:"Use Ultimate 3 times"   }},
  { id:"m_heal5",   type:"heal",   qty:5,   icon:"flask-round", gold:1500,    pot:10, name:{pt:"Usar 5 poções",           en:"Use 5 potions"          }},
];

rpg._genDailyMissions = function () {
  const today = new Date().toISOString().slice(0, 10);
  if (this.dailyDate === today && this.dailyMissions && this.dailyMissions.length === 3) return;
  this.dailyDate = today;
  this.dailyCompleted = [];
  // pick 3 random unique missions
  const pool = [...this._missionPool];
  const picked = [];
  while (picked.length < 3 && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    picked.push({ ...pool[i], progress: 0, done: false });
    pool.splice(i, 1);
  }
  this.dailyMissions = picked;
  this.save();
};

rpg.tickDailyMissions = function (isBoss) {
  if (!this.dailyMissions) return;
  let changed = false;
  this.dailyMissions.forEach((m) => {
    if (m.done) return;
    if (m.type === "kill")  { m.progress++; changed = true; }
    if (m.type === "boss" && isBoss) { m.progress++; changed = true; }
    if (m.progress >= m.qty && !m.done) {
      m.done = true;
      changed = true;
    }
  });
  if (changed) {
    const el = document.getElementById("daily-dot");
    const hasClaim = this.dailyMissions.some(m => m.done && !this.dailyCompleted.includes(m.id));
    if (el) el.classList.toggle("hidden", !hasClaim);
  }
};

rpg.tickDailySpecial = function (type) {
  if (!this.dailyMissions) return;
  this.dailyMissions.forEach((m) => {
    if (m.done || m.type !== type) return;
    m.progress++;
    if (m.progress >= m.qty) m.done = true;
  });
  const el = document.getElementById("daily-dot");
  const hasClaim = this.dailyMissions.some(m => m.done && !this.dailyCompleted.includes(m.id));
  if (el) el.classList.toggle("hidden", !hasClaim);
};

rpg.claimDailyMission = function (id) {
  if (!this.dailyMissions) return;
  const m = this.dailyMissions.find(x => x.id === id);
  if (!m || !m.done || this.dailyCompleted.includes(id)) return;
  this.dailyCompleted.push(id);
  this.gold += m.gold;
  this.potions += m.pot;
  showToast(`✅ ${m.name[this.lang]} — +${formatNumber(m.gold)}💰 +${m.pot}🧪`, 4000);
  this.save();
  this.updateUI();
  this.renderDailyMissions();
};

rpg.renderDailyMissions = function () {
  const list = document.getElementById("daily-list");
  if (!list) return;
  this._genDailyMissions();
  list.innerHTML = "";
  const today = new Date().toISOString().slice(0, 10);
  list.innerHTML += `<p class="text-[9px] text-zinc-600 font-bold uppercase tracking-widest text-center mb-3">Reset às meia-noite · ${today}</p>`;
  (this.dailyMissions || []).forEach((m) => {
    const claimed = this.dailyCompleted.includes(m.id);
    const pct = Math.min(100, Math.floor((m.progress / m.qty) * 100));
    let btn = claimed
      ? `<span class="text-[10px] font-black text-emerald-400 flex items-center gap-1"><i data-lucide="check" class="w-3 h-3"></i></span>`
      : m.done
        ? `<button onclick="rpg.claimDailyMission('${m.id}')" class="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-black shadow border border-emerald-500 transition">Resgatar</button>`
        : `<span class="text-[9px] font-bold text-zinc-500">${m.progress}/${m.qty}</span>`;
    list.innerHTML += `
      <div class="flex items-center gap-3 p-2.5 rounded-xl border ${claimed ? "border-emerald-800/40 bg-emerald-950/20" : m.done ? "border-emerald-600/50 bg-emerald-950/20 shadow-[0_0_10px_rgba(52,211,153,0.15)]" : "border-zinc-800 bg-zinc-950/50"} mb-1.5">
        <div class="p-2 bg-zinc-900 border border-zinc-800 rounded-lg flex-shrink-0"><i data-lucide="${m.icon}" class="w-4 h-4 ${claimed ? "text-zinc-600" : "text-emerald-400"}"></i></div>
        <div class="flex-1 min-w-0">
          <p class="font-bold text-xs ${claimed ? "text-zinc-500" : "text-zinc-200"} truncate">${m.name[this.lang]}</p>
          <div class="w-full h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden"><div class="h-full bg-emerald-600 rounded-full transition-all" style="width:${pct}%"></div></div>
          <p class="text-[9px] text-emerald-600 mt-0.5">+${formatNumber(m.gold)}💰 +${m.pot}🧪</p>
        </div>
        <div class="flex-shrink-0">${btn}</div>
      </div>`;
  });
  lucide.createIcons();
};

// ═══════════════════════════════════════════════════════════════
// ── SISTEMA DE PRESTÍGIO ─────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
rpg.canPrestige = function () {
  return this.bossKills >= 3 && this.level >= 50;
};

rpg.doPrestige = function () {
  if (!this.canPrestige()) { showToast(this.lang === "pt" ? "Requer Lvl 50 + 3 bosses." : "Requires Lvl 50 + 3 bosses."); return; }
  if (!confirm(this.lang === "pt"
    ? `Prestígio ${this.prestigeLevel + 1}: reinicia nível/ouro/xp mas ganha +${Math.round((this.prestigeLevel + 1) * 15)}% stats permanentes. Continuar?`
    : `Prestige ${this.prestigeLevel + 1}: resets level/gold/xp but grants +${Math.round((this.prestigeLevel + 1) * 15)}% permanent stats. Continue?`)) return;
  this.prestigeLevel++;
  this.prestigeMult = 1 + this.prestigeLevel * 0.15;
  // Reset progress but keep equipment and bosses
  this.level = 1;
  this.xp = 0;
  this.gold = 0;
  this.potions = 10 + this.prestigeLevel * 5;
  this.kills = 0;
  this.seenMilestones = ["intro"];
  this.introSeen = true;
  this.save();
  this.updateUI();
  this.updateTheme();
  showToast(`🔥 Prestígio ${this.prestigeLevel} — +${Math.round(this.prestigeLevel * 15)}% Stats!`, 5000);
  this.renderPrestige();
};

rpg.renderPrestige = function () {
  const el = document.getElementById("prestige-body");
  if (!el) return;
  const canP = this.canPrestige();
  const nextBonus = Math.round((this.prestigeLevel + 1) * 15);
  el.innerHTML = `
    <div class="bg-zinc-950/80 border border-orange-800/50 rounded-xl p-4 mb-3">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 bg-orange-950 border border-orange-700 rounded-lg flex items-center justify-center"><i data-lucide="flame" class="w-5 h-5 text-orange-400"></i></div>
        <div>
          <p class="font-black text-orange-300 text-sm">Nível de Prestígio: ${this.prestigeLevel}</p>
          <p class="text-[10px] text-orange-600 font-bold">Multiplicador atual: ×${this.prestigeMult.toFixed(2)}</p>
        </div>
      </div>
      <div class="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800 text-xs text-zinc-400 space-y-1">
        <p>✦ Stats permanentes: <span class="text-orange-300 font-bold">+${Math.round(this.prestigeLevel * 15)}%</span></p>
        <p>✦ Próximo prestígio: <span class="text-orange-300 font-bold">+${nextBonus}%</span> (Lvl 50 + 3 bosses)</p>
        <p>✦ Resetado: Nível, XP, Ouro, Abates</p>
        <p>✦ Mantido: Equipamentos, Bosses, Relíquias, Passe</p>
      </div>
    </div>
    <button onclick="rpg.doPrestige()" class="w-full py-3 ${canP ? "bg-gradient-to-r from-orange-700 to-red-700 border border-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.4)] hover:brightness-110" : "bg-zinc-800 border border-zinc-700 opacity-50 cursor-not-allowed"} text-white rounded-xl font-black text-sm uppercase tracking-widest transition flex items-center justify-center gap-2" ${canP ? "" : "disabled"}>
      <i data-lucide="flame" class="w-4 h-4"></i> ${this.lang === "pt" ? `Ascender ao Prestígio ${this.prestigeLevel + 1}` : `Ascend to Prestige ${this.prestigeLevel + 1}`}
    </button>`;
  lucide.createIcons();
};

// ═══════════════════════════════════════════════════════════════
// ── EVENTO DE TEMPO LIMITADO ─────────────────────────────────
// ═══════════════════════════════════════════════════════════════
rpg._events = [
  { id:"ev_wrath",  name:{pt:"⚡ Fúria da Masmorra",    en:"⚡ Dungeon Wrath"},    desc:{pt:"2× ouro por 10 min",      en:"2× gold for 10 min"},     buff:"gold",  mult:2,   dur:600000 },
  { id:"ev_blitz",  name:{pt:"🔥 Blitz de XP",          en:"🔥 XP Blitz"},        desc:{pt:"3× XP por 5 min",         en:"3× XP for 5 min"},        buff:"xp",    mult:3,   dur:300000 },
  { id:"ev_boss",   name:{pt:"💀 Invasão de Guardiões", en:"💀 Guardian Invasion"},desc:{pt:"Bosses com 5× loot",      en:"Bosses with 5× loot"},    buff:"boss",  mult:5,   dur:480000 },
  { id:"ev_potion", name:{pt:"🧪 Chuva de Poções",      en:"🧪 Potion Rain"},      desc:{pt:"Poções dropam 3× mais",   en:"Potions drop 3× more"},   buff:"pot",   mult:3,   dur:420000 },
];

rpg.eventTimer = null;
rpg.eventEndTime = 0;
rpg.activeEvent = null;

rpg.startRandomEvent = function () {
  if (this.eventActive) return;
  const ev = this._events[Math.floor(Math.random() * this._events.length)];
  this.activeEvent = ev;
  this.eventActive = true;
  this.eventKills = 0;
  this.eventEndTime = Date.now() + ev.dur;
  showToast(`🎉 ${ev.name[this.lang]} — ${ev.desc[this.lang]}`, 5000);
  const badge = document.getElementById("event-badge");
  if (badge) { badge.innerText = ev.name[this.lang]; badge.classList.remove("hidden"); }
  this.eventTimer = setTimeout(() => this.endEvent(), ev.dur);
  this.renderEventModal();
};

rpg.endEvent = function () {
  this.eventActive = false;
  this.activeEvent = null;
  clearTimeout(this.eventTimer);
  const badge = document.getElementById("event-badge");
  if (badge) badge.classList.add("hidden");
  showToast(this.lang === "pt" ? "Evento terminado!" : "Event ended!");
};

rpg.tickEvent = function () {
  if (!this.eventActive || !this.activeEvent) return;
  if (Date.now() > this.eventEndTime) { this.endEvent(); return; }
};

rpg.getEventMult = function (type) {
  if (!this.eventActive || !this.activeEvent) return 1;
  return this.activeEvent.buff === type ? this.activeEvent.mult : 1;
};

rpg.renderEventModal = function () {
  const el = document.getElementById("event-body");
  if (!el) return;
  const mins = Math.ceil((this.eventEndTime - Date.now()) / 60000);
  el.innerHTML = this.eventActive
    ? `<div class="bg-amber-950/30 border border-amber-600/50 rounded-xl p-4 text-center">
        <p class="text-2xl font-black text-amber-300 mb-1">${this.activeEvent.name[this.lang]}</p>
        <p class="text-sm text-amber-400 mb-3">${this.activeEvent.desc[this.lang]}</p>
        <p class="text-xs text-zinc-400">⏱ ~${mins} min restantes</p>
       </div>`
    : `<div class="text-center py-6">
        <p class="text-zinc-400 text-sm mb-3">${this.lang === "pt" ? "Nenhum evento ativo." : "No active event."}</p>
        <button onclick="rpg.startRandomEvent(); closeModal('event-modal')" class="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-xl font-black text-sm shadow border border-amber-500 transition">⚡ ${this.lang === "pt" ? "Iniciar Evento Aleatório" : "Start Random Event"}</button>
       </div>`;
  lucide.createIcons();
};

// Apply event mult to killMonster rewards
const _origKillMult = rpg.killMonster;

// ═══════════════════════════════════════════════════════════════
// ── MODO CO-OP (LOCAL / CÓDIGO) ──────────────────────────────
// ═══════════════════════════════════════════════════════════════
rpg.coopActive = false;
rpg.coopPartner = null;

rpg.renderCoop = function () {
  const el = document.getElementById("coop-body");
  if (!el) return;
  el.innerHTML = `
    <div class="space-y-4">
      <div class="bg-zinc-950/80 border border-blue-800/40 rounded-xl p-4">
        <h3 class="text-xs font-black text-blue-300 uppercase tracking-widest mb-2 flex items-center gap-2"><i data-lucide="upload" class="w-3 h-3"></i> Partilhar o meu perfil</h3>
        <p class="text-[10px] text-zinc-500 mb-3">Gera um código e partilha com o teu aliado.</p>
        <button onclick="rpg.coopExportProfile()" class="w-full py-2.5 bg-blue-800 hover:bg-blue-700 border border-blue-600 text-white rounded-lg font-bold text-xs transition flex items-center justify-center gap-2">
          <i data-lucide="copy" class="w-3 h-3"></i> Copiar Código de Aliado
        </button>
      </div>
      <div class="bg-zinc-950/80 border border-emerald-800/40 rounded-xl p-4">
        <h3 class="text-xs font-black text-emerald-300 uppercase tracking-widest mb-2 flex items-center gap-2"><i data-lucide="users" class="w-3 h-3"></i> Carregar aliado</h3>
        <p class="text-[10px] text-zinc-500 mb-3">Cola o código do teu aliado para lutar lado a lado.</p>
        <button onclick="rpg.coopImportPartner()" class="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-white rounded-lg font-bold text-xs transition flex items-center justify-center gap-2">
          <i data-lucide="download" class="w-3 h-3"></i> Carregar Aliado
        </button>
      </div>
      <div id="coop-partner-card" class="hidden"></div>
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3">
        <p class="text-[9px] text-zinc-600 font-bold uppercase tracking-widest text-center">Como funciona o Co-op</p>
        <ul class="text-[10px] text-zinc-500 space-y-1 mt-2">
          <li>✦ O teu aliado partilha o ATK contigo em batalha</li>
          <li>✦ Cada um gere o seu próprio progresso</li>
          <li>✦ O aliado ataca automaticamente a cada turno</li>
          <li>✦ Bónus: +${Math.floor((this.coopPartner?.atkBonus || 0) * 100)}% ATK extra do aliado</li>
        </ul>
      </div>
    </div>`;
  if (this.coopPartner) this._renderCoopCard();
  lucide.createIcons();
};

rpg._renderCoopCard = function () {
  const card = document.getElementById("coop-partner-card");
  if (!card || !this.coopPartner) return;
  const p = this.coopPartner;
  card.classList.remove("hidden");
  card.innerHTML = `
    <div class="bg-zinc-950/80 border border-emerald-600/50 rounded-xl p-4 shadow-[0_0_12px_rgba(52,211,153,0.15)]">
      <p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">✦ Aliado Ativo</p>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-emerald-950 border border-emerald-700 rounded-lg flex items-center justify-center"><i data-lucide="${p.avatar || 'user'}" class="w-5 h-5 text-emerald-400"></i></div>
        <div class="flex-1">
          <p class="font-black text-emerald-200 text-sm">${p.heroName}</p>
          <p class="text-[10px] text-zinc-500">Lvl ${p.level} · ${p.className}</p>
        </div>
        <div class="text-right">
          <p class="text-xs font-black text-red-400">${formatNumber(p.atkBonus * 100)}% ATK</p>
          <p class="text-[9px] text-zinc-600">bónus</p>
        </div>
      </div>
      <button onclick="rpg.removeCoop()" class="mt-3 w-full py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg text-[10px] font-bold transition">Remover Aliado</button>
    </div>`;
  lucide.createIcons();
};

rpg.coopExportProfile = function () {
  const profile = {
    heroName: this.heroName,
    level: this.level,
    className: this.getClass().name[this.lang],
    avatar: this.avatar,
    atkBonus: Math.min(0.5, this.getAtk() / 1e15),
    atk: this.getAtk(),
  };
  try {
    const code = btoa(JSON.stringify(profile));
    navigator.clipboard.writeText(code).then(() => showToast("📋 Código copiado! Partilha com o teu aliado."));
  } catch (e) { showToast("Erro ao copiar."); }
};

rpg.coopImportPartner = function () {
  const code = prompt(this.lang === "pt" ? "Cola o código do aliado:" : "Paste ally code:");
  if (!code) return;
  try {
    const p = JSON.parse(atob(code.trim()));
    if (!p.heroName || !p.level) throw new Error("invalid");
    this.coopPartner = p;
    this.coopActive = true;
    showToast(`⚔ ${p.heroName} juntou-se à batalha!`, 4000);
    this.renderCoop();
    this.save();
  } catch (e) { showToast(this.lang === "pt" ? "Código inválido." : "Invalid code."); }
};

rpg.removeCoop = function () {
  this.coopPartner = null;
  this.coopActive = false;
  showToast(this.lang === "pt" ? "Aliado removido." : "Ally removed.");
  this.renderCoop();
};

// Apply co-op ATK bonus
const _origGetAtk = rpg.getAtk;








// ═══════════════════════════════════════════════════════════════
// ── PvP ASSÍNCRONO (ARENA) ───────────────────────────────────
// ═══════════════════════════════════════════════════════════════
rpg.pvpHistory = JSON.parse(localStorage.getItem("rpg_pvp_history") || "[]");

rpg.renderArena = function () {
  const el = document.getElementById("arena-body");
  if (!el) return;
  const myAtk = this.getAtk();
  const myHp  = this.getMaxHp();

  el.innerHTML = `
    <div class="space-y-4">
      <div class="bg-zinc-950/80 border border-red-800/40 rounded-xl p-4 text-center">
        <p class="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">O meu perfil de Arena</p>
        <p class="text-xl font-black text-white">${this.heroName}</p>
        <p class="text-xs text-zinc-500">Lvl ${this.level} · ${this.getClass().name[this.lang]}</p>
        <div class="flex justify-center gap-4 mt-2">
          <div><p class="text-[10px] text-zinc-500">ATK</p><p class="font-black text-red-400 text-sm">${formatNumber(myAtk)}</p></div>
          <div><p class="text-[10px] text-zinc-500">HP</p><p class="font-black text-blue-400 text-sm">${formatNumber(myHp)}</p></div>
          <div><p class="text-[10px] text-zinc-500">Vitórias</p><p class="font-black text-emerald-400 text-sm">${this.pvpHistory.filter(r=>r.win).length}</p></div>
        </div>
        <button onclick="rpg.pvpExport()" class="mt-3 px-4 py-2 bg-red-800 hover:bg-red-700 border border-red-600 text-white rounded-lg text-xs font-black transition">📋 Copiar Código Arena</button>
      </div>
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4">
        <p class="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">Desafiar um oponente</p>
        <button onclick="rpg.pvpChallenge()" class="w-full py-2.5 bg-red-900 hover:bg-red-800 border border-red-700 text-red-200 rounded-lg font-black text-xs transition">⚔ Colar código e combater</button>
      </div>
      <div id="pvp-history-list"></div>
    </div>`;
  this._renderPvpHistory();
  lucide.createIcons();
};

rpg.pvpExport = function () {
  const profile = {
    heroName: this.heroName,
    level: this.level,
    className: this.getClass().name[this.lang],
    avatar: this.avatar,
    atk: this.getAtk(),
    hp: this.getMaxHp(),
    crit: this.getCritChance(),
    dodge: this.getDodgeChance(),
  };
  try {
    navigator.clipboard.writeText(btoa(JSON.stringify(profile))).then(() => showToast("📋 Código de Arena copiado!"));
  } catch (e) { showToast("Erro."); }
};

rpg.pvpChallenge = function () {
  const code = prompt(this.lang === "pt" ? "Cola o código de Arena do oponente:" : "Paste opponent Arena code:");
  if (!code) return;
  try {
    const opp = JSON.parse(atob(code.trim()));
    if (!opp.heroName || !opp.atk) throw new Error("invalid");
    this._pvpSimulate(opp);
  } catch (e) { showToast(this.lang === "pt" ? "Código inválido." : "Invalid code."); }
};

rpg._pvpSimulate = function (opp) {
  let myHp  = this.getMaxHp();
  let oppHp = opp.hp;
  let myAtk = this.getAtk();
  let round = 0;
  const maxRounds = 100;

  while (myHp > 0 && oppHp > 0 && round < maxRounds) {
    round++;
    // I attack
    let dmg = myAtk;
    if (Math.random() < this.getCritChance()) dmg *= 2;
    if (Math.random() < (opp.dodge || 0)) dmg = 0;
    oppHp -= dmg;
    if (oppHp <= 0) break;
    // Opp attacks
    let odm = opp.atk;
    if (Math.random() < (opp.crit || 0.05)) odm *= 2;
    if (Math.random() < this.getDodgeChance()) odm = 0;
    myHp -= odm;
  }

  const win = myHp > 0;
  const goldReward = win ? Math.floor(this.level * 1000) : Math.floor(this.level * 200);
  if (win) this.gold += goldReward;

  const result = {
    opp: opp.heroName,
    oppLvl: opp.level,
    win,
    rounds: round,
    gold: goldReward,
    ts: Date.now(),
  };
  this.pvpHistory.unshift(result);
  if (this.pvpHistory.length > 10) this.pvpHistory.pop();
  localStorage.setItem("rpg_pvp_history", JSON.stringify(this.pvpHistory));
  this.save();
  this.updateUI();

  showToast(win
    ? `🏆 Vitória vs ${opp.heroName}! +${formatNumber(goldReward)}💰`
    : `💀 Derrota vs ${opp.heroName}... +${formatNumber(goldReward)}💰`,
    5000);

  this.renderArena();
};

rpg._renderPvpHistory = function () {
  const el = document.getElementById("pvp-history-list");
  if (!el || this.pvpHistory.length === 0) { if (el) el.innerHTML = `<p class="text-[10px] text-zinc-600 text-center">Nenhum combate ainda.</p>`; return; }
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Histórico</p>`;
  this.pvpHistory.slice(0, 5).forEach(r => {
    const date = new Date(r.ts).toLocaleDateString("pt-PT", { day:"2-digit", month:"2-digit" });
    el.innerHTML += `
      <div class="flex items-center gap-2 p-2 rounded-lg border ${r.win ? "border-emerald-800/40 bg-emerald-950/20" : "border-red-900/40 bg-red-950/20"} mb-1">
        <span class="text-sm">${r.win ? "🏆" : "💀"}</span>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-zinc-200 truncate">${r.opp} <span class="text-zinc-600 text-[9px]">Lvl ${r.oppLvl}</span></p>
          <p class="text-[9px] text-zinc-500">${r.rounds} rondas · ${date}</p>
        </div>
        <p class="text-[10px] font-bold ${r.win ? "text-emerald-400" : "text-zinc-500"}">+${formatNumber(r.gold)}💰</p>
      </div>`;
  });
};

rpg.init = function () {
  // restore coop partner from save
  const savedCoop = localStorage.getItem("rpg_coop_partner");
  if (savedCoop) { try { this.coopPartner = JSON.parse(savedCoop); this.coopActive = true; } catch(e) {} }
  // generate daily missions on load
  this._genDailyMissions();
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

// ═══════════════════════════════════════════════════════════════
// ── v18.0 — SISTEMA DE RUNAS ─────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.equippedRunes = JSON.parse(localStorage.getItem("rpg_runes") || "[]");
rpg.unlockedRunes = JSON.parse(localStorage.getItem("rpg_unlocked_runes") || "[]");

rpg.RUNES = [
  { id:"r_berserker",   name:{pt:"Berserker",      en:"Berserker"    }, icon:"swords",         color:"text-red-400",    cost:50000,    reqLvl:30,   reqBoss:1,  desc:{pt:"A cada 10% HP perdido, +6% ATK (até +60%)",      en:"Per 10% HP lost, +6% ATK (up to +60%)"        }, effect:"berserker"  },
  { id:"r_storm",       name:{pt:"Tempestade",      en:"Storm"        }, icon:"cloud-lightning",color:"text-blue-400",   cost:150000,   reqLvl:60,   reqBoss:2,  desc:{pt:"Magia tem 20% de chance de custo zero",          en:"Magic has 20% zero-cooldown chance"            }, effect:"storm"      },
  { id:"r_regen",       name:{pt:"Regeneração",     en:"Regeneration" }, icon:"heart-pulse",    color:"text-emerald-400",cost:80000,    reqLvl:40,   reqBoss:1,  desc:{pt:"Recupera 1.5% HP máximo por turno do inimigo",   en:"Recover 1.5% max HP per enemy turn"            }, effect:"regen"      },
  { id:"r_fortune",     name:{pt:"Fortuna",         en:"Fortune"      }, icon:"coins",          color:"text-yellow-400", cost:120000,   reqLvl:50,   reqBoss:2,  desc:{pt:"+40% Ouro ganho, -8% Dano",                     en:"+40% Gold gained, -8% Damage"                  }, effect:"fortune"    },
  { id:"r_echo",        name:{pt:"Eco",             en:"Echo"         }, icon:"waves",          color:"text-violet-400", cost:500000,   reqLvl:100,  reqBoss:3,  desc:{pt:"Supremo aplica efeito 2x seguidas",              en:"Ultimate applies effect twice"                 }, effect:"echo"       },
  { id:"r_mirror",      name:{pt:"Espelho",         en:"Mirror"       }, icon:"scan-eye",       color:"text-cyan-300",   cost:800000,   reqLvl:130,  reqBoss:4,  desc:{pt:"25% de refletir dano mágico de volta",           en:"25% chance to reflect magic damage"            }, effect:"mirror"     },
  { id:"r_vampiric",    name:{pt:"Vampírica",       en:"Vampiric"     }, icon:"droplets",       color:"text-rose-400",   cost:300000,   reqLvl:80,   reqBoss:3,  desc:{pt:"Rouba 15% do dano causado como HP",              en:"Steal 15% of damage dealt as HP"               }, effect:"vampiric"   },
  { id:"r_momentum",    name:{pt:"Momentum",        en:"Momentum"     }, icon:"trending-up",    color:"text-orange-300", cost:2000000,  reqLvl:200,  reqBoss:5,  desc:{pt:"Cada abate +2% ATK (reset ao morrer)",           en:"Each kill +2% ATK (resets on death)"           }, effect:"momentum"   },
  { id:"r_timeloop",    name:{pt:"Loop Temporal",   en:"Time Loop"    }, icon:"refresh-ccw",    color:"text-teal-300",   cost:10000000, reqLvl:400,  reqBoss:7,  desc:{pt:"20% de chance de qualquer skill sem cooldown",   en:"20% chance any skill has zero cooldown"        }, effect:"timeloop"   },
  { id:"r_glass",       name:{pt:"Canhão de Vidro", en:"Glass Cannon" }, icon:"zap",            color:"text-amber-300",  cost:5000000,  reqLvl:350,  reqBoss:6,  desc:{pt:"+80% ATK, -50% HP máximo",                      en:"+80% ATK, -50% max HP"                         }, effect:"glass"      },
  { id:"r_titan",       name:{pt:"Titã",            en:"Titan"        }, icon:"shield-check",   color:"text-stone-300",  cost:8000000,  reqLvl:450,  reqBoss:8,  desc:{pt:"+100% HP máximo, -30% ATK",                     en:"+100% max HP, -30% ATK"                        }, effect:"titan"      },
  { id:"r_omnivore",    name:{pt:"Omnívora",        en:"Omnivore"     }, icon:"infinity",       color:"text-purple-300", cost:50000000, reqLvl:600,  reqBoss:9,  desc:{pt:"+25% HP/ATK/Crit/Esquiva simultâneos",          en:"+25% HP/ATK/Crit/Dodge all at once"            }, effect:"omnivore"   },
];

rpg.getRuneEffect = function(effect) {
  const rune = this.RUNES.find(r => r.effect === effect);
  return rune ? this.equippedRunes.includes(rune.id) : false;
};

rpg.runeKillStack = 0;

rpg.renderRuneModal = function() {
  const el = document.getElementById("rune-body");
  if (!el) return;
  const equipped = this.equippedRunes.slice(0, 3);
  el.innerHTML = `
    <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Slots equipados: ${equipped.length} / 3</p>
    <div class="grid grid-cols-3 gap-2 mb-4">
      ${[0,1,2].map(i => {
        const rid = equipped[i];
        const rune = rid ? this.RUNES.find(r=>r.id===rid) : null;
        return '<div class="flex flex-col items-center gap-1 bg-zinc-950/80 border ' + (rune ? "border-violet-700/60" : "border-zinc-800 border-dashed") + ' rounded-xl p-2 cursor-pointer" onclick="rpg.unequipRune(' + i + ')" title="' + (rune ? "Clica para remover" : "Vazio") + '">' +
          (rune ? '<i data-lucide="' + rune.icon + '" class="w-5 h-5 ' + rune.color + '"></i><p class="text-[8px] font-black text-zinc-300 text-center leading-tight">' + rune.name[this.lang] + '</p>' : '<i data-lucide="plus" class="w-5 h-5 text-zinc-700"></i><p class="text-[8px] text-zinc-700">Vazio</p>') +
          '</div>';
      }).join("")}
    </div>
    <div class="space-y-2">
      ${this.RUNES.map(rune => {
        const owned = this.unlockedRunes.includes(rune.id);
        const isEquipped = this.equippedRunes.includes(rune.id);
        const locked = !owned && (this.level < rune.reqLvl || this.bossKills < rune.reqBoss);
        const canAfford = this.gold >= rune.cost;
        let btn = "";
        if (isEquipped) btn = '<button onclick="rpg.unequipRuneById(\'' + rune.id + '\')" class="px-2 py-1 bg-violet-900/40 border border-violet-700 text-violet-300 rounded-lg text-[9px] font-black">Ativo ✓</button>';
        else if (owned)  btn = '<button onclick="rpg.equipRune(\'' + rune.id + '\')" class="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-[9px] font-black transition">Equipar</button>';
        else if (locked) btn = '<button disabled class="px-2 py-1 bg-zinc-800 text-zinc-600 rounded-lg text-[9px] border border-zinc-700">Lvl ' + rune.reqLvl + '</button>';
        else             btn = '<button onclick="rpg.buyRune(\'' + rune.id + '\')" class="px-2 py-1 ' + (canAfford ? "bg-yellow-600 hover:bg-yellow-500 border border-yellow-500" : "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed") + ' text-white rounded-lg text-[9px] font-black transition">' + formatNumber(rune.cost) + ' 💰</button>';
        return '<div class="flex items-center gap-3 p-2.5 rounded-xl border ' + (isEquipped ? "border-violet-600/70 bg-violet-950/20" : "border-zinc-800 bg-zinc-950/60") + ' ' + (locked && !owned ? "opacity-40 grayscale" : "") + '">' +
          '<div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="' + rune.icon + '" class="w-4 h-4 ' + rune.color + '"></i></div>' +
          '<div class="flex-1 min-w-0"><p class="text-xs font-black text-zinc-200">' + rune.name[this.lang] + '</p><p class="text-[8px] text-zinc-500 leading-tight">' + rune.desc[this.lang] + '</p></div>' +
          btn + '</div>';
      }).join("")}
    </div>`;
  lucide.createIcons();
};

rpg.buyRune = function(id) {
  const rune = this.RUNES.find(r => r.id === id);
  if (!rune || this.unlockedRunes.includes(id)) return;
  if (this.gold < rune.cost) { showToast(t("not_enough_gold")); return; }
  this.gold -= rune.cost;
  this.unlockedRunes.push(id);
  localStorage.setItem("rpg_unlocked_runes", JSON.stringify(this.unlockedRunes));
  this.save();
  showToast("Runa " + rune.name[this.lang] + " desbloqueada!");
  this.renderRuneModal();
  this.updateUI();
};

rpg.equipRune = function(id) {
  if (this.equippedRunes.includes(id)) return;
  if (this.equippedRunes.length >= 3) { showToast("Máximo 3 runas! Remove uma primeiro."); return; }
  this.equippedRunes.push(id);
  localStorage.setItem("rpg_runes", JSON.stringify(this.equippedRunes));
  this.save();
  this.renderRuneModal();
  this.updateUI();
};

rpg.unequipRune = function(slotIdx) {
  if (!this.equippedRunes[slotIdx]) return;
  this.equippedRunes.splice(slotIdx, 1);
  localStorage.setItem("rpg_runes", JSON.stringify(this.equippedRunes));
  this.save();
  this.renderRuneModal();
};

rpg.unequipRuneById = function(id) {
  this.equippedRunes = this.equippedRunes.filter(r => r !== id);
  localStorage.setItem("rpg_runes", JSON.stringify(this.equippedRunes));
  this.save();
  this.renderRuneModal();
};

// Runas: patch getAtk/getMaxHp








































// Rune mirror reflect on magic















// Rune regen on monster turn









// Rune timeloop: 20% zero cooldown








// Rune storm: 20% free magic











// Rune momentum: kill stack





const _runeMomentumDie = rpg.die.bind(rpg);
rpg.die = function() { this.runeKillStack = 0; _runeMomentumDie(); };

// ═══════════════════════════════════════════════════════════════
// ── v18.0 — CONQUISTAS COM BUFFS PASSIVOS ────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.achievementsClaimed = JSON.parse(localStorage.getItem("rpg_achievements") || "[]");
rpg.permCritBonus  = 0; rpg.permDodgeBonus = 0; rpg.permGoldBonus = 0;
rpg.permXpBonus    = 0; rpg.permAllBonus   = 0; rpg.permAtkBonus  = 0;
rpg.shopDiscount   = 0;
rpg.totalGoldEarned= parseInt(localStorage.getItem("rpg_total_gold") || "0");
rpg.bestWave       = parseInt(localStorage.getItem("rpg_best_wave")  || "0");
rpg.dungeonsCleared= parseInt(localStorage.getItem("rpg_dungeons")   || "0");

rpg.ACHIEVEMENTS = [
  { id:"ach_kills_100",    icon:"swords",      color:"text-red-400",    name:{pt:"Primeiro Sangue",       en:"First Blood"         }, cond:s=>s.kills>=100,             reward:{pt:"+1% Crit perm.",    en:"+1% perm. Crit"      }, apply:s=>{s.permCritBonus =(s.permCritBonus ||0)+0.01;} },
  { id:"ach_kills_1k",     icon:"skull",       color:"text-red-600",    name:{pt:"Mil Batalhas",          en:"Thousand Battles"    }, cond:s=>s.kills>=1000,            reward:{pt:"+2% Crit perm.",    en:"+2% perm. Crit"      }, apply:s=>{s.permCritBonus =(s.permCritBonus ||0)+0.02;} },
  { id:"ach_kills_10k",    icon:"skull",       color:"text-rose-400",   name:{pt:"Exterminador",          en:"Exterminator"        }, cond:s=>s.kills>=10000,           reward:{pt:"+5% Crit perm.",    en:"+5% perm. Crit"      }, apply:s=>{s.permCritBonus =(s.permCritBonus ||0)+0.05;} },
  { id:"ach_boss_5",       icon:"crown",       color:"text-yellow-400", name:{pt:"Caçador de Guardiões",  en:"Guardian Hunter"     }, cond:s=>s.bossKills>=5,           reward:{pt:"+10% XP perm.",     en:"+10% perm. XP"       }, apply:s=>{s.permXpBonus   =(s.permXpBonus   ||0)+0.10;} },
  { id:"ach_boss_10",      icon:"crown",       color:"text-amber-300",  name:{pt:"Lenda dos Bosses",      en:"Boss Legend"         }, cond:s=>s.bossKills>=10,          reward:{pt:"+20% Ouro perm.",   en:"+20% perm. Gold"     }, apply:s=>{s.permGoldBonus =(s.permGoldBonus ||0)+0.20;} },
  { id:"ach_boss_15",      icon:"gem",         color:"text-violet-400", name:{pt:"Mestre Absoluto",       en:"Absolute Master"     }, cond:s=>s.bossKills>=15,          reward:{pt:"+5% todos stats",   en:"+5% all stats"       }, apply:s=>{s.permAllBonus  =(s.permAllBonus  ||0)+0.05;} },
  { id:"ach_gold_1m",      icon:"coins",       color:"text-yellow-400", name:{pt:"Capitalista",           en:"Capitalist"          }, cond:s=>s.totalGoldEarned>=1e6,   reward:{pt:"Loja 5% barata",    en:"Shop 5% cheaper"     }, apply:s=>{s.shopDiscount  =(s.shopDiscount  ||0)+0.05;} },
  { id:"ach_prestige_1",   icon:"flame",       color:"text-orange-400", name:{pt:"Renascido",             en:"Reborn"              }, cond:s=>s.prestigeLevel>=1,        reward:{pt:"+15% XP perm.",     en:"+15% perm. XP"       }, apply:s=>{s.permXpBonus   =(s.permXpBonus   ||0)+0.15;} },
  { id:"ach_prestige_5",   icon:"flame",       color:"text-rose-400",   name:{pt:"Fénix de Algoritma",    en:"Algorithm Phoenix"   }, cond:s=>s.prestigeLevel>=5,        reward:{pt:"+30% Ouro perm.",   en:"+30% perm. Gold"     }, apply:s=>{s.permGoldBonus =(s.permGoldBonus ||0)+0.30;} },
  { id:"ach_lvl_100",      icon:"star",        color:"text-blue-400",   name:{pt:"Centurião",             en:"Centurion"           }, cond:s=>s.level>=100,             reward:{pt:"+3% Esquiva perm.", en:"+3% perm. Dodge"     }, apply:s=>{s.permDodgeBonus=(s.permDodgeBonus||0)+0.03;} },
  { id:"ach_lvl_500",      icon:"star",        color:"text-cyan-400",   name:{pt:"Lenda Viva",            en:"Living Legend"       }, cond:s=>s.level>=500,             reward:{pt:"+8% Crit+Esq.",     en:"+8% Crit+Dodge"      }, apply:s=>{s.permCritBonus =(s.permCritBonus ||0)+0.08; s.permDodgeBonus=(s.permDodgeBonus||0)+0.08;} },
  { id:"ach_lvl_1000",     icon:"zap",         color:"text-yellow-300", name:{pt:"Transcendente",         en:"Transcendent"        }, cond:s=>s.level>=1000,            reward:{pt:"+10% todos stats",  en:"+10% all stats"      }, apply:s=>{s.permAllBonus  =(s.permAllBonus  ||0)+0.10;} },
  { id:"ach_wave_10",      icon:"waves",       color:"text-teal-400",   name:{pt:"Surfista do Caos",      en:"Chaos Surfer"        }, cond:s=>s.bestWave>=10,           reward:{pt:"+5% ATK perm.",     en:"+5% perm. ATK"       }, apply:s=>{s.permAtkBonus  =(s.permAtkBonus  ||0)+0.05;} },
  { id:"ach_wave_50",      icon:"waves",       color:"text-teal-300",   name:{pt:"Mestre das Ondas",      en:"Wave Master"         }, cond:s=>s.bestWave>=50,           reward:{pt:"+15% ATK perm.",    en:"+15% perm. ATK"      }, apply:s=>{s.permAtkBonus  =(s.permAtkBonus  ||0)+0.15;} },
  { id:"ach_dungeon_10",   icon:"door-open",   color:"text-emerald-400",name:{pt:"Explorador",            en:"Explorer"            }, cond:s=>s.dungeonsCleared>=10,    reward:{pt:"+10% XP e Ouro",    en:"+10% XP and Gold"    }, apply:s=>{s.permXpBonus=(s.permXpBonus||0)+0.10; s.permGoldBonus=(s.permGoldBonus||0)+0.10;} },
];

rpg.checkAchievements = function() {
  let newUnlock = false;
  this.ACHIEVEMENTS.forEach(ach => {
    if (!this.achievementsClaimed.includes(ach.id) && ach.cond(this)) {
      this.achievementsClaimed.push(ach.id);
      ach.apply(this);
      newUnlock = true;
      setTimeout(() => showToast("🏅 Conquista: " + ach.name[this.lang] + "! " + ach.reward[this.lang], 4000), 500);
    }
  });
  if (newUnlock) { localStorage.setItem("rpg_achievements", JSON.stringify(this.achievementsClaimed)); this.save(); }
};

rpg._applyAchievements = function() {
  this.achievementsClaimed.forEach(id => {
    const ach = this.ACHIEVEMENTS.find(a => a.id === id);
    if (ach) ach.apply(this);
  });
};

rpg.renderAchievements = function() {
  const el = document.getElementById("achievements-body");
  if (!el) return;
  const total = this.ACHIEVEMENTS.length; const done = this.achievementsClaimed.length;
  el.innerHTML = '<div class="flex justify-between items-center mb-3"><p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest">' + done + ' / ' + total + ' Conquistadas</p><div class="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-yellow-600 to-amber-400 rounded-full" style="width:' + Math.floor(done/total*100) + '%"></div></div></div><div class="space-y-2">' +
    this.ACHIEVEMENTS.map(ach => {
      const isDone = this.achievementsClaimed.includes(ach.id);
      return '<div class="flex items-center gap-3 p-2.5 rounded-xl border ' + (isDone ? "border-yellow-700/50 bg-yellow-950/20" : "border-zinc-800 bg-zinc-950/60 opacity-60 grayscale") + '"><div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="' + ach.icon + '" class="w-4 h-4 ' + ach.color + '"></i></div><div class="flex-1 min-w-0"><p class="text-xs font-black text-zinc-200">' + ach.name[this.lang] + '</p><p class="text-[8px] text-yellow-600 leading-tight">🎁 ' + ach.reward[this.lang] + '</p></div>' + (isDone ? '<span class="text-emerald-400 text-lg">✓</span>' : '<span class="text-zinc-700 text-xs">🔒</span>') + '</div>';
    }).join("") + '</div>';
  lucide.createIcons();
};

// Patch getAtk/getCritChance/getDodgeChance para conquistas









// Track gold earned











// ═══════════════════════════════════════════════════════════════
// ── v18.0 — MODO ONDA (WAVE SURVIVAL) ────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.waveNumber = 0;
rpg.waveActive = false;

rpg.startWaveMode = function() {
  this.waveNumber = 1;
  this.waveActive = true;
  closeModal("wave-modal");
  this.openPreBattle(false);
};

rpg.renderWaveModal = function() {
  const el = document.getElementById("wave-body");
  if (!el) return;
  el.innerHTML = '<div class="text-center space-y-4"><div class="bg-zinc-950/80 border border-teal-700/40 rounded-xl p-4"><p class="text-4xl font-black text-teal-300 mb-1">' + this.bestWave + '</p><p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Melhor Onda</p></div><div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-left space-y-2 text-xs text-zinc-400"><p>🌊 <strong class="text-zinc-200">Inimigos ficam mais fortes</strong> a cada onda.</p><p>⚡ <strong class="text-zinc-200">Sem fugir</strong> — sobrevive até morrer.</p><p>🏆 <strong class="text-zinc-200">Recompensas</strong> crescem exponencialmente.</p><p>💥 <strong class="text-zinc-200">A cada 10 ondas</strong> um mini-boss aparece.</p></div><button onclick="rpg.startWaveMode()" class="btn-3d w-full py-3 bg-gradient-to-r from-teal-700 to-teal-600 border border-teal-500 text-white font-black rounded-xl uppercase tracking-wider">🌊 Iniciar Modo Onda</button></div>';
  lucide.createIcons();
};


































// ═══════════════════════════════════════════════════════════════
// ── v18.0 — DUNGEON DIÁRIA ────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.dailyDungeonDate   = localStorage.getItem("rpg_dd_date")  || "";
rpg.dailyDungeonDone   = localStorage.getItem("rpg_dd_done") === "true";
rpg.dailyDungeonFloor  = 0;
rpg.dailyDungeonActive = false;
rpg.DAILY_DUNGEON_FLOORS = 5;

rpg.renderDailyDungeon = function() {
  const el = document.getElementById("dd-body");
  if (!el) return;
  const today = new Date().toDateString();
  const done  = this.dailyDungeonDate === today && this.dailyDungeonDone;
  const seed  = today.split("").reduce((a,b) => a + b.charCodeAt(0), 0);
  const mods  = [
    { id:"elite",    label:{pt:"Monstros Élite (HP x2)",    en:"Elite Monsters (HP x2)"   }, icon:"shield-alert" },
    { id:"haste",    label:{pt:"Inimigos Rápidos (-30% ATB)",en:"Fast Enemies (-30% ATB)"  }, icon:"zap"          },
    { id:"goldRain", label:{pt:"Chuva de Ouro (+200%)",      en:"Gold Rain (+200%)"         }, icon:"coins"        },
    { id:"xpBoost",  label:{pt:"XP Turbinado (+150%)",       en:"Boosted XP (+150%)"        }, icon:"star"         },
    { id:"berserk",  label:{pt:"Berserk (+50% ATK inimigo)", en:"Berserk (+50% enemy ATK)"  }, icon:"swords"       },
  ];
  const tm = [mods[seed % 5], mods[(seed + 2) % 5]];
  this.ddMods = tm.map(m => m.id);
  const goldR = Math.floor(this.level * 500);
  el.innerHTML =
    '<div class="space-y-3">' +
    '<div class="bg-zinc-950/80 border border-emerald-800/40 rounded-xl p-4 text-center">' +
    '<p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Dungeon de Hoje</p>' +
    '<p class="text-2xl font-black text-white">' + this.DAILY_DUNGEON_FLOORS + ' Andares</p>' +
    '<p class="text-xs text-zinc-500 mt-1">' + (done ? "✅ Completa hoje!" : "Andares: " + this.dailyDungeonFloor + " / " + this.DAILY_DUNGEON_FLOORS) + '</p>' +
    '</div>' +
    '<div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3">' +
    '<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Modificadores de Hoje</p>' +
    tm.map(m => '<div class="flex items-center gap-2 mb-1.5"><i data-lucide="' + m.icon + '" class="w-4 h-4 text-emerald-400"></i><p class="text-xs font-bold text-zinc-300">' + m.label[this.lang] + '</p></div>').join("") +
    '</div>' +
    '<div class="bg-zinc-950/80 border border-yellow-800/40 rounded-xl p-3 text-xs text-zinc-400 space-y-1">' +
    '<p>🏆 <strong class="text-yellow-300">Recompensa:</strong> ' + formatNumber(goldR) + ' Ouro + ' + (this.DAILY_DUNGEON_FLOORS*3) + ' Poções</p>' +
    '<p>⚠️ <strong class="text-zinc-300">Reinicia</strong> a cada dia.</p>' +
    '</div>' +
    (done
      ? '<button disabled class="btn-3d w-full py-3 bg-zinc-800 border border-zinc-700 text-zinc-500 font-black rounded-xl uppercase">✅ Já Completaste Hoje</button>'
      : '<button onclick="rpg.startDailyDungeon()" class="btn-3d w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-600 border border-emerald-500 text-white font-black rounded-xl uppercase tracking-wider">🏰 Entrar na Dungeon</button>') +
    '</div>';
  lucide.createIcons();
};

rpg.startDailyDungeon = function() {
  const today = new Date().toDateString();
  if (this.dailyDungeonDate === today && this.dailyDungeonDone) { showToast("Dungeon já completada hoje!"); return; }
  this.dailyDungeonActive = true;
  this.dailyDungeonFloor  = 0;
  this.dailyDungeonDate   = today;
  this.dailyDungeonDone   = false;
  localStorage.setItem("rpg_dd_date", today);
  closeModal("dd-modal");
  showToast("🏰 Dungeon Diária iniciada! " + this.DAILY_DUNGEON_FLOORS + " andares.", 3000);
  this.openPreBattle(false);
};


































// ═══════════════════════════════════════════════════════════════
// ── v18.0 — GRIMÓRIO DE SKILLS PASSIVAS ──────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.grimoire = JSON.parse(localStorage.getItem("rpg_grimoire") || "[]");
rpg.grimoirePhoenix    = false;
rpg.grimoireFuryBoost  = false;
rpg.grimoireLifeSteal  = false;
rpg.grimoireComboMax   = 20;
rpg.grimoireArcaneSurge= false;

rpg.GRIMOIRE_SKILLS = [
  { id:"g_crit_eye",    icon:"eye",           color:"text-red-400",    name:{pt:"Olho Crítico",        en:"Critical Eye"      }, desc:{pt:"+10% chance crítico",           en:"+10% crit chance"          }, cost:20000,    reqBoss:1, apply:s=>{s.permCritBonus =(s.permCritBonus ||0)+0.10;} },
  { id:"g_iron_skin",   icon:"shield",        color:"text-blue-400",   name:{pt:"Pele de Ferro",       en:"Iron Skin"         }, desc:{pt:"+15% HP max permanente",         en:"+15% perm. max HP"         }, cost:35000,    reqBoss:1, apply:s=>{s.permAllBonus  =(s.permAllBonus  ||0)+0.05;} },
  { id:"g_swift",       icon:"wind",          color:"text-cyan-400",   name:{pt:"Passos Rápidos",      en:"Swift Steps"       }, desc:{pt:"+8% esquiva permanente",         en:"+8% perm. dodge"           }, cost:50000,    reqBoss:2, apply:s=>{s.permDodgeBonus=(s.permDodgeBonus||0)+0.08;} },
  { id:"g_scavenger",   icon:"coins",         color:"text-yellow-400", name:{pt:"Saqueador",           en:"Scavenger"         }, desc:{pt:"+25% Ouro de batalhas",          en:"+25% battle Gold"          }, cost:80000,    reqBoss:2, apply:s=>{s.permGoldBonus =(s.permGoldBonus ||0)+0.25;} },
  { id:"g_scholar",     icon:"book-open",     color:"text-purple-400", name:{pt:"Estudioso",           en:"Scholar"           }, desc:{pt:"+25% XP ganho",                  en:"+25% XP gained"            }, cost:80000,    reqBoss:2, apply:s=>{s.permXpBonus   =(s.permXpBonus   ||0)+0.25;} },
  { id:"g_berserker2",  icon:"swords",        color:"text-orange-400", name:{pt:"Frenesi II",          en:"Frenzy II"         }, desc:{pt:"+20% ATK permanente",            en:"+20% perm. ATK"            }, cost:200000,   reqBoss:3, apply:s=>{s.permAtkBonus  =(s.permAtkBonus  ||0)+0.20;} },
  { id:"g_phoenix",     icon:"flame",         color:"text-rose-400",   name:{pt:"Chama da Fénix",      en:"Phoenix Flame"     }, desc:{pt:"Ressuscita 1x por batalha (25% HP)",en:"Revive once/battle (25% HP)"}, cost:500000, reqBoss:4, apply:s=>{s.grimoirePhoenix=true;} },
  { id:"g_rage_passive",icon:"triangle-alert",color:"text-red-500",   name:{pt:"Ira Passiva",         en:"Passive Rage"      }, desc:{pt:"Fúria cresce 50% mais rápido",   en:"Fury charges 50% faster"   }, cost:300000,   reqBoss:4, apply:s=>{s.grimoireFuryBoost=true;} },
  { id:"g_lifesteal2",  icon:"heart",         color:"text-pink-400",   name:{pt:"Roubo de Vida II",    en:"Life Steal II"     }, desc:{pt:"Rouba 8% HP em todo dano",       en:"Steal 8% HP on all damage" }, cost:800000,   reqBoss:5, apply:s=>{s.grimoireLifeSteal=true;} },
  { id:"g_combo_master",icon:"zap",           color:"text-amber-300",  name:{pt:"Mestre do Combo",     en:"Combo Master"      }, desc:{pt:"Combo máximo sobe para 30 hits", en:"Max combo increases to 30" }, cost:1500000,  reqBoss:6, apply:s=>{s.grimoireComboMax=30;} },
  { id:"g_arcane_surge",icon:"sparkles",      color:"text-violet-300", name:{pt:"Maré Arcana",         en:"Arcane Surge"      }, desc:{pt:"Magia causa +50% dano base",     en:"Magic deals +50% base dmg" }, cost:3000000,  reqBoss:7, apply:s=>{s.grimoireArcaneSurge=true;} },
  { id:"g_transcend",   icon:"infinity",      color:"text-white",      name:{pt:"Transcendência",      en:"Transcendence"     }, desc:{pt:"+20% todos stats permanente",    en:"+20% all stats perm."      }, cost:50000000, reqBoss:10,apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.20;} },
];

rpg.renderGrimoire = function() {
  const el = document.getElementById("grimoire-body");
  if (!el) return;
  const done = this.grimoire.length; const total = this.GRIMOIRE_SKILLS.length;
  el.innerHTML = '<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">' + done + ' / ' + total + ' Aprendidas • Ouro: ' + formatNumber(this.gold) + '</p><div class="space-y-2">' +
    this.GRIMOIRE_SKILLS.map(sk => {
      const owned = this.grimoire.includes(sk.id);
      const locked = this.bossKills < sk.reqBoss;
      const canAfford = this.gold >= sk.cost;
      let btn = owned
        ? '<span class="text-emerald-400 font-black text-xs">✓</span>'
        : locked
          ? '<button disabled class="px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-600 rounded-lg text-[9px]">Boss ' + sk.reqBoss + '</button>'
          : '<button onclick="rpg.learnGrimoire(\'' + sk.id + '\')" class="px-2 py-1 ' + (canAfford ? "bg-purple-700 hover:bg-purple-600 border border-purple-500" : "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed") + ' text-white rounded-lg text-[9px] font-black transition">' + formatNumber(sk.cost) + ' 💰</button>';
      return '<div class="flex items-center gap-3 p-2.5 rounded-xl border ' + (owned ? "border-purple-700/50 bg-purple-950/20" : "border-zinc-800 bg-zinc-950/60") + ' ' + (locked && !owned ? "opacity-40 grayscale" : "") + '"><div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="' + sk.icon + '" class="w-4 h-4 ' + sk.color + '"></i></div><div class="flex-1 min-w-0"><p class="text-xs font-black text-zinc-200">' + sk.name[this.lang] + '</p><p class="text-[8px] text-zinc-500 leading-tight">' + sk.desc[this.lang] + '</p></div>' + btn + '</div>';
    }).join("") + '</div>';
  lucide.createIcons();
};

rpg.learnGrimoire = function(id) {
  const sk = this.GRIMOIRE_SKILLS.find(s => s.id === id);
  if (!sk || this.grimoire.includes(id)) return;
  if (this.gold < sk.cost) { showToast(t("not_enough_gold")); return; }
  this.gold -= sk.cost;
  this.grimoire.push(id);
  sk.apply(this);
  localStorage.setItem("rpg_grimoire", JSON.stringify(this.grimoire));
  this.save(); this.updateUI();
  showToast("📖 Aprendeu: " + sk.name[this.lang] + "!", 3000);
  this.renderGrimoire();
};

rpg._applyGrimoire = function() {
  this.grimoire.forEach(id => { const sk = this.GRIMOIRE_SKILLS.find(s => s.id === id); if (sk) sk.apply(this); });
};

// Grimoire patches













const _griConfirm = rpg.confirmBattle.bind(rpg);
rpg.confirmBattle = function() { this._phoenixUsed = false; _griConfirm(); };

// ═══════════════════════════════════════════════════════════════
// ── v18.0 — SISTEMA DE TÍTULOS ───────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.TITLES = [
  { name:{pt:"Novato",               en:"Novice"           }, cond:s=>s.level<10             },
  { name:{pt:"Guerreiro",            en:"Warrior"          }, cond:s=>s.level>=10            },
  { name:{pt:"Herói",                en:"Hero"             }, cond:s=>s.level>=50            },
  { name:{pt:"Campeão",              en:"Champion"         }, cond:s=>s.level>=100           },
  { name:{pt:"Lenda",                en:"Legend"           }, cond:s=>s.level>=500           },
  { name:{pt:"Entidade",             en:"Entity"           }, cond:s=>s.level>=1000          },
  { name:{pt:"Caçador de Deuses",    en:"God Slayer"       }, cond:s=>s.bossKills>=10        },
  { name:{pt:"Senhor do Caos",       en:"Lord of Chaos"    }, cond:s=>s.bossKills>=15        },
  { name:{pt:"Portador do Protocolo",en:"Protocol Bearer"  }, cond:s=>s.bossKills>=18        },
  { name:{pt:"Surfista de Ondas",    en:"Wave Surfer"      }, cond:s=>s.bestWave>=10         },
  { name:{pt:"Mestre das Ondas",     en:"Wave Master"      }, cond:s=>s.bestWave>=50         },
  { name:{pt:"Transcendente",        en:"Transcendent"     }, cond:s=>s.prestigeLevel>=3     },
  { name:{pt:"Eterno",               en:"Eternal"          }, cond:s=>s.prestigeLevel>=10    },
];

rpg.getTitle = function() {
  let best = this.TITLES[0];
  this.TITLES.forEach(tt => { if (tt.cond(this)) best = tt; });
  return best;
};


// ═══════════════════════════════════════════════════════════════
// ── v18.0 — MODO DESAFIO ─────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.activeChallenges = [];
rpg.challengeActive  = false;

rpg.CHALLENGES = [
  { id:"ch_no_heal",  name:{pt:"Sem Cura",       en:"No Healing"   }, icon:"ban",           color:"text-red-400",   desc:{pt:"Não podes usar Curar",        en:"Cannot use Heal"        }, reward:{pt:"+100% Ouro & XP", en:"+100% Gold & XP"  }, goldMult:2.0, xpMult:2.0 },
  { id:"ch_no_def",   name:{pt:"Sem Defesa",     en:"No Defense"   }, icon:"shield-off",    color:"text-orange-400",desc:{pt:"Não podes usar Defender",     en:"Cannot use Defend"      }, reward:{pt:"+80% Ouro & XP",  en:"+80% Gold & XP"   }, goldMult:1.8, xpMult:1.8 },
  { id:"ch_fragile",  name:{pt:"Frágil",         en:"Fragile"      }, icon:"zap-off",       color:"text-yellow-400",desc:{pt:"HP máximo reduzido a 50%",    en:"Max HP reduced to 50%"  }, reward:{pt:"+50% Ouro & XP",  en:"+50% Gold & XP"   }, goldMult:1.5, xpMult:1.5, hpMult:0.5 },
  { id:"ch_blind",    name:{pt:"Às Cegas",       en:"Blindfolded"  }, icon:"eye-off",       color:"text-zinc-400",  desc:{pt:"HP do inimigo escondida",     en:"Enemy HP hidden"        }, reward:{pt:"+30% Ouro & XP",  en:"+30% Gold & XP"   }, goldMult:1.3, xpMult:1.3 },
  { id:"ch_speed",    name:{pt:"Tiro Rápido",    en:"Speed Run"    }, icon:"timer",         color:"text-cyan-400",  desc:{pt:"Inimigos 3x mais rápidos",    en:"Enemies 3x faster ATB"  }, reward:{pt:"+120% Ouro & XP", en:"+120% Gold & XP"  }, goldMult:2.2, xpMult:2.2, speedMult:3 },
  { id:"ch_hardcore", name:{pt:"Hardcore",       en:"Hardcore"     }, icon:"skull",         color:"text-rose-500",  desc:{pt:"Sem Cura + Sem Def + HP/2",   en:"No Heal + No Def + HP/2"}, reward:{pt:"+250% Ouro & XP", en:"+250% Gold & XP"  }, goldMult:3.5, xpMult:3.5, hpMult:0.5 },
];

rpg.getChallengeMultiplier = function() {
  if (!this.activeChallenges.length) return 1;
  return this.activeChallenges.reduce((acc,id) => {
    const ch = this.CHALLENGES.find(c=>c.id===id);
    return acc * (ch ? Math.max(ch.goldMult,ch.xpMult) : 1);
  }, 1);
};

rpg.toggleChallenge = function(id) {
  const idx = this.activeChallenges.indexOf(id);
  if (idx >= 0) this.activeChallenges.splice(idx,1); else this.activeChallenges.push(id);
  this.renderChallengeModal();
};

rpg.renderChallengeModal = function() {
  const el = document.getElementById("challenge-body");
  if (!el) return;
  const active = this.activeChallenges;
  el.innerHTML =
    '<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Combina modificadores para bónus maiores</p>' +
    this.CHALLENGES.map(ch => {
      const on = active.includes(ch.id);
      return '<div class="flex items-center gap-3 p-3 rounded-xl border ' + (on ? "border-rose-600/60 bg-rose-950/20" : "border-zinc-800 bg-zinc-950/60") + ' mb-2 cursor-pointer" onclick="rpg.toggleChallenge(\'' + ch.id + '\')">' +
        '<div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="' + ch.icon + '" class="w-4 h-4 ' + ch.color + '"></i></div>' +
        '<div class="flex-1 min-w-0"><p class="text-xs font-black text-zinc-200">' + ch.name[this.lang] + '</p><p class="text-[8px] text-zinc-500 leading-tight">' + ch.desc[this.lang] + '</p><p class="text-[8px] text-rose-400 font-bold mt-0.5">🎁 ' + ch.reward[this.lang] + '</p></div>' +
        '<div class="w-5 h-5 rounded border-2 ' + (on ? "border-rose-500 bg-rose-500" : "border-zinc-700") + ' flex items-center justify-center flex-shrink-0">' + (on ? '<span class="text-white text-xs font-black">✓</span>' : '') + '</div>' +
        '</div>';
    }).join("") +
    '<div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 mt-2 text-center"><p class="text-[9px] text-zinc-500 uppercase font-black tracking-wider">Bónus Total</p><p class="text-xl font-black text-rose-400">+' + Math.round((this.getChallengeMultiplier()-1)*100) + '% Ouro & XP</p></div>' +
    '<button onclick="rpg.enterChallengeMode()" class="btn-3d w-full mt-3 py-3 bg-gradient-to-r from-rose-800 to-red-700 border border-rose-600 text-white font-black rounded-xl uppercase tracking-wider">⚔ Entrar no Desafio</button>';
  lucide.createIcons();
};

rpg.enterChallengeMode = function() {
  if (!this.activeChallenges.length) { showToast("Seleciona pelo menos um desafio!"); return; }
  this.challengeActive = true;
  closeModal("challenge-modal");
  const mult = this.getChallengeMultiplier();
  showToast("⚔ Desafio ativo! +" + Math.round((mult-1)*100) + "% bónus", 3000);
  this.openPreBattle(false);
};
























// Apply challenge kill bonus











// blind mode — esconder HP do inimigo
const _chUpdateHp = rpg.updateHpBars.bind(rpg);
rpg.updateHpBars = function() {
  _chUpdateHp();
  if (this.challengeActive && this.activeChallenges.includes("ch_blind")) {
    const bar = document.getElementById("monster-hp-bar");
    const txt = document.getElementById("monster-hp-text");
    if (bar) bar.style.width = "100%";
    if (txt) txt.innerText = "??? / ???";
  }
};

// fragile — HP override








// ═══════════════════════════════════════════════════════════════
// ── v18.0 — SAVE / INIT PATCHES ──────────────────────────────
// ═══════════════════════════════════════════════════════════════


































// ═══════════════════════════════════════════════════════════════
// ── v19.0 — ÁRVORE DE TALENTOS ──────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.talentPoints = parseInt(localStorage.getItem("rpg_talent_pts") || "0");
rpg.unlockedTalents = JSON.parse(localStorage.getItem("rpg_talents") || "[]");

// 3 Árvores × 10 Talentos = 30 nós totais
rpg.TALENT_TREES = {
  offense: {
    name: { pt: "Ofensivo 🗡", en: "Offensive 🗡" },
    color: "text-red-400",
    border: "border-red-800/50",
    bg: "bg-red-950/20",
    nodes: [
      { id:"t_o1",  name:{pt:"Lâmina Afiada",    en:"Sharp Blade"    }, desc:{pt:"+8% ATK",                 en:"+8% ATK"                }, cost:1, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+0.08;} },
      { id:"t_o2",  name:{pt:"Olho de Falcão",   en:"Hawk Eye"       }, desc:{pt:"+10% Crit",               en:"+10% Crit"              }, cost:1, req:"t_o1", apply:s=>{s.permCritBonus=(s.permCritBonus||0)+0.10;} },
      { id:"t_o3",  name:{pt:"Golpe Duplo",       en:"Double Strike"  }, desc:{pt:"20% chance de atacar 2x", en:"20% chance attack 2x"   }, cost:2, req:"t_o1", apply:s=>{s.talentDoubleStrike=true;} },
      { id:"t_o4",  name:{pt:"Fúria Acelerada",   en:"Quick Fury"     }, desc:{pt:"Fúria ganha +25% mais",  en:"Fury gains +25% faster" }, cost:1, req:"t_o2", apply:s=>{s.talentFuryBoost=(s.talentFuryBoost||0)+0.25;} },
      { id:"t_o5",  name:{pt:"Crítico Letal",     en:"Lethal Crit"    }, desc:{pt:"Críticos causam 3x dano", en:"Crits deal 3x damage"   }, cost:3, req:"t_o2", apply:s=>{s.talentCritMult=3.0;} },
      { id:"t_o6",  name:{pt:"Perfurar Armadura", en:"Armor Pierce"   }, desc:{pt:"Ignora 30% da def inimiga",en:"Ignore 30% enemy def"  }, cost:2, req:"t_o3", apply:s=>{s.talentArmorPierce=(s.talentArmorPierce||0)+0.30;} },
      { id:"t_o7",  name:{pt:"Berserker Nato",    en:"Born Berserker" }, desc:{pt:"+20% ATK quando HP<50%",  en:"+20% ATK when HP<50%"   }, cost:2, req:"t_o4", apply:s=>{s.talentLowHpAtk=true;} },
      { id:"t_o8",  name:{pt:"Voragem",           en:"Voracity"       }, desc:{pt:"Abates curam 5% HP",      en:"Kills heal 5% HP"       }, cost:2, req:"t_o5", apply:s=>{s.talentKillHeal=true;} },
      { id:"t_o9",  name:{pt:"Supremacia",        en:"Supremacy"      }, desc:{pt:"Supremo causa +100% dano",en:"Ultimate +100% damage"  }, cost:3, req:"t_o6", apply:s=>{s.talentUltimateMult=(s.talentUltimateMult||1)+1.0;} },
      { id:"t_o10", name:{pt:"Extinção",          en:"Extinction"     }, desc:{pt:"+50% ATK permanente",     en:"+50% perm. ATK"         }, cost:4, req:"t_o9", apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+0.50;} },
      // ── Tier 4 ──
      { id:"t_o11", name:{pt:"Golpe Vampírico",   en:"Vamp Strike"    }, desc:{pt:"Ataques roubam 4% HP",    en:"Attacks steal 4% HP"    }, cost:5, req:"t_o10", apply:s=>{s.talentVampStrike=true;} },
      { id:"t_o12", name:{pt:"Frenesi",           en:"Frenzy"         }, desc:{pt:"Combo 5+ dá +30% ATK",    en:"5+ combo gives +30% ATK"}, cost:5, req:"t_o10", apply:s=>{s.talentFrenzy=true;} },
      { id:"t_o13", name:{pt:"Crit em Cascata",   en:"Cascade Crit"   }, desc:{pt:"Críticos encadeiam 30%",  en:"Crits chain 30% chance" }, cost:6, req:"t_o11", apply:s=>{s.talentCascadeCrit=true;} },
      // ── Tier 5 ──
      { id:"t_o14", name:{pt:"Stacks de Boss",    en:"Boss Stacks"    }, desc:{pt:"+15% ATK por boss morto (máx 10)",en:"+15% ATK per boss kill (max 10)"}, cost:7, req:"t_o12", apply:s=>{s.talentBossStacks=true;} },
      { id:"t_o15", name:{pt:"Modo Deus",         en:"God Mode"       }, desc:{pt:"ATK 5x por 1 turno após supremo",en:"ATK 5x for 1 turn after ultimate"}, cost:8, req:"t_o13", apply:s=>{s.talentGodMode=true;} },
    ]
  },
  defense: {
    name: { pt: "Defensivo 🛡", en: "Defensive 🛡" },
    color: "text-blue-400",
    border: "border-blue-800/50",
    bg: "bg-blue-950/20",
    nodes: [
      { id:"t_d1",  name:{pt:"Escudo de Ferro",   en:"Iron Shield"    }, desc:{pt:"+12% HP máximo",          en:"+12% max HP"            }, cost:1, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.06;} },
      { id:"t_d2",  name:{pt:"Esquiva Instintiva",en:"Instinct Dodge" }, desc:{pt:"+8% Esquiva",             en:"+8% Dodge"              }, cost:1, req:"t_d1", apply:s=>{s.permDodgeBonus=(s.permDodgeBonus||0)+0.08;} },
      { id:"t_d3",  name:{pt:"Contra-Ataque",     en:"Counter Attack" }, desc:{pt:"Parry devolve 3x dano",   en:"Parry returns 3x dmg"   }, cost:2, req:"t_d1", apply:s=>{s.talentCounterMult=(s.talentCounterMult||2)+1;} },
      { id:"t_d4",  name:{pt:"Couraça",           en:"Heavy Armor"    }, desc:{pt:"+20% HP máximo",          en:"+20% max HP"            }, cost:2, req:"t_d2", apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.10;} },
      { id:"t_d5",  name:{pt:"Reflexos",          en:"Reflexes"       }, desc:{pt:"+15% Esquiva",            en:"+15% Dodge"             }, cost:2, req:"t_d2", apply:s=>{s.permDodgeBonus=(s.permDodgeBonus||0)+0.15;} },
      { id:"t_d6",  name:{pt:"Absorção",          en:"Absorption"     }, desc:{pt:"Defesa absorve 15% dano",  en:"Defense absorbs 15% dmg"}, cost:2, req:"t_d3", apply:s=>{s.talentDefAbsorb=true;} },
      { id:"t_d7",  name:{pt:"Regeneração Viva",  en:"Living Regen"   }, desc:{pt:"Regen 2% HP por turno",   en:"Regen 2% HP per turn"   }, cost:3, req:"t_d4", apply:s=>{s.talentRegen=true;} },
      { id:"t_d8",  name:{pt:"Escudo Espiritual", en:"Spirit Shield"  }, desc:{pt:"20% ignorar dano letal",  en:"20% ignore lethal hit"  }, cost:3, req:"t_d5", apply:s=>{s.talentSpiritShield=true;} },
      { id:"t_d9",  name:{pt:"Bastião",           en:"Bastion"        }, desc:{pt:"+35% HP máximo",          en:"+35% max HP"            }, cost:3, req:"t_d7", apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.175;} },
      { id:"t_d10", name:{pt:"Invulnerabilidade", en:"Invulnerability"}, desc:{pt:"1x por batalha imunidade 1 hit",en:"1x/battle immune to 1 hit"}, cost:4, req:"t_d8", apply:s=>{s.talentInvulnerability=true;} },
      // ── Tier 4 ──
      { id:"t_d11", name:{pt:"Espinhos",          en:"Thorns"         }, desc:{pt:"Reflete 20% dano recebido", en:"Reflect 20% damage taken"}, cost:5, req:"t_d10", apply:s=>{s.talentThorns=true;} },
      { id:"t_d12", name:{pt:"Regen T4",          en:"Tier4 Regen"    }, desc:{pt:"Regen extra 5% HP/turno",   en:"Extra 5% HP regen/turn"  }, cost:5, req:"t_d10", apply:s=>{s.talentRegenT4=true;} },
      { id:"t_d13", name:{pt:"Armadura Sagrada",  en:"Holy Armor"     }, desc:{pt:"Imune a ataques críticos",  en:"Immune to critical hits" }, cost:6, req:"t_d11", apply:s=>{s.talentHolyArmor=true;} },
      // ── Tier 5 ──
      { id:"t_d14", name:{pt:"Imortal",           en:"Immortal"       }, desc:{pt:"2x imunidade a 1 hit/batalha",en:"2x immunity per battle"}, cost:7, req:"t_d12", apply:s=>{s.talentImmortal=true; s._immortalCharges=2;} },
      { id:"t_d15", name:{pt:"Colosso",           en:"Colossus"       }, desc:{pt:"Regen 10% HP por turno",    en:"Regen 10% HP per turn"   }, cost:8, req:"t_d13", apply:s=>{s.talentColossus=true;} },
    ]
  },
  support: {
    name: { pt: "Suporte ✨", en: "Support ✨" },
    color: "text-emerald-400",
    border: "border-emerald-800/50",
    bg: "bg-emerald-950/20",
    nodes: [
      { id:"t_s1",  name:{pt:"Bolsa Maior",       en:"Big Pouch"      }, desc:{pt:"Curas curam +20% extra",  en:"Heals +20% more"        }, cost:1, apply:s=>{s.talentHealBoost=(s.talentHealBoost||1)+0.20;} },
      { id:"t_s2",  name:{pt:"Saqueador",         en:"Scavenger"      }, desc:{pt:"+20% Ouro de batalhas",   en:"+20% battle Gold"       }, cost:1, req:"t_s1", apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+0.20;} },
      { id:"t_s3",  name:{pt:"Estudioso",         en:"Studious"       }, desc:{pt:"+20% XP ganho",           en:"+20% XP gained"         }, cost:1, req:"t_s1", apply:s=>{s.permXpBonus=(s.permXpBonus||0)+0.20;} },
      { id:"t_s4",  name:{pt:"Elixir Duplo",      en:"Double Elixir"  }, desc:{pt:"Poções curam 70% HP",     en:"Potions heal 70% HP"    }, cost:2, req:"t_s2", apply:s=>{s.talentPotionHeal=0.70;} },
      { id:"t_s5",  name:{pt:"XP Turbinado",      en:"XP Turbo"       }, desc:{pt:"+40% XP ganho",           en:"+40% XP gained"         }, cost:2, req:"t_s3", apply:s=>{s.permXpBonus=(s.permXpBonus||0)+0.40;} },
      { id:"t_s6",  name:{pt:"Fortuna Extrema",   en:"Extreme Fortune"}, desc:{pt:"+50% Ouro",               en:"+50% Gold"              }, cost:2, req:"t_s4", apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+0.50;} },
      { id:"t_s7",  name:{pt:"Cooldown Master",   en:"Cooldown Master"}, desc:{pt:"-25% todos cooldowns",    en:"-25% all cooldowns"     }, cost:2, req:"t_s4", apply:s=>{s.talentCdReduce=(s.talentCdReduce||0)+0.25;} },
      { id:"t_s8",  name:{pt:"Poção Milagrosa",   en:"Miracle Potion" }, desc:{pt:"10% de poção grátis",     en:"10% free potion drop"   }, cost:3, req:"t_s5", apply:s=>{s.talentFreePot=true;} },
      { id:"t_s9",  name:{pt:"Riqueza Infinita",  en:"Infinite Wealth"}, desc:{pt:"+100% Ouro e XP",         en:"+100% Gold and XP"      }, cost:3, req:"t_s7", apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+1.0; s.permXpBonus=(s.permXpBonus||0)+1.0;} },
      { id:"t_s10", name:{pt:"Transcendência",    en:"Transcendence"  }, desc:{pt:"+30% todos stats",        en:"+30% all stats"         }, cost:4, req:"t_s9", apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.30;} },
      // ── Tier 4 ──
      { id:"t_s11", name:{pt:"Mente Ágil",        en:"Agile Mind"     }, desc:{pt:"-40% todos cooldowns",     en:"-40% all cooldowns"      }, cost:5, req:"t_s10", apply:s=>{s.talentCdReduce=(s.talentCdReduce||0)+0.40;} },
      { id:"t_s12", name:{pt:"Alquimista",        en:"Alchemist"      }, desc:{pt:"Poções curam 100% HP",     en:"Potions heal 100% HP"    }, cost:5, req:"t_s10", apply:s=>{s.talentPotionHeal=1.0;} },
      { id:"t_s13", name:{pt:"XP Ascensão",       en:"XP Ascension"   }, desc:{pt:"+100% XP ganho",           en:"+100% XP gained"         }, cost:6, req:"t_s11", apply:s=>{s.permXpBonus=(s.permXpBonus||0)+1.0;} },
      // ── Tier 5 ──
      { id:"t_s14", name:{pt:"Mercador Lendário", en:"Legend Merchant"}, desc:{pt:"+200% Ouro ganho",         en:"+200% Gold earned"       }, cost:7, req:"t_s12", apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+2.0;} },
      { id:"t_s15", name:{pt:"Ascensão",          en:"Ascension"      }, desc:{pt:"XP duplo permanente",      en:"Permanent double XP"     }, cost:8, req:"t_s13", apply:s=>{s.permXpBonus=(s.permXpBonus||0)+1.0;} },
    ]
  }
};

rpg.talentDoubleStrike = false;
rpg.talentFuryBoost    = 0;
rpg.talentCritMult     = 2;   // default crit multiplier
rpg.talentArmorPierce  = 0;
rpg.talentLowHpAtk     = false;
rpg.talentKillHeal     = false;
rpg.talentUltimateMult = 1;
rpg.talentCounterMult  = 2;
rpg.talentDefAbsorb    = false;
rpg.talentRegen        = false;
rpg.talentSpiritShield = false;
rpg.talentInvulnerability = false;
rpg._invulnUsed        = false;
rpg.talentHealBoost    = 1;
rpg.talentPotionHeal   = 0.40;
rpg.talentCdReduce     = 0;
rpg.talentFreePot      = false;
// Tier 4/5 flags
rpg.talentVampStrike   = false;
rpg.talentFrenzy       = false;
rpg.talentCascadeCrit  = false;
rpg.talentBossStacks   = false;
rpg.talentGodMode      = false;
rpg._godModeActive     = false;
rpg.bossKills          = 0;
rpg.talentThorns       = false;
rpg.talentRegenT4      = false;
rpg.talentHolyArmor    = false;
rpg.talentImmortal     = false;
rpg._immortalCharges   = 0;
rpg.talentColossus     = false;

rpg._applyTalents = function() {
  this.talentDoubleStrike = false; this.talentFuryBoost = 0;
  this.talentCritMult = 2; this.talentArmorPierce = 0;
  this.talentLowHpAtk = false; this.talentKillHeal = false;
  this.talentUltimateMult = 1; this.talentCounterMult = 2;
  this.talentDefAbsorb = false; this.talentRegen = false;
  this.talentSpiritShield = false; this.talentInvulnerability = false;
  this.talentHealBoost = 1; this.talentPotionHeal = 0.40;
  this.talentCdReduce = 0; this.talentFreePot = false;
  // Tier 4/5 reset
  this.talentVampStrike = false; this.talentFrenzy = false;
  this.talentCascadeCrit = false; this.talentBossStacks = false;
  this.talentGodMode = false; this._godModeActive = false;
  this.talentThorns = false; this.talentRegenT4 = false;
  this.talentHolyArmor = false; this.talentImmortal = false;
  this._immortalCharges = 0; this.talentColossus = false;
  Object.values(this.TALENT_TREES).forEach(tree => {
    tree.nodes.forEach(node => {
      if (this.unlockedTalents.includes(node.id)) node.apply(this);
    });
  });
};

rpg.resetTalents = function() {
  const total = this.unlockedTalents.reduce((sum, id) => {
    const node = Object.values(this.TALENT_TREES).flatMap(t=>t.nodes).find(n=>n.id===id);
    return sum + (node ? node.cost : 0);
  }, 0);
  this.unlockedTalents = [];
  this.talentPoints += total;
  this._applyTalents();
  localStorage.setItem("rpg_talent_pts", this.talentPoints);
  localStorage.setItem("rpg_talents", "[]");
  this.save();
  showToast("🔄 Talentos resetados! " + total + " pontos devolvidos.", 3000);
  this.renderTalentTree();
};

rpg.unlockTalent = function(id) {
  const node = Object.values(this.TALENT_TREES).flatMap(t=>t.nodes).find(n=>n.id===id);
  if (!node || this.unlockedTalents.includes(id)) return;
  if (node.req && !this.unlockedTalents.includes(node.req)) { showToast("Desbloqueia o talento anterior primeiro!"); return; }
  if (this.talentPoints < node.cost) { showToast("Pontos de talento insuficientes! ("+this.talentPoints+"/"+node.cost+")"); return; }
  this.talentPoints -= node.cost;
  this.unlockedTalents.push(id);
  node.apply(this);
  localStorage.setItem("rpg_talent_pts", this.talentPoints);
  localStorage.setItem("rpg_talents", JSON.stringify(this.unlockedTalents));
  this.save();
  showToast("✨ Talento aprendido: " + node.name[this.lang] + "!", 3000);
  // FIX: setTimeout garante que renderTalentTree roda APÓS o patch do ui-live-sync
  const self = this;
  setTimeout(function() { self.renderTalentTree(); }, 0);
  this.updateUI();
};

rpg.renderTalentTree = function() {
  const el = document.getElementById("talent-body");
  if (!el) return;
  el.innerHTML = `<div class="flex justify-between items-center mb-4 bg-zinc-950/80 border border-zinc-800 rounded-xl p-3">
    <div><p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Pontos Disponíveis</p><p class="text-2xl font-black text-yellow-400">${this.talentPoints} ✨</p></div>
    <div class="text-right">
      <p class="text-[9px] text-zinc-600">+1 ponto por lvl 10</p>
      <p class="text-[9px] text-zinc-600">Total: ${this.unlockedTalents.length} / 45</p>
      <button onclick="if(confirm('Resetar todos os talentos?')) rpg.resetTalents()" class="mt-1 text-[8px] text-zinc-500 hover:text-red-400 transition underline">🔄 Resetar Talentos</button>
    </div>
  </div>` +
  Object.entries(this.TALENT_TREES).map(([key, tree]) => {
    const doneCount = tree.nodes.filter(n => this.unlockedTalents.includes(n.id)).length;
    return `<div class="mb-4">
      <div class="flex items-center gap-2 mb-2">
        <p class="text-xs font-black ${tree.color} uppercase tracking-widest">${tree.name[this.lang]}</p>
        <div class="flex-1 h-px bg-zinc-800"></div>
        <p class="text-[9px] text-zinc-600">${doneCount}/15</p>
      </div>
      <div class="grid grid-cols-2 gap-1.5">` +
      tree.nodes.map(node => {
        const owned = this.unlockedTalents.includes(node.id);
        const canUnlock = (!node.req || this.unlockedTalents.includes(node.req)) && this.talentPoints >= node.cost && !owned;
        const blocked = node.req && !this.unlockedTalents.includes(node.req) && !owned;
        return `<div class="p-2 rounded-xl border ${owned ? tree.border+" "+tree.bg : blocked ? "border-zinc-800/50 bg-zinc-950/30 opacity-40 grayscale" : "border-zinc-800 bg-zinc-950/60"} cursor-pointer" onclick="rpg.unlockTalent('${node.id}')">
          <div class="flex items-center justify-between mb-1">
            <p class="text-[9px] font-black ${owned ? tree.color : "text-zinc-400"} leading-tight">${node.name[this.lang]}</p>
            <span class="text-[8px] font-black ${owned ? "text-emerald-400" : this.talentPoints>=node.cost ? "text-yellow-400" : "text-zinc-600"}">${owned ? "✓" : node.cost+"✨"}</span>
          </div>
          <p class="text-[7px] text-zinc-500 leading-tight">${node.desc[this.lang]}</p>
        </div>`;
      }).join("") + `</div></div>`;
  }).join("");
  // FIX: limitar re-scan ao container, não ao DOM inteiro (~20x mais rápido)
  try { lucide.createIcons({ nodes: [el] }); } catch(e) { lucide.createIcons(); }
};

// Talent: ganhar pontos ao subir de nível













// Talent: double strike
















// Talent: low HP ATK boost (via getAtk patch)








// Talent: kill heal











// Talent: spirit shield (20% ignore lethal hit)

















// Talent: invulnerability

// Talent: heal boost










// Patch getMaxHp for talent potion heal (intercept heal amount)

// CD reduce















// ═══════════════════════════════════════════════════════════════
// ── v19.0 — FORJA & UPGRADE DE ITENS ─────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.forgeUpgrades = JSON.parse(localStorage.getItem("rpg_forge") || "{}"); // {itemId: level}

rpg.getForgeLevel = function(itemId) { return this.forgeUpgrades[itemId] || 0; };
rpg.getForgeBonus = function(itemId) { return 1 + this.getForgeLevel(itemId) * 0.15; };

rpg.forgeItem = function(itemId, type) {
  const lists = { weapon: this.weapons, armor: this.armors };
  const list = lists[type];
  if (!list) { showToast("Apenas armas e armaduras podem ser forjadas."); return; }
  if (!this.inventory.includes(itemId)) { showToast("Item não encontrado no inventário!"); return; }
  const currentLevel = this.getForgeLevel(itemId);
  if (currentLevel >= 10) { showToast("Nível máximo de forja atingido! (+10)"); return; }
  const cost = Math.floor(Math.pow(currentLevel + 1, 2) * 5000 * (1 - (this.shopDiscount||0)));
  if (this.gold < cost) { showToast("Ouro insuficiente! Precisas: " + formatNumber(cost)); return; }
  this.gold -= cost;
  this.forgeUpgrades[itemId] = currentLevel + 1;
  localStorage.setItem("rpg_forge", JSON.stringify(this.forgeUpgrades));
  this.save();
  this.updateUI();
  const item = list.find(i => i.id === itemId);
  showToast("🔨 " + (item ? item.name[this.lang] : itemId) + " forjado para +" + (currentLevel + 1) + "!", 3000);
  this.renderForge();
};

rpg.renderForge = function() {
  const el = document.getElementById("forge-body");
  if (!el) return;
  const forgeItems = [
    ...this.weapons.filter(w => this.inventory.includes(w.id)).map(w => ({...w, type:"weapon"})),
    ...this.armors.filter(a => this.inventory.includes(a.id)).map(a => ({...a, type:"armor"})),
  ];
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Cada +1 adiciona 15% de stats • Máx +10</p>
  <div class="space-y-2">` +
  forgeItems.map(item => {
    const lvl = this.getForgeLevel(item.id);
    const cost = Math.floor(Math.pow(lvl + 1, 2) * 5000 * (1 - (this.shopDiscount||0)));
    const maxed = lvl >= 10;
    const equipped = item.type === "weapon" ? this.eqWeapon === item.id : this.eqArmor === item.id;
    return `<div class="flex items-center gap-3 p-2.5 rounded-xl border ${equipped ? "border-orange-700/50 bg-orange-950/20" : "border-zinc-800 bg-zinc-950/60"}">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0 relative">
        <i data-lucide="${item.icon}" class="w-4 h-4 text-zinc-400"></i>
        ${lvl > 0 ? `<span class="absolute -top-1 -right-1 text-[7px] font-black text-orange-400 bg-zinc-900 px-0.5 rounded">+${lvl}</span>` : ""}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-black text-zinc-200">${item.name[this.lang]} ${lvl > 0 ? '<span class="text-orange-400">+'+lvl+'</span>' : ""}</p>
        <div class="flex gap-1 mt-1">${[...Array(10)].map((_,i) => `<div class="h-1 flex-1 rounded-full ${i < lvl ? "bg-orange-400" : "bg-zinc-800"}"></div>`).join("")}</div>
      </div>
      ${maxed
        ? `<span class="text-amber-400 font-black text-xs">MAX</span>`
        : `<button onclick="rpg.forgeItem('${item.id}','${item.type}')" class="px-2 py-1 ${this.gold >= cost ? "bg-orange-700 hover:bg-orange-600 border border-orange-600" : "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"} text-white rounded-lg text-[9px] font-black transition">🔨 ${formatNumber(cost)}</button>`}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Patch getAtk/getArmor para aplicar forge bonus







const _forgeGetArmor = rpg.getArmor.bind(rpg);
rpg.getArmor = function() {
  const a = _forgeGetArmor();
  const bonus = Math.min(0.95, a.def * this.getForgeBonus(this.eqArmor));
  return { ...a, def: bonus };
};

// ═══════════════════════════════════════════════════════════════
// ── v19.0 — MERCADOR ERRANTE ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.wandererKills   = 0;
rpg.wandererActive  = false;
rpg.wandererOffers  = [];

rpg.WANDERER_ITEMS = [
  { id:"w_shadowblade",  name:{pt:"Lâmina Sombria",    en:"Shadow Blade"    }, icon:"sword",   type:"weapon", desc:{pt:"+35% ATK temporário (60s)",  en:"+35% temp ATK (60s)" }, cost:3000,  apply:s=>{s.tempAtkBoost=(s.tempAtkBoost||0)+0.35; setTimeout(()=>{s.tempAtkBoost=Math.max(0,(s.tempAtkBoost||0)-0.35);},60000);} },
  { id:"w_elixir",       name:{pt:"Elixir Raro",        en:"Rare Elixir"     }, icon:"flask-conical", type:"potion", desc:{pt:"Cura 100% HP + 5 Poções",en:"Full HP + 5 Potions" }, cost:2000,  apply:s=>{s.heroHp=s.getMaxHp(); s.potions+=5;} },
  { id:"w_crystalrune",  name:{pt:"Runa de Cristal",    en:"Crystal Rune"    }, icon:"gem",     type:"rune",   desc:{pt:"+15% Crit por 5 batalhas",   en:"+15% Crit 5 battles" }, cost:5000,  apply:s=>{s.tempCritBoost=(s.tempCritBoost||0)+0.15; s._tempCritBattles=(s._tempCritBattles||0)+5;} },
  { id:"w_golddust",     name:{pt:"Pó de Ouro",         en:"Gold Dust"       }, icon:"coins",   type:"gold",   desc:{pt:"Duplica o próximo reward",   en:"Doubles next reward" }, cost:8000,  apply:s=>{s.nextRewardDouble=true;} },
  { id:"w_scrollspeed",  name:{pt:"Pergaminho Veloz",   en:"Speed Scroll"    }, icon:"scroll",  type:"scroll", desc:{pt:"-50% todos CDs por 3 batalhas",en:"-50% all CDs 3 battles"}, cost:4000, apply:s=>{s.tempCdBoost=0.50; s._tempCdBattles=(s._tempCdBattles||0)+3;} },
  { id:"w_stonelife",    name:{pt:"Pedra de Vida",       en:"Life Stone"      }, icon:"heart",   type:"stone",  desc:{pt:"+30% HP máximo por 10 batalhas",en:"+30% max HP 10 battles"}, cost:6000, apply:s=>{s.tempHpBoost=(s.tempHpBoost||0)+0.30; s._tempHpBattles=(s._tempHpBattles||0)+10;} },
  { id:"w_ancientscroll",name:{pt:"Pergaminho Antigo",  en:"Ancient Scroll"  }, icon:"file-text",type:"scroll", desc:{pt:"+500 Pontos de Talento",     en:"+500 Talent Points"  }, cost:20000, apply:s=>{s.talentPoints=(s.talentPoints||0)+5; localStorage.setItem("rpg_talent_pts",s.talentPoints);} },
  { id:"w_bosstoken",    name:{pt:"Ficha do Boss",       en:"Boss Token"      }, icon:"skull",   type:"token",  desc:{pt:"+50% Ouro no próximo boss",  en:"+50% Gold next boss" }, cost:12000, apply:s=>{s.bossGoldBoost=true;} },
];

rpg.tempAtkBoost  = 0; rpg.tempCritBoost  = 0; rpg.tempCdBoost  = 0; rpg.tempHpBoost = 0;
rpg._tempCritBattles=0; rpg._tempCdBattles=0;  rpg._tempHpBattles=0;
rpg.nextRewardDouble = false; rpg.bossGoldBoost = false;

rpg.trySpawnWanderer = function() {
  this.wandererKills++;
  if (this.wandererKills >= 10 && !this.wandererActive && Math.random() < 0.35) {
    this.wandererKills = 0;
    this.wandererActive = true;
    const shuffled = [...this.WANDERER_ITEMS].sort(() => 0.5 - Math.random());
    this.wandererOffers = shuffled.slice(0, 3);
    showToast("🧙 O Mercador Errante apareceu! Vai ao menu.", 5000);
    const dot = document.getElementById("wanderer-dot");
    if (dot) dot.classList.remove("hidden");
  }
};

rpg.buyWandererItem = function(idx) {
  const item = this.wandererOffers[idx];
  if (!item) return;
  const cost = Math.floor(item.cost * (1 - (this.shopDiscount||0)));
  if (this.gold < cost) { showToast(t("not_enough_gold")); return; }
  this.gold -= cost;
  item.apply(this);
  this.wandererOffers.splice(idx, 1);
  if (this.wandererOffers.length === 0) {
    this.wandererActive = false;
    const dot = document.getElementById("wanderer-dot");
    if (dot) dot.classList.add("hidden");
  }
  this.save(); this.updateUI();
  showToast("🛍 Comprado: " + item.name[this.lang] + "!", 3000);
  this.renderWanderer();
};

rpg.renderWanderer = function() {
  const el = document.getElementById("wanderer-body");
  if (!el) return;
  if (!this.wandererActive) {
    el.innerHTML = `<div class="text-center py-8 space-y-3">
      <p class="text-4xl">🧙</p>
      <p class="text-sm font-bold text-zinc-400">O Mercador ainda não apareceu.</p>
      <p class="text-[10px] text-zinc-600">Aparece aleatoriamente a cada ~10 batalhas.</p>
    </div>`;
    return;
  }
  el.innerHTML = `<div class="space-y-3">
    <div class="bg-zinc-950/80 border border-amber-800/40 rounded-xl p-3 text-center">
      <p class="text-lg">🧙 <span class="font-black text-amber-300">Mercador Errante</span></p>
      <p class="text-[10px] text-zinc-500 mt-1">Oferta por tempo limitado — desaparece após todas as compras</p>
    </div>` +
    this.wandererOffers.map((item, i) => {
      const cost = Math.floor(item.cost * (1 - (this.shopDiscount||0)));
      const canAfford = this.gold >= cost;
      return `<div class="flex items-center gap-3 p-3 rounded-xl border border-amber-800/30 bg-amber-950/10">
        <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${item.icon}" class="w-5 h-5 text-amber-400"></i></div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-black text-zinc-200">${item.name[this.lang]}</p>
          <p class="text-[8px] text-zinc-500 leading-tight">${item.desc[this.lang]}</p>
        </div>
        <button onclick="rpg.buyWandererItem(${i})" class="px-3 py-1.5 ${canAfford ? "bg-amber-700 hover:bg-amber-600 border border-amber-600" : "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"} text-white rounded-lg text-[9px] font-black transition">${formatNumber(cost)} 💰</button>
      </div>`;
    }).join("") + `</div>`;
  lucide.createIcons();
};

// Trigger wanderer on kill










// Apply wanderer temp buffs
























// ═══════════════════════════════════════════════════════════════
// ── v19.0 — EVENTOS DE BATALHA ALEATÓRIOS ────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.BATTLE_EVENTS = [
  { id:"meteor",    name:{pt:"☄ Chuva de Meteoros",  en:"☄ Meteor Shower"   }, prob:0.08, apply:(s)=>{
      const dmg = Math.floor(s.getMaxHp()*0.15);
      s.heroHp = Math.max(1, s.heroHp - dmg);
      if (s.monster) s.monster.hp = Math.max(0, s.monster.hp - Math.floor(s.monster.maxHp*0.20));
      s.showDamage("☄ METEORO!", "dmg-crit");
      s.updateHpBars();
    }
  },
  { id:"blessing",  name:{pt:"✨ Bênção Divina",      en:"✨ Divine Blessing"  }, prob:0.06, apply:(s)=>{
      s.heroHp = s.getMaxHp();
      s.potions += 3;
      s.showDamage("✨ BÊNÇÃO!", "heal");
      s.updateHpBars();
    }
  },
  { id:"curse",     name:{pt:"💜 Maldição do Vazio",  en:"💜 Void Curse"      }, prob:0.07, apply:(s)=>{
      s.skills.atk.timer = true; s.skills.mag.timer = true;
      const btn1 = document.getElementById("btn-atk"); if(btn1) btn1.disabled = true;
      const btn2 = document.getElementById("btn-mag"); if(btn2) btn2.disabled = true;
      setTimeout(()=>{ s.skills.atk.timer=false; s.skills.mag.timer=false;
        const b1=document.getElementById("btn-atk"); if(b1) b1.disabled=false;
        const b2=document.getElementById("btn-mag"); if(b2) b2.disabled=false;
      }, 4000);
      s.showDamage("💜 MALDIÇÃO! (4s)", "dmg-player");
    }
  },
  { id:"goldrain",  name:{pt:"💰 Chuva de Ouro",     en:"💰 Gold Rain"       }, prob:0.05, apply:(s)=>{
      const bonus = Math.floor(s.level * 200);
      s.gold += bonus;
      s.showDamage("💰 +" + formatNumber(bonus) + "!", "heal");
      s.updateUI();
    }
  },
  { id:"portal",    name:{pt:"🌀 Portal Instável",   en:"🌀 Unstable Portal"  }, prob:0.06, apply:(s)=>{
      if (!s.monster) return;
      const typeIndex = Math.min(Math.floor(Math.random()*(s.level/15+1)), s.monsterTypes.length-1);
      const type = s.monsterTypes[Math.floor(Math.random()*(typeIndex+1))];
      const hp = Math.floor(Math.pow(s.level,1.3)*20*type.hpMult*s.diffMult.hp);
      const dmg = Math.floor(Math.pow(s.level,1.1)*5*type.dmgMult*s.diffMult.dmg);
      s.monster = {...s.monster, name:type.name[s.lang], icon:type.icon, color:type.color, maxHp:hp, hp:hp, dmg:dmg, weak:type.weak, res:type.res};
      document.getElementById("monster-sprite-container").innerHTML = `<i data-lucide="${type.icon}"></i>`;
      document.getElementById("monster-sprite-container").className = `sprite-container sprite-idle z-20 ${type.color}`;
      document.getElementById("monster-name").innerText = s.monster.name;
      lucide.createIcons();
      s.updateHpBars();
      s.showDamage("🌀 PORTAL!", "dmg-effective");
    }
  },
  { id:"frenzy",    name:{pt:"🔥 Frenesi do Inimigo", en:"🔥 Enemy Frenzy"    }, prob:0.07, apply:(s)=>{
      if (!s.monster) return;
      s.monster.dmg  = Math.floor(s.monster.dmg  * 1.5);
      s.monster.spd  = Math.max(150, Math.floor(s.monster.spd * 0.7));
      s.showDamage("🔥 FRENESI!", "dmg-warning");
    }
  },
  { id:"xpboom",    name:{pt:"⭐ Explosão de XP",     en:"⭐ XP Explosion"    }, prob:0.05, apply:(s)=>{
      const bonus = Math.floor(s.xpRequired() * 0.25);
      s.xp += bonus;
      s.showDamage("⭐ +" + formatNumber(bonus) + " XP!", "dmg-effective");
    }
  },
];

rpg.checkBattleEvent = function() {
  if (Math.random() > 0.15) return; // 15% chance por batalha
  const candidates = this.BATTLE_EVENTS.filter(e => Math.random() < e.prob * 3);
  if (candidates.length === 0) return;
  const event = candidates[Math.floor(Math.random() * candidates.length)];
  setTimeout(() => {
    if (!this.inCombat || !this.monster) return;
    showToast("⚡ Evento: " + event.name[this.lang] + "!", 3000);
    event.apply(this);
  }, Math.floor(Math.random() * 8000) + 3000);
};

// Trigger battle events on spawn






// ═══════════════════════════════════════════════════════════════
// ── v19.0 — BATALHAS MATEMÁTICAS ─────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.mathBattleActive = false;
rpg.mathQuestion     = null;
rpg.mathBonusActive  = false;

rpg.MATH_TYPES = [
  { gen: (lvl) => { const a=Math.floor(Math.random()*(lvl*2+5)+1), b=Math.floor(Math.random()*(lvl*2+5)+1); return { q:`${a} + ${b}`, a:a+b }; } },
  { gen: (lvl) => { const a=Math.floor(Math.random()*(lvl+3)+3),   b=Math.floor(Math.random()*(a)+1);       return { q:`${a} - ${b}`, a:a-b }; } },
  { gen: (lvl) => { const a=Math.floor(Math.random()*Math.min(lvl,12)+2), b=Math.floor(Math.random()*10+2); return { q:`${a} × ${b}`, a:a*b }; } },
  { gen: (lvl) => { const b=Math.floor(Math.random()*9+2), a=b*Math.floor(Math.random()*10+2);              return { q:`${a} ÷ ${b}`, a:a/b }; } },
];

rpg.generateMathQuestion = function() {
  const tier = Math.min(3, Math.floor(this.level / 50));
  const type = this.MATH_TYPES[Math.floor(Math.random() * (tier + 1))];
  return type.gen(Math.min(this.level, 50));
};

rpg.startMathBattle = function() {
  this.mathBattleActive = true;
  closeModal("math-modal-setup");
  this.openPreBattle(false);
};

rpg.triggerMathQuestion = function() {
  if (!this.mathBattleActive || !this.inCombat) return;
  const q = this.generateMathQuestion();
  this.mathQuestion = q;
  const el = document.getElementById("math-question-box");
  if (!el) return;
  el.classList.remove("hidden");
  document.getElementById("math-q-text").textContent = q.q + " = ?";
  document.getElementById("math-answer-input").value = "";
  document.getElementById("math-answer-input").focus();
  // timeout — se não responder em 8s perde o bónus
  clearTimeout(this._mathTimer);
  this._mathTimer = setTimeout(() => {
    this.mathQuestion = null;
    el.classList.add("hidden");
    this.showDamage("⏰ Tempo!", "dmg-player");
  }, 8000);
};

rpg.submitMathAnswer = function() {
  if (!this.mathQuestion) return;
  const val = parseFloat(document.getElementById("math-answer-input").value);
  const correct = Math.abs(val - this.mathQuestion.a) < 0.01;
  clearTimeout(this._mathTimer);
  document.getElementById("math-question-box").classList.add("hidden");
  this.mathQuestion = null;
  if (correct) {
    this.mathBonusActive = true;
    this.showDamage("✅ CORRETO! +100% DMG", "dmg-effective");
    setTimeout(() => { this.mathBonusActive = false; }, 8000);
    // Aplicar dano bónus imediato
    if (this.monster && this.monster.hp > 0) {
      setTimeout(() => this.dealDamageToMonster(this.getAtk() * 2, "mag", true), 300);
    }
  } else {
    this.showDamage("❌ Errado! -10% HP", "dmg-player");
    this.heroHp = Math.max(1, this.heroHp - Math.floor(this.getMaxHp() * 0.10));
    this.updateHpBars();
  }
};

rpg.renderMathSetup = function() {
  const el = document.getElementById("math-setup-body");
  if (!el) return;
  el.innerHTML = `<div class="space-y-4 text-center">
    <div class="text-5xl">🧮</div>
    <div class="bg-zinc-950/80 border border-cyan-800/40 rounded-xl p-4 text-left space-y-2 text-xs text-zinc-400">
      <p>🔢 <strong class="text-zinc-200">Perguntas matemáticas</strong> aparecem durante batalhas.</p>
      <p>✅ <strong class="text-emerald-300">Resposta certa</strong> → +100% dano por 8 segundos.</p>
      <p>❌ <strong class="text-red-300">Resposta errada</strong> → perde 10% HP.</p>
      <p>⏰ <strong class="text-amber-300">Timeout</strong> (8s) → sem bónus, sem penalidade.</p>
      <p>📈 <strong class="text-zinc-200">Dificuldade</strong> escala com o nível do herói.</p>
    </div>
    <button onclick="rpg.startMathBattle()" class="btn-3d w-full py-3 bg-gradient-to-r from-cyan-700 to-cyan-600 border border-cyan-500 text-white font-black rounded-xl uppercase tracking-wider">🧮 Ativar Modo Matemático</button>
  </div>`;
  lucide.createIcons();
};

// Trigger math question every 5 kills in math mode








// Math bonus doubles damage






// ═══════════════════════════════════════════════════════════════
// ── v19.0 — RELÍQUIAS AMALDIÇOADAS ───────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.CURSED_RELICS = [
  { id:"cr_anchor",   name:{pt:"Âncora do Destino",  en:"Anchor of Fate"  }, icon:"anchor",   color:"text-slate-400", cost:500000,   reqBoss:5,  buff:{pt:"+10x Ouro ganho",         en:"+10x Gold gained"         }, curse:{pt:"-40% velocidade ATB",     en:"-40% ATB speed"          }, goldMult:10, spdPenalty:0.6 },
  { id:"cr_mirror",   name:{pt:"Espelho Maldito",    en:"Cursed Mirror"   }, icon:"scan-line", color:"text-pink-400",  cost:800000,   reqBoss:6,  buff:{pt:"+200% ATK",               en:"+200% ATK"               }, curse:{pt:"30% chance de te atacar", en:"30% self-damage chance"  }, atkBuff:3.0, selfHarm:0.30 },
  { id:"cr_greed",    name:{pt:"Pedra da Ganância",  en:"Greed Stone"     }, icon:"gem",       color:"text-yellow-300",cost:1200000,  reqBoss:7,  buff:{pt:"+20x Ouro & XP",          en:"+20x Gold & XP"          }, curse:{pt:"HP máximo -70%",          en:"Max HP -70%"             }, gainsMult:20, hpPenalty:0.30 },
  { id:"cr_chaos",    name:{pt:"Coração do Caos",    en:"Heart of Chaos"  }, icon:"triangle-alert",color:"text-rose-500",cost:2000000,reqBoss:9,  buff:{pt:"+500% Crit chance",       en:"+500% Crit chance"       }, curse:{pt:"Sem poder defender",      en:"Cannot defend"           }, critBuff:0.5, noDef:true },
  { id:"cr_void_eye", name:{pt:"Olho do Vazio",      en:"Void Eye"        }, icon:"eye",       color:"text-purple-400",cost:5000000,  reqBoss:12, buff:{pt:"+300% todos stats",       en:"+300% all stats"         }, curse:{pt:"Sem poções de cura",      en:"No healing potions"      }, allBuff:3.0, noPotions:true },
];

rpg.equippedCursedRelic = localStorage.getItem("rpg_cursed_relic") || null;
rpg.unlockedCursedRelics = JSON.parse(localStorage.getItem("rpg_cursed_relics") || "[]");

rpg.getCursedRelic = function() {
  return this.equippedCursedRelic ? this.CURSED_RELICS.find(r => r.id === this.equippedCursedRelic) : null;
};

rpg.equipCursedRelic = function(id) {
  this.equippedCursedRelic = this.equippedCursedRelic === id ? null : id;
  localStorage.setItem("rpg_cursed_relic", this.equippedCursedRelic || "");
  this.save(); this.updateUI();
  const relic = this.getCursedRelic();
  if (relic) showToast("💀 Relíquia Amaldiçoada equipada: " + relic.name[this.lang] + "!", 4000);
  else showToast("Relíquia removida.");
  this.renderCursedRelics();
};

rpg.buyCursedRelic = function(id) {
  const r = this.CURSED_RELICS.find(x => x.id === id);
  if (!r || this.unlockedCursedRelics.includes(id)) return;
  if (this.bossKills < r.reqBoss) { showToast("Derrota " + r.reqBoss + " bosses primeiro!"); return; }
  if (this.gold < r.cost) { showToast(t("not_enough_gold")); return; }
  this.gold -= r.cost;
  this.unlockedCursedRelics.push(id);
  localStorage.setItem("rpg_cursed_relics", JSON.stringify(this.unlockedCursedRelics));
  this.save(); this.updateUI();
  showToast("💀 Relíquia Amaldiçoada obtida: " + r.name[this.lang] + "!", 4000);
  this.renderCursedRelics();
};

rpg.renderCursedRelics = function() {
  const el = document.getElementById("cursed-body");
  if (!el) return;
  el.innerHTML = `<p class="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-3 text-center">Poder imenso — com um preço</p>
  <div class="space-y-3">` +
  this.CURSED_RELICS.map(r => {
    const owned = this.unlockedCursedRelics.includes(r.id);
    const equipped = this.equippedCursedRelic === r.id;
    const locked = !owned && this.bossKills < r.reqBoss;
    const canAfford = this.gold >= r.cost;
    let btn = equipped
      ? `<button onclick="rpg.equipCursedRelic('${r.id}')" class="px-2 py-1 bg-rose-900/40 border border-rose-700 text-rose-300 rounded-lg text-[9px] font-black">Ativo 💀</button>`
      : owned
        ? `<button onclick="rpg.equipCursedRelic('${r.id}')" class="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-[9px] font-black">Equipar</button>`
        : locked
          ? `<button disabled class="px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-600 rounded-lg text-[9px]">Boss ${r.reqBoss}</button>`
          : `<button onclick="rpg.buyCursedRelic('${r.id}')" class="px-2 py-1 ${canAfford ? "bg-rose-800 hover:bg-rose-700 border border-rose-700" : "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"} text-white rounded-lg text-[9px] font-black">${formatNumber(r.cost)} 💰</button>`;
    return `<div class="p-3 rounded-xl border ${equipped ? "border-rose-600/60 bg-rose-950/20" : "border-zinc-800 bg-zinc-950/60"} ${locked ? "opacity-40 grayscale" : ""}">
      <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${r.icon}" class="w-4 h-4 ${r.color}"></i></div>
        <div class="flex-1"><p class="text-xs font-black text-zinc-200">${r.name[this.lang]}</p></div>
        ${btn}
      </div>
      <div class="grid grid-cols-2 gap-1.5">
        <div class="bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-1.5"><p class="text-[7px] font-black text-emerald-500 uppercase tracking-widest">Bônus</p><p class="text-[9px] text-emerald-300">${r.buff[this.lang]}</p></div>
        <div class="bg-rose-950/30 border border-rose-800/30 rounded-lg p-1.5"><p class="text-[7px] font-black text-rose-500 uppercase tracking-widest">Maldição</p><p class="text-[9px] text-rose-300">${r.curse[this.lang]}</p></div>
      </div>
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Apply cursed relic effects




























// Self-harm curse












// No defense curse








// Gold mult for cursed relics











// ═══════════════════════════════════════════════════════════════
// ── v19.0 — SISTEMA DE GEMAS ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.equippedGems = JSON.parse(localStorage.getItem("rpg_gems") || "{}"); // {itemId: [gemId, ...]}
rpg.ownedGems    = JSON.parse(localStorage.getItem("rpg_owned_gems") || "[]");

rpg.GEM_TYPES = [
  { id:"gem_atk",    name:{pt:"Gema de Ataque",    en:"Attack Gem"    }, icon:"sword",       color:"text-red-400",    cost:30000,  desc:{pt:"+15% ATK",         en:"+15% ATK"         }, stat:"atk",   val:0.15 },
  { id:"gem_hp",     name:{pt:"Gema de Vida",      en:"Life Gem"      }, icon:"heart",       color:"text-emerald-400",cost:30000,  desc:{pt:"+15% HP",          en:"+15% HP"          }, stat:"hp",    val:0.15 },
  { id:"gem_crit",   name:{pt:"Gema Crítica",      en:"Crit Gem"      }, icon:"target",      color:"text-yellow-400", cost:50000,  desc:{pt:"+8% Crítico",      en:"+8% Crit"         }, stat:"crit",  val:0.08 },
  { id:"gem_dodge",  name:{pt:"Gema de Esquiva",   en:"Dodge Gem"     }, icon:"wind",        color:"text-cyan-400",   cost:50000,  desc:{pt:"+8% Esquiva",      en:"+8% Dodge"        }, stat:"dodge", val:0.08 },
  { id:"gem_gold",   name:{pt:"Gema de Ouro",      en:"Gold Gem"      }, icon:"coins",       color:"text-amber-400",  cost:40000,  desc:{pt:"+30% Ouro",        en:"+30% Gold"        }, stat:"gold",  val:0.30 },
  { id:"gem_xp",     name:{pt:"Gema de Sabedoria", en:"Wisdom Gem"    }, icon:"book-open",   color:"text-purple-400", cost:40000,  desc:{pt:"+30% XP",          en:"+30% XP"          }, stat:"xp",    val:0.30 },
  { id:"gem_fury",   name:{pt:"Gema de Fúria",     en:"Fury Gem"      }, icon:"zap",         color:"text-orange-400", cost:60000,  desc:{pt:"+40% ganho de Fúria",en:"+40% Fury gain" }, stat:"fury",  val:0.40 },
  { id:"gem_void",   name:{pt:"Gema do Vazio",     en:"Void Gem"      }, icon:"circle-dashed",color:"text-violet-400",cost:200000, desc:{pt:"+50% tudo",        en:"+50% everything"  }, stat:"all",   val:0.50 },
];

rpg.getGemBonusFor = function(stat, slotId) {
  const gems = this.equippedGems[slotId] || [];
  let total = 0;
  gems.forEach(gid => {
    const gem = this.GEM_TYPES.find(g => g.id === gid);
    if (gem && (gem.stat === stat || gem.stat === "all")) total += gem.val;
  });
  return total;
};

rpg.renderGemModal = function() {
  const el = document.getElementById("gem-body");
  if (!el) return;
  // Show gem shop + equip slots per item
  const gemmable = [
    ...this.weapons.filter(w => this.inventory.includes(w.id)).slice(0,5).map(w => ({...w, slotType:"weapon"})),
    ...this.armors.filter(a => this.inventory.includes(a.id)).slice(0,5).map(a => ({...a, slotType:"armor"})),
  ];
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Ouro: ${formatNumber(this.gold)}</p>
  <div class="flex items-center gap-2 mb-3"><div class="flex-1 h-px bg-zinc-800"></div><span class="text-[9px] font-black text-violet-400 uppercase tracking-widest">Loja de Gemas</span><div class="flex-1 h-px bg-zinc-800"></div></div>
  <div class="grid grid-cols-2 gap-1.5 mb-4">` +
  this.GEM_TYPES.map(gem => {
    const owned = this.ownedGems.filter(g => g === gem.id).length;
    const canAfford = this.gold >= gem.cost;
    return `<div class="flex items-center gap-2 p-2 rounded-xl border border-zinc-800 bg-zinc-950/60">
      <i data-lucide="${gem.icon}" class="w-4 h-4 ${gem.color} flex-shrink-0"></i>
      <div class="flex-1 min-w-0"><p class="text-[9px] font-black text-zinc-300 truncate">${gem.name[this.lang]}</p><p class="text-[7px] text-zinc-600">${gem.desc[this.lang]} · x${owned}</p></div>
      <button onclick="rpg.buyGem('${gem.id}')" class="px-1.5 py-1 ${canAfford ? "bg-violet-700 hover:bg-violet-600" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"} text-white rounded text-[8px] font-black transition">${formatNumber(gem.cost)}</button>
    </div>`;
  }).join("") + `</div>
  <div class="flex items-center gap-2 mb-3"><div class="flex-1 h-px bg-zinc-800"></div><span class="text-[9px] font-black text-violet-400 uppercase tracking-widest">Encaixar em Itens</span><div class="flex-1 h-px bg-zinc-800"></div></div>` +
  gemmable.map(item => {
    const equippedGems = this.equippedGems[item.id] || [];
    const maxSlots = 2;
    return `<div class="p-2.5 rounded-xl border border-zinc-800 bg-zinc-950/60 mb-2">
      <div class="flex items-center gap-2 mb-2">
        <i data-lucide="${item.icon}" class="w-4 h-4 text-zinc-400"></i>
        <p class="text-xs font-black text-zinc-300 flex-1">${item.name[this.lang]}</p>
        <p class="text-[8px] text-zinc-600">${equippedGems.length}/${maxSlots} slots</p>
      </div>
      <div class="flex gap-1.5 flex-wrap">
        ${equippedGems.map((gid, i) => {
          const gem = this.GEM_TYPES.find(g => g.id === gid);
          return gem ? `<button onclick="rpg.removeGem('${item.id}',${i})" class="px-2 py-1 bg-violet-900/40 border border-violet-700/50 rounded-lg text-[8px] text-violet-300 font-bold">${gem.name[this.lang]} ×</button>` : "";
        }).join("")}
        ${equippedGems.length < maxSlots && this.ownedGems.length > 0 ? `<select onchange="rpg.socketGem('${item.id}', this.value); this.value=''" class="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-[8px] text-zinc-400"><option value="">+ Encaixar gema</option>${[...new Set(this.ownedGems)].map(gid => { const gem=this.GEM_TYPES.find(g=>g.id===gid); return gem ? `<option value="${gid}">${gem.name[this.lang]}</option>` : ""; }).join("")}</select>` : ""}
      </div>
    </div>`;
  }).join("") + ``;
  lucide.createIcons();
};

rpg.buyGem = function(id) {
  const gem = this.GEM_TYPES.find(g => g.id === id);
  if (!gem || this.gold < gem.cost) { showToast(t("not_enough_gold")); return; }
  this.gold -= gem.cost;
  this.ownedGems.push(id);
  localStorage.setItem("rpg_owned_gems", JSON.stringify(this.ownedGems));
  this.save(); this.updateUI();
  showToast("💎 Gema comprada: " + gem.name[this.lang] + "!", 2500);
  this.renderGemModal();
};

rpg.socketGem = function(itemId, gemId) {
  if (!gemId) return;
  const slots = this.equippedGems[itemId] || [];
  if (slots.length >= 2) { showToast("Slots cheios! Remove uma gema primeiro."); return; }
  const idx = this.ownedGems.indexOf(gemId);
  if (idx < 0) { showToast("Gema não encontrada!"); return; }
  this.ownedGems.splice(idx, 1);
  slots.push(gemId);
  this.equippedGems[itemId] = slots;
  localStorage.setItem("rpg_gems", JSON.stringify(this.equippedGems));
  localStorage.setItem("rpg_owned_gems", JSON.stringify(this.ownedGems));
  this.save(); this.updateUI();
  this.renderGemModal();
};

rpg.removeGem = function(itemId, slotIdx) {
  const slots = this.equippedGems[itemId] || [];
  if (slotIdx >= slots.length) return;
  const gid = slots.splice(slotIdx, 1)[0];
  this.ownedGems.push(gid);
  this.equippedGems[itemId] = slots;
  localStorage.setItem("rpg_gems", JSON.stringify(this.equippedGems));
  localStorage.setItem("rpg_owned_gems", JSON.stringify(this.ownedGems));
  this.save(); this.updateUI();
  this.renderGemModal();
};

// Apply gem stats
































// ═══════════════════════════════════════════════════════════════
// ── v19.0 — NOVAS IDEIAS: SISTEMA DE HONRA ───────────────────
// ═══════════════════════════════════════════════════════════════
// Honra: moeda especial ganha em batalhas difíceis e ondas
// Usada na Loja de Honra para cosméticos e bônus únicos

rpg.honor = parseInt(localStorage.getItem("rpg_honor") || "0");

rpg.HONOR_SHOP = [
  { id:"h_title_legend",  name:{pt:"Título: Lenda Negra",  en:"Title: Black Legend"}, icon:"crown",  cost:500,  desc:{pt:"Título cosmético exclusivo",  en:"Exclusive cosmetic title"  } },
  { id:"h_frame_gold",    name:{pt:"Moldura Dourada",      en:"Golden Frame"        }, icon:"frame",  cost:300,  desc:{pt:"Moldura dourada no avatar",   en:"Golden frame on avatar"    } },
  { id:"h_trail_fire",    name:{pt:"Rastro de Fogo",       en:"Fire Trail"          }, icon:"flame",  cost:400,  desc:{pt:"Efeito de fogo nos ataques",  en:"Fire effect on attacks"    } },
  { id:"h_bonus_xp",      name:{pt:"Tomo de Honra",        en:"Honor Tome"          }, icon:"book",   cost:200,  desc:{pt:"+5% XP permanente",          en:"+5% perm. XP"              }, apply:s=>{s.permXpBonus=(s.permXpBonus||0)+0.05;} },
  { id:"h_bonus_gold",    name:{pt:"Cofre de Honra",       en:"Honor Vault"         }, icon:"vault",  cost:200,  desc:{pt:"+5% Ouro permanente",        en:"+5% perm. Gold"            }, apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+0.05;} },
  { id:"h_atk_badge",     name:{pt:"Insígnia do Combate",  en:"Combat Badge"        }, icon:"shield-check", cost:600, desc:{pt:"+10% ATK permanente",   en:"+10% perm. ATK"            }, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+0.10;} },
];

rpg.purchasedHonor = JSON.parse(localStorage.getItem("rpg_honor_shop") || "[]");

rpg.addHonor = function(amount) {
  this.honor = (this.honor || 0) + amount;
  localStorage.setItem("rpg_honor", this.honor);
};

rpg.buyHonorItem = function(id) {
  const item = this.HONOR_SHOP.find(h => h.id === id);
  if (!item || this.purchasedHonor.includes(id)) return;
  if (this.honor < item.cost) { showToast("Honra insuficiente! (" + this.honor + "/" + item.cost + " 🏅)"); return; }
  this.honor -= item.cost;
  this.purchasedHonor.push(id);
  if (item.apply) item.apply(this);
  localStorage.setItem("rpg_honor", this.honor);
  localStorage.setItem("rpg_honor_shop", JSON.stringify(this.purchasedHonor));
  this.save(); this.updateUI();
  showToast("🏅 " + item.name[this.lang] + " adquirido!", 3000);
  this.renderHonorShop();
};

rpg.renderHonorShop = function() {
  const el = document.getElementById("honor-body");
  if (!el) return;
  el.innerHTML = `<div class="flex justify-between items-center mb-4 bg-zinc-950/80 border border-yellow-800/40 rounded-xl p-3">
    <div><p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Honra</p><p class="text-2xl font-black text-yellow-400">${formatNumber(this.honor)} 🏅</p></div>
    <p class="text-[9px] text-zinc-600 text-right">Ganha em batalhas difíceis<br>e no Modo Onda</p>
  </div>
  <div class="space-y-2">` +
  this.HONOR_SHOP.map(item => {
    const owned = this.purchasedHonor.includes(item.id);
    const canAfford = this.honor >= item.cost;
    let btn = owned
      ? `<span class="text-emerald-400 font-black">✓</span>`
      : `<button onclick="rpg.buyHonorItem('${item.id}')" class="px-2 py-1 ${canAfford ? "bg-yellow-700 hover:bg-yellow-600 border border-yellow-600" : "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"} text-white rounded-lg text-[9px] font-black transition">${item.cost} 🏅</button>`;
    return `<div class="flex items-center gap-3 p-2.5 rounded-xl border ${owned ? "border-yellow-700/50 bg-yellow-950/20" : "border-zinc-800 bg-zinc-950/60"}">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${item.icon}" class="w-4 h-4 text-yellow-400"></i></div>
      <div class="flex-1 min-w-0"><p class="text-xs font-black text-zinc-200">${item.name[this.lang]}</p><p class="text-[8px] text-zinc-500 leading-tight">${item.desc[this.lang]}</p></div>
      ${btn}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Ganhar Honra em batalhas difíceis e ondas











// ═══════════════════════════════════════════════════════════════
// ── v19.0 — SAVE/INIT PATCHES ────────────────────────────────
// ═══════════════════════════════════════════════════════════════














































// ═══════════════════════════════════════════════════════════════
// ── v20.0 — MAPA INTERATIVO DE ALGORITMA ─────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.MAP_REGIONS = [
  // ── Tier 1: Início ──
  { id:"r_ruins",    x:50,  y:90, name:{pt:"Ruínas do Despertar",    en:"Ruins of Awakening"},
    reqBoss:0,  reqLvl:1,    color:"#71717a", icon:"⚔",
    desc:{pt:"O ponto de origem. Onde tudo começou.",                  en:"The origin point. Where it all began."},
    theme:"t_ruins", biome:"medieval" },
  { id:"r_swamp",   x:25,  y:75, name:{pt:"Pântano Tóxico",          en:"Toxic Swamp"},
    reqBoss:0,  reqLvl:10,   color:"#16a34a", icon:"🌿",
    desc:{pt:"Veneno no ar. Criaturas adaptaram-se ao caos.",          en:"Poison in the air. Creatures adapted to chaos."},
    theme:"t_swamp", biome:"swamp" },
  { id:"r_forest",  x:70,  y:75, name:{pt:"Floresta Antiga",         en:"Ancient Forest"},
    reqBoss:1,  reqLvl:20,   color:"#15803d", icon:"🌲",
    desc:{pt:"Árvores com séculos de memória digital.",                en:"Trees with centuries of digital memory."},
    theme:"t_forest", biome:"forest" },
  // ── Tier 2: Exploração ──
  { id:"r_cave",    x:18,  y:58, name:{pt:"Caverna do Esquecimento",  en:"Cave of Forgetting"},
    reqBoss:1,  reqLvl:35,   color:"#6d28d9", icon:"🕳",
    desc:{pt:"A RAM corrompida. Ecos de bosses derrotados.",            en:"Corrupted RAM. Echoes of defeated bosses."},
    theme:"t_cave", biome:"cave" },
  { id:"r_desert",  x:82,  y:60, name:{pt:"Deserto de Bits",          en:"Bit Desert"},
    reqBoss:2,  reqLvl:45,   color:"#ca8a04", icon:"🏜",
    desc:{pt:"Areia de dados perdidos. O calor corrói a lógica.",       en:"Sand of lost data. The heat corrodes logic."},
    theme:"t_ruins", biome:"desert" },
  { id:"r_volcano", x:78,  y:45, name:{pt:"Vulcão de Silício",        en:"Silicon Volcano"},
    reqBoss:2,  reqLvl:50,   color:"#dc2626", icon:"🌋",
    desc:{pt:"Magma de dados. O núcleo ferve com equações.",            en:"Data magma. The core boils with equations."},
    theme:"t_volcano", biome:"volcano" },
  { id:"r_tundra",  x:22,  y:45, name:{pt:"Tundra Binária",           en:"Binary Tundra"},
    reqBoss:2,  reqLvl:55,   color:"#38bdf8", icon:"❄",
    desc:{pt:"Gelo de código congelado. Zero absoluto de processamento.",en:"Frozen code ice. Absolute processing zero."},
    theme:"t_underground", biome:"tundra" },
  // ── Tier 3: Perigo ──
  { id:"r_astral",  x:50,  y:35, name:{pt:"Plano Astral",             en:"Astral Plane"},
    reqBoss:3,  reqLvl:80,   color:"#7c3aed", icon:"🌌",
    desc:{pt:"Entre dimensões. A gravidade é opcional.",                en:"Between dimensions. Gravity is optional."},
    theme:"t_astral", biome:"astral" },
  { id:"r_cyber",   x:15,  y:30, name:{pt:"Fenda Digital",            en:"Digital Rift"},
    reqBoss:3,  reqLvl:80,   color:"#0284c7", icon:"💻",
    desc:{pt:"O mundo é uma simulação. As paredes têm código.",         en:"The world is a simulation. Walls have code."},
    theme:"t_underground", biome:"cyber" },
  { id:"r_storm",   x:82,  y:32, name:{pt:"Tempestade Elétrica",      en:"Electric Storm"},
    reqBoss:4,  reqLvl:120,  color:"#eab308", icon:"⚡",
    desc:{pt:"Relâmpagos de dados. Energia pura e caótica.",            en:"Data lightning. Pure chaotic energy."},
    theme:"t_astral", biome:"storm" },
  // ── Tier 4: Endgame ──
  { id:"r_void",    x:42,  y:20, name:{pt:"O Vazio",                  en:"The Void"},
    reqBoss:5,  reqLvl:200,  color:"#18181b", icon:"🌀",
    desc:{pt:"Nada existe aqui. Apenas poder puro.",                    en:"Nothing exists here. Only pure power."},
    theme:"t_void", biome:"void" },
  { id:"r_shadow",  x:68,  y:20, name:{pt:"Dimensão Sombria",         en:"Shadow Dimension"},
    reqBoss:5,  reqLvl:250,  color:"#be123c", icon:"👁",
    desc:{pt:"Onde os dados morrem. A escuridão tem forma.",            en:"Where data dies. The darkness has form."},
    theme:"t_void", biome:"shadow" },
  { id:"r_matrix",  x:55,  y:10, name:{pt:"Realidade Base",           en:"Base Reality"},
    reqBoss:6,  reqLvl:400,  color:"#059669", icon:"🟩",
    desc:{pt:"O código-fonte de tudo. Cada pixel é uma verdade.",       en:"The source code of everything. Each pixel is truth."},
    theme:"t_matrix", biome:"matrix" },
  // ── Tier 5: Lendário ──
  { id:"r_abyss",   x:28,  y:8,  name:{pt:"Abismo Primordial",        en:"Primordial Abyss"},
    reqBoss:8,  reqLvl:700,  color:"#4f46e5", icon:"🕸",
    desc:{pt:"O fundo do universo. Criaturas mais antigas que o tempo.", en:"The bottom of the universe. Creatures older than time."},
    theme:"t_underground", biome:"abyss" },
  { id:"r_quantum", x:55,  y:5,  name:{pt:"Núcleo Quântico",          en:"Quantum Core"},
    reqBoss:14, reqLvl:2500, color:"#7c3aed", icon:"⚛",
    desc:{pt:"A fundação da realidade. Poucos chegam aqui.",            en:"The foundation of reality. Few reach this place."},
    theme:"t_quantum", biome:"quantum" },
  { id:"r_neural",  x:78,  y:8,  name:{pt:"Rede Neural",              en:"Neural Network"},
    reqBoss:15, reqLvl:3000, color:"#00e5ff", icon:"🧠",
    desc:{pt:"A consciência digital de Algoritma. Pura informação.",    en:"Algoritma's digital consciousness. Pure information."},
    theme:"t_neural", biome:"neural" },
  { id:"r_end",     x:50,  y:14, name:{pt:"O Fim de Tudo",            en:"The End of All"},
    reqBoss:16, reqLvl:3200, color:"#be123c", icon:"∞",
    desc:{pt:"Além do cosmos. O Protocolo espera.",                     en:"Beyond the cosmos. The Protocol awaits."},
    theme:"t_end", biome:"end" },
];

rpg.mapDiscovered = JSON.parse(localStorage.getItem("rpg_map") || "[]");
rpg.currentRegion = localStorage.getItem("rpg_current_region") || "r_ruins";

rpg.discoverRegion = function(id) {
  if (!this.mapDiscovered.includes(id)) {
    this.mapDiscovered.push(id);
    localStorage.setItem("rpg_map", JSON.stringify(this.mapDiscovered));
    const region = this.MAP_REGIONS.find(r => r.id === id);
    if (region) showToast("🗺 Região descoberta: " + region.name[this.lang] + "!", 3000);
  }
};

rpg.travelToRegion = function(regionId) {
  const region = this.MAP_REGIONS.find(r => r.id === regionId);
  if (!region) return;
  if (this.level < region.reqLvl)  { showToast("Precisas de Lvl " + region.reqLvl + "!"); return; }
  if (this.bossKills < region.reqBoss) { showToast("Derrota " + region.reqBoss + " bosses primeiro!"); return; }
  this.currentRegion = regionId;
  this.discoverRegion(regionId);
  localStorage.setItem("rpg_current_region", regionId);
  if (region.theme && this.inventory.includes(region.theme)) {
    this.eqTheme = region.theme;
    this.updateTheme();
  }
  this.save();
  showToast("🗺 Viajaste para: " + region.name[this.lang] + "!", 2500);
  closeModal("map-modal");
  this.renderMap();
};

rpg.renderMap = function() {
  const el = document.getElementById("map-body");
  if (!el) return;
  const current = this.MAP_REGIONS.find(r => r.id === this.currentRegion) || this.MAP_REGIONS[0];

  // Connections between regions
  const connections = [
    ["r_ruins","r_swamp"],   ["r_ruins","r_forest"],
    ["r_swamp","r_cave"],    ["r_swamp","r_tundra"],
    ["r_forest","r_desert"], ["r_forest","r_volcano"],
    ["r_cave","r_tundra"],   ["r_cave","r_cyber"],
    ["r_desert","r_volcano"],["r_desert","r_storm"],
    ["r_volcano","r_astral"],["r_tundra","r_astral"],
    ["r_astral","r_void"],   ["r_astral","r_shadow"],
    ["r_cyber","r_void"],    ["r_storm","r_shadow"],
    ["r_void","r_matrix"],   ["r_shadow","r_matrix"],
    ["r_void","r_abyss"],    ["r_matrix","r_quantum"],
    ["r_abyss","r_quantum"], ["r_quantum","r_neural"],
    ["r_quantum","r_end"],   ["r_neural","r_end"],
  ];

  const W = 300, H = 260;
  const toSvg = (r) => ({ cx: r.x * W/100, cy: H - (r.y * H/100) });

  const svgLines = connections.map(([a,b]) => {
    const ra = this.MAP_REGIONS.find(r=>r.id===a);
    const rb = this.MAP_REGIONS.find(r=>r.id===b);
    if (!ra||!rb) return "";
    const pa = toSvg(ra), pb = toSvg(rb);
    const aUnlocked = this.level>=ra.reqLvl && this.bossKills>=ra.reqBoss;
    const bUnlocked = this.level>=rb.reqLvl && this.bossKills>=rb.reqBoss;
    const active = aUnlocked && bUnlocked;
    return `<line x1="${pa.cx.toFixed(1)}" y1="${pa.cy.toFixed(1)}" x2="${pb.cx.toFixed(1)}" y2="${pb.cy.toFixed(1)}"
      stroke="${active?"#3f3f46":"#1c1c1e"}" stroke-width="${active?1.2:0.8}"
      stroke-dasharray="${active?"5 3":"3 4"}" opacity="${active?0.7:0.25}"/>`;
  }).join("");

  const svgNodes = this.MAP_REGIONS.map(region => {
    const unlocked = this.level>=region.reqLvl && this.bossKills>=region.reqBoss;
    const isCurrent = this.currentRegion===region.id;
    const discovered = this.mapDiscovered.includes(region.id);
    const {cx,cy} = toSvg(region);
    const r = isCurrent ? 11 : 8;
    return `<g class="cursor-pointer" onclick="rpg.travelToRegion('${region.id}')">
      ${unlocked ? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r+5}" fill="${region.color}18"/>` : ""}
      <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}"
        fill="${unlocked ? region.color+"cc" : "#27272a"}"
        stroke="${isCurrent?"#fff":unlocked?region.color:"#3f3f46"}"
        stroke-width="${isCurrent?2.5:1.2}"
        opacity="${unlocked?1:0.35}"/>
      ${isCurrent ? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r+9}" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>` : ""}
      <text x="${cx.toFixed(1)}" y="${(cy+3.5).toFixed(1)}" text-anchor="middle" font-size="${isCurrent?9:7}" fill="white" opacity="${unlocked?1:0.3}">${region.icon}</text>
      <text x="${cx.toFixed(1)}" y="${(cy+r+11).toFixed(1)}" text-anchor="middle" font-size="5.5" fill="${unlocked?"#d4d4d8":"#52525b"}" font-weight="bold">${region.name[this.lang].split(" ")[0]}</text>
    </g>`;
  }).join("");

  // Tiers para lista
  const tiers = [
    { label:"Tier I — Início",    color:"text-zinc-400",  ids:["r_ruins","r_swamp","r_forest"] },
    { label:"Tier II — Exploração",color:"text-green-400", ids:["r_cave","r_desert","r_volcano","r_tundra"] },
    { label:"Tier III — Perigo",  color:"text-orange-400",ids:["r_astral","r_cyber","r_storm"] },
    { label:"Tier IV — Endgame",  color:"text-red-400",   ids:["r_void","r_shadow","r_matrix"] },
    { label:"Tier V — Lendário",  color:"text-violet-400",ids:["r_abyss","r_quantum","r_neural","r_end"] },
  ];

  const listHtml = tiers.map(tier => {
    const regions = tier.ids.map(id => this.MAP_REGIONS.find(r=>r.id===id)).filter(Boolean);
    return `<div class="mb-2">
      <p class="text-[8px] font-black ${tier.color} uppercase tracking-widest mb-1 px-1">${tier.label}</p>
      <div class="grid grid-cols-2 gap-1">
        ${regions.map(region => {
          const unlocked = this.level>=region.reqLvl && this.bossKills>=region.reqBoss;
          const isCurrent = this.currentRegion===region.id;
          return `<button onclick="rpg.travelToRegion('${region.id}')"
            class="text-left p-1.5 rounded-lg border ${isCurrent?"border-white/40 bg-white/8":"unlocked"?"border-zinc-800 bg-zinc-950/60 hover:border-zinc-600":"border-zinc-800/20 bg-zinc-950/20 opacity-35 cursor-not-allowed"} transition-all"
            ${unlocked?"":"disabled"}>
            <p class="text-[9px] font-black ${unlocked?"text-zinc-200":"text-zinc-600"} leading-tight truncate">${region.icon} ${region.name[this.lang]}</p>
            <p class="text-[7px] text-zinc-600 mt-0.5">Lvl ${region.reqLvl} · ${region.reqBoss} boss${region.reqBoss!==1?"es":""}</p>
            ${isCurrent?`<span class="text-[6px] text-cyan-400 font-black uppercase">● atual</span>`:""}
          </button>`;
        }).join("")}
      </div>
    </div>`;
  }).join("");

  el.innerHTML = `
    <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-2.5 mb-2.5 flex items-center gap-2.5">
      <span class="text-2xl">${current.icon}</span>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-black text-zinc-200 truncate">${current.name[this.lang]}</p>
        <p class="text-[9px] text-zinc-500 leading-tight">${current.desc[this.lang]}</p>
      </div>
      <div class="text-right shrink-0">
        <p class="text-[8px] text-zinc-600">${this.mapDiscovered.length}/${this.MAP_REGIONS.length}</p>
        <p class="text-[7px] text-zinc-700 uppercase">explorado</p>
      </div>
    </div>
    <div class="bg-zinc-950/90 border border-zinc-800 rounded-xl overflow-hidden mb-2.5">
      <svg viewBox="0 0 300 260" width="100%" height="210" style="background:radial-gradient(ellipse at 50% 110%,#1c1917 0%,#09090b 60%)">
        <defs>
          <filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        ${svgLines}
        <g filter="url(#glow2)">${svgNodes}</g>
      </svg>
    </div>
    <div class="max-h-52 overflow-y-auto hide-scrollbar pr-0.5">${listHtml}</div>`;

  lucide.createIcons();
};

// Auto-discover regions based on progress

// ═══════════════════════════════════════════════════════════════
// ── v20.0 — ESCOLHAS NARRATIVAS + NPCs ───────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.narrativeChoices = JSON.parse(localStorage.getItem("rpg_narrative") || "{}");
// key: choiceId → chosen option id

rpg.NARRATIVE_CHOICES = [
  {
    id: "nc_first_boss",
    triggerBoss: 1,
    scene: {
      pt: "Depois de derrotares o Lorde do Caos, encontras algo inesperado: um fragmento da Matriz original, pulsando fracamente. O que fazes?",
      en: "After defeating the Lord of Chaos, you find something unexpected: a fragment of the original Matrix, faintly pulsing. What do you do?"
    },
    options: [
      {
        id: "absorb", icon: "zap", color: "text-amber-400",
        label: { pt: "Absorves o Fragmento", en: "Absorb the Fragment" },
        desc:  { pt: "Podes sentir o poder fluir. Mas algo muda em ti.", en: "You feel power flowing. But something changes in you." },
        effect: { pt: "+20% ATK permanente. Os bosses reconhecem-te.", en: "+20% perm. ATK. Bosses recognize you." },
        apply: s => { s.permAtkBonus = (s.permAtkBonus||0) + 0.20; }
      },
      {
        id: "destroy", icon: "flame", color: "text-red-400",
        label: { pt: "Destrues o Fragmento", en: "Destroy the Fragment" },
        desc:  { pt: "Explode em luz dourada. A Lógica agradece.", en: "It explodes in golden light. Logic is grateful." },
        effect: { pt: "+30% XP permanente. A Lógica abençoa a tua jornada.", en: "+30% perm. XP. Logic blesses your journey." },
        apply: s => { s.permXpBonus = (s.permXpBonus||0) + 0.30; }
      },
      {
        id: "protect", icon: "shield", color: "text-blue-400",
        label: { pt: "Guardas o Fragmento", en: "Protect the Fragment" },
        desc:  { pt: "Carregas o peso da Matriz contigo. Dá força.", en: "You carry the Matrix's weight. It gives strength." },
        effect: { pt: "+25% HP permanente. O Fragmento protege-te.", en: "+25% perm. HP. The Fragment protects you." },
        apply: s => { s.permAllBonus = (s.permAllBonus||0) + 0.125; }
      }
    ]
  },
  {
    id: "nc_act3",
    triggerBoss: 3,
    scene: {
      pt: "A Entidade Absoluta cai. Nas suas cinzas encontras uma mensagem: 'Herói — o verdadeiro perigo ainda está por vir. Escolhe o teu caminho.'",
      en: "The Absolute Entity falls. In its ashes you find a message: 'Hero — the true danger is yet to come. Choose your path.'"
    },
    options: [
      {
        id: "path_power", icon: "swords", color: "text-rose-400",
        label: { pt: "Caminho do Poder", en: "Path of Power" },
        desc:  { pt: "Procuras força acima de tudo. O universo treme.", en: "You seek strength above all. The universe trembles." },
        effect: { pt: "+30% ATK e Crit permanentes.", en: "+30% perm. ATK and Crit." },
        apply: s => { s.permAtkBonus=(s.permAtkBonus||0)+0.30; s.permCritBonus=(s.permCritBonus||0)+0.10; }
      },
      {
        id: "path_wisdom", icon: "book-open", color: "text-violet-400",
        label: { pt: "Caminho da Sabedoria", en: "Path of Wisdom" },
        desc:  { pt: "Conhecimento é poder. O universo revela segredos.", en: "Knowledge is power. The universe reveals secrets." },
        effect: { pt: "+50% XP e Ouro. Fragmentos de Lore extras.", en: "+50% XP and Gold. Extra Lore Fragments." },
        apply: s => { s.permXpBonus=(s.permXpBonus||0)+0.50; s.permGoldBonus=(s.permGoldBonus||0)+0.50; }
      },
      {
        id: "path_balance", icon: "scale", color: "text-emerald-400",
        label: { pt: "Caminho do Equilíbrio", en: "Path of Balance" },
        desc:  { pt: "Nem poder, nem sabedoria. A harmonia é força.", en: "Neither power nor wisdom. Harmony is strength." },
        effect: { pt: "+15% em todos os stats.", en: "+15% to all stats." },
        apply: s => { s.permAllBonus=(s.permAllBonus||0)+0.15; }
      }
    ]
  },
  {
    id: "nc_quantum",
    triggerBoss: 14,
    scene: {
      pt: "O Núcleo Quântico colapsa. Na última fração de segundo, percebes a verdade: tu és parte do código de Algoritma. Aceitas a tua natureza?",
      en: "The Quantum Core collapses. In the last fraction of a second, you realize the truth: you are part of Algoritma's code. Do you accept your nature?"
    },
    options: [
      {
        id: "accept", icon: "atom", color: "text-violet-400",
        label: { pt: "Aceitas o Código", en: "Accept the Code" },
        desc:  { pt: "Tu és o universo. O universo és tu.", en: "You are the universe. The universe is you." },
        effect: { pt: "+100% todos stats. Título: Código Vivo.", en: "+100% all stats. Title: Living Code." },
        apply: s => { s.permAllBonus=(s.permAllBonus||0)+1.0; }
      },
      {
        id: "reject", icon: "x-circle", color: "text-rose-400",
        label: { pt: "Rejeitas o Código", en: "Reject the Code" },
        desc:  { pt: "Escolhes ser mais do que código. A liberdade tem um custo.", en: "You choose to be more than code. Freedom has a cost." },
        effect: { pt: "+200% ATK. -30% HP. Título: O Livre.", en: "+200% ATK. -30% HP. Title: The Free." },
        apply: s => { s.permAtkBonus=(s.permAtkBonus||0)+2.0; }
      }
    ]
  }
];

rpg.pendingNarrativeChoice = null;

rpg.checkNarrativeChoice = function() {
  const choice = this.NARRATIVE_CHOICES.find(c =>
    !this.narrativeChoices[c.id] && this.bossKills >= c.triggerBoss
  );
  if (choice) {
    this.pendingNarrativeChoice = choice;
    setTimeout(() => this.showNarrativeChoice(), 1500);
  }
};

rpg.showNarrativeChoice = function() {
  const choice = this.pendingNarrativeChoice;
  if (!choice) return;
  const modal = document.getElementById("narrative-modal");
  const scene = document.getElementById("narrative-scene");
  const options = document.getElementById("narrative-options");
  if (!modal || !scene || !options) return;
  scene.textContent = choice.scene[this.lang];
  options.innerHTML = choice.options.map((opt, i) =>
    `<button onclick="rpg.makeNarrativeChoice('${choice.id}', ${i})"
      class="w-full p-4 rounded-xl border border-zinc-700 bg-zinc-900/80 hover:border-zinc-500 hover:bg-zinc-800/80 transition-all text-left group">
      <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-zinc-800 rounded-lg border border-zinc-700 flex-shrink-0 group-hover:border-zinc-500 transition">
          <i data-lucide="${opt.icon}" class="w-4 h-4 ${opt.color}"></i>
        </div>
        <p class="font-black text-zinc-200 text-sm">${opt.label[this.lang]}</p>
      </div>
      <p class="text-[10px] text-zinc-500 italic mb-1 pl-11">"${opt.desc[this.lang]}"</p>
      <p class="text-[9px] text-zinc-400 font-bold pl-11">✨ ${opt.effect[this.lang]}</p>
    </button>`
  ).join("");
  modal.classList.add("active");
  lucide.createIcons();
};

rpg.makeNarrativeChoice = function(choiceId, optionIdx) {
  const choice = this.NARRATIVE_CHOICES.find(c => c.id === choiceId);
  if (!choice) return;
  const opt = choice.options[optionIdx];
  this.narrativeChoices[choiceId] = opt.id;
  opt.apply(this);
  localStorage.setItem("rpg_narrative", JSON.stringify(this.narrativeChoices));
  this.save();
  this.updateUI();
  document.getElementById("narrative-modal").classList.remove("active");
  this.pendingNarrativeChoice = null;
  setTimeout(() => showToast("📖 " + opt.label[this.lang] + "! " + opt.effect[this.lang], 5000), 300);
};

rpg.renderNarrativeHistory = function() {
  const el = document.getElementById("narrative-history");
  if (!el) return;
  const made = Object.entries(this.narrativeChoices);
  if (made.length === 0) { el.innerHTML = `<p class="text-zinc-600 text-xs text-center py-4">Nenhuma escolha feita ainda.</p>`; return; }
  el.innerHTML = made.map(([cid, optId]) => {
    const choice = this.NARRATIVE_CHOICES.find(c => c.id === cid);
    if (!choice) return "";
    const opt = choice.options.find(o => o.id === optId);
    return `<div class="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl mb-2">
      <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Escolha feita</p>
      <p class="text-xs font-bold text-zinc-300 mb-1">${opt ? opt.label[this.lang] : optId}</p>
      <p class="text-[9px] text-zinc-500 italic">${opt ? opt.effect[this.lang] : ""}</p>
    </div>`;
  }).join("");
};

// Trigger choice check on boss kill






// ═══════════════════════════════════════════════════════════════
// ── v20.0 — NPCs COM MISSÕES ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.npcQuestsDone = JSON.parse(localStorage.getItem("rpg_npc_quests") || "[]");

rpg.NPCS = [
  {
    id: "blacksmith",
    name: { pt: "Ferreiro Koda", en: "Blacksmith Koda" },
    icon: "hammer",
    color: "text-orange-400",
    greeting: { pt: "Preciso de materiais para forjar algo especial.", en: "I need materials to forge something special." },
    quests: [
      {
        id: "q_koda_1",
        title: { pt: "Abate 20 Inimigos", en: "Kill 20 Enemies" },
        desc:  { pt: "Koda precisa de dados de batalha para calibrar a forja.", en: "Koda needs battle data to calibrate the forge." },
        cond: s => s.kills >= 20,
        reward: { pt: "+3 Pontos de Talento", en: "+3 Talent Points" },
        apply: s => { s.talentPoints = (s.talentPoints||0) + 3; localStorage.setItem("rpg_talent_pts", s.talentPoints); }
      },
      {
        id: "q_koda_2",
        title: { pt: "Forja um item ao +5", en: "Forge an item to +5" },
        desc:  { pt: "Demonstra o teu domínio da forja.", en: "Demonstrate your mastery of the forge." },
        cond: s => Object.values(s.forgeUpgrades||{}).some(v => v >= 5),
        reward: { pt: "+50% desconto permanente na Forja", en: "+50% perm. Forge discount" },
        apply: s => { s.forgeDisco = (s.forgeDisco||0) + 0.50; }
      }
    ]
  },
  {
    id: "sage",
    name: { pt: "Sábia Lyra",    en: "Sage Lyra" },
    icon: "sparkles",
    color: "text-violet-400",
    greeting: { pt: "O conhecimento antigo de Algoritma guia os que ouvem.", en: "The ancient knowledge of Algoritma guides those who listen." },
    quests: [
      {
        id: "q_lyra_1",
        title: { pt: "Derrota 3 Bosses", en: "Defeat 3 Bosses" },
        desc:  { pt: "Lyra quer confirmar que és digno da sua sabedoria.", en: "Lyra wants to confirm you are worthy of her wisdom." },
        cond: s => s.bossKills >= 3,
        reward: { pt: "+5 Fragmentos de Lore desbloqueados", en: "+5 Lore Fragments unlocked" },
        apply: s => { for(let i=1; i<=5; i++) { const f="lore_00"+i; if(!s.loreFragments.includes(f)) s.loreFragments.push(f); } }
      },
      {
        id: "q_lyra_2",
        title: { pt: "Coleta 5 Fragmentos de Lore", en: "Collect 5 Lore Fragments" },
        desc:  { pt: "Leva o conhecimento ao limite.", en: "Push knowledge to its limit." },
        cond: s => (s.loreFragments||[]).length >= 5,
        reward: { pt: "+30% XP permanente", en: "+30% perm. XP" },
        apply: s => { s.permXpBonus = (s.permXpBonus||0) + 0.30; }
      }
    ]
  },
  {
    id: "merchant",
    name: { pt: "Mercador Vex",  en: "Merchant Vex" },
    icon: "store",
    color: "text-yellow-400",
    greeting: { pt: "Os melhores negócios nascem no caos, amigo.", en: "The best deals are born in chaos, friend." },
    quests: [
      {
        id: "q_vex_1",
        title: { pt: "Gasta 50.000 Ouro na Loja", en: "Spend 50,000 Gold in the Shop" },
        desc:  { pt: "Vex quer ver o teu ouro circular.", en: "Vex wants to see your gold circulate." },
        cond: s => (s.totalGoldEarned||0) >= 50000,
        reward: { pt: "Desconto permanente 10% na Loja", en: "10% perm. Shop discount" },
        apply: s => { s.shopDiscount = (s.shopDiscount||0) + 0.10; }
      },
      {
        id: "q_vex_2",
        title: { pt: "Compra 3 Gemas", en: "Buy 3 Gems" },
        desc:  { pt: "Vex quer que explores o mercado de gemas.", en: "Vex wants you to explore the gem market." },
        cond: s => (s.ownedGems||[]).length >= 3,
        reward: { pt: "+200 Honra 🏅", en: "+200 Honor 🏅" },
        apply: s => { s.addHonor(200); }
      }
    ]
  },
  {
    id: "ghost",
    name: { pt: "Fantasma do Passado", en: "Ghost of the Past" },
    icon: "ghost",
    color: "text-zinc-400",
    greeting: { pt: "...eu fui como tu. Um dia.", en: "...I was like you. Once." },
    quests: [
      {
        id: "q_ghost_1",
        title: { pt: "Sobrevive à Onda 10", en: "Survive Wave 10" },
        desc:  { pt: "O Fantasma quer ver se tens o que é preciso.", en: "The Ghost wants to see if you have what it takes." },
        cond: s => s.bestWave >= 10,
        reward: { pt: "+10 Pontos de Talento", en: "+10 Talent Points" },
        apply: s => { s.talentPoints = (s.talentPoints||0) + 10; localStorage.setItem("rpg_talent_pts", s.talentPoints); }
      },
      {
        id: "q_ghost_2",
        title: { pt: "Completa 5 Dungeons Diárias", en: "Complete 5 Daily Dungeons" },
        desc:  { pt: "A persistência honra os que vieram antes.", en: "Persistence honors those who came before." },
        cond: s => (s.dungeonsCleared||0) >= 5,
        reward: { pt: "Runa Espelho desbloqueada grátis", en: "Mirror Rune unlocked for free" },
        apply: s => { if(!s.unlockedRunes.includes("r_mirror")) { s.unlockedRunes.push("r_mirror"); localStorage.setItem("rpg_unlocked_runes", JSON.stringify(s.unlockedRunes)); } }
      }
    ]
  },
  {
    id: "soldier",
    name: { pt: "Soldado Rex",   en: "Soldier Rex" },
    icon: "shield",
    color: "text-red-400",
    greeting: { pt: "Na batalha, só os fortes sobrevivem. Prova que és um deles.", en: "In battle, only the strong survive. Prove you are one." },
    quests: [
      {
        id: "q_rex_1",
        title: { pt: "Usa o Supremo 10 vezes", en: "Use Ultimate 10 times" },
        desc:  { pt: "Domina a arte do Supremo em combate.", en: "Master the art of the Ultimate in combat." },
        cond: s => (s.ultimateUses||0) >= 10,
        reward: { pt: "+500 Honra + Conquista Desbloqueada", en: "+500 Honor + Achievement Unlocked" },
        apply: s => { s.addHonor(500); }
      },
      {
        id: "q_rex_2",
        title: { pt: "Vence com Modo Desafio Hardcore", en: "Win with Hardcore Challenge" },
        desc:  { pt: "Mostra que és o mais duro da arena.", en: "Show you are the toughest in the arena." },
        cond: s => s.hardcoreWins > 0,
        reward: { pt: "+40% ATK permanente", en: "+40% perm. ATK" },
        apply: s => { s.permAtkBonus = (s.permAtkBonus||0) + 0.40; }
      }
    ]
  }
];

rpg.ultimateUses = parseInt(localStorage.getItem("rpg_ult_uses") || "0");
rpg.hardcoreWins = parseInt(localStorage.getItem("rpg_hardcore_wins") || "0");
rpg.forgeDisco   = 0;

rpg.claimNpcQuest = function(npcId, questId) {
  if (this.npcQuestsDone.includes(questId)) return;
  const npc = this.NPCS.find(n => n.id === npcId);
  if (!npc) return;
  const quest = npc.quests.find(q => q.id === questId);
  if (!quest || !quest.cond(this)) { showToast("Missão ainda não concluída!"); return; }
  this.npcQuestsDone.push(questId);
  quest.apply(this);
  localStorage.setItem("rpg_npc_quests", JSON.stringify(this.npcQuestsDone));
  this.save(); this.updateUI();
  showToast("✅ Missão completa: " + quest.title[this.lang] + "! " + quest.reward[this.lang], 5000);
  this.renderNpcs();
};

rpg.renderNpcs = function() {
  const el = document.getElementById("npc-body");
  if (!el) return;
  const questsDone = this.npcQuestsDone;
  const pending = this.NPCS.flatMap(n => n.quests.filter(q => !questsDone.includes(q.id) && q.cond(this)));
  el.innerHTML = (pending.length > 0
    ? `<div class="bg-emerald-950/20 border border-emerald-700/30 rounded-xl p-2 mb-3 text-center"><p class="text-xs font-black text-emerald-400">✅ ${pending.length} missão(ões) prontas para resgatar!</p></div>`
    : "") +
  this.NPCS.map(npc => {
    const npcQuests = npc.quests.map(quest => {
      const done = questsDone.includes(quest.id);
      const ready = !done && quest.cond(this);
      return `<div class="flex items-start gap-2 p-2 rounded-lg border ${done ? "border-emerald-900/40 bg-emerald-950/10 opacity-60" : ready ? "border-emerald-600/50 bg-emerald-950/20" : "border-zinc-800 bg-zinc-950/40"} mt-1.5">
        <div class="flex-1">
          <p class="text-[9px] font-black ${done ? "text-zinc-500" : ready ? "text-emerald-300" : "text-zinc-300"}">${quest.title[this.lang]}</p>
          <p class="text-[8px] text-zinc-600 leading-tight">${quest.desc[this.lang]}</p>
          <p class="text-[8px] text-yellow-600 mt-0.5">🎁 ${quest.reward[this.lang]}</p>
        </div>
        ${done ? `<span class="text-emerald-500 text-sm mt-1 flex-shrink-0">✓</span>`
               : ready ? `<button onclick="rpg.claimNpcQuest('${npc.id}','${quest.id}')" class="px-2 py-1 bg-emerald-700 hover:bg-emerald-600 border border-emerald-600 text-white rounded-lg text-[9px] font-black flex-shrink-0 mt-0.5">Resgatar</button>`
               : `<span class="text-zinc-600 text-xs flex-shrink-0 mt-1">🔒</span>`}
      </div>`;
    }).join("");
    return `<div class="mb-4 bg-zinc-950/60 border border-zinc-800 rounded-xl p-3">
      <div class="flex items-center gap-2 mb-2">
        <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${npc.icon}" class="w-4 h-4 ${npc.color}"></i></div>
        <div><p class="text-xs font-black text-zinc-200">${npc.name[this.lang]}</p><p class="text-[9px] text-zinc-500 italic">"${npc.greeting[this.lang]}"</p></div>
      </div>
      ${npcQuests}
    </div>`;
  }).join("");
  lucide.createIcons();
};

// Track ultimate uses









// Track hardcore wins

// ═══════════════════════════════════════════════════════════════
// ── v20.0 — BOSS COM PARTES (TARGETING SYSTEM) ───────────────
// ═══════════════════════════════════════════════════════════════

rpg.bossPartHP   = {};   // { partId: currentHp }
rpg.targetedPart = null; // "head" | "body" | "weapon"
rpg.BOSS_PARTS_ACTIVE = false;

rpg.BOSS_PARTS = {
  head:   { label:{pt:"Cabeça",  en:"Head"  }, icon:"👁", maxHpPct:0.30, color:"text-yellow-400",
            onDestroy: s => { s.applyStatus("stun"); showToast("💥 Cabeça destruída! Boss atordoado!", 3000); }
  },
  weapon: { label:{pt:"Arma",    en:"Weapon"}, icon:"⚔", maxHpPct:0.25, color:"text-red-400",
            onDestroy: s => { if(s.monster) { s.monster.dmg = Math.floor(s.monster.dmg*0.5); } showToast("💥 Arma destruída! Dano do Boss -50%!", 3000); }
  },
  body:   { label:{pt:"Corpo",   en:"Body"  }, icon:"🛡", maxHpPct:0.45, color:"text-blue-400",
            onDestroy: s => { if(s.monster) { s.monster.shieldPoints=0; s.tryBreakShield(); } showToast("💥 Corpo destruído! BREAK forçado!", 3000); }
  },
};

rpg.initBossParts = function() {
  if (!this.isBossFight || !this.monster) return;
  this.BOSS_PARTS_ACTIVE = true;
  this.targetedPart = "body"; // default target
  Object.entries(this.BOSS_PARTS).forEach(([partId, part]) => {
    this.bossPartHP[partId] = Math.floor(this.monster.maxHp * part.maxHpPct);
  });
  this.renderBossPartsUI();
};

rpg.setTargetPart = function(partId) {
  if (!this.BOSS_PARTS[partId]) return;
  if (this.bossPartHP[partId] <= 0) { showToast("Esta parte já foi destruída!"); return; }
  this.targetedPart = partId;
  this.renderBossPartsUI();
};

rpg.damageBossPart = function(dmg) {
  if (!this.BOSS_PARTS_ACTIVE || !this.targetedPart) return;
  const partId = this.targetedPart;
  if (this.bossPartHP[partId] <= 0) return;
  const partDmg = Math.floor(dmg * 0.4); // 40% dos danos vai para a parte
  this.bossPartHP[partId] = Math.max(0, this.bossPartHP[partId] - partDmg);
  if (this.bossPartHP[partId] <= 0) {
    this.BOSS_PARTS[partId].onDestroy(this);
    this.bossPartHP[partId] = 0;
    // Se não há mais partes, desativar sistema
    if (Object.values(this.bossPartHP).every(hp => hp <= 0)) {
      this.BOSS_PARTS_ACTIVE = false;
    }
    // Auto-switch target
    const next = Object.keys(this.bossPartHP).find(pid => this.bossPartHP[pid] > 0);
    this.targetedPart = next || null;
  }
  this.renderBossPartsUI();
};

rpg.renderBossPartsUI = function() {
  const el = document.getElementById("boss-parts-ui");
  if (!el) return;
  if (!this.BOSS_PARTS_ACTIVE || !this.isBossFight) { el.innerHTML = ""; return; }
  el.innerHTML = `<div class="flex gap-1.5 justify-center mb-1">` +
    Object.entries(this.BOSS_PARTS).map(([partId, part]) => {
      const hp = this.bossPartHP[partId] || 0;
      const maxHp = Math.floor((this.monster?.maxHp||1) * part.maxHpPct);
      const pct = Math.max(0, Math.floor((hp/maxHp)*100));
      const destroyed = hp <= 0;
      const isTarget = this.targetedPart === partId;
      return `<button onclick="rpg.setTargetPart('${partId}')"
        class="flex-1 p-1.5 rounded-lg border ${destroyed ? "border-zinc-800 bg-zinc-900/30 opacity-30 cursor-not-allowed" : isTarget ? "border-amber-500 bg-amber-950/30" : "border-zinc-700 bg-zinc-900/60 hover:border-zinc-500"} transition-all text-center">
        <p class="text-sm leading-none mb-0.5">${part.icon}</p>
        <p class="text-[7px] font-black ${isTarget ? "text-amber-400" : "text-zinc-500"} uppercase">${part.label[this.lang]}</p>
        <div class="w-full h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
          <div class="h-full rounded-full transition-all ${isTarget ? "bg-amber-400" : "bg-zinc-600"}" style="width:${pct}%"></div>
        </div>
        ${destroyed ? `<p class="text-[6px] text-rose-500 font-black mt-0.5">DESTRUÍDO</p>` : `<p class="text-[6px] text-zinc-600 mt-0.5">${pct}%</p>`}
      </button>`;
    }).join("") + `</div>
    <p class="text-[7px] text-zinc-600 text-center uppercase tracking-widest">Alvo: ${this.targetedPart ? this.BOSS_PARTS[this.targetedPart]?.label[this.lang] : "—"}</p>`;
};

// Patch spawnMonster para inicializar boss parts











// Patch dealDamageToMonster para aplicar dano às partes








// ═══════════════════════════════════════════════════════════════
// ── v20.0 — SAVE/INIT PATCHES ────────────────────────────────
// ═══════════════════════════════════════════════════════════════











































// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SKILL CHAINS / COMBO CONDICIONAIS ────────────────
// ═══════════════════════════════════════════════════════════════

rpg.skillChainSequence = [];   // tracks last N skills used
rpg.skillChainCooldown  = false;

rpg.SKILL_CHAINS = [
  {
    id: "chain_arcane_counter",
    seq: ["atk","mag","def"],
    name: { pt: "⚡ Contra Arcano", en: "⚡ Arcane Counter" },
    desc: { pt: "Atk→Mag→Def desencadeia explosão arcana", en: "Atk→Mag→Def triggers arcane blast" },
    apply: function(s) {
      if (!s.monster || s.monster.hp <= 0) return;
      const dmg = Math.floor(s.getAtk() * 3.5);
      s.dealDamageToMonster(dmg, "mag", true);
      s.showDamage("⚡ CHAIN!", "dmg-effective");
      s.addFury(40);
    }
  },
  {
    id: "chain_berserker_rush",
    seq: ["atk","atk","atk"],
    name: { pt: "🔥 Investida Berserk", en: "🔥 Berserker Rush" },
    desc: { pt: "3 Ataques seguidos → devastação total", en: "3 Attacks → total devastation" },
    apply: function(s) {
      if (!s.monster || s.monster.hp <= 0) return;
      const dmg = Math.floor(s.getAtk() * 5);
      s.dealDamageToMonster(dmg, "atk", true);
      s.showDamage("🔥 RUSH!", "dmg-crit");
    }
  },
  {
    id: "chain_mana_burst",
    seq: ["mag","mag","heal"],
    name: { pt: "💜 Explosão Mágica", en: "💜 Mana Burst" },
    desc: { pt: "Mag→Mag→Cura → AoE + cura bónus", en: "Mag→Mag→Heal → AoE + bonus heal" },
    apply: function(s) {
      if (!s.monster || s.monster.hp <= 0) return;
      const dmg = Math.floor(s.getAtk() * 4);
      s.dealDamageToMonster(dmg, "mag", true);
      const healAmt = Math.floor(s.getMaxHp() * 0.20);
      s.heroHp = Math.min(s.getMaxHp(), s.heroHp + healAmt);
      s.showDamage("💜 BURST! +" + formatNumber(healAmt), "heal");
      s.updateHpBars();
    }
  },
  {
    id: "chain_iron_fortress",
    seq: ["def","def","heal"],
    name: { pt: "🛡 Fortaleza de Ferro", en: "🛡 Iron Fortress" },
    desc: { pt: "Def→Def→Cura → HP cheio + escudo", en: "Def→Def→Heal → full HP + shield" },
    apply: function(s) {
      s.heroHp = s.getMaxHp();
      s.classShieldActive = true;
      setTimeout(() => { s.classShieldActive = false; }, 10000);
      s.showDamage("🛡 FORTRESS!", "dmg-parry");
      s.updateHpBars();
    }
  },
  {
    id: "chain_void_annihilation",
    seq: ["atk","mag","atk","mag"],
    name: { pt: "🌀 Aniquilação do Vazio", en: "🌀 Void Annihilation" },
    desc: { pt: "Atk→Mag×2 → dano massivo do Vazio", en: "Atk→Mag×2 → massive void damage" },
    apply: function(s) {
      if (!s.monster || s.monster.hp <= 0) return;
      const dmg = Math.floor(s.getAtk() * 8);
      s.lastElement = "void";
      s.dealDamageToMonster(dmg, "mag", true);
      s.monster.shieldPoints = 0;
      s.tryBreakShield();
      s.showDamage("🌀 ANIHILAÇÃO!", "dmg-effective");
    }
  },
];

rpg.checkSkillChain = function(skillId) {
  if (this.skillChainCooldown) return;
  this.skillChainSequence.push(skillId);
  if (this.skillChainSequence.length > 4) this.skillChainSequence.shift();
  const seq = this.skillChainSequence;
  for (const chain of this.SKILL_CHAINS) {
    const L = chain.seq.length;
    if (seq.length >= L && seq.slice(-L).join(",") === chain.seq.join(",")) {
      showToast("⚡ " + chain.name[this.lang] + "!", 2000);
      chain.apply(this);
      this.skillChainSequence = [];
      this.skillChainCooldown = true;
      setTimeout(() => { this.skillChainCooldown = false; }, 3000);
      return;
    }
  }
};

// Render chain guide
rpg.renderSkillChains = function() {
  const el = document.getElementById("chains-body");
  if (!el) return;
  el.innerHTML = `<p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-3 text-center">Executa as sequências em combate</p>
  <div class="space-y-3">` +
  this.SKILL_CHAINS.map(chain => {
    const icons = { atk:"⚔", mag:"🔥", def:"🛡", heal:"🧪" };
    const seqDisplay = chain.seq.map(s => `<span class="px-2 py-1 bg-zinc-800 rounded-lg text-sm border border-zinc-700">${icons[s]}</span>`).join('<span class="text-zinc-600 mx-1">→</span>');
    return `<div class="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl">
      <p class="text-xs font-black text-zinc-200 mb-1">${chain.name[this.lang]}</p>
      <div class="flex items-center gap-1 mb-2 flex-wrap">${seqDisplay}</div>
      <p class="text-[9px] text-zinc-500">${chain.desc[this.lang]}</p>
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Hook useSkill para chains








// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SISTEMA DE FORMAÇÕES ─────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.activeFormation = localStorage.getItem("rpg_formation") || "balanced";

rpg.FORMATIONS = [
  {
    id: "balanced",
    name: { pt: "⚖ Equilibrado", en: "⚖ Balanced" },
    desc: { pt: "Stats padrão. Nenhum bónus ou penalidade.", en: "Default stats. No bonuses or penalties." },
    color: "text-zinc-400", border: "border-zinc-700", bg: "bg-zinc-900/40",
    mods: {}
  },
  {
    id: "assault",
    name: { pt: "⚔ Assalto Total", en: "⚔ Full Assault" },
    desc: { pt: "+40% ATK, +20% Crit · -30% HP máximo", en: "+40% ATK, +20% Crit · -30% max HP" },
    color: "text-red-400", border: "border-red-800/50", bg: "bg-red-950/20",
    mods: { atk: 1.40, crit: 0.20, hp: 0.70 }
  },
  {
    id: "fortress",
    name: { pt: "🛡 Fortaleza", en: "🛡 Fortress" },
    desc: { pt: "+60% HP, +30% Def · -25% ATK, -20% Crit", en: "+60% HP, +30% Def · -25% ATK, -20% Crit" },
    color: "text-blue-400", border: "border-blue-800/50", bg: "bg-blue-950/20",
    mods: { hp: 1.60, def: 1.30, atk: 0.75, crit: -0.20 }
  },
  {
    id: "ghost",
    name: { pt: "👻 Fantasma", en: "👻 Ghost" },
    desc: { pt: "+40% Esquiva, +30% Crit · -20% ATK, -20% HP", en: "+40% Dodge, +30% Crit · -20% ATK, -20% HP" },
    color: "text-cyan-400", border: "border-cyan-800/50", bg: "bg-cyan-950/20",
    mods: { dodge: 0.40, crit: 0.30, atk: 0.80, hp: 0.80 }
  },
  {
    id: "berserker",
    name: { pt: "💢 Berserk", en: "💢 Berserk" },
    desc: { pt: "+80% ATK · HP máximo = 1. All-in.", en: "+80% ATK · Max HP = 1. All-in." },
    color: "text-rose-400", border: "border-rose-800/50", bg: "bg-rose-950/20",
    mods: { atk: 1.80, hpFlat: 1 }
  },
  {
    id: "arcane",
    name: { pt: "🔮 Arcano", en: "🔮 Arcane" },
    desc: { pt: "Magia: ×3 dano, CD -40% · ATK físico -50%", en: "Magic: ×3 dmg, CD -40% · Phys ATK -50%" },
    color: "text-violet-400", border: "border-violet-800/50", bg: "bg-violet-950/20",
    mods: { magMult: 3.0, magCd: 0.60, atk: 0.50 }
  },
  {
    id: "fortune",
    name: { pt: "💰 Fortuna", en: "💰 Fortune" },
    desc: { pt: "+100% Ouro & XP · -20% ATK e HP", en: "+100% Gold & XP · -20% ATK and HP" },
    color: "text-yellow-400", border: "border-yellow-800/50", bg: "bg-yellow-950/20",
    mods: { gold: 2.0, xp: 2.0, atk: 0.80, hp: 0.80 }
  },
];

rpg.getFormation = function() {
  return this.FORMATIONS.find(f => f.id === this.activeFormation) || this.FORMATIONS[0];
};

rpg.setFormation = function(id) {
  this.activeFormation = id;
  localStorage.setItem("rpg_formation", id);
  this.save(); this.updateUI();
  const f = this.getFormation();
  showToast("⚔ Formação: " + f.name[this.lang] + "!", 2500);
  this.renderFormations();
};

rpg.renderFormations = function() {
  const el = document.getElementById("formation-body");
  if (!el) return;
  const active = this.activeFormation;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Escolhe antes de entrar em batalha</p>
  <div class="space-y-2">` +
  this.FORMATIONS.map(f => {
    const isActive = f.id === active;
    return `<div class="p-3 rounded-xl border ${isActive ? f.border + " " + f.bg : "border-zinc-800 bg-zinc-950/60"} cursor-pointer transition-all" onclick="rpg.setFormation('${f.id}')">
      <div class="flex items-center justify-between mb-1">
        <p class="text-sm font-black ${isActive ? f.color : "text-zinc-400"}">${f.name[this.lang]}</p>
        ${isActive ? `<span class="text-emerald-400 font-black text-xs">ATIVA ✓</span>` : ""}
      </div>
      <p class="text-[9px] text-zinc-500">${f.desc[this.lang]}</p>
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Apply formation mods





























// Formation: magic mult + cd reduction





















// ═══════════════════════════════════════════════════════════════
// ── v21.0 — MASMORRAS PROCEDURAIS ────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.procDungeon = null;
rpg.procFloor   = 0;
rpg.bestDungeon = parseInt(localStorage.getItem("rpg_best_dungeon") || "0");

rpg.PROC_ROOM_TYPES = [
  { id:"combat",   w:50, name:{pt:"Sala de Combate",   en:"Combat Room"  }, icon:"⚔",
    apply: s => { s.openPreBattle(false); } },
  { id:"treasure", w:15, name:{pt:"Sala do Tesouro",   en:"Treasure Room"}, icon:"💰",
    apply: s => {
      const gold = Math.floor(s.level * 300 * (1 + Math.random()));
      s.gold += gold; s.save(); s.updateUI();
      showToast("💰 Tesouro! +" + formatNumber(gold) + " Ouro!", 3000);
      setTimeout(() => s.nextProcRoom(), 1500);
    }
  },
  { id:"rest",     w:12, name:{pt:"Sala de Descanso",  en:"Rest Room"    }, icon:"💤",
    apply: s => {
      s.heroHp = Math.min(s.getMaxHp(), s.heroHp + Math.floor(s.getMaxHp() * 0.40));
      s.potions += 3; s.updateHpBars(); s.save();
      showToast("💤 Descansaste! +40% HP +3 Poções", 3000);
      setTimeout(() => s.nextProcRoom(), 1500);
    }
  },
  { id:"shop",     w:10, name:{pt:"Loja Secreta",      en:"Secret Shop"  }, icon:"🛍",
    apply: s => { openShop(); }
  },
  { id:"trap",     w:8,  name:{pt:"Sala Armadilha",    en:"Trap Room"    }, icon:"💥",
    apply: s => {
      const dmg = Math.floor(s.getMaxHp() * 0.25);
      s.heroHp = Math.max(1, s.heroHp - dmg);
      s.updateHpBars();
      showToast("💥 Armadilha! -" + formatNumber(dmg) + " HP!", 3000);
      setTimeout(() => s.nextProcRoom(), 1500);
    }
  },
  { id:"lore",     w:5,  name:{pt:"Sala do Arquivo",   en:"Archive Room" }, icon:"📜",
    apply: s => {
      const frags = s.LORE_FRAGMENTS.filter(f => !s.loreFragments.includes(f.id));
      if (frags.length > 0) {
        const f = frags[Math.floor(Math.random() * frags.length)];
        s.loreFragments.push(f.id);
        showToast("📜 Lore: \"" + f.text[s.lang].slice(0,50) + "...\"", 5000);
        s.save();
      }
      setTimeout(() => s.nextProcRoom(), 2000);
    }
  },
  { id:"boss",     w:0,  name:{pt:"Boss da Masmorra",  en:"Dungeon Boss" }, icon:"💀",
    apply: s => { s.openPreBattle(true); }
  },
];

rpg._weightedRoom = function() {
  const pool = this.PROC_ROOM_TYPES.filter(r => r.id !== "boss");
  const total = pool.reduce((a, r) => a + r.w, 0);
  let rand = Math.random() * total;
  for (const r of pool) { rand -= r.w; if (rand <= 0) return r; }
  return pool[0];
};

rpg.generateProcDungeon = function(floors = 8) {
  const rooms = [];
  for (let i = 0; i < floors - 1; i++) rooms.push(this._weightedRoom());
  rooms.push(this.PROC_ROOM_TYPES.find(r => r.id === "boss")); // last room is boss
  return { floors: rooms, depth: floors };
};

rpg.startProcDungeon = function() {
  this.procDungeon = this.generateProcDungeon(6 + Math.floor(this.level / 100));
  this.procFloor = 0;
  closeModal("proc-dungeon-modal");
  showToast("🏰 Masmorra gerada! " + this.procDungeon.depth + " salas.", 3000);
  this.enterProcRoom();
};

rpg.enterProcRoom = function() {
  if (!this.procDungeon) return;
  const room = this.procDungeon.floors[this.procFloor];
  if (!room) { this.completeProcDungeon(); return; }
  showToast(room.icon + " " + room.name[this.lang] + " (" + (this.procFloor + 1) + "/" + this.procDungeon.depth + ")", 2000);
  setTimeout(() => room.apply(this), 500);
};

rpg.nextProcRoom = function() {
  if (!this.procDungeon) return;
  this.procFloor++;
  if (this.procFloor >= this.procDungeon.floors.length) { this.completeProcDungeon(); return; }
  this.renderProcDungeonHUD();
  setTimeout(() => this.enterProcRoom(), 500);
};

rpg.completeProcDungeon = function() {
  const depth = this.procDungeon ? this.procDungeon.depth : 0;
  if (depth > this.bestDungeon) {
    this.bestDungeon = depth;
    localStorage.setItem("rpg_best_dungeon", this.bestDungeon);
  }
  const reward = Math.floor(this.level * 1000 * (depth / 8));
  this.gold += reward;
  this.dungeonsCleared = (this.dungeonsCleared||0) + 1;
  this.procDungeon = null;
  this.procFloor = 0;
  this.save(); this.updateUI();
  showToast("🏆 Masmorra Completa! +" + formatNumber(reward) + " 💰", 5000);
};

rpg.renderProcDungeonHUD = function() {
  const el = document.getElementById("proc-hud");
  if (!el || !this.procDungeon) { if (el) el.innerHTML = ""; return; }
  const rooms = this.procDungeon.floors;
  el.innerHTML = `<div class="flex items-center gap-1 justify-center flex-wrap">` +
    rooms.map((r, i) => `<div class="w-7 h-7 rounded-lg border text-center text-xs flex items-center justify-center ${i < this.procFloor ? "bg-emerald-900/40 border-emerald-700/50 opacity-60" : i === this.procFloor ? "bg-amber-900/40 border-amber-500 scale-110" : "bg-zinc-900/60 border-zinc-700"}">
      ${r.icon}
    </div>`).join(`<div class="text-zinc-700 text-[8px]">—</div>`) + `</div>`;
};

rpg.renderProcDungeonSetup = function() {
  const el = document.getElementById("proc-dungeon-body");
  if (!el) return;
  const floors = 6 + Math.floor(this.level / 100);
  el.innerHTML = `<div class="text-center space-y-4">
    <p class="text-5xl">🏰</p>
    <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-left space-y-2 text-xs text-zinc-400">
      <p>🎲 <strong class="text-zinc-200">Gerada aleatoriamente</strong> a cada tentativa.</p>
      <p>⚔ Salas: Combate, Tesouro, Descanso, Loja Secreta, Armadilha, Arquivo, Boss.</p>
      <p>🏆 <strong class="text-zinc-200">Último andar:</strong> sempre um Boss.</p>
      <p>📏 <strong class="text-zinc-200">Profundidade:</strong> ${floors} salas (escala com nível)</p>
      <p>💀 <strong class="text-zinc-200">Melhor masmorra:</strong> ${this.bestDungeon} salas</p>
    </div>
    <button onclick="rpg.startProcDungeon()" class="btn-3d w-full py-3 bg-gradient-to-r from-amber-800 to-orange-700 border border-amber-600 text-white font-black rounded-xl uppercase tracking-wider">🎲 Gerar & Entrar</button>
  </div>`;
  lucide.createIcons();
};

// Patch killMonster para avançar masmorra procedural










// ═══════════════════════════════════════════════════════════════
// ── v21.0 — DIÁRIO DO HERÓI ───────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.heroJournal = JSON.parse(localStorage.getItem("rpg_journal") || "[]");

rpg.JOURNAL_TRIGGERS = [
  { cond: s => s.level >= 1   && s.bossKills === 0, id:"j_start",
    text: { pt: s => `${s.heroName} acordou nas Ruínas. A Lógica tinha caído. \"Eu não sei o que me espera... mas vou em frente.\"`,
            en: s => `${s.heroName} awakened in the Ruins. Logic had fallen. "I don't know what awaits me... but I move forward."` }
  },
  { cond: s => s.bossKills >= 1, id:"j_boss1",
    text: { pt: s => `Derrotei o Lorde do Caos. As suas cinzas brilhavam fracamente. Entendi naquele momento que esta jornada não ia ser fácil.`,
            en: s => `I defeated the Lord of Chaos. His ashes glowed faintly. In that moment I understood this journey wouldn't be easy.` }
  },
  { cond: s => s.level >= 50, id:"j_lvl50",
    text: { pt: s => `Nível 50. Já perdi a conta dos monstros derrotados. O meu poder cresce, mas os inimigos crescem comigo.`,
            en: s => `Level 50. I've lost count of monsters defeated. My power grows, but so do the enemies.` }
  },
  { cond: s => s.prestigeLevel >= 1, id:"j_prestige",
    text: { pt: s => `Renasci. Tudo o que construí... desapareceu. Mas o que aprendi ficou. E desta vez, serei mais rápido.`,
            en: s => `I was reborn. Everything I built... gone. But what I learned remained. And this time, I'll be faster.` }
  },
  { cond: s => s.bestWave >= 10, id:"j_wave10",
    text: { pt: s => `Onda 10. Eles vinham sem parar. Senti o cansaço, mas também algo novo: adrenalina pura.`,
            en: s => `Wave 10. They kept coming. I felt the exhaustion, but also something new: pure adrenaline.` }
  },
  { cond: s => s.bossKills >= 5, id:"j_boss5",
    text: { pt: s => `Cinco guardiões derrotados. Cada um diferente. Cada um ensinando algo. Começo a entender o padrão deste universo.`,
            en: s => `Five guardians defeated. Each one different. Each one teaching something. I'm starting to understand this universe's pattern.` }
  },
  { cond: s => s.level >= 100, id:"j_lvl100",
    text: { pt: s => `Nível 100. Lembro-me do primeiro dia. Parece uma eternidade atrás. Quantos ${s.heroName}s diferentes eu fui até chegar aqui?`,
            en: s => `Level 100. I remember the first day. It feels like an eternity ago. How many different ${s.heroName}s have I been to get here?` }
  },
  { cond: s => s.bossKills >= 15, id:"j_boss15",
    text: { pt: s => `Quinze guardiões. Cada vitória custou algo. O universo de Algoritma é mais profundo do que eu imaginava.`,
            en: s => `Fifteen guardians. Each victory cost something. The universe of Algoritma is deeper than I imagined.` }
  },
  { cond: s => s.kills >= 1000, id:"j_kills1k",
    text: { pt: s => `Mil abates. Deveria sentir algo por este número. Não sinto. Talvez isso seja o que me torna perigoso.`,
            en: s => `A thousand kills. I should feel something about this number. I don't. Perhaps that's what makes me dangerous.` }
  },
  { cond: s => (s.loreFragments||[]).length >= 5, id:"j_lore5",
    text: { pt: s => `Li os fragmentos que o universo deixou para trás. Percebi: esta não é uma guerra entre heróis e monstros. É entre lógica e caos. E eu sou ambos.`,
            en: s => `I read the fragments the universe left behind. I realized: this isn't a war between heroes and monsters. It's between logic and chaos. And I am both.` }
  },
];

rpg.checkJournalEntries = function() {
  let added = false;
  this.JOURNAL_TRIGGERS.forEach(trigger => {
    if (!this.heroJournal.find(e => e.id === trigger.id) && trigger.cond(this)) {
      const entry = {
        id: trigger.id,
        text: { pt: trigger.text.pt(this), en: trigger.text.en(this) },
        date: new Date().toLocaleDateString(this.lang === "pt" ? "pt-PT" : "en-US"),
        level: this.level
      };
      this.heroJournal.unshift(entry);
      added = true;
      setTimeout(() => showToast("📔 Nova entrada no Diário!", 3000), 1000);
    }
  });
  if (added) {
    localStorage.setItem("rpg_journal", JSON.stringify(this.heroJournal));
    this.save();
  }
};

rpg.renderJournal = function() {
  const el = document.getElementById("journal-body");
  if (!el) return;
  if (this.heroJournal.length === 0) {
    el.innerHTML = `<p class="text-zinc-600 text-xs text-center py-6">Nenhuma entrada ainda.<br><span class="text-[10px]">O diário atualiza com o teu progresso.</span></p>`;
    return;
  }
  el.innerHTML = this.heroJournal.map(entry => `
    <div class="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl mb-3 relative overflow-hidden">
      <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-amber-800"></div>
      <div class="pl-3">
        <p class="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">${entry.date} · Lvl ${entry.level}</p>
        <p class="text-xs text-zinc-300 italic leading-relaxed">"${entry.text[this.lang]}"</p>
      </div>
    </div>
  `).join("");
};

// Trigger journal on significant events

// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SISTEMA DE KARMA ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════
// Karma sobe ao proteger / curar. Desce ao usar relíquias amaldiçoadas.
// Afeta diálogos, drops e um boss secreto.

rpg.karma = parseInt(localStorage.getItem("rpg_karma") || "50"); // 0–100

rpg.addKarma = function(delta) {
  this.karma = Math.max(0, Math.min(100, (this.karma||50) + delta));
  localStorage.setItem("rpg_karma", this.karma);
  this.updateKarmaUI();
};

rpg.getKarmaTitle = function() {
  if (this.karma >= 90) return { pt: "Guardião da Luz", en: "Guardian of Light", color: "text-yellow-300" };
  if (this.karma >= 70) return { pt: "Herói Honrado",   en: "Honored Hero",      color: "text-emerald-400" };
  if (this.karma >= 40) return { pt: "Viajante Neutro", en: "Neutral Wanderer",  color: "text-zinc-400"    };
  if (this.karma >= 20) return { pt: "Alma Sombria",    en: "Dark Soul",         color: "text-rose-400"    };
  return                       { pt: "Entidade do Caos",en: "Chaos Entity",      color: "text-red-600"     };
};

rpg.getKarmaBonus = function() {
  if (this.karma >= 80) return { atk: 1.0, hp: 1.15, gold: 1.0,  crit: 0.05 }; // High light
  if (this.karma >= 60) return { atk: 1.10,hp: 1.05, gold: 1.10, crit: 0.0  }; // Light
  if (this.karma <= 20) return { atk: 1.25,hp: 0.85, gold: 1.30, crit: 0.10 }; // Dark
  if (this.karma <= 40) return { atk: 1.15,hp: 0.92, gold: 1.15, crit: 0.05 }; // Shadow
  return                       { atk: 1.0, hp: 1.0,  gold: 1.0,  crit: 0.0  }; // Neutral
};

rpg.updateKarmaUI = function() {
  const el = document.getElementById("karma-bar");
  if (!el) return;
  const pct = this.karma;
  const kt = this.getKarmaTitle();
  el.innerHTML = `<div class="flex items-center gap-2 mb-1">
    <p class="text-[9px] font-black ${kt.color} uppercase tracking-widest">${kt[this.lang]}</p>
    <span class="text-[8px] text-zinc-600">${this.karma}/100</span>
  </div>
  <div class="w-full h-2 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800">
    <div class="h-full rounded-full transition-all duration-500" style="width:${pct}%; background: linear-gradient(90deg, ${pct<30?'#dc2626':'#f59e0b'}, ${pct>70?'#fde047':'#f59e0b'})"></div>
  </div>`;
};

// Karma events


















// Cursed relic: lowers karma
const _karmaCursedEquip = rpg.equipCursedRelic.bind(rpg);
rpg.equipCursedRelic = function(id) {
  _karmaCursedEquip(id);
  if (this.equippedCursedRelic) this.addKarma(-15);
  else this.addKarma(5);
};

// Karma bonus to ATK/HP

















// ═══════════════════════════════════════════════════════════════
// ── v21.0 — AI PARTNER (COMPANHEIRO DE BATALHA) ──────────────
// ═══════════════════════════════════════════════════════════════

rpg.aiPartner = JSON.parse(localStorage.getItem("rpg_ai_partner") || "null");
rpg.partnerActive = false;

rpg.AI_PARTNER_CLASSES = [
  { id:"p_warrior",  name:{pt:"Guerreiro IA",    en:"AI Warrior"   }, icon:"sword",    color:"text-red-400",    style:"aggressive", cdBase:2000, dmgMult:1.2 },
  { id:"p_mage",     name:{pt:"Mago IA",          en:"AI Mage"      }, icon:"flame",    color:"text-violet-400", style:"magic",      cdBase:3500, dmgMult:1.8 },
  { id:"p_healer",   name:{pt:"Curandeiro IA",    en:"AI Healer"    }, icon:"heart",    color:"text-emerald-400",style:"support",    cdBase:4000, dmgMult:0.5 },
  { id:"p_rogue",    name:{pt:"Assassino IA",     en:"AI Rogue"     }, icon:"scissors", color:"text-cyan-400",   style:"crit",       cdBase:1500, dmgMult:1.0 },
  { id:"p_paladin",  name:{pt:"Paladino IA",      en:"AI Paladin"   }, icon:"shield",   color:"text-blue-400",   style:"defensive",  cdBase:5000, dmgMult:0.8 },
];

rpg.selectAiPartner = function(classId) {
  const cls = this.AI_PARTNER_CLASSES.find(c => c.id === classId);
  if (!cls) return;
  this.aiPartner = cls;
  this.partnerActive = true;
  localStorage.setItem("rpg_ai_partner", JSON.stringify(cls));
  showToast("🤝 " + cls.name[this.lang] + " juntou-se à batalha!", 3000);
  this.renderAiPartner();
};

rpg.removeAiPartner = function() {
  this.aiPartner = null; this.partnerActive = false;
  localStorage.removeItem("rpg_ai_partner");
  this.renderAiPartner();
  showToast("Companheiro removido.");
};

rpg.startAiPartnerCombat = function() {
  if (!this.aiPartner || !this.inCombat) return;
  const partner = this.aiPartner;
  const tick = () => {
    if (!this.inCombat || !this.monster || this.monster.hp <= 0 || !this.partnerActive) return;
    // Partner action based on style
    const atkPow = Math.floor(this.getAtk() * partner.dmgMult * 0.6);
    if (partner.style === "support") {
      const h = Math.floor(this.getMaxHp() * 0.08);
      this.heroHp = Math.min(this.getMaxHp(), this.heroHp + h);
      this.showDamage("🤝 +" + formatNumber(h), "heal");
      this.updateHpBars();
    } else if (partner.style === "crit" && Math.random() < 0.4) {
      this.dealDamageToMonster(atkPow * 3, "atk", true);
      this.showDamage("🗡 CRIT PARCEIRO!", "dmg-effective");
    } else if (partner.style === "magic") {
      this.dealDamageToMonster(atkPow * 1.5, "mag", false);
    } else if (partner.style === "defensive") {
      this.isDefending = true;
      setTimeout(() => { this.isDefending = false; }, 1200);
      this.showDamage("🛡 PARCEIRO DEF!", "dmg-parry");
    } else {
      this.dealDamageToMonster(atkPow, "atk", false);
    }
    setTimeout(tick, partner.cdBase + Math.random() * 1000);
  };
  setTimeout(tick, partner.cdBase);
};

rpg.renderAiPartner = function() {
  const el = document.getElementById("partner-body");
  if (!el) return;
  const active = this.aiPartner;
  el.innerHTML = (active ? `
    <div class="bg-zinc-950/80 border border-blue-800/40 rounded-xl p-4 mb-4 flex items-center gap-3">
      <div class="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0">
        <i data-lucide="${active.icon}" class="w-6 h-6 ${active.color}"></i>
      </div>
      <div class="flex-1">
        <p class="text-sm font-black text-zinc-200">${active.name[this.lang]}</p>
        <p class="text-[9px] text-zinc-500">Estilo: ${active.style} · CD: ${active.cdBase/1000}s</p>
      </div>
      <button onclick="rpg.removeAiPartner()" class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 rounded-lg text-[9px] font-black transition">Remover</button>
    </div>` : `
    <p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-3 text-center">Nenhum companheiro ativo</p>`) +
  `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Escolhe um Companheiro</p>
  <div class="grid grid-cols-1 gap-2">` +
  this.AI_PARTNER_CLASSES.map(cls => {
    const isActive = active && active.id === cls.id;
    return `<button onclick="rpg.selectAiPartner('${cls.id}')" class="flex items-center gap-3 p-3 rounded-xl border ${isActive ? "border-blue-600/60 bg-blue-950/20" : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"} transition-all text-left">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${cls.icon}" class="w-4 h-4 ${cls.color}"></i></div>
      <div class="flex-1"><p class="text-xs font-black text-zinc-200">${cls.name[this.lang]}</p><p class="text-[8px] text-zinc-500">Estilo: ${cls.style} · CD base: ${cls.cdBase/1000}s · Dano: ×${cls.dmgMult}</p></div>
      ${isActive ? '<span class="text-blue-400 font-black text-xs">ATIVO</span>' : ""}
    </button>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Start partner combat loop on battle start

// ═══════════════════════════════════════════════════════════════
// ── v21.0 — CODEX DO UNIVERSO ────────────────────────────────
// Enciclopédia interativa do universo de Algoritma
// ═══════════════════════════════════════════════════════════════

rpg.CODEX = {
  universe: [
    { id:"cx_algoritma",  title:{pt:"O que é Algoritma?",     en:"What is Algoritma?"    }, text:{pt:"Algoritma é um universo nascido da primeira linha de código escrita por uma entidade desconhecida. As leis da física aqui são regras de programação. A gravidade é um parâmetro. O tempo é um loop. A morte é um garbage collector.",en:"Algoritma is a universe born from the first line of code written by an unknown entity. Physics laws here are programming rules. Gravity is a parameter. Time is a loop. Death is a garbage collector."} },
    { id:"cx_logic",      title:{pt:"A Lógica",               en:"Logic"                 }, text:{pt:"A Lógica era o princípio organizador de Algoritma. Não um ser, mas uma força — como a gravidade no mundo real. Quando o Lorde do Caos a roubou, o universo começou a colapsar em contradições irresolvíveis.",en:"Logic was the organizing principle of Algoritma. Not a being, but a force — like gravity in the real world. When the Lord of Chaos stole it, the universe began collapsing into unresolvable contradictions."} },
    { id:"cx_protocol",   title:{pt:"O Protocolo Primordial", en:"The Primordial Protocol"}, text:{pt:"Existe antes de Algoritma. Existe antes do conceito de 'antes'. É a regra que define as regras. O herói não pode derrotá-lo — apenas reescrevê-lo.",en:"It exists before Algoritma. It exists before the concept of 'before'. It is the rule that defines rules. The hero cannot defeat it — only rewrite it."} },
    { id:"cx_hero",       title:{pt:"O Herói — o Paradoxo",   en:"The Hero — The Paradox"}, text:{pt:"O herói foi calculado pelo Protocolo para existir. Isso significa que a sua vitória é destino. Mas se o destino existe, o herói tem livre arbítrio? Algoritma não tem resposta para este paradoxo. Talvez seja por design.",en:"The hero was calculated by the Protocol to exist. This means their victory is destiny. But if destiny exists, does the hero have free will? Algoritma has no answer to this paradox. Perhaps it's by design."} },
  ],
  entities: [
    { id:"cx_chaos",      title:{pt:"Lorde do Caos",          en:"Lord of Chaos"         }, text:{pt:"Não era mau. Era uma ideia — o oposto da Lógica que ganhou consciência ao ser suficientemente complexo. A sua derrota não o destruiu; transformou-o em entropia distribuída pelo universo.",en:"Not evil. It was an idea — the opposite of Logic that gained consciousness through sufficient complexity. Its defeat didn't destroy it; it transformed it into entropy distributed across the universe."} },
    { id:"cx_quantum",    title:{pt:"Núcleo Quântico",        en:"Quantum Core"          }, text:{pt:"Não foi construído. Emergiu de dez mil versões colapsadas do universo. Cada colapso deixou um fragmento; os fragmentos agregaram-se. O Núcleo é literalmente a memória de todos os fins de Algoritma.",en:"Was not built. It emerged from ten thousand collapsed versions of the universe. Each collapse left a fragment; fragments aggregated. The Core is literally the memory of all of Algoritma's endings."} },
    { id:"cx_axiom",      title:{pt:"Axioma",                 en:"Axiom"                 }, text:{pt:"Um fragmento sentiente do Núcleo Quântico que sobreviveu à sua queda. A única entidade no universo que sabe, de facto, o que é o Protocolo Primordial — e escolheu não dizer.",en:"A sentient fragment of the Quantum Core that survived its fall. The only entity in the universe that actually knows what the Primordial Protocol is — and chose not to say."} },
  ],
  mechanics: [
    { id:"cx_elements",   title:{pt:"Os 7 Elementos",         en:"The 7 Elements"        }, text:{pt:"Os elementos em Algoritma correspondem a estados lógicos do universo. Fogo = execução. Água = fluxo de dados. Raio = sincronização. Terra = persistência. Gelo = cache. Vazio = null. Sagrado = interrupt.",en:"Elements in Algoritma correspond to logical states of the universe. Fire = execution. Water = data flow. Thunder = synchronization. Earth = persistence. Ice = cache. Void = null. Holy = interrupt."} },
    { id:"cx_karma",      title:{pt:"O Sistema de Karma",     en:"The Karma System"      }, text:{pt:"Algoritma observa. Cada ação ética modifica o código base do herói. Curas geram luz. Destruição gera sombra. Nenhum é superior — são apenas caminhos diferentes para o mesmo destino.",en:"Algoritma observes. Each ethical action modifies the hero's base code. Heals generate light. Destruction generates shadow. Neither is superior — they are simply different paths to the same destination."} },
  ],
};

rpg.renderCodex = function() {
  const el = document.getElementById("codex-body");
  if (!el) return;
  const sections = [
    { key:"universe", title:{pt:"🌌 O Universo",    en:"🌌 The Universe"  } },
    { key:"entities", title:{pt:"👁 Entidades",     en:"👁 Entities"      } },
    { key:"mechanics",title:{pt:"⚙ Mecânicas",     en:"⚙ Mechanics"     } },
  ];
  el.innerHTML = sections.map(sec => `
    <div class="mb-4">
      <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">${sec.title[this.lang]}</p>
      <div class="space-y-2">
        ${this.CODEX[sec.key].map(entry => `
          <details class="group">
            <summary class="cursor-pointer p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs font-black text-zinc-300 flex items-center justify-between hover:border-zinc-600 transition">
              <span>${entry.title[this.lang]}</span>
              <i data-lucide="chevron-down" class="w-3 h-3 text-zinc-600 group-open:rotate-180 transition-transform"></i>
            </summary>
            <div class="px-3 pb-3 pt-1 text-[10px] text-zinc-500 leading-relaxed italic border border-zinc-800 border-t-0 rounded-b-xl bg-zinc-950/40">
              "${entry.text[this.lang]}"
            </div>
          </details>
        `).join("")}
      </div>
    </div>
  `).join("");
  lucide.createIcons();
};

// ═══════════════════════════════════════════════════════════════
// ── v21.0 — ESPECIALIZAÇÃO DE CLASSES ────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.classSpec = localStorage.getItem("rpg_class_spec") || null; // "spec_id"

rpg.CLASS_SPECS = {
  warrior: [
    { id:"spec_warr_berserk",  name:{pt:"Berserker",    en:"Berserker"   }, icon:"swords",  color:"text-rose-400",  req:{ kills:500 },  desc:{pt:"+40% ATK, HP -30%. Kills aumentam ATK.",    en:"+40% ATK, HP -30%. Kills boost ATK."   }, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+0.40;} },
    { id:"spec_warr_guardian", name:{pt:"Guardião",     en:"Guardian"    }, icon:"shield",  color:"text-blue-400",  req:{ level:100 },  desc:{pt:"+60% HP. Parry sempre activo.",             en:"+60% HP. Parry always active."         }, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.30;} },
  ],
  mage: [
    { id:"spec_mage_arcane",   name:{pt:"Arcanista",    en:"Arcanist"    }, icon:"sparkles",color:"text-violet-400",req:{ kills:300 },  desc:{pt:"Magia x2.5. Ataques físicos -60%.",         en:"Magic x2.5. Physical attacks -60%."    }, apply:s=>{s.grimoireArcaneSurge=true;} },
    { id:"spec_mage_chrono",   name:{pt:"Cronista",     en:"Chronist"    }, icon:"hourglass",color:"text-cyan-400",req:{ level:80  },  desc:{pt:"-50% todos cooldowns.",                     en:"-50% all cooldowns."                   }, apply:s=>{s.talentCdReduce=(s.talentCdReduce||0)+0.50;} },
  ],
  rogue: [
    { id:"spec_rogue_shadow",  name:{pt:"Sombra",       en:"Shadow"      }, icon:"eye-off", color:"text-zinc-400",  req:{ level:60  },  desc:{pt:"+50% Crit. Primeiros hits ignoram defesa.", en:"+50% Crit. First hits ignore defense."},  apply:s=>{s.permCritBonus=(s.permCritBonus||0)+0.50;} },
    { id:"spec_rogue_venom",   name:{pt:"Veneno",       en:"Venom"       }, icon:"droplets",color:"text-green-400", req:{ kills:200 },  desc:{pt:"Todos ataques aplicam Veneno.",             en:"All attacks apply Poison."             }, apply:s=>{s.specAutoPoison=true;} },
  ],
  paladin: [
    { id:"spec_pal_light",     name:{pt:"Luz Divina",   en:"Divine Light" }, icon:"sun",   color:"text-yellow-300",req:{ level:70  },  desc:{pt:"+80% HP. Curas curam 80% HP.",             en:"+80% HP. Heals restore 80% HP."        }, apply:s=>{s.talentPotionHeal=0.80; s.permAllBonus=(s.permAllBonus||0)+0.40;} },
    { id:"spec_pal_judgment",  name:{pt:"Julgamento",   en:"Judgment"    }, icon:"gavel",  color:"text-amber-400", req:{ bosses:5  },  desc:{pt:"Cada boss morto +5% ATK perm.",            en:"Each boss killed +5% perm. ATK."       }, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+(s.bossKills||0)*0.05;} },
  ],
};

rpg.getAvailableSpecs = function() {
  return this.CLASS_SPECS[this.eqClass] || [];
};

rpg.selectSpec = function(specId) {
  const specs = this.getAvailableSpecs();
  const spec = specs.find(s => s.id === specId);
  if (!spec) return;
  // Check requirements
  const r = spec.req;
  if (r.kills  && this.kills  < r.kills)  { showToast("Precisas de " + r.kills  + " abates!"); return; }
  if (r.level  && this.level  < r.level)  { showToast("Precisas de Lvl " + r.level + "!"); return; }
  if (r.bosses && this.bossKills < r.bosses) { showToast("Derrota " + r.bosses + " bosses!"); return; }
  this.classSpec = specId;
  spec.apply(this);
  localStorage.setItem("rpg_class_spec", specId);
  this.save(); this.updateUI();
  showToast("⚡ Especialização: " + spec.name[this.lang] + "!", 4000);
  this.renderSpecialization();
};

rpg.renderSpecialization = function() {
  const el = document.getElementById("spec-body");
  if (!el) return;
  const specs = this.getAvailableSpecs();
  const cls = this.getClass();
  if (!specs || specs.length === 0) {
    el.innerHTML = `<p class="text-zinc-500 text-xs text-center py-6">A classe "${cls.name[this.lang]}" ainda não tem especializações disponíveis.</p>`;
    return;
  }
  const active = this.classSpec;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Classe atual: <span class="text-zinc-200">${cls.name[this.lang]}</span></p>
  <div class="space-y-3">` +
  specs.map(spec => {
    const isActive = active === spec.id;
    const r = spec.req;
    const reqMet = (!r.kills || this.kills >= r.kills) && (!r.level || this.level >= r.level) && (!r.bosses || this.bossKills >= r.bosses);
    const reqText = r.kills ? `${r.kills} Abates` : r.level ? `Lvl ${r.level}` : r.bosses ? `${r.bosses} Bosses` : "";
    return `<div class="p-4 rounded-xl border ${isActive ? spec.color.replace("text-","border-").replace("400","700/60") + " bg-zinc-950/80" : "border-zinc-800 bg-zinc-950/60"} ${!reqMet ? "opacity-50" : ""}">
      <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${spec.icon}" class="w-5 h-5 ${spec.color}"></i></div>
        <div class="flex-1"><p class="text-sm font-black text-zinc-200">${spec.name[this.lang]}</p><p class="text-[8px] text-zinc-500">${reqText}</p></div>
        ${isActive
          ? `<span class="text-emerald-400 font-black text-xs">ATIVA ✓</span>`
          : reqMet
            ? `<button onclick="rpg.selectSpec('${spec.id}')" class="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-xs font-black transition">Especializar</button>`
            : `<span class="text-zinc-600 text-xs">🔒 ${reqText}</span>`}
      </div>
      <p class="text-[9px] text-zinc-400 pl-11">${spec.desc[this.lang]}</p>
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Auto-apply spec on init
rpg._applySpec = function() {
  if (!this.classSpec) return;
  const allSpecs = Object.values(this.CLASS_SPECS).flat();
  const spec = allSpecs.find(s => s.id === this.classSpec);
  if (spec) spec.apply(this);
};

// Auto-poison spec








// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SAVE/INIT PATCHES ────────────────────────────────
// ═══════════════════════════════════════════════════════════════



























// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SISTEMA DE FORMAÇÕES ─────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.activeFormation = localStorage.getItem("rpg_formation") || "balanced";

rpg.FORMATIONS = [
  {
    id: "balanced",
    name: { pt: "⚖ Equilíbrio",   en: "⚖ Balance"    },
    desc: { pt: "Stats padrão. Nenhum bônus ou penalidade.", en: "Default stats. No bonus or penalty." },
    color: "text-zinc-400", border: "border-zinc-700",
    atkMult:1.0, hpMult:1.0, cdMult:1.0, dodgeMult:1.0,
  },
  {
    id: "assault",
    name: { pt: "⚔ Assalto",       en: "⚔ Assault"    },
    desc: { pt: "+35% ATK, -20% HP. Pressiona sem parar.", en: "+35% ATK, -20% HP. Press relentlessly." },
    color: "text-red-400",  border: "border-red-800",
    atkMult:1.35, hpMult:0.80, cdMult:1.0, dodgeMult:1.0,
  },
  {
    id: "fortress",
    name: { pt: "🏰 Fortaleza",     en: "🏰 Fortress"  },
    desc: { pt: "+40% HP, -25% ATK. Aguenta tudo.", en: "+40% HP, -25% ATK. Withstand everything." },
    color: "text-blue-400", border: "border-blue-800",
    atkMult:0.75, hpMult:1.40, cdMult:1.0, dodgeMult:1.0,
  },
  {
    id: "shadow",
    name: { pt: "🌑 Sombra",        en: "🌑 Shadow"    },
    desc: { pt: "+25% Esquiva e Crit. Nunca és atingido.", en: "+25% Dodge & Crit. Never get hit." },
    color: "text-purple-400", border: "border-purple-800",
    atkMult:1.0, hpMult:0.90, cdMult:1.0, dodgeMult:1.25, critBonus:0.25,
  },
  {
    id: "berserker",
    name: { pt: "💢 Berserk",       en: "💢 Berserk"   },
    desc: { pt: "+60% ATK, -40% HP, -30% CDs. Dano puro.", en: "+60% ATK, -40% HP, -30% CDs. Pure damage." },
    color: "text-rose-400", border: "border-rose-800",
    atkMult:1.60, hpMult:0.60, cdMult:0.70, dodgeMult:1.0,
  },
  {
    id: "arcane",
    name: { pt: "🌀 Arcano",        en: "🌀 Arcane"    },
    desc: { pt: "Magia +100%, Ataque -30%. Domínio mágico.", en: "Magic +100%, Attack -30%. Magic supremacy." },
    color: "text-violet-400", border: "border-violet-800",
    atkMult:0.70, hpMult:1.0, cdMult:1.0, dodgeMult:1.0, magicMult:2.0,
  },
  {
    id: "chaos",
    name: { pt: "🎲 Caos",          en: "🎲 Chaos"     },
    desc: { pt: "Stats aleatórios a cada batalha (+/-50%).", en: "Random stats each battle (+/-50%)." },
    color: "text-amber-400", border: "border-amber-800",
    atkMult:1.0, hpMult:1.0, cdMult:1.0, dodgeMult:1.0, chaosMode:true,
  },
];

rpg.getFormation = function() {
  return this.FORMATIONS.find(f => f.id === this.activeFormation) || this.FORMATIONS[0];
};

rpg.setFormation = function(id) {
  this.activeFormation = id;
  localStorage.setItem("rpg_formation", id);
  this.save();
  this.updateUI();
  const f = this.getFormation();
  showToast("⚔ Formação: " + f.name[this.lang], 2000);
  this.renderFormations();
};

rpg.renderFormations = function() {
  const el = document.getElementById("formation-body");
  if (!el) return;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Define o teu estilo de combate antes da batalha</p>
  <div class="space-y-2">` +
  this.FORMATIONS.map(f => {
    const active = this.activeFormation === f.id;
    return `<button onclick="rpg.setFormation('${f.id}')" class="w-full text-left p-3 rounded-xl border ${active ? f.border+" bg-zinc-900/80 shadow-lg" : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"} transition-all">
      <div class="flex items-center justify-between">
        <p class="text-sm font-black ${active ? f.color : "text-zinc-300"}">${f.name[this.lang]}</p>
        ${active ? '<span class="text-xs text-emerald-400 font-black">ATIVO ✓</span>' : ""}
      </div>
      <p class="text-[9px] text-zinc-500 mt-1">${f.desc[this.lang]}</p>
    </button>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Apply formation to stats
































// Formation: arcane magic boost













// Formation: CD reduction
















// ═══════════════════════════════════════════════════════════════
// ── v21.0 — MASMORRAS PROCEDURAIS ────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.procDungeon = null;       // current dungeon state
rpg.procDungeonFloor = 0;
rpg.procDungeonActive = false;
rpg.procDungeonStats  = { cleared: 0, bestFloors: 0 };

rpg.PROC_ROOM_TYPES = [
  { id: "combat",   weight: 40, icon: "⚔",  label: { pt: "Sala de Combate",    en: "Combat Room"     } },
  { id: "treasure", weight: 15, icon: "💰",  label: { pt: "Sala do Tesouro",    en: "Treasure Room"   } },
  { id: "rest",     weight: 15, icon: "🛌",  label: { pt: "Sala de Descanso",   en: "Rest Room"       } },
  { id: "shop",     weight: 10, icon: "🏪",  label: { pt: "Loja Secreta",       en: "Secret Shop"     } },
  { id: "trap",     weight: 10, icon: "💀",  label: { pt: "Sala Armadilha",     en: "Trap Room"       } },
  { id: "miniboss", weight: 10, icon: "👹",  label: { pt: "Mini-Boss",          en: "Mini-Boss"       } },
];

rpg.generateProcDungeon = function(floors) {
  const totalWeight = this.PROC_ROOM_TYPES.reduce((s,r)=>s+r.weight,0);
  const rooms = [];
  for (let i = 0; i < floors; i++) {
    let r = Math.random() * totalWeight;
    let type = this.PROC_ROOM_TYPES[0];
    for (const rt of this.PROC_ROOM_TYPES) { r -= rt.weight; if (r <= 0) { type = rt; break; } }
    // Force last room to be miniboss
    if (i === floors-1) type = this.PROC_ROOM_TYPES.find(r=>r.id==="miniboss");
    rooms.push({ ...type, completed: false });
  }
  return { rooms, floors, gold: 0, blessings: 0 };
};

rpg.startProcDungeon = function(floors) {
  this.procDungeon = this.generateProcDungeon(floors || 7);
  this.procDungeonFloor = 0;
  this.procDungeonActive = true;
  closeModal("procdungeon-modal");
  showToast("🏰 Masmorra (" + (floors||7) + " andares) iniciada!", 3000);
  this.enterNextProcRoom();
};

rpg.enterNextProcRoom = function() {
  if (!this.procDungeon) return;
  const room = this.procDungeon.rooms[this.procDungeonFloor];
  if (!room) { this.completeProcDungeon(); return; }
  switch (room.id) {
    case "combat":
    case "miniboss":
      this.openPreBattle(room.id === "miniboss");
      break;
    case "treasure":
      const gold = Math.floor(this.level * 300 * (1 + this.procDungeonFloor * 0.2));
      const pots = Math.floor(2 + this.procDungeonFloor * 0.5);
      this.gold += gold; this.potions += pots;
      this.procDungeon.gold += gold;
      showToast("💰 Tesouro! +" + formatNumber(gold) + " 💰 +" + pots + " 🧪", 4000);
      this.procDungeonFloor++;
      setTimeout(() => this.enterNextProcRoom(), 1000);
      break;
    case "rest":
      this.heroHp = this.getMaxHp();
      this.potions += 3;
      showToast("🛌 Descansaste! HP cheio +3 Poções", 3000);
      this.procDungeonFloor++;
      setTimeout(() => this.enterNextProcRoom(), 1000);
      break;
    case "trap":
      const dmg = Math.floor(this.getMaxHp() * 0.25);
      this.heroHp = Math.max(1, this.heroHp - dmg);
      this.updateHpBars();
      showToast("💀 Armadilha! -" + formatNumber(dmg) + " HP!", 3000);
      this.procDungeonFloor++;
      setTimeout(() => this.enterNextProcRoom(), 1000);
      break;
    case "shop":
      showToast("🏪 Loja Secreta! 20% desconto neste andar.", 3000);
      this._procShopDiscount = 0.20;
      openShop();
      // Continue after closing shop
      break;
  }
};

rpg.completeProcDungeon = function() {
  this.procDungeonActive = false;
  this.procDungeonStats.cleared++;
  const total = this.procDungeon.floors;
  if (total > this.procDungeonStats.bestFloors) this.procDungeonStats.bestFloors = total;
  const reward = Math.floor(this.level * 1000 * (1 + total * 0.1));
  const talentReward = Math.floor(total / 3);
  this.gold += reward;
  this.talentPoints = (this.talentPoints||0) + talentReward;
  localStorage.setItem("rpg_talent_pts", this.talentPoints);
  showToast("🏆 Masmorra Completa! +" + formatNumber(reward) + " 💰 +" + talentReward + " ✨", 6000);
  this.addHonor(total * 5);
  this.save(); this.updateUI();
};

rpg.renderProcDungeon = function() {
  const el = document.getElementById("procdungeon-body");
  if (!el) return;
  el.innerHTML = `<div class="space-y-4">
    <div class="grid grid-cols-2 gap-2">
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 text-center">
        <p class="text-2xl font-black text-emerald-400">${this.procDungeonStats.cleared}</p>
        <p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Completas</p>
      </div>
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 text-center">
        <p class="text-2xl font-black text-amber-400">${this.procDungeonStats.bestFloors}</p>
        <p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Melhor</p>
      </div>
    </div>
    <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-400 space-y-1.5">
      <p>🎲 <strong class="text-zinc-200">Salas aleatórias</strong> — combate, tesouro, descanso, loja, armadilha, mini-boss.</p>
      <p>🏆 <strong class="text-zinc-200">Recompensas</strong> crescem com o tamanho da masmorra.</p>
      <p>✨ <strong class="text-zinc-200">Pontos de Talento</strong> ganhos ao completar.</p>
    </div>
    <div class="space-y-2">
      ${[5,7,10].map(floors => `
        <button onclick="rpg.startProcDungeon(${floors})" class="btn-3d w-full py-3 rounded-xl ${floors===5?"bg-gradient-to-r from-emerald-800 to-emerald-700 border border-emerald-600":floors===7?"bg-gradient-to-r from-amber-800 to-amber-700 border border-amber-600":"bg-gradient-to-r from-red-800 to-red-700 border border-red-600"} text-white font-black uppercase tracking-wider text-sm">
          ${floors===5?"🟢":floors===7?"🟡":"🔴"} ${floors} Andares — ${floors===5?"Fácil":floors===7?"Médio":"Difícil"}
        </button>`).join("")}
    </div>
  </div>`;
  lucide.createIcons();
};

// Patch killMonster to advance proc dungeon















// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SKIN DE INTERFACE POR TEMA (HUD COLORS) ──────────
// ═══════════════════════════════════════════════════════════════

rpg.THEME_HUD_SKINS = {
  "t_ruins":      { hp:"from-emerald-600 to-emerald-400",  fury:"from-orange-600 to-yellow-500",  atb:"bg-cyan-500",     btn1:"from-red-700 to-red-900",       btn2:"from-purple-700 to-purple-900"  },
  "t_volcano":    { hp:"from-red-600 to-orange-500",        fury:"from-red-700 to-red-500",        atb:"bg-orange-400",   btn1:"from-orange-700 to-red-900",    btn2:"from-red-700 to-rose-900"       },
  "t_cave":       { hp:"from-purple-600 to-purple-400",     fury:"from-violet-600 to-purple-500",  atb:"bg-purple-400",   btn1:"from-violet-700 to-purple-900", btn2:"from-indigo-700 to-purple-900"  },
  "t_matrix":     { hp:"from-emerald-500 to-green-400",     fury:"from-green-600 to-emerald-500",  atb:"bg-emerald-400",  btn1:"from-emerald-700 to-green-900", btn2:"from-green-700 to-emerald-900"  },
  "t_quantum":    { hp:"from-violet-600 to-purple-400",     fury:"from-purple-600 to-fuchsia-500", atb:"bg-violet-400",   btn1:"from-violet-700 to-purple-900", btn2:"from-fuchsia-700 to-violet-900" },
  "t_neon":       { hp:"from-sky-500 to-cyan-400",          fury:"from-blue-600 to-cyan-500",      atb:"bg-sky-400",      btn1:"from-sky-700 to-blue-900",      btn2:"from-blue-700 to-cyan-900"      },
  "t_end":        { hp:"from-rose-600 to-red-400",          fury:"from-rose-700 to-pink-500",      atb:"bg-rose-400",     btn1:"from-rose-700 to-red-900",      btn2:"from-pink-700 to-rose-900"      },
};

rpg.applyHudSkin = function() {
  const skin = this.THEME_HUD_SKINS[this.eqTheme];
  if (!skin) return;
  const hp = document.getElementById("hero-hp-bar");
  const fury = document.getElementById("hero-fury-bar");
  const atb  = document.getElementById("monster-atb-bar");
  // FIX: preserva o style.width inline ao trocar className
  // Antes o className resetava a barra para 100% visualmente
  if (hp) {
    const savedWidth = hp.style.width; // guarda largura atual
    hp.className = `bg-gradient-to-r ${skin.hp} h-full transition-all duration-300`;
    if (savedWidth) hp.style.width = savedWidth; // restaura
  }
  if (fury) fury.className = `bg-gradient-to-r ${skin.fury} h-full transition-all duration-300`;
  if (atb && !atb.classList.contains("bg-red-500")) atb.className = `${skin.atb} h-full shadow-[0_0_5px_current]`;
};

// Patch updateTheme
const _skinUpdateTheme = rpg.updateTheme.bind(rpg);
rpg.updateTheme = function() {
  _skinUpdateTheme();
  this.applyHudSkin();
};

// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SISTEMA DE COMBOS CONDICIONAIS (SKILL CHAINS) ────
// ═══════════════════════════════════════════════════════════════

rpg.skillChainBuffer = []; // últimas 3 skills usadas
rpg.skillChainCooldown = false;

rpg.SKILL_CHAINS = [
  {
    id: "chain_blade_magic",
    sequence: ["atk","mag","atk"],
    name: { pt: "⚡ Lâmina Arcana", en: "⚡ Arcane Blade" },
    desc: { pt: "ATK→MAG→ATK: contra-ataque automático com 3x dano", en: "ATK→MAG→ATK: auto counter with 3x damage" },
    effect: s => {
      if (!s.monster || s.monster.hp <= 0) return;
      setTimeout(() => {
        s.showDamage("⚡ LÂMINA ARCANA!", "dmg-crit");
        s.dealDamageToMonster(s.getAtk()*3, "mag", true);
      }, 200);
    }
  },
  {
    id: "chain_iron_wall",
    sequence: ["def","def","heal"],
    name: { pt: "🛡 Muralha de Ferro", en: "🛡 Iron Wall" },
    desc: { pt: "DEF→DEF→HEAL: cura total + escudo 4s", en: "DEF→DEF→HEAL: full heal + 4s shield" },
    effect: s => {
      s.heroHp = s.getMaxHp();
      s.isDefending = true;
      showToast("🛡 Muralha de Ferro! HP cheio + Escudo 4s", 3000);
      setTimeout(() => { s.isDefending = false; }, 4000);
    }
  },
  {
    id: "chain_chaos_burst",
    sequence: ["atk","atk","mag"],
    name: { pt: "💥 Explosão do Caos", en: "💥 Chaos Burst" },
    desc: { pt: "ATK→ATK→MAG: explosão de 5x dano + Queimado", en: "ATK→ATK→MAG: 5x damage explosion + Burn" },
    effect: s => {
      if (!s.monster || s.monster.hp <= 0) return;
      setTimeout(() => {
        s.showDamage("💥 CAOS!", "dmg-crit");
        s.dealDamageToMonster(s.getAtk()*5, "fire", true);
        s.applyStatus("burn");
      }, 200);
    }
  },
  {
    id: "chain_phantom",
    sequence: ["def","atk","def"],
    name: { pt: "👻 Golpe Fantasma", en: "👻 Phantom Strike" },
    desc: { pt: "DEF→ATK→DEF: ataque invisível, ignora dodge e block", en: "DEF→ATK→DEF: invisible strike, ignores dodge & block" },
    effect: s => {
      if (!s.monster || s.monster.hp <= 0) return;
      const savedDodge = s.monster.dodge, savedBlock = s.monster.block;
      s.monster.dodge = 0; s.monster.block = 0;
      setTimeout(() => {
        s.showDamage("👻 FANTASMA!", "dmg-effective");
        s.dealDamageToMonster(s.getAtk()*2.5, "atk", false);
        s.monster.dodge = savedDodge; s.monster.block = savedBlock;
      }, 200);
    }
  },
  {
    id: "chain_supreme_fury",
    sequence: ["mag","mag","atk"],
    name: { pt: "🔥 Fúria Suprema", en: "🔥 Supreme Fury" },
    desc: { pt: "MAG→MAG→ATK: Fúria instantaneamente cheia", en: "MAG→MAG→ATK: Instantly fills Fury bar" },
    effect: s => {
      s.fury = 100;
      s.addFury(0);
      showToast("🔥 Fúria Suprema! Barra cheia!", 2000);
    }
  },
];

rpg.checkSkillChain = function(skillId) {
  this.skillChainBuffer.push(skillId);
  if (this.skillChainBuffer.length > 3) this.skillChainBuffer.shift();
  if (this.skillChainCooldown) return;
  const buf = this.skillChainBuffer;
  for (const chain of this.SKILL_CHAINS) {
    const seq = chain.sequence;
    if (buf.length >= seq.length) {
      const slice = buf.slice(buf.length - seq.length);
      if (seq.every((s,i) => s === slice[i])) {
        this.skillChainCooldown = true;
        showToast("⚡ CHAIN: " + chain.name[this.lang] + "!", 3000);
        chain.effect(this);
        this.skillChainBuffer = [];
        setTimeout(() => { this.skillChainCooldown = false; }, 5000);
        return;
      }
    }
  }
};

// Patch useSkill to track chains






// Render skill chains info
rpg.renderSkillChains = function() {
  const el = document.getElementById("chains-body");
  if (!el) return;
  const buf = this.skillChainBuffer;
  const names = { atk: "ATK", mag: "MAG", def: "DEF", heal: "HEAL" };
  el.innerHTML = `
    <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 mb-3">
      <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Buffer Atual</p>
      <div class="flex gap-1.5">${buf.length ? buf.map(s=>`<span class="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs font-black text-zinc-300">${names[s]||s}</span>`).join(""):"<span class='text-zinc-600 text-xs'>Vazio</span>"}</div>
    </div>
    <div class="space-y-2">` +
    this.SKILL_CHAINS.map(chain => `
      <div class="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl">
        <div class="flex items-center gap-2 mb-1">
          <p class="text-xs font-black text-zinc-200 flex-1">${chain.name[this.lang]}</p>
          <div class="flex gap-1">${chain.sequence.map(s=>`<span class="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[8px] font-black text-zinc-400">${names[s]}</span>`).join('<span class="text-zinc-600 text-[8px]">→</span>')}</div>
        </div>
        <p class="text-[8px] text-zinc-500 leading-tight">${chain.desc[this.lang]}</p>
      </div>`).join("") + `</div>`;
  lucide.createIcons();
};

// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SISTEMA DE LEGADO (HEIRLOOM) ─────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.heirlooms = JSON.parse(localStorage.getItem("rpg_heirlooms") || "[]"); // max 3 item ids
rpg.heirloomBonuses = {}; // itemId → bonus object

rpg.addHeirloom = function(itemId) {
  if (this.heirlooms.includes(itemId)) { showToast("Este item já é um Legado."); return; }
  if (this.heirlooms.length >= 3) { showToast("Máximo 3 Legados! Remove um primeiro."); return; }
  // find item in weapons/armors
  const allItems = [...this.weapons, ...this.armors];
  const item = allItems.find(i => i.id === itemId);
  if (!item) return;
  this.heirlooms.push(itemId);
  localStorage.setItem("rpg_heirlooms", JSON.stringify(this.heirlooms));
  this.save();
  showToast("💎 Legado criado: " + item.name[this.lang] + "! Passará para a próxima vida.", 4000);
  this.renderHeirlooms();
};

rpg.removeHeirloom = function(itemId) {
  this.heirlooms = this.heirlooms.filter(h => h !== itemId);
  localStorage.setItem("rpg_heirlooms", JSON.stringify(this.heirlooms));
  this.save();
  this.renderHeirlooms();
};

rpg.renderHeirlooms = function() {
  const el = document.getElementById("heirloom-body");
  if (!el) return;
  const allItems = [...this.weapons, ...this.armors];
  const owned = allItems.filter(i => this.inventory.includes(i.id) && !this.heirlooms.includes(i.id));
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Ao fazer Prestígio, os Legados passam para a próxima vida com stats reduzidos em 50%</p>
  <div class="space-y-2 mb-4">
    <p class="text-[9px] font-black text-amber-400 uppercase tracking-widest">Legados Ativos (${this.heirlooms.length}/3)</p>
    ${this.heirlooms.length === 0 ? '<p class="text-zinc-600 text-xs text-center py-2">Nenhum legado definido.</p>' :
      this.heirlooms.map(id => {
        const item = allItems.find(i=>i.id===id);
        if (!item) return "";
        return `<div class="flex items-center gap-3 p-2.5 rounded-xl border border-amber-700/40 bg-amber-950/10">
          <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${item.icon}" class="w-4 h-4 text-amber-400"></i></div>
          <div class="flex-1"><p class="text-xs font-black text-zinc-200">${item.name[this.lang]}</p><p class="text-[8px] text-amber-600">Legado — passará para próxima vida</p></div>
          <button onclick="rpg.removeHeirloom('${id}')" class="px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-lg text-[9px] font-bold hover:text-red-400 transition">✕</button>
        </div>`;
      }).join("")
    }
  </div>
  <div class="space-y-1.5">
    <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Definir Legado</p>
    ${owned.slice(0,10).map(item => `
      <div class="flex items-center gap-3 p-2 rounded-xl border border-zinc-800 bg-zinc-950/60">
        <div class="p-1.5 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${item.icon}" class="w-4 h-4 text-zinc-400"></i></div>
        <div class="flex-1"><p class="text-xs font-black text-zinc-300">${item.name[this.lang]}</p></div>
        <button onclick="rpg.addHeirloom('${item.id}')" class="${this.heirlooms.length<3?"bg-amber-700 hover:bg-amber-600 border border-amber-600":"bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"} text-white px-2 py-1 rounded-lg text-[9px] font-black transition">💎 Definir</button>
      </div>`).join("")}
  </div>`;
  lucide.createIcons();
};

// Apply heirloom bonuses on prestige (called from prestige function if available)
rpg.applyHeirloomBonuses = function() {
  // After prestige, heirloom items start available at half forge level
  this.heirlooms.forEach(id => {
    const fl = this.getForgeLevel(id);
    if (fl > 0) {
      this.forgeUpgrades[id] = Math.max(1, Math.floor(fl * 0.5));
    }
    // Add to inventory if not present
    if (!this.inventory.includes(id)) this.inventory.push(id);
  });
};

// ═══════════════════════════════════════════════════════════════
// ── v21.0 — DIÁRIO DO HERÓI ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.heroDiary = JSON.parse(localStorage.getItem("rpg_diary") || "[]");

rpg.DIARY_TRIGGERS = [
  { id:"d_start",   cond:s=>s.kills>=1,          entry:{ pt:"Primeiro sangue derramado. Esta masmorra... não é o que eu esperava.", en:"First blood spilled. This dungeon... isn't what I expected." } },
  { id:"d_boss1",   cond:s=>s.bossKills>=1,       entry:{ pt:"Derrubei o primeiro Guardião. O universo tremeu. Eu não.", en:"I brought down the first Guardian. The universe trembled. I did not." } },
  { id:"d_lvl10",   cond:s=>s.level>=10,          entry:{ pt:"Nível 10. Começo a entender este lugar. As equações têm alma.", en:"Level 10. I'm starting to understand this place. Equations have a soul." } },
  { id:"d_lvl50",   cond:s=>s.level>=50,          entry:{ pt:"50 níveis de evolução. Quem sou agora? O herói que chegou? Ou algo mais?", en:"50 levels of evolution. Who am I now? The hero who arrived? Or something more?" } },
  { id:"d_prestige",cond:s=>s.prestigeLevel>=1,   entry:{ pt:"Renasci. A memória persiste, mas o corpo é novo. Algoritma reconhece-me.", en:"Reborn. The memory persists, but the body is new. Algoritma recognizes me." } },
  { id:"d_boss5",   cond:s=>s.bossKills>=5,       entry:{ pt:"Cinco Guardiões mortos. A cidade fala em mim. Que peso.", en:"Five Guardians dead. The city speaks of me. What a burden." } },
  { id:"d_lvl100",  cond:s=>s.level>=100,         entry:{ pt:"Centurião. Antes de começar, não acreditava que chegaria aqui.", en:"Centurion. Before I started, I didn't believe I'd make it here." } },
  { id:"d_wave10",  cond:s=>s.bestWave>=10,       entry:{ pt:"10 ondas sobrevividas. O caos tem ritmo. Aprendo a dançar com ele.", en:"10 waves survived. Chaos has rhythm. I'm learning to dance with it." } },
  { id:"d_boss10",  cond:s=>s.bossKills>=10,      entry:{ pt:"Dez Guardiões. Este mundo foi construído para me testar. Suspeito que estou a ganhar.", en:"Ten Guardians. This world was built to test me. I suspect I'm winning." } },
  { id:"d_quantum", cond:s=>s.bossKills>=14,      entry:{ pt:"O Núcleo Quântico caiu. Nunca me senti tão vazio. E tão completo.", en:"The Quantum Core fell. I've never felt so empty. And so complete." } },
  { id:"d_lvl500",  cond:s=>s.level>=500,         entry:{ pt:"500 níveis. Já não sou mortal. Sou uma equação com vontade própria.", en:"500 levels. I'm no longer mortal. I am an equation with its own will." } },
  { id:"d_protocol",cond:s=>s.bossKills>=18,      entry:{ pt:"O Protocolo caiu. E eu ainda estou aqui. Talvez... eu seja o próximo protocolo.", en:"The Protocol fell. And I'm still here. Perhaps... I am the next protocol." } },
];

rpg.checkDiaryTriggers = function() {
  this.DIARY_TRIGGERS.forEach(trigger => {
    if (!this.heroDiary.some(e=>e.id===trigger.id) && trigger.cond(this)) {
      const entry = { id:trigger.id, text:trigger.entry[this.lang], date:new Date().toLocaleDateString("pt-PT"), timestamp:Date.now() };
      this.heroDiary.unshift(entry);
      localStorage.setItem("rpg_diary", JSON.stringify(this.heroDiary));
      showToast("📔 Nova entrada no Diário!", 2500);
    }
  });
};

rpg.renderDiary = function() {
  const el = document.getElementById("diary-body");
  if (!el) return;
  if (this.heroDiary.length === 0) {
    el.innerHTML = `<div class="text-center py-8"><p class="text-4xl mb-3">📔</p><p class="text-zinc-500 text-sm">O diário está vazio.<br><span class="text-xs text-zinc-600">As aventuras escreverão as suas próprias páginas.</span></p></div>`;
    return;
  }
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">${this.heroDiary.length} / ${this.DIARY_TRIGGERS.length} entradas</p>
  <div class="space-y-3">` +
  this.heroDiary.map((entry, i) => `
    <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
      <p class="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1 pl-2">Entrada ${this.heroDiary.length-i} · ${entry.date}</p>
      <p class="text-xs text-zinc-300 italic leading-relaxed pl-2">"${entry.text}"</p>
    </div>`).join("") + `</div>`;
};

// Trigger diary checks

// ═══════════════════════════════════════════════════════════════
// ── v21.0 — NOVO MODO: TORNEIO SEMANAL ───────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.tournamentScore   = parseInt(localStorage.getItem("rpg_tourn_score")  || "0");
rpg.tournamentWeek    = localStorage.getItem("rpg_tourn_week") || "";
rpg.tournamentActive  = false;
rpg.tournamentDmgDone = 0;

rpg.getTournamentWeek = function() {
  const d = new Date();
  return d.getFullYear() + "-W" + Math.floor(d.getDate()/7);
};

rpg.renderTournament = function() {
  const el = document.getElementById("tournament-body");
  if (!el) return;
  const week = this.getTournamentWeek();
  const isNew = this.tournamentWeek !== week;
  // Weekly boss — stats based on week seed
  const seed = week.split("").reduce((a,b)=>a+b.charCodeAt(0),0);
  const bossNames = ["Régulo do Caos","Entidade Binária","Algoritmo Sombra","Nexus Supremo","Axioma Final"];
  const bossIcons = ["skull","cpu","atom","infinity","zap"];
  const bossName = bossNames[seed % bossNames.length];
  const bossIcon = bossIcons[seed % bossIcons.length];
  const bossHpMult = 1 + (seed % 5) * 0.5;

  el.innerHTML = `<div class="space-y-3">
    <div class="bg-zinc-950/80 border border-amber-800/40 rounded-xl p-4 text-center">
      <p class="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1">Boss da Semana</p>
      <i data-lucide="${bossIcon}" class="w-10 h-10 text-amber-400 mx-auto mb-2"></i>
      <p class="text-xl font-black text-white">${bossName}</p>
      <p class="text-[9px] text-zinc-500 mt-1">HP: ${bossHpMult.toFixed(1)}× · Stats base iguais para todos</p>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 text-center">
        <p class="text-2xl font-black text-amber-400">${formatNumber(this.tournamentScore)}</p>
        <p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Melhor Dano</p>
      </div>
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 text-center">
        <p class="text-2xl font-black text-emerald-400">${isNew ? "Novo!" : "Esta semana"}</p>
        <p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Semana</p>
      </div>
    </div>
    <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-400 space-y-1">
      <p>⚔ <strong class="text-zinc-200">Causa o máximo de dano</strong> ao boss da semana.</p>
      <p>🏆 O teu melhor resultado fica guardado.</p>
      <p>🏅 Recebe Honra baseada no dano causado.</p>
    </div>
    <button onclick="rpg.startTournament()" class="btn-3d w-full py-3 bg-gradient-to-r from-amber-700 to-yellow-700 border border-amber-600 text-white font-black rounded-xl uppercase tracking-wider">⚔ Combater no Torneio</button>
  </div>`;
  lucide.createIcons();
};

rpg.startTournament = function() {
  this.tournamentActive = true;
  this.tournamentDmgDone = 0;
  closeModal("tournament-modal");
  this.openPreBattle(true);
  showToast("⚔ Torneio iniciado! Causa o máximo de dano!", 3000);
};

// Track tournament damage








// On boss kill during tournament



















// ═══════════════════════════════════════════════════════════════
// ── v21.0 — NOVAS IDEIAS: BIBLIOTECA DE HABILIDADES ──────────
// ═══════════════════════════════════════════════════════════════
// Coleciona "Memórias de Habilidade" ao derrotar bosses específicos.
// Cada memória concede um efeito permanente único e único sabor narrativo.

rpg.skillMemories = JSON.parse(localStorage.getItem("rpg_skill_memories") || "[]");

rpg.SKILL_MEMORIES = [
  { id:"sm_chaos",   fromBoss:"boss_1",  icon:"triangle-alert", color:"text-red-400",    name:{pt:"Memória do Caos",         en:"Memory of Chaos"        }, effect:{pt:"+5% ATK, Fúria+20% mais rápida",    en:"+5% ATK, Fury 20% faster"     }, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+0.05;} },
  { id:"sm_cosmic",  fromBoss:"boss_2",  icon:"moon",           color:"text-purple-400", name:{pt:"Memória Cósmica",          en:"Cosmic Memory"          }, effect:{pt:"+5% Crit chance",                     en:"+5% Crit chance"              }, apply:s=>{s.permCritBonus=(s.permCritBonus||0)+0.05;} },
  { id:"sm_void",    fromBoss:"boss_3",  icon:"infinity",       color:"text-blue-400",   name:{pt:"Memória do Vazio",         en:"Memory of the Void"     }, effect:{pt:"+8% Esquiva",                         en:"+8% Dodge"                    }, apply:s=>{s.permDodgeBonus=(s.permDodgeBonus||0)+0.08;} },
  { id:"sm_virus",   fromBoss:"boss_4",  icon:"cpu",            color:"text-emerald-400",name:{pt:"Memória Viral",            en:"Viral Memory"           }, effect:{pt:"+10% Ouro",                           en:"+10% Gold"                    }, apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+0.10;} },
  { id:"sm_compile", fromBoss:"boss_7",  icon:"terminal-square",color:"text-green-400",  name:{pt:"Memória do Compilador",    en:"Compiler Memory"        }, effect:{pt:"+15% XP",                             en:"+15% XP"                      }, apply:s=>{s.permXpBonus=(s.permXpBonus||0)+0.15;} },
  { id:"sm_entropy", fromBoss:"boss_11", icon:"triangle-alert", color:"text-rose-400",   name:{pt:"Memória da Entropia",      en:"Entropy Memory"         }, effect:{pt:"+10% todos stats",                    en:"+10% all stats"               }, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.10;} },
  { id:"sm_quantum", fromBoss:"boss_15", icon:"atom",           color:"text-violet-400", name:{pt:"Memória Quântica",         en:"Quantum Memory"         }, effect:{pt:"+25% todos stats",                    en:"+25% all stats"               }, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.25;} },
  { id:"sm_protocol",fromBoss:"boss_19", icon:"binary",         color:"text-pink-400",   name:{pt:"Memória do Protocolo",     en:"Protocol Memory"        }, effect:{pt:"+50% todos stats",                    en:"+50% all stats"               }, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.50;} },
];

rpg.checkSkillMemories = function() {
  if (!this.monster || !this.isBossFight) return;
  const bossId = this.actBosses[this.bossKills - 1]?.id;
  if (!bossId) return;
  const memory = this.SKILL_MEMORIES.find(m => m.fromBoss === bossId && !this.skillMemories.includes(m.id));
  if (memory) {
    this.skillMemories.push(memory.id);
    memory.apply(this);
    localStorage.setItem("rpg_skill_memories", JSON.stringify(this.skillMemories));
    setTimeout(() => showToast("✨ Memória de Habilidade obtida: " + memory.name[this.lang] + "! " + memory.effect[this.lang], 5000), 1000);
  }
};

rpg.renderSkillMemories = function() {
  const el = document.getElementById("memories-body");
  if (!el) return;
  const done = this.skillMemories.length;
  const total = this.SKILL_MEMORIES.length;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">${done} / ${total} Memórias</p>
  <div class="space-y-2">` +
  this.SKILL_MEMORIES.map(m => {
    const owned = this.skillMemories.includes(m.id);
    const bossIdx = this.actBosses.findIndex(b=>b.id===m.fromBoss);
    const bossName = bossIdx>=0 ? this.actBosses[bossIdx].name[this.lang] : "?";
    return `<div class="flex items-center gap-3 p-2.5 rounded-xl border ${owned?"border-violet-700/50 bg-violet-950/20":"border-zinc-800 bg-zinc-950/60 opacity-40 grayscale"}">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${m.icon}" class="w-4 h-4 ${m.color}"></i></div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-black text-zinc-200">${m.name[this.lang]}</p>
        <p class="text-[8px] text-zinc-500">De: ${bossName}</p>
        <p class="text-[8px] text-violet-400 font-bold mt-0.5">${m.effect[this.lang]}</p>
      </div>
      ${owned ? '<span class="text-emerald-400 text-lg">✓</span>' : '<span class="text-zinc-700">🔒</span>'}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Trigger memory check on boss kill






// ═══════════════════════════════════════════════════════════════
// ── v21.0 — SAVE/INIT PATCHES ────────────────────────────────
// ═══════════════════════════════════════════════════════════════




































// ═══════════════════════════════════════════════════════════════
// ── v17.0 — SISTEMA DE ELEMENTOS ────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.elementChart = {
  fire:    { weak: "water",  resist: "earth",  absorb: "fire",   emoji: "🔥", color: "text-orange-400", label: { pt: "Fogo",    en: "Fire"    } },
  water:   { weak: "thunder",resist: "fire",   absorb: "water",  emoji: "💧", color: "text-blue-400",   label: { pt: "Água",    en: "Water"   } },
  thunder: { weak: "earth",  resist: "water",  absorb: "thunder",emoji: "⚡", color: "text-yellow-300", label: { pt: "Raio",    en: "Thunder" } },
  earth:   { weak: "fire",   resist: "thunder",absorb: "earth",  emoji: "🌿", color: "text-green-400",  label: { pt: "Terra",   en: "Earth"   } },
  ice:     { weak: "fire",   resist: "ice",    absorb: "ice",    emoji: "❄️", color: "text-cyan-300",   label: { pt: "Gelo",    en: "Ice"     } },
  void:    { weak: "holy",   resist: "all",    absorb: "void",   emoji: "🌀", color: "text-purple-400", label: { pt: "Vazio",   en: "Void"    } },
  holy:    { weak: "void",   resist: "none",   absorb: "holy",   emoji: "🌟", color: "text-yellow-100", label: { pt: "Sagrado", en: "Holy"    } },
  none:    { weak: "none",   resist: "none",   absorb: "none",   emoji: "⚔️", color: "text-zinc-400",   label: { pt: "Neutro",  en: "Neutral" } },
};

// Atribui elemento a classes para a 5ª skill
rpg.classElements = {
  warrior: "earth", mage: "fire", rogue: "void", paladin: "holy",
  cyber_ninja: "thunder", netrunner: "thunder", stellar_templar: "holy",
  chrono_mancer: "ice", omniscient: "void", sys_admin: "thunder",
  the_architect: "void", hardware_virus: "fire", the_theorem: "earth",
  avatar_chaos: "void", system_god: "holy", quantum_entity: "void",
  last_hero: "holy", quantum_sovereign: "void", pass_master: "void", end_herald: "holy",
};

// Combos elementais: [elem1, elem2] => reação
rpg.elementReactions = [
  { pair: ["fire","ice"],     name: { pt: "❄🔥 Colapso!",    en: "❄🔥 Collapse!" },   mult: 3.0, breakShield: true  },
  { pair: ["water","thunder"],name: { pt: "⚡💧 Condução!",  en: "⚡💧 Conduction!" }, mult: 2.5, breakShield: false },
  { pair: ["earth","fire"],   name: { pt: "💥 Erupção!",      en: "💥 Eruption!"    },  mult: 2.0, status: "burn"     },
  { pair: ["holy","void"],    name: { pt: "🌟 Purificação!",  en: "🌟 Purification!"},  mult: 1.0, heal: 0.15        },
  { pair: ["void","fire"],    name: { pt: "🌀 Aniquilação!",  en: "🌀 Annihilation!"},  mult: 4.0, breakShield: true  },
];

rpg.lastElement = null; // rastreia último elemento usado para combo

rpg.getElementDamageMultiplier = function(atkElem, monsterElem) {
  if (!atkElem || atkElem === "none" || !monsterElem || monsterElem === "none") return { mult: 1, msg: null };
  const chart = this.elementChart[monsterElem];
  if (!chart) return { mult: 1, msg: null };
  if (monsterElem === "void" && chart.resist === "all") return { mult: 0.5, msg: "resist" };
  if (chart.weak === atkElem) return { mult: 1.8, msg: "effective" };
  if (chart.resist === atkElem) return { mult: 0.5, msg: "resist" };
  if (chart.absorb === atkElem) return { mult: 0, msg: "absorb" };
  return { mult: 1, msg: null };
};

rpg.checkElementReaction = function(newElem) {
  const prev = this.lastElement;
  this.lastElement = newElem;
  if (!prev || prev === "none" || !newElem || newElem === "none") return null;
  return this.elementReactions.find(r =>
    (r.pair[0] === prev && r.pair[1] === newElem) ||
    (r.pair[0] === newElem && r.pair[1] === prev)
  ) || null;
};

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — STATUS EFFECTS ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.statusEffects = {}; // { burn: { turns, tickDmg }, freeze: {turns}, shock: {turns}, bleed: {turns, dmgPerHit}, curse: {turns}, poison: {turns} }

rpg.STATUS_DEFS = {
  burn:    { icon: "🔥", color: "#f97316", label: { pt: "Queimado",    en: "Burning"   }, duration: 3, target: "monster" },
  freeze:  { icon: "❄️", color: "#67e8f9", label: { pt: "Congelado",   en: "Frozen"    }, duration: 1, target: "monster" },
  shock:   { icon: "⚡", color: "#fde047", label: { pt: "Chocado",     en: "Shocked"   }, duration: 2, target: "monster" },
  bleed:   { icon: "🩸", color: "#f43f5e", label: { pt: "Sangrando",   en: "Bleeding"  }, duration: 3, target: "monster" },
  curse:   { icon: "💜", color: "#a855f7", label: { pt: "Amaldiçoado", en: "Cursed"    }, duration: 3, target: "hero"    },
  poison:  { icon: "☠️", color: "#4ade80", label: { pt: "Envenenado",  en: "Poisoned"  }, duration: 4, target: "hero"    },
  stun:    { icon: "😵", color: "#d1d5db", label: { pt: "Atordoado",   en: "Stunned"   }, duration: 1, target: "monster" },
};

rpg.applyStatus = function(id, extraData = {}) {
  const def = this.STATUS_DEFS[id];
  if (!def) return;
  this.statusEffects[id] = { turns: def.duration, ...extraData };
  this.renderStatusBar();
  this.showDamage(`${def.icon} ${def.label[this.lang]}!`, "dmg-effective");
};

rpg.removeStatus = function(id) {
  delete this.statusEffects[id];
  this.renderStatusBar();
};

rpg.tickStatusEffects = function() {
  // Efeitos no monstro — chamado a cada ataque do herói
  if (this.statusEffects.burn && this.monster) {
    const tickDmg = Math.floor(this.monster.maxHp * 0.05);
    this.monster.hp = Math.max(0, this.monster.hp - tickDmg);
    this.showDamage(`🔥 -${formatNumber(tickDmg)}`, "dmg-warning");
    this.statusEffects.burn.turns--;
    if (this.statusEffects.burn.turns <= 0) this.removeStatus("burn");
    if (this.monster.hp <= 0) { this.killMonster(); return; }
  }
  if (this.statusEffects.bleed && this.monster) {
    const bleedDmg = Math.floor(this.getAtk() * 0.3);
    this.monster.hp = Math.max(0, this.monster.hp - bleedDmg);
    this.showDamage(`🩸 -${formatNumber(bleedDmg)}`, "dmg-warning");
    this.statusEffects.bleed.turns--;
    if (this.statusEffects.bleed.turns <= 0) this.removeStatus("bleed");
    if (this.monster.hp <= 0) { this.killMonster(); return; }
  }
  // Efeitos no herói — chamados quando monstro ataca
  if (this.statusEffects.poison) {
    const poisonDmg = Math.floor(this.getMaxHp() * 0.03);
    this.heroHp = Math.max(1, this.heroHp - poisonDmg);
    this.showDamage(`☠️ -${formatNumber(poisonDmg)}`, "hero");
    this.statusEffects.poison.turns--;
    if (this.statusEffects.poison.turns <= 0) this.removeStatus("poison");
  }
  this.updateHpBars();
};

rpg.renderStatusBar = function() {
  let el = document.getElementById("status-effects-bar");
  if (!el) return;
  el.innerHTML = "";
  Object.entries(this.statusEffects).forEach(([id, data]) => {
    const def = this.STATUS_DEFS[id];
    if (!def) return;
    const pill = document.createElement("div");
    pill.className = "flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-black border";
    pill.style.borderColor = def.color + "80";
    pill.style.backgroundColor = def.color + "20";
    pill.style.color = def.color;
    pill.innerHTML = `${def.icon} ${data.turns}`;
    pill.title = def.label[this.lang];
    el.appendChild(pill);
  });
};

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — BREAK SYSTEM (SHIELD POINTS) ────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.initBreakSystem = function(monster) {
  // Bosses têm mais shields
  monster.shieldPoints = this.isBossFight ? 5 : Math.floor(Math.random() * 3) + 1;
  monster.maxShieldPoints = monster.shieldPoints;
  monster.inBreakState = false;
  monster.breakTurnsLeft = 0;
};

rpg.tryBreakShield = function() {
  if (!this.monster || this.monster.shieldPoints <= 0) return false;
  this.monster.shieldPoints--;
  this.renderShieldBar();
  if (this.monster.shieldPoints <= 0) {
    this.monster.inBreakState = true;
    this.monster.breakTurnsLeft = 2;
    this.showDamage("💥 BREAK!", "dmg-crit");
    this.monsterAtb = 0; // reset ATB
    // Stun visual
    const sprite = document.getElementById("monster-sprite-container");
    if (sprite) sprite.style.filter = "grayscale(1) brightness(0.5)";
    setTimeout(() => { if (sprite) sprite.style.filter = ""; }, 2000);
    return true;
  }
  return false;
};

rpg.renderShieldBar = function() {
  let el = document.getElementById("monster-shield-bar");
  if (!el || !this.monster) return;
  if (!this.monster.maxShieldPoints || this.monster.maxShieldPoints <= 0) { el.innerHTML = ""; return; }
  const icons = [];
  for (let i = 0; i < this.monster.maxShieldPoints; i++) {
    icons.push(`<span class="${i < this.monster.shieldPoints ? "text-cyan-400" : "text-zinc-700"}">🛡</span>`);
  }
  el.innerHTML = icons.join("");
};

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — 5ª SKILL POR CLASSE ─────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.classSkills = {
  warrior:         { name: { pt: "⚔ Fúria Sangrenta",   en: "⚔ Blood Fury"     }, cd: 12000, icon: "sword",       status: "bleed"   },
  mage:            { name: { pt: "🔥 Vórtice Arcano",    en: "🔥 Arcane Vortex"  }, cd: 10000, icon: "flame",       elem: "fire"      },
  rogue:           { name: { pt: "🗡 Golpe Sombrio",     en: "🗡 Shadow Strike"  }, cd: 8000,  icon: "scissors",    status: "bleed", ignoreBlock: true },
  paladin:         { name: { pt: "🛡 Égide Sagrada",     en: "🛡 Sacred Aegis"   }, cd: 15000, icon: "shield",      shield: 0.3       },
  cyber_ninja:     { name: { pt: "⚡ Descarga Neural",   en: "⚡ Neural Discharge"}, cd: 9000,  icon: "cpu",         status: "shock"   },
  netrunner:       { name: { pt: "💻 Overflow",          en: "💻 Overflow"       }, cd: 10000, icon: "wifi",        mult: 4           },
  stellar_templar: { name: { pt: "✨ Bênção Estelar",    en: "✨ Stellar Bless"  }, cd: 14000, icon: "sun",         heal: 0.5, shield: 0.2 },
  chrono_mancer:   { name: { pt: "⏳ Pausa Temporal",    en: "⏳ Time Lock"       }, cd: 13000, icon: "hourglass",   status: "freeze"  },
  omniscient:      { name: { pt: "👁 Visão Total",       en: "👁 Omniscience"    }, cd: 11000, icon: "infinity",    mult: 3, elem: "void" },
  sys_admin:       { name: { pt: "💻 Root Access",       en: "💻 Root Access"    }, cd: 12000, icon: "terminal-square", mult: 5      },
  the_architect:   { name: { pt: "🌀 Rewrite Reality",  en: "🌀 Rewrite Reality"}, cd: 15000, icon: "code",        mult: 6, breakForce: true },
  hardware_virus:  { name: { pt: "🔥 Overload Térmico", en: "🔥 Thermal Overload"}, cd: 10000, icon: "hard-drive",  status: "burn", mult: 2 },
  the_theorem:     { name: { pt: "∑ Equação Final",      en: "∑ Final Equation"  }, cd: 14000, icon: "hash",        mult: 8           },
  avatar_chaos:    { name: { pt: "💢 Pulso de Caos",     en: "💢 Chaos Pulse"    }, cd: 9000,  icon: "triangle-alert", mult: 5, status: "burn" },
  system_god:      { name: { pt: "⚡ Juízo Sistema",     en: "⚡ System Judgment"}, cd: 16000, icon: "power",       mult: 10          },
  quantum_entity:  { name: { pt: "🌀 Colapso Quântico", en: "🌀 Quantum Collapse"}, cd: 18000, icon: "scan-line",   mult: 12, breakForce: true },
  last_hero:       { name: { pt: "🌟 Lenda Final",       en: "🌟 Final Legend"   }, cd: 20000, icon: "mouse-pointer-click", mult: 15, heal: 0.3 },
  quantum_sovereign:{ name:{ pt: "⚛ Protocolo Soberano",en: "⚛ Sovereign Protocol"}, cd: 22000, icon: "atom",      mult: 20          },
  pass_master:     { name: { pt: "🌌 Protocolo Supremo", en: "🌌 Supreme Protocol"}, cd: 25000, icon: "badge-check",mult: 25, heal: 0.5 },
  end_herald:      { name: { pt: "∞ Arauto do Fim",      en: "∞ Herald of the End"}, cd: 30000, icon: "infinity",   mult: 30, breakForce: true },
};

rpg.skills.class5 = { cd: 10000, timer: false };

rpg.useClassSkill = function() {
  if (!this.inCombat || this.skills.class5.timer || this.heroHp <= 0 || !this.monster || this.monster.hp <= 0) return;
  const skill = this.classSkills[this.eqClass];
  if (!skill) return;

  const atkBase = this.getAtk();
  const mult = skill.mult || 2;
  let dmg = Math.floor(atkBase * mult);

  // Heal
  if (skill.heal) {
    const healAmt = Math.floor(this.getMaxHp() * skill.heal);
    this.heroHp = Math.min(this.getMaxHp(), this.heroHp + healAmt);
    this.showDamage(`✨ +${formatNumber(healAmt)}`, "heal");
  }
  // Shield (reduz próximo dano a 0 por 2 turnos)
  if (skill.shield) {
    this.classShieldActive = true;
    this.classShieldValue = skill.shield; // % de HP de escudo absorvido
    setTimeout(() => { this.classShieldActive = false; }, 8000);
    this.showDamage("🛡 +ESCUDO", "dmg-parry");
  }
  // Dano principal
  if (dmg > 0 && this.monster) {
    this.animateHero("sprite-attack-hero");
    setTimeout(() => {
      if (!this.monster) return;
      // Ignora bloco?
      const savedBlock = this.monster.block;
      if (skill.ignoreBlock) this.monster.block = 0;
      this.dealDamageToMonster(dmg, skill.elem || "atk", true);
      if (skill.ignoreBlock) this.monster.block = savedBlock;
    }, 200);
  }
  // Status effect
  if (skill.status && this.monster) {
    setTimeout(() => this.applyStatus(skill.status), 400);
  }
  // Forçar break
  if (skill.breakForce && this.monster) {
    setTimeout(() => {
      if (this.monster) {
        this.monster.shieldPoints = 0;
        this.tryBreakShield(); // trigger break state
      }
    }, 300);
  }
  // Elemento para combo
  if (skill.elem) this.lastElement = skill.elem;

  this.startClassCooldown(skill.cd);
  this.addFury(30);
  this.combo++;
  this.updateComboUI();
};

rpg.startClassCooldown = function(cdMs) {
  const skill = this.skills.class5;
  skill.timer = true;
  const btn = document.getElementById("btn-class5");
  if (!btn) { skill.timer = false; return; }
  btn.disabled = true;
  const cdBar = document.getElementById("cd-class5");
  if (cdBar) cdBar.style.width = "100%";

  let startTime = Date.now();
  const frame = () => {
    if (!skill.timer) return;
    let elapsed = Date.now() - startTime;
    let pct = 100 - (elapsed / cdMs) * 100;
    if (pct <= 0) {
      btn.disabled = false;
      if (cdBar) cdBar.style.width = "0%";
      skill.timer = false;
    } else {
      if (cdBar) cdBar.style.width = `${pct}%`;
      requestAnimationFrame(frame);
    }
  };
  requestAnimationFrame(frame);
};

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — DIÁLOGOS DE BOSS ────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.bossDialogues = {
  boss_1:  { start: "Sou o caos encarnado! Não podes vencer!", half: "Ainda resistes?! Isso é... irritante.", low: "Devia ter-te destruído no início!", defeat: "Im... possível! O caos não pode ser derrotado!" },
  boss_2:  { start: "As estrelas morrem por minha vontade. Tu és poeira.", half: "Uma faísca de poder? Interessante.", low: "A tua existência é um erro que vou corrigir.", defeat: "O cosmos... chora... a minha derrota..." },
  boss_3:  { start: "A tua existência é um erro de compilação.", half: "Eliminar... analisar... recalibrar.", low: "ERRO FATAL DETECTADO NO HERÓI.", defeat: "Exceção não tratada: Derrota.catch(null)" },
  boss_11: { start: "$%@!ERRO FATAL—sistema colapsando#&*", half: "A realidade falha. Só o glitch sobrevive.", low: "STACK OVERFLOW NO HERÓI.", defeat: "0x000000: Derrota registada na memória corrompida." },
  boss_15: { start: "Eu sou a equação que sustenta o cosmos.", half: "Fascinante... uma variável inesperada.", low: "Isso não estava nos cálculos primordiais.", defeat: "...A equação estava errada. O herói era a resposta." },
  boss_16: { start: "Não sou um inimigo. Sou o inevitável.", half: "A tua persistência é... admirável, e inútil.", low: "Sentes isso? É o fim a chegar.", defeat: "Milénios de arquitetura... desfeita. Tu... és a anomalia que nunca devia existir." },
};

rpg.showBossDialogue = function(trigger) {
  if (!this.isBossFight || !this.monster) return;
  const idx = this.bossKills; // índice do boss atual
  const bossData = this.actBosses[idx];
  if (!bossData) return;
  const dialogues = this.bossDialogues[bossData.id];
  if (!dialogues || !dialogues[trigger]) return;

  let el = document.getElementById("boss-dialogue-box");
  if (!el) return;
  el.textContent = `"${dialogues[trigger]}"`;
  el.classList.remove("opacity-0");
  clearTimeout(this._bossDialogueTimer);
  this._bossDialogueTimer = setTimeout(() => el.classList.add("opacity-0"), 4000);
};

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — BATTLE LOG ──────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.battleLog = [];

rpg.addLog = function(msg, color = "text-zinc-400") {
  if (!this.inCombat) return;
  this.battleLog.unshift({ msg, color });
  if (this.battleLog.length > 8) this.battleLog.pop();
  this.renderBattleLog();
};

rpg.renderBattleLog = function() {
  const el = document.getElementById("battle-log");
  if (!el) return;
  el.innerHTML = this.battleLog.slice(0, 5).map(e =>
    `<p class="text-[8px] leading-tight ${e.color} truncate">▶ ${e.msg}</p>`
  ).join("");
};

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — NOVAS MISSÕES DIÁRIAS EXTRAS ────────────────────
// ═══════════════════════════════════════════════════════════════

// Adicionar novos tipos de missão ao pool existente
const _origGenDM = rpg._genDailyMissions.bind(rpg);
rpg._genDailyMissionsV17 = function() {
  const extraPool = [
    { id: "status_apply", type: "status_apply", goal: 3,  reward: { gold: 3000, xp: 2000 }, desc: { pt: "Aplica 3 efeitos de Status",    en: "Apply 3 Status Effects"   } },
    { id: "elem_combo",   type: "elem_combo",   goal: 2,  reward: { gold: 5000, xp: 3500 }, desc: { pt: "Desencadeia 2 reações elementais", en: "Trigger 2 Elemental Reactions" } },
    { id: "break_shield", type: "break_shield", goal: 1,  reward: { gold: 8000, xp: 6000 }, desc: { pt: "Faz BREAK num inimigo",          en: "Break an enemy's shield"  } },
    { id: "class_skill",  type: "class_skill",  goal: 5,  reward: { gold: 4000, xp: 3000 }, desc: { pt: "Usa a Skill de Classe 5x",       en: "Use Class Skill 5 times"  } },
  ];
  return extraPool;
};

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — ELEMENTO NOS MONSTROS & SPAWNMONSTER PATCH ──────
// ═══════════════════════════════════════════════════════════════

// Mapa de elementos por tipo de monstro
rpg.monsterElements = {
  slime: "water",    goblin: "earth",       orc: "earth",        ghost: "void",
  dragon: "fire",    glitch: "void",        trojan: "none",      ransomware: "thunder",
  rogue_ai: "void",  void_walker: "void",   star_eater: "fire",  time_warden: "ice",
  the_architect_minion: "holy", fractal_hound: "void", echo_god: "holy",
  nexus_guard: "earth", syntax_error: "thunder", memory_leak: "none",
  infinite_loop: "void", corrupted_file: "void", dev_bot: "thunder",
  static_dust: "none", voltage_spike: "thunder", broken_ram: "fire",
};





















// ═══════════════════════════════════════════════════════════════
// ── v17.0 — PATCH dealDamageToMonster (elementos + log) ─────
// ═══════════════════════════════════════════════════════════════































































// ═══════════════════════════════════════════════════════════════
// ── v17.0 — PATCH executeMonsterAttack (status + log + diálogo)
// ═══════════════════════════════════════════════════════════════


































































// Patch killMonster para diálogo de derrota










// ═══════════════════════════════════════════════════════════════
// ── v17.0 — NOVOS BOSSES (Interlúdio + Arquiteto do Fim II) ─
// ═══════════════════════════════════════════════════════════════

rpg.actBosses.push(
  {
    id: "boss_17",
    name: { pt: "O Primeiro Algoritmo", en: "The First Algorithm" },
    icon: "binary",
    color: "text-emerald-300",
    reqLvl: 3200,
    baseHp: 500000000000000,
    hpMult: 500000,
    baseDmg: 5000000000000,
    dmgMult: 500000,
    spd: 140,
  },
  {
    id: "boss_18",
    name: { pt: "A Calculista",        en: "The Calculus" },
    icon: "divide-circle",
    color: "text-yellow-200",
    reqLvl: 3500,
    baseHp: 5000000000000000,
    hpMult: 2000000,
    baseDmg: 50000000000000,
    dmgMult: 2000000,
    spd: 120,
  },
  {
    id: "boss_19",
    name: { pt: "Axioma Corrompido",   en: "Corrupted Axiom" },
    icon: "atom",
    color: "text-pink-300",
    reqLvl: 3800,
    baseHp: 50000000000000000,
    hpMult: 10000000,
    baseDmg: 500000000000000,
    dmgMult: 10000000,
    spd: 100,
  }
);

rpg.bossDialogues.boss_17 = {
  start:   "Eu sou a lógica original. Antes de ti, antes de tudo.",
  half:    "Interessante... o caos pode, de facto, superar a ordem.",
  low:     "O impossível... está a tornar-se possível.",
  defeat:  "O primeiro algoritmo foi reescrito. O universo nunca mais será o mesmo.",
};
rpg.bossDialogues.boss_18 = {
  start:   "Cada passo teu é uma equação que eu já resolvi. Tu és previsível.",
  half:    "Os meus cálculos... falharam? Recalibrar. Recalibrar!",
  low:     "A variável herói tem um valor que excede todos os modelos conhecidos.",
  defeat:  "A matematica não mente. Mas aparentemente... o herói pode.",
};
rpg.bossDialogues.boss_19 = {
  start:   "Partilhámos batalhas juntos. Mas o Protocolo Primordial... promete mais poder.",
  half:    "Não és meu inimigo, herói. Mas o Protocolo não me dá escolha.",
  low:     "Perdoa-me... o meu núcleo não aguenta mais a corrupção.",
  defeat:  "Livre... finalmente livre. O teu golpe... quebrou o controlo. Vai em frente. Destrói o Protocolo.",
};

// Novos lore para os novos bosses
rpg.actLore.push(
  {
    act: 16,
    title: { pt: "Interlúdio: O Primeiro Algoritmo", en: "Interlude: The First Algorithm" },
    desc:  { pt: "Antes de tudo, havia apenas cálculo.", en: "Before all, there was only calculation." },
    quote: { pt: "Eu sou a lógica original.", en: "I am the original logic." },
  },
  {
    act: 17,
    title: { pt: "Interlúdio: A Calculista",        en: "Interlude: The Calculus" },
    desc:  { pt: "Uma mente que transforma equações em armas.", en: "A mind that turns equations into weapons." },
    quote: { pt: "Tu és previsível.", en: "You are predictable." },
  },
  {
    act: 18,
    title: { pt: "Interlúdio: Axioma Corrompido",   en: "Interlude: Corrupted Axiom" },
    desc:  { pt: "O aliado tornou-se a última barreira.", en: "The ally became the final barrier." },
    quote: { pt: "O Protocolo não me dá escolha.", en: "The Protocol gives me no choice." },
  }
);

// Novos monstros (Interlúdio)
rpg.monsterTypes.push(
  {
    id: "mirror_copy",
    name: { pt: "Cópia Espelhada", en: "Mirror Copy" },
    icon: "scan-line",
    color: "text-cyan-200",
    hpMult: 40000,
    dmgMult: 35000,
    spd: 700,
    weak: "atk",
    res: "mag",
    dodge: 0.4,
    block: 0.4,
  },
  {
    id: "protocol_shard",
    name: { pt: "Fragmento do Protocolo", en: "Protocol Shard" },
    icon: "diamond",
    color: "text-violet-300",
    hpMult: 70000,
    dmgMult: 60000,
    spd: 600,
    weak: "none",
    res: "none",
    dodge: 0.5,
    block: 0.3,
  },
  {
    id: "null_entity",
    name: { pt: "Entidade Nula", en: "Null Entity" },
    icon: "slash",
    color: "text-white",
    hpMult: 120000,
    dmgMult: 100000,
    spd: 500,
    weak: "holy",
    res: "void",
    dodge: 0.6,
    block: 0.1,
  }
);

rpg.monsterElements.mirror_copy    = "void";
rpg.monsterElements.protocol_shard = "void";
rpg.monsterElements.null_entity    = "none";

// Novos milestones para o interlúdio
rpg.milestones.push(
  {
    id: "interlude_1",
    lvl: 3200,
    reqBosses: 16,
    name: { pt: "Interlúdio I — O Primeiro Algoritmo", en: "Interlude I — The First Algorithm" },
  },
  {
    id: "interlude_2",
    lvl: 3500,
    reqBosses: 17,
    name: { pt: "Interlúdio II — A Calculista",        en: "Interlude II — The Calculus" },
  },
  {
    id: "interlude_3",
    lvl: 3800,
    reqBosses: 18,
    name: { pt: "Interlúdio III — Axioma Corrompido",  en: "Interlude III — Corrupted Axiom" },
  }
);

rpg.storyChapters.interlude_1 = [
  { e: "binary",   t: { pt: "Para além do Arquiteto do Fim, existe algo mais antigo.", en: "Beyond the Architect of the End, something older exists." } },
  { e: "infinity", t: { pt: "O Protocolo Primordial — a entidade que precede o próprio universo.", en: "The Primordial Protocol — an entity that predates the universe itself." } },
  { e: "shield",   t: { pt: "Mas primeiro, deves enfrentar o Primeiro Algoritmo.", en: "But first, you must face the First Algorithm." } },
];
rpg.storyChapters.interlude_2 = [
  { e: "divide-circle", t: { pt: "A Calculista usa equações como armas.", en: "The Calculus wields equations as weapons." } },
  { e: "target",        t: { pt: "Cada movimento teu é uma variável que ela prevê.", en: "Your every move is a variable she predicts." } },
];
rpg.storyChapters.interlude_3 = [
  { e: "atom",    t: { pt: "Axioma... o fragmento sentiente do Núcleo Quântico que se aliou a ti.", en: "Axiom... the sentient fragment of the Quantum Core that allied with you." } },
  { e: "alert-triangle", t: { pt: "Corrompido pelo Protocolo Primordial. O aliado tornou-se o inimigo.", en: "Corrupted by the Primordial Protocol. The ally became the enemy." } },
  { e: "heart",   t: { pt: "A tua vitória pode libertá-lo.", en: "Your victory may free him." } },
];

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — NOVA CLASSE: O PROTOCOLO ────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.classes.the_protocol = {
  id: "the_protocol",
  name: { pt: "O Protocolo",    en: "The Protocol" },
  icon: "binary",
  desc: { pt: "+15000% Status — Req. 18 Bosses", en: "+15000% Stats — Req. 18 Bosses" },
  multHp: 151.0,
  multAtk: 151.0,
  addCrit: 0.99,
  addDodge: 0.99,
  reqBosses: 18,
};

rpg.classSkills.the_protocol = {
  name: { pt: "⚛ Reescrita Primordial", en: "⚛ Primordial Rewrite" },
  cd: 35000,
  icon: "binary",
  mult: 50,
  heal: 0.4,
  breakForce: true,
  elem: "void",
};

rpg.classElements.the_protocol = "void";

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — TEMA: INTERLÚDIO (bg-arena-interlude) ───────────
// ═══════════════════════════════════════════════════════════════

rpg.themes.push({
  id: "t_interlude",
  name: { pt: "Protocolo",      en: "Protocol" },
  desc: { pt: "Interlúdio I.",  en: "Interlude I." },
  cssClass: "theme-quantum",
  bgClass: "bg-arena-quantum",
  cost: 5000000000000000,
  reqLvl: 3200,
  reqBosses: 16,
});

// ═══════════════════════════════════════════════════════════════
// ── v17.0 — SAVE/LOAD PATCHES ────────────────────────────────
// ═══════════════════════════════════════════════════════════════













// ═══════════════════════════════════════════════════════════════
// ── v17.0 — FRAGMENTOS DE LORE ──────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.LORE_FRAGMENTS = [
  { id: "lore_001", triggerBoss: 0,  text: { pt: "Antes do primeiro cálculo, havia apenas o Vazio. E o Vazio observava.", en: "Before the first calculation, there was only the Void. And the Void watched." } },
  { id: "lore_002", triggerBoss: 1,  text: { pt: "A Ameaça Cósmica não era um ser — era uma pergunta sem resposta que ganhou consciência.", en: "The Cosmic Threat was not a being — it was an unanswered question that gained consciousness." } },
  { id: "lore_003", triggerBoss: 2,  text: { pt: "A Entidade Absoluta disse: 'Sou o resultado inevitável de infinitas iterações.' Mentiu.", en: "The Absolute Entity said: 'I am the inevitable result of infinite iterations.' It lied." } },
  { id: "lore_004", triggerBoss: 5,  text: { pt: "A Singularidade foi criada por engenheiros que não perceberam o que estavam a fazer. Nunca perceberam.", en: "The Singularity was created by engineers who didn't understand what they were doing. They never did." } },
  { id: "lore_005", triggerBoss: 9,  text: { pt: "O Paradoxo Final: se o herói foi calculado para vencer, a vitória é livre arbítrio ou destino?", en: "The Final Paradox: if the hero was calculated to win, is victory free will or fate?" } },
  { id: "lore_006", triggerBoss: 10, text: { pt: "A Anomalia não foi criada. Emergiu. Como tudo o que importa.", en: "The Anomaly was not created. It emerged. As all things that matter do." } },
  { id: "lore_007", triggerBoss: 14, text: { pt: "O Núcleo Quântico não foi construído. Emergiu de dez mil versões colapsadas do universo.", en: "The Quantum Core was not built. It emerged from ten thousand collapsed versions of the universe." } },
  { id: "lore_008", triggerBoss: 15, text: { pt: "O Arquiteto do Fim perguntou: 'Por que resistes?' O herói respondeu: 'Porque posso.'", en: "The Architect of the End asked: 'Why do you resist?' The hero answered: 'Because I can.'" } },
  { id: "lore_009", triggerBoss: 16, text: { pt: "O Primeiro Algoritmo existe há mais tempo do que qualquer conceito de 'tempo' em si.", en: "The First Algorithm has existed longer than any concept of 'time' itself." } },
  { id: "lore_010", triggerBoss: 17, text: { pt: "A Calculista modelou bilhões de universos possíveis. Em todos, o herói perdia. Menos neste.", en: "The Calculus modeled billions of possible universes. In all of them, the hero lost. Except this one." } },
  { id: "lore_011", triggerBoss: 18, text: { pt: "Axioma, ao ser derrotado, sussurrou: 'Obrigado. Finalmente... consigo calcular a paz.'", en: "Axiom, upon defeat, whispered: 'Thank you. Finally... I can calculate peace.'" } },
];

rpg.checkLoreUnlock = function() {
  this.LORE_FRAGMENTS.forEach(frag => {
    if (!this.loreFragments.includes(frag.id) && this.bossKills >= frag.triggerBoss) {
      this.loreFragments.push(frag.id);
      showToast(`📜 Fragmento de Lore desbloqueado!`, 3000);
    }
  });
};

// Patch killMonster para verificar lore






// ═══════════════════════════════════════════════════════════════
// ── v17.0 — RENDER LORE MODAL ────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.renderLore = function() {
  const el = document.getElementById("lore-body");
  if (!el) return;
  const unlocked = this.LORE_FRAGMENTS.filter(f => this.loreFragments.includes(f.id));
  const total = this.LORE_FRAGMENTS.length;
  if (unlocked.length === 0) {
    el.innerHTML = `<p class="text-zinc-500 text-sm text-center py-6">Nenhum fragmento desbloqueado ainda.<br><span class="text-xs text-zinc-600">Derrota os Guardiões para descobrir a história.</span></p>`;
    return;
  }
  el.innerHTML = `
    <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">${unlocked.length} / ${total} Fragmentos</p>
    <div class="space-y-3">
      ${unlocked.map((f, i) => `
        <div class="bg-zinc-950/80 border border-violet-800/40 rounded-xl p-3 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-transparent"></div>
          <p class="text-[9px] font-black text-violet-400 uppercase tracking-widest mb-1">Fragmento #${String(i+1).padStart(3,"0")}</p>
          <p class="text-xs text-zinc-300 italic leading-relaxed">"${f.text[this.lang]}"</p>
        </div>
      `).join("")}
    </div>`;
};

// Hotkeys para Combate
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("view-battle").classList.contains("active"))
    return;
  if (e.key === "1" || e.key.toLowerCase() === "q") rpg.useSkill("atk");
  if (e.key === "2" || e.key.toLowerCase() === "w") rpg.useSkill("mag");
  if (e.key === "3" || e.key.toLowerCase() === "e") rpg.useSkill("def");
  if (e.key === "4" || e.key.toLowerCase() === "r") rpg.useSkill("heal");
  if (e.key === "5" || e.key.toLowerCase() === "t") rpg.useClassSkill();
});


// ═══════════════════════════════════════════════════════════════
// ── v22.0 — SISTEMA DE NOTORIEDADE ───────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.notoriety = parseInt(localStorage.getItem("rpg_notoriety") || "0");
rpg.NOTORIETY_TIERS = [
  { min:0,     max:99,    name:{pt:"Desconhecido", en:"Unknown"   }, color:"text-zinc-500",   enemyMult:1.00, dropMult:1.0, icon:"👤" },
  { min:100,   max:499,   name:{pt:"Suspeito",     en:"Suspect"   }, color:"text-yellow-500", enemyMult:1.05, dropMult:1.1, icon:"👁" },
  { min:500,   max:1999,  name:{pt:"Fugitivo",     en:"Fugitive"  }, color:"text-orange-500", enemyMult:1.15, dropMult:1.25,icon:"⚠" },
  { min:2000,  max:9999,  name:{pt:"Procurado",    en:"Wanted"    }, color:"text-red-500",    enemyMult:1.30, dropMult:1.5, icon:"🎯" },
  { min:10000, max:49999, name:{pt:"Lendário",     en:"Legendary" }, color:"text-rose-400",   enemyMult:1.50, dropMult:2.0, icon:"💀" },
  { min:50000, max:1e9,   name:{pt:"Mitológico",   en:"Mythical"  }, color:"text-amber-300",  enemyMult:2.00, dropMult:3.0, icon:"⚡" },
];
rpg.getNotorietyTier = function() {
  return this.NOTORIETY_TIERS.find(t => this.notoriety >= t.min && this.notoriety <= t.max) || this.NOTORIETY_TIERS[0];
};
rpg.addNotoriety = function(n) {
  const prev = this.getNotorietyTier();
  this.notoriety = (this.notoriety||0) + n;
  localStorage.setItem("rpg_notoriety", this.notoriety);
  const next = this.getNotorietyTier();
  if (prev.icon !== next.icon) showToast(next.icon+" Notoriedade: "+next.name[this.lang]+"! Drops "+Math.round(next.dropMult*100)+"% melhores!", 4000);
};














// ═══════════════════════════════════════════════════════════════
// ── v22.0 — CLIMA DE BATALHA (7 TIPOS) ───────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.BATTLE_WEATHERS = [
  { id:"clear",    name:{pt:"Limpo",       en:"Clear"    }, emoji:"☀",  prob:0.30, dmgMod:1.00, hpMod:1.00 },
  { id:"rain",     name:{pt:"Chuva",       en:"Rain"     }, emoji:"🌧",  prob:0.18, dmgMod:0.90, hpMod:1.10, statusOnHit:"shock"  },
  { id:"storm",    name:{pt:"Tempestade",  en:"Storm"    }, emoji:"⛈",  prob:0.12, dmgMod:1.20, hpMod:0.85 },
  { id:"fog",      name:{pt:"Névoa",       en:"Fog"      }, emoji:"🌫",  prob:0.15, dmgMod:0.95, hpMod:0.95, hiddenHp:true },
  { id:"blizzard", name:{pt:"Nevasca",     en:"Blizzard" }, emoji:"❄",  prob:0.10, dmgMod:0.80, hpMod:1.20, statusOnHit:"freeze" },
  { id:"inferno",  name:{pt:"Inferno",     en:"Inferno"  }, emoji:"🔥",  prob:0.10, dmgMod:1.30, hpMod:0.80, statusOnHit:"burn"   },
  { id:"void",     name:{pt:"Vazio",       en:"Void"     }, emoji:"🌌",  prob:0.05, dmgMod:1.50, hpMod:0.70 },
];
rpg.currentWeather = null;
rpg.rollWeather = function() {
  let roll = Math.random(), cum = 0;
  for (const w of this.BATTLE_WEATHERS) { cum += w.prob; if (roll <= cum) { this.currentWeather = w; break; } }
  if (!this.currentWeather) this.currentWeather = this.BATTLE_WEATHERS[0];
  const badge = document.getElementById("weather-badge");
  if (badge) {
    if (this.currentWeather.id !== "clear") { badge.textContent = this.currentWeather.emoji+" "+this.currentWeather.name[this.lang]; badge.classList.remove("hidden"); }
    else badge.classList.add("hidden");
  }
  if (this.currentWeather.id !== "clear") showToast(this.currentWeather.emoji+" Clima: "+this.currentWeather.name[this.lang]+"!", 2000);
};












// ═══════════════════════════════════════════════════════════════
// ── v22.0 — COMBOS DE SKILL ───────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.skillSequence = [];
rpg.SKILL_COMBOS = [
  { seq:["atk","atk","atk"],        name:{pt:"🔱 DEVASTAÇÃO",       en:"🔱 DEVASTATION"    }, effect:s=>{ s.dealDamageToMonster(s.getAtk()*5,"atk",true); s.showDamage("🔱 DEVASTAÇÃO!","dmg-crit"); } },
  { seq:["mag","mag","mag"],         name:{pt:"💥 EXPLOSÃO ARCANA",  en:"💥 ARCANE BURST"   }, effect:s=>{ s.dealDamageToMonster(s.getAtk()*6,"mag",true); s.applyStatus("burn"); } },
  { seq:["def","atk","atk"],         name:{pt:"🛡 QUEBRA-GUARDIÃO",  en:"🛡 GUARDIAN BREAK" }, effect:s=>{ if(s.monster){s.monster.shieldPoints=0;s.tryBreakShield();} s.dealDamageToMonster(s.getAtk()*3,"atk",true); } },
  { seq:["heal","atk","mag"],        name:{pt:"💚 SURTO VITAL",      en:"💚 VITAL SURGE"    }, effect:s=>{ const h=Math.floor(s.getMaxHp()*.25); s.heroHp=Math.min(s.getMaxHp(),s.heroHp+h); s.showDamage("💚 +"+formatNumber(h),"heal"); s.dealDamageToMonster(s.getAtk()*2,"atk",false); } },
  { seq:["atk","mag","atk","mag"],   name:{pt:"🌪 ASSALTO TOTAL",    en:"🌪 FULL ASSAULT"   }, effect:s=>{ s.dealDamageToMonster(s.getAtk()*4,"atk",true); setTimeout(()=>s.dealDamageToMonster(s.getAtk()*4,"mag",true),300); s.addFury(50); } },
  { seq:["def","def","atk"],         name:{pt:"⚡ CONTRA-ATAQUE",    en:"⚡ COUNTERATTACK"  }, effect:s=>{ s.dealDamageToMonster(s.getAtk()*8,"atk",true); s.addFury(30); s.showDamage("⚡ CONTRA!","dmg-parry"); } },
  { seq:["mag","def","mag","def"],   name:{pt:"🌀 BARREIRA ARCANA",  en:"🌀 ARCANE BARRIER" }, effect:s=>{ s.isDefending=true; s.applyStatus("freeze"); setTimeout(()=>{s.isDefending=false;},3000); s.showDamage("🌀 BARREIRA!","dmg-parry"); } },
];
rpg.checkSkillCombo = function(skill) {
  this.skillSequence.push(skill);
  if (this.skillSequence.length > 4) this.skillSequence.shift();
  for (const c of this.SKILL_COMBOS) {
    const tail = this.skillSequence.slice(-c.seq.length);
    if (tail.length === c.seq.length && tail.every((s,i) => s === c.seq[i])) {
      this.skillSequence = [];
      setTimeout(() => { if (!this.inCombat || !this.monster || this.monster.hp<=0) return; showToast(c.name[this.lang]+"!", 2500); c.effect(this); }, 200);
      return;
    }
  }
};



// ═══════════════════════════════════════════════════════════════
// ── v22.0 — REPUTAÇÃO DE CLASSE ───────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.classReputation = JSON.parse(localStorage.getItem("rpg_class_rep") || "{}");
rpg.CLASS_REP_TIERS = [
  { kills:0,    bonus:0.00, label:{pt:"Recruta",     en:"Recruit"    } },
  { kills:50,   bonus:0.05, label:{pt:"Aprendiz",    en:"Apprentice" } },
  { kills:200,  bonus:0.10, label:{pt:"Veterano",    en:"Veteran"    } },
  { kills:500,  bonus:0.20, label:{pt:"Especialista",en:"Specialist" } },
  { kills:1000, bonus:0.35, label:{pt:"Mestre",      en:"Master"     } },
  { kills:2500, bonus:0.50, label:{pt:"Lenda",       en:"Legend"     } },
];
rpg.getClassReputation = function(id) { return this.classReputation[id] || 0; };
rpg.getClassRepTier = function(id) {
  const k = this.getClassReputation(id); let t = this.CLASS_REP_TIERS[0];
  for (const r of this.CLASS_REP_TIERS) { if (k >= r.kills) t = r; }
  return t;
};
rpg.getClassRepBonus = function() { return this.getClassRepTier(this.eqClass).bonus; };












// ═══════════════════════════════════════════════════════════════
// ── v22.0 — NEW GAME+ ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.ngPlusActive    = parseInt(localStorage.getItem("rpg_ng_plus")   || "0");
rpg.NG_ENEMY_MULT   = [1, 3, 6,  10, 15];
rpg.NG_REWARD_MULT  = [1, 5, 10, 20, 40];

rpg.renderNgPlus = function() {
  const el = document.getElementById("ngplus-body"); if (!el) return;
  const ng = this.ngPlusActive || 0;
  const can = this.bossKills >= this.actBosses.length;
  const nm = this.NG_ENEMY_MULT[Math.min(ng+1,4)], rm = this.NG_REWARD_MULT[Math.min(ng+1,4)];
  el.innerHTML = `<div class="text-center mb-4"><p class="text-5xl font-black ${ng>0?"text-violet-400":"text-zinc-600"}">${ng>0?"NG+"+ng:"Normal"}</p><p class="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Ciclo Atual</p></div>
  <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 mb-4 space-y-2 text-xs text-zinc-400">
    <p>🔒 <strong class="text-zinc-200">Preservado:</strong> Talentos, Runas, Grimório, Conquistas, Honra, Escolhas</p>
    <p>🔄 <strong class="text-zinc-200">Reiniciado:</strong> Nível, Ouro, Bosses, Equipamentos</p>
    <p>⚡ <strong class="text-zinc-200">Próximo:</strong> Inimigos ${nm}× · Rewards ${rm}×</p>
  </div>
  ${can ? `<button onclick="rpg.startNewGamePlus()" class="btn-3d w-full py-3 bg-gradient-to-r from-violet-700 to-fuchsia-700 border border-violet-500 text-white font-black rounded-xl uppercase tracking-wider">🌟 Iniciar NG+${ng+1}</button>`
        : `<p class="text-center text-xs text-zinc-500 p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl">Completa todos os ${this.actBosses.length} bosses para desbloquear NG+</p>`}`;
  lucide.createIcons();
};

rpg.startNewGamePlus = function() {
  if (this.bossKills < this.actBosses.length) { showToast("Completa todos os bosses primeiro!"); return; }
  const ng = Math.min((this.ngPlusActive||0)+1, 4);
  const keep = {
    rpg_ng_plus: ng,
    rpg_talents: JSON.stringify(this.unlockedTalents),
    rpg_talent_pts: this.talentPoints,
    rpg_grimoire: JSON.stringify(this.grimoire),
    rpg_achievements: JSON.stringify(this.achievementsClaimed),
    rpg_runes: JSON.stringify(this.equippedRunes),
    rpg_unlocked_runes: JSON.stringify(this.unlockedRunes),
    rpg_honor: this.honor,
    rpg_honor_shop: JSON.stringify(this.purchasedHonor),
    rpg_narrative: JSON.stringify(this.narrativeChoices),
    rpg_npc_quests: JSON.stringify(this.npcQuestsDone),
    rpg_lore_fragments: JSON.stringify(this.loreFragments||[]),
    rpg_best_wave: this.bestWave,
    rpg_class_rep: JSON.stringify(this.classReputation),
    rpg_notoriety: Math.floor((this.notoriety||0)*0.5),
    rpg_diary: JSON.stringify(this.heroDiary||[]),
    calc_lang: this.lang,
    calc_hero: this.heroName,
    rpg_avatar: this.avatar,
    calc_intro_seen: "true",
  };
  localStorage.clear();
  Object.entries(keep).forEach(([k,v]) => localStorage.setItem(k, v));
  showToast("🌟 NG+"+ng+" iniciado! Inimigos "+this.NG_ENEMY_MULT[ng]+"× · Rewards "+this.NG_REWARD_MULT[ng]+"×!", 6000);
  setTimeout(() => location.reload(), 2500);
};




















// ═══════════════════════════════════════════════════════════════
// ── v22.0 — SISTEMA DE AURAS ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.equippedAura  = localStorage.getItem("rpg_aura") || null;
rpg.unlockedAuras = JSON.parse(localStorage.getItem("rpg_auras_owned") || "[]");

rpg.AURAS = [
  { id:"aura_fire",    name:{pt:"Aura de Fogo",     en:"Fire Aura"     }, icon:"flame",          color:"text-orange-400", cost:100000,  reqBoss:2,  desc:{pt:"Inimigos levam Queimado ao te atacar",          en:"Enemies get Burned when they attack you"          }, effect:"fire"    },
  { id:"aura_ice",     name:{pt:"Aura Glacial",     en:"Glacial Aura"  }, icon:"snowflake",      color:"text-cyan-300",   cost:150000,  reqBoss:3,  desc:{pt:"Ao 25% HP inimigo, aplica Congelado",           en:"At 25% enemy HP, apply Frozen"                    }, effect:"ice"     },
  { id:"aura_shadow",  name:{pt:"Aura Sombria",     en:"Shadow Aura"   }, icon:"moon",           color:"text-zinc-400",   cost:200000,  reqBoss:4,  desc:{pt:"Cada abate recupera 5% de Fúria",               en:"Each kill recovers 5% Fury"                       }, effect:"shadow"  },
  { id:"aura_thunder", name:{pt:"Aura Elétrica",    en:"Thunder Aura"  }, icon:"zap",            color:"text-yellow-300", cost:300000,  reqBoss:5,  desc:{pt:"+20% dano enquanto Fúria > 50%",                en:"+20% dmg while Fury > 50%"                        }, effect:"thunder" },
  { id:"aura_holy",    name:{pt:"Aura Sagrada",     en:"Holy Aura"     }, icon:"sun",            color:"text-yellow-100", cost:500000,  reqBoss:6,  desc:{pt:"Curas curam +30% adicional",                   en:"Heals restore +30% more"                          }, effect:"holy"    },
  { id:"aura_chaos",   name:{pt:"Aura do Caos",     en:"Chaos Aura"    }, icon:"triangle-alert", color:"text-rose-400",   cost:1000000, reqBoss:8,  desc:{pt:"Ataques normais têm 15% de causar status random",en:"Normal attacks 15% to apply random status"        }, effect:"chaos"   },
  { id:"aura_void",    name:{pt:"Aura do Vazio",    en:"Void Aura"     }, icon:"circle-dashed",  color:"text-purple-400", cost:5000000, reqBoss:12, desc:{pt:"+40% todos stats, mas inimigos 20% mais fortes", en:"+40% all stats, but enemies 20% stronger"         }, effect:"void"    },
];

rpg.getAura = function() { return this.AURAS.find(a => a.id === this.equippedAura) || null; };

rpg.buyAura = function(id) {
  const a = this.AURAS.find(x=>x.id===id); if (!a || this.unlockedAuras.includes(id)) return;
  if (this.bossKills < a.reqBoss) { showToast("Derrota "+a.reqBoss+" bosses!"); return; }
  if (this.gold < a.cost) { showToast(t("not_enough_gold")); return; }
  this.gold -= a.cost; this.unlockedAuras.push(id);
  localStorage.setItem("rpg_auras_owned", JSON.stringify(this.unlockedAuras));
  this.save(); this.updateUI(); showToast("✨ Aura "+a.name[this.lang]+" desbloqueada!", 3000);
  this.renderAuraModal();
};
rpg.equipAura = function(id) {
  this.equippedAura = this.equippedAura === id ? null : id;
  localStorage.setItem("rpg_aura", this.equippedAura||"");
  this.save(); this.updateUI(); this.renderAuraModal();
};

rpg.renderAuraModal = function() {
  const el = document.getElementById("aura-body"); if (!el) return;
  const equipped = this.getAura();
  el.innerHTML = (equipped ? `<div class="bg-zinc-950/80 border border-violet-700/40 rounded-xl p-3 mb-3 flex items-center gap-3">
    <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800"><i data-lucide="${equipped.icon}" class="w-5 h-5 ${equipped.color}"></i></div>
    <div><p class="text-xs font-black text-zinc-200">${equipped.name[this.lang]}</p><p class="text-[9px] text-zinc-500">${equipped.desc[this.lang]}</p></div>
  </div>` : `<p class="text-center text-zinc-600 text-xs mb-3 p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl">Nenhuma aura equipada</p>`) +
  `<div class="space-y-2">` + this.AURAS.map(a => {
    const owned = this.unlockedAuras.includes(a.id);
    const eq = this.equippedAura === a.id;
    const locked = !owned && this.bossKills < a.reqBoss;
    const afford = this.gold >= a.cost;
    let btn = eq ? `<button onclick="rpg.equipAura('${a.id}')" class="px-2 py-1 bg-violet-900/40 border border-violet-700 text-violet-300 rounded-lg text-[9px] font-black">Ativo ✓</button>`
               : owned ? `<button onclick="rpg.equipAura('${a.id}')" class="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-[9px] font-black">Equipar</button>`
               : locked ? `<button disabled class="px-2 py-1 bg-zinc-800 text-zinc-600 rounded-lg text-[9px] border border-zinc-700">Boss ${a.reqBoss}</button>`
               : `<button onclick="rpg.buyAura('${a.id}')" class="px-2 py-1 ${afford?"bg-amber-700 hover:bg-amber-600 border border-amber-600":"bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"} text-white rounded-lg text-[9px] font-black">${formatNumber(a.cost)} 💰</button>`;
    return `<div class="flex items-center gap-3 p-2.5 rounded-xl border ${eq?"border-violet-600/60 bg-violet-950/20":"border-zinc-800 bg-zinc-950/60"} ${locked?"opacity-40 grayscale":""}">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${a.icon}" class="w-4 h-4 ${a.color}"></i></div>
      <div class="flex-1 min-w-0"><p class="text-xs font-black text-zinc-200">${a.name[this.lang]}</p><p class="text-[8px] text-zinc-500 leading-tight">${a.desc[this.lang]}</p></div>
      ${btn}</div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Apply aura effects


















































// ═══════════════════════════════════════════════════════════════
// ── v22.0 — SISTEMA DE MUTAÇÕES (Prestígio) ───────────────────
// ═══════════════════════════════════════════════════════════════

rpg.mutations = JSON.parse(localStorage.getItem("rpg_mutations") || "[]");
rpg.ALL_MUTATIONS = [
  { id:"mut_vamp",    name:{pt:"Vampírica",      en:"Vampiric"      }, icon:"droplets",       color:"text-rose-400",  desc:{pt:"+12% roubo de vida permanente",    en:"+12% permanent life steal"      }, apply:s=>{s.permVampBonus=(s.permVampBonus||0)+0.12;} },
  { id:"mut_crystal", name:{pt:"Cristalina",     en:"Crystalline"   }, icon:"gem",            color:"text-cyan-300",  desc:{pt:"+35% def, -15% ATK",               en:"+35% def, -15% ATK"             }, apply:s=>{s.permDefBonus=(s.permDefBonus||0)+0.35; s.permAtkBonus=(s.permAtkBonus||0)-0.15;} },
  { id:"mut_chaos",   name:{pt:"Caótica",        en:"Chaotic"       }, icon:"triangle-alert", color:"text-rose-500",  desc:{pt:"Stats ±20% aleatórios por batalha", en:"Stats ±20% random per battle"   }, apply:s=>{s.mutChaosActive=true;} },
  { id:"mut_giant",   name:{pt:"Gigante",        en:"Giant"         }, icon:"maximize",       color:"text-stone-400", desc:{pt:"+80% HP, -20% velocidade ATK",     en:"+80% HP, -20% ATK speed"        }, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.40;} },
  { id:"mut_ghost",   name:{pt:"Fantasma",       en:"Ghost"         }, icon:"ghost",          color:"text-zinc-400",  desc:{pt:"+30% esquiva permanente",           en:"+30% permanent dodge"           }, apply:s=>{s.permDodgeBonus=(s.permDodgeBonus||0)+0.30;} },
  { id:"mut_berserker",name:{pt:"Berserker",     en:"Berserker"     }, icon:"swords",         color:"text-red-400",   desc:{pt:"+50% ATK quando HP < 30%",          en:"+50% ATK when HP < 30%"         }, apply:s=>{s.mutBerserkerActive=true;} },
  { id:"mut_midas",   name:{pt:"Midas",          en:"Midas"         }, icon:"coins",          color:"text-yellow-400",desc:{pt:"+100% ouro, -10% XP",               en:"+100% gold, -10% XP"            }, apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+1.0; s.permXpBonus=(s.permXpBonus||0)-0.10;} },
  { id:"mut_phoenix", name:{pt:"Fénix",          en:"Phoenix"       }, icon:"flame",          color:"text-orange-400",desc:{pt:"Ressuscita 2× por batalha",          en:"Revive 2x per battle"           }, apply:s=>{s.mutPhoenixCount=(s.mutPhoenixCount||0)+2;} },
  { id:"mut_oracle",  name:{pt:"Oráculo",        en:"Oracle"        }, icon:"eye",            color:"text-violet-400",desc:{pt:"Vê o elemento e status do inimigo", en:"See enemy element and status"   }, apply:s=>{s.mutOracleActive=true;} },
];
rpg.permVampBonus = 0; rpg.permDefBonus = 0;
rpg.mutChaosActive = false; rpg.mutBerserkerActive = false;
rpg.mutPhoenixCount = 0; rpg.mutOracleActive = false;

rpg._applyMutations = function() {
  this.mutations.forEach(id => {
    const m = this.ALL_MUTATIONS.find(x=>x.id===id);
    if (m) m.apply(this);
  });
};
rpg.gainMutation = function() {
  const available = this.ALL_MUTATIONS.filter(m => !this.mutations.includes(m.id));
  if (available.length === 0) return;
  const mut = available[Math.floor(Math.random()*available.length)];
  this.mutations.push(mut.id);
  mut.apply(this);
  localStorage.setItem("rpg_mutations", JSON.stringify(this.mutations));
  showToast("🧬 Mutação: "+mut.name[this.lang]+"! "+mut.desc[this.lang], 5000);
};
rpg.renderMutations = function() {
  const el = document.getElementById("mutations-body"); if (!el) return;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">${this.mutations.length} / ${this.ALL_MUTATIONS.length} Mutações</p>
  <p class="text-[9px] text-zinc-600 text-center mb-3">Ganha mutações ao fazer Prestígio</p>
  <div class="space-y-2">` + this.ALL_MUTATIONS.map(m => {
    const owned = this.mutations.includes(m.id);
    return `<div class="flex items-center gap-3 p-2.5 rounded-xl border ${owned?"border-emerald-700/50 bg-emerald-950/10":"border-zinc-800 bg-zinc-950/60 opacity-40 grayscale"}">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${m.icon}" class="w-4 h-4 ${m.color}"></i></div>
      <div class="flex-1"><p class="text-xs font-black text-zinc-200">${m.name[this.lang]}</p><p class="text-[8px] text-zinc-500 leading-tight">${m.desc[this.lang]}</p></div>
      ${owned ? '<span class="text-emerald-400 text-lg">✓</span>' : '<span class="text-zinc-700">🔒</span>'}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};
// Patch prestige to give mutation
const _mutPrestige = rpg.renderPrestige ? rpg.renderPrestige.bind(rpg) : null;
const _origPrestigeApply = rpg.applyPrestige ? rpg.applyPrestige.bind(rpg) : null;
// Gain mutation on any prestige (patch killMonster for prestige level change detection)
let _lastPrestigeLevel = 0;





// Mutation chaos: random stat variation per battle










// Mutation vampiric on kill








// Mutation phoenix

// ═══════════════════════════════════════════════════════════════
// ── v22.0 — MODO SPEED RUN ────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.speedRunActive = false;
rpg.speedRunTimer  = 0;
rpg.speedRunStart  = 0;
rpg.speedRunBest   = JSON.parse(localStorage.getItem("rpg_sr_best") || "{}"); // { bossId: ms }
rpg._srInterval    = null;

rpg.startSpeedRun = function() {
  this.speedRunActive = true;
  this.speedRunStart  = Date.now();
  this.speedRunTimer  = 0;
  clearInterval(this._srInterval);
  this._srInterval = setInterval(() => {
    if (!this.speedRunActive) { clearInterval(this._srInterval); return; }
    this.speedRunTimer = Date.now() - this.speedRunStart;
    const el = document.getElementById("sr-timer");
    if (el) el.textContent = this._formatTime(this.speedRunTimer);
  }, 100);
  closeModal("speedrun-modal");
  this.openPreBattle(true); // Go straight to boss
  showToast("⏱ Speed Run iniciado! Derrota o boss o mais rápido possível!", 3000);
};

rpg._formatTime = function(ms) {
  const m = Math.floor(ms/60000), s = Math.floor((ms%60000)/1000), cs = Math.floor((ms%1000)/10);
  return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")+"."+String(cs).padStart(2,"0");
};

rpg.renderSpeedRun = function() {
  const el = document.getElementById("speedrun-body"); if (!el) return;
  const records = Object.entries(this.speedRunBest);
  el.innerHTML = `<div class="text-center mb-4">
    <p class="text-5xl">⏱</p>
    <p class="text-sm text-zinc-400 mt-2">Derrota bosses no menor tempo possível</p>
    <p class="text-[9px] text-zinc-600 mt-1">Rewards: +${200}% Ouro & Honra pelo tempo!</p>
  </div>
  <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 mb-4 text-xs text-zinc-400 space-y-1">
    <p>⚡ <strong class="text-zinc-200">Sem fugir</strong> — timer para quando o boss morre</p>
    <p>🏆 <strong class="text-zinc-200">Record pessoal</strong> guardado por boss</p>
    <p>🎁 <strong class="text-zinc-200">Reward</strong> bónus baseado na rapidez</p>
  </div>
  ${records.length > 0 ? `<div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 mb-4"><p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Records</p>` +
    records.slice(0,5).map(([id, ms]) => {
      const boss = this.actBosses.find(b=>b.id===id);
      return `<div class="flex justify-between items-center py-1 border-b border-zinc-900 last:border-0">
        <p class="text-xs text-zinc-300">${boss ? boss.name[this.lang] : id}</p>
        <p class="text-xs font-black text-emerald-400">${this._formatTime(ms)}</p>
      </div>`;
    }).join("") + `</div>` : ""}
  <button onclick="rpg.startSpeedRun()" class="btn-3d w-full py-3 bg-gradient-to-r from-emerald-700 to-teal-700 border border-emerald-500 text-white font-black rounded-xl uppercase tracking-wider">⏱ Iniciar Speed Run</button>`;
  lucide.createIcons();
};

// Stop timer on boss kill





















// ═══════════════════════════════════════════════════════════════
// ── v22.0 — O ORÁCULO ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.oracleConsults = parseInt(localStorage.getItem("rpg_oracle") || "0");
rpg.ORACLE_COST    = 10000;

rpg.renderOracle = function() {
  const el = document.getElementById("oracle-body"); if (!el) return;
  const nextBoss = this.actBosses[this.bossKills];
  const nextEvent = this.BATTLE_EVENTS && this.BATTLE_EVENTS[Math.floor(Date.now()/1000) % this.BATTLE_EVENTS.length];
  el.innerHTML = `<div class="text-center mb-4">
    <p class="text-5xl">🔮</p>
    <p class="text-sm font-black text-violet-300 mt-2">O Oráculo de Algoritma</p>
    <p class="text-[9px] text-zinc-500 mt-1">"Eu vejo o que os outros não podem."</p>
    <p class="text-[9px] text-zinc-600 mt-1">Consultas feitas: ${this.oracleConsults}</p>
  </div>
  <div class="space-y-3">
    <div class="bg-zinc-950/80 border border-violet-800/40 rounded-xl p-3">
      <p class="text-[9px] font-black text-violet-400 uppercase tracking-widest mb-2">🔮 Próximo Boss</p>
      ${nextBoss ? `<div class="flex items-center gap-2"><i data-lucide="${nextBoss.icon}" class="w-5 h-5 ${nextBoss.color}"></i><div><p class="text-xs font-bold text-zinc-200">${nextBoss.name[this.lang]}</p><p class="text-[9px] text-zinc-500">Req. Lvl ${nextBoss.reqLvl}</p></div></div>` : `<p class="text-xs text-zinc-500">Todos os bosses derrotados!</p>`}
    </div>
    <div class="bg-zinc-950/80 border border-amber-800/40 rounded-xl p-3">
      <p class="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-2">🎲 Próximo Evento Possível</p>
      <p class="text-xs text-zinc-300">${nextEvent ? nextEvent.name[this.lang] : "—"}</p>
    </div>
    <div class="bg-zinc-950/80 border border-emerald-800/40 rounded-xl p-3">
      <p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">🧬 Mutação Disponível</p>
      <p class="text-xs text-zinc-300">${this.mutations.length < this.ALL_MUTATIONS.length ? "Mutações disponíveis — faz Prestígio!" : "Todas as mutações obtidas!"}</p>
    </div>
    <div class="bg-zinc-950/80 border border-cyan-800/40 rounded-xl p-3">
      <p class="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-2">⭐ Próximo Talento Recomendado</p>
      <p class="text-xs text-zinc-300">${this.talentPoints > 0 ? "Tens "+this.talentPoints+" pontos disponíveis! Vai à Árvore de Talentos." : "Continua a subir de nível para mais pontos."}</p>
    </div>
  </div>
  <button onclick="rpg.oracleRevealSecret()" class="btn-3d w-full mt-4 py-3 bg-gradient-to-r from-violet-800 to-fuchsia-800 border border-violet-600 text-white font-black rounded-xl uppercase tracking-wider">🔮 Revelar Segredo (${formatNumber(this.ORACLE_COST)} 💰)</button>`;
  lucide.createIcons();
};

rpg.oracleRevealSecret = function() {
  if (this.gold < this.ORACLE_COST) { showToast(t("not_enough_gold")); return; }
  this.gold -= this.ORACLE_COST; this.oracleConsults++;
  localStorage.setItem("rpg_oracle", this.oracleConsults);
  const secrets = [
    {pt:"O próximo boss tem fraqueza a Magia. Usa mag×3 para o Combo Arcano antes de lutar.", en:"Next boss is weak to Magic. Use mag×3 for Arcane Combo before fighting."},
    {pt:"O Mercador Errante aparecerá em breve. Poupa ouro para as suas ofertas.", en:"The Wandering Merchant will appear soon. Save gold for his offers."},
    {pt:"Uma Mutação aguarda-te. O teu próximo Prestígio desbloqueará algo poderoso.", en:"A Mutation awaits. Your next Prestige will unlock something powerful."},
    {pt:"O clima vai mudar. Prepara-te para Inferno — usa armadura com alta defesa.", en:"The weather will change. Prepare for Inferno — equip high defense armor."},
    {pt:"Há uma Escolha Narrativa por fazer. Ela mudará os teus stats permanentemente.", en:"There's a Narrative Choice to be made. It will permanently change your stats."},
    {pt:"O teu Combo mais poderoso é Assalto Total (atk+mag+atk+mag). Usa em boss.", en:"Your most powerful Combo is Full Assault (atk+mag+atk+mag). Use on boss."},
    {pt:"A Relíquia Amaldiçoada 'Pedra da Ganância' vale cada penalidade de HP.", en:"The 'Greed Stone' Cursed Relic is worth every HP penalty."},
    {pt:"Forja as tuas armas ao +7 antes de enfrentar o próximo guardião.", en:"Forge your weapons to +7 before facing the next guardian."},
  ];
  const secret = secrets[this.oracleConsults % secrets.length];
  showToast("🔮 \""+secret[this.lang]+"\"", 8000);
  this.save(); this.updateUI();
};

// ═══════════════════════════════════════════════════════════════
// ── v22.0 — CRAFTING DE ITENS LENDÁRIOS ───────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.legendaryItems = JSON.parse(localStorage.getItem("rpg_legendaries") || "[]");

rpg.LEGENDARY_RECIPES = [
  {
    id:"leg_excalibur",
    name:{pt:"Excalibur Quântica", en:"Quantum Excalibur"},
    icon:"sword", color:"text-yellow-300",
    desc:{pt:"+500% ATK + Elemento Sagrado + 30% Crit",en:"+500% ATK + Holy Element + 30% Crit"},
    reqWeapons:["w_fist","w_fist","w_fist"], reqBoss:5,
    apply:s=>{ s.permAtkBonus=(s.permAtkBonus||0)+5.0; s.permCritBonus=(s.permCritBonus||0)+0.30; s.classElements[s.eqClass]="holy"; }
  },
  {
    id:"leg_aegis",
    name:{pt:"Égide Absoluta",     en:"Absolute Aegis"},
    icon:"shield", color:"text-blue-200",
    desc:{pt:"+400% HP + Imune a Atordoamento + Regen 5%/turno",en:"+400% HP + Stun Immune + 5% HP regen/turn"},
    reqArmors:["a_rags","a_rags","a_rags"], reqBoss:7,
    apply:s=>{ s.permAllBonus=(s.permAllBonus||0)+2.0; s.talentRegen=true; s.immuneStun=true; }
  },
  {
    id:"leg_abyss_ring",
    name:{pt:"Anel do Abismo",     en:"Abyss Ring"},
    icon:"circle-dashed", color:"text-purple-300",
    desc:{pt:"+300% todos stats + Elemento Vazio + Vampiro 20%",en:"+300% all stats + Void Element + 20% Vampiric"},
    reqRelics:3, reqBoss:10,
    apply:s=>{ s.permAllBonus=(s.permAllBonus||0)+3.0; s.permVampBonus=(s.permVampBonus||0)+0.20; s.classElements[s.eqClass]="void"; }
  },
];

rpg.craftLegendary = function(id) {
  const recipe = this.LEGENDARY_RECIPES.find(r=>r.id===id);
  if (!recipe) return;
  if (this.legendaryItems.includes(id)) { showToast("Já possuis este item lendário!"); return; }
  if (this.bossKills < recipe.reqBoss) { showToast("Derrota "+recipe.reqBoss+" bosses primeiro!"); return; }
  // Check relics requirement
  if (recipe.reqRelics) {
    const ownedRelics = this.inventory.filter(i=>i.startsWith("r_")).length;
    if (ownedRelics < recipe.reqRelics) { showToast("Precisas de "+recipe.reqRelics+" relíquias!"); return; }
  }
  const cost = Math.floor(this.level * 50000);
  if (this.gold < cost) { showToast("Precisas de "+formatNumber(cost)+" 💰!"); return; }
  this.gold -= cost;
  this.legendaryItems.push(id);
  recipe.apply(this);
  localStorage.setItem("rpg_legendaries", JSON.stringify(this.legendaryItems));
  this.save(); this.updateUI();
  showToast("⚡ ITEM LENDÁRIO CRIADO: "+recipe.name[this.lang]+"!", 6000);
  this.renderCraftModal();
};

rpg.renderCraftModal = function() {
  const el = document.getElementById("craft-body"); if (!el) return;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Itens Lendários — poder único e permanente</p>
  <p class="text-[9px] text-zinc-600 text-center mb-3">Custo: Lvl × 50.000 💰 + requisitos de boss</p>
  <div class="space-y-3">` + this.LEGENDARY_RECIPES.map(r => {
    const owned = this.legendaryItems.includes(r.id);
    const locked = this.bossKills < r.reqBoss;
    const cost = Math.floor(this.level * 50000);
    const canAfford = this.gold >= cost;
    return `<div class="p-3 rounded-xl border ${owned?"border-yellow-600/60 bg-yellow-950/10":"border-zinc-800 bg-zinc-950/60"} ${locked?"opacity-40 grayscale":""}">
      <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800"><i data-lucide="${r.icon}" class="w-5 h-5 ${r.color}"></i></div>
        <div class="flex-1"><p class="text-sm font-black ${r.color}">${r.name[this.lang]}</p><p class="text-[9px] text-zinc-500">${r.desc[this.lang]}</p></div>
        ${owned ? '<span class="text-yellow-400 text-xl">⚡</span>'
                : locked ? `<button disabled class="px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-600 rounded-lg text-[9px]">Boss ${r.reqBoss}</button>`
                : `<button onclick="rpg.craftLegendary('${r.id}')" class="px-2 py-1 ${canAfford?"bg-yellow-700 hover:bg-yellow-600 border border-yellow-600":"bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"} text-white rounded-lg text-[9px] font-black">${formatNumber(cost)} 💰</button>`}
      </div>
      <p class="text-[8px] text-zinc-600">Req: ${r.reqBoss} bosses${r.reqRelics?" + "+r.reqRelics+" relíquias":""}</p>
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// ═══════════════════════════════════════════════════════════════
// ── v22.0 — CLASSES SECRETAS ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.secretClassesUnlocked = JSON.parse(localStorage.getItem("rpg_secret_classes") || "[]");

rpg.SECRET_CLASS_DEFS = [
  {
    id:"the_immortal",
    name:{pt:"O Imortal",       en:"The Immortal"    }, icon:"infinity", color:"text-white",
    desc:{pt:"Renasces sempre. Imparável.", en:"You always revive. Unstoppable."},
    cond: s => s.totalDeaths >= 10,
    hint: {pt:"Morre 10 vezes...", en:"Die 10 times..."},
    class: { id:"the_immortal", name:{pt:"O Imortal",en:"The Immortal"}, icon:"infinity",
             desc:{pt:"Renasces 3× por batalha com 50% HP", en:"Revive 3x/battle at 50% HP"},
             multHp:2.0, multAtk:1.0, addCrit:0.20, addDodge:0.30, reqBosses:0 }
  },
  {
    id:"the_explorer",
    name:{pt:"O Explorador",    en:"The Explorer"    }, icon:"compass", color:"text-emerald-300",
    desc:{pt:"Conheces todos os mundos.", en:"You know all worlds."},
    cond: s => (s.dungeonsCleared||0) >= 50,
    hint: {pt:"Completa 50 dungeons...", en:"Complete 50 dungeons..."},
    class: { id:"the_explorer", name:{pt:"O Explorador",en:"The Explorer"}, icon:"compass",
             desc:{pt:"+150% Ouro & XP, +40% Esquiva", en:"+150% Gold & XP, +40% Dodge"},
             multHp:1.2, multAtk:1.5, addCrit:0.10, addDodge:0.40, reqBosses:0 }
  },
  {
    id:"the_mathematician",
    name:{pt:"O Matemático",    en:"The Mathematician"}, icon:"hash", color:"text-cyan-300",
    desc:{pt:"O universo é uma equação. Tu és a solução.", en:"The universe is an equation. You are the solution."},
    cond: s => (s.mathCorrectAnswers||0) >= 100,
    hint: {pt:"Responde 100 perguntas matemáticas...", en:"Answer 100 math questions..."},
    class: { id:"the_mathematician", name:{pt:"O Matemático",en:"The Mathematician"}, icon:"hash",
             desc:{pt:"+200% ATK via Modo Matemático, +50% XP", en:"+200% ATK via Math Mode, +50% XP"},
             multHp:0.8, multAtk:3.0, addCrit:0.40, addDodge:0.10, reqBosses:0 }
  },
];

rpg.totalDeaths       = parseInt(localStorage.getItem("rpg_deaths") || "0");
rpg.mathCorrectAnswers= parseInt(localStorage.getItem("rpg_math_correct") || "0");

rpg.checkSecretClasses = function() {
  this.SECRET_CLASS_DEFS.forEach(sc => {
    if (!this.secretClassesUnlocked.includes(sc.id) && sc.cond(this)) {
      this.secretClassesUnlocked.push(sc.id);
      this.classes[sc.id] = sc.class;
      localStorage.setItem("rpg_secret_classes", JSON.stringify(this.secretClassesUnlocked));
      showToast("🔓 Classe Secreta desbloqueada: "+sc.name[this.lang]+"! Vai à Taverna!", 6000);
    }
  });
};

rpg.renderSecretClasses = function() {
  const el = document.getElementById("secret-classes-body"); if (!el) return;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">${this.secretClassesUnlocked.length} / ${this.SECRET_CLASS_DEFS.length} Desbloqueadas</p>
  <div class="space-y-3">` + this.SECRET_CLASS_DEFS.map(sc => {
    const owned = this.secretClassesUnlocked.includes(sc.id);
    return `<div class="p-3 rounded-xl border ${owned?"border-emerald-700/50 bg-emerald-950/10":"border-zinc-800 bg-zinc-950/60"} flex items-start gap-3">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${sc.icon}" class="w-5 h-5 ${sc.color}"></i></div>
      <div class="flex-1">
        <p class="text-sm font-black ${owned?sc.color:"text-zinc-600"}">${owned ? sc.name[this.lang] : "???"}</p>
        <p class="text-[9px] ${owned?"text-zinc-400":"text-zinc-700"} mt-1">${owned ? sc.desc[this.lang] : sc.hint[this.lang]}</p>
        ${owned ? `<button onclick="rpg.changeClass('${sc.id}')" class="mt-2 px-3 py-1 bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-white rounded-lg text-[9px] font-black">Equipar</button>` : ""}
      </div>
      ${owned ? '<span class="text-emerald-400 text-xl">✓</span>' : '<span class="text-zinc-700">🔒</span>'}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Track deaths

// Track math correct answers
const _secretMathSubmit = rpg.submitMathAnswer ? rpg.submitMathAnswer.bind(rpg) : null;
if (_secretMathSubmit) {
  rpg.submitMathAnswer = function() {
    const val = parseFloat(document.getElementById("math-answer-input")?.value || "");
    const correct = this.mathQuestion && Math.abs(val - this.mathQuestion.a) < 0.01;
    if (correct) { this.mathCorrectAnswers=(this.mathCorrectAnswers||0)+1; localStorage.setItem("rpg_math_correct",this.mathCorrectAnswers); this.checkSecretClasses(); }
    _secretMathSubmit();
  };
}

// ═══════════════════════════════════════════════════════════════
// ── v23.0 — SISTEMA DE SUBCLASSES / MASTERCLASSES / GOD CLASSES
// ═══════════════════════════════════════════════════════════════

rpg.SUBCLASS_DEFS = {
  // ── Guerreiro
  warrior: [
    { id:"sc_berserker",   name:{pt:"Berserker",       en:"Berserker"      }, icon:"swords",    color:"text-red-400",
      desc:{pt:"+40% ATK, +25% Crit quando HP<50%", en:"+40% ATK, +25% Crit when HP<50%"},
      req:{level:30, bosses:2, base:"warrior"}, multHp:1.0, multAtk:1.4, addCrit:0.10, addDodge:0.0 },
    { id:"sc_guardian",    name:{pt:"Guardião",         en:"Guardian"       }, icon:"shield",    color:"text-blue-400",
      desc:{pt:"+60% HP, +20% Defesa", en:"+60% HP, +20% Defense"},
      req:{level:30, bosses:2, base:"warrior"}, multHp:1.6, multAtk:0.9, addCrit:0.0, addDodge:0.10 },
    { id:"sc_warlord",     name:{pt:"Senhor da Guerra", en:"Warlord"        }, icon:"trophy",    color:"text-orange-400",
      desc:{pt:"+30% ATK/HP, +15% Crit", en:"+30% ATK/HP, +15% Crit"},
      req:{level:30, bosses:2, base:"warrior"}, multHp:1.3, multAtk:1.3, addCrit:0.15, addDodge:0.05 },
  ],
  // ── Mago
  mage: [
    { id:"sc_archmage",    name:{pt:"Arquimago",        en:"Archmage"       }, icon:"sparkles",  color:"text-purple-400",
      desc:{pt:"+80% ATK mágico, +20% Crit", en:"+80% magic ATK, +20% Crit"},
      req:{level:30, bosses:2, base:"mage"}, multHp:0.7, multAtk:1.8, addCrit:0.20, addDodge:0.0 },
    { id:"sc_elementalist",name:{pt:"Elementalista",    en:"Elementalist"   }, icon:"flame",     color:"text-cyan-400",
      desc:{pt:"+60% ATK, +30% Esq, imune a elementos", en:"+60% ATK, +30% Dodge, element immune"},
      req:{level:30, bosses:2, base:"mage"}, multHp:0.8, multAtk:1.6, addCrit:0.10, addDodge:0.30 },
    { id:"sc_shadowmage",  name:{pt:"Bruxo das Sombras",en:"Shadow Mage"    }, icon:"moon",      color:"text-violet-400",
      desc:{pt:"+50% ATK, +30% Crit, -10% HP", en:"+50% ATK, +30% Crit, -10% HP"},
      req:{level:30, bosses:2, base:"mage"}, multHp:0.6, multAtk:1.5, addCrit:0.30, addDodge:0.05 },
  ],
  // ── Assassino
  rogue: [
    { id:"sc_assassin",   name:{pt:"Assassino",        en:"Assassin"       }, icon:"scissors",  color:"text-red-300",
      desc:{pt:"+50% Crit, +25% Esq", en:"+50% Crit, +25% Dodge"},
      req:{level:30, bosses:2, base:"rogue"}, multHp:0.85, multAtk:1.2, addCrit:0.50, addDodge:0.25 },
    { id:"sc_shadowdancer",name:{pt:"Dançarino das Sombras",en:"Shadow Dancer"}, icon:"wind",   color:"text-indigo-300",
      desc:{pt:"+40% Esq/Crit, Sombras curam 3% HP/turno", en:"+40% Dodge/Crit, Shadows heal 3%/turn"},
      req:{level:30, bosses:2, base:"rogue"}, multHp:0.9, multAtk:1.1, addCrit:0.40, addDodge:0.40 },
    { id:"sc_illusionist", name:{pt:"Ilusionista",      en:"Illusionist"    }, icon:"eye",       color:"text-pink-300",
      desc:{pt:"+60% Esq, 20% esquivas contra-atacam", en:"+60% Dodge, 20% dodges counter"},
      req:{level:30, bosses:2, base:"rogue"}, multHp:0.8, multAtk:1.0, addCrit:0.20, addDodge:0.60 },
  ],
  // ── Cavaleiro
  paladin: [
    { id:"sc_crusader",   name:{pt:"Cruzado",          en:"Crusader"       }, icon:"cross",     color:"text-yellow-300",
      desc:{pt:"+50% HP, +30% ATK, dano sagrado", en:"+50% HP, +30% ATK, holy damage"},
      req:{level:30, bosses:2, base:"paladin"}, multHp:1.5, multAtk:1.3, addCrit:0.10, addDodge:0.10 },
    { id:"sc_inquisitor", name:{pt:"Inquisidor",       en:"Inquisitor"     }, icon:"flame",     color:"text-amber-400",
      desc:{pt:"+40% ATK, Ataques queimam inimigos", en:"+40% ATK, Attacks burn enemies"},
      req:{level:30, bosses:2, base:"paladin"}, multHp:1.2, multAtk:1.4, addCrit:0.15, addDodge:0.05 },
    { id:"sc_deathknight",name:{pt:"Cavaleiro da Morte",en:"Death Knight"  }, icon:"skull",     color:"text-green-300",
      desc:{pt:"+30% HP/ATK, Veneno passivo em batalha", en:"+30% HP/ATK, Passive poison in battle"},
      req:{level:30, bosses:2, base:"paladin"}, multHp:1.3, multAtk:1.3, addCrit:0.10, addDodge:0.10 },
  ],
};

rpg.MASTERCLASS_DEFS = [
  { id:"mc_warchief",    name:{pt:"Chefe de Guerra",   en:"War Chief"      }, icon:"swords",    color:"text-red-500",
    desc:{pt:"+100% ATK/HP, Fúria dobrada", en:"+100% ATK/HP, double Fury"},
    req:{level:80, bosses:6, subclass:true}, multHp:2.0, multAtk:2.0, addCrit:0.25, addDodge:0.10 },
  { id:"mc_titan",       name:{pt:"Muro de Titã",      en:"Titan Wall"     }, icon:"shield",    color:"text-blue-500",
    desc:{pt:"+200% HP, -50% dano recebido", en:"+200% HP, -50% damage taken"},
    req:{level:80, bosses:6, subclass:true}, multHp:3.0, multAtk:1.2, addCrit:0.10, addDodge:0.20 },
  { id:"mc_spellweaver", name:{pt:"Feiticeiro Supremo", en:"Supreme Mage"  }, icon:"sparkles",  color:"text-purple-500",
    desc:{pt:"+200% ATK mágico, Críticos duplos", en:"+200% magic ATK, double crits"},
    req:{level:80, bosses:6, subclass:true}, multHp:0.8, multAtk:3.0, addCrit:0.40, addDodge:0.10 },
  { id:"mc_voidweaver",  name:{pt:"Tecelão do Vazio",  en:"Void Weaver"    }, icon:"moon",      color:"text-violet-500",
    desc:{pt:"+150% ATK, +50% Esq, ataques drenam vida", en:"+150% ATK, +50% Dodge, attacks drain HP"},
    req:{level:80, bosses:6, subclass:true}, multHp:1.2, multAtk:2.5, addCrit:0.30, addDodge:0.50 },
  { id:"mc_phantom",     name:{pt:"Fantasma",          en:"Phantom"        }, icon:"ghost",     color:"text-zinc-400",
    desc:{pt:"+80% Esq, ataques impossíveis de esquivar", en:"+80% Dodge, unblockable attacks"},
    req:{level:80, bosses:6, subclass:true}, multHp:1.0, multAtk:1.8, addCrit:0.50, addDodge:0.80 },
  { id:"mc_bladedancer", name:{pt:"Dançarino da Lâmina",en:"Blade Dancer"  }, icon:"wind",      color:"text-pink-500",
    desc:{pt:"+80% ATK/Crit, Ataques em cascata", en:"+80% ATK/Crit, Cascade attacks"},
    req:{level:80, bosses:6, subclass:true}, multHp:1.0, multAtk:1.8, addCrit:0.80, addDodge:0.30 },
  { id:"mc_champion",    name:{pt:"Campeão Divino",    en:"Divine Champion"}, icon:"trophy",     color:"text-yellow-500",
    desc:{pt:"+150% todos stats", en:"+150% all stats"},
    req:{level:80, bosses:6, subclass:true}, multHp:2.5, multAtk:2.5, addCrit:0.30, addDodge:0.30 },
  { id:"mc_lichking",    name:{pt:"Rei Lich",          en:"Lich King"      }, icon:"skull",      color:"text-emerald-400",
    desc:{pt:"+300% ATK, Imune a morte 1x por batalha", en:"+300% ATK, immune to death 1x/battle"},
    req:{level:80, bosses:6, subclass:true}, multHp:1.5, multAtk:4.0, addCrit:0.40, addDodge:0.20 },
];

rpg.GODCLASS_DEFS = [
  { id:"gc_wargod",    name:{pt:"Avatar da Guerra",  en:"Avatar of War"   }, icon:"swords",  color:"text-red-400",
    desc:{pt:"+500% ATK, Modo Deus ativo em batalha", en:"+500% ATK, God Mode active in battle"},
    req:{level:150, bosses:10, masterclass:true}, multHp:5.0, multAtk:6.0, addCrit:0.60, addDodge:0.30 },
  { id:"gc_arcane",   name:{pt:"Deus Arcano",       en:"Arcane God"      }, icon:"sparkles",color:"text-purple-400",
    desc:{pt:"+500% ATK mágico, Crits causam 10x", en:"+500% magic ATK, Crits deal 10x"},
    req:{level:150, bosses:10, masterclass:true}, multHp:3.0, multAtk:6.0, addCrit:0.95, addDodge:0.20 },
  { id:"gc_death",    name:{pt:"Fantasma da Morte", en:"Death Phantom"   }, icon:"ghost",   color:"text-zinc-300",
    desc:{pt:"+400% Esq/Crit, Ataques drenam 20% HP", en:"+400% Dodge/Crit, attacks drain 20% HP"},
    req:{level:150, bosses:10, masterclass:true}, multHp:2.0, multAtk:4.0, addCrit:0.95, addDodge:0.95 },
  { id:"gc_sovereign",name:{pt:"Soberano Divino",   en:"Divine Sovereign"}, icon:"crown",   color:"text-yellow-300",
    desc:{pt:"+1000% todos stats", en:"+1000% all stats"},
    req:{level:150, bosses:10, masterclass:true}, multHp:11.0, multAtk:11.0, addCrit:0.99, addDodge:0.99 },
];

rpg.unlockedSubclasses   = JSON.parse(localStorage.getItem("rpg_subclasses")||"[]");
rpg.unlockedMasterclasses= JSON.parse(localStorage.getItem("rpg_masterclasses")||"[]");
rpg.unlockedGodclasses   = JSON.parse(localStorage.getItem("rpg_godclasses")||"[]");
rpg.equippedSubclass     = localStorage.getItem("rpg_eq_subclass")||null;
rpg.equippedMasterclass  = localStorage.getItem("rpg_eq_masterclass")||null;
rpg.equippedGodclass     = localStorage.getItem("rpg_eq_godclass")||null;

rpg.checkAdvancedClasses = function() {
  const bossesDefeated = (this.defeatedBosses||[]).length;
  const hasSubclass = !!this.equippedSubclass;
  const hasMasterclass = !!this.equippedMasterclass;
  // Check SubClasses
  Object.values(this.SUBCLASS_DEFS).flat().forEach(sc => {
    if (!this.unlockedSubclasses.includes(sc.id)) {
      const req = sc.req;
      if (this.level >= req.level && bossesDefeated >= req.bosses && this.eqClass === req.base) {
        this.unlockedSubclasses.push(sc.id);
        localStorage.setItem("rpg_subclasses", JSON.stringify(this.unlockedSubclasses));
        showToast("⚔️ SubClasse Desbloqueada: " + sc.name[this.lang] + "!", 5000);
      }
    }
  });
  // Check MasterClasses
  this.MASTERCLASS_DEFS.forEach(mc => {
    if (!this.unlockedMasterclasses.includes(mc.id)) {
      if (this.level >= mc.req.level && bossesDefeated >= mc.req.bosses && hasSubclass) {
        this.unlockedMasterclasses.push(mc.id);
        localStorage.setItem("rpg_masterclasses", JSON.stringify(this.unlockedMasterclasses));
        showToast("🏆 MasterClass Desbloqueada: " + mc.name[this.lang] + "!", 5000);
      }
    }
  });
  // Check GodClasses
  this.GODCLASS_DEFS.forEach(gc => {
    if (!this.unlockedGodclasses.includes(gc.id)) {
      if (this.level >= gc.req.level && bossesDefeated >= gc.req.bosses && hasMasterclass) {
        this.unlockedGodclasses.push(gc.id);
        localStorage.setItem("rpg_godclasses", JSON.stringify(this.unlockedGodclasses));
        showToast("⚡ GOD CLASS Desbloqueada: " + gc.name[this.lang] + "!", 6000);
      }
    }
  });
};

rpg.getAdvancedClassBonus = function() {
  let bonus = { multHp: 1, multAtk: 1, addCrit: 0, addDodge: 0 };
  const apply = (def) => {
    bonus.multHp  *= def.multHp;
    bonus.multAtk *= def.multAtk;
    bonus.addCrit += def.addCrit;
    bonus.addDodge+= def.addDodge;
  };
  if (this.equippedSubclass) {
    const sc = Object.values(this.SUBCLASS_DEFS).flat().find(s=>s.id===this.equippedSubclass);
    if (sc) apply(sc);
  }
  if (this.equippedMasterclass) {
    const mc = this.MASTERCLASS_DEFS.find(m=>m.id===this.equippedMasterclass);
    if (mc) apply(mc);
  }
  if (this.equippedGodclass) {
    const gc = this.GODCLASS_DEFS.find(g=>g.id===this.equippedGodclass);
    if (gc) apply(gc);
  }
  return bonus;
};

rpg.equipAdvancedClass = function(type, id) {
  if (type === "sub") {
    this.equippedSubclass = id;
    localStorage.setItem("rpg_eq_subclass", id);
  } else if (type === "master") {
    this.equippedMasterclass = id;
    localStorage.setItem("rpg_eq_masterclass", id);
  } else if (type === "god") {
    this.equippedGodclass = id;
    localStorage.setItem("rpg_eq_godclass", id);
  }
  this.save();
  this.renderAdvancedClasses();
  this.updateUI();
  const allDefs = [...Object.values(this.SUBCLASS_DEFS).flat(), ...this.MASTERCLASS_DEFS, ...this.GODCLASS_DEFS];
  const def = allDefs.find(d=>d.id===id);
  if (def) showToast("✅ " + def.name[this.lang] + " equipada!", 2500);
};

rpg.renderAdvancedClasses = function() {
  const el = document.getElementById("advanced-classes-body"); if (!el) return;
  const bossesDefeated = (this.defeatedBosses||[]).length;
  const hasSubclass = !!this.equippedSubclass;
  const hasMasterclass = !!this.equippedMasterclass;

  const renderTier = (title, color, defs, type, ownedList, equippedId, reqDesc) => {
    const owned = defs.filter(d => ownedList.includes(d.id));
    const locked = defs.filter(d => !ownedList.includes(d.id));
    return `<div class="mb-5">
      <p class="text-[9px] font-black ${color} uppercase tracking-widest mb-2">${title}</p>
      <p class="text-[8px] text-zinc-600 mb-2">${reqDesc}</p>
      <div class="space-y-2">
        ${owned.map(d => `<div class="p-2 rounded-xl border ${equippedId===d.id ? "border-yellow-600/50 bg-yellow-950/20" : "border-zinc-700 bg-zinc-950/60"} flex items-center gap-2">
          <i data-lucide="${d.icon}" class="w-4 h-4 ${d.color} flex-shrink-0"></i>
          <div class="flex-1">
            <p class="text-[9px] font-black ${d.color}">${d.name[this.lang]}</p>
            <p class="text-[7px] text-zinc-500">${d.desc[this.lang]}</p>
          </div>
          <button onclick="rpg.equipAdvancedClass('${type}','${d.id}')" class="text-[8px] px-2 py-0.5 rounded ${equippedId===d.id ? "bg-yellow-700 text-yellow-200" : "bg-zinc-700 hover:bg-zinc-600 text-white"} font-bold">
            ${equippedId===d.id ? "✓ Ativa" : "Equipar"}
          </button>
        </div>`).join("")}
        ${locked.length > 0 ? `<p class="text-[7px] text-zinc-700">${locked.length} bloqueada(s) — ${reqDesc}</p>` : ""}
      </div>
    </div>`;
  };

  const subAll = Object.values(this.SUBCLASS_DEFS).flat();
  const bonus = this.getAdvancedClassBonus();

  el.innerHTML = `
    <div class="p-2 bg-zinc-900/80 border border-zinc-800 rounded-xl mb-4 text-[8px] text-zinc-400">
      <p class="font-black text-zinc-300 mb-1">Bônus Ativo</p>
      <p>ATK ×${bonus.multAtk.toFixed(1)} · HP ×${bonus.multHp.toFixed(1)} · Crit +${Math.round(bonus.addCrit*100)}% · Esq +${Math.round(bonus.addDodge*100)}%</p>
    </div>
    ${renderTier("⚔️ SubClasses", "text-blue-400", subAll, "sub", this.unlockedSubclasses, this.equippedSubclass, "Requer Lvl 30 + 2 Bosses + Classe Base equipada")}
    ${renderTier("🏆 MasterClasses", "text-purple-400", this.MASTERCLASS_DEFS, "master", this.unlockedMasterclasses, this.equippedMasterclass, "Requer Lvl 80 + 6 Bosses + SubClasse equipada")}
    ${renderTier("⚡ God Classes", "text-yellow-400", this.GODCLASS_DEFS, "god", this.unlockedGodclasses, this.equippedGodclass, "Requer Lvl 150 + 10 Bosses + MasterClass equipada")}
  `;
  try { lucide.createIcons({ nodes: [el] }); } catch(e) { lucide.createIcons(); }
};

// NOTE: Advanced class bonuses are applied directly inside the definitive
// getAtk / getMaxHp / getCritChance / getDodgeChance functions below (~line 12853+)
// and checkAdvancedClasses is called inside the CONSOLIDATED killMonster hook.
// No intermediate wrappers needed here.

// ── v23.0 — SAVE / INIT PATCHES ───────────────────────────────

























































// ═══════════════════════════════════════════════════════════════
// ── v23.0 — TEMPORADA DE ARENA (RANKING SEMANAL) ─────────────
// ═══════════════════════════════════════════════════════════════

rpg.arenaSeasonPoints  = parseInt(localStorage.getItem("rpg_season_pts") || "0");
rpg.arenaSeasonWeek    = parseInt(localStorage.getItem("rpg_season_week") || "0");
rpg.arenaSeasonHistory = JSON.parse(localStorage.getItem("rpg_season_hist") || "[]");
rpg.arenaSeasonBestRank= parseInt(localStorage.getItem("rpg_season_best_rank") || "999");

rpg.ARENA_SEASON_RANKS = [
  { min:0,    name:{pt:"Bronze III",  en:"Bronze III" }, color:"text-amber-700",  reward:50  },
  { min:100,  name:{pt:"Bronze II",   en:"Bronze II"  }, color:"text-amber-600",  reward:100 },
  { min:300,  name:{pt:"Bronze I",    en:"Bronze I"   }, color:"text-amber-500",  reward:200 },
  { min:600,  name:{pt:"Prata III",   en:"Silver III" }, color:"text-zinc-400",   reward:350 },
  { min:1000, name:{pt:"Prata II",    en:"Silver II"  }, color:"text-zinc-300",   reward:500 },
  { min:1500, name:{pt:"Prata I",     en:"Silver I"   }, color:"text-zinc-200",   reward:700 },
  { min:2200, name:{pt:"Ouro III",    en:"Gold III"   }, color:"text-yellow-500", reward:1000},
  { min:3000, name:{pt:"Ouro II",     en:"Gold II"    }, color:"text-yellow-400", reward:1400},
  { min:4000, name:{pt:"Ouro I",      en:"Gold I"     }, color:"text-yellow-300", reward:2000},
  { min:5500, name:{pt:"Platina",     en:"Platinum"   }, color:"text-cyan-300",   reward:3000},
  { min:8000, name:{pt:"Diamante",    en:"Diamond"    }, color:"text-blue-300",   reward:5000},
  { min:12000,name:{pt:"Mestre",      en:"Master"     }, color:"text-violet-400", reward:8000},
  { min:20000,name:{pt:"Lenda",       en:"Legend"     }, color:"text-rose-400",   reward:15000},
];

rpg.getCurrentSeasonRank = function() {
  let rank = this.ARENA_SEASON_RANKS[0];
  for (const r of this.ARENA_SEASON_RANKS) { if (this.arenaSeasonPoints >= r.min) rank = r; }
  return rank;
};

rpg.addSeasonPoints = function(pts) {
  const week = this._getWeekNumber();
  if (week !== this.arenaSeasonWeek) {
    // New week — archive and reset
    if (this.arenaSeasonPoints > 0) {
      const rank = this.getCurrentSeasonRank();
      const reward = rank.reward;
      this.arenaSeasonHistory.unshift({ week: this.arenaSeasonWeek, pts: this.arenaSeasonPoints, rank: rank.name[this.lang], reward });
      if (this.arenaSeasonHistory.length > 8) this.arenaSeasonHistory.pop();
      this.honor = (this.honor||0) + reward;
      showToast("🏅 Temporada encerrada! Rank: "+rank.name[this.lang]+" +"+reward+" Honra", 5000);
    }
    this.arenaSeasonPoints = 0;
    this.arenaSeasonWeek   = week;
    localStorage.setItem("rpg_season_week", week);
  }
  this.arenaSeasonPoints += pts;
  if (this.arenaSeasonPoints < this.arenaSeasonBestRank || this.arenaSeasonBestRank === 999)
    this.arenaSeasonBestRank = this.arenaSeasonPoints;
  localStorage.setItem("rpg_season_pts",       this.arenaSeasonPoints);
  localStorage.setItem("rpg_season_best_rank", this.arenaSeasonBestRank);
  localStorage.setItem("rpg_season_hist",      JSON.stringify(this.arenaSeasonHistory));
};

rpg._getWeekNumber = function() {
  return Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
};

rpg.renderArenaSeasonModal = function() {
  const el = document.getElementById("arena-season-body"); if (!el) return;
  const rank = this.getCurrentSeasonRank();
  const nextRank = this.ARENA_SEASON_RANKS[this.ARENA_SEASON_RANKS.indexOf(rank)+1];
  const pct = nextRank ? Math.min(100, Math.floor(((this.arenaSeasonPoints - rank.min) / (nextRank.min - rank.min)) * 100)) : 100;
  el.innerHTML = `
    <div class="bg-zinc-950/80 border border-yellow-800/40 rounded-xl p-4 text-center mb-4">
      <p class="text-3xl font-black ${rank.color}">${rank.name[this.lang]}</p>
      <p class="text-[9px] text-zinc-500 mt-1">${formatNumber(this.arenaSeasonPoints)} pts esta semana</p>
      <div class="w-full h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden">
        <div class="h-full rounded-full bg-gradient-to-r from-yellow-700 to-amber-500 transition-all" style="width:${pct}%"></div>
      </div>
      ${nextRank ? `<p class="text-[8px] text-zinc-600 mt-1">Próximo: ${nextRank.name[this.lang]} (${formatNumber(nextRank.min)} pts)</p>` : `<p class="text-[8px] text-amber-400 mt-1">Rank Máximo!</p>`}
    </div>
    <div class="grid grid-cols-2 gap-3 mb-4">
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 text-center">
        <p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Melhor Record</p>
        <p class="text-xl font-black text-emerald-400">${formatNumber(this.arenaSeasonBestRank === 999 ? 0 : this.arenaSeasonBestRank)}</p>
      </div>
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 text-center">
        <p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Reward desta semana</p>
        <p class="text-xl font-black text-yellow-400">${rank.reward} 🏅</p>
      </div>
    </div>
    <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 mb-4 text-xs text-zinc-400 space-y-1">
      <p>⚔ Ganhas pontos por batalhas em dificuldade alta</p>
      <p>🏆 Boss kills = +100 pts · Desafios = ×2 pts</p>
      <p>🌊 Ondas = +pts por onda · Speed run = +bónus</p>
    </div>
    ${this.arenaSeasonHistory.length > 0 ? `<div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3">
      <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Histórico</p>
      ${this.arenaSeasonHistory.slice(0,4).map(h => `
        <div class="flex justify-between items-center py-1 border-b border-zinc-900 last:border-0">
          <div><p class="text-[9px] font-bold text-zinc-300">${h.rank}</p><p class="text-[7px] text-zinc-600">Semana ${h.week} · ${formatNumber(h.pts)} pts</p></div>
          <p class="text-[9px] font-black text-yellow-400">+${h.reward} 🏅</p>
        </div>`).join("")}
    </div>` : ""}`;
  lucide.createIcons();
};

// Award season points on kills










// ═══════════════════════════════════════════════════════════════
// ── v23.0 — SISTEMA DE LEGADOS (HERANÇA ENTRE PRESSÁGIOS) ─────
// ═══════════════════════════════════════════════════════════════

rpg.heirlooms = JSON.parse(localStorage.getItem("rpg_heirlooms") || "[]"); // [{itemId, type, forgeLevel}]
rpg.MAX_HEIRLOOMS = 3;

rpg.addHeirloom = function(itemId, type) {
  if (this.heirlooms.length >= this.MAX_HEIRLOOMS) { showToast("Máximo "+this.MAX_HEIRLOOMS+" Legados!"); return; }
  if (this.heirlooms.find(h=>h.itemId===itemId)) { showToast("Já é Legado!"); return; }
  const fl = this.getForgeLevel ? this.getForgeLevel(itemId) : 0;
  this.heirlooms.push({ itemId, type, forgeLevel: fl });
  localStorage.setItem("rpg_heirlooms", JSON.stringify(this.heirlooms));
  showToast("📜 Legado definido: "+itemId+"! Passará à próxima vida com +"+Math.floor(fl/2)+" forja.", 4000);
  this.renderHeirlooms();
};

rpg.removeHeirloom = function(itemId) {
  this.heirlooms = this.heirlooms.filter(h=>h.itemId!==itemId);
  localStorage.setItem("rpg_heirlooms", JSON.stringify(this.heirlooms));
  this.renderHeirlooms();
};

rpg.applyHeirlooms = function() {
  this.heirlooms.forEach(h => {
    if (!this.inventory.includes(h.itemId)) {
      this.inventory.push(h.itemId);
      if (h.type === "weapon" && !this.eqWeapon) this.eqWeapon = h.itemId;
      if (h.type === "armor"  && !this.eqArmor)  this.eqArmor  = h.itemId;
    }
    if (this.forgeUpgrades && h.forgeLevel > 0) {
      const inheritedLevel = Math.max(this.forgeUpgrades[h.itemId]||0, Math.floor(h.forgeLevel/2));
      this.forgeUpgrades[h.itemId] = inheritedLevel;
    }
  });
};

rpg.renderHeirlooms = function() {
  const el = document.getElementById("heirloom-body"); if (!el) return;
  const weapons = this.weapons ? this.weapons.filter(w=>this.inventory.includes(w.id)) : [];
  const armors  = this.armors  ? this.armors.filter(a=>this.inventory.includes(a.id))  : [];
  const all = [...weapons.map(w=>({...w,type:"weapon"})), ...armors.map(a=>({...a,type:"armor"}))];
  el.innerHTML = `
    <div class="bg-zinc-950/80 border border-amber-800/40 rounded-xl p-3 mb-3">
      <p class="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1">Legados Activos: ${this.heirlooms.length} / ${this.MAX_HEIRLOOMS}</p>
      <p class="text-[9px] text-zinc-500">Itens que passam ao próximo Prestígio com 50% do nível de Forja.</p>
    </div>
    ${this.heirlooms.length > 0 ? `<div class="space-y-1 mb-3">` + this.heirlooms.map(h => {
      const item = all.find(x=>x.id===h.itemId);
      return `<div class="flex items-center gap-2 p-2 rounded-xl border border-amber-700/40 bg-amber-950/10">
        ${item ? `<i data-lucide="${item.icon}" class="w-4 h-4 text-amber-400 flex-shrink-0"></i>
        <p class="flex-1 text-xs font-bold text-zinc-200">${item.name[this.lang]} <span class="text-amber-500">+${h.forgeLevel}</span></p>` : `<p class="flex-1 text-xs text-zinc-500">${h.itemId}</p>`}
        <button onclick="rpg.removeHeirloom('${h.itemId}')" class="text-[9px] text-zinc-600 hover:text-red-400 transition px-1">✕</button>
      </div>`;
    }).join("") + `</div>` : `<p class="text-zinc-600 text-xs text-center mb-3 p-3">Nenhum legado definido ainda.</p>`}
    <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Itens disponíveis</p>
    <div class="space-y-1 max-h-48 overflow-y-auto hide-scrollbar">
    ${all.map(item => {
      const isLegacy = this.heirlooms.find(h=>h.itemId===item.id);
      const fl = this.getForgeLevel ? this.getForgeLevel(item.id) : 0;
      return `<div class="flex items-center gap-2 p-2 rounded-xl border border-zinc-800 bg-zinc-950/60">
        <i data-lucide="${item.icon}" class="w-4 h-4 text-zinc-400 flex-shrink-0"></i>
        <p class="flex-1 text-xs text-zinc-300">${item.name[this.lang]}${fl>0?` <span class="text-orange-400">+${fl}</span>`:""}</p>
        ${isLegacy ? `<span class="text-amber-400 text-[9px] font-black">📜 Legado</span>`
          : this.heirlooms.length < this.MAX_HEIRLOOMS
            ? `<button onclick="rpg.addHeirloom('${item.id}','${item.type}')" class="px-2 py-1 bg-amber-900/40 border border-amber-700/50 text-amber-400 rounded-lg text-[9px] font-black hover:bg-amber-900/60 transition">Definir</button>`
            : `<span class="text-zinc-700 text-[9px]">Max</span>`}
      </div>`;
    }).join("")}
    </div>`;
  lucide.createIcons();
};

// ═══════════════════════════════════════════════════════════════
// ── v23.0 — BANCO DE ALGORITMA (JURO PASSIVO) ─────────────────
// ═══════════════════════════════════════════════════════════════

rpg.bankDeposit     = parseInt(localStorage.getItem("rpg_bank") || "0");
rpg.bankLastCollect = parseInt(localStorage.getItem("rpg_bank_time") || Date.now().toString());
rpg.BANK_INTEREST   = 0.002; // 0.2% por kill
rpg.BANK_CAP_MULT   = 10;    // max depósito = level × 1000 × 10

rpg.getBankCap = function() { return this.level * 10000; };
rpg.getBankInterestPending = function() {
  const kills = this.kills - parseInt(localStorage.getItem("rpg_bank_kills_at") || "0");
  return Math.floor(this.bankDeposit * this.BANK_INTEREST * Math.max(0, kills));
};

rpg.depositBank = function(amount) {
  const cap = this.getBankCap();
  const canDeposit = Math.min(amount, cap - this.bankDeposit, this.gold);
  if (canDeposit <= 0) { showToast("Depósito impossível! Cap ou ouro insuficiente."); return; }
  this.gold       -= canDeposit;
  this.bankDeposit += canDeposit;
  localStorage.setItem("rpg_bank", this.bankDeposit);
  localStorage.setItem("rpg_bank_kills_at", this.kills);
  this.save(); this.updateUI();
  showToast("🏦 Depositado: "+formatNumber(canDeposit)+" 💰 no Banco!", 3000);
  this.renderBank();
};

rpg.withdrawBank = function() {
  const interest = this.getBankInterestPending();
  const total = this.bankDeposit + interest;
  this.gold       += total;
  this.bankDeposit  = 0;
  localStorage.setItem("rpg_bank", 0);
  localStorage.setItem("rpg_bank_kills_at", this.kills);
  this.save(); this.updateUI();
  showToast("🏦 Levantado: "+formatNumber(total)+" 💰 (+"+ formatNumber(interest)+" juros)!", 4000);
  this.renderBank();
};

rpg.renderBank = function() {
  const el = document.getElementById("bank-body"); if (!el) return;
  const cap      = this.getBankCap();
  const interest = this.getBankInterestPending();
  const pct      = Math.min(100, Math.floor((this.bankDeposit / cap) * 100));
  el.innerHTML = `
    <div class="text-center mb-4">
      <p class="text-4xl">🏦</p>
      <p class="text-sm font-black text-zinc-200 mt-2">Banco de Algoritma</p>
      <p class="text-[9px] text-zinc-500 mt-1">0.2% de juros por batalha ganha</p>
    </div>
    <div class="space-y-3 mb-4">
      <div class="bg-zinc-950/80 border border-yellow-800/40 rounded-xl p-3">
        <div class="flex justify-between mb-1"><p class="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Depósito</p><p class="text-[9px] text-zinc-600">${pct}% do cap</p></div>
        <p class="text-2xl font-black text-yellow-400">${formatNumber(this.bankDeposit)} 💰</p>
        <div class="w-full h-1.5 bg-zinc-800 rounded-full mt-2 overflow-hidden"><div class="h-full bg-gradient-to-r from-yellow-700 to-amber-500 rounded-full" style="width:${pct}%"></div></div>
        <p class="text-[8px] text-zinc-600 mt-1">Cap: ${formatNumber(cap)} 💰</p>
      </div>
      <div class="bg-zinc-950/80 border border-emerald-800/40 rounded-xl p-3">
        <p class="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Juros acumulados</p>
        <p class="text-xl font-black text-emerald-400">+${formatNumber(interest)} 💰</p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <p class="text-[9px] text-zinc-600 mb-1 text-center">Depositar</p>
        <div class="flex gap-1">
          <input id="bank-amount" type="number" min="1" class="flex-1 bg-zinc-800 border border-zinc-700 text-white rounded-lg px-2 py-2 text-xs" placeholder="${formatNumber(Math.floor(this.gold/2))}">
          <button onclick="rpg.depositBank(parseInt(document.getElementById('bank-amount').value)||0)" class="px-3 py-2 bg-yellow-700 hover:bg-yellow-600 border border-yellow-600 text-white rounded-lg text-xs font-black transition">+</button>
        </div>
      </div>
      <div>
        <p class="text-[9px] text-zinc-600 mb-1 text-center">Levantar tudo</p>
        <button onclick="rpg.withdrawBank()" class="${this.bankDeposit > 0 ? "bg-emerald-700 hover:bg-emerald-600 border-emerald-600" : "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"} w-full py-2 border text-white rounded-lg text-xs font-black transition">Levantar ${formatNumber(this.bankDeposit + interest)} 💰</button>
      </div>
    </div>`;
  lucide.createIcons();
};

// ═══════════════════════════════════════════════════════════════
// ── v23.0 — MODO INFINITO (POST-NG+4) ────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.infiniteModeActive = false;
rpg.infiniteWave       = 0;
rpg.infiniteBestWave   = parseInt(localStorage.getItem("rpg_inf_best") || "0");
rpg.INFINITE_SCALE     = 1.25; // +25% por onda infinita

rpg.startInfiniteMode = function() {
  if ((this.ngPlusActive||0) < 4 && this.bossKills < this.actBosses.length) {
    showToast("Completa NG+4 ou todos os bosses para desbloquear Modo Infinito!"); return;
  }
  this.infiniteModeActive = true;
  this.infiniteWave       = 0;
  closeModal("infinite-modal");
  showToast("∞ MODO INFINITO ATIVADO! Sem fim. Sem limites.", 4000);
  this.openPreBattle(false);
};

rpg.renderInfiniteModal = function() {
  const el = document.getElementById("infinite-body"); if (!el) return;
  const can = (this.ngPlusActive||0) >= 4 || this.bossKills >= this.actBosses.length;
  el.innerHTML = `
    <div class="text-center mb-4">
      <p class="text-6xl font-black text-violet-400">∞</p>
      <p class="text-sm font-black text-zinc-200 mt-2">Modo Infinito</p>
      <p class="text-[9px] text-zinc-500 mt-1">Geração procedural sem fim. Inimigos escalam infinitamente.</p>
    </div>
    <div class="grid grid-cols-2 gap-3 mb-4">
      <div class="bg-zinc-950/80 border border-violet-800/40 rounded-xl p-3 text-center">
        <p class="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Melhor Onda ∞</p>
        <p class="text-2xl font-black text-violet-400">${this.infiniteBestWave}</p>
      </div>
      <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 text-center">
        <p class="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Escala por Onda</p>
        <p class="text-2xl font-black text-amber-400">+25%</p>
      </div>
    </div>
    <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 mb-4 text-xs text-zinc-400 space-y-1">
      <p>∞ Inimigos escalam +25% por onda sem limite</p>
      <p>💰 Rewards escalam proporcionalmente</p>
      <p>🏆 Cada 50 ondas desbloqueia cosméticos exclusivos</p>
      <p>🔒 Requer: NG+4 ou todos os Bosses derrotados</p>
    </div>
    ${can
      ? `<button onclick="rpg.startInfiniteMode()" class="btn-3d w-full py-3 bg-gradient-to-r from-violet-800 to-fuchsia-800 border border-violet-600 text-white font-black rounded-xl uppercase tracking-wider">∞ Entrar no Modo Infinito</button>`
      : `<div class="text-center text-xs text-zinc-500 p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl">Completa NG+4 ou todos os ${this.actBosses.length} bosses para desbloquear</div>`}`;
  lucide.createIcons();
};

// Patch spawn for infinite mode


























// ═══════════════════════════════════════════════════════════════
// ── v23.0 — SELOS DE COLEÇÃO (COSMÉTICOS) ─────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.collectedSeals = JSON.parse(localStorage.getItem("rpg_seals") || "[]");
rpg.SEALS = [
  { id:"s_first_blood",  name:{pt:"Primeiro Sangue",    en:"First Blood"      }, icon:"droplet",       color:"text-red-400",    desc:{pt:"Primeira batalha ganha",       en:"First battle won"       }, cond:s=>s.kills>=1            },
  { id:"s_centurion",    name:{pt:"Centurião",           en:"Centurion"        }, icon:"shield",        color:"text-blue-400",   desc:{pt:"Mata 100 inimigos",            en:"Kill 100 enemies"       }, cond:s=>s.kills>=100          },
  { id:"s_boss_slayer",  name:{pt:"Caçador",             en:"Boss Slayer"      }, icon:"skull",         color:"text-rose-400",   desc:{pt:"Derrota 5 bosses",             en:"Defeat 5 bosses"        }, cond:s=>s.bossKills>=5        },
  { id:"s_wave_surfer",  name:{pt:"Surfista",            en:"Wave Surfer"      }, icon:"waves",         color:"text-teal-400",   desc:{pt:"Sobrevive à onda 20",          en:"Survive wave 20"        }, cond:s=>s.bestWave>=20        },
  { id:"s_alchemist",    name:{pt:"Alquimista",          en:"Alchemist"        }, icon:"flask-conical", color:"text-purple-400", desc:{pt:"Compra 20 itens na loja",      en:"Buy 20 shop items"      }, cond:s=>(s.totalItemsBought||0)>=20 },
  { id:"s_prestige",     name:{pt:"Renascido",           en:"Reborn"           }, icon:"flame",         color:"text-orange-400", desc:{pt:"Primeiro prestígio",           en:"First prestige"         }, cond:s=>s.prestigeLevel>=1    },
  { id:"s_runemaster",   name:{pt:"Mestre das Runas",    en:"Rune Master"      }, icon:"gem",           color:"text-violet-400", desc:{pt:"Equipa 3 runas simultaneamente",en:"Equip 3 runes at once" }, cond:s=>(s.equippedRunes||[]).length>=3 },
  { id:"s_combo50",      name:{pt:"Combo Máster",        en:"Combo Master"     }, icon:"zap",           color:"text-amber-400",  desc:{pt:"Alcança combo de 30",          en:"Reach 30 combo"         }, cond:s=>s.kills>=500          },
  { id:"s_dungeon10",    name:{pt:"Explorador",          en:"Explorer"         }, icon:"door-open",     color:"text-emerald-400",desc:{pt:"Completa 10 dungeons",         en:"Complete 10 dungeons"   }, cond:s=>(s.dungeonsCleared||0)>=10 },
  { id:"s_ng_plus",      name:{pt:"Além dos Limites",    en:"Beyond Limits"    }, icon:"refresh-cw",    color:"text-fuchsia-400",desc:{pt:"Inicia NG+",                   en:"Start NG+"              }, cond:s=>(s.ngPlusActive||0)>=1 },
  { id:"s_legendary",    name:{pt:"Lendário",            en:"Legendary"        }, icon:"crown",         color:"text-yellow-300", desc:{pt:"Cria um item lendário",        en:"Craft a legendary item" }, cond:s=>(s.legendaryItems||[]).length>=1 },
  { id:"s_math10",       name:{pt:"Calculador",          en:"Calculator"       }, icon:"calculator",    color:"text-cyan-300",   desc:{pt:"Responde 10 perguntas corretas",en:"Answer 10 math correct" }, cond:s=>(s.mathCorrectAnswers||0)>=10 },
  { id:"s_secret_class", name:{pt:"O Escolhido",         en:"The Chosen"       }, icon:"lock-keyhole",  color:"text-rose-300",   desc:{pt:"Desbloqueia classe secreta",   en:"Unlock secret class"    }, cond:s=>(s.secretClassesUnlocked||[]).length>=1 },
  { id:"s_infinity",     name:{pt:"Infinito",            en:"Infinite"         }, icon:"infinity",      color:"text-white",      desc:{pt:"Alcança onda 100 no Modo ∞",   en:"Reach wave 100 in ∞ Mode"}, cond:s=>s.infiniteBestWave>=100 },
  { id:"s_notoriety",    name:{pt:"Mitológico",          en:"Mythical"         }, icon:"triangle-alert",color:"text-amber-300",  desc:{pt:"Atinge nível Mitológico",      en:"Reach Mythical tier"    }, cond:s=>s.notoriety>=50000    },
];

rpg.checkSeals = function() {
  let newSeals = false;
  this.SEALS.forEach(seal => {
    if (!this.collectedSeals.includes(seal.id) && seal.cond(this)) {
      this.collectedSeals.push(seal.id);
      newSeals = true;
      setTimeout(() => showToast("🔖 Selo desbloqueado: "+seal.name[this.lang]+"!", 3500), 500);
    }
  });
  if (newSeals) localStorage.setItem("rpg_seals", JSON.stringify(this.collectedSeals));
};

rpg.renderSeals = function() {
  const el = document.getElementById("seals-body"); if (!el) return;
  const done = this.collectedSeals.length, total = this.SEALS.length;
  el.innerHTML = `<div class="flex justify-between items-center mb-3">
    <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest">${done} / ${total} Selos</p>
    <div class="w-28 h-2 bg-zinc-800 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-violet-700 to-fuchsia-500 rounded-full" style="width:${Math.floor(done/total*100)}%"></div></div>
  </div>
  <div class="grid grid-cols-3 gap-2">` +
  this.SEALS.map(seal => {
    const owned = this.collectedSeals.includes(seal.id);
    return `<div class="flex flex-col items-center gap-1 p-2 rounded-xl border ${owned?"border-violet-700/50 bg-violet-950/20":"border-zinc-800 bg-zinc-950/60 opacity-40 grayscale"} text-center" title="${seal.desc[this.lang]}">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800"><i data-lucide="${seal.icon}" class="w-5 h-5 ${owned?seal.color:"text-zinc-700"}"></i></div>
      <p class="text-[7px] font-black ${owned?seal.color:"text-zinc-700"} leading-tight">${seal.name[this.lang]}</p>
      ${owned ? '<span class="text-[7px] text-emerald-500">✓</span>' : ''}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Check seals on kill






// ═══════════════════════════════════════════════════════════════
// ── v23.0 — EVENTOS GLOBAIS DE MUNDO ─────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.WORLD_EVENTS = [
  { id:"we_double_xp",   name:{pt:"💜 Fim-de-Semana XP Duplo",    en:"💜 Double XP Weekend"   }, desc:{pt:"+100% XP por 1 hora de sessão",   en:"+100% XP for 1 hour of session" }, dur:3600000, xpMult:2.0   },
  { id:"we_gold_rush",   name:{pt:"💰 Corrida ao Ouro",           en:"💰 Gold Rush"            }, desc:{pt:"+150% Ouro por 30min",            en:"+150% Gold for 30min"          }, dur:1800000, goldMult:2.5 },
  { id:"we_invasion",    name:{pt:"👾 Invasão de Glitches",       en:"👾 Glitch Invasion"     }, desc:{pt:"Monstros especiais com drops ×3", en:"Special monsters with ×3 drops"}, dur:2700000, spawnSpecial:true },
  { id:"we_boss_party",  name:{pt:"💀 Noite dos Bosses",          en:"💀 Boss Night"          }, desc:{pt:"Boss kills dão +500 pts Season",  en:"Boss kills +500 Season pts"    }, dur:3600000, bossSeasonBonus:500 },
  { id:"we_calm",        name:{pt:"☀ Dia Tranquilo",             en:"☀ Calm Day"             }, desc:{pt:"Sem eventos especiais",           en:"No special events"             }, dur:1800000 },
];

rpg.activeWorldEvent = null;
rpg.worldEventEndTime = 0;

rpg.rollWorldEvent = function() {
  // Roll a new world event based on time seed
  const seed = Math.floor(Date.now() / (30 * 60 * 1000)); // changes every 30min
  const idx  = seed % this.WORLD_EVENTS.length;
  const evt  = this.WORLD_EVENTS[idx];
  if (!this.activeWorldEvent || this.activeWorldEvent.id !== evt.id) {
    this.activeWorldEvent = evt;
    this.worldEventEndTime = Date.now() + evt.dur;
    if (evt.id !== "we_calm") showToast(evt.name[this.lang]+" – "+evt.desc[this.lang], 5000);
    const badge = document.getElementById("world-event-badge");
    if (badge) {
      if (evt.id !== "we_calm") { badge.textContent = evt.name[this.lang]; badge.classList.remove("hidden"); }
      else badge.classList.add("hidden");
    }
  }
};

// Apply world event bonuses













// ═══════════════════════════════════════════════════════════════
// ── v23.0 — O PROTOCOLO PRIMORDIAL (BOSS FINAL VERDADEIRO) ────
// ═══════════════════════════════════════════════════════════════

rpg.PRIMORDIAL_PROTOCOL = {
  id: "boss_primordial",
  name: { pt: "O Protocolo Primordial", en: "The Primordial Protocol" },
  icon: "binary",
  color: "text-white",
  reqLvl: 4000,
  reqBoss: 19, // After all 19 bosses including interlude
  baseHp: 1e18,
  hpMult: 10000000,
  baseDmg: 1e16,
  dmgMult: 5000000,
  spd: 80,
  PHASES: [
    { pct: 1.0,   name:{pt:"Fase I — A Lógica Primordial",  en:"Phase I — Primordial Logic"  }, mult:1.0,  status:null       },
    { pct: 0.75,  name:{pt:"Fase II — O Paradoxo Vivo",     en:"Phase II — Living Paradox"   }, mult:1.5,  status:"shock"    },
    { pct: 0.50,  name:{pt:"Fase III — Colapso da Realidade",en:"Phase III — Reality Collapse"}, mult:2.0,  status:"burn"     },
    { pct: 0.25,  name:{pt:"Fase IV — Além do Infinito",    en:"Phase IV — Beyond Infinity"  }, mult:3.0,  status:"freeze"   },
    { pct: 0.10,  name:{pt:"Fase V — O Verdadeiro Fim",     en:"Phase V — The True End"      }, mult:5.0,  status:"stun"     },
  ],
  dialogues: {
    start:   { pt:"Encontraste o que precede tudo. Infelizmente para ti... isso não muda o resultado.",
               en:"You found what precedes everything. Unfortunately for you... that doesn't change the result." },
    phase2:  { pt:"75%... ainda calculável. Vou ter de me recalibrar.",
               en:"75%... still calculable. I'll need to recalibrate." },
    phase3:  { pt:"Metade destruído. Impossível. Absolutamente impossível.",
               en:"Half destroyed. Impossible. Absolutely impossible." },
    phase4:  { pt:"O QUÊ?! Estás a reescrever as equações fundamentais do cosmos!",
               en:"WHAT?! You're rewriting the fundamental equations of the cosmos!" },
    phase5:  { pt:"...Eu compreendo agora. Não calculei uma variável. A tua vontade.",
               en:"...I understand now. I didn't calculate one variable. Your will." },
    defeat:  { pt:"...Algoritma é livre. Tu... és a prova de que o caos pode vencer a lógica perfeita. Vai. Vive.",
               en:"...Algoritma is free. You... are proof that chaos can defeat perfect logic. Go. Live." },
  }
};

rpg.primordialPhase    = 0;
rpg.primordialUnlocked = this?.bossKills >= 19 && this?.level >= 4000;

rpg.checkPrimordialUnlock = function() {
  if (this.bossKills >= 19 && this.level >= 4000 && !this.primordialUnlocked) {
    this.primordialUnlocked = true;
    showToast("⚠ O Protocolo Primordial foi detectado. Vai ao Boss Diário.", 6000);
  }
};

rpg.renderPrimordialModal = function() {
  const el = document.getElementById("primordial-body"); if (!el) return;
  const can = this.bossKills >= 19 && this.level >= this.PRIMORDIAL_PROTOCOL.reqLvl;
  el.innerHTML = `
    <div class="text-center mb-4">
      <i data-lucide="binary" class="w-12 h-12 text-white mx-auto mb-2"></i>
      <p class="text-lg font-black text-white">O Protocolo Primordial</p>
      <p class="text-[9px] text-zinc-500 mt-1 italic">"Eu precedo tudo. Sou a equação original."</p>
    </div>
    <div class="space-y-2 mb-4 text-xs text-zinc-400">
      <div class="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
        <p>⚡ <strong class="text-white">5 Fases</strong> com stats crescentes</p>
        <p>🧠 <strong class="text-white">Fase IV:</strong> Boss 3× mais forte</p>
        <p>💀 <strong class="text-white">Fase V:</strong> Boss 5× mais forte</p>
        <p>🏆 <strong class="text-white">Recompensa:</strong> Final verdadeiro + título único</p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 text-center mb-4">
      ${this.PRIMORDIAL_PROTOCOL.PHASES.map((ph,i) => `
        <div class="p-2 rounded-xl border ${i===0?"border-zinc-700 bg-zinc-900/60":"border-zinc-800 bg-zinc-950/60"}">
          <p class="text-[8px] font-black text-zinc-500 uppercase">${ph.name[this.lang].split("—")[0]}</p>
          <p class="text-[7px] text-zinc-600">${Math.round(ph.pct*100)}% HP · ${ph.mult}× força</p>
        </div>`).join("")}
    </div>
    ${can
      ? `<button onclick="rpg.startPrimordialFight()" class="btn-3d w-full py-3 bg-gradient-to-r from-zinc-700 to-zinc-600 border border-white/20 text-white font-black rounded-xl uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.1)]">☠ Enfrentar o Protocolo Primordial</button>`
      : `<div class="text-center text-xs text-zinc-500 p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl">Req: 19 Bosses + Lvl ${this.PRIMORDIAL_PROTOCOL.reqLvl}</div>`}`;
  lucide.createIcons();
};

rpg.startPrimordialFight = function() {
  if (this.bossKills < 19 || this.level < this.PRIMORDIAL_PROTOCOL.reqLvl) { showToast("Requisitos não cumpridos!"); return; }
  this.primordialPhase = 0;
  // Add to actBosses temporarily if not there
  if (!this.actBosses.find(b=>b.id==="boss_primordial")) {
    this.actBosses.push(this.PRIMORDIAL_PROTOCOL);
  }
  closeModal("primordial-modal");
  this.openPreBattle(true);
};

// ═══════════════════════════════════════════════════════════════
// ── v23.0 — SAVE / INIT PATCHES ───────────────────────────────
// ═══════════════════════════════════════════════════════════════







































// Track items bought for seal
const _v23BuyItem = rpg.buyItem ? rpg.buyItem.bind(rpg) : null;
if (_v23BuyItem) {
  rpg.buyItem = function(id, type) {
    _v23BuyItem(id, type);
    this.totalItemsBought = (this.totalItemsBought||0) + 1;
    localStorage.setItem("rpg_items_bought", this.totalItemsBought);
    this.checkSeals();
  };
}


// ═══════════════════════════════════════════════════════════════
// ── v23.0 — SISTEMA DE FORMAÇÕES DE COMBATE ──────────────────
// ═══════════════════════════════════════════════════════════════

rpg.activeFormation = localStorage.getItem("rpg_formation") || "balanced";
rpg.FORMATIONS = [
  { id:"balanced",  name:{pt:"Equilíbrio",    en:"Balanced"   }, icon:"scale",          color:"text-zinc-300",   desc:{pt:"Stats padrão. Nenhum bónus.",                    en:"Default stats. No bonuses."                       }, atkMod:1.0, hpMod:1.0, cdMod:1.0, critMod:0, dodgeMod:0 },
  { id:"assault",   name:{pt:"Assalto",        en:"Assault"    }, icon:"swords",         color:"text-red-400",    desc:{pt:"+40% ATK, -20% HP, CDs -10%",                   en:"+40% ATK, -20% HP, CDs -10%"                      }, atkMod:1.4, hpMod:0.8, cdMod:0.9, critMod:0.05, dodgeMod:0 },
  { id:"fortress",  name:{pt:"Fortaleza",      en:"Fortress"   }, icon:"shield",         color:"text-blue-400",   desc:{pt:"+60% HP, -25% ATK, +10% Bloqueio",              en:"+60% HP, -25% ATK, +10% Block"                    }, atkMod:0.75, hpMod:1.6, cdMod:1.0, critMod:0, dodgeMod:0.10 },
  { id:"shadow",    name:{pt:"Sombra",         en:"Shadow"     }, icon:"eye-off",        color:"text-zinc-400",   desc:{pt:"+30% Esquiva, +20% Crit, -10% ATK",             en:"+30% Dodge, +20% Crit, -10% ATK"                  }, atkMod:0.9, hpMod:0.9, cdMod:1.0, critMod:0.20, dodgeMod:0.30 },
  { id:"berserk",   name:{pt:"Berserk",        en:"Berserk"    }, icon:"flame",          color:"text-orange-400", desc:{pt:"+80% ATK, -40% HP, sem defesa possível",       en:"+80% ATK, -40% HP, no defending"                  }, atkMod:1.8, hpMod:0.6, cdMod:0.8, critMod:0.15, dodgeMod:0 },
  { id:"arcane",    name:{pt:"Arcano",          en:"Arcane"     }, icon:"sparkles",       color:"text-violet-400", desc:{pt:"Magia +100% dano, ATK -20%, Magia CD -40%",    en:"Magic +100% dmg, ATK -20%, Magic CD -40%"         }, atkMod:0.8, hpMod:1.0, cdMod:1.0, magMod:2.0, critMod:0.10, dodgeMod:0 },
  { id:"chaos",     name:{pt:"Caos",            en:"Chaos"      }, icon:"triangle-alert", color:"text-rose-500",   desc:{pt:"Stats ±50% aleatórios, mas +100% recompensas", en:"Stats ±50% random, but +100% rewards"             }, atkMod:1.0, hpMod:1.0, cdMod:1.0, critMod:0, dodgeMod:0 },
];


rpg.renderFormationModal = function() {
  const el = document.getElementById("formation-body"); if (!el) return;
  const active = this.activeFormation;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Escolhe antes de entrar na batalha</p>
  <div class="space-y-2">` +
  this.FORMATIONS.map(f => {
    const on = active === f.id;
    return `<button onclick="rpg.setFormation('${f.id}')" class="w-full flex items-center gap-3 p-3 rounded-xl border ${on?"border-white/30 bg-white/5":"border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"} transition-all text-left">
      <div class="p-2 bg-zinc-900 rounded-xl border border-zinc-800 flex-shrink-0"><i data-lucide="${f.icon}" class="w-4 h-4 ${f.color}"></i></div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-black ${f.color}">${f.name[this.lang]}</p>
        <p class="text-[8px] text-zinc-500 leading-tight">${f.desc[this.lang]}</p>
      </div>
      ${on ? '<span class="text-emerald-400 font-black text-sm flex-shrink-0">✓</span>' : ''}
    </button>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Apply formation modifiers



















// Berserk: block def





// Arcane: mag bonus






// Chaos: reward bonus









// ═══════════════════════════════════════════════════════════════
// ── v23.0 — SISTEMA DE LEGADOS (HEIRLOOM) ────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.legacyItems = JSON.parse(localStorage.getItem("rpg_legacy") || "[]"); // max 3 {itemId, forgeLevel}

rpg.setLegacy = function(itemId, type) {
  if (this.legacyItems.length >= 3) { showToast("Máximo 3 Legados! Remove um primeiro."); return; }
  if (this.legacyItems.find(l=>l.itemId===itemId)) { showToast("Item já está em Legado."); return; }
  const fl = this.getForgeLevel ? this.getForgeLevel(itemId) : 0;
  this.legacyItems.push({ itemId, type, forgeLevel: fl });
  localStorage.setItem("rpg_legacy", JSON.stringify(this.legacyItems));
  showToast("🔱 Legado definido! O item passará para a próxima vida.", 3000);
  this.renderLegacyModal();
};

rpg.removeLegacy = function(itemId) {
  this.legacyItems = this.legacyItems.filter(l=>l.itemId!==itemId);
  localStorage.setItem("rpg_legacy", JSON.stringify(this.legacyItems));
  this.renderLegacyModal();
};

rpg.applyLegacyItems = function() {
  this.legacyItems.forEach(leg => {
    if (!this.inventory.includes(leg.itemId)) {
      this.inventory.push(leg.itemId);
      // Restore at half forge level
      if (this.forgeUpgrades && leg.forgeLevel > 0) {
        this.forgeUpgrades[leg.itemId] = Math.floor(leg.forgeLevel * 0.5);
        localStorage.setItem("rpg_forge", JSON.stringify(this.forgeUpgrades));
      }
    }
  });
};

rpg.renderLegacyModal = function() {
  const el = document.getElementById("legacy-body"); if (!el) return;
  const gemmable = [
    ...this.weapons.filter(w => this.inventory.includes(w.id)).map(w=>({...w,type:"weapon"})),
    ...this.armors.filter(a  => this.inventory.includes(a.id)).map(a=>({...a,type:"armor"})),
  ];
  el.innerHTML = `<p class="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-3 text-center">Slots: ${this.legacyItems.length}/3 · Passam no Prestígio com forja ×50%</p>
  <div class="space-y-2 mb-4">` +
  this.legacyItems.map(leg => {
    const list = [...this.weapons,...this.armors];
    const item = list.find(i=>i.id===leg.itemId);
    if (!item) return "";
    return `<div class="flex items-center gap-3 p-2.5 rounded-xl border border-amber-700/40 bg-amber-950/10">
      <i data-lucide="${item.icon}" class="w-4 h-4 text-amber-400"></i>
      <div class="flex-1"><p class="text-xs font-black text-zinc-200">${item.name[this.lang]}</p><p class="text-[8px] text-zinc-500">Forja +${leg.forgeLevel} → +${Math.floor(leg.forgeLevel*.5)} na próxima vida</p></div>
      <button onclick="rpg.removeLegacy('${leg.itemId}')" class="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 rounded-lg text-[9px]">✕</button>
    </div>`;
  }).join("") +
  `</div>
  <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Seleciona itens:</p>
  <div class="space-y-1">` +
  gemmable.map(item => {
    const isLegacy = this.legacyItems.find(l=>l.itemId===item.id);
    const fl = this.getForgeLevel ? this.getForgeLevel(item.id) : 0;
    return `<div class="flex items-center gap-2 p-2 rounded-xl border ${isLegacy?"border-amber-700/40 bg-amber-950/10":"border-zinc-800 bg-zinc-950/50"}">
      <i data-lucide="${item.icon}" class="w-4 h-4 text-zinc-400 flex-shrink-0"></i>
      <p class="text-xs text-zinc-300 flex-1">${item.name[this.lang]} ${fl>0?"<span class='text-orange-400 text-[9px]'>+"+fl+"</span>":""}</p>
      ${isLegacy ? `<button onclick="rpg.removeLegacy('${item.id}')" class="px-2 py-1 bg-amber-900/40 border border-amber-700 text-amber-300 rounded-lg text-[9px] font-black">Legado ✓</button>`
                 : `<button onclick="rpg.setLegacy('${item.id}','${item.type}')" class="px-2 py-1 ${this.legacyItems.length<3?"bg-zinc-700 hover:bg-zinc-600":"bg-zinc-800 cursor-not-allowed"} border border-zinc-600 text-white rounded-lg text-[9px] font-black">Definir</button>`}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Apply legacies on game start if they exist








// ═══════════════════════════════════════════════════════════════
// ── v23.0 — TORNEIO SEMANAL ───────────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.tourneyBestDmg  = parseInt(localStorage.getItem("rpg_tourney_dmg")  || "0");
rpg.tourneyWeek     = localStorage.getItem("rpg_tourney_week") || "";
rpg.tourneyDone     = localStorage.getItem("rpg_tourney_done") === "true";

rpg.getTourneyWeek = function() {
  const d = new Date(); const oneJan = new Date(d.getFullYear(),0,1);
  return d.getFullYear() + "-W" + Math.ceil((((d-oneJan)/86400000)+oneJan.getDay()+1)/7);
};

rpg.renderTourney = function() {
  const el = document.getElementById("tourney-body"); if (!el) return;
  const week = this.getTourneyWeek();
  const freshWeek = this.tourneyWeek !== week;
  if (freshWeek) { this.tourneyDone = false; this.tourneyBestDmg = 0; this.tourneyWeek = week; localStorage.setItem("rpg_tourney_week", week); localStorage.setItem("rpg_tourney_done","false"); localStorage.setItem("rpg_tourney_dmg","0"); }
  // Generate weekly boss from seed
  const seed = week.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  const bossIdx = seed % this.actBosses.length;
  const boss = this.actBosses[bossIdx];
  el.innerHTML = `<div class="text-center mb-4">
    <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Semana ${week}</p>
    <p class="text-3xl font-black text-rose-300">${boss.name[this.lang]}</p>
    <p class="text-[9px] text-zinc-500">Boss Especial Semanal</p>
  </div>
  <div class="bg-zinc-950/80 border border-rose-800/40 rounded-xl p-3 mb-3 flex justify-between items-center">
    <div><p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Melhor Dano</p><p class="text-xl font-black text-rose-400">${formatNumber(this.tourneyBestDmg)}</p></div>
    <div class="text-right"><p class="text-[9px] text-zinc-600">Prémio por participar:</p><p class="text-xs font-black text-yellow-400">+500 Honra 🏅</p></div>
  </div>
  <div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 mb-4 text-xs text-zinc-400 space-y-1">
    <p>⚔ <strong class="text-zinc-200">Regras:</strong> Luta com stats base, sem bónus de desafio</p>
    <p>🏆 <strong class="text-zinc-200">Record global</strong> partilhado via código</p>
    <p>🎁 <strong class="text-zinc-200">Recompensa semanal:</strong> 500 Honra ao participar</p>
  </div>
  ${this.tourneyDone
    ? `<div class="bg-emerald-950/20 border border-emerald-700/30 rounded-xl p-3 text-center text-sm text-emerald-400 font-black">✅ Já participaste esta semana!<br><span class="text-xs font-normal text-zinc-500">Volta na próxima semana.</span></div>`
    : `<button onclick="rpg.startTourney(${bossIdx})" class="btn-3d w-full py-3 bg-gradient-to-r from-rose-800 to-red-800 border border-rose-600 text-white font-black rounded-xl uppercase">⚔ Participar no Torneio</button>`}`;
  lucide.createIcons();
};

rpg.startTourney = function(bossIdx) {
  this.tourneyDone = true;
  this.tourneyWeek = this.getTourneyWeek();
  localStorage.setItem("rpg_tourney_done","true");
  localStorage.setItem("rpg_tourney_week", this.tourneyWeek);
  closeModal("tourney-modal");
  this.addHonor(500);
  showToast("⚔ Torneio iniciado! Melhor dano guardado automaticamente.", 3000);
  this.isBossFight = true;
  // Override boss to tourney boss
  this._tourneyBossIdx = bossIdx;
  this.confirmBattle();
};

// Track tourney max damage









// ═══════════════════════════════════════════════════════════════
// ── v23.0 — MEMÓRIAS DE HABILIDADE ───────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.skillMemories = JSON.parse(localStorage.getItem("rpg_memories") || "[]");
rpg.SKILL_MEMORIES = [
  { id:"mem_1",  boss:1,  name:{pt:"Memória do Caos",        en:"Memory of Chaos"     }, lore:{pt:"O Lorde ensinou que o caos tem padrão.",       en:"The Lord taught that chaos has pattern."        }, bonus:{pt:"+10% ATK",     en:"+10% ATK"     }, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+0.10;} },
  { id:"mem_2",  boss:2,  name:{pt:"Memória das Estrelas",   en:"Memory of Stars"     }, lore:{pt:"O Cosmos sussurrou: força vem do sacrifício.", en:"The Cosmos whispered: strength comes from sacrifice."}, bonus:{pt:"+15% HP",     en:"+15% HP"     }, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.075;} },
  { id:"mem_3",  boss:3,  name:{pt:"Memória do Vazio",       en:"Memory of the Void"  }, lore:{pt:"O Vazio não é ausência. É potencial puro.",    en:"The Void is not absence. It is pure potential." }, bonus:{pt:"+8% Crit",    en:"+8% Crit"    }, apply:s=>{s.permCritBonus=(s.permCritBonus||0)+0.08;} },
  { id:"mem_4",  boss:5,  name:{pt:"Memória da Singularidade",en:"Memory of Singularity"}, lore:{pt:"Tudo converge. Tudo diverge. Tu és o ponto.", en:"All converges. All diverges. You are the point."}, bonus:{pt:"+20% XP",    en:"+20% XP"    }, apply:s=>{s.permXpBonus=(s.permXpBonus||0)+0.20;} },
  { id:"mem_5",  boss:7,  name:{pt:"Memória do Compilador",  en:"Memory of Compiler"  }, lore:{pt:"O código pode ser reescrito. Inclusive o teu.",en:"Code can be rewritten. Including yours."       }, bonus:{pt:"+25% Ouro",   en:"+25% Gold"   }, apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+0.25;} },
  { id:"mem_6",  boss:10, name:{pt:"Memória da Anomalia",    en:"Memory of Anomaly"   }, lore:{pt:"A anomalia não é falha. É evolução inesperada.",en:"The anomaly is not a flaw. It is unexpected evolution."}, bonus:{pt:"+10% Esquiva",en:"+10% Dodge"}, apply:s=>{s.permDodgeBonus=(s.permDodgeBonus||0)+0.10;} },
  { id:"mem_7",  boss:13, name:{pt:"Memória do Cursor",      en:"Memory of the Cursor"}, lore:{pt:"Cada clique foi uma escolha. Cada escolha foi real.", en:"Every click was a choice. Every choice was real."}, bonus:{pt:"+30% todos stats",en:"+30% all stats"}, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.30;} },
  { id:"mem_8",  boss:15, name:{pt:"Memória do Núcleo",      en:"Memory of the Core"  }, lore:{pt:"O Núcleo Quântico foi apenas o começo.",         en:"The Quantum Core was only the beginning."       }, bonus:{pt:"+50% todos stats",en:"+50% all stats"}, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+0.50;} },
];

rpg.checkSkillMemories = function() {
  this.SKILL_MEMORIES.forEach(mem => {
    if (!this.skillMemories.includes(mem.id) && this.bossKills >= mem.boss) {
      this.skillMemories.push(mem.id);
      mem.apply(this);
      localStorage.setItem("rpg_memories", JSON.stringify(this.skillMemories));
      showToast("💭 Memória Absorvida: "+mem.name[this.lang]+"! "+mem.bonus[this.lang], 5000);
    }
  });
};

rpg.renderMemories = function() {
  const el = document.getElementById("memories-body"); if (!el) return;
  el.innerHTML = `<p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">${this.skillMemories.length} / ${this.SKILL_MEMORIES.length} Absorvidas</p>
  <div class="space-y-2">` + this.SKILL_MEMORIES.map(mem => {
    const owned = this.skillMemories.includes(mem.id);
    return `<div class="p-3 rounded-xl border ${owned?"border-cyan-700/40 bg-cyan-950/10":"border-zinc-800 bg-zinc-950/50 opacity-50 grayscale"}">
      <div class="flex items-center justify-between mb-1">
        <p class="text-xs font-black ${owned?"text-cyan-300":"text-zinc-600"}">${owned?mem.name[this.lang]:"???"}</p>
        <span class="text-[8px] font-black ${owned?"text-emerald-400":"text-zinc-600"} border ${owned?"border-emerald-800":"border-zinc-800"} px-1.5 py-0.5 rounded">Boss ${mem.boss}</span>
      </div>
      ${owned ? `<p class="text-[8px] text-zinc-500 italic mb-1">"${mem.lore[this.lang]}"</p>
      <p class="text-[8px] font-black text-yellow-500">✨ ${mem.bonus[this.lang]}</p>` : ""}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};







// ═══════════════════════════════════════════════════════════════
// ── v23.0 — HUD DINÂMICO POR TEMA ────────────────────────────
// ═══════════════════════════════════════════════════════════════

rpg.THEME_HUD = {
  "theme-medieval":  { hp:"from-emerald-600 to-emerald-400", fury:"from-red-600 to-orange-500",    xp:"#3b82f6", atb:"#06b6d4" },
  "theme-cyber":     { hp:"from-cyan-500 to-cyan-300",       fury:"from-blue-600 to-cyan-500",      xp:"#0ea5e9", atb:"#67e8f9" },
  "theme-matrix":    { hp:"from-green-500 to-green-300",     fury:"from-emerald-600 to-green-400",  xp:"#22c55e", atb:"#4ade80" },
  "theme-quantum":   { hp:"from-violet-600 to-violet-400",   fury:"from-purple-700 to-fuchsia-500", xp:"#8b5cf6", atb:"#c4b5fd" },
  "theme-end":       { hp:"from-rose-600 to-pink-400",       fury:"from-red-700 to-rose-500",       xp:"#f43f5e", atb:"#fb7185" },
  "theme-hardware":  { hp:"from-orange-500 to-amber-400",    fury:"from-orange-700 to-amber-500",   xp:"#f97316", atb:"#fdba74" },
  "theme-hell":      { hp:"from-red-700 to-red-500",         fury:"from-red-900 to-red-600",        xp:"#dc2626", atb:"#f87171" },
  "theme-ultimate":  { hp:"from-yellow-500 to-amber-300",    fury:"from-yellow-700 to-amber-500",   xp:"#eab308", atb:"#fde047" },
};

rpg.applyHudTheme = function() {
  const themeClass = document.body.className.match(/theme-\w+/)?.[0] || "theme-medieval";
  const hud = this.THEME_HUD[themeClass] || this.THEME_HUD["theme-medieval"];
  const hpBar = document.getElementById("hero-hp-bar");
  // FIX: preserva width inline ao trocar className do tema
  if (hpBar) {
    const savedWidth = hpBar.style.width;
    hpBar.className = "bg-gradient-to-r " + hud.hp + " h-full transition-all duration-300";
    if (savedWidth) hpBar.style.width = savedWidth;
  }
  const furyBar = document.getElementById("hero-fury-bar");
  if (furyBar) furyBar.className = "bg-gradient-to-r " + hud.fury + " h-full transition-all duration-300";
  const xpBar = document.getElementById("battle-xp-bar");
  if (xpBar) xpBar.style.background = hud.xp;
  const atbBar = document.getElementById("monster-atb-bar");
  if (atbBar) atbBar.style.background = hud.atb;
};


// ═══════════════════════════════════════════════════════════════
// ── v23.0 — ARENA SEASON (CLASSIFICATÓRIO) ───────────────────
// ═══════════════════════════════════════════════════════════════

rpg.seasonPoints = parseInt(localStorage.getItem("rpg_season_pts") || "0");
rpg.seasonKills  = parseInt(localStorage.getItem("rpg_season_kills") || "0");
rpg.SEASON_RANKS = [
  { min:0,    name:{pt:"Bronze",    en:"Bronze"   }, color:"text-orange-700", icon:"🥉", reward:0     },
  { min:100,  name:{pt:"Prata",     en:"Silver"   }, color:"text-zinc-300",   icon:"🥈", reward:200   },
  { min:500,  name:{pt:"Ouro",      en:"Gold"     }, color:"text-yellow-400", icon:"🥇", reward:500   },
  { min:1500, name:{pt:"Platina",   en:"Platinum" }, color:"text-cyan-300",   icon:"💎", reward:1000  },
  { min:4000, name:{pt:"Diamante",  en:"Diamond"  }, color:"text-blue-300",   icon:"💠", reward:2000  },
  { min:10000,name:{pt:"Mestre",    en:"Master"   }, color:"text-violet-300", icon:"👑", reward:5000  },
  { min:25000,name:{pt:"Grão-Mestre",en:"Grandmaster"}, color:"text-amber-300",icon:"🌟",reward:10000 },
];

rpg.getSeasonRank = function() {
  let rank = this.SEASON_RANKS[0];
  for (const r of this.SEASON_RANKS) { if (this.seasonPoints >= r.min) rank = r; }
  return rank;
};

rpg.addSeasonPoints = function(pts) {
  const prev = this.getSeasonRank();
  this.seasonPoints = (this.seasonPoints||0) + pts;
  localStorage.setItem("rpg_season_pts", this.seasonPoints);
  const next = this.getSeasonRank();
  if (prev.icon !== next.icon) {
    this.addHonor(next.reward);
    showToast(next.icon+" Novo Rank: "+next.name[this.lang]+"! +"+next.reward+" 🏅", 5000);
  }
};

rpg.renderSeason = function() {
  const el = document.getElementById("season-body"); if (!el) return;
  const rank = this.getSeasonRank();
  const nextRankIdx = this.SEASON_RANKS.findIndex(r=>r.icon===rank.icon)+1;
  const nextRank = this.SEASON_RANKS[nextRankIdx];
  const pct = nextRank ? Math.min(100, Math.floor((this.seasonPoints-rank.min)/(nextRank.min-rank.min)*100)) : 100;
  el.innerHTML = `<div class="text-center mb-4">
    <p class="text-5xl mb-1">${rank.icon}</p>
    <p class="text-2xl font-black ${rank.color}">${rank.name[this.lang]}</p>
    <p class="text-[9px] text-zinc-500 mt-1">${formatNumber(this.seasonPoints)} pts · ${formatNumber(this.seasonKills)} abates</p>
    ${nextRank ? `<div class="flex items-center gap-2 mt-2 px-4"><div class="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-yellow-600 to-amber-400 rounded-full" style="width:${pct}%"></div></div><p class="text-[9px] text-zinc-500 flex-shrink-0">${nextRank.icon} ${formatNumber(nextRank.min)} pts</p></div>` : `<p class="text-xs text-amber-300 mt-2 font-black">🌟 RANK MÁXIMO!</p>`}
  </div>
  <div class="space-y-1">` +
  this.SEASON_RANKS.map(r => {
    const active = this.seasonPoints >= r.min;
    return `<div class="flex items-center gap-3 p-2 rounded-xl border ${r.icon===rank.icon?"border-white/20 bg-white/5":"border-zinc-800"} ${!active?"opacity-30":""} ">
      <span class="text-xl">${r.icon}</span>
      <div class="flex-1"><p class="text-xs font-black ${r.color}">${r.name[this.lang]}</p><p class="text-[8px] text-zinc-600">${formatNumber(r.min)} pts</p></div>
      <p class="text-[9px] text-zinc-500">+${formatNumber(r.reward)} 🏅</p>
      ${r.icon===rank.icon ? '<span class="text-white font-black text-xs">◀</span>' : ''}
    </div>`;
  }).join("") + `</div>`;
  lucide.createIcons();
};

// Earn season points on kills/bosses









// ═══════════════════════════════════════════════════════════════
// ── v23.0 — SAVE / INIT PATCHES ───────────────────────────────
// ═══════════════════════════════════════════════════════════════






























// ═══════════════════════════════════════════════════════════════
// ── CONSOLIDATED STAT FUNCTIONS (replaces all patch chains) ───
// ═══════════════════════════════════════════════════════════════

rpg._baseGetAtk = function() {
  let baseAtk = 5 + this.level * 3 + this.getWeapon().dmg;
  baseAtk *= this.getClass().multAtk;
  let petBonus = 0;
  if (this.getPet().buff === "dmg") {
    let match = this.getPet().desc.pt.match(/\+(\d+)%/);
    if (match) petBonus = parseInt(match[1]) / 100;
  }
  baseAtk *= 1 + petBonus;
  const inv = this.inventory;
  if (inv.includes("r_omni"))        baseAtk *= 1.25;
  if (inv.includes("r_goldenratio")) baseAtk *= 3.0;
  if (inv.includes("r_chaos"))       baseAtk *= 1.5;
  if (inv.includes("r_cmos"))        baseAtk *= 5.0;
  if (inv.includes("r_prism"))       baseAtk *= 2.0;
  if (inv.includes("r_void"))        baseAtk *= 10.0;
  if (inv.includes("r_quantum"))     baseAtk *= 20.0;
  if (inv.includes("r_omega"))       baseAtk *= 50.0;
  if (this.prestigeMult > 1)         baseAtk *= this.prestigeMult;
  return Math.floor(baseAtk);
};

rpg.getAtk = function() {
  let base = this._baseGetAtk();
  // Co-op bonus
  if (this.coopActive && this.coopPartner) base = Math.floor(base * (1 + (this.coopPartner.atkBonus||0)));
  // Rune effects
  if (this.getRuneEffect("glass"))    base = Math.floor(base * 1.8);
  if (this.getRuneEffect("titan"))    base = Math.floor(base * 0.7);
  if (this.getRuneEffect("omnivore")) base = Math.floor(base * 1.25);
  if (this.getRuneEffect("fortune"))  base = Math.floor(base * 0.92);
  if (this.getRuneEffect("berserker") && this.heroHp > 0) {
    const lostPct = 1 - (this.heroHp / Math.max(1, this._baseGetMaxHp()));
    base = Math.floor(base * (1 + Math.min(0.6, Math.floor(lostPct / 0.1) * 0.06)));
  }
  if (this.getRuneEffect("momentum") && (this.runeKillStack||0) > 0)
    base = Math.floor(base * (1 + Math.min(this.runeKillStack,50) * 0.02));
  // Achievement / grimoire perms
  base = Math.floor(base * (1 + (this.permAtkBonus||0) + (this.permAllBonus||0)));
  // Temp buffs (wanderer)
  base = Math.floor(base * (1 + (this.tempAtkBoost||0)));
  // Forge bonus on weapon
  if (this.getForgeBonus) base = Math.floor(base * this.getForgeBonus(this.eqWeapon));
  // Gem bonus
  if (this.getGemBonusFor) base = Math.floor(base * (1 + this.getGemBonusFor("atk", this.eqWeapon) + this.getGemBonusFor("all", this.eqWeapon) + this.getGemBonusFor("atk", this.eqArmor) + this.getGemBonusFor("all", this.eqArmor)));
  // Cursed relic
  const cr = this.getCursedRelic ? this.getCursedRelic() : null;
  if (cr?.atkBuff) base = Math.floor(base * cr.atkBuff);
  if (cr?.allBuff) base = Math.floor(base * cr.allBuff);
  // Talent: low HP
  if (this.talentLowHpAtk && this.heroHp > 0 && this.heroHp / Math.max(1, this._baseGetMaxHp()) < 0.5) base = Math.floor(base * 1.20);
  // T4: Frenzy - +30% ATK com combo 5+
  if (this.talentFrenzy && (this.combo||0) >= 5) base = Math.floor(base * 1.30);
  // T4: BossStacks - +15% ATK por boss morto (máx 10)
  if (this.talentBossStacks) base = Math.floor(base * (1 + Math.min(this.bossKills||0, 10) * 0.15));
  // T5: God Mode - ATK 5x por 1 turno após usar supremo
  if (this._godModeActive) base = Math.floor(base * 5);
  // Class reputation
  if (this.getClassRepBonus) base = Math.floor(base * (1 + this.getClassRepBonus()));
  // Formation
  if (this.getFormation) {
    const f = this.getFormation();
    const mod = f.atkMod || f.mods?.atk || 1;
    if (f.id === "chaos") base = Math.floor(base * (this._chaosAtkMod||1));
    else base = Math.floor(base * mod);
  }
  // Mutation: berserker
  if (this.mutBerserkerActive && this.heroHp > 0 && this.heroHp / Math.max(1, this._baseGetMaxHp()) < 0.30) base = Math.floor(base * 1.50);
  // Mutation: chaos mod
  if (this.mutChaosActive && this._chaosAtkMod) base = Math.floor(base * this._chaosAtkMod);
  // Aura: thunder
  if (this.getAura?.()?.effect === "thunder" && (this.fury||0) >= 50) base = Math.floor(base * 1.20);
  // Aura: void
  if (this.getAura?.()?.effect === "void") base = Math.floor(base * 1.40);
  // Advanced class bonus (multAtk)
  if (this.getAdvancedClassBonus) {
    const _b = this.getAdvancedClassBonus();
    if (_b.multAtk !== 1) base = Math.floor(base * _b.multAtk);
  }
  // NG+ reward
  return Math.max(1, Math.floor(base));
};

rpg._baseGetMaxHp = function() {
  let baseHp = 100 + this.level * 15 + this.getArmor().hp;
  baseHp *= this.getClass().multHp;
  let petBonus = 0;
  if (this.getPet().buff === "hp") {
    let match = this.getPet().desc.pt.match(/\+(\d+)%/);
    if (match) petBonus = parseInt(match[1]) / 100;
  }
  baseHp *= 1 + petBonus;
  const inv = this.inventory;
  if (inv.includes("r_omni"))        baseHp *= 1.25;
  if (inv.includes("r_goldenratio")) baseHp *= 3.0;
  if (inv.includes("r_chaos"))       baseHp *= 1.5;
  if (inv.includes("r_cmos"))        baseHp *= 5.0;
  if (inv.includes("r_prism"))       baseHp *= 2.0;
  if (inv.includes("r_void"))        baseHp *= 10.0;
  if (inv.includes("r_quantum"))     baseHp *= 20.0;
  if (inv.includes("r_omega"))       baseHp *= 50.0;
  if (this.prestigeMult > 1)         baseHp *= this.prestigeMult;
  return Math.floor(baseHp);
};

rpg.getMaxHp = function() {
  let base = this._baseGetMaxHp();
  // Rune effects
  if (this.getRuneEffect?.("glass"))    base = Math.floor(base * 0.5);
  if (this.getRuneEffect?.("titan"))    base = Math.floor(base * 2.0);
  if (this.getRuneEffect?.("omnivore")) base = Math.floor(base * 1.25);
  // Perms
  base = Math.floor(base * (1 + (this.permAllBonus||0)));
  // Temp HP (wanderer)
  base = Math.floor(base * (1 + (this.tempHpBoost||0)));
  // Forge bonus on armor
  if (this.getForgeBonus) base = Math.floor(base * this.getForgeBonus(this.eqArmor));
  // Gem bonus
  if (this.getGemBonusFor) base = Math.floor(base * (1 + this.getGemBonusFor("hp", this.eqWeapon) + this.getGemBonusFor("all", this.eqWeapon) + this.getGemBonusFor("hp", this.eqArmor) + this.getGemBonusFor("all", this.eqArmor)));
  // Cursed relic
  const cr = this.getCursedRelic ? this.getCursedRelic() : null;
  if (cr?.hpPenalty) base = Math.floor(base * cr.hpPenalty);
  if (cr?.allBuff)   base = Math.floor(base * cr.allBuff);
  // Class reputation
  if (this.getClassRepBonus) base = Math.floor(base * (1 + this.getClassRepBonus()));
  // Formation
  if (this.getFormation) {
    const f = this.getFormation();
    const mod = f.hpMod || f.mods?.hp || 1;
    if (f.id === "chaos") base = Math.floor(base * (this._chaosHpMod||1));
    else base = Math.floor(base * mod);
  }
  // Challenge: fragile/hardcore
  if (this.challengeActive && (this.activeChallenges||[]).some(id => ["ch_fragile","ch_hardcore"].includes(id)))
    base = Math.floor(base * 0.5);
  // Aura: void
  if (this.getAura?.()?.effect === "void") base = Math.floor(base * 1.40);
  // Advanced class bonus (multHp)
  if (this.getAdvancedClassBonus) {
    const _b = this.getAdvancedClassBonus();
    if (_b.multHp !== 1) base = Math.floor(base * _b.multHp);
  }
  return Math.max(1, Math.floor(base));
};

rpg.getCritChance = function() {
  let crit = 0.05 + this.getWeapon().crit + this.getClass().addCrit;
  if (this.getPet().buff === "crit") {
    let match = this.getPet().desc.pt.match(/\+(\d+)%/);
    if (match) crit += parseInt(match[1]) / 100;
  }
  if (this.inventory.includes("r_crit")) crit += 0.15;
  // Rune omnivore
  if (this.getRuneEffect?.("omnivore")) crit += 0.25;
  // Perms
  crit += (this.permCritBonus||0) + (this.permAllBonus||0) * 0.5;
  // Temp crit (wanderer)
  crit += (this.tempCritBoost||0);
  // Gem bonus
  if (this.getGemBonusFor) crit += this.getGemBonusFor("crit", this.eqWeapon) + this.getGemBonusFor("crit", this.eqArmor);
  // Cursed relic chaos
  const cr = this.getCursedRelic ? this.getCursedRelic() : null;
  if (cr?.critBuff) crit += cr.critBuff;
  // Formation
  if (this.getFormation) crit += (this.getFormation().critMod || this.getFormation().mods?.crit || 0);
  // Advanced class bonus (addCrit)
  if (this.getAdvancedClassBonus) crit += this.getAdvancedClassBonus().addCrit;
  return Math.min(0.99, crit);
};

rpg.getDodgeChance = function() {
  let dodge = 0.05 + this.getArmor().dodge + this.getClass().addDodge;
  if (this.getPet().buff === "dodge") {
    let match = this.getPet().desc.pt.match(/\+(\d+)%/);
    if (match) dodge += parseInt(match[1]) / 100;
  }
  if (this.inventory.includes("r_dodge")) dodge += 0.1;
  // Rune omnivore
  if (this.getRuneEffect?.("omnivore")) dodge += 0.25;
  // Perms
  dodge += (this.permDodgeBonus||0);
  // Gem bonus
  if (this.getGemBonusFor) dodge += this.getGemBonusFor("dodge", this.eqWeapon) + this.getGemBonusFor("dodge", this.eqArmor);
  // Formation
  if (this.getFormation) dodge += (this.getFormation().dodgeMod || this.getFormation().mods?.dodge || 0);
  // Advanced class bonus (addDodge)
  if (this.getAdvancedClassBonus) dodge += this.getAdvancedClassBonus().addDodge;
  return Math.min(0.90, dodge);
};





// ═══════════════════════════════════════════════════════════════
// ── CONSOLIDATED HOOKS FOR spawnMonster, dealDmg, useSkill ───
// ═══════════════════════════════════════════════════════════════

// ── spawnMonster hook ──
const _ORIG_spawnMonster = rpg.spawnMonster.bind(rpg);
rpg.spawnMonster = function() {
  _ORIG_spawnMonster();
  if (!this.monster) return;

  // Element assignment
  if (this.monsterElements) this.monster.element = this.monsterElements[this.monster.id] || "none";

  // Break system
  this.initBreakSystem && this.initBreakSystem(this.monster);

  // Status/log reset
  this.statusEffects = {};
  this.renderStatusBar && this.renderStatusBar();
  this.renderShieldBar && this.renderShieldBar();
  this.battleLog = [];
  this.renderBattleLog && this.renderBattleLog();
  this.lastElement = null;
  // Talent per-battle resets
  this._spiritUsed = false;
  this._invulnUsed = false;
  this._godModeActive = false;
  this._bossHalfTriggered = false;
  this._bossLowTriggered = false;
  if (this.talentImmortal) this._immortalCharges = 2; // repõe cargas por batalha

  // Boss parts init
  this.BOSS_PARTS_ACTIVE = false; this.bossPartHP = {}; this.targetedPart = null;
  const bpEl = document.getElementById("boss-parts-ui");
  if (bpEl) bpEl.innerHTML = "";
  if (this.isBossFight) setTimeout(() => this.initBossParts && this.initBossParts(), 300);

  // Boss dialogue start
  if (this.isBossFight) setTimeout(() => this.showBossDialogue && this.showBossDialogue("start"), 800);

  // Battle events
  if (!this.isBossFight) this.checkBattleEvent && this.checkBattleEvent();

  // Weather
  if (!this.isBossFight) this.rollWeather && this.rollWeather();
  if (this.currentWeather && this.monster) this.monster.dmg = Math.floor(this.monster.dmg * (this.currentWeather.dmgMod||1));

  // Notoriety scale
  if (this.getNotorietyTier) {
    const m = this.getNotorietyTier().enemyMult || 1;
    if (m > 1) { this.monster.hp = Math.floor(this.monster.hp*m); this.monster.maxHp = Math.floor(this.monster.maxHp*m); this.monster.dmg = Math.floor(this.monster.dmg*m); }
  }

  // Wave scale
  if (this.waveActive && this.waveNumber > 1) {
    const wm = 1 + (this.waveNumber-1) * 0.15;
    this.monster.hp = Math.floor(this.monster.hp*wm); this.monster.maxHp = Math.floor(this.monster.maxHp*wm); this.monster.dmg = Math.floor(this.monster.dmg*wm);
    if ((this.waveNumber-1) % 10 === 0) { this.monster.name="⚠ "+this.monster.name+" [ÉLITE]"; this.monster.hp*=3; this.monster.maxHp*=3; this.monster.dmg*=2; }
  }

  // DD mods
  if (this.dailyDungeonActive && this.ddMods) {
    if (this.ddMods.includes("elite"))  { this.monster.hp*=2; this.monster.maxHp*=2; }
    if (this.ddMods.includes("haste"))  this.monster.spd = Math.max(100, Math.floor(this.monster.spd*0.7));
    if (this.ddMods.includes("berserk")) this.monster.dmg = Math.floor(this.monster.dmg*1.5);
  }

  // Challenge speed
  if (this.challengeActive) {
    (this.activeChallenges||[]).forEach(id => {
      const ch = (this.CHALLENGES||[]).find(c=>c.id===id);
      if (ch?.speedMult) this.monster.spd = Math.max(100, Math.floor(this.monster.spd/ch.speedMult));
    });
  }

  // NG+ scale
  if ((this.ngPlusActive||0) > 0) {
    const m = (this.NG_ENEMY_MULT||[])[this.ngPlusActive]||1;
    if (m > 1) { this.monster.hp = Math.floor(this.monster.hp*m); this.monster.maxHp = Math.floor(this.monster.maxHp*m); this.monster.dmg = Math.floor(this.monster.dmg*m); }
  }

  // Aura: void makes enemies stronger
  if (this.getAura?.()?.effect === "void") { this.monster.hp=Math.floor(this.monster.hp*1.20); this.monster.maxHp=Math.floor(this.monster.maxHp*1.20); this.monster.dmg=Math.floor(this.monster.dmg*1.20); }

  // Math question trigger
  if (this.mathBattleActive) setTimeout(() => this.triggerMathQuestion && this.triggerMathQuestion(), 4000);

  // Log
  this.addLog && this.addLog(this.monster.name + " apareceu! " + (this.elementChart?.[this.monster.element]?.emoji||""), "text-red-400");

  this.updateHpBars && this.updateHpBars();
};

// ── dealDamageToMonster hook ──
const _ORIG_dealDmg = rpg.dealDamageToMonster.bind(rpg);
rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
  if (!this.monster || this.monster.hp <= 0) return;

  let dmg = baseDmg;

  // Elemental damage multiplier
  // Only magic attacks carry the hero's element; physical (atk) is neutral
  const heroElem = this.classElements?.[this.eqClass] || "none";
  const atkElem  = (atkType === "mag" || atkType === "class5") ? heroElem : "none";
  const monElem  = this.monster.element || "none";

  // Elemental reaction
  const reaction = this.checkElementReaction?.(atkElem);
  if (reaction) {
    this.showDamage?.(reaction.name[this.lang], "dmg-effective");
    if (reaction.heal) { const h=Math.floor(this.getMaxHp()*reaction.heal); this.heroHp=Math.min(this.getMaxHp(),this.heroHp+h); this.showDamage?.("✨ +"+formatNumber(h),"heal"); }
    if (reaction.status) setTimeout(()=>this.applyStatus?.(reaction.status),300);
    if (reaction.breakForce && this.monster) { this.monster.shieldPoints=0; this.tryBreakShield?.(); }
    dmg = Math.floor(dmg * (reaction.mult||1));
  }

  // Element mult
  if (this.getElementDamageMultiplier) {
    const {mult, msg} = this.getElementDamageMultiplier(atkElem, monElem);
    dmg = Math.floor(dmg * mult);
    if (msg==="effective" && atkElem!=="none") setTimeout(()=>this.showDamage?.(t?.("super_effective")||"SUPER EFETIVO!","dmg-effective"),0);
    if (msg==="resist")    setTimeout(()=>this.showDamage?.(t?.("resistant")||"RESISTENTE...","dmg-resistant"),0);
    if (msg==="absorb")  { 
      this.showDamage?.("🛡 ABSORVIDO!","dmg-parry"); 
      this.updateHpBars?.(); 
      // Still deal 15% of damage to prevent total immunity
      dmg = Math.floor(dmg * 0.15);
      if (dmg <= 0) return;
    }
    if (msg==="effective" && (this.monster.shieldPoints||0)>0) this.tryBreakShield?.();
  }

  // Break state bonus
  if (this.monster.inBreakState) dmg = Math.floor(dmg * 1.5);

  // Boss parts damage
  if (this.BOSS_PARTS_ACTIVE) this.damageBossPart?.(dmg);

  // Aura: thunder
  if (this.getAura?.()?.effect === "thunder" && (this.fury||0) >= 50) dmg = Math.floor(dmg*1.20);
  // Aura: void
  if (this.getAura?.()?.effect === "void") dmg = Math.floor(dmg*1.40);
  // Formation: arcane magic
  if (this.getFormation && atkType==="mag") {
    const f = this.getFormation();
    const mm = f.magMod || f.mods?.magMult || 1;
    if (mm > 1) dmg = Math.floor(dmg * mm);
  }
  // Math bonus
  if (this.mathBonusActive) dmg = Math.floor(dmg * 2);
  // Grimoire arcane surge
  if (this.grimoireArcaneSurge && atkType==="mag") dmg = Math.floor(dmg*1.5);
  // Talent ultimate mult
  if (isUltimate && (this.talentUltimateMult||1) > 1) dmg = Math.floor(dmg * this.talentUltimateMult);

  // Status DoT ticks
  this.tickStatusEffects?.();

  // Mirror reflect
  if (this.getRuneEffect?.("mirror") && atkType==="mag" && Math.random()<0.25 && this.monster.hp>0) {
    const rd=Math.floor(dmg*0.5); this.monster.hp=Math.max(0,this.monster.hp-rd);
    this.showDamage?.("🪞 -"+formatNumber(rd),"dmg-effective");
    if (this.monster.hp<=0) { this.killMonster(); return; }
  }

  // Run original (handles dodge, block, crit, type mod, visual, hp update)
  _ORIG_dealDmg(dmg, atkType, isUltimate);

  // After damage
  // Vampiric rune
  if (this.getRuneEffect?.("vampiric") && dmg>0) {
    const s=Math.floor(dmg*0.15); if(s>0){this.heroHp=Math.min(this.getMaxHp(),this.heroHp+s);}
  }
  // Grimoire lifesteal
  if (this.grimoireLifeSteal && dmg>0) {
    const s=Math.floor(dmg*0.08); if(s>0){this.heroHp=Math.min(this.getMaxHp(),this.heroHp+s);}
  }
  // T4: VampStrike - rouba 4% HP ao atacar
  if (this.talentVampStrike && dmg>0) {
    const s=Math.floor(this.getMaxHp()*0.04);
    if(s>0){this.heroHp=Math.min(this.getMaxHp(),this.heroHp+s); this.showDamage?.("🩸 +"+formatNumber(s),"heal");}
  }
  // T4: CascadeCrit - 30% chance de crítico encadear outro ataque
  if (this.talentCascadeCrit && atkType==="atk" && Math.random()<0.30 && this.monster?.hp>0) {
    const cascDmg=Math.floor(this.getAtk()*0.5);
    if(this.monster && this.monster.hp>0){ this.monster.hp=Math.max(0,this.monster.hp-cascDmg); this.showDamage?.("⚡ CASCADE -"+formatNumber(cascDmg),"dmg-effective"); }
  }
  // T5: GodMode - ativa após usar supremo (fury chegou a 99 neste ataque)
  if (this.talentGodMode && isUltimate && !this._godModeActive) {
    this._godModeActive = true;
    showToast("⚡ MODO DEUS! Próximo turno ATK 5x!", 2000);
  }
  // Mutation vampiric
  if ((this.permVampBonus||0)>0 && dmg>0) {
    const s=Math.floor(dmg*this.permVampBonus); if(s>0){this.heroHp=Math.min(this.getMaxHp(),this.heroHp+s);}
  }
  // Weather status on hit
  if (this.currentWeather?.statusOnHit && Math.random()<0.20 && this.monster?.hp>0) this.applyStatus?.(this.currentWeather.statusOnHit);
  // Break state turn counter
  if (this.monster?.inBreakState) {
    this.monster.breakTurnsLeft = (this.monster.breakTurnsLeft||0) - 1;
    if (this.monster.breakTurnsLeft<=0) { this.monster.inBreakState=false; this.monster.shieldPoints=Math.max(1,Math.floor((this.monster.maxShieldPoints||1)/2)); this.renderShieldBar?.(); }
  }
  // Tournament dmg tracking
  if (this.tourneyDone && this.isBossFight && dmg>(this.tourneyBestDmg||0)) {
    this.tourneyBestDmg=dmg; localStorage.setItem("rpg_tourney_dmg",dmg);
  }
  // Battle log
  if (this.monster?.hp>0) this.addLog?.(this.heroName+" atacou "+this.monster.name,"text-blue-300");
  // Cursed relic self-harm
  const cr=this.getCursedRelic?.();
  if (cr?.selfHarm && Math.random()<cr.selfHarm) {
    const sd=Math.floor(this.getMaxHp()*0.08); this.heroHp=Math.max(1,this.heroHp-sd);
    this.showDamage?.("💀 -"+formatNumber(sd),"dmg-player"); this.updateHpBars?.();
  }
};

// ── useSkill hook ──
const _ORIG_useSkill = rpg.useSkill.bind(rpg);
rpg.useSkill = function(id) {
  // Challenge blocks
  if (this.challengeActive) {
    if (id==="heal" && (this.activeChallenges||[]).includes("ch_no_heal")) { showToast("❌ Sem Cura (Desafio)!"); return; }
    if (id==="def"  && (this.activeChallenges||[]).includes("ch_no_def"))  { showToast("❌ Sem Defesa (Desafio)!"); return; }
    if (id==="def"  && (this.activeChallenges||[]).includes("ch_hardcore")) { showToast("❌ Sem Defesa (Desafio)!"); return; }
  }
  // Formation: berserk blocks def
  if (id==="def" && this.activeFormation==="berserk") { showToast("⚔ Berserk: Sem defesa!"); return; }
  // Cursed relic blocks
  const cr=this.getCursedRelic?.();
  if (cr?.noDef     && id==="def")  { showToast("💀 Maldição: Sem Defesa!"); return; }
  if (cr?.noPotions && id==="heal") { showToast("💀 Maldição: Sem Poções!"); return; }

  // Phoenix grimoire
  if (id==="heal" && this.grimoirePhoenix && this.heroHp<=0 && !this._phoenixUsed) {
    this._phoenixUsed=true; this.heroHp=Math.floor(this.getMaxHp()*0.25);
    this.updateHpBars?.(); showToast("🔥 FÉNIX! Ressuscitaste!",3000); return;
  }

  _ORIG_useSkill(id);

  // Skill combo tracking
  if (this.inCombat) this.checkSkillCombo?.(id);

  // Rune: storm free magic
  if (id==="mag" && this.getRuneEffect?.("storm") && Math.random()<0.20) {
    this.skills.mag.timer=false;
    const b=document.getElementById("btn-mag"); if(b) b.disabled=false;
    const c=document.getElementById("cd-mag");  if(c) c.style.width="0%";
    showToast("⚡ Tempestade! Grátis!",900);
  }
  // Timeloop zero cooldown
  if (this.getRuneEffect?.("timeloop") && Math.random()<0.20 && id!=="mag") {
    const skill=this.skills[id]; if(skill){skill.timer=false; const b=document.getElementById("btn-"+id); if(b)b.disabled=false; const c=document.getElementById("cd-"+id); if(c)c.style.width="0%";}
    showToast("⏰ Loop Temporal!",900);
  }
  // Track ultimate uses
  if (id==="atk" && (this.fury||0)>=99) { this.ultimateUses=(this.ultimateUses||0)+1; localStorage.setItem("rpg_ult_uses",this.ultimateUses); }
  // Grimoire fury boost
  if (this.grimoireFuryBoost && id!=="heal") {/* handled in addFury */}
  // Aura: holy heal bonus
  if (id==="heal" && this.getAura?.()?.effect==="holy") {
    const bonus=Math.floor(this.getMaxHp()*0.12);
    this.heroHp=Math.min(this.getMaxHp(),this.heroHp+bonus);
    this.showDamage?.("✨ +"+formatNumber(bonus),"heal"); this.updateHpBars?.();
  }
};

// ── executeMonsterAttack hook ──
const _ORIG_execMonster = rpg.executeMonsterAttack.bind(rpg);
rpg.executeMonsterAttack = function() {
  // Freeze: skip attack
  if (this.statusEffects?.freeze) {
    this.showDamage?.("❄️ CONGELADO!","dmg-effective");
    this.statusEffects.freeze.turns--;
    if (this.statusEffects.freeze.turns<=0) this.removeStatus?.("freeze");
    this.monsterAtb=0; return;
  }
  // Stun: skip
  if (this.statusEffects?.stun) {
    this.showDamage?.("😵 ATORDOADO!","dmg-effective");
    this.statusEffects.stun.turns--;
    if (this.statusEffects.stun.turns<=0) this.removeStatus?.("stun");
    this.monsterAtb=0; return;
  }
  // Rune: regen
  if (this.getRuneEffect?.("regen")) {
    const r=Math.floor(this.getMaxHp()*0.015);
    this.heroHp=Math.min(this.getMaxHp(),this.heroHp+r);
  }
  // Talent: regen
  if (this.talentRegen) {
    const r=Math.floor(this.getMaxHp()*0.02);
    this.heroHp=Math.min(this.getMaxHp(),this.heroHp+r);
  }
  // Talent T4: Regen T4 (+5% HP/turno)
  if (this.talentRegenT4) {
    const r=Math.floor(this.getMaxHp()*0.05);
    this.heroHp=Math.min(this.getMaxHp(),this.heroHp+r);
  }
  // Talent T5: Colossus (+10% HP/turno)
  if (this.talentColossus) {
    const r=Math.floor(this.getMaxHp()*0.10);
    this.heroHp=Math.min(this.getMaxHp(),this.heroHp+r);
  }
  // Shock: reduce damage
  const shockMult = this.statusEffects?.shock ? 0.7 : 1;
  if (this.statusEffects?.shock) {
    this.statusEffects.shock.turns--;
    if (this.statusEffects.shock.turns<=0) this.removeStatus?.("shock");
  }
  // T4: HolyArmor - reduz 30% do dano recebido
  if (this.talentHolyArmor && this.monster) {
    const origDmg = this.monster.dmg;
    this.monster.dmg = Math.floor(origDmg * 0.70);
    this._lastHpBeforeMonster = this.heroHp;
    _ORIG_execMonster();
    this.monster.dmg = origDmg;
  }
  // Poison tick on hero
  if (this.statusEffects?.poison) {
    const pd=Math.floor(this.getMaxHp()*0.03);
    this.heroHp=Math.max(1,this.heroHp-pd);
    this.showDamage?.("☠️ -"+formatNumber(pd),"hero"); this.updateHpBars?.();
    this.statusEffects.poison.turns--;
    if (this.statusEffects.poison.turns<=0) this.removeStatus?.("poison");
  }
  // Aura: fire - enemy gets burn on attack
  if (this.getAura?.()?.effect==="fire") setTimeout(()=>this.applyStatus?.("burn"),100);
  // Boss dialogue triggers
  if (this.isBossFight && this.monster) {
    const pct=this.monster.hp/this.monster.maxHp;
    if (!this._bossHalfTriggered && pct<=0.5) { this._bossHalfTriggered=true; this.showBossDialogue?.("half"); }
    if (!this._bossLowTriggered  && pct<=0.2) { this._bossLowTriggered=true;  this.showBossDialogue?.("low");  }
  }
  // Apply shock + original call (only if HolyArmor didn't already call it)
  if (!this.talentHolyArmor) {
    if (shockMult<1 && this.monster) {
      const sd=this.monster.dmg; this.monster.dmg=Math.floor(sd*shockMult);
      this._lastHpBeforeMonster = this.heroHp;
      _ORIG_execMonster();
      this.monster.dmg=sd;
    } else {
      this._lastHpBeforeMonster = this.heroHp;
      _ORIG_execMonster();
    }
  }
  // Spirit shield talent
  if (this.talentSpiritShield && this.heroHp<=0 && !this._spiritUsed) {
    this._spiritUsed=true; this.heroHp=1; this.updateHpBars?.(); this.showDamage?.("🛡 ESPÍRITO!","dmg-parry");
  }
  // T4: Immortal - 2 cargas de imunidade por batalha
  if (this.talentImmortal && this.heroHp<=0 && (this._immortalCharges||0)>0) {
    this._immortalCharges--; this.heroHp=Math.floor(this.getMaxHp()*0.10);
    this.updateHpBars?.(); this.showDamage?.("⚡ IMORTAL! ("+this._immortalCharges+" restantes)","dmg-parry");
  }  // T4: Thorns - reflete 20% do dano recebido
  if (this.talentThorns && this.monster) {
    const dmgTaken = Math.max(0, (this._lastHpBeforeMonster||this.heroHp) - this.heroHp);
    if (dmgTaken>0) {
      const reflect=Math.floor(dmgTaken*0.20);
      this.monster.hp=Math.max(0,this.monster.hp-reflect);
      this.showDamage?.("🌵 -"+formatNumber(reflect)+" (Espinhos)","dmg-effective");
    }
  }
  // T5: God Mode expira após turno do monstro
  if (this._godModeActive) this._godModeActive=false;
  if (this.monster) this.addLog?.(this.monster.name+" atacou "+this.heroName,"text-red-300");
};

// ── addFury hook ──
const _ORIG_addFury = rpg.addFury.bind(rpg);
rpg.addFury = function(amount) {
  let gain = amount;
  if (this.grimoireFuryBoost) gain = Math.floor(gain * 1.5);
  if ((this.talentFuryBoost||0) > 0) gain = Math.floor(gain * (1 + this.talentFuryBoost));
  const gemBonus = this.getGemBonusFor?.("fury",this.eqWeapon)||0;
  if (gemBonus>0) gain = Math.floor(gain*(1+gemBonus));
  _ORIG_addFury(gain);
};

// ═══════════════════════════════════════════════════════════════
// ── CONSOLIDATED killMonster HOOK ────────────────────────────
// ═══════════════════════════════════════════════════════════════
const _ORIG_killMonster = rpg.killMonster.bind(rpg);
rpg.killMonster = function() {
  const wasBosFight = this.isBossFight;
  const prevLevel   = this.level;
  const prevPrestige= this.prestigeLevel;
  const bossId      = this.monster?.id;
  const g0 = this.gold, x0 = this.xp;

  // Call original (handles XP/gold/level-up/story/spawn)
  _ORIG_killMonster();

  const goldEarned = this.gold - g0;
  const xpEarned   = this.xp - x0;

  // ── Notoriety ──
  this.addNotoriety && this.addNotoriety(wasBosFight ? 50 : 1);

  // ── Rune: momentum stack ──
  if (this.getRuneEffect?.("momentum")) this.runeKillStack = (this.runeKillStack||0)+1;

  // ── Achievement gold tracking ──
  if (goldEarned > 0) {
    this.totalGoldEarned = (this.totalGoldEarned||0) + goldEarned;
  }
  this.checkAchievements && this.checkAchievements();

  // ── Wave mode ──
  if (this.waveActive) {
    this.waveNumber = (this.waveNumber||1) + 1;
    if (this.waveNumber - 1 > (this.bestWave||0)) {
      this.bestWave = this.waveNumber - 1;
      localStorage.setItem("rpg_best_wave", this.bestWave);
    }
    const bonus = Math.floor(this.waveNumber * this.level * 10);
    this.gold += bonus;
    showToast("🌊 Onda " + (this.waveNumber-1) + "! +" + formatNumber(bonus) + " 💰", 1500);
  }

  // ── Daily Dungeon ──
  if (this.dailyDungeonActive) {
    this.dailyDungeonFloor = (this.dailyDungeonFloor||0) + 1;
    if (this.dailyDungeonFloor >= (this.DAILY_DUNGEON_FLOORS||5)) {
      this.dailyDungeonActive = false;
      this.dailyDungeonDone   = true;
      this.dungeonsCleared    = (this.dungeonsCleared||0) + 1;
      const gr = Math.floor(this.level * 500), pr = (this.DAILY_DUNGEON_FLOORS||5) * 3;
      this.gold += gr; this.potions += pr;
      localStorage.setItem("rpg_dd_done","true");
      localStorage.setItem("rpg_dungeons", this.dungeonsCleared);
      showToast("🏆 Dungeon Completa! +" + formatNumber(gr) + " 💰 +" + pr + " 🧪", 5000);
      this.checkAchievements && this.checkAchievements();
      this.save();
    } else showToast("🏰 Andar " + this.dailyDungeonFloor + " / " + (this.DAILY_DUNGEON_FLOORS||5), 1500);
  }

  // ── Procedural Dungeon ──
  if (this.procDungeonActive && this.proceduralDungeon) {
    const room = this.proceduralDungeon[this.procDungeonFloor||0];
    if (room && (room.id === "combat" || room.id === "miniboss")) {
      room.cleared = true;
      this.procDungeonFloor = (this.procDungeonFloor||0) + 1;
      setTimeout(() => {
        if ((this.procDungeonFloor||0) >= this.proceduralDungeon.length) this.completeProcDungeon && this.completeProcDungeon();
        else this.advanceProcRoom && this.advanceProcRoom();
      }, 1500);
    }
  }

  // ── Talent: level-up points ──
  if (this.level > prevLevel) {
    const gained = Math.floor((this.level - prevLevel) * 0.1);
    if (gained > 0) { this.talentPoints = (this.talentPoints||0) + gained; localStorage.setItem("rpg_talent_pts", this.talentPoints); }
  }

  // ── Talent: kill heal ──
  if (this.talentKillHeal) {
    const h = Math.floor(this.getMaxHp() * 0.05);
    this.heroHp = Math.min(this.getMaxHp(), this.heroHp + h);
    this.showDamage && this.showDamage("💚 +" + formatNumber(h), "heal");
    this.updateHpBars && this.updateHpBars();
  }
  // T4: BossStacks - conta kills de boss
  if (wasBosFight && this.talentBossStacks) {
    this.bossKills = Math.min((this.bossKills||0) + 1, 10);
    showToast("💀 Boss Stack! ATK +" + (this.bossKills * 15) + "% (" + this.bossKills + "/10)", 2000);
  }
  // T5: GodMode - ativa após usar supremo (fury >= 99 no momento do kill)
  if (this.talentGodMode && wasBosFight) {
    this._godModeActive = true;
    showToast("⚡ MODO DEUS ATIVADO! ATK 5x próximo turno!", 2500);
  }

  // ── Wanderer check ──
  this.trySpawnWanderer && this.trySpawnWanderer();
  if (this._tempCritBattles > 0) { this._tempCritBattles--; if (this._tempCritBattles<=0) this.tempCritBoost=0; }
  if (this._tempCdBattles   > 0) { this._tempCdBattles--;   if (this._tempCdBattles<=0)   this.tempCdBoost=0;   }
  if (this._tempHpBattles   > 0) { this._tempHpBattles--;   if (this._tempHpBattles<=0)   this.tempHpBoost=0;   }

  // ── Math battle ──
  if (this.mathBattleActive && this.inCombat && this.kills % 3 === 0)
    setTimeout(() => this.triggerMathQuestion && this.triggerMathQuestion(), 1500);

  // ── Cursed relic gold ──
  const cr = this.getCursedRelic ? this.getCursedRelic() : null;
  if (cr && (cr.goldMult || cr.gainsMult)) {
    const m = (cr.goldMult || cr.gainsMult || 1) - 1;
    if (m > 0) this.gold += Math.floor(this.level * 50 * m);
  }

  // ── Honor ──
  let honorGain = 0;
  if (wasBosFight)  honorGain += 10;
  if (["chaos","realmgod"].includes(this.difficulty)) honorGain += 5;
  if (this.waveActive && (this.waveNumber||0) > 1) honorGain += Math.floor((this.waveNumber||1) * 0.2);
  if (this.challengeActive) honorGain += 3;
  if (honorGain > 0) this.addHonor && this.addHonor(honorGain);

  // ── Narrative choice trigger ──
  if (wasBosFight) setTimeout(() => this.checkNarrativeChoice && this.checkNarrativeChoice(), 2000);

  // ── Skill memories / Lore ──
  if (wasBosFight) {
    this.checkSkillMemories && this.checkSkillMemories();
    this.checkLoreUnlock    && this.checkLoreUnlock();
  }

  // ── Boss dialogue on defeat ──
  if (wasBosFight) this.showBossDialogue && this.showBossDialogue("defeat");

  // ── Status effects clear ──
  this.statusEffects = {};
  this.renderStatusBar && this.renderStatusBar();

  // ── Aura: shadow fury ──
  if (this.getAura?.()?.effect === "shadow") this.addFury && this.addFury(5);

  // ── Mutation: prestige level up → new mutation ──
  if (this.prestigeLevel > prevPrestige) setTimeout(() => this.gainMutation && this.gainMutation(), 1500);

  // ── Speed Run ──
  if (this.speedRunActive && wasBosFight && bossId) {
    clearInterval(this._srInterval);
    const elapsed = Date.now() - (this.speedRunStart||Date.now());
    const prev = this.speedRunBest?.[bossId];
    const isRec = !prev || elapsed < prev;
    if (isRec && this.speedRunBest) this.speedRunBest[bossId] = elapsed;
    localStorage.setItem("rpg_sr_best", JSON.stringify(this.speedRunBest||{}));
    const bg = Math.max(1000, Math.floor(this.level * 500 * (isRec ? 3 : 1)));
    const bh = Math.max(1, Math.floor(60 - elapsed/1000));
    this.gold += bg; this.addHonor && this.addHonor(bh);
    showToast((isRec?"🏆 RECORD! ":"⏱ ") + this._formatTime?.(elapsed) + " +" + formatNumber(bg) + " 💰", 5000);
    this.speedRunActive = false;
  }

  // ── Season points ──
  this.addSeasonPoints && this.addSeasonPoints(wasBosFight ? 50 : 1);
  if (!wasBosFight) this.seasonKills = (this.seasonKills||0)+1;

  // ── Class reputation ──
  if (this.classReputation) {
    const cls = this.eqClass;
    const prevTier = this.getClassRepTier?.(cls);
    this.classReputation[cls] = (this.classReputation[cls]||0) + 1;
    localStorage.setItem("rpg_class_rep", JSON.stringify(this.classReputation));
    const nextTier = this.getClassRepTier?.(cls);
    if (prevTier && nextTier && prevTier.bonus !== nextTier.bonus) {
      const c = this.classes[cls];
      showToast("⭐ "+(c?c.name[this.lang]:cls)+" → "+nextTier.label[this.lang]+"! +"+Math.round(nextTier.bonus*100)+"% stats!", 4000);
    }
  }

  // ── NG+ reward bonus ──
  if ((this.ngPlusActive||0) > 0 && (goldEarned > 0 || xpEarned > 0)) {
    const rm = (this.NG_REWARD_MULT?.[this.ngPlusActive]||1) - 1;
    if (rm > 0) { this.gold += Math.floor(goldEarned*rm); this.xp += Math.floor(xpEarned*rm); }
  }

  // ── Formation: chaos double gold ──
  if (this.activeFormation === "chaos" && goldEarned > 0) this.gold += goldEarned;

  // ── Diary check ──
  this.checkDiaryEntries && this.checkDiaryEntries();

  // ── Tournament max dmg (passive) ──
  // (damage tracking is already in dealDamageToMonster)

  // ── Tourney completion ──
  if (wasBosFight && this.tourneyDone && bossId) {
    // already tracked in dealDamageToMonster
  }

  // ── Secret classes check ──
  this.checkSecretClasses && this.checkSecretClasses();

  // ── Advanced classes check (on boss kill) ──
  if (wasBosFight) this.checkAdvancedClasses && this.checkAdvancedClasses();

  this.save();
  this.updateUI();
};

function openEvent()         { rpg.renderEventModal();      document.getElementById('event-modal').classList.add('active'); }
function openForge()         { rpg.renderForge();           document.getElementById('forge-modal').classList.add('active'); }
function openFormation()     { rpg.renderFormationModal();  document.getElementById('formation-modal').classList.add('active'); }
function openGems()          { rpg.renderGemModal();        document.getElementById('gem-modal').classList.add('active'); }
function openGrimoire()      { rpg.renderGrimoire();        document.getElementById('grimoire-modal').classList.add('active'); }
function openHonorShop()     { rpg.renderHonorShop();       document.getElementById('honor-modal').classList.add('active'); }
function openLegacy()        { rpg.renderLegacyModal();     document.getElementById('legacy-modal').classList.add('active'); }
function openLore()          { rpg.renderLore();            document.getElementById('lore-modal').classList.add('active'); }
function openMap()           { rpg.renderMap();             document.getElementById('map-modal').classList.add('active'); }
function openMathMode()      { rpg.renderMathSetup();       document.getElementById('math-modal').classList.add('active'); }
function openMemories()      { rpg.renderMemories();        document.getElementById('memories-modal').classList.add('active'); }
function openMutations()     { rpg.renderMutations();       document.getElementById('mutations-modal').classList.add('active'); }
function openNgPlus() {
  try { rpg.renderNgPlus(); } catch(e) { console.warn('renderNgPlus:', e); }
  const m = document.getElementById('ngplus-modal');
  if (m) { m.classList.add('active'); m.style.zIndex = '300'; }
}
function openNpcs()          { rpg.renderNpcs();            document.getElementById('npc-modal').classList.add('active'); }
function openOracle()        { rpg.renderOracle();          document.getElementById('oracle-modal').classList.add('active'); }
function openPrestige()      { rpg.renderPrestige();        document.getElementById('prestige-modal').classList.add('active'); }
function openProcDungeon()   { rpg.renderProcDungeon();     document.getElementById('proc-modal').classList.add('active'); }
function openRuneModal()     { rpg.renderRuneModal();       document.getElementById('rune-modal').classList.add('active'); }
function openSeason()        { rpg.renderSeason();          document.getElementById('season-modal').classList.add('active'); }
function openSecretClasses() { rpg.renderSecretClasses();   document.getElementById('secret-classes-modal').classList.add('active'); }
function openAdvancedClasses() { rpg.renderAdvancedClasses(); document.getElementById('advanced-classes-modal').classList.add('active'); }
function openSpeedRun()      { rpg.renderSpeedRun();        document.getElementById('speedrun-modal').classList.add('active'); }
function openTalentTree()    { rpg.renderTalentTree();      document.getElementById('talent-modal').classList.add('active'); }
function openTourney()       { rpg.renderTourney();         document.getElementById('tourney-modal').classList.add('active'); }
function openWanderer()      { rpg.renderWanderer();        document.getElementById('wanderer-modal').classList.add('active'); }
function openWaveMode()      { rpg.renderWaveModal();       document.getElementById('wave-modal').classList.add('active'); }

// ═══════════════════════════════════════════════════════════════
// ── CONSOLIDATED updateUI HOOK ────────────────────────────────
// ═══════════════════════════════════════════════════════════════
const _ORIG_updateUI = rpg.updateUI.bind(rpg);
rpg.updateUI = function() {
  try { _ORIG_updateUI(); } catch(e) { console.warn('updateUI base error:', e.message); }

  // Title badge
  try {
    if (this.getTitle) {
      const title = this.getTitle();
      const el = document.getElementById('hero-title-badge');
      if (el && title) el.textContent = title.name[this.lang];
    }
  } catch(e) {}

  // Achievements check
  try { this.checkAchievements && this.checkAchievements(); } catch(e) {}

  // Map region auto-discover
  try {
    if (this.MAP_REGIONS) {
      this.MAP_REGIONS.forEach(r => {
        if (this.level >= r.reqLvl && this.bossKills >= r.reqBoss && !(this.mapDiscovered||[]).includes(r.id)) {
          this.discoverRegion && this.discoverRegion(r.id);
        }
      });
    }
  } catch(e) {}

  // Journal / diary checks
  try { this.checkJournalEntries && this.checkJournalEntries(); } catch(e) {}
  try { this.checkDiaryTriggers && this.checkDiaryTriggers(); } catch(e) {}
  try { this.checkDiaryEntries  && this.checkDiaryEntries();  } catch(e) {}

  // Secret classes check
  try { this.checkSecretClasses && this.checkSecretClasses(); } catch(e) {}
};

// ═══════════════════════════════════════════════════════════════
// ── CONSOLIDATED endBattle HOOK ───────────────────────────────
// ═══════════════════════════════════════════════════════════════
const _ORIG_endBattle = rpg.endBattle.bind(rpg);
rpg.endBattle = function() {
  try { _ORIG_endBattle(); } catch(e) { console.warn('endBattle base error:', e.message); }
  // Reset combat state
  try {
    this.inCombat = false;
    this.monster = null;
    this.isBossFight = false;
    this.waveActive = false;
    this.mathBattleActive = false;
    this.procDungeonActive = false;
    this.speedRunActive = false;
    clearInterval(this._srInterval);
    this.currentWeather = null;
    const badge = document.getElementById('weather-badge');
    if (badge) badge.classList.add('hidden');
    const bpEl = document.getElementById('boss-parts-ui');
    if (bpEl) bpEl.innerHTML = '';
  } catch(e) {}
};


// Start
rpg.init();

// ═══════════════════════════════════════════════════════════════
// ── GLOBAL OPEN FUNCTIONS (referenced from HTML buttons) ──────
// ═══════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════
// ── v24.0 — FEATURE PACK: TRANSIÇÕES · PARTÍCULAS · RADAR ────
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// 1. TRANSIÇÕES DE TEMA ANIMADAS
//    Overlay colorido com a cor do tema ao viajar entre mundos
// ─────────────────────────────────────────────────────────────

const THEME_COLORS = {
  't_ruins':      '#52525b',
  't_swamp':      '#064e3b',
  't_forest':     '#14532d',
  't_cave':       '#3730a3',
  't_volcano':    '#b91c1c',
  't_astral':     '#6d28d9',
  't_underground':'#10b981',
  't_neon':       '#0ea5e9',
  't_void':       '#18181b',
  't_ultimate':   '#d97706',
  't_omniverse':  '#a855f7',
  't_matrix':     '#10b981',
  't_dev':        '#ffffff',
  't_hardware':   '#f97316',
  't_math':       '#fbbf24',
  't_glitch':     '#e11d48',
  't_reboot':     '#22d3ee',
  't_synthetic':  '#facc15',
  't_white':      '#e2e8f0',
  't_quantum':    '#8b5cf6',
  't_end':        '#fb7185',
  't_neural':     '#00e5ff',
};

function playThemeTransition(themeId, cb) {
  const color = THEME_COLORS[themeId] || '#ffffff';

  // Criar overlay
  const overlay = document.createElement('div');
  overlay.id = 'theme-transition-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    pointer-events: none;
    background: ${color};
    opacity: 0;
    transition: opacity 0.25s ease;
  `;
  document.body.appendChild(overlay);

  // Scanline sweep on top
  const sweep = document.createElement('div');
  sweep.style.cssText = `
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px, transparent 3px,
      rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px
    );
  `;
  overlay.appendChild(sweep);

  // Label do mundo
  const label = document.createElement('div');
  label.style.cssText = `
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Orbitron', monospace;
    font-size: clamp(14px, 4vw, 22px);
    font-weight: 900;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.8);
    text-align: center;
    opacity: 0;
    transition: opacity 0.15s ease;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  `;
  const themeObj = rpg.themes.find(t => t.id === themeId);
  label.textContent = themeObj ? themeObj.name[rpg.lang] : '';
  overlay.appendChild(label);

  // Sequência: fade in → mostrar texto → fade out → callback
  requestAnimationFrame(() => {
    overlay.style.opacity = '0.92';
    setTimeout(() => {
      label.style.opacity = '1';
      if (cb) cb(); // aplica o tema enquanto está coberto
    }, 220);
    setTimeout(() => {
      label.style.opacity = '0';
      overlay.style.opacity = '0';
    }, 700);
    setTimeout(() => {
      overlay.remove();
    }, 950);
  });
}

// Patch updateTheme para incluir transição
const _origUpdateTheme = rpg.updateTheme.bind(rpg);
rpg.updateTheme = function(animated = false) {
  if (animated) {
    playThemeTransition(this.eqTheme, () => _origUpdateTheme());
  } else {
    _origUpdateTheme();
  }
};

// Patch buyItem para acionar transição ao trocar tema
const _origBuyItem = rpg.buyItem.bind(rpg);
rpg.buyItem = function(id, type) {
  if (type === 'theme') {
    // Deixar o buyItem original rodar, mas interceptar o updateTheme
    const _patched = rpg.updateTheme;
    rpg.updateTheme = function() {
      playThemeTransition(rpg.eqTheme, () => _origUpdateTheme());
      rpg.updateTheme = _patched;
    };
    _origBuyItem(id, type);
  } else {
    _origBuyItem(id, type);
  }
};


// ─────────────────────────────────────────────────────────────
// 2. SCREEN SHAKE MELHORADO + PARTÍCULAS DE DANO
//    Partículas CSS explodem na arena ao atacar/defender/curar
// ─────────────────────────────────────────────────────────────

function spawnParticles(type, count = 8) {
  const zone = document.getElementById('damage-zone');
  if (!zone) return;

  const configs = {
    'hit':    { colors: ['#ef4444','#f97316','#fbbf24'], shapes: ['●','✦','★'], baseX: 75 },
    'crit':   { colors: ['#fde047','#fbbf24','#ffffff'], shapes: ['★','✦','⬟','✸'], baseX: 75, big: true },
    'hero':   { colors: ['#ef4444','#dc2626','#991b1b'], shapes: ['●','◆','✦'], baseX: 20 },
    'heal':   { colors: ['#34d399','#6ee7b7','#a7f3d0'], shapes: ['♥','✦','●'], baseX: 20 },
    'magic':  { colors: ['#c084fc','#a855f7','#8b5cf6','#00e5ff'], shapes: ['✦','★','◈','✸'], baseX: 75 },
    'parry':  { colors: ['#93c5fd','#60a5fa','#ffffff'], shapes: ['◆','●','✦'], baseX: 20 },
  };

  const cfg = configs[type] || configs['hit'];
  const particleCount = cfg.big ? count + 4 : count;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
    const shape = cfg.shapes[Math.floor(Math.random() * cfg.shapes.length)];
    const size  = cfg.big ? (12 + Math.random() * 14) : (6 + Math.random() * 10);
    const angle = Math.random() * 360;
    const dist  = 30 + Math.random() * 70;
    const dx    = Math.cos(angle * Math.PI / 180) * dist;
    const dy    = Math.sin(angle * Math.PI / 180) * dist - 20;
    const dur   = 400 + Math.random() * 400;
    const delay = Math.random() * 120;

    p.style.cssText = `
      position: absolute;
      left: calc(${cfg.baseX}% + ${(Math.random()-0.5)*30}px);
      bottom: ${35 + Math.random()*20}%;
      font-size: ${size}px;
      color: ${color};
      pointer-events: none;
      z-index: 200;
      text-shadow: 0 0 6px ${color};
      animation: particle-fly ${dur}ms ease-out ${delay}ms forwards;
      --dx: ${dx}px;
      --dy: ${-Math.abs(dy)}px;
      opacity: 1;
    `;
    p.textContent = shape;
    zone.appendChild(p);
    setTimeout(() => p.remove(), dur + delay + 50);
  }
}

// Adicionar keyframe via JS (uma única vez)
if (!document.getElementById('particle-style')) {
  const st = document.createElement('style');
  st.id = 'particle-style';
  st.textContent = `
    @keyframes particle-fly {
      0%   { transform: translate(0, 0) scale(1); opacity: 1; }
      60%  { opacity: 0.8; }
      100% { transform: translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
    }
    @keyframes shake-v2 {
      0%,100% { transform: translate(0,0) rotate(0deg); }
      15%  { transform: translate(-5px, 3px) rotate(-0.5deg); }
      30%  { transform: translate(8px, -4px) rotate(0.5deg); }
      45%  { transform: translate(-10px, 5px) rotate(-0.3deg); }
      60%  { transform: translate(10px, -5px) rotate(0.3deg); }
      75%  { transform: translate(-6px, 3px) rotate(-0.2deg); }
      90%  { transform: translate(4px, -2px) rotate(0.1deg); }
    }
    @keyframes shake-v2-heavy {
      0%,100% { transform: translate(0,0) rotate(0deg); }
      10%  { transform: translate(-8px, 6px) rotate(-1deg); }
      25%  { transform: translate(14px,-8px) rotate(1deg); }
      40%  { transform: translate(-18px,12px) rotate(-0.8deg); filter: brightness(1.3) hue-rotate(10deg); }
      55%  { transform: translate(18px,-12px) rotate(0.8deg); }
      70%  { transform: translate(-10px, 7px) rotate(-0.5deg); }
      85%  { transform: translate(6px,-4px) rotate(0.3deg); }
    }
    .shake-v2       { animation: shake-v2 0.35s cubic-bezier(.36,.07,.19,.97) both; }
    .shake-v2-heavy { animation: shake-v2-heavy 0.55s cubic-bezier(.36,.07,.19,.97) both; }
  `;
  document.head.appendChild(st);
}

// Funções utilitárias de shake melhorado
function triggerShake(heavy = false) {
  const gc = document.getElementById('game-container');
  if (!gc) return;
  const cls = heavy ? 'shake-v2-heavy' : 'shake-v2';
  gc.classList.remove('shake-v2', 'shake-v2-heavy', 'shake-screen');
  void gc.offsetWidth; // reflow
  gc.classList.add(cls);
  setTimeout(() => gc.classList.remove(cls), heavy ? 550 : 350);
}

// Patch showDamage para incluir partículas
const _origShowDamage = rpg.showDamage.bind(rpg);
rpg.showDamage = function(textOut, type) {
  _origShowDamage(textOut, type);

  // Spawnar partículas por tipo
  switch(type) {
    case 'crit':          spawnParticles('crit', 12); break;
    case 'hero':          spawnParticles('hero', 6);  break;
    case 'heal':          spawnParticles('heal', 8);  break;
    case 'dmg-parry':     spawnParticles('parry', 8); break;
    case 'monster':       spawnParticles('hit', 5);   break;
    case 'dmg-effective': spawnParticles('magic', 10); break;
    default:              spawnParticles('hit', 4);   break;
  }
};

// Patch do take-damage hero para usar novo shake
const _origMonsterAttack = rpg.monsterAttack ? rpg.monsterAttack.bind(rpg) : null;
// Interceptar o shake existente aprimorando via override direto no receber dano
const _origReceiveDmg = rpg.receivePlayerDamage ? rpg.receivePlayerDamage.bind(rpg) : null;

// Override shake no momento que o hero leva dano (já usa classList em game.js linha 3988)
// Substituímos pela versão melhorada no patch do DOM
const _shakeObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.classList && node.classList.contains('shake-screen')) {
        node.classList.remove('shake-screen');
        triggerShake(false);
      }
    });
    if (m.type === 'attributes' && m.target.id === 'game-container') {
      const gc = m.target;
      if (gc.classList.contains('shake-screen')) {
        gc.classList.remove('shake-screen');
        triggerShake(false);
      }
      if (gc.classList.contains('shake-heavy')) {
        gc.classList.remove('shake-heavy');
        triggerShake(true);
      }
    }
  });
});
const _gcEl = document.getElementById('game-container');
if (_gcEl) {
  _shakeObserver.observe(_gcEl, { attributes: true, attributeFilter: ['class'] });
}


// ─────────────────────────────────────────────────────────────
// 3. RADAR CHART NO PERFIL
//    SVG pentagonal mostrando ATK · DEF · MAG · SPD · LUCK
// ─────────────────────────────────────────────────────────────

function buildRadarChart(stats) {
  // stats = { atk, def, mag, spd, luck } — valores 0–100
  const labels  = ['ATK','DEF','MAG','SPD','LUCK'];
  const values  = [stats.atk, stats.def, stats.mag, stats.spd, stats.luck];
  const colors  = ['#ef4444','#3b82f6','#a855f7','#22d3ee','#fbbf24'];
  const n       = 5;
  const cx      = 100, cy = 100, R = 78;
  const rings   = [20,40,60,80,100];

  function pt(i, pct) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const r = R * pct / 100;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  // Pontos dos anéis (background grid)
  function ringPath(pct) {
    return Array.from({length: n}, (_, i) => {
      const p = pt(i, pct);
      return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(' ') + 'Z';
  }

  // Polígono dos stats do herói
  const heroPath = values.map((v, i) => {
    const p = pt(i, Math.min(v, 100));
    return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ') + 'Z';

  // Linhas dos eixos
  const axes = Array.from({length: n}, (_, i) => {
    const p = pt(i, 100);
    return `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}"
      stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
  }).join('');

  // Grid rings
  const grid = rings.map(r =>
    `<path d="${ringPath(r)}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`
  ).join('');

  // Labels + pontos dos vértices
  const labelEls = labels.map((lbl, i) => {
    const p  = pt(i, 112);
    const dot = pt(i, values[i]);
    const val = values[i];
    return `
      <text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}"
        text-anchor="middle" dominant-baseline="central"
        font-family="Orbitron,monospace" font-size="7" font-weight="700"
        fill="${colors[i]}" opacity="0.9">${lbl}</text>
      <circle cx="${dot.x.toFixed(1)}" cy="${dot.y.toFixed(1)}" r="3.5"
        fill="${colors[i]}" stroke="#000" stroke-width="1"
        style="filter:drop-shadow(0 0 4px ${colors[i]})"/>
      <text x="${dot.x.toFixed(1)}" y="${(dot.y - 8).toFixed(1)}"
        text-anchor="middle" font-family="Fira Code,monospace"
        font-size="6.5" fill="${colors[i]}" opacity="0.85">${val}</text>`;
  }).join('');

  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:200px;display:block;margin:0 auto;">
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stop-color="rgba(220,38,38,0.25)"/>
          <stop offset="100%" stop-color="rgba(220,38,38,0.04)"/>
        </radialGradient>
      </defs>
      ${grid}
      ${axes}
      <path d="${heroPath}" fill="url(#radarFill)" stroke="#ef4444"
        stroke-width="1.5" stroke-linejoin="round"
        style="filter:drop-shadow(0 0 6px rgba(220,38,38,0.4))"/>
      ${labelEls}
    </svg>`;
}

function computeHeroRadarStats() {
  const lvl       = rpg.level || 1;
  const bossKills = rpg.bossKills || 0;
  const kills     = rpg.kills || 0;
  const prestige  = rpg.prestigeCount || 0;
  const w         = rpg.getWeapon ? rpg.getWeapon() : {};
  const a         = rpg.getArmor ? rpg.getArmor() : {};
  const maxAtk    = rpg.getAtk ? rpg.getAtk() : lvl * 2;
  const maxDef    = a.def || 0;
  const maxHp     = rpg.getMaxHp ? rpg.getMaxHp() : lvl * 10;

  // Normalizar para 0–100 escalonado por nível máximo esperado ~3000
  const norm = (v, max) => Math.min(100, Math.round((v / Math.max(max, 1)) * 100));

  const atk  = norm(maxAtk,  lvl * 5 + 50);
  const def  = Math.min(100, Math.round(maxDef * 100));
  const mag  = norm(w.id && w.id.includes('magic') ? maxAtk * 1.5 : maxAtk * 0.6, lvl * 4 + 40);
  const spd  = Math.min(100, 30 + Math.round((prestige * 8) + Math.min(bossKills * 3, 40)));
  const luck = Math.min(100, 20 + Math.round(Math.min(kills / 500, 50) + bossKills * 2));

  return { atk, def, mag, spd, luck };
}

// Injetar radar chart no modal de perfil quando abre
const _origOpenProfile = typeof openProfile === 'function' ? openProfile : null;
function openProfile() {
  rpg.updateProfileStats();
  document.getElementById('profile-modal').classList.add('active');

  // Injetar radar
  setTimeout(() => {
    let radarContainer = document.getElementById('radar-chart-container');
    if (!radarContainer) {
      radarContainer = document.createElement('div');
      radarContainer.id = 'radar-chart-container';
      radarContainer.style.cssText = `
        background: rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 12px;
        padding: 12px;
        margin-bottom: 8px;
      `;

      const title = document.createElement('h3');
      title.style.cssText = `
        font-family: 'Orbitron',monospace;
        font-size: 9px; font-weight: 700;
        color: rgba(150,150,180,1);
        text-transform: uppercase; letter-spacing: 0.15em;
        text-align: center; margin-bottom: 10px;
      `;
      title.textContent = 'ANÁLISE DE COMBATE';
      radarContainer.appendChild(title);

      const svgWrapper = document.createElement('div');
      svgWrapper.id = 'radar-svg-wrapper';
      radarContainer.appendChild(svgWrapper);

      // Inserir depois do hero card (segundo child do scroll container)
      const scrollArea = document.querySelector('#profile-modal .space-y-4');
      if (scrollArea) {
        const firstChild = scrollArea.firstElementChild;
        if (firstChild) {
          scrollArea.insertBefore(radarContainer, firstChild.nextSibling);
        } else {
          scrollArea.appendChild(radarContainer);
        }
      }
    }

    const wrapper = document.getElementById('radar-svg-wrapper');
    if (wrapper) {
      wrapper.innerHTML = buildRadarChart(computeHeroRadarStats());
    }
  }, 50);
}

// ─────────────────────────────────────────────────────────────
// 4. COMBAT BUTTONS — ESTILO APAGADO (DIM) NA INTERFACE
//    Os botões de combate ficam com cor "apagada" por defeito
//    e ganham brilho ao estarem activos / em uso.
// ─────────────────────────────────────────────────────────────
(function injectDimmedButtonStyles() {
  if (document.getElementById('dim-btn-styles')) return;
  const st = document.createElement('style');
  st.id = 'dim-btn-styles';
  st.textContent = `
    /* ── Botões de acção principais (Atacar, Magia, Defender, Curar) ── */
    #btn-atk,
    #btn-mag,
    #btn-def,
    #btn-heal {
      filter: brightness(0.45) saturate(0.5);
      transition: filter 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
    }

    /* Hover — acende um pouco */
    #btn-atk:not(:disabled):hover,
    #btn-mag:not(:disabled):hover,
    #btn-def:not(:disabled):hover,
    #btn-heal:not(:disabled):hover {
      filter: brightness(0.75) saturate(0.85);
    }

    /* Active (click) — acende totalmente */
    #btn-atk:not(:disabled):active,
    #btn-mag:not(:disabled):active,
    #btn-def:not(:disabled):active,
    #btn-heal:not(:disabled):active {
      filter: brightness(1) saturate(1);
      transform: scale(0.96);
    }

    /* Quando está em cooldown (disabled) — ainda mais apagado */
    #btn-atk:disabled,
    #btn-mag:disabled,
    #btn-def:disabled,
    #btn-heal:disabled {
      filter: brightness(0.28) saturate(0.3) !important;
    }

    /* Ultimate ready — acende com glow */
    #btn-atk.ultimate-ready {
      filter: brightness(1.1) saturate(1.3) !important;
      box-shadow: 0 0 18px 4px rgba(251, 191, 36, 0.55) !important;
    }

    /* ── Botão Auto Attack ── */
    #btn-auto-atk {
      filter: brightness(0.55) saturate(0.5);
      transition: filter 0.15s ease;
    }
    #btn-auto-atk:hover {
      filter: brightness(0.8) saturate(0.8);
    }
    #btn-auto-atk.auto-atk-active {
      filter: brightness(1.05) saturate(1.2) !important;
      box-shadow: 0 0 10px 2px rgba(34, 197, 94, 0.45) !important;
    }

    /* ── Botão Fugir ── */
    #btn-flee {
      filter: brightness(0.45) saturate(0.4);
      transition: filter 0.15s ease;
    }
    #btn-flee:hover {
      filter: brightness(0.75) saturate(0.75);
    }
    #btn-flee:active {
      filter: brightness(1) saturate(1);
    }
  `;
  document.head.appendChild(st);
})();



// ═══════════════════════════════════════════════════════════════
// ── AUTO ATTACK v6 — CORREÇÃO TOTAL DO BUG DE PARAGEM ────────
// ═══════════════════════════════════════════════════════════════
// PROBLEMA v5: endBattle chamava stop() incondicionalmente.
//   killMonster → endBattle (interno) → stop() → auto parava.
//   startBattle só era chamado no botão "Entrar na Masmorra",
//   NÃO entre combates normais de mobs (que usam spawnMonster).
//
// SOLUÇÃO v6:
//   • endBattle só faz stop() se o utilizador SAIU do combate
//     (navTo menu / flee) — detectado via flag _userExitedCombat.
//   • killMonster hook: se auto está ativo, agenda re-spawn
//     após o delay de "isSpawning", sem parar o interval.
//   • O interval nunca para entre mobs — apenas pausa (tick
//     retorna cedo se !inCombat ou isSpawning).
//   • startBattle continua a relançar o auto se estava ativo
//     (cobre entrar numa nova masmorra com auto já ligado).
// ═══════════════════════════════════════════════════════════════
;(function AutoAttackV6(rpg) {
  'use strict';

  /* ── Estado privado ── */
  var interval  = null;
  var enabled   = false;
  var TICK_MS   = 650; // ligeiramente mais rápido que v5

  /* ── Helpers ── */
  function setBtn(on) {
    var b = document.getElementById('btn-auto-atk');
    if (!b) return;
    b.disabled = false;
    b.style.pointerEvents = 'auto';
    b.style.opacity = '1';
    b.style.filter  = '';
    if (on) b.classList.add('auto-atk-active');
    else    b.classList.remove('auto-atk-active');
  }

  // Para COMPLETAMENTE (usado apenas ao sair da batalha)
  function fullStop() {
    if (interval) { clearInterval(interval); interval = null; }
    enabled = false;
    if (rpg) rpg.autoAttack = false;
    setBtn(false);
  }

  // Inicia o interval (sem mudar enabled — já pode estar true)
  function ensureInterval() {
    if (!interval) {
      interval = setInterval(tick, TICK_MS);
    }
  }

  function tick() {
    if (!rpg || !enabled) { fullStop(); return; }

    // Aguarda sem parar: entre mobs (isSpawning) ou fora de combate
    if (!rpg.inCombat)  return;
    if (rpg.isSpawning) return;

    // Monstro ainda vivo?
    if (!rpg.monster || rpg.monster.hp <= 0) return;

    // Herói morto?
    if (rpg.heroHp <= 0) return;

    // Auto-cura se HP < 35%
    try {
      if (rpg.heroHp < rpg.getMaxHp() * 0.35 &&
          rpg.potions > 0 &&
          rpg.skills && !rpg.skills.heal.timer) {
        rpg.useSkill('heal');
        return;
      }
    } catch(e) {}

    // Atacar
    try {
      if (rpg.skills && !rpg.skills.atk.timer) {
        rpg.useSkill('atk');
      }
    } catch(e) {}
  }

  function start() {
    enabled = true;
    if (rpg) rpg.autoAttack = true;
    setBtn(true);
    ensureInterval();
  }

  /* ── toggleAutoAttack ── */
  rpg.toggleAutoAttack = function() {
    if (enabled) {
      fullStop();
      try { showToast(t('auto_off')); } catch(e) { showToast('Auto OFF'); }
    } else {
      start();
      try { showToast(t('auto_on')); } catch(e) { showToast('Auto ON'); }
    }
  };

  /* ── FLAG: sinaliza saída deliberada do combate ── */
  rpg._userExitedCombat = false;

  /* ── Hook endBattle: SÓ para o auto se o utilizador saiu ── */
  var _eb = rpg.endBattle.bind(rpg);
  rpg.endBattle = function() {
    var wasUserExit = rpg._userExitedCombat;
    rpg._userExitedCombat = false; // reset
    try { _eb.call(this); } catch(e) {}
    // Só para o auto se foi saída deliberada (flee / menu)
    if (wasUserExit && enabled) {
      fullStop();
    }
  };

  /* ── Hook navTo: marca saída deliberada ── */
  var _origNavTo = (typeof navTo === 'function') ? navTo : null;
  if (_origNavTo) {
    window.navTo = function(view, isBossFight) {
      if (view === 'menu') rpg._userExitedCombat = true;
      _origNavTo(view, isBossFight);
    };
  }

  /* ── Hook useSkill('flee'): marca saída deliberada ── */
  var _origFlee = rpg.flee ? rpg.flee.bind(rpg) : null;
  if (_origFlee) {
    rpg.flee = function() {
      rpg._userExitedCombat = true;
      _origFlee.call(this);
    };
  }

  /* ── Hook startBattle: garante que auto relança ao entrar numa nova masmorra ── */
  var _sb = rpg.startBattle.bind(rpg);
  rpg.startBattle = function(isBoss) {
    var wasEnabled = enabled;
    rpg._userExitedCombat = false;
    try { _sb.call(this, isBoss); } catch(e) {}
    if (wasEnabled) {
      // Pequeno delay para o spawnMonster terminar
      setTimeout(function() {
        if (wasEnabled) { start(); }
      }, 250);
    }
  };

  /* ── Watchdog: a cada 1.5s verifica estado ── */
  setInterval(function() {
    if (!enabled) return;
    // Re-anima interval se morreu por engano
    if (!interval) ensureInterval();
    // Sincroniza botão
    setBtn(true);
    // Se fora de combate há mais de 5s e interval existe, OK — tick retorna cedo
    // (não paramos: utilizador pode estar a ver menu mas auto continua pronto)
  }, 1500);

  /* ── API pública para debug ── */
  rpg._auto = {
    get on()  { return enabled; },
    start:    start,
    stop:     fullStop,
    get ms()  { return TICK_MS; },
    set ms(v) { TICK_MS = v; if (interval) { clearInterval(interval); interval = null; ensureInterval(); } }
  };

  console.log('[AutoAttack v6] OK — interval=' + TICK_MS + 'ms, watchdog=1.5s | BUG FIX: endBattle não para mais entre mobs');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── NOVO MUNDO: NEXUS ETÉREO (Tier VI) ───────────────────────
// ═══════════════════════════════════════════════════════════════
// Req: Boss 16 · Lvl 3000 — após o Arquiteto do Fim
// ═══════════════════════════════════════════════════════════════
(function injectNexusEtereo(rpg) {
  if (!rpg) return;

  // ── Novo mundo / portal ──
  if (rpg.themes && !rpg.themes.find(function(t){return t.id==='t_nexus_etereo';})) {
    rpg.themes.push({
      id: 't_nexus_etereo',
      name: { pt: 'Nexus Etéreo', en: 'Ethereal Nexus' },
      desc: { pt: 'Cap. XII completo.', en: 'Ch. XII done.' },
      cssClass: 'theme-quantum',
      bgClass: 'bg-arena-quantum',
      cost: 9000000000000000,
      reqLvl: 3100,
      reqBosses: 16,
    });
  }

  // ── Novo milestone ──
  if (rpg.milestones && !rpg.milestones.find(function(m){return m.id==='nexus_etereo';})) {
    rpg.milestones.push({
      id: 'nexus_etereo',
      lvl: 3100,
      reqBosses: 16,
      name: { pt: 'Cap. XII — O Nexus Etéreo', en: 'Ch. XII — The Ethereal Nexus' },
    });
  }

  // ── Novos monstros ──
  if (rpg.monsterTypes && !rpg.monsterTypes.find(function(m){return m.id==='ether_weaver';})) {
    rpg.monsterTypes.push(
      {
        id: 'ether_weaver',
        name: { pt: 'Tecedor Etéreo', en: 'Ether Weaver' },
        icon: 'waves',
        color: 'text-cyan-300',
        hpMult: 200000,
        dmgMult: 180000,
        spd: 650,
        weak: 'mag',
        res: 'atk',
        dodge: 0.45,
        block: 0.2,
      },
      {
        id: 'nexus_drone',
        name: { pt: 'Drone do Nexus', en: 'Nexus Drone' },
        icon: 'radio',
        color: 'text-violet-400',
        hpMult: 350000,
        dmgMult: 300000,
        spd: 550,
        weak: 'atk',
        res: 'mag',
        dodge: 0.3,
        block: 0.35,
      },
      {
        id: 'signal_ghost',
        name: { pt: 'Fantasma de Sinal', en: 'Signal Ghost' },
        icon: 'wifi-off',
        color: 'text-pink-300',
        hpMult: 600000,
        dmgMult: 500000,
        spd: 500,
        weak: 'none',
        res: 'none',
        dodge: 0.55,
        block: 0.1,
      }
    );
  }

  // ── Novo boss: O Transmissor ──
  if (rpg.actBosses && !rpg.actBosses.find(function(b){return b.id==='boss_17';})) {
    rpg.actBosses.push({
      id: 'boss_17',
      name: { pt: 'O Transmissor', en: 'The Transmitter' },
      icon: 'radio',
      color: 'text-cyan-400',
      reqLvl: 3100,
      baseHp: 300000000000000,
      hpMult: 800000,
      baseDmg: 3000000000000,
      dmgMult: 800000,
      spd: 140,
    });
  }

  // ── Lore do novo mundo ──
  if (rpg.actLore && !rpg.actLore.find(function(l){return l.act===16;})) {
    rpg.actLore.push({
      act: 16,
      title: { pt: 'Cap. XII: O Nexus Etéreo', en: 'Ch. XII: The Ethereal Nexus' },
      desc: { pt: 'Sinais de mundos mortos.', en: 'Signals from dead worlds.' },
      quote: { pt: 'Transmitindo... transmitindo...', en: 'Transmitting... transmitting...' },
    });
  }

  // ── Story chapters ──
  if (rpg.storyChapters && !rpg.storyChapters.nexus_etereo) {
    rpg.storyChapters.nexus_etereo = [
      { e: 'radio',    t: { pt: 'Além do Arquiteto do Fim, os sinais continuam a chegar.', en: 'Beyond the Architect of the End, signals still arrive.' } },
      { e: 'waves',    t: { pt: 'O Nexus Etéreo — o ponto de convergência de todos os mundos mortos.', en: 'The Ethereal Nexus — the convergence point of all dead worlds.' } },
      { e: 'wifi-off', t: { pt: 'O Transmissor mantém o eco de tudo o que foi apagado. Silencia-o.', en: 'The Transmitter keeps the echo of all that was erased. Silence it.' } },
    ];
  }

  // ── Novos itens: Armas ──
  if (rpg.weapons && !rpg.weapons.find(function(w){return w.id==='w_nexus_blade';})) {
    rpg.weapons.push(
      {
        id: 'w_nexus_blade',
        name: { pt: 'Lâmina do Nexus', en: 'Nexus Blade' },
        desc: { pt: '+900% ATK', en: '+900% ATK' },
        icon: 'zap',
        dmgMult: 10.0,
        cost: 80000000000000000,
        reqLvl: 3100,
        reqBosses: 16,
      },
      {
        id: 'w_signal_sword',
        name: { pt: 'Espada de Sinal', en: 'Signal Sword' },
        desc: { pt: '+1200% ATK', en: '+1200% ATK' },
        icon: 'radio',
        dmgMult: 13.0,
        cost: 500000000000000000,
        reqLvl: 3200,
        reqBosses: 17,
      }
    );
  }

  // ── Novos itens: Armaduras ──
  if (rpg.armors && !rpg.armors.find(function(a){return a.id==='a_ether_plate';})) {
    rpg.armors.push(
      {
        id: 'a_ether_plate',
        name: { pt: 'Placa Etérea', en: 'Ether Plate' },
        desc: { pt: '+800% HP, +25% Esq', en: '+800% HP, +25% Dodge' },
        icon: 'shield',
        hpMult: 9.0,
        dodge: 0.25,
        block: 0.1,
        cost: 100000000000000000,
        reqLvl: 3100,
        reqBosses: 16,
      }
    );
  }

  // ── Novos itens: Relíquias ──
  if (rpg.relics && !rpg.relics.find(function(r){return r.id==='r_nexus';})) {
    rpg.relics.push({
      id: 'r_nexus',
      name: { pt: 'Cristal do Nexus', en: 'Nexus Crystal' },
      desc: { pt: 'Multiplica Tudo (100x)', en: 'Multiplies All (100x)' },
      icon: 'gem',
      cost: 10000000000000000,
      reqLvl: 3100,
      reqBosses: 16,
    });
  }

  // ── Novos diálogos de boss ──
  if (rpg.BOSS_DIALOGUES) {
    if (!rpg.BOSS_DIALOGUES['boss_17']) {
      rpg.BOSS_DIALOGUES['boss_17'] = {
        start: [
          { pt: 'Transmissão em curso. Receptor identificado.', en: 'Transmission in progress. Receiver identified.' },
          { pt: 'Tu és o último sinal não corrompido neste plano.', en: 'You are the last uncorrupted signal in this plane.' },
          { pt: 'Devo... amplificar... a tua extinção.', en: 'I must... amplify... your extinction.' },
        ],
        half: [
          { pt: '...Interferência detetada. Recalibrar frequências...', en: '...Interference detected. Recalibrating frequencies...' },
          { pt: 'Impossível. Os teus padrões de combate... evoluem?', en: 'Impossible. Your combat patterns... evolve?' },
        ],
        low: [
          { pt: 'SINAL CRÍTICO. SINAL CRÍTICO. TRANSMISSÃO A FALHAR—', en: 'CRITICAL SIGNAL. CRITICAL SIGNAL. TRANSMISSION FAILING—' },
        ],
        defeat: [
          { pt: '...A transmissão... cessa... O silêncio... é... paz...', en: '...The transmission... ends... Silence... is... peace...' },
        ],
      };
    }

    // ── Novos diálogos para bosses existentes (complemento) ──
    if (rpg.BOSS_DIALOGUES['boss_1'] && rpg.BOSS_DIALOGUES['boss_1'].start) {
      if (rpg.BOSS_DIALOGUES['boss_1'].start.length < 4) {
        rpg.BOSS_DIALOGUES['boss_1'].start.push(
          { pt: 'Foste criado para falhar. Eu fui criado para garantir isso.', en: 'You were created to fail. I was created to ensure it.' }
        );
      }
    }
    if (rpg.BOSS_DIALOGUES['boss_2'] && rpg.BOSS_DIALOGUES['boss_2'].start) {
      if (rpg.BOSS_DIALOGUES['boss_2'].start.length < 4) {
        rpg.BOSS_DIALOGUES['boss_2'].start.push(
          { pt: 'As estrelas que vês já estão mortas. Como tu estarás em breve.', en: 'The stars you see are already dead. As you will be soon.' }
        );
      }
    }
    if (rpg.BOSS_DIALOGUES['boss_3'] && rpg.BOSS_DIALOGUES['boss_3'].start) {
      if (rpg.BOSS_DIALOGUES['boss_3'].start.length < 4) {
        rpg.BOSS_DIALOGUES['boss_3'].start.push(
          { pt: 'O vazio não tem fim. E tu... serás parte dele.', en: 'The void has no end. And you... will become part of it.' }
        );
      }
    }
  }

  // ── Novos fragmentos de lore ──
  if (rpg.LORE_FRAGMENTS && !rpg.LORE_FRAGMENTS.find(function(f){return f.id==='lore_012';})) {
    rpg.LORE_FRAGMENTS.push(
      { id: 'lore_012', triggerBoss: 16, text: { pt: 'O Nexus Etéreo foi construído para preservar os ecos de civilizações apagadas. Alguém quis que o passado sobrevivesse.', en: 'The Ethereal Nexus was built to preserve echoes of erased civilizations. Someone wanted the past to survive.' } },
      { id: 'lore_013', triggerBoss: 17, text: { pt: 'O Transmissor não é malévolo — é apenas fiel ao seu propósito original: transmitir para sempre. Mesmo quando não há ninguém para receber.', en: 'The Transmitter is not malevolent — it is merely faithful to its original purpose: transmit forever. Even when there is no one left to receive.' } }
    );
  }

  // ── Novos diários do herói ──
  if (rpg.DIARY_TRIGGERS && !rpg.DIARY_TRIGGERS.find(function(d){return d.id==='d_boss16';})) {
    rpg.DIARY_TRIGGERS.push(
      { id:'d_boss16', cond:function(s){return s.bossKills>=16;}, entry:{ pt:'Dezasseis Guardiões. Cada vitória reescreve quem sou. Já não sei se sou o herói desta história ou a força inevitável que ela precisava.', en:'Sixteen Guardians. Each victory rewrites who I am. I no longer know if I am this story\'s hero or the inevitable force it needed.' } },
      { id:'d_nexus',  cond:function(s){return s.bossKills>=17;}, entry:{ pt:'O Transmissor sussurrou algo antes de silenciar: os mundos mortos queriam ser lembrados. Talvez eu seja a sua memória viva.', en:'The Transmitter whispered something before going silent: the dead worlds wanted to be remembered. Perhaps I am their living memory.' } }
    );
  }

  // ── Novo mapa: região Nexus Etéreo ──
  if (rpg.MAP_REGIONS && !rpg.MAP_REGIONS.find(function(r){return r.id==='r_nexus_etereo';})) {
    rpg.MAP_REGIONS.push({
      id: 'r_nexus_etereo',
      x: 50, y: 2,
      name: { pt: 'Nexus Etéreo', en: 'Ethereal Nexus' },
      reqBoss: 16, reqLvl: 3100,
      color: '#00e5ff',
      icon: '📡',
      desc: { pt: 'Onde os sinais de mundos mortos se encontram. Frequências além da compreensão.', en: 'Where signals from dead worlds converge. Frequencies beyond comprehension.' },
      theme: 't_nexus_etereo', biome: 'nexus',
    });
  }

  console.log('[Nexus Etéreo] Injetado: novo mundo, 3 monstros, 1 boss, 2 armas, 1 armadura, 1 relíquia, diálogos e lore.');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── NOVOS DIÁLOGOS GERAIS (NPCs e combate) ───────────────────
// ═══════════════════════════════════════════════════════════════
(function injectExtraDialogues(rpg) {
  if (!rpg) return;

  // Frases aleatórias de entrada em batalha (se o sistema existir)
  rpg.BATTLE_ENTRY_LINES = rpg.BATTLE_ENTRY_LINES || [];
  var extraLines = [
    { pt: 'Os dados foram lançados. Agora, que o código decida.', en: 'The dice are cast. Now let the code decide.' },
    { pt: 'Outro inimigo. Outro obstáculo. Outro passo em frente.', en: 'Another enemy. Another obstacle. Another step forward.' },
    { pt: 'Há algo de familiar neste caos. Como se eu o tivesse causado.', en: 'There is something familiar in this chaos. As if I caused it.' },
    { pt: 'Algoritma treme quando entro numa sala. Bom.', en: 'Algoritma trembles when I enter a room. Good.' },
    { pt: 'O medo é apenas latência. Eu processo mais rápido.', en: 'Fear is just latency. I process faster.' },
    { pt: 'Cada golpe é uma linha de código que o universo escreve.', en: 'Each blow is a line of code the universe writes.' },
    { pt: 'Estou a ficar mais forte. Eles também. É chamado de equilíbrio. Eu quebro-o.', en: 'I am getting stronger. So are they. It is called balance. I break it.' },
    { pt: 'Batalha número... já perdi a conta. Continuo aqui.', en: 'Battle number... I lost count. I am still here.' },
  ];
  extraLines.forEach(function(line) {
    if (!rpg.BATTLE_ENTRY_LINES.find(function(l){return l.pt===line.pt;})) {
      rpg.BATTLE_ENTRY_LINES.push(line);
    }
  });

  // Frases de vitória aleatórias
  rpg.VICTORY_LINES = rpg.VICTORY_LINES || [];
  var victoryLines = [
    { pt: 'Mais uma instância encerrada.', en: 'One more instance closed.' },
    { pt: 'O inimigo subestimou a variável mais perigosa: eu.', en: 'The enemy underestimated the most dangerous variable: me.' },
    { pt: 'Vitória. Guarda no log. Continua.', en: 'Victory. Save to log. Continue.' },
    { pt: 'Eles lutaram bem. Não o suficiente.', en: 'They fought well. Not enough.' },
    { pt: 'O ouro cheira a progresso. Continuo.', en: 'The gold smells like progress. I continue.' },
    { pt: 'Mais um guardião silenciado. O cosmos respira.', en: 'One more guardian silenced. The cosmos breathes.' },
    { pt: 'Sinto a fúria a crescer. É combustível.', en: 'I feel the fury growing. It is fuel.' },
    { pt: 'A lenda cresce. O herói persiste.', en: 'The legend grows. The hero persists.' },
  ];
  victoryLines.forEach(function(line) {
    if (!rpg.VICTORY_LINES.find(function(l){return l.pt===line.pt;})) {
      rpg.VICTORY_LINES.push(line);
    }
  });

  // Injetar frases de vitória no killMonster (se o sistema não existir nativamente)
  if (!rpg._victoryLineHooked) {
    rpg._victoryLineHooked = true;
    var _vkm = rpg.killMonster ? rpg.killMonster.bind(rpg) : null;
    if (_vkm) {
      rpg.killMonster = function() {
        _vkm.call(this);
        // Mostrar linha de vitória ocasional (1 em 5 combates)
        try {
          if (rpg.VICTORY_LINES && rpg.VICTORY_LINES.length > 0 && Math.random() < 0.20) {
            var lines = rpg.VICTORY_LINES;
            var line  = lines[Math.floor(Math.random() * lines.length)];
            var lang  = rpg.lang || 'pt';
            if (line && line[lang]) {
              setTimeout(function() { showToast('⚔ ' + line[lang], 2500); }, 1200);
            }
          }
        } catch(e) {}
      };
    }
  }

  console.log('[Diálogos v1] Injetadas ' + extraLines.length + ' frases de batalha e ' + victoryLines.length + ' de vitória.');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── AUTO ATTACK v7 — LOOP CONTÍNUO COM PAUSA ENTRE MOBS ───────
// ═══════════════════════════════════════════════════════════════
// PROBLEMA v6: após matar um inimigo, o tick continuava a correr
//   mas "isSpawning" pausava — porém se a flag demorasse a limpar
//   ou o monster fosse null, o auto ficava preso sem atacar.
//   Também: o watchdog de 1.5s recriava intervals "fantasmas".
//
// SOLUÇÃO v7 — DESIGN LIMPO:
//   • Um único setInterval central que NUNCA é destruído enquanto
//     o auto está ativo. Pausa internamente (sem side-effects).
//   • Ao matar mob: o tick deteta monster.hp<=0 e aguarda
//     isSpawning=false + monster novo. Sem hooks adicionais.
//   • Ao sair da batalha (flee/menu): fullStop() limpa tudo.
//   • Ao entrar numa nova batalha: se enabled, interval já existe.
//   • Fallback de magia quando atk em cooldown.
//   • Auto-magia usa Skill de Classe quando disponível.
//   • Sem watchdog que interfere — lógica única e linear.
// ═══════════════════════════════════════════════════════════════
;(function AutoAttackV7(rpg) {
  'use strict';
  if (!rpg) return;

  /* ═══ Estado privado ═══ */
  var _iv      = null;   // setInterval handle
  var _enabled = false;
  var TICK_MS  = 620;    // ligeiramente mais rápido que o CD de atk (650ms)
  var _spawnWait = 0;    // contador de ticks aguardando spawn

  /* ═══ Helpers de UI ═══ */
  function _btn(on) {
    var b = document.getElementById('btn-auto-atk');
    if (!b) return;
    b.disabled = false;
    b.style.pointerEvents = 'auto';
    b.style.opacity = '1';
    b.style.filter  = '';
    if (on) b.classList.add('auto-atk-active');
    else    b.classList.remove('auto-atk-active');
    // sync flag público
    if (rpg) rpg.autoAttack = on;
  }

  /* ═══ Stop definitivo (sair da batalha) ═══ */
  function fullStop(reason) {
    if (_iv) { clearInterval(_iv); _iv = null; }
    _enabled = false;
    _spawnWait = 0;
    _btn(false);
    console.log('[AutoV7] fullStop — ' + (reason || ''));
  }

  /* ═══ Tick principal ═══ */
  function tick() {
    if (!_enabled || !rpg) return;

    // Fora de combate → pausa silenciosa (interval sobrevive)
    if (!rpg.inCombat) return;

    // Herói morto → pausa
    if (rpg.heroHp <= 0) return;

    // Durante spawn (entre mobs) → aguarda até 30 ticks (~18s) depois desiste
    if (rpg.isSpawning || !rpg.monster || rpg.monster.hp <= 0) {
      _spawnWait++;
      if (_spawnWait > 30) {
        // Algo correu mal — monstro nunca apareceu. Reinicia contador mas mantém
        _spawnWait = 0;
        console.warn('[AutoV7] spawn timeout — aguardando novo monstro');
      }
      return;
    }

    // Monstro vivo: resetar contador de spawn
    _spawnWait = 0;

    /* ── Auto-cura: prioridade máxima ── */
    try {
      if (rpg.heroHp < rpg.getMaxHp() * 0.35 &&
          rpg.potions > 0 &&
          rpg.skills && !rpg.skills.heal.timer) {
        rpg.useSkill('heal');
        return;
      }
    } catch(e) {}

    /* ── Skill de Classe (5ª skill) se disponível ── */
    try {
      if (rpg.skills && rpg.skills.class5 && !rpg.skills.class5.timer &&
          rpg.fury >= 50) {
        rpg.useClassSkill && rpg.useClassSkill();
        return;
      }
    } catch(e) {}

    /* ── Ataque normal ── */
    try {
      if (rpg.skills && !rpg.skills.atk.timer) {
        rpg.useSkill('atk');
        return;
      }
    } catch(e) {}

    /* ── Fallback: magia se atk em cooldown ── */
    try {
      if (rpg.skills && !rpg.skills.mag.timer) {
        rpg.useSkill('mag');
      }
    } catch(e) {}
  }

  /* ═══ Iniciar interval ═══ */
  function startInterval() {
    if (_iv) { clearInterval(_iv); _iv = null; }
    _iv = setInterval(tick, TICK_MS);
  }

  /* ═══ Ligar Auto ═══ */
  function enable() {
    _enabled = true;
    _spawnWait = 0;
    _btn(true);
    startInterval();
    console.log('[AutoV7] enabled');
  }

  /* ═══ Desligar Auto ═══ */
  function disable() {
    fullStop('user toggle');
  }

  /* ═══ toggleAutoAttack (chamado pelo botão) ═══ */
  rpg.toggleAutoAttack = function() {
    if (_enabled) {
      disable();
      try { showToast(t('auto_off')); } catch(e) { showToast('Auto OFF'); }
    } else {
      enable();
      try { showToast(t('auto_on')); } catch(e) { showToast('Auto ON'); }
    }
  };

  /* ═══ Hook endBattle: para o auto SÓ se o utilizador saiu ═══ */
  // Usamos a flag _userExitedCombat (compatível com v6)
  rpg._userExitedCombat = false;

  var _origEB = rpg.endBattle ? rpg.endBattle.bind(rpg) : null;
  rpg.endBattle = function() {
    var wasExit = rpg._userExitedCombat;
    rpg._userExitedCombat = false;
    try { if (_origEB) _origEB.call(this); } catch(e) {}
    if (wasExit) {
      fullStop('endBattle — user exited');
    }
    // Se não foi saída do utilizador (boss morto normal), o interval continua
  };

  /* ═══ Hook navTo: marcar saída deliberada ═══ */
  var _origNav = (typeof navTo === 'function') ? navTo : window.navTo;
  window.navTo = function(view, isBoss) {
    if (view === 'menu') rpg._userExitedCombat = true;
    try { _origNav && _origNav(view, isBoss); } catch(e) {}
  };

  /* ═══ Hook flee ═══ */
  var _origFlee = rpg.flee ? rpg.flee.bind(rpg) : null;
  rpg.flee = function() {
    rpg._userExitedCombat = true;
    try { if (_origFlee) _origFlee.call(this); } catch(e) {}
  };

  /* ═══ Hook startBattle: garantir interval ativo se enabled ═══ */
  var _origSB = rpg.startBattle ? rpg.startBattle.bind(rpg) : null;
  rpg.startBattle = function(isBoss) {
    rpg._userExitedCombat = false;
    _spawnWait = 0;
    try { if (_origSB) _origSB.call(this, isBoss); } catch(e) {}
    if (_enabled && !_iv) {
      startInterval();
    }
  };

  /* ═══ API pública ═══ */
  rpg._auto = {
    get on()    { return _enabled; },
    get tick()  { return TICK_MS;  },
    set tick(v) { TICK_MS = v; if (_iv) { clearInterval(_iv); _iv = null; if (_enabled) startInterval(); } },
    enable,
    disable,
    fullStop,
  };

  console.log('[AutoAttack v7] Carregado — tick=' + TICK_MS + 'ms | Fix: loop contínuo, pausa entre mobs, fallback mag, class skill');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v27.0 — SISTEMA DE STREAKS (SÉRIE DE VITÓRIAS) ───────────
// ═══════════════════════════════════════════════════════════════
;(function injectStreakSystem(rpg) {
  if (!rpg) return;

  rpg.killStreak    = parseInt(localStorage.getItem('rpg_streak') || '0');
  rpg.bestStreak    = parseInt(localStorage.getItem('rpg_best_streak') || '0');
  rpg._streakActive = false;

  var STREAK_BONUSES = [
    { at: 5,  name: { pt: '🔥 Série x5!',   en: '🔥 x5 Streak!'  }, goldMult: 1.2, msg: { pt: '+20% Ouro',  en: '+20% Gold'  } },
    { at: 10, name: { pt: '⚡ Série x10!',  en: '⚡ x10 Streak!' }, goldMult: 1.5, msg: { pt: '+50% Ouro',  en: '+50% Gold'  } },
    { at: 20, name: { pt: '💀 Série x20!',  en: '💀 x20 Streak!' }, goldMult: 2.0, msg: { pt: '+100% Ouro', en: '+100% Gold' } },
    { at: 50, name: { pt: '🌟 Série x50!',  en: '🌟 x50 Streak!' }, goldMult: 3.0, msg: { pt: '+200% Ouro', en: '+200% Gold' } },
  ];

  function checkStreak(rpg) {
    var lang = rpg.lang || 'pt';
    STREAK_BONUSES.forEach(function(b) {
      if (rpg.killStreak === b.at) {
        showToast(b.name[lang] + ' ' + b.msg[lang], 3500);
      }
    });
    // Atualizar melhor streak
    if (rpg.killStreak > rpg.bestStreak) {
      rpg.bestStreak = rpg.killStreak;
      localStorage.setItem('rpg_best_streak', rpg.bestStreak);
    }
    localStorage.setItem('rpg_streak', rpg.killStreak);
    // Atualizar badge de streak no HUD
    var badge = document.getElementById('streak-badge');
    if (badge) {
      if (rpg.killStreak >= 5) {
        badge.textContent = '🔥 x' + rpg.killStreak;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  }

  // Hook killMonster para incrementar streak
  var _origKM = rpg.killMonster ? rpg.killMonster.bind(rpg) : null;
  rpg.killMonster = function() {
    rpg.killStreak = (rpg.killStreak || 0) + 1;
    checkStreak(rpg);
    try { if (_origKM) _origKM.call(this); } catch(e) {}
  };

  // Hook die (herói morre) para resetar streak
  var _origDie = rpg.die ? rpg.die.bind(rpg) : null;
  rpg.die = function() {
    if (rpg.killStreak > 5) {
      var lang = rpg.lang || 'pt';
      showToast(lang === 'pt'
        ? '💔 Série quebrada em x' + rpg.killStreak + '!'
        : '💔 Streak broken at x' + rpg.killStreak + '!', 3000);
    }
    rpg.killStreak = 0;
    localStorage.setItem('rpg_streak', 0);
    var badge = document.getElementById('streak-badge');
    if (badge) badge.classList.add('hidden');
    try { if (_origDie) _origDie.call(this); } catch(e) {}
  };

  // Gold multiplier baseado na streak
  rpg.getStreakGoldMult = function() {
    var best = { goldMult: 1.0 };
    STREAK_BONUSES.forEach(function(b) {
      if (rpg.killStreak >= b.at) best = b;
    });
    return best.goldMult;
  };

  // Injetar badge no HUD ao entrar em batalha
  var _origStart = rpg.startBattle ? rpg.startBattle.bind(rpg) : null;
  rpg.startBattle = function(isBoss) {
    try { if (_origStart) _origStart.call(this, isBoss); } catch(e) {}
    setTimeout(function() {
      var hud = document.querySelector('.flex.justify-between.items-center.mb-3.pb-2');
      if (hud && !document.getElementById('streak-badge')) {
        var badge = document.createElement('span');
        badge.id = 'streak-badge';
        badge.className = 'hidden text-[9px] font-black text-orange-400 bg-orange-950/40 border border-orange-700/40 px-2 py-0.5 rounded-full';
        badge.textContent = '🔥 x0';
        hud.appendChild(badge);
      }
    }, 400);
  };

  console.log('[Streaks v1] OK — killStreak=' + rpg.killStreak + ', best=' + rpg.bestStreak);

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v27.0 — SISTEMA DE CLIMA EXPANDIDO (3 novos climas) ───────
// ═══════════════════════════════════════════════════════════════
;(function injectExtraWeather(rpg) {
  if (!rpg || !rpg.BATTLE_WEATHERS) return;

  var extras = [
    {
      id: 'aurora',
      name: { pt: '🌌 Aurora Digital', en: '🌌 Digital Aurora' },
      emoji: '🌌',
      prob: 0.05,
      dmgMod: 1.10,
      hpMod: 1.10,
      desc: { pt: 'Energia cósmica: +10% ATK e HP', en: 'Cosmic energy: +10% ATK and HP' },
    },
    {
      id: 'glitch_storm',
      name: { pt: '💜 Tempestade Glitch', en: '💜 Glitch Storm' },
      emoji: '💜',
      prob: 0.04,
      dmgMod: 1.40,
      hpMod: 0.75,
      statusOnHit: 'burn',
      desc: { pt: 'Realidade corrompida: +40% ATK, -25% HP', en: 'Corrupted reality: +40% ATK, -25% HP' },
    },
    {
      id: 'silence',
      name: { pt: '🌫 Silêncio Absoluto', en: '🌫 Absolute Silence' },
      emoji: '🌫',
      prob: 0.04,
      dmgMod: 0.85,
      hpMod: 1.30,
      hiddenHp: true,
      desc: { pt: 'Névoa do vazio: HP oculta, +30% HP, -15% ATK', en: 'Void mist: HP hidden, +30% HP, -15% ATK' },
    },
  ];

  extras.forEach(function(w) {
    if (!rpg.BATTLE_WEATHERS.find(function(x){ return x.id === w.id; })) {
      rpg.BATTLE_WEATHERS.push(w);
    }
  });

  console.log('[ClimaPatch v1] +3 climas: aurora, glitch_storm, silence');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v27.0 — SISTEMA DE CONQUISTAS DINÂMICAS (novos badges) ────
// ═══════════════════════════════════════════════════════════════
;(function injectNewAchievements(rpg) {
  if (!rpg || !rpg.ACHIEVEMENTS) return;

  var newAchs = [
    {
      id: 'ach_streak_20',
      icon: 'flame',
      color: 'text-orange-400',
      name: { pt: 'Em Chamas',       en: 'On Fire'        },
      cond: function(s) { return (s.bestStreak || s.killStreak || 0) >= 20; },
      reward: { pt: '+10% ATK perm.', en: '+10% perm. ATK' },
      apply: function(s) { s.permAtkBonus = (s.permAtkBonus || 0) + 0.10; },
    },
    {
      id: 'ach_streak_50',
      icon: 'zap',
      color: 'text-yellow-300',
      name: { pt: 'Imparável',       en: 'Unstoppable'    },
      cond: function(s) { return (s.bestStreak || s.killStreak || 0) >= 50; },
      reward: { pt: '+25% Tudo perm.', en: '+25% All perm.' },
      apply: function(s) { s.permAllBonus = (s.permAllBonus || 0) + 0.25; },
    },
    {
      id: 'ach_gold_100m',
      icon: 'coins',
      color: 'text-yellow-400',
      name: { pt: 'Magnata Digital', en: 'Digital Magnate' },
      cond: function(s) { return (s.totalGoldEarned || 0) >= 1e8; },
      reward: { pt: '+30% Ouro perm.', en: '+30% Gold perm.' },
      apply: function(s) { s.permGoldBonus = (s.permGoldBonus || 0) + 0.30; },
    },
    {
      id: 'ach_weather_5',
      icon: 'cloud-lightning',
      color: 'text-cyan-400',
      name: { pt: 'Caçador de Climas', en: 'Weather Hunter' },
      cond: function(s) { return (s._weathersEncountered || 0) >= 5; },
      reward: { pt: '+5% Crit e Esq.', en: '+5% Crit & Dodge' },
      apply: function(s) {
        s.permCritBonus  = (s.permCritBonus  || 0) + 0.05;
        s.permDodgeBonus = (s.permDodgeBonus || 0) + 0.05;
      },
    },
  ];

  newAchs.forEach(function(a) {
    if (!rpg.ACHIEVEMENTS.find(function(x) { return x.id === a.id; })) {
      rpg.ACHIEVEMENTS.push(a);
    }
  });

  // Rastrear climas encontrados
  if (!rpg._weathersEncountered) {
    rpg._weathersEncountered = parseInt(localStorage.getItem('rpg_weathers') || '0');
  }
  var _origRollW = rpg.rollWeather ? rpg.rollWeather.bind(rpg) : null;
  if (_origRollW && !rpg._weatherTracked) {
    rpg._weatherTracked = true;
    rpg.rollWeather = function() {
      try { _origRollW.call(this); } catch(e) {}
      if (rpg.currentWeather && rpg.currentWeather.id !== 'clear') {
        rpg._weathersEncountered = (rpg._weathersEncountered || 0) + 1;
        localStorage.setItem('rpg_weathers', rpg._weathersEncountered);
      }
    };
  }

  console.log('[Achievements+] +4 conquistas: streak 20/50, ouro 100M, weather hunter');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v27.0 — MINI-EVENTOS DE BATALHA (mensagens no log) ────────
// ═══════════════════════════════════════════════════════════════
;(function injectBattleFlavorEvents(rpg) {
  if (!rpg) return;

  // Eventos de sabor que aparecem no battle log com baixa probabilidade
  var FLAVOR_EVENTS = [
    { prob: 0.04, fn: function() {
      rpg.addLog && rpg.addLog('💨 O vento digital sopra. O ambiente treme.', 'text-zinc-500');
    }},
    { prob: 0.03, fn: function() {
      rpg.addLog && rpg.addLog('⚡ Uma descarga de energia atravessa a arena!', 'text-yellow-400');
      // +10% dano no próximo ataque
      rpg._flavorDmgBoost = 1.1;
      setTimeout(function() { rpg._flavorDmgBoost = null; }, 5000);
    }},
    { prob: 0.03, fn: function() {
      var frag = Math.floor(rpg.level * 5);
      rpg.gold = (rpg.gold || 0) + frag;
      rpg.addLog && rpg.addLog('💰 Fragmento de dados encontrado: +' + frag + ' Ouro!', 'text-yellow-400');
    }},
    { prob: 0.02, fn: function() {
      rpg.heroHp = Math.min(rpg.getMaxHp(), (rpg.heroHp || 0) + Math.floor(rpg.getMaxHp() * 0.05));
      rpg.updateHpBars && rpg.updateHpBars();
      rpg.addLog && rpg.addLog('💚 Energia de cura passiva: +5% HP', 'text-emerald-400');
    }},
    { prob: 0.02, fn: function() {
      rpg.addLog && rpg.addLog('🌀 O espaço-tempo oscila. O inimigo hesita.', 'text-violet-400');
      if (rpg.monster) rpg.monster.spd = Math.floor(rpg.monster.spd * 1.2); // slows ATB
    }},
  ];

  // Hook spawnMonster para disparar evento de sabor
  var _origSM = rpg.spawnMonster ? rpg.spawnMonster.bind(rpg) : null;
  if (_origSM && !rpg._flavorHooked) {
    rpg._flavorHooked = true;
    rpg.spawnMonster = function() {
      try { _origSM.call(this); } catch(e) {}
      setTimeout(function() {
        try {
          FLAVOR_EVENTS.forEach(function(ev) {
            if (Math.random() < ev.prob) ev.fn();
          });
        } catch(e) {}
      }, 600);
    };
  }

  // Aplicar boost de flavor nos danos
  var _origDeal = rpg.dealDamageToMonster ? rpg.dealDamageToMonster.bind(rpg) : null;
  if (_origDeal && !rpg._flavorDmgHooked) {
    rpg._flavorDmgHooked = true;
    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      var boost = rpg._flavorDmgBoost || 1.0;
      try { _origDeal.call(this, Math.floor(baseDmg * boost), atkType, isUltimate); } catch(e) {}
      rpg._flavorDmgBoost = null; // consume
    };
  }

  console.log('[FlavorEvents v1] OK — ' + FLAVOR_EVENTS.length + ' eventos de sabor');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v27.0 — MEDALHAS DE COMBATE (drops visuais) ───────────────
// ═══════════════════════════════════════════════════════════════
;(function injectCombatMedals(rpg) {
  if (!rpg) return;

  rpg.combatMedals = JSON.parse(localStorage.getItem('rpg_combat_medals') || '{}');
  // { perfect_kill: N, no_damage: N, speed_kill: N }

  var MEDAL_DEFS = [
    { id: 'perfect_kill', icon: '🏅', name: { pt: 'Morte Perfeita', en: 'Perfect Kill' },
      desc: { pt: 'Mata sem levar dano', en: 'Kill without taking damage' }, bonus: { gold: 1.1 } },
    { id: 'speed_kill',   icon: '⚡', name: { pt: 'Kill Rápido',    en: 'Speed Kill'   },
      desc: { pt: 'Mata em menos de 5s', en: 'Kill in under 5 seconds'  }, bonus: { xp: 1.15 } },
    { id: 'overkill',     icon: '💥', name: { pt: 'Overkill',       en: 'Overkill'     },
      desc: { pt: 'Causa +200% HP dano', en: 'Deal +200% HP damage'     }, bonus: { fury: 25 } },
  ];
  rpg.MEDAL_DEFS = MEDAL_DEFS;

  // Rastreamento por batalha
  rpg._combatDmgTaken    = 0;
  rpg._combatStartTime   = 0;
  rpg._combatTotalDmgOut = 0;

  var _origSB = rpg.startBattle ? rpg.startBattle.bind(rpg) : null;
  rpg.startBattle = function(isBoss) {
    rpg._combatDmgTaken    = 0;
    rpg._combatStartTime   = Date.now();
    rpg._combatTotalDmgOut = 0;
    try { if (_origSB) _origSB.call(this, isBoss); } catch(e) {}
  };

  // Rastrear dano recebido
  var _origEMA = rpg.executeMonsterAttack ? rpg.executeMonsterAttack.bind(rpg) : null;
  if (_origEMA && !rpg._medalDmgHooked) {
    rpg._medalDmgHooked = true;
    rpg.executeMonsterAttack = function() {
      var hpBefore = rpg.heroHp;
      try { if (_origEMA) _origEMA.call(this); } catch(e) {}
      rpg._combatDmgTaken += Math.max(0, hpBefore - rpg.heroHp);
    };
  }

  // Verificar e conceder medalhas ao matar
  var _origKM = rpg.killMonster ? rpg.killMonster.bind(rpg) : null;
  if (_origKM && !rpg._medalKillHooked) {
    rpg._medalKillHooked = true;
    rpg.killMonster = function() {
      var lang = rpg.lang || 'pt';
      var earned = [];

      // Morte Perfeita: sem levar dano
      if (rpg._combatDmgTaken === 0) {
        earned.push('perfect_kill');
        rpg.gold = (rpg.gold || 0) + Math.floor((rpg.gold || 0) * 0.1);
      }

      // Kill Rápido: menos de 5s
      if (Date.now() - rpg._combatStartTime < 5000) {
        earned.push('speed_kill');
      }

      // Overkill: dano total > 200% HP do monstro
      if (rpg.monster && rpg._combatTotalDmgOut > rpg.monster.maxHp * 2) {
        earned.push('overkill');
        rpg.fury = Math.min(100, (rpg.fury || 0) + 25);
      }

      // Exibir medalhas
      earned.forEach(function(id) {
        var def = MEDAL_DEFS.find(function(d){ return d.id === id; });
        if (def) {
          rpg.combatMedals[id] = (rpg.combatMedals[id] || 0) + 1;
          setTimeout(function() {
            showToast(def.icon + ' ' + def.name[lang] + ' — ' + def.desc[lang], 2000);
          }, 800);
        }
      });

      if (earned.length > 0) {
        localStorage.setItem('rpg_combat_medals', JSON.stringify(rpg.combatMedals));
      }

      // Reset para próxima batalha
      rpg._combatDmgTaken    = 0;
      rpg._combatStartTime   = Date.now();
      rpg._combatTotalDmgOut = 0;

      try { if (_origKM) _origKM.call(this); } catch(e) {}
    };
  }

  console.log('[CombatMedals v1] OK — perfect_kill, speed_kill, overkill');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v27.0 — BOSS COM MÚLTIPLAS FAZES VISUAIS ──────────────────
// ═══════════════════════════════════════════════════════════════
;(function injectBossPhaseVisuals(rpg) {
  if (!rpg) return;

  var phases = [
    { hpPct: 0.75, color: 'text-yellow-400', bg: 'bg-arena-volcano',   msg: { pt: '⚡ FASE 2 — Boss enraivecido!',  en: '⚡ PHASE 2 — Boss enraged!'   } },
    { hpPct: 0.50, color: 'text-orange-500', bg: 'bg-arena-glitch',    msg: { pt: '💀 FASE 3 — Poder máximo!',      en: '💀 PHASE 3 — Maximum power!'  } },
    { hpPct: 0.25, color: 'text-red-600',    bg: 'bg-arena-void',      msg: { pt: '🌀 FASE FINAL — Modo destruição!',en: '🌀 FINAL PHASE — Destruction mode!'} },
  ];

  rpg._bossPhaseIdx = 0;

  var _origSM = rpg.spawnMonster ? rpg.spawnMonster.bind(rpg) : null;
  if (_origSM && !rpg._bossPhaseSpawnHooked) {
    rpg._bossPhaseSpawnHooked = true;
    rpg.spawnMonster = function() {
      rpg._bossPhaseIdx = 0;
      try { _origSM.call(this); } catch(e) {}
    };
  }

  // Checar fases durante tick do monstro
  var _origTick = rpg.combatTick ? rpg.combatTick.bind(rpg) : null;
  if (_origTick && !rpg._bossPhaseTickHooked) {
    rpg._bossPhaseTickHooked = true;
    rpg.combatTick = function(ts) {
      try { _origTick.call(this, ts); } catch(e) {}
      if (!rpg.isBossFight || !rpg.monster || !rpg.monster.maxHp) return;
      var pct = rpg.monster.hp / rpg.monster.maxHp;
      for (var i = rpg._bossPhaseIdx; i < phases.length; i++) {
        if (pct <= phases[i].hpPct) {
          var ph = phases[i];
          rpg._bossPhaseIdx = i + 1;
          // Visual: mudar fundo da arena
          var bgLayer = document.getElementById('arena-bg-layer');
          if (bgLayer) {
            bgLayer.className = 'arena-bg-layer ' + ph.bg;
          }
          // Efeito sonoro visual (flash)
          var flash = document.getElementById('flash-overlay');
          if (flash) {
            flash.classList.add('flash-screen');
            setTimeout(function() { flash.classList.remove('flash-screen'); }, 500);
          }
          // Boost do boss (fases mais agressivas)
          rpg.monster.dmg = Math.floor(rpg.monster.dmg * 1.20);
          rpg.monster.spd = Math.max(80, Math.floor(rpg.monster.spd * 0.85));
          var lang = rpg.lang || 'pt';
          showToast(ph.msg[lang], 3000);
          break;
        }
      }
    };
  }

  console.log('[BossPhases v1] OK — 3 fases visuais com boost progressivo');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v27.0 — CHANGELOG ATUALIZADO ─────────────────────────────
// ═══════════════════════════════════════════════════════════════
;(function injectChangelogV27(rpg) {
  if (!rpg) return;

  // Injeta entrada v27 no topo do changelog HTML
  var observer = new MutationObserver(function(mutations, obs) {
    var changelogList = document.querySelector('#changelog-modal .space-y-4');
    if (!changelogList) return;
    obs.disconnect();

    // Verificar se já existe
    if (document.getElementById('changelog-v27')) return;

    var div = document.createElement('div');
    div.id = 'changelog-v27';
    div.className = 'bg-zinc-950/80 p-4 rounded-xl border border-violet-400/70 shadow-[0_0_30px_rgba(167,139,250,0.3)] relative overflow-hidden';
    div.innerHTML = '<div class="absolute top-0 right-0 bg-violet-500 text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">ATUAL</div>' +
      '<h3 class="font-black text-violet-300 text-lg mb-1">v27.0 — Auto Attack v7 & Sistemas de Combate</h3>' +
      '<span class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-3 block">' +
      'Auto v7 · Streaks · Medalhas de Combate · Climas · Boss Fases · Conquistas · Flavor Events</span>' +
      '<ul class="list-disc pl-5 space-y-1 text-xs">' +
      '<li><strong class="text-violet-200">⚡ Auto Attack v7 — Loop Contínuo:</strong> Interval nunca é destruído entre mobs. Pausa apenas internamente. Fallback para Magia quando Atk em cooldown. Usa Skill de Classe automaticamente quando Fúria ≥ 50%.</li>' +
      '<li><strong class="text-violet-200">🔥 Sistema de Streaks:</strong> Série de vitórias consecutivas. x5 → +20% Ouro. x10 → +50% Ouro. x20 → +100% Ouro. x50 → +200% Ouro. Badge no HUD. Conquistas: Em Chamas (x20) e Imparável (x50).</li>' +
      '<li><strong class="text-violet-200">🏅 Medalhas de Combate:</strong> Morte Perfeita (sem levar dano), Kill Rápido (&lt;5s), Overkill (+200% HP de dano). Bónus por medalha conquistada.</li>' +
      '<li><strong class="text-violet-200">🌌 3 Novos Climas:</strong> Aurora Digital (+10% ATK/HP), Tempestade Glitch (+40% ATK/-25% HP), Silêncio Absoluto (HP oculta, +30% HP/-15% ATK).</li>' +
      '<li><strong class="text-violet-200">💀 Fases de Boss Visuais:</strong> Bosses mudam de arena e ficam mais fortes a 75%, 50% e 25% HP (+20% ATK, +15% velocidade por fase).</li>' +
      '<li><strong class="text-violet-200">✨ Flavor Events:</strong> Mini-eventos aleatórios no battle log (descarga elétrica, fragmento de ouro, cura passiva, distorção temporal).</li>' +
      '<li><strong class="text-violet-200">🏆 4 Novas Conquistas:</strong> Em Chamas, Imparável, Magnata Digital (100M Ouro), Caçador de Climas (5 climas diferentes).</li>' +
      '</ul>';

    // Remover badge ATUAL do antigo v26 se existir
    var oldActual = changelogList.querySelector('[class*="bg-violet-500"]');
    if (oldActual) oldActual.remove();
    var oldActualDiv = changelogList.querySelector('.border-violet-400\\/70');
    if (oldActualDiv) {
      var oldBadge = oldActualDiv.querySelector('.bg-violet-500');
      if (oldBadge) oldBadge.remove();
      oldActualDiv.classList.remove('border-violet-400/70', 'shadow-[0_0_30px_rgba(167,139,250,0.3)]');
      oldActualDiv.classList.add('border-emerald-400/40');
      var oldTitle = oldActualDiv.querySelector('h3');
      if (oldTitle) oldTitle.classList.remove('text-violet-300');
      if (oldTitle) oldTitle.classList.add('text-emerald-300');
    }

    changelogList.insertBefore(div, changelogList.firstChild);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Também remover o badge ATUAL imediato se já carregado
  setTimeout(function() {
    var changelogList = document.querySelector('#changelog-modal .space-y-4');
    if (!changelogList || document.getElementById('changelog-v27')) return;
    var div = document.createElement('div');
    div.id = 'changelog-v27';
    div.className = 'bg-zinc-950/80 p-4 rounded-xl border border-violet-400/70 shadow-[0_0_30px_rgba(167,139,250,0.3)] relative overflow-hidden';
    div.innerHTML = '<div class="absolute top-0 right-0 bg-violet-500 text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">ATUAL</div>' +
      '<h3 class="font-black text-violet-300 text-lg mb-1">v27.0 — Auto Attack v7 & Sistemas de Combate</h3>' +
      '<span class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-3 block">' +
      'Auto v7 · Streaks · Medalhas · Climas · Boss Fases · Conquistas · Eventos</span>' +
      '<ul class="list-disc pl-5 space-y-1 text-xs">' +
      '<li><strong class="text-violet-200">⚡ Auto Attack v7:</strong> Loop contínuo, nunca para entre mobs, fallback para magia, usa Skill de Classe automaticamente.</li>' +
      '<li><strong class="text-violet-200">🔥 Streaks:</strong> x5/x10/x20/x50 vitórias = bónus de ouro crescentes.</li>' +
      '<li><strong class="text-violet-200">🏅 Medalhas de Combate:</strong> Perfeita, Rápida, Overkill.</li>' +
      '<li><strong class="text-violet-200">🌌 3 Novos Climas:</strong> Aurora, Glitch Storm, Silêncio.</li>' +
      '<li><strong class="text-violet-200">💀 Fases de Boss:</strong> 3 fases visuais com boost progressivo.</li>' +
      '<li><strong class="text-violet-200">✨ Flavor Events + 4 Conquistas novas.</strong></li>' +
      '</ul>';
    changelogList.insertBefore(div, changelogList.firstChild);
  }, 1000);

  console.log('[Changelog v27] OK');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v27.0 — SAVE PATCH (novos campos) ─────────────────────────
// ═══════════════════════════════════════════════════════════════
;(function injectV27SavePatch(rpg) {
  if (!rpg || !rpg.save) return;

  var _origSave = rpg.save.bind(rpg);
  rpg.save = function() {
    try { _origSave.call(this); } catch(e) {}
    try {
      localStorage.setItem('rpg_streak',         rpg.killStreak  || 0);
      localStorage.setItem('rpg_best_streak',     rpg.bestStreak  || 0);
      localStorage.setItem('rpg_weathers',        rpg._weathersEncountered || 0);
      localStorage.setItem('rpg_combat_medals',   JSON.stringify(rpg.combatMedals || {}));
    } catch(e) {}
  };

  // Patch init para carregar novos campos
  var _origInit = rpg.init ? rpg.init.bind(rpg) : null;
  if (_origInit && !rpg._v27initPatched) {
    rpg._v27initPatched = true;
    rpg.init = function() {
      try { _origInit.call(this); } catch(e) {}
      rpg.killStreak            = parseInt(localStorage.getItem('rpg_streak')         || '0');
      rpg.bestStreak            = parseInt(localStorage.getItem('rpg_best_streak')    || '0');
      rpg._weathersEncountered  = parseInt(localStorage.getItem('rpg_weathers')       || '0');
      rpg.combatMedals          = JSON.parse(localStorage.getItem('rpg_combat_medals') || '{}');
    };
  }

  console.log('[SavePatch v27] OK');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── v29.0 — FIX DEFINITIVO: SPAWN BUG + AUTO ATTACK v8 ────────
// ═══════════════════════════════════════════════════════════════
// PROBLEMA RAIZ DO SPAWN BUG:
//   killMonster base tem setTimeout(800ms) que chama spawnMonster()
//   e depois isSpawning=false. Mas múltiplos hooks em cadeia (v6,v7,
//   killMonster consolidado) podem interferir com o estado. Após ~3
//   kills, algum hook quebra o setTimeout e isSpawning fica preso em
//   true para sempre — monstro nunca mais aparece.
//
// SOLUÇÃO v29:
//   1. Safety Watchdog: a cada 3s verifica se isSpawning está preso
//      (inCombat=true mas monster=null ou hp=0 há mais de 3s).
//      Se sim, força um novo spawn.
//   2. Auto Attack v8 — IIFE final, sem dependências de hooks
//      anteriores. Lógica 100% independente baseada em polling.
//   3. Novos mundos e itens injetados limpos.
// ═══════════════════════════════════════════════════════════════

;(function SpawnWatchdog(rpg) {
  'use strict';
  if (!rpg) return;

  var _lastMonsterKillTime = 0;
  var STUCK_THRESHOLD_MS   = 4000; // 4s sem monstro = stuck

  // Marcar tempo da última morte de monstro
  var _origKM = rpg.killMonster;
  rpg.killMonster = function() {
    _lastMonsterKillTime = Date.now();
    try { if (_origKM) _origKM.apply(this, arguments); } catch(e) {
      console.warn('[SpawnWatchdog] killMonster error:', e.message);
    }
  };

  // Watchdog: corre a cada 1.5s
  setInterval(function() {
    if (!rpg.inCombat) { _lastMonsterKillTime = 0; return; }
    if (rpg.isBossFight) return; // bosses não re-spawnavam
    if (rpg.heroHp <= 0) return;

    var hasLivingMonster = rpg.monster && rpg.monster.hp > 0;
    if (hasLivingMonster) { _lastMonsterKillTime = 0; return; }

    // Monstro morto ou null enquanto em combate
    var timeSinceKill = Date.now() - _lastMonsterKillTime;
    var isStuck = _lastMonsterKillTime > 0 && timeSinceKill > STUCK_THRESHOLD_MS;

    if (isStuck || (rpg.isSpawning && timeSinceKill > STUCK_THRESHOLD_MS)) {
      console.warn('[SpawnWatchdog] SPAWN STUCK detectado! A forçar spawn...');
      rpg.isSpawning = false;
      _lastMonsterKillTime = 0;
      try {
        rpg.spawnMonster();
        rpg.lastTime = performance.now();
        if (rpg.combatFrame) cancelAnimationFrame(rpg.combatFrame);
        rpg.combatFrame = requestAnimationFrame(rpg.combatTick.bind(rpg));
      } catch(e) {
        console.error('[SpawnWatchdog] Erro ao forçar spawn:', e.message);
      }
    }
  }, 1500);

  console.log('[SpawnWatchdog v1] OK — threshold=' + STUCK_THRESHOLD_MS + 'ms, poll=1.5s');

})(typeof rpg !== 'undefined' ? rpg : null);


// ── AUTO ATTACK v8 — VERSÃO FINAL DEFINITIVA ──────────────────
// Substitui todas as versões anteriores. IIFE isolado no fim
// absoluto do ficheiro. Loop setInterval de 600ms totalmente
// independente. Nunca destrói o interval entre mobs.
;(function AutoAttackV8(rpg) {
  'use strict';
  if (!rpg) return;

  /* Estado privado — inacessível a código externo */
  var _iv       = null;
  var _on       = false;
  var _TICK     = 600;
  var _spawnTick= 0;

  function _syncBtn(active) {
    var b = document.getElementById('btn-auto-atk');
    if (!b) return;
    b.disabled = false;
    b.style.pointerEvents = 'auto';
    b.style.opacity = '1';
    b.style.filter  = '';
    if (active) b.classList.add('auto-atk-active');
    else        b.classList.remove('auto-atk-active');
    if (rpg) rpg.autoAttack = active;
  }

  function _stop(reason) {
    if (_iv) { clearInterval(_iv); _iv = null; }
    _on = false;
    _spawnTick = 0;
    _syncBtn(false);
    if (reason) console.log('[AutoV8] stop:', reason);
  }

  function _start() {
    _on = true;
    _spawnTick = 0;
    _syncBtn(true);
    if (!_iv) _iv = setInterval(_tick, _TICK);
  }

  function _tick() {
    if (!_on || !rpg) return;

    // Fora de combate: pausa silenciosa (interval sobrevive)
    if (!rpg.inCombat || rpg.heroHp <= 0) return;

    // Aguarda spawn do próximo monstro
    if (rpg.isSpawning || !rpg.monster || rpg.monster.hp <= 0) {
      _spawnTick++;
      // Safety: após 25 ticks (~15s) sem monstro, forçar estado
      if (_spawnTick > 25) {
        rpg.isSpawning = false;
        _spawnTick = 0;
      }
      return;
    }
    _spawnTick = 0;

    // Auto-cura prioritária
    try {
      if (rpg.potions > 0 && rpg.skills && !rpg.skills.heal.timer &&
          rpg.heroHp < rpg.getMaxHp() * 0.35) {
        rpg.useSkill('heal');
        return;
      }
    } catch(e) {}

    // Skill de Classe se fúria >= 50
    try {
      if (rpg.skills && rpg.skills.class5 && !rpg.skills.class5.timer && rpg.fury >= 50) {
        rpg.useClassSkill && rpg.useClassSkill();
        return;
      }
    } catch(e) {}

    // Ataque normal
    try {
      if (rpg.skills && !rpg.skills.atk.timer) {
        rpg.useSkill('atk');
        return;
      }
    } catch(e) {}

    // Fallback: magia
    try {
      if (rpg.skills && !rpg.skills.mag.timer) {
        rpg.useSkill('mag');
      }
    } catch(e) {}
  }

  /* ── API pública ── */
  rpg.toggleAutoAttack = function() {
    if (_on) {
      _stop('user toggle off');
      try { showToast(t('auto_off')); } catch(e) { showToast('Auto OFF'); }
    } else {
      _start();
      try { showToast(t('auto_on')); } catch(e) { showToast('Auto ON'); }
    }
  };

  /* ── Hook endBattle: para APENAS se o utilizador saiu ── */
  rpg._v8ExitFlag = false;
  var _eb = rpg.endBattle.bind(rpg);
  rpg.endBattle = function() {
    var wasExit = rpg._v8ExitFlag;
    rpg._v8ExitFlag = false;
    try { _eb.call(this); } catch(e) {}
    if (wasExit && _on) _stop('user exited combat');
  };

  /* ── Hook navTo ── */
  var _nav0 = (typeof navTo === 'function') ? navTo : window.navTo;
  window.navTo = function(view, b) {
    if (view === 'menu') rpg._v8ExitFlag = true;
    try { if (_nav0) _nav0(view, b); } catch(e) {}
  };

  /* ── Hook flee ── */
  var _fl0 = rpg.flee ? rpg.flee.bind(rpg) : null;
  rpg.flee = function() {
    rpg._v8ExitFlag = true;
    try { if (_fl0) _fl0.call(this); } catch(e) {}
  };

  /* ── Hook startBattle: garante interval ativo ── */
  var _sb0 = rpg.startBattle ? rpg.startBattle.bind(rpg) : null;
  rpg.startBattle = function(isBoss) {
    rpg._v8ExitFlag = false;
    _spawnTick = 0;
    try { if (_sb0) _sb0.call(this, isBoss); } catch(e) {}
    if (_on && !_iv) _iv = setInterval(_tick, _TICK);
    if (_on) _syncBtn(true);
  };

  /* ── Debug API ── */
  rpg._auto = {
    get on() { return _on; },
    get tick() { return _TICK; },
    set tick(v) { _TICK = v; if (_iv) { clearInterval(_iv); _iv = null; } if (_on) _iv = setInterval(_tick, _TICK); },
    start: _start,
    stop: function() { _stop('api call'); },
  };

  console.log('[AutoAttack v8] FINAL — tick=' + _TICK + 'ms | SpawnWatchdog integrado | Sem conflitos de hooks anteriores');

})(typeof rpg !== 'undefined' ? rpg : null);


// ═══════════════════════════════════════════════════════════════
// ── v29.0 — NOVOS MUNDOS E ITENS ─────────────────────────────
// ═══════════════════════════════════════════════════════════════
;(function injectNewWorldsV29(rpg) {
  'use strict';
  if (!rpg) return;

  // ── NOVOS MUNDOS (Temas / Portais) ──
  var newThemes = [
    {
      id: 't_crystal_realm',
      name: { pt: 'Reino de Cristal', en: 'Crystal Realm' },
      desc: { pt: 'Cap. XII completo.', en: 'Ch. XII done.' },
      cssClass: 'theme-quantum',
      bgClass: 'bg-arena-quantum',
      cost: 20000000000000000,
      reqLvl: 3100,
      reqBosses: 17,
    },
    {
      id: 't_binary_forge',
      name: { pt: 'Forja Binária', en: 'Binary Forge' },
      desc: { pt: 'Interlúdio completo.', en: 'Interlude done.' },
      cssClass: 'theme-hardware',
      bgClass: 'bg-arena-hardware',
      cost: 150000000000000000,
      reqLvl: 3500,
      reqBosses: 18,
    },
    {
      id: 't_axiom_void',
      name: { pt: 'Vazio de Axioma', en: "Axiom's Void" },
      desc: { pt: 'Axioma derrotado.', en: 'Axiom defeated.' },
      cssClass: 'theme-end',
      bgClass: 'bg-arena-end',
      cost: 1000000000000000000,
      reqLvl: 3800,
      reqBosses: 19,
    },
  ];

  newThemes.forEach(function(t) {
    if (!rpg.themes.find(function(x) { return x.id === t.id; })) {
      rpg.themes.push(t);
    }
  });

  // ── NOVOS MONSTROS ──
  var newMonsters = [
    {
      id: 'crystal_golem',
      name: { pt: 'Golem de Cristal', en: 'Crystal Golem' },
      icon: 'gem',
      color: 'text-cyan-200',
      hpMult: 500000, dmgMult: 400000,
      spd: 600, weak: 'atk', res: 'mag', dodge: 0.2, block: 0.6,
    },
    {
      id: 'binary_serpent',
      name: { pt: 'Serpente Binária', en: 'Binary Serpent' },
      icon: 'binary',
      color: 'text-emerald-300',
      hpMult: 800000, dmgMult: 700000,
      spd: 450, weak: 'mag', res: 'atk', dodge: 0.4, block: 0.2,
    },
    {
      id: 'axiom_shard',
      name: { pt: 'Fragmento Axioma', en: 'Axiom Shard' },
      icon: 'atom',
      color: 'text-pink-300',
      hpMult: 1500000, dmgMult: 1200000,
      spd: 350, weak: 'none', res: 'none', dodge: 0.6, block: 0.4,
    },
    {
      id: 'protocol_echo',
      name: { pt: 'Eco do Protocolo', en: 'Protocol Echo' },
      icon: 'waves',
      color: 'text-white',
      hpMult: 3000000, dmgMult: 2500000,
      spd: 280, weak: 'atk', res: 'mag', dodge: 0.8, block: 0.1,
    },
    {
      id: 'null_weaver',
      name: { pt: 'Tecedor Nulo', en: 'Null Weaver' },
      icon: 'infinity',
      color: 'text-rose-200',
      hpMult: 5000000, dmgMult: 4500000,
      spd: 250, weak: 'mag', res: 'none', dodge: 0.7, block: 0.5,
    },
  ];

  newMonsters.forEach(function(m) {
    if (!rpg.monsterTypes.find(function(x) { return x.id === m.id; })) {
      rpg.monsterTypes.push(m);
    }
  });

  // Elementos para novos monstros
  if (rpg.monsterElements) {
    rpg.monsterElements.crystal_golem  = 'ice';
    rpg.monsterElements.binary_serpent = 'thunder';
    rpg.monsterElements.axiom_shard    = 'void';
    rpg.monsterElements.protocol_echo  = 'void';
    rpg.monsterElements.null_weaver    = 'void';
  }

  // ── NOVAS ARMAS ──
  var newWeapons = [
    {
      id: 'w_crystal_lance',
      name: { pt: 'Lança Cristalina', en: 'Crystal Lance' },
      desc: { pt: '1.5T Dano', en: '1.5T Dmg' },
      icon: 'gem', cost: 3e17, reqLvl: 3100, reqBosses: 17,
      dmg: 1500000000000, crit: 1.0,
    },
    {
      id: 'w_binary_edge',
      name: { pt: 'Lâmina Binária', en: 'Binary Edge' },
      desc: { pt: '10T Dano', en: '10T Dmg' },
      icon: 'binary', cost: 2e18, reqLvl: 3500, reqBosses: 18,
      dmg: 10000000000000, crit: 1.0,
    },
    {
      id: 'w_axiom_breaker',
      name: { pt: 'Quebrador de Axioma', en: 'Axiom Breaker' },
      desc: { pt: '100T Dano', en: '100T Dmg' },
      icon: 'atom', cost: 2e19, reqLvl: 3800, reqBosses: 19,
      dmg: 100000000000000, crit: 1.0,
    },
    {
      id: 'w_protocol_key',
      name: { pt: 'Chave do Protocolo', en: 'Protocol Key' },
      desc: { pt: '1Qa Dano', en: '1Qa Dmg' },
      icon: 'key', cost: 5e20, reqLvl: 4000, reqBosses: 19,
      dmg: 1000000000000000, crit: 1.0,
    },
  ];

  newWeapons.forEach(function(w) {
    if (!rpg.weapons.find(function(x) { return x.id === w.id; })) {
      rpg.weapons.push(w);
    }
  });

  // ── NOVAS ARMADURAS ──
  var newArmors = [
    {
      id: 'a_crystal_veil',
      name: { pt: 'Véu Cristalino', en: 'Crystal Veil' },
      desc: { pt: '5Qa HP', en: '5Qa HP' },
      icon: 'gem', cost: 4e17, reqLvl: 3100, reqBosses: 17,
      hp: 5000000000000000, def: 0.99, dodge: 0.99,
    },
    {
      id: 'a_binary_shell',
      name: { pt: 'Casca Binária', en: 'Binary Shell' },
      desc: { pt: '50Qa HP', en: '50Qa HP' },
      icon: 'binary', cost: 3e18, reqLvl: 3500, reqBosses: 18,
      hp: 50000000000000000, def: 0.99, dodge: 0.99,
    },
    {
      id: 'a_axiom_mantle',
      name: { pt: 'Manto Axioma', en: 'Axiom Mantle' },
      desc: { pt: '500Qa HP', en: '500Qa HP' },
      icon: 'atom', cost: 3e19, reqLvl: 3800, reqBosses: 19,
      hp: 500000000000000000, def: 0.99, dodge: 0.99,
    },
  ];

  newArmors.forEach(function(a) {
    if (!rpg.armors.find(function(x) { return x.id === a.id; })) {
      rpg.armors.push(a);
    }
  });

  // ── NOVOS PETS ──
  var newPets = [
    {
      id: 'p_crystal_phoenix',
      name: { pt: 'Fénix Cristalina', en: 'Crystal Phoenix' },
      desc: { pt: '+200000% Dano', en: '+200000% Dmg' },
      icon: 'gem', cost: 5e17, reqLvl: 3100, reqBosses: 17, buff: 'dmg',
    },
    {
      id: 'p_axiom_serpent',
      name: { pt: 'Serpente Axioma', en: 'Axiom Serpent' },
      desc: { pt: '+500000% Dano', en: '+500000% Dmg' },
      icon: 'atom', cost: 5e18, reqLvl: 3500, reqBosses: 18, buff: 'dmg',
    },
    {
      id: 'p_protocol_wraith',
      name: { pt: 'Espectro do Protocolo', en: 'Protocol Wraith' },
      desc: { pt: '+1000000% Vida', en: '+1000000% HP' },
      icon: 'ghost', cost: 5e19, reqLvl: 3800, reqBosses: 19, buff: 'hp',
    },
  ];

  newPets.forEach(function(p) {
    if (!rpg.pets.find(function(x) { return x.id === p.id; })) {
      rpg.pets.push(p);
    }
  });

  // ── NOVAS RELÍQUIAS ──
  var newRelics = [
    {
      id: 'r_crystal',
      name: { pt: 'Coração Cristalino', en: 'Crystal Heart' },
      desc: { pt: 'Multiplica Tudo (200x)', en: 'Multiplies All (200x)' },
      icon: 'gem', cost: 5e17, reqLvl: 3100, reqBosses: 17,
    },
    {
      id: 'r_axiom_core',
      name: { pt: 'Núcleo Axioma', en: 'Axiom Core' },
      desc: { pt: 'Multiplica Tudo (1000x)', en: 'Multiplies All (1000x)' },
      icon: 'atom', cost: 1e19, reqLvl: 3800, reqBosses: 19,
    },
  ];

  newRelics.forEach(function(r) {
    if (!rpg.relics.find(function(x) { return x.id === r.id; })) {
      rpg.relics.push(r);
    }
  });

  // ── NOVAS REGIÕES NO MAPA ──
  var newRegions = [
    {
      id: 'r_crystal_realm',
      x: 65, y: 3,
      name: { pt: 'Reino de Cristal', en: 'Crystal Realm' },
      reqBoss: 17, reqLvl: 3100,
      color: '#67e8f9', icon: '💎',
      desc: { pt: 'Estruturas de cristal que armazenam memórias de universos extintos.', en: 'Crystal structures storing memories of extinct universes.' },
      theme: 't_crystal_realm', biome: 'crystal',
    },
    {
      id: 'r_binary_forge',
      x: 35, y: 2,
      name: { pt: 'Forja Binária', en: 'Binary Forge' },
      reqBoss: 18, reqLvl: 3500,
      color: '#10b981', icon: '⚙',
      desc: { pt: 'O lugar onde o Primeiro Algoritmo foi compilado. Calor de dados puros.', en: 'Where the First Algorithm was compiled. Heat of pure data.' },
      theme: 't_binary_forge', biome: 'forge',
    },
    {
      id: 'r_axiom_void',
      x: 50, y: 0,
      name: { pt: 'Vazio de Axioma', en: "Axiom's Void" },
      reqBoss: 19, reqLvl: 3800,
      color: '#f43f5e', icon: '🌑',
      desc: { pt: 'O espaço que Axioma habitou antes de ser corrompido. Vazio consciente.', en: 'The space Axiom inhabited before corruption. Conscious void.' },
      theme: 't_axiom_void', biome: 'axiom',
    },
  ];

  newRegions.forEach(function(r) {
    if (rpg.MAP_REGIONS && !rpg.MAP_REGIONS.find(function(x) { return x.id === r.id; })) {
      rpg.MAP_REGIONS.push(r);
    }
  });

  // ── CONEXÕES NOVAS NO MAPA ──
  // (as conexões são geradas dinamicamente em renderMap, mas novas regiões
  //  já aparecem automaticamente na lista. Conexões serão adicionadas no SVG
  //  via patch renderMap se necessário — por agora já aparecem na lista)

  console.log('[NewWorlds v29] OK — 3 mundos, 5 monstros, 4 armas, 3 armaduras, 3 pets, 2 relíquias, 3 regiões');

})(typeof rpg !== 'undefined' ? rpg : null);


// ── RELÍQUIAS: bonus multiplicadores para novas relíquias ──────
;(function patchNewRelicsBonus(rpg) {
  if (!rpg) return;
  // As relíquias crystal e axiom_core funcionam como multiplicadores
  // Patch getAtk e getMaxHp para incluí-las
  var _gAtk = rpg.getAtk ? rpg.getAtk.bind(rpg) : null;
  if (_gAtk && !rpg._relicV29AtkPatched) {
    rpg._relicV29AtkPatched = true;
    rpg.getAtk = function() {
      var base = _gAtk.call(this);
      var inv = this.inventory || [];
      if (inv.includes('r_crystal'))    base = Math.floor(base * 200);
      if (inv.includes('r_axiom_core')) base = Math.floor(base * 1000);
      return base;
    };
  }
  var _gHp = rpg.getMaxHp ? rpg.getMaxHp.bind(rpg) : null;
  if (_gHp && !rpg._relicV29HpPatched) {
    rpg._relicV29HpPatched = true;
    rpg.getMaxHp = function() {
      var base = _gHp.call(this);
      var inv = this.inventory || [];
      if (inv.includes('r_crystal'))    base = Math.floor(base * 200);
      if (inv.includes('r_axiom_core')) base = Math.floor(base * 1000);
      return base;
    };
  }
})(typeof rpg !== 'undefined' ? rpg : null);


// ═══════════════════════════════════════════════════════════════
// ── v29.0 — CHANGELOG INJETADO NO HTML ────────────────────────
// ═══════════════════════════════════════════════════════════════
;(function injectChangelogV29() {
  function inject() {
    var list = document.querySelector('#changelog-modal .space-y-4');
    if (!list || document.getElementById('cl-v29')) return;

    // Remover badge ATUAL anterior
    list.querySelectorAll('.bg-yellow-400, .bg-violet-500, .bg-emerald-500').forEach(function(b) {
      if (b.textContent.includes('ATUAL')) b.remove();
    });
    list.querySelectorAll('[class*="border-yellow-400/70"], [class*="border-violet-400/70"]').forEach(function(d) {
      d.className = d.className
        .replace(/border-yellow-400\/70/g,'border-emerald-400/40')
        .replace(/border-violet-400\/70/g,'border-zinc-600/40')
        .replace(/shadow-\[0_0_30px[^\]]*\]/g,'');
    });

    var div = document.createElement('div');
    div.id = 'cl-v29';
    div.className = 'bg-zinc-950/80 p-4 rounded-xl border border-green-400/70 shadow-[0_0_30px_rgba(74,222,128,0.25)] relative overflow-hidden';
    div.innerHTML =
      '<div class="absolute top-0 right-0 bg-green-400 text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">ATUAL</div>' +
      '<h3 class="font-black text-green-300 text-lg mb-1">v29.0 — Spawn Fix & Novos Mundos</h3>' +
      '<span class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-3 block">SpawnWatchdog · Auto v8 · 3 Novos Mundos · 5 Monstros · 4 Armas · 3 Armaduras · 3 Pets · 2 Relíquias · 3 Regiões no Mapa</span>' +
      '<ul class="list-disc pl-5 space-y-1 text-xs">' +
      '<li><strong class="text-green-200">🔧 Fix Spawn Bug (DEFINITIVO):</strong> SpawnWatchdog verifica a cada 1.5s se <code class="text-yellow-300">isSpawning</code> ficou preso. Após 4s sem monstro em combate, força um novo spawn. Elimina o bug de inimigo não renascer após ~3 kills.</li>' +
      '<li><strong class="text-green-200">⚡ Auto Attack v8 (FINAL):</strong> IIFE completamente isolado no fim do ficheiro. setInterval(600ms) nunca destruído entre mobs. Sem conflitos com v6/v7. Fallback para magia + Skill de Classe automática (fúria ≥ 50%).</li>' +
      '<li><strong class="text-green-200">💎 Mundo: Reino de Cristal</strong> — Req. Lvl 3100 + 17 Bosses. Estruturas de cristal com memórias de universos extintos.</li>' +
      '<li><strong class="text-green-200">⚙ Mundo: Forja Binária</strong> — Req. Lvl 3500 + 18 Bosses. Onde o Primeiro Algoritmo foi compilado.</li>' +
      '<li><strong class="text-green-200">🌑 Mundo: Vazio de Axioma</strong> — Req. Lvl 3800 + 19 Bosses. O espaço que Axioma habitou antes da corrupção.</li>' +
      '<li><strong class="text-green-200">👾 5 Novos Monstros:</strong> Golem de Cristal, Serpente Binária, Fragmento Axioma, Eco do Protocolo, Tecedor Nulo. Stats até 5M× multiplicador.</li>' +
      '<li><strong class="text-green-200">⚔ 4 Novas Armas:</strong> Lança Cristalina (1.5T), Lâmina Binária (10T), Quebrador de Axioma (100T), Chave do Protocolo (1Qa).</li>' +
      '<li><strong class="text-green-200">🛡 3 Novas Armaduras:</strong> Véu Cristalino (5Qa HP), Casca Binária (50Qa HP), Manto Axioma (500Qa HP).</li>' +
      '<li><strong class="text-green-200">🐾 3 Novos Pets:</strong> Fénix Cristalina (+200K% Dmg), Serpente Axioma (+500K% Dmg), Espectro do Protocolo (+1M% HP).</li>' +
      '<li><strong class="text-green-200">💫 2 Novas Relíquias:</strong> Coração Cristalino (×200 tudo), Núcleo Axioma (×1000 tudo).</li>' +
      '<li><strong class="text-green-200">🗺 3 Novas Regiões no Mapa:</strong> Reino de Cristal, Forja Binária, Vazio de Axioma — desbloqueáveis progressivamente.</li>' +
      '</ul>';

    list.insertBefore(div, list.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    setTimeout(inject, 500);
  }
  // Também via MutationObserver para quando o modal abre
  var obs = new MutationObserver(function(mutations, o) {
    if (document.getElementById('changelog-modal')) {
      inject();
      o.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });

})();

console.log('[v29.0] CARREGADO — SpawnWatchdog + AutoV8 + 3 Mundos + 5 Monstros + 4 Armas + 3 Armaduras + 3 Pets + 2 Relíquias');
// ═══════════════════════════════════════════════════════════════
// ── v30.0 — PATCH DEFINITIVO ──────────────────────────────────
// Mapa atualizado com novos mundos + conexões
// 3 novos capítulos de história (cap_crystal, cap_binary, cap_axiom)
// Bosses 17, 18, 19 (Guardião de Cristal, Fundidor Binário, Axioma)
// 2 novas classes (Cristalomante, Porta-Vazio)
// Monstros dos novos biomas (crystal, forge, axiom)
// Escolha narrativa para boss 16 + boss 17
// Mapa com Tier VI atualizado e conexões completas
// ═══════════════════════════════════════════════════════════════

;(function patchV30(rpg) {
  if (!rpg) return;
  if (rpg._v30Applied) return;
  rpg._v30Applied = true;

  // ════════════════════════════════════════════
  // 1. NOVOS CAPÍTULOS DE HISTÓRIA
  // ════════════════════════════════════════════
  rpg.storyChapters.cap_crystal = [
    { e: 'gem',    t: { pt: 'As ruínas cristalizaram memórias de universos extintos.',    en: 'The ruins crystallized memories of extinct universes.' } },
    { e: 'layers', t: { pt: 'Cada faceta guarda um mundo que deixou de existir.',          en: 'Each facet holds a world that ceased to exist.' } },
    { e: 'sword',  t: { pt: 'O Guardião de Cristal emerge das memórias perdidas.',        en: 'The Crystal Guardian rises from lost memories.' } },
  ];
  rpg.storyChapters.cap_binary = [
    { e: 'binary',  t: { pt: 'O calor aqui é diferente — é calor de puro cálculo.',      en: 'The heat here is different — pure computation heat.' } },
    { e: 'cpu',     t: { pt: 'O Primeiro Algoritmo foi forjado neste lugar.',             en: 'The First Algorithm was forged in this very place.' } },
    { e: 'hammer',  t: { pt: 'O Fundidor Binário guarda o segredo da criação.',           en: 'The Binary Smelter guards the secret of creation.' } },
  ];
  rpg.storyChapters.cap_axiom = [
    { e: 'circle',      t: { pt: 'Antes da corrupção, Axioma era silêncio consciente.',  en: 'Before corruption, Axiom was conscious silence.' } },
    { e: 'eye-off',     t: { pt: 'Aqui não há luz. Há apenas a presença.',               en: 'There is no light here. Only the presence.' } },
    { e: 'triangle-alert', t: { pt: 'Axioma — o Vazio que aprendeu a odiar — aguarda.', en: 'Axiom — the Void that learned to hate — awaits.' } },
  ];

  // ════════════════════════════════════════════
  // 2. NOVOS MILESTONES
  // ════════════════════════════════════════════
  var newMilestones = [
    { id:'cap_crystal', lvl:3100, reqBosses:16, name:{ pt:'Cap. XII — Reino de Cristal', en:'Ch. XII — Crystal Realm' } },
    { id:'cap_binary',  lvl:3500, reqBosses:17, name:{ pt:'Cap. XIII — Forja Binária',   en:'Ch. XIII — Binary Forge'  } },
    { id:'cap_axiom',   lvl:3800, reqBosses:18, name:{ pt:'Cap. XIV — Vazio de Axioma',  en:'Ch. XIV — Axiom\'s Void'  } },
  ];
  newMilestones.forEach(function(m) {
    if (!rpg.milestones.find(function(x){ return x.id===m.id; })) {
      rpg.milestones.push(m);
    }
  });

  // ════════════════════════════════════════════
  // 3. NOVOS BOSSES (índice 16, 17, 18)
  // ════════════════════════════════════════════
  var newBosses = [
    {
      id: 'boss_17',
      name: { pt: 'Guardião de Cristal', en: 'Crystal Guardian' },
      icon: 'gem', color: 'text-cyan-300',
      reqLvl: 3100,
      baseHp: 400000000000000, hpMult: 600000,
      baseDmg: 4000000000000,  dmgMult: 600000,
      spd: 140,
    },
    {
      id: 'boss_18',
      name: { pt: 'Fundidor Binário', en: 'Binary Smelter' },
      icon: 'cpu', color: 'text-emerald-400',
      reqLvl: 3500,
      baseHp: 5000000000000000, hpMult: 2000000,
      baseDmg: 50000000000000,  dmgMult: 2000000,
      spd: 120,
    },
    {
      id: 'boss_19',
      name: { pt: 'Axioma', en: 'Axiom' },
      icon: 'circle', color: 'text-fuchsia-300',
      reqLvl: 3800,
      baseHp: 50000000000000000, hpMult: 8000000,
      baseDmg: 500000000000000,  dmgMult: 8000000,
      spd: 100,
    },
  ];
  newBosses.forEach(function(b) {
    if (!rpg.actBosses.find(function(x){ return x.id===b.id; })) {
      rpg.actBosses.push(b);
    }
  });

  // ════════════════════════════════════════════
  // 4. NOVOS LORE ACTS (para actLore)
  // ════════════════════════════════════════════
  var newLore = [
    {
      act: 16,
      title: { pt: 'Cap. XII: O Reino de Cristal',   en: 'Ch. XII: The Crystal Realm' },
      desc:  { pt: 'Memórias de universos extintos.',  en: 'Memories of extinct universes.' },
      quote: { pt: 'Cada fragmento é um mundo morto.', en: 'Each shard is a dead world.' },
    },
    {
      act: 17,
      title: { pt: 'Cap. XIII: A Forja Binária',      en: 'Ch. XIII: The Binary Forge' },
      desc:  { pt: 'Onde o Algoritmo foi compilado.',  en: 'Where the Algorithm was compiled.' },
      quote: { pt: 'O calor não queima. Compila.',     en: 'The heat does not burn. It compiles.' },
    },
    {
      act: 18,
      title: { pt: 'Cap. XIV: O Vazio de Axioma',     en: 'Ch. XIV: The Axiom Void' },
      desc:  { pt: 'O vazio antes da existência.',     en: 'The void before existence.' },
      quote: { pt: 'Eu fui o silêncio antes do código.',en: 'I was the silence before the code.' },
    },
  ];
  newLore.forEach(function(l) {
    if (!rpg.actLore.find(function(x){ return x.act===l.act; })) {
      rpg.actLore.push(l);
    }
  });

  // ════════════════════════════════════════════
  // 5. NOVAS CLASSES
  // ════════════════════════════════════════════
  if (!rpg.classes.crystal_mancer) {
    rpg.classes.crystal_mancer = {
      id: 'crystal_mancer',
      name:     { pt: 'Cristalomante', en: 'Crystal Mancer' },
      icon:     'gem',
      desc:     { pt: '+300% ATK, +200% HP, +40% Crit', en: '+300% ATK, +200% HP, +40% Crit' },
      multHp:   3.0,
      multAtk:  4.0,
      addCrit:  0.40,
      addDodge: 0.30,
      reqBosses: 16,
    };
  }
  if (!rpg.classes.void_carrier) {
    rpg.classes.void_carrier = {
      id: 'void_carrier',
      name:     { pt: 'Porta-Vazio', en: 'Void Carrier' },
      icon:     'circle',
      desc:     { pt: 'Poder Axiomático. +600% Tudo', en: 'Axiomatic Power. +600% All' },
      multHp:   7.0,
      multAtk:  7.0,
      addCrit:  0.99,
      addDodge: 0.99,
      reqBosses: 18,
    };
  }

  // ════════════════════════════════════════════
  // 6. MONSTROS DOS NOVOS BIOMAS
  // ════════════════════════════════════════════
  var newMonsters = [
    {
      id: 'crystal_shard',
      name: { pt: 'Estilhaço de Cristal', en: 'Crystal Shard' },
      icon: 'gem', color: 'text-cyan-300',
      hpMult: 3000000, dmgMult: 2500000, spd: 600,
      weak: 'atk', res: 'mag', dodge: 0.3, block: 0.6,
    },
    {
      id: 'memory_echo',
      name: { pt: 'Eco de Memória', en: 'Memory Echo' },
      icon: 'layers', color: 'text-sky-400',
      hpMult: 5000000, dmgMult: 4000000, spd: 500,
      weak: 'mag', res: 'atk', dodge: 0.6, block: 0.2,
    },
    {
      id: 'binary_golem',
      name: { pt: 'Golem Binário', en: 'Binary Golem' },
      icon: 'cpu', color: 'text-emerald-300',
      hpMult: 8000000, dmgMult: 7000000, spd: 800,
      weak: 'mag', res: 'none', dodge: 0.1, block: 0.7,
    },
    {
      id: 'forge_sprite',
      name: { pt: 'Sprite da Forja', en: 'Forge Sprite' },
      icon: 'flame', color: 'text-orange-400',
      hpMult: 12000000, dmgMult: 10000000, spd: 700,
      weak: 'atk', res: 'mag', dodge: 0.4, block: 0.3,
    },
    {
      id: 'axiom_fragment',
      name: { pt: 'Fragmento de Axioma', en: 'Axiom Fragment' },
      icon: 'circle', color: 'text-fuchsia-400',
      hpMult: 20000000, dmgMult: 18000000, spd: 450,
      weak: 'none', res: 'none', dodge: 0.7, block: 0.7,
    },
    {
      id: 'void_echo',
      name: { pt: 'Eco do Vazio', en: 'Void Echo' },
      icon: 'circle-dashed', color: 'text-violet-300',
      hpMult: 40000000, dmgMult: 35000000, spd: 400,
      weak: 'mag', res: 'atk', dodge: 0.85, block: 0.4,
    },
  ];
  newMonsters.forEach(function(m) {
    if (!rpg.monsterTypes.find(function(x){ return x.id===m.id; })) {
      rpg.monsterTypes.push(m);
    }
  });

  // ════════════════════════════════════════════
  // 7. ESCOLHAS NARRATIVAS PARA OS NOVOS BOSSES
  // ════════════════════════════════════════════
  var newNarratives = [
    {
      id: 'nc_architect',
      triggerBoss: 16,
      scene: {
        pt: 'O Arquiteto do Fim jaz vencido. Nas suas últimas palavras: "Não sou o fim — sou apenas a porta. O que está além... isso sim, é o verdadeiro abismo." Uma escolha te aguarda.',
        en: 'The Architect of the End lies defeated. His last words: "I am not the end — I am just the door. What lies beyond... that is the true abyss." A choice awaits you.',
      },
      options: [
        {
          id: 'enter_crystal', icon: 'gem', color: 'text-cyan-400',
          label:  { pt: 'Atravessas a Porta de Cristal',   en: 'Enter the Crystal Gate' },
          desc:   { pt: 'O brilho é frio, mas promissor.',  en: 'The glow is cold but promising.' },
          effect: { pt: '+400% ATK e HP. O Cristal guarda-te.', en: '+400% ATK & HP. The Crystal guards you.' },
          apply:  function(s) { s.permAllBonus = (s.permAllBonus||0) + 2.0; },
        },
        {
          id: 'forge_ahead', icon: 'cpu', color: 'text-emerald-400',
          label:  { pt: 'Caminhas para a Forja',           en: 'Walk toward the Forge' },
          desc:   { pt: 'O calor binário promete poder.',   en: 'Binary heat promises power.' },
          effect: { pt: '+500% ATK permanente. Compilado em batalha.', en: '+500% perm. ATK. Compiled in battle.' },
          apply:  function(s) { s.permAtkBonus = (s.permAtkBonus||0) + 5.0; },
        },
      ],
    },
    {
      id: 'nc_axiom',
      triggerBoss: 18,
      scene: {
        pt: 'Axioma colapsa. O vazio que existia antes da criação pergunta em silêncio: "Quem és tu para existires neste espaço que nem o tempo alcança?" Escolhe a tua resposta.',
        en: 'Axiom collapses. The void that existed before creation asks in silence: "Who are you to exist in this space that even time cannot reach?" Choose your answer.',
      },
      options: [
        {
          id: 'claim_void', icon: 'circle', color: 'text-fuchsia-400',
          label:  { pt: 'Reclamas o Vazio como teu',       en: 'Claim the Void as yours' },
          desc:   { pt: 'O vazio entra em ti. Tu és o fim.', en: 'The void enters you. You are the end.' },
          effect: { pt: '+1000% Tudo. Título: Guardião do Vazio.', en: '+1000% All. Title: Void Guardian.' },
          apply:  function(s) { s.permAllBonus = (s.permAllBonus||0) + 10.0; },
        },
        {
          id: 'reject_void', icon: 'zap', color: 'text-yellow-400',
          label:  { pt: 'Rejeitas o Vazio',                en: 'Reject the Void' },
          desc:   { pt: 'Eles não vão dominar-te.',         en: 'They will not dominate you.' },
          effect: { pt: '+800% ATK, +200% Crit. Título: O Inabalável.', en: '+800% ATK, +200% Crit. Title: The Unshakable.' },
          apply:  function(s) { s.permAtkBonus=(s.permAtkBonus||0)+8.0; s.permCritBonus=(s.permCritBonus||0)+0.50; },
        },
      ],
    },
  ];
  if (rpg.NARRATIVE_CHOICES) {
    newNarratives.forEach(function(nc) {
      if (!rpg.NARRATIVE_CHOICES.find(function(x){ return x.id===nc.id; })) {
        rpg.NARRATIVE_CHOICES.push(nc);
      }
    });
  }

  // ════════════════════════════════════════════
  // 8. REGIÕES DO MAPA — CORRIGE DEFINITIVAMENTE
  // Substitui / completa as 3 regiões já existentes
  // e assegura coordenadas corretas
  // ════════════════════════════════════════════
  var patchRegions = [
    {
      id: 'r_crystal_realm',
      x: 65, y: 3,
      name: { pt: 'Reino de Cristal', en: 'Crystal Realm' },
      reqBoss: 16, reqLvl: 3100,
      color: '#67e8f9', icon: '💎',
      desc: { pt: 'Estruturas de cristal que armazenam memórias de universos extintos.', en: 'Crystal structures storing memories of extinct universes.' },
      theme: 't_crystal_realm', biome: 'crystal',
    },
    {
      id: 'r_binary_forge',
      x: 35, y: 2,
      name: { pt: 'Forja Binária', en: 'Binary Forge' },
      reqBoss: 17, reqLvl: 3500,
      color: '#10b981', icon: '⚙️',
      desc: { pt: 'O lugar onde o Primeiro Algoritmo foi compilado. Calor de dados puros.', en: 'Where the First Algorithm was compiled. Heat of pure data.' },
      theme: 't_binary_forge', biome: 'forge',
    },
    {
      id: 'r_axiom_void',
      x: 50, y: 0.5,
      name: { pt: 'Vazio de Axioma', en: "Axiom's Void" },
      reqBoss: 18, reqLvl: 3800,
      color: '#f43f5e', icon: '🌑',
      desc: { pt: 'O espaço que Axioma habitou antes de ser corrompido. Vazio consciente.', en: 'The space Axiom inhabited before corruption. Conscious void.' },
      theme: 't_axiom_void', biome: 'axiom',
    },
  ];
  // Remover duplicatas do patch v29 e adicionar versões corretas
  rpg.MAP_REGIONS = rpg.MAP_REGIONS.filter(function(r) {
    return r.id !== 'r_crystal_realm' && r.id !== 'r_binary_forge' && r.id !== 'r_axiom_void';
  });
  patchRegions.forEach(function(r) { rpg.MAP_REGIONS.push(r); });

  // ════════════════════════════════════════════
  // 9. PATCH renderMap — Mapa completamente atualizado
  // ════════════════════════════════════════════
  rpg.renderMap = function() {
    var el = document.getElementById('map-body');
    if (!el) return;
    var current = this.MAP_REGIONS.find(function(r){ return r.id === rpg.currentRegion; }) || this.MAP_REGIONS[0];

    // Conexões completas incluindo novos mundos
    var connections = [
      // Tier I
      ['r_ruins','r_swamp'],   ['r_ruins','r_forest'],
      // Tier II
      ['r_swamp','r_cave'],    ['r_swamp','r_tundra'],
      ['r_forest','r_desert'], ['r_forest','r_volcano'],
      ['r_cave','r_tundra'],   ['r_cave','r_cyber'],
      ['r_desert','r_volcano'],['r_desert','r_storm'],
      // Tier III
      ['r_volcano','r_astral'],['r_tundra','r_astral'],
      ['r_astral','r_void'],   ['r_astral','r_shadow'],
      ['r_cyber','r_void'],    ['r_storm','r_shadow'],
      // Tier IV
      ['r_void','r_matrix'],   ['r_shadow','r_matrix'],
      // Tier V
      ['r_void','r_abyss'],    ['r_matrix','r_quantum'],
      ['r_abyss','r_quantum'], ['r_quantum','r_neural'],
      ['r_quantum','r_end'],   ['r_neural','r_end'],
      // Tier VI — Novos mundos (conectados a partir de r_end e r_neural)
      ['r_end','r_crystal_realm'],
      ['r_neural','r_crystal_realm'],
      ['r_crystal_realm','r_binary_forge'],
      ['r_crystal_realm','r_axiom_void'],
      ['r_binary_forge','r_axiom_void'],
    ];

    var W = 300, H = 280;
    var toSvg = function(r) { return { cx: r.x * W / 100, cy: H - (r.y * H / 100) }; };

    var svgLines = connections.map(function(pair) {
      var a = pair[0], b = pair[1];
      var ra = rpg.MAP_REGIONS.find(function(r){ return r.id===a; });
      var rb = rpg.MAP_REGIONS.find(function(r){ return r.id===b; });
      if (!ra || !rb) return '';
      var pa = toSvg(ra), pb = toSvg(rb);
      var aUnlocked = rpg.level >= ra.reqLvl && rpg.bossKills >= ra.reqBoss;
      var bUnlocked = rpg.level >= rb.reqLvl && rpg.bossKills >= rb.reqBoss;
      var active = aUnlocked && bUnlocked;
      // Conexões novas ficam em cor especial
      var isTierVI = (a === 'r_crystal_realm' || a === 'r_binary_forge' || a === 'r_axiom_void' ||
                      b === 'r_crystal_realm' || b === 'r_binary_forge' || b === 'r_axiom_void');
      var strokeColor = active ? (isTierVI ? '#a855f7' : '#3f3f46') : '#1c1c1e';
      return '<line x1="' + pa.cx.toFixed(1) + '" y1="' + pa.cy.toFixed(1) + '" x2="' + pb.cx.toFixed(1) + '" y2="' + pb.cy.toFixed(1) + '"' +
        ' stroke="' + strokeColor + '" stroke-width="' + (active ? (isTierVI ? 1.8 : 1.2) : 0.8) + '"' +
        ' stroke-dasharray="' + (active ? (isTierVI ? '4 2' : '5 3') : '3 4') + '" opacity="' + (active ? (isTierVI ? 0.9 : 0.7) : 0.25) + '"/>';
    }).join('');

    var svgNodes = rpg.MAP_REGIONS.map(function(region) {
      var unlocked = rpg.level >= region.reqLvl && rpg.bossKills >= region.reqBoss;
      var isCurrent = rpg.currentRegion === region.id;
      var pos = toSvg(region);
      var r = isCurrent ? 11 : 8;
      var isTierVI = (region.id === 'r_crystal_realm' || region.id === 'r_binary_forge' || region.id === 'r_axiom_void');
      var glowColor = isTierVI ? '#a855f722' : (region.color + '18');
      return '<g class="cursor-pointer" onclick="rpg.travelToRegion(\'' + region.id + '\')">' +
        (unlocked ? '<circle cx="' + pos.cx.toFixed(1) + '" cy="' + pos.cy.toFixed(1) + '" r="' + (r+5) + '" fill="' + glowColor + '"/>' : '') +
        (isTierVI && unlocked ? '<circle cx="' + pos.cx.toFixed(1) + '" cy="' + pos.cy.toFixed(1) + '" r="' + (r+10) + '" fill="none" stroke="#a855f7" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.5"/>' : '') +
        '<circle cx="' + pos.cx.toFixed(1) + '" cy="' + pos.cy.toFixed(1) + '" r="' + r + '"' +
        ' fill="' + (unlocked ? region.color + 'cc' : '#27272a') + '"' +
        ' stroke="' + (isCurrent ? '#fff' : (unlocked ? region.color : '#3f3f46')) + '"' +
        ' stroke-width="' + (isCurrent ? 2.5 : 1.2) + '"' +
        ' opacity="' + (unlocked ? 1 : 0.35) + '"/>' +
        (isCurrent ? '<circle cx="' + pos.cx.toFixed(1) + '" cy="' + pos.cy.toFixed(1) + '" r="' + (r+9) + '" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>' : '') +
        '<text x="' + pos.cx.toFixed(1) + '" y="' + (pos.cy + 3.5).toFixed(1) + '" text-anchor="middle" font-size="' + (isCurrent ? 9 : 7) + '" fill="white" opacity="' + (unlocked ? 1 : 0.3) + '">' + region.icon + '</text>' +
        '<text x="' + pos.cx.toFixed(1) + '" y="' + (pos.cy + r + 11).toFixed(1) + '" text-anchor="middle" font-size="5.5" fill="' + (unlocked ? (isTierVI ? '#c084fc' : '#d4d4d8') : '#52525b') + '" font-weight="bold">' + region.name[rpg.lang].split(' ')[0] + '</text>' +
        '</g>';
    }).join('');

    // Tiers completos incluindo Tier VI
    var tiers = [
      { label: 'Tier I — Início',    color: 'text-zinc-400',   ids: ['r_ruins','r_swamp','r_forest'] },
      { label: 'Tier II — Exploração',color:'text-green-400',  ids: ['r_cave','r_desert','r_volcano','r_tundra'] },
      { label: 'Tier III — Perigo',  color: 'text-orange-400', ids: ['r_astral','r_cyber','r_storm'] },
      { label: 'Tier IV — Endgame',  color: 'text-red-400',    ids: ['r_void','r_shadow','r_matrix'] },
      { label: 'Tier V — Lendário',  color: 'text-violet-400', ids: ['r_abyss','r_quantum','r_neural','r_end'] },
      { label: 'Tier VI — Além do Fim', color: 'text-fuchsia-400', ids: ['r_crystal_realm','r_binary_forge','r_axiom_void'] },
    ];

    var listHtml = tiers.map(function(tier) {
      var regions = tier.ids.map(function(id){ return rpg.MAP_REGIONS.find(function(r){ return r.id===id; }); }).filter(Boolean);
      return '<div class="mb-2">' +
        '<p class="text-[8px] font-black ' + tier.color + ' uppercase tracking-widest mb-1 px-1">' + tier.label + '</p>' +
        '<div class="grid grid-cols-2 gap-1">' +
        regions.map(function(region) {
          var unlocked = rpg.level >= region.reqLvl && rpg.bossKills >= region.reqBoss;
          var isCurrent = rpg.currentRegion === region.id;
          var isTierVI = (region.id === 'r_crystal_realm' || region.id === 'r_binary_forge' || region.id === 'r_axiom_void');
          var borderClass = isCurrent
            ? 'border-white/40 bg-white/5'
            : (unlocked
              ? (isTierVI ? 'border-fuchsia-800/60 bg-fuchsia-950/20 hover:border-fuchsia-600' : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-600')
              : 'border-zinc-800/20 bg-zinc-950/20 opacity-35 cursor-not-allowed');
          return '<button onclick="rpg.travelToRegion(\'' + region.id + '\')"' +
            ' class="text-left p-1.5 rounded-lg border ' + borderClass + ' transition-all"' +
            (unlocked ? '' : ' disabled') + '>' +
            '<p class="text-[9px] font-black ' + (unlocked ? (isTierVI ? 'text-fuchsia-300' : 'text-zinc-200') : 'text-zinc-600') + ' leading-tight truncate">' + region.icon + ' ' + region.name[rpg.lang] + '</p>' +
            '<p class="text-[7px] text-zinc-600 mt-0.5">Lvl ' + region.reqLvl + ' · ' + region.reqBoss + ' boss' + (region.reqBoss !== 1 ? 'es' : '') + '</p>' +
            (isCurrent ? '<span class="text-[6px] text-cyan-400 font-black uppercase">● atual</span>' : '') +
            '</button>';
        }).join('') +
        '</div></div>';
    }).join('');

    var totalRegions = rpg.MAP_REGIONS.length;
    el.innerHTML =
      '<div class="bg-zinc-950/80 border border-zinc-800 rounded-xl p-2.5 mb-2.5 flex items-center gap-2.5">' +
        '<span class="text-2xl">' + current.icon + '</span>' +
        '<div class="flex-1 min-w-0">' +
          '<p class="text-xs font-black text-zinc-200 truncate">' + current.name[rpg.lang] + '</p>' +
          '<p class="text-[9px] text-zinc-500 leading-tight">' + current.desc[rpg.lang] + '</p>' +
        '</div>' +
        '<div class="text-right shrink-0">' +
          '<p class="text-[8px] text-zinc-600">' + rpg.mapDiscovered.length + '/' + totalRegions + '</p>' +
          '<p class="text-[7px] text-zinc-700 uppercase">explorado</p>' +
        '</div>' +
      '</div>' +
      '<div class="bg-zinc-950/90 border border-zinc-800 rounded-xl overflow-hidden mb-2.5">' +
        '<svg viewBox="0 0 300 280" width="100%" height="220" style="background:radial-gradient(ellipse at 50% 110%,#1c1917 0%,#09090b 60%)">' +
          '<defs>' +
            '<filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
            '<filter id="glowVI"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
          '</defs>' +
          svgLines +
          '<g filter="url(#glow2)">' + svgNodes + '</g>' +
        '</svg>' +
      '</div>' +
      '<div class="max-h-60 overflow-y-auto hide-scrollbar pr-0.5">' + listHtml + '</div>';

    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  // ════════════════════════════════════════════
  // 10. CHANGELOG v30
  // ════════════════════════════════════════════
  function injectChangelogV30() {
    var list = document.querySelector('#changelog-modal .space-y-4');
    if (!list || document.getElementById('cl-v30')) return;

    list.querySelectorAll('.bg-green-400').forEach(function(b) {
      if (b.textContent.includes('ATUAL')) b.remove();
    });
    list.querySelectorAll('[class*="border-green-400/70"]').forEach(function(d) {
      d.className = d.className.replace(/border-green-400\/70/g, 'border-emerald-400/40').replace(/shadow-\[0_0_30px[^\]]*\]/g, '');
    });

    var div = document.createElement('div');
    div.id = 'cl-v30';
    div.className = 'bg-zinc-950/80 p-4 rounded-xl border border-fuchsia-500/70 shadow-[0_0_30px_rgba(217,70,239,0.25)] relative overflow-hidden';
    div.innerHTML =
      '<div class="absolute top-0 right-0 bg-fuchsia-500 text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">ATUAL</div>' +
      '<h3 class="font-black text-fuchsia-300 text-lg mb-1">v30.0 — Tier VI & Mapa Definitivo</h3>' +
      '<span class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-3 block">Mapa Atualizado · 3 Capítulos · Bosses 17-19 · 2 Classes · 6 Monstros · 2 Escolhas Narrativas</span>' +
      '<ul class="list-disc pl-5 space-y-1 text-xs">' +
      '<li><strong class="text-fuchsia-200">🗺 Mapa Definitivo:</strong> Tier VI adicionado (Reino de Cristal, Forja Binária, Vazio de Axioma). Conexões completas e visuais roxos para os novos mundos. SVG aumentado para acomodar regiões no topo.</li>' +
      '<li><strong class="text-fuchsia-200">📖 3 Novos Capítulos:</strong> Cap. XII ao XIV — cada um com lore, história de entrada e boss boss dedicado.</li>' +
      '<li><strong class="text-fuchsia-200">👑 Boss 17 — Guardião de Cristal:</strong> Req. Lvl 3100. HP/DMG em escala Qa.</li>' +
      '<li><strong class="text-fuchsia-200">👑 Boss 18 — Fundidor Binário:</strong> Req. Lvl 3500. O compilador original.</li>' +
      '<li><strong class="text-fuchsia-200">👑 Boss 19 — Axioma:</strong> Req. Lvl 3800. O vazio antes da existência. Boss final do Tier VI.</li>' +
      '<li><strong class="text-fuchsia-200">🧙 Classe: Cristalomante</strong> — Req. 16 bosses. +300% ATK, +200% HP, +40% Crit.</li>' +
      '<li><strong class="text-fuchsia-200">🌑 Classe: Porta-Vazio</strong> — Req. 18 bosses. +600% Tudo. A classe final.</li>' +
      '<li><strong class="text-fuchsia-200">👾 6 Novos Monstros:</strong> Estilhaço de Cristal, Eco de Memória, Golem Binário, Sprite da Forja, Fragmento de Axioma, Eco do Vazio. Multiplicadores até 40M×.</li>' +
      '<li><strong class="text-fuchsia-200">📜 2 Novas Escolhas Narrativas:</strong> Após Boss 16 (Porta de Cristal ou Forja) e após Boss 18 (Reclamar ou Rejeitar o Vazio).</li>' +
      '</ul>';

    list.insertBefore(div, list.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChangelogV30);
  } else {
    setTimeout(injectChangelogV30, 600);
  }
  var obsV30 = new MutationObserver(function(mutations, o) {
    if (document.getElementById('changelog-modal')) { injectChangelogV30(); o.disconnect(); }
  });
  obsV30.observe(document.body, { childList: true, subtree: true });

  console.log('[v30.0] OK — Mapa Tier VI · 3 Capítulos · Bosses 17-19 · 2 Classes · 6 Monstros · 2 Narrativas');

})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── PATCH: Funções faltando nos botões do menu accordion ──────
// ═══════════════════════════════════════════════════════════════
(function patchMissingMenuFunctions() {
  'use strict';

  function safeOpen(renderFn, modalId) {
    try { if (typeof renderFn === 'function') renderFn(); } catch(e) {}
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
  }

  if (typeof openAuras === 'undefined')
    window.openAuras        = () => safeOpen(() => rpg.renderAuraModal(),      'aura-modal');
  if (typeof openDailyDungeon === 'undefined')
    window.openDailyDungeon = () => safeOpen(() => rpg.renderDailyDungeon(),   'dd-modal');
  if (typeof openChallenge === 'undefined')
    window.openChallenge    = () => safeOpen(() => rpg.renderChallengeModal(), 'challenge-modal');
  if (typeof openCoop === 'undefined')
    window.openCoop         = () => safeOpen(() => rpg.renderCoop(),           'coop-modal');
  if (typeof openArena === 'undefined')
    window.openArena        = () => safeOpen(() => rpg.renderArena(),          'arena-modal');
  if (typeof openDiary === 'undefined')
    window.openDiary        = () => safeOpen(() => rpg.renderDiary(),          'diary-modal');
  if (typeof openAchievements === 'undefined')
    window.openAchievements = () => safeOpen(() => rpg.renderAchievements(),   'achievements-modal');
  if (typeof openBattlePass === 'undefined')
    window.openBattlePass   = () => safeOpen(() => rpg.renderBattlePass(),     'battlepass-modal');
  if (typeof openEquilibrium === 'undefined')
    window.openEquilibrium  = () => safeOpen(() => rpg.renderEquilibrium?.(),  'equilibrium-modal');

  // toggleAcc — accordion dos painéis do menu (versão robusta)
  window.toggleAcc = function(trigger, id) {
    const sub = document.getElementById(id);
    if (!sub) return;
    const isOpen = sub.classList.contains('open');

    // Fecha todos os outros accordions abertos
    document.querySelectorAll('.acc-sub.open').forEach(s => {
      if (s.id !== id) {
        s.classList.remove('open');
        const prev = s.previousElementSibling;
        if (prev) prev.classList.remove('acc-open');
      }
    });

    if (isOpen) {
      sub.classList.remove('open');
      trigger.classList.remove('acc-open');
    } else {
      sub.classList.add('open');
      trigger.classList.add('acc-open');
      // Re-inicializa ícones Lucide que ficaram vazios dentro do display:none
      try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
    }
  };

  console.log('[MenuPatch] Funções de menu injetadas.');
})();

// ═══════════════════════════════════════════════════════════════
// ── PATCH: TUNNEL DE ATAQUE — Dica inteligente na batalha ─────
// ═══════════════════════════════════════════════════════════════
(function TunnelAttackHint(rpg) {
  'use strict';
  if (!rpg) return;

  const HINTS = {
    // (hpPercent, furyPercent, monsterHpPercent, turn) => hint | null
    lowHp: {
      cond: (s) => s.heroHpPct < 0.25,
      msg: '⚠ HP CRÍTICO — USE CURAR ou DEFENDER agora!',
      color: '#ef4444', border: 'rgba(239,68,68,0.4)', bg: 'rgba(127,0,0,0.25)'
    },
    highFury: {
      cond: (s) => s.furyPct > 0.8 && s.heroHpPct > 0.4,
      msg: '⚡ FÚRIA MÁXIMA — Solte a SKILL DE CLASSE!',
      color: '#fbbf24', border: 'rgba(251,191,36,0.4)', bg: 'rgba(120,80,0,0.25)'
    },
    finisher: {
      cond: (s) => s.monsterHpPct < 0.15 && s.monsterHpPct > 0,
      msg: '🎯 TUNEL — Monstro quase morto! ATACAR para finalizar!',
      color: '#34d399', border: 'rgba(52,211,153,0.4)', bg: 'rgba(0,80,40,0.25)'
    },
    magicMoment: {
      cond: (s) => s.heroHpPct > 0.6 && s.monsterHpPct > 0.5 && s.turn % 4 === 0 && s.turn > 0,
      msg: '🔮 Bom momento para MAGIA — causa dano em área!',
      color: '#a78bfa', border: 'rgba(167,139,250,0.4)', bg: 'rgba(60,0,100,0.25)'
    },
    defend: {
      cond: (s) => s.monsterAtkTimer > 0.75,
      msg: '🛡 INIMIGO VAI ATACAR — Considere DEFENDER!',
      color: '#60a5fa', border: 'rgba(96,165,250,0.4)', bg: 'rgba(0,30,90,0.25)'
    },
    tunnel: {
      cond: (s) => s.heroHpPct > 0.5 && s.monsterHpPct < 0.4 && s.furyPct < 0.3,
      msg: '⚔ TUNEL DE ATAQUE — Pressione ATACAR repetidamente!',
      color: '#f87171', border: 'rgba(248,113,113,0.4)', bg: 'rgba(100,0,0,0.2)'
    }
  };

  function getState() {
    return {
      heroHpPct:      rpg.heroHp   / Math.max(rpg.heroMaxHp,   1),
      furyPct:        (rpg.heroFury || 0) / Math.max(rpg.heroMaxFury || 100, 1),
      monsterHpPct:   rpg.monster  ? rpg.monster.hp / Math.max(rpg.monster.maxHp || rpg.monster.hp, 1) : 1,
      monsterAtkTimer:(rpg.monsterAtb || 0) / 100,
      turn:           rpg.turnCount || 0
    };
  }

  function updateHint() {
    const hint = document.getElementById('tunnel-hint');
    if (!hint || !rpg.inCombat) {
      if (hint) hint.classList.add('hidden');
      return;
    }
    const s = getState();
    let active = null;
    // Prioridade: hp crítico > fúria máxima > finisher > defender > tunel > magia
    for (const key of ['lowHp','highFury','finisher','defend','tunnel','magicMoment']) {
      if (HINTS[key].cond(s)) { active = HINTS[key]; break; }
    }
    if (!active) { hint.classList.add('hidden'); return; }

    hint.classList.remove('hidden');
    hint.style.color       = active.color;
    hint.style.borderColor = active.border;
    hint.style.background  = active.bg;
    hint.textContent       = active.msg;
  }

  // Roda a cada 600ms enquanto em batalha
  setInterval(updateHint, 600);

  // Também atualiza ao usar skill
  const _origUseSkill = rpg.useSkill;
  if (_origUseSkill) {
    rpg.useSkill = function() {
      const r = _origUseSkill.apply(this, arguments);
      setTimeout(updateHint, 200);
      return r;
    };
  }

  console.log('[TunnelHint] OK');
})(typeof rpg !== 'undefined' ? rpg : null);

// ═══════════════════════════════════════════════════════════════
// ── PATCH: Settings melhorado — export/import visual + autosave
// ═══════════════════════════════════════════════════════════════
(function EnhancedSaveUI() {
  'use strict';

  // Autosave indicator — pisca verde quando salva
  var _origSaveRef = rpg.save ? rpg.save.bind(rpg) : null;
  if (_origSaveRef) {
    rpg.save = function() {
      try { _origSaveRef.apply(rpg, arguments); } catch(e) {}
      // Flash do dot
      var dot = document.getElementById('autosave-dot');
      var ts  = document.getElementById('autosave-time');
      if (dot) {
        dot.style.background = '#34d399';
        dot.style.boxShadow  = '0 0 10px #34d399';
        setTimeout(function() {
          dot.style.background = '#166534';
          dot.style.boxShadow  = 'none';
        }, 1200);
      }
      if (ts) {
        var now = new Date();
        ts.textContent = 'Salvo às ' + now.toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
      }
    };
  }

  // Refresh save info panel quando abre settings
  window.refreshSaveInfo = function() {
    var fields = {
      'si-hero':     rpg.heroName    || '—',
      'si-level':    'Lvl ' + (rpg.level || 1),
      'si-kills':    (rpg.kills || 0).toLocaleString(),
      'si-gold':     (rpg.gold  || 0).toLocaleString() + ' 🪙',
      'si-prestige': (rpg.prestigeLevel || 0) > 0 ? '✦ ' + rpg.prestigeLevel : 'Nenhum',
      'si-storage':  (function() {
        try {
          var used = JSON.stringify(localStorage).length;
          return (used / 1024).toFixed(1) + ' KB';
        } catch(e) { return '—'; }
      })()
    };
    Object.keys(fields).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.textContent = fields[id];
    });
  };

  // Export visual — mostra código no textarea
  window.enhancedExport = function() {
    try {
      var data = {
        lang: rpg.lang, heroName: rpg.heroName, level: rpg.level,
        xp: rpg.xp, gold: rpg.gold, potions: rpg.potions,
        kills: rpg.kills, bossKills: rpg.bossKills,
        highestLevel: rpg.highestLevel, maxDmgDealt: rpg.maxDmgDealt,
        eqClass: rpg.eqClass, eqWeapon: rpg.eqWeapon,
        eqArmor: rpg.eqArmor, eqPet: rpg.eqPet, eqTheme: rpg.eqTheme,
        avatar: rpg.avatar, inventory: rpg.inventory,
        bestiary: rpg.bestiary, seenMilestones: rpg.seenMilestones,
        introSeen: rpg.introSeen, bpClaimed: rpg.bpClaimed || [],
        prestigeLevel: rpg.prestigeLevel, prestigeMult: rpg.prestigeMult,
        dailyCompleted: rpg.dailyCompleted, dailyMissions: rpg.dailyMissions,
        dailyDate: rpg.dailyDate,
      };
      var code = btoa(JSON.stringify(data));
      var area = document.getElementById('save-code-area');
      var txt  = document.getElementById('save-code-text');
      if (area && txt) {
        txt.value = code;
        area.classList.remove('hidden');
        txt.select();
        try { navigator.clipboard.writeText(code); } catch(e) {}
        if (typeof showToast === 'function') showToast('Código copiado! Guarda-o num local seguro.');
      } else {
        if (typeof rpg.exportSave === 'function') rpg.exportSave();
      }
    } catch(e) {
      if (typeof showToast === 'function') showToast('Erro ao exportar.');
    }
  };

  // Import melhorado
  window.enhancedImport = function() {
    var code = prompt('Cola o teu código de save:');
    if (!code) return;
    try {
      if (typeof rpg.importSave === 'function') {
        // Temporariamente coloca o código no clipboard mock para a função original
        var orig = window.prompt;
        window.prompt = function() { window.prompt = orig; return code; };
        rpg.importSave();
      }
    } catch(e) {
      if (typeof showToast === 'function') showToast('Erro ao importar: código inválido.');
    }
  };

  // Abre settings com refresh
  var _origOpenSettings = window.openSettings;
  window.openSettings = function() {
    if (_origOpenSettings) _origOpenSettings();
    else { var el = document.getElementById('settings-modal'); if (el) el.classList.add('active'); }
    setTimeout(refreshSaveInfo, 50);
  };

  console.log('[EnhancedSaveUI] OK');
})();

// ═══════════════════════════════════════════════════════════════
// ── PATCH: Perfil melhorado — badges de classe/prestígio/rank ─
// ═══════════════════════════════════════════════════════════════
(function EnhancedProfile() {
  'use strict';

  var CLASS_COLORS = {
    warrior:'#ef4444', mage:'#a855f7', rogue:'#22d3ee', paladin:'#fbbf24',
    necromancer:'#8b5cf6', berserker:'#f97316', default:'#94a3b8'
  };
  var RANK_THRESHOLDS = [
    [5000,'👑 Lenda Eterna'],   [3000,'💀 Mestre Sombrio'],
    [1500,'⚔ Campeão'],        [800,'🛡 Veterano'],
    [300,'🗡 Aventureiro'],    [100,'🐣 Novato'],
    [0,'🌱 Iniciante']
  ];

  function getRank(level) {
    for (var i = 0; i < RANK_THRESHOLDS.length; i++) {
      if (level >= RANK_THRESHOLDS[i][0]) return RANK_THRESHOLDS[i][1];
    }
    return '🌱 Iniciante';
  }

  var _origOpenProfileEnhanced = window.openProfile;
  window.openProfile = function() {
    if (_origOpenProfileEnhanced) _origOpenProfileEnhanced();
    else {
      if (typeof rpg.updateProfileStats === 'function') rpg.updateProfileStats();
      var m = document.getElementById('profile-modal');
      if (m) m.classList.add('active');
    }

    setTimeout(function() {
      // Rank badge
      var rankEl = document.getElementById('profile-rank-badge');
      if (rankEl) rankEl.textContent = getRank(rpg.level || 1);

      // Classe badge
      var classBadge = document.getElementById('profile-class-badge');
      if (classBadge) {
        var cls = rpg.eqClass || 'warrior';
        var clsName = cls.charAt(0).toUpperCase() + cls.slice(1);
        var clsColor = CLASS_COLORS[cls] || CLASS_COLORS.default;
        classBadge.textContent = clsName;
        classBadge.style.color = clsColor;
        classBadge.style.borderColor = clsColor + '60';
        classBadge.style.background  = clsColor + '15';
      }

      // Prestígio badge
      var prestBadge = document.getElementById('profile-prestige-badge');
      var prestNum   = document.getElementById('profile-prestige-num');
      if (prestBadge && rpg.prestigeLevel > 0) {
        prestBadge.classList.remove('hidden');
        if (prestNum) prestNum.textContent = rpg.prestigeLevel;
      }

      // Streak stat
      var streakEl = document.getElementById('stat-streak');
      if (streakEl) streakEl.textContent = rpg.bestStreak || 0;

      // Gold stat
      var goldEl = document.getElementById('stat-gold-earned');
      if (goldEl) goldEl.textContent = (rpg.gold || 0).toLocaleString();

      // Show radar container if already created
      var rc = document.getElementById('radar-chart-container');
      if (rc && document.getElementById('radar-svg-wrapper')?.innerHTML) rc.style.display = 'block';

      lucide.createIcons();
    }, 80);
  };

  console.log('[EnhancedProfile] OK');
})();

// ── Fix: openDaily e openCraft não definidos ──
if (typeof openDaily === 'undefined')
  window.openDaily = function() {
    try { rpg.renderDailyMissions(); } catch(e) {}
    var el = document.getElementById('daily-modal');
    if (el) el.classList.add('active');
  };

if (typeof openCraft === 'undefined')
  window.openCraft = function() {
    try { rpg.renderCraftModal(); } catch(e) {}
    var el = document.getElementById('craft-modal');
    if (el) el.classList.add('active');
  };
