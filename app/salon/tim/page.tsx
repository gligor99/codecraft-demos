import type { Metadata } from "next";
import Link from "next/link";
import { team } from "../_lib/data";
import { BookCta, Flow, PageHero, Reveal } from "../_lib/ui";
import { B, C, serif } from "../_lib/theme";

export const metadata: Metadata = { title: "Tim" };

const values = [
  ["Konsultacija uvijek", "Prije makaza pričamo 5 minuta: šta želite, šta kosa može i kako ćete je održavati."],
  ["Bez žurbe", "Termini su dovoljno dugi da niko ne radi na dva klijenta odjednom."],
  ["Iskreno", "Ako nešto neće izgledati dobro na vama, reći ćemo, i predložiti bolje."],
];

export default function Tim() {
  return (
    <>
      <PageHero eyebrow="Ko smo" title="Mali tim," accent="velika pažnja." text="Četiri frizera, svako sa svojom specijalnošću. Izaberite onoga ko vam odgovara ili prepustite nama." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-x-6 gap-y-16 md:grid-cols-2">
          {team.map((t, i) => (
            <Reveal key={t.id} delay={(i % 2) * 0.1}>
              <article className={`grid items-end gap-6 sm:grid-cols-[1fr_1.1fr] ${i % 2 ? "md:mt-24" : ""}`}>
                <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
                  <Flow seed={i + 10} a={t.hue[0]} b={t.hue[1]} className="size-full" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase opacity-60">{t.years} godina iskustva</p>
                  <h2 className="mt-2 text-6xl italic" style={serif}>
                    {t.name}
                  </h2>
                  <p className="font-semibold" style={{ color: C.clay }}>
                    {t.role}
                  </p>
                  <p className="mt-4 opacity-75">{t.bio}</p>
                  <Link href={`${B}/zakazivanje`} className="mt-6 inline-block border-b pb-1 text-sm font-semibold" style={{ borderColor: C.ink }}>
                    Zakaži kod {t.name === "Tarik" ? "Tarika" : t.name === "Lana" ? "Lane" : t.name === "Amra" ? "Amre" : "Selme"} →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="px-4 py-24 sm:px-8" style={{ background: C.ink, color: C.bg }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-5xl tracking-tight sm:text-7xl" style={serif}>
            Kako <em style={{ color: C.blush }}>radimo</em>
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map(([a, b], i) => (
              <Reveal key={a} delay={i * 0.08}>
                <div className="h-full rounded-[2rem] border p-8" style={{ borderColor: C.bg + "26" }}>
                  <p className="text-5xl italic" style={{ ...serif, color: C.blush }}>
                    0{i + 1}
                  </p>
                  <p className="mt-6 text-2xl" style={serif}>
                    {a}
                  </p>
                  <p className="mt-3 opacity-70">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-5xl leading-tight sm:text-6xl" style={serif}>
              Tražimo <em style={{ color: C.clay }}>petog člana tima.</em>
            </p>
            <p className="mt-4 max-w-md opacity-75">Frizer/ka sa najmanje 3 godine iskustva. Plata, edukacije u inostranstvu i ljudi s kojima je lijepo raditi.</p>
            <Link href={`${B}/kontakt`} className="mt-8 inline-block rounded-full px-7 py-4 font-semibold text-white" style={{ background: C.ink }}>
              Pošalji prijavu
            </Link>
          </Reveal>
          <div className="aspect-[16/10] overflow-hidden rounded-[2rem]">
            <Flow seed={95} className="size-full" />
          </div>
        </div>
      </section>
      <BookCta />
    </>
  );
}
