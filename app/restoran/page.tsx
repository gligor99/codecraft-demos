"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import DemoBadge from "@/components/DemoBadge";

const C = { bg: "#120e0a", panel: "#1c1611", line: "#f5ead71a", cream: "#f5ead7", amber: "#e8a93c", ember: "#c4502a" };
const accent = { fontFamily: "var(--f-accent)", fontStyle: "italic" as const };
const mono = { fontFamily: "var(--f-mono)" };
const ease = [0.2, 0.8, 0.2, 1] as const;

type Dish = { id: string; cat: string; name: string; desc: string; price: number; hue: [string, string]; tag?: string };
const menu: Dish[] = [
  { id: "d1", cat: "Roštilj", name: "Ćevapi 10/1", desc: "Lepinja s ognjišta, luk, kajmak", price: 12, hue: ["#8a3b1d", "#e8a93c"], tag: "Najprodavanije" },
  { id: "d2", cat: "Roštilj", name: "Pljeskavica punjena", desc: "Kajmak i sir, pomfrit, salata", price: 14, hue: ["#6e2f17", "#d9873a"] },
  { id: "d3", cat: "Roštilj", name: "Miješano meso za dvoje", desc: "Ćevapi, ražnjići, kobasice, piletina", price: 38, hue: ["#5a2412", "#c4502a"] },
  { id: "d4", cat: "Ispod sača", name: "Teletina ispod sača", desc: "S krompirom, sporo pečeno 3 sata", price: 22, hue: ["#4a2a14", "#b7793a"], tag: "Po narudžbi" },
  { id: "d5", cat: "Ispod sača", name: "Jagnjetina ispod sača", desc: "Ruzmarin, mladi krompir", price: 26, hue: ["#3d2513", "#a8652c"] },
  { id: "d6", cat: "Pite", name: "Burek", desc: "Domaće razvučeno tijesto, meso", price: 6, hue: ["#7a5a2a", "#f0c470"] },
  { id: "d7", cat: "Pite", name: "Sirnica", desc: "Svježi kravlji sir", price: 6, hue: ["#7d6a3a", "#f3dca0"] },
  { id: "d8", cat: "Čorbe", name: "Begova čorba", desc: "Piletina, bamija, kiselo vrhnje", price: 5.5, hue: ["#6b5220", "#e2b45a"] },
  { id: "d9", cat: "Deserti", name: "Tufahija", desc: "Jabuka, orah, šlag", price: 4, hue: ["#7a4a3a", "#f1d5b0"] },
  { id: "d10", cat: "Deserti", name: "Hurmašice", desc: "Tri komada, sirup od limuna", price: 4.5, hue: ["#6a3a1a", "#d99a4a"] },
];
const cats = ["Roštilj", "Ispod sača", "Pite", "Čorbe", "Deserti"];
const DELIVERY = 3;
const km = (n: number) => n.toFixed(2).replace(".", ",") + " KM";

// Top-down "plate" illustration generated from the dish colours.
function Plate({ hue, seed = 0, className = "" }: { hue: [string, string]; seed?: number; className?: string }) {
  const bits = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 + seed;
    const r = 18 + ((i * 13 + seed * 7) % 14);
    return { x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r, s: 7 + ((i * 5 + seed) % 7) };
  });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id={`p${seed}`} cx="0.4" cy="0.35">
          <stop offset="0" stopColor={hue[1]} />
          <stop offset="1" stopColor={hue[0]} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#f5ead7" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#00000014" strokeWidth="6" />
      <circle cx="50" cy="50" r="36" fill={`url(#p${seed})`} />
      {bits.map((b, i) => (
        <ellipse
          key={i}
          cx={b.x}
          cy={b.y}
          rx={b.s}
          ry={b.s * 0.55}
          transform={`rotate(${i * 40 + seed * 10} ${b.x} ${b.y})`}
          fill={i % 2 ? hue[1] : "#fff"}
          opacity={i % 2 ? 0.9 : 0.25}
        />
      ))}
      <circle cx="40" cy="38" r="5" fill="#fff" opacity="0.35" />
    </svg>
  );
}

const STATUS = ["Primljeno", "U pripremi", "Na putu", "Dostavljeno"];

function Tracker({ mode, total, onClose }: { mode: "dostava" | "preuzimanje"; total: number; onClose: () => void }) {
  const [s, setS] = useState(0);
  const labels = mode === "dostava" ? STATUS : ["Primljeno", "U pripremi", "Spremno", "Preuzeto"];
  useEffect(() => {
    if (s >= 3) return;
    const t = setTimeout(() => setS(s + 1), 2600);
    return () => clearTimeout(t);
  }, [s]);
  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease, duration: 0.5 }}
        className="w-full max-w-md rounded-[2rem] p-7"
        style={{ background: C.panel, color: C.cream }}
      >
        <p className="text-xs tracking-widest uppercase opacity-60" style={mono}>
          Narudžba #KM-{2047}
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight">
          {labels[s]}
          <span style={{ color: C.amber }}>.</span>
        </p>
        <p className="mt-1 text-sm opacity-60">
          {s < 3 ? (mode === "dostava" ? `Stiže za otprilike ${30 - s * 9} min` : "Javimo SMS-om kad je spremno") : "Prijatno!"}
        </p>
        <div className="relative mt-8 grid grid-cols-4">
          <div className="absolute top-3 right-[12.5%] left-[12.5%] h-0.5" style={{ background: C.line }} />
          <motion.div
            className="absolute top-3 left-[12.5%] h-0.5 origin-left"
            style={{ background: C.amber, width: "75%" }}
            animate={{ scaleX: s / 3 }}
            transition={{ duration: 0.8, ease }}
          />
          {labels.map((l, i) => (
            <div key={l} className="relative flex flex-col items-center gap-2 text-center">
              <motion.span
                className="grid size-6 place-items-center rounded-full text-[11px] font-bold"
                animate={{ background: i <= s ? C.amber : C.panel, color: i <= s ? C.bg : C.cream, scale: i === s ? 1.2 : 1 }}
                style={{ border: `2px solid ${i <= s ? C.amber : "#f5ead740"}` }}
              >
                {i < s ? "✓" : i + 1}
              </motion.span>
              <span className="text-[11px] opacity-70">{l}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between border-t pt-5 text-sm" style={{ borderColor: C.line }}>
          <span className="opacity-60">Ukupno, plaćanje pri {mode === "dostava" ? "dostavi" : "preuzimanju"}</span>
          <b>{km(total)}</b>
        </div>
        <button onClick={onClose} className="mt-6 w-full rounded-full py-3.5 font-semibold" style={{ background: C.cream, color: C.bg }}>
          Zatvori
        </button>
        <p className="mt-3 text-center text-[11px] opacity-40">Demo: narudžba se ne šalje u kuhinju.</p>
      </motion.div>
    </motion.div>
  );
}

export default function Restoran() {
  const [cat, setCat] = useState(cats[0]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"dostava" | "preuzimanje">("dostava");
  const [ordered, setOrdered] = useState<number | null>(null);
  const [bump, setBump] = useState(0);

  const add = (id: string, d = 1) => {
    setCart((c) => {
      const n = (c[id] ?? 0) + d;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });
    if (d > 0) setBump((b) => b + 1);
  };
  const lines = Object.entries(cart).map(([id, q]) => ({ dish: menu.find((m) => m.id === id)!, q }));
  const count = lines.reduce((a, l) => a + l.q, 0);
  const subtotal = lines.reduce((a, l) => a + l.q * l.dish.price, 0);
  const total = subtotal + (mode === "dostava" && subtotal > 0 ? DELIVERY : 0);

  return (
    <div style={{ background: C.bg, color: C.cream }} className="min-h-screen">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: C.line, background: C.bg + "d9" }}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <a href="#" className="text-xl font-extrabold tracking-tight uppercase">
            Konoba <span style={{ color: C.amber }}>Most</span>
          </a>
          <div className="hidden gap-8 text-sm md:flex">
            <a href="#meni">Meni</a>
            <a href="#prica">Naša priča</a>
            <a href="#info">Info</a>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold"
            style={{ background: C.amber, color: C.bg }}
          >
            Korpa
            <motion.span
              key={bump}
              initial={{ scale: 1.6 }}
              animate={{ scale: 1 }}
              className="grid min-w-6 place-items-center rounded-full px-1.5 text-xs"
              style={{ background: C.bg, color: C.amber }}
            >
              {count}
            </motion.span>
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-8 sm:pt-36">
        <div
          className="pointer-events-none absolute top-10 -right-40 size-[700px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${C.ember}55, transparent)` }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="rise">
            <p className="flex items-center gap-2 text-xs tracking-widest uppercase" style={mono}>
              <span className="size-2 rounded-full bg-green-400" /> Dostava danas do 22:30
            </p>
            <h1 className="mt-6 text-[17vw] leading-[0.82] font-extrabold tracking-[-0.05em] uppercase sm:text-[13vw] lg:text-[9.5rem]">
              Vatra,
              <br />
              <span style={{ ...accent, color: C.amber, textTransform: "none", fontWeight: 400 }}>sač</span> i<br />
              strpljenje.
            </h1>
            <p className="mt-8 max-w-md text-lg opacity-75">
              Domaća kuhinja kakvu pamtite. Naručite za 30 sekundi, mi palimo roštilj.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#meni" className="rounded-full px-7 py-4 font-bold" style={{ background: C.amber, color: C.bg }}>
                Naruči online
              </a>
              <a href="tel:+38761000000" className="rounded-full border px-7 py-4 font-bold" style={{ borderColor: C.line }}>
                Rezerviši sto
              </a>
            </div>
          </div>
          <div className="rise relative mx-auto aspect-square w-[min(520px,90%)]" style={{ animationDelay: "0.2s" }}>
            <Plate hue={["#8a3b1d", "#e8a93c"]} seed={3} className="spin-slow size-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
            <div className="absolute -bottom-2 left-0 rounded-2xl px-4 py-3 shadow-2xl" style={{ background: C.cream, color: C.bg }}>
              <p className="text-xs opacity-60" style={mono}>
                Ćevapi 10/1
              </p>
              <p className="text-lg font-bold">{km(12)}</p>
            </div>
            <div className="absolute top-6 right-0 rounded-full px-4 py-2 text-sm font-bold" style={{ background: C.ember }}>
              🔥 Sa ćumura
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="meni" className="scroll-mt-16 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-6xl font-extrabold tracking-tight sm:text-8xl">
            Meni<span style={{ color: C.amber }}>.</span>
          </h2>
          <div
            className="no-scrollbar sticky top-[61px] z-40 -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 py-3 backdrop-blur-xl sm:mx-0 sm:px-0"
            style={{ background: C.bg + "d9" }}
          >
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold"
                style={{ color: cat === c ? C.bg : C.cream }}
              >
                {cat === c && <motion.span layoutId="cat" className="absolute inset-0 rounded-full" style={{ background: C.cream }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {menu
                .filter((m) => m.cat === cat)
                .map((m, i) => {
                  const q = cart[m.id] ?? 0;
                  return (
                    <motion.article
                      layout
                      key={m.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05, ease }}
                      className="group relative overflow-hidden rounded-[1.75rem] border p-5"
                      style={{ borderColor: C.line, background: C.panel }}
                    >
                      {m.tag && (
                        <span className="absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: C.ember }}>
                          {m.tag}
                        </span>
                      )}
                      <div className="mx-auto w-[70%] transition duration-700 group-hover:rotate-12">
                        <Plate hue={m.hue} seed={i + 1} className="w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="mt-4 flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight">{m.name}</h3>
                          <p className="text-sm opacity-60">{m.desc}</p>
                          <p className="mt-2 text-lg font-bold" style={{ color: C.amber }}>
                            {km(m.price)}
                          </p>
                        </div>
                        {q === 0 ? (
                          <button
                            onClick={() => add(m.id)}
                            aria-label={`Dodaj ${m.name}`}
                            className="grid size-12 shrink-0 place-items-center rounded-full text-2xl font-bold transition hover:scale-110"
                            style={{ background: C.amber, color: C.bg }}
                          >
                            +
                          </button>
                        ) : (
                          <div className="flex shrink-0 items-center gap-1 rounded-full p-1" style={{ background: C.cream, color: C.bg }}>
                            <button onClick={() => add(m.id, -1)} className="grid size-9 place-items-center rounded-full text-lg font-bold" aria-label="Manje">
                              −
                            </button>
                            <span className="w-5 text-center font-bold">{q}</span>
                            <button onClick={() => add(m.id)} className="grid size-9 place-items-center rounded-full text-lg font-bold" aria-label="Više">
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section id="prica" className="scroll-mt-16 px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["3h", "toliko se peče teletina ispod sača"],
            ["1974.", "otkad se pali ista vatra"],
            ["30 min", "prosječna dostava u gradu"],
          ].map(([big, small], i) => (
            <motion.div
              key={big}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease, duration: 0.8 }}
              className="rounded-[2rem] border p-8"
              style={{ borderColor: C.line, background: i === 1 ? C.amber : C.panel, color: i === 1 ? C.bg : C.cream }}
            >
              <p className="text-7xl font-extrabold tracking-tighter">{big}</p>
              <p className="mt-3 text-xl" style={accent}>
                {small}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info */}
      <footer id="info" className="scroll-mt-16 border-t px-4 pt-20 pb-28 sm:px-8" style={{ borderColor: C.line }}>
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <p className="text-4xl font-extrabold tracking-tight uppercase">
            Konoba <span style={{ color: C.amber }}>Most</span>
          </p>
          <div className="text-sm opacity-75" style={mono}>
            <p>Ulica primjera 7, stari grad</p>
            <p>+387 61 000 000</p>
            <p className="mt-3">Svaki dan 10:00 – 23:00</p>
          </div>
          <p className="text-xs opacity-40">Izmišljen restoran. Demo sajt koji je napravio CodeCraft.</p>
        </div>
      </footer>

      {/* Cart drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col"
              style={{ background: C.panel }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease, duration: 0.45 }}
            >
              <div className="flex items-center justify-between border-b p-5" style={{ borderColor: C.line }}>
                <p className="text-2xl font-extrabold">Vaša narudžba</p>
                <button onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full border" style={{ borderColor: C.line }}>
                  ✕
                </button>
              </div>
              <div className="flex gap-1 p-5 pb-0">
                {(["dostava", "preuzimanje"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className="flex-1 rounded-full py-2.5 text-sm font-bold capitalize transition"
                    style={mode === m ? { background: C.cream, color: C.bg } : { border: `1px solid ${C.line}` }}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <ul className="flex-1 overflow-y-auto p-5">
                {lines.length === 0 && <li className="py-16 text-center opacity-50">Korpa je prazna. Krenite od ćevapa?</li>}
                {lines.map(({ dish, q }, i) => (
                  <li key={dish.id} className="flex items-center gap-3 border-b py-3" style={{ borderColor: C.line }}>
                    <Plate hue={dish.hue} seed={i + 20} className="size-12 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold">{dish.name}</p>
                      <p className="text-sm opacity-60">{km(dish.price * q)}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full border p-0.5" style={{ borderColor: C.line }}>
                      <button onClick={() => add(dish.id, -1)} className="grid size-8 place-items-center" aria-label="Manje">
                        −
                      </button>
                      <span className="w-4 text-center text-sm font-bold">{q}</span>
                      <button onClick={() => add(dish.id)} className="grid size-8 place-items-center" aria-label="Više">
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t p-5" style={{ borderColor: C.line }}>
                <div className="grid gap-1.5 text-sm" style={mono}>
                  <p className="flex justify-between opacity-70">
                    <span>Hrana</span>
                    <span>{km(subtotal)}</span>
                  </p>
                  <p className="flex justify-between opacity-70">
                    <span>Dostava</span>
                    <span>{mode === "dostava" && subtotal > 0 ? km(DELIVERY) : "—"}</span>
                  </p>
                  <p className="mt-2 flex justify-between text-lg font-bold">
                    <span>Ukupno</span>
                    <span style={{ color: C.amber }}>{km(total)}</span>
                  </p>
                </div>
                <button
                  disabled={!count}
                  onClick={() => {
                    setOrdered(total);
                    setOpen(false);
                    setCart({});
                  }}
                  className="mt-5 w-full rounded-full py-4 font-bold transition disabled:opacity-30"
                  style={{ background: C.amber, color: C.bg }}
                >
                  Naruči · {km(total)}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Floating cart on mobile */}
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            onClick={() => setOpen(true)}
            className="fixed inset-x-4 bottom-16 z-50 flex items-center justify-between rounded-full px-6 py-4 font-bold shadow-2xl md:hidden"
            style={{ background: C.amber, color: C.bg }}
          >
            <span>Korpa · {count}</span>
            <span>{km(subtotal)} →</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>{ordered !== null && <Tracker mode={mode} total={ordered} onClose={() => setOrdered(null)} />}</AnimatePresence>

      <DemoBadge />
    </div>
  );
}
