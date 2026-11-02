import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Arrow pointing "forward" in the reading direction (left in Arabic, right in English). */
export function ForwardArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 transition-transform duration-300 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1",
        className,
      )}
    />
  );
}

const buttonVariants = {
  primary:
    "bg-primary-fill text-on-primary shadow-button hover:bg-primary-hover",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink-2/40 hover:bg-surface-2",
  ghost: "text-ink-2 hover:bg-paper-2 hover:text-ink",
};

const buttonSizes = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-11 gap-2 px-5 text-[0.95rem]",
  lg: "h-12 gap-2 px-6 text-base",
};

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  external?: boolean;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  arrow = false,
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(
    "group inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors duration-200",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );
  const content = (
    <>
      {children}
      {arrow && <ForwardArrow />}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/** The four cheerful tones; each element of a page takes one of them (see globals.css). */
export type Tone = "gold" | "rose" | "mint" | "blue";

export const toneText: Record<Tone, string> = {
  gold: "text-tone-gold",
  rose: "text-tone-rose",
  mint: "text-tone-mint",
  blue: "text-tone-blue",
};

export const toneDot: Record<Tone, string> = {
  gold: "bg-tone-gold",
  rose: "bg-tone-rose",
  mint: "bg-tone-mint",
  blue: "bg-tone-blue",
};

const badgeTones = {
  neutral: "border-line bg-surface text-ink-2",
  primary: "border-primary/15 bg-primary-soft text-primary-ink",
  gold: "border-tone-gold/25 bg-tone-gold-soft text-tone-gold",
  rose: "border-tone-rose/25 bg-tone-rose-soft text-tone-rose",
  mint: "border-tone-mint/25 bg-tone-mint-soft text-tone-mint",
  blue: "border-tone-blue/25 bg-tone-blue-soft text-tone-blue",
  muted: "border-line bg-paper-2 text-muted",
};

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
}: {
  tone?: keyof typeof badgeTones;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs leading-none font-medium",
        badgeTones[tone],
        className,
      )}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}

export function Eyebrow({ tone, className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("flex items-center gap-2 text-sm font-semibold", tone ? toneText[tone] : "text-primary", className)}>
      <span aria-hidden="true" className={cn("size-1.5 rotate-45", tone ? toneDot[tone] : "bg-gold-bright")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  description,
  align = "start",
  className,
}: {
  eyebrow?: string;
  eyebrowTone?: Tone;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow tone={eyebrowTone} className={cn("mb-4", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="font-display text-3xl leading-tight font-semibold text-balance text-ink sm:text-[2.5rem] ltr:tracking-tight">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}

/** Rounded icon tile used on cards. */
export function IconTile({
  tone = "primary",
  className,
  children,
}: {
  tone?: "primary" | "neutral" | Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const tones = {
    primary: "bg-primary-soft text-primary-ink ring-primary/10",
    neutral: "bg-paper-2 text-ink-2 ring-line",
    gold: "bg-tone-gold-soft text-tone-gold ring-tone-gold/20",
    rose: "bg-tone-rose-soft text-tone-rose ring-tone-rose/20",
    mint: "bg-tone-mint-soft text-tone-mint ring-tone-mint/20",
    blue: "bg-tone-blue-soft text-tone-blue ring-tone-blue/20",
  };
  return (
    <span
      className={cn("grid size-11 shrink-0 place-items-center rounded-xl ring-1 [&>svg]:size-5", tones[tone], className)}
    >
      {children}
    </span>
  );
}

export function Card({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const base = "relative flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-panel sm:p-7";
  if (!href) return <div className={cn(base, className)}>{children}</div>;
  return (
    <Link
      href={href}
      className={cn(
        base,
        "group transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Splits text on blank lines into paragraphs. */
export function Paragraphs({ text }: { text: string }) {
  return (
    <div className="space-y-5 text-lg leading-[1.95] text-ink-2">
      {text.split(/\n\s*\n/).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
