"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faq, packages, reviews } from "./data";
import { C, accent, ease, mono } from "./theme";

const field = "w-full rounded-2xl border bg-transparent px-4 py-3.5 outline-none focus:border-[#e8a93c] [color-scheme:dark]";

export function Reviews() {
  return (
    <div className="overflow-hidden">
      <div className="marquee flex w-max gap-4" style={{ animationDuration: "55s" }}>
        {[...reviews, ...reviews].map((r, i) => (
          <figure key={i} className="w-80 shrink-0 rounded-[1.75rem] border p-6" style={{ borderColor: C.line, background: C.panel }}>
            <p className="tracking-widest" style={{ color: C.amber }}>
              ★★★★★
            </p>
            <blockquote className="mt-3 text-2xl leading-snug" style={accent}>
              “{r.text}”
            </blockquote>
            <figcaption className="mt-4 text-xs opacity-60" style={mono}>
              {r.name} · {r.src}
            </figcaption>
          </figure>
        ))}
      </div>
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
            <span className="text-xl font-bold">{f.q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full text-lg" style={{ background: open === i ? C.amber : C.panel, color: open === i ? C.bg : C.cream }}>
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="max-w-2xl overflow-hidden pb-6 opacity-70">
                {f.a}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function Done({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-96 place-items-center rounded-[2rem] p-8 text-center" style={{ background: C.panel }}>
      <div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }} className="mx-auto grid size-20 place-items-center rounded-full text-3xl" style={{ background: C.amber, color: C.bg }}>
          ✓
        </motion.div>
        <p className="mt-6 text-4xl font-extrabold tracking-tight">{title}</p>
        <p className="mx-auto mt-2 max-w-sm opacity-70">{text}</p>
        <button onClick={onReset} className="mt-6 rounded-full border px-6 py-3 text-sm font-bold" style={{ borderColor: C.line }}>
          Nova rezervacija
        </button>
        <p className="mt-4 text-xs opacity-40">Demo: ništa nije poslano.</p>
      </div>
    </motion.div>
  );
}

const MONTHS = ["januara", "februara", "marta", "aprila", "maja", "juna", "jula", "augusta", "septembra", "oktobra", "novembra", "decembra"];
// "2026-11-14" -> "14. novembra" (browsers format the bs locale inconsistently)
const formatDate = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return iso ? `${d}. ${MONTHS[m - 1]}` : "";
};

const TIMES = ["12:00", "13:30", "15:00", "17:00", "18:30", "19:30", "20:30", "21:30"];

export function ReservationForm() {
  const [people, setPeople] = useState(2);
  const [area, setArea] = useState("Bašta uz rijeku");
  const [time, setTime] = useState("19:30");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  if (done)
    return (
      <Done
        title={`Sto za ${people} je vaš.`}
        text={`${name.split(" ")[0] || "Vidimo se"}, čekamo vas ${formatDate(date)} u ${time}, ${area.toLowerCase()}. Potvrda stiže SMS-om.`}
        onReset={() => setDone(false)}
      />
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="grid gap-6 rounded-[2rem] border p-6 sm:p-8"
      style={{ borderColor: C.line, background: C.panel }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs tracking-widest uppercase opacity-60" style={mono}>
            Datum
          </span>
          <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} style={{ borderColor: C.line }} />
        </label>
        <div className="grid gap-2">
          <span className="text-xs tracking-widest uppercase opacity-60" style={mono}>
            Broj osoba
          </span>
          <div className="flex items-center justify-between rounded-2xl border p-1.5" style={{ borderColor: C.line }}>
            <button type="button" onClick={() => setPeople(Math.max(1, people - 1))} className="grid size-11 place-items-center rounded-xl text-xl" style={{ background: C.bg }} aria-label="Manje osoba">
              −
            </button>
            <motion.span key={people} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-2xl font-extrabold">
              {people}
            </motion.span>
            <button type="button" onClick={() => setPeople(Math.min(20, people + 1))} className="grid size-11 place-items-center rounded-xl text-xl" style={{ background: C.bg }} aria-label="Više osoba">
              +
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <span className="text-xs tracking-widest uppercase opacity-60" style={mono}>
          Vrijeme
        </span>
        <div className="grid grid-cols-4 gap-2">
          {TIMES.map((t, i) => (
            <button
              type="button"
              key={t}
              disabled={i === 5}
              onClick={() => setTime(t)}
              className="rounded-xl border py-3 text-sm font-bold transition disabled:line-through disabled:opacity-30"
              style={time === t ? { background: C.amber, color: C.bg, borderColor: C.amber } : { borderColor: C.line }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <span className="text-xs tracking-widest uppercase opacity-60" style={mono}>
          Gdje sjedite
        </span>
        <div className="grid gap-2 sm:grid-cols-3">
          {["Bašta uz rijeku", "Sala uz ognjište", "Svejedno"].map((a) => (
            <button type="button" key={a} onClick={() => setArea(a)} className="rounded-xl border py-3 text-sm font-bold transition" style={area === a ? { background: C.cream, color: C.bg, borderColor: C.cream } : { borderColor: C.line }}>
              {a}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ime i prezime" className={field} style={{ borderColor: C.line }} />
        <input required placeholder="Telefon" inputMode="tel" className={field} style={{ borderColor: C.line }} />
      </div>
      <textarea rows={2} placeholder="Napomena (rođendan, dječija stolica, alergije...)" className={field} style={{ borderColor: C.line }} />
      <button className="rounded-full py-4 text-lg font-bold" style={{ background: C.amber, color: C.bg }}>
        Rezerviši sto za {people}
      </button>
    </form>
  );
}

export function CateringForm() {
  const [pkg, setPkg] = useState(packages[1].name);
  const [people, setPeople] = useState(30);
  const [done, setDone] = useState(false);
  const p = packages.find((x) => x.name === pkg)!;
  if (done) return <Done title="Upit je stigao." text={`Za ${people} osoba, paket „${pkg}“. Kemal vas zove u toku dana s ponudom.`} onReset={() => setDone(false)} />;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="grid gap-5 rounded-[2rem] border p-6 sm:p-8"
      style={{ borderColor: C.line, background: C.panel }}
    >
      <select value={pkg} onChange={(e) => setPkg(e.target.value)} className={field} style={{ borderColor: C.line, background: C.bg }}>
        {packages.map((x) => (
          <option key={x.name}>{x.name}</option>
        ))}
      </select>
      <label className="grid gap-3">
        <span className="flex justify-between text-sm">
          <span className="opacity-70">Broj gostiju</span>
          <b>{people}</b>
        </span>
        <input type="range" min={10} max={80} value={people} onChange={(e) => setPeople(+e.target.value)} className="accent-[#e8a93c]" />
      </label>
      <div className="flex items-end justify-between rounded-2xl p-4" style={{ background: C.bg }}>
        <span className="text-sm opacity-70">Okvirna cijena</span>
        <motion.span key={people + pkg} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ease }} className="text-3xl font-extrabold" style={{ color: C.amber }}>
          ~{people * p.price} KM
        </motion.span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required type="date" className={field} style={{ borderColor: C.line }} />
        <input required placeholder="Telefon ili email" className={field} style={{ borderColor: C.line }} />
      </div>
      <button className="rounded-full py-4 text-lg font-bold" style={{ background: C.amber, color: C.bg }}>
        Pošalji upit
      </button>
    </form>
  );
}

export function ContactForm() {
  const [done, setDone] = useState(false);
  if (done) return <Done title="Hvala!" text="Odgovaramo u toku dana." onReset={() => setDone(false)} />;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="grid gap-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Ime" className={field} style={{ borderColor: C.line }} />
        <input required placeholder="Email ili telefon" className={field} style={{ borderColor: C.line }} />
      </div>
      <textarea required rows={5} placeholder="Poruka" className={field} style={{ borderColor: C.line }} />
      <button className="rounded-full py-4 font-bold" style={{ background: C.amber, color: C.bg }}>
        Pošalji
      </button>
    </form>
  );
}
