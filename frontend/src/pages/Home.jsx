import React, { useRef } from 'react';
import Hero from '../components/site/Hero';
import DotMatrix from '../components/site/DotMatrix';
import DecodeText from '../components/site/DecodeText';
import GenArt from '../components/site/GenArt';
import Manifesto from '../components/site/sections/Manifesto';
import HorizontalShowcase from '../components/site/sections/HorizontalShowcase';
import GiantFooter from '../components/site/sections/GiantFooter';
import ShowcaseTheater from '../components/site/sections/ShowcaseTheater';
import StatementIntro from '../components/site/sections/StatementIntro';
import ScaleMedia from '../components/site/sections/ScaleMedia';
import ArchiveIndex from '../components/site/sections/ArchiveIndex';
import PosterField from '../components/site/sections/PosterField';
import BlogJournal from '../components/site/sections/BlogJournal';
import MosaicReveal from '../components/site/sections/MosaicReveal';
import { genGridImages, statusWords, statement } from '../mock';
import { useSectionStatus } from '../lib/statusBus';

function BrandMark() {
  const ref = useRef(null);
  useSectionStatus(ref, statusWords.studio);
  return (
    <section ref={ref} className="x-sec-dark py-36 px-4 overflow-hidden" data-testid="brandmark-section">
      <div className="max-w-[1440px] mx-auto flex justify-center text-[#d6d6d0]">
        <DotMatrix text="PANCA MAULANA" testId="hero-dotmatrix" />
      </div>
    </section>
  );
}

function GenerativeGrid() {
  return (
    <section className="x-sec-dark relative overflow-hidden pb-28" data-testid="generative-grid-section">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-12 lg:col-span-4 lg:pt-24 z-10">
            <DecodeText text="Generative" as="h2" className="xh-giant text-[#e2e2dc]" speed={40} testId="gen-heading-1" />
          </div>
          <div className="col-span-6 lg:col-span-3 lg:-mt-6">
            <GenArt type="waves" seed={3} ratio="3 / 4" />
          </div>
          <div className="col-span-6 lg:col-span-2 lg:pt-16 z-10">
            <DecodeText text="Code" as="h2" className="xh-giant text-[#e2e2dc]" speed={70} testId="gen-heading-2" />
          </div>
          <div className="col-span-12 lg:col-span-3">
            <GenArt type="dither" seed={8} ratio="1 / 1" />
          </div>

          <div className="col-span-6 lg:col-span-3 lg:mt-10">
            <GenArt type="pixels" seed={5} ratio="3 / 4" />
          </div>
          <div className="col-span-6 lg:col-span-4 lg:mt-28 z-10">
            <DecodeText text="Explorations" as="h2" className="xh-giant text-[#e2e2dc]" speed={40} testId="gen-heading-3" />
          </div>
          <div className="col-span-6 lg:col-span-2 lg:mt-16">
            <GenArt type="ascii" seed={11} ratio="3 / 4" />
          </div>
          <div className="col-span-6 lg:col-span-3 lg:mt-6">
            <div className="x-tile" style={{ aspectRatio: '4 / 3' }}>
              <img src={genGridImages[0]} alt="Holographic study" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <MosaicReveal />
      <BrandMark />
      <StatementIntro label={statement.label} text={statement.text} testId="statement-section" />
      <ShowcaseTheater />
      <GenerativeGrid />
      <Manifesto showReadMore />
      <ScaleMedia />
      <HorizontalShowcase />
      <ArchiveIndex />
      <PosterField />
      <BlogJournal />
      <GiantFooter tone="light" />
    </main>
  );
}
