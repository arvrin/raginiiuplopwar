# NeonLogo Component

A professional, highly customizable neon sign effect component with authentic flickering animations and electric surge effects. Perfect for logos, brand names, and interactive headings.

## ✨ Features

- **Authentic Neon Behavior**: Realistic flickering patterns inspired by vintage neon signs
- **Electric Surge Effects**: Progressive intensity buildup with smooth transitions
- **High Performance**: Optimized animations with memory leak prevention
- **Fully Customizable**: Colors, fonts, sizes, and timing intervals
- **Responsive Design**: Mobile-optimized with adaptive scaling
- **Accessibility First**: Respects reduced motion preferences and high contrast mode
- **Easy Integration**: Works with vanilla HTML/CSS/JS or any framework
- **Professional API**: Complete programmatic control with chainable methods

## 🚀 Quick Start

### 1. Include Files

```html
<!-- CSS -->
<link rel="stylesheet" href="components/neon-logo.css">

<!-- JavaScript -->
<script src="components/neon-logo.js"></script>
```

### 2. HTML Setup

```html
<!-- Auto-initialize with data attributes -->
<div data-neon-logo data-neon-intensity="medium">
    Your Brand Name
</div>

<!-- Or use any element -->
<h1 class="logo">Your Brand Name</h1>
```

### 3. JavaScript Initialization

```javascript
// Basic usage
const logo = new NeonLogo('.logo');

// Custom configuration
const logo = new NeonLogo('.logo', {
    intensity: 'high',
    color: '#50fa7b',
    font: 'Orbitron',
    flickerInterval: [4000, 8000]
});
```

## 📝 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | String | `'Raginii Uplopwar'` | Text content to display |
| `font` | String | `'Raleway'` | Font family name |
| `fontSize` | String | `'2.4rem'` | Font size with units |
| `fontWeight` | String | `'300'` | Font weight (100-900) |
| `letterSpacing` | String | `'3px'` | Letter spacing |
| `color` | String | `'#e8b4b8'` | Base color (hex/rgb/hsl) |
| `intensity` | String | `'medium'` | Effect intensity ('low', 'medium', 'high') |
| `flickerInterval` | Array | `[3000, 7000]` | Random interval range [min, max] ms |
| `autoStart` | Boolean | `true` | Auto-start animations on init |
| `respectReducedMotion` | Boolean | `true` | Respect user motion preferences |

## 🎛️ API Methods

### Control Methods
```javascript
logo.start();           // Start flicker animation
logo.stop();            // Stop animation
logo.destroy();         // Clean up and remove all effects
```

### Content Methods
```javascript
logo.setText('New Text');        // Change displayed text
logo.getText();                  // Get current text
logo.setIntensity('high');       // Change effect intensity
```

### Configuration Methods
```javascript
logo.updateConfig({
    fontSize: '3rem',
    color: '#ff6b9d',
    flickerInterval: [2000, 5000]
});
```

### Static Methods
```javascript
// Initialize multiple elements at once
const logos = NeonLogo.createMultiple('.neon-logo', {
    intensity: 'medium'
});
```

## 🎨 Built-in Styles & Variants

### Color Variants
```html
<div class="neon-logo neon-teal">Teal Neon</div>
<div class="neon-logo neon-gold">Gold Neon</div>
```

### Size Variants
```html
<div class="neon-logo neon-logo-navbar">Navbar Size</div>
<div class="neon-logo neon-logo-hero">Hero Size</div>
<div class="neon-logo neon-logo-small">Small Size</div>
```

### Intensity Classes
```html
<div class="neon-logo intensity-low">Low Intensity</div>
<div class="neon-logo intensity-high">High Intensity</div>
```

## 🎯 Usage Examples

### Navbar Logo
```javascript
new NeonLogo('.navbar-brand', {
    fontSize: '1.8rem',
    letterSpacing: '2px',
    intensity: 'low',
    flickerInterval: [5000, 10000]
});
```

### Hero Section
```javascript
new NeonLogo('.hero-title', {
    fontSize: '4rem',
    font: 'Orbitron',
    fontWeight: '700',
    intensity: 'high',
    color: '#00f5ff'
});
```

### Footer Brand
```javascript
new NeonLogo('.footer-logo', {
    fontSize: '1.6rem',
    intensity: 'low',
    flickerInterval: [8000, 15000]
});
```

## 🔧 Advanced Customization

### Custom CSS Variables
```css
.my-custom-neon {
    --neon-font: 'Cyberpunk', monospace;
    --neon-font-size: 2.8rem;
    --neon-color: #ff2a6d;
    --neon-letter-spacing: 4px;
}
```

### Animation Customization
```css
.neon-logo.my-custom.electric-surge-3 {
    text-shadow:
        0 0 30px var(--neon-color),
        0 0 60px var(--neon-color),
        0 0 90px var(--neon-color);
    transform: scale(1.01);
}
```

## 📱 Responsive Behavior

The component automatically adapts to different screen sizes:

- **Desktop**: Full effects with maximum glow intensity
- **Tablet**: Reduced effects for better performance
- **Mobile**: Optimized minimal effects while maintaining visual impact

## ♿ Accessibility

- **Reduced Motion**: Automatically disables animations when `prefers-reduced-motion: reduce` is detected
- **High Contrast**: Adapts glow effects for high contrast mode
- **Keyboard Navigation**: Maintains focus states without interference
- **Screen Readers**: Preserves text content accessibility

## 🔄 Integration Examples

### React Integration
```jsx
import { useEffect, useRef } from 'react';

function NeonBrand({ text, intensity = 'medium' }) {
    const logoRef = useRef(null);

    useEffect(() => {
        const logo = new NeonLogo(logoRef.current, {
            text,
            intensity,
            autoStart: true
        });

        return () => logo.destroy();
    }, [text, intensity]);

    return <div ref={logoRef} className="brand-logo" />;
}
```

### Vue Integration
```vue
<template>
    <div ref="neonLogo" class="brand-logo">{{ text }}</div>
</template>

<script>
export default {
    props: ['text', 'intensity'],
    mounted() {
        this.logo = new NeonLogo(this.$refs.neonLogo, {
            text: this.text,
            intensity: this.intensity || 'medium'
        });
    },
    beforeDestroy() {
        if (this.logo) {
            this.logo.destroy();
        }
    }
};
</script>
```

## 🎭 Demo

Visit `neon-component-demo.html` for a complete interactive demo showcasing all features and configuration options.

## 📄 License

MIT License - Feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests for any improvements.