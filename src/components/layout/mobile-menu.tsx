"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavLink } from "./nav-link";
import { ForwardArrow } from "../ui";
import type { NavItem } from "./nav";

type MobileMenuProps = {
  items: NavItem[];
  cta: NavItem;
  labels: { open: string; close: string; nav: string };
};

export function MobileMenu({ items, cta, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Close on any navigation the menu's own links don't handle (header logo, browser back/forward).
  const pathname = usePathname();
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setOpen(false);
  }

  // Lock page scroll and allow Escape to close while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="relative grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-paper-2 max-sm:size-9 max-sm:before:absolute max-sm:before:-inset-1"
      >
        <span className="sr-only">{open ? labels.close : labels.open}</span>
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper"
      >
        <nav aria-label={labels.nav} className="flex min-h-full flex-col px-4 pt-4 pb-8">
          <ul className="flex flex-col">
            {items.map((item, index) => (
              <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${index * 40}ms` }}>
                <NavLink
                  href={item.href}
                  onNavigate={close}
                  className="group flex items-center justify-between border-b border-line py-4 font-display text-2xl font-medium text-ink aria-[current=page]:text-primary"
                >
                  {item.label}
                  <ForwardArrow className="size-5 text-muted" />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Link
              href={cta.href}
              onClick={close}
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary-fill font-semibold text-on-primary"
            >
              {cta.label}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
