import type { Metadata } from "next";
import { C, mono } from "../_lib/theme";
import { PageHero, Schedule } from "../_lib/ui";

export const metadata: Metadata = { title: "Raspored treninga" };

export default function Raspored() {
  return (
    <>
      <PageHero eyebrow="Rezervacije 7 dana unaprijed" title="Raspored" text="Izaberi dan i program. Mjesto je tvoje jednim klikom, otkazivanje do 2 sata prije bez penala." />
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Schedule />
          <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase" style={{ ...mono, color: C.grey }}>
            <span>▮ Lagano · za početnike</span>
            <span>▮▮ Srednje</span>
            <span>▮▮▮ Jako · iskusni</span>
          </div>
        </div>
      </section>
    </>
  );
}
