import type { Metadata } from "next";
import { Boxes, Code, Gift, Smartphone } from "lucide-react";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { products } from "@/content/products";
import { CtaPanel, EmptyState, PageHero } from "@/components/page-blocks";
import { productStatusOrder, productStatusStyles } from "@/components/products/product-status";
import { Badge, ButtonLink, Card, Container, ForwardArrow, IconTile, SectionHeading, type Tone } from "@/components/ui";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/products", title: dict.nav.products, description: dict.products.description });
}

const statusStyles = productStatusStyles;
const statusOrder = productStatusOrder;
const principleIcons = [Gift, Code, Smartphone];
const principleTones: Tone[] = ["gold", "blue", "mint"];

export default async function ProductsPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.products;

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
          { href: localePath(locale, "/products"), label: dict.nav.products },
        ]}
      />

      <Container className="py-16 sm:py-20">
        {products.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.slug} href={localePath(locale, `/products/${product.slug}`)}>
                <div className="flex items-start justify-between gap-4">
                  <IconTile tone={statusStyles[product.status].icon}>
                    <Boxes />
                  </IconTile>
                  <Badge tone={statusStyles[product.status].tone} dot>
                    {t.status[product.status]}
                  </Badge>
                </div>
                <h2 className="mt-6 font-display text-xl font-semibold text-ink">{product.name[locale]}</h2>
                <p className="mt-2 leading-relaxed text-muted">{product.summary[locale]}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
                  {dict.common.learnMore}
                  <ForwardArrow />
                </span>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Boxes />}
            title={t.emptyTitle}
            body={t.emptyBody}
            actions={
              <ButtonLink href={localePath(locale, "/contact")} variant="secondary">
                {t.suggestCta}
              </ButtonLink>
            }
          />
        )}
      </Container>

      <section className="reveal border-y border-line bg-band py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading title={t.statusTitle} description={t.statusBody} className="lg:col-span-5" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {statusOrder.map((status) => (
              <li key={status} className="rounded-2xl border border-line bg-surface p-5">
                <span className="flex items-center gap-2.5 font-semibold text-ink">
                  <span className={cn("size-2.5 rounded-full ring-4 ring-surface", statusStyles[status].dot)} />
                  {t.status[status]}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.statusDescriptions[status]}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="reveal py-20 sm:py-24">
        <Container>
          <SectionHeading title={t.principlesTitle} align="center" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {t.principles.map((principle, index) => {
              const Icon = principleIcons[index];
              return (
                <li key={principle.title} className="rounded-3xl border border-line bg-surface p-7 text-center">
                  <IconTile tone={principleTones[index]} className="mx-auto">
                    <Icon />
                  </IconTile>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{principle.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{principle.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaPanel
        title={t.suggestTitle}
        body={t.suggestBody}
        primary={{ href: localePath(locale, "/contact"), label: t.suggestCta }}
      />
    </>
  );
}
