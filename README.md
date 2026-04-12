# ⚔️ CalcQuest: Lendas de Algoritma

<div align="center">

> *"E se uma simples calculadora pudesse evoluir para um RPG completo?"*

[![Jogar Agora](https://img.shields.io/badge/🎮_JOGAR_AGORA-netlify-00C7B7?style=for-the-badge)](https://calcquest-rpg.netlify.app/)
[![Versão](https://img.shields.io/badge/versão-v27.1-a855f7?style=for-the-badge)]()
[![Módulos](https://img.shields.io/badge/módulos-67+-c9a84c?style=for-the-badge)]()
[![Licença](https://img.shields.io/badge/licença-Open_Source-52525b?style=for-the-badge)]()

</div>

---

CalcQuest é um **Idle/Active RPG 2.5D** desenvolvido inteiramente em Vanilla JS, contido em um único arquivo HTML. O que começou como um experimento criativo — *"e se uma calculadora virasse um RPG?"* — evoluiu para um jogo com **67 módulos**, **45+ sistemas interligados**, narrativa dividida em atos, co-op em tempo real via Firebase e conteúdo pós-game extenso.

Sem bundlers. Sem frameworks pesados. Sem servidor backend. Zero dependências obrigatórias.

---

## 🎮 O Jogo em Números

| Métrica | Valor |
|---|---|
| Linhas de código (game.js) | ~16.861 |
| Módulos de expansão | 67 |
| Sistemas interligados | 45+ |
| Classes jogáveis | 20+ (base → especializações → masterclasses → ultraclasses → god classes → beyond) |
| Versões lançadas | v1.0 → v27.1 |
| Dependências obrigatórias | 0 |

---

## 🗺️ Histórico Completo de Versões

### 🟣 v27.1 — Hotfix Co-op (atual)
> *Correção crítica do sistema multiplayer*

- **[FIX]** Removida a restrição "Entra em combate primeiro" no modal Co-op — sala pode ser criada antes de iniciar combate
- **[FIX]** Adicionado hook `startCombat` que sincroniza automaticamente o monstro com a sala Firebase assim que o P1 iniciar um combate
- **[FIX]** Sala criada sem combate ativo usa placeholder `"waiting"` no lugar do monstro, evitando crash
- **[FIX]** P2 já podia entrar sem combate (comportamento preservado); agora P1 também pode criar a sala com liberdade
- **[MELHORIA]** Toast de confirmação ao sincronizar monstro com sala co-op

---

### 🟡 v27.0 — A Maestria do Combate
> *Profundidade real ao sistema de combate, conteúdo diário e crafting estratégico*

#### ⚡ Maestria de Combo (`combo-mastery.js`)
Sistema de combo ganhou profundidade real com **4 tiers visuais** que ativam automaticamente:
- **Tier 1** (5 hits): cor laranja, multiplicador +25%
- **Tier 2** (10 hits): cor roxa, multiplicador +75%
- **Tier 3** (15 hits): cor dourada, multiplicador +125%
- **Tier 4** (20 hits): cor vermelha pulsante, multiplicador +200%

XP acumulado em combos sobe o nível de **Maestria permanente** (+5% dano por nível). Mensagens temáticas no battle log. Indicador visual animado do multiplicador ativo. Habilidade especial "QUEBRA-COMBO" desbloqueável por nível de maestria.

#### 🏟️ Arena de Desafios (`arena-challenges.js`)
3 desafios diários rotativos com restrições genuínas — seed por data garante rotação determinística:
- Modificadores: "Sem poções", "Sem magia", "Kill em 30s", "Combo x20 sem morrer"
- Recompensas exclusivas: Títulos, bônus temporários de 24h (ouro, XP, crit, ATK, Fury)
- Desbloqueio de relíquias e títulos que não existem em outro lugar
- Barra de progresso visível no topo durante desafio ativo
- Histórico de desafios completados com estrelas (1–3)

#### ⚗️ Forja de Relíquias (`relic-forge.js`)
8 receitas de fusão secretas. Consome 2 relíquias específicas do inventário → gera **relíquia forjada exclusiva**:
- UI de forja com drag-to-merge visual e animação de fusão
- Efeitos que não existem no jogo base: curar 5% HP por kill, resetar cooldowns (10% chance), duplicar ganho de Fury
- Receitas secretas com relíquias raras como ingrediente
- Botão "Forja" integrado ao modal de inventário

---

### 🟡 v26.0 — O Refino Final
> *UX polida, prestige em escala e estabilidade máxima*

#### 🎯 Quick Menu (`quick-menu.js`)
- Barra de atalhos rápidos com 7 botões grandes e acessíveis
- **Favoritos personalizáveis** — jogador define seus próprios atalhos
- Seção "Sugestões Inteligentes" que muda conforme progresso
- Indicadores de novidade em cada ação relevante
- Substituição visual do painel de cidade/tabs por grid limpo

#### 💰 Prestige Multi-Buy (`prestige-multibuy.js`)
- Botões de ascensão em lote: x10, x20, x50, x100, x1000
- Fix crítico do boss final que travava após prestige
- Cálculo automático de custo acumulado antes de confirmar

#### 🎨 Animações de Perfil (`profile-animations.js`)
- Efeitos neon no avatar com animação de borda pulsante
- Background matrix animado no perfil
- Fix anti-poluição VIP: HUD legível sem badges duplicados

#### 🔧 v25-megafix (`v25-megafix.js`)
- NG+ — força abertura correta do modal sem conflitos
- HUD de batalha — texto colado / overflow resolvido
- Remove "ALDEIA: EM RUÍNAS" do topbar mobile
- Sistema de Classes reescrito: modal completo com 20 classes + subclasses, masterclasses, ultraclasses e godclasses com UI nova
- Botão Classes no menu Taverna
- Limpeza do menu principal (remove poluição visual)

---

### 🟡 v25.0 — A Ascensão Social
> *End-game expandido com Torre Infinita, Legado e Co-op*

#### 🏰 Torre Infinita (`endgame-tower.js`)
- Andares infinitos com bosses escalados exponencialmente
- Placar semanal local por melhor andar atingido
- Recompensas por milestone de andar (ouro, fragmentos, relíquias)
- **Fracturas de Realidade** — dungeons procedurais com modificadores aleatórios (imunidades, regras invertidas, timer)
- **Simulacro** — reviver batalhas passadas com build fixa, pontuado por eficiência

#### 🌟 Legado Permanente (`endgame-legacy.js`)
- **Árvore de Legado** — pontos permanentes que persistem após cada ciclo NG+
- **Fragmentos de Deus** — drops exclusivos NG+3+, set de relíquias únicas
- **Forja de Runas 2.0** — combina 3 runas → Runa Ancestral com efeitos únicos
- **Grimório Oculto** — habilidades secretas desbloqueadas por combos específicos
- **Sistema de Mutações** — mutações permanentes aleatórias pós-NG+

#### 🤝 End-Game Social (`endgame-social.js`)
- **Ascensão de Classe** — formas "Além" após P.50 com mecânicas únicas por classe
- **Torneio de Ciclo** — ranking de quem chegou mais longe no NG+
- **Boss Lendário Semanal** — seed semanal, top-10 local, títulos exclusivos
- **Co-op Assíncrono** — 2 jogadores enfrentam o mesmo monstro com HP compartilhado

---

### 🟡 v24.0 — O Caos Controlado (`mega-patch-v24.js`)
> *Mega-patch de estabilidade e rebalanceamento*

- **[FIX CRÍTICO]** Persistência de boss fight: ao recarregar não voltava mais ao Ato 1
- **[FIX]** UI atualiza completamente sem precisar comprar itens
- **[MELHORIA]** Formatação de números legível: K / M / B / T / Qa / Qi / Sx / Sp / Oc / No / Dc
- **[REBALANCEAMENTO]** XP, HP e ATK escalando de forma mais fluida e progressiva
- **[ÁUDIO]** Músicas e SFX mais intensos e variados em combate frenético

---

### 🟡 v23.0 — A Ascensão das Masterclasses
> *Topo da progressão de classes e conteúdo end-game profundo*

- **God Classes** — tier máximo de classe com multiplicadores absurdos
- **Banco de Ouro** — guarda ouro entre mortes com juros passivos
- **Modo Infinito** — ativado após NG+4, escala sem teto definido
- **Protocolo Primordial** — boss especial secreto com mecânica própria
- Árvore de Talentos expandida com novos galhos exclusivos de god class

---

### 🟡 v22.0 — O Caos e a Glória
> *Sistemas de identidade e progressão alternativa*

- **Sistema de Notoriedade** — reputação dinâmica com o mundo afeta preços, diálogos e drops
- **NG+ v3** — primeira reescrita do sistema New Game Plus
- **Mutações** — transformações aleatórias que alteram permanentemente o personagem
- **Auras** — efeitos visuais e mecânicos que escalam com combos e tempo em combate
- **Classes Secretas** — desbloqueáveis por condições específicas não documentadas

---

### 🟡 v21.0 — O Mundo Vivo
> *Combate tático e geração procedural*

- **Skill Chains** — habilidades encadeáveis com bônus condicionais por ordem de ativação
- **Formações de Combate** — posicionamento afeta defesa, velocidade e dano
- **Masmorras Procedurais** — dungeons geradas com seed única por dia
- **Sistema de Karma** — escolhas narrativas afetam o mundo e desbloqueiam conteúdo

---

### 🟡 v20.0 — O Mapa e os Habitantes
> *Mundo, NPCs e bosses com vida*

- **Mapa Mundial SVG** — mapa interativo com regiões desbloqueáveis progressivamente
- **NPCs com Estado** — aldeões com rotinas, humor e diálogos contextuais (`living-village.js`)
- **Boss com Partes Destrutíveis** (`boss-parts-destructible.js`) — cada parte tem HP próprio e mecânica diferente
- **Diálogos de Boss** (`boss-dialogues-fix.js`) — bosses falam durante o combate com linhas temáticas

---

### 🟡 v19.0 — A Economia do Caos
> *Craftings e itens avançados*

- **Árvore de Talentos** — 30+ nós com bônus passivos e ativos
- **Sistema de Forja** — crafting de equipamentos com materiais coletados
- **Sistema de Gemas** — encaixe em equipamentos com bônus escaláveis
- **Relíquias Amaldiçoadas** — itens poderosos com penalidades permanentes

---

### 🟡 v18.0 — As Runas do Abismo
> *Sistemas de poder e modo de desafio*

- **Sistema de Runas** — runas equipáveis com combos de sinergias
- **Wave Survival** — modo de sobrevivência com ondas infinitas de inimigos
- **Dungeon Diária** — masmorra especial renovada a cada 24h com recompensas únicas
- **Modo Desafio** — regras especiais com pontuação global semanal

---

### 🟠 v1.0 — v17.x — As Fundações
> *Construção do motor e dos sistemas base*

| Versão | Destaque |
|---|---|
| v1.0 | Calculadora → combate básico com um botão de ataque |
| v2.0 | Sistema de classes (Guerreiro, Mago, Ladino) |
| v3.0 | Inventário, ouro e loja básica |
| v4.0 | Primeiro boss com fase especial |
| v5.0 | Sistema de habilidades ativas |
| v6.0 | Prestige e ciclos de progressão |
| v7.0 | Narrativa em atos com escolhas |
| v8.0 | Sistema de equipamentos com raridades |
| v9.0 | Auto-attack e combate ATB |
| v10.0 | Sistema VIP e moeda premium |
| v11.0 | Alquimia e crafting de poções |
| v12.0 | Bestiário expandido com 50+ monstros |
| v13.0 | Sinergias de classe e combos de habilidade |
| v14.0 | Ciclo dia/noite e sistema de clima |
| v15.0 | Números de dano flutuantes e efeitos visuais |
| v16.0 | Sistema de conquistas e notificações |
| v17.0 | Estatísticas de sessão e save avançado |

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura completa do jogo em um único arquivo |
| **Vanilla JavaScript** | Motor de jogo, game loop, combate, progressão |
| **Tailwind CSS (CDN)** | Interface responsiva com estética Dark Fantasy |
| **Lucide Icons** | Inimigos e elementos visuais como SVG manipulado |
| **Anthropic API** | Geração narrativa no Diário do Herói |
| **Firebase RTDB** | Co-op assíncrono em tempo real (multiplayer.js) |

---

## 📦 Estrutura do Projeto

```
CalcQuest-RPG-Lendas-de-Algoritma-main/
├── index.html                      # Interface do jogo (single-file app)
├── game.js                         # Motor completo (~16.861 linhas)
├── CHANGELOG.html                  # Changelog interativo completo
├── README.md
└── modules/                        # 67 módulos de expansão
    │
    ├── ⚔️  COMBATE & GAMEPLAY
    │   ├── combat-hud.js                   # HUD de batalha visual
    │   ├── combat-hud-fix.js               # Correções de overflow/texto na HUD
    │   ├── combat-fix.js                   # Correções gerais de combate
    │   ├── combat-master-fix.js            # Fix mestre da cadeia de combate
    │   ├── combat-elements.js              # Sistema de elementos
    │   ├── auto-attack-boss-fix.js         # Anti-farm fantasma (V3)
    │   ├── battle-log-autoatk-fix.js       # Battle log + auto-attack fix
    │   ├── dungeon-fix.js                  # Correções de dungeon
    │   ├── core-bugfixes.js                # Bugfixes gerais do núcleo
    │   └── combo-mastery.js                # ✨ Maestria de Combo com tiers, XP e bônus permanentes
    │
    ├── 🏟️  ARENA & DESAFIOS
    │   └── arena-challenges.js             # ✨ 3 desafios diários rotativos com recompensas exclusivas
    │
    ├── 🌟  PROGRESSÃO & PRESTIGE
    │   ├── ng-plus-v6.js                   # NG+ definitivo (ciclos 1–6) — sistema sem conflitos
    │   ├── prestige-plus.js                # Ascensão melhorada
    │   ├── prestige-infinite.js            # Modo infinito pós-NG+4
    │   └── prestige-multibuy.js            # Lotes x10~x1000 + fix boss final
    │
    ├── 🏆  END-GAME
    │   ├── endgame-tower.js                # Torre Infinita + Fracturas de Realidade + Simulacro
    │   ├── endgame-legacy.js               # Árvore de Legado + Fragmentos de Deus + Grimório Oculto
    │   └── endgame-social.js               # Torneio de Ciclo + Boss Lendário Semanal + Ascensão Além
    │
    ├── 💎  SISTEMAS AVANÇADOS
    │   ├── alchemy-system.js               # Alquimia completa com receitas
    │   ├── class-synergy.js                # Sinergias de classe
    │   ├── monster-evolution.js            # Evolução e mutação de monstros
    │   ├── bestiary-enhanced.js            # Bestiário expandido (50+ monstros)
    │   ├── codex-lore.js                   # Codex narrativo com lore do mundo
    │   ├── boss-parts-destructible.js      # Partes destrutíveis de boss
    │   └── relic-forge.js                  # ✨ Forja de Relíquias: funde 2 em 1 superior
    │
    ├── 🎯  MISSÕES & SISTEMAS
    │   ├── daily-missions-plus.js          # Missões diárias expandidas
    │   ├── quest-tracker.js                # Rastreador de quests com HUD inline
    │   ├── achievement-notifications.js    # Notificações de conquistas animadas
    │   ├── session-stats.js                # Estatísticas da sessão em tempo real
    │   └── save-system.js                  # Sistema de save robusto com backup
    │
    ├── 🗺️  MUNDO & EXPLORAÇÃO
    │   ├── world-map.js                    # Mapa mundial SVG interativo
    │   ├── world-map-rewrite.js            # Reescrita do mapa com novas regiões
    │   ├── world-expansion.js              # Expansão de regiões e masmorras
    │   ├── post-game-region.js             # Região pós-game desbloqueável
    │   ├── living-village.js               # Vila viva com NPCs e rotinas
    │   └── hero-diary.js                   # Diário do Herói (gerado via Anthropic API)
    │
    ├── 🤝  MULTIPLAYER
    │   └── multiplayer.js                  # ✨ Co-op assíncrono em tempo real (Firebase RTDB)
    │
    ├── 🎨  INTERFACE & UX
    │   ├── ui-improvements.js              # Melhorias gerais de UI
    │   ├── ui-live-sync.js                 # Sincronização de UI em tempo real
    │   ├── inventory-ui.js                 # UI de inventário com filtros
    │   ├── damage-numbers.js               # Números de dano flutuantes com física
    │   ├── quick-menu.js                   # Menu rápido + favoritos personalizáveis
    │   ├── profile-button.js               # Botão de perfil expandido
    │   ├── profile-animations.js           # Animações neon no avatar + fundo matrix
    │   ├── profile-vip-fix.js              # Anti-poluição VIP + HUD legível
    │   ├── unified-dock.js                 # Dock unificado de sistemas
    │   └── boot-screen.js                  # Tela de inicialização animada
    │
    ├── 🌍  AMBIENTE
    │   ├── weather-system.js               # Sistema de clima dinâmico
    │   └── day-night-effects.js            # Ciclo dia/noite com efeitos visuais
    │
    ├── 💎  VIP SYSTEM
    │   ├── vip-system.js                   # Sistema VIP base
    │   ├── vip-system-v9.js                # VIP v9 com melhorias de UX
    │   └── vip-mega-integration.js         # Integração mega VIP unificada
    │
    ├── 🔊  ÁUDIO
    │   └── sound-system.js                 # Sistema de som completo com SFX e música
    │
    ├── 📱  MOBILE
    │   └── mobile-optimizer.js             # Otimizações específicas para mobile
    │
    └── 🔧  PATCHES & FIXES
        ├── mega-patch-v24.js               # Mega-patch v24: persistência, UI, escala
        ├── v25-megafix.js                  # Fix completo v25: NG+, HUD, Classes, mobile
        ├── fix-final.js                    # Fix final de estabilidade geral
        ├── buttons-fix.js                  # Fix de botões e eventos duplicados
        ├── boss-dialogues-fix.js           # Diálogos de boss durante combate
        ├── changelog-unified.js            # Changelog interativo integrado ao jogo
        ├── late-game-content.js            # Conteúdo extra de late game
        ├── modules-plus.js                 # Módulos utilitários adicionais
        └── ng-plus-v3.js / v4.js / v5.js  # Versões anteriores do NG+ (legado)
```

---

## 🤝 Modo Co-op Multiplayer

O Co-op usa **Firebase Realtime Database** no modo assíncrono. Dois jogadores compartilham o HP do mesmo monstro — cada cliente calcula o próprio dano localmente e publica no Firebase.

### Setup Firebase (uma vez)
1. Criar projeto em [firebase.google.com](https://firebase.google.com) (free tier é suficiente)
2. Ativar **Realtime Database** no modo teste
3. As credenciais já estão configuradas no arquivo `multiplayer.js`
4. Adicionar no `index.html` antes de `multiplayer.js`:

```html
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js"></script>
```

### Fluxo de uso
1. P1 abre **Co-op** no menu → **Criar Sala** (pode criar antes ou depois de entrar em combate)
2. P1 entra em combate → monstro sincroniza automaticamente com a sala
3. P2 recebe o código de 6 letras → entra na sala
4. Ambos atacam o mesmo monstro — o HP é compartilhado em tempo real
5. Quando o monstro morre, ambos recebem recompensa (P2 recebe 50% como bônus co-op)

### Comportamento técnico
- HP do monstro é sincronizado via `rooms/{código}/monster/hp` no RTDB
- Somente o HP menor (dano) é aceito para evitar conflito de escrita concorrente
- P1 sincroniza novos monstros ao usar `spawnMonster()` ou `startCombat()`
- Sala expira automaticamente após 2 horas
- HUD de parceiro visível durante o combate com barra de HP em tempo real

---

## 📱 Mobile & APK

O jogo roda em qualquer browser moderno. Para gerar APK Android:

1. Abra o `index.html` no Android Studio via WebView
2. Compile normalmente — pronto para instalar

O `mobile-optimizer.js` cuida de touch events, tamanho de botões e layout responsivo automaticamente.

---

## 🚀 Como Rodar Localmente

```bash
# Sem servidor? Não precisa — basta abrir o arquivo:
open index.html

# Ou com servidor local para evitar restrições CORS:
npx serve .
# ou
python -m http.server 8080
```

---

## 🛤️ Roadmap

- [ ] **v28.0** — Sistema de Guildas com chat e boss compartilhado
- [ ] **v29.0** — Editor de personagem com arte procedural
- [ ] **v30.0** — Modo PvP assíncrono (desafiar build de outro jogador)
- [ ] **APK Oficial** — empacotamento via Capacitor/Cordova

---

## 📄 Licença

Projeto open-source para estudo e experimentação em Game Dev + Web Development. Use, modifique e distribua livremente — créditos são apreciados.

---

<div align="center">

**Feito com ⚔️ e Vanilla JS por um desenvolvedor que quis demais de uma calculadora**

[🎮 Jogar Agora](https://calcquest-rpg.netlify.app/) · [📋 Changelog Completo](CHANGELOG.html)

</div>
