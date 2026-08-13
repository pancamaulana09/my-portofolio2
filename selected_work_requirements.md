# Selected Work Editorial Layout Requirements

## Reference translation

The supplied frames use an editorial portfolio rhythm: a spacious light canvas, an oversized statement, a large image anchor, smaller offset image cards, sparse metadata, and transitions that carry the image composition into the next project. The adaptation will use this rhythm with Panca Maulana's own project content, imagery, and visual system rather than reproducing the reference site's copy, assets, or exact composition.

## Original homepage treatment

The selected-work section will become a vertically staged project sequence. Each project receives a viewport-height panel with a large project image on the dominant side, a smaller overlapping detail card, a short project label, discipline metadata, a large editorial title, and a clear case-study action. The active project panel will reveal with a restrained image scale-down, opacity fade, and text rise. The next project will enter with a subtle cross-layer handoff so the section feels like a curated gallery instead of a generic list.

The desktop layout will use a sticky stage with a vertically scrolling stack, supporting a magazine-like composition and progress counter. The mobile layout will return to normal document flow with one project card per viewport-sized block, avoiding scroll traps while preserving the same image-first hierarchy.

## Motion and performance rules

Images will use native lazy loading except the first project, and transitions will be limited to opacity and transform for compositor-friendly rendering. Motion will be disabled or reduced under `prefers-reduced-motion`. There will be no per-frame image processing or new animation dependency; existing Framer Motion primitives will handle intersection and stage transitions. Touch devices will use ordinary vertical scrolling and focusable project links.


## Validation checkpoint

The running homepage renders the revised Selected Work content: the introductory title, seven project entries, project metadata, case-study actions, live-site links where available, active counter markup, and archive link are all present in the rendered document. Production compilation completed successfully before visual stage inspection.


## Render verification

The refreshed local homepage renders the new selected-work archive in the expected project order, including the editorial heading, active-project counter, all project metadata, detail links, live-site actions, and final archive CTA. The component retains the image-first project structure and uses native lazy loading after the first project, while its zoom/fade animation uses only transform and opacity through existing motion primitives.
