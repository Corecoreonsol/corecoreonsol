/**
 * MOBILE NAVIGATION ENHANCEMENTS - CORE CRYPTOCURRENCY WEBSITE
 * Enhanced mobile navigation with touch gestures and smooth animations
 * ==================================================================
 */

class MobileNavigation {
  constructor() {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navbar = document.getElementById('navbar');
    this.isMenuOpen = false;
    this.touchStartY = 0;
    this.touchStartX = 0;
    this.swipeThreshold = 50;
    
    this.init();
  }

  init() {
    if (!this.navToggle || !this.navMenu) return;
    
    this.bindEvents();
    this.addTouchGestures();
    this.improveAccessibility();
    
    console.log('📱 Mobile navigation enhanced');
  }

  bindEvents() {
    // Enhanced toggle functionality
    this.navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close menu when clicking on links
    const navLinks = this.navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isMenuOpen) {
          setTimeout(() => this.closeMenu(), 300); // Delay for smooth scroll
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.navMenu.contains(e.target) && 
          !this.navToggle.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
        this.navToggle.focus(); // Return focus to toggle button
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        if (this.isMenuOpen) {
          this.adjustMenuHeight();
        }
      }, 500);
    });
  }

  addTouchGestures() {
    if (!this.isTouch) return;

    // Swipe to close menu
    this.navMenu.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.navMenu.addEventListener('touchmove', (e) => {
      if (!this.isMenuOpen) return;
      
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - this.touchStartX;
      const deltaY = touchY - this.touchStartY;
      
      // Swipe right to close (when menu is open from left)
      if (deltaX > this.swipeThreshold && Math.abs(deltaY) < this.swipeThreshold) {
        this.closeMenu();
      }
    }, { passive: true });

    // Edge swipe to open menu (from left edge)
    document.addEventListener('touchstart', (e) => {
      if (this.isMenuOpen) return;
      
      const touch = e.touches[0];
      if (touch.clientX < 20) { // 20px from left edge
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
      }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (this.isMenuOpen || this.touchStartX > 20) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - this.touchStartX;
      const deltaY = touch.clientY - this.touchStartY;
      
      // Swipe right from edge to open
      if (deltaX > this.swipeThreshold && Math.abs(deltaY) < this.swipeThreshold) {
        this.openMenu();
      }
    }, { passive: true });
  }

  improveAccessibility() {
    // Add ARIA attributes
    this.navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navToggle.setAttribute('aria-controls', 'nav-menu');
    
    this.navMenu.setAttribute('aria-hidden', 'true');
    this.navMenu.setAttribute('role', 'navigation');
    this.navMenu.setAttribute('aria-label', 'Main navigation');

    // Add focus trap
    this.setupFocusTrap();
  }

  setupFocusTrap() {
    const focusableElements = this.navMenu.querySelectorAll(
      'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    this.navMenu.addEventListener('keydown', (e) => {
      if (!this.isMenuOpen || e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    
    // Add classes for animations
    this.navToggle.classList.add('active');
    this.navMenu.classList.add('active');
    
    // Update ARIA attributes
    this.navToggle.setAttribute('aria-expanded', 'true');
    this.navMenu.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    this.preventBodyScroll();
    
    // Focus first menu item
    setTimeout(() => {
      const firstLink = this.navMenu.querySelector('.nav-link');
      if (firstLink) firstLink.focus();
    }, 100);
    
    // Add stagger animation to menu items
    this.animateMenuItems();
    
    // Trigger custom event
    window.dispatchEvent(new CustomEvent('mobileMenuOpened'));
  }

  closeMenu() {
    this.isMenuOpen = false;
    
    // Remove classes
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    
    // Update ARIA attributes
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navMenu.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    this.restoreBodyScroll();
    
    // Remove stagger classes after animation
    setTimeout(() => {
      this.removeStaggerClasses();
    }, 400);
    
    // Trigger custom event
    window.dispatchEvent(new CustomEvent('mobileMenuClosed'));
  }

  preventBodyScroll() {
    // Save current scroll position
    this.scrollPosition = window.pageYOffset;
    
    // Apply styles to prevent scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  restoreBodyScroll() {
    // Remove fixed positioning
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    
    // Restore scroll position
    window.scrollTo(0, this.scrollPosition);
  }

  animateMenuItems() {
    const menuItems = this.navMenu.querySelectorAll('.nav-link');
    
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 100 + 150); // Staggered delay
    });
  }

  removeStaggerClasses() {
    const menuItems = this.navMenu.querySelectorAll('.nav-link');
    
    menuItems.forEach(item => {
      item.style.transition = '';
      item.style.opacity = '';
      item.style.transform = '';
    });
  }

  adjustMenuHeight() {
    // Adjust menu height for orientation changes
    const vh = window.innerHeight;
    this.navMenu.style.height = `${vh - 70}px`;
  }

  // Add vibration feedback for touch devices
  addHapticFeedback() {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // 50ms vibration
    }
  }

  // Enhanced toggle with haptic feedback
  enhancedToggle() {
    this.addHapticFeedback();
    this.toggleMenu();
  }

  destroy() {
    // Clean up event listeners and styles
    this.restoreBodyScroll();
    this.removeStaggerClasses();
  }
}

// Initialize mobile navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on mobile-sized screens
  if (window.innerWidth <= 768) {
    window.mobileNavigation = new MobileNavigation();
  }
  
  // Initialize on resize if needed
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !window.mobileNavigation) {
      window.mobileNavigation = new MobileNavigation();
    } else if (window.innerWidth > 768 && window.mobileNavigation) {
      window.mobileNavigation.destroy();
      window.mobileNavigation = null;
    }
  });
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (window.mobileNavigation) {
    window.mobileNavigation.destroy();
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileNavigation;
}
