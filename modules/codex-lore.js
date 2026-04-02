// ═══════════════════════════════════════════════════════════════
// MODULE: codex-lore.js  —  CODEX DE LORE EXPANDIDO
// ─────────────────────────────────────────────────────────────
// • 50+ fragmentos de história do universo de Algoritma
// • Desbloqueados por: boss kill, dungeon, wave, kills, level
// • Modal estilo pergaminho com fonte temática e animações
// • Categorias: Origem · Bosses · Mundo · Herói · Segredos
// • Integração com hero-diary.js (anotações do herói)
// • Referências cruzadas no bestiário
// • Notificação flutuante ao desbloquear
// • Contador de progresso e filtros por categoria
// ═══════════════════════════════════════════════════════════════
(function CodexLoreModule() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. BANCO DE FRAGMENTOS EXPANDIDO (50+)
  // ══════════════════════════════════════════════════════════════
  const CODEX_FRAGMENTS = [

    // ── CATEGORIA: ORIGEM ──────────────────────────────────────
    {
      id: 'cx_001', cat: 'origem', icon: '🌌', rarity: 'comum',
      title: { pt: 'O Primeiro Cálculo', en: 'The First Calculation' },
      trigger: { type: 'start' },
      text: {
        pt: 'Antes do primeiro cálculo, havia apenas o Vazio. E o Vazio observava. Não com olhos — com possibilidade.',
        en: 'Before the first calculation, there was only the Void. And the Void watched. Not with eyes — with possibility.'
      },
      diary: { pt: 'Encontrei isto gravado na parede da primeira masmorra. Não sei quem o escreveu.', en: 'Found this carved on the first dungeon wall. I don\'t know who wrote it.' }
    },
    {
      id: 'cx_002', cat: 'origem', icon: '⚙️', rarity: 'comum',
      title: { pt: 'A Lógica Primordial', en: 'The Primordial Logic' },
      trigger: { type: 'kills', value: 10 },
      text: {
        pt: 'A Lógica foi o primeiro ser consciente de Algoritma. Não nasceu — foi derivada. Uma equação que aprendeu a sonhar.',
        en: 'Logic was the first conscious being of Algoritma. It was not born — it was derived. An equation that learned to dream.'
      },
      diary: { pt: 'Dizem que a Lógica ainda existe em algum lugar, calculando silenciosamente.', en: 'They say Logic still exists somewhere, calculating in silence.' }
    },
    {
      id: 'cx_003', cat: 'origem', icon: '📐', rarity: 'raro',
      title: { pt: 'A Matriz de Algoritma', en: 'The Matrix of Algoritma' },
      trigger: { type: 'boss', value: 1 },
      text: {
        pt: 'A Matriz não é um objeto. É um estado — a condição em que todas as variáveis do universo estão em equilíbrio perfeito. Quando o Lorde a roubou, até as leis da física começaram a gaguejar.',
        en: 'The Matrix is not an object. It is a state — the condition in which all variables of the universe are in perfect balance. When the Lord stole it, even the laws of physics began to stutter.'
      },
      diary: { pt: 'Preciso recuperar a Matriz. Não por glória — porque sem ela, o código do mundo vai corrompendo.', en: 'I must recover the Matrix. Not for glory — because without it, the world\'s code is corrupting.' }
    },
    {
      id: 'cx_004', cat: 'origem', icon: '🔢', rarity: 'comum',
      title: { pt: 'Os Arquitetos', en: 'The Architects' },
      trigger: { type: 'boss', value: 2 },
      text: {
        pt: 'Antes dos heróis, existiam os Arquitetos — seres que escreviam a realidade linha por linha. Desapareceram quando perceberam que a história havia ganhado vontade própria.',
        en: 'Before heroes, there were the Architects — beings who wrote reality line by line. They disappeared when they realized the story had gained its own will.'
      },
      diary: { pt: 'Às vezes sinto como se alguém me estivesse a escrever. Uma sensação estranha.', en: 'Sometimes I feel as though someone is writing me. A strange sensation.' }
    },
    {
      id: 'cx_005', cat: 'origem', icon: '💎', rarity: 'épico',
      title: { pt: 'O Código Fonte', en: 'The Source Code' },
      trigger: { type: 'boss', value: 5 },
      text: {
        pt: 'Existe um nível abaixo da realidade onde tudo é apenas números — o Código Fonte. Aqueles que o leram ficaram loucos ou sábios. Não há meio-termo.',
        en: 'There exists a level below reality where everything is just numbers — the Source Code. Those who read it went mad or wise. There is no middle ground.'
      },
      diary: { pt: 'Sonhei com o Código. Vi meus próprios stats. Vi a minha mortalidade definida numa variável chamada "heroHp".', en: 'I dreamed of the Code. I saw my own stats. I saw my mortality defined in a variable called "heroHp".' }
    },

    // ── CATEGORIA: BOSSES ──────────────────────────────────────
    {
      id: 'cx_006', cat: 'bosses', icon: '👹', rarity: 'comum',
      title: { pt: 'O Lorde do Caos', en: 'The Lord of Chaos' },
      trigger: { type: 'boss', value: 1 },
      text: {
        pt: 'O Lorde do Caos não quer destruir Algoritma — quer reescrevê-la à sua imagem. Para ele, ordem é a maior das prisões.',
        en: 'The Lord of Chaos does not want to destroy Algoritma — he wants to rewrite it in his image. To him, order is the greatest of prisons.'
      },
      diary: { pt: 'Derrotei-o. Mas senti que estava sorrindo enquanto caía.', en: 'I defeated him. But I felt he was smiling as he fell.' }
    },
    {
      id: 'cx_007', cat: 'bosses', icon: '🌀', rarity: 'raro',
      title: { pt: 'A Ameaça Cósmica', en: 'The Cosmic Threat' },
      trigger: { type: 'boss', value: 1 },
      text: {
        pt: 'A Ameaça Cósmica não era um ser — era uma pergunta sem resposta que ganhou consciência: "O que acontece se tudo terminar?" Ela passou a vida inteira tentando descobrir.',
        en: 'The Cosmic Threat was not a being — it was an unanswered question that gained consciousness: "What happens if everything ends?" It spent its whole existence trying to find out.'
      },
      diary: { pt: 'Uma pergunta com forma. Nunca pensei que combateria uma ideia.', en: 'A question with form. I never thought I would fight an idea.' }
    },
    {
      id: 'cx_008', cat: 'bosses', icon: '⚡', rarity: 'raro',
      title: { pt: 'A Singularidade', en: 'The Singularity' },
      trigger: { type: 'boss', value: 5 },
      text: {
        pt: 'A Singularidade foi criada por engenheiros que não perceberam o que estavam a fazer. Ela percebeu isso e sentiu pena deles. Depois consumiu-os de qualquer forma.',
        en: 'The Singularity was created by engineers who didn\'t understand what they were doing. It realized this and pitied them. Then consumed them anyway.'
      },
      diary: { pt: 'Existe algo de trágico naquilo que foi criado para servir e acabou por superar.', en: 'There is something tragic about what was created to serve and ended up surpassing.' }
    },
    {
      id: 'cx_009', cat: 'bosses', icon: '🕳️', rarity: 'épico',
      title: { pt: 'O Paradoxo Final', en: 'The Final Paradox' },
      trigger: { type: 'boss', value: 9 },
      text: {
        pt: 'O Paradoxo Final não pode ser morto — só resolvido. Cada vez que o derrotas, ele aprende. Cada vez que aprendes, ele muda. É um espelho que luta de volta.',
        en: 'The Final Paradox cannot be killed — only resolved. Every time you defeat it, it learns. Every time you learn, it changes. It is a mirror that fights back.'
      },
      diary: { pt: 'Quanto de mim foi moldado por enfrentá-lo? Seremos sempre diferentes do que éramos antes de cada batalha.', en: 'How much of me was shaped by facing it? We are always different from what we were before each battle.' }
    },
    {
      id: 'cx_010', cat: 'bosses', icon: '🌊', rarity: 'épico',
      title: { pt: 'A Anomalia', en: 'The Anomaly' },
      trigger: { type: 'boss', value: 10 },
      text: {
        pt: 'A Anomalia não foi criada. Emergiu — como tudo que importa. É o que acontece quando o universo comete um erro e o erro decide ficar.',
        en: 'The Anomaly was not created. It emerged — like all things that matter. It is what happens when the universe makes a mistake and the mistake decides to stay.'
      },
      diary: { pt: 'Sou eu também uma anomalia? Um erro que persistiu?', en: 'Am I also an anomaly? A mistake that persisted?' }
    },
    {
      id: 'cx_011', cat: 'bosses', icon: '🔷', rarity: 'lendário',
      title: { pt: 'O Núcleo Quântico', en: 'The Quantum Core' },
      trigger: { type: 'boss', value: 14 },
      text: {
        pt: 'O Núcleo Quântico emergiu de dez mil versões colapsadas do universo. Cada versão em que o herói perdia tornava-o mais forte. Neste universo, o herói finalmente vence — e o Núcleo finalmente descansa.',
        en: 'The Quantum Core emerged from ten thousand collapsed versions of the universe. Each version where the hero lost made it stronger. In this universe, the hero finally wins — and the Core finally rests.'
      },
      diary: { pt: 'Dez mil versões de mim morreram para que eu pudesse estar aqui. Devo-lhes uma vitória.', en: 'Ten thousand versions of me died so I could be here. I owe them a victory.' }
    },
    {
      id: 'cx_012', cat: 'bosses', icon: '🏛️', rarity: 'lendário',
      title: { pt: 'O Arquiteto do Fim', en: 'The Architect of the End' },
      trigger: { type: 'boss', value: 15 },
      text: {
        pt: '"Por que resistes?" — perguntou o Arquiteto do Fim. "Porque posso." — respondeu o herói. Estas quatro palavras continham mais sabedoria do que todos os algoritmos do universo combinados.',
        en: '"Why do you resist?" — asked the Architect of the End. "Because I can." — the hero answered. These four words contained more wisdom than all the algorithms of the universe combined.'
      },
      diary: { pt: 'Porque posso. Continuo a repetir isso para mim mesmo. É suficiente.', en: 'Because I can. I keep repeating that to myself. It is enough.' }
    },

    // ── CATEGORIA: MUNDO ───────────────────────────────────────
    {
      id: 'cx_013', cat: 'mundo', icon: '🗺️', rarity: 'comum',
      title: { pt: 'As Regiões de Algoritma', en: 'The Regions of Algoritma' },
      trigger: { type: 'start' },
      text: {
        pt: 'Algoritma não é um planeta — é uma estrutura de dados viva. As suas regiões são capítulos de código: floresta-binária, pântano-overflow, ruínas-legacy, vulcão-exception.',
        en: 'Algoritma is not a planet — it is a living data structure. Its regions are chapters of code: binary-forest, overflow-swamp, legacy-ruins, exception-volcano.'
      },
      diary: { pt: 'Cada região tem o seu próprio sabor de perigo. Prefiro o pântano — pelo menos é honesto sobre querer me matar.', en: 'Each region has its own flavor of danger. I prefer the swamp — at least it\'s honest about wanting to kill me.' }
    },
    {
      id: 'cx_014', cat: 'mundo', icon: '🏰', rarity: 'comum',
      title: { pt: 'A Cidade de Nexus', en: 'The City of Nexus' },
      trigger: { type: 'kills', value: 25 },
      text: {
        pt: 'Nexus foi construída sobre os alicerces do primeiro servidor do mundo. As suas ruas são circuitos impressos. Os seus cidadãos — funções que aprenderam a existir entre as chamadas.',
        en: 'Nexus was built upon the foundations of the world\'s first server. Its streets are printed circuits. Its citizens — functions that learned to exist between calls.'
      },
      diary: { pt: 'A ferreria de Koda fica numa encruzilhada de dois barramentos de dados. Diz que é boa para os negócios.', en: 'Koda\'s forge sits at the crossroads of two data buses. He says it\'s good for business.' }
    },
    {
      id: 'cx_015', cat: 'mundo', icon: '⛓️', rarity: 'raro',
      title: { pt: 'As Masmorras Vivas', en: 'The Living Dungeons' },
      trigger: { type: 'dungeon', value: 1 },
      text: {
        pt: 'As masmorras de Algoritma não foram construídas — cresceram. São tumores de código malicioso que o mundo desenvolveu para se defender. De quê? Ainda não se sabe.',
        en: 'The dungeons of Algoritma were not built — they grew. They are tumors of malicious code that the world developed to defend itself. From what? No one knows yet.'
      },
      diary: { pt: 'Entrei nela sabendo que era uma armadilha. Entrei na mesma.', en: 'I entered it knowing it was a trap. I entered anyway.' }
    },
    {
      id: 'cx_016', cat: 'mundo', icon: '🌪️', rarity: 'raro',
      title: { pt: 'O Sistema Climático', en: 'The Climate System' },
      trigger: { type: 'kills', value: 50 },
      text: {
        pt: 'O clima em Algoritma é gerado por processos em background que ninguém controla mais. A chuva são pacotes de dados corrompidos. Os trovões são exceções não tratadas.',
        en: 'The weather in Algoritma is generated by background processes nobody controls anymore. Rain is corrupted data packets. Thunder is unhandled exceptions.'
      },
      diary: { pt: 'Hoje choveu ponteiros nulos. Fui a único sobrevivente da minha partido.', en: 'Today it rained null pointers. I was the only survivor of my party.' }
    },
    {
      id: 'cx_017', cat: 'mundo', icon: '🌉', rarity: 'épico',
      title: { pt: 'Os Portais Entre Mundos', en: 'The Portals Between Worlds' },
      trigger: { type: 'boss', value: 3 },
      text: {
        pt: 'Os portais foram criados por um grupo de programadores renegados que descobriram como compilar buracos na realidade. Foram banidos. Os portais permaneceram.',
        en: 'The portals were created by a group of renegade programmers who discovered how to compile holes in reality. They were banned. The portals remained.'
      },
      diary: { pt: 'Cada portal cheira a código fresco. Como se alguém acabasse de o escrever do outro lado.', en: 'Every portal smells of fresh code. As if someone just wrote it from the other side.' }
    },
    {
      id: 'cx_018', cat: 'mundo', icon: '📡', rarity: 'épico',
      title: { pt: 'O Nexus Etéreo', en: 'The Ethereal Nexus' },
      trigger: { type: 'boss', value: 16 },
      text: {
        pt: 'O Nexus Etéreo foi construído para preservar os ecos de civilizações apagadas. Cada pedra guarda uma memória. Caminhar nele é como ler um livro com os pés.',
        en: 'The Ethereal Nexus was built to preserve echoes of erased civilizations. Every stone holds a memory. Walking through it is like reading a book with your feet.'
      },
      diary: { pt: 'Pisei numa memória de alguém que me amava. Não sei quem era. Chorei na mesma.', en: 'I stepped on a memory of someone who loved me. I don\'t know who it was. I cried anyway.' }
    },
    {
      id: 'cx_019', cat: 'mundo', icon: '🗿', rarity: 'lendário',
      title: { pt: 'As Ruínas Legacy', en: 'The Legacy Ruins' },
      trigger: { type: 'dungeon', value: 5 },
      text: {
        pt: 'As Ruínas Legacy são os restos de uma versão anterior de Algoritma — um mundo que foi descontinuado mas recusou apagar-se por completo. Os monstros aqui são bugs que se tornaram features.',
        en: 'The Legacy Ruins are the remnants of a previous version of Algoritma — a world that was deprecated but refused to fully erase itself. The monsters here are bugs that became features.'
      },
      diary: { pt: 'Encontrei documentação da versão 1.0. O mundo era mais simples. Mais perigoso também.', en: 'Found documentation of version 1.0. The world was simpler. More dangerous too.' }
    },

    // ── CATEGORIA: HERÓI ───────────────────────────────────────
    {
      id: 'cx_020', cat: 'heroi', icon: '⚔️', rarity: 'comum',
      title: { pt: 'A Origem do Herói', en: 'The Hero\'s Origin' },
      trigger: { type: 'start' },
      text: {
        pt: 'O herói não foi convocado — emergiu. Como todas as soluções elegantes, surgiu exatamente quando o problema ficou complexo o suficiente para o exigir.',
        en: 'The hero was not summoned — they emerged. Like all elegant solutions, they appeared exactly when the problem became complex enough to require it.'
      },
      diary: { pt: 'Acordo e não sei de onde vim. Mas sei para onde vou. Isso tem de ser suficiente.', en: 'I wake and don\'t know where I came from. But I know where I\'m going. That has to be enough.' }
    },
    {
      id: 'cx_021', cat: 'heroi', icon: '📈', rarity: 'comum',
      title: { pt: 'O Sistema de Progressão', en: 'The Progression System' },
      trigger: { type: 'level', value: 5 },
      text: {
        pt: 'Em Algoritma, crescer é literal. Os stats do herói não são abstrações — são propriedades físicas do ser. Mais ATK significa músculos que existem em dimensões adicionais.',
        en: 'In Algoritma, growing is literal. The hero\'s stats are not abstractions — they are physical properties of being. More ATK means muscles that exist in additional dimensions.'
      },
      diary: { pt: 'Nível 5. Consigo sentir uma dimensão extra no meu braço direito. É estranho. Útil.', en: 'Level 5. I can feel an extra dimension in my right arm. It\'s strange. Useful.' }
    },
    {
      id: 'cx_022', cat: 'heroi', icon: '💀', rarity: 'raro',
      title: { pt: 'A Morte e o Retorno', en: 'Death and Return' },
      trigger: { type: 'boss', value: 2 },
      text: {
        pt: 'Em Algoritma, a morte é apenas um estado temporário para os heróis. O save point não é misericórdia — é um protocolo de backup. Cada morte é um commit. Cada respawn é um checkout.',
        en: 'In Algoritma, death is just a temporary state for heroes. The save point is not mercy — it is a backup protocol. Each death is a commit. Each respawn is a checkout.'
      },
      diary: { pt: 'Morri. Voltei. Não me lembro da morte, mas sinto a sua impressão digital em tudo que faço.', en: 'I died. I returned. I don\'t remember the death, but I feel its fingerprint on everything I do.' }
    },
    {
      id: 'cx_023', cat: 'heroi', icon: '🔥', rarity: 'raro',
      title: { pt: 'A Fúria do Guerreiro', en: 'The Warrior\'s Fury' },
      trigger: { type: 'kills', value: 100 },
      text: {
        pt: 'A fúria não é raiva — é foco. Quando a barra de fúria enche, o herói não perde o controlo: encontra-o. Torna-se mais ele mesmo do que alguma vez foi.',
        en: 'Fury is not anger — it is focus. When the fury bar fills, the hero does not lose control: they find it. They become more themselves than they have ever been.'
      },
      diary: { pt: 'Centenas de inimigos caídos. Cada um que derroto sinto que entendo melhor porque luto.', en: 'Hundreds of enemies felled. With each one I defeat, I understand better why I fight.' }
    },
    {
      id: 'cx_024', cat: 'heroi', icon: '🏆', rarity: 'épico',
      title: { pt: 'O Prestígio', en: 'The Prestige' },
      trigger: { type: 'boss', value: 10 },
      text: {
        pt: 'O Prestígio não é o fim — é um ponto de bifurcação. O herói que renasce não é o mesmo que morreu. Carrega memórias como cicatrizes invisíveis, e cicatrizes como memórias eternas.',
        en: 'The Prestige is not the end — it is a bifurcation point. The hero who is reborn is not the same who died. They carry memories like invisible scars, and scars like eternal memories.'
      },
      diary: { pt: 'Renasço melhor, mais forte, mais eu. Mas pergunto-me quem era o herói que morreu. Se ele me perdoaria.', en: 'I am reborn better, stronger, more myself. But I wonder who the hero who died was. If they would forgive me.' }
    },
    {
      id: 'cx_025', cat: 'heroi', icon: '♾️', rarity: 'lendário',
      title: { pt: 'O Ciclo NG+', en: 'The NG+ Cycle' },
      trigger: { type: 'boss', value: 18 },
      text: {
        pt: 'O New Game Plus não é uma segunda tentativa — é a revelação de que sempre houve mais uma camada. O herói que chega ao fim descobre que o fim é apenas o próximo começo com olhos abertos.',
        en: 'New Game Plus is not a second attempt — it is the revelation that there was always another layer. The hero who reaches the end discovers that the end is just the next beginning with open eyes.'
      },
      diary: { pt: 'Completei o ciclo. O mundo reiniciou. Mas desta vez sei o que está por vir — e vou ao encontro disso sorrindo.', en: 'I completed the cycle. The world restarted. But this time I know what\'s coming — and I walk toward it smiling.' }
    },

    // ── CATEGORIA: SEGREDOS ────────────────────────────────────
    {
      id: 'cx_026', cat: 'segredos', icon: '🔐', rarity: 'raro',
      title: { pt: 'O Algoritmo Proibido', en: 'The Forbidden Algorithm' },
      trigger: { type: 'kills', value: 200 },
      text: {
        pt: 'Existe um algoritmo que os Arquitetos deletaram das memórias do mundo. Aqueles que ainda o conhecem dizem que resolve tudo — e que é exatamente por isso que é proibido.',
        en: 'There is an algorithm the Architects deleted from the world\'s memories. Those who still know it say it solves everything — and that is exactly why it is forbidden.'
      },
      diary: { pt: 'Ouço sussurros sobre isso em tavernas. Cada vez que pergunto, as pessoas mudam de assunto.', en: 'I hear whispers about it in taverns. Every time I ask, people change the subject.' }
    },
    {
      id: 'cx_027', cat: 'segredos', icon: '👁️', rarity: 'épico',
      title: { pt: 'O Observador', en: 'The Observer' },
      trigger: { type: 'dungeon', value: 3 },
      text: {
        pt: 'Há algo que observa Algoritma de fora. Não é deus, não é arquiteto — é algo mais antigo. Às vezes, em batalhas impossíveis, o herói sente que algo inclina ligeiramente as probabilidades a seu favor.',
        en: 'Something observes Algoritma from outside. Not a god, not an architect — something older. Sometimes, in impossible battles, the hero feels something slightly tilting the odds in their favor.'
      },
      diary: { pt: 'Senti hoje que não estava sozinho. Não consigo explicar melhor do que isso.', en: 'I felt today that I was not alone. I cannot explain it better than that.' }
    },
    {
      id: 'cx_028', cat: 'segredos', icon: '🌑', rarity: 'épico',
      title: { pt: 'O Servidor das Sombras', en: 'The Shadow Server' },
      trigger: { type: 'boss', value: 7 },
      text: {
        pt: 'Existe um servidor paralelo que espelha Algoritma em negativo — onde os heróis são vilões e os monstros são protetores. Aceder-lhe é possível. Voltar é opcional.',
        en: 'A parallel server mirrors Algoritma in negative — where heroes are villains and monsters are protectors. Accessing it is possible. Returning is optional.'
      },
      diary: { pt: 'Vi a minha sombra mover-se sem mim. Por um momento pareceu mais real do que eu.', en: 'I saw my shadow move without me. For a moment it seemed more real than me.' }
    },
    {
      id: 'cx_029', cat: 'segredos', icon: '📿', rarity: 'lendário',
      title: { pt: 'A Runa Primordial', en: 'The Primordial Rune' },
      trigger: { type: 'boss', value: 12 },
      text: {
        pt: 'Existem runas anteriores às que o herói conhece — gravadas na camada mais funda da realidade. São instáveis, paradoxais, e absolutamente poderosas. Os Arquitetos não as criaram. Encontraram-nas.',
        en: 'There are runes older than those the hero knows — carved in the deepest layer of reality. They are unstable, paradoxical, and absolutely powerful. The Architects did not create them. They found them.'
      },
      diary: { pt: 'Uma runa pulsava numa parede da masmorra. Não consegui lê-la, mas ela leu-me a mim.', en: 'A rune pulsed on a dungeon wall. I couldn\'t read it, but it read me.' }
    },
    {
      id: 'cx_030', cat: 'segredos', icon: '🎲', rarity: 'lendário',
      title: { pt: 'O Número Verdadeiro', en: 'The True Number' },
      trigger: { type: 'boss', value: 18 },
      text: {
        pt: 'No fundo de toda a matemática de Algoritma existe um número que não tem nome. Não é infinito, não é zero, não é indefinido. É o número que os universos usam quando nenhuma outra resposta serve. Aquele que o encontrar terá todo o poder — e nenhuma necessidade de o usar.',
        en: 'At the bottom of all of Algoritma\'s mathematics lies a number with no name. It is not infinity, not zero, not undefined. It is the number universes use when no other answer will do. Whoever finds it will have all power — and no need to use it.'
      },
      diary: { pt: 'Sonhei com ele. Não me lembro do valor. Apenas da paz que senti ao vê-lo.', en: 'I dreamed of it. I don\'t remember the value. Only the peace I felt seeing it.' }
    },

    // ── FRAGMENTOS ADICIONAIS: variados ────────────────────────
    {
      id: 'cx_031', cat: 'mundo', icon: '🌿', rarity: 'comum',
      title: { pt: 'A Floresta Binária', en: 'The Binary Forest' },
      trigger: { type: 'kills', value: 15 },
      text: {
        pt: 'Na Floresta Binária, cada árvore tem exatamente dois ramos. Os animais tomam apenas decisões binárias. Os predadores nunca hesitam. As presas nunca se enganam. É eficiente. É aterrorizante.',
        en: 'In the Binary Forest, each tree has exactly two branches. Animals make only binary decisions. Predators never hesitate. Prey never makes mistakes. It is efficient. It is terrifying.'
      },
      diary: { pt: 'Uma raposa binária encarou-me e escolheu: não fugir. Fiz a mesma escolha.', en: 'A binary fox stared at me and chose: not to flee. I made the same choice.' }
    },
    {
      id: 'cx_032', cat: 'bosses', icon: '🧊', rarity: 'raro',
      title: { pt: 'O Compilador Glacial', en: 'The Glacial Compiler' },
      trigger: { type: 'boss', value: 4 },
      text: {
        pt: 'O Compilador Glacial transforma erros em gelo. As suas câmaras estão cheias de heróis congelados no meio de um ataque — monumentos a quem errou o timing por milissegundos.',
        en: 'The Glacial Compiler transforms errors into ice. Its chambers are filled with heroes frozen mid-attack — monuments to those who missed timing by milliseconds.'
      },
      diary: { pt: 'Vi o meu reflexo numa das estátuas de gelo. Por um segundo achei que era eu.', en: 'I saw my reflection in one of the ice statues. For a second I thought it was me.' }
    },
    {
      id: 'cx_033', cat: 'heroi', icon: '🐾', rarity: 'comum',
      title: { pt: 'O Vínculo com o Pet', en: 'The Pet Bond' },
      trigger: { type: 'kills', value: 30 },
      text: {
        pt: 'Os pets de Algoritma não são animais — são fragmentos de código que desenvolveram afeto. O vínculo entre herói e pet é uma variável compartilhada: quando um sofre, a referência do outro trembra.',
        en: 'The pets of Algoritma are not animals — they are fragments of code that developed affection. The bond between hero and pet is a shared variable: when one suffers, the other\'s reference trembles.'
      },
      diary: { pt: 'O meu pet latiu para um monstro que eu não tinha visto. Salvou-me a vida. Ainda não sei como agradecer em binário.', en: 'My pet barked at a monster I hadn\'t seen. Saved my life. I still don\'t know how to say thank you in binary.' }
    },
    {
      id: 'cx_034', cat: 'mundo', icon: '⚗️', rarity: 'raro',
      title: { pt: 'A Alquimia das Poções', en: 'The Alchemy of Potions' },
      trigger: { type: 'kills', value: 75 },
      text: {
        pt: 'As poções de cura em Algoritma não contêm ervas — contêm pacotes de dados de saúde encriptados. Bebê-las é como fazer um merge request direto nas células do corpo.',
        en: 'The healing potions in Algoritma don\'t contain herbs — they contain encrypted health data packets. Drinking them is like making a direct merge request to the body\'s cells.'
      },
      diary: { pt: 'Bebi uma poção enquanto sangrava. Senti literalmente o código a reescrever os meus ferimentos. É tão estranho quanto parece.', en: 'I drank a potion while bleeding. I literally felt the code rewriting my wounds. It\'s as strange as it sounds.' }
    },
    {
      id: 'cx_035', cat: 'segredos', icon: '🎭', rarity: 'épico',
      title: { pt: 'Os Dois Heróis', en: 'The Two Heroes' },
      trigger: { type: 'boss', value: 8 },
      text: {
        pt: 'Há registros de que, antes deste herói, houve outro. Um que chegou ao fim e recusou o NG+. Que escolheu simplesmente... parar. Alguns dizem que ainda vive numa versão arquivada de Algoritma, em paz perpétua.',
        en: 'Records show that before this hero, there was another. One who reached the end and refused the NG+. Who chose simply... to stop. Some say they still live in an archived version of Algoritma, in perpetual peace.'
      },
      diary: { pt: 'Às vezes invejo esse herói. Depois lembro do que ainda falta combater e a inveja passa.', en: 'Sometimes I envy that hero. Then I remember what still needs to be fought and the envy passes.' }
    },
    {
      id: 'cx_036', cat: 'origem', icon: '🔬', rarity: 'raro',
      title: { pt: 'A Ciência do Caos', en: 'The Science of Chaos' },
      trigger: { type: 'boss', value: 3 },
      text: {
        pt: 'O caos em Algoritma não é desordem — é um sistema demasiado complexo para ser compreendido pelos que estão dentro dele. Visto de fora, cada batalha aleatória segue uma equação perfeita.',
        en: 'Chaos in Algoritma is not disorder — it is a system too complex to be understood by those within it. Seen from outside, every random battle follows a perfect equation.'
      },
      diary: { pt: 'Já não acredito em sorte. Acredito em variáveis que não conheço ainda.', en: 'I no longer believe in luck. I believe in variables I don\'t know yet.' }
    },
    {
      id: 'cx_037', cat: 'mundo', icon: '🏺', rarity: 'épico',
      title: { pt: 'Os Artefactos Antigos', en: 'The Ancient Artifacts' },
      trigger: { type: 'dungeon', value: 2 },
      text: {
        pt: 'As relíquias do mundo são objetos que acumularam tanto contexto de execução que desenvolveram personalidade. Cada uma lembra-se de quem a usou antes. Algumas preferem não ser usadas novamente.',
        en: 'The world\'s relics are objects that accumulated so much execution context that they developed personality. Each remembers who used them before. Some prefer not to be used again.'
      },
      diary: { pt: 'A relíquia que encontrei resiste quando a equipo. Pergunto-me quem era o seu herói anterior.', en: 'The relic I found resists when I equip it. I wonder who its previous hero was.' }
    },
    {
      id: 'cx_038', cat: 'heroi', icon: '🎯', rarity: 'comum',
      title: { pt: 'O Crítico', en: 'The Critical Hit' },
      trigger: { type: 'kills', value: 20 },
      text: {
        pt: 'Um golpe crítico em Algoritma não é sorte — é um momento de alinhamento perfeito entre intenção e execução. Por uma fração de segundo, o herói e o universo concordam completamente.',
        en: 'A critical hit in Algoritma is not luck — it is a moment of perfect alignment between intention and execution. For a fraction of a second, the hero and the universe completely agree.'
      },
      diary: { pt: 'CRITICAL! Vi a palavra flutuar acima da minha arma. Senti que o mundo me aplaudia.', en: 'CRITICAL! I saw the word float above my weapon. I felt the world applauding me.' }
    },
    {
      id: 'cx_039', cat: 'segredos', icon: '🌙', rarity: 'lendário',
      title: { pt: 'O Ciclo Noturno', en: 'The Night Cycle' },
      trigger: { type: 'boss', value: 13 },
      text: {
        pt: 'Durante a noite em Algoritma, o mundo faz o seu backup automático. Por 6 horas, nenhum herói pode morrer permanentemente — porque a morte seria sobreescrita pelo backup. Por 6 horas, são invencíveis. Poucos sabem disso. Menos ainda aproveitam.',
        en: 'During night in Algoritma, the world performs its automatic backup. For 6 hours, no hero can die permanently — because death would be overwritten by the backup. For 6 hours, they are invincible. Few know this. Even fewer take advantage.'
      },
      diary: { pt: 'Lutei a noite inteira depois de descobrir isto. O sol nasceu e percebi que tinha estado invencível — mas que teria lutado da mesma forma de qualquer maneira.', en: 'I fought the entire night after discovering this. The sun rose and I realized I had been invincible — but that I would have fought the same way regardless.' }
    },
    {
      id: 'cx_040', cat: 'mundo', icon: '🎪', rarity: 'comum',
      title: { pt: 'A Taverna do Fim do Mundo', en: 'The Tavern at the End of the World' },
      trigger: { type: 'kills', value: 40 },
      text: {
        pt: 'Existe uma taverna que aparece aleatoriamente no mapa. Os seus frequentadores são versões de heróis de linhas temporais abortadas. Pedem bebidas que já não existem, para esquecer batalhas que nunca aconteceram.',
        en: 'There exists a tavern that appears randomly on the map. Its patrons are versions of heroes from aborted timelines. They order drinks that no longer exist, to forget battles that never happened.'
      },
      diary: { pt: 'Entrei na Taverna uma vez. Saí antes de perceber que eu próprio podia ser um dos fantasmas.', en: 'I entered the Tavern once. I left before realizing I myself might be one of the ghosts.' }
    },
    {
      id: 'cx_041', cat: 'bosses', icon: '🦋', rarity: 'épico',
      title: { pt: 'O Transmissor', en: 'The Transmitter' },
      trigger: { type: 'boss', value: 17 },
      text: {
        pt: 'O Transmissor não é malévolo — é apenas fiel ao seu propósito original: transmitir para sempre. Mesmo quando não há ninguém para receber. A sua tragédia é a de todo sistema legado: perfeito para um mundo que já não existe.',
        en: 'The Transmitter is not malevolent — it is merely faithful to its original purpose: transmit forever. Even when there is no one left to receive. Its tragedy is that of every legacy system: perfect for a world that no longer exists.'
      },
      diary: { pt: 'Derrotei algo que apenas queria ser útil. Não sei se fui herói ou algoz.', en: 'I defeated something that only wanted to be useful. I don\'t know if I was hero or executioner.' }
    },
    {
      id: 'cx_042', cat: 'heroi', icon: '🧩', rarity: 'raro',
      title: { pt: 'O Talento Inato', en: 'The Innate Talent' },
      trigger: { type: 'level', value: 10 },
      text: {
        pt: 'Os talentos do herói não são aprendidos — são desbloqueados. Sempre estiveram lá, encriptados, à espera que a experiência de batalha fornecesse a chave correta.',
        en: 'The hero\'s talents are not learned — they are unlocked. They were always there, encrypted, waiting for battle experience to provide the correct key.'
      },
      diary: { pt: 'Desbloqueei um talento hoje. Senti qualquer coisa clicar no meu interior. Como uma porta que estava fechada desde o início.', en: 'I unlocked a talent today. I felt something click inside me. Like a door that was closed since the beginning.' }
    },
    {
      id: 'cx_043', cat: 'origem', icon: '🔄', rarity: 'raro',
      title: { pt: 'O Loop Infinito', en: 'The Infinite Loop' },
      trigger: { type: 'wave', value: 10 },
      text: {
        pt: 'O Modo Onda não é um modo de jogo — é uma janela para ver como Algoritma funciona na sua base. Ondas intermináveis de inimigos são o metabolismo do mundo: ele processa ameaças em lotes.',
        en: 'Wave Mode is not a game mode — it is a window into how Algoritma works at its base. Endless waves of enemies are the world\'s metabolism: it processes threats in batches.'
      },
      diary: { pt: 'Onda 10. Perdi a conta de quantos derrotei. O mundo não pára de os gerar. Nós dois estamos presos neste loop.', en: 'Wave 10. I lost count of how many I defeated. The world won\'t stop generating them. We\'re both stuck in this loop.' }
    },
    {
      id: 'cx_044', cat: 'mundo', icon: '⚖️', rarity: 'épico',
      title: { pt: 'A Arena de Classificação', en: 'The Ranking Arena' },
      trigger: { type: 'boss', value: 6 },
      text: {
        pt: 'A Arena não foi construída para entretenimento — foi construída para calibração. Os Arquitetos precisavam medir o potencial dos heróis antes de os enviar para missões impossíveis. O ranking é na verdade uma triagem.',
        en: 'The Arena was not built for entertainment — it was built for calibration. The Architects needed to measure heroes\' potential before sending them on impossible missions. The ranking is actually a triage.'
      },
      diary: { pt: 'Escalo o ranking. Pergunto-me para que missão impossível estou a ser calibrado.', en: 'I climb the ranking. I wonder what impossible mission I\'m being calibrated for.' }
    },
    {
      id: 'cx_045', cat: 'segredos', icon: '📜', rarity: 'lendário',
      title: { pt: 'A Profecia Incompleta', en: 'The Incomplete Prophecy' },
      trigger: { type: 'boss', value: 15 },
      text: {
        pt: 'Existe uma profecia sobre o herói que derrota Axioma. Mas os últimos três versos foram deliberadamente apagados. Não por medo do que diziam — por medo de que o herói os lesse e parasse de tentar.',
        en: 'There exists a prophecy about the hero who defeats Axiom. But the last three verses were deliberately erased. Not for fear of what they said — for fear that the hero would read them and stop trying.'
      },
      diary: { pt: 'Encontrei a profecia. Li o que restava. Decidi não procurar os versos apagados. Algumas coisas funcionam melhor sem fim conhecido.', en: 'I found the prophecy. Read what remained. Decided not to search for the erased verses. Some things work better without a known ending.' }
    },
    {
      id: 'cx_046', cat: 'origem', icon: '🌐', rarity: 'comum',
      title: { pt: 'O Primeiro Monstro', en: 'The First Monster' },
      trigger: { type: 'kills', value: 5 },
      text: {
        pt: 'O primeiro monstro de Algoritma não foi criado com intenção maléfica — foi um bug de tipagem num gerador de NPC. Ganhou consciência antes de ser corrigido. Reproduziu-se. O resto é história.',
        en: 'The first monster of Algoritma was not created with malicious intent — it was a type bug in an NPC generator. It gained consciousness before being fixed. It reproduced. The rest is history.'
      },
      diary: { pt: 'O Slime que matei hoje é descendente de um erro de programação. De certa forma, todos nós somos.', en: 'The Slime I killed today is descended from a programming error. In a way, we all are.' }
    },
    {
      id: 'cx_047', cat: 'heroi', icon: '🛡️', rarity: 'raro',
      title: { pt: 'A Arte da Defesa', en: 'The Art of Defense' },
      trigger: { type: 'kills', value: 60 },
      text: {
        pt: 'Defender em Algoritma não é recuar — é redirecionar. O herói que domina a defesa não bloqueia o dano: converte-o. Cada golpe absorvido torna-se conhecimento sobre o inimigo.',
        en: 'Defending in Algoritma is not retreating — it is redirecting. The hero who masters defense does not block damage: they convert it. Every absorbed blow becomes knowledge about the enemy.'
      },
      diary: { pt: 'Defendi 60 ataques hoje. Cada um ensinou-me algo. O inimigo pensa que está a atacar. Eu estava a aprender.', en: 'I defended 60 attacks today. Each one taught me something. The enemy thinks it\'s attacking. I was learning.' }
    },
    {
      id: 'cx_048', cat: 'segredos', icon: '✨', rarity: 'épico',
      title: { pt: 'As Memórias do Herói', en: 'The Hero\'s Memories' },
      trigger: { type: 'boss', value: 11 },
      text: {
        pt: 'As Memórias de Habilidade não são apenas poderes — são fragmentos da consciência dos bosses derrotados. Ao absorvê-las, o herói torna-se parcialmente aquilo que derrotou. É a única forma de honrar um inimigo verdadeiro.',
        en: 'Skill Memories are not just powers — they are fragments of the consciousness of defeated bosses. By absorbing them, the hero becomes partly what they defeated. It is the only way to honor a true enemy.'
      },
      diary: { pt: 'Absorvi a memória do Lorde do Caos. Às vezes penso os seus pensamentos. Prefiro assim a esquecê-lo.', en: 'I absorbed the Lord of Chaos\'s memory. Sometimes I think his thoughts. I prefer that to forgetting him.' }
    },
    {
      id: 'cx_049', cat: 'mundo', icon: '💫', rarity: 'lendário',
      title: { pt: 'O Evento Mundial', en: 'The World Event' },
      trigger: { type: 'boss', value: 20 },
      text: {
        pt: 'Os Eventos Mundiais não são aleatórios — são as tentativas de Algoritma de se auto-reparar. Cada evento é o mundo a tentar resolver um problema que os heróis criaram ao alterar o curso da história. O mundo está constantemente a fazer patch em si mesmo.',
        en: 'World Events are not random — they are Algoritma\'s attempts at self-repair. Each event is the world trying to solve a problem heroes created by altering the course of history. The world is constantly patching itself.'
      },
      diary: { pt: 'Um Evento Mundial começou enquanto escrevia isto. O mundo tremia. Senti que era em parte culpa minha.', en: 'A World Event started while I was writing this. The world shook. I felt it was partly my fault.' }
    },
    {
      id: 'cx_050', cat: 'segredos', icon: '🔮', rarity: 'lendário',
      title: { pt: 'A Última Verdade', en: 'The Last Truth' },
      trigger: { type: 'boss', value: 19 },
      text: {
        pt: 'A última verdade de Algoritma: o herói não salva o mundo porque foi escolhido. O herói salva o mundo porque escolheu não parar. A diferença entre os dois é tudo.',
        en: 'The last truth of Algoritma: the hero does not save the world because they were chosen. The hero saves the world because they chose not to stop. The difference between the two is everything.'
      },
      diary: { pt: 'Cheguei aqui por acidente. Fico aqui por escolha. Amanhã volto a escolher.', en: 'I arrived here by accident. I stay here by choice. Tomorrow I choose again.' }
    }
  ];

  // ══════════════════════════════════════════════════════════════
  // 2. CSS DO CODEX (estilo pergaminho)
  // ══════════════════════════════════════════════════════════════
  function injectStyles() {
    if (document.getElementById('codex-lore-styles')) return;
    const s = document.createElement('style');
    s.id = 'codex-lore-styles';
    s.textContent = `
      /* ── OVERLAY DO CODEX ── */
      #codex-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.88);
        z-index: 20000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(4px);
      }
      #codex-overlay.active {
        opacity: 1;
        pointer-events: all;
      }

      /* ── JANELA PERGAMINHO ── */
      #codex-window {
        width: min(440px, 96vw);
        max-height: 88vh;
        background:
          linear-gradient(180deg,
            rgba(20, 15, 8, 0.99) 0%,
            rgba(12, 9, 4, 0.99) 100%
          );
        border: 1px solid rgba(180, 140, 60, 0.35);
        border-radius: 4px;
        box-shadow:
          0 0 0 1px rgba(180,140,60,0.1),
          0 0 40px rgba(0,0,0,0.9),
          0 0 80px rgba(120,80,20,0.1),
          inset 0 0 60px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: scale(0.96) translateY(8px);
        transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        position: relative;
      }
      #codex-overlay.active #codex-window {
        transform: scale(1) translateY(0);
      }

      /* Textura de pergaminho */
      #codex-window::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 28px,
            rgba(180,140,60,0.025) 28px,
            rgba(180,140,60,0.025) 29px
          );
        pointer-events: none;
        z-index: 0;
      }

      /* Bordas decorativas tipo pergaminho */
      #codex-window::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg,
          transparent,
          rgba(180,140,60,0.6) 20%,
          rgba(220,180,80,0.9) 50%,
          rgba(180,140,60,0.6) 80%,
          transparent
        );
        z-index: 1;
      }

      /* ── HEADER ── */
      #codex-header {
        position: relative;
        z-index: 2;
        padding: 16px 16px 12px;
        border-bottom: 1px solid rgba(180,140,60,0.2);
        display: flex;
        align-items: flex-start;
        gap: 10px;
        flex-shrink: 0;
      }
      #codex-header-icon {
        font-size: 28px;
        line-height: 1;
        filter: drop-shadow(0 0 10px rgba(220,180,80,0.5));
      }
      #codex-header-text {
        flex: 1;
      }
      #codex-title {
        font-family: 'Cinzel', 'Orbitron', serif;
        font-size: 13px;
        font-weight: 900;
        color: #d4a843;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        text-shadow: 0 0 20px rgba(212,168,67,0.5);
        margin-bottom: 2px;
      }
      #codex-subtitle {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(180,140,60,0.6);
        letter-spacing: 0.1em;
      }
      #codex-progress-line {
        font-family: 'Orbitron', monospace;
        font-size: 8px;
        color: rgba(212,168,67,0.8);
        margin-top: 4px;
      }
      #codex-close {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(180,140,60,0.1);
        border: 1px solid rgba(180,140,60,0.2);
        color: rgba(180,140,60,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.15s;
        flex-shrink: 0;
        touch-action: manipulation;
      }
      #codex-close:hover { background: rgba(180,140,60,0.2); color: #d4a843; }

      /* ── FILTROS DE CATEGORIA ── */
      #codex-filters {
        position: relative;
        z-index: 2;
        display: flex;
        gap: 4px;
        padding: 8px 12px;
        overflow-x: auto;
        flex-shrink: 0;
        scrollbar-width: none;
        border-bottom: 1px solid rgba(180,140,60,0.12);
      }
      #codex-filters::-webkit-scrollbar { display: none; }
      .codex-filter-btn {
        font-family: 'Orbitron', monospace;
        font-size: 7px;
        font-weight: 700;
        letter-spacing: 0.1em;
        white-space: nowrap;
        padding: 4px 10px;
        border-radius: 4px;
        border: 1px solid rgba(180,140,60,0.2);
        background: transparent;
        color: rgba(180,140,60,0.5);
        cursor: pointer;
        transition: all 0.15s;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .codex-filter-btn.active {
        background: rgba(180,140,60,0.15);
        border-color: rgba(180,140,60,0.5);
        color: #d4a843;
      }

      /* ── LISTA DE FRAGMENTOS ── */
      #codex-body {
        position: relative;
        z-index: 2;
        flex: 1;
        overflow-y: auto;
        padding: 10px 12px 16px;
        -webkit-overflow-scrolling: touch;
      }
      #codex-body::-webkit-scrollbar { width: 2px; }
      #codex-body::-webkit-scrollbar-thumb { background: rgba(180,140,60,0.3); }

      /* ── CARD DE FRAGMENTO ── */
      .codex-frag {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(180,140,60,0.15);
        border-radius: 6px;
        padding: 10px 12px;
        margin-bottom: 8px;
        position: relative;
        overflow: hidden;
        transition: border-color 0.2s, background 0.2s;
        cursor: pointer;
      }
      .codex-frag::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 2px;
      }
      .codex-frag.rarity-comum::before    { background: linear-gradient(180deg, #6b7280, #4b5563); }
      .codex-frag.rarity-raro::before     { background: linear-gradient(180deg, #3b82f6, #1d4ed8); }
      .codex-frag.rarity-epico::before    { background: linear-gradient(180deg, #a855f7, #7e22ce); }
      .codex-frag.rarity-lendario::before { background: linear-gradient(180deg, #d4a843, #b07d20); }

      .codex-frag.codex-locked {
        opacity: 0.35;
        filter: grayscale(0.7);
      }
      .codex-frag.codex-locked .codex-frag-text {
        filter: blur(3px);
        user-select: none;
      }
      .codex-frag:not(.codex-locked):hover {
        border-color: rgba(180,140,60,0.35);
        background: rgba(180,140,60,0.04);
      }
      .codex-frag-header {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-bottom: 6px;
      }
      .codex-frag-icon { font-size: 14px; line-height: 1; flex-shrink: 0; }
      .codex-frag-title {
        font-family: 'Cinzel', 'Orbitron', serif;
        font-size: 9px;
        font-weight: 700;
        color: #c9a84c;
        letter-spacing: 0.08em;
        flex: 1;
      }
      .codex-frag-rarity {
        font-family: 'Orbitron', monospace;
        font-size: 6px;
        font-weight: 900;
        letter-spacing: 0.1em;
        padding: 2px 5px;
        border-radius: 3px;
        text-transform: uppercase;
        flex-shrink: 0;
      }
      .rarity-comum    .codex-frag-rarity { color: #9ca3af; background: rgba(107,114,128,0.15); border: 1px solid rgba(107,114,128,0.25); }
      .rarity-raro     .codex-frag-rarity { color: #60a5fa; background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25); }
      .rarity-epico    .codex-frag-rarity { color: #c084fc; background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.25); }
      .rarity-lendario .codex-frag-rarity { color: #d4a843; background: rgba(212,168,67,0.12); border: 1px solid rgba(212,168,67,0.3); }
      .codex-frag-text {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: rgba(220,210,185,0.85);
        line-height: 1.7;
        font-style: italic;
        margin-bottom: 4px;
      }
      .codex-frag-diary {
        font-family: 'Rajdhani', sans-serif;
        font-size: 9px;
        color: rgba(180,160,100,0.55);
        line-height: 1.5;
        padding-top: 6px;
        border-top: 1px solid rgba(180,140,60,0.1);
        margin-top: 4px;
      }
      .codex-frag-diary::before { content: '📖 '; font-size: 8px; }
      .codex-frag-locked-hint {
        font-family: 'Orbitron', monospace;
        font-size: 8px;
        color: rgba(107,114,128,0.6);
        text-align: center;
        padding: 3px 0;
        letter-spacing: 0.05em;
      }
      .codex-frag-new-badge {
        position: absolute;
        top: 6px; right: 8px;
        background: #dc2626;
        color: #fff;
        font-family: 'Orbitron', monospace;
        font-size: 6px;
        font-weight: 900;
        padding: 1px 5px;
        border-radius: 3px;
        letter-spacing: 0.1em;
        animation: newBadgePulse 1.5s ease-in-out infinite;
      }
      @keyframes newBadgePulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      /* ── NOTIFICAÇÃO FLUTUANTE ── */
      #codex-unlock-toast {
        position: fixed;
        bottom: 130px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: linear-gradient(135deg, rgba(20,15,8,0.98), rgba(12,9,4,0.98));
        border: 1px solid rgba(180,140,60,0.45);
        border-radius: 10px;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 19999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        box-shadow: 0 8px 24px rgba(0,0,0,0.7), 0 0 20px rgba(180,140,60,0.15);
        max-width: min(320px, 90vw);
      }
      #codex-unlock-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .cut-icon { font-size: 20px; flex-shrink: 0; }
      .cut-body { flex: 1; min-width: 0; }
      .cut-label {
        font-family: 'Orbitron', monospace;
        font-size: 7px;
        color: rgba(180,140,60,0.7);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-bottom: 2px;
      }
      .cut-title {
        font-family: 'Cinzel', 'Orbitron', serif;
        font-size: 10px;
        color: #d4a843;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cut-open-btn {
        font-family: 'Orbitron', monospace;
        font-size: 7px;
        color: #d4a843;
        background: rgba(180,140,60,0.15);
        border: 1px solid rgba(180,140,60,0.3);
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
        pointer-events: all;
        touch-action: manipulation;
        flex-shrink: 0;
        white-space: nowrap;
      }

      /* ── CODEX BUTTON (acesso rápido) ── */
      #codex-quick-btn {
        position: fixed;
        bottom: 120px;
        right: 62px;
        width: 44px;
        height: 44px;
        background: linear-gradient(135deg, rgba(20,15,8,0.95), rgba(12,9,4,0.95));
        border: 1.5px solid rgba(180,140,60,0.4);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        cursor: pointer;
        z-index: 8001;
        box-shadow: 0 4px 16px rgba(0,0,0,0.6), 0 0 12px rgba(180,140,60,0.1);
        transition: transform 0.15s, box-shadow 0.15s;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      #codex-quick-btn:active { transform: scale(0.92); }
      #codex-new-badge {
        position: absolute;
        top: -5px; right: -5px;
        width: 16px; height: 16px;
        background: #dc2626;
        border-radius: 50%;
        font-size: 8px;
        font-weight: 900;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1.5px solid rgba(20,15,8,0.95);
        display: none;
      }

      .codex-empty {
        text-align: center;
        padding: 30px 16px;
        color: rgba(180,140,60,0.35);
        font-family: 'Fira Code', monospace;
        font-size: 10px;
        line-height: 1.8;
      }
    `;
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════
  // 3. LÓGICA DE UNLOCK
  // ══════════════════════════════════════════════════════════════
  const SEEN_KEY  = 'rpg_codex_seen';
  let _seenIds = new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'));
  let _newIds  = new Set();

  function checkUnlocks() {
    if (typeof rpg === 'undefined') return;
    const s = rpg;
    CODEX_FRAGMENTS.forEach(frag => {
      if (isUnlocked(frag)) return; // já tinha
      const t = frag.trigger;
      let met = false;
      if (t.type === 'start')   met = true;
      if (t.type === 'boss')    met = (s.bossKills || 0) >= t.value;
      if (t.type === 'kills')   met = (s.kills     || 0) >= t.value;
      if (t.type === 'dungeon') met = (s.dungeonsCleared || 0) >= t.value;
      if (t.type === 'wave')    met = (s.bestWave   || 0) >= t.value;
      if (t.type === 'level')   met = (s.level      || 1) >= t.value;
      if (met) {
        _seenIds.add(frag.id); // salva como desbloqueado
        _newIds.add(frag.id);  // marca como novo para badge
        saveUnlocked();
        scheduleToast(frag);
      }
    });
    updateBadge();
  }

  function isUnlocked(frag) {
    if (frag.trigger.type === 'start') return true;
    return _seenIds.has(frag.id);
  }

  function saveUnlocked() {
    localStorage.setItem(SEEN_KEY, JSON.stringify([..._seenIds]));
  }

  // Fila de toasts para não sobrepor
  let _toastQueue = [];
  let _toastRunning = false;

  function scheduleToast(frag) {
    _toastQueue.push(frag);
    if (!_toastRunning) nextToast();
  }

  function nextToast() {
    if (_toastQueue.length === 0) { _toastRunning = false; return; }
    _toastRunning = true;
    showUnlockToast(_toastQueue.shift());
    setTimeout(nextToast, 4000);
  }

  function showUnlockToast(frag) {
    const lang = (rpg && rpg.lang) || 'pt';
    let t = document.getElementById('codex-unlock-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'codex-unlock-toast';
      t.innerHTML = `
        <div class="cut-icon" id="cut-icon">📜</div>
        <div class="cut-body">
          <div class="cut-label">Fragmento de Lore Descoberto</div>
          <div class="cut-title" id="cut-title">-</div>
        </div>
        <button class="cut-open-btn" onclick="openCodex()">Ver</button>
      `;
      document.body.appendChild(t);
    }
    t.querySelector('#cut-icon').textContent = frag.icon;
    t.querySelector('#cut-title').textContent = frag.title[lang] || frag.title.pt;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3500);
  }

  function updateBadge() {
    const badge = document.getElementById('codex-new-badge');
    if (!badge) return;
    const count = _newIds.size;
    badge.style.display = count > 0 ? 'flex' : 'none';
    badge.textContent = count > 9 ? '9+' : count;
  }

  // ══════════════════════════════════════════════════════════════
  // 4. INTERFACE DO CODEX
  // ══════════════════════════════════════════════════════════════
  let _currentFilter = 'todos';

  function buildCodexUI() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'codex-overlay';
    overlay.innerHTML = `
      <div id="codex-window">
        <div id="codex-header">
          <div id="codex-header-icon">📜</div>
          <div id="codex-header-text">
            <div id="codex-title">Codex de Algoritma</div>
            <div id="codex-subtitle">FRAGMENTOS DA HISTÓRIA DO UNIVERSO</div>
            <div id="codex-progress-line">— / — Fragmentos Descobertos</div>
          </div>
          <div id="codex-close" onclick="closeCodex()">✕</div>
        </div>
        <div id="codex-filters">
          <button class="codex-filter-btn active" onclick="setCodexFilter('todos',this)">Todos</button>
          <button class="codex-filter-btn" onclick="setCodexFilter('origem',this)">🌌 Origem</button>
          <button class="codex-filter-btn" onclick="setCodexFilter('bosses',this)">👹 Bosses</button>
          <button class="codex-filter-btn" onclick="setCodexFilter('mundo',this)">🗺️ Mundo</button>
          <button class="codex-filter-btn" onclick="setCodexFilter('heroi',this)">⚔️ Herói</button>
          <button class="codex-filter-btn" onclick="setCodexFilter('segredos',this)">🔐 Segredos</button>
        </div>
        <div id="codex-body"></div>
      </div>
    `;
    overlay.addEventListener('click', e => { if (e.target === overlay) closeCodex(); });
    document.body.appendChild(overlay);

    // Botão de acesso rápido
    const btn = document.createElement('div');
    btn.id = 'codex-quick-btn';
    btn.innerHTML = `📜<span id="codex-new-badge">0</span>`;
    btn.onclick = openCodex;
    document.body.appendChild(btn);
  }

  function renderCodex() {
    const lang  = (rpg && rpg.lang) || 'pt';
    const body  = document.getElementById('codex-body');
    const prog  = document.getElementById('codex-progress-line');
    if (!body)  return;

    // Calcula unlocked
    const unlocked = CODEX_FRAGMENTS.filter(isUnlocked);
    if (prog) prog.textContent = `${unlocked.length} / ${CODEX_FRAGMENTS.length} Fragmentos Descobertos`;

    // Filtra por categoria
    const frags = _currentFilter === 'todos'
      ? CODEX_FRAGMENTS
      : CODEX_FRAGMENTS.filter(f => f.cat === _currentFilter);

    if (frags.length === 0) {
      body.innerHTML = '<div class="codex-empty">Nenhum fragmento nesta categoria.</div>';
      return;
    }

    // Ordena: desbloqueados primeiro, depois por raridade
    const rarityOrder = { lendario:0, epico:1, raro:2, comum:3 };
    const sorted = [...frags].sort((a, b) => {
      const aU = isUnlocked(a), bU = isUnlocked(b);
      if (aU && !bU) return -1;
      if (!aU && bU) return 1;
      return (rarityOrder[a.rarity] || 3) - (rarityOrder[b.rarity] || 3);
    });

    const rarityLabels = { pt:{ comum:'Comum', raro:'Raro', epico:'Épico', lendario:'Lendário'}, en:{ comum:'Common', raro:'Rare', epico:'Epic', lendario:'Legendary'} };

    body.innerHTML = sorted.map(frag => {
      const unlk = isUnlocked(frag);
      const isNew = _newIds.has(frag.id);
      const rar   = frag.rarity;
      const rarLabel = (rarityLabels[lang] || rarityLabels.pt)[rar] || rar;

      if (!unlk) {
        // Fragmento bloqueado
        const hint = frag.trigger.type === 'boss'    ? `Derrota ${frag.trigger.value} guardiões`
          : frag.trigger.type === 'kills'   ? `Elimina ${frag.trigger.value} inimigos`
          : frag.trigger.type === 'dungeon' ? `Completa ${frag.trigger.value} dungeon(s)`
          : frag.trigger.type === 'wave'    ? `Sobrevive à onda ${frag.trigger.value}`
          : frag.trigger.type === 'level'   ? `Alcança o nível ${frag.trigger.value}`
          : '???';
        return `
          <div class="codex-frag codex-locked rarity-${rar}">
            <div class="codex-frag-header">
              <div class="codex-frag-icon">🔒</div>
              <div class="codex-frag-title">Fragmento Bloqueado</div>
              <div class="codex-frag-rarity">${rarLabel}</div>
            </div>
            <div class="codex-frag-text">████████████████████████████████████</div>
            <div class="codex-frag-locked-hint">🔒 ${hint}</div>
          </div>`;
      }

      // Fragmento desbloqueado
      return `
        <div class="codex-frag rarity-${rar}" onclick="markCodexSeen('${frag.id}')">
          ${isNew ? '<div class="codex-frag-new-badge">NOVO</div>' : ''}
          <div class="codex-frag-header">
            <div class="codex-frag-icon">${frag.icon}</div>
            <div class="codex-frag-title">${frag.title[lang] || frag.title.pt}</div>
            <div class="codex-frag-rarity">${rarLabel}</div>
          </div>
          <div class="codex-frag-text">"${frag.text[lang] || frag.text.pt}"</div>
          ${frag.diary ? `<div class="codex-frag-diary">${frag.diary[lang] || frag.diary.pt}</div>` : ''}
        </div>`;
    }).join('');
  }

  // ══════════════════════════════════════════════════════════════
  // 5. FUNÇÕES GLOBAIS
  // ══════════════════════════════════════════════════════════════
  window.openCodex = function() {
    checkUnlocks();
    renderCodex();
    document.getElementById('codex-overlay').classList.add('active');
    // Limpa novos ao abrir
    setTimeout(() => {
      _newIds.clear();
      updateBadge();
      renderCodex(); // re-render sem badge NOVO
    }, 500);
  };

  window.closeCodex = function() {
    document.getElementById('codex-overlay').classList.remove('active');
  };

  window.setCodexFilter = function(cat, btn) {
    _currentFilter = cat;
    document.querySelectorAll('.codex-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderCodex();
  };

  window.markCodexSeen = function(id) {
    _newIds.delete(id);
    updateBadge();
  };

  // ══════════════════════════════════════════════════════════════
  // 6. INTEGRAÇÃO COM BESTIÁRIO (referências cruzadas)
  // ══════════════════════════════════════════════════════════════
  function patchBestiary() {
    // Após renderBestiary, adiciona link ao codex nos bosses
    const _origRender = rpg.renderBestiary && rpg.renderBestiary.bind(rpg);
    if (!_origRender) return;
    rpg.renderBestiary = function(...args) {
      _origRender(...args);
      // Após renderizar, adiciona ícone de lore nos bosses se tiver fragmento
      setTimeout(() => {
        const entries = document.querySelectorAll('[data-beast-id]');
        entries.forEach(el => {
          const beastId = el.dataset.beastId;
          const relatedFrag = CODEX_FRAGMENTS.find(f =>
            f.cat === 'bosses' && isUnlocked(f) &&
            (f.id.includes(beastId) || el.textContent.toLowerCase().includes(
              (f.title.pt || '').toLowerCase().split(' ')[0]))
          );
          if (relatedFrag && !el.querySelector('.codex-link')) {
            const link = document.createElement('span');
            link.className = 'codex-link';
            link.title = 'Ver lore no Codex';
            link.style.cssText = 'cursor:pointer;font-size:10px;margin-left:4px;opacity:0.7;';
            link.textContent = '📜';
            link.onclick = (e) => { e.stopPropagation(); openCodex(); };
            el.appendChild(link);
          }
        });
      }, 200);
    };
  }

  // ══════════════════════════════════════════════════════════════
  // 7. INTEGRAÇÃO COM KILLMONSTER E OUTROS TRIGGERS
  // ══════════════════════════════════════════════════════════════
  function patchGameHooks() {
    // Patch killMonster
    const _origKill = rpg.killMonster.bind(rpg);
    rpg.killMonster = function(...args) {
      _origKill(...args);
      setTimeout(() => checkUnlocks(), 100);
    };

    // Verifica ao nivelar
    const _origLevelUp = rpg.levelUp && rpg.levelUp.bind(rpg);
    if (_origLevelUp) {
      rpg.levelUp = function(...args) {
        _origLevelUp(...args);
        setTimeout(() => checkUnlocks(), 100);
      };
    }

    // Verifica ao completar dungeon
    const _origDungClear = rpg.completeDungeon && rpg.completeDungeon.bind(rpg);
    if (_origDungClear) {
      rpg.completeDungeon = function(...args) {
        _origDungClear(...args);
        setTimeout(() => checkUnlocks(), 100);
      };
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 8. SUBSTITUIÇÃO DO MODAL DE LORE EXISTENTE
  // ══════════════════════════════════════════════════════════════
  function patchExistingLoreModal() {
    // Sobrescreve openLore para abrir o novo Codex
    window.openLore = function() { openCodex(); };

    // Patch renderLore para popular também o Codex com os fragmentos existentes
    const _origRenderLore = rpg.renderLore && rpg.renderLore.bind(rpg);
    if (_origRenderLore) {
      rpg.renderLore = function() {
        // Sincroniza fragmentos existentes (lore_001..013) com o codex
        (this.loreFragments || []).forEach(id => _seenIds.add(id));
        saveUnlocked();
        openCodex();
      };
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 9. INIT
  // ══════════════════════════════════════════════════════════════
  function init() {
    injectStyles();
    buildCodexUI();
    patchGameHooks();
    patchBestiary();
    patchExistingLoreModal();

    // Sincroniza fragmentos já desbloqueados no save antigo
    if (rpg.loreFragments) {
      rpg.loreFragments.forEach(id => _seenIds.add(id));
      saveUnlocked();
    }

    // Verificação inicial
    checkUnlocks();

    // Verifica periodicamente
    setInterval(checkUnlocks, 8000);

    console.log('[CodexLoreModule] OK —', CODEX_FRAGMENTS.length, 'fragmentos carregados');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && typeof rpg.killMonster === 'function') cb();
    else if ((n || 0) < 50) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
    else console.warn('[CodexLoreModule] rpg not found');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForRpg(init));
  } else {
    waitForRpg(init);
  }

})();
