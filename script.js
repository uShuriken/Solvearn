document.addEventListener('DOMContentLoaded', () => {
    // Video Setup
    const video = document.getElementById('heroVideo');

    if (video) {
        // Force play on load
        video.play().catch(e => {
            console.log("Autoplay prevented:", e);
        });

        // Failsafe: Check every second if video is paused, and force play
        setInterval(() => {
            if (video.paused) {
                video.play();
            }
        }, 1000);
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            // Close others (optional, for accordion behavior vs toggle behavior)
            accordions.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // If we want to trigger animations on scroll instead of load
    // Currently using simple CSS animations on load for Hero, 
    // but could expand this for sections below the fold.
});
