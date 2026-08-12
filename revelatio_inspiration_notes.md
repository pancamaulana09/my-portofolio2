# Revelatio Studio Reference Study — Original Adaptation Notes

## Scope and use

This study examines the public information architecture and interaction principles visible on [Revelatio Studio](https://revelatio.studio/) and its [About page](https://revelatio.studio/about). It does **not** reuse source code, visual assets, copy, or exact layouts. The portfolio adaptation will use only transferable principles, translated into Panca Maulana’s own editorial blue/ink identity, personal project archive, and existing 3D practice.

## Public design patterns observed

| Pattern | What the public site communicates | Original portfolio interpretation |
| --- | --- | --- |
| Clear studio proposition | The opening statement pairs service categories with an integrated point of view. | Keep the personal hero concise: creative web development, interactive products, and end-to-end execution. |
| Sparse global navigation | Navigation is simple, with a deliberate entry to contact and language/context options. | Use a quiet project-first menu, a mobile menu sheet, and a direct contact action rather than dense persistent chrome. |
| Work as evidence | The homepage foregrounds a curated group of projects, each with category and concise narrative. | Present seven personal case studies through a media-first selected-work gallery with role, year, discipline, and a clear “enter case study” action. |
| Capability taxonomy | Service groups are organized by outcome and practice area rather than by unrelated UI cards. | Retain the existing manifesto/capabilities material but render it as structured proof of practice, not decorative content. |
| Proof and outcomes | Client counts, growth results, and testimonials sit after work rather than replacing it. | Add only truthful portfolio proof in a later content pass; do not invent metrics or testimonials. |
| Concluding contact system | Closing content repeats a clear invitation, location, and direct communication path. | Retain the redesigned high-intent contact footer with Surabaya, email, and GitHub context. |
| Responsive restraint | The public content structure remains readable without relying on a single heavy effect. | Keep 3D, horizontal scroll, custom cursor, and cinematic motion as progressive enhancements with touch and reduced-motion fallbacks. |

## Experience principles adopted

The portfolio will strengthen the **journey from proposition to proof**: opening identity, short explanatory statement, one process visual, selected case studies, longer practice/capability context, archive, journal, and direct contact. The reference’s approach reinforces that visual polish works best when navigation, work categorization, proof, and contact are repeated consistently across the whole experience.

The motion system remains original. Framer Motion continues to own component entrances and simple state transitions; CSS owns immediate interaction affordances; the existing React Three Fiber scene remains optional visual depth; and pinned or horizontal movement appears only when it supports project exploration. No external assets, interactive mechanisms, or code patterns from the reference site will be copied.

## Performance and responsive guardrails

The adaptation will maintain one primary media interaction per section, lazy-load offscreen content, keep three-dimensional content progressive, disable the custom cursor on coarse pointers, use touch-native project cards on mobile, honor `prefers-reduced-motion`, and preserve semantic navigation/focus states. These guardrails matter more than visual imitation and are required for an enterprise-quality personal portfolio.

## Sources

1. [Revelatio Studio — Homepage](https://revelatio.studio/)
2. [Revelatio Studio — About](https://revelatio.studio/about)
