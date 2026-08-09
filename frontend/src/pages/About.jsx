import React from 'react';
import Manifesto from '../components/site/sections/Manifesto';
import Expertise from '../components/site/sections/Expertise';
import Team from '../components/site/sections/Team';
import Achievements from '../components/site/sections/Achievements';
import GiantFooter from '../components/site/sections/GiantFooter';

export default function About() {
  return (
    <main className="pt-12" data-testid="about-page">
      <Manifesto />
      <Expertise />
      <Team />
      <Achievements tone="light" />
      <GiantFooter tone="light" />
    </main>
  );
}
