/**
 * Professional Loading Animation Handler
 * APU Tigers Basketball Club
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    minLoadTime: 800,        // Minimum time to show loader (ms)
    maxLoadTime: 3000,       // Maximum time to show loader (ms)
    fadeOutDuration: 500,    // Fade out animation duration (ms)
    enableSkeleton: true,    // Enable skeleton screens
    debug: false             // Debug mode
  };

  // State
  let loadStartTime = Date.now();
  let contentLoaded = false;
  let imagesLoaded = false;

  /**
   * Initialize the loader
   */
  function initLoader() {
    log('🎬 Initializing loader...');
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Wait for DOM content
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onDOMReady);
    } else {
      onDOMReady();
    }
  }

  /**
   * Handle DOM ready event
   */
  function onDOMReady() {
    log('📄 DOM content loaded');
    contentLoaded = true;
    
    // Wait for images to load
    waitForImages();
    
    // Set maximum load time timeout
    setTimeout(() => {
      log('⏱️ Maximum load time reached');
      hideLoader();
    }, CONFIG.maxLoadTime);
  }

  /**
   * Wait for all images to load
   */
  function waitForImages() {
    const images = Array.from(document.images);
    
    if (images.length === 0) {
      log('📸 No images to load');
      imagesLoaded = true;
      checkLoadComplete();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    log(`📸 Waiting for ${totalImages} images...`);

    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', onImageLoad);
        img.addEventListener('error', onImageLoad); // Count errors as loaded
      }
    });

    function onImageLoad() {
      loadedCount++;
      updateProgress(loadedCount, totalImages);
      
      if (loadedCount >= totalImages) {
        log(`✅ All images loaded (${totalImages}/${totalImages})`);
        imagesLoaded = true;
        checkLoadComplete();
      }
    }

    // If all images were already complete
    if (loadedCount >= totalImages) {
      log('✅ All images already cached');
      imagesLoaded = true;
      checkLoadComplete();
    }
  }

  /**
   * Update progress bar
   */
  function updateProgress(current, total) {
    const progressBar = document.querySelector('.loader-progress-bar');
    if (progressBar) {
      const percentage = (current / total) * 100;
      progressBar.style.width = `${percentage}%`;
      log(`📊 Progress: ${current}/${total} (${percentage.toFixed(0)}%)`);
    }
  }

  /**
   * Check if loading is complete
   */
  function checkLoadComplete() {
    if (!contentLoaded || !imagesLoaded) {
      return;
    }

    const elapsed = Date.now() - loadStartTime;
    const remainingTime = Math.max(0, CONFIG.minLoadTime - elapsed);

    log(`⏰ Elapsed: ${elapsed}ms, Remaining: ${remainingTime}ms`);

    setTimeout(() => {
      hideLoader();
    }, remainingTime);
  }

  /**
   * Hide the loader
   */
  function hideLoader() {
    log('🎭 Hiding loader...');
    
    const loader = document.querySelector('.page-loader');
    
    if (!loader) {
      log('⚠️ Loader element not found');
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
      return;
    }

    // Add hidden class for fade out animation
    loader.classList.add('hidden');
    
    // Update body classes
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    
    // Initialize lazy load animations
    initLazyLoad();
    
    // Remove loader from DOM after animation
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
      log('✅ Loader removed from DOM');
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('loaderComplete'));
    }, CONFIG.fadeOutDuration);
  }

  /**
   * Initialize lazy load animations
   */
  function initLazyLoad() {
    const lazyElements = document.querySelectorAll('.lazy-load');
    
    if (lazyElements.length === 0) {
      return;
    }

    log(`🎨 Initializing ${lazyElements.length} lazy load elements`);

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    lazyElements.forEach(el => observer.observe(el));
  }

  /**
   * Show skeleton screens
   */
  function showSkeleton() {
    if (!CONFIG.enableSkeleton) {
      return;
    }

    log('💀 Showing skeleton screens');
    
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) {
      return;
    }

    // Hide actual content
    mainContent.style.visibility = 'hidden';
    
    // Create skeleton wrapper
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-wrapper';
    skeleton.innerHTML = `
      <div class="container-custom">
        <div class="skeleton skeleton-hero"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton-cards">
          <div class="skeleton-card">
            <div class="skeleton-card-image"></div>
            <div class="skeleton skeleton-card-title"></div>
            <div class="skeleton skeleton-card-text"></div>
            <div class="skeleton skeleton-card-text"></div>
          </div>
          <div class="skeleton-card">
            <div class="skeleton-card-image"></div>
            <div class="skeleton skeleton-card-title"></div>
            <div class="skeleton skeleton-card-text"></div>
            <div class="skeleton skeleton-card-text"></div>
          </div>
          <div class="skeleton-card">
            <div class="skeleton-card-image"></div>
            <div class="skeleton skeleton-card-title"></div>
            <div class="skeleton skeleton-card-text"></div>
            <div class="skeleton skeleton-card-text"></div>
          </div>
        </div>
      </div>
    `;
    
    mainContent.parentNode.insertBefore(skeleton, mainContent);
    
    // Remove skeleton when content loads
    window.addEventListener('loaderComplete', () => {
      mainContent.style.visibility = 'visible';
      if (skeleton.parentNode) {
        skeleton.parentNode.removeChild(skeleton);
      }
    }, { once: true });
  }

  /**
   * Create and inject loader HTML
   */
  function createLoaderHTML() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="basketball-loader">
          <div class="basketball">
            <div class="basketball-line"></div>
          </div>
          <div class="basketball-shadow"></div>
        </div>
        <div class="loader-text">APU Tigers</div>
        <div class="loader-subtext">Loading your experience...</div>
        <div class="loader-progress">
          <div class="loader-progress-bar"></div>
        </div>
        <div class="loader-dots">
          <div class="loader-dot"></div>
          <div class="loader-dot"></div>
          <div class="loader-dot"></div>
        </div>
      </div>
    `;
    
    // Insert at the beginning of body
    if (document.body) {
      document.body.insertBefore(loader, document.body.firstChild);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.insertBefore(loader, document.body.firstChild);
      });
    }
  }

  /**
   * Debug logging
   */
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[Loader]', ...args);
    }
  }

  /**
   * Public API
   */
  window.APULoader = {
    show: createLoaderHTML,
    hide: hideLoader,
    config: CONFIG
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    // Create loader HTML immediately
    createLoaderHTML();
    // Initialize when ready
    document.addEventListener('DOMContentLoaded', initLoader);
  } else {
    createLoaderHTML();
    initLoader();
  }

})();
