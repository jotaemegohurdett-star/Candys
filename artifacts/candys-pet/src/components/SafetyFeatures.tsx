import { PawPrint } from 'lucide-react';
import lifestyleFront from '@assets/IMG-20261005-WA0001_1791176781818.jpg';
import lifestyleBack from '@assets/IMG-20261005-WA0002_1791176781771.jpg';
import safetyClip from '../assets/safety-clip-transparent.png';
import './SafetyFeatures.css';

const attachmentPoints = [
  {
    number: '01',
    title: 'Mosquetón interior, siempre cerquita',
    detail: 'El cordón interior incorpora el mosquetón y suma un punto de sujeción discreto dentro del banano.',
  },
  {
    number: '02',
    title: 'Un ajuste que se mueve contigo',
    detail: 'La cinta inferior rodea tu cintura y se abrocha para completar el ajuste del portamascotas.',
  },
  {
    number: '03',
    title: 'Dos broches, a cada lado',
    detail: 'Ubicados junto al cuello de tu mascota, permiten ajustar el portamascotas desde ambos costados.',
  },
];

export function SafetyFeatures() {
  return (
    <section id="safety" className="safety-section" aria-labelledby="safety-title">
      <div className="safety-transition" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="safety-transition-spectrum" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#70edff" />
              <stop offset="34%" stopColor="#d0a0ff" />
              <stop offset="68%" stopColor="#ff92d0" />
              <stop offset="100%" stopColor="#ffe8a0" />
            </linearGradient>
          </defs>
          <path
            d="M0 0H1440V60L1260 47L1080 68L900 49L720 72L540 50L360 73L180 57L0 67Z"
            fill="hsl(220 25% 8%)"
          />
          <path
            d="M0 67L180 57L360 73L540 50L720 72L900 49L1080 68L1260 47L1440 60"
            fill="none"
            stroke="url(#safety-transition-spectrum)"
            strokeWidth="2"
            opacity="0.72"
          />
        </svg>
        <PawPrint className="safety-transition-paw safety-transition-paw-one" />
        <PawPrint className="safety-transition-paw safety-transition-paw-two" />
        <PawPrint className="safety-transition-paw safety-transition-paw-three" />
        <PawPrint className="safety-transition-paw safety-transition-paw-four" />
      </div>
      <div className="safety-shell">
        <div className="safety-intro">
          <p className="safety-eyebrow"><span aria-hidden="true" />Cada paseo, más cerca</p>
          <h2 id="safety-title" data-testid="heading-safety">
            Tres puntos de ajuste.<br />
            <span>Un mismo abrazo.</span>
          </h2>
          <p className="safety-lede">
            Diseñado para salir juntos: tres detalles de sujeción se integran al portamascotas para
            acompañarte a cada paso.
          </p>
        </div>

        <div className="safety-layout">
          <div className="safety-photo-stack" aria-label="El portamascotas en uso">
            <p className="safety-photo-caption">Juntos, a cada paso.</p>
            <figure className="safety-photo-main">
              <img
                src={lifestyleFront}
                alt="Persona llevando a su perro pequeño en un portamascotas color taupe durante un paseo"
                loading="lazy"
                decoding="async"
                data-testid="img-safety-pet"
              />
            </figure>
            <figure className="safety-photo-detail">
              <img
                src={lifestyleBack}
                alt="Vista posterior de la cinta del portamascotas abrochada alrededor de la cintura"
                loading="lazy"
                decoding="async"
                data-testid="img-safety-waist"
              />
              <figcaption>Ajuste en la cintura</figcaption>
            </figure>
            <div className="safety-clip-orbit" aria-hidden="true">
              <span className="safety-clip-caption">Mosquetón interior</span>
              <img
                src={safetyClip}
                alt=""
                loading="lazy"
                decoding="async"
                data-testid="img-safety-clip"
              />
            </div>
          </div>

          <div className="safety-points">
            <p className="safety-points-kicker">Así se sujeta</p>
            <ol>
              {attachmentPoints.map((point) => (
                <li className="safety-point" key={point.number} data-testid={`feature-safety-${point.number}`}>
                  <span className="safety-point-number" aria-hidden="true">{point.number}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="safety-note">
              Revisa que los broches y el mosquetón estén bien sujetos antes de cada paseo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
