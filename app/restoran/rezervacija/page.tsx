import type { Metadata } from "next";
import { hours } from "../_lib/data";
import { C, accent, mono } from "../_lib/theme";
import { PageHero } from "../_lib/ui";
import { ReservationForm } from "../_lib/widgets";

export const metadata: Metadata = { title: "Rezervacija stola" };

export default function Rezervacija() {
  return (
    <>
      <PageHero eyebrow="Rezervacija" title="Sto" accentText="čeka vas." text="Za grupe do 20 osoba rezervišite ovdje. Za veće proslave pogledajte catering." />
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          <ReservationForm />
          <aside className="grid content-start gap-4">
            <div className="rounded-[2rem] p-7" style={{ background: C.amber, color: C.bg }}>
              <p className="text-3xl leading-tight" style={accent}>
                Bašta uz rijeku otvorena je od maja do oktobra.
              </p>
            </div>
            <div className="rounded-[2rem] border p-7" style={{ borderColor: C.line }}>
              <p className="text-xs tracking-widest uppercase opacity-60" style={mono}>
                Radno vrijeme
              </p>
              <ul className="mt-4 grid gap-2 text-sm" style={mono}>
                {hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between gap-4">
                    <span className="opacity-60">{d}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm opacity-70">Sto držimo 15 minuta. Ako kasnite, javite se na +387 61 000 000.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
