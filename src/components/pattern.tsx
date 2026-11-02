import { useId } from "react";
import { cn } from "@/lib/cn";

/** Tiled eight-point-star lattice, used as a faint background texture. Color comes from `text-*`. */
export function GeometricPattern({ className, size = 64 }: { className?: string; size?: number }) {
  const id = useId();
  const c = size / 2;
  const s = size * 0.22;

  return (
    <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 size-full", className)}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <rect x={c - s} y={c - s} width={s * 2} height={s * 2} />
            <rect x={c - s} y={c - s} width={s * 2} height={s * 2} transform={`rotate(45 ${c} ${c})`} />
            <path d={`M0 0L${c - s * 1.41} ${c - s * 1.41}M${size} 0L${c + s * 1.41} ${c - s * 1.41}M0 ${size}L${c - s * 1.41} ${c + s * 1.41}M${size} ${size}L${c + s * 1.41} ${c + s * 1.41}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Large ornamental star with concentric rings, used in the hero. */
export function StarOrnament({ className }: { className?: string }) {
  const points = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    const r = i % 2 === 0 ? 200 : 150;
    return `${(250 + r * Math.cos(angle)).toFixed(1)},${(250 + r * Math.sin(angle)).toFixed(1)}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 500 500" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <g fill="none" stroke="currentColor">
        <circle cx="250" cy="250" r="240" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="250" cy="250" r="214" strokeWidth="1" opacity="0.6" />
        <rect x="108" y="108" width="284" height="284" strokeWidth="1.2" />
        <rect x="108" y="108" width="284" height="284" strokeWidth="1.2" transform="rotate(45 250 250)" />
        <polygon points={points} strokeWidth="1" opacity="0.7" />
        <circle cx="250" cy="250" r="118" strokeWidth="1" />
        <rect x="175" y="175" width="150" height="150" strokeWidth="1" opacity="0.6" transform="rotate(22.5 250 250)" />
        <rect x="175" y="175" width="150" height="150" strokeWidth="1" opacity="0.6" transform="rotate(67.5 250 250)" />
        <circle cx="250" cy="250" r="60" strokeWidth="1" strokeDasharray="1 5" />
      </g>
    </svg>
  );
}
