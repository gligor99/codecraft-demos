"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { cats, hours, menu, type Dish } from "./data";
import { B, C, DELIVERY, accent, ease, km, mono } from "./theme";

const FREE_DELIVERY = 40;

const links = [
  { href: `${B}/meni`, label: "Meni" },
  { href: `${B}/o-nama`, label: "Naša priča" },
  { href: `${B}/catering`, label: "Catering" },
  { href: `${B}/kontakt`, label: "Kontakt" },
];

// Top-down "plate" illustration generated from the dish colours.
export function Plate({ hue, seed = 0, className = "" }: { hue: [string, string]; seed?: number; className?: string }) {
  const bits = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 + seed;
    const r = 18 + ((i * 13 + seed * 7) % 14);
    return { x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r, s: 7 + ((i * 5 + seed) % 7) };
  });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id={`p${seed}-${hue[0].slice(1)}`} cx="0.4" cy="0.35">
          <stop offset="0" stopColor={hue[1]} />
          <stop offset="1" stopColor={hue[0]} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#f5ead7" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#00000014" strokeWidth="6" />
      <circle cx="50" cy="50" r="36" fill={`url(#p${seed}-${hue[0].slice(1)})`} />
      {bits.map((b, i) => (
        <ellipse key={i} cx={b.x} cy={b.y} rx={b.s} ry={b.s * 0.55} transform={`rotate(${i * 40 + seed * 10} ${b.x} ${b.y})`} fill={i % 2 ? hue[1] : "#fff"} opacity={i % 2 ? 0.9 : 0.25} />
      ))}
      <circle cx="40" cy="38" r="5" fill="#fff" opacity="0.35" />
    </svg>
  );
}

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, accentText, text }: { eyebrow: string; title: string; accentText: string; text?: string }) {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-12 sm:px-8 sm:pt-40">
      <div className="pointer-events-none absolute -top-20 -right-40 size-[600px] rounded-full blur-3xl" style={{ background: `radial-gradient(closest-side, ${C.ember}44, transparent)` }} aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <p className="rise text-xs tracking-widest uppercase opacity-70" style={mono}>
          {eyebrow}
        </p>
        <h1 className="rise mt-4 text-[11.5vw] leading-[0.85] font-extrabold tracking-[-0.04em] uppercase sm:text-8xl">
          {title} <span style={{ ...accent, color: C.amber, textTransform: "none", fontWeight: 400 }}>{accentText}</span>
        </h1>
        {text && (
          <p className="rise mt-6 max-w-xl text-lg opacity-75" style={{ animationDelay: "0.1s" }}>
            {text}
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- Cart (shared across pages) ---------- */

type Mode = "dostava" | "preuzimanje";
type CartCtx = { cart: Record<string, number>; add: (id: string, d?: number) => void; open: () => void };
const Cart = createContext<CartCtx | null>(null);
export const useCart = () => useContext(Cart)!;

function deliveryFee(mode: Mode, subtotal: number) {
  return mode === "dostava" && subtotal > 0 && subtotal < FREE_DELIVERY ? DELIVERY : 0;
}

const STATUS = ["Primljeno", "U pripremi", "Na putu", "Dostavljeno"];

function Tracker({ mode, total, onClose }: { mode: Mode; total: number; onClose: () => void }) {
  const [s, setS] = useState(0);
  const labels = mode === "dostava" ? STATUS : ["Primljeno", "U pripremi", "Spremno", "Preuzeto"];
  useEffect(() => {
    if (s >= 3) return;
    const t = setTimeout(() => setS(s + 1), 2600);
    return () => clearTimeout(t);
  }, [s]);
  return (
    <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ease, duration: 0.5 }} className="w-full max-w-md rounded-[2rem] p-7" style={{ background: C.panel, color: C.cream }}>
        <p className="text-xs tracking-widest uppercase opacity-60" style={mono}>
          Narudžba #KM-2047
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight">
          {labels[s]}
          <span style={{ color: C.amber }}>.</span>
        </p>
        <p className="mt-1 text-sm opacity-60">{s < 3 ? (mode === "dostava" ? `Stiže za otprilike ${30 - s * 9} min` : "Javimo SMS-om kad je spremno") : "Prijatno!"}</p>
        <div className="relative mt-8 grid grid-cols-4">
          <div className="absolute top-3 right-[12.5%] left-[12.5%] h-0.5" style={{ background: C.line }} />
          <motion.div className="absolute top-3 left-[12.5%] h-0.5 origin-left" style={{ background: C.amber, width: "75%" }} animate={{ scaleX: s / 3 }} transition={{ duration: 0.8, ease }} />
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

export function DishCard({ m, i }: { m: Dish; i: number }) {
  const { cart, add } = useCart();
  const q = cart[m.id] ?? 0;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: (i % 6) * 0.04, ease }}
      className="group relative overflow-hidden rounded-[1.75rem] border p-5"
      style={{ borderColor: C.line, background: C.panel }}
    >
      <div className="absolute top-4 left-4 flex gap-1.5">
        {m.tag && (
          <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: C.ember }}>
            {m.tag}
          </span>
        )}
        {m.veg && <span className="rounded-full bg-green-700/80 px-2.5 py-1 text-[11px] font-bold">🌿 Veg</span>}
      </div>
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
          <button onClick={() => add(m.id)} aria-label={`Dodaj ${m.name}`} className="grid size-12 shrink-0 place-items-center rounded-full text-2xl font-bold transition hover:scale-110" style={{ background: C.amber, color: C.bg }}>
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
}

export function MenuBrowser({ sticky = true }: { sticky?: boolean }) {
  const [cat, setCat] = useState(cats[0]);
  const [veg, setVeg] = useState(false);
  const shown = menu.filter((m) => m.cat === cat && (!veg || m.veg));
  return (
    <>
      <div className={`no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 py-3 backdrop-blur-xl sm:mx-0 sm:px-0 ${sticky ? "sticky top-[61px] z-40" : ""}`} style={{ background: C.bg + "d9" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className="relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold" style={{ color: cat === c ? C.bg : C.cream }}>
            {cat === c && <motion.span layoutId={`cat-${sticky}`} className="absolute inset-0 rounded-full" style={{ background: C.cream }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
        <button onClick={() => setVeg(!veg)} aria-pressed={veg} className="ml-auto shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold" style={veg ? { background: "#15803d", borderColor: "#15803d" } : { borderColor: C.line }}>
          🌿 Samo veg
        </button>
      </div>
      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((m, i) => (
            <DishCard key={m.id} m={m} i={i} />
          ))}
        </AnimatePresence>
        {shown.length === 0 && <p className="py-12 opacity-60">U ovoj kategoriji nema vegetarijanskih jela.</p>}
      </motion.div>
    </>
  );
}

export function RestoranShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("dostava");
  const [ordered, setOrdered] = useState<{ total: number; mode: Mode } | null>(null);
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
  const fee = deliveryFee(mode, subtotal);
  const total = subtotal + fee;

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen || open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen, open]);

  return (
    <Cart.Provider value={{ cart, add, open: () => setOpen(true) }}>
      <div style={{ background: C.bg, color: C.cream }} className="min-h-screen">
        <header className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: C.line, background: C.bg + "d9" }}>
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-8">
            <Link href={B} onClick={() => setMenuOpen(false)} className="text-xl font-extrabold tracking-tight whitespace-nowrap uppercase">
              Konoba <span style={{ color: C.amber }}>Most</span>
            </Link>
            <div className="hidden gap-1 text-sm md:flex">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="relative rounded-full px-4 py-2">
                  {path === l.href && <motion.span layoutId="rest-nav" className="absolute inset-0 rounded-full" style={{ background: C.cream + "14" }} />}
                  <span className="relative">{l.label}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Link href={`${B}/rezervacija`} className="hidden rounded-full border px-4 py-2.5 text-sm font-bold sm:block" style={{ borderColor: C.line }}>
                Rezerviši sto
              </Link>
              <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold" style={{ background: C.amber, color: C.bg }}>
                Korpa
                <motion.span key={bump} initial={{ scale: 1.6 }} animate={{ scale: 1 }} className="grid min-w-6 place-items-center rounded-full px-1.5 text-xs" style={{ background: C.bg, color: C.amber }}>
                  {count}
                </motion.span>
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center rounded-full border md:hidden" style={{ borderColor: C.line }} aria-label="Meni" aria-expanded={menuOpen}>
                <span className="relative block h-2.5 w-4">
                  <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition ${menuOpen ? "top-1 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition ${menuOpen ? "top-1 -rotate-45" : "top-2.5"}`} />
                </span>
              </button>
            </div>
          </nav>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div className="fixed inset-0 z-40 flex flex-col px-6 pt-24 pb-10 md:hidden" style={{ background: C.bg }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[{ href: B, label: "Početna" }, ...links, { href: `${B}/rezervacija`, label: "Rezervacija" }].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={l.href} onClick={() => setMenuOpen(false)} className="block border-b py-4 text-4xl font-extrabold uppercase" style={{ borderColor: C.line, color: path === l.href ? C.amber : C.cream }}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <p className="mt-auto text-sm opacity-60" style={mono}>
                +387 61 000 000 · Ulica primjera 7
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <main>{children}</main>

        <footer className="border-t px-4 pt-20 pb-28 sm:px-8" style={{ borderColor: C.line }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-4">
              <div className="md:col-span-2">
                <p className="text-5xl font-extrabold tracking-tight uppercase sm:text-6xl">
                  Konoba <span style={{ color: C.amber }}>Most</span>
                </p>
                <p className="mt-4 max-w-sm text-xl opacity-80" style={accent}>
                  Vatra, sač i strpljenje od 1974.
                </p>
              </div>
              <div className="text-sm" style={mono}>
                <p className="text-xs tracking-widest uppercase opacity-50">Radno vrijeme</p>
                <ul className="mt-4 grid gap-2">
                  {hours.map(([d, h]) => (
                    <li key={d} className="flex justify-between gap-4">
                      <span className="opacity-60">{d}</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-sm">
                <p className="text-xs tracking-widest uppercase opacity-50" style={mono}>
                  Konoba
                </p>
                <ul className="mt-4 grid gap-2">
                  {[{ href: B, label: "Početna" }, ...links, { href: `${B}/rezervacija`, label: "Rezervacija stola" }].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="opacity-70 hover:opacity-100">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-16 flex flex-wrap justify-between gap-4 border-t pt-6 text-xs opacity-50" style={{ borderColor: C.line }}>
              <p>© 2026 Konoba Most · Ulica primjera 7 · +387 61 000 000</p>
              <p>Izmišljen restoran. Demo sajt koji je napravio CodeCraft.</p>
            </div>
          </div>
        </footer>

        {/* Cart drawer */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div className="fixed inset-0 z-[60] bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
              <motion.aside className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col" style={{ background: C.panel }} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ ease, duration: 0.45 }}>
                <div className="flex items-center justify-between border-b p-5" style={{ borderColor: C.line }}>
                  <p className="text-2xl font-extrabold">Vaša narudžba</p>
                  <button onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full border" style={{ borderColor: C.line }} aria-label="Zatvori">
                    ✕
                  </button>
                </div>
                <div className="flex gap-1 p-5 pb-0">
                  {(["dostava", "preuzimanje"] as const).map((m) => (
                    <button key={m} onClick={() => setMode(m)} className="flex-1 rounded-full py-2.5 text-sm font-bold capitalize transition" style={mode === m ? { background: C.cream, color: C.bg } : { border: `1px solid ${C.line}` }}>
                      {m}
                    </button>
                  ))}
                </div>
                {mode === "dostava" && subtotal > 0 && subtotal < FREE_DELIVERY && (
                  <p className="px-5 pt-3 text-xs opacity-70">Još {km(FREE_DELIVERY - subtotal)} do besplatne dostave.</p>
                )}
                <ul className="flex-1 overflow-y-auto p-5">
                  {lines.length === 0 && (
                    <li className="py-16 text-center opacity-60">
                      Korpa je prazna.{" "}
                      <Link href={`${B}/meni`} onClick={() => setOpen(false)} className="underline" style={{ color: C.amber }}>
                        Otvori meni
                      </Link>
                    </li>
                  )}
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
                      <span>{mode === "preuzimanje" || subtotal === 0 ? "—" : fee ? km(fee) : "besplatna"}</span>
                    </p>
                    <p className="mt-2 flex justify-between text-lg font-bold">
                      <span>Ukupno</span>
                      <span style={{ color: C.amber }}>{km(total)}</span>
                    </p>
                  </div>
                  <button
                    disabled={!count}
                    onClick={() => {
                      setOrdered({ total, mode });
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

        <AnimatePresence>
          {count > 0 && !open && (
            <motion.button initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} onClick={() => setOpen(true)} className="fixed inset-x-4 bottom-16 z-50 flex items-center justify-between rounded-full px-6 py-4 font-bold shadow-2xl md:hidden" style={{ background: C.amber, color: C.bg }}>
              <span>Korpa · {count}</span>
              <span>{km(subtotal)} →</span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>{ordered && <Tracker mode={ordered.mode} total={ordered.total} onClose={() => setOrdered(null)} />}</AnimatePresence>
        <DemoBadge />
      </div>
    </Cart.Provider>
  );
}
