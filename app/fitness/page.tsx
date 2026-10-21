"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import DemoBadge from "@/components/DemoBadge";

const C = { bg: "#0a0a0a", panel: "#141414", line: "#ffffff14", lime: "#c6ff3d", white: "#f4f4f0", grey: "#8a8a85" };
const display = { fontFamily: "var(--f-display)" };
const mono = { fontFamily: "var(--f-mono)" };
const ease = [0.2, 0.8, 0.2, 1] as const;

type Klass = { id: string; time: string; name: string; coach: string; min: number; level: 1 | 2 | 3; cap: number; booked: number };
const DAYS = ["PON", "UTO", "SRI", "ČET", "PET", "SUB"];
const base: Omit<Klass, "id">[] = [
  { time: "07:00", name: "Mobility", coach: "Ena", min: 45, level: 1, cap: 14, booked: 9 },
  { time: "08:15", name: "HIIT 45", coach: "Dino", min: 45, level: 3, cap: 16, booked: 15 },
  { time: "12:15", name: "Core Express", coach: "Ena", min: 30, level: 2, cap: 12, booked: 6 },
  { time: "17:30", name: "Snaga", coach: "Haris", min: 60, level: 2, cap: 10, booked: 10 },
  { time: "18:45", name: "Spin", coach: "Dino", min: 45, level: 3, cap: 20, booked: 13 },
  { time: "20:00", name: "Pilates", coach: "Lejla", min: 50, level: 1, cap: 12, booked: 4 },
];
// Each day gets the same skeleton with shifted occupancy so the week feels real.
const schedule: Record<string, Klass[]> = Object.fromEntries(
  DAYS.map((d, di) => [
    d,
    base
      .filter((_, i) => !(d === "SUB" && i > 3))
      .map((k, i) => ({ ...k, id: `${d}-${i}`, booked: Math.min(k.cap, Math.max(0, k.booked + ((di * 3 + i * 5) % 7) - 3)) })),
  ]),
);

const plans = [
  { name: "Osnovni", month: 45, perks: ["Teretana 06–23h", "Svlačionice i tuševi", "Uvodni trening"] },
  { name: "Pulse", month: 65, perks: ["Sve iz Osnovnog", "Neograničeni grupni treninzi", "Aplikacija za rezervacije", "Mjerenje sastava tijela"], hot: true },
  { name: "Pro", month: 110, perks: ["Sve iz Pulse", "4 personalna treninga mjesečno", "Plan ishrane", "Ručnik i ormarić"] },
];

const coaches = [
  { name: "Dino", tag: "HIIT · Spin", stat: "8 god." },
  { name: "Ena", tag: "Mobility · Core", stat: "6 god." },
  { name: "Haris", tag: "Snaga · Powerlifting", stat: "11 god." },
  { name: "Lejla", tag: "Pilates", stat: "5 god." },
];

function Live() {
  // "Live" occupancy counter: a gentle random walk, started after mount so SSR markup stays stable.
  const [n, setN] = useState(23);
  useEffect(() => {
    const t = setInterval(() => setN((x) => Math.max(8, Math.min(48, x + Math.round(Math.random() * 4 - 2)))), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex size-2.5">
        <span className="absolute inset-0 animate-ping rounded-full" style={{ background: C.lime }} />
        <span className="relative size-2.5 rounded-full" style={{ background: C.lime }} />
      </span>
      <motion.b key={n} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {n}
      </motion.b>{" "}
      ljudi trenutno trenira
    </span>
  );
}

function Bars({ level }: { level: number }) {
  return (
    <span className="flex items-end gap-0.5" aria-label={`Intenzitet ${level} od 3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className="w-1 rounded-sm" style={{ height: 4 + i * 4, background: i <= level ? C.lime : "#ffffff22" }} />
      ))}
    </span>
  );
}

export default function Fitness() {
  const [day, setDay] = useState(DAYS[0]);
  const [mine, setMine] = useState<string[]>([]);
  const [yearly, setYearly] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  function toggle(k: Klass) {
    const on = mine.includes(k.id);
    setMine((m) => (on ? m.filter((x) => x !== k.id) : [...m, k.id]));
    setToast(on ? `Otkazano: ${k.name}` : `Rezervisano: ${k.name}, ${day} ${k.time}`);
    setTimeout(() => setToast(null), 2200);
  }

  return (
    <div style={{ background: C.bg, color: C.white }} className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <a href="#" className="text-3xl tracking-wide" style={display}>
            PULSE<span style={{ color: C.lime }}>.</span>
          </a>
          <div className="hidden gap-8 text-sm font-semibold tracking-wide uppercase md:flex">
            <a href="#raspored">Raspored</a>
            <a href="#clanarine">Članarine</a>
            <a href="#treneri">Treneri</a>
          </div>
          <a href="#clanarine" className="rounded-full px-5 py-2.5 text-sm font-bold uppercase" style={{ background: C.lime, color: C.bg }}>
            Probni dan
          </a>
        </nav>
      </header>

      {/* Hero: giant type sliding sideways on scroll */}
      <section ref={hero} className="relative flex min-h-svh flex-col justify-end overflow-hidden pt-28 pb-24 sm:pb-10">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/4 left-1/2 size-[640px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: C.lime, opacity: 0.18 }}
        />
        <motion.h1 style={{ ...display, x }} className="relative text-[38vw] leading-[0.78] tracking-tight whitespace-nowrap uppercase">
          Bez izgovora<span style={{ color: C.lime }}>.</span>
        </motion.h1>
        <div className="relative mx-auto mt-8 grid w-full max-w-7xl items-end gap-8 px-4 sm:px-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm" style={mono}>
              <Live />
            </p>
            <p className="mt-4 max-w-md text-xl font-medium">Teretana, grupni treninzi i treneri koji vas znaju po imenu. Otvoreno 06–23h.</p>
          </div>
          <a
            href="#raspored"
            className="group flex items-center gap-4 rounded-full py-2 pr-2 pl-7 text-lg font-bold uppercase"
            style={{ background: C.white, color: C.bg }}
          >
            Rezerviši trening
            <span className="grid size-12 place-items-center rounded-full transition group-hover:rotate-[-45deg]" style={{ background: C.lime }}>
              →
            </span>
          </a>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden py-4" style={{ background: C.lime, color: C.bg }}>
        <div className="marquee flex w-max gap-8 text-3xl uppercase" style={display}>
          {Array.from({ length: 2 }, (_, k) =>
            ["HIIT", "Snaga", "Spin", "Pilates", "Mobility", "Core", "Personalni"].map((w) => (
              <span key={w + k} className="flex items-center gap-8">
                {w} <span>✱</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* Schedule */}
      <section id="raspored" className="scroll-mt-16 px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-7xl uppercase sm:text-9xl" style={display}>
              Raspored
            </h2>
            <p className="text-sm" style={mono}>
              Rezervisano: <b style={{ color: C.lime }}>{mine.length}</b>
            </p>
          </div>
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className="relative shrink-0 rounded-full px-6 py-3 text-sm font-bold"
                style={{ color: day === d ? C.bg : C.white, ...mono }}
              >
                {day === d && <motion.span layoutId="day" className="absolute inset-0 rounded-full" style={{ background: C.lime }} />}
                <span className="relative">{d}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul
              key={day}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease }}
              className="mt-6 border-t"
              style={{ borderColor: C.line }}
            >
              {schedule[day].map((k) => {
                const on = mine.includes(k.id);
                const left = k.cap - k.booked - (on ? 1 : 0);
                const full = left <= 0 && !on;
                const pct = ((k.booked + (on ? 1 : 0)) / k.cap) * 100;
                return (
                  <li
                    key={k.id}
                    className="grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b py-5 sm:grid-cols-[90px_1.4fr_1fr_1fr_auto]"
                    style={{ borderColor: C.line }}
                  >
                    <span className="text-2xl" style={display}>
                      {k.time}
                    </span>
                    <span>
                      <span className="block text-xl font-bold uppercase sm:text-2xl">{k.name}</span>
                      <span className="text-sm" style={{ color: C.grey }}>
                        {k.coach} · {k.min} min
                      </span>
                    </span>
                    <span className="hidden items-center gap-3 sm:flex">
                      <Bars level={k.level} />
                      <span className="text-xs uppercase" style={{ ...mono, color: C.grey }}>
                        {["", "Lagano", "Srednje", "Jako"][k.level]}
                      </span>
                    </span>
                    <span className="hidden sm:block">
                      <span className="block h-1.5 overflow-hidden rounded-full" style={{ background: "#ffffff14" }}>
                        <motion.span
                          className="block h-full rounded-full"
                          animate={{ width: `${pct}%` }}
                          style={{ background: pct >= 100 ? "#ff4d4d" : C.lime }}
                        />
                      </span>
                      <span className="mt-1.5 block text-xs" style={{ ...mono, color: C.grey }}>
                        {full ? "Popunjeno" : `${left} slobodn${left === 1 ? "o mjesto" : "ih mjesta"}`}
                      </span>
                    </span>
                    <button
                      disabled={full}
                      onClick={() => toggle(k)}
                      className="rounded-full px-5 py-3 text-sm font-bold uppercase transition disabled:opacity-30"
                      style={on ? { background: C.lime, color: C.bg } : { border: `1px solid ${C.line}` }}
                    >
                      {on ? "✓ Tvoje" : full ? "Lista čekanja" : "Rezerviši"}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>

      {/* Plans */}
      <section id="clanarine" className="scroll-mt-16 px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-7xl uppercase sm:text-9xl" style={display}>
              Članarine
            </h2>
            <button
              onClick={() => setYearly(!yearly)}
              className="flex items-center gap-3 rounded-full border p-1.5 pr-4 text-sm font-bold"
              style={{ borderColor: C.line }}
              aria-pressed={yearly}
            >
              <span className="relative h-7 w-12 rounded-full" style={{ background: yearly ? C.lime : "#ffffff22" }}>
                <motion.span
                  className="absolute top-1 size-5 rounded-full"
                  style={{ background: yearly ? C.bg : C.white }}
                  animate={{ left: yearly ? 24 : 4 }}
                />
              </span>
              Godišnje <span style={{ color: C.lime }}>−20%</span>
            </button>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {plans.map((p, i) => {
              const price = yearly ? Math.round(p.month * 0.8) : p.month;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease, duration: 0.7 }}
                  className="relative flex flex-col rounded-[2rem] p-8"
                  style={p.hot ? { background: C.lime, color: C.bg } : { background: C.panel, border: `1px solid ${C.line}` }}
                >
                  {p.hot && (
                    <span className="absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-bold uppercase" style={{ background: C.bg, color: C.lime }}>
                      Najpopularnije
                    </span>
                  )}
                  <p className="text-4xl uppercase" style={display}>
                    {p.name}
                  </p>
                  <p className="mt-6 flex items-end gap-2">
                    <motion.span key={price} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-7xl" style={display}>
                      {price}
                    </motion.span>
                    <span className="mb-2 text-sm font-bold">KM / mj.</span>
                  </p>
                  <ul className="mt-6 grid flex-1 gap-2.5">
                    {p.perks.map((x) => (
                      <li key={x} className="flex gap-3 text-sm font-medium">
                        <span>✓</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-8 rounded-full py-4 font-bold uppercase"
                    style={p.hot ? { background: C.bg, color: C.lime } : { background: C.white, color: C.bg }}
                  >
                    Učlani se
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section id="treneri" className="scroll-mt-16 px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-7xl uppercase sm:text-9xl" style={display}>
            Treneri
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {coaches.map((c, i) => (
              <div key={c.name} className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem]" style={{ background: C.panel }}>
                <div
                  className="absolute inset-0 transition duration-700 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at ${30 + i * 15}% ${35 + (i % 2) * 20}%, ${C.lime}${i % 2 ? "55" : "33"}, transparent 55%), repeating-linear-gradient(${45 + i * 30}deg, #ffffff08 0 2px, transparent 2px 14px)`,
                  }}
                />
                <span className="absolute top-4 right-4 text-xs" style={{ ...mono, color: C.lime }}>
                  {c.stat}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-5xl uppercase" style={display}>
                    {c.name}
                  </p>
                  <p className="text-sm" style={{ color: C.grey }}>
                    {c.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t px-4 pt-16 pb-28 sm:px-8" style={{ borderColor: C.line }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
          <p className="text-[18vw] leading-none uppercase sm:text-9xl" style={display}>
            Pulse<span style={{ color: C.lime }}>.</span>
          </p>
          <div className="text-sm" style={{ ...mono, color: C.grey }}>
            <p>Ulica primjera 21 · 06–23h</p>
            <p>Izmišljena teretana. Demo by CodeCraft.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed top-20 left-1/2 z-[70] -translate-x-1/2 rounded-full px-5 py-3 text-sm font-bold whitespace-nowrap"
            style={{ background: C.lime, color: C.bg }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <DemoBadge />
    </div>
  );
}
