/**
 * ==========================================================================
 * SHIVANSH TIWARI — PORTFOLIO INTERACTION ENGINE
 * Modular, performant, and accessible interaction architecture.
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavigation();
    initScrollReveal();
    initScrollSpy();
    initHeroTyping();
    initTerminalTabs();
    initSkillFilters();
    initShiviSimulator();
    initClipboard();
    initContactForm();
    initLiveClocks();
    initBackToTopProgress();
});

/**
 * --------------------------------------------------------------------------
 * 1. Custom Smooth Cursor (Desktop Fine Pointers Only)
 * --------------------------------------------------------------------------
 */
function initCustomCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    // Smooth trailing ring
    function renderRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(renderRing);
    }
    renderRing();

    // Hover effect on interactive elements
    const interactiveSelectors = 'a, button, input, textarea, .bento-card, .skill-matrix-card, .term-tab, .chat-chip';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });
}

/**
 * --------------------------------------------------------------------------
 * 2. Navigation Header & Mobile Fullscreen Drawer
 * --------------------------------------------------------------------------
 */
function initNavigation() {
    const header = document.getElementById('header-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Sticky transform on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    if (!menuToggle || !mobileDrawer) return;

    const toggleDrawer = (open) => {
        const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
        mobileDrawer.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => toggleDrawer());

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
            toggleDrawer(false);
        }
    });
}

/**
 * --------------------------------------------------------------------------
 * 3. Staggered Scroll Reveal Animations
 * --------------------------------------------------------------------------
 */
function initScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal-item');
    if (!revealItems.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealItems.forEach((item, index) => {
            // Apply slight transition delay for siblings in containers
            const siblingIndex = Array.from(item.parentNode.children).indexOf(item);
            if (siblingIndex > 0 && siblingIndex < 5) {
                item.style.transitionDelay = `${siblingIndex * 0.1}s`;
            }
            observer.observe(item);
        });
    } else {
        revealItems.forEach(item => item.classList.add('revealed'));
    }
}

/**
 * --------------------------------------------------------------------------
 * 4. ScrollSpy Active Section Tracking
 * --------------------------------------------------------------------------
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });
}

/**
 * --------------------------------------------------------------------------
 * 5. Hero Dynamic Rotating/Typing Tagline
 * --------------------------------------------------------------------------
 */
function initHeroTyping() {
    const typingElem = document.getElementById('typing-text');
    if (!typingElem) return;

    const phrases = [
        'intelligent interfaces',
        'conversational AI agents',
        'responsive digital products',
        'accessible web architectures'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 90;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElem.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            speed = 45;
        } else {
            typingElem.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            speed = 95;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at complete word
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 450;
        }

        setTimeout(typeLoop, speed);
    }

    typeLoop();
}

/**
 * --------------------------------------------------------------------------
 * 6. Interactive Developer Terminal Tabs
 * --------------------------------------------------------------------------
 */
function initTerminalTabs() {
    const tabs = document.querySelectorAll('.term-tab');
    const views = document.querySelectorAll('.code-view');
    if (!tabs.length || !views.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = `code-${tab.getAttribute('data-tab')}`;

            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            tab.classList.add('active');
            const targetView = document.getElementById(targetId);
            if (targetView) targetView.classList.add('active');
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * 7. Skills Matrix Category Filter
 * --------------------------------------------------------------------------
 */
function initSkillFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const skillCards = document.querySelectorAll('.skill-matrix-card');
    if (!filterTabs.length || !skillCards.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filterValue = tab.getAttribute('data-filter');

            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * 8. Interactive SHIVI AI Chatbot Simulator Device
 * --------------------------------------------------------------------------
 */
function initShiviSimulator() {
    const chatContainer = document.getElementById('dynamic-chat-msgs');
    const chatBody = document.getElementById('mockup-chat-body');
    const chips = document.querySelectorAll('.chat-chip');
    const inputForm = document.getElementById('mockup-input-form');
    const inputField = document.getElementById('mockup-input-field');

    if (!chatContainer || !chatBody) return;

    const botKnowledge = {
        about: "Shivansh Tiwari is an undergraduate Computer Science Engineering student specializing in Data Science & Artificial Intelligence at Shri Ramswaroop Memorial University (SRMU). He bridges thoughtful front-end craft with intelligent systems.",
        skills: "Shivansh's primary stack includes HTML5, CSS3, modern JavaScript (ES6+), Python, Data Science fundamentals, Conversational AI architecture, and Git/GitHub.",
        shivi: "SHIVI AI is a live conversational chatbot built with real-time dialogue handling and clean responsive front-end styling. It's deployed live on GitHub Pages!",
        default: "Thank you for asking! You can explore my full work right here on the portfolio or launch the live SHIVI AI chatbot via the 'Launch' button."
    };

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

        const avatar = document.createElement('div');
        avatar.className = 'msg-avatar';
        avatar.textContent = sender === 'user' ? 'YOU' : 'AI';

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        const p = document.createElement('p');
        p.textContent = text;
        bubble.appendChild(p);

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatContainer.appendChild(msgDiv);

        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processQuery(queryText, queryKey) {
        appendMessage('user', queryText);

        // Simulated typing delay
        setTimeout(() => {
            const key = queryKey || 'default';
            const answer = botKnowledge[key] || botKnowledge.default;
            appendMessage('bot', answer);
        }, 450);
    }

    // Chip click handlers
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const queryKey = chip.getAttribute('data-query');
            const queryText = chip.textContent;
            processQuery(queryText, queryKey);
        });
    });

    // Custom input submit
    if (inputForm && inputField) {
        inputForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = inputField.value.trim();
            if (!text) return;

            let matchedKey = 'default';
            const lower = text.toLowerCase();
            if (lower.includes('who') || lower.includes('about') || lower.includes('shivansh')) matchedKey = 'about';
            else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) matchedKey = 'skills';
            else if (lower.includes('shivi') || lower.includes('bot') || lower.includes('ai')) matchedKey = 'shivi';

            processQuery(text, matchedKey);
            inputField.value = '';
        });
    }
}

/**
 * --------------------------------------------------------------------------
 * 9. Clipboard Actions (Project Link & Email)
 * --------------------------------------------------------------------------
 */
function initClipboard() {
    // 9.1 Copy SHIVI AI Live Link
    const copyProjectBtn = document.getElementById('copy-project-btn');
    const copyBtnText = document.getElementById('copy-btn-text');
    const projectCopyFeedback = document.getElementById('project-copy-feedback');

    if (copyProjectBtn && copyBtnText && projectCopyFeedback) {
        copyProjectBtn.addEventListener('click', async () => {
            const url = copyProjectBtn.getAttribute('data-url');
            if (!url) return;

            try {
                await navigator.clipboard.writeText(url);
                copyBtnText.textContent = 'Link Copied! ✓';
                projectCopyFeedback.textContent = 'Live SHIVI AI link copied to clipboard!';
                setTimeout(() => {
                    copyBtnText.textContent = 'Copy Live Link';
                    projectCopyFeedback.textContent = '';
                }, 3000);
            } catch (err) {
                projectCopyFeedback.textContent = 'Failed to copy automatically. Please copy manually.';
            }
        });
    }

    // 9.2 Copy Email Address
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyEmailText = document.getElementById('copy-email-text');
    const emailAddressText = document.getElementById('email-address-text');
    const emailFeedback = document.getElementById('email-copy-feedback');

    if (copyEmailBtn && copyEmailText && emailAddressText && emailFeedback) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = emailAddressText.textContent.trim();
            try {
                await navigator.clipboard.writeText(email);
                copyEmailText.textContent = 'Copied! ✓';
                emailFeedback.textContent = 'Email address copied to your clipboard!';
                setTimeout(() => {
                    copyEmailText.textContent = 'Copy Email';
                    emailFeedback.textContent = '';
                }, 3000);
            } catch (err) {
                emailFeedback.textContent = 'Unable to copy. Please write directly.';
            }
        });
    }
}

/**
 * --------------------------------------------------------------------------
 * 10. Interactive Contact Form with Validation
 * --------------------------------------------------------------------------
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status-msg');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!form || !statusMsg) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) {
            statusMsg.style.color = '#f87171';
            statusMsg.textContent = '⚠ Please complete all required fields.';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            statusMsg.style.color = '#f87171';
            statusMsg.textContent = '⚠ Please provide a valid email address.';
            return;
        }

        // Processing simulated submission
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Preparing Dispatch...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Send Message';
            statusMsg.style.color = 'var(--status-green)';
            statusMsg.textContent = `✓ Thank you, ${name}! Your inquiry has been received. You can also reach out via LinkedIn or direct email.`;
            form.reset();

            setTimeout(() => {
                statusMsg.textContent = '';
            }, 6000);
        }, 600);
    });
}

/**
 * --------------------------------------------------------------------------
 * 11. Real-Time Indian Standard Time (IST) Clock
 * --------------------------------------------------------------------------
 */
function initLiveClocks() {
    const heroClock = document.getElementById('hero-clock');
    const footerClock = document.getElementById('footer-live-time');
    const currentYear = document.getElementById('current-year');

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function updateTime() {
        try {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(now);

            if (heroClock) {
                heroClock.textContent = `${timeString} IST • Lucknow, IN`;
            }
            if (footerClock) {
                footerClock.textContent = `Local Time: ${timeString} IST (Lucknow, India)`;
            }
        } catch (e) {
            if (heroClock) heroClock.textContent = 'Lucknow, IN';
        }
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/**
 * --------------------------------------------------------------------------
 * 12. Floating Circular Back-to-Top with Scroll Progress
 * --------------------------------------------------------------------------
 */
function initBackToTopProgress() {
    const backToTopBtn = document.getElementById('back-to-top');
    const circle = document.querySelector('.progress-ring__circle');
    if (!backToTopBtn || !circle) return;

    const circumference = 2 * Math.PI * 20; // r = 20
    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollCurrent = window.scrollY;

        if (scrollCurrent > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        if (scrollTotal > 0) {
            const progress = Math.min(Math.max(scrollCurrent / scrollTotal, 0), 1);
            const offset = circumference - (progress * circumference);
            circle.style.strokeDashoffset = offset;
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
