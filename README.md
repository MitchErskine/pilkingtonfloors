# Pilkington Floors — Portfolio Website

A modern, responsive portfolio website for Pilkington Floors, a residential and commercial flooring company specialising in Amtico flooring installation and renovation.

Built with vanilla HTML5, CSS3, and JavaScript — no frameworks or build tools required. Designed for deployment on GitHub Pages.

## Features

- Responsive mobile-first design (320px to 2560px)
- Portfolio gallery with category filtering and lightbox viewer
- Before/after project slider
- Quote request and contact forms via Formspree
- Blog section with flooring tips and advice
- FAQ accordion
- SEO optimised with structured data, sitemap, and unique meta tags
- Accessible: ARIA landmarks, keyboard navigation, focus management

## File Structure

```
pilkingtonfloors/
├── index.html              # Home page
├── about.html              # About Us
├── services.html           # Services
├── portfolio.html          # Portfolio gallery
├── testimonials.html       # Customer testimonials
├── blog.html               # Blog listing
├── blog/
│   ├── post-1.html         # Blog post: Amtico care guide
│   └── post-2.html         # Blog post: Choosing the right flooring
├── contact.html            # Contact page with quote form
├── css/
│   └── styles.css          # Stylesheet with CSS custom properties
├── js/
│   ├── main.js             # Header, mobile menu, scroll animations, FAQ
│   ├── gallery.js          # Gallery filtering and lightbox
│   ├── slider.js           # Before/after image slider
│   └── form.js             # Form validation and Formspree submission
├── images/                 # Project photos and logo
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Crawl directives
├── tests/                  # Vitest test files
├── vitest.config.js        # Test configuration
└── package.json            # Dev dependencies
```

## Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new) and create a new repository.
2. Name it `pilkingtonfloors.github.io` for a user/org site, or any name for a project site.
3. Push this project to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose the **main** branch and **/ (root)** folder.
5. Click **Save**.

### Step 3: Access Your Site

- **User/org site** (`username.github.io`): Your site will be live at `https://username.github.io/`
- **Project site**: Your site will be live at `https://username.github.io/repository-name/`

GitHub Pages typically takes 1–2 minutes to deploy after pushing changes.

## Configuring Formspree (Contact Forms)

The quote request and contact forms use [Formspree](https://formspree.io/) to handle submissions without a backend server.

### Step 1: Create a Formspree Account

1. Go to [formspree.io](https://formspree.io/) and sign up for a free account.
2. Create a new form — Formspree will give you a form ID (e.g., `xrgjaklp`).

### Step 2: Update the Form Action URLs

1. Open `contact.html`.
2. Find the form elements with `action="https://formspree.io/f/YOUR_FORM_ID"`.
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID.

   ```html
   <!-- Before -->
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

   <!-- After -->
   <form action="https://formspree.io/f/xrgjaklp" method="POST">
   ```

4. Also update the Formspree URL in `js/form.js` if AJAX submission is configured there.

### Step 3: Test the Form

1. Deploy the site and submit a test form entry.
2. Check your Formspree dashboard and email for the submission.

The free Formspree tier allows 50 submissions per month.

## Customising Content

### Business Contact Details

Update the following across the HTML files:

- **Phone number**: Search for the phone number in `index.html`, `contact.html`, and the footer sections of all pages.
- **Email address**: Search for the email address in `contact.html` and footer sections.
- **Address / Service area**: Update the address in `contact.html` and the JSON-LD structured data in `index.html`.

### Images

Replace the images in the `images/` directory with your own project photos. Update the `alt` attributes on `<img>` tags to describe the new images.

### Portfolio Projects

Edit the `projects` array in `js/gallery.js` to add, remove, or update portfolio items.

### Blog Posts

Add new blog posts by creating HTML files in the `blog/` directory following the structure of `post-1.html` and `post-2.html`. Update `blog.html` to include a preview card for each new post.

## Running Tests

This project uses [Vitest](https://vitest.dev/) with jsdom for testing.

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm test
```

This runs all test files in the `tests/` directory. Tests include property-based tests (using fast-check) and unit tests covering gallery filtering, form validation, lightbox navigation, and more.

## Technology

- **HTML5** — semantic markup with ARIA landmarks
- **CSS3** — custom properties, flexbox, grid, media queries
- **JavaScript** — vanilla ES6 modules
- **Formspree** — client-side form submission service
- **Vitest** — test runner
- **fast-check** — property-based testing
- **jsdom** — DOM simulation for tests

## License

All rights reserved. © Pilkington Floors.
