import React from 'react';
import DecodeText from '../components/site/DecodeText';
import GiantFooter from '../components/site/sections/GiantFooter';

export default function Privacy() {
  return (
    <main data-testid="privacy-page">
      <section className="x-sec-light min-h-[70vh]">
        <div className="x-pad pt-32 max-w-[900px] mx-auto">
          <DecodeText text="Privacy" as="h1" className="xh-giant mb-16" speed={44} testId="privacy-heading" />
          <div className="space-y-6 x-body text-[#4a4a46]">
            <p>
              This is a design demonstration site. It does not collect personal data on any server.
            </p>
            <p>
              Media you upload to the hero section and messages you draft on the contact page are stored only in
              your own browser (IndexedDB / localStorage) and never leave your device.
            </p>
            <p>
              The cookie banner records a single preference flag locally so it does not reappear on every visit.
              No analytics or third-party trackers are loaded.
            </p>
          </div>
        </div>
      </section>
      <GiantFooter tone="light" />
    </main>
  );
}
