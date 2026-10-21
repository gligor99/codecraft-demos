import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

const display = Fraunces({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--f-display" });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--f-body" });

export const metadata: Metadata = {
  title: "Studio Lana · Frizerski studio (demo)",
  description: "Demo sajt frizerskog salona sa online zakazivanjem. Napravio CodeCraft.",
};

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} grain`} style={{ fontFamily: "var(--f-body)" }}>
      {children}
    </div>
  );
}
