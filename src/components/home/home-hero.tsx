import { BookOpen, Code, Gift, Languages } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GeometricPattern } from "../pattern";
import { Badge, ButtonLink, Container, IconTile, type Tone } from "../ui";
import { HeroVisual } from "./hero-visual";

const pillarIcons = [BookOpen, Gift, Code, Languages];
// Every element on the page takes one of the four tones, so the page uses all of them.
const pillarTones: Tone[] = ["mint", "gold", "blue", "rose"];

/** Home: the opening section (title, intro, the two main buttons and the hero visual), then the four pillars. */
export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = dict.home;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_20%,var(--primary-tint),transparent_70%)] rtl:bg-[radial-gradient(50%_60%_at_20%_20%,var(--primary-tint),transparent_70%)]" />
      <GeometricPattern className="text-primary/5 mask-[radial-gradient(60%_50%_at_50%_0%,black,transparent)]" />
      <Container className="relative grid items-center gap-14 pt-28 pb-16 sm:pt-32 lg:grid-cols-12 lg:gap-8 lg:pt-38 lg:pb-24">
        <div className="lg:col-span-7">
          <div className="animate-fade-up">
            <Badge tone="rose" dot className="px-3 py-1.5 text-[0.8rem]">
              {home.badge}
            </Badge>
          </div>
          <h1 className="mt-7 animate-fade-up font-display text-[2.6rem] leading-[1.2] font-bold text-ink [animation-delay:80ms] sm:text-6xl lg:text-[4.25rem] ltr:tracking-tight ltr:lg:text-[3.6rem]">
            <span className="block">{home.titleLead}</span>
            <span className="relative inline-block text-tone-mint">
              {home.titleAccent}
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-3 h-3 w-full text-gold-bright/80 ltr:-bottom-2"
              >
                <path d="M2 9C60 3 140 2 298 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-8 max-w-xl animate-fade-up text-lg leading-[1.9] text-ink-2 [animation-delay:160ms] sm:text-xl sm:leading-[1.9]">
            {home.intro}
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <ButtonLink href={localePath(locale, "/content")} size="lg" arrow>
              {home.primaryCta}
            </ButtonLink>
            <ButtonLink href={localePath(locale, "/contribute")} size="lg" variant="secondary">
              {home.secondaryCta}
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <HeroVisual dict={dict} />
        </div>
      </Container>

      <Container className="relative pb-16 lg:pb-20">
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {dict.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <li key={pillar.title} className="flex items-start gap-3.5 bg-surface p-5 sm:p-6">
                <IconTile tone={pillarTones[index]} className="size-10 [&>svg]:size-[1.15rem]">
                  <Icon />
                </IconTile>
                <div>
                  <p className="font-semibold text-ink">{pillar.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
