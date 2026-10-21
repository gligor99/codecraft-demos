import Link from "next/link";
import { products } from "./_lib/data";
import { B, C, mono, serif } from "./_lib/theme";
import { Bag, Reveal, Tilt } from "./_lib/ui";
import { Catalog, Faq } from "./_lib/widgets";

const steps = [
  ["Utorak", "Pržimo malu seriju u 7 ujutro."],
  ["Utorak popodne", "Odmaramo zrno, pakujemo u kese s ventilom."],
  ["Srijeda", "Kurir preuzima pakete."],
  ["Četvrtak", "Kafa stara dva dana je na vašim vratima."],
];

export default function ShopHome() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-12 pb-20 sm:px-8 sm:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="rise">
            <p className="text-xs tracking-widest uppercase" style={{ ...mono, color: C.muted }}>
              Mala pržionica · specialty kafa
            </p>
            <h1 className="mt-5 text-6xl leading-[0.92] tracking-tight sm:text-8xl" style={serif}>
              Kafa pržena <em style={{ color: C.orange }}>ovog utorka,</em> na vašim vratima u četvrtak.
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${B}/proizvodi`} className="rounded-full px-7 py-4 font-bold text-white" style={{ background: C.green }}>
                Pogledaj kafe
              </Link>
              <Link href={`${B}/pretplata`} className="rounded-full border px-7 py-4 font-bold" style={{ borderColor: C.ink }}>
                Pretplata −15%
              </Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm" style={{ color: C.muted }}>
              <span style={{ color: C.orange }}>★★★★★</span> 4,8 od 920 recenzija
            </p>
          </div>
          <div className="rise relative grid place-items-center" style={{ animationDelay: "0.2s" }}>
            <div className="absolute size-[80%] rounded-full" style={{ background: C.orange, opacity: 0.12 }} aria-hidden />
            <Tilt>
              <Bag p={products[1]} className="relative w-[min(340px,70vw)] drop-shadow-[0_40px_40px_rgba(0,0,0,0.25)]" />
            </Tilt>
            <Link href={`${B}/proizvod/${products[1].slug}`} className="absolute top-8 right-4 rotate-6 rounded-full px-4 py-2 text-sm font-bold text-white sm:right-10" style={{ background: C.ink }}>
              Novo: Etiopija Guji →
            </Link>
          </div>
        </div>
      </section>

      {/* USP strip */}
      <section className="border-y px-4 py-6 sm:px-8" style={{ borderColor: C.line }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 text-sm font-semibold md:grid-cols-4">
          {["☕ Prženo prije max. 5 dana", "🚚 Besplatno iznad 60 KM", "↩ Ne sviđa vam se? Mijenjamo", "🌱 Direktna trgovina s farmerima"].map((x) => (
            <p key={x}>{x}</p>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-5xl sm:text-7xl" style={serif}>
              Najprodavanije
            </h2>
            <Link href={`${B}/proizvodi`} className="rounded-full border px-6 py-3 font-bold" style={{ borderColor: C.ink }}>
              Sve kafe ({products.length}) →
            </Link>
          </div>
          <div className="mt-6">
            <Catalog limit={6} />
          </div>
        </div>
      </section>

      {/* Fresh roast timeline */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] p-8 text-white sm:p-14" style={{ background: C.ink }}>
          <p className="max-w-2xl text-5xl leading-tight sm:text-6xl" style={serif}>
            Od prženja do šoljice za <em style={{ color: "#f0b48a" }}>48 sati.</em>
          </p>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {steps.map(([a, b], i) => (
              <Reveal key={a} delay={i * 0.08}>
                <li className="h-full border-t pt-5" style={{ borderColor: i === 3 ? C.orange : "#ffffff33" }}>
                  <p className="text-xs" style={{ ...mono, color: i === 3 ? C.orange : "#ffffff99" }}>
                    0{i + 1}
                  </p>
                  <p className="mt-2 text-2xl" style={serif}>
                    {a}
                  </p>
                  <p className="mt-1 text-sm opacity-70">{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Subscription teaser */}
      <section className="px-4 py-12 sm:px-8">
        <Link href={`${B}/pretplata`} className="group relative mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] p-8 text-white sm:p-14 lg:grid-cols-2" style={{ background: C.green }}>
          <div>
            <p className="text-xs tracking-widest uppercase opacity-70" style={mono}>
              Pretplata
            </p>
            <p className="mt-4 max-w-lg text-5xl leading-tight sm:text-6xl" style={serif}>
              Nikad više bez kafe. <em style={{ color: "#f0b48a" }}>15% jeftinije.</em>
            </p>
            <span className="mt-8 inline-block rounded-full px-7 py-4 font-bold transition group-hover:translate-x-1" style={{ background: C.bg, color: C.ink }}>
              Složi pretplatu →
            </span>
          </div>
          <div className="relative mt-10 flex items-end justify-center gap-3 lg:mt-0">
            {[3, 0, 5].map((i, k) => (
              <div key={i} className={`w-28 sm:w-36 ${k === 1 ? "-translate-y-6" : ""}`}>
                <Bag p={products[i]} className="w-full drop-shadow-2xl" />
              </div>
            ))}
          </div>
        </Link>
      </section>

      {/* Reviews */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-5xl sm:text-7xl" style={serif}>
            Šta kažu <em style={{ color: C.orange }}>kupci</em>
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Jasmin", "Etiopija Guji je promijenila kako pijem kafu. Bez šećera, bez mlijeka, i dalje slatka."],
              ["Amela", "Pretplata je najbolja odluka ove godine. Kafa stigne baš kad ponestane."],
              ["Kenan", "Imam kafić i uzimam Jutro za espresso. Gosti primijete razliku."],
            ].map(([n, t], i) => (
              <Reveal key={n} delay={i * 0.06}>
                <figure className="h-full rounded-[1.75rem] p-7" style={{ background: C.card }}>
                  <p style={{ color: C.orange }}>★★★★★</p>
                  <blockquote className="mt-3 text-2xl leading-snug" style={serif}>
                    “{t}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm" style={{ color: C.muted }}>
                    {n} · verifikovana kupovina
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-5xl sm:text-6xl" style={serif}>
            Pitanja
          </h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
