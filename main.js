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
        strings: ['Android Developer', 'Problem Solver', 'Tech Enthusiast', 'Code Craftsman'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Hamburger Menu - Enhanced for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    
    // Toggle menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        
        // Change hamburger icon
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
        
        // Prevent body scroll when menu is open
        body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
            
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
            
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
            
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
            
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

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

    // Universal Image Pop-up Modal for all images
    function makeImageClickable(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const src = img.getAttribute('data-src') || img.src;
            const alt = img.getAttribute('data-alt') || img.alt;

            // Create modal
            const modal = document.createElement('div');
            modal.classList.add('image-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    <img src="${src}" alt="${alt}" class="modal-image">
                    <div class="modal-info">
                        <p>${alt}</p>
                    </div>
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

            // Close modal function
            const closeModal = () => {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                setTimeout(() => modal.remove(), 300);
                // Return focus to the image that opened the modal
                img.focus();
            };

            // Close modal on button click
            modal.querySelector('.modal-close').addEventListener('click', closeModal);

            // Close modal on overlay click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            // Close modal on Escape key
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleKeyDown);
                }
            };
            document.addEventListener('keydown', handleKeyDown);
        });
    }

    // Make all images clickable
    document.querySelectorAll('img').forEach(img => {
        // Skip navigation logos, icons, and very small images
        if (!img.closest('.nav') && 
            !img.closest('.social-links') && 
            !img.hasAttribute('data-skip-modal') &&
            img.naturalWidth > 100 && 
            img.naturalHeight > 100) {
            makeImageClickable(img);
        }
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src && img.src !== img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

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

    // Download CV - Simplified and Direct Approach
    const downloadCvLink = document.querySelector('#download-cv');
    if (downloadCvLink) {
        console.log('Download CV button found and event listener attached');
        downloadCvLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Download CV button clicked');
            
            // Direct download approach
            const link = document.createElement('a');
            link.href = 'assets/vishal_cv.pdf';
            link.download = 'Vishal_Bhutekar_CV.pdf';
            link.style.display = 'none';
            
            document.body.appendChild(link);
            console.log('Triggering download...');
            link.click();
            document.body.removeChild(link);
            
            // Show notification
            if (typeof showNotification === 'function') {
                showNotification('CV download started!', 'success');
            } else {
                console.log('CV download initiated');
            }
        });
    } else {
        console.error('Download CV button not found!');
    }
    
    // Notification function (if not already defined)
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;

        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

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

    // Touch interaction handling
    function handleTouchInteraction() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        const minSwipeDistance = 50;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchStartX - touchEndX;
            const deltaY = touchStartY - touchEndY;

            // Only handle horizontal swipes that are more significant than vertical movement
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                const modal = document.querySelector('.image-modal, .certificate-modal');
                if (modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                    setTimeout(() => modal.remove(), 300);
                }
            }
        }, { passive: true });
    }

    // Initialize touch handling
    handleTouchInteraction();
});

/* Add to :root in style.css */
