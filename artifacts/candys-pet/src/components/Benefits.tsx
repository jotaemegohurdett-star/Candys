import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Feather, Sparkles, Brain, Wind, MapPin } from 'lucide-react';
import lifestyleImg from '@assets/Screenshot_20260722-051400_WhatsApp~2_1784713749406.jpg';

const benefits = [
  {
    icon: Heart,
    color: '#e879a0',
    gradient: 'linear-gradient(135deg, rgba(232,121,160,0.15) 0%, rgba(232,121,160,0.04) 100%)',
    border: 'rgba(232,121,160,0.22)',
    glow: 'rgba(232,121,160,0.25)',
    title: 'Vínculo Cercano',
    description:
      'Mantiene a tu mascota junto a tu pecho, fortaleciendo el lazo afectivo en cada paseo, viaje o salida al mall.',
  },
  {
    icon: Wind,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.03) 100%)',
    border: 'rgba(6,182,212,0.2)',
    glow: 'rgba(6,182,212,0.2)',
    title: 'Reduce el Estrés',
    description:
      'El contacto constante con tu cuerpo calma la ansiedad de tu regalón. Menos ladridos, más tranquilidad — probado por cientos de familias.',
  },
  {
    icon: Brain,
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(167,139,250,0.03) 100%)',
    border: 'rgba(167,139,250,0.22)',
    glow: 'rgba(167,139,250,0.25)',
    title: 'Uso Terapéutico',
    description:
      'Ideal para perritos senior o con alguna discapacidad. El calor y el movimiento del portador los ayuda a sentirse seguros, protegidos y amados. 🧡',
  },
  {
    icon: Feather,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.03) 100%)',
    border: 'rgba(6,182,212,0.2)',
    glow: 'rgba(6,182,212,0.2)',
    title: 'Liviano y Cómodo',
    description:
      'Distribuye el peso uniformemente. Manos 100% libres para el metro, el mall o cualquier aventura. ¡En talla L caben 2 perritos pequeños!',
  },
  {
    icon: ShieldCheck,
    color: '#e879a0',
    gradient: 'linear-gradient(135deg, rgba(232,121,160,0.15) 0%, rgba(232,121,160,0.04) 100%)',
    border: 'rgba(232,121,160,0.22)',
    glow: 'rgba(232,121,160,0.25)',
    title: 'Seguro y Resistente',
    description:
      'Materiales de alta durabilidad, costuras reforzadas y gancho de seguridad interior. Fabricado con amor en Chile 🇨🇱',
  },
  {
    icon: Sparkles,
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.14) 0%, rgba(251,191,36,0.03) 100%)',
    border: 'rgba(251,191,36,0.22)',
    glow: 'rgba(251,191,36,0.22)',
    title: 'Calidad Premium',
    description:
      'Tela suave, segura y transpirable. Forrado con algodón. Hecho a mano con amor 💕, apto desde los 2 meses de vida.',
  },
  {
    icon: MapPin,
    color: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.13) 0%, rgba(52,211,153,0.03) 100%)',
    border: 'rgba(52,211,153,0.22)',
    glow: 'rgba(52,211,153,0.22)',
    title: 'Paseos Cotidianos',
    description:
      'Ideal en lugares con mucha gente, transporte público o cuando tu mascota se cansa de caminar. Siempre cerca de ti, sin esfuerzo.',
  },
];

const sizes = [
  {
    talla: 'M',
    precio: '$17.990',
    desc: 'Pequeños y Cachorros',
    detail: 'Hasta 3,5 kg · A partir de 2 meses · Ideal para razas mini',
    color: '#e879a0',
    bg: 'rgba(232,121,160,0.07)',
    border: 'rgba(232,121,160,0.2)',
  },
  {
    talla: 'L',
    precio: '$18.990',
    desc: 'Medianos o Duplas',
    detail: 'Hasta 10 kg · Máxima resistencia · Caben 2 perritos pequeños',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.07)',
    border: 'rgba(167,139,250,0.2)',
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      style={{
        background: 'linear-gradient(180deg, #0f0a1a 0%, #130d20 40%, #0e0916 100%)',
        padding: '96px 0 100px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background noise/texture layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(232,121,160,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(167,139,250,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* ── Top: label + headline + image ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 48,
            marginBottom: 72,
          }}
          className="lg-row"
        >
          <div style={{ flex: 1 }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-block',
                padding: '6px 18px',
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#e879a0',
                background: 'rgba(232,121,160,0.1)',
                border: '1px solid rgba(232,121,160,0.2)',
                marginBottom: 20,
              }}
            >
              ¿Por qué un sling?
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(30px, 5vw, 50px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.13,
                marginBottom: 24,
              }}
            >
              Más que un accesorio,{' '}
              <em style={{ color: '#e879a0', fontStyle: 'italic' }}>una forma de vida.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 16,
                lineHeight: 1.75,
                maxWidth: 540,
                marginBottom: 36,
              }}
            >
              Nuestros porta mascotas tipo sling están diseñados para perros de raza pequeña a mediana.
              Ideales para el día a día, viajes en metro y aventuras juntos. También perfectos para
              perritos <strong style={{ color: 'rgba(255,255,255,0.8)' }}>senior o con discapacidad</strong> — su
              uso terapéutico los hace sentir seguros y amados.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}
            >
              {[
                { n: '2', u: 'modelos', label: 'disponibles' },
                { n: '14', u: 'colores', label: 'disponibles' },
                { n: '2', u: 'tallas', label: 'M · L' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                    {s.n}{' '}
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#e879a0' }}>{s.u}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              flex: 1,
              borderRadius: 24,
              overflow: 'hidden',
              aspectRatio: '4/3',
              position: 'relative',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.07)',
              maxWidth: 520,
              alignSelf: 'center',
            }}
          >
            <img
              src={lifestyleImg}
              alt="Clientes felices usando sus porta mascotas Candy's Pet"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%' }}
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                borderRadius: 14,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <span style={{ fontSize: 22 }}>🇨🇱</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', margin: 0 }}>
                  La familia Candy's Pet en Chile
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0' }}>
                  Paseos, salidas y aventuras juntos
                </p>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#e879a0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                boxShadow: '0 4px 12px rgba(232,121,160,0.5)',
              }}
            >
              🐾
            </div>
          </motion.div>
        </div>

        {/* ── Size cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            marginBottom: 64,
          }}
        >
          {sizes.map((s) => (
            <div
              key={s.talla}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 18,
                padding: '22px 24px',
                borderRadius: 20,
                background: s.bg,
                border: `1px solid ${s.border}`,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: s.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#fff',
                  flexShrink: 0,
                  boxShadow: `0 6px 20px ${s.color}55`,
                }}
              >
                {s.talla}
              </div>
              <div>
                <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>{s.precio}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: s.color, margin: '3px 0 4px' }}>
                  {s.desc}
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, margin: 0 }}>
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Benefits grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  padding: '28px 28px 32px',
                  borderRadius: 22,
                  background: b.gradient,
                  border: `1px solid ${b.border}`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: `${b.color}18`,
                    border: `1px solid ${b.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                    color: b.color,
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: 10,
                    lineHeight: 1.25,
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.52)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {b.description}
                </p>

                {/* Corner glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: -40,
                    right: -40,
                    width: 130,
                    height: 130,
                    borderRadius: '50%',
                    background: b.glow,
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .lg-row { flex-direction: row !important; align-items: center !important; }
        }
      `}</style>
    </section>
  );
}
