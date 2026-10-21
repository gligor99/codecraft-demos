"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { programs } from "./data";
import { B, C, display, mono } from "./theme";
import { Live } from "./ui";

// Giant headline that slides sideways as you scroll past it.
export function HomeHero() {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  return (
    <section ref={hero} className="relative flex min-h-svh flex-col justify-end overflow-hidden pt-28 pb-24 sm:pb-10">
      <div aria-hidden className="pointer-events-none absolute top-1/4 left-1/2 size-[640px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: C.lime, opacity: 0.18 }} />
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
        <Link href={`${B}/raspored`} className="group flex items-center gap-4 rounded-full py-2 pr-2 pl-7 text-lg font-bold uppercase" style={{ background: C.white, color: C.bg }}>
          Rezerviši trening
          <span className="grid size-12 place-items-center rounded-full transition group-hover:rotate-[-45deg]" style={{ background: C.lime }}>
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

const Q = [
  { q: "Šta ti je najvažnije?", a: [["Skinuti kile", "hiit"], ["Biti jači", "snaga"], ["Bez bolova u leđima", "pilates"], ["Više energije", "spin"]] },
  { q: "Koliko vremena imaš?", a: [["30 minuta", "core"], ["45 minuta", ""], ["Sat i više", ""]] },
];

export function Quiz() {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<string[]>([]);
  const result = step === 2 ? programs.find((p) => p.id === (pick[1] || pick[0]))! : null;
  return (
    <div className="rounded-[2rem] border p-6 sm:p-10" style={{ borderColor: C.line, background: C.panel }}>
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <p className="text-xs uppercase" style={{ ...mono, color: C.lime }}>
              Pitanje {step + 1} / 2
            </p>
            <p className="mt-3 text-5xl uppercase sm:text-6xl" style={display}>
              {Q[step].q}
            </p>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {Q[step].a.map(([label, id]) => (
                <button
                  key={label}
                  onClick={() => {
                    setPick([...pick, id]);
                    setStep(step + 1);
                  }}
                  className="rounded-2xl border p-5 text-left text-lg font-bold transition hover:border-[#c6ff3d] hover:text-[#c6ff3d]"
                  style={{ borderColor: C.line }}
                >
                  {label} →
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="r" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="text-xs uppercase" style={{ ...mono, color: C.lime }}>
              Tvoj program
            </p>
            <p className="mt-3 text-7xl uppercase sm:text-8xl" style={{ ...display, color: C.lime }}>
              {result.name}
            </p>
            <p className="mt-3 max-w-lg text-lg">{result.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${B}/raspored`} className="rounded-full px-6 py-3.5 font-bold uppercase" style={{ background: C.lime, color: C.bg }}>
                Vidi termine
              </Link>
              <button
                onClick={() => {
                  setStep(0);
                  setPick([]);
                }}
                className="rounded-full border px-6 py-3.5 font-bold uppercase"
                style={{ borderColor: C.line }}
              >
                Ponovo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
