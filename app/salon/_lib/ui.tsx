"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { hours } from "./data";

import { B, C, ease, serif } from "./theme";

const links = [
  { href: `${B}/usluge`, label: "Usluge" },
  { href: `${B}/galerija`, label: "Galerija" },
  { href: `${B}/tim`, label: "Tim" },
  { href: `${B}/kontakt`, label: "Kontakt" },
];

// Abstract "hair" artwork: soft flowing strokes, different per seed.
export function Flow({ seed = 0, a = C.blush, b = C.clay, className = "" }: { seed?: number; a?: string; b?: string; className?: string }) {
  const lines = Array.from({ length: 14 }, (_, i) => {
    const o = i * 9 + seed * 7;
    return `M${-20 + o * 0.4} 260 C ${40 + o} ${180 - i * 4}, ${20 + o * 0.6} ${90 + i * 3}, ${110 + o * 0.5} -20`;
  });
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id={`g${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="200" height="260" fill={`url(#g${seed})`} />
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#fff" strokeOpacity={0.08 + (i % 4) * 0.06} strokeWidth={1 + (i % 3)} />
      ))}
      <circle cx={140 - (seed % 5) * 10} cy={70 + (seed % 5) * 12} r="46" fill="#fff" opacity="0.12" />
    </svg>
  );
}


export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, accent, text }: { eyebrow: string; title: string; accent: string; text?: string }) {
  return (
    <section className="px-4 pt-32 pb-12 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <p className="rise text-[11px] font-semibold tracking-[0.2em] uppercase opacity-60">{eyebrow}</p>
        <h1 className="rise mt-4 text-6xl leading-[0.9] tracking-tight sm:text-8xl" style={serif}>
          {title} <em style={{ color: C.clay }}>{accent}</em>
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

export function BookCta() {
  return (
    <section className="px-4 py-20 sm:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-8 py-16 sm:px-16" style={{ background: C.ink, color: C.bg }}>
        <div className="absolute -top-20 -right-10 hidden h-[140%] w-72 rotate-12 overflow-hidden rounded-t-[999px] opacity-80 md:block">
          <Flow seed={21} className="size-full" />
        </div>
        <p className="relative max-w-xl text-5xl leading-[0.95] sm:text-7xl" style={serif}>
          Vrijeme je za <em style={{ color: C.blush }}>novu sebe.</em>
        </p>
        <p className="relative mt-5 max-w-md opacity-70">Slobodni termini već od sutra. Potvrda odmah, podsjetnik SMS-om dan ranije.</p>
        <Link href={`${B}/zakazivanje`} className="relative mt-8 inline-block rounded-full px-8 py-4 font-semibold text-white" style={{ background: C.clay }}>
          Zakaži online
        </Link>
      </div>
    </section>
  );
}

export function SalonShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div style={{ background: C.bg, color: C.ink }} className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-8 sm:pt-4">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2.5 pr-2.5 pl-5 transition-all duration-500 ${scrolled || open ? "shadow-[0_10px_40px_-15px_rgba(42,29,23,0.35)] backdrop-blur-xl" : ""}`}
          style={{ background: scrolled || open ? C.bg + "e6" : "transparent" }}
        >
          <Link href={B} onClick={() => setOpen(false)} className="text-2xl italic" style={serif}>
            Studio Lana
          </Link>
          <div className="hidden items-center gap-1 text-sm font-medium md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="relative rounded-full px-4 py-2">
                {path === l.href && <motion.span layoutId="salon-nav" className="absolute inset-0 rounded-full" style={{ background: C.ink + "0f" }} />}
                <span className="relative">{l.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href={`${B}/zakazivanje`} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: C.ink }}>
              Zakaži
            </Link>
            <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full md:hidden" style={{ background: C.ink + "0f" }} aria-label="Meni" aria-expanded={open}>
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
          <motion.div
            className="fixed inset-0 z-40 flex flex-col px-6 pt-28 pb-10 md:hidden"
            style={{ background: C.bg }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {[{ href: B, label: "Početna" }, ...links, { href: `${B}/zakazivanje`, label: "Zakazivanje" }].map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block border-b py-4 text-5xl italic" style={{ ...serif, borderColor: C.ink + "1a", color: path === l.href ? C.clay : C.ink }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <p className="mt-auto text-sm opacity-60">+387 61 000 000 · Ulica primjera 12</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="px-4 pt-20 pb-28 sm:px-8" style={{ background: C.sand }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-6xl italic" style={serif}>
                Studio Lana<span style={{ color: C.clay }}>.</span>
              </p>
              <p className="mt-4 max-w-sm opacity-70">Frizerski studio u centru grada. Šišanje, boja, njega i frizure za posebne prilike.</p>
              <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Email za novosti i popuste" className="min-w-0 flex-1 rounded-full border bg-transparent px-4 py-3 text-sm outline-none" style={{ borderColor: C.ink + "33" }} />
                <button className="rounded-full px-5 text-sm font-semibold text-white" style={{ background: C.ink }}>
                  Prijava
                </button>
              </form>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase opacity-60">Radno vrijeme</p>
              <ul className="mt-4 grid gap-2 text-sm">
                {hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between gap-4">
                    <span className="opacity-70">{d}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase opacity-60">Studio</p>
              <ul className="mt-4 grid gap-2 text-sm">
                {[{ href: B, label: "Početna" }, ...links, { href: `${B}/zakazivanje`, label: "Zakazivanje" }].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="opacity-70 hover:opacity-100">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap justify-between gap-4 border-t pt-6 text-xs opacity-60" style={{ borderColor: C.ink + "1a" }}>
            <p>© 2026 Studio Lana · Ulica primjera 12 · +387 61 000 000</p>
            <p>Izmišljen biznis. Demo sajt koji je napravio CodeCraft.</p>
          </div>
        </div>
      </footer>
      <DemoBadge />
    </div>
  );
}
