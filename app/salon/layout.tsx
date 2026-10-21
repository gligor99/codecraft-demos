import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SalonShell } from "./_lib/ui";

const display = Fraunces({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--f-display" });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--f-body" });

export const metadata: Metadata = {
  title: { default: "Studio Lana · Frizerski studio (demo)", template: "%s · Studio Lana (demo)" },
  description: "Demo sajt frizerskog salona sa online zakazivanjem. Napravio CodeCraft.",
};

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} grain`} style={{ fontFamily: "var(--f-body)" }}>
      <SalonShell>{children}</SalonShell>
    </div>
  );
}
