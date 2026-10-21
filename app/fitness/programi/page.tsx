import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "../_lib/data";
import { CoachArt } from "../_lib/art";
import { B, C, display, mono } from "../_lib/theme";
import { Bars, PageHero, Reveal } from "../_lib/ui";

export const metadata: Metadata = { title: "Programi" };

export default function Programi() {
  return (
    <>
      <PageHero eyebrow="6 programa · 40+ termina" title="Programi" text="Od mirnog pilatesa do HIIT-a nakon kojeg ne možeš do auta. Svaki program ima oznaku intenziteta." />
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4">
          {programs.map((p, i) => (
            <Reveal key={p.id}>
              <article id={p.id} className="grid scroll-mt-24 overflow-hidden rounded-[2rem] border md:grid-cols-[1fr_1.4fr]" style={{ borderColor: C.line, background: C.panel }}>
                <div className="relative min-h-56">
                  <CoachArt i={i + 2} className="absolute inset-0" />
                  <p className="absolute bottom-4 left-5 text-8xl leading-none uppercase" style={{ ...display, color: C.lime }}>
                    0{i + 1}
                  </p>
                </div>
                <div className="p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-4 text-xs uppercase" style={{ ...mono, color: C.grey }}>
                    <Bars level={p.level} />
                    <span>{p.min} min</span>
                    <span>~{p.kcal} kcal</span>
                  </div>
                  <h2 className="mt-4 text-6xl uppercase sm:text-7xl" style={display}>
                    {p.name}
                  </h2>
                  <p className="mt-1 font-semibold" style={{ color: C.lime }}>
                    {p.for}
                  </p>
                  <p className="mt-4 max-w-lg text-lg" style={{ color: C.grey }}>
                    {p.desc}
                  </p>
                  <Link href={`${B}/raspored`} className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-bold uppercase" style={{ background: C.white, color: C.bg }}>
                    Termini →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
