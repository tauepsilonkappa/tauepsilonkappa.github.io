// Enhanced navigation functionality
function setupEnhancedNavigation() {
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  let isScrolled = false;

  // Navigation scroll effects
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 50 && !isScrolled) {
      header.classList.add('scrolled');
      isScrolled = true;
    } else if (scrollTop <= 50 && isScrolled) {
      header.classList.remove('scrolled');
      isScrolled = false;
    }

    // Hide/show navigation on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Active navigation link highlighting
  updateActiveNavLink();
  
  // Update active link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on current section
function updateActiveNavLink() {
  const sections = document.querySelectorAll('main section, main div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id') || '';
    }
  });
  
  // Update nav links based on current page
  const currentPage = window.location.pathname;
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '/' && href === '/')) {
      link.classList.add('active');
    }
  });
}

// Enhanced mobile menu
function setupMobileMenu() {
  const dropdownBtn = document.querySelector('.dropbtn');
  const dropdown = document.querySelector('.dropdown-content');
  
  if (!dropdownBtn || !dropdown) return;
  
  // Close menu when clicking on a link
  const dropdownLinks = dropdown.querySelectorAll('a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      dropdown.classList.remove('show');
    }
  });
  
  // Prevent menu from closing when clicking inside
  dropdown.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Add loading states to buttons
function setupButtonStates() {
  document.querySelectorAll('button, .modern-btn').forEach(button => {
    button.addEventListener('click', function() {
      if (!this.classList.contains('loading')) {
        this.classList.add('loading');
        
        // Remove loading state after animation
        setTimeout(() => {
          this.classList.remove('loading');
        }, 1000);
      }
    });
  });
}

// Initialize all navigation enhancements
document.addEventListener('DOMContentLoaded', () => {
  setupEnhancedNavigation();
  setupMobileMenu();
  setupSmoothScrolling();
  setupButtonStates();
});

// Add CSS for loading states
const navigationStyles = `
  .loading {
    pointer-events: none;
    opacity: 0.8;
    position: relative;
  }
  
  .loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: button-spin 1s linear infinite;
  }
  
  @keyframes button-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Hide navigation on small screens when scrolling down */
  @media screen and (max-width: 768px) {
    header {
      transition: transform 0.3s ease;
    }
  }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = navigationStyles;
document.head.appendChild(styleSheet);
