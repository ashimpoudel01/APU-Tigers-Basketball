// APU Tigers Basketball Club - Main JavaScript File

// Global variables
let currentSlide = 0;
let slideInterval;
let isCarouselPlaying = true;

// DOM elements (nav-related elements are resolved at runtime after dynamic insertion)
let navigation;
let mobileMenuBtn;
let mobileMenu;
let navLinks;
const pages = document.querySelectorAll('.page');
const backToTopBtn = document.getElementById('back-to-top');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselIndicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const statNumbers = document.querySelectorAll('.stat-number');

// Load navigation dynamically
function loadNavigation() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
                // Initialize navigation after it's loaded
                initializeNavigation();
                // Highlight active page
                highlightActivePage();
            })
            .catch(error => console.error('Error loading navigation:', error));
    } else {
        // If no placeholder, initialize navigation directly (it's already in the page)
        initializeNavigation();
        highlightActivePage();
    }
}

// Highlight the active page in navigation
function highlightActivePage() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    allNavLinks.forEach(link => {
        // Remove any existing active class
        link.classList.remove('active');
        
        // Get the href filename
        const linkPage = link.getAttribute('href');
        
        // Check if this link matches the current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
    initializeCarousel();
    initializeStatsCounter();
    initializeBackToTop();
    initializeSmoothScrolling();
    initializeRevealAnimations();
    
    // Start the carousel if present on this page
    if (document.querySelectorAll('.carousel-slide').length > 0) {
        startCarousel();
    }
});

// Navigation functionality
function initializeNavigation() {
    // Resolve nav-related elements each time (they may be inserted dynamically)
    navigation = document.getElementById('navigation');
    mobileMenuBtn = document.getElementById('mobile-menu-btn');
    mobileMenu = document.getElementById('mobile-menu');
    navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // If navigation isn't present yet, wait for it to be inserted into the DOM
    if (!navigation) {
        const observer = new MutationObserver(function(mutations, obs) {
            navigation = document.getElementById('navigation');
            if (navigation) {
                mobileMenuBtn = document.getElementById('mobile-menu-btn');
                mobileMenu = document.getElementById('mobile-menu');
                navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
                obs.disconnect();
                // Re-run initialization now that nav exists
                initializeNavigation();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return;
    }
    // Handle scroll effect on navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    });

    // Handle mobile menu toggle (guard if menu not present on this page)
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (mobileMenu.classList.contains('open')) {
                icon.className = 'fas fa-times';
                mobileMenuBtn.setAttribute('aria-label', 'Close menu');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            } else {
                icon.className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-label', 'Open menu');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Handle navigation link clicks
    if (navLinks && navLinks.length) {
        navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            const isHashLink = href.startsWith('#');
            if (!isHashLink) {
                // Let the browser navigate to .html pages normally
                return;
            }
            e.preventDefault();
            const targetId = href.substring(1);
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-label', 'Open menu');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        });
    }
}

// Reveal-on-scroll animations
function initializeRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals || reveals.length === 0) return;

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // If a parent group wants stagger, it can set data-reveal-stagger
                const parent = el.closest('[data-reveal-stagger]');
                if (parent) {
                    const children = Array.from(parent.querySelectorAll('.reveal'));
                    children.forEach((child, i) => {
                        child.style.setProperty('--reveal-delay', (i * 80) + 'ms');
                        child.classList.add('revealed');
                    });
                } else {
                    // Use existing inline --reveal-delay or default
                    el.classList.add('revealed');
                }
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(r => io.observe(r));
}

// Carousel functionality
function initializeCarousel() {
    // Handle carousel navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goToPreviousSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goToNextSlide();
        });
    }

    // Handle indicator clicks
    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPreviousSlide();
        } else if (e.key === 'ArrowRight') {
            goToNextSlide();
        }
    });

    // Pause carousel on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            pauseCarousel();
        });

        carouselContainer.addEventListener('mouseleave', function() {
            if (isCarouselPlaying) {
                startCarousel();
            }
        });

        // Touch/Swipe support
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        let isSwiping = false;
        const swipeThreshold = 40; // minimum px to treat as a swipe

        const onTouchStart = function(e) {
            if (!e.touches || e.touches.length === 0) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping = true;
            pauseCarousel();
        };

        const onTouchMove = function(e) {
            if (!isSwiping || !e.touches || e.touches.length === 0) return;
            touchEndX = e.touches[0].clientX;
            touchEndY = e.touches[0].clientY;
        };

        const onTouchEnd = function() {
            if (!isSwiping) return;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Only consider mostly horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
                if (deltaX < 0) {
                    // swipe left -> next
                    goToNextSlide();
                } else {
                    // swipe right -> prev
                    goToPreviousSlide();
                }
            }

            isSwiping = false;
            if (isCarouselPlaying) {
                startCarousel();
            }
        };

        carouselContainer.addEventListener('touchstart', onTouchStart, { passive: true });
        carouselContainer.addEventListener('touchmove', onTouchMove, { passive: true });
        carouselContainer.addEventListener('touchend', onTouchEnd);
    }
}

function startCarousel() {
    slideInterval = setInterval(function() {
        goToNextSlide();
    }, 5000); // Change slide every 5 seconds
}

function pauseCarousel() {
    clearInterval(slideInterval);
}

function goToNextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    updateCarousel();
}

function goToPreviousSlide() {
    currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    // Update slides
    carouselSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    // Update indicators
    carouselIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Stats counter functionality
function initializeStatsCounter() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateStatCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

// Back to top functionality
function initializeBackToTop() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a page navigation link
            if (href === '#home' || href === '#about' || href === '#team' || 
                href === '#achievements' || href === '#events' || href === '#schedule' || 
                href === '#training' || href === '#news' || href === '#gallery' || 
                href === '#resources' || href === '#contact' || href === '#faq' || 
                href === '#register') {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Page routing functionality
// SPA routing functions removed for multi-page setup

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Form handling (for future use)
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Handle form submission
                handleFormSubmission(form);
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

function handleFormSubmission(form) {
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
        showNotification('Thank you! Your message has been sent.', 'success');
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Image lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    const debouncedScrollHandler = debounce(function() {
        // Handle scroll events here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Throttle resize events
    const throttledResizeHandler = throttle(function() {
        // Handle resize events here
    }, 250);
    
    window.addEventListener('resize', throttledResizeHandler);
}

// Accessibility improvements
function improveAccessibility() {
    // Add keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.carousel-btn, .indicator, .back-to-top');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus management for mobile menu
    if (mobileMenuBtn && mobileMenu) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('open')) {
                const firstFocusable = mobileMenu.querySelector(focusableElements);
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        });
    }
}

// Form submission handlers
function initializeFormSubmissions() {
    console.log('🔧 Initializing form submissions...');
    
    // Contact form handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        console.log('✅ Contact form found!');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('📧 Contact form submitted!');
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject')?.value || 'Contact Form Submission',
                message: document.getElementById('message').value
            };
            
            console.log('📝 Form data:', formData);
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                console.log('🌐 Sending to server...');
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('📡 Server response status:', response.status);
                const result = await response.json();
                console.log('📬 Server result:', result);
                
                if (result.success) {
                    alert('✅ Message sent successfully! We\'ll get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('❌ ' + (result.message || 'Failed to send message. Please try again.'));
                }
            } catch (error) {
                console.error('❌ Error:', error);
                alert('❌ Failed to send message. Please make sure the server is running.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    } else {
        console.warn('⚠️ Contact form NOT found!');
    }
    
    // Registration form handler
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Get form data
            const formData = {
                fullName: document.getElementById('full-name')?.value,
                studentId: document.getElementById('student-id')?.value,
                email: document.getElementById('reg-email')?.value,
                phone: document.getElementById('phone')?.value,
                experience: document.getElementById('experience')?.value,
                position: document.getElementById('position')?.value,
                availability: document.getElementById('availability')?.value,
                emergencyContact: document.getElementById('emergency-contact')?.value,
                emergencyPhone: document.getElementById('emergency-phone')?.value,
                medicalInfo: document.getElementById('medical-info')?.value
            };
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('✅ Registration submitted successfully! We\'ll contact you soon.');
                    registerForm.reset();
                } else {
                    alert('❌ ' + (result.message || 'Failed to submit registration. Please try again.'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Failed to submit registration. Please make sure the server is running.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    initializeLazyLoading();
    optimizePerformance();
    improveAccessibility();
    initializeFormSubmissions(); // Add form submission handlers
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToPage,
        showPage,
        updateCarousel,
        animateStatCounter,
        debounce,
        throttle
    };
}
