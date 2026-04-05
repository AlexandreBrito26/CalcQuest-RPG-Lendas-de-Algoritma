// ═══════════════════════════════════════════════════════════════
// MODULE: changelog-unified.js
// Injeta o changelog completo e atualizado (v1 → v24+) no modal
// existente do jogo, substituindo o conteúdo desatualizado.
// ═══════════════════════════════════════════════════════════════

;(function ChangelogUnified() {
  'use strict';

  // ── HTML completo do changelog ────────────────────────────────
  var CHANGELOG_HTML = `
<style>
#changelog-modal {
  font-family: 'Fira Code', 'Crimson Pro', Georgia, serif;
  background: #0a0a0f;
  color: #c8b98a;
}
#changelog-modal .cl-wrap {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 20px 60px;
  position: relative;
  z-index: 1;
}
#changelog-modal .cl-close-btn {
  position: sticky;
  top: 12px;
  float: right;
  margin: 12px 0 0 0;
  z-index: 11;
  background: rgba(12,12,20,0.95);
  border: 1px solid rgba(168,85,247,0.4);
  color: #c084fc;
  border-radius: 8px;
  padding: 6px 14px;
  font-family: 'Orbitron', 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.1em;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
}
#changelog-modal .cl-close-btn:hover {
  background: rgba(168,85,247,0.15);
  border-color: #c084fc;
}
#changelog-modal .cl-header {
  text-align: center;
  padding: 56px 24px 36px;
  position: relative;
}
#changelog-modal .cl-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%);
  pointer-events: none;
}
#changelog-modal .cl-header-tag {
  font-family: 'Fira Code', monospace;
  font-size: 10px;
  color: #52525b;
  letter-spacing: 0.12em;
  display: block;
  margin-bottom: 12px;
}
#changelog-modal .cl-header h1 {
  font-family: 'Orbitron', 'Fira Code', monospace;
  font-size: clamp(22px, 5vw, 38px);
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #c9a84c;
  text-shadow: 0 0 32px rgba(201,168,76,0.35);
  line-height: 1.1;
  margin-bottom: 8px;
}
#changelog-modal .cl-header h1 span { color: #a855f7; }
#changelog-modal .cl-header-sub {
  font-size: 12px;
  color: #6b5e3e;
  letter-spacing: 0.06em;
}
#changelog-modal .cl-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 4px;
  position: sticky;
  top: 0;
  background: rgba(10,10,15,0.97);
  z-index: 5;
  backdrop-filter: blur(8px);
}
#changelog-modal .cl-nav a {
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #6b5e3e;
  padding: 4px 10px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.15s;
  white-space: nowrap;
}
#changelog-modal .cl-nav a:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
#changelog-modal .cl-nav a.active { color: #a855f7; border-color: rgba(168,85,247,0.4); background: rgba(168,85,247,0.08); }
#changelog-modal .cl-body { padding: 0 20px; }
#changelog-modal .cl-section {
  padding: 28px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  scroll-margin-top: 80px;
}
#changelog-modal .cl-section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
#changelog-modal .cl-section-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
#changelog-modal .cl-version-badge {
  font-family: 'Orbitron', 'Fira Code', monospace;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 6px;
  white-space: nowrap;
  flex-shrink: 0;
}
#changelog-modal .badge-latest  { background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.4); }
#changelog-modal .badge-new     { background: rgba(201,168,76,0.1);  color: #c9a84c; border: 1px solid rgba(201,168,76,0.25); }
#changelog-modal .badge-module  { background: rgba(14,165,233,0.1);  color: #38bdf8; border: 1px solid rgba(14,165,233,0.25); }
#changelog-modal .badge-content { background: rgba(52,211,153,0.08); color: #6ee7b7; border: 1px solid rgba(52,211,153,0.2); }
#changelog-modal .badge-fix     { background: rgba(239,68,68,0.1);   color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
#changelog-modal .cl-section-title {
  font-family: 'Orbitron', 'Fira Code', monospace;
  font-size: 12px;
  font-weight: 700;
  color: #e5d5a0;
  letter-spacing: 0.04em;
  line-height: 1.3;
}
#changelog-modal .cl-section-title small {
  display: block;
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 400;
  color: #52525b;
  letter-spacing: 0.06em;
  margin-top: 2px;
}
#changelog-modal .cl-date {
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  color: #3f3f46;
  letter-spacing: 0.06em;
  white-space: nowrap;
  margin-top: 2px;
}
#changelog-modal .cl-latest-badge {
  display: inline-block;
  font-family: 'Orbitron', monospace;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #a855f7;
  background: rgba(168,85,247,0.12);
  border: 1px solid rgba(168,85,247,0.3);
  border-radius: 3px;
  padding: 2px 6px;
  vertical-align: middle;
  margin-left: 6px;
  animation: cl-pulse 2s ease-in-out infinite;
}
@keyframes cl-pulse {
  0%,100% { opacity:1; }
  50% { opacity:0.5; }
}
#changelog-modal .cl-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 14px;
}
#changelog-modal .cl-tag {
  font-family: 'Fira Code', monospace;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border-radius: 3px;
  text-transform: uppercase;
}
#changelog-modal .cl-tag.tag-new     { background: rgba(76,175,128,0.12); color: #4caf80; border: 1px solid rgba(76,175,128,0.2); }
#changelog-modal .cl-tag.tag-fix     { background: rgba(91,155,213,0.12); color: #5b9bd5; border: 1px solid rgba(91,155,213,0.2); }
#changelog-modal .cl-tag.tag-module  { background: rgba(14,165,233,0.12); color: #38bdf8; border: 1px solid rgba(14,165,233,0.2); }
#changelog-modal .cl-tag.tag-content { background: rgba(201,168,76,0.1);  color: #c9a84c; border: 1px solid rgba(201,168,76,0.2); }
#changelog-modal .cl-groups { display: flex; flex-direction: column; gap: 18px; }
#changelog-modal .cl-group-label {
  font-family: 'Orbitron', 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 700;
  color: #6b5e3e;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(201,168,76,0.1);
  margin-bottom: 8px;
  position: relative;
}
#changelog-modal .cl-group-label::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 32px;
  height: 1px;
  background: #c9a84c;
}
#changelog-modal .cl-items { display: flex; flex-direction: column; gap: 6px; }
#changelog-modal .cl-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 8px 12px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 6px;
  transition: all 0.15s;
}
#changelog-modal .cl-item:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(201,168,76,0.12);
}
#changelog-modal .cl-item-icon {
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 1px;
}
#changelog-modal .cl-item-body { flex: 1; min-width: 0; }
#changelog-modal .cl-item-title {
  font-size: 11px;
  color: #e5d5a0;
  font-weight: 600;
  line-height: 1.4;
  font-family: 'Fira Code', monospace;
}
#changelog-modal .cl-item-desc {
  font-size: 10px;
  color: #6b5e3e;
  margin-top: 2px;
  line-height: 1.6;
}
#changelog-modal .cl-section-desc {
  font-size: 11px;
  color: #6b5e3e;
  margin-bottom: 14px;
  line-height: 1.7;
  font-style: italic;
}
#changelog-modal .cl-footer {
  text-align: center;
  padding: 32px 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  color: #3f3f46;
  letter-spacing: 0.08em;
}
#changelog-modal .cl-footer strong { color: #a855f7; }
</style>

<div class="cl-wrap">
  <button class="cl-close-btn" onclick="closeChangelog()">✕ FECHAR</button>
  <div style="clear:both"></div>

  <div class="cl-header">
    <span class="cl-header-tag">// calcquest · lendas de algoritma · changelog completo</span>
    <h1>ALGORITMA <span>UPDATE</span> LOG</h1>
    <p class="cl-header-sub">v1.0 → v24.0+ · todas as versões documentadas</p>
  </div>

  <nav class="cl-nav">
    <a href="#cl-v24" class="active">v24 (Atual)</a>
    <a href="#cl-v23">v23</a>
    <a href="#cl-v22">v22</a>
    <a href="#cl-v21">v21</a>
    <a href="#cl-v20">v20</a>
    <a href="#cl-v19">v19</a>
    <a href="#cl-v18">v18</a>
    <a href="#cl-v17">v17</a>
    <a href="#cl-modulos">Módulos</a>
    <a href="#cl-v16v29">v16–v29</a>
    <a href="#cl-v10v15">v10–v15</a>
    <a href="#cl-v1v9">v1–v9</a>
  </nav>

  <div class="cl-body">

  <!-- ══════════════════════════ v24 ══════════════════════════ -->
  <div class="cl-section" id="cl-v24">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-latest">v24.0</span>
        <div class="cl-section-title">
          Mega Patch — Estabilidade &amp; Frenetismo
          <small>Boss Persist · UI Sync · Level Format · Rebalance · Áudio Turbinado</small>
        </div>
      </div>
      <span class="cl-date">Abr 2026 <span class="cl-latest-badge">ATUAL</span></span>
    </div>
    <p class="cl-section-desc">O maior patch de estabilidade do jogo. Cinco sistemas críticos corrigidos e melhorados de uma vez.</p>
    <div class="cl-tags">
      <span class="cl-tag tag-fix">Bug Fix Crítico</span>
      <span class="cl-tag tag-fix">UI Sync</span>
      <span class="cl-tag tag-new">Áudio</span>
      <span class="cl-tag tag-new">Rebalance</span>
      <span class="cl-tag tag-new">QoL</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Fix 1 — Boss Fight não volta mais ao Ato 1</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🔧</div><div class="cl-item-body"><div class="cl-item-title">Persistência de isBossFight e bossKills</div><div class="cl-item-desc">O jogo voltava sempre ao Ato 1 ao recarregar a página. rpg.save() agora persiste <code>rpg_boss_kills_verified</code> e <code>rpg_last_view</code>. Na inicialização, o bossKills é verificado e corrigido se dessincronizado.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">💾</div><div class="cl-item-body"><div class="cl-item-title">Indicador visual de save (💾 SALVO)</div><div class="cl-item-desc">Pequeno indicador verde aparece no canto da tela sempre que o progresso é salvo, confirmando que nada foi perdido.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">Fix 2 — UI atualiza sem precisar comprar</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🔄</div><div class="cl-item-body"><div class="cl-item-title">Polling agressivo de 500ms + hooks diretos</div><div class="cl-item-desc">UI agora detecta qualquer mudança de estado (gold, HP, XP, equipamentos, bossKills) e força updateUI() automaticamente. equipItem, buyItem, useRelic também têm hooks diretos.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">Fix 3 — Nível legível</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🔢</div><div class="cl-item-body"><div class="cl-item-title">formatLvl() — "1.21B" em vez de "1211799409"</div><div class="cl-item-desc">Função global formatLvl() com sufixos K, M, B, T, Qa, Qi. Aplicada em todos os displays de nível: HUD de batalha, monstros, toast de level-up e menu principal.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">Fix 4 — Rebalanceamento</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">⚖️</div><div class="cl-item-body"><div class="cl-item-title">XP suavizado + HP base aumentado</div><div class="cl-item-desc">xpRequired() agora cresce com curva suavizada acima de nível 100 (evita grind eterno). HP base usa level×18 em vez de ×15, tornando o herói mais resistente sem quebrar o balanço.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">Fix 5 — Áudio frenético</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🎵</div><div class="cl-item-body"><div class="cl-item-title">Trilha Battle (175 BPM) — totalmente nova</div><div class="cl-item-desc">Kick duplo, hi-hat em semicolcheias, contramelo dissonante, baixo sincopado de 16 notas. Muito mais frenético que a trilha original de 145 BPM.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">💀</div><div class="cl-item-body"><div class="cl-item-title">Trilha Boss (185 BPM) — apocalíptica</div><div class="cl-item-desc">Triple-layer de kick, snare devastador, coral de vozes sintéticas, sirene de tensão e baixo com 3 camadas de harmônicas. Sente como fim do mundo.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🔊</div><div class="cl-item-body"><div class="cl-item-title">SFX com variação dinâmica</div><div class="cl-item-desc">Volume aleatório ±15% para dinamismo. Crit: eco duplo. Boss morte: sequência épica + achievement. Level-up: cascata dupla. Slash: alterna entre variantes.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v23 ══════════════════════════ -->
  <div class="cl-section" id="cl-v23">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-new">v23.0</span>
        <div class="cl-section-title">
          A Ascensão das Masterclasses
          <small>Subclasses · God Classes · Arena · Legados · Modo Infinito</small>
        </div>
      </div>
      <span class="cl-date">Abr 2026</span>
    </div>
    <p class="cl-section-desc">O maior salto de progressão do jogo. Classes evoluem além do limite, e o pós-jogo ganha estrutura própria.</p>
    <div class="cl-tags">
      <span class="cl-tag tag-new">Masterclasses</span>
      <span class="cl-tag tag-new">Modo Infinito</span>
      <span class="cl-tag tag-fix">Bug Fix Crítico</span>
      <span class="cl-tag tag-new">Arena Season</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Novos Sistemas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">⚔️</div><div class="cl-item-body"><div class="cl-item-title">Subclasses / Masterclasses / God Classes</div><div class="cl-item-desc">3 camadas de evolução de classe com bônus exclusivos de ATK, HP, Crit e Dodge. Desbloqueadas por boss kills acumuladas.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🏆</div><div class="cl-item-body"><div class="cl-item-title">Temporada de Arena · Sistema de Legados · Banco de Algoritma</div><div class="cl-item-desc">Ranking semanal competitivo · Herança de bônus entre ciclos de NG+ · Ouro depositado gera juros passivos.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">♾️</div><div class="cl-item-body"><div class="cl-item-title">Modo Infinito + Protocolo Primordial</div><div class="cl-item-desc">Desbloqueado após NG+4, inimigos escalam infinitamente. O Protocolo Primordial é o boss final verdadeiro — desbloqueado apenas após completar todos os outros conteúdos.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🎨</div><div class="cl-item-body"><div class="cl-item-title">HUD Dinâmico · Selos de Coleção · Eventos Globais</div><div class="cl-item-desc">Interface muda visualmente conforme a região · Cosméticos desbloqueáveis que modificam o HUD · Eventos globais com bônus especiais e inimigos únicos.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">Correções Críticas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🔧</div><div class="cl-item-body"><div class="cl-item-title">Loop infinito em killMonster + Tela preta no boot</div><div class="cl-item-desc">Wrapper _origKillAdvCheck criava recursão via _ORIG_killMonster. Removido. Bônus de classes avançadas eram sobrescritos pelos patches intermediários — corrigido diretamente nas funções definitivas.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v22 ══════════════════════════ -->
  <div class="cl-section" id="cl-v22">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-new">v22.0</span>
        <div class="cl-section-title">
          O Caos e a Glória
          <small>Notoriedade · Clima · NG+ v3 · Auras · Mutações</small>
        </div>
      </div>
      <span class="cl-date">Mar 2026</span>
    </div>
    <p class="cl-section-desc">Sistemas de meta-progressão, identidade do herói e o início do conteúdo pós-game.</p>
    <div class="cl-tags">
      <span class="cl-tag tag-new">NG+ v3</span>
      <span class="cl-tag tag-new">Auras</span>
      <span class="cl-tag tag-new">Mutações</span>
      <span class="cl-tag tag-new">Clima</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Sistemas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🌟</div><div class="cl-item-body"><div class="cl-item-title">Notoriedade + Reputação de Classe</div><div class="cl-item-desc">Herói ganha reputação conforme derrota bosses — afeta preços, diálogos e eventos. Cada classe ganha nível de reputação pelo uso, desbloqueando bônus permanentes exclusivos.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">⛈️</div><div class="cl-item-body"><div class="cl-item-title">Clima de Batalha (7 tipos)</div><div class="cl-item-desc">Tempestade penaliza magia · Lua cheia buffa mortos-vivos · Chuva reduz acurácia · Sol aumenta cura. Integrado com ciclo dia/noite em tempo real.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🔄</div><div class="cl-item-body"><div class="cl-item-title">New Game+ Reescrito (v3) + Mutações de Prestígio</div><div class="cl-item-desc">NG+ com multiplicadores escaláveis e melhor preservação de progresso. Cada prestige concede uma mutação aleatória com efeitos únicos.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">✨</div><div class="cl-item-body"><div class="cl-item-title">Sistema de Auras · Modo Speed Run · O Oráculo</div><div class="cl-item-desc">Auras modificam estilo de combate (shadow, thunder, void…) · Cronometre boss kills com recordes salvos · NPC especial com dicas e previsões de eventos.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v21 ══════════════════════════ -->
  <div class="cl-section" id="cl-v21">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-new">v21.0</span>
        <div class="cl-section-title">
          O Mundo Vivo
          <small>Skill Chains · Formações · Masmorras Proc. · AI Partner</small>
        </div>
      </div>
      <span class="cl-date">Fev 2026</span>
    </div>
    <p class="cl-section-desc">Profundidade estratégica e narrativa. O jogo começa a se sentir como um mundo real.</p>
    <div class="cl-tags">
      <span class="cl-tag tag-new">Skill Chains</span>
      <span class="cl-tag tag-new">Formações</span>
      <span class="cl-tag tag-new">Dungeons Proc.</span>
      <span class="cl-tag tag-new">AI Partner</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Sistemas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">⚡</div><div class="cl-item-body"><div class="cl-item-title">Skill Chains + Formações de Combate</div><div class="cl-item-desc">Sequências de 3–4 habilidades ativam ataques combinados com nomes únicos. 7 formações ajustam ATK, DEF, velocidade e estilo de luta antes da batalha.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🏰</div><div class="cl-item-body"><div class="cl-item-title">Masmorras Procedurais + Sistema de Karma</div><div class="cl-item-desc">Dungeons geradas com salas variáveis, eventos e boss final aleatório. Decisões narrativas acumulam karma que afeta diálogos, eventos e itens exclusivos.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🤖</div><div class="cl-item-body"><div class="cl-item-title">AI Partner + Codex do Universo</div><div class="cl-item-desc">Companheiro de batalha adaptativo que aprende o estilo do jogador. Enciclopédia in-game com lore sobre regiões, facções e história de Algoritma.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v20 ══════════════════════════ -->
  <div class="cl-section" id="cl-v20">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-new">v20.0</span>
        <div class="cl-section-title">
          O Mapa e os Habitantes
          <small>Mapa SVG · Escolhas Narrativas · Boss com Partes</small>
        </div>
      </div>
      <span class="cl-date">Jan 2026</span>
    </div>
    <p class="cl-section-desc">Algoritma ganhou geografia e habitantes. O jogo deixou de ser linear.</p>
    <div class="cl-tags">
      <span class="cl-tag tag-new">Mapa</span>
      <span class="cl-tag tag-new">Narrativa</span>
      <span class="cl-tag tag-new">Boss Parts</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Sistemas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🗺️</div><div class="cl-item-body"><div class="cl-item-title">Mapa Interativo SVG com névoa de guerra</div><div class="cl-item-desc">Canvas com regiões hexagonais desbloqueáveis, névoa de guerra e clima por região. Cada região tem monstros, drops e dificuldade própria.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">💬</div><div class="cl-item-body"><div class="cl-item-title">Escolhas Narrativas + NPCs com Missões</div><div class="cl-item-desc">Diálogos com múltiplas opções que afetam o mundo. Personagens com quests, backstory e consequências narrativas.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🎯</div><div class="cl-item-body"><div class="cl-item-title">Boss com Partes Destrutíveis (Targeting System)</div><div class="cl-item-desc">Cabeça, braços, pernas — cada parte com HP e drops únicos. Destruir partes expõe fraquezas e muda o comportamento do boss.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v19 ══════════════════════════ -->
  <div class="cl-section" id="cl-v19">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-new">v19.0</span>
        <div class="cl-section-title">
          A Economia do Caos
          <small>Talentos · Forja · Gemas · Batalhas Matemáticas</small>
        </div>
      </div>
      <span class="cl-date">Dez 2025</span>
    </div>
    <p class="cl-section-desc">Profundidade de itens e sistemas econômicos. O herói tem agência real sobre seu poder.</p>
    <div class="cl-tags">
      <span class="cl-tag tag-new">Talentos</span>
      <span class="cl-tag tag-new">Forja</span>
      <span class="cl-tag tag-new">Gemas</span>
      <span class="cl-tag tag-new">Honra</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Sistemas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🌳</div><div class="cl-item-body"><div class="cl-item-title">Árvore de Talentos (3 árvores, 5 tiers)</div><div class="cl-item-desc">Ofensiva, Defensiva, Suporte. Pontos ganhos por level-up. Cada tier desbloqueia habilidades únicas por classe.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">⚒️</div><div class="cl-item-body"><div class="cl-item-title">Forja &amp; Upgrade + Gemas + Relíquias Amaldiçoadas</div><div class="cl-item-desc">Aprimorar armas e armaduras com materiais. Gemas encaixáveis por slot. Relíquias de alto risco/recompensa com efeitos colaterais.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🧮</div><div class="cl-item-body"><div class="cl-item-title">Batalhas Matemáticas + Mercador Errante</div><div class="cl-item-desc">Mini-jogo de cálculo durante combate: acerto = bônus de dano, erro = penalidade. NPC com itens raros rotacionados por tempo limitado.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v18 ══════════════════════════ -->
  <div class="cl-section" id="cl-v18">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-new">v18.0</span>
        <div class="cl-section-title">
          As Runas do Abismo
          <small>Runas · Conquistas · Wave Survival · Dungeon Diária · Modo Desafio</small>
        </div>
      </div>
      <span class="cl-date">Nov 2025</span>
    </div>
    <p class="cl-section-desc">O primeiro major expansion do CalcQuest. Camadas de poder e desafio.</p>
    <div class="cl-tags">
      <span class="cl-tag tag-new">Runas</span>
      <span class="cl-tag tag-new">Conquistas</span>
      <span class="cl-tag tag-new">Wave Survival</span>
      <span class="cl-tag tag-new">Modo Desafio</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Sistemas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">💎</div><div class="cl-item-body"><div class="cl-item-title">Sistema de Runas (glass cannon, titan, momentum…)</div><div class="cl-item-desc">Runas equipáveis que modificam drasticamente o estilo de combate. Berserker, Storm, Regen, Fortune, Echo, Mirror, Vampírica e mais.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🏅</div><div class="cl-item-body"><div class="cl-item-title">Conquistas com Buffs Passivos + Modo Onda</div><div class="cl-item-desc">60+ conquistas que desbloqueiam melhorias permanentes. Modo Wave Survival com dificuldade crescente infinita.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🔐</div><div class="cl-item-body"><div class="cl-item-title">Modo Desafio + Grimório + Dungeon Diária</div><div class="cl-item-desc">Runs com restrições autoimposta (fragile, hardcore, no-heal) por recompensas maiores. Biblioteca de passivas. Dungeon de 5 andares que reseta todo dia.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v17 ══════════════════════════ -->
  <div class="cl-section" id="cl-v17">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-new">v17.0</span>
        <div class="cl-section-title">
          Os Elementos Despertam
          <small>Elementos · Status Effects · Break System · 5ª Skill</small>
        </div>
      </div>
      <span class="cl-date">Out 2025</span>
    </div>
    <p class="cl-section-desc">Combate ganhou dimensão elemental. Bosses passaram a ter personalidade própria.</p>
    <div class="cl-tags">
      <span class="cl-tag tag-new">Elementos</span>
      <span class="cl-tag tag-new">Status Effects</span>
      <span class="cl-tag tag-new">Break System</span>
      <span class="cl-tag tag-new">Diálogos Boss</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Sistemas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🔥</div><div class="cl-item-body"><div class="cl-item-title">Elementos + Status Effects (Burn, Freeze, Stun, Poison)</div><div class="cl-item-desc">Fogo, gelo, raio, veneno com afinidades e fraquezas. Effects com duração e visuais próprios aplicáveis por skills e itens.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🛡️</div><div class="cl-item-body"><div class="cl-item-title">Break System + 5ª Skill por Classe + Battle Log</div><div class="cl-item-desc">Shield Points exigem dano de break. Habilidade suprema desbloqueada no Lv40+. Registro de ações de combate em tempo real.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">💬</div><div class="cl-item-body"><div class="cl-item-title">Diálogos de Boss + Fragmentos de Lore + Classe O Protocolo</div><div class="cl-item-desc">Bosses falam antes, durante e após o combate. Textos desbloqueados por boss kills. Nova classe secreta baseada em lógica e código.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ MÓDULOS ══════════════════════ -->
  <div class="cl-section" id="cl-modulos">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-module">Módulos</span>
        <div class="cl-section-title">
          Expansões como Módulos Externos
          <small>Sistemas independentes carregados após o core do jogo</small>
        </div>
      </div>
      <span class="cl-date">2025–2026</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">Visual &amp; Interface</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">💥</div><div class="cl-item-body"><div class="cl-item-title">damage-numbers.js · combat-hud.js · combat-elements.js</div><div class="cl-item-desc">Números de dano tamanho-proporcional com cores por tipo · HUD expandido com barras animadas e indicadores de turno · Efeitos visuais por elemento.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🌅</div><div class="cl-item-body"><div class="cl-item-title">day-night-effects.js · boot-screen.js · achievement-notifications.js</div><div class="cl-item-desc">Ciclo dia/noite baseado no relógio real · Tela de carregamento temática · Popup animado ao desbloquear conquistas.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">Gameplay</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">⚗️</div><div class="cl-item-body"><div class="cl-item-title">alchemy-system.js · class-synergy.js · monster-evolution.js</div><div class="cl-item-desc">Alquimia com 8 receitas base + 3 secretas · Sinergias de classes em NG+ · Monstros evoluem conforme são mortos repetidamente.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🌦️</div><div class="cl-item-body"><div class="cl-item-title">weather-system.js · boss-parts-destructible.js · quest-tracker.js</div><div class="cl-item-desc">6 climas com efeitos reais em combate · Lógica completa de dano por parte de boss · Tracker flutuante com progresso em tempo real.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">Narrativa &amp; Lore</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">📖</div><div class="cl-item-body"><div class="cl-item-title">codex-lore.js · hero-diary.js · living-village.js · post-game-region.js</div><div class="cl-item-desc">50+ fragmentos de lore · Diário do Herói com entradas via Anthropic API após boss kills · Aldeia Viva com NPCs dinâmicos · O Vazio: região pós-NG+.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">UI &amp; QoL</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🗺️</div><div class="cl-item-body"><div class="cl-item-title">world-map.js · unified-dock.js · quick-menu.js · inventory-ui.js</div><div class="cl-item-desc">Mapa SVG hexagonal com névoa de guerra · Dock unificada de acesso rápido · Menu via swipe · Inventário com filtros e comparação.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">📊</div><div class="cl-item-body"><div class="cl-item-title">ui-live-sync.js · session-stats.js · mobile-optimizer.js · sound-system.js</div><div class="cl-item-desc">Sync de UI via MutationObserver · Dashboard de sessão em tempo real · Otimizações mobile · Sistema de som procedural via Web Audio API.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">Correções de Núcleo</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🔧</div><div class="cl-item-body"><div class="cl-item-title">combat-fix.js · combat-master-fix.js · dungeon-fix.js · buttons-fix.js</div><div class="cl-item-desc">Parry no mesmo frame do ataque · Estados órfãos de combate · Progressão de dungeons · Botões que paravam de responder.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">💾</div><div class="cl-item-body"><div class="cl-item-title">save-system.js · ng-plus-v3.js · mega-patch-v24.js</div><div class="cl-item-desc">Save com versionamento e migração automática · NG+ reescrito do zero com multiplicadores balanceados · Patch V24 com boss persist, UI sync, level format, rebalance e áudio.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v16–v29 ══════════════════════ -->
  <div class="cl-section" id="cl-v16v29">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge badge-content">v16–v29</span>
        <div class="cl-section-title">
          Era da Estabilização
          <small>Auto Attack · Mapa Expandido · Formações · Spawn Fixes</small>
        </div>
      </div>
      <span class="cl-date">Histórico</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">v29.0 — Spawn Fix &amp; Novos Mundos</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🔧</div><div class="cl-item-body"><div class="cl-item-title">SpawnWatchdog definitivo + Auto Attack v8 (FINAL)</div><div class="cl-item-desc">Watchdog verifica a cada 1.5s se isSpawning está preso. IIFE completamente isolado. 3 Novos Mundos: Reino de Cristal (Lvl 3100), Forja Binária (Lvl 3500), Vazio de Axioma (Lvl 3800).</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">v28–v25 — Auto Attack v3→v7 · Interface · Mapa</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">⚡</div><div class="cl-item-body"><div class="cl-item-title">Reescrita completa do Auto Attack (v3→v7)</div><div class="cl-item-desc">Migrado de requestAnimationFrame para setInterval independente. IIFE no fim absoluto do arquivo com variáveis completamente privadas. Watchdog + hooks em endBattle/startBattle. Auto-cura HP&lt;35%.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🗺️</div><div class="cl-item-body"><div class="cl-item-title">Mapa expandido 17 regiões + 5 Tiers · Formações · Interface</div><div class="cl-item-desc">Deserto de Bits · Tundra Binária · Tempestade Elétrica · Dimensão Sombria · Abismo Primordial. 7 Formações de Combate com efeitos únicos. Botões de combate com dim visual e glow.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">v24–v23 — Estratégia Profunda</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">✨</div><div class="cl-item-body"><div class="cl-item-title">Partículas · Radar Chart · HUD Dinâmico · Arena Season</div><div class="cl-item-desc">7 tipos de partículas de dano com CSS · Gráfico pentagonal SVG no perfil · 13 ranks Bronze→Lenda · Boss final Protocolo Primordial 5 fases Lvl 4000 HP 1e18.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v10–v15 ══════════════════════ -->
  <div class="cl-section" id="cl-v10v15">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge" style="background:rgba(14,165,233,0.1);color:#38bdf8;border:1px solid rgba(14,165,233,0.25);">v10–v16</span>
        <div class="cl-section-title">
          Era do Endgame
          <small>Atos Finais · Save · Bilinguismo · Cloud Save · Realm God</small>
        </div>
      </div>
      <span class="cl-date">Histórico</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">v16.0 — O Núcleo Quântico</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🌌</div><div class="cl-item-body"><div class="cl-item-title">Ato Final · Save completo · Passe de Batalha 5 Tiers</div><div class="cl-item-desc">Boss Lvl 2500 · 4 monstros · Arena violeta animada. save() persiste em localStorage. exportSave/importSave. Battle Pass 50 níveis em 5 Tiers.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">v15.0–v12.0 — Epílogos &amp; Dificuldades Extremas</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🌀</div><div class="cl-item-body"><div class="cl-item-title">Epílogos I–IV · Realm God (+5000%) · Dificuldade Caos (+900%)</div><div class="cl-item-desc">4 Epílogos narrativos pós-game. Guardiões Lvl 2000+. Armas nos Bilhões e Trilhões. Portais bloqueados por história. Avatar clicável e medalhas.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">v11.0–v8.0 — Globalização</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🌐</div><div class="cl-item-body"><div class="cl-item-title">Bilíngue PT/EN + Cloud Save + Auto-Batalha</div><div class="cl-item-desc">Suporte completo PT/EN com toggleLang. Exportar/importar save por código Base64. Auto-batalha com cooldown. Poções como loot de inimigos.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════ v1–v9 ════════════════════════ -->
  <div class="cl-section" id="cl-v1v9">
    <div class="cl-section-header">
      <div class="cl-section-left">
        <span class="cl-version-badge" style="background:rgba(52,211,153,0.08);color:#6ee7b7;border:1px solid rgba(52,211,153,0.2);">v1–v9</span>
        <div class="cl-section-title">
          Fundação de CalcQuest
          <small>O Início · ATB · Classes · Loja · Bestiário · Prestige</small>
        </div>
      </div>
      <span class="cl-date">2024</span>
    </div>
    <div class="cl-groups">
      <div class="cl-group">
        <div class="cl-group-label">v9.0–v7.0 — O Sistema de Combate</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">⚔️</div><div class="cl-item-body"><div class="cl-item-title">ATB em tempo real + Parry + Esquiva + Crítico + 7 dificuldades</div><div class="cl-item-desc">4 ações: Ataque, Magia, Defesa, Cura. Multiplicador de Combo. Barra de Fúria com Supremo. Sistema de parry com janela de timing. De Fácil a Realm God.</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">v6.0–v4.0 — RPG Core</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">⚗️</div><div class="cl-item-body"><div class="cl-item-title">15+ Classes · Loja · Bestiário · 16 Relíquias · 19 Temas</div><div class="cl-item-desc">Guerreiro, Mago, Arqueiro, Monge, Necromante e mais. Loja com armas/armaduras/pets. 40+ monstros catalogados. 19 arenas: Ruínas, Void, Neon, Matrix, Quantum e mais.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🔮</div><div class="cl-item-body"><div class="cl-item-title">Runas (3 slots) + Portais + Modo Matemático + Nightmare/Extreme</div><div class="cl-item-desc">Runas com efeitos passivos. Portais entre regiões. Questões matemáticas que afetam o combate. Dificuldades Nightmare (+300%) e Extreme (+150%).</div></div></div>
        </div>
      </div>
      <div class="cl-group">
        <div class="cl-group-label">v3.0–v1.0 — O Início</div>
        <div class="cl-items">
          <div class="cl-item"><div class="cl-item-icon">🌱</div><div class="cl-item-body"><div class="cl-item-title">Fundação: motor Vanilla JS + Narrativa em Atos + Prestige</div><div class="cl-item-desc">Game loop com requestAnimationFrame, sem frameworks. Ato I — O Despertar · Ato II — Ameaça Cósmica · Ato III — O Vazio Absoluto. Prestige, missões diárias, co-op, PvP assíncrono e Battle Pass desde o início.</div></div></div>
          <div class="cl-item"><div class="cl-item-icon">🧮</div><div class="cl-item-body"><div class="cl-item-title">A pergunta original</div><div class="cl-item-desc"><em>"E se uma calculadora pudesse evoluir em um RPG?"</em> — Essa pergunta gerou CalcQuest: Lendas de Algoritma.</div></div></div>
        </div>
      </div>
    </div>
  </div>

  </div><!-- cl-body -->

  <div class="cl-footer">
    <strong>ALGORITMA RPG</strong> · changelog completo v1.0 → v24.0 · todas as versões documentadas
  </div>
</div><!-- cl-wrap -->
`;

  // ── Injetar no modal ──────────────────────────────────────────
  function inject() {
    var modal = document.getElementById('changelog-modal');
    if (!modal) {
      // Criar o modal se não existir
      modal = document.createElement('div');
      modal.id = 'changelog-modal';
      modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);overflow-y:auto;';
      document.body.appendChild(modal);
    }

    modal.innerHTML = CHANGELOG_HTML;

    // Ativar navegação por âncoras dentro do modal
    modal.querySelectorAll('.cl-nav a').forEach(function(a) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href').replace('#', '');
        var target = modal.querySelector('#' + targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        modal.querySelectorAll('.cl-nav a').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });

    // Fechar clicando fora
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    console.log('[ChangelogUnified] Changelog injetado com sucesso ✓');
  }

  // ── Garantir que openChangelog e closeChangelog funcionam ─────
  window.openChangelog = function() {
    var modal = document.getElementById('changelog-modal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      // Scroll ao topo
      modal.scrollTop = 0;
    }
  };
  window.closeChangelog = function() {
    var modal = document.getElementById('changelog-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  // ── Executar após DOM carregar ────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    // DOM já carregado, aguardar um tick para garantir que o modal existe
    setTimeout(inject, 100);
  }

})();
