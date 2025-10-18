/**
 * InnerBliss by Raginii - Main JavaScript File
 * Enhanced user experience with smooth animations and interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
    // Core functionality
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initAnimations();
    initTestimonialSlider();
    initServiceCards();
    initBackToTop();
    initBackgroundAnimations();

    // Enhanced user experience
    initSmoothScrolling();
    initLazyLoading();
    initKeyboardNavigation();
}

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background blur when scrolling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = navMenu.classList.contains('active') 
                    ? getHamburgerTransform(index) 
                    : 'none';
            });
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
            });
        });
    });
    
    // Active navigation highlighting
    highlightActiveNavigation();
}

/**
 * Get hamburger menu transform for animation
 */
function getHamburgerTransform(index) {
    const transforms = [
        'rotate(45deg) translate(5px, 5px)',
        'opacity: 0',
        'rotate(-45deg) translate(7px, -6px)'
    ];
    return transforms[index];
}

/**
 * Highlight active navigation based on scroll position
 */
function highlightActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll effects and animations
 */
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .resource-card, .about-image, .about-text, .hero-image'
    );
    
    animateElements.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

/**
 * Service cards interactivity
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(45, 55, 72, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 6px rgba(45, 55, 72, 0.15)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        // Add click tracking for analytics
        card.addEventListener('click', function() {
            const serviceType = this.dataset.service;
            trackServiceClick(serviceType);
        });
    });
}

/**
 * Testimonial slider functionality
 */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0) {
        // Auto-rotate testimonials on mobile
        if (window.innerWidth <= 768) {
            setInterval(function() {
                testimonials[currentTestimonial].style.opacity = '0.7';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.opacity = '1';
                testimonials[currentTestimonial].scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center'
                });
            }, 5000);
        }
    }
    
    // Add swipe functionality for mobile
    addSwipeSupport('.testimonials-grid', function(direction) {
        if (direction === 'left' && currentTestimonial < testimonials.length - 1) {
            currentTestimonial++;
        } else if (direction === 'right' && currentTestimonial > 0) {
            currentTestimonial--;
        }
        
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = index === currentTestimonial ? '1' : '0.7';
        });
    });
}

/**
 * Form handling and validation
 */
function initFormHandling() {
    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form, .newsletter-footer-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmission);
    });
    
    // Booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
        
        // Real-time validation
        const inputs = bookingForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidationError);
        });
    }
}

/**
 * Handle newsletter form submission
 */
function handleNewsletterSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!emailInput.value || !isValidEmail(emailInput.value)) {
        showFormMessage(form, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(function() {
        showFormMessage(form, 'Thank you! You\'ve been subscribed to our newsletter.', 'success');
        emailInput.value = '';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Track newsletter subscription
        trackNewsletterSubscription(emailInput.value);
    }, 1000);
}

/**
 * Handle booking form submission
 */
function handleBookingSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateBookingForm(form)) {
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking Your Call...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual booking API)
    setTimeout(function() {
        showFormMessage(form, 'Your discovery call has been booked! You\'ll receive a confirmation email shortly.', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Track booking submission
        const data = Object.fromEntries(formData);
        trackBookingSubmission(data);
        
        // Redirect to calendar or thank you page
        // window.location.href = '/thank-you';
    }, 2000);
}

/**
 * Validate individual form field
 */
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    let isValid = true;
    let message = '';
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
        message = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address.';
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        message = 'Please enter a valid phone number.';
    }
    
    // Show/hide validation error
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

/**
 * Clear validation error when user starts typing
 */
function clearValidationError(e) {
    clearFieldError(e.target);
}

/**
 * Validate complete booking form
 */
function validateBookingForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Show form message
 */
function showFormMessage(form, message, type) {
    let messageDiv = form.querySelector('.form-message');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        form.appendChild(messageDiv);
    }
    
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(function() {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone validation
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
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
}

/**
 * Initialize animations
 */
function initAnimations() {
    // Add CSS for fade-in animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card {
            transition: all 0.3s ease;
        }
        
        .form-input.error,
        .form-select.error,
        .form-textarea.error {
            border-color: #E53E3E;
            box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
        }
        
        .field-error {
            color: #E53E3E;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .form-message {
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            display: none;
        }
        
        .form-message.success {
            background: #F0FFF4;
            color: #22543D;
            border: 1px solid #9AE6B4;
        }
        
        .form-message.error {
            background: #FED7D7;
            color: #742A2A;
            border: 1px solid #FEB2B2;
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-link.active {
            color: #2D3A8C;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .testimonials-grid {
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                display: flex;
                gap: 1rem;
                padding-bottom: 1rem;
            }
            
            .testimonial-card {
                flex: 0 0 300px;
                scroll-snap-align: center;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Counter animation for statistics
    animateCounters();
    
    // Typewriter effect for hero headline
    initTypewriterEffect();
}

/**
 * Animate counters when they come into view
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .achievement-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Animate individual counter
 */
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = element.textContent.replace(/\d+/, target);
            clearInterval(timer);
        } else {
            element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
        }
    }, 16);
}

/**
 * Typewriter effect for hero headline
 */
function initTypewriterEffect() {
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline && window.innerWidth > 768) {
        const text = heroHeadline.textContent;
        heroHeadline.textContent = '';
        let i = 0;
        
        setTimeout(function() {
            const timer = setInterval(function() {
                if (i < text.length) {
                    heroHeadline.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
        }, 500);
    }
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Keyboard navigation support
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Enter key submits forms when focused on submit button
        if (e.key === 'Enter' && e.target.type === 'submit') {
            e.target.click();
        }
    });
}

/**
 * Add swipe support for mobile
 */
function addSwipeSupport(selector, callback) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    let startX = 0;
    let startY = 0;
    
    element.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    element.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    element.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Horizontal swipe detection
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            callback(deltaX > 0 ? 'left' : 'right');
        }
        
        startX = 0;
        startY = 0;
    }, { passive: true });
}

/**
 * Analytics and tracking functions
 */
function trackServiceClick(serviceType) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'service_click', {
            'service_type': serviceType,
            'event_category': 'engagement'
        });
    }
}

function trackNewsletterSubscription(email) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_subscription', {
            'event_category': 'conversion'
        });
    }
}

function trackBookingSubmission(data) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'booking_submission', {
            'service_interest': data.service,
            'event_category': 'conversion',
            'value': 297 // Average consultation value
        });
    }
}

/**
 * Performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals (silent tracking)
    if ('web-vital' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            // Track to analytics only
            const sendToAnalytics = (metric) => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', metric.name, {
                        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                        event_category: 'Web Vitals',
                        non_interaction: true
                    });
                }
            };
            getCLS(sendToAnalytics);
            getFID(sendToAnalytics);
            getFCP(sendToAnalytics);
            getLCP(sendToAnalytics);
            getTTFB(sendToAnalytics);
        });
    }

    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'event_category': 'performance',
                'value': loadTime
            });
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Handle page visibility changes for analytics
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        // Track time spent on page
        const timeSpent = Date.now() - window.pageLoadTime;
        if (timeSpent > 5000 && typeof gtag !== 'undefined') { // Only track if more than 5 seconds
            gtag('event', 'time_on_page', {
                'event_category': 'engagement',
                'value': Math.round(timeSpent / 1000)
            });
        }
    }
});

// Record page load time
window.pageLoadTime = Date.now();

/**
 * =============================================================================
 * STRATEGIC BACKGROUND ANIMATIONS IMPLEMENTATION
 * Flowing Particles & Breathing Light - Professional Integration
 * =============================================================================
 */

/**
 * Initialize strategic background animations
 */
function initBackgroundAnimations() {
    // Check user preferences for animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // DISABLED: These conflict with divine glow ::after elements
        // initFlowingParticles();
        // initBreathingLight();

        // Only run the intersection observer for performance
        initAnimationIntersectionObserver();
    }

    // Initialize Divine Glows (keep active)
    initDivineGlows();
}

/**
 * Initialize flowing particles for hero and transformation sections
 */
function initFlowingParticles() {
    const heroSections = document.querySelectorAll('.hero-professional, .hero-section');
    const transformationSections = document.querySelectorAll('.about-summary, section[style*="background: linear-gradient"]');

    // Combine hero and transformation sections
    const particleSections = [...heroSections, ...transformationSections];

    particleSections.forEach((section, index) => {
        if (!section.classList.contains('flowing-particles-bg')) {
            section.classList.add('flowing-particles-bg');
            createFlowingParticles(section);
        }
    });
}

/**
 * Create flowing particles for a specific section
 */
function createFlowingParticles(container) {
    // Determine particle count based on screen size and container size
    const containerRect = container.getBoundingClientRect();
    const baseParticleCount = Math.min(20, Math.max(8, Math.floor(containerRect.width / 80)));

    // Adjust for mobile devices
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? Math.min(baseParticleCount, 12) : baseParticleCount;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Varied animation timing for natural feel
        particle.style.animationDelay = Math.random() * 18 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 15) + 's';

        // Slight size variations for organic feel
        const sizeVariation = 0.7 + Math.random() * 0.6; // 0.7x to 1.3x
        particle.style.transform = `scale(${sizeVariation})`;

        container.appendChild(particle);
    }
}

/**
 * Initialize breathing light for contact and testimonial sections
 */
function initBreathingLight() {
    const breathingSections = document.querySelectorAll('.contact-cta, .testimonials-section');

    breathingSections.forEach(section => {
        if (!section.classList.contains('breathing-light-bg')) {
            section.classList.add('breathing-light-bg');
        }
    });

    // Add breathing light to service cards on hover (already handled in CSS)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Enhanced hover effect with breathing light
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

/**
 * Initialize intersection observer for animation performance
 */
function initAnimationIntersectionObserver() {
    // Performance optimization: pause animations when sections are not visible
    const animatedSections = document.querySelectorAll('.flowing-particles-bg, .breathing-light-bg');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const particles = entry.target.querySelectorAll('.particle');

            if (entry.isIntersecting) {
                // Resume animations when section is visible
                particles.forEach(particle => {
                    particle.style.animationPlayState = 'running';
                });
                entry.target.classList.add('animation-active');
            } else {
                // Pause animations when section is not visible (performance optimization)
                particles.forEach(particle => {
                    particle.style.animationPlayState = 'paused';
                });
                entry.target.classList.remove('animation-active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px' // Start animations slightly before section comes into view
    });

    animatedSections.forEach(section => {
        animationObserver.observe(section);
    });
}

/**
 * Strategic animation cleanup on page unload
 */
function cleanupBackgroundAnimations() {
    // Remove animation classes to prevent memory leaks
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.remove();
    });
}

/**
 * Responsive animation adjustment
 */
function adjustAnimationsForViewport() {
    const isMobile = window.innerWidth <= 768;
    const isLowPower = window.innerWidth <= 480;

    if (isLowPower) {
        // Reduce particle count and slow down animations for low-power devices
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index >= 8) {
                particle.style.display = 'none';
            } else {
                particle.style.animationDuration = '25s';
            }
        });
    } else if (isMobile) {
        // Moderate optimization for mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index >= 15) {
                particle.style.display = 'none';
            }
        });
    }
}

/**
 * Handle dynamic content changes (for SPA-like behavior)
 */
function reinitializeAnimationsForNewContent() {
    // Clean up existing particles
    cleanupBackgroundAnimations();

    // Reinitialize animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        initFlowingParticles();
        initBreathingLight();
        initDivineGlows();
    }
}

/**
 * Initialize Divine Energy Glows across the website
 */
function initDivineGlows() {
    // Light background sections - Divine Fusion
    const lightSections = document.querySelectorAll('.hero-professional, .services-overview, .about-summary, .testimonials-section');

    // Dark background sections - Gentle Rose Gold
    const darkSections = document.querySelectorAll('.contact-cta, .footer-professional, .service-card-premium.featured');

    // Divine glows are applied via CSS ::after pseudo-elements
    // No additional JavaScript processing needed
}

// Event listeners for responsive behavior
window.addEventListener('resize', debounce(adjustAnimationsForViewport, 250));
window.addEventListener('beforeunload', cleanupBackgroundAnimations);

// Listen for reduced motion preference changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
        // User enabled reduced motion - stop all animations
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.animation = 'none';
        });
    } else {
        // User disabled reduced motion - reinitialize animations
        reinitializeAnimationsForNewContent();
    }
});

/**
 * Utility: Debounce function for performance
 */
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