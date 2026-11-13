import { siteConfig } from "@/config/site";

/** A link that opens an email to Dar with the subject filled in, tagged so the inbox can sort it. */
export const mailtoDar = (subject: string) => `mailto:${siteConfig.email}?subject=${encodeURIComponent(`[Dar] ${subject}`)}`;
