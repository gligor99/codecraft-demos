import type { Metadata } from "next";
import Link from "next/link";
import { coaches } from "../_lib/data";
import { CoachArt } from "../_lib/art";
import { B, C, display, mono } from "../_lib/theme";
import { PageHero, Reveal } from "../_lib/ui";

export const metadata: Metadata = { title: "Treneri" };

export default function Treneri() {
  return (
    <>
      <PageHero eyebrow="Licencirani treneri" title="Treneri" text="Svako ima svoju specijalnost. Personalni trening dogovaraš direktno s njima." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          {coaches.map((c, i) => (
            <Reveal key={c.name} delay={(i % 2) * 0.08}>
              <article className="grid h-full overflow-hidden rounded-[2rem] border sm:grid-cols-[0.9fr_1fr]" style={{ borderColor: C.line, background: C.panel }}>
                <div className="relative aspect-[4/3] sm:aspect-auto">
                  <CoachArt i={i} className="absolute inset-0" />
                </div>
                <div className="p-7">
                  <p className="text-xs uppercase" style={{ ...mono, color: C.lime }}>
                    {c.years} godina iskustva
                  </p>
                  <h2 className="mt-2 text-7xl uppercase" style={display}>
                    {c.name}
                  </h2>
                  <p className="font-semibold">{c.tag}</p>
                  <p className="mt-3" style={{ color: C.grey }}>
                    {c.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.certs.map((x) => (
                      <span key={x} className="rounded-full border px-3 py-1 text-xs" style={{ ...mono, borderColor: C.line }}>
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="px-4 py-16 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2.5rem] border p-8 sm:p-14 lg:grid-cols-[1.4fr_1fr]" style={{ borderColor: C.line }}>
          <div>
            <p className="text-6xl uppercase sm:text-7xl" style={display}>
              Personalni <span style={{ color: C.lime }}>trening</span>
            </p>
            <p className="mt-4 max-w-md" style={{ color: C.grey }}>
              Plan napravljen za tebe, praćenje napretka i trener koji te čeka. Paket od 8 treninga: 280 KM.
            </p>
          </div>
          <Link href={`${B}/probni`} className="rounded-full py-5 text-center text-lg font-bold uppercase" style={{ background: C.lime, color: C.bg }}>
            Zakaži konsultaciju
          </Link>
        </div>
      </section>
    </>
  );
}
