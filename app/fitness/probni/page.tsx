import type { Metadata } from "next";
import { C, display, mono } from "../_lib/theme";
import { PageHero, TrialForm } from "../_lib/ui";

export const metadata: Metadata = { title: "Besplatan probni dan" };

export default function Probni() {
  return (
    <>
      <PageHero eyebrow="Besplatno · bez obaveze" title="Probni dan" text="Dođi, isprobaj teretanu i jedan grupni trening po izboru. Trener ti pokaže sve, bez prodajnih priča." />
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          <TrialForm />
          <aside className="grid content-start gap-4">
            {[
              ["01", "Obilazak", "15 minuta s trenerom kroz teretanu i sprave."],
              ["02", "Trening", "Grupni trening po izboru ili slobodan rad."],
              ["03", "Plan", "Prijedlog plana za prve 4 sedmice, gratis."],
            ].map(([n, a, b]) => (
              <div key={n} className="rounded-[1.75rem] border p-6" style={{ borderColor: C.line, background: C.panel }}>
                <p className="text-xs" style={{ ...mono, color: C.lime }}>
                  {n}
                </p>
                <p className="mt-2 text-4xl uppercase" style={display}>
                  {a}
                </p>
                <p className="mt-1 text-sm" style={{ color: C.grey }}>
                  {b}
                </p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
