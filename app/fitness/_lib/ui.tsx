"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { DAYS, compare, faq, plans, programs } from "./data";
import { B, C, display, ease, mono } from "./theme";

const links = [
  { href: `${B}/raspored`, label: "Raspored" },
  { href: `${B}/programi`, label: "Programi" },
  { href: `${B}/clanarine`, label: "Članarine" },
  { href: `${B}/treneri`, label: "Treneri" },
];

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-12 sm:px-8 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 size-[560px] rounded-full blur-[120px]" style={{ background: C.lime, opacity: 0.12 }} />
      <div className="relative mx-auto max-w-7xl">
        <p className="rise text-xs tracking-widest uppercase" style={{ ...mono, color: C.lime }}>
          {eyebrow}
        </p>
        <h1 className="rise mt-4 text-[19vw] leading-[0.85] uppercase sm:text-9xl" style={display}>
          {title}
          <span style={{ color: C.lime }}>.</span>
        </h1>
        {text && (
          <p className="rise mt-6 max-w-xl text-lg" style={{ color: C.grey, animationDelay: "0.1s" }}>
            {text}
          </p>
        )}
      </div>
    </section>
  );
}

export function Ticker() {
  return (
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
  );
}

export function Live() {
  // "Live" occupancy: a gentle random walk, started after mount so SSR markup stays stable.
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

export function Bars({ level }: { level: number }) {
  return (
    <span className="flex items-end gap-0.5" aria-label={`Intenzitet ${level} od 3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className="w-1 rounded-sm" style={{ height: 4 + i * 4, background: i <= level ? C.lime : "#ffffff22" }} />
      ))}
    </span>
  );
}

/* ---------- Schedule ---------- */

const SLOTS: [string, string, string][] = [
  ["07:00", "mobility", "Ena"],
  ["08:15", "hiit", "Dino"],
  ["12:15", "core", "Ena"],
  ["17:30", "snaga", "Haris"],
  ["18:45", "spin", "Dino"],
  ["20:00", "pilates", "Lejla"],
];
const CAP: Record<string, number> = { hiit: 16, snaga: 10, spin: 20, pilates: 12, mobility: 14, core: 12 };

type Klass = { id: string; time: string; prog: string; coach: string; cap: number; booked: number };
const schedule: Record<string, Klass[]> = Object.fromEntries(
  DAYS.map((d, di) => [
    d,
    SLOTS.filter((_, i) => !(d === "SUB" && i > 3)).map(([time, prog, coach], i) => {
      // Rotate a few programmes through the week so days differ.
      const p = di % 2 && i === 2 ? "pilates" : di % 3 === 2 && i === 4 ? "hiit" : prog;
      const cap = CAP[p];
      return { id: `${d}-${i}`, time, prog: p, coach, cap, booked: Math.min(cap, Math.max(0, Math.round(cap * 0.6) + ((di * 3 + i * 5) % 7) - 3)) };
    }),
  ]),
);

export function Schedule({ compact = false }: { compact?: boolean }) {
  const [day, setDay] = useState(DAYS[0]);
  const [filter, setFilter] = useState("sve");
  const [mine, setMine] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  function toggle(k: Klass, name: string) {
    const on = mine.includes(k.id);
    setMine((m) => (on ? m.filter((x) => x !== k.id) : [...m, k.id]));
    setToast(on ? `Otkazano: ${name}` : `Rezervisano: ${name}, ${day} ${k.time}`);
    setTimeout(() => setToast(null), 2200);
  }
  const list = schedule[day].filter((k) => filter === "sve" || k.prog === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {DAYS.map((d) => (
            <button key={d} onClick={() => setDay(d)} className="relative shrink-0 rounded-full px-5 py-3 text-sm font-bold" style={{ color: day === d ? C.bg : C.white, ...mono }}>
              {day === d && <motion.span layoutId={`day-${compact}`} className="absolute inset-0 rounded-full" style={{ background: C.lime }} />}
              <span className="relative">{d}</span>
            </button>
          ))}
        </div>
        {!compact && (
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full border bg-transparent px-4 py-2.5 text-sm font-bold [color-scheme:dark]" style={{ borderColor: C.line }} aria-label="Filter programa">
            <option value="sve">Svi programi</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={day + filter} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3, ease }} className="mt-6 border-t" style={{ borderColor: C.line }}>
          {list.length === 0 && <li className="py-10" style={{ color: C.grey }}>Ovaj program nije na rasporedu ovaj dan.</li>}
          {list.map((k) => {
            const p = programs.find((x) => x.id === k.prog)!;
            const on = mine.includes(k.id);
            const left = k.cap - k.booked - (on ? 1 : 0);
            const full = left <= 0 && !on;
            const pct = ((k.booked + (on ? 1 : 0)) / k.cap) * 100;
            return (
              <li key={k.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b py-5 sm:grid-cols-[90px_1.4fr_1fr_1fr_auto]" style={{ borderColor: C.line }}>
                <span className="text-2xl" style={display}>
                  {k.time}
                </span>
                <span>
                  <span className="block text-xl font-bold uppercase sm:text-2xl">{p.name}</span>
                  <span className="text-sm" style={{ color: C.grey }}>
                    {k.coach} · {p.min} min
                  </span>
                </span>
                <span className="hidden items-center gap-3 sm:flex">
                  <Bars level={p.level} />
                  <span className="text-xs uppercase" style={{ ...mono, color: C.grey }}>
                    {["", "Lagano", "Srednje", "Jako"][p.level]}
                  </span>
                </span>
                <span className="hidden sm:block">
                  <span className="block h-1.5 overflow-hidden rounded-full" style={{ background: "#ffffff14" }}>
                    <motion.span className="block h-full rounded-full" animate={{ width: `${pct}%` }} style={{ background: pct >= 100 ? "#ff4d4d" : C.lime }} />
                  </span>
                  <span className="mt-1.5 block text-xs" style={{ ...mono, color: C.grey }}>
                    {full ? "Popunjeno" : `${left} slobodn${left === 1 ? "o mjesto" : "ih mjesta"}`}
                  </span>
                </span>
                <button
                  disabled={full}
                  onClick={() => toggle(k, p.name)}
                  className="rounded-full px-5 py-3 text-sm font-bold uppercase transition disabled:opacity-30"
                  style={on ? { background: C.lime, color: C.bg } : { border: `1px solid ${C.line}` }}
                >
                  {on ? "✓ Tvoje" : full ? "Puno" : "Rezerviši"}
                </button>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} className="fixed top-20 left-1/2 z-[70] -translate-x-1/2 rounded-full px-5 py-3 text-sm font-bold whitespace-nowrap" style={{ background: C.lime, color: C.bg }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Plans ---------- */

export function Plans() {
  const [yearly, setYearly] = useState(false);
  return (
    <div>
      <button onClick={() => setYearly(!yearly)} className="flex items-center gap-3 rounded-full border p-1.5 pr-4 text-sm font-bold" style={{ borderColor: C.line }} aria-pressed={yearly}>
        <span className="relative h-7 w-12 rounded-full" style={{ background: yearly ? C.lime : "#ffffff22" }}>
          <motion.span className="absolute top-1 size-5 rounded-full" style={{ background: yearly ? C.bg : C.white }} animate={{ left: yearly ? 24 : 4 }} />
        </span>
        Godišnje <span style={{ color: C.lime }}>−20%</span>
      </button>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((p, i) => {
          const price = yearly ? Math.round(p.month * 0.8) : p.month;
          return (
            <Reveal key={p.name} delay={i * 0.06}>
              <div className="relative flex h-full flex-col rounded-[2rem] p-8" style={p.hot ? { background: C.lime, color: C.bg } : { background: C.panel, border: `1px solid ${C.line}` }}>
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
                {yearly && <p className="text-xs font-bold opacity-70">{price * 12} KM godišnje</p>}
                <ul className="mt-6 grid flex-1 gap-2.5">
                  {p.perks.map((x) => (
                    <li key={x} className="flex gap-3 text-sm font-medium">
                      <span>✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <Link href={`${B}/probni`} className="mt-8 rounded-full py-4 text-center font-bold uppercase" style={p.hot ? { background: C.bg, color: C.lime } : { background: C.white, color: C.bg }}>
                  Učlani se
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export function CompareTable() {
  const cell = (v: boolean | string) => (v === true ? <span style={{ color: C.lime }}>✓</span> : v === false ? <span style={{ color: C.grey }}>—</span> : v);
  return (
    <div className="no-scrollbar overflow-x-auto rounded-[2rem] border" style={{ borderColor: C.line }}>
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr style={{ background: C.panel }}>
            <th className="p-5 font-medium" style={{ color: C.grey }}>
              Uključeno
            </th>
            {plans.map((p) => (
              <th key={p.name} className="p-5 text-2xl uppercase" style={{ ...display, color: p.hot ? C.lime : C.white }}>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compare.map(([label, ...vals]) => (
            <tr key={label} className="border-t" style={{ borderColor: C.line }}>
              <td className="p-5">{label}</td>
              {vals.map((v, i) => (
                <td key={i} className="p-5 font-bold">
                  {cell(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t" style={{ borderColor: C.line }}>
      {faq.map((f, i) => (
        <div key={f.q} className="border-b" style={{ borderColor: C.line }}>
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={open === i}>
            <span className="text-xl font-bold uppercase">{f.q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0, background: open === i ? C.lime : C.panel, color: open === i ? C.bg : C.white }} className="grid size-9 shrink-0 place-items-center rounded-full text-lg">
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="max-w-2xl overflow-hidden pb-6" style={{ color: C.grey }}>
                {f.a}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function TrialForm() {
  const [goal, setGoal] = useState("Kondicija");
  const [done, setDone] = useState(false);
  const field = "w-full rounded-2xl border bg-transparent px-4 py-3.5 outline-none focus:border-[#c6ff3d] [color-scheme:dark]";
  if (done)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-96 place-items-center rounded-[2rem] p-8 text-center" style={{ background: C.lime, color: C.bg }}>
        <div>
          <p className="text-7xl uppercase" style={display}>
            Vidimo se!
          </p>
          <p className="mt-3 font-medium">Probni dan je rezervisan. Ponesite patike i vodu, peškir je na nama.</p>
          <p className="mt-4 text-xs opacity-60">Demo: ništa nije poslano.</p>
        </div>
      </motion.div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="grid gap-5 rounded-[2rem] border p-6 sm:p-8"
      style={{ borderColor: C.line, background: C.panel }}
    >
      <div className="grid gap-2">
        <span className="text-xs tracking-widest uppercase" style={{ ...mono, color: C.grey }}>
          Tvoj cilj
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["Kondicija", "Mršavljenje", "Snaga", "Zdrava leđa"].map((g) => (
            <button type="button" key={g} onClick={() => setGoal(g)} className="rounded-xl border py-3 text-sm font-bold transition" style={goal === g ? { background: C.lime, color: C.bg, borderColor: C.lime } : { borderColor: C.line }}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Ime i prezime" className={field} style={{ borderColor: C.line }} />
        <input required placeholder="Telefon" inputMode="tel" className={field} style={{ borderColor: C.line }} />
        <input required type="date" className={field} style={{ borderColor: C.line }} />
        <select className={field} style={{ borderColor: C.line, background: C.panel }} defaultValue="Popodne">
          <option>Jutro (06–10h)</option>
          <option>Podne (10–15h)</option>
          <option>Popodne</option>
          <option>Veče (19–23h)</option>
        </select>
      </div>
      <button className="rounded-full py-4 text-lg font-bold uppercase" style={{ background: C.lime, color: C.bg }}>
        Rezerviši besplatan dan
      </button>
    </form>
  );
}

export function FitnessShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  return (
    <div style={{ background: C.bg, color: C.white }} className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <Link href={B} onClick={() => setOpen(false)} className="text-3xl tracking-wide" style={display}>
            PULSE<span style={{ color: C.lime }}>.</span>
          </Link>
          <div className="hidden gap-1 text-sm font-semibold tracking-wide uppercase md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="relative rounded-full px-4 py-2">
                {path === l.href && <motion.span layoutId="fit-nav" className="absolute inset-0 rounded-full bg-white/10" />}
                <span className="relative">{l.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href={`${B}/probni`} className="rounded-full px-5 py-2.5 text-sm font-bold uppercase" style={{ background: C.lime, color: C.bg }}>
              Probni dan
            </Link>
            <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full border md:hidden" style={{ borderColor: C.line }} aria-label="Meni" aria-expanded={open}>
              <span className="relative block h-2.5 w-4">
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition ${open ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 flex flex-col px-6 pt-24 pb-10 md:hidden" style={{ background: C.bg }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[{ href: B, label: "Početna" }, ...links, { href: `${B}/probni`, label: "Probni dan" }].map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block border-b py-3 text-6xl uppercase" style={{ ...display, borderColor: C.line, color: path === l.href ? C.lime : C.white }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <main>{children}</main>
      <footer className="border-t px-4 pt-16 pb-28 sm:px-8" style={{ borderColor: C.line }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-4">
            <p className="text-[22vw] leading-none uppercase md:col-span-2 md:text-9xl" style={display}>
              Pulse<span style={{ color: C.lime }}>.</span>
            </p>
            <div className="text-sm" style={mono}>
              <p className="text-xs uppercase" style={{ color: C.grey }}>
                Lokacija
              </p>
              <p className="mt-3">Ulica primjera 21</p>
              <p style={{ color: C.grey }}>Pon–Pet 06–23h</p>
              <p style={{ color: C.grey }}>Sub–Ned 08–20h</p>
              <p className="mt-3">+387 61 000 000</p>
            </div>
            <ul className="grid content-start gap-2 text-sm font-semibold uppercase">
              {[{ href: B, label: "Početna" }, ...links, { href: `${B}/probni`, label: "Probni dan" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="opacity-70 hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 border-t pt-6 text-xs" style={{ ...mono, borderColor: C.line, color: C.grey }}>
            © 2026 Pulse Gym · Izmišljena teretana. Demo sajt koji je napravio CodeCraft.
          </p>
        </div>
      </footer>
      <DemoBadge />
    </div>
  );
}
