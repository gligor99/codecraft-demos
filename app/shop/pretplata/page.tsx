import type { Metadata } from "next";
import { C, serif } from "../_lib/theme";
import { PageHero } from "../_lib/ui";
import { SubscriptionBuilder } from "../_lib/widgets";

export const metadata: Metadata = { title: "Pretplata" };

export default function Pretplata() {
  return (
    <>
      <PageHero eyebrow="15% jeftinije · besplatna dostava" title="Pretplata" accent="na kafu" text="Složite pretplatu za 30 sekundi. Pauzirajte, promijenite ili otkažite kad god želite." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SubscriptionBuilder />
        </div>
      </section>
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["Uvijek svježa", "Šaljemo odmah nakon prženja, nikad sa skladišta."],
            ["Bez obaveze", "Nema minimalnog trajanja. Pauza jednim klikom kad idete na more."],
            ["Ekskluzivno", "Pretplatnici prvi dobijaju sezonske i limitirane kafe."],
          ].map(([a, b]) => (
            <div key={a} className="rounded-[1.75rem] p-7" style={{ background: C.card }}>
              <p className="text-3xl" style={serif}>
                {a}
              </p>
              <p className="mt-2" style={{ color: C.muted }}>
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
