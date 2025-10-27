// Embassy Website JavaScript - Multi-page Version

// Apply language as early as possible - even before DOM is ready
(function() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'cs';
    
    // Apply language class for initial styling but NOT direction yet
    document.documentElement.classList.add(`init-lang-${savedLang}`);
    
    // Only apply font immediately for Arabic, direction will be applied after translation
    if (savedLang === 'ar') {
        document.documentElement.style.fontFamily = 'Arial, "Noto Sans Arabic", sans-serif';
    }
    // Direction will be applied later to prevent visual jumping
})();

// Apply language as early as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        document.body.classList.add('lang-loading');
        applyInitialLanguageEarly();
    });
} else {
    document.body.classList.add('lang-loading');
    applyInitialLanguageEarly();
}

document.addEventListener('DOMContentLoaded', function() {
    // Add temporary loading class to prevent flash of untranslated content
    document.body.classList.add('lang-loading');
    
    // Initialize all components
    initMobileMenu();
    initLanguageSwitcher();
    initContactForms();
    initScrollAnimation();
    initActiveNavigation();
    initNewsFilter();
    initNewsletterForm();
    initWebsiteImages();
    
    // Initialize hero slideshow on homepage
    const currentPage = getCurrentPage();
    if (currentPage === 'home') {
        initHeroSlideshow();
    }
    
    // Page-specific initializations
    if (currentPage === 'news') {
        initNewsPage();
    }
});

// Listen for components loaded event and reinitialize language switcher
document.addEventListener('componentsLoaded', function() {
    console.log('Components loaded - reinitializing language switcher');
    
    // Reinitialize language switcher for dynamically loaded header
    if (typeof initLanguageSwitcher === 'function') {
        initLanguageSwitcher();
    }
});

// Apply language before page is fully loaded
function applyInitialLanguageEarly() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'cs';
    
    // If Czech, remove loading class immediately
    if (savedLang === 'cs') {
        document.body.classList.add(`lang-${savedLang}`);
        document.body.classList.remove('lang-loading');
        return;
    }
    
    // For other languages, try to apply immediately if translations exist
    if (typeof translations !== 'undefined' && translations[savedLang]) {
        const config = languageConfig && languageConfig[savedLang] ? languageConfig[savedLang] : {
            direction: savedLang === 'ar' ? 'rtl' : 'ltr',
            fontFamily: savedLang === 'ar' ? 'Arial, "Noto Sans Arabic", sans-serif' : 'inherit'
        };
        
        // FIRST: Apply translations to already rendered elements
        const translatableElements = document.querySelectorAll('[data-translate]');
        const currentTranslations = translations[savedLang];
        
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentTranslations[key]) {
                // Handle different element types
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = currentTranslations[key];
                } else if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = currentTranslations[key];
                } else if (element.hasAttribute('title')) {
                    element.title = currentTranslations[key];
                } else if (element.hasAttribute('aria-label')) {
                    element.setAttribute('aria-label', currentTranslations[key]);
                } else {
                    // For multiline text, handle line breaks
                    if (currentTranslations[key].includes('\n')) {
                        // Special handling for embassy_name
                        if (key === 'embassy_name') {
                            const parts = currentTranslations[key].split('\n');
                            element.innerHTML = `${parts[0]}<br><span class="country-name">${parts[1]}</span>`;
                        } else {
                            element.innerHTML = currentTranslations[key].replace(/\n/g, '<br>');
                        }
                    } else {
                        element.textContent = currentTranslations[key];
                    }
                }
            }
        });
        
        // THEN: Apply layout changes after translations are done
        setTimeout(() => {
            document.documentElement.dir = config.direction;
            document.documentElement.style.fontFamily = config.fontFamily;
            document.body.classList.add(`lang-${savedLang}`);
            
            // Remove loading class and show content
            document.body.classList.remove('lang-loading');
        }, 100);
    } else {
        // If translations not ready, set up faster polling
        let attempts = 0;
        const quickCheck = setInterval(() => {
            attempts++;
            if (typeof translations !== 'undefined' && translations[savedLang]) {
                clearInterval(quickCheck);
                
                const config = languageConfig && languageConfig[savedLang] ? languageConfig[savedLang] : {
                    direction: savedLang === 'ar' ? 'rtl' : 'ltr',
                    fontFamily: savedLang === 'ar' ? 'Arial, "Noto Sans Arabic", sans-serif' : 'inherit'
                };
                
                // Apply translations first
                const translatableElements = document.querySelectorAll('[data-translate]');
                const currentTranslations = translations[savedLang];
                
                translatableElements.forEach(element => {
                    const key = element.getAttribute('data-translate');
                    if (currentTranslations[key]) {
                        // Handle different element types
                        if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                            element.value = currentTranslations[key];
                        } else if (element.tagName === 'INPUT' && element.placeholder) {
                            element.placeholder = currentTranslations[key];
                        } else if (element.hasAttribute('title')) {
                            element.title = currentTranslations[key];
                        } else if (element.hasAttribute('aria-label')) {
                            element.setAttribute('aria-label', currentTranslations[key]);
                        } else {
                            // For multiline text, handle line breaks
                            if (currentTranslations[key].includes('\n')) {
                                // Special handling for embassy_name
                                if (key === 'embassy_name') {
                                    const parts = currentTranslations[key].split('\n');
                                    element.innerHTML = `${parts[0]}<br><span class="country-name">${parts[1]}</span>`;
                                } else {
                                    element.innerHTML = currentTranslations[key].replace(/\n/g, '<br>');
                                }
                            } else {
                                element.textContent = currentTranslations[key];
                            }
                        }
                    }
                });
                
                // Then apply layout changes
                setTimeout(() => {
                    document.documentElement.dir = config.direction;
                    document.documentElement.style.fontFamily = config.fontFamily;
                    document.body.classList.add(`lang-${savedLang}`);
                    document.body.classList.remove('lang-loading');
                }, 100);
            } else if (attempts > 100) {
                // Give up after 100 attempts (5 seconds)
                clearInterval(quickCheck);
                document.body.classList.remove('lang-loading');
            }
        }, 50);
    }
}

// Get current page from URL
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page === 'index' || page === '' ? 'home' : page;
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = navMenu.classList.contains('active') 
                    ? `rotate(${index === 0 ? '45deg' : index === 1 ? '0deg' : '-45deg'}) translate(${index === 1 ? '100px' : '0px'}, ${index === 0 ? '6px' : index === 2 ? '-6px' : '0px'})`
                    : 'none';
                span.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
            });
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Language Switcher
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
            
            // Only change language and show notification if it's actually different
            if (selectedLang !== currentLang) {
                // Remove active class from all buttons
                langButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Apply language change with notification
                changeLanguage(selectedLang, true);
                
                // Store language preference
                localStorage.setItem('selectedLanguage', selectedLang);
            }
        });
    });
    
    // Apply saved language immediately when page loads
    applyInitialLanguage();
}

// Apply initial language without delay
function applyInitialLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'cs';
    
    // If Czech is selected, remove loading immediately
    if (savedLang === 'cs') {
        document.body.classList.remove('lang-loading');
        return;
    }
    
    // For other languages, wait for translations but check more frequently
    waitForTranslations(() => {
        const langButtons = document.querySelectorAll('.lang-btn');
        const savedLangBtn = document.querySelector(`[data-lang="${savedLang}"]`);
        
        if (savedLangBtn && langButtons.length > 0) {
            langButtons.forEach(btn => btn.classList.remove('active'));
            savedLangBtn.classList.add('active');
            
            // Apply the saved language WITHOUT notification
            changeLanguage(savedLang, false);
        } else {
            // Fallback - remove loading class anyway
            document.body.classList.remove('lang-loading');
        }
    }, 100); // 100 max retries with fast checking
}

// Change Language Function
function changeLanguage(langCode, showNotificationFlag = true) {
    // Check if translations are available
    if (typeof translations === 'undefined') {
        console.warn('Translations not available - language change skipped');
        if (showNotificationFlag) {
            const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
            const errorMsg = currentLang === 'en' ? 'Translations are not available on this page' : 
                           currentLang === 'ar' ? 'الترجمات غير متوفرة على هذه الصفحة' : 
                           'Překlady nejsou dostupné na této stránce';
            showNotification(errorMsg, 'error');
        }
        return;
    }
    
    if (!translations[langCode]) {
        console.warn(`Translation not found for language: ${langCode}`);
        if (showNotificationFlag) {
            const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
            const errorMsg = translations[currentLang] ? translations[currentLang].language_not_available : 'Překlad pro tento jazyk není k dispozici';
            showNotification(errorMsg, 'error');
        }
        return;
    }
    
    // HIDE content during language transition to prevent visual jumping
    document.body.classList.add('lang-switching');
    
    const currentTranslations = translations[langCode];
    const config = languageConfig && languageConfig[langCode] ? languageConfig[langCode] : {
        direction: langCode === 'ar' ? 'rtl' : 'ltr',
        fontFamily: langCode === 'ar' ? 'Arial, "Noto Sans Arabic", sans-serif' : 'inherit'
    };
    
    // Apply ALL changes simultaneously while content is hidden
    requestAnimationFrame(() => {
        // Apply text direction and font
        document.documentElement.dir = config.direction;
        document.documentElement.style.fontFamily = config.fontFamily;
        
        // Add language class to body for CSS targeting
        document.body.className = document.body.className.replace(/lang-\w+/g, '');
        document.body.classList.add(`lang-${langCode}`);
        
        // Translate all text content
        const translatableElements = document.querySelectorAll('[data-translate]');
        
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentTranslations[key]) {
                // Handle different element types
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = currentTranslations[key];
                } else if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = currentTranslations[key];
                } else if (element.hasAttribute('title')) {
                    element.title = currentTranslations[key];
                } else if (element.hasAttribute('aria-label')) {
                    element.setAttribute('aria-label', currentTranslations[key]);
                } else {
                    // For multiline text, handle line breaks
                    if (currentTranslations[key].includes('\n')) {
                        // Special handling for embassy_name
                        if (key === 'embassy_name') {
                            const parts = currentTranslations[key].split('\n');
                            element.innerHTML = `${parts[0]}<br><span class="country-name">${parts[1]}</span>`;
                        } else {
                            element.innerHTML = currentTranslations[key].replace(/\n/g, '<br>');
                        }
                    } else {
                        element.textContent = currentTranslations[key];
                    }
                }
            }
        });
        
        // Show content again after all changes are applied
        setTimeout(() => {
            document.body.classList.remove('lang-switching');
        }, 100);
    });
    
    // Update page title based on current page
    updatePageTitle(langCode);
    
    // Remove loading class once language is applied
    document.body.classList.remove('lang-loading');
    
    // Regenerate hero slideshow with new translations if on home page
    const currentPage = getCurrentPage();
    if (currentPage === 'home' && typeof initHeroSlideshow === 'function') {
        setTimeout(() => {
            initHeroSlideshow();
        }, 100);
    }
    
    // Show success notification only when explicitly requested
    if (showNotificationFlag) {
        // Get the correct language name based on the selected language
        let langName;
        switch(langCode) {
            case 'cs':
                langName = currentTranslations.language_czech || 'Čeština';
                break;
            case 'en':
                langName = currentTranslations.language_english || 'English';
                break;
            case 'ar':
                langName = currentTranslations.language_arabic || 'العربية';
                break;
            default:
                langName = langCode;
        }
        showNotification(`${currentTranslations.language_changed || 'Language changed to'}: ${langName}`, 'success');
    }
    
    console.log(`Language changed to: ${langCode}`);
}

// Check if translations are loaded
function waitForTranslations(callback, maxRetries = 20) {
    let retries = 0;
    
    function check() {
        if (typeof translations !== 'undefined') {
            console.log('Translations found, executing callback');
            callback();
        } else if (retries < maxRetries) {
            retries++;
            console.log(`Waiting for translations... attempt ${retries}/${maxRetries}`);
            // Faster checking for initial language load (50ms), normal for others (100ms)
            const delay = maxRetries > 30 ? 50 : 100;
            setTimeout(check, delay);
        } else {
            console.error('Translations failed to load after maximum retries');
            console.warn('Skipping translation initialization - website will work in Czech only');
            // Don't show error notification immediately, as it might be intentional
            // showNotification('Chyba při načítání překladů', 'error');
        }
    }
    
    check();
}

// Update page title based on current page and language
function updatePageTitle(langCode) {
    const currentTranslations = translations[langCode];
    const currentPage = getCurrentPage();
    
    let pageTitle = '';
    
    switch(currentPage) {
        case 'home':
        case 'index':
            pageTitle = currentTranslations.embassy_name;
            break;
        case 'visa':
            pageTitle = `${currentTranslations.nav_visa} - ${currentTranslations.embassy_name}`;
            break;
        case 'services':
            pageTitle = `${currentTranslations.nav_services} - ${currentTranslations.embassy_name}`;
            break;
        case 'education':
            pageTitle = `${currentTranslations.nav_education} - ${currentTranslations.embassy_name}`;
            break;
        case 'embassy':
            pageTitle = `${currentTranslations.nav_embassy} - ${currentTranslations.embassy_name}`;
            break;
        case 'news':
            pageTitle = `${currentTranslations.nav_news} - ${currentTranslations.embassy_name}`;
            break;
        case 'contact':
            pageTitle = `${currentTranslations.nav_contact} - ${currentTranslations.embassy_name}`;
            break;
        default:
            pageTitle = currentTranslations.embassy_name;
    }
    
    document.title = pageTitle;
}

// Contact Forms Handling (supports multiple forms)
function initContactForms() {
    const forms = document.querySelectorAll('form[id$="Form"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

function handleFormSubmission(form) {
    // Get form data
    const formData = new FormData(form);
    const requiredFields = form.querySelectorAll('[required]');
    
    // Get current language for messages
    const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
    const msgs = translations && translations[currentLang] ? translations[currentLang] : {
        form_required_fields: 'Prosím vyplňte všechna povinná pole.',
        form_valid_email: 'Prosím zadejte platnou emailovou adresu.',
        form_sending: 'Odesílání...',
        form_success: 'Vaše zpráva byla úspěšně odeslána. Odpovíme vám co nejdříve.'
    };
    
    // Basic validation
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            setTimeout(() => field.classList.remove('error'), 3000);
        }
    });
    
    if (!isValid) {
        showNotification(msgs.form_required_fields, 'error');
        return;
    }
    
    // Email validation if email field exists
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !isValidEmail(emailField.value)) {
        showNotification(msgs.form_valid_email, 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = msgs.form_sending;
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification(msgs.form_success, 'success');
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Get current language for messages
            const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
            const msgs = translations && translations[currentLang] ? translations[currentLang] : {
                newsletter_email_required: 'Prosím zadejte emailovou adresu.',
                form_valid_email: 'Prosím zadejte platnou emailovou adresu.',
                newsletter_subscribing: 'Přihlašování...',
                newsletter_success: 'Úspěšně jste se přihlásili k odběru našeho newsletteru!'
            };
            
            if (!email) {
                showNotification(msgs.newsletter_email_required, 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification(msgs.form_valid_email, 'error');
                return;
            }
            
            // Show loading
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = msgs.newsletter_subscribing;
            submitBtn.disabled = true;
            
            // Simulate subscription
            setTimeout(() => {
                showNotification(msgs.newsletter_success, 'success');
                emailInput.value = '';
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// News Filter (for news page)
function initNewsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter news items
            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// News Page Specific Functions
function initNewsPage() {
    // Add any news page specific functionality here
    initArchiveLinks();
}

function initArchiveLinks() {
    const yearLinks = document.querySelectorAll('.year-link');
    const categoryLinks = document.querySelectorAll('.category-link');
    
    yearLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            yearLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const year = this.textContent;
            
            // Get current language for messages
            const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
            const msgs = translations && translations[currentLang] ? translations[currentLang] : {
                news_filter_year: 'Zobrazení zpráv za rok'
            };
            
            showNotification(`${msgs.news_filter_year} ${year}`, 'success');
        });
    });
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.trim();
            
            // Get current language for messages
            const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
            const msgs = translations && translations[currentLang] ? translations[currentLang] : {
                news_filter_category: 'Zobrazení zpráv kategorie:'
            };
            
            showNotification(`${msgs.news_filter_category} ${category}`, 'success');
        });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification messages
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? 'var(--libya-green)' : 'var(--libya-red)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Style close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll Animation
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animatedElements = document.querySelectorAll('.section, .service-card, .news-item, .visa-card, .education-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Active Navigation Highlighting (for current page)
function initActiveNavigation() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href) {
            const linkPage = href.split('.')[0];
            if ((currentPage === 'home' && linkPage === 'index') || 
                (currentPage !== 'home' && linkPage === currentPage)) {
                link.classList.add('active');
            }
        }
    });
}

// Add form field error styling and language loading
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: var(--libya-red) !important;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    /* Prevent flash of untranslated content */
    body.lang-loading [data-translate] {
        visibility: hidden !important;
    }
    
    body:not(.lang-loading) [data-translate] {
        visibility: visible;
    }
    
    /* Hide entire content while loading non-Czech language */
    html.init-lang-en body.lang-loading,
    html.init-lang-ar body.lang-loading {
        visibility: hidden;
    }
    
    html.init-lang-en body:not(.lang-loading),
    html.init-lang-ar body:not(.lang-loading) {
        visibility: visible;
    }
    
    /* For Czech, show immediately */
    html.init-lang-cs body {
        visibility: visible !important;
    }
    
    /* Hide content during language switching to prevent visual jumping */
    body.lang-switching {
        opacity: 0 !important;
        transition: opacity 0.1s ease;
        pointer-events: none;
    }
    
    body:not(.lang-switching) {
        opacity: 1;
        transition: opacity 0.15s ease;
        pointer-events: auto;
    }
`;
document.head.appendChild(style);

// Utility Functions

// Throttle function for performance
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Window resize handler
window.addEventListener('resize', throttle(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && mobileMenuToggle) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            // Reset hamburger animation
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
}, 250));

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', throttle(function() {
    let scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (window.pageYOffset > 300) {
        if (!scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'scroll-top-btn';
            scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, var(--libya-green), var(--libya-black));
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            `;
            
            scrollTopBtn.addEventListener('click', scrollToTop);
            scrollTopBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            });
            scrollTopBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            });
            
            document.body.appendChild(scrollTopBtn);
        }
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
    } else if (scrollTopBtn) {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
}, 100));

// Initialize loading animation on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.service-card, .visa-card, .education-card, .news-item');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loading');
        }, index * 100);
    });
});

// Hero Slideshow Functionality
function initHeroSlideshow() {
    // Check if heroSlides data is available
    if (typeof heroSlides === 'undefined') {
        console.warn('Hero slides data not found');
        return;
    }
    
    const slidesContainer = document.getElementById('slidesContainer');
    const slideIndicators = document.getElementById('slideIndicators');
    const prevButton = document.getElementById('slidePrev');
    const nextButton = document.getElementById('slideNext');
    
    if (!slidesContainer || !slideIndicators || !prevButton || !nextButton) {
        console.warn('Slideshow elements not found');
        return;
    }
    
    let currentSlide = 0;
    let isTransitioning = false;
    
    // Generate slides HTML
    function generateSlides() {
        slidesContainer.innerHTML = '';
        slideIndicators.innerHTML = '';
        
        // Get current language for translations
        const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
        const t = translations && translations[currentLang] ? translations[currentLang] : {};
        
        heroSlides.forEach((slide, index) => {
            // Create slide element
            const slideElement = document.createElement('div');
            slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
            
            // Always start with fallback background
            slideElement.classList.add('default-bg');
            
            // Try to load the background image
            const img = new Image();
            img.onload = function() {
                slideElement.style.backgroundImage = `url('${slide.backgroundImage}')`;
                slideElement.classList.remove('default-bg');
            };
            img.onerror = function() {
                // Keep the default background if image fails to load
                console.log(`Failed to load image: ${slide.backgroundImage}`);
            };
            img.src = slide.backgroundImage;
            
            // Get translated content or fall back to original
            const titleKey = `hero_slide${slide.id}_title`;
            const subtitleKey = `hero_slide${slide.id}_subtitle`;
            const ctaKey = `hero_slide${slide.id}_cta`;
            
            const title = t[titleKey] || slide.title;
            const subtitle = t[subtitleKey] || slide.subtitle;
            const ctaText = t[ctaKey] || slide.ctaText;
            
            slideElement.innerHTML = `
                <div class="slide-content">
                    <h2>${title}</h2>
                    <p>${subtitle}</p>
                    ${slide.showCtaButton !== false ? `<a href="${slide.ctaLink}" class="slide-cta">${ctaText}</a>` : ''}
                </div>
            `;
            
            slidesContainer.appendChild(slideElement);
            
            // Create indicator with text
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            
            // Create text content for indicator
            const indicatorText = document.createElement('span');
            indicatorText.className = 'indicator-text';
            indicatorText.textContent = subtitle;
            
            indicator.appendChild(indicatorText);
            
            // Add important icon if slide is marked as important
            if (slide.important) {
                const importantIcon = document.createElement('div');
                importantIcon.className = 'indicator-important';
                importantIcon.innerHTML = '<i class="fas fa-exclamation"></i>';
                const importantLabel = t['important_message'] || 'Důležitá zpráva';
                importantIcon.setAttribute('aria-label', importantLabel);
                indicator.appendChild(importantIcon);
            }
            
            indicator.addEventListener('click', () => goToSlide(index));
            slideIndicators.appendChild(indicator);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Prevent multiple rapid transitions
        if (index === currentSlide || isTransitioning) return;
        
        isTransitioning = true;
        
        const slides = slidesContainer.querySelectorAll('.slide');
        const indicators = slideIndicators.querySelectorAll('.indicator');
        
        // Remove active class from all slides first
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            indicator.setAttribute('aria-selected', 'false');
            indicator.setAttribute('tabindex', '-1');
        });
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide and indicator with small delay
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
            indicators[currentSlide].setAttribute('aria-selected', 'true');
            indicators[currentSlide].setAttribute('tabindex', '0');
            
            // Reset transition flag after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 500); // Match CSS transition duration
        }, 50);
        
        // Update navigation buttons visibility based on current slide settings
        updateNavButtonsVisibility();
    }
    
    // Update navigation buttons visibility
    function updateNavButtonsVisibility() {
        // Navigační šipky jsou nyní vždy viditelné - CTA tlačítka se ovládají v showCtaButton
        prevButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');
        prevButton.style.display = 'flex';
        nextButton.style.display = 'flex';
    }
    
    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % heroSlides.length;
        goToSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        goToSlide(prevIndex);
    }
    
    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slidesContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevSlide(); // Swipe right - previous slide
            } else {
                nextSlide(); // Swipe left - next slide
            }
        }
    }
    
    // Initialize slideshow
    generateSlides();
    
    // Set first slide as active
    currentSlide = 0;
    goToSlide(0);
    
    // Set initial navigation buttons visibility
    updateNavButtonsVisibility();
    
    // Accessibility improvements
    slidesContainer.setAttribute('role', 'tabpanel');
    slidesContainer.setAttribute('aria-label', 'Hero slideshow');
    slideIndicators.setAttribute('role', 'tablist');
    slideIndicators.setAttribute('aria-label', 'Slideshow navigation');
    
    // Update indicators with aria labels
    const indicators = slideIndicators.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.setAttribute('role', 'tab');
        indicator.setAttribute('aria-label', `Přejít na slid ${index + 1}: ${heroSlides[index].title}`);
        indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        indicator.setAttribute('tabindex', index === 0 ? '0' : '-1');
        
        // Add keyboard support for indicators
        indicator.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
    });
}

// Website Images Management
function initWebsiteImages() {
    // Check if websiteImages data is available
    if (typeof websiteImages === 'undefined') {
        console.warn('Website images configuration not found');
        return;
    }
    
    // Load embassy building image
    loadImage('embassyBuilding', 'embassyBuildingContainer', 'embassyBuildingImage', 'embassyBuildingPlaceholder');
    
    // Add more image loading calls here for other images as needed
}

// Load individual image with fallback
function loadImage(imageKey, containerId, imageId, placeholderId) {
    const container = document.getElementById(containerId);
    const imageElement = document.getElementById(imageId);
    const placeholder = document.getElementById(placeholderId);
    
    if (!container || !imageElement || !placeholder) {
        console.warn(`Elements not found for image: ${imageKey}`);
        return;
    }
    
    if (!websiteImages[imageKey]) {
        console.warn(`Image configuration not found: ${imageKey}`);
        return;
    }
    
    const imageConfig = websiteImages[imageKey];
    
    // Set image source and alt text
    imageElement.src = imageConfig.src;
    imageElement.alt = imageConfig.alt;
    
    // Handle successful image load
    imageElement.onload = function() {
        console.log(`Successfully loaded image: ${imageKey}`);
        container.classList.add('has-image');
        imageElement.classList.remove('hidden');
        imageElement.classList.add('visible');
    };
    
    // Handle image load error - keep placeholder
    imageElement.onerror = function() {
        console.log(`Failed to load image: ${imageKey}, using placeholder`);
        // Update placeholder with config data if available
        if (imageConfig.fallbackIcon) {
            const icon = placeholder.querySelector('i');
            if (icon) {
                icon.className = imageConfig.fallbackIcon;
            }
        }
        if (imageConfig.fallbackText) {
            const text = placeholder.querySelector('p');
            if (text) {
                text.textContent = imageConfig.fallbackText;
            }
        }
    };
}

// News Detail Modal Function
function openNewsDetail() {
    // Get current language for translations
    const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
    const t = translations && translations[currentLang] ? translations[currentLang] : {
        news_important: 'DŮLEŽITÉ',
        news_date: '23. října 2025, 14:30',
        news_type: 'Tisková zpráva',
        news_title: 'Historické setkání: Libye a ČR posílí energetickou spolupráci',
        news_subtitle: 'Ahmed M. Al-Sharif podepsal s českými představiteli memorandum o porozumění v oblasti energetiky. Dohoda otevírá cestu k investicím v hodnotě více než 2 miliard korun.',
        news_author: 'Autor: Tisková služba velvyslanectví',
        news_share: 'Sdílet článek'
    };
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'news-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'news-modal-content';
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: slideIn 0.3s ease;
    `;

    // Modal content HTML
    modalContent.innerHTML = `
        <button class="modal-close" style="
            position: sticky;
            top: 10px;
            right: 10px;
            margin-left: auto;
            margin-bottom: 10px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: white;
            z-index: 1002;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            float: right;
        " onmouseover="this.style.background='rgba(231, 0, 19, 0.9)'" onmouseout="this.style.background='rgba(0, 0, 0, 0.7)'">&times;</button>
        
        <div class="modal-image" style="
            height: 300px;
            background-image: url('assets/images/007.jpg');
            background-size: cover;
            background-position: center;
            border-radius: 15px 15px 0 0;
            position: relative;
        ">
            <div style="
                position: absolute;
                bottom: 20px;
                left: 20px;
                background: var(--libya-red);
                color: white;
                padding: 8px 16px;
                border-radius: 15px;
                font-size: 0.9rem;
                font-weight: bold;
            ">${t.news_important}</div>
        </div>
        
        <div style="padding: 30px;">
            <div style="
                display: flex;
                gap: 20px;
                margin-bottom: 20px;
                font-size: 0.9rem;
                color: #666;
            ">
                <time>${t.news_date}</time>
                <span>${t.news_type}</span>
            </div>
            
            <h1 style="
                font-size: 2rem;
                line-height: 1.2;
                margin-bottom: 20px;
                color: var(--text-dark);
            ">${t.news_title}</h1>
            
            <p style="
                font-size: 1.1rem;
                line-height: 1.6;
                color: #666;
                margin-bottom: 30px;
                font-weight: 500;
            ">${t.news_subtitle}</p>
            
            <div style="margin-bottom: 30px;">
                <p style="line-height: 1.7; margin-bottom: 20px;">
                    <strong>Praha, 23. října 2025</strong> - Velvyslanec Libyjského státu v České republice, Ahmed M. Al-Sharif, 
                    dnes podepsal s ministrem průmyslu a obchodu České republiky memorandum o porozumění, 
                    které má za cíl posílit energetickou spolupráci mezi oběma zeměmi.
                </p>
                
                <p style="line-height: 1.7; margin-bottom: 20px;">
                    Dohoda zahrnuje několik klíčových oblastí spolupráce, včetně dodávek libyjské ropy a zemního plynu, 
                    transferu technologií v oblasti obnovitelných zdrojů energie a společných investičních projektů 
                    v energetickém sektoru.
                </p>
                
                <p style="line-height: 1.7; margin-bottom: 20px;">
                    "Toto memorandum představuje významný milník v našich bilaterálních vztazích," 
                    uvedl velvyslanec Al-Sharif. "Libye má bohaté energetické zdroje a Česká republika disponuje 
                    pokročilými technologiemi. Tato kombinace vytváří jedinečnou příležitost pro oboustranně 
                    výhodnou spolupráci."
                </p>
                
                <p style="line-height: 1.7; margin-bottom: 20px;">
                    Český ministr průmyslu zdůraznil strategický význam diverzifikace energetických zdrojů: 
                    "Spolupráce s Libyí nám umožní snížit závislost na současných dodavatelích energie 
                    a posílit energetickou bezpečnost České republiky."
                </p>
                
                <p style="line-height: 1.7; margin-bottom: 20px;">
                    Očekává se, že v rámci dohody budou realizovány investice v celkové hodnotě přesahující 
                    2 miliardy korun během následujících pěti let. První projekty by měly být spuštěny 
                    již v první polovině roku 2026.
                </p>
            </div>
            
            <div style="
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
                margin-bottom: 20px;
            ">
                <h3 style="margin-bottom: 15px; color: var(--libya-green);">Klíčové body dohody:</h3>
                <ul style="line-height: 1.6;">
                    <li>Dlouhodobé dodávky libyjské ropy do českých rafinerií</li>
                    <li>Rozvoj společných projektů obnovitelných zdrojů energie</li>
                    <li>Transfer technologií v oblasti energetické efektivity</li>
                    <li>Školení a výměna odborníků mezi oběma zeměmi</li>
                    <li>Podpora českých firem při vstupu na libyjský energetický trh</li>
                </ul>
            </div>
            
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 20px;
                border-top: 1px solid #eee;
            ">
                <button onclick="shareNews()" style="
                    background: var(--libya-green);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <i class="fas fa-share"></i> ${t.news_share}
                </button>
                
                <div style="color: #666; font-size: 0.9rem;">
                    ${t.news_author}
                </div>
            </div>
        </div>
    `;

    // Add close functionality
    const closeBtn = modalContent.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modalOverlay);
            document.removeEventListener('keydown', escapeHandler);
        }
    });

    // Add styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}

// Share News Function
function shareNews() {
    if (navigator.share) {
        navigator.share({
            title: 'Historické setkání: Libye a ČR posílí energetickou spolupráci',
            text: 'Jeho Excelence Ahmed M. Al-Sharif podepsal s českými představiteli memorandum o porozumění v oblasti energetiky.',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        
        // Get current language for messages
        const currentLang = localStorage.getItem('selectedLanguage') || 'cs';
        const msgs = translations && translations[currentLang] ? translations[currentLang] : {
            link_copied: 'Odkaz byl zkopírován do schránky!'
        };
        
        navigator.clipboard.writeText(url).then(() => {
            alert(msgs.link_copied);
        });
    }
}

// Accordion functionality for visa page
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const content = document.getElementById(target);
            const icon = this.querySelector('.accordion-icon');
            
            // Toggle current accordion
            const isActive = content.classList.contains('active');
            
            if (isActive) {
                // Close current accordion
                content.classList.remove('active');
                icon.classList.remove('rotated');
            } else {
                // Open current accordion
                content.classList.add('active');
                icon.classList.add('rotated');
            }
        });
    });
}

// Initialize accordion on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
} else {
    initAccordion();
}