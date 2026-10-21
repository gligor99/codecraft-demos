import { C } from "./theme";

// Abstract coach portrait: lime glow + diagonal stripes, varied per index. No client code needed.
export function CoachArt({ i, className = "" }: { i: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: `radial-gradient(circle at ${30 + i * 15}% ${35 + (i % 2) * 20}%, ${C.lime}${i % 2 ? "55" : "33"}, transparent 55%), repeating-linear-gradient(${45 + i * 30}deg, #ffffff08 0 2px, transparent 2px 14px), ${C.panel}`,
      }}
    />
  );
}
