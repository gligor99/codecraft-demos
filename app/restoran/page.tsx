import Link from "next/link";
import { menu } from "./_lib/data";
import { B, C, accent, km, mono } from "./_lib/theme";
import { Plate, Reveal } from "./_lib/ui";
import { Faq, Reviews } from "./_lib/widgets";
import { HomeDishes } from "./_lib/home";

export default function RestoranHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-8 sm:pt-36">
        <div className="pointer-events-none absolute top-10 -right-40 size-[700px] rounded-full blur-3xl" style={{ background: `radial-gradient(closest-side, ${C.ember}55, transparent)` }} aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="rise">
            <p className="flex items-center gap-2 text-xs tracking-widest uppercase" style={mono}>
              <span className="size-2 rounded-full bg-green-400" /> Dostava danas do 22:30
            </p>
            <h1 className="mt-6 text-[17vw] leading-[0.82] font-extrabold tracking-[-0.05em] uppercase sm:text-[13vw] lg:text-[9.5rem]">
              Vatra,
              <br />
              <span style={{ ...accent, color: C.amber, textTransform: "none", fontWeight: 400 }}>sač</span> i<br />
              strpljenje.
            </h1>
            <p className="mt-8 max-w-md text-lg opacity-75">Domaća kuhinja kakvu pamtite. Naručite za 30 sekundi, mi palimo roštilj.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${B}/meni`} className="rounded-full px-7 py-4 font-bold" style={{ background: C.amber, color: C.bg }}>
                Naruči online
              </Link>
              <Link href={`${B}/rezervacija`} className="rounded-full border px-7 py-4 font-bold" style={{ borderColor: C.line }}>
                Rezerviši sto
              </Link>
            </div>
          </div>
          <div className="rise relative mx-auto aspect-square w-[min(520px,90%)]" style={{ animationDelay: "0.2s" }}>
            <Plate hue={["#8a3b1d", "#e8a93c"]} seed={3} className="spin-slow size-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
            <div className="absolute -bottom-2 left-0 rounded-2xl px-4 py-3 shadow-2xl" style={{ background: C.cream, color: C.bg }}>
              <p className="text-xs opacity-60" style={mono}>
                Ćevapi 10/1
              </p>
              <p className="text-lg font-bold">{km(12)}</p>
            </div>
            <div className="absolute top-6 right-0 rounded-full px-4 py-2 text-sm font-bold" style={{ background: C.ember }}>
              🔥 Sa ćumura
            </div>
          </div>
        </div>
      </section>

      {/* How ordering works */}
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["01", "Izaberite", "Meni s cijenama i fotografijama, filter za vegetarijance."],
            ["02", "Naručite", "Dostava ili preuzimanje, plaćanje pri preuzimanju."],
            ["03", "Pratite", "Status narudžbe uživo, od roštilja do vrata."],
          ].map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.06}>
              <div className="h-full rounded-[2rem] border p-7" style={{ borderColor: C.line }}>
                <p className="text-sm" style={{ ...mono, color: C.amber }}>
                  {n}
                </p>
                <p className="mt-6 text-4xl font-extrabold tracking-tight">{t}</p>
                <p className="mt-2 opacity-70">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[12vw] font-extrabold tracking-tight sm:text-8xl">
              Najtraženije<span style={{ color: C.amber }}>.</span>
            </h2>
            <Link href={`${B}/meni`} className="rounded-full border px-6 py-3 font-bold" style={{ borderColor: C.line }}>
              Cijeli meni ({menu.length}) →
            </Link>
          </div>
          <HomeDishes ids={["d1", "d4", "d6"]} />
        </div>
      </section>

      {/* Story band */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["3h", "toliko se peče teletina ispod sača"],
            ["1974.", "otkad se pali ista vatra"],
            ["25 min", "prosječna dostava u gradu"],
          ].map(([big, small], i) => (
            <Reveal key={big} delay={i * 0.08}>
              <div className="rounded-[2rem] border p-8" style={{ borderColor: C.line, background: i === 1 ? C.amber : C.panel, color: i === 1 ? C.bg : C.cream }}>
                <p className="text-7xl font-extrabold tracking-tighter">{big}</p>
                <p className="mt-3 text-xl" style={accent}>
                  {small}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-6 max-w-7xl text-center">
          <Link href={`${B}/o-nama`} className="inline-block border-b pb-1 font-bold" style={{ borderColor: C.amber, color: C.amber }}>
            Pročitajte našu priču →
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-8">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            Šta kažu <span style={{ ...accent, color: C.amber, fontWeight: 400 }}>gosti</span>
          </h2>
          <p className="mt-3 opacity-60" style={mono}>
            4,8 / 5 · preko 1.200 recenzija
          </p>
        </div>
        <Reviews />
      </section>

      {/* Catering teaser */}
      <section className="px-4 py-20 sm:px-8">
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[2.5rem] p-8 sm:p-14 lg:grid-cols-2" style={{ background: C.amber, color: C.bg }}>
          <div>
            <p className="text-xs tracking-widest uppercase opacity-70" style={mono}>
              Catering i proslave
            </p>
            <p className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl">Bašta za 60 gostiju ili ručak za cijelu firmu.</p>
            <Link href={`${B}/catering`} className="mt-8 inline-block rounded-full px-7 py-4 font-bold" style={{ background: C.bg, color: C.amber }}>
              Pogledaj pakete
            </Link>
          </div>
          <div className="relative grid grid-cols-3 gap-3">
            {["d3", "d5", "d12", "d7", "d9", "d2"].map((id, i) => (
              <Plate key={id} hue={menu.find((m) => m.id === id)!.hue} seed={i + 40} className={`w-full drop-shadow-xl ${i % 2 ? "translate-y-6" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Pitanja<span style={{ color: C.amber }}>?</span>
          </h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
