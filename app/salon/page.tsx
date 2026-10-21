import Link from "next/link";
import { services, team } from "./_lib/data";
import { BookCta, Flow, Reveal } from "./_lib/ui";
import { B, C, palettes, serif } from "./_lib/theme";
import { BeforeAfter, Faq, GiftCard, Testimonials } from "./_lib/widgets";

const featured = [
  { id: "s5", seed: 0 },
  { id: "s1", seed: 6 },
  { id: "s7", seed: 2 },
];

export default function SalonHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <h1 className="rise text-[27vw] leading-[0.8] tracking-[-0.06em] italic sm:text-[22vw] lg:text-[17rem]" style={serif}>
            Lana<span style={{ color: C.clay }}>.</span>
          </h1>
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="rise max-w-md" style={{ animationDelay: "0.15s" }}>
              <p className="text-xl leading-snug sm:text-2xl">
                Frizerski studio za one koji žele izgledati <em style={serif}>kao najbolja verzija sebe</em>, bez pretjerivanja.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href={`${B}/zakazivanje`} className="rounded-full px-7 py-4 font-semibold text-white" style={{ background: C.clay }}>
                  Zakaži online
                </Link>
                <span className="flex items-center gap-2 text-sm">
                  <span style={{ color: C.clay }}>★★★★★</span>
                  <span className="opacity-70">4,9 · 380 recenzija</span>
                </span>
              </div>
            </div>
            <div className="rise grid grid-cols-3 items-end gap-3" style={{ animationDelay: "0.3s" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={`overflow-hidden rounded-t-[999px] rounded-b-3xl ${i === 1 ? "aspect-[3/4.6]" : "aspect-[3/4]"}`}>
                  <Flow seed={i} a={[C.blush, "#f1d9c9", C.sage][i]} b={[C.clay, "#c98a6d", "#5e6b52"][i]} className="size-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y py-5" style={{ borderColor: C.ink + "1a" }}>
        <div className="marquee flex w-max gap-10 text-3xl italic sm:text-4xl" style={serif}>
          {Array.from({ length: 2 }, (_, k) =>
            ["Balayage", "Šišanje", "Keratin", "Toniranje", "Feniranje", "Svečane frizure", "Olaplex"].map((w) => (
              <span key={w + k} className="flex items-center gap-10">
                {w} <span style={{ color: C.clay }}>✺</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* Intro + stats */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-60">O studiju</p>
            <p className="mt-5 text-4xl leading-[1.1] sm:text-5xl" style={serif}>
              Od 2015. radimo jednu stvar: kosu koju <em style={{ color: C.clay }}>volite i sedmicu poslije</em>, a ne samo na izlasku iz salona.
            </p>
            <Link href={`${B}/tim`} className="mt-8 inline-block border-b pb-1 font-semibold" style={{ borderColor: C.ink }}>
              Upoznajte tim →
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["11", "godina u centru grada"],
              ["4", "frizera, svako sa svojom specijalnošću"],
              ["12k+", "zadovoljnih klijenata"],
              ["0", "poziva potrebno za termin"],
            ].map(([a, b], i) => (
              <Reveal key={a} delay={i * 0.06}>
                <div className="h-full rounded-[1.75rem] p-6" style={{ background: i === 0 ? C.clay : C.paper, color: i === 0 ? "#fff" : C.ink }}>
                  <p className="text-6xl" style={serif}>
                    {a}
                  </p>
                  <p className="mt-2 text-sm opacity-80">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-5xl tracking-tight sm:text-7xl" style={serif}>
              Najtraženije <em style={{ color: C.clay }}>usluge</em>
            </h2>
            <Link href={`${B}/usluge`} className="rounded-full border px-6 py-3 font-semibold" style={{ borderColor: C.ink + "33" }}>
              Cijeli cjenovnik
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((f, i) => {
              const s = services.find((x) => x.id === f.id)!;
              return (
                <Reveal key={s.id} delay={i * 0.08}>
                  <Link href={`${B}/zakazivanje?usluga=${s.id}`} className="group block">
                    <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
                      <Flow seed={f.seed} a={palettes[i][0]} b={palettes[i][1]} className="size-full transition duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <p className="text-3xl italic" style={serif}>
                        {s.name}
                      </p>
                      <p className="text-xl whitespace-nowrap" style={serif}>
                        {s.price} KM
                      </p>
                    </div>
                    <p className="mt-1 opacity-70">{s.desc}</p>
                    <p className="mt-3 text-sm font-semibold opacity-0 transition group-hover:opacity-100" style={{ color: C.clay }}>
                      Zakaži ovu uslugu →
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-60">Prije / poslije</p>
            <p className="mt-5 text-5xl leading-[1.05] sm:text-6xl" style={serif}>
              Povucite <em style={{ color: C.clay }}>liniju.</em>
            </p>
            <p className="mt-4 max-w-sm opacity-75">Balayage koji ne izgleda kao balayage, nego kao da ste se vratili s mora.</p>
            <Link href={`${B}/galerija`} className="mt-8 inline-block border-b pb-1 font-semibold" style={{ borderColor: C.ink }}>
              Više u galeriji →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfter />
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24 sm:px-8" style={{ background: C.sand }}>
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-60">Recenzije · 4,9 / 5 na Googleu</p>
          <div className="mt-8">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-5xl tracking-tight sm:text-7xl" style={serif}>
              Ruke koje <em style={{ color: C.clay }}>znaju.</em>
            </h2>
            <Link href={`${B}/tim`} className="rounded-full border px-6 py-3 font-semibold" style={{ borderColor: C.ink + "33" }}>
              Cijeli tim
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {team.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <div className="group">
                  <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.75rem]">
                    <Flow seed={i + 10} a={t.hue[0]} b={t.hue[1]} className="size-full transition duration-1000 group-hover:scale-105" />
                  </div>
                  <p className="mt-4 text-3xl italic" style={serif}>
                    {t.name}
                  </p>
                  <p className="text-sm opacity-60">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gift card */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <GiftCard />
        </div>
      </section>

      {/* Instagram */}
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <p className="text-4xl italic sm:text-5xl" style={serif}>
              @studio.lana
            </p>
            <span className="text-sm opacity-60">Instagram</span>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl">
                <Flow seed={i + 70} a={palettes[(i + 2) % palettes.length][0]} b={palettes[(i + 2) % palettes.length][1]} className="size-full transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100" style={{ background: C.ink + "55" }}>
                  ♥ {120 + i * 37}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-5xl tracking-tight sm:text-6xl" style={serif}>
            Česta <em style={{ color: C.clay }}>pitanja</em>
          </h2>
          <Faq />
        </div>
      </section>

      <BookCta />
    </>
  );
}
