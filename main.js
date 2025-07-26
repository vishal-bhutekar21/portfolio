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

    // Improved mobile menu handling
    function handleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    handleMobileMenu();

    // Scroll to Top
    const scrollToTop = document.querySelector('#scrollToTop');
    window.addEventListener('scroll', () => {
        scrollToTop.classList.toggle('show', window.scrollY > 300);
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth Scrolling for Internal Links
    document.querySelectorAll('.nav-links a, .footer-grid a, .hero-actions a').forEach(anchor => {
        if (anchor.id !== 'download-cv') {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId.startsWith('#')) {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Project Image Pop-up Modal
    document.querySelectorAll('.project-card img').forEach(img => {
        img.addEventListener('click', () => {
            const src = img.getAttribute('data-src');
            const alt = img.getAttribute('data-alt');

            // Create modal
            const modal = document.createElement('div');
            modal.classList.add('image-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                    <img src="${src}" alt="${alt}" class="modal-image">
                </div>
            `;
            document.body.appendChild(modal);

            // Show modal
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);

            // Close modal on button click
            const closeButton = modal.querySelector('.modal-close');
            closeButton.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            });

            // Close modal on overlay click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    setTimeout(() => modal.remove(), 300);
                }
            });

            // Close modal on Escape key
            document.addEventListener('keydown', function closeOnEscape(event) {
                if (event.key === 'Escape') {
                    modal.classList.remove('show');
                    setTimeout(() => modal.remove(), 300);
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
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

    // Download CV
    const downloadCvLink = document.querySelector('#download-cv');
    downloadCvLink.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'assets/vishal_cv.pdf';
        link.download = 'vishal_cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Counter Animation
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30; // Adjust speed here
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    }

    // Intersection Observer for counter animation
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // Animate skill progress bars
    const progressBars = document.querySelectorAll('.progress');
    const observerOptions2 = {
        threshold: 0.5
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.parentElement.previousElementSibling
                    .querySelector('span:last-child').textContent;
                progress.style.width = width;
                progressObserver.unobserve(progress);
            }
        });
    }, observerOptions2);

    progressBars.forEach(bar => {
        bar.style.width = '0';
        progressObserver.observe(bar);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        try {
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Submit the form
            await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });

            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();

        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Smooth scroll for footer links
    document.querySelectorAll('.footer-social a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Footer animation on scroll
    const footer = document.querySelector('.footer');
    const footerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'all 0.5s ease';
    footerObserver.observe(footer);

    // Handle certificate PDF viewing
    document.querySelectorAll('.cert-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfUrl = button.getAttribute('href');
            window.open(pdfUrl, '_blank');
        });
    });

    // Open Image Modal function
    function openImageModal(imgElement) {
        const src = imgElement.getAttribute('data-src');
        const alt = imgElement.getAttribute('data-alt');

        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <img src="${src}" alt="${alt}" class="modal-image">
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Show modal with animation
        requestAnimationFrame(() => {
            modal.style.display = 'flex';
            requestAnimationFrame(() => {
                modal.classList.add('show');
            });
        });

        // Close modal handlers
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        }, { once: true });
    }

    // Add touch support for mobile devices
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    let xDown = null;
    let yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) return;

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            const modal = document.querySelector('.image-modal');
            if (modal && Math.abs(xDiff) > 50) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                setTimeout(() => modal.remove(), 300);
            }
        }

        xDown = null;
        yDown = null;
    }

    // Open Certificate Modal function
    function openCertificateModal(element) {
        const img = element.querySelector('img');
        const certificatePath = img.getAttribute('data-certificate');
        const alt = img.getAttribute('alt');

        if (certificatePath.endsWith('.pdf')) {
            // For PDF certificates
            const modal = document.createElement('div');
            modal.classList.add('certificate-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                    <embed src="${certificatePath}" type="application/pdf" width="100%" height="100%">
                    <div class="modal-fallback">
                        <p>PDF cannot be displayed. <a href="${certificatePath}" target="_blank">Click here to view/download</a></p>
                    </div>
                </div>
            `;
        } else {
            // For image certificates
            const modal = document.createElement('div');
            modal.classList.add('certificate-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                    <img src="${certificatePath}" alt="${alt}" class="modal-image">
                </div>
            `;
        }

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Show modal with animation
        requestAnimationFrame(() => {
            modal.style.display = 'flex';
            requestAnimationFrame(() => {
                modal.classList.add('show');
            });
        });

        // Close modal handlers
        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        }, { once: true });
    }
});

/* Add to :root in style.css */
