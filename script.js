// ============================================
// Main JavaScript File
// Harun Consultancy Website
// ============================================

/**
 * Mobile Menu Toggle Functionality
 * Toggles navigation menu on mobile devices
 */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking on a navigation link
const navItems = navLinks.querySelectorAll('a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

/**
 * Navbar Scroll Effect
 * Adds shadow and background when scrolling
 */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class based on scroll position
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

/**
 * Button Click Animations
 * Adds visual feedback to primary and secondary CTA buttons
 */
const ctaPrimary = document.querySelector('.cta-primary');
const ctaSecondary = document.querySelector('.cta-secondary');

if (ctaPrimary) {
    ctaPrimary.addEventListener('click', () => {
        // Add ripple effect animation
        ctaPrimary.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ctaPrimary.style.transform = 'translateY(-3px)';
        }, 100);
        
        // Add your navigation or form logic here
        console.log('Starting career assessment...');
        // Example: window.location.href = '/assessment';
    });
}

if (ctaSecondary) {
    ctaSecondary.addEventListener('click', () => {
        // Add ripple effect animation
        ctaSecondary.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ctaSecondary.style.transform = 'translateY(-3px)';
        }, 100);
        
        // Add your navigation logic here
        console.log('Redirecting to courses page...');
        // Example: window.location.href = '/courses';
    });
}

/**
 * Smooth Scrolling for Navigation Links
 * Enables smooth scrolling to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calculate offset for fixed navbar
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Intersection Observer for Scroll Animations
 * Animates elements when they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for service cards
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}s`;
            }
        }
    });
}, observerOptions);

// Observe hero elements for fade-in animation
const heroElements = document.querySelectorAll('.hero-text, .hero-img');
heroElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Observe service cards for staggered animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.dataset.delay = `${index * 0.1}`;
    observer.observe(card);
});

// Observe stat cards for animation
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.95)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.dataset.delay = `${index * 0.1}`;
    observer.observe(card);
});

/**
 * Parallax Effect for Hero Background
 * Creates subtle parallax effect on scroll
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Subtle parallax effect
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/**
 * Initialize Floating Cards Animation
 * Adds random floating animation to cards
 */
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        // Add random animation delay for more natural movement
        const randomDelay = Math.random() * 2;
        card.style.animationDelay = `${randomDelay}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Initialize floating cards if they exist
if (document.querySelector('.floating-card')) {
    initFloatingCards();
}

/**
 * Dynamic Year Update for Footer
 * Automatically updates copyright year
 */
function updateCopyrightYear() {
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Call functions on DOM load
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
    
    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/**
 * Form Submission Handler
 * Handles contact form submissions
 */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

/**
 * Scroll to Top Button
 * Creates and manages scroll-to-top functionality
 */
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
initScrollToTop();

/**
 * Page Load Animations
 * Adds loading animation to page elements
 */
window.addEventListener('load', () => {
    // Add loaded animation to all animated elements
    const animatedElements = document.querySelectorAll('.hero-text, .hero-img, .service-card, .stat-card');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * 100);
    });
});