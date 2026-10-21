"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";

const C = { bg: "#f1ede6", card: "#faf8f4", ink: "#1d1a16", green: "#23402f", orange: "#d4561c", line: "#1d1a161a", muted: "#1d1a1699" };
const serif = { fontFamily: "var(--f-display)" };
const mono = { fontFamily: "var(--f-mono)" };
const ease = [0.2, 0.8, 0.2, 1] as const;
const FREE = 60;
const SHIP = 7;
const km = (n: number) => n.toFixed(2).replace(".", ",") + " KM";

type Product = { id: string; name: string; origin: string; notes: string[]; type: "Espresso" | "Filter" | "Bez kofeina"; price: number; bag: string; label: string; roast: number; isNew?: boolean };
const products: Product[] = [
  { id: "p1", name: "Jutro", origin: "Brazil · Cerrado", notes: ["čokolada", "lješnjak", "karamel"], type: "Espresso", price: 18, bag: "#23402f", label: "#e9d8b4", roast: 3 },
  { id: "p2", name: "Etiopija Guji", origin: "Etiopija · Guji", notes: ["jasmin", "breskva", "bergamot"], type: "Filter", price: 24, bag: "#d4561c", label: "#f6e7cf", roast: 1, isNew: true },
  { id: "p3", name: "Kolumbija Huila", origin: "Kolumbija · Huila", notes: ["crvena jabuka", "panela", "kakao"], type: "Filter", price: 22, bag: "#8a5a3c", label: "#f1e2c8", roast: 2 },
  { id: "p4", name: "Nona", origin: "Blend · Brazil, Indija", notes: ["tamna čokolada", "začini", "pun ukus"], type: "Espresso", price: 16, bag: "#1d1a16", label: "#d4561c", roast: 3 },
  { id: "p5", name: "Noćna smjena", origin: "Kolumbija · Swiss Water", notes: ["mlijeko", "keks", "med"], type: "Bez kofeina", price: 20, bag: "#5b6b8c", label: "#ecebe6", roast: 2 },
  { id: "p6", name: "Kenija Nyeri", origin: "Kenija · Nyeri", notes: ["crna ribizla", "grejp", "sok"], type: "Filter", price: 26, bag: "#7a2f3b", label: "#f3d9c9", roast: 1, isNew: true },
];
const SIZES = [
  { id: "250", label: "250 g", k: 1 },
  { id: "500", label: "500 g", k: 1.85 },
  { id: "1000", label: "1 kg", k: 3.4 },
];
const GRINDS = ["Zrno", "Espresso", "Filter / V60", "Džezva"];

type Line = { key: string; p: Product; size: (typeof SIZES)[number]; grind: string; q: number };

// Coffee bag illustration: pouch with a coloured label, valve and roast dots.
function Bag({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden>
      <path d="M22 18 L98 18 L104 150 Q60 158 16 150 Z" fill={p.bag} />
      <path d="M22 18 L98 18 L96 30 L24 30 Z" fill="#000" opacity="0.18" />
      <path d="M22 18 L30 150" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" />
      <rect x="32" y="54" width="56" height="64" rx="6" fill={p.label} />
      <text x="60" y="80" textAnchor="middle" fontSize="13" fontFamily="var(--f-display)" fill={p.bag === p.label ? "#fff" : C.ink}>
        {p.name.split(" ")[0]}
      </text>
      <text x="60" y="94" textAnchor="middle" fontSize="5.5" fontFamily="var(--f-mono)" fill={C.ink} opacity="0.6">
        {p.origin.split(" · ")[0].toUpperCase()}
      </text>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={52 + i * 8} cy="106" r="2.4" fill={i < p.roast ? C.ink : "none"} stroke={C.ink} strokeWidth="0.8" />
      ))}
      <circle cx="60" cy="40" r="4" fill="#000" opacity="0.25" />
      <text x="60" y="140" textAnchor="middle" fontSize="7" fontFamily="var(--f-display)" fill="#fff" opacity="0.8">
        zrno
      </text>
    </svg>
  );
}

function Tilt({ children }: { children: React.ReactNode }) {
  const [r, setR] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      onPointerMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        setR({ x: ((e.clientY - b.top) / b.height - 0.5) * -14, y: ((e.clientX - b.left) / b.width - 0.5) * 18 });
      }}
      onPointerLeave={() => setR({ x: 0, y: 0 })}
      animate={{ rotateX: r.x, rotateY: r.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      style={{ transformPerspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

function ProductModal({ p, onClose, onAdd }: { p: Product; onClose: () => void; onAdd: (l: Omit<Line, "key">) => void }) {
  const [size, setSize] = useState(SIZES[0]);
  const [grind, setGrind] = useState(GRINDS[0]);
  const [q, setQ] = useState(1);
  const price = Math.round(p.price * size.k);
  return (
    <motion.div className="fixed inset-0 z-[70] grid place-items-end bg-black/40 backdrop-blur-sm sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ ease, duration: 0.45 }}
        className="grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] sm:grid-cols-2 sm:rounded-[2rem]"
        style={{ background: C.card, color: C.ink }}
      >
        <div className="grid place-items-center p-8" style={{ background: p.bag + "22" }}>
          <Bag p={p} className="w-[60%] drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]" />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <p className="text-xs tracking-widest uppercase" style={{ ...mono, color: C.muted }}>
              {p.origin}
            </p>
            <button onClick={onClose} className="grid size-9 place-items-center rounded-full border" style={{ borderColor: C.line }} aria-label="Zatvori">
              ✕
            </button>
          </div>
          <h3 className="mt-2 text-5xl" style={serif}>
            {p.name}
          </h3>
          <p className="mt-3 italic" style={{ ...serif, color: C.orange }}>
            {p.notes.join(" · ")}
          </p>
          <p className="mt-6 text-xs font-bold tracking-widest uppercase">Količina</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button key={s.id} onClick={() => setSize(s)} className="rounded-xl border py-3 text-sm font-semibold transition" style={size.id === s.id ? { background: C.ink, color: C.bg, borderColor: C.ink } : { borderColor: C.line }}>
                {s.label}
              </button>
            ))}
          </div>
          <p className="mt-5 text-xs font-bold tracking-widest uppercase">Mljevenje</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {GRINDS.map((g) => (
              <button key={g} onClick={() => setGrind(g)} className="rounded-xl border py-3 text-sm font-semibold transition" style={grind === g ? { background: C.ink, color: C.bg, borderColor: C.ink } : { borderColor: C.line }}>
                {g}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border" style={{ borderColor: C.line }}>
              <button onClick={() => setQ(Math.max(1, q - 1))} className="grid size-11 place-items-center text-lg" aria-label="Manje">
                −
              </button>
              <span className="w-6 text-center font-bold">{q}</span>
              <button onClick={() => setQ(q + 1)} className="grid size-11 place-items-center text-lg" aria-label="Više">
                +
              </button>
            </div>
            <button
              onClick={() => {
                onAdd({ p, size, grind, q });
                onClose();
              }}
              className="flex flex-1 items-center justify-between rounded-full px-6 py-3.5 font-bold text-white"
              style={{ background: C.green }}
            >
              <span>U korpu</span>
              <span>{km(price * q)}</span>
            </button>
          </div>
          <p className="mt-4 text-xs" style={{ color: C.muted }}>
            Prženo svakog utorka. Šaljemo u roku od 48 h.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Checkout({ lines, total, onDone, onBack }: { lines: Line[]; total: number; onDone: () => void; onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [pay, setPay] = useState("Kartica");
  const field = "w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-[#23402f]";
  if (step === 2)
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 12 }} className="grid size-20 place-items-center rounded-full text-3xl text-white" style={{ background: C.green }}>
          ✓
        </motion.div>
        <p className="mt-6 text-4xl" style={serif}>
          Hvala!
        </p>
        <p className="mt-2" style={{ color: C.muted }}>
          Narudžba <b style={mono}>#ZR-1042</b> je primljena. Potvrda stiže na email.
        </p>
        <button onClick={onDone} className="mt-8 rounded-full px-8 py-3.5 font-bold text-white" style={{ background: C.ink }}>
          Nazad u shop
        </button>
        <p className="mt-4 text-xs" style={{ color: C.muted }}>
          Demo: ništa nije naplaćeno ni poslano.
        </p>
      </div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(step + 1);
      }}
      className="flex flex-1 flex-col overflow-y-auto p-5"
    >
      <button type="button" onClick={step ? () => setStep(0) : onBack} className="mb-4 self-start text-sm underline" style={{ color: C.muted }}>
        ← Nazad
      </button>
      <div className="mb-5 flex gap-2 text-xs font-bold tracking-widest uppercase">
        {["Dostava", "Plaćanje"].map((s, i) => (
          <span key={s} className="flex-1 border-t-2 pt-2" style={{ borderColor: i <= step ? C.green : C.line, opacity: i <= step ? 1 : 0.4 }}>
            {i + 1}. {s}
          </span>
        ))}
      </div>
      {step === 0 ? (
        <div className="grid gap-3">
          <input required placeholder="Ime i prezime" className={field} style={{ borderColor: C.line }} />
          <input required type="email" placeholder="Email" className={field} style={{ borderColor: C.line }} />
          <input required placeholder="Adresa" className={field} style={{ borderColor: C.line }} />
          <div className="grid grid-cols-[1fr_120px] gap-3">
            <input required placeholder="Grad" className={field} style={{ borderColor: C.line }} />
            <input required placeholder="Poštanski br." inputMode="numeric" className={field} style={{ borderColor: C.line }} />
          </div>
          <input required placeholder="Telefon" inputMode="tel" className={field} style={{ borderColor: C.line }} />
        </div>
      ) : (
        <div className="grid gap-2">
          {["Kartica", "Pouzeće", "Uplata na račun"].map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setPay(m)}
              className="flex items-center justify-between rounded-xl border p-4 text-left font-semibold"
              style={pay === m ? { borderColor: C.green, background: C.green + "0f" } : { borderColor: C.line }}
            >
              {m}
              <span className="grid size-5 place-items-center rounded-full border-2" style={{ borderColor: pay === m ? C.green : C.line }}>
                {pay === m && <span className="size-2.5 rounded-full" style={{ background: C.green }} />}
              </span>
            </button>
          ))}
          {pay === "Kartica" && (
            <p className="rounded-xl p-3 text-xs" style={{ background: C.orange + "14", color: C.orange }}>
              U pravom shopu ovdje je sigurna forma banke ili payment providera. U demu se kartica ne unosi.
            </p>
          )}
          <ul className="mt-3 grid gap-1 text-sm" style={{ color: C.muted }}>
            {lines.map((l) => (
              <li key={l.key} className="flex justify-between">
                <span>
                  {l.q}× {l.p.name} · {l.size.label}
                </span>
                <span>{km(Math.round(l.p.price * l.size.k) * l.q)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="mt-auto w-full rounded-full py-4 font-bold text-white" style={{ background: C.green, marginTop: 24 }}>
        {step === 0 ? "Nastavi na plaćanje" : `Plati ${km(total)}`}
      </button>
    </form>
  );
}

export default function Shop() {
  const [filter, setFilter] = useState<"Sve" | Product["type"]>("Sve");
  const [view, setView] = useState<Product | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [bump, setBump] = useState(0);

  const add = (l: Omit<Line, "key">) => {
    const key = `${l.p.id}-${l.size.id}-${l.grind}`;
    setLines((ls) => {
      const ex = ls.find((x) => x.key === key);
      return ex ? ls.map((x) => (x.key === key ? { ...x, q: x.q + l.q } : x)) : [...ls, { ...l, key }];
    });
    setBump((b) => b + 1);
  };
  const setQty = (key: string, q: number) => setLines((ls) => (q <= 0 ? ls.filter((x) => x.key !== key) : ls.map((x) => (x.key === key ? { ...x, q } : x))));
  const count = lines.reduce((a, l) => a + l.q, 0);
  const subtotal = lines.reduce((a, l) => a + Math.round(l.p.price * l.size.k) * l.q, 0);
  const ship = subtotal >= FREE || subtotal === 0 ? 0 : SHIP;
  const total = subtotal + ship;
  const toFree = Math.max(0, FREE - subtotal);
  const shown = products.filter((p) => filter === "Sve" || p.type === filter);

  return (
    <div style={{ background: C.bg, color: C.ink }} className="min-h-screen">
      <div className="py-2 text-center text-xs font-semibold" style={{ background: C.green, color: C.bg }}>
        Besplatna dostava za narudžbe iznad {FREE} KM · Prženo svakog utorka
      </div>
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: C.line, background: C.bg + "e6" }}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <a href="#" className="text-3xl" style={serif}>
            zrno<span style={{ color: C.orange }}>.</span>
          </a>
          <div className="hidden gap-8 text-sm font-semibold md:flex">
            <a href="#shop">Kafe</a>
            <a href="#pretplata">Pretplata</a>
            <a href="#o-nama">O nama</a>
          </div>
          <button onClick={() => setOpen(true)} className="relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold" style={{ borderColor: C.ink }}>
            Korpa
            <motion.span key={bump} initial={{ scale: 1.7 }} animate={{ scale: 1 }} className="grid min-w-6 place-items-center rounded-full px-1.5 text-xs text-white" style={{ background: C.orange }}>
              {count}
            </motion.span>
          </button>
        </nav>
      </header>

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
              <a href="#shop" className="rounded-full px-7 py-4 font-bold text-white" style={{ background: C.green }}>
                Pogledaj kafe
              </a>
              <a href="#pretplata" className="rounded-full border px-7 py-4 font-bold" style={{ borderColor: C.ink }}>
                Pretplata −15%
              </a>
            </div>
          </div>
          <div className="rise relative grid place-items-center" style={{ animationDelay: "0.2s" }}>
            <div className="absolute size-[80%] rounded-full" style={{ background: C.orange, opacity: 0.12 }} aria-hidden />
            <Tilt>
              <Bag p={products[1]} className="relative w-[min(340px,70vw)] drop-shadow-[0_40px_40px_rgba(0,0,0,0.25)]" />
            </Tilt>
            <span className="absolute top-8 right-4 rotate-6 rounded-full px-4 py-2 text-sm font-bold text-white sm:right-10" style={{ background: C.ink }}>
              Novo: Etiopija Guji
            </span>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="scroll-mt-20 px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-5xl sm:text-7xl" style={serif}>
              Naše kafe
            </h2>
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {(["Sve", "Espresso", "Filter", "Bez kofeina"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition"
                  style={filter === f ? { background: C.ink, color: C.bg, borderColor: C.ink } : { borderColor: C.line }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => (
                <motion.article
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ ease, duration: 0.4 }}
                  className="group overflow-hidden rounded-[1.75rem]"
                  style={{ background: C.card }}
                >
                  <button onClick={() => setView(p)} className="relative grid aspect-[4/3.4] w-full place-items-center" style={{ background: p.bag + "1a" }} aria-label={`Detalji: ${p.name}`}>
                    {p.isNew && (
                      <span className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: C.orange }}>
                        Novo
                      </span>
                    )}
                    <Bag p={p} className="w-[44%] drop-shadow-[0_24px_24px_rgba(0,0,0,0.2)] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-4deg]" />
                  </button>
                  <div className="flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="text-xs tracking-widest uppercase" style={{ ...mono, color: C.muted }}>
                        {p.origin}
                      </p>
                      <h3 className="mt-1 text-2xl" style={serif}>
                        {p.name}
                      </h3>
                      <p className="text-sm" style={{ color: C.muted }}>
                        {p.notes.join(", ")}
                      </p>
                      <p className="mt-2 font-bold">od {km(p.price)}</p>
                    </div>
                    <button
                      onClick={() => add({ p, size: SIZES[0], grind: GRINDS[0], q: 1 })}
                      className="grid size-12 shrink-0 place-items-center rounded-full text-xl text-white transition hover:scale-110"
                      style={{ background: C.green }}
                      aria-label={`Brzo dodaj ${p.name}`}
                    >
                      +
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Subscription + about */}
      <section id="pretplata" className="scroll-mt-20 px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-[2rem] p-8 text-white sm:p-12" style={{ background: C.green }}>
            <p className="text-xs tracking-widest uppercase opacity-70" style={mono}>
              Pretplata
            </p>
            <p className="mt-4 max-w-lg text-5xl leading-tight sm:text-6xl" style={serif}>
              Svježa kafa svake <em style={{ color: "#f0b48a" }}>dvije sedmice.</em>
            </p>
            <p className="mt-4 max-w-md opacity-80">15% jeftinije, besplatna dostava, pauza ili otkaz jednim klikom.</p>
            <button className="mt-8 rounded-full px-7 py-4 font-bold" style={{ background: C.bg, color: C.ink }}>
              Pokreni pretplatu
            </button>
            <div className="absolute -right-10 -bottom-16 hidden w-64 rotate-12 opacity-90 sm:block" aria-hidden>
              <Bag p={products[3]} className="w-full" />
            </div>
          </div>
          <div id="o-nama" className="scroll-mt-20 rounded-[2rem] p-8 sm:p-12" style={{ background: C.card }}>
            <p className="text-xs tracking-widest uppercase" style={{ ...mono, color: C.muted }}>
              O nama
            </p>
            <p className="mt-4 text-3xl leading-snug" style={serif}>
              Mala pržionica, mala serija, velika pažnja.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                ["6", "kafa u ponudi"],
                ["48h", "od prženja do slanja"],
                ["100%", "arabica"],
              ].map(([a, b]) => (
                <div key={a}>
                  <p className="text-3xl" style={serif}>
                    {a}
                  </p>
                  <p className="text-xs" style={{ color: C.muted }}>
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 pt-16 pb-28 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 border-t pt-8" style={{ borderColor: C.line }}>
          <p className="text-6xl" style={serif}>
            zrno<span style={{ color: C.orange }}>.</span>
          </p>
          <p className="text-xs" style={{ color: C.muted }}>
            Izmišljena pržionica. Demo web shop koji je napravio CodeCraft.
          </p>
        </div>
      </footer>

      <AnimatePresence>{view && <ProductModal p={view} onClose={() => setView(null)} onAdd={add} />}</AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col"
              style={{ background: C.bg }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease, duration: 0.45 }}
            >
              <div className="flex items-center justify-between border-b p-5" style={{ borderColor: C.line }}>
                <p className="text-3xl" style={serif}>
                  {checkout ? "Naplata" : "Korpa"}
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    setCheckout(false);
                  }}
                  className="grid size-10 place-items-center rounded-full border"
                  style={{ borderColor: C.line }}
                  aria-label="Zatvori"
                >
                  ✕
                </button>
              </div>
              {checkout ? (
                <Checkout
                  lines={lines}
                  total={total}
                  onBack={() => setCheckout(false)}
                  onDone={() => {
                    setLines([]);
                    setCheckout(false);
                    setOpen(false);
                  }}
                />
              ) : (
                <>
                  <div className="p-5 pb-0">
                    <p className="text-sm font-semibold">{toFree > 0 ? `Još ${km(toFree)} do besplatne dostave` : "Dostava je besplatna 🎉"}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: C.line }}>
                      <motion.div className="h-full rounded-full" style={{ background: C.green }} animate={{ width: `${Math.min(100, (subtotal / FREE) * 100)}%` }} />
                    </div>
                  </div>
                  <ul className="flex-1 overflow-y-auto p-5">
                    {lines.length === 0 && <li className="py-16 text-center" style={{ color: C.muted }}>Korpa je prazna.</li>}
                    {lines.map((l) => (
                      <li key={l.key} className="flex gap-3 border-b py-4" style={{ borderColor: C.line }}>
                        <div className="grid size-20 shrink-0 place-items-center rounded-2xl" style={{ background: l.p.bag + "1a" }}>
                          <Bag p={l.p} className="w-10" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold">{l.p.name}</p>
                          <p className="text-xs" style={{ color: C.muted }}>
                            {l.size.label} · {l.grind}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-full border" style={{ borderColor: C.line }}>
                              <button onClick={() => setQty(l.key, l.q - 1)} className="grid size-8 place-items-center" aria-label="Manje">
                                −
                              </button>
                              <span className="w-5 text-center text-sm font-bold">{l.q}</span>
                              <button onClick={() => setQty(l.key, l.q + 1)} className="grid size-8 place-items-center" aria-label="Više">
                                +
                              </button>
                            </div>
                            <span className="font-bold">{km(Math.round(l.p.price * l.size.k) * l.q)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t p-5" style={{ borderColor: C.line }}>
                    <div className="grid gap-1.5 text-sm" style={mono}>
                      <p className="flex justify-between" style={{ color: C.muted }}>
                        <span>Međuzbir</span>
                        <span>{km(subtotal)}</span>
                      </p>
                      <p className="flex justify-between" style={{ color: C.muted }}>
                        <span>Dostava</span>
                        <span>{ship ? km(ship) : "besplatna"}</span>
                      </p>
                      <p className="mt-1 flex justify-between text-lg font-bold">
                        <span>Ukupno</span>
                        <span>{km(total)}</span>
                      </p>
                    </div>
                    <button disabled={!count} onClick={() => setCheckout(true)} className="mt-5 w-full rounded-full py-4 font-bold text-white disabled:opacity-30" style={{ background: C.green }}>
                      Na naplatu
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <DemoBadge />
    </div>
  );
}
