import Hero from '../components/site/Hero';
import PracticeIndex from '../components/site/sections/PracticeIndex';
import ProofGrid from '../components/site/sections/ProofGrid';
import SignalScreen from '../components/site/sections/SignalScreen';
import GiantFooter from '../components/site/sections/GiantFooter';
import HorizontalShowcase from '../components/site/sections/HorizontalShowcase';
import StatementIntro from '../components/site/sections/StatementIntro';
import ArchiveIndex from '../components/site/sections/ArchiveIndex';
import BlogJournal from '../components/site/sections/BlogJournal';
import MosaicReveal from '../components/site/sections/MosaicReveal';
import { statement } from '../mock';

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <StatementIntro label={statement.label} text={statement.text} testId="statement-section" />
      <MosaicReveal />
      <HorizontalShowcase />
      <PracticeIndex />
      <ProofGrid />
      <SignalScreen />
      <ArchiveIndex />
      <BlogJournal />
      <GiantFooter tone="dark" />
    </main>
  );
}
