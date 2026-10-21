"use client";

import { menu } from "./data";
import { DishCard } from "./ui";

export function HomeDishes({ ids }: { ids: string[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ids.map((id, i) => (
        <DishCard key={id} m={menu.find((m) => m.id === id)!} i={i} />
      ))}
    </div>
  );
}
