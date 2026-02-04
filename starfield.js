const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 150; // Total count of normal stars

// Mouse position for interaction
let mouseX = 0;
let mouseY = 0;

// Resize handling
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}

// Star object
class Star {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5; // Depth factor
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.opacitySpeed = 0.005 + Math.random() * 0.01;
        this.color = Math.random() < 0.15 ? '168, 85, 247' : '255, 255, 255'; // More violet

        // Free flowing random velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.2 + 0.05) * this.z;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
    }

    update() {
        // Move freely
        this.x += this.vx;
        this.y += this.vy;

        // Interaction: slight push away from mouse
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x += (dx / dist) * force * 2;
            this.y += (dy / dist) * force * 2;
        }

        // Twinkle
        this.opacity += this.opacitySpeed;
        if (this.opacity > 0.8 || this.opacity < 0.2) {
            this.opacitySpeed = -this.opacitySpeed;
        }

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.size * this.z * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    // Correct mouse position relative to canvas if needed, but for full screen fixed it's clientX/Y
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Init
resize();
animate();
