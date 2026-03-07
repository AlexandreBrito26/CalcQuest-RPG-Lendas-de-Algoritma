⚔️ CalcQuest RPG: Lendas de Algoritma

CalcQuest começou como um simples projeto de uma calculadora e evoluiu para um Idle/Active RPG de Fantasia Negra em 2.5D, construído inteiramente num único ficheiro HTML.

Neste jogo, a matemática corrompeu-se. O Lorde do Caos roubou a Matriz Principal, transformando frações em Goblins e equações em Dragões. Cabe a ti, o Herói, empunhar a Lógica como arma para restaurar o equilíbrio do universo!

✨ Funcionalidades Principais

Combate em Tempo Real (Sistema ATB): Os monstros atacam ativamente usando uma barra de velocidade (Active Time Battle). Reage a tempo para sobreviveres!

Arena 2.5D Dinâmica: Batalhas com profundidade, animações de salto, ataques físicos com Screen Shake e efeitos de partículas.

Sistema de Parry e Esquiva: Defende-te no exato momento em que o monstro pisca a vermelho para refletires o dano (Parry), ou confia na tua chance de Esquiva.

Combo & Fúria (Ultimate): Encandeia ataques sem levares dano para multiplicares o teu poder. Enche a tua barra de Fúria para desencadear um Ataque Supremo avassalador.

Fraquezas e Resistências: Diferentes monstros reagem de forma diferente a Ataques Físicos (⚔️) ou Magia (🔥).

Taverna das Classes: Escolhe o teu estilo de jogo: Guerreiro (Equilibrado), Mago Sangrento (Dano Extremo), Assassino Negro (Crítico e Esquiva) ou Cavaleiro de Ferro (Tanque).

Sistema de Progressão Profundo:

Loja: Compra Espadas, Armaduras, Poções e Portais (Temas que mudam o cenário de fundo).

Relíquias e Pets: Equipa Mascotes (Dragões, Lobos, Fadas) e Relíquias (Vampirismo, Toque de Midas) para ganhares buffs passivos.

Modo História (Visual Novel): A narrativa do jogo expande-se em Atos à medida que sobes de nível.

Auto-Save: Todo o progresso, inventário, e Bestiário é guardado automaticamente no teu navegador (localStorage).

🎮 Como Jogar

O jogo foi desenhado para ser jogado tanto no telemóvel (toque) como no PC (rato/teclado).

Controles de Batalha (Atalhos de Teclado):

[ 1 ] ou [ Q ] - Atacar: Dano físico base com chance de Crítico. Bom contra Goblins e Dragões.

[ 2 ] ou [ W ] - Magia: Dano alto mágico. Perfeito contra Slimes e Fantasmas.

[ 3 ] ou [ E ] - Defender: Aumenta massivamente a esquiva por 1.5s. Usa no momento em que o monstro pisca a vermelho para um Parry.

[ 4 ] ou [ R ] - Curar: Consome 1 Poção do teu inventário para restaurar parte da Vida Máxima.

Dicas de Sobrevivência:

O Boss Diário é extremamente forte. Vai à Taverna, compra a melhor arma e leva poções antes de o enfrentares!

O teu medidor de Combo quebra se te defenderes, te curares ou levares dano. Arrisca para ganhares até +100% de dano bónus!

Se ficares sem Poções, clica em "Fugir" e visita o Armazém (Loja) para comprares mais com o Ouro dos monstros derrotados.

🛠️ Tecnologias Utilizadas

Este projeto foi construído desafiando os limites de um Único Ficheiro HTML (Single-File Architecture):

HTML5: Estrutura semântica e acessibilidade.

Tailwind CSS (via CDN): Estilização rápida, Glassmorphism (efeito de vidro fumado), responsividade e Layout Grid/Flexbox.

Vanilla JavaScript (ES6+): Motor de jogo customizado (Game Loop com requestAnimationFrame), gestão de estado, cálculos de RPG e manipulação do DOM.

Lucide Icons: Biblioteca de ícones SVG leves gerados dinamicamente no motor do jogo.

Google Fonts: Tipografia temática (Cinzel para títulos épicos, Share Tech Mono para a era Cyberpunk).

🚀 Instalação e Execução

O CalcQuest não precisa de servidores, bases de dados ou instalações complexas.

Para jogar no Navegador (Browser):

Faz o download do ficheiro index.html.

Dá um duplo clique para abri-lo no Google Chrome, Firefox, Safari ou Edge.

Diverte-te!

Para converter para App Android (APK):
O jogo está otimizado para mobile (layout responsivo e scroll escondido). Podes usar o Android Studio com uma WebView para encapsular o index.html e criar um APK nativo. (Consulta o guia_apk.md fornecido no projeto para instruções passo-a-passo).

📜 Créditos e Licença

Desenvolvido inteiramente como uma experiência de "Evolução de Código" — de uma simples interface de calculadora até um RPG de ação em tempo real.

Sinta-se livre para dar fork, estudar o código do motor de combate ou criar a sua própria versão!
