// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Get theme from localStorage or use system preference
let currentTheme = localStorage.getItem('theme') || 
                   (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth Scrolling
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
            
            // Scroll to element
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            updateActiveNavLink(targetId);
        }
    });
});

// Update active navigation link
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
    const activeMobileLink = document.querySelector(`.mobile-nav-link[href="${targetId}"]`);
    
    if (activeNavLink) activeNavLink.classList.add('active');
    if (activeMobileLink) activeMobileLink.classList.add('active');
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        const filter = button.dataset.filter;
        
        projectCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // In a real application, you would send this data to your backend
        // For demo purposes, we'll simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Log the data (in production, remove this)
        console.log('Contact Form Submission:', formData);
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add notification animation
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(notificationStyle);

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-level');
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevel = entry.target;
            skillLevel.style.width = skillLevel.style.width;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
});

// Initialize
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
            bar.style.transition = 'width 1.5s ease-in-out';
        });
    }, 500);
    // Initialize Resume Request System
    const resumeRequestSystem = new ResumeRequestSystem();

    // Add animation to download buttons
    document.querySelectorAll('.btn-download-resume, #resumeTrigger').forEach(btn => {
        btn.classList.add('pulse-animation');
        
        // Add click animation
        btn.addEventListener('click', function() {
            this.classList.add('pulse-animation');
            setTimeout(() => {
                this.classList.remove('pulse-animation');
            }, 1000);
        });
    });

    // Add download stats to hero section
    function addDownloadStats() {
        const count = localStorage.getItem('resumeDownloadCount') || 0;
        if (count > 0) {
            const statsBadge = document.createElement('div');
            statsBadge.className = 'download-stats-badge';
            statsBadge.innerHTML = `
                <i class="fas fa-download"></i>
                <span>${count} downloads</span>
            `;
            statsBadge.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: var(--card-bg);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                box-shadow: var(--shadow);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.875rem;
                z-index: 100;
                animation: slideUp 0.6s ease-out;
            `;
            
            document.body.appendChild(statsBadge);
            
            // Remove after 5 seconds
            setTimeout(() => {
                statsBadge.style.opacity = '0';
                statsBadge.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (statsBadge.parentNode) {
                        statsBadge.parentNode.removeChild(statsBadge);
                    }
                }, 300);
            }, 5000);
        }
    }

    // Show stats after page loads
    setTimeout(addDownloadStats, 2000);
        // Initialize Drive Access Request System
    const driveAccessSystem = new DriveAccessRequestSystem();

    // Add pulse animation to request buttons
    document.querySelectorAll('#resumeTrigger, .btn-download-resume').forEach(btn => {
        btn.classList.add('pulse-animation');
        
        // Add click animation
        btn.addEventListener('click', function() {
            this.classList.add('pulse-animation');
            setTimeout(() => {
                this.classList.remove('pulse-animation');
            }, 1000);
        });
    });

    // Show request stats after page loads
    setTimeout(() => {
        const count = localStorage.getItem('resumeRequestCount') || 0;
        if (count > 0) {
            const statsBadge = document.createElement('div');
            statsBadge.className = 'request-badge';
            statsBadge.innerHTML = `
                <i class="fas fa-envelope"></i>
                <span>${count} access requests</span>
            `;
            statsBadge.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: var(--card-bg);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                box-shadow: var(--shadow);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.875rem;
                z-index: 100;
                animation: slideUp 0.6s ease-out;
            `;
            
            document.body.appendChild(statsBadge);
            
            // Remove after 5 seconds
            setTimeout(() => {
                statsBadge.style.opacity = '0';
                statsBadge.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (statsBadge.parentNode) {
                        statsBadge.parentNode.removeChild(statsBadge);
                    }
                }, 300);
            }, 5000);
        }
    }, 2000);
});