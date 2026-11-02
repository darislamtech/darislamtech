"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
};

export function NavLink({ href, className, onNavigate, children }: NavLinkProps) {
  const pathname = usePathname();
  // "/ar" (home) only matches exactly; sections also match their sub-pages.
  const isHome = href.split("/").length === 2;
  const isActive = isHome ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} onClick={onNavigate} aria-current={isActive ? "page" : undefined} className={className}>
      {children}
    </Link>
  );
}
