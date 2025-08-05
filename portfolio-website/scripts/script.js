// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('projectModal');

// Mobile Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Smooth scrolling for anchor links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects with animation
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Skill bars animation
function animateSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize skill bars animation
document.addEventListener('DOMContentLoaded', animateSkillBars);

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearFormErrors();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            subject: formData.get('subject').trim(),
            message: formData.get('message').trim()
        };
        
        // Validate form
        const errors = validateForm(data);
        
        if (Object.keys(errors).length > 0) {
            displayFormErrors(errors);
            return;
        }
        
        // Simulate form submission
        submitForm(data);
    });
}

function validateForm(data) {
    const errors = {};
    
    // Name validation
    if (!data.name || data.name.length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Subject validation
    if (!data.subject || data.subject.length < 3) {
        errors.subject = 'Subject must be at least 3 characters long';
    }
    
    // Message validation
    if (!data.message || data.message.length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }
    
    return errors;
}

function displayFormErrors(errors) {
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(field + '-error');
        if (errorElement) {
            errorElement.textContent = errors[field];
            errorElement.style.display = 'block';
        }
    });
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function submitForm(data) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Store form data in localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! Thank you for contacting me.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Save form analytics
        updateFormAnalytics();
        
    }, 2000);
}

function updateFormAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
    analytics.formSubmissions = (analytics.formSubmissions || 0) + 1;
    analytics.lastSubmission = new Date().toISOString();
    localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add notification styles if they don't exist
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            .notification-success {
                border-left: 4px solid #10b981;
                color: #065f46;
            }
            .notification-info {
                border-left: 4px solid #3b82f6;
                color: #1e40af;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
                color: #6b7280;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Project modal functionality
const projectData = {
    project1: {
        title: "Business Website",
        description: "A modern responsive website for a local business featuring clean design and smooth animations. Built with HTML5, CSS3, and JavaScript, this project showcases professional web development skills and attention to detail.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        features: [
            "Fully responsive design",
            "Smooth scrolling navigation",
            "CSS animations and transitions",
            "Contact form with validation",
            "SEO optimized"
        ]
    },
    project2: {
        title: "Task Manager",
        description: "Interactive task management application with local storage and drag-and-drop functionality. This project demonstrates advanced JavaScript skills and modern web development practices.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Drag & Drop API"],
        features: [
            "Add, edit, and delete tasks",
            "Drag and drop functionality",
            "Local storage persistence",
            "Task filtering and sorting",
            "Responsive design"
        ]
    },
    project3: {
        title: "Portfolio Design",
        description: "Creative portfolio website with animations and interactive elements showcasing design skills. This project combines aesthetic appeal with functional user experience.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["HTML5", "CSS3", "JavaScript", "CSS Animations", "Intersection Observer"],
        features: [
            "Creative animations",
            "Interactive elements",
            "Modern design principles",
            "Performance optimized",
            "Cross-browser compatible"
        ]
    },
    project4: {
        title: "Restaurant Website",
        description: "Elegant restaurant website with menu display, reservation system, and contact information. Features smooth animations and appetizing design that enhances the dining experience.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["HTML5", "CSS3", "JavaScript", "Form Validation", "CSS Grid"],
        features: [
            "Interactive menu display",
            "Reservation form",
            "Location and hours",
            "Gallery showcase",
            "Mobile-friendly design"
        ]
    }
};

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project || !modal) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin: 1rem 0;">
        <p>${project.description}</p>
        
        <h3>Technologies Used</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0;">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <h3>Key Features</h3>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
        </ul>
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
            <button class="btn btn-primary" onclick="trackProjectView('${projectId}', 'demo')">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </button>
            <button class="btn btn-secondary" onclick="trackProjectView('${projectId}', 'code')">
                <i class="fab fa-github"></i> View Code
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Track modal view
    trackProjectView(projectId, 'view');
}

function closeProjectModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function trackProjectView(projectId, action) {
    const analytics = JSON.parse(localStorage.getItem('projectAnalytics') || '{}');
    if (!analytics[projectId]) {
        analytics[projectId] = {
            views: 0,
            demos: 0,
            codeViews: 0
        };
    }
    
    switch(action) {
        case 'view':
            analytics[projectId].views++;
            break;
        case 'demo':
            analytics[projectId].demos++;
            showNotification('Opening live demo...', 'info');
            break;
        case 'code':
            analytics[projectId].codeViews++;
            showNotification('Opening source code...', 'info');
            break;
    }
    
    localStorage.setItem('projectAnalytics', JSON.stringify(analytics));
}

// Close modal when clicking outside
if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
}

// Page analytics
function trackPageView() {
    const analytics = JSON.parse(localStorage.getItem('pageAnalytics') || '{}');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    analytics[currentPage] = (analytics[currentPage] || 0) + 1;
    analytics.totalViews = (analytics.totalViews || 0) + 1;
    analytics.lastVisit = new Date().toISOString();
    
    localStorage.setItem('pageAnalytics', JSON.stringify(analytics));
}

// Track user interactions
function trackInteraction(element, action) {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    interactions.push({
        element,
        action,
        timestamp: new Date().toISOString(),
        page: window.location.pathname.split('/').pop() || 'index.html'
    });
    
    // Keep only last 100 interactions
    if (interactions.length > 100) {
        interactions.splice(0, interactions.length - 100);
    }
    
    localStorage.setItem('userInteractions', JSON.stringify(interactions));
}

// Add click tracking to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Track page view
    trackPageView();
    
    // Track button clicks
    document.querySelectorAll('button, .btn').forEach(button => {
        button.addEventListener('click', () => {
            trackInteraction('button', button.textContent.trim().substring(0, 30));
        });
    });
    
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            trackInteraction('navigation', link.textContent.trim());
        });
    });
    
    // Track social link clicks
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', () => {
            trackInteraction('social', 'social-link-click');
        });
    });
    
    // Add fade-in animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Console welcome message
console.log(`
🚀 Welcome to Alex Chen's Portfolio Website!
📊 This site tracks basic analytics in localStorage
🔧 Built with HTML5, CSS3, and Vanilla JavaScript
📱 Fully responsive and accessible design

Analytics stored locally:
- Page views: ${JSON.parse(localStorage.getItem('pageAnalytics') || '{}').totalViews || 0}
- Form submissions: ${JSON.parse(localStorage.getItem('siteAnalytics') || '{}').formSubmissions || 0}
- User interactions: ${JSON.parse(localStorage.getItem('userInteractions') || '[]').length}
`);