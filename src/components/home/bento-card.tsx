import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconTile, type Tone } from "../ui";

/** A large linked card of the home page's "what we offer" grid: icon, title, text, and a preview of the section. */
export function BentoCard({
  href,
  tone,
  icon,
  title,
  body,
  className,
  children,
}: {
  href: string;
  tone: Tone;
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-panel transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <IconTile tone={tone}>{icon}</IconTile>
        <span className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-primary-fill group-hover:bg-primary-fill group-hover:text-on-primary">
          <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-md leading-relaxed text-muted">{body}</p>
      <div className="mt-auto">{children}</div>
    </Link>
  );
}
