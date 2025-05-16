document.addEventListener('DOMContentLoaded', function() {
    // Raindrop particles animation
    function createRaindrops() {
        const container = document.getElementById('particles-container');
        const particleCount = Math.floor(window.innerWidth / 10);

        for (let i = 0; i < particleCount; i++) {
            createRaindrop(container);
        }
    }

    function createRaindrop(container) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');

        // Random properties
        const left = Math.random() * 100;
        const height = 5 + Math.random() * 15;
        const delay = Math.random() * 5;
        const duration = 1 + Math.random() * 3;

        raindrop.style.left = `${left}%`;
        raindrop.style.height = `${height}px`;
        raindrop.style.animationDelay = `${delay}s`;
        raindrop.style.animationDuration = `${duration}s`;

        // Create splash effect when raindrop hits bottom
        raindrop.addEventListener('animationiteration', () => {
            createSplash(container, left);
        });

        container.appendChild(raindrop);
    }

    function createSplash(container, left) {
        const splash = document.createElement('div');
        splash.classList.add('splash');

        splash.style.left = `${left}%`;
        splash.style.bottom = '0';
        splash.style.animation = 'splash 0.5s ease-out forwards';

        splash.addEventListener('animationend', () => {
            splash.remove();
        });

        container.appendChild(splash);
    }

    // Initialize raindrops
    createRaindrops();

    // Update particles on resize
    window.addEventListener('resize', function() {
        const container = document.getElementById('particles-container');
        container.innerHTML = '';
        createRaindrops();
    });

    // Theme switching functionality
    const themeOptions = document.querySelectorAll('.theme-option');
    const html = document.documentElement;
    let themePreviewTimeout;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    // Theme preview on hover
    themeOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            clearTimeout(themePreviewTimeout);
            const theme = this.getAttribute('data-theme');
            html.setAttribute('data-theme-preview', theme);

            // Add special effects for certain themes
            if (theme === 'cyberpunk') {
                document.body.classList.add('cyberpunk-theme');
            }
        });

        option.addEventListener('mouseleave', function() {
            themePreviewTimeout = setTimeout(() => {
                html.removeAttribute('data-theme-preview');
                if (savedTheme === 'cyberpunk') {
                    document.body.classList.add('cyberpunk-theme');
                } else {
                    document.body.classList.remove('cyberpunk-theme');
                }
            }, 100);
        });

        option.addEventListener('click', function() {
            clearTimeout(themePreviewTimeout);
            const theme = this.getAttribute('data-theme');
            html.setAttribute('data-theme', theme);
            html.removeAttribute('data-theme-preview');
            localStorage.setItem('portfolio-theme', theme);

            // Update particle colors
            updateParticleColors();

            // Add special effects for certain themes
            if (theme === 'cyberpunk') {
                document.body.classList.add('cyberpunk-theme');
            } else {
                document.body.classList.remove('cyberpunk-theme');
            }
        });
    });

    // Update particle colors based on theme
    function updateParticleColors() {
        const particles = document.querySelectorAll('.raindrop, .splash');
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();

        particles.forEach(particle => {
            particle.style.background = color;
        });
    }

    // Set initial theme class
    if (savedTheme === 'cyberpunk') {
        document.body.classList.add('cyberpunk-theme');
    }

    // Home button functionality
    document.querySelector('.home-btn').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Highlight active nav link while scrolling
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // Mobile menu toggle
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('nav').classList.remove('active');
            document.querySelector('.menu-toggle i').classList.remove('fa-times');
            document.querySelector('.menu-toggle i').classList.add('fa-bars');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize EmailJS
    (function() {
        // Initialize EmailJS with your User ID
        emailjs.init('iqgRGNr32ByfgZA-S'); // Replace with your actual User ID

        // Contact Form Submission with EmailJS
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Change button text to indicate loading
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Send form data via EmailJS
            emailjs.sendForm('service_993ag3c', 'template_t33wvw5', this)
                .then(function(response) {
                    alert('Thank you! Your message has been sent successfully.');
                    document.getElementById('contact-form').reset();
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, function(error) {
                    alert('Oops! Something went wrong. Please try again later.');
                    console.error('EmailJS Error:', error);
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    })();

    // Initialize ScrollReveal animations
    ScrollReveal().reveal('.animate__animated', {
        delay: 200,
        distance: '20px',
        duration: 1000,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        interval: 200,
        reset: true
    });

    // Add specific animation classes to elements
    document.querySelectorAll('section').forEach((section, index) => {
        const elements = section.querySelectorAll('h2, h3, p, div, ul, li, .btn, .project-card, .skill-category, .timeline-item, .experience-card, .cert-card');

        elements.forEach((el, i) => {
            if (index % 2 === 0) {
                el.classList.add('animate__animated', 'animate__fadeInLeft');
            } else {
                el.classList.add('animate__animated', 'animate__fadeInRight');
            }
        });
    });

    // Hero section specific animations
    const heroElements = document.querySelectorAll('#hero h2, #hero h3, #hero p, #hero .btn');
    heroElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${0.2 + (i * 0.2)}s`;
        el.classList.add('animate__animated', 'animate__fadeInUp');

        // Trigger reflow to restart animation
        void el.offsetWidth;

        el.style.opacity = '1';
    });

    // Name animation
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.05)';
    });

    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });

// Left social media links hover effects
document.querySelectorAll('.left-social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            icon.style.transform = 'translateX(20px) scale(1.1)';
        } else {
            icon.style.transform = 'translateY(-10px) scale(1.1)';
        }
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateX(0) scale(1)';
    });
});

    // Akoode-inspired animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.section-animate, .timeline-item, .skill-tags, .project-card, .experience-card, .cert-card, #contact-form, .social-sidebar'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // For skill tags, we need to add visible to the parent
                    if (entry.target.classList.contains('skill-tags')) {
                        const tags = entry.target.querySelectorAll('span');
                        tags.forEach((tag, index) => {
                            setTimeout(() => {
                                tag.classList.add('visible');
                            }, index * 100);
                        });
                    }

                    // Stop observing after animation triggers
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize animations
    animateOnScroll();

    // Re-run animations when theme changes to ensure visibility
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            setTimeout(animateOnScroll, 500);
        });
    });

    // Handle window resize for social sidebar
    window.addEventListener('resize', function() {
        const socialContainer = document.querySelector('.social-container');
        if (window.innerWidth <= 768) {
            socialContainer.style.transform = 'translateY(100%)';
        } else {
            socialContainer.style.transform = 'translateX(-70%)';
        }
    });
});