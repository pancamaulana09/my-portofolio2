import { ArrowUpRight } from 'lucide-react';
import { site } from '../../../mock';

export default function GiantFooter({ tone = 'dark' }) {
  const isLight = tone === 'light';
  return (
    <section className={`x-giant-footer ${isLight ? 'x-giant-footer--light' : ''}`} data-testid="giant-footer">
      <div className="x-giant-footer-inner">
        <p className="x-label">Have a project with momentum?</p>
        <a href={site.emailHref} className="x-giant-footer-title" data-cursor="project">
          Let’s make<br />it matter.<ArrowUpRight aria-hidden="true" />
        </a>
        <div className="x-giant-footer-meta x-label">
          <span>Surabaya · Indonesia</span>
          <span>{site.email}</span>
          <a href="https://github.com/pancamaulana09" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}
