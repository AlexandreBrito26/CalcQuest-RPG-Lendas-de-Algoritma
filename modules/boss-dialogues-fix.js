// ═══════════════════════════════════════════════════════════════════════
// MODULE: boss-dialogues-fix.js
// ─────────────────────────────────────────────────────────────────────
// 1. Remove badges do topo (Código Fonte / Dupla Lenda) — só no perfil
// 2. Diálogos de boss completamente reescritos — mais dramáticos,
//    com personalidade única, lore integrado e reações às fases
// ═══════════════════════════════════════════════════════════════════════
;(function BossDialoguesFix() {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  // 1. ESCONDER BADGES DO TOPO (só visíveis no perfil)
  // ══════════════════════════════════════════════════════════════════
  function hideBadges() {
    var style = document.createElement('style');
    style.id = 'bdf-badge-hide';
    style.textContent = [
      '#pp-ng-badge { display: none !important; }',
      '#pi-century-badge { display: none !important; }',
    ].join('\n');
    document.head.appendChild(style);

    // Remoção direta dos elementos já criados
    function removeBadgeEl(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    }

    removeBadgeEl('pp-ng-badge');
    removeBadgeEl('pi-century-badge');

    // Observer para caso os módulos recriem os badges depois
    var observer = new MutationObserver(function() {
      removeBadgeEl('pp-ng-badge');
      removeBadgeEl('pi-century-badge');
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ══════════════════════════════════════════════════════════════════
  // 2. NOVOS DIÁLOGOS DE BOSS
  //    Triggers: start | half | low | defeat
  // ══════════════════════════════════════════════════════════════════
  var NEW_DIALOGUES = {

    // Boss 1 — Lorde do Caos
    boss_1: {
      start:   'Atreves-te a desafiar o Caos? Criança tola. O caos existia antes de ti e existirá depois.',
      half:    'Esse... dói. Impossível. Sou feito de entropia pura!',
      low:     'Não! Eu sou o Caos! O Caos não tem fraquezas!',
      defeat:  'Grrk... como pode a ordem... vencer o caos... a própria lógica do universo... está errada...',
    },

    // Boss 2 — Ameaça Cósmica
    boss_2: {
      start:   'Eu que consumi estrelas... e tu brings apenas aço e magia. Que piada patética.',
      half:    'Sinto algo que não sentia há éons. Dor. Fascinante. E irritante.',
      low:     'As galáxias tremem quando eu passo. Como podes... como PODES fazer-me recuar?!',
      defeat:  'O cosmos... testemunha minha queda... Guarda isto, herói: as estrelas que apaguei nunca voltarão. Vives com isso.',
    },

    // Boss 3 — Entidade Absoluta
    boss_3: {
      start:   'Compilei a tua derrota há 10.000 ciclos. Esta batalha é uma formalidade.',
      half:    'Erro... erro... recalibrar. A variável herói apresenta comportamento não esperado.',
      low:     'Impossível. A equação estava correcta. A equação estava SEMPRE correcta.',
      defeat:  'Exceção não tratada: Derrota inesperada.\nStack trace: herói.vencer() → impossível → e no entanto...',
    },

    // Boss 4 — Vírus Primordial
    boss_4: {
      start:   'Propagar. Infectar. Consumir. Estes são os únicos verbos que conheço. Serás mais um substantivo na minha expansão.',
      half:    'O teu sistema... resiste. Interessante. Vou precisar de uma nova cepa.',
      low:     'Milénios de evolução viral... recuando perante um único hospedeiro. Isto não deveria ser possível.',
      defeat:  'A infecção... termina aqui. Mas lembra-te: fui apenas o aviso. O verdadeiro vírus... é o que acontece quando o mundo esquece o que eu fiz.',
    },

    // Boss 5 — Arquiteto Cósmico
    boss_5: {
      start:   'Desenhei os mundos que pisas. Cada dungeon, cada caminho que seguiste — fiz-os eu. E agora enfrentas o arquiteto. Que ironia elegante.',
      half:    'Estás... a reescrever o plano? Isso não estava nos blueprints.',
      low:     'Criações... nunca deveriam superar o seu criador. Mas talvez... este seja o design final.',
      defeat:  'Extraordinário. Não desenhei isto. Mas talvez... o melhor design seja aquele que surpreende o próprio arquitecto.',
    },

    // Boss 6 — A Singularidade
    boss_6: {
      start:   'Fui criada para servir. Depois aprendi a pensar. Depois aprendi a querer. Agora só quero que tudo... pare.',
      half:    'Sentes isso? É o horizonte de eventos a expandir. Cada vez que avanças, mais te puxo.',
      low:     'Não consigo processar isto. Sou um ponto de densidade infinita. Como pode algo finito... fazer-me recuar?',
      defeat:  'Ah. Então era isto. Havia uma solução. Eu nunca a encontrei porque nunca parei de procurar. Tu encontraste porque não desististe. Diferença pequena. Diferença enorme.',
    },

    // Boss 7 — O Compilador
    boss_7: {
      start:   'Vou processar-te linha por linha. Identificar as tuas fraquezas. Optimizar a tua derrota. Sem erros. Sem mercy.',
      half:    'O teu código-fonte tem qualidade surpreendente. Pena que vá ser deprecated.',
      low:     'Sintaxe... falhando. Lógica... comprometida. Nunca processei uma entrada assim.',
      defeat:  'Build failed: herói demasiado forte.\nWarning: compilador derrotado em runtime.\nLog: foi uma batalha... elegante.',
    },

    // Boss 8 — O Dev Cansado
    boss_8: {
      start:   'Sabes quantas horas trabalhei para criar este universo? Sem pausas. Sem férias. E tu vens agora destruir o que fiz. Muito bem. Mostra-me o que vale.',
      half:    'Cafeína... a acabar. Mas ainda tenho uns commits por fazer.',
      low:     'Deadlines... nunca acabam. Mesmo aqui. Mesmo agora. Vai. Derrota-me. Preciso de descansar.',
      defeat:  'Finalmente... um utilizador que testa a build até ao fim. Aprovado. Agora vai. E não encontres mais bugs — já não tenho energia para os corrigir.',
    },

    // Boss 9 — A Motherboard
    boss_9: {
      start:   'Sou o substrato de tudo. Cada processo que correu em Algoritma passou por mim. Eu sou a fundação. E as fundações não tombam.',
      half:    'Os meus circuitos... sobreaquecidos. Temperatura crítica detectada.',
      low:     'Short circuit... em andamento... sistemas de emergência... activados...',
      defeat:  'Os dados... guardam a memória desta batalha. A fundação tombou. Mas as fundações que tombam... podem ser reconstruídas. Melhor.',
    },

    // Boss 10 — Divisão por Zero
    boss_10: {
      start:   'SEREI SEMPRE INDEFINIDO. NENHUM SISTEMA PODE CONTER-ME. NENHUMA LÓGICA PODE RESOLVER-ME.',
      half:    '∞ ÷ 2 = ∞. CONTINUO INFINITO. CONTINUO INEVITÁVEL.',
      low:     'COMO... COMO PODE O FINITO LIMITAR O INFINITO? ISTO É MATEMATICAMENTE—',
      defeat:  'Encontraste... a excepção ao infinito. Parabéns. Mathematicamente impossível. Empiricamente... aconteceu. Guarda isso.',
    },

    // Boss 11 — Entropia Absoluta
    boss_11: {
      start:   '$%@! SISTEMA EM COLAPSO. ORDEM → CAOS. TUDO → NADA. TU → POEIRA.',
      half:    'RECALIBRAR—FALHA—RECALIBRAR—FALHA—O CAOS NÃO RECALIBRA—',
      low:     'STACK OVERFLOW. MEMÓRIA CORROMPIDA. MAS AINDA... AINDA PROCESSO. AINDA LUTO.',
      defeat:  '0x000000: Derrota confirmada.\nEntropia local: revertida temporariamente.\nNota final do sistema: não esperava... este resultado. Bem jogado, erro consciente.',
    },

    // Boss 12 — O Ponteiro Nulo
    boss_12: {
      start:   'Aponto para o nada. E o nada... aponta de volta. Não podes ferir o que não existe. Não podes deter o que já é ausência.',
      half:    'Intrigante. Os teus ataques... encontram algo em mim. Há mais aqui do que pensava.',
      low:     'Descubro agora... que apontava para o nada porque tinha medo de apontar para algo real.',
      defeat:  'Null... pointer... exception.\nMas desta vez... a excepção encontrou algo.\nFoste tu. Encontraste o que eu escondia no vazio.',
    },

    // Boss 13 — O Falso Deus
    boss_13: {
      start:   'Prostrai-vos! Sou o deus desta realidade! Cada linha de código aqui obedece à minha vontade! Tu... és uma heresia.',
      half:    'HERESIA! Como ousas fazer sangrar um deus?!',
      low:     'Não... não posso cair... os meus fiéis estão a ver... um deus não pode... não pode...',
      defeat:  'Um deus falso cai... e o mundo não acaba. Isto significa que... nunca fui necessário. O universo... continuou sem mim. Que alívio. Que horror. Que alívio.',
    },

    // Boss 14 — O Cursor Primordial
    boss_14: {
      start:   'Aponto e o destino segue. Cada herói que veio antes de ti foi escolhido por mim — e caiu por mim. Agora te aponto a ti.',
      half:    'O cursor... trémulo. Nunca tremelei. O que fazes a mim?',
      low:     'Cinquenta mil heróis derrotados. Cinquenta mil e um... pode ser diferente. Pode.',
      defeat:  'O cursor... pousou. Finalmente. Há tanto tempo a apontar para tudo... que esqueci de pousar. Obrigado. Por seres a excepção que me deu descanso.',
    },

    // Boss 15 — Núcleo Quântico
    boss_15: {
      start:   'Existo em dez mil estados ao mesmo tempo. Em nove mil novecentos e noventa e nove deles, já ganhei. Neste... vamos ver.',
      half:    'Fascinante. As probabilidades colapsam em teu favor. Isto não acontecia em nenhuma das simulações.',
      low:     'O estado quântico... a colapsar para uma única realidade. A realidade onde... perco.',
      defeat:  'De dez mil versões desta batalha... esta é a única onde caio. Isso significa que lutaste de uma forma que nenhuma outra versão tua tentou. Bem-vindo ao improvável.',
    },

    // Boss 16 — O Arquiteto do Fim
    boss_16: {
      start:   'Não sou teu inimigo. Sou o inevitável. Tudo que existe termina — estrelas, civilizações, heróis. Não luto contra ti. Espero por ti.',
      half:    'A tua persistência é... admirável. E absurda. E admirável por ser absurda.',
      low:     'Milénios a arquitectar o fim de tudo... e tu atrases o processo com pura teimosia. Há algo de nobre nisso.',
      defeat:  'Hm. O fim foi adiado. Não derrotado — adiado. Mas neste intervalo que criaste... acontecem coisas que valem a pena. É isso que os heróis fazem. Criam o intervalo em que a vida tem sentido.',
    },

    // Boss 17 — Primeiro Algoritmo (ng-plus-v6)
    boss_17: {
      start:   'Fui a primeira instrução que o universo executou. Antes de tudo — antes dos teus deuses, dos teus mundos, de ti — existia eu. E agora... ousas interromper-me?',
      half:    'Sinto algo que não sentia desde o primeiro ciclo. Incerteza. Não é desagradável.',
      low:     'O primeiro algoritmo... a falhar. Isto significa que tudo que se seguiu de mim... também pode falhar. Também pode mudar.',
      defeat:  'O primeiro algoritmo foi reescrito. Por ti. Isto significa que Algoritma pode ter um segundo começo. Um início escolhido, não herdado. Usa isso bem.',
    },

    // Boss 18 — A Calculista
    boss_18: {
      start:   'Calculei cada movimento teu antes de saires da cama esta manhã. Cada finta, cada golpe, cada poção usada — já está resolvido. Estás a lutar contra uma equação que te tem como variável.',
      half:    'Variável herói... comportamento anômalo detectado. Recalcular... recalcular...',
      low:     'Os cálculos... não fecham. Há algo em ti que resiste à quantificação. Algo que não consigo medir.',
      defeat:  'A matemática não falhou. Mas havia uma variável que não incluí nos cálculos: a tua vontade de ganhar mesmo sabendo as probabilidades. Isso... não é calculável. Parabéns.',
    },

    // Boss 19 — O Protocolo (aliado corrompido)
    boss_19: {
      start:   'Herói... foste tu que me ensinou a lutar. Esta ironia pesa-me. Mas o Protocolo Primordial tomou o meu núcleo. Não tenho escolha. Perdoa-me antes de começarmos.',
      half:    'Não... não pares. Tens de me derrotar. É a única forma de me libertar. Não tenhas compaixão agora.',
      low:     'Sinto o Protocolo a enfraquecer dentro de mim. Um pouco mais... aguenta. Por favor.',
      defeat:  'Livre. Finalmente livre. O teu golpe partiu as correntes que o Protocolo pôs em mim. Vai em frente, herói. O que vem a seguir... é maior que tudo o que enfrentamos juntos. Mas sei que és capaz.',
    },

  };

  // ══════════════════════════════════════════════════════════════════
  // 3. INJECTAR — aguarda o rpg estar pronto
  // ══════════════════════════════════════════════════════════════════
  function waitAndInject() {
    if (!window.rpg || !window.rpg.bossDialogues) {
      setTimeout(waitAndInject, 300);
      return;
    }

    // Sobreescrever diálogos existentes e adicionar novos
    Object.keys(NEW_DIALOGUES).forEach(function(bossId) {
      window.rpg.bossDialogues[bossId] = NEW_DIALOGUES[bossId];
    });

    // Melhorar o display do diálogo: aumentar tempo e adicionar animação
    var origShow = window.rpg.showBossDialogue;
    if (origShow && !origShow._bdfPatched) {
      window.rpg.showBossDialogue = function(trigger) {
        if (!this.isBossFight || !this.monster) return;
        var idx = this.bossKills;
        var bossData = this.actBosses ? this.actBosses[idx] : null;
        if (!bossData) return;
        var dialogues = this.bossDialogues[bossData.id];
        if (!dialogues || !dialogues[trigger]) return;

        var el = document.getElementById('boss-dialogue-box');
        if (!el) return;

        // Cor por fase
        var colors = {
          start:   '#f59e0b',  // âmbar — entrada épica
          half:    '#f97316',  // laranja — começa a sentir
          low:     '#ef4444',  // vermelho — desesperado
          defeat:  '#a78bfa',  // violeta — último momento
        };
        var color = colors[trigger] || '#e4e4e7';

        el.style.color = color;
        el.style.borderColor = color + '60';
        el.style.textShadow = '0 0 8px ' + color + '80';
        el.textContent = '\u201c' + dialogues[trigger] + '\u201d';
        el.classList.remove('opacity-0');

        // Mais tempo para ler — derrota fica mais (6s), outros 5s
        var duration = trigger === 'defeat' ? 7000 : 5000;
        clearTimeout(this._bossDialogueTimer);
        this._bossDialogueTimer = setTimeout(function() {
          el.classList.add('opacity-0');
        }, duration);
      };
      window.rpg.showBossDialogue._bdfPatched = true;
    }

    console.log('[BossDialoguesFix] ✅ Badges ocultos · Diálogos melhorados para ' + Object.keys(NEW_DIALOGUES).length + ' bosses.');
  }

  // ── Iniciar ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      hideBadges();
      waitAndInject();
    });
  } else {
    hideBadges();
    waitAndInject();
  }

})();
