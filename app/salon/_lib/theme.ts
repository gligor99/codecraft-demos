// Plain constants shared by server pages and client components (kept out of the "use client" modules,
// whose non-component exports can't be read on the server).
export const B = "/salon";
export const C = { bg: "#f4ede4", ink: "#2a1d17", clay: "#b5532f", blush: "#e9c7b5", sage: "#9aa58b", sand: "#e7dccd", paper: "#fffaf4" };
export const serif = { fontFamily: "var(--f-display)" };
export const ease = [0.2, 0.8, 0.2, 1] as const;
export const palettes: [string, string][] = [
  [C.blush, C.clay],
  ["#f1d9c9", "#c98a6d"],
  [C.sage, "#5e6b52"],
  ["#efd0b8", "#a7643f"],
  ["#dfe3d3", "#7d8a6c"],
  ["#e7dccd", C.ink],
];
