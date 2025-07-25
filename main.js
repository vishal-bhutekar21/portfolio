document.addEventListener('DOMContentLoaded', () => {
    // Loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 300);
    });

    // Theme Toggle
    const themeToggle = document.querySelector('#themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeIcon.classList.toggle('fa-moon', savedTheme === 'light');
    themeIcon.classList.toggle('fa-sun', savedTheme === 'dark');

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        themeIcon.classList.toggle('fa-moon', currentTheme === 'light');
        themeIcon.classList.toggle('fa-sun', currentTheme === 'dark');
    });

    // AOS Initialization
    AOS.init({
        duration: 800,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic'
    });

    // Typed.js for Hero Section
    new Typed('.typed-text', {
        strings: ['Full Stack Developer', 'Web Developer', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // Scroll to Top
    const scrollToTop = document.querySelector('#scrollToTop');
    window.addEventListener('scroll', () => {
        scrollToTop.classList.toggle('show', window.scrollY > 300);
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth Scrolling
    document.querySelectorAll('.nav-links a, .footer-grid a, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId.startsWith('#')) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation
    const form = document.querySelector('#contactForm');
    form.addEventListener('submit', (e) => {
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (name.length < 2) {
            e.preventDefault();
            alert('Name must be at least 2 characters long.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        if (message.length < 10) {
            e.preventDefault();
            alert('Message must be at least 10 characters long.');
            return;
        }

        alert('Form submitted successfully!');
    });
});