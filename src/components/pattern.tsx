import { cn } from "@/lib/cn";

/**
 * Tiled eight-point-star lattice, used as a faint background texture. Color comes from `text-*`; `className` may also
 * fade it with a mask class. The tile is a CSS mask over the text color rather than an SVG `<pattern>`, which needs
 * an id: Next keeps pages the visitor left in the document, and their pattern ids clashed. Inline styles get no
 * vendor prefixes, so the -webkit- mask properties are set too (older Chrome, Samsung Internet, Android WebView).
 */
export function GeometricPattern({ className, size = 64 }: { className?: string; size?: number }) {
  const c = size / 2;
  const s = size * 0.22;
  const tile = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">`,
    `<g fill="none" stroke="black" stroke-width="1">`,
    `<rect x="${c - s}" y="${c - s}" width="${s * 2}" height="${s * 2}"/>`,
    `<rect x="${c - s}" y="${c - s}" width="${s * 2}" height="${s * 2}" transform="rotate(45 ${c} ${c})"/>`,
    `<path d="M0 0L${c - s * 1.41} ${c - s * 1.41}M${size} 0L${c + s * 1.41} ${c - s * 1.41}M0 ${size}L${c - s * 1.41} ${c + s * 1.41}M${size} ${size}L${c + s * 1.41} ${c + s * 1.41}"/>`,
    `</g></svg>`,
  ].join("");
  const image = `url("data:image/svg+xml,${encodeURIComponent(tile)}")`;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 size-full", className)}>
      <div
        className="size-full bg-current"
        style={{
          maskImage: image,
          WebkitMaskImage: image,
          maskSize: `${size}px ${size}px`,
          WebkitMaskSize: `${size}px ${size}px`,
          maskRepeat: "repeat",
          WebkitMaskRepeat: "repeat",
          maskPosition: "0 0",
          WebkitMaskPosition: "0 0",
        }}
      />
    </div>
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
