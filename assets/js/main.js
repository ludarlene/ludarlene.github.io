// ===========================================
// JavaScript for Portfolio Website
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== Initialize AOS =====
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===== Smooth Scroll for Navigation Links =====
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 64; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Active Navigation Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // ===== Scroll to Top Button =====
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== Contact Form — opens mailto with pre-filled content =====
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            const subject = encodeURIComponent('Portfolio Contact from ' + name);
            const body = encodeURIComponent(
                'Name: ' + name + '\n' +
                'Email: ' + email + '\n\n' +
                'Message:\n' + message
            );

            window.location.href = 'mailto:ludarlene@gmail.com?subject=' + subject + '&body=' + body;

            submitBtn.textContent = 'Opening your email client...';
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                contactForm.reset();
            }, 3000);
        });
    }
    
    // ===== Scroll Animation for Elements =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe project cards and other elements
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));
    
    // ===== Add Typing Effect to Hero Title (Optional Enhancement) =====
    const heroTitle = document.querySelector('#home h1 span');
    if (heroTitle) {
        const roles = ['UIUX Designer', 'Planner', 'Idea Incubator'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 100 : 200;
            
            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after a short delay
        setTimeout(typeEffect, 1000);
    }
    
    // ===== Console Welcome Message =====
    console.log('%cWelcome to my portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%cIf you are interested in my work, please contact me through the contact form!', 'color: #8b5cf6; font-size: 14px;');
    
    // ===== Mouse Gradient Effect =====
    const mouseGradient = document.querySelector('.mouse-gradient');
    if (mouseGradient) {
        document.addEventListener('mousemove', (e) => {
            mouseGradient.style.left = e.clientX + 'px';
            mouseGradient.style.top = e.clientY + 'px';
        });
    }
});
