import Link from "next/link";
import { BookOpen, Clapperboard, Tv } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PageHero } from "../page-blocks";
import { Tabs } from "../tabs";
import { Container, toneDot, type Tone } from "../ui";
import { cn } from "@/lib/cn";

export type EntertainmentSection = "videos" | "channels" | "books";

export type EntertainmentGroupView = {
  id: string;
  label: string;
  /** A tab with its own content instead of categories (the videos page's «الكل»), and the count its button shows. */
  own?: { content: React.ReactNode; count: number };
  categories: {
    id: string;
    title: string;
    items: { key: string; node: React.ReactNode }[];
    /** Shown instead of the grid of items (the videos page uses a sortable row). */
    content?: React.ReactNode;
  }[];
};

const sections: { id: EntertainmentSection; path: string; Icon: typeof Tv }[] = [
  { id: "videos", path: "/entertainment", Icon: Clapperboard },
  { id: "channels", path: "/entertainment/channels", Icon: Tv },
  { id: "books", path: "/entertainment/books", Icon: BookOpen },
];

// Each category heading takes the next of the four tones.
const categoryTones: Tone[] = ["gold", "blue", "mint", "rose"];

type EntertainmentShellProps = {
  locale: Locale;
  dict: Dictionary;
  current: EntertainmentSection;
  description: string;
  /** Controls shown above the tabs, e.g. the random pick. */
  toolbar?: React.ReactNode;
  /** Controls shown at the top of each group's tab, above its categories (the videos sort). */
  groupToolbar?: React.ReactNode;
  /** One tab per group, with its categories (or its own content). The first tab is open by default. */
  groups: EntertainmentGroupView[];
  /** Shown under a category with nothing in it yet, or once in a tab with no categories. */
  empty: string;
  /** Grid columns for this kind of card. */
  gridClassName: string;
};

/**
 * Shared layout of the Entertainment pages (videos, channels, books): hero, links between the pages, then one tab per
 * group with its categories. Each page resolves its own cards and passes them in.
 */
export function EntertainmentShell(props: EntertainmentShellProps) {
  const { locale, dict, current, description, toolbar, groupToolbar, groups, empty, gridClassName } = props;
  const t = dict.entertainment;
  const crumbs = [
    { href: localePath(locale), label: dict.nav.home },
    { href: localePath(locale, "/entertainment"), label: dict.nav.entertainment },
  ];
  if (current !== "videos") crumbs.push({ href: localePath(locale, `/entertainment/${current}`), label: t.sections[current] });

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        eyebrowTone="rose"
        title={t.title}
        description={description}
        crumbsLabel={dict.nav.breadcrumb}
        crumbs={crumbs}
      />

      <Container className="py-16 sm:py-20">
        <nav aria-label={t.sectionsLabel}>
          {/* Phones: no icons and tighter padding, so the three links fit in one row at 320px in both languages. */}
          <ul className="grid grid-cols-3 gap-1 rounded-2xl border border-line bg-surface p-1.5 sm:inline-flex">
            {sections.map(({ id, path, Icon }) => (
              <li key={id} className="min-w-0">
                <Link
                  href={localePath(locale, path)}
                  aria-current={id === current ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors sm:px-5 sm:text-base",
                    id === current ? "bg-primary-fill text-on-primary" : "text-ink-2 hover:bg-paper-2 hover:text-ink",
                  )}
                >
                  <Icon aria-hidden="true" className="hidden size-4 shrink-0 sm:block" />
                  {t.sections[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">
          {toolbar && <div className="mb-8">{toolbar}</div>}
          <GroupTabs
            label={t.groupsLabel}
            groups={groups}
            groupToolbar={groupToolbar}
            empty={empty}
            gridClassName={gridClassName}
          />
        </div>
      </Container>
    </>
  );
}

/** One tab per group, each with its categories: a heading, then the items (or the category's own content). */
function GroupTabs({
  label,
  groups,
  groupToolbar,
  empty,
  gridClassName,
}: {
  label: string;
  groups: EntertainmentGroupView[];
  groupToolbar?: React.ReactNode;
  empty: string;
  gridClassName: string;
}) {
  return (
    <Tabs
      label={label}
      // Three tabs (the videos page with «الكل») would scroll out of sight on phones, so they stack there.
      stackOnMobile={groups.length > 2}
      items={groups.map((group) => ({
        id: group.id,
        label: group.label,
        count: group.own?.count ?? group.categories.reduce((total, category) => total + category.items.length, 0),
        content: group.own ? (
          group.own.content
        ) : group.categories.length === 0 ? (
          <EmptyNote text={empty} />
        ) : (
          <>
            {groupToolbar && <div className="mb-8">{groupToolbar}</div>}
            <div className="space-y-14">
              {group.categories.map((category, index) => (
                <section key={category.id} aria-labelledby={`category-${category.id}`}>
                  <h2
                    id={`category-${category.id}`}
                    className="mb-6 flex items-center gap-3 font-display text-2xl font-semibold text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className={cn("size-2.5 rotate-45 rounded-[2px]", toneDot[categoryTones[index % categoryTones.length]])}
                    />
                    {category.title}
                  </h2>
                  {category.items.length > 0 ? (
                    (category.content ?? (
                      <div className={cn("grid gap-x-5 gap-y-8", gridClassName)}>
                        {category.items.map((item) => (
                          <div key={item.key}>{item.node}</div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <EmptyNote text={empty} />
                  )}
                </section>
              ))}
            </div>
          </>
        ),
      }))}
    />
  );
}

function EmptyNote({ text }: { text: string }) {
  return <p className="rounded-2xl border border-dashed border-line-strong px-6 py-10 text-center text-muted">{text}</p>;
}
