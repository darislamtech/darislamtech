import Link from "next/link";
import { Quote } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GeometricPattern } from "../pattern";
import { Container, ForwardArrow } from "../ui";

/** Home: the mission statement as a quote, with a link to the About page. */
export function MissionSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = dict.home;

  return (
    <section className="relative overflow-hidden border-y border-line bg-band">
      <GeometricPattern size={80} className="text-primary/5 mask-[radial-gradient(60%_70%_at_50%_50%,transparent_30%,black)]" />
      <Container className="reveal relative py-24 text-center sm:py-32">
        <Quote aria-hidden="true" className="mx-auto size-10 text-tone-rose rtl:-scale-x-100" strokeWidth={1.5} />
        <p className="mt-4 text-sm font-semibold text-tone-gold">{home.missionEyebrow}</p>
        <blockquote className="mx-auto mt-6 max-w-4xl font-display text-2xl leading-[1.7] font-medium text-ink sm:text-[2.1rem] sm:leading-[1.65]">
          {dict.about.mission}
        </blockquote>
        <Link
          href={localePath(locale, "/about")}
          className="group mt-10 inline-flex items-center gap-2 font-semibold text-tone-blue transition-opacity hover:opacity-80"
        >
          {home.missionLink}
          <ForwardArrow />
        </Link>
      </Container>
    </section>
  );
}
