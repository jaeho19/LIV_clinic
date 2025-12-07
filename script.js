document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => observer.observe(element));

    // Header Scroll Effect
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    let slideTimer = setInterval(nextSlide, slideInterval);

    // Pause on hover (optional)
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideTimer));
    sliderContainer.addEventListener('mouseleave', () => slideTimer = setInterval(nextSlide, slideInterval));

    // Consultation Form Handling
    const form = document.getElementById('consultForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Here you would typically send data to Google Sheets script
            console.log('Form Submitted:', { name, phone, message });
            
            alert('상담 신청이 접수되었습니다. (Google Sheet 연동 필요)');
            form.reset();
        });
    }
});
