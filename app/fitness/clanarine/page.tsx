import type { Metadata } from "next";
import { C, display } from "../_lib/theme";
import { CompareTable, Faq, PageHero, Plans } from "../_lib/ui";

export const metadata: Metadata = { title: "Članarine" };

export default function Clanarine() {
  return (
    <>
      <PageHero eyebrow="Bez ugovora · otkaži kad hoćeš" title="Članarine" text="Tri paketa, bez skrivenih troškova i bez upisnine. Godišnja članarina je 20% jeftinija." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Plans />
        </div>
      </section>
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-6xl uppercase sm:text-8xl" style={display}>
            Uporedi
          </h2>
          <CompareTable />
          <p className="mt-4 text-sm" style={{ color: C.grey }}>
            Studenti i penzioneri: 20% popusta na Osnovni i Pulse uz važeću iskaznicu.
          </p>
        </div>
      </section>
      <section className="px-4 py-16 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 className="text-6xl uppercase sm:text-8xl" style={display}>
            Pitanja<span style={{ color: C.lime }}>?</span>
          </h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
