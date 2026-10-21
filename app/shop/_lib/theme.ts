// Plain constants shared by server pages and client components.
export const B = "/shop";
export const C = { bg: "#f1ede6", card: "#faf8f4", ink: "#1d1a16", green: "#23402f", orange: "#d4561c", line: "#1d1a161a", muted: "#1d1a1699" };
export const serif = { fontFamily: "var(--f-display)" };
export const mono = { fontFamily: "var(--f-mono)" };
export const ease = [0.2, 0.8, 0.2, 1] as const;
export const FREE = 60;
export const SHIP = 7;
export const km = (n: number) => n.toFixed(2).replace(".", ",") + " KM";
