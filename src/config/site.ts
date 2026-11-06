// Only accounts that actually exist are listed here. The full list with notes is in docs/accounts.md.
import type { SocialName } from "@/components/icons";

/** A way to support the project financially, shown on the support page. Add one only once its account is live. */
export type SupportLink = { name: "Ko-fi" | "PayPal"; href: string };

type Social = { name: SocialName; href: string };

// The founder's PayPal.Me: a plain payment link, never a PayPal "Donate" button (see AI-Instructions/project/RULES.md).
const supportLinks: SupportLink[] = [{ name: "PayPal", href: "https://paypal.me/marwan7egazy" }];

// Dar's accounts, all under the username "darislamtech".
const socials: Social[] = [
  { name: "YouTube", href: "https://www.youtube.com/@darislamtech" },
  { name: "Facebook", href: "https://www.facebook.com/darislamtech" },
  { name: "Instagram", href: "https://www.instagram.com/darislamtech/" },
  { name: "TikTok", href: "https://www.tiktok.com/@darislamtech" },
  { name: "GitHub", href: "https://github.com/darislamtech" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/darislamtech" },
  { name: "Telegram", href: "https://t.me/darislamtech" },
  { name: "X", href: "https://x.com/darislamtech" },
  { name: "Qabilah", href: "https://qabilah.com/profile/darislamtech/posts" },
];

// The founder's personal accounts, all under the username "marwan7egazy"; shown on the About and support pages.
const founderSocials: Social[] = [
  { name: "YouTube", href: "https://www.youtube.com/@marwan7egazy" },
  { name: "Facebook", href: "https://www.facebook.com/marwan7egazy" },
  { name: "Instagram", href: "https://www.instagram.com/marwan7egazy/" },
  { name: "TikTok", href: "https://www.tiktok.com/@marwan7egazy" },
  { name: "GitHub", href: "https://github.com/marwan7egazy" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/marwan7egazy" },
  { name: "Telegram", href: "https://t.me/marwan7egazy" },
  { name: "X", href: "https://x.com/marwan7egazy" },
  { name: "Qabilah", href: "https://qabilah.com/profile/marwan7egazy/posts" },
];

export const siteConfig = {
  /** Production origin: canonical URLs, sitemap, Open Graph and structured data. */
  url: "https://darislamtech.com",
  supportLinks,
  email: "darislamtech@gmail.com",
  socials,
  founderSocials,
  repository: "https://github.com/darislamtech/darislamtech",
  youtubeChannel: "https://www.youtube.com/@darislamtech",
  youtubeHandle: "@darislamtech",
} as const;
