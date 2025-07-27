// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.remove('light');
            html.classList.add('dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.classList.add(savedTheme);
if (savedTheme === 'dark') {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Smooth Scrolling for Navigation Links (only for same-page navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = 80; // Account for fixed navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (navMenu && mobileMenu) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Handle regular page navigation (prevent scroll jump)
document.querySelectorAll('a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function(e) {
        // Don't prevent default for external links or downloads
        const href = this.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
            // This is an internal page navigation
            // Let it proceed normally without preventing default
        }
    });
});

// Active Navigation Link (only for single page)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = `${getComputedStyle(document.documentElement).getPropertyValue('--background')}dd`;
        } else {
            navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--background');
        }
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.blog-card, .project-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Prevent form submission scroll jump
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission here without page reload
        console.log('Form submitted');
        return false;
    });
});

// Fix button clicks that might cause scroll jump
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Only prevent default for buttons that don't have a specific type
        if (!this.type || this.type === 'button') {
            e.preventDefault();
        }
    });
});

// Preserve scroll position on page load
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// Dynamic Year for Copyright
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-text p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Your Name. All rights reserved.`;
    }
});
// Enhanced navigation handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active navigation link based on current page
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Handle smooth scrolling for anchor links (only on single page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            if (navMenu && mobileMenu) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
});

// Rest of your existing JavaScript code...
