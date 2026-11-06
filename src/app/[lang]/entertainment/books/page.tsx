import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { BookCard } from "@/components/entertainment/book-card";
import { EntertainmentShell } from "@/components/entertainment/entertainment-shell";

const PATH = "/entertainment/books";
const allBooks = entertainmentGroups.flatMap((group) => group.books.flatMap((category) => category.items));

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.entertainment;
  // Search results show the titles of the first books, since people search for them by name.
  const titles = allBooks.slice(0, 6).map((book) => book.title);
  const separator = locale === "ar" ? "، " : ", ";
  const more = allBooks.length > titles.length ? "…" : ".";
  return pageMetadata({
    locale,
    dict,
    path: PATH,
    title: `${t.sections.books} – ${dict.nav.entertainment}`,
    description: titles.length > 0 ? `${t.books.description} ${t.books.featured} ${titles.join(separator)}${more}` : t.books.description,
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
        key: book.title,
        node: <BookCard title={book.title} author={book.author} cover={book.cover} />,
      })),
    })),
  }));

  // Structured data for search engines: this page is a list of these books, with their authors and covers.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${t.sections.books} – ${dict.nav.entertainment}`,
    url: `${siteConfig.url}${localePath(locale, PATH)}`,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allBooks.map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Book",
          name: book.title,
          ...(book.author && { author: { "@type": "Person", name: book.author } }),
          ...(book.cover && { image: `${siteConfig.url}${book.cover}` }),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <EntertainmentShell
        locale={locale}
        dict={dict}
        current="books"
        description={t.books.description}
        groups={groups}
        empty={t.books.empty}
        gridClassName="grid-cols-3 gap-x-3 sm:grid-cols-4 sm:gap-x-5 md:grid-cols-5 lg:grid-cols-6"
      />
    </>
  );
}
