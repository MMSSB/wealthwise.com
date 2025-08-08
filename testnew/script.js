document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (testimonials.length > 0) {
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Initialize the first testimonial
        showTestimonial(currentIndex);
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            // Remove active class from all testimonials
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            // Add active class to the current testimonial
            testimonials[index].classList.add('active');
            currentIndex = index;
        }
        
        // Event listeners for previous and next buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                resetAutoSlide();
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                resetAutoSlide();
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            });
            
            // Auto-rotate testimonials every 5 seconds
            function startAutoSlide() {
                autoSlideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(currentIndex);
                }, 5000);
            }
            
            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
            
            startAutoSlide();
        }
    }
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the href is not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile nav if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        navToggle.classList.remove('active');
                        document.body.classList.remove('nav-open');
                    }
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for the fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .testimonial');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load
    
    // Education page category filtering
    const categoryFilters = document.querySelectorAll('.category-filter');
    const educationCards = document.querySelectorAll('.education-card');
    
    if (categoryFilters.length > 0 && educationCards.length > 0) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                categoryFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide cards based on category
                educationCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Features page view toggle
    const viewToggles = document.querySelectorAll('[data-view]');
    const featureItems = document.querySelectorAll('.feature-item');
    
    if (viewToggles.length > 0 && featureItems.length > 0) {
        viewToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Remove active class from all toggles
                viewToggles.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked toggle
                this.classList.add('active');
                
                const view = this.getAttribute('data-view');
                
                // Change layout based on view
                if (view === 'grid') {
                    document.querySelector('.features-detailed').classList.add('grid-view');
                    featureItems.forEach(item => {
                        item.style.display = 'block';
                        item.classList.remove('reverse');
                    });
                } else {
                    document.querySelector('.features-detailed').classList.remove('grid-view');
                    featureItems.forEach((item, index) => {
                        item.style.display = 'grid';
                        if (index % 2 !== 0) {
                            item.classList.add('reverse');
                        }
                    });
                }
            });
        });
    }
    
    // About page timeline navigation
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    const timelineNav = document.querySelector('.timeline-nav');
    
    if (timelineBtns.length > 0 && timelineNav) {
        timelineBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                timelineBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update timeline progress
                const year = this.getAttribute('data-year');
                timelineNav.setAttribute('data-year', year);
            });
        });
    }
    
    // // Contact page FAQ toggles
    // const faqItems = document.querySelectorAll('.faq-item');
    
    // if (faqItems.length > 0) {
    //     faqItems.forEach(item => {
    //         const question = item.querySelector('.faq-question');
    //         const answer = item.querySelector('.faq-answer');
    //         const icon = item.querySelector('.faq-toggle i');
            
    //         question.addEventListener('click', () => {
    //             // Toggle current item
    //             answer.classList.toggle('active');
    //             icon.classList.toggle('fa-plus');
    //             icon.classList.toggle('fa-minus');
                
    //             // Close other items
    //             faqItems.forEach(otherItem => {
    //                 if (otherItem !== item) {
    //                     const otherAnswer = otherItem.querySelector('.faq-answer');
    //                     const otherIcon = otherItem.querySelector('.faq-toggle i');
                        
    //                     otherAnswer.classList.remove('active');
    //                     otherIcon.classList.remove('fa-minus');
    //                     otherIcon.classList.add('fa-plus');
    //                 }
    //             });
    //         });
    //     });
    // }
    
    // // Form submission handling
    // const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation would go here
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message (in a real app, you might want a more elegant solution)
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }
});

// Timeline functionality
const timelineBtns = document.querySelectorAll('.timeline-btn');
const timelineImage = document.getElementById('timeline-image');
const timelineTitle = document.getElementById('timeline-title');
const timelineContent = document.getElementById('timeline-content');

if (timelineBtns.length > 0) {
    timelineBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            timelineBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update timeline content
            const image = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const content = this.getAttribute('data-content');
            
            timelineImage.src = image;
            timelineImage.alt = title;
            timelineTitle.textContent = title;
            timelineContent.textContent = content;
            
            // Update timeline progress position
            const year = this.getAttribute('data-year');
            document.querySelector('.timeline-nav').setAttribute('data-year', year);
        });
    });
}


// Team Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('teamSlider');
    const slides = document.querySelectorAll('.team-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (slider && slides.length > 0) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        let currentIndex = 0;
        let autoSlideInterval = null;
        
        // Update slider position
        function updateSlider() {
            slider.scrollTo({
                left: slides[currentIndex].offsetLeft - slider.offsetLeft,
                behavior: 'smooth'
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }
        
        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }
        
        // Start auto-slide (call this when you want to enable it)
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        // Stop auto-slide (call this when you want to disable it)
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
        
        // Button events
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            // Optional: Reset timer if you want to restart countdown on manual navigation
            // stopAutoSlide();
            // startAutoSlide();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            // Optional: Reset timer if you want to restart countdown on manual navigation
            // stopAutoSlide();
            // startAutoSlide();
        });
        
        // Pause on hover (only if auto-slide is running)
        slider.addEventListener('mouseenter', () => {
            if (autoSlideInterval) stopAutoSlide();
        });
        
        slider.addEventListener('mouseleave', () => {
            if (autoSlideInterval) startAutoSlide();
        });
        
        // To enable auto-slide later (when you need it):
        // startAutoSlide();
        
        // To disable auto-slide:
        // stopAutoSlide();
    }
});

// // Team Slider Functionality
// document.addEventListener('DOMContentLoaded', function() {
//     const slider = document.getElementById('teamSlider');
//     const slides = document.querySelectorAll('.team-slide');
//     const prevBtn = document.querySelector('.slider-prev');
//     const nextBtn = document.querySelector('.slider-next');
//     const dotsContainer = document.querySelector('.slider-dots');
    
//     if (slider && slides.length > 0) {
//         // Create dots
//         slides.forEach((_, index) => {
//             const dot = document.createElement('div');
//             dot.classList.add('slider-dot');
//             if (index === 0) dot.classList.add('active');
//             dot.addEventListener('click', () => {
//                 goToSlide(index);
//             });
//             dotsContainer.appendChild(dot);
//         });
        
//         const dots = document.querySelectorAll('.slider-dot');
//         let currentIndex = 0;
        
//         // Update slider position
//         function updateSlider() {
//             slider.scrollTo({
//                 left: slides[currentIndex].offsetLeft - slider.offsetLeft,
//                 behavior: 'smooth'
//             });
            
//             // Update dots
//             dots.forEach((dot, index) => {
//                 dot.classList.toggle('active', index === currentIndex);
//             });
//         }
        
//         // Go to specific slide
//         function goToSlide(index) {
//             currentIndex = index;
//             updateSlider();
//         }
        
//         // Next slide
//         function nextSlide() {
//             currentIndex = (currentIndex + 1) % slides.length;
//             updateSlider();
//         }
        
//         // Previous slide
//         function prevSlide() {
//             currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//             updateSlider();
//         }
        
//         // Button events
//         if (nextBtn) nextBtn.addEventListener('click', nextSlide);
//         if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
//         // Auto-rotate (optional)
//         // let autoSlide = setInterval(nextSlide, 5000);
        
//         // Pause on hover
//         // slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
//         slider.addEventListener('mouseleave', () => {
//             // autoSlide = setInterval(nextSlide, 5000);
//         });
        
//         // Touch/swipe support
//         let isDown = false;
//         let startX;
//         let scrollLeft;
        
//         slider.addEventListener('mousedown', (e) => {
//             isDown = true;
//             startX = e.pageX - slider.offsetLeft;
//             scrollLeft = slider.scrollLeft;
//             clearInterval(autoSlide);
//         });
        
//         slider.addEventListener('mouseleave', () => {
//             isDown = false;
//             // autoSlide = setInterval(nextSlide, 5000);
//         });
        
//         slider.addEventListener('mouseup', () => {
//             isDown = false;
//             // autoSlide = setInterval(nextSlide, 5000);
//         });
        
//         slider.addEventListener('mousemove', (e) => {
//             if (!isDown) return;
//             e.preventDefault();
//             const x = e.pageX - slider.offsetLeft;
//             const walk = (x - startX) * 2;
//             slider.scrollLeft = scrollLeft - walk;
//         });
        
//         // Touch events for mobile
//         slider.addEventListener('touchstart', (e) => {
//             isDown = true;
//             startX = e.touches[0].pageX - slider.offsetLeft;
//             scrollLeft = slider.scrollLeft;
//             clearInterval(autoSlide);
//         }, { passive: true });
        
//         slider.addEventListener('touchend', () => {
//             isDown = false;
//             // autoSlide = setInterval(nextSlide, 5000);
//         });
        
//         slider.addEventListener('touchmove', (e) => {
//             if (!isDown) return;
//             const x = e.touches[0].pageX - slider.offsetLeft;
//             const walk = (x - startX) * 2;
//             slider.scrollLeft = scrollLeft - walk;
//         }, { passive: true });
//     }
// });