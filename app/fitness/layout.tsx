import type { Metadata } from "next";
import { Anton, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { FitnessShell } from "./_lib/ui";

const display = Anton({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--f-display" });
const body = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--f-body" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--f-mono" });

export const metadata: Metadata = {
  title: { default: "Pulse Gym · Teretana i grupni treninzi (demo)", template: "%s · Pulse Gym (demo)" },
  description: "Demo sajt teretane sa rasporedom treninga, rezervacijom mjesta i članarinama. Napravio CodeCraft.",
};

export default function FitnessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`} style={{ fontFamily: "var(--f-body)" }}>
      <FitnessShell>{children}</FitnessShell>
    </div>
  );
}
