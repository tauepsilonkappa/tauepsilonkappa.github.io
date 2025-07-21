// Alumni data
const alumniData = [
  // Founders
  {
    name: "Trisha Kant",
    role: "Technology Consultant",
    company: "Impact Advisors",
    class: "Founder",
    degree: "B.S Cognitive Science '24",
    linkedin: "https://www.linkedin.com/in/trisha-kant/",
    image: "/static/media/people/TrishaKant.jpeg",
    category: "founders"
  },
  {
    name: "Noah Ivers",
    role: "Software Engineer",
    company: "Ford",
    class: "Founder",
    degree: "B.S Computer Science '24",
    linkedin: "https://www.linkedin.com/in/noah-ivers/",
    image: "/static/media/people/NoahIvers.jpeg",
    category: "founders"
  },
  {
    name: "Seb Roclore",
    role: "Software Engineer",
    company: "TechCorp",
    class: "Founder",
    degree: "B.S Computer Science '24",
    linkedin: "#",
    image: "/static/media/people/groupPic2.WebP",
    category: "founders"
  },
  {
    name: "Paul Smith",
    role: "Product Manager",
    company: "StartupXYZ",
    class: "Founder",
    degree: "B.S Engineering '24",
    linkedin: "#",
    image: "/static/media/people/groupPic2.WebP",
    category: "founders"
  },
  {
    name: "Esha Kaul",
    role: "Data Scientist",
    company: "Analytics Inc",
    class: "Founder",
    degree: "B.S Data Science '24",
    linkedin: "#",
    image: "/static/media/people/groupPic2.WebP",
    category: "founders"
  },
  
  // Founding Class
  {
    name: "Anusha Tekmulla",
    role: "Software Engineer",
    company: "Meta",
    class: "Founding Class",
    degree: "B.S Computer Science & Cognitive Science '24",
    linkedin: "https://www.linkedin.com/in/atekumulla/",
    image: "/static/media/people/AnushaTekmulla.WebP",
    category: "founding"
  },
  {
    name: "Nolan Schmitt",
    role: "Software Engineer",
    company: "ServiceNow",
    class: "Founding Class",
    degree: "B.S Computer Science '24",
    linkedin: "https://www.linkedin.com/in/nolan-schmitt-873bb722a/",
    image: "/static/media/people/NolanSchmitt.jpeg",
    category: "founding"
  },
  {
    name: "Isha Shinde",
    role: "Software Developer",
    company: "Microsoft",
    class: "Founding Class",
    degree: "B.S Computer Science '24",
    linkedin: "#",
    image: "/static/media/people/groupPic2.WebP",
    category: "founding"
  },
  {
    name: "Daphne Tsai",
    role: "UX Designer",
    company: "Google",
    class: "Founding Class",
    degree: "B.S Design '24",
    linkedin: "#",
    image: "/static/media/people/DaphneTsai.WebP",
    category: "founding"
  },
  {
    name: "Ethan Sterling",
    role: "Product Manager",
    company: "Apple",
    class: "Founding Class",
    degree: "B.S Engineering '24",
    linkedin: "#",
    image: "/static/media/people/groupPic2.WebP",
    category: "founding"
  },
  {
    name: "Andy Zhang",
    role: "Software Engineer",
    company: "Amazon",
    class: "Founding Class",
    degree: "B.S Computer Science '24",
    linkedin: "#",
    image: "/static/media/people/AndyZhang.WebP",
    category: "founding"
  },
  
  // Alpha Class
  {
    name: "Rav Patel",
    role: "Real Estate Private Equity Analyst",
    company: "Ares Management",
    class: "Alpha Class",
    degree: "BBA '24",
    linkedin: "https://www.linkedin.com/in/n01patel/",
    image: "/static/media/people/RavPatel.jpeg",
    category: "alpha"
  },
  {
    name: "Alex Souza",
    role: "Software Engineer",
    company: "Netflix",
    class: "Alpha Class",
    degree: "B.S Computer Science '24",
    linkedin: "#",
    image: "/static/media/people/AlexSouza.WebP",
    category: "alpha"
  },
  {
    name: "Ally Vern",
    role: "Data Analyst",
    company: "Tesla",
    class: "Alpha Class",
    degree: "B.S Data Science '24",
    linkedin: "#",
    image: "/static/media/people/AllyVern.WebP",
    category: "alpha"
  },
  {
    name: "Shaurya Gunderia",
    role: "Product Manager",
    company: "Uber",
    class: "Alpha Class",
    degree: "B.S Engineering '24",
    linkedin: "#",
    image: "/static/media/people/groupPic2.WebP",
    category: "alpha"
  }
];

// Function to create alumni card HTML
function createAlumniCard(alumni, isCompact = true) {
  const cardClass = isCompact ? 'alumni-card compact' : 'alumni-card featured';
  
  return `
    <div class="${cardClass}" data-category="${alumni.category}">
      <div class="card-image">
        <img src="${alumni.image}" alt="${alumni.name}" />
        <div class="company-logo">
          <span>${alumni.company}</span>
        </div>
      </div>
      <div class="card-content">
        <h3>${alumni.name}</h3>
        <p class="role">${alumni.role}</p>
        <p class="class">${alumni.class} • ${alumni.degree}</p>
        <div class="card-actions">
          <a href="${alumni.linkedin}" class="linkedin-btn" target="_blank">
            <i class="fab fa-linkedin"></i>
            Connect
          </a>
        </div>
      </div>
    </div>
  `;
}

// Function to render alumni grid
function renderAlumni(category = 'all') {
  const alumniGrid = document.getElementById('alumni-grid');
  let filteredAlumni = alumniData;
  
  if (category !== 'all') {
    filteredAlumni = alumniData.filter(alumni => alumni.category === category);
  }
  
  alumniGrid.innerHTML = filteredAlumni.map(alumni => createAlumniCard(alumni)).join('');
}

// Function to handle tab switching
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get the category and render alumni
      const category = button.getAttribute('data-class');
      renderAlumni(category);
    });
  });
}

// Function to animate stats on scroll
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.textContent.replace('+', ''));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  statNumbers.forEach(stat => observer.observe(stat));
}

// Function to animate counter
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + (target >= 25 ? '+' : '');
  }, 40);
}

// Dynamic logo management system
class LogoManager {
  constructor() {
    this.logoItems = document.querySelectorAll('.hero-logo-item.scattered');
    this.heroSection = document.querySelector('.hero-section');
    this.visibleLogos = [];
    this.minSpacing = 120; // Minimum spacing between logos in pixels
    
    if (!this.heroSection || this.logoItems.length === 0) {
      console.warn('Hero section or logo items not found');
      return;
    }
    
    this.breakpoints = {
      desktop: { width: 1400, maxLogos: 20, spacing: 90 },
      laptop: { width: 1200, maxLogos: 16, spacing: 85 },
      tablet: { width: 768, maxLogos: 12, spacing: 75 },
      mobile: { width: 480, maxLogos: 8, spacing: 70 },
      small: { width: 0, maxLogos: 6, spacing: 65 }
    };
    
    this.init();
  }
  
  init() {
    this.manageLogos();
    this.setupResizeListener();
  }
  
  getCurrentBreakpoint() {
    const width = window.innerWidth;
    
    if (width >= this.breakpoints.desktop.width) return this.breakpoints.desktop;
    if (width >= this.breakpoints.laptop.width) return this.breakpoints.laptop;
    if (width >= this.breakpoints.tablet.width) return this.breakpoints.tablet;
    if (width >= this.breakpoints.mobile.width) return this.breakpoints.mobile;
    return this.breakpoints.small;
  }
  
  getLogoPosition(logoItem) {
    const style = logoItem.getAttribute('style') || '';
    const topMatch = style.match(/top:\s*([0-9.]+)%/);
    const leftMatch = style.match(/left:\s*([0-9.]+)%/);
    const rightMatch = style.match(/right:\s*([0-9.]+)%/);
    
    if (!topMatch) return null;
    
    const top = parseFloat(topMatch[1]);
    let left;
    
    if (leftMatch) {
      left = parseFloat(leftMatch[1]);
    } else if (rightMatch) {
      left = 100 - parseFloat(rightMatch[1]);
    } else {
      return null;
    }
    
    return { top, left, element: logoItem };
  }
  
  calculateDistance(pos1, pos2) {
    const heroRect = this.heroSection.getBoundingClientRect();
    const x1 = (pos1.left / 100) * heroRect.width;
    const y1 = (pos1.top / 100) * heroRect.height;
    const x2 = (pos2.left / 100) * heroRect.width;
    const y2 = (pos2.top / 100) * heroRect.height;
    
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  isValidPosition(newPos, existingPositions, minSpacing) {
    return existingPositions.every(pos => {
      return this.calculateDistance(newPos, pos) >= minSpacing;
    });
  }
  
  selectOptimalLogos(maxLogos, minSpacing) {
    // Get all logos with actual content (not empty slots)
    const logosWithContent = Array.from(this.logoItems).filter(item => {
      const img = item.querySelector('img');
      return img && img.src;
    });
    
    // Get all logo positions and filter out edge positions that might overflow
    const allPositions = logosWithContent
      .map(item => this.getLogoPosition(item))
      .filter(pos => {
        if (pos === null) return false;
        // Filter out positions too close to edges to prevent overflow
        return pos.left >= 5 && pos.left <= 95 && pos.top >= 5 && pos.top <= 90;
      });
    
    if (allPositions.length === 0) return [];
    
    // Start with priority logos (ones with content first)
    const selectedPositions = [];
    const availablePositions = [...allPositions];
    
    // Sort by content first, then by position diversity
    availablePositions.sort((a, b) => {
      const aHasContent = a.element.querySelector('img')?.src ? 1 : 0;
      const bHasContent = b.element.querySelector('img')?.src ? 1 : 0;
      
      if (aHasContent !== bHasContent) {
        return bHasContent - aHasContent; // Content first
      }
      
      // Then by balanced distribution across the screen
      const aBalance = Math.abs(a.left - 50) + Math.abs(a.top - 50);
      const bBalance = Math.abs(b.left - 50) + Math.abs(b.top - 50);
      return aBalance - bBalance;
    });
    
    // Greedy selection algorithm with improved spacing
    for (const pos of availablePositions) {
      if (selectedPositions.length >= maxLogos) break;
      
      if (this.isValidPosition(pos, selectedPositions, minSpacing)) {
        selectedPositions.push(pos);
      }
    }
    
    return selectedPositions.map(pos => pos.element);
  }
  
  manageLogos() {
    const startTime = performance.now();
    const breakpoint = this.getCurrentBreakpoint();
    const selectedLogos = this.selectOptimalLogos(breakpoint.maxLogos, breakpoint.spacing);
    
    // Hide all logos first
    this.logoItems.forEach(item => {
      item.style.display = 'none';
      item.classList.remove('animate');
    });
    
    // Show and animate selected logos
    this.visibleLogos = selectedLogos;
    selectedLogos.forEach((item, index) => {
      item.style.display = 'flex';
      const delay = (index * 150) + (parseInt(item.dataset.delay) || 0);
      
      setTimeout(() => {
        item.classList.add('animate');
      }, delay);
    });
    
    const endTime = performance.now();
    
    // Debug logging (remove in production)
    console.log(`Logo Management: Showing ${selectedLogos.length}/${this.logoItems.length} logos for ${window.innerWidth}px width (max: ${breakpoint.maxLogos}, spacing: ${breakpoint.spacing}px) - Computed in ${(endTime - startTime).toFixed(2)}ms`);
  }
  
  setupResizeListener() {
    let resizeTimeout;
    let lastWidth = window.innerWidth;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        
        // Only recalculate if the width change is significant (> 50px)
        // or if we've crossed a breakpoint boundary
        if (Math.abs(currentWidth - lastWidth) > 50 || 
            this.hasBreakpointChanged(lastWidth, currentWidth)) {
          this.manageLogos();
          lastWidth = currentWidth;
        }
      }, 250);
    });
  }
  
  hasBreakpointChanged(oldWidth, newWidth) {
    const oldBreakpoint = this.getBreakpointForWidth(oldWidth);
    const newBreakpoint = this.getBreakpointForWidth(newWidth);
    return oldBreakpoint.maxLogos !== newBreakpoint.maxLogos;
  }
  
  getBreakpointForWidth(width) {
    if (width >= this.breakpoints.desktop.width) return this.breakpoints.desktop;
    if (width >= this.breakpoints.laptop.width) return this.breakpoints.laptop;
    if (width >= this.breakpoints.tablet.width) return this.breakpoints.tablet;
    if (width >= this.breakpoints.mobile.width) return this.breakpoints.mobile;
    return this.breakpoints.small;
  }
}

// Animate hero logos on page load
function animateHeroLogos() {
  try {
    // Check if hero section exists
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) {
      console.log('Hero section not found, skipping logo animation');
      return;
    }
    
    // Initialize the logo manager which handles dynamic allocation
    const logoManager = new LogoManager();
    console.log('Logo manager initialized successfully');
  } catch (error) {
    console.error('Error initializing logo manager:', error);
    
    // Fallback to simple animation
    const logoItems = document.querySelectorAll('.hero-logo-item.scattered');
    logoItems.forEach((item, index) => {
      const delay = (index * 200) + (parseInt(item.dataset.delay) || 0);
      
      setTimeout(() => {
        item.style.display = 'flex';
        item.classList.add('animate');
      }, delay);
    });
  }
}

// Animate companies collage when it comes into view
function setupCompaniesAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const logoItems = entry.target.querySelectorAll('.logo-item');
        
        logoItems.forEach((item) => {
          const delay = parseInt(item.dataset.delay) || 0;
          
          setTimeout(() => {
            item.style.animationDelay = '0s';
            item.classList.add('animate');
          }, delay);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const companiesSection = document.querySelector('.companies-collage');
  if (companiesSection) {
    observer.observe(companiesSection);
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Add js-enabled class to disable CSS fallback animations
  document.body.classList.add('js-enabled');
  
  renderAlumni(); // Render all alumni initially
  setupTabs(); // Setup tab functionality
  animateStats(); // Setup stats animation
  animateHeroLogos(); // Animate hero logos
  setupCompaniesAnimation(); // Setup companies animation
});
