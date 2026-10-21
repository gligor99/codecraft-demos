import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, Instrument_Serif } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--f-display" });
const accent = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", style: ["italic"], variable: "--f-accent" });
const mono = DM_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--f-mono" });

export const metadata: Metadata = {
  title: "Konoba Most · Domaća kuhinja i dostava (demo)",
  description: "Demo sajt restorana sa online narudžbom i praćenjem dostave. Napravio CodeCraft.",
};

export default function RestoranLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${accent.variable} ${mono.variable} grain`} style={{ fontFamily: "var(--f-display)" }}>
      {children}
    </div>
  );
}
