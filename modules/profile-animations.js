// ═══════════════════════════════════════════════════════════════
// MODULE: profile-animations.js
// ─────────────────────────────────────────────────────────────
// Adiciona animações nativas em tempo real (CSS Animations) 
// ao quadrado do avatar e um fundo digital em movimento ao perfil.
// ═══════════════════════════════════════════════════════════════
(function ProfileAnimations() {
  'use strict';

  function applyAnimations() {
    if (typeof document === 'undefined') return;

    // 1. Aplicar animação no quadrado do avatar (Perfil)
    const avatarImg = document.getElementById('profile-avatar-icon');
    if (avatarImg && avatarImg.parentElement) {
      const avatarBox = avatarImg.parentElement;
      // Removemos os estilos inline estáticos para o CSS animado brilhar
      avatarBox.style.borderRadius = '12px';
      avatarBox.classList.add('avatar-neon-animated');
    }

    // 2. Aplicar fundo digital em movimento no Modal do Perfil
    const profileModal = document.getElementById('profile-modal');
    if (profileModal) {
      // O conteúdo principal do modal é o primeiro div
      const modalBox = profileModal.querySelector('div');
      if (modalBox && !modalBox.querySelector('.profile-bg-matrix-flow')) {
        modalBox.style.position = 'relative';
        modalBox.style.overflow = 'hidden';
        modalBox.style.background = 'transparent'; // Limpa fundo estático
        
        const bgDiv = document.createElement('div');
        bgDiv.className = 'profile-bg-matrix-flow';
        modalBox.insertBefore(bgDiv, modalBox.firstChild);
      }
    }
  }

  function injectCSS() {
    if (document.getElementById('profile-fx-css')) return;
    const style = document.createElement('style');
    style.id = 'profile-fx-css';
    style.innerHTML = `
      /* ── ANIMAÇÃO DO QUADRADO DO AVATAR ── */
      @keyframes neonSquarePulse {
        0% { box-shadow: 0 0 5px #0ff, inset 0 0 5px #0ff; border-color: #0ff; }
        50% { box-shadow: 0 0 25px #b026ff, inset 0 0 25px #b026ff; border-color: #b026ff; }
        100% { box-shadow: 0 0 5px #0ff, inset 0 0 5px #0ff; border-color: #0ff; }
      }
      .avatar-neon-animated {
        animation: neonSquarePulse 3s infinite alternate !important;
        border: 2px solid #0ff !important;
        position: relative;
        background: rgba(0, 0, 0, 0.5);
      }
      
      /* Rastro digital tracejado a rodar em volta do quadrado */
      @keyframes spinSquare { 
        100% { transform: rotate(360deg); } 
      }
      .avatar-neon-animated::after {
        content: '';
        position: absolute;
        inset: -6px;
        border: 1px dashed rgba(0, 255, 255, 0.6);
        border-radius: 16px;
        animation: spinSquare 10s linear infinite;
        pointer-events: none;
      }

      /* ── ANIMAÇÃO DO FUNDO DO PERFIL (FLUXO DE DADOS) ── */
      @keyframes flowData {
        0% { background-position: 0 0, 0 0; }
        100% { background-position: 0 100px, 0 0; }
      }
      .profile-bg-matrix-flow {
        position: absolute !important;
        inset: 0;
        pointer-events: none;
        z-index: -1; /* Fica por trás de todos os botões e textos */
        border-radius: inherit;
        background: 
          /* Gradiente de fundo escuro */
          linear-gradient(rgba(15, 10, 30, 0.85), rgba(5, 5, 15, 0.95)),
          /* Linhas de scanline estilo Matrix a moverem-se */
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.05) 3px, rgba(0, 255, 255, 0.05) 3px);
        background-size: 100% 100%, 100% 20px;
        animation: flowData 2.5s linear infinite;
        box-shadow: inset 0 0 40px rgba(0, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(style);
  }

  // Hooking no updateUI para garantir que a animação é aplicada sempre que o perfil abre
  function init() {
    injectCSS();
    if (typeof rpg !== 'undefined' && rpg.updateUI) {
      const _orig = rpg.updateUI.bind(rpg);
      rpg.updateUI = function() {
        _orig.apply(this, arguments);
        setTimeout(applyAnimations, 50); // Pequeno delay para a UI renderizar primeiro
      };
    }
    setTimeout(applyAnimations, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();