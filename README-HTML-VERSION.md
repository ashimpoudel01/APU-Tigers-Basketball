# APU Tigers Basketball Club - HTML/CSS/JavaScript Version

This is the converted version of the React website, now built with pure HTML, CSS, and JavaScript. The website maintains all the original functionality and design while being completely framework-independent.

## Features

### ✅ Fully Functional Features
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu
- **Hero Carousel**: Auto-playing image carousel with manual controls and indicators
- **Animated Statistics**: Counter animations that trigger when scrolled into view
- **Client-side Routing**: Single-page application navigation between sections
- **Smooth Scrolling**: Smooth scroll behavior for better user experience
- **Back to Top Button**: Appears when scrolling down, smoothly returns to top
- **Interactive Elements**: Hover effects, transitions, and animations
- **Mobile Responsive**: Fully responsive design that works on all devices

### 🎨 Design System
- **Consistent Colors**: APU Tigers brand colors (Deep Blue, Vibrant Orange)
- **Typography**: Inter and Montserrat fonts for modern, professional look
- **Animations**: Smooth transitions and hover effects throughout
- **Shadows & Gradients**: Professional depth and visual hierarchy
- **Card-based Layout**: Clean, modern card designs for content sections

### 📱 Pages Included
- **Home**: Hero carousel, stats, welcome section, events, news, testimonials
- **About**: Mission, vision, core values, coaching team, timeline
- **Team**: Team members and information (placeholder)
- **Achievements**: Championship history and awards (placeholder)
- **Events**: Upcoming events and schedule (placeholder)
- **Schedule**: Training schedule and calendar (placeholder)
- **Training**: Training programs and coaching (placeholder)
- **News**: Latest news and announcements (placeholder)
- **Gallery**: Photo gallery and media (placeholder)
- **Resources**: Resources and downloads (placeholder)
- **Contact**: Contact information and form (placeholder)
- **FAQ**: Frequently asked questions (placeholder)
- **Register**: Registration form and information (placeholder)

## File Structure

```
├── index.html          # Main HTML file with all pages
├── styles.css          # Complete CSS with design system
├── script.js           # JavaScript for all functionality
├── assets/         # Images and media files
│   ├── facility.jpg
│   ├── hero-basketball-1.jpg
│   ├── hero-basketball-2.jpg
│   ├── hero-basketball-3.jpg
│   ├── team-spirit.jpg
│   └── trophy.jpg
└── README-HTML-VERSION.md
```

## How to Run

### Option 1: Simple File Server
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using PHP (if installed)
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: Direct File Opening
Simply open `index.html` in your web browser. Note that some features may not work properly due to CORS restrictions when opening files directly.

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Key JavaScript Features

### Navigation System
- Smooth scrolling between sections
- Active link highlighting
- Mobile menu toggle
- URL hash routing

### Carousel System
- Auto-play with pause on hover
- Manual navigation (buttons and indicators)
- Keyboard navigation (arrow keys)
- Touch/swipe support (on mobile)

### Statistics Counter
- Intersection Observer API for performance
- Smooth counting animation
- Easing functions for natural motion

### Performance Optimizations
- Debounced scroll events
- Throttled resize events
- Lazy loading for images
- Efficient DOM manipulation

## Customization

### Colors
All colors are defined as CSS custom properties in `:root`:
```css
:root {
  --primary: 237 73% 25%;        /* Deep Blue */
  --secondary: 28 100% 50%;      /* Vibrant Orange */
  --accent: 0 70% 55%;           /* Energy Red */
  /* ... more colors */
}
```

### Typography
Font families and sizes can be modified in the CSS:
```css
body {
  font-family: 'Inter', system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', system-ui, sans-serif;
}
```

### Animations
Animation durations and easing can be adjusted:
```css
:root {
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Adding New Pages

1. Add a new `<div id="page-name" class="page">` in the HTML
2. Add navigation links in both desktop and mobile menus
3. Update the JavaScript routing in `script.js`
4. Style the new page in `styles.css`

## Form Handling

The JavaScript includes form validation and submission handling. To add forms:

1. Create form HTML with proper structure
2. Add `required` attributes to required fields
3. The JavaScript will automatically handle validation and submission

## SEO Considerations

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Meta tags in head section
- Clean URL structure

## Performance Notes

- Images are optimized for web
- CSS and JavaScript are minified-ready
- Efficient animations using CSS transforms
- Lazy loading for better initial load times

## Browser Developer Tools

The website includes helpful console logging for debugging:
- Navigation events
- Carousel state changes
- Form submissions
- Error handling

## Future Enhancements

Potential improvements that could be added:
- Service Worker for offline functionality
- Progressive Web App features
- Advanced form validation
- Image optimization and WebP support
- Advanced animations with GSAP
- Database integration for dynamic content

## Support

This HTML/CSS/JavaScript version maintains 100% feature parity with the original React version while being completely framework-independent. All interactive features work exactly as they did in the React version.

The code is well-commented and follows modern web development best practices for maintainability and performance.
