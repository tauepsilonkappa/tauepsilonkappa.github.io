// Modern Mobile Menu Functions
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    
    if (overlay && toggle) {
        overlay.classList.toggle('active');
        toggle.classList.toggle('active');
        body.classList.toggle('mobile-menu-active');
        
        // Prevent body scrolling when menu is open
        if (overlay.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
}

// Close menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.mobile-menu-nav a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const overlay = document.getElementById('mobileMenuOverlay');
            const toggle = document.querySelector('.mobile-menu-toggle');
            const body = document.body;
            
            if (overlay && toggle) {
                overlay.classList.remove('active');
                toggle.classList.remove('active');
                body.classList.remove('mobile-menu-active');
                body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside (on overlay background)
    const overlay = document.getElementById('mobileMenuOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                toggleMobileMenu();
            }
        });
    }
});

// Handle escape key to close menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('mobileMenuOverlay');
        const toggle = document.querySelector('.mobile-menu-toggle');
        const body = document.body;
        
        if (overlay && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            toggle.classList.remove('active');
            body.classList.remove('mobile-menu-active');
            body.style.overflow = '';
        }
    }
});