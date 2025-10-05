// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const phrases = [
    'AI Enthusiast (I swear I\'m not a bot) 🤖',
    'Piano Music Addict (Einaudi hits different) 🎹',
    'Pizza Lover (Pineapple? We need to talk) 🍕',
    'Professional Crackhead (It\'s a lifestyle) 😜',
    'Debugging at 3AM Champion 🌙',
    'ChatGPT\'s Best Friend 💬'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

// Start typing effect
setTimeout(type, 1000);

// Scroll Reveal Animation with Stagger
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add stagger effect for grid items
            if (entry.target.classList.contains('skill-card') || 
                entry.target.classList.contains('project-card') ||
                entry.target.classList.contains('timeline-item')) {
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            } else {
                entry.target.classList.add('visible');
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, index * 100 + 400);
                }
            }
            
            // Animate stats counter
            if (entry.target.classList.contains('about-text')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe all elements with data-scroll attribute
const scrollElements = document.querySelectorAll('[data-scroll]');
scrollElements.forEach(el => observer.observe(el));

// Stats Counter Animation
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                // For small numbers (like 1 for 1M+), show decimals
                if (target <= 10 && suffix) {
                    stat.textContent = current.toFixed(1) + suffix + '+';
                } else {
                    stat.textContent = Math.floor(current) + suffix + '+';
                }
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + suffix + '+';
            }
        };
        
        updateCounter();
    });
}

// Parallax Effect on Scroll (Throttled)
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Smooth Scroll with Offset for Fixed Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll (Throttled)
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let navbarTicking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    navbarTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        window.requestAnimationFrame(updateNavbar);
        navbarTicking = true;
    }
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Custom cursor removed for performance

// Simplified hover effect for project cards (removed 3D tilt for performance)

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Magnetic cursor effect for buttons with liquid movement
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-6px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // Add liquid effect to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mousemove', (e) => {
            const rect = method.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            method.style.setProperty('--mouse-x', `${x}%`);
            method.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // Initialize background music
    initializeMusic();
});

// Background Music Control with Audio Visualization
let audioContext;
let analyser;
let dataArray;
let animationId;
let isToggling = false;

function initializeMusic() {
    const audio = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    const audioGlow = document.querySelector('.audio-glow');
    
    // Ensure cross-origin for local/served files
    audio.crossOrigin = 'anonymous';
    
    // Set initial volume
    audio.volume = 0.3;
    
    // Start muted (autoplay usually blocked anyway)
    musicToggle.classList.add('muted');
    musicIcon.textContent = '🔇';
    
    // Toggle music on button click (guard against rapid double-clicks)
    musicToggle.addEventListener('click', () => {
        if (isToggling) return;
        isToggling = true;

        if (audio.paused) {
            // Resume AudioContext on user gesture if needed
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume().catch(() => {});
            }
            audio.play().then(() => {
                musicToggle.classList.remove('muted');
                musicIcon.textContent = '🔊';

                // Initialize audio context and start visualization
                if (!audioContext) {
                    setupAudioVisualization(audio);
                }
                startVisualization();
                audioGlow.classList.add('active');
            }).catch(error => {
                // AbortError can happen if play() is interrupted by pause(); ignore gracefully
                console.warn('Audio play was interrupted:', error && error.name ? error.name : error);
            }).finally(() => {
                isToggling = false;
            });
        } else {
            audio.pause();
            musicToggle.classList.add('muted');
            musicIcon.textContent = '🔇';
            stopVisualization();
            audioGlow.classList.remove('active');
            // Allow next toggle after current task queue flush
            setTimeout(() => { isToggling = false; }, 0);
        }
    });
}

// Setup Web Audio API for visualization
function setupAudioVisualization(audio) {
    // Create audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create analyser node
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024; // High resolution to capture all frequency details
    analyser.smoothingTimeConstant = 0.7; // Less smoothing = more reactive to music
    
    // Connect audio element to analyser
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    // Create data array for frequency data
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
}

// Start audio visualization
function startVisualization() {
    const audioGlow = document.querySelector('.audio-glow');
    
    let frameCount = 0;
    let currentScale = 1.5;
    let currentOpacity = 0.5;
    let currentPosX = 12; // Starting X position percentage
    let currentPosY = 50; // Starting Y position percentage
    const smoothingFactor = 0.2; // Balanced for subtle, smooth response
    
    function animate() {
        animationId = requestAnimationFrame(animate);
        
        // Get frequency data
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate intensity across ALL frequencies - capture every detail
        let totalSum = 0;
        let lowSum = 0;
        let midSum = 0;
        let highSum = 0;
        
        const lowEnd = Math.floor(dataArray.length * 0.3);
        const midEnd = Math.floor(dataArray.length * 0.7);
        
        // Analyze all frequency ranges
        for (let i = 0; i < dataArray.length; i++) {
            totalSum += dataArray[i];
            if (i < lowEnd) lowSum += dataArray[i];
            else if (i < midEnd) midSum += dataArray[i];
            else highSum += dataArray[i];
        }
        
        const totalAvg = totalSum / dataArray.length;
        const lowAvg = lowSum / lowEnd;
        const midAvg = midSum / (midEnd - lowEnd);
        const highAvg = highSum / (dataArray.length - midEnd);
        
        // Use overall average for main intensity, boosted for visibility
        let intensity = totalAvg / 20; // More sensitive (was 25)
        intensity = Math.min(1, intensity);
        intensity = Math.pow(intensity, 0.6); // More responsive curve (was 0.8)
        
        // Add peaks detection for dramatic moments
        const peakValue = Math.max(...dataArray);
        const peakIntensity = peakValue / 255;
        intensity = Math.max(intensity, peakIntensity * 0.5); // React to peaks
        
        // Big, visible glow that always reaches to middle of photo
        const highFreqNorm = highAvg / 255;
        
        const minScale = 1.5;
        const maxScale = 2.0;
        const targetScale = minScale + (intensity * (maxScale - minScale));
        
        // Always stretch to middle of photo, extends further on high frequencies
        const minScaleX = 2.2; // Base stretch already reaches to photo
        const maxScaleX = 3.8; // High freq extends even further
        const targetScaleX = minScaleX + (highFreqNorm * (maxScaleX - minScaleX));
        
        const minOpacity = 0.5;
        const maxOpacity = 0.75;
        const targetOpacity = minOpacity + (intensity * (maxOpacity - minOpacity));
        
        // Smooth interpolation for fluid motion
        currentScale += (targetScale - currentScale) * smoothingFactor;
        currentOpacity += (targetOpacity - currentOpacity) * smoothingFactor;
        
        // Apply smooth transformations - stretch from left edge across to photo
        audioGlow.style.transform = `translate(0%, -50%) scaleX(${(currentScale * targetScaleX).toFixed(3)}) scaleY(${currentScale.toFixed(3)})`;
        audioGlow.style.opacity = currentOpacity.toFixed(3);
        
        // Subtle, elegant colors matching the black/white theme
        const freqIntensity = (lowAvg + midAvg + highAvg) / (255 * 3);
        
        // Soft grayscale with subtle warm/cool tints based on frequency
        const r = Math.floor(200 + (freqIntensity * 30));
        const g = Math.floor(200 + (freqIntensity * 30));
        const b = Math.floor(205 + (freqIntensity * 25));
        
        // Subtle position variation based on frequency changes
        const lowFreq = lowAvg / 255;
        const midFreq = midAvg / 255;
        
        // Random-like variation based on frequencies (changes with music)
        const targetPosX = 10 + (lowFreq * 5) + (Math.sin(frameCount * 0.01) * 2); // 10-17% range
        const targetPosY = 48 + (midFreq * 5) + (Math.cos(frameCount * 0.015) * 3); // 48-56% range
        
        // Smooth position transitions
        currentPosX += (targetPosX - currentPosX) * 0.08;
        currentPosY += (targetPosY - currentPosY) * 0.08;
        
        frameCount++;
        
        // Subtle gradient with moving position
        const alpha1 = 0.38;
        const alpha2 = 0.24;
        const alpha3 = 0.14;
        
        audioGlow.style.background = `radial-gradient(ellipse 50% 70% at ${currentPosX.toFixed(1)}% ${currentPosY.toFixed(1)}%, 
            rgba(${r}, ${g}, ${b}, ${alpha1}) 0%, 
            rgba(${r-5}, ${g-5}, ${b-3}, ${alpha2}) 35%, 
            rgba(${r-10}, ${g-10}, ${b-5}, ${alpha3}) 60%, 
            transparent 80%)`;
    }
    
    animate();
}

// Stop audio visualization
function stopVisualization() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Intersection observer for section titles
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// Scroll progress indicator (Throttled)
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #888888, #ffffff);
    z-index: 9999;
    width: 0%;
`;
document.body.appendChild(progressBar);

let progressTicking = false;

function updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
    progressTicking = false;
}

window.addEventListener('scroll', () => {
    if (!progressTicking) {
        window.requestAnimationFrame(updateProgress);
        progressTicking = true;
    }
});

