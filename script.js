// Small UI script: nav toggle, smooth scroll, form handling
document.addEventListener('DOMContentLoaded', function () {
  // dynamic year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // nav toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  // Close menu on link click
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });


  // Close menu when clicking a link
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close nav on mobile
        if (navMenu && navMenu.classList.contains('show')) navMenu.classList.remove('show');
      }
    });
  });

  // simple form handling: fake-submit + validation
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');
  const mailtoBtn = document.getElementById('mailto-btn');

  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => {
      window.location.href = 'mailto:contact@agapeict.com';
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      result.textContent = '';
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        result.style.color = '#b91c1c';
        result.textContent = 'Please fill in name, email and a short message.';
        return;
      }

      // basic email pattern
      const mailPattern = /^\S+@\S+\.\S+$/;
      if (!mailPattern.test(email)) {
        result.style.color = '#b91c1c';
        result.textContent = 'Please provide a valid email address.';
        return;
      }

      // fake submit: open mail client with prefilled content as graceful fallback
      const subject = encodeURIComponent('Agape ICT Enquiry from ' + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nOrg: ${document.getElementById('org').value}\n\nMessage:\n${message}`);
      window.location.href = `mailto:contact@agapeict.com?subject=${subject}&body=${body}`;

      // show a friendly instant message
      result.style.color = '#0B3B72';
      result.textContent = 'Opening your email client. If nothing opens, email contact@agapeict.com directly.';
      form.reset();
    });
  }
});
