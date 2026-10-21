import type { Metadata } from "next";
import { BookCta, PageHero, Reveal } from "../_lib/ui";
import { BeforeAfter, GalleryGrid } from "../_lib/widgets";

export const metadata: Metadata = { title: "Galerija" };

export default function Galerija() {
  return (
    <>
      <PageHero eyebrow="Naš rad" title="Galerija" accent="radova" text="Prava kosa, pravi klijenti, bez filtera. Kliknite fotografiju za uvećanje." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          <Reveal>
            <BeforeAfter seed={0} label="Balayage · 3 h" />
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfter seed={5} label="Keratin · 2 h" />
          </Reveal>
        </div>
      </section>
      <section className="px-4 pb-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid />
        </div>
      </section>
      <BookCta />
    </>
  );
}
