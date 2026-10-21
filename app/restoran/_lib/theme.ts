// Plain constants shared by server pages and client components.
export const B = "/restoran";
export const C = { bg: "#120e0a", panel: "#1c1611", line: "#f5ead71a", cream: "#f5ead7", amber: "#e8a93c", ember: "#c4502a" };
export const accent = { fontFamily: "var(--f-accent)", fontStyle: "italic" as const };
export const mono = { fontFamily: "var(--f-mono)" };
export const ease = [0.2, 0.8, 0.2, 1] as const;
export const DELIVERY = 3;
export const km = (n: number) => n.toFixed(2).replace(".", ",") + " KM";
