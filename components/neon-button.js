/**
 * NeonButton Component - Professional Divine Energy Buttons
 * Provides easy-to-use neon button functionality with brand colors
 */

class NeonButton {
    constructor(selector, options = {}) {
        this.elements = typeof selector === 'string'
            ? document.querySelectorAll(selector)
            : [selector];

        this.config = {
            type: options.type || 'rose', // 'rose' or 'teal'
            size: options.size || 'normal', // 'small', 'normal', 'large', 'xl'
            icon: options.icon || null, // 'book', 'phone', 'star', 'heart', or custom
            text: options.text || null,
            disabled: options.disabled || false,
            onClick: options.onClick || null
        };

        this.init();
    }

    init() {
        this.elements.forEach(element => {
            this.setupElement(element);
            this.addEventListeners(element);
        });
    }

    setupElement(element) {
        // Add base classes
        element.classList.add('neon-btn');

        // Add type class
        element.classList.add(`neon-btn-${this.config.type}`);

        // Add size class
        if (this.config.size !== 'normal') {
            element.classList.add(`neon-btn-${this.config.size}`);
        }

        // Add icon class
        if (this.config.icon) {
            element.classList.add('neon-btn-icon');
            if (this.config.icon !== 'default') {
                element.classList.add(`icon-${this.config.icon}`);
            }
        }

        // Set text if provided
        if (this.config.text) {
            element.textContent = this.config.text;
        }

        // Set disabled state
        if (this.config.disabled) {
            element.disabled = true;
        }

        // Ensure proper tag attributes
        if (element.tagName === 'BUTTON' || element.tagName === 'INPUT') {
            element.type = element.type || 'button';
        }

        // Add accessibility attributes
        if (!element.getAttribute('role') && element.tagName === 'A') {
            element.setAttribute('role', 'button');
        }
    }

    addEventListeners(element) {
        // Click handler
        if (this.config.onClick) {
            element.addEventListener('click', (e) => {
                if (!element.disabled) {
                    this.config.onClick(e, element);
                }
            });
        }

        // Enhanced hover effects
        element.addEventListener('mouseenter', () => {
            if (!element.disabled) {
                this.onHoverEnter(element);
            }
        });

        element.addEventListener('mouseleave', () => {
            if (!element.disabled) {
                this.onHoverLeave(element);
            }
        });

        // Touch support for mobile
        element.addEventListener('touchstart', () => {
            if (!element.disabled) {
                this.onTouchStart(element);
            }
        });

        element.addEventListener('touchend', () => {
            if (!element.disabled) {
                this.onTouchEnd(element);
            }
        });
    }

    onHoverEnter(element) {
        // Add enhanced glow effect
        element.style.transform = 'translateY(-3px)';

        if (this.config.type === 'rose') {
            element.style.boxShadow = '0 0 35px rgba(232, 180, 184, 0.7), 0 12px 30px rgba(232, 180, 184, 0.4)';
        } else {
            element.style.boxShadow = '0 0 35px rgba(13, 115, 119, 0.7), 0 12px 30px rgba(13, 115, 119, 0.4)';
        }
    }

    onHoverLeave(element) {
        // Reset to default styles
        element.style.transform = '';
        element.style.boxShadow = '';
    }

    onTouchStart(element) {
        element.style.transform = 'translateY(-1px)';
    }

    onTouchEnd(element) {
        element.style.transform = '';
    }

    // Public methods
    updateText(newText) {
        this.elements.forEach(element => {
            element.textContent = newText;
        });
    }

    updateType(newType) {
        this.elements.forEach(element => {
            element.classList.remove(`neon-btn-${this.config.type}`);
            element.classList.add(`neon-btn-${newType}`);
        });
        this.config.type = newType;
    }

    disable() {
        this.config.disabled = true;
        this.elements.forEach(element => {
            element.disabled = true;
            element.classList.add('neon-btn-disabled');
        });
    }

    enable() {
        this.config.disabled = false;
        this.elements.forEach(element => {
            element.disabled = false;
            element.classList.remove('neon-btn-disabled');
        });
    }

    destroy() {
        this.elements.forEach(element => {
            // Remove all neon button classes
            element.classList.remove(
                'neon-btn',
                `neon-btn-${this.config.type}`,
                `neon-btn-${this.config.size}`,
                'neon-btn-icon',
                `icon-${this.config.icon}`
            );

            // Remove inline styles
            element.style.transform = '';
            element.style.boxShadow = '';

            // Remove event listeners by cloning element
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
        });
    }

    // Static utility methods
    static createButton(text, type = 'rose', options = {}) {
        const button = document.createElement('button');
        button.textContent = text;
        return new NeonButton(button, { ...options, type });
    }

    static initializeAll(selector = '[data-neon-button]') {
        const elements = document.querySelectorAll(selector);
        const buttons = [];

        elements.forEach(element => {
            const config = {
                type: element.dataset.neonType || 'rose',
                size: element.dataset.neonSize || 'normal',
                icon: element.dataset.neonIcon || null,
                disabled: element.hasAttribute('disabled')
            };

            buttons.push(new NeonButton(element, config));
        });

        return buttons;
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Auto-initialize elements with data attributes
    NeonButton.initializeAll();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeonButton;
}

// Global assignment for script tag usage
if (typeof window !== 'undefined') {
    window.NeonButton = NeonButton;
}