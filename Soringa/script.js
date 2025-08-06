// EmailJS Configuration
(function() {
    emailjs.init("p7_lk9hRpOvYRUt"); // À remplacer par votre User ID EmailJS
})();

// Dark mode detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// WhatsApp purchase functionality
function showNotification(message, isError = false) {
    const notification = document.getElementById('purchase-notification');
    const notificationText = document.getElementById('notification-text');
    notificationText.textContent = message;
    
    // Change color based on message type
    if (isError) {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#10b981';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

function buyProduct(productName, price) {
    // Créer le message pour WhatsApp
    const message = `Bonjour ! Je souhaite acheter ${productName} au prix de ${price}F CFA. Pouvez-vous me confirmer la disponibilité et les modalités de livraison ? Merci !`;
    const whatsappUrl = `https://wa.me/message/IQU67E2PKSYRF1?text=${encodeURIComponent(message)}`;
    
    // Afficher la notification
    showNotification('Redirection vers WhatsApp...');
    
    // Rediriger vers WhatsApp
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000);
}

// Email sending function
function sendEmail(formData) {
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'fabricedaignon@gmail.com'
    };

    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email envoyé avec succès!', response.status, response.text);
            return true;
        }, function(error) {
            console.log('Erreur lors de l\'envoi:', error);
            return false;
        });
}

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.name.trim()) {
        errors.push('Le nom est requis');
    }
    
    if (!formData.email.trim()) {
        errors.push('L\'email est requis');
    } else if (!validateEmail(formData.email.trim())) {
        errors.push('L\'email n\'est pas valide');
    }
    
    if (!formData.subject.trim()) {
        errors.push('Le sujet est requis');
    }
    
    if (!formData.message.trim()) {
        errors.push('Le message est requis');
    }
    
    return errors;
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on links
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Hero slider
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
            heroDots[i].classList.add('bg-green-700');
            heroDots[i].classList.remove('bg-gray-300');
        } else {
            slide.classList.remove('active');
            heroDots[i].classList.remove('bg-green-700');
            heroDots[i].classList.add('bg-gray-300');
        }
    });
}

heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentHeroSlide = index;
        showHeroSlide(currentHeroSlide);
    });
});

setInterval(() => {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}, 5000);

// Testimonial slider
let currentTestimonialSlide = 0;
const testimonialSlider = document.getElementById('testimonial-slider');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonialSlide(index) {
    testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
    
    testimonialDots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('bg-green-700');
            dot.classList.remove('bg-gray-300');
        } else {
            dot.classList.remove('bg-green-700');
            dot.classList.add('bg-gray-300');
        }
    });
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonialSlide = index;
        showTestimonialSlide(currentTestimonialSlide);
    });
});

setInterval(() => {
    currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialDots.length;
    showTestimonialSlide(currentTestimonialSlide);
}, 6000);

// Product option selection
const productOptions = document.querySelectorAll('.product-option');
productOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from siblings
        const siblings = option.parentElement.querySelectorAll('.product-option');
        siblings.forEach(sibling => sibling.classList.remove('selected'));
        
        // Add selected class to clicked option
        option.classList.add('selected');
    });
});

// Buy buttons
const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        
        // Visual feedback
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check mr-2"></i>Redirection...';
        button.classList.add('purchased');
        button.disabled = true;
        
        // Buy product
        buyProduct(productName, productPrice);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('purchased');
            button.disabled = false;
        }, 3000);
    });
});

// Contact form with enhanced email functionality
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
        showNotification(validationErrors.join(', '), true);
        return;
    }
    
    // Show loading state
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
    submitButton.disabled = true;
    contactForm.classList.add('loading');
    
    try {
        // Send email
        const success = await sendEmail(formData);
        return emailjs.send('service_3xep9ic', 'template_d5g6a3k', templateParams)
        
        if (success) {
            showNotification('✅ Message envoyé avec succès ! Nous vous répondrons rapidement.');
            contactForm.reset();
            
            // Add success visual feedback
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('error');
                input.classList.add('success');
            });
            
            // Remove success styling after 3 seconds
            setTimeout(() => {
                inputs.forEach(input => {
                    input.classList.remove('success');
                });
            }, 3000);
            
        } else {
            showNotification('❌ Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.', true);
        }
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('❌ Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.', true);
    } finally {
        // Reset form state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        contactForm.classList.remove('loading');
    }
});

// Real-time form validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        const value = input.value.trim();
        
        if (input.type === 'email' && value) {
            if (validateEmail(value)) {
                input.classList.remove('error');
                input.classList.add('success');
            } else {
                input.classList.remove('success');
                input.classList.add('error');
            }
        } else if (input.required && !value) {
            input.classList.remove('success');
            input.classList.add('error');
        } else if (value) {
            input.classList.remove('error');
            input.classList.add('success');
        }
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error') && input.value.trim()) {
            input.classList.remove('error');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});