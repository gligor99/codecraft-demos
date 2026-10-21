import type { Metadata } from "next";
import { hours } from "../_lib/data";
import { C, accent, mono } from "../_lib/theme";
import { PageHero, Reveal } from "../_lib/ui";
import { ContactForm } from "../_lib/widgets";

export const metadata: Metadata = { title: "Kontakt" };

function MapArt() {
  return (
    <svg viewBox="0 0 400 300" className="size-full" aria-label="Mapa: Konoba Most, uz most na rijeci">
      <rect width="400" height="300" fill="#1c1611" />
      <path d="M-10 140 C 90 120, 160 190, 260 150 S 380 120, 410 140 L410 200 C 360 180, 300 210, 240 200 S 100 170, -10 200 Z" fill="#23394a" />
      <rect x="180" y="120" width="34" height="96" rx="4" fill="#3a3027" transform="rotate(-8 197 168)" />
      {[
        [20, 20, 100, 80],
        [140, 20, 120, 70],
        [280, 20, 100, 90],
        [30, 230, 120, 60],
        [250, 225, 130, 70],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#2a221a" />
      ))}
      <g transform="translate(250 105)">
        <circle r="24" fill={C.amber} opacity="0.2" />
        <path d="M0 14 C -14 -2, -12 -18, 0 -18 C 12 -18, 14 -2, 0 14 Z" fill={C.amber} />
        <circle cy="-8" r="4" fill={C.bg} />
      </g>
      <text x="168" y="235" fontSize="10" fill={C.cream} opacity="0.5" fontFamily="var(--f-mono)">
        Stari most
      </text>
    </svg>
  );
}

export default function Kontakt() {
  return (
    <>
      <PageHero eyebrow="Kontakt" title="Uz most," accentText="na lijevoj obali." />
      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border" style={{ borderColor: C.line }}>
              <MapArt />
            </div>
            <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2" style={mono}>
              <div className="rounded-[1.5rem] border p-6" style={{ borderColor: C.line }}>
                <p className="opacity-50">ADRESA</p>
                <p className="mt-2 text-lg">Ulica primjera 7</p>
                <a href="tel:+38761000000" className="mt-2 block" style={{ color: C.amber }}>
                  +387 61 000 000
                </a>
                <p className="opacity-70">hrana@konobamost.example</p>
              </div>
              <div className="rounded-[1.5rem] border p-6" style={{ borderColor: C.line }}>
                <p className="opacity-50">RADNO VRIJEME</p>
                <ul className="mt-2 grid gap-1">
                  {hours.map(([d, h]) => (
                    <li key={d} className="flex justify-between gap-2">
                      <span className="opacity-60">{d.split(" – ")[0]}</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border p-6 sm:p-10" style={{ borderColor: C.line, background: C.panel }}>
              <p className="text-4xl leading-tight" style={accent}>
                Pitanje, pohvala ili kritika?
              </p>
              <p className="mt-2 mb-6 opacity-60">Sve čitamo, i odgovaramo u toku dana.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
