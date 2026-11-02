import { Gift, HeartHandshake } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { LogoMark } from "../brand";
import { GitHubIcon } from "../icons";
import { StarOrnament } from "../pattern";
import type { Tone } from "../ui";

const chipTone: Record<Tone, string> = {
  gold: "bg-tone-gold-soft text-tone-gold",
  rose: "bg-tone-rose-soft text-tone-rose",
  mint: "bg-tone-mint-soft text-tone-mint",
  blue: "bg-tone-blue-soft text-tone-blue",
};

function Chip({ icon, label, tone, className }: { icon: React.ReactNode; label: string; tone: Tone; className: string }) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-full border border-line bg-surface/95 py-2 ps-2 pe-4 text-sm font-medium text-ink shadow-soft backdrop-blur animate-float ${className}`}
    >
      <span className={`grid size-7 place-items-center rounded-full [&>svg]:size-3.5 ${chipTone[tone]}`}>
        {icon}
      </span>
      {label}
    </div>
  );
}

/** Hero composition: rotating geometric ornament, a "config" code card and floating value chips. */
export function HeroVisual({ dict }: { dict: Dictionary }) {
  const v = dict.home.visual;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[34rem]">
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,var(--primary-tint),transparent)]" />
      <StarOrnament className="absolute inset-0 size-full animate-spin-slow text-primary/25" />

      <div className="absolute inset-x-[2%] top-1/2 -translate-y-1/2 animate-fade-up [animation-delay:200ms] sm:inset-x-[9%]">
        <div dir="ltr" className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
          <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
            <span className="size-2.5 rounded-full bg-madder-300" />
            <span className="size-2.5 rounded-full bg-gold-300" />
            <span className="size-2.5 rounded-full bg-emerald-300" />
            <span className="ms-3 font-mono text-xs text-muted">dar.config.ts</span>
            <LogoMark className="ms-auto size-4" />
          </div>
          <pre className="overflow-hidden px-4 py-5 font-mono text-[11.5px] leading-[1.9] text-ink-2 sm:text-[13.5px]">
            <code>
              <Line n={1}>
                <span className="text-tone-rose">export const</span> dar <span className="text-muted">= {"{"}</span>
              </Line>
              <Line n={2}>
                {"  "}mission<span className="text-muted">:</span>{" "}
                <span className="text-tone-mint">
                  &quot;<bdi>{v.mission}</bdi>&quot;
                </span>
                <span className="text-muted">,</span>
              </Line>
              <Line n={3}>
                {"  "}impact<span className="text-muted">:</span>{" "}
                <span className="text-tone-mint">
                  &quot;<bdi>{v.impact}</bdi>&quot;
                </span>
                <span className="text-muted">,</span>
              </Line>
              <Line n={4}>
                {"  "}username<span className="text-muted">:</span>{" "}
                <span className="text-tone-mint">&quot;{siteConfig.youtubeHandle}&quot;</span>
                <span className="text-muted">,</span>
              </Line>
              <Line n={5}>
                {"  "}email<span className="text-muted">:</span>{" "}
                <span className="text-tone-mint">&quot;{siteConfig.email}&quot;</span>
                <span className="text-muted">,</span>
              </Line>
              <Line n={6}>
                {"  "}openSource<span className="text-muted">:</span> <span className="text-tone-blue">true</span>
                <span className="text-muted">,</span>
              </Line>
              <Line n={7}>
                {"  "}price<span className="text-muted">:</span> <span className="text-tone-blue">0</span>
                <span className="text-muted">,</span>
              </Line>
              <Line n={8}>
                <span className="text-muted">{"};"}</span>
                <span className="ms-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-tone-gold" />
              </Line>
            </code>
          </pre>
        </div>
      </div>

      <Chip
        icon={<HeartHandshake />}
        label={v.chipNonprofit}
        tone="rose"
        className="start-0 top-[12%] [animation-delay:-1s] sm:start-[2%]"
      />
      <Chip
        icon={<GitHubIcon />}
        label={v.chipOpen}
        tone="blue"
        className="end-0 bottom-[1%] [animation-delay:-3.5s] sm:end-[2%] sm:bottom-[14%]"
      />
      <Chip icon={<Gift />} label={v.chipFree} tone="mint" className="start-[8%] bottom-[3%] hidden [animation-delay:-5s] sm:flex" />
    </div>
  );
}

function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span className="block whitespace-pre">
      <span className="me-4 inline-block w-3 text-end text-muted/50 select-none">{n}</span>
      {children}
    </span>
  );
}
