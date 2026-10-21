"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { faq, gallery, testimonials } from "./data";
import { B, C, ease, palettes, serif } from "./theme";
import { Flow } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t" style={{ borderColor: C.ink + "1a" }}>
      {faq.map((f, i) => (
        <div key={f.q} className="border-b" style={{ borderColor: C.ink + "1a" }}>
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={open === i}>
            <span className="text-xl sm:text-2xl" style={serif}>
              {f.q}
            </span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full border text-lg" style={{ borderColor: C.ink + "33" }}>
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="max-w-2xl overflow-hidden pb-6 opacity-75">
                {f.a}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="min-h-64">
        <p className="text-8xl leading-none" style={{ ...serif, color: C.clay }}>
          “
        </p>
        <AnimatePresence mode="wait">
          <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ ease, duration: 0.5 }}>
            <p className="-mt-6 text-3xl leading-tight sm:text-5xl" style={serif}>
              {t.text}
            </p>
            <footer className="mt-6 flex items-center gap-3 text-sm">
              <span className="text-lg tracking-widest" style={{ color: C.clay }}>
                ★★★★★
              </span>
              <b>{t.name}</b>
              <span className="opacity-60">· {t.service}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {testimonials.map((x, j) => (
          <button
            key={x.name}
            onClick={() => setI(j)}
            className="aspect-square overflow-hidden rounded-full transition"
            style={{ outline: j === i ? `3px solid ${C.clay}` : "none", outlineOffset: 3, opacity: j === i ? 1 : 0.55 }}
            aria-label={`Recenzija: ${x.name}`}
          >
            <Flow seed={j + 30} a={palettes[j % palettes.length][0]} b={palettes[j % palettes.length][1]} className="size-full" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Draggable before/after comparison.
export function BeforeAfter({ seed = 0, label = "Balayage · 3 h" }: { seed?: number; label?: string }) {
  const [x, setX] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    setX(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] cursor-ew-resize touch-none overflow-hidden rounded-[2rem] select-none sm:aspect-[16/10]"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => e.buttons && move(e.clientX)}
      role="slider"
      aria-label="Prije i poslije"
      aria-valuenow={Math.round(x)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setX((v) => Math.max(4, v - 5));
        if (e.key === "ArrowRight") setX((v) => Math.min(96, v + 5));
      }}
    >
      <Flow seed={seed + 40} a="#d9cfc4" b="#8f8378" className="absolute inset-0 size-full grayscale" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
        <Flow seed={seed + 41} a="#f2c9a8" b={C.clay} className="size-full" />
      </div>
      <span className="absolute top-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold backdrop-blur">Prije</span>
      <span className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: C.clay }}>
        Poslije
      </span>
      <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${x}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-sm shadow-xl" style={{ color: C.ink }}>
          ⟷
        </span>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: C.bg }}>
        {label}
      </span>
    </div>
  );
}

export function GalleryGrid() {
  const [cat, setCat] = useState("Sve");
  const cats = ["Sve", "Boja", "Šišanje", "Svečano"];
  const [view, setView] = useState<number | null>(null);
  const shown = gallery.map((g, i) => ({ ...g, i })).filter((g) => cat === "Sve" || g.cat === cat);
  return (
    <>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold"
            style={{ borderColor: C.ink + "26", color: cat === c ? C.bg : C.ink }}
          >
            {cat === c && <motion.span layoutId="gal-cat" className="absolute inset-0 rounded-full" style={{ background: C.ink }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="mt-8 columns-2 gap-3 sm:gap-4 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {shown.map((g) => (
            <motion.button
              layout
              key={g.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setView(g.i)}
              className="group relative mb-3 block w-full overflow-hidden rounded-t-[999px] rounded-b-3xl sm:mb-4"
              style={{ aspectRatio: g.i % 3 === 0 ? "3/4.4" : g.i % 3 === 1 ? "3/3.6" : "3/4" }}
            >
              <Flow seed={g.i + 50} a={palettes[g.i % palettes.length][0]} b={palettes[g.i % palettes.length][1]} className="size-full transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-3 bottom-3 rounded-full px-3 py-1.5 text-left text-xs font-semibold opacity-0 backdrop-blur transition group-hover:opacity-100" style={{ background: C.bg + "d9" }}>
                {g.title} · {g.cat}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {view !== null && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setView(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-[min(480px,90vw)]" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-3xl">
                <Flow seed={view + 50} a={palettes[view % palettes.length][0]} b={palettes[view % palettes.length][1]} className="size-full" />
              </div>
              <div className="mt-4 flex items-center justify-between text-white">
                <p className="text-2xl italic" style={serif}>
                  {gallery[view].title}
                </p>
                <Link href={`${B}/zakazivanje`} className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: C.clay }}>
                  Želim ovo
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-2xl border bg-[#fffaf4] px-4 py-3.5 outline-none focus:border-[#b5532f]";
  if (sent)
    return (
      <div className="grid min-h-80 place-items-center rounded-[2rem] p-8 text-center" style={{ background: C.paper }}>
        <div>
          <p className="text-5xl italic" style={serif}>
            Hvala!
          </p>
          <p className="mt-2 opacity-70">Javljamo se u toku dana. (Demo: poruka nije poslana.)</p>
        </div>
      </div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Ime" className={field} style={{ borderColor: C.ink + "26" }} />
        <input required placeholder="Telefon ili email" className={field} style={{ borderColor: C.ink + "26" }} />
      </div>
      <select className={field} style={{ borderColor: C.ink + "26" }} defaultValue="">
        <option value="" disabled>
          Tema poruke
        </option>
        <option>Pitanje o usluzi</option>
        <option>Vjenčanje ili grupni termin</option>
        <option>Poklon bon</option>
        <option>Posao u studiju</option>
      </select>
      <textarea required rows={5} placeholder="Poruka" className={field} style={{ borderColor: C.ink + "26" }} />
      <button className="rounded-full py-4 font-semibold text-white" style={{ background: C.clay }}>
        Pošalji poruku
      </button>
    </form>
  );
}

export function GiftCard() {
  const [amount, setAmount] = useState(50);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <motion.div
        key={amount}
        initial={{ rotate: -6, scale: 0.96 }}
        animate={{ rotate: -3, scale: 1 }}
        className="relative aspect-[1.6/1] overflow-hidden rounded-[1.75rem] p-7 text-white shadow-2xl"
        style={{ background: C.ink }}
      >
        <Flow seed={60} className="absolute inset-0 size-full opacity-60" />
        <div className="relative flex h-full flex-col justify-between">
          <p className="text-2xl italic" style={serif}>
            Studio Lana
          </p>
          <div className="flex items-end justify-between">
            <p className="text-xs tracking-widest uppercase opacity-80">Poklon bon</p>
            <p className="text-6xl" style={serif}>
              {amount} KM
            </p>
          </div>
        </div>
      </motion.div>
      <div>
        <p className="text-5xl leading-tight sm:text-6xl" style={serif}>
          Poklon koji se <em style={{ color: C.clay }}>vidi.</em>
        </p>
        <p className="mt-4 max-w-md opacity-75">Digitalni bon stiže na email za par sekundi. Važi 12 mjeseci za sve usluge.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[30, 50, 100, 150].map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className="rounded-full border px-5 py-2.5 font-semibold transition"
              style={a === amount ? { background: C.ink, color: C.bg, borderColor: C.ink } : { borderColor: C.ink + "33" }}
            >
              {a} KM
            </button>
          ))}
        </div>
        <button className="mt-6 rounded-full px-7 py-4 font-semibold text-white" style={{ background: C.clay }}>
          Kupi bon · {amount} KM
        </button>
      </div>
    </div>
  );
}
