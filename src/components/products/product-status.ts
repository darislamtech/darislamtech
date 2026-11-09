import type { ProductStatus } from "@/content/types";

export const productStatusOrder: ProductStatus[] = ["available", "inDevelopment", "comingSoon", "idea"];

/** One color per status, shared by every product card, badge and legend. */
export const productStatusStyles: Record<ProductStatus, { dot: string; tone: "mint" | "gold" | "blue" | "muted" }> = {
  available: { dot: "bg-tone-mint", tone: "mint" },
  inDevelopment: { dot: "bg-tone-gold", tone: "gold" },
  comingSoon: { dot: "bg-tone-blue", tone: "blue" },
  idea: { dot: "bg-sand-400", tone: "muted" },
};
