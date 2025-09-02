/**
 * Rush Announcement Popup Handler
 * Shows a popup announcing Fall 2025 Rush and creates a persistent floating bubble
 */

class RushPopup {
  constructor() {
    this.popup = document.getElementById('rushPopup');
    this.closeBtn = document.getElementById('closePopup');
    this.dismissBtn = document.getElementById('dismissPopup');
    this.storageKey = 'tek-rush-popup-dismissed';
    this.sessionKey = 'tek-rush-popup-shown-session';
    this.bubbleKey = 'tek-rush-bubble-dismissed';
    
    this.init();
  }
  
  init() {
    // Create floating bubble on all pages
    this.createFloatingBubble();
    
    // Only show main popup on homepage
    if (document.getElementById('homepage')) {
      this.handleHomepagePopup();
    }
    
    // Bind event listeners
    this.bindEvents();
  }
  
  handleHomepagePopup() {
    // Check if user has permanently dismissed the popup
    if (localStorage.getItem(this.storageKey)) {
      return;
    }
    
    // Check if popup was already shown in this session
    if (sessionStorage.getItem(this.sessionKey)) {
      return;
    }
    
    // Show popup after a short delay
    setTimeout(() => this.showPopup(), 1500);
  }
  
  createFloatingBubble() {
    // Don't create bubble if user has dismissed it permanently
    if (localStorage.getItem(this.bubbleKey)) {
      return;
    }
    
    // Create bubble HTML
    const bubble = document.createElement('div');
    bubble.id = 'rushBubble';
    bubble.className = 'rush-bubble';
    bubble.innerHTML = `
      <div class="bubble-content">
        <div class="bubble-icon">📝</div>
        <div class="bubble-text">Apply Now!</div>
        <button class="bubble-close" id="bubbleClose">&times;</button>
      </div>
    `;
    
    document.body.appendChild(bubble);
    
    // Show bubble after a delay (or immediately if not on homepage)
    const delay = document.getElementById('homepage') ? 8000 : 1000;
    setTimeout(() => {
      bubble.classList.add('show');
    }, delay);
    
    // Bind bubble events
    this.bindBubbleEvents(bubble);
  }
  
  bindBubbleEvents(bubble) {
    const bubbleContent = bubble.querySelector('.bubble-content');
    const bubbleClose = bubble.querySelector('.bubble-close');
    
    // Click bubble to show popup
    bubbleContent.addEventListener('click', (e) => {
      if (e.target !== bubbleClose) {
        this.showPopupFromBubble();
      }
    });
    
    // Close bubble permanently
    bubbleClose.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dismissBubble(bubble);
    });
  }
  
  showPopupFromBubble() {
    // If popup doesn't exist, create it
    if (!this.popup) {
      this.createPopupHTML();
      this.bindEvents();
    }
    
    this.showPopup();
  }
  
  createPopupHTML() {
    const popupHTML = `
      <div id="rushPopup" class="popup-overlay">
        <div class="popup-content">
          <button class="popup-close" id="closePopup">&times;</button>
          <div class="popup-header">
            <h2>🎉 Fall 2025 Applications Now Open!</h2>
          </div>
          <div class="popup-body">
            <p>Ready to join the most innovative tech fraternity at the University of Michigan?</p>
            <p><strong>Fall 2025 Applications</strong> are now live! We're looking for ambitious students passionate about technology, leadership, and brotherhood. All majors welcome!</p>
            <div class="popup-highlights">
              <div class="highlight-item">
                <i class="fas fa-file-alt"></i>
                <span>Applications due September 7th</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-users"></i>
                <span>Meet our amazing brothers at rush events</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-rocket"></i>
                <span>Launch your tech career with Tau Epsilon Kappa!</span>
              </div>
            </div>
          </div>
          <div class="popup-actions">
            <a href="https://forms.gle/n5NMZegrb2JRWBeW8" target="_blank" class="popup-btn primary">Apply Now</a>
            <a href="/rush" class="popup-btn secondary">Learn More About Rush</a>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', popupHTML);
    this.popup = document.getElementById('rushPopup');
    this.closeBtn = document.getElementById('closePopup');
    this.dismissBtn = document.getElementById('dismissPopup');
  }
  
  bindEvents() {
    if (!this.popup) return;
    
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.hidePopup());
    }
    
    // Close on overlay click
    this.popup.addEventListener('click', (e) => {
      if (e.target === this.popup) {
        this.hidePopup();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.popup && this.popup.classList.contains('show')) {
        this.hidePopup();
      }
    });
  }
  
  showPopup() {
    if (!this.popup) return;
    
    // Mark as shown in this session
    sessionStorage.setItem(this.sessionKey, 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Show popup with animation
    this.popup.classList.add('show');
    
    // Focus management for accessibility
    this.popup.querySelector('.popup-close').focus();
  }
  
  hidePopup() {
    if (!this.popup) return;
    
    // Hide popup
    this.popup.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  dismissPopupSession() {
    // Remember user's choice for this session only
    sessionStorage.setItem(this.sessionKey, 'true');
    this.hidePopup();
  }
  
  dismissBubble(bubble) {
    // Hide bubble with animation
    bubble.classList.remove('show');
    
    // Remember user's choice permanently
    localStorage.setItem(this.bubbleKey, 'true');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
      }
    }, 300);
  }
  
  // Method to reset popup and bubble (for testing/admin purposes)
  static reset() {
    localStorage.removeItem('tek-rush-popup-dismissed');
    localStorage.removeItem('tek-rush-bubble-dismissed');
    sessionStorage.removeItem('tek-rush-popup-shown-session');
    
    // Remove existing bubble if present
    const existingBubble = document.getElementById('rushBubble');
    if (existingBubble) {
      existingBubble.remove();
    }
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RushPopup();
});

// Expose reset method globally for testing
window.resetRushPopup = RushPopup.reset;
