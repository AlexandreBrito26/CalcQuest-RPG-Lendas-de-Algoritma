// ═══════════════════════════════════════════════════════════════════════════
// MODULE: world-expansion.js — EXPANSÃO DE MUNDOS v1.0
// ─────────────────────────────────────────────────────────────────────────
// • 6 novos mundos/regiões com biomas únicos
// • 18 novos monstros temáticos
// • 6 novos bosses épicos com lore próprio
// • 40+ novos fragmentos de Codex
// • NPCs de lore em cada região
// • Itens e relíquias exclusivos por região
// • Sistema de "Ecos do Passado" — memórias do mundo
// ═══════════════════════════════════════════════════════════════════════════
;(function WorldExpansionModule() {
  'use strict';

  function waitForRpg(cb) {
    if (window.rpg && window.rpg.MAP_REGIONS) { cb(); }
    else { setTimeout(function() { waitForRpg(cb); }, 400); }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 1. NOVAS REGIÕES
  // ══════════════════════════════════════════════════════════════════════════
  const NEW_REGIONS = [
    // ── TIER 3.5: Fronteira ──
    {
      id: 'r_chrono',
      x: 35, y: 25,
      name: { pt: 'Labirinto do Tempo', en: 'Time Labyrinth' },
      reqBoss: 4, reqLvl: 150,
      color: '#f59e0b', icon: '⏳',
      desc: {
        pt: 'Um lugar onde passado e futuro coexistem. Cada passo pode te levar a ontem.',
        en: 'A place where past and future coexist. Every step may take you to yesterday.'
      },
      theme: 't_astral', biome: 'chrono',
      lore: {
        unlock: 'Alcançaste o Labirinto do Tempo — aqui, a causalidade é apenas uma sugestão.',
        fragments: [
          'O Labirinto foi criado por um Arquiteto que tentou fazer um undo() na realidade. Funcionou demais.',
          'Os monstros aqui não morrem — eles apenas voltam ao estado anterior à batalha.',
          'A única forma de progredir é aceitar que já perdeste e descobrir como ganhar da mesma.',
          'Há ecos de heróis que passaram aqui. Alguns ainda estão presos em loops de 3 segundos.',
          'O boss deste lugar não luta — ele reverte. Cada ataque teu é o mesmo ataque que ele já viu.',
        ]
      }
    },
    {
      id: 'r_crystalline',
      x: 62, y: 28,
      name: { pt: 'Cavernas Cristalinas', en: 'Crystal Caves' },
      reqBoss: 4, reqLvl: 140,
      color: '#06b6d4', icon: '💎',
      desc: {
        pt: 'Cristais que guardam memórias. Cada fragmento é um eco de batalha.',
        en: 'Crystals that store memories. Each fragment is a battle echo.'
      },
      theme: 't_underground', biome: 'crystal',
      lore: {
        unlock: 'As Cavernas Cristalinas — onde dados antigos se solidificaram em beleza.',
        fragments: [
          'Os cristais aqui não refletem luz — refletem informação. Tocar um pode mostrar o teu próprio futuro.',
          'Os mineradores que vieram primeiro enlouqueceram ao ver tudo ao mesmo tempo.',
          'Os Cristais Negros são memórias de bosses derrotados. Preservam o momento da derrota para sempre.',
          'A rainha dos cristais chama-se Miranha. Ela não ataca — ela mostra-te a tua pior lembrança.',
          'Dizem que o Cristal Central guarda a memória do primeiro herói. Ninguém o viu ainda.',
        ]
      }
    },
    // ── TIER 4.5: Abismo Avançado ──
    {
      id: 'r_corruption',
      x: 20, y: 15,
      name: { pt: 'Núcleo da Corrupção', en: 'Corruption Core' },
      reqBoss: 7, reqLvl: 500,
      color: '#7c3aed', icon: '☣️',
      desc: {
        pt: 'O epicentro da infecção digital. A realidade aqui está podre até os ossos.',
        en: 'The epicenter of digital infection. Reality here is rotten to the bone.'
      },
      theme: 't_void', biome: 'corruption',
      lore: {
        unlock: 'Bem-vindo ao Núcleo da Corrupção. O ar aqui tem gosto de exceções não tratadas.',
        fragments: [
          'A corrupção não começou aqui — chegou. Algo externo a Algoritma enviou este vírus.',
          'Os monstros corrompidos não sentem dor. Sentem propósito. E esse propósito és tu.',
          'Cada área do Núcleo foi antes uma região próspera. O Pântano Tóxico foi uma capital.',
          'O Vírus-Rei não é um ser — é uma ideologia. A crença de que o caos é mais eficiente que a ordem.',
          'Há uma câmara no centro onde a corrupção para. Ninguém sabe porquê. Ninguém entra.',
          'Os heróis que derrotam o Vírus-Rei relatam ouvir algo a agradecer-lhes. Não sabem o quê.',
        ]
      }
    },
    {
      id: 'r_dreamscape',
      x: 85, y: 15,
      name: { pt: 'Plano dos Sonhos', en: 'Dreamscape' },
      reqBoss: 7, reqLvl: 600,
      color: '#ec4899', icon: '🌸',
      desc: {
        pt: 'O inconsciente de Algoritma. Regras são sugestões. Inimigos são medos.',
        en: "Algoritma's unconscious. Rules are suggestions. Enemies are fears."
      },
      theme: 't_astral', biome: 'dream',
      lore: {
        unlock: 'Entraste no Plano dos Sonhos. O que encontrares aqui reflecte o que trazes contigo.',
        fragments: [
          'O Plano dos Sonhos não tem geografia fixa. Adapta-se à psicologia de quem entra.',
          'Os Pesadelos aqui são memórias de batalhas perdidas que ganharam corpo.',
          'A entidade central chama-se o Sonhador. Existe há tanto tempo que esqueceu que está a sonhar.',
          'Matar um Pesadelo não o destrói — apenas o liberta da forma. Volta em outro medo.',
          'Heróis que aqui passam semanas relatam que o mundo real começou a parecer menos real.',
          'Existe um segredo aqui: o Plano dos Sonhos é onde Algoritma processa o que não consegue aceitar.',
          'A Rainha dos Pesadelos não é inimiga. Está encarregue de proteger o mundo real dos sonhos ruins.',
        ]
      }
    },
    // ── TIER 5.5: Além do Fim ──
    {
      id: 'r_primordial',
      x: 15, y: 5,
      name: { pt: 'Código Primordial', en: 'Primordial Code' },
      reqBoss: 12, reqLvl: 2000,
      color: '#f97316', icon: '🔥',
      desc: {
        pt: 'A camada zero de Algoritma. Onde as regras foram escritas pela primeira vez.',
        en: 'Layer zero of Algoritma. Where the rules were first written.'
      },
      theme: 't_end', biome: 'primordial',
      lore: {
        unlock: 'O Código Primordial — antes dos mundos, havia apenas isto.',
        fragments: [
          'O Código Primordial é anterior a tudo. Os próprios Arquitetos foram escritos aqui.',
          'As criaturas deste plano não são criaturas — são as primeiras funções do universo.',
          'Cada linha de código aqui corresponde a uma lei da física de Algoritma.',
          'O primeiro bug da realidade está preservado aqui. É tratado como arte.',
          'Derrotar o Guardião do Código significa questionar se as regras que o criaram eram correctas.',
          'Heróis que chegam aqui percebem que já estiveram. Não nesta vida — em versões anteriores do mundo.',
          'O segredo final: Algoritma não foi criada pelos Arquitetos. Os Arquitetos foram criados por Algoritma.',
        ]
      }
    },
    {
      id: 'r_beyond',
      x: 85, y: 3,
      name: { pt: 'O Além', en: 'The Beyond' },
      reqBoss: 17, reqLvl: 4000,
      color: '#ffffff', icon: '✨',
      desc: {
        pt: 'Fora de tudo. Onde nem o código existe. Apenas o herói e a escolha.',
        en: 'Outside of everything. Where not even code exists. Just the hero and choice.'
      },
      theme: 't_end', biome: 'beyond',
      lore: {
        unlock: 'Chegaste ao Além. Não existem palavras para isto — mas vou tentar de qualquer forma.',
        fragments: [
          'O Além não é um lugar. É o que existe quando todos os lugares terminaram.',
          'Aqui, os stats não importam. O que importa é o que o herói escolheu ser ao longo da jornada.',
          'O Guardião do Além não ataca. Pergunta. E as perguntas cortam mais fundo que qualquer lâmina.',
          'Quem derrota o Guardião do Além não ganha poder — ganha perspectiva. E isso é mais do que poder.',
          'Existe apenas uma entidade aqui: a soma de todas as escolhas que o herói já fez.',
          'O Além lembra-se de todos os heróis que passaram. Nenhum saiu igual. Todos saíram mais.',
          'A última verdade de Algoritma: não existe fim. Apenas a escolha de continuar.',
          'Um herói deixou gravado aqui: "Vim procurar o fim. Encontrei o começo."',
        ]
      }
    },
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // 2. NOVOS MONSTROS (3 por região, tematicamente coesos)
  // ══════════════════════════════════════════════════════════════════════════
  const NEW_MONSTERS = [
    // ── Labirinto do Tempo ──
    { id: 'chrono_revenant', name: { pt: 'Revenante Crono', en: 'Chrono Revenant' },
      icon: 'clock', color: 'text-amber-300',
      hpMult: 750, dmgMult: 680, spd: 900,
      weak: 'atk', res: 'mag', dodge: 0.35, block: 0.15,
      lore: 'Um guerreiro preso num loop de 10 segundos antes da própria morte. Repete infinitamente.' },
    { id: 'time_fracture', name: { pt: 'Fratura Temporal', en: 'Time Fracture' },
      icon: 'split', color: 'text-yellow-200',
      hpMult: 820, dmgMult: 720, spd: 1050,
      weak: 'mag', res: 'atk', dodge: 0.5, block: 0.0,
      lore: 'Uma falha no continuum. Existe em dois momentos ao mesmo tempo — atacar um cria o outro.' },
    { id: 'echo_warden', name: { pt: 'Guardião Eco', en: 'Echo Warden' },
      icon: 'repeat', color: 'text-orange-300',
      hpMult: 950, dmgMult: 800, spd: 800,
      weak: 'none', res: 'none', dodge: 0.2, block: 0.4,
      lore: 'Guarda os ecos de batalhas passadas. Replica os movimentos do herói com um delay de 3 segundos.' },

    // ── Cavernas Cristalinas ──
    { id: 'memory_shard', name: { pt: 'Fragmento de Memória', en: 'Memory Shard' },
      icon: 'gem', color: 'text-cyan-200',
      hpMult: 700, dmgMult: 640, spd: 760,
      weak: 'atk', res: 'none', dodge: 0.1, block: 0.5,
      lore: 'Um cristal que absorveu demasiadas memórias e ganhou consciência. Confuso. Violento.' },
    { id: 'resonance_golem', name: { pt: 'Golem de Ressonância', en: 'Resonance Golem' },
      icon: 'hexagon', color: 'text-sky-300',
      hpMult: 1100, dmgMult: 900, spd: 1200,
      weak: 'mag', res: 'atk', dodge: 0.05, block: 0.55,
      lore: 'Construído pelos mineradores para guardar os cristais mais valiosos. Os mineradores partiram. O golem ficou.' },
    { id: 'crystal_horror', name: { pt: 'Horror Cristalino', en: 'Crystal Horror' },
      icon: 'snowflake', color: 'text-blue-200',
      hpMult: 1300, dmgMult: 1100, spd: 950,
      weak: 'none', res: 'mag', dodge: 0.3, block: 0.25,
      lore: 'Um ecossistema inteiro de cristais que cresceu numa forma vagamente humana. Não tem intenções. Apenas fome.' },

    // ── Núcleo da Corrupção ──
    { id: 'virus_spawn', name: { pt: 'Cria do Vírus', en: 'Virus Spawn' },
      icon: 'biohazard', color: 'text-purple-400',
      hpMult: 2800, dmgMult: 2400, spd: 1100,
      weak: 'atk', res: 'none', dodge: 0.2, block: 0.3,
      lore: 'Fragmentos do Vírus-Rei que ganharam autonomia. Cada um é uma afirmação da corrupção: "Eu sou inevitável."' },
    { id: 'corrupted_paladin', name: { pt: 'Paladino Corrompido', en: 'Corrupted Paladin' },
      icon: 'shield-x', color: 'text-violet-300',
      hpMult: 3500, dmgMult: 3000, spd: 900,
      weak: 'mag', res: 'atk', dodge: 0.15, block: 0.45,
      lore: 'Um herói anterior. Chegou ao Núcleo para purificá-lo. O Núcleo purificou-o primeiro.' },
    { id: 'entropy_titan', name: { pt: 'Titã da Entropia', en: 'Entropy Titan' },
      icon: 'zap-off', color: 'text-fuchsia-300',
      hpMult: 5500, dmgMult: 5000, spd: 700,
      weak: 'none', res: 'none', dodge: 0.1, block: 0.4,
      lore: 'O ponto final da corrupção. Uma massa de código degenerado tão grande que criou gravidade própria.' },

    // ── Plano dos Sonhos ──
    { id: 'living_nightmare', name: { pt: 'Pesadelo Vivo', en: 'Living Nightmare' },
      icon: 'moon', color: 'text-pink-400',
      hpMult: 3200, dmgMult: 2800, spd: 1300,
      weak: 'atk', res: 'mag', dodge: 0.45, block: 0.1,
      lore: 'A memória de uma derrota que aprendeu a caminhar. Os teus ataques falham — ela já sabe o que vais fazer.' },
    { id: 'dream_predator', name: { pt: 'Predador Onírico', en: 'Dream Predator' },
      icon: 'eye-off', color: 'text-rose-300',
      hpMult: 4000, dmgMult: 3500, spd: 1500,
      weak: 'mag', res: 'none', dodge: 0.5, block: 0.0,
      lore: 'Existe apenas quando não olhas para ele. Cada vez que focas, ele teleporta.' },
    { id: 'manifest_fear', name: { pt: 'Medo Manifesto', en: 'Manifest Fear' },
      icon: 'skull', color: 'text-red-300',
      hpMult: 6000, dmgMult: 5500, spd: 600,
      weak: 'none', res: 'none', dodge: 0.25, block: 0.35,
      lore: 'A soma de todos os medos do herói numa forma. Fica mais forte quanto mais dano sofres.' },

    // ── Código Primordial ──
    { id: 'first_function', name: { pt: 'Primeira Função', en: 'First Function' },
      icon: 'terminal', color: 'text-orange-200',
      hpMult: 8000, dmgMult: 7000, spd: 1000,
      weak: 'atk', res: 'mag', dodge: 0.3, block: 0.3,
      lore: 'A primeira função que o universo executou. Ainda está a correr. Nunca terminou.' },
    { id: 'root_daemon', name: { pt: 'Daemon Raiz', en: 'Root Daemon' },
      icon: 'server', color: 'text-red-200',
      hpMult: 10000, dmgMult: 9000, spd: 800,
      weak: 'mag', res: 'atk', dodge: 0.2, block: 0.5,
      lore: 'Um processo que corre com permissões absolutas. Nada no sistema pode bloqueá-lo. A força bruta pode.' },
    { id: 'primal_horror', name: { pt: 'Horror Primordial', en: 'Primal Horror' },
      icon: 'infinity', color: 'text-amber-100',
      hpMult: 15000, dmgMult: 13000, spd: 900,
      weak: 'none', res: 'none', dodge: 0.35, block: 0.35,
      lore: 'Existia antes dos nomes. A tentar descrevê-lo, a linguagem falha.' },

    // ── O Além ──
    { id: 'reflection_absolute', name: { pt: 'Reflexo Absoluto', en: 'Absolute Reflection' },
      icon: 'mirror', color: 'text-white',
      hpMult: 25000, dmgMult: 22000, spd: 1200,
      weak: 'none', res: 'none', dodge: 0.4, block: 0.4,
      lore: 'Uma cópia perfeita do herói — mas sem hesitação, sem compaixão, sem história.' },
    { id: 'axiom_breaker', name: { pt: 'Quebrador de Axiomas', en: 'Axiom Breaker' },
      icon: 'ban', color: 'text-gray-100',
      hpMult: 40000, dmgMult: 35000, spd: 1000,
      weak: 'atk', res: 'mag', dodge: 0.3, block: 0.3,
      lore: 'Existe para invalidar as regras. Cada regra que quebrares na batalha enfraquece-o. Segui-las fortalece-o.' },
    { id: 'void_absolute', name: { pt: 'Vazio Absoluto', en: 'Absolute Void' },
      icon: 'circle-off', color: 'text-zinc-100',
      hpMult: 60000, dmgMult: 55000, spd: 500,
      weak: 'none', res: 'none', dodge: 0.5, block: 0.5,
      lore: 'A ausência de tudo. Inclui a ausência de derrota — o que o torna imensamente perigoso.' },
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // 3. NOVOS BOSSES
  // ══════════════════════════════════════════════════════════════════════════
  const NEW_BOSSES = [
    {
      id: 'boss_chronos',
      name: { pt: 'Chronos, o Arquivador', en: 'Chronos, the Archivist' },
      icon: 'hourglass', color: 'text-amber-400',
      reqLvl: 150, reqBoss: 4,
      baseHp: 80_000_000, hpMult: 1200,
      baseDmg: 800_000, dmgMult: 900,
      spd: 600,
      lore: {
        pre: 'Chronos não governa o tempo — arquiva-o. Cada momento que ele captura deixa de existir no fluxo normal.',
        post: 'Ao cair, Chronos libertou eras de tempo arquivado. Por um breve instante, o passado e o futuro foram visíveis em simultâneo.',
        diary: 'Ele perguntou-me: "Sabes o que perdes ao avançar?" Não soube responder. Avancei na mesma.'
      }
    },
    {
      id: 'boss_miranha',
      name: { pt: 'Miranha, a Rainha dos Cristais', en: 'Miranha, Crystal Queen' },
      icon: 'crown', color: 'text-cyan-400',
      reqLvl: 200, reqBoss: 5,
      baseHp: 250_000_000, hpMult: 1500,
      baseDmg: 2_500_000, dmgMult: 1200,
      spd: 700,
      lore: {
        pre: 'Miranha não luta com força — luta com reflexos. Cada ataque teu cria um eco cristalizado que ela usa como arma.',
        post: 'Os cristais que a compunham espalharam-se pela caverna. Tornaram-se janelas para momentos do passado.',
        diary: 'Vi-me a lutar contra ela antes de começar. Não porque ela visse o futuro — porque já tinha visto isto acontecer antes.'
      }
    },
    {
      id: 'boss_virus_king',
      name: { pt: 'O Vírus-Rei', en: 'The Virus King' },
      icon: 'bug', color: 'text-purple-500',
      reqLvl: 500, reqBoss: 8,
      baseHp: 10_000_000_000, hpMult: 3000,
      baseDmg: 80_000_000, dmgMult: 2500,
      spd: 800,
      lore: {
        pre: 'O Vírus-Rei não chegou a Algoritma — foi escrito nela. É uma função que o mundo nunca deveria ter executado.',
        post: 'Com a derrota do Vírus-Rei, regiões inteiras começaram a recuperar. O Pântano Tóxico floresceu por um dia.',
        diary: 'Não é mau. É literal — uma instrução sem ética. Por isso é mais perigoso. Não pode ser convencido. Apenas apagado.'
      }
    },
    {
      id: 'boss_dreamer',
      name: { pt: 'O Sonhador Eterno', en: 'The Eternal Dreamer' },
      icon: 'cloud-moon', color: 'text-pink-500',
      reqLvl: 600, reqBoss: 9,
      baseHp: 30_000_000_000, hpMult: 4000,
      baseDmg: 250_000_000, dmgMult: 3000,
      spd: 550,
      lore: {
        pre: 'O Sonhador acordou antes de existirem heróis. Sonha há tanto tempo que a realidade ao redor tornou-se um sonho também.',
        post: 'Ao despertar forçado pelo herói, o Sonhador chorou. "Não há diferença," disse ele. "O sonho era mais gentil."',
        diary: 'Não sei se venci. Não sei se ele deixou-me vencer. Não sei se faz diferença. O plano dos sonhos pareceu mais nítido ao sair.'
      }
    },
    {
      id: 'boss_primordial_guardian',
      name: { pt: 'Guardião do Código Zero', en: 'Guardian of Code Zero' },
      icon: 'shield-check', color: 'text-orange-500',
      reqLvl: 2000, reqBoss: 13,
      baseHp: 1_000_000_000_000, hpMult: 8000,
      baseDmg: 5_000_000_000, dmgMult: 6000,
      spd: 1000,
      lore: {
        pre: 'O Guardião não protege o Código Primordial de invasores. Protege os invasores do Código. Ninguém que soube o que havia lá dentro ficou intacto.',
        post: 'Com o Guardião derrotado, as leis da realidade tremeram. Por um momento, as regras do mundo foram reescritíveis.',
        diary: 'Perguntou-me: "Tens a certeza?" Disse que sim. Ainda não tenho. Mas a resposta certa era avançar de qualquer forma.'
      }
    },
    {
      id: 'boss_beyond_entity',
      name: { pt: 'A Entidade do Além', en: 'The Beyond Entity' },
      icon: 'sparkles', color: 'text-white',
      reqLvl: 4000, reqBoss: 18,
      baseHp: 999_999_999_999_999, hpMult: 99999,
      baseDmg: 999_999_999_999, dmgMult: 99999,
      spd: 1,
      lore: {
        pre: '"Sabes," disse a Entidade, "que todo este universo foi escrito só para chegar até aqui? Não me derrotes. Compreende-me."',
        post: 'A Entidade não caiu. Dissolveu-se. Deixou apenas uma frase gravada no ar: "Era necessário que passasses por tudo isso. Valeu a pena?"',
        diary: 'Valeu. Não tenho dúvidas. Cada morte, cada nível, cada boss. Valeu.'
      }
    },
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // 4. ITENS EXCLUSIVOS DAS NOVAS REGIÕES
  // ══════════════════════════════════════════════════════════════════════════
  const NEW_WEAPONS = [
    // Tempo
    { id: 'w_chronoblade', name: { pt: 'Lâmina Crono', en: 'Chronoblade' },
      icon: '⏱️', type: 'weapon', stat: 'atk',
      reqLvl: 150, reqBoss: 4, bonus: 180,
      desc: { pt: 'Cada golpe desta lâmina chega 0,3 segundos antes de ser desferido.', en: 'Each strike from this blade arrives 0.3 seconds before it is swung.' } },
    { id: 'w_time_staff', name: { pt: 'Cajado do Instante', en: 'Staff of the Instant' },
      icon: '🕰️', type: 'weapon', stat: 'mag',
      reqLvl: 180, reqBoss: 5, bonus: 200,
      desc: { pt: 'Congela o inimigo no momento do impacto por 1 round.', en: 'Freezes the enemy at the moment of impact for 1 round.' } },
    // Cristal
    { id: 'w_crystal_edge', name: { pt: 'Fio Cristalino', en: 'Crystal Edge' },
      icon: '💠', type: 'weapon', stat: 'atk',
      reqLvl: 200, reqBoss: 5, bonus: 220,
      desc: { pt: 'Cada acerto cria um fragmento de cristal que causa dano passivo.', en: 'Each hit creates a crystal shard dealing passive damage.' } },
    // Corrupção
    { id: 'w_corrupted_fang', name: { pt: 'Presas Corrompidas', en: 'Corrupted Fangs' },
      icon: '🟣', type: 'weapon', stat: 'atk',
      reqLvl: 500, reqBoss: 8, bonus: 480,
      desc: { pt: 'Ataca com a força do Vírus. Cada golpe tem chance de corromper a defesa inimiga.', en: 'Strikes with viral force. Each hit may corrupt enemy defense.' } },
    { id: 'w_void_tome', name: { pt: 'Tomo do Vazio Profundo', en: 'Deep Void Tome' },
      icon: '📗', type: 'weapon', stat: 'mag',
      reqLvl: 600, reqBoss: 9, bonus: 550,
      desc: { pt: 'Feitiços ignoram 30% da resistência inimiga.', en: 'Spells ignore 30% of enemy resistance.' } },
    // Além
    { id: 'w_axiom_blade', name: { pt: 'Lâmina do Axioma', en: 'Axiom Blade' },
      icon: '⚡', type: 'weapon', stat: 'atk',
      reqLvl: 4000, reqBoss: 17, bonus: 9999,
      desc: { pt: 'A arma definitiva. Cada ataque reescreve uma regra da batalha.', en: 'The ultimate weapon. Each attack rewrites one battle rule.' } },
  ];

  const NEW_ARMORS = [
    { id: 'a_chrono_mail', name: { pt: 'Malha Temporal', en: 'Temporal Mail' },
      icon: '⌛', type: 'armor', stat: 'def',
      reqLvl: 150, reqBoss: 4, bonus: 160,
      desc: { pt: 'Atrasa o dano sofrido por 1 round.', en: 'Delays damage taken by 1 round.' } },
    { id: 'a_crystal_plate', name: { pt: 'Placa Cristalina', en: 'Crystal Plate' },
      icon: '🔷', type: 'armor', stat: 'def',
      reqLvl: 200, reqBoss: 5, bonus: 200,
      desc: { pt: 'Reflete 5% do dano mágico sofrido.', en: 'Reflects 5% of magic damage taken.' } },
    { id: 'a_dream_veil', name: { pt: 'Véu Onírico', en: 'Dream Veil' },
      icon: '🌙', type: 'armor', stat: 'mag',
      reqLvl: 600, reqBoss: 9, bonus: 400,
      desc: { pt: '20% de chance de evitar um ataque por ser "irreal" naquele momento.', en: '20% chance to phase out of an attack as being "unreal" at that moment.' } },
    { id: 'a_beyond_robe', name: { pt: 'Manto do Além', en: 'Robe of Beyond' },
      icon: '🌟', type: 'armor', stat: 'def',
      reqLvl: 4000, reqBoss: 17, bonus: 8888,
      desc: { pt: 'Absorve o dano que ultrapassaria o HP máximo.', en: 'Absorbs damage that would exceed max HP.' } },
  ];

  const NEW_RELICS = [
    { id: 'relic_chrono_eye', name: { pt: 'Olho de Chronos', en: "Chronos' Eye" },
      icon: '👁️', type: 'relic',
      reqLvl: 180, reqBoss: 5,
      effect: { stat: 'spd', value: 0.3 },
      desc: { pt: 'Velocidade +30%. Vês os ataques inimigos 0,5s antes.', en: 'Speed +30%. You see enemy attacks 0.5s in advance.' } },
    { id: 'relic_dream_heart', name: { pt: 'Coração Onírico', en: 'Dream Heart' },
      icon: '💗', type: 'relic',
      reqLvl: 700, reqBoss: 10,
      effect: { stat: 'hp', value: 5.0 },
      desc: { pt: 'HP máximo +500%. Regenera 1% HP por round em batalha.', en: 'Max HP +500%. Regenerates 1% HP per battle round.' } },
    { id: 'relic_primordial_core', name: { pt: 'Núcleo Primordial', en: 'Primordial Core' },
      icon: '🔥', type: 'relic',
      reqLvl: 2500, reqBoss: 14,
      effect: { stat: 'all', value: 2.0 },
      desc: { pt: 'Todos os stats +200%. Contém o poder do primeiro cálculo do universo.', en: 'All stats +200%. Contains the power of the universe\'s first calculation.' } },
    { id: 'relic_beyond_echo', name: { pt: 'Eco do Além', en: 'Echo of Beyond' },
      icon: '✨', type: 'relic',
      reqLvl: 4500, reqBoss: 18,
      effect: { stat: 'all', value: 10.0 },
      desc: { pt: 'Todos os stats +1000%. A relíquia final. Criada a partir do que existe além da existência.', en: 'All stats +1000%. The final relic. Created from what exists beyond existence.' } },
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // 5. NOVOS FRAGMENTOS DE CODEX
  // ══════════════════════════════════════════════════════════════════════════
  const NEW_CODEX_FRAGMENTS = [
    // Labirinto do Tempo
    { id: 'wx_c01', cat: 'mundo', icon: '⏳', rarity: 'raro',
      title: { pt: 'O Labirinto do Tempo', en: 'The Time Labyrinth' },
      trigger: { type: 'level', value: 150 },
      text: { pt: 'O Labirinto não distorce o tempo — colecioná-lo. Cada corredor guarda um momento que nunca acabou. Ouves passos atrás de ti? É provavelmente tu, ontem.', en: 'The Labyrinth does not distort time — it collects it. Each corridor holds a moment that never ended. Hear footsteps behind you? Probably you, yesterday.' },
      diary: { pt: 'Encontrei uma versão minha que ainda estava a lutar o primeiro boss. Tentei avisar. Não ouvia.', en: 'I found a version of myself still fighting the first boss. I tried to warn them. They couldn\'t hear.' } },
    { id: 'wx_c02', cat: 'heroi', icon: '⌚', rarity: 'épico',
      title: { pt: 'O Herói e o Tempo', en: 'The Hero and Time' },
      trigger: { type: 'boss', value: 5 },
      text: { pt: 'Um herói que trava batalhas no Labirinto do Tempo torna-se simultaneamente o que era e o que será. A identidade não quebra — expande-se. É assustador. É magnífico.', en: 'A hero who battles in the Time Labyrinth becomes simultaneously what they were and what they will be. Identity does not break — it expands. It is terrifying. It is magnificent.' },
      diary: { pt: 'Vi o meu eu futuro. Parecia cansado. Parecia em paz. Quero ser esse.', en: 'I saw my future self. They looked tired. They looked at peace. I want to be that.' } },

    // Cavernas Cristalinas
    { id: 'wx_c03', cat: 'mundo', icon: '💎', rarity: 'comum',
      title: { pt: 'A Memória dos Cristais', en: 'Crystal Memory' },
      trigger: { type: 'kills', value: 150 },
      text: { pt: 'Os cristais das Cavernas crescem em torno de emoções não resolvidas. Quanto maior o cristal, maior o peso que alguém deixou para trás.', en: 'The crystals in the Caves grow around unresolved emotions. The larger the crystal, the heavier what someone left behind.' },
      diary: { pt: 'Encontrei um cristal do tamanho de uma montanha. Não o toquei. Não era meu para ver.', en: 'Found a crystal the size of a mountain. I didn\'t touch it. It wasn\'t mine to see.' } },
    { id: 'wx_c04', cat: 'segredos', icon: '🔮', rarity: 'lendário',
      title: { pt: 'O Cristal do Herói Original', en: 'The Original Hero\'s Crystal' },
      trigger: { type: 'dungeon', value: 7 },
      text: { pt: 'Existe nas Cavernas um cristal que nenhum minerador tocou — o Cristal do Herói Original. Diz-se que contém a memória do primeiro ser que escolheu lutar contra o Lorde do Caos, milénios antes de existir um nome para o que fazia.', en: 'In the Caves exists a crystal no miner touched — the Original Hero\'s Crystal. It is said to hold the memory of the first being who chose to fight the Lord of Chaos, millennia before there was a name for what they did.' },
      diary: { pt: 'Se os cristais guardam emoções, este guarda uma só: determinação. Pura. Sem dúvida. Ficou-me nessa emoção por horas depois de o tocar.', en: 'If crystals hold emotions, this one holds just one: determination. Pure. Undoubted. It left me feeling it for hours after touching it.' } },

    // Núcleo da Corrupção
    { id: 'wx_c05', cat: 'bosses', icon: '☣️', rarity: 'épico',
      title: { pt: 'O Vírus-Rei', en: 'The Virus King' },
      trigger: { type: 'boss', value: 8 },
      text: { pt: 'O Vírus-Rei não é um ser. É uma instrução. "Propaga-te. Converte. Cresce." Simples, elegante, absolutamente destruidor. A corrupção que vês em Algoritma é apenas a execução desta função a uma escala que ninguém previu.', en: 'The Virus King is not a being. It is an instruction. "Propagate. Convert. Grow." Simple, elegant, absolutely destructive. The corruption you see in Algoritma is just this function executing at a scale no one predicted.' },
      diary: { pt: 'Derrotei-o. Mas ele tinha razão sobre uma coisa: propagar-se era o que ele foi feito para fazer. Não posso culpá-lo por cumprir a sua natureza.', en: 'I defeated it. But it was right about one thing: propagating was what it was made to do. I cannot blame it for fulfilling its nature.' } },
    { id: 'wx_c06', cat: 'mundo', icon: '🌿', rarity: 'raro',
      title: { pt: 'O Renascimento das Regiões', en: 'The Rebirth of Regions' },
      trigger: { type: 'boss', value: 9 },
      text: { pt: 'O que a corrupção toca não morre — adormece. Sob cada área corrompida, a versão original ainda existe. Basta remover o vírus cuidadosamente. E há quem faça isso, em silêncio, há décadas.', en: 'What corruption touches does not die — it sleeps. Under every corrupted area, the original version still exists. One just needs to carefully remove the virus. And there are those who do this, quietly, for decades.' },
      diary: { pt: 'O Pântano Tóxico foi uma vez uma horta. Encontrei as sementes na lama. Plantei-as. Não sei se crescerão. Mas tinha de tentar.', en: 'The Toxic Swamp was once a garden. I found the seeds in the mud. I planted them. I don\'t know if they\'ll grow. But I had to try.' } },

    // Plano dos Sonhos
    { id: 'wx_c07', cat: 'segredos', icon: '🌸', rarity: 'épico',
      title: { pt: 'O Plano dos Sonhos', en: 'The Dreamscape' },
      trigger: { type: 'boss', value: 10 },
      text: { pt: 'O Plano dos Sonhos é o sistema nervoso de Algoritma. Quando o mundo sonha, processa. Quando processa, escolhe o que manter e o que descartar. Às vezes descarta pessoas. Às vezes descarta verdades inteiras.', en: 'The Dreamscape is the nervous system of Algoritma. When the world dreams, it processes. When it processes, it chooses what to keep and what to discard. Sometimes it discards people. Sometimes it discards entire truths.' },
      diary: { pt: 'Percebi que já tinha estado aqui. Não nesta vida — em algum sonho que não me lembro de ter tido.', en: 'I realized I had been here before. Not in this life — in some dream I don\'t remember having.' } },
    { id: 'wx_c08', cat: 'bosses', icon: '🌙', rarity: 'lendário',
      title: { pt: 'O Sonhador Eterno', en: 'The Eternal Dreamer' },
      trigger: { type: 'boss', value: 11 },
      text: { pt: 'O Sonhador acordou antes do primeiro código. Esperou tanto que o universo o usou como almofada onde descansar. Ele nunca se importou — preferia que o mundo estivesse confortável. Só queria que lhe perguntassem se estava bem.', en: 'The Dreamer awoke before the first code. Waited so long the universe used him as a pillow. He never minded — preferred the world be comfortable. Just wished someone would ask if he was okay.' },
      diary: { pt: 'Perguntei-lhe. "Estava bem," disse. "Mas obrigado por perguntares. A primeira em muito tempo." Chorei. Não me envergonho disso.', en: 'I asked him. "I was okay," he said. "But thank you for asking. First in a long time." I cried. I\'m not ashamed of it.' } },

    // Código Primordial
    { id: 'wx_c09', cat: 'origem', icon: '🔥', rarity: 'lendário',
      title: { pt: 'Antes da Criação', en: 'Before Creation' },
      trigger: { type: 'boss', value: 13 },
      text: { pt: 'O Código Primordial não é onde o universo começou — é onde as regras do universo foram escritas antes de ele começar. É o rascunho. E como todos os rascunhos, tem erros. Erros que se tornaram leis.', en: 'The Primordial Code is not where the universe began — it\'s where the universe\'s rules were written before it began. It is the draft. And like all drafts, it has errors. Errors that became laws.' },
      diary: { pt: 'Li uma das leis originais. Dizia: "Todo herói deve duvidar." Não é um bug. É intencional. A dúvida é o mecanismo de segurança.', en: 'I read one of the original laws. It said: "Every hero must doubt." Not a bug. Intentional. Doubt is the safety mechanism.' } },
    { id: 'wx_c10', cat: 'segredos', icon: '∞', rarity: 'lendário',
      title: { pt: 'O Segredo Final de Algoritma', en: 'Algoritma\'s Final Secret' },
      trigger: { type: 'boss', value: 15 },
      text: { pt: 'Algoritma não foi criada. Emergiu — da colisão entre a necessidade de ordem e o desejo de caos. Os Arquitetos não a construíram; descobriram-na já existente e apenas documentaram o que encontraram. O universo existia antes dos seus criadores.', en: 'Algoritma was not created. It emerged — from the collision between the need for order and the desire for chaos. The Architects did not build it; they discovered it already existing and merely documented what they found. The universe existed before its creators.' },
      diary: { pt: 'Isto muda tudo. E ao mesmo tempo muda nada. O mundo é real. A luta é real. O que importa é o que fazes com isso.', en: 'This changes everything. And at the same time changes nothing. The world is real. The struggle is real. What matters is what you do with it.' } },

    // O Além
    { id: 'wx_c11', cat: 'heroi', icon: '✨', rarity: 'lendário',
      title: { pt: 'O Herói no Além', en: 'The Hero in the Beyond' },
      trigger: { type: 'boss', value: 18 },
      text: { pt: 'No Além, o herói não é mais definido pelos seus stats ou classe ou linhagem. É definido pela totalidade das escolhas que fez. Cada compaixão mostrada, cada inimigo poupado, cada momento de dúvida ultrapassado. A soma disso é a forma final do herói.', en: 'In the Beyond, the hero is no longer defined by stats or class or lineage. They are defined by the totality of choices made. Every compassion shown, every enemy spared, every moment of doubt overcome. The sum of that is the hero\'s final form.' },
      diary: { pt: 'Olhei para mim mesmo no Além. Vi tudo. Não foi vergonhoso. Foi... suficiente. Fiz o suficiente. Sou suficiente.', en: 'I looked at myself in the Beyond. I saw everything. It wasn\'t shameful. It was... enough. I did enough. I am enough.' } },
    { id: 'wx_c12', cat: 'origem', icon: '🌌', rarity: 'lendário',
      title: { pt: 'A Verdade do Observador', en: 'The Observer\'s Truth' },
      trigger: { type: 'boss', value: 17 },
      text: { pt: 'O Observador que vê Algoritma de fora não é um deus, nem um arquiteto. É algo mais humilde e mais poderoso: é alguém que escolheu importar-se. A atenção dirigida com amor é a maior força do universo.', en: 'The Observer who watches Algoritma from outside is not a god, nor an architect. It is something humbler and more powerful: someone who chose to care. Attention given with love is the greatest force in the universe.' },
      diary: { pt: 'Neste momento, em algum lugar, o Observador está a torcer por mim. Não sinto isso como pressão. Sinto como companhia.', en: 'Right now, somewhere, the Observer is rooting for me. I don\'t feel that as pressure. I feel it as company.' } },
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // 6. SISTEMA DE "ECOS DO PASSADO" — Mensagens de heróis anteriores
  // ══════════════════════════════════════════════════════════════════════════
  const ECHOES = [
    { region: 'r_chrono',      echo: '"O tempo não é uma prisão. É uma perspectiva." — Herói do 3.º Ciclo' },
    { region: 'r_crystalline', echo: '"Cada memória que guardas te pesa. Cada memória que libertas te clarifica." — Mineradora Elia' },
    { region: 'r_corruption',  echo: '"Vim curar. Mas primeiro tive de me curar." — Paladino Varro, antes de cair' },
    { region: 'r_dreamscape',  echo: '"Os teus medos são teus. Conhecê-los não os remove — mas torna-os menores." — Anónimo' },
    { region: 'r_primordial',  echo: '"As regras foram escritas para serem questionadas. Isso também é uma regra." — Arquiteta Unnamed' },
    { region: 'r_beyond',      echo: '"Chegaste. É suficiente. Tu és suficiente." — Todos os heróis que passaram antes' },
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // 7. INICIALIZAÇÃO
  // ══════════════════════════════════════════════════════════════════════════
  function injectRegions() {
    NEW_REGIONS.forEach(function(r) {
      if (!rpg.MAP_REGIONS.find(function(x) { return x.id === r.id; })) {
        rpg.MAP_REGIONS.push(r);
      }
    });
  }

  function injectMonsters() {
    if (!rpg.monsterTypes) return;
    NEW_MONSTERS.forEach(function(m) {
      if (!rpg.monsterTypes.find(function(x) { return x.id === m.id; })) {
        rpg.monsterTypes.push(m);
      }
    });
  }

  function injectBosses() {
    if (!rpg.bossTypes) return;
    NEW_BOSSES.forEach(function(b) {
      if (!rpg.bossTypes.find(function(x) { return x.id === b.id; })) {
        rpg.bossTypes.push(b);
      }
    });
  }

  function injectItems() {
    var allItems = NEW_WEAPONS.concat(NEW_ARMORS).concat(NEW_RELICS);
    if (!rpg.itemDB) rpg.itemDB = [];
    allItems.forEach(function(item) {
      if (!rpg.itemDB.find(function(x) { return x.id === item.id; })) {
        rpg.itemDB.push(item);
      }
    });

    // Injetar em weapons/armors/relics separados se existirem
    if (rpg.weapons) {
      NEW_WEAPONS.forEach(function(w) {
        if (!rpg.weapons.find(function(x){ return x.id === w.id; })) rpg.weapons.push(w);
      });
    }
    if (rpg.armors) {
      NEW_ARMORS.forEach(function(a) {
        if (!rpg.armors.find(function(x){ return x.id === a.id; })) rpg.armors.push(a);
      });
    }
    if (rpg.relics) {
      NEW_RELICS.forEach(function(r) {
        if (!rpg.relics.find(function(x){ return x.id === r.id; })) rpg.relics.push(r);
      });
    }
  }

  function injectCodexFragments() {
    if (!window.CODEX_FRAGMENTS && !window.CodexLoreModule) return;
    var targetArray = window.CODEX_FRAGMENTS || (window.rpg && window.rpg.codexFragments);
    if (!Array.isArray(targetArray)) return;
    NEW_CODEX_FRAGMENTS.forEach(function(f) {
      if (!targetArray.find(function(x) { return x.id === f.id; })) {
        targetArray.push(f);
      }
    });
  }

  // Exibe eco ao entrar numa região expandida
  function hookRegionTravel() {
    var orig = rpg.travelToRegion;
    if (!orig || orig._wxPatched) return;
    rpg.travelToRegion = function(regionId) {
      orig.call(this, regionId);
      var echo = ECHOES.find(function(e) { return e.region === regionId; });
      if (echo) {
        setTimeout(function() {
          var msg = '💬 Eco do Passado: ' + echo.echo;
          if (window.showToast) showToast(msg, 6000);
          else console.log(msg);
        }, 1800);
      }
    };
    rpg.travelToRegion._wxPatched = true;
  }

  // Lore de boss antes/após batalha
  function hookBossLore() {
    // Adiciona lore ao sistema de boss se existir
    if (rpg.bossLoreDB) {
      NEW_BOSSES.forEach(function(b) {
        if (b.lore && !rpg.bossLoreDB[b.id]) {
          rpg.bossLoreDB[b.id] = b.lore;
        }
      });
    }
  }

  // Adiciona NPCs nas novas regiões ao living-village se existir
  function injectRegionNPCs() {
    var npcs = [
      { region: 'r_chrono', name: 'Velha Nora', role: 'Viajante do Tempo',
        dialogue: ['Estou aqui ontem e amanhã ao mesmo tempo.', 'Cada escolha que fazes cria um eco. Sê cuidadoso.', 'Já te vi antes. Ainda não aconteceu para ti, claro.'] },
      { region: 'r_crystalline', name: 'Elia', role: 'Mineradora',
        dialogue: ['Os cristais guardam o que não conseguimos soltar.', 'O maior cristal que encontrei estava no tamanho de um arrependimento.', 'Toca com cuidado. As memórias dos outros não são tuas.'] },
      { region: 'r_corruption', name: 'Varro', role: 'Paladino Recuperado',
        dialogue: ['Sobrevivi à corrupção. A maioria não.', 'Não odeies o Vírus. Compreende-o. Só então podes derrotá-lo.', 'Vim curar. Tive primeiro de me curar a mim.'] },
      { region: 'r_dreamscape', name: 'A Rainha dos Pesadelos', role: 'Guardiã',
        dialogue: ['Não sou inimiga. Protejo o mundo real dos sonhos ruins.', 'Os teus medos aqui têm forma. Isso é útil — podes lutar contra eles.', 'O maior pesadelo não é o que aqui encontras. É o que trazes de volta.'] },
      { region: 'r_primordial', name: 'Função Zero', role: 'Entidade Ancestral',
        dialogue: ['Sou o primeiro processo. Ainda corro.', 'As leis que me criaram foram escritas com intenção. Mas também com pressa.', 'Pergunta-me qualquer coisa. Lembro-me de tudo. Desde o princípio.'] },
      { region: 'r_beyond', name: 'Eco Colectivo', role: 'Memória de Heróis',
        dialogue: ['Somos todos os que passaram antes.', 'Não estás só. Nunca estiveste.', 'O que buscas aqui já o tens. Sempre tiveste.'] },
    ];

    if (window.VILLAGE_NPCS && Array.isArray(window.VILLAGE_NPCS)) {
      npcs.forEach(function(npc) {
        if (!window.VILLAGE_NPCS.find(function(n){ return n.name === npc.name; })) {
          window.VILLAGE_NPCS.push(npc);
        }
      });
    }

    // Guardar para uso externo
    window.WX_REGION_NPCS = npcs;
  }

  function init() {
    injectRegions();
    injectMonsters();
    injectBosses();
    injectItems();
    injectCodexFragments();
    hookRegionTravel();
    hookBossLore();
    injectRegionNPCs();

    // Expor dados globalmente para outros módulos
    window.WX_DATA = {
      regions: NEW_REGIONS,
      monsters: NEW_MONSTERS,
      bosses: NEW_BOSSES,
      weapons: NEW_WEAPONS,
      armors: NEW_ARMORS,
      relics: NEW_RELICS,
      codex: NEW_CODEX_FRAGMENTS,
      echoes: ECHOES,
    };

    console.log('[WorldExpansion] ✅ 6 regiões · 18 monstros · 6 bosses · 10 relíquias/armas · 12 fragmentos de Codex carregados.');
  }

  waitForRpg(init);

})();
