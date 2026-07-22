import { motion } from 'framer-motion';

export function VideoSection() {
  return (
    <section className="py-20" style={{ background: 'hsl(220 25% 7%)' }}>
      <div className="container mx-auto px-6 sm:px-10">

        {/* Heading */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'hsl(340 84% 50% / 0.15)', color: 'hsl(340 84% 65%)' }}
          >
            Mirá cómo funciona
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            Tu perrito,{' '}
            <span className="italic" style={{ color: 'hsl(340 84% 65%)' }}>
              siempre cerca
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-3 text-sm max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Hecho a mano en Chile con amor y algodón 100% transpirable 🐾
          </motion.p>
        </div>

        {/* Video embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mx-auto rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
          style={{
            maxWidth: 800,
            border: '1px solid hsl(220 25% 22%)',
          }}
        >
          {/* 16:9 aspect ratio box */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="/candys-pet-video/"
              allow="autoplay"
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
              title="Candy's Pet — Video"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-center text-xs mt-4"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Activá el sonido con el ícono 🔊 en el video · Usá los controles para navegar escenas
        </motion.p>
      </div>
    </section>
  );
}
