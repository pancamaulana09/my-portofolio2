# Scroll-Scrubbed Footer Video Implementation

The supplied `shotfooter.mp4` was copied into the portfolio as `frontend/public/assets/shotfooter.mp4`. Its public media metadata is H.264 video with AAC audio, 848×478 pixels, 30 fps, and a 7.03-second duration.

The new footer is a pinned contact stage with a full-bleed video layer, dark contrast overlay, grid lines, CTA, direct contact link, location, GitHub, project link, and a frame counter. The implementation maps the footer section’s scroll position to `video.currentTime`, so upward scrolling seeks backwards and downward scrolling seeks forwards. The video remains muted, is removed from the tab order, and shows a static visual result for visitors who prefer reduced motion.

## Initial browser validation

The footer layout and its contact hierarchy render at the document end. The current local browser display initially showed `Frame 000 / 000`, which means the media metadata had not yet been observed in that view; the asset response and ready-state behavior will be checked before publishing.


## Fresh-load verification

After a full page refresh, the footer renders the supplied crowd-film visual behind the contact CTA, with the high-contrast grid overlay intact. The frame range now initializes correctly as `000 / 211`, reflecting the 7.03-second 30 fps clip. This confirms that the static poster and known-duration fallback prevent a blank footer while the browser prepares the video timeline.


## Reversible scroll verification

With the footer at the document end, the footer displayed the later crowd-film frame behind the contact content. After scrolling upward by one viewport, the counter changed from the final timeline state to `Frame 019 / 211`, and the visible video frame changed accordingly. This verifies the required reverse behavior: scroll position controls the same video timeline in both directions rather than starting a one-way autoplay.
