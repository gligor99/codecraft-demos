import type { Metadata } from "next";
import { C, mono, serif } from "../_lib/theme";
import { PageHero } from "../_lib/ui";
import { Faq } from "../_lib/widgets";

export const metadata: Metadata = { title: "Dostava i FAQ" };

export default function Dostava() {
  return (
    <>
      <PageHero eyebrow="Dostava · plaćanje · povrat" title="Sve što" accent="trebate znati." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["Dostava", "7 KM za cijelu BiH, besplatna iznad 60 KM. Brza pošta, 1–2 radna dana. Broj za praćenje stiže na email."],
            ["Plaćanje", "Kartica (sigurna forma banke), pouzećem ili uplatom na račun. Za firme izdajemo račun."],
            ["Povrat", "Ne sviđa vam se kafa? U roku 14 dana šaljemo drugu ili vraćamo novac, bez pitanja."],
          ].map(([a, b], i) => (
            <div key={a} className="rounded-[1.75rem] p-7" style={{ background: i === 0 ? C.green : C.card, color: i === 0 ? "#fff" : C.ink }}>
              <p className="text-xs uppercase opacity-60" style={mono}>
                0{i + 1}
              </p>
              <p className="mt-3 text-3xl" style={serif}>
                {a}
              </p>
              <p className="mt-2 opacity-80">{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-5xl sm:text-6xl" style={serif}>
            Česta pitanja
          </h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
