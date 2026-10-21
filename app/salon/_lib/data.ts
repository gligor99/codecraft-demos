export type Service = { id: string; cat: string; name: string; min: number; price: number; desc: string };

export const services: Service[] = [
  { id: "s1", cat: "Šišanje", name: "Žensko šišanje i feniranje", min: 60, price: 35, desc: "Konsultacija, pranje, šišanje prema obliku lica i feniranje." },
  { id: "s2", cat: "Šišanje", name: "Muško šišanje", min: 30, price: 20, desc: "Makaze ili mašinica, pranje i styling." },
  { id: "s3", cat: "Šišanje", name: "Feniranje", min: 30, price: 15, desc: "Volumen, valovi ili ravno, za posebne prilike ili svaki dan." },
  { id: "s9", cat: "Šišanje", name: "Dječje šišanje (do 12 god.)", min: 30, price: 15, desc: "Strpljivo, brzo i bez suza." },
  { id: "s4", cat: "Boja", name: "Bojenje izrasta", min: 90, price: 60, desc: "Boja bez amonijaka, njega nakon bojenja uključena." },
  { id: "s5", cat: "Boja", name: "Balayage", min: 180, price: 160, desc: "Ručno slikani prelazi, prirodan izgled koji lijepo izrasta." },
  { id: "s6", cat: "Boja", name: "Toniranje", min: 45, price: 40, desc: "Osvježenje nijanse i neutralizacija žutih tonova." },
  { id: "s10", cat: "Boja", name: "Pramenovi", min: 150, price: 120, desc: "Klasični ili baby-light pramenovi s folijama." },
  { id: "s7", cat: "Njega", name: "Keratinski tretman", min: 120, price: 120, desc: "Ravna, sjajna kosa bez frizza do 4 mjeseca." },
  { id: "s8", cat: "Njega", name: "Dubinska njega i masaža", min: 40, price: 30, desc: "Maska po tipu kose i opuštajuća masaža vlasišta." },
  { id: "s11", cat: "Njega", name: "Olaplex tretman", min: 45, price: 45, desc: "Obnova veza u kosi nakon bojenja i toplote." },
  { id: "s12", cat: "Posebne prilike", name: "Svečana frizura", min: 75, price: 60, desc: "Punđe, pletenice i valovi za vjenčanja i mature." },
  { id: "s13", cat: "Posebne prilike", name: "Mladenački paket", min: 180, price: 220, desc: "Proba frizure, frizura na dan vjenčanja i dolazak na lokaciju." },
];

export const cats = ["Šišanje", "Boja", "Njega", "Posebne prilike"];

export const team = [
  {
    id: "t1",
    name: "Lana",
    role: "Osnivačica · koloristkinja",
    years: 14,
    bio: "Otvorila je studio 2015. nakon godina rada u Beču. Specijalnost: balayage i prirodne plave nijanse.",
    hue: ["#e9c7b5", "#b5532f"] as [string, string],
  },
  {
    id: "t2",
    name: "Amra",
    role: "Šišanje · stilizovanje",
    years: 9,
    bio: "Precizni bobovi i šiške. Voli kratke frizure i klijente koji žele promjenu.",
    hue: ["#dfe3d3", "#7d8a6c"] as [string, string],
  },
  {
    id: "t3",
    name: "Tarik",
    role: "Muško šišanje · brada",
    years: 7,
    bio: "Fade, klasika i njega brade. Termini nikad ne kasne više od pet minuta.",
    hue: ["#e7dccd", "#2a1d17"] as [string, string],
  },
  {
    id: "t4",
    name: "Selma",
    role: "Svečane frizure · njega",
    years: 6,
    bio: "Mladenke, mature i keratinski tretmani. Zadužena za sve što mora izdržati cijelu noć.",
    hue: ["#f1d9c9", "#c98a6d"] as [string, string],
  },
];

export const testimonials = [
  { name: "Ajla M.", text: "Prvi put da sam izašla iz salona i nisam morala ništa popravljati kod kuće. Balayage je savršen.", service: "Balayage" },
  { name: "Emina K.", text: "Online zakazivanje je spas. Termin u 7 navečer, bez ijednog poziva.", service: "Šišanje" },
  { name: "Harun B.", text: "Tarik zna tačno šta treba. Već dvije godine ne idem nigdje drugo.", service: "Muško šišanje" },
  { name: "Lejla S.", text: "Frizura za vjenčanje izdržala je do 4 ujutro, uz ples. Hvala, Selma!", service: "Mladenački paket" },
  { name: "Nina P.", text: "Keratin je promijenio moje jutro. Feniram se za deset minuta.", service: "Keratin" },
  { name: "Dženana A.", text: "Atmosfera, kafa, muzika. Dođem zbog kose, ostanem zbog razgovora.", service: "Njega" },
];

export const faq = [
  { q: "Mogu li otkazati ili pomjeriti termin?", a: "Da, do 24 sata prije termina, preko linka iz SMS potvrde ili pozivom. Kasnije otkazivanje naplaćujemo 50%." },
  { q: "Koliko ranije trebam zakazati balayage?", a: "Obično 5 do 7 dana unaprijed. Za petak i subotu preporučujemo dvije sedmice." },
  { q: "Koje proizvode koristite?", a: "Profesionalne linije bez sulfata i boje bez amonijaka. Sve proizvode možete kupiti i kod nas." },
  { q: "Radite li probu frizure za vjenčanje?", a: "Da, proba je uključena u Mladenački paket i radimo je 2 do 4 sedmice prije vjenčanja." },
  { q: "Imate li parking?", a: "Javni parking je 50 m od studija, a prvih sat vremena plaćamo mi." },
  { q: "Mogu li platiti karticom?", a: "Da, primamo sve kartice, a poklon bonove možete kupiti i online." },
];

export const gallery = [
  { cat: "Boja", title: "Medeni balayage" },
  { cat: "Šišanje", title: "French bob" },
  { cat: "Svečano", title: "Niska punđa" },
  { cat: "Boja", title: "Ledeno plava" },
  { cat: "Šišanje", title: "Curtain šiške" },
  { cat: "Svečano", title: "Holivudski valovi" },
  { cat: "Boja", title: "Bakrena" },
  { cat: "Šišanje", title: "Pixie" },
  { cat: "Svečano", title: "Pletenica za mladu" },
  { cat: "Boja", title: "Čokoladni prelaz" },
  { cat: "Šišanje", title: "Dugi slojevi" },
  { cat: "Svečano", title: "Matura 2026" },
];

export const hours = [
  ["Ponedjeljak – Petak", "09 – 20h"],
  ["Subota", "09 – 16h"],
  ["Nedjelja", "zatvoreno"],
];
