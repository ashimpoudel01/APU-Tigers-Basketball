/**
 * Dark Mode Theme Toggle
 * Handles theme switching with smooth animations and localStorage persistence
 */

(function() {
  'use strict';

  // Theme configuration
  const THEME_KEY = 'apu-tigers-theme';
  const DARK_CLASS = 'dark';
  const LIGHT_ICON = 'fa-sun';
  const DARK_ICON = 'fa-moon';

  // Get theme toggle button
  function initThemeToggle() {
    // Load saved theme or detect system preference immediately
    const savedTheme = getSavedTheme();
    const initialTheme = savedTheme || getSystemTheme();
    
    // Apply initial theme to HTML element (works even if button doesn't exist yet)
    setTheme(initialTheme, false);
    
    // Try to find and setup the button
    const toggleBtn = document.getElementById('theme-toggle');
    
    if (!toggleBtn) {
      // Button not found yet, wait for it to be added to DOM
      console.log('Theme toggle button not found, waiting...');
      
      // Use MutationObserver to watch for button being added
      const observer = new MutationObserver(function(mutations) {
        const btn = document.getElementById('theme-toggle');
        if (btn) {
          observer.disconnect();
          setupToggleButton(btn);
          console.log('✅ Theme toggle initialized (delayed):', initialTheme);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Also set a timeout as fallback
      setTimeout(function() {
        const btn = document.getElementById('theme-toggle');
        if (btn && !btn.hasAttribute('data-theme-ready')) {
          observer.disconnect();
          setupToggleButton(btn);
          console.log('✅ Theme toggle initialized (timeout):', initialTheme);
        }
      }, 500);
      
      return;
    }

    // Button exists, setup immediately
    setupToggleButton(toggleBtn);
    console.log('✅ Theme toggle initialized:', initialTheme);
  }
  
  // Setup button event listeners
  function setupToggleButton(toggleBtn) {
    if (toggleBtn.hasAttribute('data-theme-ready')) {
      return; // Already initialized
    }
    
    toggleBtn.setAttribute('data-theme-ready', 'true');
    toggleBtn.addEventListener('click', handleThemeToggle);
    
    // Update icon based on current theme
    const currentTheme = document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = currentTheme === 'dark' ? `fas ${LIGHT_ICON}` : `fas ${DARK_ICON}`;
    }
    
    // Listen for system theme changes
    watchSystemTheme();
  }

  // Toggle between light and dark themes
  function handleThemeToggle() {
    const currentTheme = document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme, true);
  }

  // Set theme with optional animation
  function setTheme(theme, animate = true) {
    const html = document.documentElement;
    
    // Add transition class for smooth animation
    if (animate) {
      html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      setTimeout(() => {
        html.style.transition = '';
      }, 300);
    }

    // Apply theme to HTML element
    if (theme === 'dark') {
      html.classList.add(DARK_CLASS);
    } else {
      html.classList.remove(DARK_CLASS);
    }

    // Update button icon if it exists
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      
      if (theme === 'dark') {
        if (icon) {
          icon.classList.remove(DARK_ICON);
          icon.classList.add(LIGHT_ICON);
        }
        toggleBtn.setAttribute('aria-label', 'Switch to light mode');
        toggleBtn.setAttribute('title', 'Switch to light mode');
      } else {
        if (icon) {
          icon.classList.remove(LIGHT_ICON);
          icon.classList.add(DARK_ICON);
        }
        toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        toggleBtn.setAttribute('title', 'Switch to dark mode');
      }
    }

    // Save preference
    saveTheme(theme);

    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme } 
    }));

    console.log('🎨 Theme changed to:', theme);
  }

  // Get saved theme from localStorage
  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      console.warn('localStorage not available:', e);
      return null;
    }
  }

  // Save theme to localStorage
  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('Could not save theme:', e);
    }
  }

  // Detect system theme preference
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Watch for system theme changes
  function watchSystemTheme() {
    if (!window.matchMedia) return;

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Modern browsers
    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', (e) => {
        // Only apply if user hasn't manually set a preference
        if (!getSavedTheme()) {
          const newTheme = e.matches ? 'dark' : 'light';
          setTheme(newTheme, true);
        }
      });
    } 
    // Older browsers
    else if (darkModeQuery.addListener) {
      darkModeQuery.addListener((e) => {
        if (!getSavedTheme()) {
          const newTheme = e.matches ? 'dark' : 'light';
          setTheme(newTheme, true);
        }
      });
    }
  }

  // Add keyboard shortcut (Ctrl/Cmd + Shift + D)
  function setupKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        handleThemeToggle();
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initThemeToggle();
      setupKeyboardShortcut();
    });
  } else {
    initThemeToggle();
    setupKeyboardShortcut();
  }

  // Expose theme API to window (for admin panel, etc.)
  window.APUTheme = {
    get current() {
      return document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
    },
    set(theme) {
      if (theme === 'dark' || theme === 'light') {
        setTheme(theme, true);
      }
    },
    toggle() {
      handleThemeToggle();
    }
  };

  // Initialize theme toggle when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    // DOM is already loaded
    initThemeToggle();
  }

})();
