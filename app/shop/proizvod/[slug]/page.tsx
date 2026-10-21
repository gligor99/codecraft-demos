import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, reviewsFor } from "../../_lib/data";
import { B, C, mono, serif } from "../../_lib/theme";
import { Bag, Options, ProductCard, Stars, Tilt } from "../../_lib/ui";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return { title: p ? p.name : "Kafa" };
}

const BREW: Record<string, [string, string][]> = {
  Espresso: [["Doza", "18 g"], ["Voda", "36 g"], ["Vrijeme", "27–30 s"], ["Temperatura", "93 °C"]],
  Filter: [["Kafa", "15 g"], ["Voda", "250 g"], ["Vrijeme", "3 min"], ["Temperatura", "94 °C"]],
  "Bez kofeina": [["Kafa", "16 g"], ["Voda", "260 g"], ["Vrijeme", "3:30 min"], ["Temperatura", "93 °C"]],
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = products.filter((x) => x.id !== p.id && x.type === p.type).slice(0, 3);
  const reviews = reviewsFor(p);

  return (
    <>
      <nav className="mx-auto max-w-7xl px-4 pt-8 text-sm sm:px-8" style={{ color: C.muted }} aria-label="Putanja">
        <Link href={B}>Početna</Link> / <Link href={`${B}/proizvodi`}>Kafe</Link> / <span style={{ color: C.ink }}>{p.name}</span>
      </nav>
      <section className="px-4 pt-6 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="grid aspect-square place-items-center rounded-[2.5rem] lg:sticky lg:top-24" style={{ background: p.bag + "1f" }}>
            <Tilt>
              <Bag p={p} className="w-[min(320px,60vw)] drop-shadow-[0_40px_40px_rgba(0,0,0,0.25)]" />
            </Tilt>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase" style={{ ...mono, color: C.muted }}>
              {p.origin} · {p.type}
            </p>
            <h1 className="mt-3 text-6xl tracking-tight sm:text-7xl" style={serif}>
              {p.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <Stars n={p.rating} /> <b>{p.rating.toFixed(1).replace(".", ",")}</b>
              <span style={{ color: C.muted }}>({p.reviews} recenzija)</span>
            </p>
            <p className="mt-5 text-2xl italic" style={{ ...serif, color: C.orange }}>
              {p.notes.join(" · ")}
            </p>
            <p className="mt-4 max-w-lg text-lg" style={{ color: C.muted }}>
              {p.desc}
            </p>
            <Options p={p} />
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl text-sm" style={{ background: C.line }}>
              {[
                ["Porijeklo", p.origin],
                ["Nadmorska visina", p.altitude],
                ["Obrada", p.process],
                ["Prženje", ["", "Svijetlo", "Srednje", "Tamno"][p.roast]],
              ].map(([k, v]) => (
                <div key={k} className="p-4" style={{ background: C.card }}>
                  <dt className="text-xs uppercase" style={{ ...mono, color: C.muted }}>
                    {k}
                  </dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-2xl p-5" style={{ background: C.ink, color: C.bg }}>
              <p className="text-xs uppercase opacity-60" style={mono}>
                Recept · {p.type === "Espresso" ? "espresso aparat" : "V60"}
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                {BREW[p.type].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xl" style={serif}>
                      {v}
                    </p>
                    <p className="text-[11px] opacity-60">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-5xl" style={serif}>
              Recenzije
            </h2>
            <p className="mt-4 text-7xl" style={serif}>
              {p.rating.toFixed(1).replace(".", ",")}
            </p>
            <Stars n={p.rating} size="text-xl" />
            <p className="mt-1 text-sm" style={{ color: C.muted }}>
              {p.reviews} verifikovanih kupaca
            </p>
          </div>
          <div className="grid gap-3">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-2xl p-6" style={{ background: C.card }}>
                <Stars n={r.stars} />
                <blockquote className="mt-2 text-lg">{r.text}</blockquote>
                <figcaption className="mt-2 text-sm" style={{ color: C.muted }}>
                  {r.name} · verifikovana kupovina
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-4 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-5xl" style={serif}>
              Možda vam se svidi
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.id} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
