// ═══════════════════════════════════════════════════════════════
// MODULE: profile-button.js
// Fix: Botão de Perfil fixo no top-right do menu (fácil acesso)
// Antes estava escondido dentro do accordion "Taverna"
// Melhoria: badge com nome do herói e classe na pílula do perfil
// ═══════════════════════════════════════════════════════════════
(function ProfileButtonModule() {
  'use strict';

  function init() {
    injectProfileButton();
    injectProfileButtonStyles();
    hookProfileUpdates();
    console.log('[ProfileButtonModule] OK');
  }

  // ── 1. Injeta botão de perfil na barra de utilitários do menu ─
  function injectProfileButton() {
    const utilBar = document.querySelector('#view-menu .absolute.top-3.right-3');
    if (!utilBar) return;
    if (document.getElementById('menu-profile-quickbtn')) return;

    // Cria o botão de perfil
    const btn = document.createElement('button');
    btn.id = 'menu-profile-quickbtn';
    btn.onclick = () => {
      if (typeof openProfile === 'function') openProfile();
    };
    btn.className = 'menu-profile-pill';
    btn.title = 'Perfil do Herói';
    btn.innerHTML = `
      <i data-lucide="user" class="profile-pill-icon"></i>
      <span id="profile-pill-name" class="profile-pill-name">Herói</span>
    `;

    // Insere ANTES do primeiro botão (mais à direita visualmente)
    utilBar.insertBefore(btn, utilBar.firstChild);

    try { lucide.createIcons(); } catch(e) {}
  }

  // ── 2. Estilos do botão de perfil ───────────────────────────
  function injectProfileButtonStyles() {
    if (document.getElementById('profile-btn-styles')) return;

    const style = document.createElement('style');
    style.id = 'profile-btn-styles';
    style.textContent = `
      /* ══ Botão de Perfil — top-right do menu ══ */
      .menu-profile-pill {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 9px 5px 6px;
        border-radius: 8px;
        background: rgba(0,229,255,0.07);
        border: 1px solid rgba(0,229,255,0.22);
        color: #00e5ff;
        cursor: pointer;
        transition: all 0.15s;
        font-family: 'Orbitron', sans-serif;
        font-size: 8px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        white-space: nowrap;
        max-width: 90px;
        overflow: hidden;
      }

      .menu-profile-pill:hover {
        background: rgba(0,229,255,0.14);
        border-color: rgba(0,229,255,0.45);
        box-shadow: 0 0 10px rgba(0,229,255,0.15);
      }

      .profile-pill-icon {
        width: 12px !important;
        height: 12px !important;
        flex-shrink: 0;
      }

      .profile-pill-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 55px;
        display: inline-block;
      }
    `;
    document.head.appendChild(style);
  }

  // ── 3. Atualiza o nome no botão quando o herói muda ─────────
  function hookProfileUpdates() {
    // Hook no updateUI para atualizar o nome no pill
    const _origUpdateUI = window._ORIG_updateUI || (rpg && rpg.updateUI && rpg.updateUI.bind(rpg));

    function updatePill() {
      const pill = document.getElementById('profile-pill-name');
      if (pill && typeof rpg !== 'undefined') {
        const name = rpg.heroName || 'Herói';
        pill.textContent = name.length > 8 ? name.slice(0, 7) + '…' : name;
      }
    }

    // Atualiza imediatamente
    setTimeout(updatePill, 200);

    // Observa mudanças no nome do herói no menu
    const heroNameEl = document.getElementById('menu-hero-name');
    if (heroNameEl) {
      const obs = new MutationObserver(updatePill);
      obs.observe(heroNameEl, { childList: true, characterData: true, subtree: true });
    }

    // Também hook no saveProfile para atualizar
    const _origSaveProfile = window.saveProfile;
    if (_origSaveProfile) {
      window.saveProfile = function() {
        _origSaveProfile.apply(this, arguments);
        setTimeout(updatePill, 100);
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Se já carregou, aguarda um tick para o rpg estar disponível
    setTimeout(init, 100);
  }

})();
