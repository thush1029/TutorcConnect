// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Modal Management
function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchModal(fromModal, toModal) {
    closeModal(fromModal);
    setTimeout(() => openModal(toModal), 300);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Tutor Search and Filtering
const tutorSearch = document.getElementById('tutorSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const tutorCards = document.querySelectorAll('.tutor-card');

// Search functionality
if (tutorSearch) {
    tutorSearch.addEventListener('input', filterTutors);
}

// Filter button functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        filterTutorsBySubject(filter);
    });
});

function filterTutors() {
    const searchTerm = tutorSearch.value.toLowerCase();
    
    tutorCards.forEach(card => {
        const tutorName = card.querySelector('h3').textContent.toLowerCase();
        const tutorSubject = card.querySelector('.tutor-subject').textContent.toLowerCase();
        const tutorTags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matchesSearch = tutorName.includes(searchTerm) || 
                            tutorSubject.includes(searchTerm) ||
                            tutorTags.some(tag => tag.includes(searchTerm));
        
        if (matchesSearch) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterTutorsBySubject(subject) {
    tutorCards.forEach(card => {
        const cardSubject = card.getAttribute('data-subject');
        
        if (subject === 'all' || cardSubject === subject) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Book Tutor Function
function bookTutor(tutorName) {
    // Check if user is logged in (you can implement your own logic)
    const isLoggedIn = false; // This would be set based on your authentication system
    
    if (!isLoggedIn) {
        showNotification('Please log in to book a session with ' + tutorName, 'info');
        openModal('login');
        return;
    }
    
    // Simulate booking process
    showNotification('Booking session with ' + tutorName + '...', 'info');
    
    setTimeout(() => {
        showNotification('Session booked successfully! You will receive a confirmation email shortly.', 'success');
    }, 2000);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const inquiryType = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !inquiryType || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Modal form handling
document.querySelectorAll('.modal-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const modalType = this.closest('.modal').id.replace('Modal', '');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            if (modalType === 'login') {
                showNotification('Login successful! Welcome back.', 'success');
                closeModal('login');
            } else if (modalType === 'signup') {
                showNotification('Account created successfully! Please check your email to verify your account.', 'success');
                closeModal('signup');
            } else if (modalType === 'tutor-signup') {
                showNotification('Application submitted successfully! We\'ll review your application and get back to you within 3-5 business days.', 'success');
                closeModal('tutor-signup');
            }
            
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'info' ? '#3b82f6' : '#f59e0b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.subject-card, .tutor-card, .step, .benefit-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Button click animations with ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when hero section is visible
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            heroStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroStatsObserver.observe(heroStats);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-graphic');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced tutor card interactions
document.querySelectorAll('.tutor-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Subject card hover effects
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            const modalType = modal.id.replace('Modal', '');
            closeModal(modalType);
        });
    }
});

// Initialize tooltips for tutor ratings
document.querySelectorAll('.tutor-rating').forEach(rating => {
    const score = rating.querySelector('span').textContent;
    rating.title = `${score} out of 5 stars`;
});

// Add smooth transitions for all interactive elements
document.querySelectorAll('button, a, .tutor-card, .subject-card').forEach(element => {
    element.style.transition = 'all 0.3s ease';
});

// ========== Tutor Profile Management ==========

const tutorsGrid = document.getElementById('tutorsGrid');
const tutorProfileContainer = document.getElementById('tutorProfileContainer');

// Default tutors (empty at beginning)
function getTutors() {
    const tutors = JSON.parse(localStorage.getItem('tutors')) || [];
    return tutors;
}

function saveTutors(tutors) {
    localStorage.setItem('tutors', JSON.stringify(tutors));
}

function renderTutors() {
    const tutors = getTutors();
    if (!tutorsGrid) return;
    tutorsGrid.innerHTML = '';
    if (tutors.length === 0) {
        tutorsGrid.innerHTML = '<p style="text-align:center; color:#888;">No tutors have registered yet. Be the first to create your profile in the Tutor Dashboard!</p>';
        return;
    }
    tutors.forEach((tutor, idx) => {
        tutorsGrid.innerHTML += `
        <div class="tutor-card" data-subject="${tutor.subject}">
            <div class="tutor-image">
                <img src="${tutor.photo || 'https://placehold.co/150x150?text=Tutor'}" alt="${tutor.name}">
            </div>
            <div class="tutor-info">
                <h3>${tutor.name}</h3>
                <p class="tutor-subject">${tutor.subject || ''}</p>
                <p class="tutor-experience">${tutor.experience ? tutor.experience + ' years experience' : ''}</p>
                <div class="tutor-tags">
                    ${(tutor.tags || []).map(tag => `<span class="tag">${tag}</span>`).join(' ')}
                </div>
                <div class="tutor-price">
                    ${tutor.price ? `<span class="price">$${tutor.price}</span>/hour` : ''}
                </div>
                <button class="btn btn-primary" onclick="bookTutor('${tutor.name}')">Book Session</button>
                <button class="btn btn-secondary" onclick="editTutorProfile(${idx})">Edit</button>
            </div>
        </div>
        `;
    });
}

// Tutor Dashboard logic
function renderTutorDashboard(editIdx = null) {
    if (!tutorProfileContainer) return;
    let tutors = getTutors();
    let tutor = editIdx !== null ? tutors[editIdx] : {};
    tutorProfileContainer.innerHTML = `
        <form id="tutorProfileForm" class="modal-form" style="max-width:500px;margin:0 auto;">
            <div class="form-group">
                <input type="text" name="name" placeholder="Full Name" value="${tutor.name || ''}" required>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Email" value="${tutor.email || ''}" required>
            </div>
            <div class="form-group">
                <input type="text" name="photo" placeholder="Photo URL (optional)" value="${tutor.photo || ''}">
            </div>
            <div class="form-group">
                <input type="text" name="subject" placeholder="Subject Expertise" value="${tutor.subject || ''}" required>
            </div>
            <div class="form-group">
                <input type="number" name="experience" placeholder="Years of Experience" value="${tutor.experience || ''}" min="0">
            </div>
            <div class="form-group">
                <input type="text" name="tags" placeholder="Tags (comma separated)" value="${(tutor.tags || []).join(', ')}">
            </div>
            <div class="form-group">
                <input type="number" name="price" placeholder="Hourly Rate (USD)" value="${tutor.price || ''}" min="0">
            </div>
            <div class="form-group">
                <textarea name="bio" placeholder="Short Bio" rows="3">${tutor.bio || ''}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">${editIdx !== null ? 'Update Profile' : 'Create Profile'}</button>
            ${editIdx !== null ? `<button type="button" class="btn btn-secondary" id="cancelEditBtn">Cancel</button>` : ''}
        </form>
    `;
    // Form logic
    const form = document.getElementById('tutorProfileForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const newTutor = {
            name: formData.get('name'),
            email: formData.get('email'),
            photo: formData.get('photo'),
            subject: formData.get('subject'),
            experience: formData.get('experience'),
            tags: formData.get('tags').split(',').map(t => t.trim()).filter(Boolean),
            price: formData.get('price'),
            bio: formData.get('bio'),
        };
        if (editIdx !== null) {
            tutors[editIdx] = newTutor;
        } else {
            tutors.push(newTutor);
        }
        saveTutors(tutors);
        showNotification('Tutor profile saved!', 'success');
        renderTutorDashboard();
        renderTutors();
    };
    if (editIdx !== null) {
        document.getElementById('cancelEditBtn').onclick = function() {
            renderTutorDashboard();
        };
    }
}

// Expose edit function globally for button
window.editTutorProfile = function(idx) {
    renderTutorDashboard(idx);
};

// Initial render
renderTutors();
renderTutorDashboard(); 