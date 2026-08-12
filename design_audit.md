# Portfolio Experience Audit — Baseline

## Executive assessment

The current portfolio already demonstrates substantial craft: the WebGL hero, mosaic reveal, pinned work showcase, campaign media, custom cursor, and responsive fallbacks establish a clear experimental direction. Its strongest issue is not lack of visual work; it is **too many competing visual languages**. The result sometimes reads as a collection of impressive studies rather than one deliberate story about a creative developer who ships high-quality digital products.

The implementation is also visually dense on the homepage. It uses an editorial blue hero, pixel-interface type, monochrome 3D, black-and-white terminal UI, generative art, a mosaic scroll sequence, a theater carousel, pinned horizontal work, an archive index, floating posters, and a journal. Each can work independently, but together they dilute hierarchy and make the work itself compete with decorative transitions.

## Highest-priority problems

| Priority | Finding | Effect on experience | Direction for correction |
| --- | --- | --- | --- |
| P0 | The first viewport overlays the large "Panca" display type, 3D model, metadata rows, two time systems, fixed header/footer, and cookie prompt. | The name is memorable, but the core value proposition and primary action are difficult to scan quickly. | Preserve the blue editorial identity, but simplify hero information into a clear role, concise thesis, and one visible work CTA. Defer secondary clocks and decorative metadata. |
| P0 | The homepage contains several long, high-motion sections before and after the selected-work narrative. | Attention is fragmented; the main portfolio work does not arrive quickly enough for a hiring client. | Reorder the page into a concise narrative: introduction, proof of craft, selected work, capabilities/process, contact. Retain only motion that advances this flow. |
| P0 | Visual primitives are inconsistent: terminal/pixel UI, soft Helvetica editorial type, scanlines, dot matrix, generative canvases, poster drift, and campaign media coexist without a hierarchy. | The site feels designed in parts rather than art-directed as a whole. | Establish a small token set and choose one primary visual grammar: editorial blue/black/white, utilitarian mono labels, humane grotesk display type, framed media, and controlled grain. |
| P1 | Project pages provide rich metadata but currently follow a conventional information-column + image layout, with no perceived handoff from card to detail page. | Project browsing lacks the decisive “enter the work” moment requested in the brief. | Introduce a lightweight shared-image transition and project cover treatment; prioritize project name, role, context, and visual proof before detailed metadata. |
| P1 | The fixed header and footer compete with the hero and ongoing content, while the header has no compact mobile navigation state. | Persistent chrome lowers focus and risks cramped small screens. | Use a quieter, accessible header that changes tone after the hero and a mobile menu sheet; reserve the footer bar for a minimal status/progress treatment. |
| P1 | Motion uses several mechanisms and styles: step transitions, CSS keyframes, Framer Motion reveals, pinned scroll, custom cursor, and 3D auto-rotation. | Motion character is inconsistent and may feel more effect-driven than story-driven. | Create a motion contract: one shared easing family, limited duration tiers, transform/opacity for UI, scroll motion only on major narrative moments, and reduced-motion equivalents. |
| P2 | The visual screenshot shows the cookie panel covering a large part of the hero and two city clock systems with inconsistent city labels. | First-use experience is cluttered and undermines perceived polish. | Make the consent panel compact and unobtrusive, correct location metadata, and keep only one contextually relevant location/time cue. |

## Design direction

The redesign will use an **editorial instrument-panel** direction. Its purpose is to make Panca’s portfolio feel like a precise creative practice: blue is an intentional signal color for the opening and key actions; black and warm white hold the reading experience; mono labels provide the system layer; bold grotesk typography carries emotional hierarchy; and imagery is treated as framed evidence rather than background decoration.

The hero should communicate within one screen: **Panca Maulana, creative web developer, interactive products that perform**, followed by one direct action to explore selected work. The existing 3D character remains a distinctive identity asset, but it becomes an atmospheric layer rather than competing foreground content. The project showcase becomes the narrative centrepiece, with clearer category, role, year, result, and a confident entry transition.

## Proposed design system

| System | Decision |
| --- | --- |
| Color | Ink `#080808`, warm paper `#F3F2EC`, signal blue `#1400FF`, subdued text `rgba(243,242,236,.66)`, hairline border `rgba(243,242,236,.16)`. Accent is used sparingly for hero, active navigation, and high-intent action states. |
| Typography | Grotesk display for `Display`, `H1`, `H2`; Courier-style mono for labels, metadata, and short body support text. Type scale is fluid but limited to defined display, heading, body, and caption levels. |
| Spacing | Use a 4px base with named intervals: 8, 12, 16, 24, 32, 48, 64, 96, 128, 160. Page gutters should use `clamp(16px, 4vw, 64px)` and content max width 1440px. |
| Grid | 12 columns from 900px upward; 6 columns at tablet; a single column at mobile. Use media-first 7/5 or 8/4 compositions for project storytelling. |
| Components | Reuse framed media, pill metadata, mono eyebrow, animated underline links, one primary circular/rounded CTA, and consistent hover state. Remove component-specific arbitrary borders and easing values. |
| Motion | `--ease-out: cubic-bezier(.22,1,.36,1)`; quick 180ms, standard 360ms, reveal 700ms. Use simple transform/opacity UI feedback, masked media reveal for key content, one pinned experience for the selected work, and a restrained page transition. |
| Responsive behavior | Disable the custom cursor and simplify 3D on coarse pointers; replace horizontal scroll with touch-native snap cards; avoid auto-playing media on mobile; preserve hierarchy and touch targets rather than shrinking desktop composition. |

## Implementation priorities

The first implementation pass should centralize tokens and improve the hero, navigation, primary work showcase, and project-detail handoff. Decorative sections that do not support the story will be reduced or visually quieted rather than expanded. Existing contact, blog, media, and mobile fallback functionality should remain intact.


## Visual validation after first redesign pass

The local visual review confirms that the new hero now presents a coherent, readable hierarchy: the smaller practice label, concise role line, large two-line proposition, supporting summary, and visible “Explore selected work” action form a clear first-screen path. The existing 3D sculpture remains present, but it now supports rather than replaces the message. The header is more legible because it uses simple marked navigation with numerical context instead of competing clock systems.

The homepage flow is also materially shorter and more purposeful. The selected-work section follows the introduction and process mosaic, then continues to capabilities, archive, journal, and a direct contact close. The visual language is now more consistent around blue, ink, warm white, editorial type, mono labels, media framing, and hairline borders. The existing cookie panel remains functionally visible and should be accepted or rejected during a user’s first visit; it is intentionally smaller but still covers a lower-left part of the hero until dismissed.


## Project archive validation

The project archive now opens with a clear title and three-column supporting rationale, then uses repeated media-first case-study rows. Each row presents the project number, year, primary discipline, a concise summary, and a visible case-study action. This makes the project browsing path more scannable and materially stronger than the prior alternating generic card composition.

The visual review confirms the limited palette and media framing remain consistent with the new hero. One live condition remains external to the redesign: the cookie preference panel stays present until a visitor chooses an option, so its first-visit overlay can still cover part of the lower left of short opening screens. No content is obscured after dismissal, and the consent interaction itself was preserved.


## Case-study validation

The case-study page resolves into a media-first project narrative with a strong opening title, a concise project description, role, visible back-to-work control, a full project cover, clearly separated disciplines and technology, editorial body copy, a numbered delivery list, campaign media, and previous/next links. The visual hierarchy is considerably clearer than the prior sidebar-first details view, and the case-study screen retains the existing campaign video and poster functionality.

The title initially appears partially decoded during the existing `DecodeText` animation but settles correctly after the reveal completes. This preserves a controlled typographic entrance without preventing the title from being read. The cookie panel was again visible only because the review browser had not yet recorded a preference.
