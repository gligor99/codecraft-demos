export type Dish = { id: string; cat: string; name: string; desc: string; price: number; hue: [string, string]; tag?: string; veg?: boolean };

export const menu: Dish[] = [
  { id: "d1", cat: "Roštilj", name: "Ćevapi 10/1", desc: "Lepinja s ognjišta, luk, kajmak", price: 12, hue: ["#8a3b1d", "#e8a93c"], tag: "Najprodavanije" },
  { id: "d2", cat: "Roštilj", name: "Pljeskavica punjena", desc: "Kajmak i sir, pomfrit, salata", price: 14, hue: ["#6e2f17", "#d9873a"] },
  { id: "d3", cat: "Roštilj", name: "Miješano meso za dvoje", desc: "Ćevapi, ražnjići, kobasice, piletina", price: 38, hue: ["#5a2412", "#c4502a"] },
  { id: "d11", cat: "Roštilj", name: "Pileći ražnjići", desc: "Marinirana piletina, ajvar, pita", price: 13, hue: ["#7a4a1d", "#f0b45a"] },
  { id: "d4", cat: "Ispod sača", name: "Teletina ispod sača", desc: "S krompirom, sporo pečeno 3 sata", price: 22, hue: ["#4a2a14", "#b7793a"], tag: "Po narudžbi" },
  { id: "d5", cat: "Ispod sača", name: "Jagnjetina ispod sača", desc: "Ruzmarin, mladi krompir", price: 26, hue: ["#3d2513", "#a8652c"] },
  { id: "d12", cat: "Ispod sača", name: "Povrće ispod sača", desc: "Paprika, tikvica, patlidžan, krompir", price: 14, hue: ["#3d4a1d", "#b7c25a"], veg: true },
  { id: "d6", cat: "Pite", name: "Burek", desc: "Domaće razvučeno tijesto, meso", price: 6, hue: ["#7a5a2a", "#f0c470"] },
  { id: "d7", cat: "Pite", name: "Sirnica", desc: "Svježi kravlji sir", price: 6, hue: ["#7d6a3a", "#f3dca0"], veg: true },
  { id: "d13", cat: "Pite", name: "Zeljanica", desc: "Špinat i sir", price: 6, hue: ["#4d5a2a", "#c9d97a"], veg: true },
  { id: "d8", cat: "Čorbe", name: "Begova čorba", desc: "Piletina, bamija, kiselo vrhnje", price: 5.5, hue: ["#6b5220", "#e2b45a"] },
  { id: "d14", cat: "Čorbe", name: "Teleća čorba", desc: "Povrće, peršun, domaći rezanci", price: 6, hue: ["#5b3a1a", "#d99a4a"] },
  { id: "d9", cat: "Deserti", name: "Tufahija", desc: "Jabuka, orah, šlag", price: 4, hue: ["#7a4a3a", "#f1d5b0"], veg: true },
  { id: "d10", cat: "Deserti", name: "Hurmašice", desc: "Tri komada, sirup od limuna", price: 4.5, hue: ["#6a3a1a", "#d99a4a"], veg: true },
  { id: "d15", cat: "Pića", name: "Domaća limunada", desc: "0,5 l, menta i med", price: 4, hue: ["#7a7a1a", "#f3e36a"], veg: true },
  { id: "d16", cat: "Pića", name: "Bosanska kafa", desc: "Džezva, rahatlokum", price: 3, hue: ["#2a1a10", "#8a5a3c"], veg: true },
];

export const cats = ["Roštilj", "Ispod sača", "Pite", "Čorbe", "Deserti", "Pića"];

export const reviews = [
  { name: "Damir", text: "Ćevapi kao kod nane. Dostava stigla za 25 minuta, još topla.", src: "Google" },
  { name: "Sara", text: "Teletina ispod sača je razlog zašto dolazimo iz drugog grada.", src: "Tripadvisor" },
  { name: "Mirza", text: "Naručio za kancelariju, 14 ljudi, sve tačno i na vrijeme.", src: "Google" },
  { name: "Ivana", text: "Najbolja sirnica u gradu i ljubazno osoblje.", src: "Facebook" },
  { name: "Adnan", text: "Bašta ljeti je posebna priča. Rezervišite ranije.", src: "Google" },
  { name: "Lea", text: "Vegetarijanska opcija ispod sača me iznenadila. Sjajno.", src: "Tripadvisor" },
];

export const faq = [
  { q: "Do koje udaljenosti dostavljate?", a: "Unutar 7 km od restorana. Dostava je 3 KM, a besplatna za narudžbe iznad 40 KM." },
  { q: "Koliko unaprijed naručiti jelo ispod sača?", a: "Najmanje 3 sata, jer se peče sporo. Za grupe veće od 6 osoba javite dan ranije." },
  { q: "Imate li vegetarijanska jela?", a: "Da: povrće ispod sača, pite sa sirom i zeljem, salate i deserti. Označeni su listićem u meniju." },
  { q: "Primate li kartice?", a: "U restoranu da. Kod dostave plaćate gotovinom ili karticom kuriru." },
  { q: "Može li se rezervisati cijela bašta?", a: "Može, za proslave do 60 osoba. Pogledajte stranicu Catering i događaji." },
];

export const hours = [
  ["Ponedjeljak – Četvrtak", "10 – 23h"],
  ["Petak – Subota", "10 – 24h"],
  ["Nedjelja", "12 – 22h"],
];

export const timeline = [
  ["1974.", "Djed Halil otvara ćevabdžinicu s četiri stola uz most."],
  ["1992.", "Konoba radi i u najtežim godinama, s jednim roštiljem i puno komšija."],
  ["2008.", "Sin Kemal dodaje sač i baštu uz rijeku."],
  ["2026.", "Treća generacija: online narudžbe, ista vatra, isti recept."],
];

export const packages = [
  { name: "Porodični ručak", people: "10–25", price: 28, items: ["Miješano meso", "Pite", "Salate", "Desert i kafa"] },
  { name: "Proslava u bašti", people: "25–60", price: 42, items: ["Teletina ispod sača", "Roštilj", "Predjelo", "Torta po želji", "Muzika do ponoći"], hot: true },
  { name: "Catering za firmu", people: "15+", price: 18, items: ["Dostava na adresu", "Pakovanje za buffet", "Posuđe i salvete", "Račun za firmu"] },
];
