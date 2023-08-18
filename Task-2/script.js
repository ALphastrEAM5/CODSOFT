// script.js
document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll(".dot");
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-links a");
  
    const handleScroll = () => {
      const currentSection = getCurrentSection();
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSection);
      });
    };
  
    const getCurrentSection = () => {
      let currentSection = 0;
      let scrollPosition = window.scrollY + window.innerHeight / 2;
  
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;
  
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          currentSection = index;
        }
      });
  
      return currentSection;
    };
  
    const smoothScrollToSection = (targetSection) => {
      const targetPosition = targetSection.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 800; // milliseconds
      let startTime = null;
  
      const animateScroll = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
  
        const easedProgress = easeInOutCubic(progress, 0, distance, duration);
        const newPosition = startPosition + easedProgress;
        window.scrollTo(0, newPosition);
  
        if (progress < duration) {
          requestAnimationFrame(animateScroll);
        }
      };
  
      requestAnimationFrame(animateScroll);
    };
  
    const easeInOutCubic = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };
  
    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetSectionId = link.getAttribute("href");
        const targetSection = document.querySelector(targetSectionId);
        smoothScrollToSection(targetSection);
      });
    });
  
    document.addEventListener("scroll", handleScroll);
  });
  


