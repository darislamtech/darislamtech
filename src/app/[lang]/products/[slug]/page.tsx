import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Boxes } from "lucide-react";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { getProduct, products } from "@/content/products";
import { GitHubIcon } from "@/components/icons";
import { productStatusStyles } from "@/components/products/product-status";
import { YouTubeEmbed } from "@/components/video/youtube-embed";
import { Badge, ButtonLink, Container, ForwardArrow, IconTile, Paragraphs } from "@/components/ui";

export function generateStaticParams() {
  // Cache Components needs at least one param; the placeholder renders a 404 until real products exist.
  if (products.length === 0) return [{ slug: "_" }];
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: `/products/${product.slug}`, title: product.name[locale], description: product.summary[locale] });
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.products;
  const installSteps = product.installSteps?.[locale];

  return (
    <article>
      <header className="border-b border-line">
        <Container className="max-w-4xl pt-10 pb-14">
          <Link
            href={localePath(locale, "/products")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
          >
            <ForwardArrow className="rotate-180 rtl:rotate-0" />
            {t.back}
          </Link>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start">
            <IconTile className="size-16 rounded-2xl [&>svg]:size-7">
              <Boxes />
            </IconTile>
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone={productStatusStyles[product.status].tone} dot>
                  {t.status[product.status]}
                </Badge>
              </div>
              <h1 className="mt-4 font-display text-4xl leading-tight font-bold text-ink sm:text-5xl">
                {product.name[locale]}
              </h1>
              <p className="mt-4 text-xl leading-relaxed text-muted">{product.summary[locale]}</p>
              {(product.url || product.repoUrl) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {product.url && (
                    <ButtonLink href={product.url} external arrow>
                      {t.open}
                    </ButtonLink>
                  )}
                  {product.repoUrl && (
                    <ButtonLink href={product.repoUrl} external variant="secondary">
                      <GitHubIcon className="size-4" />
                      {t.source}
                    </ButtonLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      <Container className="max-w-4xl space-y-14 py-14">
        <Paragraphs text={product.description[locale]} />

        {product.youtubeId && (
          <section>
            <h2 className="mb-5 font-display text-2xl font-semibold text-ink">{t.video}</h2>
            <YouTubeEmbed id={product.youtubeId} title={product.name[locale]} />
          </section>
        )}

        {installSteps && installSteps.length > 0 && (
          <section className="rounded-3xl border border-line bg-surface p-7 sm:p-9">
            <h2 className="font-display text-2xl font-semibold text-ink">{t.install}</h2>
            <ol className="mt-6 space-y-4">
              {installSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft font-mono text-sm font-medium text-primary-ink">
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-ink-2">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}
      </Container>
    </article>
  );
}
