// Intersection Observer for fade-in animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.about-content, .values, .value-area h1');
  animateElements.forEach(el => observer.observe(el));
}

// Parallax effect for hero image
function setupParallaxEffect() {
  const heroImage = document.getElementById('firstPic');
  if (!heroImage) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  });
}

// Smooth scroll to section
function setupSmoothScroll() {
  const exploreButton = document.querySelector('.explore-button');
  if (!exploreButton) return;

  exploreButton.addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('#background');
    const yOffset = -100;
    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ 
      top: y, 
      behavior: 'smooth' 
    });
  });
}

// Photo collage hover effects
function setupPhotoCollage() {
  const photoItems = document.querySelectorAll('.photo-item');
  
  photoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Slightly dim other photos
      photoItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.style.opacity = '0.7';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      // Restore opacity
      photoItems.forEach(otherItem => {
        otherItem.style.opacity = '1';
      });
    });
  });
}

// Value cards stagger animation
function setupValueCards() {
  const values = document.querySelectorAll('.value');
  
  values.forEach((value, index) => {
    value.style.animationDelay = `${index * 0.2}s`;
  });
}

// Add loading screen
function setupLoadingScreen() {
  // Create loading overlay
  const loadingScreen = document.createElement('div');
  loadingScreen.id = 'loading-screen';
  loadingScreen.innerHTML = `
    <div class="loading-content">
      <div class="tek-logo">
        <img src="/static/media/tekPics/tekNavy-3.png" alt="TEK Logo" />
      </div>
      <div class="loading-spinner"></div>
    </div>
  `;
  
  // Add loading styles
  const loadingStyles = `
    #loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #293786 0%, #1e2a5e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    }
    
    .loading-content {
      text-align: center;
      color: white;
    }
    
    .tek-logo img {
      width: 120px;
      height: auto;
      margin-bottom: 30px;
      opacity: 0;
      animation: logoFadeIn 1s ease 0.5s forwards;
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid white;
      border-radius: 50%;
      margin: 0 auto;
      animation: spin 1s linear infinite;
    }
    
    @keyframes logoFadeIn {
      to { opacity: 1; }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = loadingStyles;
  document.head.appendChild(style);
  document.body.appendChild(loadingScreen);
  
  // Hide loading screen when page is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.remove();
        style.remove();
      }, 500);
    }, 1000);
  });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  setupLoadingScreen();
  setupScrollAnimations();
  setupParallaxEffect();
  setupSmoothScroll();
  setupPhotoCollage();
  setupValueCards();
});

// Add some additional mobile optimizations
function setupMobileOptimizations() {
  // Disable parallax on mobile for better performance
  if (window.innerWidth <= 768) {
    const heroImage = document.getElementById('firstPic');
    if (heroImage) {
      heroImage.style.transform = 'none';
    }
  }
  
  // Optimize touch interactions
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }
}

window.addEventListener('resize', setupMobileOptimizations);
setupMobileOptimizations();
