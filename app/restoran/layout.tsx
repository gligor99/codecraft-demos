import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, Instrument_Serif } from "next/font/google";
import { RestoranShell } from "./_lib/ui";

const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--f-display" });
const accent = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", style: ["italic"], variable: "--f-accent" });
const mono = DM_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--f-mono" });

export const metadata: Metadata = {
  title: { default: "Konoba Most · Domaća kuhinja i dostava (demo)", template: "%s · Konoba Most (demo)" },
  description: "Demo sajt restorana sa online narudžbom, rezervacijom stola i cateringom. Napravio CodeCraft.",
};

export default function RestoranLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${accent.variable} ${mono.variable} grain`} style={{ fontFamily: "var(--f-display)" }}>
      <RestoranShell>{children}</RestoranShell>
    </div>
  );
}
