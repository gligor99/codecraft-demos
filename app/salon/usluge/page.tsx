import type { Metadata } from "next";
import Link from "next/link";
import { cats, services } from "../_lib/data";
import { BookCta, Flow, PageHero, Reveal } from "../_lib/ui";
import { B, C, palettes, serif } from "../_lib/theme";

export const metadata: Metadata = { title: "Usluge i cijene" };

export default function Usluge() {
  return (
    <>
      <PageHero eyebrow="Cjenovnik 2026" title="Usluge" accent="& cijene" text="Cijene su konačne i uključuju pranje, njegu i styling. Kliknite uslugu i odmah birate termin." />
      <div className="sticky top-[76px] z-30 px-4 sm:px-8">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3">
          {cats.map((c) => (
            <a key={c} href={`#${c}`} className="shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold backdrop-blur" style={{ borderColor: C.ink + "26", background: C.bg + "cc" }}>
              {c}
            </a>
          ))}
        </div>
      </div>
      <section className="px-4 pb-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {cats.map((cat, ci) => (
            <div key={cat} id={cat} className="grid scroll-mt-40 gap-8 border-t py-16 lg:grid-cols-[380px_1fr] lg:gap-16" style={{ borderColor: C.ink + "1a" }}>
              <Reveal>
                <div className="aspect-[4/3] overflow-hidden rounded-t-[999px] rounded-b-[2rem] lg:aspect-[3/4]">
                  <Flow seed={ci + 80} a={palettes[ci][0]} b={palettes[ci][1]} className="size-full" />
                </div>
                <h2 className="mt-6 text-5xl italic" style={serif}>
                  {cat}
                </h2>
              </Reveal>
              <ul>
                {services
                  .filter((s) => s.cat === cat)
                  .map((s, i) => (
                    <Reveal key={s.id} delay={i * 0.05}>
                      <li className="group border-b py-6" style={{ borderColor: C.ink + "1a" }}>
                        <div className="flex items-baseline gap-3">
                          <h3 className="text-2xl font-semibold tracking-tight">{s.name}</h3>
                          <span className="flex-1 translate-y-[-4px] border-b border-dotted" style={{ borderColor: C.ink + "33" }} />
                          <span className="text-3xl whitespace-nowrap" style={serif}>
                            {s.price} KM
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                          <p className="max-w-lg opacity-70">
                            {s.desc} <span className="opacity-60">· {s.min} min</span>
                          </p>
                          <Link href={`${B}/zakazivanje?usluga=${s.id}`} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition group-hover:-translate-y-0.5" style={{ background: C.ink }}>
                            Zakaži
                          </Link>
                        </div>
                      </li>
                    </Reveal>
                  ))}
              </ul>
            </div>
          ))}
          <p className="mt-4 text-sm opacity-60">Za vrlo dugu ili gustu kosu cijena boje može biti veća do 20%. Uvijek kažemo prije početka.</p>
        </div>
      </section>
      <BookCta />
    </>
  );
}
