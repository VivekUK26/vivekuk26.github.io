// Navbar: scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// Fade-in on scroll for cards and timeline items
const fadeTargets = document.querySelectorAll(
  '.timeline-item, .stat-card, .skill-group, .cert-card, .contact-item, .education-block, .about-text, .contact-intro'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings within the same parent
      const siblings = Array.from(entry.target.parentElement.children);
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeTargets.forEach(el => fadeObserver.observe(el));
