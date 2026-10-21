import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeCraft demo sajtovi",
  description: "Primjeri sajtova koje CodeCraft pravi za male biznise: salon, restoran, teretana i web shop.",
  robots: { index: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bs" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
