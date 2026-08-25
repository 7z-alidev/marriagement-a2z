/* ==========================================================================
   MARRIAGEMENT — Interactive Logic & Motion Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Glass Transform on Scroll
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. IntersectionObserver Scroll Fade-In Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
  });

  // 4. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Contact Form Submission
  const contactForm = document.getElementById('weddingContactForm');
  const toastMsg = document.getElementById('toastMsg');

  if (contactForm && toastMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing...</span>';

      setTimeout(() => {
        toastMsg.style.display = 'block';
        toastMsg.innerHTML = '✨ Thank you! Your consultation request has been received. Our luxury wedding concierge will reach out within 24 hours.';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        setTimeout(() => {
          toastMsg.style.display = 'none';
        }, 8000);
      }, 1200);
    });
  }

  // 6. 3D Coverflow Carousel Controller
  const track = document.getElementById('coverflowTrack');
  const cards = document.querySelectorAll('.coverflow-card');
  const prevBtn = document.getElementById('coverflowPrev');
  const nextBtn = document.getElementById('coverflowNext');
  
  if (track && cards.length > 0) {
    let currentIndex = 2; // Default center card
    const totalCards = cards.length;

    function updateCoverflow() {
      const isMobile = window.innerWidth <= 768;
      const xSpacing = isMobile ? 140 : 250;

      cards.forEach((card, i) => {
        let offset = i - currentIndex;
        
        // Circular wrapping for offset calculation
        if (offset < -Math.floor(totalCards / 2)) {
          offset += totalCards;
        } else if (offset > Math.floor(totalCards / 2)) {
          offset -= totalCards;
        }

        if (offset === 0) {
          // Active Center Card
          card.style.transform = `translateX(0) scale(1) translateZ(100px)`;
          card.style.zIndex = 10;
          card.style.opacity = 1;
          card.style.filter = 'blur(0px)';
          card.style.boxShadow = '0 25px 50px rgba(28, 25, 23, 0.28), 0 0 25px rgba(212, 175, 55, 0.2)';
          card.classList.add('active');
        } else if (offset === 1) {
          // Immediate Right
          card.style.transform = `translateX(${xSpacing}px) scale(0.84) rotateY(-14deg)`;
          card.style.zIndex = 5;
          card.style.opacity = 0.85;
          card.style.filter = 'blur(0.5px)';
          card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.12)';
          card.classList.remove('active');
        } else if (offset === -1) {
          // Immediate Left
          card.style.transform = `translateX(-${xSpacing}px) scale(0.84) rotateY(14deg)`;
          card.style.zIndex = 5;
          card.style.opacity = 0.85;
          card.style.filter = 'blur(0.5px)';
          card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.12)';
          card.classList.remove('active');
        } else if (offset === 2) {
          // Outer Right
          card.style.transform = `translateX(${xSpacing * 1.75}px) scale(0.68) rotateY(-24deg)`;
          card.style.zIndex = 2;
          card.style.opacity = 0.5;
          card.style.filter = 'blur(1.5px)';
          card.classList.remove('active');
        } else if (offset === -2) {
          // Outer Left
          card.style.transform = `translateX(-${xSpacing * 1.75}px) scale(0.68) rotateY(24deg)`;
          card.style.zIndex = 2;
          card.style.opacity = 0.5;
          card.style.filter = 'blur(1.5px)';
          card.classList.remove('active');
        } else {
          // Hidden
          card.style.transform = `translateX(${offset * xSpacing}px) scale(0.5)`;
          card.style.zIndex = 0;
          card.style.opacity = 0;
          card.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCoverflow();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateCoverflow();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        currentIndex = idx;
        updateCoverflow();
      });
    });

    // Auto-advance with hover pause
    let autoTimer = setInterval(nextSlide, 4000);
    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', () => {
      autoTimer = setInterval(nextSlide, 4000);
    });

    window.addEventListener('resize', updateCoverflow);
    updateCoverflow();
  }

  // 7. Parallax Gallery Scroll Effect
  const parallaxSection = document.querySelector('.parallax-gallery-section');
  const parallaxItems = document.querySelectorAll('.parallax-item');

  if (parallaxSection && parallaxItems.length > 0) {
    window.addEventListener('scroll', () => {
      const rect = parallaxSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only calculate if section is in viewport vicinity
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        const relativeScroll = (rect.top - viewportHeight / 2);

        parallaxItems.forEach(item => {
          const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0.05;
          const yPos = relativeScroll * speed;
          item.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      }
    });
  }

  // 8. Word-by-Word Animated Testimonial Slider
  const testimonialsData = [
    {
      name: "John Doe",
      title: "CEO, Tech Innovations",
      quote: "They brought clarity to complex problems, breaking down barriers and delivering innovative solutions.",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "David Smith",
      title: "Founder, Nexus Dynamics",
      quote: "Their team was an absolute game-changer for our workflow. We scaled faster and with much more confidence.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Marcus Chen",
      title: "VP of Engineering, GlobalCorp",
      quote: "A truly collaborative process from start to finish. The results completely exceeded our initial expectations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    }
  ];

  let currentTestimonialIndex = 0;
  const quoteElem = document.getElementById('testimonialQuote');
  const authorAvatarElem = document.getElementById('authorAvatar');
  const authorNameElem = document.getElementById('authorName');
  const authorTitleElem = document.getElementById('authorTitle');
  const authorBlockElem = document.getElementById('testimonialAuthorBlock');
  const navButtonsElem = document.getElementById('testimonialNavButtons');
  const testimonialPrevBtn = document.getElementById('testimonialPrevBtn');
  const testimonialNextBtn = document.getElementById('testimonialNextBtn');

  function renderTestimonial(index) {
    if (!quoteElem) return;

    const data = testimonialsData[index];
    const words = data.quote.split(" ");

    // Word-by-word html generation with staggered animation delay and native space between words
    quoteElem.innerHTML = words.map((word, idx) => {
      return `<span class="word-wrapper"><span class="word-span" style="--word-index: ${idx}">${word}</span></span> `;
    }).join('');

    // Update Author Info
    if (authorAvatarElem) authorAvatarElem.src = data.image;
    if (authorNameElem) authorNameElem.textContent = data.name;
    if (authorTitleElem) authorTitleElem.textContent = data.title;

    // Reset and re-trigger author block fade animation
    if (authorBlockElem) {
      authorBlockElem.style.animation = 'none';
      authorBlockElem.offsetHeight; // trigger reflow
      authorBlockElem.style.animation = 'fadeInDelay 0.6s ease forwards 0.4s';
    }

    if (navButtonsElem) {
      navButtonsElem.style.animation = 'none';
      navButtonsElem.offsetHeight; // trigger reflow
      navButtonsElem.style.animation = 'fadeInDelay 0.6s ease forwards 0.5s';
    }
  }

  if (testimonialPrevBtn && testimonialNextBtn) {
    testimonialPrevBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialsData.length) % testimonialsData.length;
      renderTestimonial(currentTestimonialIndex);
    });

    testimonialNextBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsData.length;
      renderTestimonial(currentTestimonialIndex);
    });

    // Initial render
    renderTestimonial(0);
  }

  // 9. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const wrapper = item.querySelector('.faq-answer-wrapper');
    const content = item.querySelector('.faq-answer-content');

    if (btn && wrapper && content) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other active items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
            otherItem.querySelector('.faq-answer-wrapper').style.maxHeight = '0px';
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          wrapper.style.maxHeight = '0px';
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          wrapper.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });
});
