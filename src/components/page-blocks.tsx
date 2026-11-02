import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { GeometricPattern } from "./pattern";
import { ButtonLink, Container, Eyebrow, IconTile, type Tone } from "./ui";

type Crumb = { href: string; label: string };

export function PageHero({
  eyebrow,
  eyebrowTone,
  title,
  description,
  crumbs,
  crumbsLabel,
  children,
}: {
  eyebrow: string;
  eyebrowTone?: Tone;
  title: string;
  description: string;
  crumbs: Crumb[];
  crumbsLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,var(--primary-tint),transparent_70%)] rtl:bg-[radial-gradient(60%_80%_at_15%_0%,var(--primary-tint),transparent_70%)]" />
      <GeometricPattern className="text-primary/7 mask-[linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container className="relative pt-10 pb-16 sm:pt-12 sm:pb-20">
        <nav aria-label={crumbsLabel} className="mb-10 sm:mb-14">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            {crumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && <ChevronLeft aria-hidden="true" className="size-3.5 ltr:rotate-180" />}
                {index < crumbs.length - 1 ? (
                  <Link href={crumb.href} className="transition-colors hover:text-ink">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink-2">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow tone={eyebrowTone} className="mb-5">{eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl leading-[1.2] font-bold text-balance text-ink sm:text-5xl lg:text-[3.5rem] ltr:tracking-tight">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            {description}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  actions,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-dashed border-line-strong bg-surface/60 px-6 py-16 text-center sm:py-20",
        className,
      )}
    >
      <GeometricPattern className="text-ink/3.5 mask-[radial-gradient(closest-side,black,transparent)]" />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <span className="relative mb-6 grid place-items-center">
          <span aria-hidden="true" className="absolute size-20 rotate-45 rounded-2xl border border-primary/15" />
          <span aria-hidden="true" className="absolute size-20 rounded-2xl border border-primary/15" />
          <IconTile className="size-14 rounded-2xl [&>svg]:size-6">{icon}</IconTile>
        </span>
        <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
        <p className="mt-3 leading-relaxed text-muted">{body}</p>
        {actions && <div className="mt-7 flex flex-wrap justify-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

export function CtaPanel({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="reveal py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-4xl border border-primary/15 bg-primary-tint px-6 py-14 sm:px-14 sm:py-16">
          <GeometricPattern className="text-primary/9 mask-[linear-gradient(to_left,black,transparent_75%)] rtl:mask-[linear-gradient(to_right,black,transparent_75%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl leading-tight font-semibold text-balance text-ink sm:text-4xl ltr:tracking-tight">
                {title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">{body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={primary.href} size="lg" arrow>
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} size="lg" variant="secondary">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
