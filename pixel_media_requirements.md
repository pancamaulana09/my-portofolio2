# Pixel Media and Animated TV Requirements

## Reference interpretation

The supplied frames show two high-level patterns: a large black section with a curated proof/logo grid, and a scroll-driven media stage where a video is progressively revealed through a dense pixel/ASCII matrix inside a curved television-like frame. The adaptation will use the user's own projects, project thumbnails, and available campaign media; it will not reproduce the reference studio's logos, assets, copy, or exact composition.

## Original implementation brief

The new portfolio section will be called **Signal / Selected proof**. It will sit after the practice/capability index and before the archive or journal, so the narrative moves from what Panca does into a tangible proof surface.

The section will use a sticky scroll stage on desktop. The video remains a real HTML `<video>` element for accessibility and native controls, while a CSS/DOM pixel matrix overlays it using a low-density character grid. Scroll progress will control a `--signal-reveal` variable: at the start the video is heavily obscured by the pixel layer; as the visitor scrolls, the video becomes clearer and the pixel grid softens. The television frame will use a responsive 16:9 stage with rounded corners, an outer bezel, scanline overlay, screen glow, subtle curvature, and a small status readout. The interaction must feel like a broadcast signal resolving, not like a generic filter.

The supporting proof grid will present the user's actual projects as monochrome tiles with project number, field, and a short label. On hover/focus, each tile reveals its image or accent while preserving text contrast. On touch devices the grid becomes one or two columns with no hover dependency. The grid will include an explicit `aria-label` and all links will remain keyboard reachable.

## Performance constraints

The video will be lazy-loaded, muted, plays inline, and will only autoplay when the user has not requested reduced motion and the section is near the viewport. A poster/thumbnail remains visible when video is unavailable. The pixel overlay will use a bounded CSS grid rather than a per-frame canvas simulation, with a capped number of cells and a `prefers-reduced-motion` fallback. The TV frame will be purely CSS, avoiding a large generated image asset. Mobile will use a shorter sticky section or a normal document flow so scrolling never traps the user.


## Initial validation

The local build renders both new sections in the homepage document: the proof grid presents all seven existing projects with year, name, and primary discipline; the signal stage exposes its media controls and broadcast-status text. The pixel glyphs are intentionally included as presentational text in the DOM, so they appear in text extraction but are marked `aria-hidden` in the rendered interface and do not affect screen-reader reading order.


## Link behavior note

The signal stage now has a stable `#signal` anchor for future direct links. The local single-page development server retained its current browser scroll position when the hash was opened, so the visual verification continues through normal page scrolling rather than relying on hash restoration in development mode.
