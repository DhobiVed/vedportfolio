// Enhanced Main.js with Advanced Animations

// Theme Toggle with Enhanced Effects
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Get theme from localStorage or use system preference
let currentTheme = localStorage.getItem('theme') || 
                   (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

// Enhanced theme toggle with animations
themeToggle.addEventListener('click', (e) => {
    // Ripple effect
    createRippleEffect(e.target);
    
    // Sound effect
    playClickSound();
    
    // Toggle theme
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // Theme transition animation
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
    }, 500);
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
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

// Add transition class to body
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

// Mobile Menu with Enhanced Animations
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', (e) => {
    createRippleEffect(e.target);
    mobileMenu.classList.toggle('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        // Animate menu items
        animateMenuItems();
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Animate menu items with staggered effect
function animateMenuItems() {
    const menuItems = document.querySelectorAll('.mobile-nav-link');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('slide-up-animation');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Enhanced Smooth Scrolling with Parallax
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Animate scroll with easing
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.offsetTop - 80;
            const distance = targetPosition - startPosition;
            const duration = Math.min(Math.max(Math.abs(distance) / 3, 500), 1500);
            
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function (easeInOutCubic)
                const easeProgress = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                window.scrollTo(0, startPosition + distance * easeProgress);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    // Update active nav link after animation
                    updateActiveNavLink(targetId);
                }
            }
            
            requestAnimationFrame(animation);
            
            // Add click animation to link
            this.classList.add('link-clicked');
            setTimeout(() => {
                this.classList.remove('link-clicked');
            }, 300);
        }
    });
});

// Enhanced Update active navigation link
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
    const activeMobileLink = document.querySelector(`.mobile-nav-link[href="${targetId}"]`);
    
    if (activeNavLink) {
        activeNavLink.classList.add('active');
        // Add animation effect
        activeNavLink.classList.add('nav-link-activated');
        setTimeout(() => {
            activeNavLink.classList.remove('nav-link-activated');
        }, 300);
    }
    if (activeMobileLink) activeMobileLink.classList.add('active');
}

// Enhanced Project Filtering with 3D Effects
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Ripple effect
        createRippleEffect(e.target);
        
        // Update active button with animation
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(1)';
        });
        button.classList.add('active');
        button.style.transform = 'scale(1.1)';
        
        // Filter projects with 3D animation
        const filter = button.dataset.filter;
        
        projectCards.forEach((card, index) => {
            const categories = card.dataset.category.split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                // Show card with staggered animation
                setTimeout(() => {
                    card.style.display = 'block';
                    card.classList.add('project-card-enter');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'perspective(1000px) rotateX(0) translateY(0)';
                    }, 50);
                }, index * 100);
            } else {
                // Hide card with animation
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

// Enhanced Contact Form with Typing Effect
const contactForm = document.getElementById('contactForm');

// Add typing animation to form inputs
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        // Add floating label effect
        const label = document.createElement('label');
        label.textContent = this.getAttribute('placeholder');
        label.className = 'floating-label';
        this.parentElement.appendChild(label);
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
            const label = this.parentElement.querySelector('.floating-label');
            if (label) label.remove();
        }
    });
    
    // Add character counter for textarea
    if (input.tagName === 'TEXTAREA') {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = '0/500';
        input.parentElement.appendChild(counter);
        
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
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Enhanced Validation with visual feedback
    let isValid = true;
    
    formInputs.forEach(input => {
        if (!input.value && input.required) {
            input.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            input.parentElement.classList.remove('invalid');
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
        // Shake animation for empty fields
        contactForm.classList.add('shake');
        setTimeout(() => contactForm.classList.remove('shake'), 500);
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        document.getElementById('email').parentElement.classList.add('invalid');
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show enhanced loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const originalBg = submitBtn.style.background;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    
    // Add loading animation to form
    contactForm.classList.add('sending');
    
    try {
        // Simulate API call with progress
        await simulateApiCall(formData);
        
        // Success animation
        contactForm.classList.remove('sending');
        contactForm.classList.add('success');
        
        // Confetti effect on success
        createConfetti();
        
        // Success notification
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form with animation
        setTimeout(() => {
            contactForm.reset();
            contactForm.classList.remove('success');
            
            // Reset floating labels
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
                const label = input.parentElement.querySelector('.floating-label');
                if (label) label.remove();
            });
            
            // Log the data
            console.log('Contact Form Submission:', formData);
        }, 1500);
        
    } catch (error) {
        // Error animation
        contactForm.classList.remove('sending');
        contactForm.classList.add('error');
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = originalBg;
            contactForm.classList.remove('error');
        }, 2000);
    }
});

// Simulate API call with progress
async function simulateApiCall(data) {
    return new Promise((resolve, reject) => {
        let progress = 0;
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-track"></div>
            <div class="progress-fill"></div>
        `;
        contactForm.appendChild(progressBar);
        
        const interval = setInterval(() => {
            progress += 10;
            const fill = progressBar.querySelector('.progress-fill');
            fill.style.width = `${progress}%`;
            
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

// Enhanced Notification System with Animations
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.classList.add('notification-exit');
        setTimeout(() => {
            if (existingNotification.parentNode) {
                existingNotification.parentNode.removeChild(existingNotification);
            }
        }, 300);
    }
    
    // Create enhanced notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="notification-message">
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
        
        // Auto-remove after 4 seconds
        const progressBar = notification.querySelector('.notification-progress');
        progressBar.style.animation = 'progressShrink 4s linear forwards';
        
        const autoRemove = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }, 10);
}

// Enhanced Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    // Show/hide button with animation
    if (scrollPosition > 300) {
        backToTopBtn.classList.add('visible');
        backToTopBtn.style.opacity = Math.min((scrollPosition - 300) / 100, 1);
    } else {
        backToTopBtn.classList.remove('visible');
        backToTopBtn.style.opacity = '0';
    }
    
    // Parallax effect for sections
    updateParallax(scrollPosition);
});

// Enhanced back to top click with animation
backToTopBtn.addEventListener('click', () => {
    // Smooth scroll to top with easing
    const startPosition = window.pageYOffset;
    const duration = 1000;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startPosition * (1 - easeProgress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add specific animations based on element type
            if (entry.target.classList.contains('skill-level')) {
                // Animate skill bars
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
            } else if (entry.target.classList.contains('project-card')) {
                // Stagger project cards
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            } else if (entry.target.classList.contains('highlight-item')) {
                // Animate highlight items
                entry.target.classList.add('highlight-pop');
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .skill-level, .project-card, .highlight-item').forEach(el => {
    observer.observe(el);
});

// Enhanced Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-level');
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevel = entry.target;
            skillLevel.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            skillLevel.style.width = skillLevel.style.width;
            
            // Add glow effect
            skillLevel.classList.add('skill-glow');
            setTimeout(() => {
                skillLevel.classList.remove('skill-glow');
            }, 1500);
        }
    });
}, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });

skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
});

// Enhanced Particle System
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random properties
        const size = Math.random() * 15 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 20;
        const color = `hsl(${Math.random() * 360}, 70%, 65%)`;
        
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
        
        particleContainer.appendChild(particle);
    }
}

// Ripple Effect for buttons
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
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
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Confetti Effect
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(confettiContainer);
    
    const colors = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            top: -20px;
            left: ${left}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${animationDuration}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        confettiContainer.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
    
    // Remove container after all confetti is gone
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Parallax Effect
function updateParallax(scrollPosition) {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrollPosition * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Play click sound (optional)
function playClickSound() {
    // Create a subtle click sound using Web Audio API
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
    } catch (e) {
        // Fallback for browsers without Web Audio API
        console.log('Audio not supported');
    }
}

// Initialize Enhanced Features
document.addEventListener('DOMContentLoaded', () => {
    // Update active nav link based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavLink(`#${sectionId}`);
            }
        });
    });
    
    // Add animation to skill bars on page load
    setTimeout(() => {
        skillBars.forEach(bar => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }, 500);
    
    // Initialize enhanced features
    createParticles();
    
    // Add ripple effect to all interactive elements
    document.querySelectorAll('button, .btn, .nav-link, .filter-btn').forEach(element => {
        element.addEventListener('click', function(e) {
            createRippleEffect(this);
            playClickSound();
        });
    });
    
    // Add hover effects to cards
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
    
    // Add typing animation to hero text
    const heroText = document.querySelector('.hero-text h2');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after 1 second
        setTimeout(typeWriter, 1000);
    }
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
    
    // Add CSS animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        /* Ripple Animation */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Confetti Animation */
        @keyframes confettiFall {
            0% {
                transform: translateY(-20px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        /* Float Animation */
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(100px, 100px) rotate(90deg);
            }
            50% {
                transform: translate(200px, 0) rotate(180deg);
            }
            75% {
                transform: translate(100px, -100px) rotate(270deg);
            }
        }
        
        /* Progress Shrink */
        @keyframes progressShrink {
            from { width: 100%; }
            to { width: 0%; }
        }
        
        /* Notification Animations */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            border-radius: 12px;
            box-shadow: var(--shadow-xl);
            transform: translateX(150%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9999;
            overflow: hidden;
            max-width: 400px;
            border-left: 4px solid;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-exit {
            transform: translateX(150%) !important;
        }
        
        .notification-success {
            border-left-color: var(--accent-color);
        }
        
        .notification-error {
            border-left-color: #ef4444;
        }
        
        .notification-content {
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-icon {
            font-size: 1.5rem;
        }
        
        .notification-success .notification-icon {
            color: var(--accent-color);
        }
        
        .notification-error .notification-icon {
            color: #ef4444;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.2s;
        }
        
        .notification-close:hover {
            background: rgba(0,0,0,0.1);
            color: var(--text-color);
        }
        
        .notification-progress {
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            width: 100%;
        }
        
        /* Form Animations */
        .floating-label {
            position: absolute;
            top: -10px;
            left: 12px;
            font-size: 0.8rem;
            color: var(--primary-color);
            background: var(--card-bg);
            padding: 0 4px;
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .invalid {
            animation: shake 0.5s;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        /* Card Animations */
        .project-card-enter {
            animation: cardEnter 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes cardEnter {
            from {
                opacity: 0;
                transform: perspective(1000px) rotateX(-90deg) translateY(50px);
            }
            to {
                opacity: 1;
                transform: perspective(1000px) rotateX(0) translateY(0);
            }
        }
        
        .project-card-exit {
            animation: cardExit 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes cardExit {
            to {
                opacity: 0;
                transform: perspective(1000px) rotateX(90deg) translateY(-50px);
            }
        }
        
        /* Skill Glow Effect */
        .skill-glow {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        
        /* Link Click Animation */
        .link-clicked {
            animation: linkClick 0.3s ease;
        }
        
        @keyframes linkClick {
            50% {
                transform: scale(0.95);
            }
        }
        
        /* Nav Link Activation */
        .nav-link-activated {
            animation: navPulse 0.3s ease;
        }
        
        @keyframes navPulse {
            50% {
                transform: scale(1.1);
            }
        }
        
        /* Highlight Pop */
        .highlight-pop {
            animation: highlightPop 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes highlightPop {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            70% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        /* Menu Item Animation */
        .slide-up-animation {
            animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0;
            transform: translateY(20px);
        }
        
        @keyframes slideUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Progress Bar */
        .progress-bar {
            position: relative;
            height: 4px;
            background: var(--border-color);
            border-radius: 2px;
            margin-top: 1rem;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            width: 0%;
            transition: width 0.3s;
            border-radius: 2px;
        }
        
        /* Form States */
        .sending {
            opacity: 0.8;
            pointer-events: none;
        }
        
        .success {
            animation: formSuccess 1s ease;
        }
        
        @keyframes formSuccess {
            0% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
            }
            70% {
                box-shadow: 0 0 0 20px rgba(16, 185, 129, 0.3);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
            }
        }
        
        .error {
            animation: formError 0.5s ease;
        }
        
        @keyframes formError {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-5px);
            }
            75% {
                transform: translateX(5px);
            }
        }
        
        /* Character Counter */
        .char-counter {
            position: absolute;
            bottom: 5px;
            right: 10px;
            font-size: 0.75rem;
            color: var(--text-light);
        }
    `;
    document.head.appendChild(animationStyles);
});