"use client";

import { useState } from "react";

const MAIN = "https://codecraft-ba.vercel.app";

// Floating note on every demo: makes clear it's a sample and sends interested visitors to CodeCraft.
export default function DemoBadge({ dark = false }: { dark?: boolean }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[90] flex justify-center px-3 sm:justify-start sm:px-5">
      <div
        className={`pointer-events-auto flex items-center gap-1 rounded-full p-1 pl-1 text-[13px] shadow-[0_12px_40px_-8px_rgb(0_0_0/0.45)] ring-1 backdrop-blur-xl ${
          dark ? "bg-white/90 text-[#0c0b0a] ring-black/10" : "bg-[#0c0b0a]/90 text-[#f3efe6] ring-white/10"
        }`}
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      >
        <a href={MAIN} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full py-1.5 pr-2 pl-2.5">
          <svg viewBox="0 0 48 48" className="size-4" aria-hidden>
            <path d="M30.999 13.275A14 14 0 1 0 30.999 34.725" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <rect x="36.5" y="19" width="7" height="10" rx="2" fill="#ff5a1f" />
          </svg>
          <span className="hidden opacity-70 sm:inline">Demo by</span>
          <b className="font-semibold sm:-ml-1">
            Code<span className="text-[#ff5a1f]">Craft</span>
          </b>
        </a>
        <a
          href={`${MAIN}/#kontakt`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#ff5a1f] px-3.5 py-1.5 font-medium whitespace-nowrap text-[#0c0b0a] transition hover:brightness-110"
        >
          Želim ovakav<span className="hidden sm:inline"> sajt</span> →
        </a>
        <button
          onClick={() => setHidden(true)}
          aria-label="Sakrij"
          className="grid size-7 place-items-center rounded-full opacity-50 transition hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
