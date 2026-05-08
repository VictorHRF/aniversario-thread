import { useEffect, useMemo, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import MemoryCard from './components/MemoryCard';
import YarnThread from './components/YarnThread';
import { memories, timelineHeight } from './data/memories';
import yarnyAzulColgando from './assets/photos/YarnyAzulColgando.png';
import yarnyCorazon from './assets/photos/YarnyCorazon.png';
import yarnyRojo from './assets/photos/YarnyRojo.png';
import yarnyRojoColgando from './assets/photos/YarnyRojoColgando.png';
import yarnysUnidos from './assets/photos/YarnysUnidos.png';

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

function ThreadStoryMarker({ src, alt, className, sizeClassName, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute z-30 ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`h-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.34)] ${sizeClassName}`}
        animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

function IntroHero({ started, onStart }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
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
          className="group relative inline-flex max-w-full flex-col items-center justify-center"
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
                className="relative mb-6 h-32 w-32 sm:mb-8 sm:h-40 sm:w-40 md:h-52 md:w-52"
              >
                <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 blur-sm" />
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-[14px] border-yarn-red border-r-yarn-blue border-l-yarn-red/70 shadow-thread sm:h-24 sm:w-24 sm:border-[18px] md:h-32 md:w-32" />
                <div className="absolute left-[28%] top-[32%] h-10 w-16 rotate-45 rounded-full border-[10px] border-yarn-blue border-b-yarn-red/70 sm:h-12 sm:w-20 sm:border-[12px]" />
                <div className="absolute right-[28%] top-[34%] h-10 w-16 -rotate-45 rounded-full border-[10px] border-yarn-red border-b-yarn-blue/70 sm:h-12 sm:w-20 sm:border-[12px]" />
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
            className="mx-auto w-[min(92vw,46rem)] rounded-[1.7rem] border border-white/15 bg-white/10 px-4 py-5 shadow-float backdrop-blur-md sm:rounded-[2rem] sm:px-7"
          >
            <p className="font-body text-[0.65rem] uppercase tracking-[0.28em] text-yarn-cream/80 sm:text-sm sm:tracking-[0.4em]">
              Segundo Aniversario
            </p>
            <h1 className="mt-2 font-display text-[2.5rem] leading-none text-white sm:text-5xl md:text-7xl">
              Nuestro Hilo:
              <span className="block text-yarn-cream">Año 1 &amp; 2</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-6 text-white/80 sm:text-base sm:leading-7 md:text-lg">
              Un scrapbook digital inspirado en los caminos suaves, los nudos fuertes
              y la magia silenciosa de seguir construyendo juntos.
            </p>
            <p className="mt-6 font-body text-[0.65rem] uppercase tracking-[0.28em] text-white/55 sm:text-xs sm:tracking-[0.35em]">
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
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(media.matches);

    sync();
    media.addEventListener('change', sync);

    return () => media.removeEventListener('change', sync);
  }, []);

  const timelineLayout = useMemo(() => {
    if (!isMobile) {
      return {
        height: timelineHeight,
        memories,
        points: memories.map((memory) => ({
          id: memory.id,
          x: memory.threadX,
          y: memory.top + 120,
        })),
      };
    }

    const mobileMemories = memories.map((memory, index) => ({
      ...memory,
      side: 'center',
      tilt: index % 2 === 0 ? -2 : 2,
      top: 260 + index * 560,
      threadX: 500 + (index % 2 === 0 ? -10 : 10),
    }));

    return {
      height: 260 + mobileMemories.length * 560 + 760,
      memories: mobileMemories,
      points: mobileMemories.map((memory) => ({
        id: memory.id,
        x: memory.threadX,
        y: memory.top + 110,
      })),
    };
  }, [isMobile]);

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

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-16 sm:py-24 md:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.28em] text-yarn-cream/70 sm:text-sm sm:tracking-[0.35em]">
              Timeline principal
            </p>
            <h2 className="mt-3 font-display text-[2.3rem] text-yarn-cream sm:text-4xl md:text-6xl">
              Un hilo que va cosiendo nuestra historia
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
              Cada tramo de este recorrido guarda una salida, una risa, una fecha
              importante y una pequeña prueba de todo lo bonito que hemos vivido
              juntos durante estos dos años.
            </p>
          </div>

          <div className="timeline-shell relative mx-auto max-w-6xl" style={{ height: timelineLayout.height }}>
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

            <YarnThread progress={scrollYProgress} points={timelineLayout.points} height={timelineLayout.height} />

            <ThreadStoryMarker
              src={yarnyRojo}
              alt="Yarny rojo al inicio del hilo"
              className="left-1/2 top-14 -translate-x-1/2 sm:top-10"
              sizeClassName="w-24 sm:w-28 md:w-32"
              delay={0.1}
            />

            <ThreadStoryMarker
              src={yarnysUnidos}
              alt="Yarnys unidos en el cambio de color del hilo"
              className="left-[46%] top-[50.9%] -translate-x-1/2"
              sizeClassName="w-36 sm:w-44 md:w-52"
              delay={0.2}
            />



            {timelineLayout.memories.map((memory, index) => (
              <Parallax
                key={memory.id}
                translateY={[
                  `${isMobile ? 10 : index % 2 === 0 ? 26 : 12}px`,
                  `${isMobile ? -12 : index % 2 === 0 ? -18 : -30}px`,
                ]}
                speed={isMobile ? 2 : index % 2 === 0 ? -4 : 5}
                className="absolute inset-x-0"
              >
                <MemoryCard memory={memory} isMobile={isMobile} />
              </Parallax>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-4 text-center sm:bottom-12"
            >
              <div className="relative w-[min(92vw,36rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md sm:w-[min(90vw,36rem)] sm:rounded-[2.4rem] sm:p-8">
                <div className="mx-auto w-fit">
                  <img
                    src={yarnyCorazon}
                    alt="Yarny formando un corazón"
                    className="h-auto w-28 object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.28)] sm:w-36"
                  />
                </div>
                <p className="font-note text-[1.9rem] text-yarn-cream sm:text-3xl">El nudo más bonito es el que sigue creciendo.</p>
                <h3 className="mt-3 font-display text-[2.2rem] text-white sm:text-4xl md:text-5xl">
                  Gracias por estos dos años
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
                  Si este hilo nos trajo hasta aquí, quiero seguir descubriendo
                  cada paisaje contigo, recuerdo por recuerdo.
                </p>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 rounded-full border border-white/20 bg-yarn-cream px-5 py-3 font-body text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-forest-950 sm:mt-8 sm:px-7 sm:text-sm sm:tracking-[0.3em]"
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
