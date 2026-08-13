import React from 'react';
import AboutVideoHero from '../components/site/sections/AboutVideoHero';
import Manifesto from '../components/site/sections/Manifesto';
import Expertise from '../components/site/sections/Expertise';
import Team from '../components/site/sections/Team';
import Achievements from '../components/site/sections/Achievements';
import GiantFooter from '../components/site/sections/GiantFooter';

export default function About() {
  return (
    <main data-testid="about-page">
      <AboutVideoHero />
      <Manifesto />
      <Expertise />
      <Team />
      <Achievements tone="light" />
      <GiantFooter tone="light" />
    </main>
  );
}
