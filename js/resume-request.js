// Google Drive Access Request System - IMPROVED VERSION
class DriveAccessRequestSystem {
    constructor() {
        // Your email for access requests
        this.yourEmail = 'veddhobi252@gmail.com';
        
        // Request counter
        this.requestCount = localStorage.getItem('resumeRequestCount') || 0;
        
        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
        this.setupRequestButtons();
        this.setupStatsCounter();
    }

    createModal() {
        // Create modal structure
        this.modal = document.createElement('div');
        this.modal.className = 'drive-request-modal';
        this.modal.innerHTML = `
            <div class="drive-modal-overlay"></div>
            <div class="drive-modal-content">
                <div class="drive-modal-header">
                    <h3><i class="fas fa-shield-alt"></i> Request Resume Access</h3>
                    <button class="drive-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="drive-modal-body">
                    <div class="access-info">
                        <div class="access-icon">
                            <i class="fas fa-lock"></i>
                        </div>
                        <h4>Restricted Access</h4>
                        <p>This resume requires explicit permission to access. Submit your request below and I'll add you to my Google Drive.</p>
                    </div>
                    
                    <form id="accessRequestForm" class="access-request-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="requestName">
                                    <i class="fas fa-user"></i> Your Name *
                                </label>
                                <input type="text" id="requestName" required 
                                       placeholder="Enter your full name">
                                <div class="error-message"></div>
                            </div>
                            
                            <div class="form-group">
                                <label for="requestEmail">
                                    <i class="fas fa-envelope"></i> Email Address *
                                </label>
                                <input type="email" id="requestEmail" required 
                                       placeholder="Enter your Google email">
                                <div class="error-message"></div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="requestPurpose">
                                <i class="fas fa-bullseye"></i> Why do you need access? *
                            </label>
                            <select id="requestPurpose" required>
                                <option value="">Select a reason</option>
                                <option value="job_opportunity">Job Opportunity</option>
                                <option value="freelance_project">Freelance Project</option>
                                <option value="internship">Internship Opportunity</option>
                                <option value="collaboration">Technical Collaboration</option>
                                <option value="reference">Reference Check</option>
                                <option value="other">Other Reason</option>
                            </select>
                            <div class="error-message"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="requestMessage">
                                <i class="fas fa-comment"></i> Additional Message *
                            </label>
                            <textarea id="requestMessage" rows="3" required 
                                      placeholder="Please explain why you need access to my resume..."></textarea>
                            <div class="error-message"></div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline drive-modal-close">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-paper-plane"></i> Submit Request
                            </button>
                        </div>
                    </form>
                    
                    <div class="privacy-notice">
                        <i class="fas fa-info-circle"></i>
                        <p>Your request details will be shown on screen. You can copy them to send me an email.</p>
                    </div>
                </div>
            </div>
            
            <!-- Success Modal -->
            <div class="success-modal">
                <div class="success-modal-content">
                    <div class="success-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <h3>Request Details Ready!</h3>
                    <p>Here are your request details. Copy them and send me an email to <strong>${this.yourEmail}</strong></p>
                    
                    <div class="request-details">
                        <div class="detail-header">
                            <h4>Request Information</h4>
                            <button class="btn btn-sm btn-outline" id="copyAllDetails">
                                <i class="fas fa-copy"></i> Copy All
                            </button>
                        </div>
                        <div class="details-content" id="requestDetailsContent">
                            <!-- Will be filled with request details -->
                        </div>
                    </div>
                    
                    <div class="email-options">
                        <h5>Send Email:</h5>
                        <div class="option-buttons">
                            <button class="btn btn-primary" id="openGmail">
                                <i class="fab fa-google"></i> Open Gmail
                            </button>
                            <button class="btn btn-outline" id="copyEmail">
                                <i class="fas fa-copy"></i> Copy Email
                            </button>
                        </div>
                    </div>
                    
                    <div class="success-instructions">
                        <p><i class="fas fa-check-circle"></i> I'll review your request within 24 hours</p>
                        <p><i class="fas fa-google-drive"></i> If approved, I'll add you to my Google Drive</p>
                        <p><i class="fas fa-envelope"></i> You'll receive an invitation from Google Drive</p>
                    </div>
                    
                    <div class="success-actions">
                        <button class="btn btn-outline" id="newRequest">
                            <i class="fas fa-redo"></i> New Request
                        </button>
                        <button class="btn btn-primary success-close">
                            <i class="fas fa-check"></i> Done
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
        this.addModalStyles();
    }

    addModalStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            /* Drive Request Modal Styles */
            .drive-request-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: none;
            }
            
            .drive-request-modal.active {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .drive-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .drive-modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                background: var(--card-bg);
                border-radius: 1rem;
                overflow-y: auto;
                box-shadow: var(--shadow-lg);
                transition: transform 0.3s ease;
                opacity: 0;
            }
            
            .drive-request-modal.active .drive-modal-content {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
            }
            
            .drive-modal-header {
                padding: 1.5rem;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 1;
            }
            
            .drive-modal-header h3 {
                margin: 0;
                font-size: 1.25rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .drive-modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 0.375rem;
                transition: background-color 0.3s;
            }
            
            .drive-modal-close:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            .drive-modal-body {
                padding: 1.5rem;
            }
            
            .access-info {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .access-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #ea4335, #fbbc05);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2rem;
                margin: 0 auto 1rem;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(234, 67, 53, 0.7);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 0 0 10px rgba(234, 67, 53, 0);
                }
            }
            
            .access-info h4 {
                margin: 0 0 0.5rem 0;
                color: var(--text-color);
            }
            
            .access-info p {
                color: var(--text-light);
                margin: 0;
            }
            
            .access-request-form {
                margin-top: 2rem;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            @media (max-width: 640px) {
                .form-row {
                    grid-template-columns: 1fr;
                }
            }
            
            .form-group {
                margin-bottom: 1.25rem;
            }
            
            .access-request-form label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-color);
                font-size: 0.875rem;
            }
            
            .access-request-form label i {
                color: var(--primary-color);
                width: 16px;
            }
            
            .access-request-form input,
            .access-request-form select,
            .access-request-form textarea {
                width: 100%;
                padding: 0.75rem 1rem;
                background: var(--bg-color);
                border: 2px solid var(--border-color);
                border-radius: 0.5rem;
                color: var(--text-color);
                font-family: 'Inter', sans-serif;
                font-size: 0.875rem;
                transition: all 0.3s ease;
            }
            
            .access-request-form input:focus,
            .access-request-form select:focus,
            .access-request-form textarea:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }
            
            .access-request-form select {
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 12px;
                padding-right: 2.5rem;
            }
            
            .error-message {
                color: #ef4444;
                font-size: 0.75rem;
                margin-top: 0.25rem;
                display: none;
            }
            
            .form-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .form-actions .btn {
                flex: 1;
                justify-content: center;
            }
            
            .privacy-notice {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                padding: 1rem;
                background: var(--bg-light);
                border-radius: 0.75rem;
                margin-top: 2rem;
                border-left: 4px solid var(--accent-color);
            }
            
            .privacy-notice i {
                color: var(--accent-color);
                margin-top: 0.125rem;
                flex-shrink: 0;
            }
            
            .privacy-notice p {
                margin: 0;
                font-size: 0.875rem;
                color: var(--text-light);
            }
            
            /* Success Modal */
            .success-modal {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--card-bg);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 2;
                padding: 1rem;
            }
            
            .success-modal.active {
                display: flex;
                animation: fadeIn 0.3s ease;
            }
            
            .success-modal-content {
                text-align: center;
                padding: 2rem;
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #10b981, #059669);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2.5rem;
                margin: 0 auto 1.5rem;
                animation: scaleUp 0.5s ease-out;
            }
            
            @keyframes scaleUp {
                from {
                    transform: scale(0);
                }
                to {
                    transform: scale(1);
                }
            }
            
            .success-modal-content h3 {
                margin: 0 0 1rem 0;
                color: var(--text-color);
            }
            
            .success-modal-content p {
                color: var(--text-light);
                margin: 0 0 1.5rem 0;
            }
            
            .request-details {
                background: var(--bg-light);
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
                text-align: left;
            }
            
            .detail-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .detail-header h4 {
                margin: 0;
                color: var(--text-color);
            }
            
            .details-content {
                background: var(--bg-color);
                border-radius: 0.5rem;
                padding: 1rem;
                font-family: 'Roboto Mono', monospace;
                font-size: 0.875rem;
                color: var(--text-color);
                white-space: pre-wrap;
                word-wrap: break-word;
                max-height: 200px;
                overflow-y: auto;
            }
            
            .email-options {
                margin-bottom: 1.5rem;
            }
            
            .email-options h5 {
                margin: 0 0 0.75rem 0;
                color: var(--text-color);
                text-align: center;
            }
            
            .option-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .option-buttons .btn {
                min-width: 140px;
            }
            
            .success-instructions {
                text-align: left;
                background: rgba(16, 185, 129, 0.1);
                padding: 1.25rem;
                border-radius: 0.75rem;
                margin-bottom: 1.5rem;
                border-left: 4px solid #10b981;
            }
            
            .success-instructions p {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin: 0 0 0.5rem 0;
                font-size: 0.875rem;
                color: var(--text-color);
            }
            
            .success-instructions p:last-child {
                margin-bottom: 0;
            }
            
            .success-instructions i {
                color: #10b981;
                width: 16px;
            }
            
            .success-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .success-actions .btn {
                min-width: 140px;
            }
            
            /* Toast Notification */
            .drive-toast {
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: var(--card-bg);
                border-radius: 0.75rem;
                padding: 1rem 1.5rem;
                box-shadow: var(--shadow-lg);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .drive-toast.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            
            .drive-toast.success {
                border-left: 4px solid #10b981;
            }
            
            .drive-toast.error {
                border-left: 4px solid #ef4444;
            }
            
            .drive-toast-icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.875rem;
            }
            
            .drive-toast-icon.success {
                background: rgba(16, 185, 129, 0.1);
                color: #10b981;
            }
            
            .drive-toast-icon.error {
                background: rgba(239, 68, 68, 0.1);
                color: #ef4444;
            }
            
            .drive-toast-message {
                font-size: 0.875rem;
                color: var(--text-color);
            }
            
            /* Button States */
            .btn-loading {
                position: relative;
                color: transparent !important;
            }
            
            .btn-loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                transform: translate(-50%, -50%);
            }
            
            @keyframes spin {
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
            
            /* Copy Button States */
            .btn-copied {
                background-color: #10b981 !important;
                border-color: #10b981 !important;
                color: white !important;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .drive-modal-content {
                    width: 95%;
                    max-height: 95vh;
                }
                
                .form-actions {
                    flex-direction: column;
                }
                
                .option-buttons {
                    flex-direction: column;
                }
                
                .success-actions {
                    flex-direction: column;
                }
                
                .option-buttons .btn,
                .success-actions .btn {
                    width: 100%;
                }
            }
            
            @media (max-width: 480px) {
                .drive-modal-header {
                    padding: 1rem;
                }
                
                .drive-modal-body {
                    padding: 1rem;
                }
                
                .success-modal-content {
                    padding: 1rem;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }

    setupEventListeners() {
        // Open modal when request is clicked
        document.addEventListener('click', (e) => {
            const target = e.target;
            const isRequestButton = 
                target.closest('#resumeTrigger') || 
                target.closest('.btn-download-resume') ||
                target.closest('a[href*="resume.pdf"]') ||
                (target.closest('.btn-primary') && target.closest('.btn-primary').textContent.toLowerCase().includes('resume')) ||
                (target.closest('.btn-primary') && target.closest('.btn-primary').textContent.toLowerCase().includes('download cv'));
            
            if (isRequestButton) {
                e.preventDefault();
                this.openModal();
            }
        });

        // Close modal
        this.modal.querySelectorAll('.drive-modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Close success modal
        this.modal.querySelector('.success-close').addEventListener('click', () => {
            this.closeSuccessModal();
            this.closeModal();
        });

        // Form submission
        const form = this.modal.querySelector('#accessRequestForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Close modal on overlay click
        this.modal.querySelector('.drive-modal-overlay').addEventListener('click', () => this.closeModal());

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    setupRequestButtons() {
        // Update all resume download buttons to request buttons
        document.querySelectorAll('a[href*="resume"], a[href*="Resume"], a[href*="CV"], a[download*="resume"], a[download*="Resume"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });
    }

    setupStatsCounter() {
        // Create stats counter
        this.statsElement = document.createElement('div');
        this.statsElement.className = 'request-stats';
        this.statsElement.innerHTML = `
            <div class="request-stats-icon">
                <i class="fas fa-envelope"></i>
            </div>
            <div class="request-stats-info">
                <h4>${this.requestCount} Requests</h4>
                <p>Access requests sent</p>
            </div>
        `;
        document.body.appendChild(this.statsElement);
        
        // Add styles for stats
        const statsStyle = document.createElement('style');
        statsStyle.textContent = `
            .request-stats {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: var(--card-bg);
                border-radius: 1rem;
                padding: 0.75rem 1.5rem;
                box-shadow: var(--shadow);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 100;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .request-stats.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .request-stats-icon {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1rem;
            }
            
            .request-stats-info h4 {
                margin: 0;
                font-size: 0.875rem;
                color: var(--text-color);
            }
            
            .request-stats-info p {
                margin: 0.25rem 0 0 0;
                font-size: 0.75rem;
                color: var(--text-light);
            }
            
            @media (max-width: 768px) {
                .request-stats {
                    left: 1rem;
                    right: 1rem;
                    bottom: 1rem;
                }
            }
        `;
        document.head.appendChild(statsStyle);
        
        // Show stats after page loads
        setTimeout(() => {
            this.showStats();
        }, 2000);
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset form
        this.resetForm();
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.closeSuccessModal();
    }

    closeSuccessModal() {
        this.modal.querySelector('.success-modal').classList.remove('active');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = {
            name: form.querySelector('#requestName').value.trim(),
            email: form.querySelector('#requestEmail').value.trim(),
            purpose: form.querySelector('#requestPurpose').value,
            message: form.querySelector('#requestMessage').value.trim(),
            timestamp: new Date().toISOString(),
            requestId: this.generateRequestId()
        };

        // Validate
        if (!this.validateForm(formData)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;

        try {
            // Track request
            this.trackRequest();
            
            // Show success modal with request details
            setTimeout(() => {
                this.showSuccessModal(formData);
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                form.reset();
            }, 1000);

        } catch (error) {
            console.error('Error submitting request:', error);
            this.showToast('Failed to submit request. Please try again.', 'error');
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
        }
    }

    validateForm(data) {
        let isValid = true;
        
        // Reset errors
        this.modal.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });

        // Validate name
        if (!data.name || data.name.length < 2) {
            this.showFieldError('requestName', 'Please enter your full name (min 2 characters)');
            isValid = false;
        }

        // Validate email
        if (!data.email) {
            this.showFieldError('requestEmail', 'Please enter your email address');
            isValid = false;
        } else if (!this.isValidEmail(data.email)) {
            this.showFieldError('requestEmail', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate purpose
        if (!data.purpose) {
            this.showFieldError('requestPurpose', 'Please select a reason for access');
            isValid = false;
        }

        // Validate message
        if (!data.message || data.message.length < 10) {
            this.showFieldError('requestMessage', 'Please explain why you need access (min 10 characters)');
            isValid = false;
        }

        return isValid;
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = field.parentElement.querySelector('.error-message');
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#ef4444';
        field.focus();
        
        // Remove error on input
        const clearError = () => {
            field.style.borderColor = '';
            errorElement.style.display = 'none';
            field.removeEventListener('input', clearError);
        };
        field.addEventListener('input', clearError);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    generateRequestId() {
        return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    trackRequest() {
        // Increment request count
        this.requestCount = parseInt(this.requestCount) + 1;
        localStorage.setItem('resumeRequestCount', this.requestCount);
        
        // Update stats display
        this.updateStatsDisplay();
        
        // Log request
        this.logRequest();
    }

    updateStatsDisplay() {
        // Update floating stats
        if (this.statsElement) {
            this.statsElement.querySelector('h4').textContent = `${this.requestCount} Requests`;
        }
    }

    showStats() {
        // Show stats counter
        if (this.statsElement && this.requestCount > 0) {
            this.statsElement.classList.add('show');
            
            // Hide after 5 seconds
            setTimeout(() => {
                this.statsElement.classList.remove('show');
            }, 5000);
        }
    }

    showSuccessModal(formData) {
        // Format the email content
        const emailContent = this.formatEmailContent(formData);
        
        // Display the email content
        const detailsContent = this.modal.querySelector('#requestDetailsContent');
        detailsContent.textContent = emailContent;
        
        // Set up copy all button
        const copyAllBtn = this.modal.querySelector('#copyAllDetails');
        copyAllBtn.addEventListener('click', () => this.copyToClipboard(emailContent, copyAllBtn));
        
        // Set up copy email button
        const copyEmailBtn = this.modal.querySelector('#copyEmail');
        copyEmailBtn.addEventListener('click', () => this.copyToClipboard(this.yourEmail, copyEmailBtn));
        
        // Set up Gmail button
        const gmailBtn = this.modal.querySelector('#openGmail');
        gmailBtn.addEventListener('click', () => this.openGmail(formData));
        
        // Set up new request button
        const newRequestBtn = this.modal.querySelector('#newRequest');
        newRequestBtn.addEventListener('click', () => {
            this.closeSuccessModal();
        });
        
        // Show success modal
        this.modal.querySelector('.success-modal').classList.add('active');
    }

    formatEmailContent(formData) {
        const purposeText = {
            'job_opportunity': 'Job Opportunity',
            'freelance_project': 'Freelance Project',
            'internship': 'Internship Opportunity',
            'collaboration': 'Technical Collaboration',
            'reference': 'Reference Check',
            'other': 'Other Reason'
        }[formData.purpose] || formData.purpose;

        return `Subject: Resume Access Request - ${formData.name}

Dear Ved,

I would like to request access to your resume.

My Details:
• Name: ${formData.name}
• Email: ${formData.email}
• Purpose: ${purposeText}
• Message: ${formData.message}

Request ID: ${formData.requestId}
Requested on: ${new Date(formData.timestamp).toLocaleString()}

Please add me to your Google Drive to access your resume.

Thank you,
${formData.name}`;
    }

    async copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            
            // Update button state
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.classList.add('btn-copied');
            
            // Show toast
            this.showToast('Copied to clipboard!', 'success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('btn-copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            this.showToast('Failed to copy to clipboard', 'error');
        }
    }

    openGmail(formData) {
        const subject = `Resume Access Request - ${formData.name}`;
        const body = this.formatEmailContent(formData);
        
        // Encode for Gmail URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(this.yourEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open Gmail in new tab
        window.open(gmailUrl, '_blank');
        
        // Show toast
        this.showToast('Opening Gmail...', 'success');
    }

    showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.querySelector('.drive-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = `drive-toast ${type}`;
        toast.innerHTML = `
            <div class="drive-toast-icon ${type}">
                <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
            </div>
            <div class="drive-toast-message">${message}</div>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    logRequest() {
        // Simple request logging
        const requestLog = JSON.parse(localStorage.getItem('resumeRequestLog') || '[]');
        requestLog.push({
            timestamp: new Date().toISOString(),
            count: this.requestCount
        });
        localStorage.setItem('resumeRequestLog', JSON.stringify(requestLog));
        
        console.log('Resume access request sent - Total:', this.requestCount);
    }

    resetForm() {
        const form = this.modal.querySelector('#accessRequestForm');
        form.reset();
        
        // Clear error messages
        this.modal.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        
        // Reset border colors
        this.modal.querySelectorAll('input, select, textarea').forEach(el => {
            el.style.borderColor = '';
        });
    }
}

// Initialize drive access request system
const driveAccessSystem = new DriveAccessRequestSystem();

// Make it globally available
window.driveAccessSystem = driveAccessSystem;

// Auto-setup on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update hero section download button
    const heroDownloadBtn = document.querySelector('.hero-actions .btn-primary[href*="resume"], .hero-actions .btn-primary:has(i.fa-download)');
    if (heroDownloadBtn) {
        heroDownloadBtn.href = '#';
        heroDownloadBtn.id = 'resumeTrigger';
        heroDownloadBtn.classList.add('pulse-animation');
        
        // Update text
        if (heroDownloadBtn.textContent.includes('Download')) {
            heroDownloadBtn.textContent = heroDownloadBtn.textContent.replace('Download', 'Request Access');
            const icon = heroDownloadBtn.querySelector('i');
            if (icon && icon.classList.contains('fa-download')) {
                icon.classList.remove('fa-download');
                icon.classList.add('fa-shield-alt');
            }
        }
    }
    
    // Add pulse animation to any resume request button
    document.querySelectorAll('#resumeTrigger, .btn-download-resume').forEach(btn => {
        btn.classList.add('pulse-animation');
    });
});