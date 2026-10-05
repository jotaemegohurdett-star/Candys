import lifestyleFront from '@assets/IMG-20261005-WA0001_1791176781818.jpg';
import lifestyleBack from '@assets/IMG-20261005-WA0002_1791176781771.jpg';
import safetyClip from '../assets/safety-clip-transparent.png';
import './SafetyFeatures.css';

const attachmentPoints = [
  {
    number: '01',
    title: 'Un mosquetón, siempre cerquita',
    detail: 'Dentro del portamascotas, un cordón con mosquetón acompaña a tu mascota en cada paseo.',
  },
  {
    number: '02',
    title: 'Ajuste que abraza tu cintura',
    detail: 'La cinta inferior se abrocha alrededor de tu cintura para que salgan juntos con comodidad.',
  },
  {
    number: '03',
    title: 'Broches a ambos lados del cuello',
    detail: 'Un broche a cada lado del cuello de tu mascota ayuda a ajustar el portamascotas.',
  },
];

export function SafetyFeatures() {
  return (
    <section id="safety" className="safety-section" aria-labelledby="safety-title">
      <div className="safety-shell">
        <div className="safety-intro">
          <p className="safety-eyebrow"><span aria-hidden="true" />Cada paseo, más cerca</p>
          <h2 id="safety-title" data-testid="heading-safety">
            Tres puntos de ajuste.<br />
            <span>Un mismo abrazo.</span>
          </h2>
          <p className="safety-lede">
            El portamascotas tipo banano reúne tres puntos de sujeción para acompañar esos paseos
            cotidianos, siempre cerquita de ti.
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
