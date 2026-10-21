import type { Metadata } from "next";
import Booking from "../_lib/booking";
import { PageHero } from "../_lib/ui";
import { C } from "../_lib/theme";

export const metadata: Metadata = { title: "Zakazivanje" };

export default function Zakazivanje() {
  return (
    <>
      <PageHero eyebrow="Online termin" title="Zakažite" accent="za minut." text="Bez poziva i čekanja. Potvrda odmah, podsjetnik SMS-om dan ranije." />
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(42,29,23,0.35)]" style={{ background: C.bg }}>
          <Booking />
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl gap-4 text-sm sm:grid-cols-3">
          {[
            ["Otkazivanje", "Besplatno do 24 h prije termina."],
            ["Kašnjenje", "Čekamo 15 minuta, zatim termin skraćujemo."],
            ["Plaćanje", "Gotovina ili kartica u studiju."],
          ].map(([a, b]) => (
            <div key={a} className="rounded-2xl border p-5" style={{ borderColor: C.ink + "1a" }}>
              <p className="font-semibold">{a}</p>
              <p className="mt-1 opacity-70">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
