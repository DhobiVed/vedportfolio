// Page Transitions
class PageTransitions {
    constructor() {
        this.transitionDuration = 500;
        this.init();
    }

    init() {
        this.createTransitionElements();
        this.setupLinkInterception();
        this.setupScrollAnimation();
        this.setupParallax();
    }

    createTransitionElements() {
        // Create overlay for transitions
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(this.overlay);

        // Create loading indicator
        this.loadingIndicator = document.createElement('div');
        this.loadingIndicator.className = 'loading-indicator';
        this.loadingIndicator.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading...</div>
        `;
        this.loadingIndicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;

        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            .loading-indicator .loading-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s linear infinite;
            }

            .loading-indicator .loading-text {
                color: white;
                font-size: 0.875rem;
                font-weight: 500;
                letter-spacing: 0.05em;
                text-transform: uppercase;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .page-transition-overlay.active {
                transform: translateX(0);
            }

            .loading-indicator.active {
                opacity: 1;
                visibility: visible;
            }
        `;
        document.head.appendChild(loadingStyle);

        document.body.appendChild(this.loadingIndicator);
    }

    setupLinkInterception() {
        // Intercept all internal link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
            }
        });

        // Smooth scroll to section
        this.scrollToSection = (sectionId) => {
            if (sectionId === '#') return;

            const targetSection = document.querySelector(sectionId);
            if (targetSection) {
                // Start transition
                this.overlay.classList.add('active');
                this.loadingIndicator.classList.add('active');

                // After a short delay, scroll to section
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // End transition
                    setTimeout(() => {
                        this.overlay.classList.remove('active');
                        this.loadingIndicator.classList.remove('active');
                    }, 300);
                }, 300);
            }
        };
    }

    setupScrollAnimation() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class with delay based on index
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    // If it's a stagger container, animate children
                    if (entry.target.classList.contains('stagger-children')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all scroll-trigger elements
        document.querySelectorAll('.scroll-trigger, .stagger-children').forEach(el => {
            observer.observe(el);
        });

        // Add scroll progress indicator
        this.createScrollProgress();
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    setupParallax() {
        // Simple parallax effect for elements with data-speed attribute
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            document.querySelectorAll('[data-speed]').forEach(element => {
                const speed = parseFloat(element.dataset.speed);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Method for page load animation
    onPageLoad() {
        document.body.classList.add('page-loaded');
        
        // Animate elements with data-animation attribute
        document.querySelectorAll('[data-animation]').forEach((element, index) => {
            const animation = element.dataset.animation;
            const delay = element.dataset.delay || index * 100;
            
            setTimeout(() => {
                element.classList.add(animation);
            }, delay);
        });
    }
}

// Initialize page transitions
const pageTransitions = new PageTransitions();

// Trigger on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        pageTransitions.onPageLoad();
    }, 100);
});

// Export for use in other modules
window.PageTransitions = pageTransitions;