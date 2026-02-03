document.addEventListener('DOMContentLoaded', () => {
    // Video Setup
    const video = document.getElementById('heroVideo');
    
    if (video) {
        video.addEventListener('loadedmetadata', () => {
            // Start from halfway
            video.currentTime = video.duration / 2;
            video.play().catch(e => {
                console.log("Autoplay prevented:", e);
                // Usually because not muted or user interaction required.
                // We have muted=true so it should auto play in most modern browsers.
            });
        });

        // Loop management manually if needed, or rely on loop attribute
        // If we only want to loop the second half:
        video.addEventListener('timeupdate', () => {
            if (video.currentTime >= video.duration) {
                video.currentTime = video.duration / 2;
                video.play();
            }
        });
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
