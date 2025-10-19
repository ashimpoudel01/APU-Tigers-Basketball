/**
 * Mobile Touch Gestures & Interactions
 * APU Tigers Basketball Club
 * 
 * Features:
 * - Swipe navigation for carousels
 * - Pull-to-refresh functionality
 * - Touch-optimized mobile menu
 * - Smooth momentum scrolling
 * - Long press interactions
 * - Pinch-to-zoom for images
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    swipeThreshold: 50,           // Minimum distance for swipe (px)
    swipeTimeout: 300,            // Maximum time for swipe (ms)
    pullToRefreshThreshold: 80,   // Pull distance to trigger refresh (px)
    longPressDuration: 500,       // Long press duration (ms)
    debug: false                  // Debug mode
  };

  // State
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let pullStartY = 0;
  let isPulling = false;
  let longPressTimer = null;

  /**
   * Initialize touch gestures
   */
  function initTouchGestures() {
    if (!isTouchDevice()) {
      log('❌ Not a touch device, gestures disabled');
      return;
    }

    log('📱 Initializing touch gestures...');

    // Initialize different gesture handlers
    initCarouselSwipe();
    initPullToRefresh();
    initMobileMenu();
    initImageZoom();
    initSmoothScrolling();
    
    log('✅ Touch gestures initialized');
  }

  /**
   * Check if device supports touch
   */
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  /**
   * Initialize carousel swipe gestures
   */
  function initCarouselSwipe() {
    const carousels = document.querySelectorAll('.hero-carousel, .carousel, .slider');
    
    if (carousels.length === 0) {
      log('No carousels found');
      return;
    }

    carousels.forEach(carousel => {
      let startX = 0;
      let startY = 0;
      let startTime = 0;
      let isDragging = false;
      let currentTranslate = 0;
      let prevTranslate = 0;

      carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
      carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
      carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

      function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
        isDragging = true;
        
        // Disable auto-play during drag
        const autoplay = carousel.dataset.autoplay;
        if (autoplay) {
          carousel.dataset.wasAutoplay = autoplay;
          carousel.dataset.autoplay = 'false';
        }
      }

      function handleTouchMove(e) {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - startX;
        const diffY = currentY - startY;

        // Check if horizontal swipe (not vertical scroll)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
          e.preventDefault(); // Prevent vertical scroll
          
          // Visual feedback during drag
          const slides = carousel.querySelector('.hero-slides, .slides');
          if (slides) {
            currentTranslate = prevTranslate + diffX;
            slides.style.transition = 'none';
            slides.style.transform = `translateX(${currentTranslate}px)`;
          }
        }
      }

      function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - startX;
        const diffY = endY - startY;
        const diffTime = Date.now() - startTime;

        // Reset visual feedback
        const slides = carousel.querySelector('.hero-slides, .slides');
        if (slides) {
          slides.style.transition = '';
          slides.style.transform = '';
        }

        // Check for horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY) && 
            Math.abs(diffX) > CONFIG.swipeThreshold && 
            diffTime < CONFIG.swipeTimeout) {
          
          if (diffX > 0) {
            // Swipe right - previous slide
            triggerCarouselPrev(carousel);
            log('👈 Swipe right - Previous slide');
          } else {
            // Swipe left - next slide
            triggerCarouselNext(carousel);
            log('👉 Swipe left - Next slide');
          }
        }

        prevTranslate = 0;
        currentTranslate = 0;

        // Re-enable auto-play
        const wasAutoplay = carousel.dataset.wasAutoplay;
        if (wasAutoplay) {
          carousel.dataset.autoplay = wasAutoplay;
          delete carousel.dataset.wasAutoplay;
        }
      }
    });

    log(`✅ Swipe gestures added to ${carousels.length} carousel(s)`);
  }

  /**
   * Trigger carousel navigation
   */
  function triggerCarouselNext(carousel) {
    const nextBtn = carousel.querySelector('.carousel-btn-next, .next-btn, [data-direction="next"]');
    if (nextBtn) {
      nextBtn.click();
    } else {
      // Fallback: dispatch custom event
      carousel.dispatchEvent(new CustomEvent('carouselNext'));
    }
  }

  function triggerCarouselPrev(carousel) {
    const prevBtn = carousel.querySelector('.carousel-btn-prev, .prev-btn, [data-direction="prev"]');
    if (prevBtn) {
      prevBtn.click();
    } else {
      // Fallback: dispatch custom event
      carousel.dispatchEvent(new CustomEvent('carouselPrev'));
    }
  }

  /**
   * Initialize Pull-to-Refresh
   */
  function initPullToRefresh() {
    let pullIndicator = null;
    let isRefreshing = false;

    // Create pull indicator
    function createPullIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'pull-to-refresh-indicator';
      indicator.innerHTML = `
        <div class="pull-refresh-content">
          <i class="fas fa-arrow-down pull-refresh-icon"></i>
          <span class="pull-refresh-text">Pull to refresh</span>
        </div>
      `;
      document.body.insertBefore(indicator, document.body.firstChild);
      return indicator;
    }

    pullIndicator = createPullIndicator();

    document.addEventListener('touchstart', function(e) {
      if (window.scrollY === 0 && !isRefreshing) {
        pullStartY = e.touches[0].clientY;
        isPulling = true;
      }
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      if (!isPulling || isRefreshing) return;

      const currentY = e.touches[0].clientY;
      const pullDistance = currentY - pullStartY;

      if (pullDistance > 0) {
        const scale = Math.min(pullDistance / CONFIG.pullToRefreshThreshold, 1);
        pullIndicator.style.transform = `translateY(${Math.min(pullDistance, CONFIG.pullToRefreshThreshold)}px)`;
        pullIndicator.style.opacity = scale;

        const icon = pullIndicator.querySelector('.pull-refresh-icon');
        const text = pullIndicator.querySelector('.pull-refresh-text');
        
        if (pullDistance >= CONFIG.pullToRefreshThreshold) {
          icon.style.transform = 'rotate(180deg)';
          text.textContent = 'Release to refresh';
          pullIndicator.classList.add('ready');
        } else {
          icon.style.transform = 'rotate(0deg)';
          text.textContent = 'Pull to refresh';
          pullIndicator.classList.remove('ready');
        }
      }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
      if (!isPulling || isRefreshing) return;

      const pullDistance = pullStartY > 0 ? e.changedTouches[0].clientY - pullStartY : 0;

      if (pullDistance >= CONFIG.pullToRefreshThreshold) {
        // Trigger refresh
        isRefreshing = true;
        pullIndicator.classList.add('refreshing');
        pullIndicator.querySelector('.pull-refresh-icon').className = 'fas fa-spinner fa-spin pull-refresh-icon';
        pullIndicator.querySelector('.pull-refresh-text').textContent = 'Refreshing...';

        log('🔄 Pull-to-refresh triggered');

        // Perform refresh (reload page)
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        // Reset
        pullIndicator.style.transform = '';
        pullIndicator.style.opacity = '';
        pullIndicator.classList.remove('ready');
      }

      isPulling = false;
      pullStartY = 0;
    }, { passive: true });

    log('✅ Pull-to-refresh initialized');
  }

  /**
   * Initialize mobile menu touch interactions
   */
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-nav, .mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) {
      log('Mobile menu elements not found');
      return;
    }

    // Swipe down to close menu
    let menuStartY = 0;

    mobileMenu.addEventListener('touchstart', function(e) {
      menuStartY = e.touches[0].clientY;
    }, { passive: true });

    mobileMenu.addEventListener('touchmove', function(e) {
      const currentY = e.touches[0].clientY;
      const diffY = currentY - menuStartY;

      // Allow swipe down to close
      if (diffY > 50 && mobileMenu.classList.contains('active')) {
        e.preventDefault();
        mobileMenu.style.transform = `translateY(${diffY}px)`;
        mobileMenu.style.opacity = 1 - (diffY / 200);
      }
    }, { passive: false });

    mobileMenu.addEventListener('touchend', function(e) {
      const endY = e.changedTouches[0].clientY;
      const diffY = endY - menuStartY;

      if (diffY > 100) {
        // Close menu
        mobileMenuBtn.click();
        log('📱 Mobile menu closed by swipe');
      }

      // Reset styles
      mobileMenu.style.transform = '';
      mobileMenu.style.opacity = '';
    }, { passive: true });

    log('✅ Mobile menu gestures initialized');
  }

  /**
   * Initialize image zoom (pinch-to-zoom)
   */
  function initImageZoom() {
    const images = document.querySelectorAll('.gallery-image, .news-image, .event-image, img[data-zoomable]');
    
    images.forEach(img => {
      let scale = 1;
      let initialDistance = 0;

      img.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
          e.preventDefault();
          initialDistance = getDistance(e.touches);
          img.style.transition = 'none';
        }
      }, { passive: false });

      img.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
          e.preventDefault();
          const currentDistance = getDistance(e.touches);
          scale = currentDistance / initialDistance;
          scale = Math.max(1, Math.min(scale, 3)); // Limit between 1x and 3x
          
          img.style.transform = `scale(${scale})`;
        }
      }, { passive: false });

      img.addEventListener('touchend', function() {
        img.style.transition = 'transform 0.3s ease';
        if (scale < 1.2) {
          img.style.transform = 'scale(1)';
          scale = 1;
        }
      }, { passive: true });

      // Double tap to zoom
      let lastTap = 0;
      img.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
          e.preventDefault();
          if (scale === 1) {
            img.style.transform = 'scale(2)';
            scale = 2;
          } else {
            img.style.transform = 'scale(1)';
            scale = 1;
          }
        }
        lastTap = currentTime;
      }, { passive: false });
    });

    function getDistance(touches) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    log(`✅ Pinch-to-zoom added to ${images.length} image(s)`);
  }

  /**
   * Initialize smooth momentum scrolling
   */
  function initSmoothScrolling() {
    // Enable momentum scrolling for iOS
    document.body.style.webkitOverflowScrolling = 'touch';

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Add haptic feedback on iOS
          if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(10);
          }
        }
      });
    });

    log('✅ Smooth scrolling initialized');
  }

  /**
   * Long press handler (for future use)
   */
  function initLongPress() {
    const longPressElements = document.querySelectorAll('[data-long-press]');
    
    longPressElements.forEach(element => {
      element.addEventListener('touchstart', function(e) {
        longPressTimer = setTimeout(() => {
          element.classList.add('long-pressed');
          
          // Haptic feedback
          if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
          }
          
          // Dispatch custom event
          element.dispatchEvent(new CustomEvent('longpress'));
          log('👆 Long press detected');
        }, CONFIG.longPressDuration);
      }, { passive: true });

      element.addEventListener('touchend', function() {
        clearTimeout(longPressTimer);
        element.classList.remove('long-pressed');
      }, { passive: true });

      element.addEventListener('touchmove', function() {
        clearTimeout(longPressTimer);
      }, { passive: true });
    });
  }

  /**
   * Add touch ripple effect
   */
  function addTouchRipple() {
    const rippleElements = document.querySelectorAll('.btn, .card, .nav-link, [data-ripple]');
    
    rippleElements.forEach(element => {
      element.addEventListener('touchstart', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'touch-ripple';
        
        const rect = this.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 600);
      }, { passive: true });
    });

    log(`✅ Touch ripple added to ${rippleElements.length} element(s)`);
  }

  /**
   * Prevent zoom on double tap (optional)
   */
  function preventDoubleTabZoom() {
    let lastTouchEnd = 0;
    
    document.addEventListener('touchend', function(e) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  }

  /**
   * Debug logging
   */
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[TouchGestures]', ...args);
    }
  }

  /**
   * Public API
   */
  window.APUGestures = {
    config: CONFIG,
    isTouchDevice: isTouchDevice,
    init: initTouchGestures
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTouchGestures);
  } else {
    initTouchGestures();
  }

  // Also initialize after page load (for dynamically loaded content)
  window.addEventListener('load', function() {
    addTouchRipple();
  });

})();
