document.addEventListener('DOMContentLoaded', function() {

    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const mouse = {
            x: null,
            y: null,
            radius: (canvas.height / 150) * (canvas.width / 150)
        };

        window.addEventListener('mousemove', function(event) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });
        
        window.addEventListener('mouseout', function(){
            mouse.x = undefined;
            mouse.y = undefined;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(61, 64, 91, 0.4)'; // Dark Slate Grey particles
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * (canvas.width - size * 2) + size * 2);
                let y = (Math.random() * (canvas.height - size * 2) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    
                    if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                        opacityValue = 1 - (distance / 25000);
                        ctx.strokeStyle = 'rgba(224, 122, 95, ' + opacityValue + ')'; // Terracotta lines
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        window.addEventListener('resize', function() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            mouse.radius = (canvas.height / 150) * (canvas.width / 150);
            init();
        });

        init();
        animate();
    }
});
// --- Orbiting Icons Animation ---
document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.animation-wrapper');
    if (wrapper) {
        const icons = document.querySelectorAll('.orbit-icon');
        let angle = 0;
        
        function animateIcons() {
            const radius1 = wrapper.offsetWidth * 0.25; // Inner circle
            const radius2 = wrapper.offsetWidth * 0.375; // Outer circle
            
            // Assign radius and starting position to each icon
            const positions = [
                { el: icons[0], radius: radius1, offset: 0 },
                { el: icons[1], radius: radius2, offset: Math.PI * 0.5 },
                { el: icons[2], radius: radius1, offset: Math.PI },
                { el: icons[3], radius: radius2, offset: Math.PI * 1.5 },
                { el: icons[4], radius: radius1, offset: Math.PI * 0.75 },
                { el: icons[5], radius: radius2, offset: Math.PI * 0.25 },
                { el: icons[6], radius: radius2, offset: Math.PI * 1.25 }, // AI
                { el: icons[7], radius: radius1, offset: Math.PI * 1.75 }  // Data Science
            ];

            positions.forEach(pos => {
                if (pos.el) {
                    const centerX = wrapper.offsetWidth / 2 - pos.el.offsetWidth / 2;
                    const centerY = wrapper.offsetHeight / 2 - pos.el.offsetHeight / 2;
                    
                    // Calculate new position using trigonometry
                    pos.el.style.left = centerX + pos.radius * Math.cos(angle + pos.offset) + 'px';
                    pos.el.style.top = centerY + pos.radius * Math.sin(angle + pos.offset) + 'px';
                }
            });

            angle += 0.005; // He animation chi speed ahe
            requestAnimationFrame(animateIcons);
        }

        // Start the animation
        animateIcons();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.animation-wrapper');
    if (wrapper) {
        const icons = document.querySelectorAll('.orbit-icon');
        let angle = 0; // Animation start angle
        
        function animateOrbits() {
            // Circle 1 cha radius (size)
            const radius1 = wrapper.offsetWidth * 0.35; 
            // Circle 2 cha radius (size)
            const radius2 = wrapper.offsetWidth * 0.50;
            
            const centerX = wrapper.offsetWidth / 2;
            const centerY = wrapper.offsetHeight / 2;
            
            // Pratek icon la tyachya position var firavne
            icons.forEach((icon, index) => {
                let currentRadius, angleOffset;

                // Icons na veglya circles var aani veglya jagi thevne
                if (index < 3) { // Pahile 3 icons chotya circle var
                    currentRadius = radius1;
                    angleOffset = (index * 2 * Math.PI) / 3;
                } else { // Pudhche 3 icons mothy circle var
                    currentRadius = radius2;
                    angleOffset = ( (index - 3) * 2 * Math.PI) / 3 + Math.PI / 6; // Thoda offset
                }
                
                const iconX = centerX - (icon.offsetWidth / 2) + currentRadius * Math.cos(angle + angleOffset);
                const iconY = centerY - (icon.offsetHeight / 2) + currentRadius * Math.sin(angle + angleOffset);
                
                icon.style.left = `${iconX}px`;
                icon.style.top = `${iconY}px`;
            });

            angle += 0.005; // He animation chi speed ahe. Kami kelyas slow hoil.
            
            // Animation la satat chalu thevnyasathi
            requestAnimationFrame(animateIcons);
        }

        // Animation suru karne
        animateIcons();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('video-player');

    if (videoPlayer) {
        videoPlayer.addEventListener('click', function() {
            const videoId = this.querySelector('.play-button').dataset.videoId;
            
            // Iframe आणि wrapper तयार करणे
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            
            const responsiveWrapper = document.createElement('div');
            responsiveWrapper.classList.add('video-responsive-wrapper');
            responsiveWrapper.appendChild(iframe);

            // Thumbnail काढून iframe जोडणे
            this.innerHTML = '';
            this.appendChild(responsiveWrapper);
            this.style.cursor = 'default';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Enquiry Modal Logic ---
    const enquiryModal = document.getElementById('enquiryModal');
    const closeBtn = document.querySelector('#enquiryModal .close-btn');

    // Function to open the modal
    function openEnquiryModal() {
        if (enquiryModal) {
            enquiryModal.style.display = 'block';
        }
    }

    // Function to close the modal
    function closeEnquiryModal() {
        if (enquiryModal) {
            enquiryModal.style.display = 'none';
        }
    }

    // Show modal on every refresh, after a 2-second delay
setTimeout(openEnquiryModal, 2000); // 2000ms = 2 seconds

    // Event listeners to close the modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeEnquiryModal);
    }
    window.addEventListener('click', function(event) {
        if (event.target == enquiryModal) {
            closeEnquiryModal();
        }
    });
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeEnquiryModal();
        }
    });

    // --- (Your other JS code like particle animation will be here) ---

});

// --- Drag-to-Scroll for Course Carousels ---
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.course-carousel');

    carousels.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all the "Start Course" buttons
    const flipButtons = document.querySelectorAll('.flip-btn');
    
    // Get all the "Back" buttons
    const flipBackButtons = document.querySelectorAll('.flip-back-btn');

    // Add click event to all "Start Course" buttons
    flipButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent .course-card and add the 'is-flipped' class
            const courseCard = this.closest('.course-card');
            courseCard.classList.add('is-flipped');
        });
    });

    // Add click event to all "Back" buttons
    flipBackButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent .course-card and remove the 'is-flipped' class
            const courseCard = this.closest('.course-card');
            courseCard.classList.remove('is-flipped');
        });
    });

});

    var swiper = new Swiper('.success-slider', {
        // --- महत्त्वाचे बदल इथे आहेत ---
        loop: true,
        centeredSlides: true, // यामुळे मधली स्लाईड नेहमी active राहील
        
        slidesPerView: 1, // मोबाईलसाठी १ स्लाईड
        spaceBetween: 10,
        
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        
        // Responsive Breakpoints
        breakpoints: {
            // Tablet साठी
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // Desktop साठी
            992: {
                slidesPerView: 3, // ३ स्लाईड्स दिसतील
                spaceBetween: 30,
            }
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Intersection Observer to start animation when section is visible
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if the stats section is in view
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let current = 0;
                    const increment = Math.ceil(target / 100); // Adjust speed by changing 100

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            // Ensure we don't go over the target
                            if (current > target) {
                                current = target;
                            }
                            counter.innerText = current + '+';
                            setTimeout(updateCounter, 20); // Adjust animation smoothness
                        } else {
                            counter.innerText = target + '+';
                        }
                    };

                    updateCounter();
                });

                // Stop observing once the animation has started
                observer.unobserve(statsSection);
            }
        });
    }, {
        threshold: 0.5 // Start when 50% of the section is visible
    });

    // Start observing the section
    observer.observe(statsSection);

    // --- WhatsApp Form Submission ---
    document.getElementById('whatsapp-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission

        // Your WhatsApp number (with country code, without '+')
        const whatsappNumber = '917796144920';

        // Get values from the form fields
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const course = document.getElementById('course').value;
        const message = document.getElementById('message').value;

        // Create the message text
        const messageText = `Hello, I would like to enquire about a course.\n\n` +
            `*Name:* ${name}\n` +
            `*Contact:* ${contact}\n` +
            `*Course:* ${course}\n` +
            `*Message:* ${message}`;

        // Encode the message for a URL
        const encodedMessage = encodeURIComponent(messageText);

        // Create the WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open the URL in a new tab
        window.open(whatsappURL, '_blank');
    });
    
    // --- WhatsApp Form Submission for MODAL ---
    document.getElementById('whatsapp-modal-form').addEventListener('submit', function (event) {
        event.preventDefault(); 

        const whatsappNumber = '917796144920';

        // Get values from the MODAL form fields
        const name = document.getElementById('modal-name').value;
        const contact = document.getElementById('modal-contact').value;
        const course = document.getElementById('modal-course').value;
        const message = document.getElementById('modal-message').value;

        const messageText = `Hello, I would like to enquire about a course.\n\n` +
            `*Name:* ${name}\n` +
            `*Contact:* ${contact}\n` +
            `*Course:* ${course}\n` +
            `*Message:* ${message}`;

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    });

    // --- WhatsApp Form Submission for DEMO MODAL ---
    document.getElementById('demo-whatsapp-form').addEventListener('submit', function (event) {
        event.preventDefault(); 
        const whatsappNumber = '917796144920'; // तुमचा नंबर

        const name = document.getElementById('demo-name').value;
        const contact = document.getElementById('demo-contact').value;

        const messageText = `Hello, I would like to book a free demo.\n\n` +
            `*Name:* ${name}\n` +
            `*Contact:* ${contact}`;

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    });

     document.getElementById('whatsappForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        if (!name || !phone || !service || !message) {
            alert('Please fill out all the fields before submitting.');
            return; 
        }

        const officeWhatsappNumber = '917796144920';
        
        const whatsappMessage = 
            `Hello A2Z IT HUB, I have an inquiry:\n\n` +
            `*Name:* ${name}\n` +
            `*Phone:* ${phone}\n` +
            `*Service/Course:* ${service}\n\n` +
            `*Message:*\n${message}`;
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${officeWhatsappNumber}?text=${encodedMessage}`;
        
        const newWindow = window.open(whatsappURL, '_blank');
        
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            alert('POP-UP BLOCKED!\n\nPlease allow pop-ups for this website in your browser settings and try again.');
        } else {
            alert('Form submitted successfully!\n\nPlease check the new tab to send your message on WhatsApp.');
            this.form.reset();
        }
    });
