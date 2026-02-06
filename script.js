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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content, .project-card, .skill-category');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
    // Disabled auto palette; using locked dark gray + pink theme set in CSS variables
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Try EmailJS first; fallback to mailto if not configured or fails
        const SERVICE_ID = 'YOUR_SERVICE_ID';
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // also set in index.html init

        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };

        const sendWithEmailJs = () => emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

        sendWithEmailJs().then(() => {
            showNotification('Thanks! Your message was sent successfully.', 'success');
            this.reset();
        }).catch(() => {
            const recipient = 'melodyramosct@gmail.com';
            const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            )}`;
            window.location.href = mailto;
            showNotification('Email app opening as a fallback to send your message.', 'info');
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
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
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
    
    @keyframes slideOutRight {
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
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #6366f1;
    color: white;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.background = '#4f46e5';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.background = '#6366f1';
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyles);

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const activeLinkStyles = document.createElement('style');
activeLinkStyles.textContent = `
    .nav-link.active { color: var(--color-primary); }
    .nav-link.active::after { width: 100%; }
`;
document.head.appendChild(activeLinkStyles);

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in-up');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on load
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Add active state styles for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in-up.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);

// Theme toggle with persistence
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') {
        root.classList.add('theme-dark');
        if (toggle) toggle.textContent = '☀️';
    }
    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = root.classList.toggle('theme-dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            toggle.textContent = isDark ? '☀️' : '🌙';
        });
    }
});

// Palette extraction from profile photo and theming
function applyPaletteFromProfileImage() {
    const img = document.querySelector('.profile-image img');
    if (!img) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = img.src;

    image.onload = function() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const maxDimension = 128;
        const scale = Math.min(maxDimension / image.width, maxDimension / image.height, 1);
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple quantization via downsampling of colors
        const colorMap = new Map();
        const step = 4 * 5; // sample every 5 pixels
        for (let i = 0; i < data.length; i += step) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            if (a < 128) continue; // skip transparent
            // bucket to 24 levels per channel to reduce variations
            const br = Math.round(r / 11) * 11;
            const bg = Math.round(g / 11) * 11;
            const bb = Math.round(b / 11) * 11;
            const key = `${br},${bg},${bb}`;
            colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }

        if (colorMap.size === 0) return;

        // Sort by frequency
        const sorted = Array.from(colorMap.entries()).sort((a, b) => b[1] - a[1]);

        // Helper to compute perceived luminance
        const luminance = (r, g, b) => 0.2126 * r/255 + 0.7152 * g/255 + 0.0722 * b/255;

        // Pick primary as a mid-saturation, mid-luminance color
        let primary = null;
        for (const [key] of sorted) {
            const [r, g, b] = key.split(',').map(Number);
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const sat = (max - min) / (max || 1);
            const lum = luminance(r, g, b);
            if (sat > 0.25 && lum > 0.25 && lum < 0.8) {
                primary = { r, g, b };
                break;
            }
        }
        if (!primary) {
            const [r, g, b] = sorted[0][0].split(',').map(Number);
            primary = { r, g, b };
        }

        // Accent: next most distinct color
        let accent = null;
        for (const [key] of sorted.slice(1)) {
            const [r, g, b] = key.split(',').map(Number);
            const dist = Math.hypot(primary.r - r, primary.g - g, primary.b - b);
            if (dist > 80) { // sufficiently different
                accent = { r, g, b };
                break;
            }
        }
        if (!accent) accent = primary;

        // Derive darker variants
        const darken = (c, f=0.2) => ({ r: Math.max(0, Math.round(c.r * (1 - f))), g: Math.max(0, Math.round(c.g * (1 - f))), b: Math.max(0, Math.round(c.b * (1 - f))) });
        const primary700 = darken(primary, 0.25);
        const accent700 = darken(accent, 0.25);

        // Hero gradient ends
        const heroStart = primary;
        const heroEnd = accent;

        // Compute text color for contrast (WCAG-ish)
        function textOn(bg) {
            const lum = luminance(bg.r, bg.g, bg.b);
            return lum > 0.6 ? '#111827' : '#ffffff';
        }

        // Apply CSS variables
        const root = document.documentElement;
        root.style.setProperty('--color-primary', `rgb(${primary.r}, ${primary.g}, ${primary.b})`);
        root.style.setProperty('--color-primary-700', `rgb(${primary700.r}, ${primary700.g}, ${primary700.b})`);
        root.style.setProperty('--color-accent', `rgb(${accent.r}, ${accent.g}, ${accent.b})`);
        root.style.setProperty('--color-accent-700', `rgb(${accent700.r}, ${accent700.g}, ${accent700.b})`);
        root.style.setProperty('--hero-start', `rgb(${heroStart.r}, ${heroStart.g}, ${heroStart.b})`);
        root.style.setProperty('--hero-end', `rgb(${heroEnd.r}, ${heroEnd.g}, ${heroEnd.b})`);

        // Adjust hero/button text to ensure readability
        root.style.setProperty('--color-heading', textOn(accent));
        root.style.setProperty('--color-text', '#333333');
    };
}

// Project modal interactions
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const titleEl = modal?.querySelector('.project-modal-title');
    const descEl = modal?.querySelector('.project-modal-description');
    const techEl = modal?.querySelector('.project-modal-tech');
    const backdrop = modal?.querySelector('.project-modal-backdrop');
    const closeBtn = modal?.querySelector('.project-modal-close');

    function openModal({ title, description, tech }) {
        if (!modal) return;
        titleEl.textContent = title || '';
        descEl.textContent = description || '';
        techEl.innerHTML = '';
        if (tech) {
            tech.split(',').map(s => s.trim()).forEach(t => {
                const chip = document.createElement('span');
                chip.textContent = t;
                techEl.appendChild(chip);
            });
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.open-project').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget;
            openModal({
                title: target.getAttribute('data-title'),
                description: target.getAttribute('data-description'),
                tech: target.getAttribute('data-tech')
            });
        });
    });

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
