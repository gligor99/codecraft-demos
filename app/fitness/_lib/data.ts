export type Program = { id: string; name: string; level: 1 | 2 | 3; min: number; kcal: number; desc: string; for: string };
export const programs: Program[] = [
  { id: "hiit", name: "HIIT 45", level: 3, min: 45, kcal: 600, desc: "Intervali visokog intenziteta: sprint, skokovi, kettlebell. Puls gore, vrijeme leti.", for: "Sagorijevanje i kondicija" },
  { id: "snaga", name: "Snaga", level: 2, min: 60, kcal: 400, desc: "Čučanj, mrtvo dizanje, potisak. Tehnika prije kilaže, napredak svake sedmice.", for: "Mišićna masa i snaga" },
  { id: "spin", name: "Spin", level: 3, min: 45, kcal: 550, desc: "Bicikli, muzika i svjetla. Najzabavniji način da se ispraznite.", for: "Kardio i izdržljivost" },
  { id: "pilates", name: "Pilates", level: 1, min: 50, kcal: 250, desc: "Kontrolisani pokreti, jaka sredina tijela, bolje držanje.", for: "Core, leđa i postura" },
  { id: "mobility", name: "Mobility", level: 1, min: 45, kcal: 200, desc: "Istezanje i pokretljivost zglobova. Idealno uz posao za stolom.", for: "Fleksibilnost i oporavak" },
  { id: "core", name: "Core Express", level: 2, min: 30, kcal: 280, desc: "Pola sata trbušnjaka i stabilizacije u pauzi za ručak.", for: "Trbuh i stabilnost" },
];

export const coaches = [
  { name: "Dino", tag: "HIIT · Spin", years: 8, bio: "Bivši atletičar. Treninzi su teški, ali niko ne odustaje.", certs: ["NASM CPT", "Spinning® instruktor"] },
  { name: "Ena", tag: "Mobility · Core", years: 6, bio: "Fizioterapeutkinja. Ako vas boli koljeno, prvo idete kod nje.", certs: ["Fizioterapija", "FRC Mobility"] },
  { name: "Haris", tag: "Snaga · Powerlifting", years: 11, bio: "Državni prvak u powerliftingu. Tehnika je zakon.", certs: ["NSCA CSCS", "IPF sudija"] },
  { name: "Lejla", tag: "Pilates", years: 5, bio: "Reformer i mat pilates. Strpljiva s početnicima, stroga s držanjem.", certs: ["STOTT Pilates", "Yoga 200h"] },
];

export const plans = [
  { name: "Osnovni", month: 45, perks: ["Teretana 06–23h", "Svlačionice i tuševi", "Uvodni trening"] },
  { name: "Pulse", month: 65, perks: ["Sve iz Osnovnog", "Neograničeni grupni treninzi", "Aplikacija za rezervacije", "Mjerenje sastava tijela"], hot: true },
  { name: "Pro", month: 110, perks: ["Sve iz Pulse", "4 personalna treninga mjesečno", "Plan ishrane", "Ručnik i ormarić"] },
];

export const compare: [string, boolean | string, boolean | string, boolean | string][] = [
  ["Teretana 06–23h", true, true, true],
  ["Grupni treninzi", "4 / mj.", "neograničeno", "neograničeno"],
  ["Rezervacija u aplikaciji", false, true, true],
  ["Mjerenje sastava tijela", false, "1× mjesečno", "svake 2 sedmice"],
  ["Personalni trening", false, false, "4 / mj."],
  ["Plan ishrane", false, false, true],
  ["Ormarić i ručnik", false, false, true],
  ["Zamrzavanje članarine", "7 dana", "14 dana", "30 dana"],
];

export const faq = [
  { q: "Mogu li doći na probni trening besplatno?", a: "Da. Prvi dan je besplatan, uključujući grupni trening po izboru i obilazak s trenerom." },
  { q: "Da li je ugovor obavezan?", a: "Ne. Mjesečne članarine otkazujete kad želite. Godišnja je jeftinija 20% i plaća se odjednom ili u 3 rate." },
  { q: "Šta ako nikad nisam trenirao/la?", a: "Svaki novi član dobija uvodni trening i plan za prve 4 sedmice. Treninzi s oznakom 'Lagano' su za početnike." },
  { q: "Koliko ranije moram rezervisati grupni trening?", a: "Rezervacije se otvaraju 7 dana unaprijed. Otkazivanje do 2 sata prije bez penala." },
  { q: "Imate li parking?", a: "Da, 40 besplatnih mjesta ispred teretane i stalak za bicikle." },
];

export const DAYS = ["PON", "UTO", "SRI", "ČET", "PET", "SUB"];
