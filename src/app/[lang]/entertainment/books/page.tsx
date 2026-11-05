import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { BookCard } from "@/components/entertainment/book-card";
import { EntertainmentShell } from "@/components/entertainment/entertainment-shell";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.entertainment;
  return pageMetadata({
    locale,
    dict,
    path: "/entertainment/books",
    title: `${t.sections.books} – ${dict.nav.entertainment}`,
    description: t.books.description,
  });
}

export default async function EntertainmentBooksPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.entertainment;

  const groups = entertainmentGroups.map((group) => ({
    id: group.id,
    label: group.title[locale],
    categories: group.books.map((category) => ({
      id: category.id,
      title: category.title[locale],
      items: category.items.map((book) => ({
        key: `${book.title}-${book.author}`,
        node: <BookCard title={book.title} author={book.author} why={book.why[locale]} cover={book.cover} />,
      })),
    })),
  }));

  return (
    <EntertainmentShell
      locale={locale}
      dict={dict}
      current="books"
      description={t.books.description}
      groups={groups}
      empty={t.books.empty}
      gridClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    />
  );
}
