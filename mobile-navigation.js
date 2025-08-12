/**
 * MOBILE NAVIGATION - CORE CRYPTOCURRENCY WEBSITE
 * Simplified and reliable mobile navigation
 * ===============================================
 */

class MobileNavigation {
  constructor() {
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.isMenuOpen = false;
    
    console.log('🔍 Nav Toggle:', this.navToggle);
    console.log('🔍 Nav Menu:', this.navMenu);
    
    this.init();
  }

  init() {
    if (!this.navToggle || !this.navMenu) {
      console.warn('❌ Navigation elements not found');
      return;
    }
    
    this.bindEvents();
    console.log('✅ Mobile navigation initialized');
  }

  bindEvents() {
    // Toggle menu on hamburger click
    this.navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('🔥 Nav toggle clicked');
      this.toggleMenu();
    });

    // Close menu when clicking on navigation links
    const navLinks = this.navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        console.log('🔗 Nav link clicked');
        setTimeout(() => this.closeMenu(), 300);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.navMenu.contains(e.target) && 
          !this.navToggle.contains(e.target)) {
        console.log('🖱️ Outside click - closing menu');
        this.closeMenu();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        console.log('⌨️ Escape pressed - closing menu');
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        console.log('📱 Window resized - closing menu');
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    console.log('🔄 Toggle menu - current state:', this.isMenuOpen);
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    console.log('📂 Opening menu');
    this.isMenuOpen = true;
    
    // Add active classes
    this.navToggle.classList.add('active');
    this.navMenu.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Menu opened');
  }

  closeMenu() {
    console.log('📁 Closing menu');
    this.isMenuOpen = false;
    
    // Remove active classes
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    console.log('✅ Menu closed');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM ready - initializing mobile navigation');
  
  // Always initialize mobile navigation
  window.mobileNavigation = new MobileNavigation();
  
  // Also initialize on window load as backup
  window.addEventListener('load', () => {
    if (!window.mobileNavigation || !window.mobileNavigation.navToggle) {
      console.log('🔄 Backup initialization');
      window.mobileNavigation = new MobileNavigation();
    }
  });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileNavigation;
}
