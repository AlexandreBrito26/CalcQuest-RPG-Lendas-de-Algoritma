// ═══════════════════════════════════════════════════════════════
// MODULE: hero-diary.js  — 📖 Diário do Herói com IA Narrativa
// • Gera entradas narrativas via Anthropic API após boss kills
// • Gera epílogo/prólogo em ciclos de NG+
// • UI de diário com páginas viráveis (CSS flip animation)
// • Salva em rpg.heroDiary[] (compatível com save-system.js)
// • Integra-se automaticamente com o sistema de combate existente
// ═══════════════════════════════════════════════════════════════
(function HeroDiaryModule() {
  'use strict';

  // ── Configuração da API ──────────────────────────────────────
  const API_URL   = 'https://api.anthropic.com/v1/messages';
  const API_MODEL = 'claude-sonnet-4-20250514';

  // ── Estado do módulo ─────────────────────────────────────────
  let currentPage = 0;   // página actual na UI (par = frente, ímpar = verso)
  let isGenerating = false;

  // ── 1. Hook pós boss kill ─────────────────────────────────────
  function hookBossKill() {
    const _origKillMonster = rpg.killMonster;
    if (!_origKillMonster) return;

    rpg.killMonster = function() {
      const wasBoss      = !!(this.monster && (this.monster.isBoss || this.isBossFight));
      const monsterName  = this.monster ? (this.monster.name || 'criatura desconhecida') : 'criatura';
      const monsterEmoji = this.monster ? (this.monster.emoji || '👹') : '👹';
      const result       = _origKillMonster.apply(this, arguments);

      if (wasBoss) {
        setTimeout(() => {
          generateBossEntry({
            heroName:    this.heroName    || 'Herói',
            heroClass:   getClassName(this.eqClass),
            heroLevel:   this.level       || 1,
            bossName:    monsterName,
            bossEmoji:   monsterEmoji,
            location:    getLocationName(this.currentZone || this.zone),
            totalKills:  this.kills       || 0,
            bossKills:   this.bossKills   || 0,
            gold:        this.gold        || 0,
            previousEntries: getLastEntries(2),
          });
        }, 1200);
      }

      return result;
    };
  }

  // ── 2. Hook pós NG+ ──────────────────────────────────────────
  function hookNgPlus() {
    // Patch na função de prestige/NG+
    const candidates = ['doPrestige', 'doNgPlus', 'activateNgPlus', 'startNgPlus'];
    candidates.forEach(fnName => {
      const orig = rpg[fnName];
      if (!orig) return;

      rpg[fnName] = function() {
        const oldCycle = this.ngPlusActive || 0;
        const result   = orig.apply(this, arguments);

        setTimeout(() => {
          generateNgPlusEntry({
            heroName:   this.heroName   || 'Herói',
            heroClass:  getClassName(this.eqClass),
            heroLevel:  this.level      || 1,
            oldCycle:   oldCycle,
            newCycle:   this.ngPlusActive || oldCycle + 1,
            totalKills: this.kills      || 0,
            bossKills:  this.bossKills  || 0,
            gold:       this.gold       || 0,
          });
        }, 800);

        return result;
      };
    });
  }

  // ── 3. Geração de entrada de boss ────────────────────────────
  async function generateBossEntry(ctx) {
    if (isGenerating) return;
    isGenerating = true;

    const entryId = 'boss_' + Date.now();
    const placeholder = addDiaryEntry({
      id:        entryId,
      type:      'boss',
      title:     ctx.bossEmoji + ' ' + ctx.bossName + ' Derrotado',
      date:      formatDate(),
      level:     ctx.heroLevel,
      text:      '✍️ Escrevendo...',
      generating: true,
    });

    const prompt = buildBossPrompt(ctx);

    try {
      const text = await callAnthropicAPI(prompt);
      updateDiaryEntry(entryId, { text, generating: false });
      saveDiary();
      showDiaryNotification('📖 Nova entrada no diário!');
    } catch (e) {
      console.warn('[HeroDiaryModule] API error:', e);
      updateDiaryEntry(entryId, {
        text: getFallbackBossText(ctx),
        generating: false,
      });
      saveDiary();
    } finally {
      isGenerating = false;
    }
  }

  // ── 4. Geração de entrada de NG+ ─────────────────────────────
  async function generateNgPlusEntry(ctx) {
    if (isGenerating) return;
    isGenerating = true;

    const entryId = 'ngplus_' + Date.now();
    addDiaryEntry({
      id:        entryId,
      type:      'ngplus',
      title:     '🔄 Novo Ciclo — ' + getRomanNumeral(ctx.newCycle),
      date:      formatDate(),
      level:     ctx.heroLevel,
      text:      '✍️ Escrevendo...',
      generating: true,
    });

    const prompt = buildNgPlusPrompt(ctx);

    try {
      // NG+ tem duas partes: epílogo do ciclo antigo + prólogo do novo
      const epiloguePrompt = buildNgPlusPrompt(ctx, 'epilogue');
      const prologuePrompt = buildNgPlusPrompt(ctx, 'prologue');

      const [epilogue, prologue] = await Promise.all([
        callAnthropicAPI(epiloguePrompt),
        callAnthropicAPI(prologuePrompt),
      ]);

      const combined = '【Epílogo】\n' + epilogue + '\n\n【Prólogo】\n' + prologue;
      updateDiaryEntry(entryId, { text: combined, generating: false });
      saveDiary();
      showDiaryNotification('📖 Novo ciclo registado no diário!');
    } catch (e) {
      console.warn('[HeroDiaryModule] NG+ API error:', e);
      updateDiaryEntry(entryId, {
        text: getFallbackNgPlusText(ctx),
        generating: false,
      });
      saveDiary();
    } finally {
      isGenerating = false;
    }
  }

  // ── 5. Prompts para a API ─────────────────────────────────────
  function buildBossPrompt(ctx) {
    const lang = rpg.lang || 'pt';
    const prevContext = ctx.previousEntries.length > 0
      ? '\n\nEntradas anteriores do diário (para continuidade narrativa):\n' +
        ctx.previousEntries.map(e => '"' + e.text.slice(0, 150) + '..."').join('\n')
      : '';

    return `Você é o ${ctx.heroName}, um(a) ${ctx.heroClass} de nível ${ctx.heroLevel} num RPG de fantasia épica.
Acabaste de derrotar ${ctx.bossName} em ${ctx.location}.
Stats: ${ctx.totalKills} criaturas eliminadas, ${ctx.bossKills} guardiões derrotados, ${ctx.gold} de ouro.${prevContext}

Escreve UMA entrada de diário pessoal em português europeu (1 parágrafo, máximo 120 palavras).
Tom: épico mas pessoal e visceral — como um guerreiro real que acabou de sobreviver a algo terrível.
Menciona o boss, descreve a luta brevemente, expressa emoção genuína (triunfo, exaustão, medo superado).
Não uses clichés genéricos. Começa directamente com a narrativa, sem título.`;
  }

  function buildNgPlusPrompt(ctx, part) {
    const roman = getRomanNumeral(ctx.oldCycle + 1);
    const romanNew = getRomanNumeral(ctx.newCycle + 1);

    if (part === 'epilogue') {
      return `Você é o ${ctx.heroName}, um(a) ${ctx.heroClass} que acaba de completar o ciclo ${roman} da sua jornada.
Stats finais: nível ${ctx.heroLevel}, ${ctx.totalKills} criaturas eliminadas, ${ctx.bossKills} guardiões derrotados.

Escreve um epílogo em português europeu (1 parágrafo, máximo 100 palavras).
Tom: reflexivo, melancólico mas resoluto. O herói olha para trás para o ciclo que terminou.
Expressa o que foi aprendido, o custo da vitória, a paz fugaz antes de recomeçar.`;
    }

    if (part === 'prologue') {
      return `Você é o ${ctx.heroName}, um(a) ${ctx.heroClass} que começa agora o ciclo ${romanNew} da sua jornada.
O mundo recomeçou, mas a memória permanece.

Escreve um prólogo em português europeu (1 parágrafo, máximo 100 palavras).
Tom: determinado, com um toque de fardo — alguém que escolhe lutar de novo sabendo o custo.
Expressa a resolução de enfrentar tudo outra vez, mais forte e mais sábio.`;
    }

    // fallback
    return buildBossPrompt(ctx);
  }

  // ── 6. Chamada à API Anthropic ───────────────────────────────
  async function callAnthropicAPI(prompt) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      API_MODEL,
        max_tokens: 1000,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) throw new Error('API ' + response.status);
    const data = await response.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');
    if (!text) throw new Error('Resposta vazia');
    return text.trim();
  }

  // ── 7. Gestão do diário ──────────────────────────────────────
  function addDiaryEntry(entry) {
    if (!rpg.heroDiary) rpg.heroDiary = [];
    rpg.heroDiary.unshift(entry);   // mais recente primeiro
    if (rpg.heroDiary.length > 50)  // limita a 50 entradas
      rpg.heroDiary = rpg.heroDiary.slice(0, 50);
    refreshDiaryUI();
    return entry;
  }

  function updateDiaryEntry(id, updates) {
    if (!rpg.heroDiary) return;
    const idx = rpg.heroDiary.findIndex(e => e.id === id);
    if (idx !== -1) {
      Object.assign(rpg.heroDiary[idx], updates);
      refreshDiaryUI();
    }
  }

  function saveDiary() {
    if (rpg.save) {
      try { rpg.save(); } catch(e) {}
    }
  }

  function getLastEntries(n) {
    return (rpg.heroDiary || []).slice(0, n);
  }

  // ── 8. Modal do diário ───────────────────────────────────────
  function createDiaryModal() {
    if (document.getElementById('hero-diary-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'hero-diary-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.style.zIndex = '600';
    modal.innerHTML = `
      <div class="diary-book-container">
        <!-- Capa do livro -->
        <div class="diary-cover">
          <div class="diary-cover-inner">
            <div class="diary-spine"></div>
            <div class="diary-cover-front">
              <div class="diary-cover-ornament">✦ ✦ ✦</div>
              <div class="diary-cover-title">DIÁRIO</div>
              <div class="diary-cover-subtitle" id="diary-cover-name">do Herói</div>
              <div class="diary-cover-ornament">✦ ✦ ✦</div>
              <button class="diary-open-btn" onclick="window._diaryOpen()">Abrir Diário</button>
            </div>
          </div>
        </div>

        <!-- Livro aberto -->
        <div class="diary-book" id="diary-book" style="display:none;">
          <!-- Botão fechar -->
          <button class="diary-close-btn" onclick="closeModal('hero-diary-modal')" title="Fechar">✕</button>

          <!-- Página esquerda (verso da folha anterior / índice) -->
          <div class="diary-page diary-page-left" id="diary-page-left">
            <div class="diary-page-header">
              <span class="diary-page-ornament">❧</span>
              <span class="diary-page-label">ÍNDICE</span>
              <span class="diary-page-ornament">❧</span>
            </div>
            <div class="diary-index-list" id="diary-index-list"></div>
            <div class="diary-page-number" id="diary-left-num">—</div>
          </div>

          <!-- Dobra central -->
          <div class="diary-spine-center"></div>

          <!-- Página direita (entrada actual) -->
          <div class="diary-page diary-page-right" id="diary-page-right">
            <div class="diary-page-header">
              <span class="diary-page-ornament">❦</span>
              <span class="diary-page-label" id="diary-entry-date">—</span>
              <span class="diary-page-ornament">❦</span>
            </div>
            <div class="diary-entry-title" id="diary-entry-title"></div>
            <div class="diary-entry-level" id="diary-entry-level"></div>
            <div class="diary-entry-text" id="diary-entry-text"></div>
            <div class="diary-page-number" id="diary-right-num">I</div>
          </div>

          <!-- Navegação -->
          <div class="diary-nav">
            <button class="diary-nav-btn" id="diary-prev" onclick="window._diaryPrev()" title="Anterior">‹ Anterior</button>
            <div class="diary-nav-counter" id="diary-nav-counter">1 / 1</div>
            <button class="diary-nav-btn" id="diary-next" onclick="window._diaryNext()" title="Próxima">Próxima ›</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    injectDiaryStyles();
  }

  // ── 9. Lógica de navegação do diário ─────────────────────────
  window._diaryOpen = function() {
    const cover = document.querySelector('.diary-cover');
    const book  = document.getElementById('diary-book');
    if (cover) cover.style.display = 'none';
    if (book)  book.style.display  = 'flex';
    currentPage = 0;
    renderDiaryPage(0);
  };

  window._diaryPrev = function() {
    if (currentPage > 0) {
      currentPage--;
      animatePageTurn('prev');
      renderDiaryPage(currentPage);
    }
  };

  window._diaryNext = function() {
    const entries = rpg.heroDiary || [];
    if (currentPage < entries.length - 1) {
      currentPage++;
      animatePageTurn('next');
      renderDiaryPage(currentPage);
    }
  };

  window._diaryGoTo = function(idx) {
    currentPage = idx;
    renderDiaryPage(idx);
  };

  function renderDiaryPage(idx) {
    const entries = rpg.heroDiary || [];
    const entry   = entries[idx];
    const total   = entries.length;

    // Actualiza índice (página esquerda)
    const indexList = document.getElementById('diary-index-list');
    if (indexList) {
      indexList.innerHTML = entries.slice(0, 8).map((e, i) => `
        <div class="diary-index-item ${i === idx ? 'diary-index-active' : ''}"
             onclick="window._diaryGoTo(${i})">
          <span class="diary-index-type">${getEntryTypeIcon(e.type)}</span>
          <span class="diary-index-title">${(e.title || '').slice(0, 28)}</span>
          <span class="diary-index-date">${formatShortDate(e.date)}</span>
        </div>
      `).join('') + (total > 8 ? `<p class="diary-index-more">+ ${total - 8} entradas...</p>` : '');
    }

    if (!entry) {
      setEl('diary-entry-title', 'Diário em Branco');
      setEl('diary-entry-date',  '—');
      setEl('diary-entry-level', '');
      setEl('diary-entry-text',  '<span style="color:rgba(120,100,80,0.5);font-style:italic;">Nenhuma aventura registada ainda.\nDerrota um boss para começar o teu diário.</span>');
      setEl('diary-nav-counter', '0 / 0');
      setEl('diary-left-num',    '—');
      setEl('diary-right-num',   '—');
      return;
    }

    setEl('diary-entry-title', entry.title || '');
    setEl('diary-entry-date',  entry.date  || '—');
    setEl('diary-entry-level', entry.level ? 'Nível ' + entry.level : '');
    setEl('diary-right-num',   toRoman(idx + 1));
    setEl('diary-left-num',    idx > 0 ? toRoman(idx) : '—');
    setEl('diary-nav-counter', (idx + 1) + ' / ' + total);

    // Texto com efeito de máquina de escrever se ainda a gerar
    const textEl = document.getElementById('diary-entry-text');
    if (textEl) {
      if (entry.generating) {
        textEl.innerHTML = '<span class="diary-generating">✍️ O herói escreve...</span>';
      } else {
        textEl.innerHTML = formatDiaryText(entry.text || '');
      }
    }

    // Botões de nav
    const prev = document.getElementById('diary-prev');
    const next = document.getElementById('diary-next');
    if (prev) prev.disabled = idx === 0;
    if (next) next.disabled = idx === total - 1;
  }

  function animatePageTurn(dir) {
    const page = document.getElementById('diary-page-right');
    if (!page) return;
    page.classList.remove('page-turn-next', 'page-turn-prev');
    void page.offsetWidth;
    page.classList.add(dir === 'next' ? 'page-turn-next' : 'page-turn-prev');
    setTimeout(() => page.classList.remove('page-turn-next', 'page-turn-prev'), 400);
  }

  function refreshDiaryUI() {
    if (document.getElementById('hero-diary-modal')) {
      renderDiaryPage(currentPage);
    }
  }

  // ── 10. Abre o diário ────────────────────────────────────────
  window.openHeroDiary = function() {
    createDiaryModal();

    // Actualiza nome na capa
    const coverName = document.getElementById('diary-cover-name');
    if (coverName) {
      coverName.textContent = 'de ' + (rpg.heroName || 'Herói');
    }

    // Reseta para a capa
    const cover = document.querySelector('.diary-cover');
    const book  = document.getElementById('diary-book');
    if (cover) cover.style.display = '';
    if (book)  book.style.display  = 'none';
    currentPage = 0;

    document.getElementById('hero-diary-modal').classList.add('active');
  };

  // ── 11. Notificação ──────────────────────────────────────────
  function showDiaryNotification(msg) {
    if (typeof showToast === 'function') {
      showToast(msg, 4000);
    }

    // Pulsa o botão do diário
    const btn = document.getElementById('diary-menu-pill');
    if (btn) {
      btn.classList.add('diary-pill-pulse');
      setTimeout(() => btn.classList.remove('diary-pill-pulse'), 2000);
    }
  }

  // ── 12. Botão no menu ────────────────────────────────────────
  function addDiaryMenuButton() {
    // Tenta adicionar no accordion de Loja/Progresso
    const targets = ['#acc-progresso', '#acc-loja', '.acc-sub'];
    let parent = null;
    for (const sel of targets) {
      parent = document.querySelector(sel);
      if (parent) break;
    }
    if (!parent) return;
    if (document.getElementById('diary-menu-pill')) return;

    const pill = document.createElement('button');
    pill.id = 'diary-menu-pill';
    pill.onclick = window.openHeroDiary;
    pill.className = 'sub-pill';
    pill.style.cssText = 'border-color:rgba(180,120,40,0.4);color:#d4a03a;';
    pill.innerHTML = `<span style="font-size:11px;">📖</span><span>Diário</span>`;
    parent.appendChild(pill);
  }

  // ── Helpers ──────────────────────────────────────────────────
  function setEl(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function formatDiaryText(text) {
    return text
      .replace(/【([^】]+)】/g, '<span class="diary-section-label">[$1]</span>')
      .replace(/\n\n/g, '</p><p class="diary-paragraph">')
      .replace(/\n/g, '<br>');
  }

  function formatDate() {
    const d = new Date();
    return d.toLocaleDateString('pt-PT', { day:'2-digit', month:'long', year:'numeric' });
  }

  function formatShortDate(dateStr) {
    if (!dateStr) return '—';
    const parts = dateStr.split(' ');
    return parts.length >= 3 ? parts[0] + ' ' + parts[1].slice(0,3) : dateStr.slice(0, 6);
  }

  function getClassName(classId) {
    const map = {
      warrior:'Guerreiro', mage:'Mago', rogue:'Ladrão', paladin:'Paladino',
      ranger:'Arqueiro', necromancer:'Necromante', monk:'Monge',
      berserk:'Berserker', druid:'Druida', assassin:'Assassino',
    };
    return map[classId] || classId || 'Aventureiro';
  }

  function getLocationName(zone) {
    if (!zone) return 'terras desconhecidas';
    if (typeof zone === 'string') return zone;
    const lang = rpg.lang || 'pt';
    return zone[lang] || zone.pt || zone.en || 'masmorra';
  }

  function getEntryTypeIcon(type) {
    const icons = { boss:'⚔', ngplus:'🔄', manual:'✍', event:'⚡' };
    return icons[type] || '📝';
  }

  function getRomanNumeral(n) {
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let result = '';
    vals.forEach((v,i) => { while (n >= v) { result += syms[i]; n -= v; } });
    return result || 'I';
  }

  function toRoman(n) { return getRomanNumeral(n); }

  function getFallbackBossText(ctx) {
    const lines = [
      `A batalha contra ${ctx.bossName} foi extenuante. As minhas mãos ainda tremem enquanto escrevo estas palavras, o eco dos seus rugidos a persistir nos ouvidos. Mas sobrevivi — e isso, por hoje, é suficiente.`,
      `Derrotei ${ctx.bossName} com o que restava das minhas forças. A vitória tem um sabor amargo quando se chega tão perto do fim. Ergui a espada num último esforço desesperado — e funcionou.`,
      `${ctx.bossName} jaz derrotado. Olhei para os seus olhos enquanto a vida o abandonava, e vi neles algo que não esperava: reconhecimento. Talvez até respeito. Fecho o diário. Amanhã continua.`,
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  function getFallbackNgPlusText(ctx) {
    return `【Epílogo】\nO ciclo ${getRomanNumeral(ctx.oldCycle + 1)} chegou ao fim. Olho para trás e vejo o rastro de tudo o que fui — as batalhas, as perdas, os momentos de graça improvável. Acabou.\n\n【Prólogo】\nO ciclo ${getRomanNumeral(ctx.newCycle + 1)} começa agora. O mundo ressurgiu, mas eu guardo a memória. Desta vez, serei mais sábio. Desta vez, nada me surpreenderá.`;
  }

  // ── 13. Estilos do diário ─────────────────────────────────────
  function injectDiaryStyles() {
    if (document.getElementById('hero-diary-styles')) return;
    const s = document.createElement('style');
    s.id = 'hero-diary-styles';
    s.textContent = `
      /* ══ WRAPPER CENTRADO ══ */
      #hero-diary-modal {
        background: rgba(0,0,0,0.85) !important;
        backdrop-filter: blur(6px) !important;
      }

      .diary-book-container {
        position: relative;
        width: 95vw;
        max-width: 680px;
        max-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* ══ CAPA ══ */
      .diary-cover {
        width: 100%;
        max-width: 320px;
        perspective: 800px;
        cursor: pointer;
      }

      .diary-cover-inner {
        display: flex;
        border-radius: 4px 16px 16px 4px;
        box-shadow:
          -4px 0 8px rgba(0,0,0,0.5),
          4px 4px 20px rgba(0,0,0,0.7),
          inset 0 0 60px rgba(0,0,0,0.3);
        overflow: hidden;
        background: linear-gradient(135deg, #2a1a08, #4a2e10, #3a220c);
        border: 1px solid rgba(180,130,50,0.3);
      }

      .diary-spine {
        width: 22px;
        background: linear-gradient(90deg, #1a0f04, #3a2208, #1a0f04);
        border-right: 1px solid rgba(180,130,50,0.2);
        flex-shrink: 0;
      }

      .diary-cover-front {
        flex: 1;
        padding: 36px 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        background: radial-gradient(ellipse at center, rgba(80,50,15,0.4) 0%, transparent 70%);
      }

      .diary-cover-ornament {
        color: rgba(200,160,60,0.6);
        font-size: 12px;
        letter-spacing: 8px;
      }

      .diary-cover-title {
        font-family: 'Cinzel Decorative', 'Palatino', serif;
        font-size: 26px;
        font-weight: 900;
        color: rgba(220,180,70,0.9);
        letter-spacing: 0.35em;
        text-shadow: 0 0 20px rgba(200,150,40,0.4), 0 2px 4px rgba(0,0,0,0.8);
        text-align: center;
      }

      .diary-cover-subtitle {
        font-family: 'Palatino', serif;
        font-size: 13px;
        font-style: italic;
        color: rgba(200,160,80,0.7);
        text-align: center;
        letter-spacing: 0.1em;
      }

      .diary-open-btn {
        margin-top: 16px;
        padding: 8px 22px;
        background: rgba(180,130,40,0.15);
        border: 1px solid rgba(180,130,40,0.4);
        border-radius: 6px;
        color: rgba(220,180,80,0.9);
        font-family: 'Palatino', serif;
        font-size: 12px;
        letter-spacing: 0.12em;
        cursor: pointer;
        transition: all 0.2s;
        font-style: italic;
      }
      .diary-open-btn:hover {
        background: rgba(180,130,40,0.28);
        border-color: rgba(220,180,80,0.6);
        box-shadow: 0 0 12px rgba(180,130,40,0.2);
      }

      /* ══ LIVRO ABERTO ══ */
      .diary-book {
        width: 100%;
        max-height: 88vh;
        display: flex;
        flex-direction: row;
        position: relative;
        border-radius: 4px 12px 12px 4px;
        box-shadow:
          0 20px 60px rgba(0,0,0,0.8),
          -6px 0 20px rgba(0,0,0,0.5);
        overflow: hidden;
        background: #f5f0e8;
      }

      .diary-close-btn {
        position: absolute;
        top: 8px;
        right: 10px;
        z-index: 20;
        background: rgba(60,40,10,0.15);
        border: none;
        color: rgba(80,55,20,0.7);
        width: 26px;
        height: 26px;
        border-radius: 50%;
        font-size: 11px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s;
        line-height: 1;
      }
      .diary-close-btn:hover {
        background: rgba(180,50,30,0.2);
        color: rgba(180,50,30,0.9);
      }

      /* ══ PÁGINAS ══ */
      .diary-page {
        flex: 1;
        min-width: 0;
        padding: 24px 20px 40px;
        background: #f5f0e8;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      /* Textura de papel */
      .diary-page::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          repeating-linear-gradient(
            transparent, transparent 22px,
            rgba(120,100,60,0.07) 22px, rgba(120,100,60,0.07) 23px
          );
        pointer-events: none;
      }

      .diary-page-left {
        border-right: none;
        background: linear-gradient(to right, #ede8db, #f5f0e8);
      }

      .diary-page-right {
        background: linear-gradient(to left, #ede8db, #f5f0e8);
        transition: transform 0.35s ease, opacity 0.25s ease;
      }

      @keyframes pageTurnNext {
        0%   { transform: rotateY(-8deg);  opacity: 0.6; }
        100% { transform: rotateY(0deg);   opacity: 1; }
      }
      @keyframes pageTurnPrev {
        0%   { transform: rotateY(8deg);   opacity: 0.6; }
        100% { transform: rotateY(0deg);   opacity: 1; }
      }
      .page-turn-next { animation: pageTurnNext 0.35s ease forwards; }
      .page-turn-prev { animation: pageTurnPrev 0.35s ease forwards; }

      .diary-spine-center {
        width: 18px;
        background: linear-gradient(90deg, #c8b89a, #a89070, #c8b89a);
        flex-shrink: 0;
        box-shadow:
          -4px 0 8px rgba(0,0,0,0.2),
          4px 0 8px rgba(0,0,0,0.2);
        position: relative;
      }
      .diary-spine-center::after {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          0deg, transparent, transparent 8px,
          rgba(0,0,0,0.06) 8px, rgba(0,0,0,0.06) 9px
        );
      }

      /* ══ CABEÇALHO DA PÁGINA ══ */
      .diary-page-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding-bottom: 8px;
        border-bottom: 0.5px solid rgba(120,90,40,0.3);
        flex-shrink: 0;
      }

      .diary-page-ornament {
        color: rgba(120,90,40,0.5);
        font-size: 13px;
      }

      .diary-page-label {
        font-family: 'Palatino', 'Georgia', serif;
        font-size: 9px;
        letter-spacing: 0.25em;
        color: rgba(100,75,30,0.7);
        text-transform: uppercase;
        font-style: italic;
      }

      /* ══ ÍNDICE (página esquerda) ══ */
      .diary-index-list {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        gap: 4px;
        scrollbar-width: none;
        padding-top: 4px;
      }
      .diary-index-list::-webkit-scrollbar { display: none; }

      .diary-index-item {
        display: flex;
        align-items: baseline;
        gap: 5px;
        padding: 4px 6px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.15s;
      }
      .diary-index-item:hover { background: rgba(120,90,40,0.08); }
      .diary-index-active    { background: rgba(120,90,40,0.13) !important; }

      .diary-index-type {
        font-size: 10px;
        flex-shrink: 0;
        width: 14px;
      }
      .diary-index-title {
        flex: 1;
        font-family: 'Palatino', serif;
        font-size: 9.5px;
        color: rgba(70,50,20,0.85);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-style: italic;
      }
      .diary-index-date {
        font-family: 'Fira Code', monospace;
        font-size: 7.5px;
        color: rgba(120,90,40,0.5);
        flex-shrink: 0;
      }

      .diary-index-more {
        font-family: 'Palatino', serif;
        font-size: 9px;
        color: rgba(120,90,40,0.5);
        text-align: center;
        font-style: italic;
        padding: 4px 0;
        margin: 0;
      }

      /* ══ CONTEÚDO (página direita) ══ */
      .diary-entry-title {
        font-family: 'Palatino', 'Georgia', serif;
        font-size: 13px;
        font-weight: bold;
        color: rgba(60,40,10,0.9);
        text-align: center;
        line-height: 1.4;
        flex-shrink: 0;
      }

      .diary-entry-level {
        font-family: 'Palatino', serif;
        font-size: 9px;
        color: rgba(120,90,40,0.6);
        text-align: center;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        font-style: italic;
        flex-shrink: 0;
      }

      .diary-entry-text {
        font-family: 'Palatino', 'Georgia', serif;
        font-size: 11px;
        color: rgba(50,35,10,0.85);
        line-height: 1.75;
        overflow-y: auto;
        flex: 1;
        scrollbar-width: none;
        text-align: justify;
        hyphens: auto;
        white-space: pre-wrap;
      }
      .diary-entry-text::-webkit-scrollbar { display: none; }

      .diary-paragraph {
        display: block;
        margin-top: 12px;
      }

      .diary-section-label {
        display: block;
        font-size: 9px;
        letter-spacing: 0.2em;
        color: rgba(120,90,40,0.7);
        text-transform: uppercase;
        font-style: normal;
        margin-bottom: 6px;
        border-bottom: 0.5px solid rgba(120,90,40,0.2);
        padding-bottom: 3px;
      }

      .diary-generating {
        font-style: italic;
        color: rgba(120,90,40,0.6);
        font-size: 11px;
        animation: generatingPulse 1.5s ease infinite;
      }
      @keyframes generatingPulse {
        0%, 100% { opacity: 0.6; }
        50%       { opacity: 1;   }
      }

      /* ══ NUMERAÇÃO ══ */
      .diary-page-number {
        position: absolute;
        bottom: 10px;
        font-family: 'Palatino', serif;
        font-size: 9px;
        color: rgba(120,90,40,0.45);
        font-style: italic;
        letter-spacing: 0.1em;
      }
      .diary-page-left  .diary-page-number { left: 50%; transform: translateX(-50%); }
      .diary-page-right .diary-page-number { left: 50%; transform: translateX(-50%); }

      /* ══ NAVEGAÇÃO ══ */
      .diary-nav {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 14px;
        background: linear-gradient(to top, rgba(220,200,160,0.95), transparent);
        z-index: 10;
      }

      .diary-nav-btn {
        font-family: 'Palatino', serif;
        font-size: 9px;
        color: rgba(100,70,20,0.7);
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.15s;
        font-style: italic;
        letter-spacing: 0.05em;
      }
      .diary-nav-btn:hover:not(:disabled) {
        color: rgba(100,70,20,1);
        background: rgba(120,90,40,0.1);
      }
      .diary-nav-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .diary-nav-counter {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(120,90,40,0.5);
        letter-spacing: 0.1em;
      }

      /* ══ PILL NO MENU ══ */
      .diary-pill-pulse {
        animation: diaryPillPulse 0.4s ease 3;
      }
      @keyframes diaryPillPulse {
        0%,100% { transform: scale(1);    box-shadow: none; }
        50%     { transform: scale(1.06); box-shadow: 0 0 12px rgba(212,160,58,0.4); }
      }

      /* ══ RESPONSIVE: mobile ══ */
      @media (max-width: 520px) {
        .diary-page-left { display: none; }
        .diary-spine-center { width: 10px; }
        .diary-page-right { border-radius: 0 12px 12px 0; }
      }
    `;
    document.head.appendChild(s);
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    hookBossKill();
    hookNgPlus();
    setTimeout(addDiaryMenuButton, 800);
    console.log('[HeroDiaryModule] OK — IA Narrativa activa, ' +
      (rpg.heroDiary ? rpg.heroDiary.length : 0) + ' entradas guardadas.');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.updateUI) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }
  waitForRpg(init);

})();
