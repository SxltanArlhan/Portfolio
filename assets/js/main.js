// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create nav toggle button if it doesn't exist
    if (!document.querySelector('.nav-toggle')) {
      const navToggle = document.createElement('div');
      navToggle.className = 'nav-toggle';
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
      document.querySelector('.navbar').appendChild(navToggle);
    }
  
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = this.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').className = 'fas fa-bars';
      });
    });
  });
  
  // Scroll to section smoothly when clicking on nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active link highlight on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100; // Add offset for header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // Add active class to nav links
  function setActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentLocation = window.location.hash || '#home';
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
      }
    });
  }
  
  // Add scroll to top button
  function addScrollToTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99;
        box-shadow: var(--shadow-md);
      }
      
      .scroll-top.visible {
        opacity: 1;
        visibility: visible;
      }
      
      .scroll-top:hover {
        background-color: var(--primary-dark);
        transform: translateY(-3px);
      }
    `;
    document.head.appendChild(style);
    
    // Show button when scrolling down
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Skills animation on scroll
  function animateSkillsOnScroll() {
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if (!skillsSection || !progressBars.length) return;
    
    let animated = false;
    
    function checkIfInView() {
      if (animated) return;
      
      const distance = skillsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (distance < windowHeight * 0.8) {
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
        });
        
        animated = true;
        window.removeEventListener('scroll', checkIfInView);
      }
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on load
  }
  
  // Initialize all functions
  document.addEventListener('DOMContentLoaded', function() {
    setActiveLink();
    addScrollToTopButton();
    animateSkillsOnScroll();
  });