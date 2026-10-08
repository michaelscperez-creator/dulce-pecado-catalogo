"use client";

import { useCart } from "@/components/Cart";

export default function SheetButton({ kind, className, children }: { kind: "contact" | "quote"; className?: string; children: React.ReactNode }) {
  const { openSheet } = useCart();
  return (
    <button type="button" className={className} onClick={() => openSheet(kind)}>
      {children}
    </button>
  );
}
