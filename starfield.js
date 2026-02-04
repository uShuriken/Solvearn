const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 200; // Total count of normal stars

// Mouse position for parallax
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
        this.reset();
        // Initial random y position
        this.y = Math.random() * height;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -10; // Start just above screen
        this.z = Math.random() * 2 + 0.5; // Depth factor (speed & size)
        this.opacity = Math.random() * 0.5 + 0.3;
        this.opacitySpeed = 0.005 + Math.random() * 0.01;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() < 0.1 ? '168, 85, 247' : '255, 255, 255'; // 10% violet
    }

    update() {
        // Move down based on depth
        this.y += this.z * 0.3;

        // Parallax effect (subtle movement opposite to mouse)
        // Ensure mouseX/Y are initialized (usually center of screen if not moved)
        const centerX = width / 2;
        const centerY = height / 2;

        let moveX = (mouseX - centerX) * 0.00005 * this.z;
        let moveY = (mouseY - centerY) * 0.00005 * this.z;

        this.x += moveX;
        this.y += moveY;

        // Twinkle
        this.opacity += this.opacitySpeed;
        if (this.opacity > 0.8 || this.opacity < 0.2) {
            this.opacitySpeed = -this.opacitySpeed;
        }

        // Reset if out of bounds
        if (this.y > height) {
            this.reset();
            this.y = -10;
        }
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.size * this.z * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Shooting Star
class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height / 2); // Start in top half
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.size = Math.random() * 1 + 0.1;
        // Angle falling down-right randomly
        this.waitTime = Math.random() * 300; // Frames to wait before shooting
        this.active = false;
    }

    update() {
        if (this.waitTime > 0) {
            this.waitTime--;
            return;
        } else {
            this.active = true;
        }

        this.x += this.speed;
        this.y += this.speed;

        if (this.x > width || this.y > height) {
            this.active = false;
            this.reset();
        }
    }

    draw() {
        if (!this.active) return;
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + Math.max(0, (1 - this.y / height)) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.len, this.y - this.len);
        ctx.stroke();
    }
}

let shootingStars = [];

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    // reset shooting stars
    shootingStars = [];
    for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw background gradient (now handled in CSS, but canvas is transparent)
    // Actually, user wants "better animation". 
    // We can just draw stars on transparent canvas over the CSS black gradient.

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    shootingStars.forEach(s => {
        s.update();
        s.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Init
resize(); // also inits stars
mouseX = width / 2;
mouseY = height / 2;
animate();
