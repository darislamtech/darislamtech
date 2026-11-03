// Brand icons (not shipped by lucide). Same 24px stroke style as lucide so they sit together.
type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </Svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </Svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </Svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V3c.5 2.5 2.5 4.5 5 5" />
    </Svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M21.5 4.5 2.8 11.6a.6.6 0 0 0 0 1.1l4.7 1.7 1.8 5.4a.6.6 0 0 0 1 .3l2.7-2.5 4.7 3.5a.7.7 0 0 0 1.1-.4l3.4-14.4a.6.6 0 0 0-.7-.8z" />
      <path d="m7.5 14.4 9.9-6.9-7.2 8.6" />
    </Svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 4l11.7 16H20L8.3 4z" />
      <path d="M4 20l6.8-6.8m2.4-2.4L20 4" />
    </Svg>
  );
}

/** Qabilah («قبيلة», "tribe") has no brand mark we can reuse; a tent stands in for it. */
export function QabilahIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3.5 21 14 3" />
      <path d="M20.5 21 10 3" />
      <path d="M15.5 21 12 15l-3.5 6" />
      <path d="M2 21h20" />
    </Svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </Svg>
  );
}

export const socialIcons = {
  YouTube: YouTubeIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Telegram: TelegramIcon,
  X: XIcon,
  Qabilah: QabilahIcon,
  WhatsApp: WhatsAppIcon,
} as const;

export type SocialName = keyof typeof socialIcons;
