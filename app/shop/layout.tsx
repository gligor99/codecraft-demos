import type { Metadata } from "next";
import { DM_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import { ShopShell } from "./_lib/ui";

const body = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--f-body" });
const display = DM_Serif_Display({ subsets: ["latin", "latin-ext"], weight: "400", style: ["normal", "italic"], variable: "--f-display" });
const mono = DM_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--f-mono" });

export const metadata: Metadata = {
  title: { default: "Zrno · Pržionica kafe, online shop (demo)", template: "%s · Zrno (demo)" },
  description: "Demo web shop pržionice kafe sa katalogom, stranicama proizvoda, pretplatom, korpom i naplatom. Napravio CodeCraft.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${body.variable} ${display.variable} ${mono.variable}`} style={{ fontFamily: "var(--f-body)" }}>
      <ShopShell>{children}</ShopShell>
    </div>
  );
}
