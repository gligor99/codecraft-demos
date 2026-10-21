import type { Metadata } from "next";
import Link from "next/link";
import { timeline } from "../_lib/data";
import { B, C, accent, mono } from "../_lib/theme";
import { PageHero, Plate, Reveal } from "../_lib/ui";

export const metadata: Metadata = { title: "Naša priča" };

export default function ONama() {
  return (
    <>
      <PageHero eyebrow="Od 1974." title="Tri generacije," accentText="jedna vatra." text="Počelo je s četiri stola uz most. Danas ih je četrdeset, ali roštilj i recept su isti." />
      <section className="px-4 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ol className="relative border-l pl-8 sm:pl-12" style={{ borderColor: C.amber + "55" }}>
            {timeline.map(([year, text], i) => (
              <Reveal key={year} delay={i * 0.05}>
                <li className="relative pb-14">
                  <span className="absolute top-3 -left-[41px] size-4 rounded-full sm:-left-[57px]" style={{ background: C.amber, boxShadow: `0 0 0 6px ${C.bg}` }} />
                  <p className="text-7xl font-extrabold tracking-tighter sm:text-8xl" style={{ color: i === timeline.length - 1 ? C.amber : C.cream }}>
                    {year}
                  </p>
                  <p className="mt-2 max-w-xl text-2xl leading-snug" style={accent}>
                    {text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="overflow-hidden px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-square w-[min(460px,90%)]">
              <Plate hue={["#4a2a14", "#b7793a"]} seed={9} className="spin-slow size-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs tracking-widest uppercase opacity-60" style={mono}>
              Šef kuhinje
            </p>
            <p className="mt-4 text-5xl font-extrabold tracking-tight">Kemal Mostić</p>
            <p className="mt-6 text-2xl leading-snug opacity-90" style={accent}>
              “Sač ne možeš požuriti. Ako je teletina gotova za dva sata, nije dobra. Za tri jeste.”
            </p>
            <p className="mt-6 max-w-md opacity-70">Meso nabavljamo od dva farmera s Vlašića, povrće s pijace svako jutro, a lepinje pečemo sami od 6 sati.</p>
          </Reveal>
        </div>
      </section>
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ["Lokalno", "90% namirnica iz krajeva udaljenih do 100 km."],
            ["Ćumur", "Pravi drveni ugalj, nikad plin."],
            ["Bez zamrzivača", "Ćevapi se prave svako jutro."],
            ["Bez otpada", "Višak hrane ide u narodnu kuhinju."],
          ].map(([a, b], i) => (
            <Reveal key={a} delay={i * 0.05}>
              <div className="h-full rounded-[1.75rem] border p-6" style={{ borderColor: C.line, background: C.panel }}>
                <p className="text-2xl font-extrabold" style={{ color: C.amber }}>
                  {a}
                </p>
                <p className="mt-2 opacity-70">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href={`${B}/rezervacija`} className="inline-block rounded-full px-8 py-4 font-bold" style={{ background: C.amber, color: C.bg }}>
            Dođite na ručak
          </Link>
        </div>
      </section>
    </>
  );
}
