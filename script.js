document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const response = document.getElementById('form-response');
  const userNameSpan = document.getElementById('user-name');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
  }

  // Smooth close menu after click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !phone || !message) {
      showMessage('Please fill in all fields!', 'error');
      return;
    }

    // Simple email regex (basic)
    const emailOK = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email);
    if (!emailOK) {
      showMessage('Please enter a valid email address!', 'error');
      return;
    }

    // Phone: 10-13 digits (numbers only)
    if (!/^\d{10,13}$/.test(phone)) {
      showMessage('Phone number must be 10-13 digits!', 'error');
      return;
    }

    // Success
    userNameSpan.textContent = name;
    showMessage(`Thank you, ${name}. Your message has been sent!`, 'success');

    // Reset form
    form.reset();
  });

  function showMessage(msg, type) {
    response.textContent = msg;
    response.style.color = type === 'success' ? 'green' : 'red';
  }
});
