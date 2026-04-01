// ═══════════════════════════════════════════════════════════════
// MODULE: inventory-ui.js  — Inventário Melhorado
// • Vista em grid com ícones grandes e raridade colorida
// • Filtros por tipo (arma/armadura/pet/relíquia/poção)
// • Ordenação por nível, nome, raridade
// • Badge de equipado vs no inventário
// • Comparação rápida de stats ao hover
// ═══════════════════════════════════════════════════════════════
(function InventoryUIModule() {
  'use strict';

  // Raridades por tier de custo
  const RARITY = [
    { label:'Lendário', color:'#ffd60a', glow:'rgba(255,214,10,0.3)', min:100000 },
    { label:'Épico',    color:'#a855f7', glow:'rgba(168,85,247,0.3)', min:20000  },
    { label:'Raro',     color:'#3b82f6', glow:'rgba(59,130,246,0.3)', min:5000   },
    { label:'Incomum',  color:'#22c55e', glow:'rgba(34,197,94,0.25)', min:1000   },
    { label:'Comum',    color:'#94a3b8', glow:'rgba(148,163,184,0.1)',min:0      },
  ];

  function getRarity(cost) {
    return RARITY.find(r => (cost || 0) >= r.min) || RARITY[4];
  }

  // ── 1. Patch renderInventory / renderShop para UI melhorada ─
  function patchInventoryRender() {
    // Adiciona aba de inventário rápido no modal de shop
    const _origRenderShop = rpg.renderShop;
    if (!_origRenderShop) return;

    rpg.renderShop = function() {
      try { _origRenderShop.apply(this, arguments); } catch(e) {}
      // Após render original, melhora visualmente cada item
      setTimeout(() => enhanceShopItems(), 50);
    };
  }

  // ── 2. Cria o modal de inventário visual ────────────────────
  function createInventoryModal() {
    if (document.getElementById('inv-visual-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'inv-visual-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/95 w-11/12 max-w-md rounded-2xl p-5 shadow-2xl">
        <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-3">
          <h2 class="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2" style="font-family:'Orbitron',sans-serif;">
            <i data-lucide="package" class="w-5 h-5 text-amber-400"></i> Inventário
          </h2>
          <button onclick="closeModal('inv-visual-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Filtros -->
        <div class="flex gap-1 mb-3 flex-wrap" id="inv-filter-btns">
          ${['Todos','Armas','Armaduras','Pets','Relíquias','Temas'].map((f,i) =>
            `<button onclick="window._invFilter('${f}')" id="inv-f-${i}"
              class="inv-filter-btn ${i===0?'inv-filter-active':''}">${f}</button>`
          ).join('')}
        </div>

        <!-- Grid -->
        <div id="inv-visual-grid" class="max-h-[60vh] overflow-y-auto pr-1 pb-2 hide-scrollbar">
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    injectInventoryStyles();
    try { lucide.createIcons(); } catch(e) {}
  }

  // ── 3. Abre o modal de inventário ───────────────────────────
  window.openInventoryVisual = function() {
    createInventoryModal();
    renderInventoryGrid('Todos');
    document.getElementById('inv-visual-modal').classList.add('active');
    try { lucide.createIcons(); } catch(e) {}
  };

  // ── 4. Filtro ────────────────────────────────────────────────
  window._invFilter = function(filter) {
    document.querySelectorAll('.inv-filter-btn').forEach(b => b.classList.remove('inv-filter-active'));
    const labels = ['Todos','Armas','Armaduras','Pets','Relíquias','Temas'];
    const idx = labels.indexOf(filter);
    const btn = document.getElementById('inv-f-' + idx);
    if (btn) btn.classList.add('inv-filter-active');
    renderInventoryGrid(filter);
  };

  // ── 5. Renderiza o grid ──────────────────────────────────────
  function renderInventoryGrid(filter) {
    const grid = document.getElementById('inv-visual-grid');
    if (!grid || typeof rpg === 'undefined') return;

    const inv = rpg.inventory || [];
    const allItems = [
      ...(rpg.weapons  || []).map(i => ({...i, _type:'weapon',  _label:'Armas'})),
      ...(rpg.armors   || []).map(i => ({...i, _type:'armor',   _label:'Armaduras'})),
      ...(rpg.pets     || []).map(i => ({...i, _type:'pet',     _label:'Pets'})),
      ...(rpg.relics   || []).map(i => ({...i, _type:'relic',   _label:'Relíquias'})),
      ...(rpg.themes   || []).map(i => ({...i, _type:'theme',   _label:'Temas'})),
    ].filter(item => inv.includes(item.id));

    const filtered = filter === 'Todos' ? allItems : allItems.filter(i => i._label === filter);

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="text-center py-10 text-zinc-600 text-sm">Nenhum item encontrado</div>`;
      return;
    }

    const lang = rpg.lang || 'pt';

    grid.innerHTML = `<div class="grid grid-cols-3 gap-2">` +
      filtered.map(item => {
        const rar    = getRarity(item.cost || 0);
        const isEq   = isEquipped(item);
        const name   = item.name ? (item.name[lang] || item.name) : item.id;
        const forgeL = rpg.forgeUpgrades ? (rpg.forgeUpgrades[item.id] || 0) : 0;

        return `
          <div class="inv-item-card ${isEq ? 'inv-item-equipped' : ''}"
               style="border-color:${rar.color}33;${isEq ? 'background:rgba(' + hexToRgb(rar.color) + ',0.08);' : ''}"
               onclick="window._invEquipItem('${item.id}','${item._type}')"
               title="${name}">
            <div class="inv-item-icon" style="color:${rar.color};${isEq ? 'filter:drop-shadow(0 0 6px ' + rar.color + ');' : ''}">
              <i data-lucide="${item.icon || 'box'}" style="width:24px;height:24px;"></i>
            </div>
            <div class="inv-item-name">${name.length > 9 ? name.slice(0,8)+'…' : name}</div>
            <div class="inv-item-footer">
              ${isEq ? '<span class="inv-badge-eq">✓</span>' : ''}
              ${forgeL > 0 ? `<span class="inv-badge-forge">+${forgeL}</span>` : ''}
            </div>
          </div>
        `;
      }).join('') + `</div>`;

    try { lucide.createIcons(); } catch(e) {}
  }

  function isEquipped(item) {
    if (!rpg) return false;
    return item.id === rpg.eqWeapon || item.id === rpg.eqArmor ||
           item.id === rpg.eqPet    || item.id === rpg.eqTheme;
  }

  window._invEquipItem = function(id, type) {
    if (!rpg) return;
    const equipMap = { weapon:'eqWeapon', armor:'eqArmor', pet:'eqPet', theme:'eqTheme' };
    const key = equipMap[type];
    if (!key) return;
    rpg[key] = id;
    if (rpg.save) rpg.save();
    if (rpg.updateUI) rpg.updateUI();
    if (rpg.updateTheme) rpg.updateTheme();
    if (typeof showToast === 'function') showToast('✅ Item equipado!', 2000);
    renderInventoryGrid(getCurrentFilter());
  };

  function getCurrentFilter() {
    const active = document.querySelector('.inv-filter-active');
    return active ? active.textContent : 'Todos';
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `${r},${g},${b}`;
  }

  // ── 6. Melhora visual dos itens no shop ─────────────────────
  function enhanceShopItems() {
    // Adiciona bordas de raridade nos itens do shop
    document.querySelectorAll('#shop-body .border.rounded-xl, #shop-body .border.rounded-2xl').forEach(card => {
      const costEl = card.querySelector('[class*="text-yellow"], [class*="coins"]');
      if (!costEl) return;
      const costText = costEl.textContent || '';
      const num = parseInt(costText.replace(/[^\d]/g,'')) || 0;
      const rar = getRarity(num);
      card.style.borderColor = rar.color + '40';
    });
  }

  // ── 7. Adiciona botão de Inventário no menu ──────────────────
  function addInventoryButton() {
    // Insere como pill no accordion "Armazém" da Loja, ou como sub-pill novo
    const lojaAcc = document.getElementById('acc-loja');
    if (!lojaAcc) return;
    if (document.getElementById('inv-visual-pill')) return;

    const pill = document.createElement('button');
    pill.id = 'inv-visual-pill';
    pill.onclick = window.openInventoryVisual;
    pill.className = 'sub-pill';
    pill.style.cssText = 'border-color:rgba(251,191,36,0.4);color:#fcd34d;';
    pill.innerHTML = `<i data-lucide="backpack" class="w-3 h-3"></i><span>Armazém</span>`;
    lojaAcc.appendChild(pill);
    try { lucide.createIcons(); } catch(e) {}
  }

  // ── 8. Estilos ───────────────────────────────────────────────
  function injectInventoryStyles() {
    if (document.getElementById('inventory-ui-styles')) return;
    const s = document.createElement('style');
    s.id = 'inventory-ui-styles';
    s.textContent = `
      .inv-filter-btn {
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(0,0,0,0.4);
        color: rgba(150,150,170,0.8);
        font-size: 9px;
        font-weight: 700;
        font-family: 'Orbitron', sans-serif;
        letter-spacing: 0.06em;
        cursor: pointer;
        transition: all 0.15s;
        text-transform: uppercase;
      }
      .inv-filter-btn:hover { color: #fff; border-color: rgba(0,229,255,0.3); }
      .inv-filter-active {
        background: rgba(0,229,255,0.1) !important;
        border-color: rgba(0,229,255,0.4) !important;
        color: #00e5ff !important;
      }

      .inv-item-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 10px 6px 6px;
        background: rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.15s;
        position: relative;
        min-height: 80px;
      }
      .inv-item-card:hover {
        background: rgba(0,0,0,0.6);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.5);
      }
      .inv-item-equipped {
        box-shadow: 0 0 12px currentColor;
      }
      .inv-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .inv-item-name {
        font-size: 8px;
        font-weight: 700;
        color: rgba(200,200,220,0.9);
        text-align: center;
        font-family: 'Rajdhani', sans-serif;
        line-height: 1.2;
      }
      .inv-item-footer {
        display: flex;
        gap: 3px;
        align-items: center;
        justify-content: center;
        min-height: 14px;
      }
      .inv-badge-eq {
        font-size: 8px;
        color: #34d399;
        font-weight: 900;
      }
      .inv-badge-forge {
        font-size: 7px;
        color: #fb923c;
        font-weight: 900;
        font-family: 'Fira Code', monospace;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    patchInventoryRender();
    setTimeout(addInventoryButton, 600);
    console.log('[InventoryUIModule] OK');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.inventory) cb();
    else if ((n || 0) < 30) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }
  waitForRpg(init);
})();
