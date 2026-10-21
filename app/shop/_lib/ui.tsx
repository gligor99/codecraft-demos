"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import DemoBadge from "@/components/DemoBadge";
import { GRINDS, SIZES, products, type Product } from "./data";
import { B, C, FREE, SHIP, ease, km, mono, serif } from "./theme";

const links = [
  { href: `${B}/proizvodi`, label: "Kafe" },
  { href: `${B}/pretplata`, label: "Pretplata" },
  { href: `${B}/o-nama`, label: "O nama" },
  { href: `${B}/dostava`, label: "Dostava i FAQ" },
];

/* ---------- Art ---------- */

// Coffee bag illustration: pouch with a coloured label, valve and roast dots.
export function Bag({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden>
      <path d="M22 18 L98 18 L104 150 Q60 158 16 150 Z" fill={p.bag} />
      <path d="M22 18 L98 18 L96 30 L24 30 Z" fill="#000" opacity="0.18" />
      <path d="M22 18 L30 150" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" />
      <rect x="32" y="54" width="56" height="64" rx="6" fill={p.label} />
      <text x="60" y="80" textAnchor="middle" fontSize={p.name.split(" ")[0].length > 6 ? 10 : 13} fontFamily="var(--f-display)" fill={C.ink}>
        {p.name.split(" ")[0]}
      </text>
      <text x="60" y="94" textAnchor="middle" fontSize="5.5" fontFamily="var(--f-mono)" fill={C.ink} opacity="0.6">
        {p.region.toUpperCase()}
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

export function Tilt({ children }: { children: React.ReactNode }) {
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

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, accent, text }: { eyebrow: string; title: string; accent: string; text?: string }) {
  return (
    <section className="px-4 pt-12 pb-10 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <p className="rise text-xs tracking-widest uppercase" style={{ ...mono, color: C.muted }}>
          {eyebrow}
        </p>
        <h1 className="rise mt-4 text-6xl leading-[0.95] tracking-tight sm:text-8xl" style={serif}>
          {title} <em style={{ color: C.orange }}>{accent}</em>
        </h1>
        {text && (
          <p className="rise mt-5 max-w-xl text-lg" style={{ color: C.muted, animationDelay: "0.1s" }}>
            {text}
          </p>
        )}
      </div>
    </section>
  );
}

export function Stars({ n, size = "text-sm" }: { n: number; size?: string }) {
  return (
    <span className={`${size} tracking-widest`} style={{ color: C.orange }} aria-label={`${n} od 5`}>
      {"★★★★★".slice(0, Math.round(n))}
      <span style={{ color: C.line }}>{"★★★★★".slice(Math.round(n))}</span>
    </span>
  );
}

/* ---------- Cart store (localStorage, survives page changes and reloads) ---------- */

export type Line = { key: string; id: string; size: string; grind: string; q: number };
const KEY = "zrno-cart-v1";
const EMPTY: Line[] = [];
let cache: Line[] | null = null;
const listeners = new Set<() => void>();

function read(): Line[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "[]") as Line[];
  } catch {
    cache = [];
  }
  return cache;
}
function write(next: Line[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage blocked; cart still works for this visit
  }
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

let openDrawer: () => void = () => {};

export function useCart() {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  const add = (id: string, size = SIZES[0].id, grind = GRINDS[0], q = 1) => {
    const key = `${id}-${size}-${grind}`;
    const cur = read();
    const ex = cur.find((x) => x.key === key);
    write(ex ? cur.map((x) => (x.key === key ? { ...x, q: x.q + q } : x)) : [...cur, { key, id, size, grind, q }]);
  };
  const setQty = (key: string, q: number) => write(q <= 0 ? read().filter((x) => x.key !== key) : read().map((x) => (x.key === key ? { ...x, q } : x)));
  const clear = () => write([]);
  const priced = lines.map((l) => {
    const p = products.find((x) => x.id === l.id)!;
    const s = SIZES.find((x) => x.id === l.size)!;
    return { ...l, p, s, unit: Math.round(p.price * s.k) };
  });
  const count = lines.reduce((a, l) => a + l.q, 0);
  const subtotal = priced.reduce((a, l) => a + l.unit * l.q, 0);
  const ship = subtotal >= FREE || subtotal === 0 ? 0 : SHIP;
  return { lines: priced, add, setQty, clear, count, subtotal, ship, total: subtotal + ship, open: () => openDrawer() };
}

/* ---------- Product card + quick view ---------- */

export function ProductCard({ p, onQuick }: { p: Product; onQuick?: (p: Product) => void }) {
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <article className="group overflow-hidden rounded-[1.75rem]" style={{ background: C.card }}>
      <Link href={`${B}/proizvod/${p.slug}`} className="relative grid aspect-[4/3.4] place-items-center" style={{ background: p.bag + "1a" }} aria-label={p.name}>
        <span className="absolute top-4 left-4 flex gap-1.5">
          {p.isNew && (
            <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: C.orange }}>
              Novo
            </span>
          )}
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: C.bg }}>
            {p.type}
          </span>
        </span>
        <Bag p={p} className="w-[44%] drop-shadow-[0_24px_24px_rgba(0,0,0,0.2)] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-4deg]" />
        {onQuick && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuick(p);
            }}
            className="absolute right-4 bottom-4 rounded-full px-4 py-2 text-xs font-bold opacity-0 shadow transition group-hover:opacity-100"
            style={{ background: C.bg }}
          >
            Brzi pregled
          </button>
        )}
      </Link>
      <div className="flex items-end justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="truncate text-xs tracking-widest uppercase" style={{ ...mono, color: C.muted }}>
            {p.origin}
          </p>
          <Link href={`${B}/proizvod/${p.slug}`}>
            <h3 className="mt-1 text-2xl" style={serif}>
              {p.name}
            </h3>
          </Link>
          <p className="truncate text-sm" style={{ color: C.muted }}>
            {p.notes.join(", ")}
          </p>
          <p className="mt-2 flex items-center gap-2">
            <b>od {km(p.price)}</b>
            <span className="text-xs" style={{ color: C.muted }}>
              ★ {p.rating.toFixed(1).replace(".", ",")} ({p.reviews})
            </span>
          </p>
        </div>
        <button
          onClick={() => {
            add(p.id);
            setAdded(true);
            setTimeout(() => setAdded(false), 1200);
          }}
          onDoubleClick={open}
          className="grid size-12 shrink-0 place-items-center rounded-full text-xl text-white transition hover:scale-110"
          style={{ background: added ? C.orange : C.green }}
          aria-label={`Brzo dodaj ${p.name}`}
        >
          {added ? "✓" : "+"}
        </button>
      </div>
    </article>
  );
}

export function Options({ p, onAdded }: { p: Product; onAdded?: () => void }) {
  const { add, open } = useCart();
  const [size, setSize] = useState(SIZES[0]);
  const [grind, setGrind] = useState(GRINDS[0]);
  const [q, setQ] = useState(1);
  const price = Math.round(p.price * size.k);
  return (
    <div>
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
            add(p.id, size.id, grind, q);
            onAdded?.();
            open();
          }}
          className="flex flex-1 items-center justify-between rounded-full px-6 py-3.5 font-bold text-white"
          style={{ background: C.green }}
        >
          <span>U korpu</span>
          <span>{km(price * q)}</span>
        </button>
      </div>
    </div>
  );
}

export function QuickView({ p, onClose }: { p: Product; onClose: () => void }) {
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
          <Options p={p} onAdded={onClose} />
          <Link href={`${B}/proizvod/${p.slug}`} className="mt-4 inline-block text-sm underline" style={{ color: C.muted }}>
            Svi detalji o kafi →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Checkout ---------- */

function Checkout({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const { lines, total, ship, clear } = useCart();
  const [step, setStep] = useState(0);
  const [pay, setPay] = useState("Kartica");
  const fieldCls = "w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-[#23402f]";
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
          Narudžba <b style={mono}>#ZR-1042</b> je primljena. Potvrda i broj za praćenje stižu na email.
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
        if (step === 1) clear();
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
          <input required placeholder="Ime i prezime" className={fieldCls} style={{ borderColor: C.line }} />
          <input required type="email" placeholder="Email" className={fieldCls} style={{ borderColor: C.line }} />
          <input required placeholder="Adresa" className={fieldCls} style={{ borderColor: C.line }} />
          <div className="grid grid-cols-[1fr_120px] gap-3">
            <input required placeholder="Grad" className={fieldCls} style={{ borderColor: C.line }} />
            <input required placeholder="Poštanski br." inputMode="numeric" className={fieldCls} style={{ borderColor: C.line }} />
          </div>
          <input required placeholder="Telefon" inputMode="tel" className={fieldCls} style={{ borderColor: C.line }} />
        </div>
      ) : (
        <div className="grid gap-2">
          {["Kartica", "Pouzeće", "Uplata na račun"].map((m) => (
            <button type="button" key={m} onClick={() => setPay(m)} className="flex items-center justify-between rounded-xl border p-4 text-left font-semibold" style={pay === m ? { borderColor: C.green, background: C.green + "0f" } : { borderColor: C.line }}>
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
              <li key={l.key} className="flex justify-between gap-3">
                <span>
                  {l.q}× {l.p.name} · {l.s.label}
                </span>
                <span>{km(l.unit * l.q)}</span>
              </li>
            ))}
            <li className="flex justify-between">
              <span>Dostava</span>
              <span>{ship ? km(ship) : "besplatna"}</span>
            </li>
          </ul>
        </div>
      )}
      <button className="mt-6 w-full rounded-full py-4 font-bold text-white" style={{ background: C.green }}>
        {step === 0 ? "Nastavi na plaćanje" : `Plati ${km(total)}`}
      </button>
    </form>
  );
}

/* ---------- Shell ---------- */

export function ShopShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    openDrawer = () => setOpen(true);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open || menu ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, menu]);

  const toFree = Math.max(0, FREE - cart.subtotal);

  return (
    <div style={{ background: C.bg, color: C.ink }} className="min-h-screen">
      <div className="py-2 text-center text-xs font-semibold" style={{ background: C.green, color: C.bg }}>
        Besplatna dostava iznad {FREE} KM · Prženo utorkom i četvrtkom
      </div>
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: C.line, background: C.bg + "e6" }}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <Link href={B} onClick={() => setMenu(false)} className="text-3xl" style={serif}>
            zrno<span style={{ color: C.orange }}>.</span>
          </Link>
          <div className="hidden gap-1 text-sm font-semibold md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="relative rounded-full px-4 py-2">
                {path === l.href && <motion.span layoutId="shop-nav" className="absolute inset-0 rounded-full" style={{ background: C.ink + "0d" }} />}
                <span className="relative">{l.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold" style={{ borderColor: C.ink }}>
              Korpa
              <motion.span key={cart.count} initial={{ scale: 1.7 }} animate={{ scale: 1 }} className="grid min-w-6 place-items-center rounded-full px-1.5 text-xs text-white" style={{ background: C.orange }}>
                {cart.count}
              </motion.span>
            </button>
            <button onClick={() => setMenu(!menu)} className="grid size-10 place-items-center rounded-full border md:hidden" style={{ borderColor: C.line }} aria-label="Meni" aria-expanded={menu}>
              <span className="relative block h-2.5 w-4">
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition ${menu ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition ${menu ? "top-1 -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {menu && (
            <motion.div className="absolute inset-x-0 top-full h-[100svh] px-6 pt-6 md:hidden" style={{ background: C.bg }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[{ href: B, label: "Početna" }, ...links].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={l.href} onClick={() => setMenu(false)} className="block border-b py-4 text-5xl" style={{ ...serif, borderColor: C.line, color: path === l.href ? C.orange : C.ink }}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      <footer className="mt-12 px-4 pt-16 pb-28 sm:px-8" style={{ background: C.ink, color: C.bg }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-7xl" style={serif}>
                zrno<span style={{ color: C.orange }}>.</span>
              </p>
              <p className="mt-4 max-w-sm opacity-70">Mala pržionica specialty kafe. Pržimo u malim serijama i šaljemo svježe.</p>
              <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Email za nove kafe" className="min-w-0 flex-1 rounded-full border bg-transparent px-4 py-3 text-sm outline-none" style={{ borderColor: C.bg + "33" }} />
                <button className="rounded-full px-5 text-sm font-bold" style={{ background: C.orange }}>
                  Prijava
                </button>
              </form>
            </div>
            <ul className="grid content-start gap-2 text-sm">
              {[{ href: B, label: "Početna" }, ...links].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="opacity-70 hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-sm opacity-70" style={mono}>
              <p>Ulica primjera 3</p>
              <p>pon–pet 08–16h</p>
              <p className="mt-3">hello@zrno.example</p>
              <p className="mt-3">Kartica · Pouzeće · Uplata</p>
            </div>
          </div>
          <p className="mt-14 border-t pt-6 text-xs opacity-50" style={{ borderColor: C.bg + "22" }}>
            © 2026 Zrno · Izmišljena pržionica. Demo web shop koji je napravio CodeCraft.
          </p>
        </div>
      </footer>

      {/* Cart drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col" style={{ background: C.bg }} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ ease, duration: 0.45 }}>
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
                  onBack={() => setCheckout(false)}
                  onDone={() => {
                    setCheckout(false);
                    setOpen(false);
                  }}
                />
              ) : (
                <>
                  <div className="p-5 pb-0">
                    <p className="text-sm font-semibold">{toFree > 0 ? `Još ${km(toFree)} do besplatne dostave` : "Dostava je besplatna 🎉"}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: C.line }}>
                      <motion.div className="h-full rounded-full" style={{ background: C.green }} animate={{ width: `${Math.min(100, (cart.subtotal / FREE) * 100)}%` }} />
                    </div>
                  </div>
                  <ul className="flex-1 overflow-y-auto p-5">
                    {cart.lines.length === 0 && (
                      <li className="py-16 text-center" style={{ color: C.muted }}>
                        Korpa je prazna.{" "}
                        <Link href={`${B}/proizvodi`} onClick={() => setOpen(false)} className="underline" style={{ color: C.green }}>
                          Pogledaj kafe
                        </Link>
                      </li>
                    )}
                    {cart.lines.map((l) => (
                      <li key={l.key} className="flex gap-3 border-b py-4" style={{ borderColor: C.line }}>
                        <div className="grid size-20 shrink-0 place-items-center rounded-2xl" style={{ background: l.p.bag + "1a" }}>
                          <Bag p={l.p} className="w-10" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold">{l.p.name}</p>
                          <p className="text-xs" style={{ color: C.muted }}>
                            {l.s.label} · {l.grind}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-full border" style={{ borderColor: C.line }}>
                              <button onClick={() => cart.setQty(l.key, l.q - 1)} className="grid size-8 place-items-center" aria-label="Manje">
                                −
                              </button>
                              <span className="w-5 text-center text-sm font-bold">{l.q}</span>
                              <button onClick={() => cart.setQty(l.key, l.q + 1)} className="grid size-8 place-items-center" aria-label="Više">
                                +
                              </button>
                            </div>
                            <span className="font-bold">{km(l.unit * l.q)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t p-5" style={{ borderColor: C.line }}>
                    <div className="grid gap-1.5 text-sm" style={mono}>
                      <p className="flex justify-between" style={{ color: C.muted }}>
                        <span>Međuzbir</span>
                        <span>{km(cart.subtotal)}</span>
                      </p>
                      <p className="flex justify-between" style={{ color: C.muted }}>
                        <span>Dostava</span>
                        <span>{cart.ship ? km(cart.ship) : "besplatna"}</span>
                      </p>
                      <p className="mt-1 flex justify-between text-lg font-bold">
                        <span>Ukupno</span>
                        <span>{km(cart.total)}</span>
                      </p>
                    </div>
                    <button disabled={!cart.count} onClick={() => setCheckout(true)} className="mt-5 w-full rounded-full py-4 font-bold text-white disabled:opacity-30" style={{ background: C.green }}>
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
