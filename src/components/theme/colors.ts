// Shared theme constants. Kept out of the "use client" files so Server Components (the layout's viewport)
// can read them as plain values.
export const THEME_STORAGE_KEY = "theme";
export const THEME_COLORS = { light: "#f7f7f8", dark: "#17382f" } as const;
