import type { Product } from "./types";

// Every product is free and open source. Never mark a product "available" before it is actually launched.
export const products: Product[] = [];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
