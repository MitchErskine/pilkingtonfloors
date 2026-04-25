# Requirements Document

## Introduction

Pilkington Floors is a residential and commercial flooring company specialising in Amtico flooring installation and renovation. This document defines the requirements for a modern, professional portfolio website to be hosted on GitHub Pages as a static site. The website will showcase completed projects, generate leads through quote requests and contact forms, clearly explain services offered, and build trust through testimonials and certifications. The target audience includes homeowners, landlords, and small-to-medium business owners seeking reliable flooring services. The design must be clean, mobile-first, and visually driven, with a tone that is professional, approachable, and trustworthy.

## Glossary

- **Website**: The static Pilkington Floors portfolio website hosted on GitHub Pages
- **Visitor**: A person browsing the Website, typically a homeowner, landlord, or business owner
- **Hero_Section**: The prominent banner area at the top of the Home page containing a headline, supporting text, and a primary call-to-action
- **Call_To_Action**: A button or link prompting the Visitor to take a specific action such as requesting a quote or making contact
- **Gallery**: The portfolio section displaying completed flooring project images with filtering capability
- **Lightbox**: A modal overlay that displays a full-size image when a Visitor clicks a gallery thumbnail
- **Before_After_Slider**: An interactive component allowing the Visitor to drag a divider to compare before and after images of a flooring project
- **Quote_Form**: A contact form enabling the Visitor to submit their details and project requirements to request a free quote
- **Contact_Form**: A form on the Contact page enabling the Visitor to send a general enquiry
- **Sticky_Header**: A navigation bar that remains fixed at the top of the viewport as the Visitor scrolls
- **Filter**: A UI control in the Gallery allowing the Visitor to narrow displayed projects by category such as hardwood, commercial, or residential
- **Service_Card**: A UI component displaying a flooring service type with an icon, title, and brief description
- **Testimonial_Card**: A UI component displaying a customer review with the reviewer name, rating, and review text
- **FAQ_Section**: An expandable accordion section addressing common customer questions
- **Blog_Section**: A content area for flooring tips, maintenance advice, and industry articles
- **Style_Guide**: The defined set of colours, fonts, and spacing rules derived from the Pilkington Floors logo
- **SEO**: Search Engine Optimisation — techniques applied to improve the Website ranking in search engine results
- **Responsive_Layout**: A design approach ensuring the Website adapts to all screen sizes with a mobile-first strategy

---

## Requirements

### Requirement 1: Site Navigation and Sticky Header

**User Story:** As a Visitor, I want a persistent navigation bar so that I can easily access any page from anywhere on the Website.

#### Acceptance Criteria

1. THE Website SHALL display a Sticky_Header containing the Pilkington Floors logo and navigation links to Home, About Us, Services, Portfolio, Testimonials, Blog, and Contact pages
2. WHILE the Visitor scrolls down the page, THE Sticky_Header SHALL remain fixed at the top of the viewport
3. THE Sticky_Header SHALL include a prominent Call_To_Action button labelled "Get a Free Quote" that links to the Quote_Form
4. WHEN the Visitor views the Website on a screen width of 768px or less, THE Sticky_Header SHALL collapse the navigation links into a hamburger menu icon
5. WHEN the Visitor clicks the hamburger menu icon, THE Website SHALL display the navigation links in a full-width dropdown or slide-in panel
6. WHEN the Visitor clicks a navigation link in the mobile menu, THE Website SHALL close the mobile menu and scroll to or navigate to the selected page

---

### Requirement 2: Home Page and Hero Section

**User Story:** As a Visitor, I want an engaging home page so that I immediately understand what Pilkington Floors offers and how to get started.

#### Acceptance Criteria

1. THE Website SHALL display a Hero_Section on the Home page containing a headline, supporting text, and a primary Call_To_Action button labelled "Get a Free Quote"
2. THE Hero_Section SHALL include a high-quality background image showcasing a completed flooring project
3. WHEN the Visitor clicks the "Get a Free Quote" Call_To_Action, THE Website SHALL navigate the Visitor to the Quote_Form on the Contact page
4. THE Home page SHALL display a summary section highlighting key services offered by Pilkington Floors with links to the Services page
5. THE Home page SHALL display a selection of featured project images from the Gallery with a link to the full Portfolio page
6. THE Home page SHALL display a selection of customer testimonials from the Testimonials page
7. THE Home page SHALL display trust indicators including years of experience, number of completed projects, and any relevant certifications

---

### Requirement 3: About Us Page

**User Story:** As a Visitor, I want to learn about Pilkington Floors' history and values so that I can assess whether the company is trustworthy and experienced.

#### Acceptance Criteria

1. THE Website SHALL display an About Us page containing the company story, years of experience, and core values
2. THE About Us page SHALL describe the company specialisation in Amtico flooring
3. THE About Us page SHALL include a section for certifications, accreditations, or trade memberships
4. THE About Us page SHALL include a Call_To_Action linking to the Contact page

---

### Requirement 4: Services Page

**User Story:** As a Visitor, I want a clear breakdown of flooring services so that I can determine whether Pilkington Floors offers what I need.

#### Acceptance Criteria

1. THE Website SHALL display a Services page listing all flooring types and services offered by Pilkington Floors
2. THE Services page SHALL present each service using a Service_Card containing an icon or image, a title, and a brief description
3. THE Services page SHALL include services for Amtico, hardwood, laminate, vinyl, carpet, and commercial flooring at minimum
4. THE Services page SHALL distinguish between residential and commercial service offerings
5. EACH Service_Card SHALL include a Call_To_Action linking to the Quote_Form or Contact page
6. THE Services page SHALL use clear, jargon-free language focused on benefits to the customer

---

### Requirement 5: Portfolio Gallery with Filtering

**User Story:** As a Visitor, I want to browse completed flooring projects by category so that I can see examples relevant to my own project.

#### Acceptance Criteria

1. THE Website SHALL display a Portfolio page containing a Gallery of completed flooring project images
2. THE Gallery SHALL display project images as a responsive grid of thumbnails
3. THE Gallery SHALL provide Filter controls allowing the Visitor to filter projects by category including hardwood, laminate, vinyl, Amtico, carpet, commercial, and residential
4. WHEN the Visitor selects a Filter category, THE Gallery SHALL display only projects matching the selected category
5. WHEN the Visitor selects "All" in the Filter, THE Gallery SHALL display all project images
6. THE Gallery SHALL apply a subtle animation when filtering transitions between categories
7. EACH Gallery thumbnail SHALL display a hover effect revealing the project category or a brief description

---

### Requirement 6: Lightbox Image Viewer

**User Story:** As a Visitor, I want to view project images in full size so that I can appreciate the quality of the flooring work.

#### Acceptance Criteria

1. WHEN the Visitor clicks a Gallery thumbnail, THE Website SHALL open a Lightbox displaying the full-size image
2. THE Lightbox SHALL include navigation controls allowing the Visitor to move to the next or previous image in the Gallery
3. THE Lightbox SHALL include a close button allowing the Visitor to return to the Gallery
4. WHEN the Visitor presses the Escape key, THE Lightbox SHALL close and return the Visitor to the Gallery
5. WHEN the Visitor clicks outside the Lightbox image area, THE Lightbox SHALL close
6. THE Lightbox SHALL be accessible via keyboard navigation using arrow keys for next and previous images

---

### Requirement 7: Before and After Project Slider

**User Story:** As a Visitor, I want to compare before and after images of flooring projects so that I can see the transformation quality.

#### Acceptance Criteria

1. THE Website SHALL include at least one Before_After_Slider component on the Portfolio page or Home page
2. THE Before_After_Slider SHALL display a before image and an after image side by side separated by a draggable divider
3. WHEN the Visitor drags the divider, THE Before_After_Slider SHALL reveal more of one image and less of the other proportionally
4. THE Before_After_Slider SHALL be operable via touch gestures on mobile devices
5. THE Before_After_Slider SHALL label the before and after sides clearly

---

### Requirement 8: Testimonials Page

**User Story:** As a Visitor, I want to read customer reviews so that I can gauge the quality and reliability of Pilkington Floors.

#### Acceptance Criteria

1. THE Website SHALL display a Testimonials page containing customer reviews
2. EACH review SHALL be displayed using a Testimonial_Card containing the reviewer name, a star rating out of five, and the review text
3. THE Testimonials page SHALL display a minimum of three customer testimonials
4. THE Testimonials page SHALL be structured to allow future integration with Google Reviews or a similar third-party review platform
5. THE Testimonials page SHALL include a Call_To_Action encouraging the Visitor to request a quote

---

### Requirement 9: Contact Page and Quote Request Form

**User Story:** As a Visitor, I want to easily request a quote or send an enquiry so that I can get in touch with Pilkington Floors.

#### Acceptance Criteria

1. THE Website SHALL display a Contact page containing a Quote_Form, phone number, email address, and service area information
2. THE Quote_Form SHALL include fields for the Visitor name, email address, phone number, flooring type of interest, project description, and a submit button
3. WHEN the Visitor submits the Quote_Form with all required fields completed, THE Website SHALL send the form data to a configured endpoint or email service
4. IF the Visitor submits the Quote_Form with one or more required fields empty, THEN THE Website SHALL display a validation error message next to each incomplete required field
5. IF the Visitor enters an invalid email address format, THEN THE Website SHALL display a validation error message indicating the correct format
6. WHEN the Quote_Form is submitted successfully, THE Website SHALL display a confirmation message thanking the Visitor
7. THE Contact page SHALL display an embedded map showing the Pilkington Floors service area
8. THE Contact page SHALL include a link to the Pilkington Floors Instagram page at https://www.instagram.com/pilkington_floors/

---

### Requirement 10: Blog Section

**User Story:** As a Visitor, I want to read flooring tips and maintenance advice so that I can make informed decisions and maintain my floors properly.

#### Acceptance Criteria

1. THE Website SHALL display a Blog_Section accessible from the main navigation
2. THE Blog_Section SHALL display blog post previews as cards containing a title, excerpt, date, and a "Read More" link
3. WHEN the Visitor clicks a "Read More" link, THE Website SHALL navigate to the full blog post page
4. THE Blog_Section SHALL support multiple blog posts displayed in reverse chronological order
5. EACH blog post page SHALL include a Call_To_Action linking to the Quote_Form or Contact page

---

### Requirement 11: FAQ Section

**User Story:** As a Visitor, I want answers to common flooring questions so that I can resolve my queries without needing to call.

#### Acceptance Criteria

1. THE Website SHALL display a FAQ_Section on the Home page or as a dedicated section accessible from the navigation
2. THE FAQ_Section SHALL present questions and answers in an accordion format where only one answer is expanded at a time
3. WHEN the Visitor clicks a question in the FAQ_Section, THE Website SHALL expand the answer and collapse any previously expanded answer
4. THE FAQ_Section SHALL include a minimum of five frequently asked questions covering topics such as pricing, timelines, flooring types, and aftercare

---

### Requirement 12: Responsive Mobile-First Design

**User Story:** As a Visitor using a mobile device, I want the Website to be fully functional and visually appealing so that I can browse and enquire on any device.

#### Acceptance Criteria

1. THE Website SHALL use a mobile-first Responsive_Layout that adapts to screen widths from 320px to 2560px
2. THE Website SHALL render all pages without horizontal scrolling on any supported screen width
3. THE Gallery grid SHALL adjust the number of columns based on the available screen width
4. THE Quote_Form and Contact_Form fields SHALL stack vertically on screen widths of 768px or less
5. THE Before_After_Slider SHALL be fully operable via touch input on mobile devices
6. ALL Call_To_Action buttons SHALL have a minimum touch target size of 44px by 44px on mobile devices

---

### Requirement 13: Visual Design and Style Guide

**User Story:** As a Visitor, I want a clean, modern, and professional visual experience so that I perceive Pilkington Floors as a high-quality brand.

#### Acceptance Criteria

1. THE Website SHALL derive its colour palette and font choices from the Pilkington Floors logo located at images/logo.png
2. THE Website SHALL use a clean, minimal layout with generous whitespace
3. THE Website SHALL apply subtle animations on scroll-triggered elements such as fade-in and slide-up effects
4. THE Website SHALL apply hover effects on interactive elements including buttons, Service_Cards, Testimonial_Cards, and Gallery thumbnails
5. THE Website SHALL use consistent spacing, border radius, and shadow styles across all UI components as defined in the Style_Guide
6. THE Website SHALL use high-quality imagery throughout, sourced from the images directory in the project workspace

---

### Requirement 14: SEO and Performance

**User Story:** As the business owner, I want the Website to rank well in search engines and load quickly so that potential customers can find and access the site easily.

#### Acceptance Criteria

1. THE Website SHALL include semantic HTML5 elements including header, nav, main, section, article, and footer
2. THE Website SHALL include unique meta title and meta description tags on each page
3. THE Website SHALL include Open Graph meta tags for social media sharing
4. THE Website SHALL include alt text on all images describing the image content
5. THE Website SHALL use optimised image formats and lazy loading for images below the fold
6. THE Website SHALL achieve a Lighthouse Performance score of 90 or above on mobile
7. THE Website SHALL include a structured data markup for local business information using Schema.org vocabulary
8. THE Website SHALL include a sitemap.xml file listing all pages

---

### Requirement 15: Accessibility

**User Story:** As a Visitor with accessibility needs, I want the Website to be navigable and readable so that I can access all content and features.

#### Acceptance Criteria

1. THE Website SHALL meet WCAG 2.1 Level AA colour contrast requirements for all text and interactive elements
2. THE Website SHALL be fully navigable using keyboard-only input
3. ALL interactive elements SHALL have visible focus indicators
4. ALL form fields SHALL have associated label elements
5. THE Lightbox SHALL trap focus within the modal while open and return focus to the triggering element on close
6. THE Website SHALL include ARIA landmarks for header, navigation, main content, and footer regions
7. THE Website SHALL include skip navigation links allowing keyboard users to bypass the Sticky_Header

---

### Requirement 16: GitHub Pages Hosting Compatibility

**User Story:** As the business owner, I want the Website to be deployable on GitHub Pages so that hosting is simple and cost-effective.

#### Acceptance Criteria

1. THE Website SHALL be built as a static site using only HTML, CSS, and JavaScript without requiring a server-side runtime
2. THE Website SHALL function correctly when served from the root or a subdirectory of a GitHub Pages domain
3. THE Website SHALL not depend on server-side form processing; form submissions SHALL use a client-side compatible service such as Formspree or EmailJS
4. ALL asset paths in the Website SHALL use relative paths to ensure compatibility with GitHub Pages deployment
5. THE Website SHALL include a README.md file with deployment instructions for GitHub Pages
