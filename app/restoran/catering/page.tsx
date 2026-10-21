import type { Metadata } from "next";
import { packages } from "../_lib/data";
import { C, mono } from "../_lib/theme";
import { PageHero, Reveal } from "../_lib/ui";
import { CateringForm } from "../_lib/widgets";

export const metadata: Metadata = { title: "Catering i događaji" };

export default function Catering() {
  return (
    <>
      <PageHero eyebrow="Catering i događaji" title="Proslave" accentText="bez brige." text="Rođendani, sunneti, poslovni ručkovi ili hrana za cijelu kancelariju. Vi pozovete goste, mi palimo vatru." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div className="relative flex h-full flex-col rounded-[2rem] border p-8" style={p.hot ? { background: C.amber, color: C.bg, borderColor: C.amber } : { borderColor: C.line, background: C.panel }}>
                {p.hot && (
                  <span className="absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-bold" style={{ background: C.bg, color: C.amber }}>
                    Najtraženije
                  </span>
                )}
                <p className="text-xs tracking-widest uppercase opacity-70" style={mono}>
                  {p.people} osoba
                </p>
                <p className="mt-3 text-3xl font-extrabold tracking-tight">{p.name}</p>
                <p className="mt-4">
                  <span className="text-6xl font-extrabold tracking-tighter">{p.price}</span> <span className="font-bold">KM / osobi</span>
                </p>
                <ul className="mt-6 grid flex-1 gap-2">
                  {p.items.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span>✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-5xl font-extrabold tracking-tight">
              Pošaljite <span style={{ color: C.amber }}>upit</span>
            </p>
            <p className="mt-4 max-w-sm opacity-70">Izaberite paket i broj gostiju, a okvirnu cijenu vidite odmah. Konačnu ponudu šaljemo u toku dana.</p>
          </div>
          <CateringForm />
        </div>
      </section>
    </>
  );
}
