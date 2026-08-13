import React from 'react';

const IMG_SRC = '/assets/reveal-ride.jpg';

export default function MosaicReveal() {
  return (
    <section className="x-mosaic" data-testid="mosaic-section" aria-label="Off the desk image">
      <div className="x-mosaic-stick">
        <img
          className="x-mosaic-image"
          src={IMG_SRC}
          alt="Ride log — handlebar view"
          draggable={false}
          decoding="async"
        />
      </div>
    </section>
  );
}
