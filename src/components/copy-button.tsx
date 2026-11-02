"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission); the address stays visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 text-sm font-medium text-ink-2 transition-colors hover:border-ink-2/40 hover:text-ink"
    >
      {copied ? <Check aria-hidden="true" className="size-4 text-primary" /> : <Copy aria-hidden="true" className="size-4" />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
