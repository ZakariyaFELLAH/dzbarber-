// ============================================
// DZ BARBER - JAVASCRIPT PRINCIPAL
// ============================================

class DZBarber {
    constructor() {
        this.init();
    }

    init() {
        this.setupDOM();
        this.bindEvents();
        this.setupObservers();
    }

    setupDOM() {
        this.header = document.getElementById('header');
        this.hamburger = document.getElementById('hamburger');
        this.nav = document.getElementById('nav');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.bookingBtn = document.getElementById('bookingBtn');
        this.bookingBtn2 = document.getElementById('bookingBtn2');
        this.contactForm = document.getElementById('contactForm');
        this.scrolledClass = false;
    }

    bindEvents() {
        // Scroll event
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        this.hamburger?.addEventListener('click', () => this.toggleMenu());

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Booking buttons
        this.bookingBtn?.addEventListener('click', () => this.handleBooking());
        this.bookingBtn2?.addEventListener('click', () => this.handleBooking());

        // Contact form
        this.contactForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50 && !this.scrolledClass) {
            this.header.classList.add('scrolled');
            this.scrolledClass = true;
        } else if (scrollY <= 50 && this.scrolledClass) {
            this.header.classList.remove('scrolled');
            this.scrolledClass = false;
        }
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.nav.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.nav.classList.remove('active');
    }

    handleBooking() {
        alert('Système de réservation à intégrer\n\nOptions:\n- Calendly\n- Acuity Scheduling\n- Votre système');
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validation basique
        if (!name || !email || !message) {
            this.showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Email invalide', 'error');
            return;
        }

        // Simulation d'envoi
        this.contactForm.style.opacity = '0.5';
        this.contactForm.style.pointerEvents = 'none';

        setTimeout(() => {
            this.showNotification('Message envoyé avec succès! 🎉', 'success');
            this.contactForm.reset();
            this.contactForm.style.opacity = '1';
            this.contactForm.style.pointerEvents = 'auto';
        }, 1000);

        // En production, envoyer au serveur:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, message })
        // })
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#ff6b35'};
            color: white;
            padding: 16px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    setupObservers() {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// ANIMATIONS CSS
// ============================================

function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
    new DZBarber();
    setupSmoothScroll();

    console.log('✅ DZ Barber initialized');
});