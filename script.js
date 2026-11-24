// 1. Mobile Navigation Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu automatically after clicking a navigation link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. Animate Skill Progress Bars on Scroll
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress');

function animateSkills() {
    const sectionTop = skillSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 1.25;

    if (sectionTop < triggerPoint) {
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// 3. Highlight Active Section Link in Navbar on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 130;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
});

// 4. Copy SHIVI AI Project Link to Clipboard
const copyProjectBtn = document.getElementById('copy-project-btn');
const projectCopyFeedback = document.getElementById('project-copy-feedback');

copyProjectBtn.addEventListener('click', () => {
    const projectUrl = copyProjectBtn.getAttribute('data-url');
    navigator.clipboard.writeText(projectUrl).then(() => {
        projectCopyFeedback.innerText = 'SHIVI AI link copied to clipboard!';
        copyProjectBtn.innerText = 'Copied!';
        setTimeout(() => {
            projectCopyFeedback.innerText = '';
            copyProjectBtn.innerText = 'Copy Project Link';
        }, 2500);
    });
});

// 5. Copy Email Address to Clipboard
const copyEmailBtn = document.getElementById('copy-email-btn');
const emailText = document.getElementById('email-text').innerText;
const copyFeedback = document.getElementById('copy-feedback');

copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
        copyFeedback.innerText = 'Email copied to clipboard!';
        copyEmailBtn.innerText = 'Copied!';
        setTimeout(() => {
            copyFeedback.innerText = '';
            copyEmailBtn.innerText = 'Copy Email';
        }, 2500);
    });
});

// 6. Contact Form Submission & Validation Feedback
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const senderName = document.getElementById('name').value.trim();

    formStatus.innerText = `Thank you, ${senderName}! Your message has been sent.`;
    contactForm.reset();

    setTimeout(() => {
        formStatus.innerText = '';
    }, 4000);
});