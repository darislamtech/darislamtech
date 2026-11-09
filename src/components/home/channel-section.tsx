import { BookOpen, Code } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { LogoMark } from "../brand";
import { socialIcons, YouTubeIcon } from "../icons";
import { GeometricPattern } from "../pattern";
import { ButtonLink, Container, IconTile, SectionHeading, type Tone } from "../ui";

// YouTube channel tracks: Islamic knowledge and da'wah first, then technology.
const channelTrackIcons = [BookOpen, Code];
const channelTrackTones: Tone[] = ["mint", "blue"];

/** Home: the YouTube channel (its tracks, a subscribe button, the other accounts) and a channel preview card. */
export function ChannelSection({ dict }: { dict: Dictionary }) {
  const home = dict.home;

  return (
    <section className="reveal pb-4">
      <Container>
        <div className="grid items-center gap-12 rounded-4xl border border-line bg-surface p-6 shadow-panel sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <SectionHeading
              eyebrow={home.channelEyebrow}
              eyebrowTone="rose"
              title={home.channelTitle}
              description={home.channelBody}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {home.channelTracks.map((track, index) => {
                const Icon = channelTrackIcons[index];
                return (
                  <li key={track.title} className="flex gap-3 rounded-2xl border border-line bg-surface-2 p-4">
                    <IconTile tone={channelTrackTones[index]}>
                      <Icon aria-hidden="true" />
                    </IconTile>
                    <div>
                      <h3 className="font-semibold text-ink">{track.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{track.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={siteConfig.youtubeChannel} external size="lg">
                <YouTubeIcon className="size-5" />
                {home.channelCta}
              </ButtonLink>
              {siteConfig.socials
                .filter((social) => social.name !== "YouTube")
                .map((social) => {
                  const Icon = socialIcons[social.name];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="grid size-12 place-items-center rounded-full border border-line-strong text-ink-2 transition-colors hover:border-primary/30 hover:bg-primary-soft hover:text-primary-ink"
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
            </div>
          </div>

          <a
            href={siteConfig.youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-3xl border border-line bg-surface-2 transition-shadow duration-300 hover:shadow-lift"
          >
            <div className="relative h-36 overflow-hidden bg-primary-tint">
              <GeometricPattern className="text-primary/15" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--primary-tint),transparent)]" />
            </div>
            <div className="relative px-6 pb-6">
              <div className="-mt-10 grid size-20 place-items-center rounded-2xl border-4 border-surface-2 bg-surface shadow-soft">
                <LogoMark className="size-11" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-semibold text-ink">{dict.brand.name}</p>
                  <p dir="ltr" className="mt-1 font-mono text-sm text-muted rtl:text-end">
                    {siteConfig.youtubeHandle}
                  </p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-surface transition-transform duration-300 group-hover:scale-110">
                  <YouTubeIcon className="size-5" />
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {home.channelTracks.map((track) => (
                  <li key={track.title} className="rounded-full bg-surface px-3 py-1 text-xs text-ink-2 ring-1 ring-line">
                    {track.title}
                  </li>
                ))}
              </ul>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}
