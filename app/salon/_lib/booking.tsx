"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { services, team, type Service } from "./data";
import { C, ease, serif } from "./theme";
import { Flow } from "./ui";

const SLOTS = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

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

function BookingInner() {
  // Optional ?usluga=<id> preselects a service (links from the price list).
  const preset = useSearchParams().get("usluga");
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
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
  loading: () => <div className="h-[460px]" />,
});
export default Booking;
