/**
 * ==========================================================================
 * SHIVANSH TIWARI - PORTFOLIO INTERACTION ENGINE
 * Modular, accessible, and performant vanilla JavaScript.
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollSpy();
    initSkillAnimations();
    initClipboard();
    initContactForm();
    initBackToTop();
});

/**
 * --------------------------------------------------------------------------
 * 1. Mobile Navigation & Menu Toggle
 * --------------------------------------------------------------------------
 */
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (!hamburger || !navLinks) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking any link
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * --------------------------------------------------------------------------
 * 2. Active Section ScrollSpy
 * --------------------------------------------------------------------------
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navItems.length) return;

    const handleScroll = () => {
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * --------------------------------------------------------------------------
 * 3. Animated Skill Progress Bars (Intersection Observer)
 * --------------------------------------------------------------------------
 */
function initSkillAnimations() {
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');

    if (!skillSection || !progressBars.length) return;

    // Use IntersectionObserver for performant one-time animation
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width') || '0%';
                        bar.style.width = targetWidth;
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(skillSection);
    } else {
        // Fallback for older browsers
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') || '0%';
        });
    }
}

/**
 * --------------------------------------------------------------------------
 * 4. Clipboard Utilities
 * --------------------------------------------------------------------------
 */
function initClipboard() {
    // 4.1 Copy Project Link
    const copyProjectBtn = document.getElementById('copy-project-btn');
    const projectCopyFeedback = document.getElementById('project-copy-feedback');

    if (copyProjectBtn && projectCopyFeedback) {
        copyProjectBtn.addEventListener('click', async () => {
            const projectUrl = copyProjectBtn.getAttribute('data-url');
            if (!projectUrl) return;

            try {
                await navigator.clipboard.writeText(projectUrl);
                projectCopyFeedback.innerText = '✓ SHIVI AI live link copied to clipboard!';
                copyProjectBtn.innerText = 'Copied!';

                setTimeout(() => {
                    projectCopyFeedback.innerText = '';
                    copyProjectBtn.innerText = 'Copy Project Link';
                }, 3000);
            } catch (err) {
                projectCopyFeedback.innerText = 'Failed to copy link. Please copy manually.';
            }
        });
    }

    // 4.2 Copy Email Address
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailTextElement = document.getElementById('email-text');
    const copyFeedback = document.getElementById('copy-feedback');

    if (copyEmailBtn && emailTextElement && copyFeedback) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = emailTextElement.innerText.trim();

            try {
                await navigator.clipboard.writeText(email);
                copyFeedback.innerText = '✓ Email copied to clipboard!';
                copyEmailBtn.innerText = 'Copied!';

                setTimeout(() => {
                    copyFeedback.innerText = '';
                    copyEmailBtn.innerText = 'Copy Email';
                }, 3000);
            } catch (err) {
                copyFeedback.innerText = 'Failed to copy email. Please copy manually.';
            }
        });
    }
}

/**
 * --------------------------------------------------------------------------
 * 5. Contact Form Submission & Validation
 * --------------------------------------------------------------------------
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (!contactForm || !formStatus) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            formStatus.style.color = '#f87171';
            formStatus.innerText = 'Please complete all required fields.';
            return;
        }

        // Basic email syntax check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.style.color = '#f87171';
            formStatus.innerText = 'Please enter a valid email address.';
            return;
        }

        // Success state
        formStatus.style.color = 'var(--success)';
        formStatus.innerText = `Thank you, ${name}! Your message has been prepared. (Feel free to email directly as well).`;
        contactForm.reset();

        setTimeout(() => {
            formStatus.innerText = '';
        }, 5000);
    });
}

/**
 * --------------------------------------------------------------------------
 * 6. Floating Back to Top Button
 * --------------------------------------------------------------------------
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
