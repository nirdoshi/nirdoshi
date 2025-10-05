# Modern Personal Portfolio Website

A sleek, modern personal portfolio website with smooth scroll animations, dark black background, and purple theme - built without Three.js.

## Features

- 🎨 **Dark Theme**: Deep black background with vibrant purple accents
- ✨ **Smooth Animations**: Scroll-triggered animations and hover effects
- 📱 **Fully Responsive**: Works beautifully on all devices
- ⚡ **Performance Optimized**: Fast loading with vanilla JavaScript
- 🎯 **Sections Included**:
  - Hero section with typing effect
  - About section with animated stats
  - Skills section with progress bars
  - Projects showcase
  - Contact form

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- No frameworks or libraries required!

## Setup

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process needed.

## Customization

### Update Your Information

1. **Edit `index.html`**:
   - Replace "Your Name" with your actual name
   - Update the email and social links in the contact section
   - Modify project descriptions and stats
   - Add your own content

2. **Customize Colors** in `styles.css`:
   ```css
   :root {
       --bg-black: #0a0a0a;
       --bg-dark: #121212;
       --purple-primary: #9333ea;
       --purple-light: #a855f7;
       --purple-dark: #7e22ce;
       --purple-accent: #c084fc;
   }
   ```

3. **Update Typing Text** in `script.js`:
   ```javascript
   const phrases = [
       'Full Stack Developer',
       'UI/UX Designer',
       // Add your own titles here
   ];
   ```

### Add Your Images

Replace the `.image-placeholder` in the About section with your actual photo:

```html
<div class="about-image" data-scroll>
    <img src="your-photo.jpg" alt="Your Name">
</div>
```

And update the CSS accordingly.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Performance Tips

- The site uses IntersectionObserver API for efficient scroll animations
- All animations are GPU-accelerated using CSS transforms
- Minimal JavaScript for optimal performance

## License

Feel free to use this template for your personal portfolio!

## Credits

Created with ❤️ using pure HTML, CSS, and JavaScript

---

**Tip**: To deploy this website, you can use:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload the files and you're live!

