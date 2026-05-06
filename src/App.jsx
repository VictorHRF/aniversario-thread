import { useMemo, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import MemoryCard from './components/MemoryCard';
import YarnThread from './components/YarnThread';
import { memories, timelineHeight } from './data/memories';
import yarnyAzulColgando from './assets/photos/YarnyAzulColgando.png';
import yarnyRojoColgando from './assets/photos/YarnyRojoColgando.png';

function HangingYarny({ src, alt, className, float = 0, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute ${className}`}
    >
      <motion.div
        animate={{ rotate: [-2, 2, -1, 0], y: [0, -6 + float, 0] }}
        transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="relative origin-top"
      >
        <img
          src={src}
          alt={alt}
          className="relative z-10 h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.38)]"
        />
      </motion.div>
    </motion.div>
  );
}

function IntroHero({ started, onStart }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-40 blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(4,10,8,0.15),rgba(4,10,8,0.85))]" />
      </div>

      <Parallax speed={-12} className="absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full bg-[#e7c38b]/10 blur-3xl md:h-40 md:w-40" />
        <div className="absolute bottom-[18%] right-[10%] h-36 w-36 rounded-full bg-[#6da7ff]/10 blur-3xl md:h-52 md:w-52" />
      </Parallax>

      <HangingYarny
        src={yarnyRojoColgando}
        alt="Yarny rojo colgando"
        className="left-[3%] top-0 hidden w-28 md:block lg:w-36"
        float={2}
        delay={0.15}
      />
      <HangingYarny
        src={yarnyAzulColgando}
        alt="Yarny azul colgando"
        className="right-[4%] top-0 hidden w-24 md:block lg:w-32"
        float={-1}
        delay={0.3}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.button
          type="button"
          onClick={onStart}
          className="group relative inline-flex flex-col items-center justify-center"
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div
                key="knot"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, -3, 3, 0] }}
                exit={{
                  opacity: 0,
                  scale: 1.35,
                  rotate: 18,
                  filter: 'blur(10px)',
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  rotate: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  },
                }}
                className="relative mb-8 h-40 w-40 md:h-52 md:w-52"
              >
                <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 blur-sm" />
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-[18px] border-yarn-red border-r-yarn-blue border-l-yarn-red/70 shadow-thread md:h-32 md:w-32" />
                <div className="absolute left-[28%] top-[32%] h-12 w-20 rotate-45 rounded-full border-[12px] border-yarn-blue border-b-yarn-red/70" />
                <div className="absolute right-[28%] top-[34%] h-12 w-20 -rotate-45 rounded-full border-[12px] border-yarn-red border-b-yarn-blue/70" />
                <div className="absolute bottom-[16%] left-1/2 h-14 w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-yarn-red via-yarn-blue to-transparent" />
              </motion.div>
            ) : (
              <motion.div
                key="title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-note text-3xl text-yarn-cream md:text-4xl">
                  Cada recuerdo tiró de este hilo hasta traernos aquí.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="rounded-[2rem] border border-white/15 bg-white/10 px-7 py-5 shadow-float backdrop-blur-md"
          >
            <p className="font-body text-sm uppercase tracking-[0.4em] text-yarn-cream/80">
              Segundo Aniversario
            </p>
            <h1 className="mt-2 font-display text-5xl leading-none text-white md:text-7xl">
              Nuestro Hilo:
              <span className="block text-yarn-cream">Año 1 &amp; 2</span>
            </h1>
            <p className="mt-4 max-w-xl font-body text-base leading-7 text-white/80 md:text-lg">
              Un scrapbook digital inspirado en los caminos suaves, los nudos fuertes
              y la magia silenciosa de seguir construyendo juntos.
            </p>
            <p className="mt-6 font-body text-xs uppercase tracking-[0.35em] text-white/55">
              Haz clic o empieza a bajar
            </p>
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const { scrollYProgress } = useScroll();

  const points = useMemo(
    () => memories.map((memory) => ({ id: memory.id, x: memory.threadX, y: memory.top + 120 })),
    [],
  );

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.015) {
      setStarted(true);
    }
  });

  return (
    <main className="min-h-screen overflow-x-clip bg-forest-950 text-white">
      <IntroHero started={started} onStart={() => setStarted(true)} />

      <section className="relative border-t border-white/10">
        <div className="absolute inset-0 overflow-hidden">
          <Parallax speed={-14} className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-[0.18]" />
          </Parallax>
          <Parallax speed={8} className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(247,241,229,0.13),transparent_0%,transparent_35%),radial-gradient(circle_at_80%_15%,rgba(74,115,217,0.14),transparent_0%,transparent_24%),linear-gradient(180deg,rgba(11,17,15,0.82),rgba(11,17,15,0.95))]" />
          </Parallax>
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-24 md:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-body text-sm uppercase tracking-[0.35em] text-yarn-cream/70">
              Timeline principal
            </p>
            <h2 className="mt-3 font-display text-4xl text-yarn-cream md:text-6xl">
              Un hilo que va cosiendo nuestra historia
            </h2>
            <p className="mt-4 text-base leading-7 text-white/72">
              La línea central se dibuja con el scroll y cada foto se balancea como
              si estuviera prendida de la lana. Reemplaza estos recuerdos de ejemplo
              por tus fotos y textos reales.
            </p>
          </div>

          <div className="timeline-shell relative mx-auto max-w-6xl" style={{ height: timelineHeight }}>
            <HangingYarny
              src={yarnyRojoColgando}
              alt="Yarny rojo acompañando el timeline"
              className="-left-2 top-[8%] hidden w-24 lg:block"
              float={1}
              delay={0.35}
            />
            <HangingYarny
              src={yarnyAzulColgando}
              alt="Yarny azul acompañando el timeline"
              className="-right-1 top-[56%] hidden w-24 lg:block"
              float={-2}
              delay={0.45}
            />

            <YarnThread progress={scrollYProgress} points={points} height={timelineHeight} />

            {memories.map((memory, index) => (
              <Parallax
                key={memory.id}
                translateY={[
                  `${index % 2 === 0 ? 26 : 12}px`,
                  `${index % 2 === 0 ? -18 : -30}px`,
                ]}
                speed={index % 2 === 0 ? -4 : 5}
                className="absolute inset-x-0"
              >
                <MemoryCard memory={memory} />
              </Parallax>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9 }}
              className="absolute bottom-12 left-1/2 z-20 w-[min(90vw,36rem)] -translate-x-1/2 text-center"
            >
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/10 p-8 backdrop-blur-md">
                <div className="mx-auto h-28 w-28 animate-pulseGlow">
                  <svg viewBox="0 0 120 120" className="h-full w-full">
                    <path
                      d="M60 103 C 15 73, 8 38, 28 22 C 42 10, 58 20, 60 34 C 62 20, 78 10, 92 22 C 112 38, 105 73, 60 103 Z"
                      fill="none"
                      stroke="url(#finalThread)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="finalThread" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c74646" />
                        <stop offset="100%" stopColor="#4a73d9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="font-note text-3xl text-yarn-cream">El nudo más bonito es el que sigue creciendo.</p>
                <h3 className="mt-3 font-display text-4xl text-white md:text-5xl">
                  Gracias por estos dos años
                </h3>
                <p className="mt-4 text-base leading-7 text-white/78">
                  Si este hilo nos trajo hasta aquí, quiero seguir descubriendo
                  cada paisaje contigo, recuerdo por recuerdo.
                </p>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 rounded-full border border-white/20 bg-yarn-cream px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.3em] text-forest-950"
                >
                  Continuará...
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
