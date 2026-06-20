# Challenge Report: Milestone 1 Performance & Responsiveness

## Challenge Summary

**Overall risk assessment**: HIGH

Milestone 1 implements the core theme, global styling, preloader, and interactive sections. While it demonstrates strong visual styling and handles animation throttling (visibility state and motion preferences) correctly, it suffers from several severe layout responsiveness bugs and performance bottlenecks under stress. Most notably, the root application container completely blocks vertical scrolling, and the dashboard showcase overlay overflows on mobile viewports.

---

## Challenges

### [Critical] Challenge 1: Total Vertical Scroll Blocking on All Viewports
- **Assumption challenged**: That using `overflow: 'hidden'` on the root application wrapper is a safe way to prevent horizontal scrollbars from background canvas elements or glows.
- **Attack scenario**: When the page is loaded on any device (375px, 768px, 1440px), the content height exceeds the viewport height (approx. 5000px of vertical sections). Since the root wrapping `div` in `App.jsx` has `overflow: 'hidden'` hardcoded on it, the browser disables vertical scrolling. The user is trapped on the Hero fold and cannot access any subsequent sections (About, Services, How It Works, Pricing, Calendar, or Footer).
- **Blast radius**: Critical. The website is completely unusable/unscrollable.
- **Mitigation**: Change `overflow: 'hidden'` to `overflow: 'visible'` or `overflow-x: 'hidden'` on the root container in `App.jsx`. Rely on `body { overflow-x: hidden; }` (already in `index.css`) to prevent horizontal drifting overflows.

### [High] Challenge 2: Dashboard Image Overlay Text Overflow on Mobile (375px)
- **Assumption challenged**: That absolutely positioned text overlay boxes inside responsive images scale down proportionally.
- **Attack scenario**: On mobile viewports (e.g. 375px), the dashboard showcase image in `Services.jsx` scales to 100% width, making its container height only ~175px (assuming a 16:9 widescreen layout). The text overlay inside the showcase is absolutely positioned at `bottom: 2rem; left: 2rem;` and contains a heading (1.8rem) plus a 120-character description (1rem). The text wraps extensively due to the narrow width (approx. 247px text width), requiring ~170px of vertical height. This causes the text overlay to collide with the top bounds, spill out of the container, or completely hide the image beneath it.
- **Blast radius**: High. Unreadable text and broken UI elements on mobile viewports.
- **Mitigation**: On mobile viewports, remove the absolute positioning. Position the text container statically below or above the image, or hide the detailed overlay paragraph and use a responsive media query (e.g., tailwind's `sm:` or `md:`) to adjust font sizes and padding.

### [Medium] Challenge 3: Process Step Glass Cards "Squeeze" on Mobile (375px)
- **Assumption challenged**: That horizontal flex layouts with fixed elements leave enough width for text containers on mobile screens.
- **Attack scenario**: In `HowItWorks.jsx`, each step uses a flex row with `gap: '2rem'` (32px), a step number circle of `64px` wide (flexShrink: 0), and a `.glass` text box. At a 375px viewport (where the outer container has 2rem/64px total padding), the available horizontal space for the glass card is only `375 - 64 (container padding) - 64 (number circle) - 32 (gap) = 215px`. Inside the glass card, `padding: '2rem'` (64px total) reduces the text content width to just `151px`. For a 320px viewport, the card width falls to `160px` (violating responsive minimums) and content width to `96px`.
- **Blast radius**: Medium. The text is squeezed into a extremely narrow vertical band, forcing headers and words to wrap awkwardly, creating a poor visual experience.
- **Mitigation**: Switch to a vertical block layout (`flex-direction: column`) on mobile viewports (e.g., `< 640px`), placing the step number above the text card and decreasing card padding to `1rem` or `1.5rem`.

### [Medium] Challenge 4: Lack of Throttling/Debouncing on Window Resize Listener
- **Assumption challenged**: That rapid browser resize events do not impact canvas layout recalculation and rendering performance.
- **Attack scenario**: In `BackgroundParticles.jsx`, the resize event handler:
  ```javascript
  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  };
  ```
  is added directly to `window.addEventListener('resize', resizeCanvas)`. In desktop browsers, dragging the window corner to resize it triggers this event dozens of times per second. Because setting `canvas.width` and `canvas.height` forces the browser to discard the canvas GPU context backing store and allocate a new one, this causes heavy CPU/GPU churn and rendering jank. On high-DPR retina displays, this can crash the tab or lead to significant lag.
- **Blast radius**: Medium. Temporary responsiveness lag and potential browser tab crashes during active window resizing.
- **Mitigation**: Wrap `resizeCanvas` with a debounce function or limit execution using `requestAnimationFrame` to run at most once per frame.

### [Low] Challenge 5: Pricing Card Overlap & Screen Overflow on Narrow Screens
- **Assumption challenged**: That CSS Grid with `repeat(auto-fit, minmax(300px, 1fr))` scales down seamlessly to small screen sizes.
- **Attack scenario**: In `Pricing.jsx`, the plans are arranged in a grid with `minmax(300px, 1fr)` columns. On a 320px viewport, the card width (300px) combined with the container padding (64px) equals 364px, which exceeds the screen size. This results in a horizontal scrollbar or clipped text card borders. Additionally, on mobile/tablet viewports where cards stack vertically, the middle card is scaled by `scale(1.05)` due to the `popular` attribute, which causes it to overlap vertically with the card above it or below it if the grid gaps are not large enough.
- **Blast radius**: Low/Medium. Layout visual overlap and horizontal scrolling on narrow screens.
- **Mitigation**: Change grid min-width bounds on small viewports (e.g., `minmax(250px, 1fr)`) or adjust scale factors and grid gaps dynamically based on screens.

---

## Stress Test Results

- **Window Resize Loop** → Rapid viewport resizing between 1440px, 1024px, 768px, and 375px → Page remains functional, but high CPU usage and rendering jank occurs because of unthrottled canvas resizing → **PASS (No crashes, but performance jank observed)**
- **Horizontal Scroll Check (Glows & Canvas)** → Verify no horizontal scrollbar is introduced by glows/canvas on 375px, 768px, and 1440px → No horizontal scrollbars are introduced because the background element wrappers use `overflow-hidden` → **PASS**
- **Vertical Scroll Check (Entire Page)** → Verify vertical scrolling is functional across all viewports → Setting `overflow: 'hidden'` on the root div blocks vertical scrolling entirely, preventing the user from viewing the page's sections → **FAIL**
- **Canvas Visibility state (Tab Hidden)** → Set `document.visibilityState === 'hidden'` and monitor requestAnimationFrame loop → Loop halts immediately (cancelAnimationFrame is called, and tick returns early without queuing new frames) → **PASS**
- **Canvas Prefers-Reduced-Motion** → Emulate `prefers-reduced-motion: reduce` and inspect canvas → Component returns `null` and canvas element is not rendered, preventing any animation and computation → **PASS**
- **Services Dashboard Showcase (375px Mobile)** → Measure dashboard showcase height vs absolute text overlay height on 375px → Text overlay height (~170px) is nearly equal to or exceeds scaled image showcase height (~175px), causing collision and overflow → **FAIL**
- **Process Steps Squeezing (375px Mobile)** → Measure glass card content area width on 375px → Glass card width is 215px, and content width is only 151px, causing severe vertical squeezing of titles and description text → **FAIL**

---

## Unchallenged Areas

- **Preloader Animation typing speed** — Out of scope for responsiveness and layout testing. Typing speed and time delays are static parameters.
- **Google Calendar bookings styling** — Iframe embeds are third-party controlled widgets and layout spacing around them was not actively stress-tested.
