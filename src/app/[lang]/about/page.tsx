import type { Metadata } from "next";
import { BookOpen, Compass, Eye, Gem, HeartHandshake, Lamp, Lightbulb, MessageCircleHeart, Sprout, Target, Users } from "lucide-react";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { LogoMark } from "@/components/brand";
import { CtaPanel, PageHero } from "@/components/page-blocks";
import { GeometricPattern } from "@/components/pattern";
import { Container, IconTile, SectionHeading, type Tone } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.about, description: dict.about.description };
}

const valueIcons = [BookOpen, MessageCircleHeart, Lamp, Gem, HeartHandshake, Lightbulb, Sprout];
const valueTones: Tone[] = ["gold", "mint", "rose", "blue", "mint", "rose", "gold"];
const statementTones: Tone[] = ["gold", "blue", "mint"];

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.about;

  const statements = [
    { icon: Target, title: t.missionTitle, body: t.mission },
    { icon: Eye, title: t.visionTitle, body: t.vision },
    { icon: Compass, title: t.ambitionTitle, body: t.ambition },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        eyebrowTone="gold"
        title={t.title}
        description={t.description}
        crumbsLabel={dict.nav.breadcrumb}
        crumbs={[
          { href: localePath(locale), label: dict.nav.home },
          { href: localePath(locale, "/about"), label: dict.nav.about },
        ]}
      />

      {/* Who we are + the name */}
      <section className="reveal py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <p className="font-display text-2xl leading-[1.75] font-medium text-ink sm:text-[1.9rem] sm:leading-[1.7] lg:col-span-7">
            {t.who}
          </p>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 lg:col-span-5">
            <GeometricPattern className="text-primary/6" />
            <div className="relative">
              <LogoMark className="size-12" />
              <h2 className="mt-6 font-display text-xl font-semibold text-ink">{t.nameTitle}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{t.nameBody}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission, vision, ambition */}
      <section className="reveal border-y border-line bg-band py-20 sm:py-24">
        <Container>
          <ul className="grid gap-4 lg:grid-cols-3">
            {statements.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-panel sm:p-8">
                <IconTile tone={statementTones[index]}>
                  <Icon />
                </IconTile>
                <h2 className="mt-6 font-display text-2xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 leading-[1.9] text-ink-2">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Values */}
      <section className="reveal py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.valuesEyebrow} eyebrowTone="rose" title={t.valuesTitle} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <li key={value} className="flex flex-col rounded-3xl border border-line bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <IconTile tone={valueTones[index]}>
                      <Icon />
                    </IconTile>
                    <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-6 font-display text-lg leading-snug font-semibold text-ink">{value}</p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Community */}
      <section className="reveal pb-4">
        <Container>
          <div className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:p-10">
            <IconTile tone="gold" className="size-14 rounded-2xl [&>svg]:size-6">
              <Users />
            </IconTile>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">{t.communityTitle}</h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-ink-2">{t.communityBody}</p>
            </div>
          </div>
        </Container>
      </section>

      <CtaPanel
        title={dict.home.ctaTitle}
        body={dict.home.ctaBody}
        primary={{ href: localePath(locale, "/contribute"), label: dict.home.ctaPrimary }}
        secondary={{ href: localePath(locale, "/contact"), label: dict.home.ctaSecondary }}
      />
    </>
  );
}
