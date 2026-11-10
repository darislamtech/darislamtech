import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { Badge, Container, SectionHeading } from "../ui";

// The current phase, an index into `dict.phases`: "Build" (the site is live; first products and learning tracks in
// progress). Update it when the project moves on — the site must not show an outdated phase.
const CURRENT_PHASE = 2;

/** About: «أين نحن الآن», the project's phases in order with the current one marked. */
export function RoadmapSection({ dict }: { dict: Dictionary }) {
  const t = dict.about;

  return (
    <section className="reveal py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t.roadmapEyebrow}
          eyebrowTone="mint"
          title={t.roadmapTitle}
          description={t.roadmapBody}
        />
        <ol className="relative mt-14 grid gap-4 md:grid-cols-5 md:gap-0">
          <span aria-hidden="true" className="absolute inset-x-[10%] top-5 hidden h-px bg-line-strong md:block" />
          {dict.phases.map((phase, index) => {
            const current = index === CURRENT_PHASE;
            return (
              <li
                key={phase.title}
                aria-current={current ? "step" : undefined}
                className="relative flex gap-4 md:flex-col md:items-center md:px-3 md:text-center"
              >
                <span
                  className={cn(
                    "relative grid size-10 shrink-0 place-items-center rounded-full border font-mono text-sm font-medium",
                    current
                      ? "border-primary-fill bg-primary-fill text-on-primary shadow-[0_0_0_6px_var(--tone-gold-soft)]"
                      : "border-line-strong bg-paper text-muted",
                  )}
                >
                  {current && (
                    <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-primary-fill/30" />
                  )}
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pb-2 md:mt-5">
                  <p className="flex items-center gap-2 font-display text-lg font-semibold text-ink md:justify-center">
                    {phase.title}
                    {current && <Badge tone="mint">{dict.common.now}</Badge>}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{phase.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
