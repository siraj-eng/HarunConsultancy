// ============================================
// Main JavaScript File
// Harun Consultancy Website
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Main initialization function
 */
function initializeApp() {
    console.log('🚀 Harun Consultancy Website Initializing...');
    
    // Initialize all components
    initMobileNavigation();
    initNavbarScrollEffect();
    initButtonAnimations();
    initSmoothScrolling();
    initScrollAnimations();
    initFloatingCards();
    initCourseFilter();
    initScrollToTop();
    initContactForm();
    initCurrentYear();
    initPageLoadAnimations();
    
    console.log('✅ Website initialized successfully!');
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close menu when clicking on a navigation link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle Escape key to close menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Optional: Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Button Click Animations
 */
function initButtonAnimations() {
    // CTA Buttons
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');
    
    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', function() {
            animateButtonClick(this);
            // Add your navigation logic here
            console.log('CTA Primary clicked - Starting career assessment...');
            // window.location.href = '/assessment';
        });
    }
    
    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', function() {
            animateButtonClick(this);
            // Add your navigation logic here
            console.log('CTA Secondary clicked - Browsing courses...');
            // window.location.href = '/courses';
        });
    }
    
    // Course Buttons
    const courseButtons = document.querySelectorAll('.course-btn');
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            animateButtonClick(this);
            const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
            console.log(`Exploring course: ${courseTitle}`);
            // Add course exploration logic here
        });
    });
    
    // Nav CTA Button
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
        navCta.addEventListener('click', function(e) {
            e.preventDefault();
            animateButtonClick(this);
            console.log('Get Started clicked - Opening consultation form...');
            // Add consultation form logic here
        });
    }
}

/**
 * Animate button click with ripple effect
 */
function animateButtonClick(button) {
    // Scale animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Add ripple effect
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Calculate offset for fixed navbar
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer for Scroll Animations
 */
function initScrollAnimations() {
    // Configure intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animate-in');
                
                // Handle staggered animations
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('course-card') ||
                    entry.target.classList.contains('stat-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = [
        '.hero-text', '.hero-img',
        '.service-card', '.course-card', '.stat-card',
        '.mission', '.vision', '.section-header'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });
}

/**
 * Initialize Floating Cards Animation
 */
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        // Add random animation properties
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        card.style.animationDelay = `${randomDelay}s`;
        card.style.animationDuration = `${randomDuration}s`;
        
        // Add hover interaction
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
            card.style.animationPlayState = 'paused';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '';
            card.style.animationPlayState = 'running';
        });
    });
}

/**
 * Course Filter Functionality
 */
function initCourseFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (filterButtons.length === 0 || courseCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter courses
            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    // Animate in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    // Animate out
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Add slight delay for animation
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.course-card[style*="display: block"]');
                visibleCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                });
            }, 50);
        });
    });
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    // Create button if it doesn't exist
    if (!document.getElementById('scrollTop')) {
        const scrollButton = document.createElement('button');
        scrollButton.id = 'scrollTop';
        scrollButton.className = 'scroll-top';
        scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);
    }
    
    const scrollButton = document.getElementById('scrollTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);
        
        // Simple validation
        const inputs = this.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--secondary)';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showNotification('Thank you! We will contact you within 24 hours.', 'success');
            
            // Log form data (replace with actual submission)
            console.log('Form submitted:', formObject);
        }, 1500);
    });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'var(--primary)' : 'var(--secondary)'};
        color: white;
        padding: 16px 24px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Update current year in footer
 */
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Page Load Animations
 */
function initPageLoadAnimations() {
    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
}

/**
 * Add CSS animations
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Add animation styles when script loads
addAnimationStyles();