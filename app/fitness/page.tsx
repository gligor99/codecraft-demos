import Link from "next/link";
import { coaches, programs } from "./_lib/data";
import { CoachArt } from "./_lib/art";
import { HomeHero, Quiz } from "./_lib/home";
import { B, C, display, mono } from "./_lib/theme";
import { Bars, Faq, Plans, Reveal, Schedule, Ticker } from "./_lib/ui";

export default function FitnessHome() {
  return (
    <>
      <HomeHero />
      <Ticker />

      {/* Numbers */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["1.200", "m² prostora"],
            ["40+", "treninga sedmično"],
            ["12", "trenera"],
            ["06–23h", "svaki radni dan"],
          ].map(([a, b], i) => (
            <Reveal key={a} delay={i * 0.05}>
              <div className="rounded-[1.75rem] border p-6" style={{ borderColor: C.line, background: i === 0 ? C.lime : C.panel, color: i === 0 ? C.bg : C.white }}>
                <p className="text-6xl sm:text-7xl" style={display}>
                  {a}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase opacity-70">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-7xl uppercase sm:text-9xl" style={display}>
              Programi
            </h2>
            <Link href={`${B}/programi`} className="rounded-full border px-6 py-3 font-bold uppercase" style={{ borderColor: C.line }}>
              Svi programi →
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.05}>
                <Link href={`${B}/programi#${p.id}`} className="group flex h-full flex-col justify-between rounded-[1.75rem] border p-6 transition hover:border-[#c6ff3d]" style={{ borderColor: C.line, background: C.panel }}>
                  <div className="flex items-center justify-between">
                    <Bars level={p.level} />
                    <span className="text-xs" style={{ ...mono, color: C.grey }}>
                      {p.min} min · ~{p.kcal} kcal
                    </span>
                  </div>
                  <p className="mt-10 text-5xl uppercase transition group-hover:text-[#c6ff3d]" style={display}>
                    {p.name}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: C.grey }}>
                    {p.for}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-6xl uppercase sm:text-8xl" style={display}>
            Ne znaš <span style={{ color: C.lime }}>odakle?</span>
          </h2>
          <Quiz />
        </div>
      </section>

      {/* Schedule */}
      <section className="px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-7xl uppercase sm:text-9xl" style={display}>
              Danas
            </h2>
            <Link href={`${B}/raspored`} className="rounded-full border px-6 py-3 font-bold uppercase" style={{ borderColor: C.line }}>
              Cijeli raspored →
            </Link>
          </div>
          <Schedule compact />
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-7xl uppercase sm:text-9xl" style={display}>
            Članarine
          </h2>
          <Plans />
        </div>
      </section>

      {/* Coaches */}
      <section className="px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-7xl uppercase sm:text-9xl" style={display}>
              Treneri
            </h2>
            <Link href={`${B}/treneri`} className="rounded-full border px-6 py-3 font-bold uppercase" style={{ borderColor: C.line }}>
              Upoznaj ih →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {coaches.map((c, i) => (
              <Link key={c.name} href={`${B}/treneri`} className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
                <CoachArt i={i} className="absolute inset-0 transition duration-700 group-hover:scale-110" />
                <span className="absolute top-4 right-4 text-xs" style={{ ...mono, color: C.lime }}>
                  {c.years} god.
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-5xl uppercase" style={display}>
                    {c.name}
                  </p>
                  <p className="text-sm" style={{ color: C.grey }}>
                    {c.tag}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 className="text-6xl uppercase sm:text-8xl" style={display}>
            Pitanja<span style={{ color: C.lime }}>?</span>
          </h2>
          <Faq />
        </div>
      </section>
      <section className="px-4 pb-24 sm:px-8">
        <Link href={`${B}/probni`} className="mx-auto block max-w-7xl rounded-[2.5rem] p-10 sm:p-16" style={{ background: C.lime, color: C.bg }}>
          <p className="text-[15vw] leading-[0.85] uppercase sm:text-[9rem]" style={display}>
            Prvi dan je besplatan →
          </p>
        </Link>
      </section>
    </>
  );
}
