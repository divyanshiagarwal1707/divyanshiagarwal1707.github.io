# Divyanshi Agarwal — Personal Portfolio

A personal portfolio built with React, TypeScript, Tailwind CSS, and Vite, capturing the editorial visual language and motion dynamics from the design reference.

## 🌟 Highlights & Features

1. **Opening Sequence & Particle Portrait Hero**:
   - Four-second opening sequence: Single white dot with vertical movement & rotating stroke $\rightarrow$ settling letter fragments spelling `DIVYANSHI` $\rightarrow$ transient character mask morphing into `PORTFOLIO` $\rightarrow$ fine particles gathering into Divyanshi's high-contrast black-and-white portrait.
   - Finished hero layering: Dark `#08080C` background, halo grain, portrait with visible eyes, and foreground `PORTFOLIO` across shoulders with steel-blue gradient.
   - Dynamic scroll dispersion into specks on scroll-down, seamlessly restoring completed hero upon return to top.
   - Skip intro control and `sessionStorage` persistence (plays once per session; respects `prefers-reduced-motion`).

2. **Masthead & Global Navigation**:
   - Slim desktop masthead: `DIVYANSHI AGARWAL` on left; `HOME`, `ABOUT`, `WHAT I DO`, `PROJECTS`, `PLAY`, `CONTACT` on right.
   - Active coral underline and muted red-pink indicator.
   - Fine horizontal gradient divider rule.
   - Responsive keyboard-accessible mobile drawer.

3. **Sections on Home (`/`)**:
   - **Intro**: Two-column layout with `ABOUT ME` label, `Intro` heading, and charcoal panel containing the bio and direct link to `/about`.
   - **The Stack**: Dense, grouped skill rows with subtle `/` separators.
   - **What I Do**: Right-aligned `WHAT / I DO` header with 5 capability rows inverting to pale lavender-grey on hover/focus, and smooth accordion explanations.
   - **Featured Projects**: 3 alternating rows featuring rich illustrative cards for:
     - `LuxeLoom Jewellery`: Live metal calculation engine, Razorpay test checkout, and chatbot status.
     - `SecureBank Server & Database`: Monospace interactive terminal with multithreaded socket handling and SQLite WAL audit logging.
     - `Law Firm Consultation Website`: Corporate law service overview and 3-step intake booking flow.
   - **Experience & Certifications**: Sangam Event Core Team Member, Smart India Hackathon Participant, Table Tennis Tournament Winner, and certifications anchored at `/#certifications`.
   - **Interactive Typographic Arcade ("BREAK IT IF YOU CAN")**:
     - Custom 5×7 bitmap brick matrix spelling `AI THAT` and `SHIPS` in destructible white blocks.
     - Glowing coral-orange paddle and bouncing ball with physics, sound effects (Web Audio API), score tracking, and restart control.
     - Arrow keys scoped to board focus so page scrolling remains uninterrupted.
   - **Contact & Footer**:
     - Three-line invitation `LET'S BUILD SOMETHING TOGETHER` (`SOMETHING` in warm coral-to-amber italic).
     - Working `mailto:` email action and one-click "Copy email" button with dynamic feedback.
     - Charcoal info panel and "Back to top ↑" smooth scroll.

4. **Dedicated Subpages**:
   - **`/about`**: Full personal narrative, concrete project examples, formal education (BCA AIML CGPA 8.15, Senior Secondary 81.60%, Secondary 95%), and working "Download Résumé (PDF)" button.
   - **`/projects`**: Case study deep-dives with index jump links (`#luxeloom`, `#securebank`, `#law-firm-website`), 4-part case studies (User & Problem, What Built, Implementation Decision, Evidence & Code), architecture pipelines, and GitHub repository links.

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

- `src/data/portfolioData.ts`: Central editable source for all personal data, URLs, skills, experiences, and case studies.
- `src/components/OpeningHero.tsx`: Canvas particle portrait and sequenced opening animation.
- `src/components/Masthead.tsx`: Slim header with scrollspy and route coordination.
- `src/components/IntroSection.tsx`: Charcoal introductory panel.
- `src/components/SkillsStack.tsx`: The Stack categorized skill rows.
- `src/components/WhatIDo.tsx`: Inverted capability rows with accordion interactions.
- `src/components/FeaturedProjects.tsx`: Alternating project showcase with rich previews.
- `src/components/ExperienceCertifications.tsx`: Activities and verified credentials.
- `src/components/ArcadeGame.tsx`: Canvas breakout game with 5×7 brick bitmap font.
- `src/components/ContactFooter.tsx`: Contact invitation, copy-email toast, and footer.
- `src/pages/HomePage.tsx`: Complete single-page home scroll composition.
- `src/pages/AboutPage.tsx`: Full background and credentials page.
- `src/pages/ProjectsPage.tsx`: Deep-dive architectural case studies.
- `public/`: Divyanshi's portrait and PDF résumé.

