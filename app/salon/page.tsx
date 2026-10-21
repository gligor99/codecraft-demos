"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import DemoBadge from "@/components/DemoBadge";

const C = { bg: "#f4ede4", ink: "#2a1d17", clay: "#b5532f", blush: "#e9c7b5", sage: "#9aa58b", sand: "#e7dccd" };
const serif = { fontFamily: "var(--f-display)" };
const ease = [0.2, 0.8, 0.2, 1] as const;

type Service = { id: string; cat: string; name: string; min: number; price: number };
const services: Service[] = [
  { id: "s1", cat: "Šišanje", name: "Žensko šišanje i feniranje", min: 60, price: 35 },
  { id: "s2", cat: "Šišanje", name: "Muško šišanje", min: 30, price: 20 },
  { id: "s3", cat: "Šišanje", name: "Feniranje", min: 30, price: 15 },
  { id: "s4", cat: "Boja", name: "Bojenje izrasta", min: 90, price: 60 },
  { id: "s5", cat: "Boja", name: "Balayage", min: 180, price: 160 },
  { id: "s6", cat: "Boja", name: "Toniranje", min: 45, price: 40 },
  { id: "s7", cat: "Njega", name: "Keratinski tretman", min: 120, price: 120 },
  { id: "s8", cat: "Njega", name: "Dubinska njega i masaža", min: 40, price: 30 },
];

const team = [
  { id: "t1", name: "Lana", role: "Osnivačica · boja", hue: ["#e9c7b5", "#b5532f"] },
  { id: "t2", name: "Amra", role: "Šišanje · stilizovanje", hue: ["#dfe3d3", "#7d8a6c"] },
  { id: "t3", name: "Tarik", role: "Muško šišanje", hue: ["#e7dccd", "#2a1d17"] },
];

const SLOTS = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

// Abstract "hair" artwork: soft flowing strokes inside an arch, different per seed.
function Flow({ seed = 0, a = C.blush, b = C.clay, className = "" }: { seed?: number; a?: string; b?: string; className?: string }) {
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
      <circle cx={140 - seed * 10} cy={70 + seed * 12} r="46" fill="#fff" opacity="0.12" />
    </svg>
  );
}

function nextDays(n: number) {
  const names = ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"];
  const out: { key: string; label: string; day: number; date: Date }[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // closed Sundays
    out.push({ key: d.toISOString().slice(0, 10), label: names[d.getDay()], day: d.getDate(), date: new Date(d) });
  }
  return out;
}

// Deterministic "taken" slots so the calendar looks lived-in without randomness between renders.
const taken = (dayKey: string, slot: string, stylist: string) =>
  (dayKey.charCodeAt(9) + slot.charCodeAt(1) + slot.charCodeAt(3) + stylist.charCodeAt(1)) % 3 === 0;

function icsFor(service: Service, stylist: string, date: Date, time: string) {
  const [h, m] = time.split(":").map(Number);
  const start = new Date(date);
  start.setHours(h, m);
  const end = new Date(start.getTime() + service.min * 60000);
  const f = (x: Date) => x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Studio Lana demo//BS",
    "BEGIN:VEVENT",
    `UID:${f(start)}-lana-demo`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(start)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:Studio Lana · ${service.name}`,
    `DESCRIPTION:Frizer: ${stylist}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
}

function BookingInner({ preset, onReset }: { preset: string | null; onReset: () => void }) {
  const days = useMemo(() => nextDays(10), []);
  const [serviceId, setServiceId] = useState<string | null>(preset);
  const [stylist, setStylist] = useState<string | null>(null);
  const [day, setDay] = useState(days[0].key);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const service = services.find((s) => s.id === serviceId);
  const dayObj = days.find((d) => d.key === day)!;
  const step = !service ? 0 : !stylist ? 1 : !time ? 2 : 3;
  const steps = ["Usluga", "Frizer", "Termin", "Podaci"];

  if (done && service && stylist && time) {
    const who = team.find((t) => t.id === stylist)!.name;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center sm:p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mx-auto grid size-20 place-items-center rounded-full text-3xl text-white"
          style={{ background: C.clay }}
        >
          ✓
        </motion.div>
        <p className="mt-6 text-4xl italic sm:text-5xl" style={serif}>
          Vidimo se, {name.split(" ")[0] || "draga"}!
        </p>
        <p className="mt-3 opacity-70">
          {service.name} kod {who} · {dayObj.label} {dayObj.day}. u {time}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={icsFor(service, who, dayObj.date, time)}
            download="studio-lana-termin.ics"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{ background: C.ink }}
          >
            Dodaj u kalendar
          </a>
          <button
            onClick={() => {
              setDone(false);
              setTime(null);
              setStylist(null);
              setServiceId(null);
              onReset();
            }}
            className="rounded-full border px-6 py-3 text-sm font-semibold"
            style={{ borderColor: C.ink + "33" }}
          >
            Novi termin
          </button>
        </div>
        <p className="mt-6 text-xs opacity-50">Demo: rezervacija se ne šalje nikome.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px]">
      <div className="p-5 sm:p-8">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className="h-1 rounded-full transition-colors" style={{ background: i <= step ? C.clay : C.ink + "18" }} />
              <p className="mt-2 text-[11px] font-semibold tracking-wider uppercase" style={{ opacity: i <= step ? 1 : 0.4 }}>
                {s}
              </p>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease }}
            className="mt-7"
          >
            {step === 0 && (
              <div className="grid gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className="flex items-center justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-0.5"
                    style={{ borderColor: C.ink + "1f", background: "#fffaf4" }}
                  >
                    <span>
                      <span className="block font-semibold">{s.name}</span>
                      <span className="text-xs opacity-60">
                        {s.cat} · {s.min} min
                      </span>
                    </span>
                    <span className="text-lg" style={serif}>
                      {s.price} KM
                    </span>
                  </button>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-3">
                {team.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setStylist(t.id)}
                    className="group overflow-hidden rounded-3xl border text-left transition hover:-translate-y-1"
                    style={{ borderColor: C.ink + "1f", background: "#fffaf4" }}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-t-[999px]">
                      <Flow seed={i + 3} a={t.hue[0]} b={t.hue[1]} className="size-full transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="text-2xl italic" style={serif}>
                        {t.name}
                      </p>
                      <p className="text-xs opacity-60">{t.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {step === 2 && stylist && (
              <div>
                <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                  {days.map((d) => (
                    <button
                      key={d.key}
                      onClick={() => setDay(d.key)}
                      className="flex w-16 shrink-0 flex-col items-center rounded-2xl border py-3 transition"
                      style={
                        d.key === day
                          ? { background: C.ink, color: C.bg, borderColor: C.ink }
                          : { borderColor: C.ink + "1f", background: "#fffaf4" }
                      }
                    >
                      <span className="text-[11px] tracking-wider uppercase opacity-70">{d.label}</span>
                      <span className="text-2xl" style={serif}>
                        {d.day}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {SLOTS.map((s) => {
                    const busy = taken(day, s, stylist);
                    return (
                      <button
                        key={s}
                        disabled={busy}
                        onClick={() => setTime(s)}
                        className="rounded-full border py-2.5 text-sm font-semibold transition enabled:hover:-translate-y-0.5 disabled:line-through disabled:opacity-30"
                        style={{ borderColor: C.ink + "26", background: "#fffaf4" }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 3 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="grid gap-3"
              >
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ime i prezime"
                  className="rounded-2xl border bg-[#fffaf4] px-4 py-3.5 outline-none focus:border-[#b5532f]"
                  style={{ borderColor: C.ink + "26" }}
                />
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Broj telefona"
                  inputMode="tel"
                  className="rounded-2xl border bg-[#fffaf4] px-4 py-3.5 outline-none focus:border-[#b5532f]"
                  style={{ borderColor: C.ink + "26" }}
                />
                <button className="mt-2 rounded-full py-4 font-semibold text-white" style={{ background: C.clay }}>
                  Potvrdi termin
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Summary */}
      <aside className="border-t p-5 sm:p-8 lg:border-t-0 lg:border-l" style={{ borderColor: C.ink + "14", background: C.sand }}>
        <p className="text-[11px] font-semibold tracking-widest uppercase opacity-60">Vaš termin</p>
        <dl className="mt-4 grid gap-3 text-sm">
          {[
            ["Usluga", service?.name, () => (setServiceId(null), setStylist(null), setTime(null))],
            ["Frizer", team.find((t) => t.id === stylist)?.name, () => (setStylist(null), setTime(null))],
            ["Termin", time && `${dayObj.label} ${dayObj.day}. · ${time}`, () => setTime(null)],
          ].map(([k, v, edit]) => (
            <div key={k as string} className="flex items-center justify-between gap-3 border-b pb-3" style={{ borderColor: C.ink + "14" }}>
              <dt className="opacity-60">{k as string}</dt>
              <dd className="flex items-center gap-2 text-right font-semibold">
                {(v as string) || <span className="opacity-30">—</span>}
                {v && (
                  <button onClick={edit as () => void} className="text-xs underline opacity-50">
                    promijeni
                  </button>
                )}
              </dd>
            </div>
          ))}
        </dl>
        {service && (
          <div className="mt-6 flex items-end justify-between">
            <span className="text-sm opacity-60">{service.min} min</span>
            <span className="text-4xl" style={serif}>
              {service.price} KM
            </span>
          </div>
        )}
      </aside>
    </div>
  );
}

// Dates depend on "today", so the widget renders only in the browser to avoid hydration mismatches.
const Booking = dynamic(() => Promise.resolve(BookingInner), {
  ssr: false,
  loading: () => <div className="h-[420px]" />,
});

export default function Salon() {
  const [preset, setPreset] = useState<string | null>(null);
  const [bookingKey, setBookingKey] = useState(0);
  const cats = ["Šišanje", "Boja", "Njega"];

  function book(id: string) {
    setPreset(id);
    setBookingKey((k) => k + 1);
    document.getElementById("termin")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{ background: C.bg, color: C.ink }} className="min-h-screen">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 backdrop-blur-xl" style={{ background: C.bg + "cc" }}>
          <a href="#" className="text-2xl italic" style={serif}>
            Studio Lana
          </a>
          <div className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#usluge">Usluge</a>
            <a href="#tim">Tim</a>
            <a href="#kontakt">Kontakt</a>
          </div>
          <a href="#termin" className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: C.ink }}>
            Zakaži
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <h1 className="rise text-[27vw] leading-[0.8] tracking-[-0.06em] italic sm:text-[22vw] lg:text-[17rem]" style={serif}>
            Lana<span style={{ color: C.clay }}>.</span>
          </h1>
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="rise max-w-md" style={{ animationDelay: "0.15s" }}>
              <p className="text-xl leading-snug sm:text-2xl">
                Frizerski studio za one koji žele izgledati <em style={serif}>kao najbolja verzija sebe</em>, bez pretjerivanja.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#termin" className="rounded-full px-7 py-4 font-semibold text-white" style={{ background: C.clay }}>
                  Zakaži online
                </a>
                <span className="text-sm opacity-70">Slobodni termini već sutra</span>
              </div>
            </div>
            <div className="rise grid grid-cols-3 items-end gap-3" style={{ animationDelay: "0.3s" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={`overflow-hidden rounded-t-[999px] rounded-b-3xl ${i === 1 ? "aspect-[3/4.6]" : "aspect-[3/4]"}`}>
                  <Flow seed={i} a={[C.blush, "#f1d9c9", C.sage][i]} b={[C.clay, "#c98a6d", "#5e6b52"][i]} className="size-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y py-5" style={{ borderColor: C.ink + "1a" }}>
        <div className="marquee flex w-max gap-10 text-3xl italic sm:text-4xl" style={serif}>
          {Array.from({ length: 2 }, (_, k) =>
            ["Balayage", "Šišanje", "Keratin", "Toniranje", "Feniranje", "Njega"].map((w) => (
              <span key={w + k} className="flex items-center gap-10">
                {w} <span style={{ color: C.clay }}>✺</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* Services */}
      <section id="usluge" className="scroll-mt-24 px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-5xl tracking-tight sm:text-7xl" style={serif}>
              Usluge <em style={{ color: C.clay }}>&amp; cijene</em>
            </h2>
            <p className="max-w-xs opacity-70">Kliknite uslugu i odmah birate termin.</p>
          </div>
          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            {cats.map((cat, ci) => (
              <div key={cat}>
                <div className="mb-6 aspect-[16/9] overflow-hidden rounded-[2rem]">
                  <Flow seed={ci + 6} a={[C.blush, "#efd0b8", "#dfe3d3"][ci]} b={[C.clay, "#a7643f", "#7d8a6c"][ci]} className="size-full" />
                </div>
                <h3 className="text-3xl italic" style={serif}>
                  {cat}
                </h3>
                <ul className="mt-4">
                  {services
                    .filter((s) => s.cat === cat)
                    .map((s) => (
                      <li key={s.id}>
                        <button
                          onClick={() => book(s.id)}
                          className="group flex w-full items-baseline gap-3 border-b py-4 text-left"
                          style={{ borderColor: C.ink + "1a" }}
                        >
                          <span className="font-semibold transition group-hover:translate-x-1">{s.name}</span>
                          <span className="flex-1 translate-y-[-3px] border-b border-dotted" style={{ borderColor: C.ink + "33" }} />
                          <span className="text-xl" style={serif}>
                            {s.price} KM
                          </span>
                          <span className="text-xs opacity-0 transition group-hover:opacity-60">Zakaži →</span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="termin" className="scroll-mt-20 px-4 py-24 sm:px-8" style={{ background: C.ink, color: C.bg }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-5xl tracking-tight sm:text-7xl" style={serif}>
              Zakažite <em style={{ color: C.blush }}>za minut.</em>
            </h2>
            <p className="max-w-xs opacity-70">Bez poziva, bez čekanja. Potvrda odmah, podsjetnik dan ranije.</p>
          </div>
          <div className="mt-12 overflow-hidden rounded-[2rem]" style={{ background: C.bg, color: C.ink }}>
            <Booking key={bookingKey} preset={preset} onReset={() => setPreset(null)} />
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="tim" className="scroll-mt-24 px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-5xl tracking-tight sm:text-7xl" style={serif}>
            Ruke koje <em style={{ color: C.clay }}>znaju.</em>
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {team.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
                  <Flow seed={i + 10} a={t.hue[0]} b={t.hue[1]} className="size-full transition duration-1000 group-hover:scale-105" />
                </div>
                <p className="mt-5 text-4xl italic" style={serif}>
                  {t.name}
                </p>
                <p className="opacity-60">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="kontakt" className="scroll-mt-24 px-4 pt-24 pb-28 sm:px-8" style={{ background: C.sand }}>
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          <div>
            <p className="text-5xl italic" style={serif}>
              Studio Lana
            </p>
            <p className="mt-4 opacity-70">Ulica primjera 12, centar grada</p>
            <p className="opacity-70">+387 61 000 000</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase opacity-60">Radno vrijeme</p>
            <ul className="mt-4 grid gap-1">
              <li className="flex justify-between border-b py-2" style={{ borderColor: C.ink + "1a" }}>
                <span>Pon – Pet</span>
                <span>09 – 19h</span>
              </li>
              <li className="flex justify-between border-b py-2" style={{ borderColor: C.ink + "1a" }}>
                <span>Subota</span>
                <span>09 – 15h</span>
              </li>
              <li className="flex justify-between py-2 opacity-50">
                <span>Nedjelja</span>
                <span>zatvoreno</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-between gap-6">
            <a href="#termin" className="rounded-full px-7 py-4 font-semibold text-white" style={{ background: C.clay }}>
              Zakaži termin
            </a>
            <p className="text-xs opacity-50">Izmišljen biznis. Demo sajt koji je napravio CodeCraft.</p>
          </div>
        </div>
      </footer>

      <DemoBadge />
    </div>
  );
}
