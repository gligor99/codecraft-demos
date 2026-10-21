import type { Metadata } from "next";
import { PageHero } from "../_lib/ui";
import { Catalog } from "../_lib/widgets";

export const metadata: Metadata = { title: "Sve kafe" };

export default function Proizvodi() {
  return (
    <>
      <PageHero eyebrow="Ponuda ove sedmice" title="Sve" accent="kafe" text="Filtrirajte po načinu pripreme ili regiji, ili tražite po ukusu: čokolada, voće, cvijeće." />
      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Catalog />
        </div>
      </section>
    </>
  );
}
