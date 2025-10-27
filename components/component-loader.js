// Component loader for shared header and footer
console.log('Loading components...');

// Function to load HTML component
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        return false;
    }
}

// Function to set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Function to initialize mobile menu (moved from main script)
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Loading header and footer components...');
    
    // Load header and footer
    const headerLoaded = await loadComponent('header-placeholder', 'components/header.html');
    const footerLoaded = await loadComponent('footer-placeholder', 'components/footer.html');
    
    if (headerLoaded && footerLoaded) {
        console.log('Components loaded successfully');
        
        // Set active navigation link and reinitialize functionality
        setTimeout(() => {
            setActiveNavLink();
            initMobileMenu();
            
            // Reinitialize language switcher after components are loaded
            if (typeof initLanguageSwitcher === 'function') {
                initLanguageSwitcher();
            }
        }, 50);
        
        // Dispatch custom event to notify that components are loaded
        const componentLoadedEvent = new CustomEvent('componentsLoaded');
        document.dispatchEvent(componentLoadedEvent);
    } else {
        console.error('Failed to load some components');
    }
});

// Export functions for external use
window.ComponentLoader = {
    loadComponent,
    setActiveNavLink,
    initMobileMenu
};