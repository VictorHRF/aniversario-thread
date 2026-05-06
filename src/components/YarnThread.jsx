import { motion, useSpring, useTransform } from 'motion/react';

const buildThreadPath = (points, endY) => {
  if (!points.length) {
    return '';
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length; index += 1) {
    const prev = points[index - 1];
    const current = points[index];
    const curve = Math.abs(current.x - prev.x) * 0.75 + 110;

    path += ` C ${prev.x} ${prev.y + curve}, ${current.x} ${current.y - curve}, ${current.x} ${current.y}`;
  }

  const last = points[points.length - 1];
  path += ` C ${last.x} ${last.y + 120}, 500 ${endY - 240}, 500 ${endY}`;

  return path;
};

export default function YarnThread({ progress, points, height }) {
  const threadProgress = useSpring(
    useTransform(progress, [0, 0.16, 0.92], [0.02, 0.22, 1]),
    { stiffness: 120, damping: 24, mass: 0.9 },
  );

  const path = buildThreadPath(points, height - 180);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5f8fff" />
            <stop offset="49.5%" stopColor="#4a73d9" />
            <stop offset="50.5%" stopColor="#c74646" />
            <stop offset="100%" stopColor="#e15b5b" />
          </linearGradient>
        </defs>

        <motion.path
          d={path}
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: threadProgress }}
        />

        {points.map((point) => (
          <motion.g key={point.id} style={{ opacity: threadProgress }}>
            <circle cx={point.x} cy={point.y} r="7" fill="#f2e7d5" fillOpacity="0.28" />
            <circle cx={point.x} cy={point.y} r="3" fill="#ffffff" fillOpacity="0.9" />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
