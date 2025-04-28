document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js with theme-specific configuration
    function initParticles() {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim() || '#4361ee'
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim() || '#4361ee',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Initialize particles on load
    initParticles();

    // Theme switching functionality
    const themeOptions = document.querySelectorAll('.theme-option');
    const html = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    // Apply theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            html.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);

            // Reinitialize particles with new theme colors
            if (window.pJSDom && window.pJSDom.length > 0) {
                window.pJSDom[0].pJS.fn.vendors.destroypJS();
                initParticles();
            }

            // Add special effects for certain themes
            if (theme === 'cyberpunk') {
                document.body.classList.add('cyberpunk-theme');
            } else {
                document.body.classList.remove('cyberpunk-theme');
            }
        });
    });

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

    // Contact Form Submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            this.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });

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

    // Akoode-inspired animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.section-animate, .timeline-item, .skill-tags, .project-card, .experience-card, .cert-card, #contact-form'
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
});