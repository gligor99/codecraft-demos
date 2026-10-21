import type { Metadata } from "next";
import { hours } from "../_lib/data";
import { PageHero, Reveal } from "../_lib/ui";
import { C, serif } from "../_lib/theme";
import { ContactForm } from "../_lib/widgets";

export const metadata: Metadata = { title: "Kontakt" };

// Stylised street map: a few blocks, a river and the studio pin. No third-party map embed, no tracking.
function MapArt() {
  return (
    <svg viewBox="0 0 400 300" className="size-full" aria-label="Mapa: Studio Lana, Ulica primjera 12">
      <rect width="400" height="300" fill="#efe6da" />
      <path d="M-10 230 C 80 200, 160 260, 250 220 S 380 190, 410 210 L410 310 L-10 310 Z" fill="#cfd8d6" />
      {[
        [20, 20, 90, 60],
        [130, 20, 110, 60],
        [260, 20, 120, 60],
        [20, 100, 90, 70],
        [130, 100, 50, 70],
        [200, 100, 80, 70],
        [300, 100, 80, 70],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill={i === 5 ? C.blush : "#e2d6c6"} />
      ))}
      <path d="M0 90 H400 M120 0 V200 M190 90 V200 M290 0 V200" stroke="#fffaf4" strokeWidth="8" />
      <text x="300" y="196" fontSize="10" fill={C.ink} opacity="0.5" fontFamily="var(--f-body)">
        Parking 50 m
      </text>
      <g transform="translate(240 120)">
        <circle r="26" fill={C.clay} opacity="0.2" />
        <path d="M0 14 C -14 -2, -12 -18, 0 -18 C 12 -18, 14 -2, 0 14 Z" fill={C.clay} />
        <circle cy="-8" r="4" fill="#fff" />
      </g>
    </svg>
  );
}

export default function Kontakt() {
  return (
    <>
      <PageHero eyebrow="Kontakt" title="Svratite" accent="na kafu." text="U centru grada, 50 metara od javnog parkinga. Pišite, pozovite ili samo dođite." />
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-[2rem]">
              <MapArt />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] p-6" style={{ background: C.paper }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase opacity-60">Adresa</p>
                <p className="mt-3 text-2xl" style={serif}>
                  Ulica primjera 12
                </p>
                <p className="opacity-70">Prvi sprat, ulaz iz dvorišta</p>
                <a href="tel:+38761000000" className="mt-4 block font-semibold" style={{ color: C.clay }}>
                  +387 61 000 000
                </a>
                <p className="opacity-70">hello@studiolana.example</p>
              </div>
              <div className="rounded-[1.5rem] p-6" style={{ background: C.paper }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase opacity-60">Radno vrijeme</p>
                <ul className="mt-3 grid gap-2">
                  {hours.map(([d, h]) => (
                    <li key={d} className="flex justify-between gap-3 text-sm">
                      <span className="opacity-70">{d}</span>
                      <span className="font-semibold">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] p-6 sm:p-10" style={{ background: C.sand }}>
              <p className="text-4xl" style={serif}>
                Pišite <em style={{ color: C.clay }}>nam</em>
              </p>
              <p className="mt-2 mb-6 opacity-70">Za grupne termine, vjenčanja i sve što ne stane u online zakazivanje.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
