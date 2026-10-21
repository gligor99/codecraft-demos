import Link from "next/link";

const demos = [
  { href: "/salon", sub: "salon", name: "Studio Lana", kind: "Frizerski salon · online zakazivanje", bg: "#f4ede4", fg: "#2a1d17", accent: "#b5532f" },
  { href: "/restoran", sub: "restoran", name: "Konoba Most", kind: "Restoran · narudžba i dostava", bg: "#120e0a", fg: "#f5ead7", accent: "#e8a93c" },
  { href: "/fitness", sub: "fitness", name: "Pulse Gym", kind: "Teretana · raspored i rezervacije", bg: "#0a0a0a", fg: "#f4f4f0", accent: "#c6ff3d" },
  { href: "/shop", sub: "shop", name: "Zrno", kind: "Web shop · korpa i naplata", bg: "#f1ede6", fg: "#1d1a16", accent: "#d4561c" },
];

export default function Index() {
  return (
    <main className="min-h-screen bg-[#0c0b0a] px-4 py-16 text-[#f3efe6] sm:px-8 sm:py-24" style={{ fontFamily: "ui-sans-serif, system-ui" }}>
      <div className="mx-auto max-w-6xl">
        <a href="https://codecraft-ba.vercel.app" className="text-sm opacity-60 hover:opacity-100">
          ← CodeCraft
        </a>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
          Demo sajtovi<span className="text-[#ff5a1f]">.</span>
        </h1>
        <p className="mt-4 max-w-lg text-lg opacity-60">Izmišljeni biznisi, prave funkcije. Kliknite i isprobajte kao da ste kupac.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1"
              style={{ background: d.bg, color: d.fg }}
            >
              <span className="font-mono text-xs opacity-60">{d.sub}.codecraft.ba</span>
              <span>
                <span className="block text-5xl font-semibold tracking-tight">{d.name}</span>
                <span className="mt-2 flex items-center justify-between text-sm opacity-70">
                  {d.kind}
                  <span className="grid size-10 place-items-center rounded-full text-lg transition group-hover:rotate-[-45deg]" style={{ background: d.accent, color: d.bg }}>
                    →
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
