/**
 * MOBILE NAVIGATION - CORE CRYPTOCURRENCY WEBSITE
 * iOS Safari compatible mobile navigation with force initialization
 * ==============================================================
 */

class MobileNavigation {
  constructor() {
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.isMenuOpen = false;
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    console.log('🔍 iOS Device:', this.isIOS);
    console.log('🔍 Nav Toggle:', this.navToggle);
    console.log('🔍 Nav Menu:', this.navMenu);
    console.log('🔍 User Agent:', navigator.userAgent);
    
    this.init();
  }

  init() {
    if (!this.navToggle || !this.navMenu) {
      console.warn('❌ Navigation elements not found - retrying...');
      // Retry after a short delay
      setTimeout(() => {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        if (this.navToggle && this.navMenu) {
          this.bindEvents();
          console.log('✅ Mobile navigation initialized on retry');
        }
      }, 500);
      return;
    }
    
    this.bindEvents();
    this.forceIOSCompatibility();
    console.log('✅ Mobile navigation initialized');
  }

  forceIOSCompatibility() {
    if (this.isIOS) {
      // Force iOS compatibility
      this.navToggle.style.touchAction = 'manipulation';
      this.navToggle.style.webkitTapHighlightColor = 'transparent';
      this.navMenu.style.webkitOverflowScrolling = 'touch';
      
      // Add iOS-specific classes
      document.body.classList.add('ios-device');
      
      console.log('🍎 iOS compatibility enabled');
    }
  }

  bindEvents() {
    // Multiple event types for better iOS compatibility
    ['click', 'touchend'].forEach(eventType => {
      this.navToggle.addEventListener(eventType, (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`🔥 Nav toggle ${eventType}`);
        this.toggleMenu();
      }, { passive: false });
    });

    // Prevent double firing on iOS
    this.navToggle.addEventListener('touchstart', (e) => {
      e.preventDefault();
    }, { passive: false });

    // Close menu when clicking on navigation links
    const navLinks = this.navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      ['click', 'touchend'].forEach(eventType => {
        link.addEventListener(eventType, (e) => {
          console.log('🔗 Nav link clicked');
          setTimeout(() => this.closeMenu(), 200);
        }, { passive: false });
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

    // Handle window resize and orientation change
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        console.log('📱 Window resized - closing menu');
        this.closeMenu();
      }
    });

    // iOS orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        if (this.isMenuOpen) {
          this.adjustForOrientation();
        }
      }, 500);
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
    
    // Force styles for iOS
    this.navToggle.style.position = 'fixed';
    this.navToggle.style.zIndex = '100000';
    this.navMenu.style.position = 'fixed';
    this.navMenu.style.zIndex = '99999';
    this.navMenu.style.left = '0';
    this.navMenu.style.display = 'flex';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // iOS Safari fix
    if (this.isIOS) {
      document.documentElement.style.overflow = 'hidden';
      this.navMenu.style.webkitTransform = 'translateZ(0)';
    }
    
    console.log('✅ Menu opened - classes added, styles forced');
  }

  closeMenu() {
    console.log('📁 Closing menu');
    this.isMenuOpen = false;
    
    // Remove active classes
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    
    // Force styles for iOS
    this.navMenu.style.left = '-100%';
    
    // Restore body scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    
    // iOS Safari fix
    if (this.isIOS) {
      document.documentElement.style.overflow = '';
      this.navMenu.style.webkitTransform = '';
    }
    
    console.log('✅ Menu closed - classes removed, styles restored');
  }

  adjustForOrientation() {
    if (this.isIOS && this.isMenuOpen) {
      // Force recalculation on iOS
      this.navMenu.style.height = window.innerHeight + 'px';
    }
  }
}

// Multiple initialization attempts for iOS
function initMobileNav() {
  console.log('🚀 Attempting mobile navigation initialization...');
  
  if (!window.mobileNavigation) {
    window.mobileNavigation = new MobileNavigation();
  }
}

// Primary initialization
document.addEventListener('DOMContentLoaded', initMobileNav);

// Backup initializations for iOS Safari
window.addEventListener('load', () => {
  setTimeout(initMobileNav, 100);
});

// iOS-specific backup
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  // Additional iOS initialization attempts
  setTimeout(initMobileNav, 500);
  setTimeout(initMobileNav, 1000);
  
  // Initialize on first touch for iOS
  document.addEventListener('touchstart', function iOSInit() {
    setTimeout(initMobileNav, 100);
    document.removeEventListener('touchstart', iOSInit);
  }, { once: true });
}

// Debug function to manually test navigation
window.testMobileNav = function() {
  console.log('🧪 Manual navigation test');
  const nav = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  console.log('Toggle element:', nav);
  console.log('Menu element:', menu);
  if (window.mobileNavigation) {
    window.mobileNavigation.toggleMenu();
  } else {
    console.log('Creating new instance...');
    window.mobileNavigation = new MobileNavigation();
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileNavigation;
}
