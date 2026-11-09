import { Boxes, Construction, GitPullRequest, GraduationCap, Newspaper } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { externalDomains } from "@/content/learn";
import { cn } from "@/lib/cn";
import { productStatusOrder, productStatusStyles } from "../products/product-status";
import { Container, SectionHeading } from "../ui";
import { BentoCard } from "./bento-card";

/** Home: "what we offer", one card per section of the site (content, products, learn, contribute). */
export function OfferSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = dict.home;

  return (
    <section className="reveal py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={home.offerEyebrow}
          eyebrowTone="blue"
          title={home.offerTitle}
          description={home.offerBody}
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          <BentoCard
            href={localePath(locale, "/content")}
            tone="blue"
            icon={<Newspaper />}
            title={home.cards.content.title}
            body={home.cards.content.body}
            className="lg:col-span-4"
          >
            <ul className="mt-8 flex flex-wrap gap-2">
              {/* The first topics of each group, religious and da'wah topics first. */}
              {dict.topics.flatMap((group) => group.items.slice(0, 4)).map((topic) => (
                <li key={topic} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink-2">
                  {topic}
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard
            href={localePath(locale, "/products")}
            tone="gold"
            icon={<Boxes />}
            title={home.cards.products.title}
            body={home.cards.products.body}
            className="lg:col-span-2"
          >
            <ul className="mt-8 grid grid-cols-2 gap-2">
              {productStatusOrder.map((status) => (
                <li key={status} className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 text-sm text-ink-2">
                  <span className={cn("size-2 rounded-full", productStatusStyles[status].dot)} />
                  {dict.products.status[status]}
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard
            href={localePath(locale, "/learn")}
            tone="mint"
            icon={<GraduationCap />}
            title={home.cards.learn.title}
            body={home.cards.learn.body}
            className="lg:col-span-2"
          >
            <ul className="mt-8 space-y-2">
              {externalDomains.map((domain) => (
                <li
                  key={domain.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-surface-2 px-3 py-2.5 text-sm"
                >
                  <span className="flex items-center gap-2 text-ink-2">
                    <Construction aria-hidden="true" className="size-3.5 shrink-0 text-muted" />
                    {domain.title[locale]}
                  </span>
                  <span className="shrink-0 text-xs text-muted">{dict.learn.underConstruction}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard
            href={localePath(locale, "/contribute")}
            tone="rose"
            icon={<GitPullRequest />}
            title={home.cards.contribute.title}
            body={home.cards.contribute.body}
            className="lg:col-span-4"
          >
            <ul className="mt-8 flex flex-wrap gap-2">
              {dict.contribute.ways.map((way) => (
                <li key={way.title} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink-2">
                  {way.title}
                </li>
              ))}
            </ul>
            <ol className="mt-6 flex flex-wrap items-center gap-2 border-t border-dashed border-line pt-6">
              {home.cards.contribute.flow.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-[0.8rem] font-medium",
                      index === home.cards.contribute.flow.length - 1
                        ? "border-tone-mint/25 bg-tone-mint-soft text-tone-mint"
                        : "border-line bg-surface-2 text-ink-2",
                    )}
                  >
                    {step}
                  </span>
                  {index < home.cards.contribute.flow.length - 1 && (
                    <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
                  )}
                </li>
              ))}
            </ol>
          </BentoCard>
        </div>
      </Container>
    </section>
  );
}
