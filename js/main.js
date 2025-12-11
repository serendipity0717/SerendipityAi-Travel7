document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileNavLink = document.querySelectorAll('.nav__link');
    const currentPage = window.location.pathname.split('/').pop();

    mobileNavLink.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Modal handling
    const modals = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.overlay');

    const closeModal = (modal) => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    };

    modals.forEach(modal => {
        const closeButton = modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            modals.forEach(closeModal);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(closeModal);
        }
    });
});
