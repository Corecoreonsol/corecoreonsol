/**
 * ULTRA-SIMPLE MOBILE NAVIGATION - FINAL FIX
 * ==========================================
 */

// Simple toggle function
function toggleMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  console.log('🔥 Toggle clicked!');
  console.log('Nav Toggle:', navToggle);
  console.log('Nav Menu:', navMenu);
  
  if (!navToggle || !navMenu) {
    console.error('❌ Elements not found!');
    return;
  }
  
  // Toggle classes
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  console.log('✅ Classes toggled');
  console.log('Toggle has active:', navToggle.classList.contains('active'));
  console.log('Menu has active:', navMenu.classList.contains('active'));
  
  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM ready - setting up navigation');
  
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    // Add click event
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
    
    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    console.log('✅ Navigation events bound');
  } else {
    console.error('❌ Navigation elements not found');
  }
});

// Backup initialization
window.addEventListener('load', function() {
  console.log('🔄 Window loaded - backup check');
  
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle && !navToggle.hasEventListeners) {
    navToggle.addEventListener('click', toggleMobileMenu);
    navToggle.hasEventListeners = true;
    console.log('🔧 Backup event listener added');
  }
});

// Make toggle function globally available for testing
window.toggleMobileMenu = toggleMobileMenu;
