document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js with theme-specific configuration
    function initParticles() {
        // Destroy existing particles if they exist
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
        }

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
            } else if (theme === 'glitchcore') {
                document.body.classList.add('glitchcore-theme');
            } else {
                document.body.classList.remove('cyberpunk-theme');
                document.body.classList.remove('glitchcore-theme');
            }
        });

        option.addEventListener('mouseleave', function() {
            themePreviewTimeout = setTimeout(() => {
                html.removeAttribute('data-theme-preview');
                if (savedTheme === 'cyberpunk') {
                    document.body.classList.add('cyberpunk-theme');
                } else if (savedTheme === 'glitchcore') {
                    document.body.classList.add('glitchcore-theme');
                } else {
                    document.body.classList.remove('cyberpunk-theme');
                    document.body.classList.remove('glitchcore-theme');
                }
            }, 100);
        });

        option.addEventListener('click', function() {
            clearTimeout(themePreviewTimeout);
            const theme = this.getAttribute('data-theme');
            html.setAttribute('data-theme', theme);
            html.removeAttribute('data-theme-preview');
            localStorage.setItem('portfolio-theme', theme);

            // Reinitialize particles with new theme colors
            initParticles();

            // Add special effects for certain themes
            if (theme === 'cyberpunk') {
                document.body.classList.add('cyberpunk-theme');
                document.body.classList.remove('glitchcore-theme');
            } else if (theme === 'glitchcore') {
                document.body.classList.add('glitchcore-theme');
                document.body.classList.remove('cyberpunk-theme');
            } else {
                document.body.classList.remove('cyberpunk-theme');
                document.body.classList.remove('glitchcore-theme');
            }
        });
    });

    // Set initial theme class
    if (savedTheme === 'cyberpunk') {
        document.body.classList.add('cyberpunk-theme');
    } else if (savedTheme === 'glitchcore') {
        document.body.classList.add('glitchcore-theme');
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

    // Social sidebar animation
    const socialSidebar = document.querySelector('.social-sidebar');
    setTimeout(() => {
        socialSidebar.classList.add('visible');
    }, 1000);

    // Add hover effects for social buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateX(10px)';
            if (window.innerWidth <= 768) {
                button.style.transform = 'translateY(-10px)';
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateX(0)';
            if (window.innerWidth <= 768) {
                button.style.transform = 'translateY(0)';
            }
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