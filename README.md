Link do Jogo : https://calcquest-rpg.netlify.app/


⚔️ CalcQuest: Lendas de Algoritma

CalcQuest é um experimento criativo que começou com uma simples ideia:
transformar uma calculadora web em um RPG de combate em tempo real.

O projeto evoluiu para um Idle/Active RPG 2.5D, desenvolvido inteiramente dentro de um único arquivo HTML, explorando ao máximo o potencial do Vanilla JavaScript.

O resultado é um pequeno jogo com mecânicas de RPG, combate ATB, progressão de personagem e narrativa.

🎮 Demonstração

Um RPG completo rodando em apenas um único index.html

Sem bundlers

Sem frameworks pesados

Sem múltiplos arquivos JS/CSS

Tudo acontece dentro do mesmo documento.

🛠️ Tecnologias Utilizadas
HTML5

Estrutura completa do jogo e organização da interface.

Tailwind CSS (CDN)

Utilizado para:

Interface responsiva

Estética Dark Fantasy

Glassmorphism

Layout mobile-first

Vanilla JavaScript

Motor de jogo desenvolvido manualmente incluindo:

Game Loop com requestAnimationFrame

Sistema de combate ATB (Active Time Battle)

Sistema de partículas

Detecção de colisões

Progressão de RPG

Gerenciamento de estados do jogo

Lucide Icons

Os inimigos e elementos visuais são ícones SVG manipulados por código, eliminando a necessidade de imagens PNG ou JPG.

🐉 Mecânicas do Jogo
⚔️ Combate ATB (Active Time Battle)

Os inimigos possuem barras de velocidade e atacam em tempo real.

Exemplos de inimigos:

Slime Numérico

Dragão Logarítmico

🛡️ Sistema de Defesa

O jogador pode:

Defender

Esquivar

Atacar

Se o botão Defender for usado no momento certo, ativa:

Parry Perfeito

Resultado:

Reflete dano

Enche a barra de fúria

🧙 Sistema de RPG

Inclui:

Classes (Guerreiro, Mago, etc.)

Equipamentos

Relíquias passivas

Sistema de combos

Progressão de nível

Sistema de XP

📖 Narrativa

A história é dividida em atos, inspirada em Visual Novels, e acompanha a jornada para derrotar o Rei Demônio de Algoritma.

📚 Bestiário

Todos os inimigos derrotados são registrados em uma enciclopédia interna do jogo.

💾 Sistema de Save

O progresso do jogador é salvo automaticamente usando:

localStorage

Assim o progresso nunca é perdido.

📱 Mobile & APK

Como todo o jogo está contido em um único arquivo HTML, é possível transformar o projeto facilmente em um aplicativo Android.

Utilizando:

Android Studio + WebView

O jogo pode ser compilado em um APK instalável em poucos minutos.

🎯 Objetivo do Projeto

Explorar até onde é possível levar:

HTML

CSS

Vanilla JavaScript

dentro de um único arquivo web.

O projeto demonstra que mesmo sem frameworks modernos é possível criar experiências interativas complexas.

🚀 Possíveis Melhorias Futuras

Novas classes

Sistema de habilidades

Novos monstros

Modo multiplayer local

Sistema de conquistas

Melhor sistema de partículas

🧑‍💻 Autor

Projeto desenvolvido como experimento de Game Dev + Web Development.

🧠 Inspiração

A ideia surgiu a partir da pergunta:

"E se uma simples calculadora pudesse evoluir para um RPG?"

📜 Licença

Projeto open-source para estudo e experimentação.
