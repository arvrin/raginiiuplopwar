/**
 * Global Footer Component - Professional Footer
 * Provides consistent footer across all pages
 */

class GlobalFooter {
    constructor(options = {}) {
        this.config = {
            logoSrc: options.logoSrc || 'images/logo.jpeg',
            logoAlt: options.logoAlt || 'Raginii Uplopwar',
            brandText: options.brandText || 'Raginii Uplopwar',
            description: options.description || 'Professional healing and transformation services through East-West fusion methods.',
            phone: options.phone || '+91 99810 15196',
            location: options.location || 'Bhopal, Madhya Pradesh',
            year: options.year || new Date().getFullYear()
        };

        this.footerSections = {
            services: {
                title: 'Services',
                links: [
                    { text: 'Vastu Consultation', href: 'services.html#vastu' },
                    { text: 'Energy Healing', href: 'services.html#healing' },
                    { text: 'Life Transformation', href: 'services.html#transformation' },
                    { text: 'Business Harmony', href: 'services.html#business' }
                ]
            },
            about: {
                title: 'About',
                links: [
                    { text: 'About Raginii', href: 'about.html' },
                    { text: 'Published Books', href: 'books.html' },
                    { text: 'Programs', href: 'programs.html' },
                    { text: 'Success Stories', href: 'testimonials.html' }
                ]
            },
            contact: {
                title: 'Contact',
                links: [
                    { text: this.config.phone, href: `tel:${this.config.phone.replace(/\s/g, '')}`, isPhone: true },
                    { text: 'Book Consultation', href: 'contact.html' },
                    { text: this.config.location, href: null, isLocation: true }
                ]
            }
        };

        this.socialLinks = [
            { icon: 'fab fa-facebook', href: 'https://www.facebook.com/p/Vastu-Consultant-Ragini-Uplopwar-100068360500001/', name: 'Facebook' },
            { icon: 'fab fa-instagram', href: 'https://www.instagram.com/uplopwar.raginii/', name: 'Instagram' },
            { icon: 'fab fa-youtube', href: 'https://www.youtube.com/channel/UC68h2GuqkD2kGiysiRlWpvw', name: 'YouTube' }
        ];

        this.init();
    }

    generateFooterHTML() {
        // Generate footer columns
        const footerColumns = Object.keys(this.footerSections).map(sectionKey => {
            const section = this.footerSections[sectionKey];
            const links = section.links.map(link => {
                if (link.href) {
                    return `<li><a href="${link.href}">${link.text}</a></li>`;
                } else {
                    return `<li>${link.text}</li>`;
                }
            }).join('');

            return `
                <div class="footer-column">
                    <h4 class="footer-title">${section.title}</h4>
                    <ul class="footer-list">
                        ${links}
                    </ul>
                </div>
            `;
        }).join('');

        // Generate social links
        const socialLinksHTML = this.socialLinks.map(social => `
            <a href="${social.href}" class="social-link" aria-label="${social.name}" target="_blank" rel="noopener noreferrer">
                <i class="${social.icon}"></i>
            </a>
        `).join('');

        return `
            <footer class="footer-professional">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-brand">
                            <div class="footer-logo">
                                <img src="${this.config.logoSrc}" alt="${this.config.logoAlt}" class="footer-logo-img">
                                <span class="footer-logo-text neon-logo-footer" data-neon-logo data-neon-intensity="medium" data-neon-font-size="1.4rem" data-neon-letter-spacing="1.5px">
                                    ${this.config.brandText}
                                </span>
                            </div>
                            <p class="footer-description">
                                ${this.config.description}
                            </p>
                        </div>
                        <div class="footer-links">
                            ${footerColumns}
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <div class="footer-bottom-content">
                            <p>&copy; ${this.config.year} ${this.config.brandText}. All rights reserved. | Built by <a href="https://freakingminds.in" target="_blank" rel="noopener noreferrer" style="color: var(--primary-gold); text-decoration: none; font-weight: var(--font-semibold); transition: color var(--transition-fast);" onmouseover="this.style.color='var(--white)'" onmouseout="this.style.color='var(--primary-gold)'">Freaking Minds</a></p>
                            <div class="footer-social">
                                ${socialLinksHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    init() {
        // Find footer placeholder or create one if it doesn't exist
        let footerContainer = document.querySelector('[data-footer-placeholder]');
        if (!footerContainer) {
            // If no placeholder found, insert at the end of body
            footerContainer = document.createElement('div');
            footerContainer.setAttribute('data-footer-placeholder', '');
            document.body.appendChild(footerContainer);
        }

        // Insert the footer HTML
        footerContainer.innerHTML = this.generateFooterHTML();

        // Initialize neon logo if available
        this.initNeonLogo();
    }

    initNeonLogo() {
        // Wait for NeonLogo to be available and DOM to be ready
        const initFooterLogo = () => {
            const footerLogoElement = document.querySelector('.footer-logo-text');
            if (typeof NeonLogo !== 'undefined' && footerLogoElement) {
                new NeonLogo('.footer-logo-text', {
                    intensity: 'medium',
                    fontSize: '1.4rem',
                    letterSpacing: '1.5px',
                    flickerInterval: [6000, 12000],
                    color: '#e8b4b8'
                });
            } else {
                // Retry after a short delay if not available
                setTimeout(initFooterLogo, 200);
            }
        };

        setTimeout(initFooterLogo, 150);
    }

    updateYear(year) {
        this.config.year = year;
        const yearElement = document.querySelector('.footer-bottom-content p');
        if (yearElement) {
            yearElement.textContent = `© ${year} ${this.config.brandText}. All rights reserved.`;
        }
    }

    updateSocialLinks(newSocialLinks) {
        this.socialLinks = newSocialLinks;
        // Re-render footer if needed
        this.init();
    }

    static init(options = {}) {
        return new GlobalFooter(options);
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    GlobalFooter.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalFooter;
}

// Global assignment for script tag usage
if (typeof window !== 'undefined') {
    window.GlobalFooter = GlobalFooter;
}