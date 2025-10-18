/**
 * NeonLogo Component - Professional Neon Sign Effect
 * Combines minimalist typography with authentic neon sign flickering
 *
 * Usage:
 * const neonLogo = new NeonLogo('.logo-element', {
 *   text: 'Your Text Here',
 *   flickerInterval: [3000, 7000],
 *   intensity: 'medium'
 * });
 */

class NeonLogo {
    constructor(selector, options = {}) {
        this.element = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;

        if (!this.element) {
            return;
        }

        // Configuration options
        this.config = {
            text: options.text || this.element.textContent || 'Raginii Uplopwar',
            font: options.font || 'Raleway',
            fontSize: options.fontSize || '2.4rem',
            fontWeight: options.fontWeight || '300',
            letterSpacing: options.letterSpacing || '3px',
            color: options.color || '#e8b4b8', // Rose gold
            flickerInterval: options.flickerInterval || [3000, 7000], // [min, max] in ms
            intensity: options.intensity || 'medium', // low, medium, high
            autoStart: options.autoStart !== false,
            reducedMotion: options.respectReducedMotion !== false
        };

        this.isAnimating = false;
        this.animationId = null;
        this.isDestroyed = false;

        this.init();
    }

    init() {
        // Check for reduced motion preference
        if (this.config.reducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.setupStaticVersion();
            return;
        }

        this.setupElement();
        this.injectStyles();

        if (this.config.autoStart) {
            this.start();
        }
    }

    setupElement() {
        this.element.textContent = this.config.text;
        this.element.classList.add('neon-logo');

        // Set CSS custom properties
        this.element.style.setProperty('--neon-font', this.config.font);
        this.element.style.setProperty('--neon-font-size', this.config.fontSize);
        this.element.style.setProperty('--neon-font-weight', this.config.fontWeight);
        this.element.style.setProperty('--neon-letter-spacing', this.config.letterSpacing);
        this.element.style.setProperty('--neon-color', this.config.color);
    }

    setupStaticVersion() {
        this.element.classList.add('neon-logo', 'neon-static');
        this.element.textContent = this.config.text;
    }

    injectStyles() {
        if (document.getElementById('neon-logo-styles')) return;

        const styles = `
            <style id="neon-logo-styles">
                .neon-logo {
                    font-family: var(--neon-font, 'Raleway'), sans-serif;
                    font-size: var(--neon-font-size, 2.4rem);
                    font-weight: var(--neon-font-weight, 300);
                    color: var(--neon-color, #e8b4b8);
                    letter-spacing: var(--neon-letter-spacing, 3px);
                    opacity: 0.85;
                    text-shadow: 0 0 12px rgba(232, 180, 184, 0.5);
                    transition: all 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    user-select: none;
                    display: inline-block;
                }

                /* Static version for reduced motion */
                .neon-logo.neon-static {
                    opacity: 0.9;
                    text-shadow: 0 0 15px rgba(232, 180, 184, 0.7);
                }

                /* Flicker states */
                .neon-logo.flicker-dim {
                    opacity: 0.3;
                    text-shadow: 0 0 3px rgba(232, 180, 184, 0.3);
                    transform: scale(0.998);
                }

                .neon-logo.flicker-off {
                    opacity: 0.12;
                    text-shadow: 0 0 1px rgba(232, 180, 184, 0.1);
                    transform: scale(0.999);
                }

                .neon-logo.flicker-weak {
                    opacity: 0.6;
                    text-shadow: 0 0 6px rgba(232, 180, 184, 0.4);
                    transform: scale(0.9995);
                }

                /* Electric surge states - Intensity based */
                .neon-logo.electric-surge-1 {
                    opacity: 1;
                    text-shadow:
                        0 0 15px rgba(232, 180, 184, 0.9),
                        0 0 25px rgba(232, 180, 184, 0.7),
                        0 0 35px rgba(232, 180, 184, 0.5);
                    transform: scale(1.002);
                }

                .neon-logo.electric-surge-2 {
                    opacity: 1;
                    text-shadow:
                        0 0 18px rgba(232, 180, 184, 1),
                        0 0 30px rgba(232, 180, 184, 0.8),
                        0 0 45px rgba(232, 180, 184, 0.6),
                        0 0 60px rgba(232, 180, 184, 0.3);
                    transform: scale(1.004);
                }

                .neon-logo.electric-surge-3 {
                    opacity: 1;
                    text-shadow:
                        0 0 20px rgba(232, 180, 184, 1),
                        0 0 35px rgba(232, 180, 184, 0.9),
                        0 0 50px rgba(232, 180, 184, 0.7),
                        0 0 70px rgba(232, 180, 184, 0.4);
                    transform: scale(1.006);
                }

                /* High intensity mode */
                .neon-logo.intensity-high.electric-surge-3 {
                    text-shadow:
                        0 0 25px rgba(232, 180, 184, 1),
                        0 0 45px rgba(232, 180, 184, 0.9),
                        0 0 65px rgba(232, 180, 184, 0.7),
                        0 0 90px rgba(232, 180, 184, 0.5);
                    transform: scale(1.008);
                }

                /* Low intensity mode */
                .neon-logo.intensity-low.electric-surge-3 {
                    text-shadow:
                        0 0 12px rgba(232, 180, 184, 0.8),
                        0 0 20px rgba(232, 180, 184, 0.6),
                        0 0 30px rgba(232, 180, 184, 0.4);
                    transform: scale(1.003);
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .neon-logo {
                        font-size: calc(var(--neon-font-size, 2.4rem) * 0.8);
                        letter-spacing: calc(var(--neon-letter-spacing, 3px) * 0.7);
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    async start() {
        if (this.isDestroyed) return;

        this.element.classList.add(`intensity-${this.config.intensity}`);

        // Initial delay before first flicker
        const initialDelay = 2000 + Math.random() * 3000;
        this.animationId = setTimeout(() => {
            this.triggerNeonSequence();
        }, initialDelay);
    }

    stop() {
        if (this.animationId) {
            clearTimeout(this.animationId);
            this.animationId = null;
        }
        this.isAnimating = false;
        this.clearAllClasses();
    }

    destroy() {
        this.stop();
        this.isDestroyed = true;
        this.element.classList.remove(
            'neon-logo', 'neon-static',
            `intensity-${this.config.intensity}`
        );
        this.clearAllClasses();

        // Reset inline styles
        this.element.style.removeProperty('--neon-font');
        this.element.style.removeProperty('--neon-font-size');
        this.element.style.removeProperty('--neon-font-weight');
        this.element.style.removeProperty('--neon-letter-spacing');
        this.element.style.removeProperty('--neon-color');
    }

    clearAllClasses() {
        this.element.classList.remove(
            'flicker-dim', 'flicker-off', 'flicker-weak',
            'electric-surge-1', 'electric-surge-2', 'electric-surge-3'
        );
    }

    async triggerNeonSequence() {
        if (this.isAnimating || this.isDestroyed) return;
        this.isAnimating = true;

        try {
            // Pre-flicker warning
            this.clearAllClasses();
            this.element.classList.add('flicker-dim');
            await this.delay(35);

            // Main flicker sequence (authentic neon behavior)
            const flickerSteps = [
                { class: 'flicker-off', duration: 45 },
                { class: 'flicker-weak', duration: 60 },
                { class: 'flicker-off', duration: 40 },
                { class: 'flicker-dim', duration: 55 },
                { class: 'flicker-weak', duration: 70 },
                { class: 'flicker-off', duration: 30 },
                { class: 'flicker-dim', duration: 50 }
            ];

            for (const step of flickerSteps) {
                if (this.isDestroyed) return;
                this.clearAllClasses();
                this.element.classList.add(step.class);
                await this.delay(step.duration);
            }

            // Electric surge buildup
            const surgeSteps = [
                { class: 'electric-surge-1', duration: 100 },
                { class: 'electric-surge-2', duration: 85 },
                { class: 'electric-surge-3', duration: 150 },
                { class: 'electric-surge-2', duration: 70 },
                { class: 'electric-surge-1', duration: 60 }
            ];

            for (const step of surgeSteps) {
                if (this.isDestroyed) return;
                this.clearAllClasses();
                this.element.classList.add(step.class);
                await this.delay(step.duration);
            }

            // Return to normal
            this.clearAllClasses();

        } catch (error) {
            // Silent error handling for production
        } finally {
            this.isAnimating = false;

            if (!this.isDestroyed) {
                // Schedule next sequence
                const [minInterval, maxInterval] = this.config.flickerInterval;
                const nextSequence = minInterval + Math.random() * (maxInterval - minInterval);

                this.animationId = setTimeout(() => {
                    this.triggerNeonSequence();
                }, nextSequence);
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Public API methods
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.setupElement();
    }

    getText() {
        return this.config.text;
    }

    setText(newText) {
        this.config.text = newText;
        this.element.textContent = newText;
    }

    setIntensity(intensity) {
        this.element.classList.remove(`intensity-${this.config.intensity}`);
        this.config.intensity = intensity;
        this.element.classList.add(`intensity-${intensity}`);
    }

    // Static utility method
    static createMultiple(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).map(element =>
            new NeonLogo(element, options)
        );
    }
}

// Auto-initialize if data attributes are found
document.addEventListener('DOMContentLoaded', () => {
    const autoElements = document.querySelectorAll('[data-neon-logo]');
    autoElements.forEach(element => {
        const config = {
            text: element.dataset.neonText,
            font: element.dataset.neonFont,
            fontSize: element.dataset.neonFontSize,
            intensity: element.dataset.neonIntensity || 'medium'
        };

        new NeonLogo(element, config);
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeonLogo;
}

// Global assignment for script tag usage
if (typeof window !== 'undefined') {
    window.NeonLogo = NeonLogo;
}