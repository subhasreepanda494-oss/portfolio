/**
 * Subhasree Panda Portfolio - Interactive Scripts
 */

// 1. Global Theme Switcher
window.toggleTheme = function () {
  var html = document.documentElement;
  var body = document.body;
  var isCurrentLight = html.classList.contains('light-theme') || 
                       body.classList.contains('light-theme') || 
                       html.getAttribute('data-theme') === 'light';
  
  var targetTheme = isCurrentLight ? 'dark' : 'light';

  // Apply attributes & classes
  html.setAttribute('data-theme', targetTheme);
  body.setAttribute('data-theme', targetTheme);

  if (targetTheme === 'light') {
    html.classList.add('light-theme');
    html.classList.remove('dark-theme');
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
  } else {
    html.classList.add('dark-theme');
    html.classList.remove('light-theme');
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
  }

  // Update Icon
  var icons = document.querySelectorAll('.theme-toggle i, #theme-icon');
  for (var i = 0; i < icons.length; i++) {
    if (targetTheme === 'light') {
      icons[i].className = 'fa-solid fa-sun';
    } else {
      icons[i].className = 'fa-solid fa-moon';
    }
  }

  // Persist safely in localStorage
  try {
    localStorage.setItem('portfolio-theme', targetTheme);
  } catch (e) {}
};

// 2. Immediate Theme Synchronization
(function () {
  var savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  } catch (e) {}

  document.documentElement.setAttribute('data-theme', savedTheme);
  document.body.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  } else {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }

  var icons = document.querySelectorAll('.theme-toggle i, #theme-icon');
  for (var i = 0; i < icons.length; i++) {
    if (savedTheme === 'light') {
      icons[i].className = 'fa-solid fa-sun';
    } else {
      icons[i].className = 'fa-solid fa-moon';
    }
  }
})();

// 3. Navigation & Animations on DOM Loaded
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation Toggle
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  var navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function (e) {
      e.preventDefault();
      navMenu.classList.toggle('active');
      var icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        navMenu.classList.remove('active');
        var icon = navToggle.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-bars';
        }
      });
    }
  }

  // Header Scroll Effect & Active Section Tracking
  var header = document.getElementById('header');
  var sections = document.querySelectorAll('section[id]');

  function onScroll() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var sectionHeight = section.offsetHeight;
      var sectionTop = section.offsetTop - 120;
      var sectionId = section.getAttribute('id');
      var navItem = document.querySelector('.nav-menu a[href*="' + sectionId + '"]');

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hero Typing Effect
  var typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
    var roles = [
      'Computer Science Student',
      'Data Science Specialist',
      'Machine Learning Developer',
      'Python & SQL Programmer'
    ];
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 100;

    function typeEffect() {
      var currentRole = roles[roleIndex];

      if (isDeleting) {
        typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1600;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 350;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 400);
  }
});

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();
  var feedback = document.getElementById('form-feedback');
  var form = document.getElementById('contact-form');

  if (feedback) {
    feedback.style.color = '#10b981';
    feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been received.';
  }

  if (form) {
    form.reset();
  }

  setTimeout(function () {
    if (feedback) {
      feedback.innerHTML = '';
    }
  }, 5000);
}
