import type { Metadata } from "next";
import { C, mono } from "../_lib/theme";
import { MenuBrowser, PageHero } from "../_lib/ui";

export const metadata: Metadata = { title: "Meni i narudžba" };

export default function Meni() {
  return (
    <>
      <PageHero eyebrow="Online narudžba" title="Meni" accentText="i naruči." text="Dostava 3 KM, besplatna iznad 40 KM. Ili preuzmite sami, spremno za 20 minuta." />
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <MenuBrowser />
          <div className="mt-12 grid gap-3 text-sm sm:grid-cols-3" style={mono}>
            {[
              ["Alergeni", "Pitajte konobara ili napišite u napomeni."],
              ["Dostava", "Unutar 7 km, svaki dan do 22:30."],
              ["Plaćanje", "Gotovina ili kartica kuriru."],
            ].map(([a, b]) => (
              <div key={a} className="rounded-2xl border p-5" style={{ borderColor: C.line }}>
                <p style={{ color: C.amber }}>{a}</p>
                <p className="mt-1 opacity-70">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
