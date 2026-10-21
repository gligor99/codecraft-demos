"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { faq, products, type Product } from "./data";
import { C, km, mono, serif } from "./theme";
import { Bag, ProductCard, QuickView, useCart } from "./ui";

const TYPES = ["Sve", "Espresso", "Filter", "Bez kofeina"] as const;
const SORTS = { pop: "Najpopularnije", cheap: "Cijena ↑", exp: "Cijena ↓", new: "Novo" } as const;

export function Catalog({ limit }: { limit?: number }) {
  const [type, setType] = useState<(typeof TYPES)[number]>("Sve");
  const [region, setRegion] = useState("Sve regije");
  const [sort, setSort] = useState<keyof typeof SORTS>("pop");
  const [q, setQ] = useState("");
  const [view, setView] = useState<Product | null>(null);
  const regions = ["Sve regije", ...Array.from(new Set(products.map((p) => p.region)))];

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (type === "Sve" || p.type === type) &&
        (region === "Sve regije" || p.region === region) &&
        (!term || [p.name, p.origin, ...p.notes].join(" ").toLowerCase().includes(term)),
    );
    const sorted = [...list].sort((a, b) =>
      sort === "cheap" ? a.price - b.price : sort === "exp" ? b.price - a.price : sort === "new" ? Number(!!b.isNew) - Number(!!a.isNew) : b.reviews - a.reviews,
    );
    return limit ? sorted.slice(0, limit) : sorted;
  }, [type, region, sort, q, limit]);

  return (
    <>
      {!limit && (
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Traži: čokolada, Etiopija, espresso..." className="rounded-full border bg-white px-5 py-3 outline-none focus:border-[#23402f]" style={{ borderColor: C.line }} aria-label="Pretraga" />
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-full border bg-white px-5 py-3 font-semibold" style={{ borderColor: C.line }} aria-label="Regija">
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof SORTS)} className="rounded-full border bg-white px-5 py-3 font-semibold" style={{ borderColor: C.line }} aria-label="Sortiranje">
            {Object.entries(SORTS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {TYPES.map((f) => (
          <button key={f} onClick={() => setType(f)} className="shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition" style={type === f ? { background: C.ink, color: C.bg, borderColor: C.ink } : { borderColor: C.line }}>
            {f}
          </button>
        ))}
        {!limit && (
          <span className="ml-auto shrink-0 self-center text-sm" style={{ color: C.muted }}>
            {shown.length} {shown.length === 1 ? "kafa" : "kafa"}
          </span>
        )}
      </div>
      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div layout key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <ProductCard p={p} onQuick={setView} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && (
        <p className="py-16 text-center" style={{ color: C.muted }}>
          Nema kafe za ovu pretragu.
        </p>
      )}
      <AnimatePresence>{view && <QuickView p={view} onClose={() => setView(null)} />}</AnimatePresence>
    </>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t" style={{ borderColor: C.line }}>
      {faq.map((f, i) => (
        <div key={f.q} className="border-b" style={{ borderColor: C.line }}>
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left" aria-expanded={open === i}>
            <span className="text-2xl" style={serif}>
              {f.q}
            </span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full border text-lg" style={{ borderColor: C.line }}>
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="max-w-2xl overflow-hidden pb-5" style={{ color: C.muted }}>
                {f.a}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const FREQ = [
  { id: "1", label: "Svake sedmice", per: 4 },
  { id: "2", label: "Svake 2 sedmice", per: 2 },
  { id: "4", label: "Jednom mjesečno", per: 1 },
];

export function SubscriptionBuilder() {
  const { add, open } = useCart();
  const [mode, setMode] = useState<"izbor" | "iznenadi">("iznenadi");
  const [pid, setPid] = useState(products[0].id);
  const [freq, setFreq] = useState(FREQ[1]);
  const [bags, setBags] = useState(1);
  const [done, setDone] = useState(false);
  const p = products.find((x) => x.id === pid)!;
  const unit = mode === "iznenadi" ? 22 : p.price;
  const perDelivery = Math.round(unit * bags * 0.85 * 100) / 100;
  const month = perDelivery * freq.per;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="grid gap-6 rounded-[2rem] p-6 sm:p-8" style={{ background: C.card }}>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase">1. Koju kafu?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(["iznenadi", "izbor"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className="rounded-2xl border p-4 text-left transition" style={mode === m ? { borderColor: C.green, background: C.green + "0f" } : { borderColor: C.line }}>
                <span className="block font-bold">{m === "iznenadi" ? "Iznenadi me" : "Uvijek ista"}</span>
                <span className="text-sm" style={{ color: C.muted }}>
                  {m === "iznenadi" ? "Svaki put druga sezonska kafa" : "Izaberite omiljenu"}
                </span>
              </button>
            ))}
          </div>
          {mode === "izbor" && (
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
              {products.map((x) => (
                <button key={x.id} onClick={() => setPid(x.id)} className="flex shrink-0 items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-semibold" style={pid === x.id ? { borderColor: C.ink, background: C.ink, color: C.bg } : { borderColor: C.line }}>
                  <span className="grid size-7 place-items-center rounded-full" style={{ background: x.bag }} />
                  {x.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase">2. Koliko često?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {FREQ.map((f) => (
              <button key={f.id} onClick={() => setFreq(f)} className="rounded-xl border py-3 text-sm font-semibold" style={freq.id === f.id ? { background: C.ink, color: C.bg, borderColor: C.ink } : { borderColor: C.line }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase">3. Koliko kesica (250 g)?</p>
          <div className="mt-3 flex items-center gap-3">
            {[1, 2, 3, 4].map((n) => (
              <button key={n} onClick={() => setBags(n)} className="grid size-14 place-items-center rounded-2xl border text-xl font-bold" style={bags === n ? { background: C.ink, color: C.bg, borderColor: C.ink } : { borderColor: C.line }}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
      <aside className="flex flex-col rounded-[2rem] p-6 text-white sm:p-8" style={{ background: C.green }}>
        <div className="flex items-start justify-between">
          <p className="text-xs tracking-widest uppercase opacity-70" style={mono}>
            Vaša pretplata
          </p>
          <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: C.orange }}>
            −15%
          </span>
        </div>
        <div className="my-6 flex items-end gap-2">
          {Array.from({ length: bags }, (_, i) => (
            <motion.div key={i + pid + mode} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.06 }} className="w-16">
              <Bag p={mode === "izbor" ? p : products[(i + 1) % products.length]} className="w-full" />
            </motion.div>
          ))}
        </div>
        <p className="text-3xl" style={serif}>
          {mode === "iznenadi" ? "Sezonsko iznenađenje" : p.name}
        </p>
        <p className="opacity-70">
          {bags} × 250 g · {freq.label.toLowerCase()}
        </p>
        <div className="mt-auto pt-8">
          <p className="flex items-end justify-between">
            <span className="opacity-70">Po dostavi</span>
            <motion.b key={perDelivery} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl" style={serif}>
              {km(perDelivery)}
            </motion.b>
          </p>
          <p className="mt-1 text-right text-sm opacity-70">≈ {km(month)} mjesečno · dostava besplatna</p>
          <button
            onClick={() => {
              add(mode === "izbor" ? p.id : "p2", "250", "Zrno", bags);
              setDone(true);
              open();
            }}
            className="mt-5 w-full rounded-full py-4 font-bold"
            style={{ background: C.bg, color: C.ink }}
          >
            {done ? "Dodano u korpu ✓" : "Pokreni pretplatu"}
          </button>
          <p className="mt-3 text-center text-xs opacity-60">Pauza ili otkaz jednim klikom, bilo kada.</p>
        </div>
      </aside>
    </div>
  );
}
