// ============================================
// MAIN.JS – Cleaned & Consolidated
// ============================================

(function() {
    "use strict";

    // ========== UTILITY FUNCTIONS ==========
    function createRippleEffect(element) {
        if (!element) return;
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (event?.clientX || rect.left + rect.width/2) - rect.left - size / 2;
        const y = (event?.clientY || rect.top + rect.height/2) - rect.top - size / 2;
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
            z-index: 1;
        `;
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    function playClickSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) { /* ignore */ }
    }

    // ========== THEME TOGGLE ==========
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        let currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon();

        themeToggle.addEventListener('click', (e) => {
            createRippleEffect(e.target);
            playClickSound();
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            updateThemeIcon();
            document.body.classList.add('theme-transitioning');
            setTimeout(() => document.body.classList.remove('theme-transitioning'), 500);
        });

        function updateThemeIcon() {
            const icon = themeToggle.querySelector('i');
            if (!icon) return;
            if (currentTheme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                themeToggle.style.transform = 'rotate(180deg)';
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                themeToggle.style.transform = 'rotate(0deg)';
            }
        }
    }

    // Add theme transition style once
    const transitionStyle = document.createElement('style');
    transitionStyle.textContent = `
        .theme-transitioning * {
            transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                        color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                        border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                        transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(transitionStyle);

    // ========== MOBILE MENU ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            createRippleEffect(e.target);
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon?.classList.remove('fa-bars');
                icon?.classList.add('fa-times');
                animateMenuItems();
            } else {
                icon?.classList.remove('fa-times');
                icon?.classList.add('fa-bars');
            }
        });

        function animateMenuItems() {
            const items = document.querySelectorAll('.mobile-nav-link');
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('slide-up-animation');
            });
        }

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon?.classList.remove('fa-times');
                icon?.classList.add('fa-bars');
            }
        });
    }

    // ========== SMOOTH SCROLLING ==========
    function updateActiveNavLink(targetId) {
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeNav = document.querySelector(`.nav-link[href="${targetId}"]`);
        const activeMobile = document.querySelector(`.mobile-nav-link[href="${targetId}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
            activeNav.classList.add('nav-link-activated');
            setTimeout(() => activeNav.classList.remove('nav-link-activated'), 300);
        }
        if (activeMobile) activeMobile.classList.add('active');
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn?.querySelector('i');
                icon?.classList.remove('fa-times');
                icon?.classList.add('fa-bars');
            }

            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.offsetTop - 80;
            const distance = targetPosition - startPosition;
            const duration = Math.min(Math.max(Math.abs(distance) / 3, 500), 1500);
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                window.scrollTo(0, startPosition + distance * easeProgress);
                if (elapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    updateActiveNavLink(targetId);
                }
            }
            requestAnimationFrame(animation);
            this.classList.add('link-clicked');
            setTimeout(() => this.classList.remove('link-clicked'), 300);
        });
    });

    // ========== PROJECT FILTERING ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                createRippleEffect(e.target);
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.transform = 'scale(1)';
                });
                button.classList.add('active');
                button.style.transform = 'scale(1.1)';
                const filter = button.dataset.filter;
                projectCards.forEach((card, index) => {
                    const categories = card.dataset.category?.split(' ') || [];
                    if (filter === 'all' || categories.includes(filter)) {
                        setTimeout(() => {
                            card.style.display = 'block';
                            card.classList.add('project-card-enter');
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'perspective(1000px) rotateX(0) translateY(0)';
                            }, 50);
                        }, index * 100);
                    } else {
                        card.classList.add('project-card-exit');
                        card.style.opacity = '0';
                        card.style.transform = 'perspective(1000px) rotateX(-90deg) translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                            card.classList.remove('project-card-exit');
                        }, 300);
                    }
                });
            });
        });
    }

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');

        // Floating labels & character counter
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement?.classList.add('focused');
                const label = document.createElement('label');
                label.textContent = this.getAttribute('placeholder') || '';
                label.className = 'floating-label';
                this.parentElement?.appendChild(label);
            });
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement?.classList.remove('focused');
                    const label = this.parentElement?.querySelector('.floating-label');
                    if (label) label.remove();
                }
            });
            if (input.tagName === 'TEXTAREA') {
                const counter = document.createElement('div');
                counter.className = 'char-counter';
                counter.textContent = '0/500';
                input.parentElement?.appendChild(counter);
                input.addEventListener('input', function() {
                    const count = this.value.length;
                    counter.textContent = `${count}/500`;
                    counter.style.color = count > 450 ? '#ef4444' : 'var(--text-light)';
                });
            }
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            let isValid = true;
            formInputs.forEach(input => {
                if (!input.value && input.required) {
                    input.parentElement?.classList.add('invalid');
                    isValid = false;
                } else {
                    input.parentElement?.classList.remove('invalid');
                }
            });
            if (!isValid) {
                showNotification('Please fill in all required fields.', 'error');
                contactForm.classList.add('shake');
                setTimeout(() => contactForm.classList.remove('shake'), 500);
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                document.getElementById('email')?.parentElement?.classList.add('invalid');
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn?.innerHTML || '';
            const originalBg = submitBtn?.style.background || '';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            }
            contactForm.classList.add('sending');

            try {
                await simulateApiCall(formData);
                contactForm.classList.remove('sending');
                contactForm.classList.add('success');
                createConfetti();
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.classList.remove('success');
                    formInputs.forEach(input => {
                        input.parentElement?.classList.remove('focused');
                        const label = input.parentElement?.querySelector('.floating-label');
                        if (label) label.remove();
                    });
                }, 1500);
            } catch (error) {
                contactForm.classList.remove('sending');
                contactForm.classList.add('error');
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = originalBg;
                    }
                    contactForm.classList.remove('error');
                }, 2000);
            }
        });

        async function simulateApiCall(data) {
            return new Promise((resolve, reject) => {
                let progress = 0;
                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.innerHTML = `<div class="progress-track"></div><div class="progress-fill"></div>`;
                contactForm.appendChild(progressBar);
                const interval = setInterval(() => {
                    progress += 10;
                    const fill = progressBar.querySelector('.progress-fill');
                    if (fill) fill.style.width = `${progress}%`;
                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            progressBar.remove();
                            Math.random() > 0.1 ? resolve(data) : reject(new Error('Network error'));
                        }, 300);
                    }
                }, 100);
            });
        }
    }

    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'success') {
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.classList.add('notification-exit');
            setTimeout(() => existing.remove(), 300);
        }
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon"><i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i></div>
                <div class="notification-message"><span>${message}</span></div>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="notification-progress"></div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) progressBar.style.animation = 'progressShrink 4s linear forwards';
        const autoRemove = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn?.addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // ========== BACK TO TOP ==========
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            if (scrollPos > 300) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.style.opacity = Math.min((scrollPos - 300) / 100, 1);
            } else {
                backToTopBtn.classList.remove('visible');
                backToTopBtn.style.opacity = '0';
            }
            updateParallax(scrollPos);
        });

        backToTopBtn.addEventListener('click', () => {
            const start = window.pageYOffset;
            const duration = 1000;
            let startTime = null;
            function animate(currentTime) {
                if (startTime === null) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                window.scrollTo(0, start * (1 - easeProgress));
                if (elapsed < duration) requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
        });
    }

    function updateParallax(scrollPosition) {
        document.querySelectorAll('[data-parallax]').forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${-(scrollPosition * speed)}px)`;
        });
    }

    // ========== INTERSECTION OBSERVER ==========
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                if (entry.target.classList.contains('skill-level')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => entry.target.style.width = width, 300);
                } else if (entry.target.classList.contains('project-card')) {
                    const index = Array.from(entry.target.parentNode?.children || []).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                } else if (entry.target.classList.contains('highlight-item')) {
                    entry.target.classList.add('highlight-pop');
                }
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in, .skill-level, .project-card, .highlight-item').forEach(el => observer.observe(el));

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = bar.style.width;
                bar.classList.add('skill-glow');
                setTimeout(() => bar.classList.remove('skill-glow'), 1500);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });
    skillBars.forEach(bar => skillBarObserver.observe(bar));

    // ========== PARTICLE SYSTEM ==========
    function createParticles() {
        const container = document.createElement('div');
        container.className = 'particle-container';
        container.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:-1; overflow:hidden;';
        document.body.appendChild(container);
        for (let i = 0; i < 30; i++) {
            const size = Math.random() * 15 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 20;
            const color = `hsl(${Math.random() * 360}, 70%, 65%)`;
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                filter: blur(${Math.random() * 2}px);
                left: ${posX}%;
                top: ${posY}%;
                animation: float ${duration}s infinite linear ${delay}s;
            `;
            container.appendChild(particle);
        }
    }

    // ========== CONFETTI ==========
    function createConfetti() {
        const container = document.createElement('div');
        container.className = 'confetti-container';
        container.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:9998;';
        document.body.appendChild(container);
        const colors = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        for (let i = 0; i < 150; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                top: -20px;
                left: ${left}%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${duration}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), duration * 1000);
        }
        setTimeout(() => container.remove(), 5000);
    }

    // ========== NETWORK STATUS ==========
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    function updateNetworkStatus() {
        const el = document.createElement('div');
        el.className = 'network-status';
        el.textContent = navigator.onLine ? 'Back online' : 'You are offline';
        document.body.appendChild(el);
        if (!navigator.onLine) el.classList.add('offline');
        setTimeout(() => el.remove(), 3000);
    }

    // ========== PWA INSTALL PROMPT ==========
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installBtn = document.createElement('button');
        installBtn.textContent = '📱 Install App';
        installBtn.className = 'btn btn-primary';
        installBtn.style.marginTop = '1rem';
        installBtn.addEventListener('click', async () => {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') installBtn.remove();
            deferredPrompt = null;
        });
        document.querySelector('.hero-actions')?.appendChild(installBtn);
    });

    // ========== COPY EMAIL ==========
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.dataset.copy;
            try {
                await navigator.clipboard.writeText(text);
                showToast('Copied to clipboard!', 'success');
            } catch {
                showToast('Failed to copy', 'error');
            }
        });
    });

    // ========== TOAST NOTIFICATION (simple) ==========
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<div class="toast-content"><p>${message}</p><button class="toast-close">&times;</button></div>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        toast.querySelector('.toast-close')?.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // ========== EASTER EGG ==========
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showToast('🎉 You found the secret!', 'success');
                document.body.classList.add('party-mode');
                setTimeout(() => document.body.classList.remove('party-mode'), 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ========== MODAL FOR RESULTS & CERTIFICATES ==========
    function initModal() {
        let modal = document.querySelector('.modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Document Viewer</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <iframe src="" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        const iframe = modal.querySelector('iframe');
        const closeBtn = modal.querySelector('.modal-close');
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        closeBtn?.addEventListener('click', closeModal);

        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => iframe.src = '', 300);
        }

        document.querySelectorAll('.btn-view-result, .btn-view-cert').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const pdfUrl = btn.dataset.pdf;
                iframe.src = pdfUrl;
                modal.classList.add('show');
            });
        });
    }
    initModal();

    // ========== NOVA AI CHAT STUBS ==========
    // (Replace with your actual implementation)
    let novaIsTyping = false;
    let novaHistory = [];
    const NOVA_SYSTEM = "You are Nova, Ved's AI assistant. Answer based on the provided context.";

    window.appendNovaMessage = function(role, text, isPlaceholder) {
        // stub
        console.log('Nova message:', role, text);
        return document.createElement('div');
    };
    window.showNovaTyping = function() {};
    window.removeNovaTyping = function() {};
    window.formatNovaResponse = function(text) { return text; };
    window.novaSend = async function() { /* implement */ };

    // ========== INITIALIZE EVERYTHING ==========
    document.addEventListener('DOMContentLoaded', () => {
        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.clientHeight;
                const id = section.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    updateActiveNavLink(`#${id}`);
                }
            });
        });

        // Add ripple to interactive elements
        document.querySelectorAll('button, .btn, .nav-link, .filter-btn').forEach(el => {
            el.addEventListener('click', function(e) {
                createRippleEffect(this);
                playClickSound();
            });
        });

        // Card hover effects
        document.querySelectorAll('.project-card, .skill-category').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = 'var(--shadow-xl)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow)';
            });
        });

        // Hero typewriter effect (example)
        const heroText = document.querySelector('.hero-text h2');
        if (heroText) {
            const original = heroText.textContent;
            heroText.textContent = '';
            let i = 0;
            function typeWriter() {
                if (i < original.length) {
                    heroText.textContent += original.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            setTimeout(typeWriter, 1000);
        }

        // Scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = 'position:fixed; top:0; left:0; width:0%; height:3px; background:linear-gradient(90deg, var(--primary-color), var(--secondary-color)); z-index:9999; transition:width 0.1s;';
        document.body.appendChild(progressBar);
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });

        // Add CSS animations (if not already present)
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple { to { transform: scale(4); opacity: 0; } }
            @keyframes confettiFall { 0% { transform: translateY(-20px) rotate(0deg); opacity:1; } 100% { transform: translateY(100vh) rotate(720deg); opacity:0; } }
            @keyframes float { 0%,100%{ transform:translate(0,0) rotate(0deg); } 25%{ transform:translate(100px,100px) rotate(90deg); } 50%{ transform:translate(200px,0) rotate(180deg); } 75%{ transform:translate(100px,-100px) rotate(270deg); } }
            @keyframes progressShrink { from { width:100%; } to { width:0%; } }
            .notification { position:fixed; top:20px; right:20px; background:var(--card-bg); border-radius:12px; box-shadow:var(--shadow-xl); transform:translateX(150%); transition:transform 0.3s; z-index:9999; overflow:hidden; max-width:400px; border-left:4px solid; }
            .notification.show { transform:translateX(0); }
            .notification-exit { transform:translateX(150%) !important; }
            .notification-success { border-left-color:var(--accent-color); }
            .notification-error { border-left-color:#ef4444; }
            .notification-content { padding:1rem 1.5rem; display:flex; align-items:center; gap:1rem; }
            .notification-icon { font-size:1.5rem; }
            .notification-success .notification-icon { color:var(--accent-color); }
            .notification-error .notification-icon { color:#ef4444; }
            .notification-close { background:none; border:none; color:var(--text-light); cursor:pointer; padding:0.25rem; border-radius:4px; transition:all 0.2s; }
            .notification-close:hover { background:rgba(0,0,0,0.1); color:var(--text-color); }
            .notification-progress { height:3px; background:linear-gradient(90deg, var(--primary-color), var(--secondary-color)); width:100%; }
            .floating-label { position:absolute; top:-10px; left:12px; font-size:0.8rem; color:var(--primary-color); background:var(--card-bg); padding:0 4px; animation:slideDown 0.3s ease; }
            @keyframes slideDown { from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:translateY(0); } }
            .invalid { animation:shake 0.5s; }
            @keyframes shake { 0%,100%{ transform:translateX(0); } 25%{ transform:translateX(-5px); } 75%{ transform:translateX(5px); } }
            .project-card-enter { animation:cardEnter 0.6s cubic-bezier(0.4,0,0.2,1) forwards; }
            @keyframes cardEnter { from{ opacity:0; transform:perspective(1000px) rotateX(-90deg) translateY(50px); } to{ opacity:1; transform:perspective(1000px) rotateX(0) translateY(0); } }
            .project-card-exit { animation:cardExit 0.3s cubic-bezier(0.4,0,0.2,1) forwards; }
            @keyframes cardExit { to{ opacity:0; transform:perspective(1000px) rotateX(90deg) translateY(-50px); } }
            .skill-glow { box-shadow:0 0 20px rgba(37,99,235,0.3); }
            .link-clicked { animation:linkClick 0.3s ease; }
            @keyframes linkClick { 50%{ transform:scale(0.95); } }
            .nav-link-activated { animation:navPulse 0.3s ease; }
            @keyframes navPulse { 50%{ transform:scale(1.1); } }
            .highlight-pop { animation:highlightPop 0.6s cubic-bezier(0.4,0,0.2,1); }
            @keyframes highlightPop { 0%{ transform:scale(0.8); opacity:0; } 70%{ transform:scale(1.1); } 100%{ transform:scale(1); opacity:1; } }
            .slide-up-animation { animation:slideUp 0.5s cubic-bezier(0.4,0,0.2,1) forwards; opacity:0; transform:translateY(20px); }
            @keyframes slideUp { to{ opacity:1; transform:translateY(0); } }
            .progress-bar { position:relative; height:4px; background:var(--border-color); border-radius:2px; margin-top:1rem; overflow:hidden; }
            .progress-fill { height:100%; background:linear-gradient(90deg, var(--primary-color), var(--secondary-color)); width:0%; transition:width 0.3s; border-radius:2px; }
            .sending { opacity:0.8; pointer-events:none; }
            .success { animation:formSuccess 1s ease; }
            @keyframes formSuccess { 0%{ box-shadow:0 0 0 0 rgba(16,185,129,0); } 70%{ box-shadow:0 0 0 20px rgba(16,185,129,0.3); } 100%{ box-shadow:0 0 0 0 rgba(16,185,129,0); } }
            .error { animation:formError 0.5s ease; }
            @keyframes formError { 0%,100%{ transform:translateX(0); } 25%{ transform:translateX(-5px); } 75%{ transform:translateX(5px); } }
            .char-counter { position:absolute; bottom:5px; right:10px; font-size:0.75rem; color:var(--text-light); }
            .network-status { position:fixed; top:70px; right:20px; padding:8px 16px; border-radius:20px; background:var(--accent-color); color:white; font-size:0.875rem; font-weight:500; z-index:9999; transform:translateY(-100px); transition:transform 0.3s; box-shadow:var(--shadow-lg); }
            .network-status.offline { background:#ef4444; transform:translateY(0); }
            .page-transition { position:fixed; top:0; left:0; width:100%; height:100%; background:var(--gradient-primary); z-index:9999; transform:translateX(100%); transition:transform 0.5s; }
            .page-transition.active { transform:translateX(0); }
            .toast { position:fixed; bottom:20px; right:20px; background:var(--card-bg); border:1px solid var(--border-color); border-radius:0.75rem; padding:1rem; box-shadow:var(--shadow-xl); max-width:350px; transform:translateX(150%); transition:transform 0.3s; z-index:9998; }
            .toast.show { transform:translateX(0); }
            .custom-cursor, .cursor-dot { position:fixed; pointer-events:none; z-index:9999; mix-blend-mode:difference; }
            .custom-cursor { width:20px; height:20px; border:2px solid var(--primary-color); border-radius:50%; transition:transform 0.1s; }
            .cursor-dot { width:4px; height:4px; background:var(--primary-color); border-radius:50%; transition:transform 0.05s; }
            .watermark { position:fixed; bottom:10px; right:10px; opacity:0.1; font-size:12px; pointer-events:none; z-index:-1; }
            .modal { display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); backdrop-filter:blur(8px); z-index:10000; align-items:center; justify-content:center; }
            .modal.show { display:flex; }
            .modal-content { width:90%; max-width:900px; height:80vh; background:white; border-radius:1.5rem; overflow:hidden; box-shadow:var(--shadow-xl); transform:scale(0.9); transition:transform 0.3s; }
            .modal.show .modal-content { transform:scale(1); }
            .modal-header { background:var(--bg-light); padding:1rem 1.5rem; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border-color); }
            .modal-header h3 { color:var(--text-color); margin:0; }
            .modal-close { background:none; border:none; font-size:1.8rem; cursor:pointer; color:var(--text-light); transition:color 0.3s; }
            .modal-close:hover { color:var(--primary-color); }
            .modal-body { height:calc(100% - 60px); background:#f5f5f5; }
            .modal-body iframe { width:100%; height:100%; border:none; }
        `;
        document.head.appendChild(style);

        // Initialize particles
        createParticles();

        // Auto-theme based on time
        setThemeByTime();
        function setThemeByTime() {
            const hour = new Date().getHours();
            const isNight = hour >= 18 || hour < 6;
            if (isNight && !localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }

        // Watermark
        const watermark = document.createElement('div');
        watermark.className = 'watermark';
        watermark.textContent = 'Ved Dhobi © 2025';
        document.body.appendChild(watermark);

        console.log('🚀 Portfolio loaded with enhancements!');
    });
})();

setTimeout(introExit, 2500); // extra safety: hide intro after 2.5s

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("leftNav");
    const overlay = document.getElementById("leftNavOverlay");
    const links = nav ? nav.querySelectorAll("a") : [];

    if (!toggle || !nav || !overlay) return;

    /* ===== OPEN MENU ===== */
    function openMenu() {
      toggle.classList.add("open");
      nav.classList.add("open");
      overlay.classList.add("visible");
      document.body.style.overflow = "hidden"; // Lock scroll
    }

    /* ===== CLOSE MENU ===== */
    function closeMenu() {
      toggle.classList.remove("open");
      nav.classList.remove("open");
      overlay.classList.remove("visible");
      document.body.style.overflow = ""; // Restore scroll
    }

    /* ===== TOGGLE CLICK ===== */
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.contains("open") ? closeMenu() : openMenu();
    });

    /* ===== OVERLAY CLICK ===== */
    overlay.addEventListener("click", closeMenu);

    /* ===== ESC KEY CLOSE ===== */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    /* ===== CLOSE ON LINK CLICK + ACTIVE CLASS ===== */
    links.forEach(link => {
      link.addEventListener("click", function () {
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        closeMenu();
      });
    });

    /* ===== ACTIVE LINK ON SCROLL ===== */
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", function () {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });

  });

})();