import type { ProductStatus } from "@/content/types";

export const productStatusOrder: ProductStatus[] = ["available", "inDevelopment", "comingSoon", "idea"];

type StatusStyle = { dot: string; tone: "mint" | "gold" | "blue" | "muted"; icon: "mint" | "gold" | "blue" | "neutral" };

/**
 * One color per status, shared by every product card, badge and legend; the product's icon takes its status color too
 * (owner's decision).
 */
export const productStatusStyles: Record<ProductStatus, StatusStyle> = {
  available: { dot: "bg-tone-mint", tone: "mint", icon: "mint" },
  inDevelopment: { dot: "bg-tone-gold", tone: "gold", icon: "gold" },
  comingSoon: { dot: "bg-tone-blue", tone: "blue", icon: "blue" },
  idea: { dot: "bg-sand-400", tone: "muted", icon: "neutral" },
};
