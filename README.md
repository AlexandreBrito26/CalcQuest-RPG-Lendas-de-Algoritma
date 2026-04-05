# ⚔️ CalcQuest: Lendas de Algoritma

> *"E se uma simples calculadora pudesse evoluir para um RPG?"*

🔗 **[Jogar Agora](https://calcquest-rpg.netlify.app/)** · [Changelog Completo](CHANGELOG.html)

---

CalcQuest é um Idle/Active RPG 2.5D desenvolvido inteiramente em Vanilla JS dentro de um único arquivo HTML. O que começou como um experimento criativo evoluiu para um jogo com mais de 30 sistemas interligados, narrativa em atos e conteúdo pós-game.

---

## 🎮 O Jogo

- **Combate ATB** em tempo real com parry, esquiva e combos condicionais
- **30+ sistemas** incluindo runas, gemas, forja, alquimia, auras, mutações e mais
- **Narrativa** dividida em atos com escolhas que afetam o mundo
- **Progressão profunda**: classes → especializações → masterclasses → god classes
- **NG+** reescrito com multiplicadores escaláveis e conteúdo exclusivo por ciclo
- **Modo Infinito** pós-NG+4 com escala sem teto
- **Diário do Herói** com entradas narrativas geradas via Anthropic API

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura completa do jogo em um único arquivo |
| **Vanilla JavaScript** | Motor de jogo, game loop, combate, progressão |
| **Tailwind CSS (CDN)** | Interface responsiva com estética Dark Fantasy |
| **Lucide Icons** | Inimigos e elementos visuais como SVG manipulado |
| **Anthropic API** | Geração narrativa no Diário do Herói |

Sem bundlers. Sem frameworks pesados. Sem múltiplos arquivos JS/CSS.

---

## 📦 Estrutura

```
CalcQuest-RPG-Lendas-de-Algoritma-main/
├── index.html          # Interface do jogo
├── game.js             # Motor completo (~16.000 linhas)
├── CHANGELOG.html      # Changelog interativo completo
├── README.md
└── modules/            # 33 módulos de expansão
    ├── alchemy-system.js
    ├── bestiary-enhanced.js
    ├── boss-parts-destructible.js
    ├── class-synergy.js
    ├── codex-lore.js
    ├── combat-elements.js
    ├── combat-hud.js
    ├── day-night-effects.js
    ├── hero-diary.js
    ├── living-village.js
    ├── mobile-optimizer.js
    ├── monster-evolution.js
    ├── ng-plus-v3.js
    ├── post-game-region.js
    ├── weather-system.js
    ├── world-map.js
    └── ... (e mais 17 módulos)
```

---

## 🗺️ Versões

| Versão | Nome | Destaques |
|---|---|---|
| **v23.0** | A Ascensão das Masterclasses | God Classes, Banco, Modo Infinito, Protocolo Primordial |
| **v22.0** | O Caos e a Glória | Notoriedade, NG+ v3, Mutações, Auras, Classes Secretas |
| **v21.0** | O Mundo Vivo | Skill Chains, Formações, Masmorras Procedurais, Karma |
| **v20.0** | O Mapa e os Habitantes | Mapa SVG, NPCs, Boss com Partes destrutíveis |
| **v19.0** | A Economia do Caos | Árvore de Talentos, Forja, Gemas, Relíquias Amaldiçoadas |
| **v18.0** | As Runas do Abismo | Runas, Wave Survival, Dungeon Diária, Modo Desafio |
| **v17.0** | Os Elementos Despertam | Elementos, Status Effects, Break System, 5ª Skill |

→ [Ver changelog completo](CHANGELOG.html)

---

## 📱 Mobile & APK

O jogo roda em qualquer browser. Para transformar em APK Android:

1. Abra o `index.html` em Android Studio via WebView
2. Compile normalmente — pronto para instalar

---

## 📄 Licença

Projeto open-source para estudo e experimentação em Game Dev + Web Development.
