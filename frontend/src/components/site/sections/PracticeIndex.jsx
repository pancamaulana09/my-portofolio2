import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { expertise, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

export default function PracticeIndex() {
  const sectionRef = useRef(null);
  useSectionStatus(sectionRef, statusWords.thinking);

  return (
    <section ref={sectionRef} className="x-practice" data-testid="practice-index">
      <div className="x-practice-inner">
        <header className="x-practice-intro">
          <div>
            <p className="x-label">Capabilities · from concept to system</p>
            <h2>A practice that connects thinking and making.</h2>
          </div>
          <p>
            The work moves between product direction, interface craft, engineering, and the details that make an experience feel complete in the real world.
          </p>
        </header>

        <div className="x-practice-grid">
          {expertise.map((item, index) => (
            <article className="x-practice-item" key={item.title}>
              <span className="x-practice-number x-label">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="x-practice-mark" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>

        <Link to="/about" className="x-practice-link" data-cursor="project">
          More about the practice <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
