import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../_lib/data";
import { B, C, mono, serif } from "../_lib/theme";
import { Bag, PageHero, Reveal } from "../_lib/ui";

export const metadata: Metadata = { title: "O nama" };

export default function ONama() {
  return (
    <>
      <PageHero eyebrow="Od 2019." title="Dvoje ljudi," accent="jedna pržilica." text="Počeli smo u garaži sa pržilicom od 1 kg. Danas pržimo 300 kg mjesečno, i dalje ručno, i dalje utorkom." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["300 kg", "kafe mjesečno"],
            ["14", "farmi s kojima radimo direktno"],
            ["2.400+", "kupaca u BiH"],
          ].map(([a, b], i) => (
            <Reveal key={a} delay={i * 0.06}>
              <div className="rounded-[1.75rem] p-8" style={{ background: i === 1 ? C.green : C.card, color: i === 1 ? "#fff" : C.ink }}>
                <p className="text-6xl" style={serif}>
                  {a}
                </p>
                <p className="mt-1 opacity-70">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="flex items-end justify-center gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`w-24 sm:w-40 ${i === 1 ? "-translate-y-8" : ""}`}>
                <Bag p={products[i + 4]} className="w-full drop-shadow-2xl" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase" style={{ ...mono, color: C.muted }}>
              Direktna trgovina
            </p>
            <p className="mt-4 text-4xl leading-tight sm:text-5xl" style={serif}>
              Farmerima plaćamo <em style={{ color: C.orange }}>i do tri puta</em> više od berzanske cijene.
            </p>
            <p className="mt-5 max-w-md" style={{ color: C.muted }}>
              Kupujemo direktno ili preko malih uvoznika koje poznajemo. Za svaku kafu znamo farmu, visinu i ko ju je brao.
            </p>
            <Link href={`${B}/proizvodi`} className="mt-8 inline-block rounded-full px-7 py-4 font-bold text-white" style={{ background: C.green }}>
              Probajte razliku
            </Link>
          </div>
        </div>
      </section>
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] p-8 sm:p-14" style={{ background: C.ink, color: C.bg }}>
          <p className="text-5xl" style={serif}>
            Za kafiće i kancelarije
          </p>
          <p className="mt-4 max-w-lg opacity-70">Veleprodaja, oprema na korištenje i obuka baristi. Javite se za besplatnu probu.</p>
          <a href="mailto:hello@zrno.example" className="mt-8 inline-block rounded-full px-7 py-4 font-bold" style={{ background: C.orange, color: C.ink }}>
            hello@zrno.example
          </a>
        </div>
      </section>
    </>
  );
}
