import { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function MemoryCard({ memory, isMobile = false }) {
  const [hovered, setHovered] = useState(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(dragX, { stiffness: 220, damping: 18 });
  const springY = useSpring(dragY, { stiffness: 220, damping: 18 });
  const rotateY = useTransform(pointerX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(pointerY, [-1, 1], [8, -8]);

  const bind = useDrag(
    ({ down, offset: [x, y] }) => {
      dragX.set(down ? x : 0);
      dragY.set(down ? y : 0);
    },
    {
      bounds: { left: -18, right: 18, top: -14, bottom: 14 },
      rubberband: true,
      from: () => [dragX.get(), dragY.get()],
    },
  );

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const relativeY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    pointerX.set(relativeX);
    pointerY.set(relativeY);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    setHovered(false);
  };

  return (
    <div className="memory-card-shell" data-side={memory.side} style={{ top: memory.top }}>
      <motion.article
        {...bind()}
        initial={{ opacity: 0, y: 80, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={isMobile ? undefined : { y: -8 }}
        className="group relative w-[min(88vw,22rem)] cursor-grab active:cursor-grabbing sm:w-[min(82vw,22rem)]"
        style={{
          x: springX,
          y: springY,
          rotate: memory.tilt,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        onHoverStart={() => !isMobile && setHovered(true)}
        onHoverEnd={() => !isMobile && setHovered(false)}
        onPointerMove={isMobile ? undefined : handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="absolute -top-5 left-1/2 h-7 w-14 -translate-x-1/2 rounded-full bg-white/10 blur-md sm:-top-6 sm:h-8 sm:w-16" />
        <div className="scrap-card overflow-hidden rounded-[1.5rem] border border-white/20 bg-[#f7f1e5]/90 p-2.5 shadow-float backdrop-blur-sm sm:rounded-[1.7rem] sm:p-3">
          <div className="relative overflow-hidden rounded-[1.25rem] bg-forest-950">
            <img
              src={memory.image}
              alt={memory.title}
              className="h-60 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
          </div>

          <div className="mt-3 rounded-[1.05rem] bg-paper p-3 text-forest-900 sm:rounded-[1.15rem] sm:p-4">
            <p className="font-note text-[1.7rem] text-yarn-red sm:text-2xl">{memory.date}</p>
            <h3 className="font-display text-[2rem] leading-none sm:text-3xl">{memory.title}</h3>
            <p className="mt-3 text-sm leading-6 text-forest-700">{memory.caption}</p>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.9,
            y: hovered ? 0 : 12,
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="pointer-events-none absolute -bottom-10 right-4 hidden max-w-[12rem] rounded-[1rem] bg-[#f0d88e]/95 px-4 py-3 shadow-xl md:block"
        >
          <p className="font-note text-[1.55rem] leading-tight text-[#5c4026]">
            {memory.note}
          </p>
        </motion.div>
      </motion.article>
    </div>
  );
}
