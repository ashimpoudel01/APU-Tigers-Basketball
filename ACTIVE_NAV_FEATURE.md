# Active Navigation Highlighting - Feature Added! ✨

## What's New:

Your navigation bar now **highlights the current page** you're on!

## How It Works:

### Desktop Navigation:
- The current page link has an **orange background** (your secondary color)
- **Bolder font weight** (600)
- **Subtle shadow** for extra emphasis
- White text color

### Mobile Navigation:
- Same orange background highlight
- Bolder font weight
- **White left border** for additional visual indicator

## Visual Examples:

When you're on the **About** page:
- "About Us" link will be highlighted in orange
- All other links remain white/transparent

When you're on the **Contact** page:
- "Contact" link will be highlighted in orange
- Other links stay normal

## How to Test:

1. **Open your browser:** http://localhost:8000

2. **Navigate through different pages:**
   - Click "Home" → Home should be highlighted
   - Click "About Us" → About Us should be highlighted
   - Click "Contact" → Contact should be highlighted
   - etc.

3. **Check mobile view:**
   - Resize browser to mobile size (or press F12 → Device toolbar)
   - Open mobile menu
   - Current page should be highlighted with orange + white left border

## Technical Details:

### JavaScript Function:
- `highlightActivePage()` - Automatically runs when page loads
- Detects current page from URL
- Adds `.active` class to matching navigation link
- Works for both desktop and mobile menus

### CSS Classes:
- `.nav-link.active` - Desktop active link styles
- `.mobile-nav-link.active` - Mobile active link styles

## Styling:

### Desktop Active Link:
```css
.nav-link.active {
  background-color: hsl(var(--secondary)); /* Orange */
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 136, 0, 0.3);
}
```

### Mobile Active Link:
```css
.mobile-nav-link.active {
  background-color: hsl(var(--secondary));
  color: white;
  font-weight: 600;
  border-left: 3px solid white;
}
```

## Browser Support:

✅ Works on all modern browsers
✅ Responsive (works on desktop & mobile)
✅ Automatic (no manual intervention needed)

## Customization:

Want to change the highlight color? Edit in `styles.css`:

```css
.nav-link.active {
  background-color: your-color-here;
}
```

---

**Now test it at: http://localhost:8000** 🎯

Navigate between pages and watch the navigation automatically highlight the current page!
