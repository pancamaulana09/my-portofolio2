import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Hero from '../components/site/Hero';
import PracticeIndex from '../components/site/sections/PracticeIndex';
import HorizontalShowcase from '../components/site/sections/HorizontalShowcase';
import ProofGrid from '../components/site/sections/ProofGrid';
import SignalScreen from '../components/site/sections/SignalScreen';
import GiantFooter from '../components/site/sections/GiantFooter';
import StatementIntro from '../components/site/sections/StatementIntro';
import BlogJournal from '../components/site/sections/BlogJournal';
import MosaicReveal from '../components/site/sections/MosaicReveal';
import { statement } from '../mock';

export default function Home() {
  const heroTransitionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroTransitionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <main data-testid="home-page">
      <div ref={heroTransitionRef} className="x-home-hero-transition">
        <div className="x-home-hero-layer">
          <Hero scrollProgress={scrollYProgress} />
        </div>
        <div className="x-home-statement-layer">
          <StatementIntro label={statement.label} text={statement.text} testId="statement-section" />
        </div>
      </div>
      <MosaicReveal />
      <PracticeIndex />
      <HorizontalShowcase />
      <ProofGrid />
      <SignalScreen />
      <BlogJournal />
      <GiantFooter tone="dark" />
    </main>
  );
}
