# ⚔️ CalcQuest: Lendas de Algoritma

> *"E se uma simples calculadora pudesse evoluir para um RPG?"*

🔗 **[Jogar Agora](https://calcquest-rpg.netlify.app/)** · [Changelog Completo](CHANGELOG.html)

---

CalcQuest é um Idle/Active RPG 2.5D desenvolvido inteiramente em Vanilla JS dentro de um único arquivo HTML. O que começou como um experimento criativo evoluiu para um jogo com mais de **58 módulos**, **40+ sistemas interligados**, narrativa em atos e conteúdo pós-game extenso.

---

## 🎮 O Jogo

- **Combate ATB** em tempo real com parry, esquiva, combos condicionais e auto-attack inteligente
- **40+ sistemas** incluindo runas, gemas, forja, alquimia, auras, mutações, VIP e mais
- **Narrativa** dividida em atos com escolhas que afetam o mundo
- **Progressão profunda**: classes → especializações → masterclasses → ultraclasses → god classes
- **NG+** reescrito (v3→v6) com multiplicadores escaláveis e conteúdo exclusivo por ciclo
- **Modo Infinito** pós-NG+4 com escala sem teto
- **Prestige Multi-Buy** com lotes x100 a x10000 para end-game
- **Diário do Herói** com entradas narrativas geradas via Anthropic API
- **Torre Infinita** com andares sem fim, bosses escalados e placar semanal
- **Legado Permanente** que persiste após cada ciclo de NG+
- **Menu Rápido** com atalhos personalizáveis e sugestões inteligentes por progresso

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
└── modules/                # 58 módulos de expansão
    │
    ├── 🎮 COMBATE & GAMEPLAY
    ├── combat-hud.js               # HUD de batalha visual
    ├── combat-hud-fix.js           # Correções de overflow/texto na HUD
    ├── combat-fix.js               # Correções gerais de combate
    ├── combat-master-fix.js        # Fix mestre da cadeia de combate
    ├── combat-elements.js          # Sistema de elementos
    ├── auto-attack-boss-fix.js     # ✨ NOVO — Anti-farm fantasma (V3)
    ├── battle-log-autoatk-fix.js   # ✨ NOVO — Battle log + auto-attack fix
    ├── dungeon-fix.js              # Correções de dungeon
    ├── core-bugfixes.js            # Bugfixes gerais do núcleo
    │
    ├── 🌟 PROGRESSÃO & PRESTIGE
    ├── ng-plus-v6.js               # NG+ definitivo (ciclos 1–6)
    ├── prestige-plus.js            # Ascensão melhorada
    ├── prestige-infinite.js        # Modo infinito pós-NG+4
    ├── prestige-multibuy.js        # ✨ NOVO — Lotes x100~x10000 + fix boss final
    │
    ├── 🏆 END-GAME
    ├── endgame-tower.js            # Torre Infinita + Fracturas de Realidade + Simulacro
    ├── endgame-legacy.js           # Árvore de Legado + Fragmentos de Deus + Grimório Oculto
    ├── endgame-social.js           # Torneio de Ciclo + Boss Lendário Semanal + Co-op
    │
    ├── 🎯 MISSÕES & SISTEMAS
    ├── daily-missions-plus.js      # Missões diárias expandidas
    ├── quest-tracker.js            # Rastreador de quests
    ├── achievement-notifications.js # Notificações de conquistas
    ├── session-stats.js            # Estatísticas da sessão
    ├── save-system.js              # Sistema de save robusto
    │
    ├── 💎 SISTEMAS AVANÇADOS
    ├── alchemy-system.js           # Alquimia completa
    ├── class-synergy.js            # Sinergias de classe
    ├── monster-evolution.js        # Evolução de monstros
    ├── bestiary-enhanced.js        # Bestiário expandido
    ├── codex-lore.js               # Codex narrativo
    ├── boss-parts-destructible.js  # Partes destrutíveis de boss
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
    ├── quick-menu.js               # ✨ NOVO — Menu rápido + favoritos personalizáveis
    ├── profile-button.js           # Botão de perfil
    ├── profile-animations.js       # ✨ NOVO — Animações neon no avatar + fundo matrix
    ├── profile-vip-fix.js          # ✨ NOVO — Anti-poluição VIP + HUD legível
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
| **v26.0** | O Refino Final | Quick Menu personalizável, Prestige Multi-Buy, animações de perfil neon, correções críticas de auto-attack e battle log |
| **v25.0** | A Ascensão Social | Torre Infinita, Legado Permanente, Torneio de Ciclo, Boss Lendário Semanal, Modo Co-op |
| **v24.0** | O Caos Controlado | Mega-patch de persistência de boss, formatação K/M/B/T, rebalanceamento de XP/HP/ATK |
| **v23.0** | A Ascensão das Masterclasses | God Classes, Banco, Modo Infinito, Protocolo Primordial |
| **v22.0** | O Caos e a Glória | Notoriedade, NG+ v3, Mutações, Auras, Classes Secretas |
| **v21.0** | O Mundo Vivo | Skill Chains, Formações, Masmorras Procedurais, Karma |
| **v20.0** | O Mapa e os Habitantes | Mapa SVG, NPCs, Boss com Partes destrutíveis |
| **v19.0** | A Economia do Caos | Árvore de Talentos, Forja, Gemas, Relíquias Amaldiçoadas |
| **v18.0** | As Runas do Abismo | Runas, Wave Survival, Dungeon Diária, Modo Desafio |
| **v17.0** | Os Elementos Despertam | Elementos, Status Effects, Break System, 5ª Skill |

→ [Ver changelog completo](CHANGELOG.html)

---

## ✨ Novidades v26.0

### 🎯 Quick Menu — Acesso Rápido Personalizado
Barra de atalhos com 7 botões grandes e acessíveis. O jogador define seus favoritos e o sistema exibe **Sugestões Inteligentes** com base no progresso atual da partida. Cada ação relevante tem indicador de novidade.

### ⚡ Prestige Multi-Buy — Farm de End-Game
Lotes de ascensão gigantes (x100, x1000, x10000) para quem está no late-game. Inclui **fix crítico do "jogo zerado"** que impedia o farm do boss final.

### 🎨 Profile Animations — Visual Neon
Avatar do perfil com borda neon animada e fundo **matrix flow** em movimento no modal de perfil. Experiência visual muito mais rica.

### 🔧 Auto-Attack Boss Fix (V3) — Anti-Farm Fantasma
Elimina o bug que fazia o auto-attack continuar "farmando" um monstro já morto, gerando spam de `killMonster` e travamentos sutis.

### 🪵 Battle Log Fix — Zero Área Preta
Corrige o battle log exibindo uma caixa preta vazia no início do combate, além de restaurar o estado correto do auto-attack ao re-entrar em batalha.

### 👑 Profile VIP Fix (V3) — HUD Limpa
Textos de batalha maiores e legíveis, sem duplicação de títulos "DEUS DEUS" e tamanho VIP reduzido na HUD de combate para não poluir a visão.

---

## 📱 Mobile & APK

O jogo roda em qualquer browser. Para transformar em APK Android:

1. Abra o `index.html` em Android Studio via WebView
2. Compile normalmente — pronto para instalar

---

## 📄 Licença

Projeto open-source para estudo e experimentação em Game Dev + Web Development.
