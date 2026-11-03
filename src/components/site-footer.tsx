import Link from "next/link";
import { siteConfig } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "./brand";
import { GitHubIcon, socialIcons } from "./icons";
import { GeometricPattern } from "./pattern";
import { Container } from "./ui";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const columns = [
    {
      title: dict.footer.platform,
      links: [
        { href: localePath(locale, "/content"), label: dict.nav.content },
        { href: localePath(locale, "/entertainment"), label: dict.nav.entertainment },
        { href: localePath(locale, "/products"), label: dict.nav.products },
        { href: localePath(locale, "/learn"), label: dict.nav.learn },
      ],
    },
    {
      title: dict.footer.community,
      links: [
        { href: localePath(locale, "/contribute"), label: dict.nav.contribute },
        { href: localePath(locale, "/support"), label: dict.nav.support },
        { href: localePath(locale, "/about"), label: dict.nav.about },
        { href: localePath(locale, "/contact"), label: dict.nav.contact },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-band">
      <GeometricPattern className="text-ink/3 mask-[linear-gradient(to_top,black,transparent)]" />
      <Container className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={localePath(locale)} aria-label={`${dict.brand.name} – ${dict.nav.home}`} className="inline-block rounded-lg">
              <Logo name={dict.brand.short} descriptor={dict.brand.descriptor} />
            </Link>
            <p className="mt-6 font-display text-xl font-medium text-ink">{dict.brand.tagline}</p>
            <p className="mt-3 max-w-sm leading-relaxed text-muted">{dict.footer.about}</p>
            <ul className="mt-6 flex gap-2">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="grid size-10 place-items-center rounded-full border border-line bg-paper-2 text-ink-2 transition-colors hover:border-primary/30 hover:bg-primary-soft hover:text-primary-ink"
                    >
                      <Icon className="size-[1.1rem]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-semibold text-ink">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-muted transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-sm font-semibold text-ink">{dict.footer.openSourceTitle}</h2>
              <p className="mt-4 flex items-start gap-2 leading-relaxed text-muted">
                <GitHubIcon className="mt-1 size-4 shrink-0" />
                {dict.footer.openSource}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {dict.footer.rights}</p>
          <p>{dict.common.nonprofit}</p>
        </div>
      </Container>
    </footer>
  );
}
