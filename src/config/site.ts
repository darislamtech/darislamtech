// Only accounts that actually exist are listed here. Add the rest (GitHub, ...) once they are live.

/** A way to support the project financially, shown on the support page. Add one only once its account is live. */
export type SupportLink = { name: "Ko-fi" | "PayPal"; href: string };

const supportLinks: SupportLink[] = [];

export const siteConfig = {
  supportLinks,
  email: "darislamtech@gmail.com",
  socials: [
    { name: "YouTube", href: "https://www.youtube.com/@darislamtech" },
    { name: "Facebook", href: "https://www.facebook.com/darislamtech" },
    { name: "Instagram", href: "https://www.instagram.com/darislamtech/" },
    { name: "TikTok", href: "https://www.tiktok.com/@darislamtech" },
  ],
  youtubeChannel: "https://www.youtube.com/@darislamtech",
  youtubeHandle: "@darislamtech",
} as const;
