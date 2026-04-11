# ⚔️ CalcQuest: Lendas de Algoritma

> *"E se uma simples calculadora pudesse evoluir para um RPG?"*

🔗 **[Jogar Agora](https://calcquest-rpg.netlify.app/)** · [Changelog Completo](CHANGELOG.html)

---

CalcQuest é um Idle/Active RPG 2.5D desenvolvido inteiramente em Vanilla JS dentro de um único arquivo HTML. O que começou como um experimento criativo evoluiu para um jogo com mais de **61 módulos**, **45+ sistemas interligados**, narrativa em atos e conteúdo pós-game extenso.

---

## 🎮 O Jogo

- **Combate ATB** em tempo real com parry, esquiva, combos condicionais e auto-attack inteligente
- **45+ sistemas** incluindo runas, gemas, forja, alquimia, auras, mutações, VIP, arena e mais
- **Narrativa** dividida em atos com escolhas que afetam o mundo
- **Progressão profunda**: classes → especializações → masterclasses → ultraclasses → god classes
- **NG+** reescrito (v3→v6) com multiplicadores escaláveis e conteúdo exclusivo por ciclo
- **Modo Infinito** pós-NG+4 com escala sem teto
- **Sistema de Maestria de Combo** com tiers visuais, XP acumulável e bônus permanentes
- **Arena de Desafios** com 7 tipos de missões diárias rotativas e recompensas exclusivas
- **Forja de Relíquias** — funde 2 relíquias em 1 superior com efeitos únicos e sinergias
- **Torre Infinita** com andares sem fim, bosses escalados e placar semanal
- **Legado Permanente** que persiste após cada ciclo de NG+
- **Menu Rápido** com atalhos personalizáveis e sugestões inteligentes por progresso
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
├── index.html              # Interface do jogo
├── game.js                 # Motor completo (~16.861 linhas)
├── CHANGELOG.html          # Changelog interativo completo
├── README.md
└── modules/                # 61 módulos de expansão
    │
    ├── 🎮 COMBATE & GAMEPLAY
    ├── combat-hud.js               # HUD de batalha visual
    ├── combat-hud-fix.js           # Correções de overflow/texto na HUD
    ├── combat-fix.js               # Correções gerais de combate
    ├── combat-master-fix.js        # Fix mestre da cadeia de combate
    ├── combat-elements.js          # Sistema de elementos
    ├── auto-attack-boss-fix.js     # Anti-farm fantasma (V3)
    ├── battle-log-autoatk-fix.js   # Battle log + auto-attack fix
    ├── dungeon-fix.js              # Correções de dungeon
    ├── core-bugfixes.js            # Bugfixes gerais do núcleo
    ├── combo-mastery.js            # ✨ NOVO — Maestria de Combo com tiers, XP e bônus permanentes
    │
    ├── 🏟️ ARENA & DESAFIOS
    ├── arena-challenges.js         # ✨ NOVO — 7 desafios diários rotativos com recompensas exclusivas
    │
    ├── 🌟 PROGRESSÃO & PRESTIGE
    ├── ng-plus-v6.js               # NG+ definitivo (ciclos 1–6)
    ├── prestige-plus.js            # Ascensão melhorada
    ├── prestige-infinite.js        # Modo infinito pós-NG+4
    ├── prestige-multibuy.js        # Lotes x100~x10000 + fix boss final
    │
    ├── 🏆 END-GAME
    ├── endgame-tower.js            # Torre Infinita + Fracturas de Realidade + Simulacro
    ├── endgame-legacy.js           # Árvore de Legado + Fragmentos de Deus + Grimório Oculto
    ├── endgame-social.js           # Torneio de Ciclo + Boss Lendário Semanal + Co-op
    │
    ├── 💎 SISTEMAS AVANÇADOS
    ├── alchemy-system.js           # Alquimia completa
    ├── class-synergy.js            # Sinergias de classe
    ├── monster-evolution.js        # Evolução de monstros
    ├── bestiary-enhanced.js        # Bestiário expandido
    ├── codex-lore.js               # Codex narrativo
    ├── boss-parts-destructible.js  # Partes destrutíveis de boss
    ├── relic-forge.js              # ✨ NOVO — Forja de Relíquias: funde 2 em 1 superior
    │
    ├── 🎯 MISSÕES & SISTEMAS
    ├── daily-missions-plus.js      # Missões diárias expandidas
    ├── quest-tracker.js            # Rastreador de quests
    ├── achievement-notifications.js # Notificações de conquistas
    ├── session-stats.js            # Estatísticas da sessão
    ├── save-system.js              # Sistema de save robusto
    │
    ├── 🗺️ MUNDO & EXPLORAÇÃO
    ├── world-map.js                # Mapa mundial SVG
    ├── post-game-region.js         # Região pós-game
    ├── living-village.js           # Vila viva com NPCs
    ├── hero-diary.js               # Diário do Herói (via API Anthropic)
    │
    ├── 🎨 INTERFACE & UX
    ├── ui-improvements.js          # Melhorias gerais de UI
    ├── ui-live-sync.js             # Sincronização em tempo real
    ├── inventory-ui.js             # UI de inventário
    ├── damage-numbers.js           # Números de dano flutuantes
    ├── quick-menu.js               # Menu rápido + favoritos personalizáveis
    ├── profile-button.js           # Botão de perfil
    ├── profile-animations.js       # Animações neon no avatar + fundo matrix
    ├── profile-vip-fix.js          # Anti-poluição VIP + HUD legível
    ├── unified-dock.js             # Dock unificado
    ├── boot-screen.js              # Tela de inicialização
    │
    ├── 🌍 AMBIENTE
    ├── weather-system.js           # Sistema de clima
    ├── day-night-effects.js        # Ciclo dia/noite
    │
    ├── 💎 VIP SYSTEM
    ├── vip-system.js               # Sistema VIP base
    ├── vip-system-v9.js            # VIP v9 com melhorias
    ├── vip-mega-integration.js     # Integração mega VIP
    │
    ├── 🔊 ÁUDIO
    ├── sound-system.js             # Sistema de som completo
    │
    ├── 📱 MOBILE
    ├── mobile-optimizer.js         # Otimizações para mobile
    │
    └── 🔧 PATCHES & FIXES
        ├── mega-patch-v24.js       # Mega-patch v24
        ├── v25-megafix.js          # Fix completo v25
        ├── fix-final.js            # Fix final de estabilidade
        ├── buttons-fix.js          # Fix de botões
        ├── changelog-unified.js    # Changelog unificado
        └── modules-plus.js         # Módulos plus
```

---

## 🗺️ Versões

| Versão | Nome | Destaques |
|---|---|---|
| **v27.0** | A Maestria do Combate | Maestria de Combo, Arena de Desafios Diários, Forja de Relíquias |
| **v26.0** | O Refino Final | Quick Menu, Prestige Multi-Buy, animações de perfil, fixes críticos |
| **v25.0** | A Ascensão Social | Torre Infinita, Legado Permanente, Torneio de Ciclo, Co-op |
| **v24.0** | O Caos Controlado | Mega-patch, formatação K/M/B/T, rebalanceamento de XP/HP/ATK |
| **v23.0** | A Ascensão das Masterclasses | God Classes, Banco, Modo Infinito, Protocolo Primordial |
| **v22.0** | O Caos e a Glória | Notoriedade, NG+ v3, Mutações, Auras, Classes Secretas |
| **v21.0** | O Mundo Vivo | Skill Chains, Formações, Masmorras Procedurais, Karma |
| **v20.0** | O Mapa e os Habitantes | Mapa SVG, NPCs, Boss com Partes destrutíveis |
| **v19.0** | A Economia do Caos | Árvore de Talentos, Forja, Gemas, Relíquias Amaldiçoadas |
| **v18.0** | As Runas do Abismo | Runas, Wave Survival, Dungeon Diária, Modo Desafio |

→ [Ver changelog completo](CHANGELOG.html)

---

## ✨ Novidades v27.0

### ⚡ Maestria de Combo — Sistema de Profundidade
O sistema de combo ganhou profundidade real. Existem agora **4 tiers** que ativam automaticamente ao atingir 5/10/15/20 hits consecutivos, cada um com cor, efeito visual e multiplicador de dano crescente (até +200%). O XP acumulado em combos sobe o nível de maestria permanentemente (+5% dano por nível), incentivando jogadas ativas em vez de só auto-attack.

### 🏟️ Arena de Desafios — Conteúdo Diário Real
7 tipos de desafios que rotacionam diariamente via seed por data. Cada um impõe uma restrição genuína — "sem poções", "sem magia", "kill em 30s", "combo x20 sem morrer" — e entrega recompensas exclusivas: bônus temporários de 24h (ouro, XP, crit, ATK, Fury) e desbloqueio de relíquias e títulos únicos. O progresso aparece numa barra no topo da tela durante o desafio ativo.

### ⚗️ Forja de Relíquias — Fusão Estratégica
8 receitas de fusão secretas. Cada receita consome 2 relíquias específicas do inventário e cria uma **relíquia forjada exclusiva** com efeitos que não existem no jogo base — como curar 5% HP por kill, resetar cooldowns com 10% de chance, ou duplicar o ganho de Fury. Abre uma nova camada de decisão: guardar relíquias para a forja ou usar imediatamente.

---

## 📱 Mobile & APK

O jogo roda em qualquer browser. Para transformar em APK Android:

1. Abra o `index.html` em Android Studio via WebView
2. Compile normalmente — pronto para instalar

---

## 📄 Licença

Projeto open-source para estudo e experimentação em Game Dev + Web Development.
