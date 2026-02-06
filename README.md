# Melody Ramos – Frontend Portfolio

A modern, responsive portfolio built with HTML, CSS, and JavaScript. It features mobile navigation, smooth animations, dark mode (with persistence), project detail modals, live project links, and a contact form powered by EmailJS with mailto fallback.

## Quick Start
- Open `index.html` in your browser
- Edit content in `index.html` (About, Skills, Projects, Contact)
- Styles in `styles.css`
- Interactions in `script.js`

## EmailJS Setup (Contact Form)
1. Create a free account at EmailJS
2. Add an Email Service (Gmail/Outlook/SMTP)
3. Create a Template with these fields: `from_name`, `from_email`, `subject`, `message`
4. Copy your Public Key, Service ID, and Template ID
5. Update the code:
   - In `index.html` (bottom):
     - `emailjs.init({ publicKey: 'YOUR_PUBLIC_KEY' });`
   - In `script.js`:
     - `const SERVICE_ID = 'YOUR_SERVICE_ID';`
     - `const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';`
     - `const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';`

If EmailJS isn’t configured or fails, the form falls back to a mailto draft to `melodyramosct@gmail.com`.

## Dark Mode
- Toggle in the navbar (`#theme-toggle`)
- Remembers selection via `localStorage`
- Light and dark palettes via CSS variables (`:root` and `.theme-dark`)

## Project Screenshots
To replace a placeholder icon with an image:
```html
<div class="project-image">
  <img src="your-screenshot.jpg" alt="Project screenshot">
</div>
```
Place screenshots in the project folder and reference them with a relative path.

## Deploy Options
### GitHub Pages
1) Create a repo (e.g., `melody-portfolio`)
2) From this folder, run:
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/melody-portfolio.git
git push -u origin main
```
3) GitHub: Settings → Pages → Source: Deploy from a branch → Branch: `main`, Folder: `/ (root)`
4) Your site will be live at:
```
https://<your-username>.github.io/melody-portfolio/
```
Note: keep `FE%20DEV.pdf` (resume) at the repo root for the Download Resume button.

### Netlify
1) Go to Netlify → Add new site → Deploy manually
2) Drag-and-drop the entire project folder
3) Netlify provides a live URL; customize it in Site settings

## Customize
- Colors: change CSS variables in `styles.css` under `:root` and `.theme-dark`
- Social links: edit the Contact section in `index.html`
- SEO: update meta tags and `og:` tags in `index.html`

## Links
- GitHub profile: https://github.com/melrams12
- LinkedIn: https://www.linkedin.com/in/melody-ramos-48bb1422a/
- E‑Commerce Live: https://core3.m4k.co/m/80961
- Training Landing Page: https://core3.m4k.co/m/80151
- Resume/Portfolio (Netlify): https://magical-cat-ead069.netlify.app/

## Tech Stack
- HTML5, CSS3, JavaScript
- Font Awesome, Google Fonts (Inter)
- EmailJS (optional)

## License
Use and modify for your personal portfolio.
