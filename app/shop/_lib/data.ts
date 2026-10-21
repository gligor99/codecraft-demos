export type Product = {
  id: string;
  slug: string;
  name: string;
  origin: string;
  region: string;
  notes: string[];
  type: "Espresso" | "Filter" | "Bez kofeina";
  price: number;
  bag: string;
  label: string;
  roast: number;
  isNew?: boolean;
  process: string;
  altitude: string;
  desc: string;
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  { id: "p1", slug: "jutro", name: "Jutro", origin: "Brazil · Cerrado", region: "Brazil", notes: ["čokolada", "lješnjak", "karamel"], type: "Espresso", price: 18, bag: "#23402f", label: "#e9d8b4", roast: 3, process: "Prirodna", altitude: "1.100 m", desc: "Naš svakodnevni espresso. Pun, sladak, odličan s mlijekom i bez njega.", rating: 4.8, reviews: 214 },
  { id: "p2", slug: "etiopija-guji", name: "Etiopija Guji", origin: "Etiopija · Guji", region: "Etiopija", notes: ["jasmin", "breskva", "bergamot"], type: "Filter", price: 24, bag: "#d4561c", label: "#f6e7cf", roast: 1, isNew: true, process: "Prana", altitude: "2.100 m", desc: "Cvjetna i sočna, kao čaj od breskve. Najbolja iz V60 ili Chemexa.", rating: 4.9, reviews: 87 },
  { id: "p3", slug: "kolumbija-huila", name: "Kolumbija Huila", origin: "Kolumbija · Huila", region: "Kolumbija", notes: ["crvena jabuka", "panela", "kakao"], type: "Filter", price: 22, bag: "#8a5a3c", label: "#f1e2c8", roast: 2, process: "Prana", altitude: "1.700 m", desc: "Balansirana i slatka. Dobra za početak ako tek otkrivate filter kafu.", rating: 4.7, reviews: 132 },
  { id: "p4", slug: "nona", name: "Nona", origin: "Blend · Brazil, Indija", region: "Blend", notes: ["tamna čokolada", "začini", "pun ukus"], type: "Espresso", price: 16, bag: "#1d1a16", label: "#d4561c", roast: 3, process: "Prirodna / prana", altitude: "900–1.300 m", desc: "Kafa kakvu je pila nana, samo bolja. Odlična i za džezvu.", rating: 4.6, reviews: 301 },
  { id: "p5", slug: "nocna-smjena", name: "Noćna smjena", origin: "Kolumbija · Swiss Water", region: "Kolumbija", notes: ["mlijeko", "keks", "med"], type: "Bez kofeina", price: 20, bag: "#5b6b8c", label: "#ecebe6", roast: 2, process: "Swiss Water (bez hemikalija)", altitude: "1.600 m", desc: "Sav ukus, bez kofeina. Za kasnu kafu bez nesanice.", rating: 4.7, reviews: 64 },
  { id: "p6", slug: "kenija-nyeri", name: "Kenija Nyeri", origin: "Kenija · Nyeri", region: "Kenija", notes: ["crna ribizla", "grejp", "sok"], type: "Filter", price: 26, bag: "#7a2f3b", label: "#f3d9c9", roast: 1, isNew: true, process: "Prana", altitude: "1.800 m", desc: "Intenzivna, voćna, gotovo kao sok od ribizle. Za avanturiste.", rating: 4.8, reviews: 41 },
  { id: "p7", slug: "gvatemala-antigua", name: "Gvatemala Antigua", origin: "Gvatemala · Antigua", region: "Gvatemala", notes: ["mliječna čokolada", "narandža", "badem"], type: "Espresso", price: 21, bag: "#3d5a6b", label: "#f0e6d6", roast: 2, process: "Prana", altitude: "1.500 m", desc: "Espresso za one koji vole malo kiselosti i puno slatkoće.", rating: 4.7, reviews: 58 },
  { id: "p8", slug: "ruanda-huye", name: "Ruanda Huye", origin: "Ruanda · Huye", region: "Ruanda", notes: ["šljiva", "crni čaj", "med"], type: "Filter", price: 25, bag: "#5a3d6b", label: "#efe3f0", roast: 1, process: "Prana", altitude: "1.900 m", desc: "Sezonska kafa iz male zadruge žena farmera. Ograničena količina.", rating: 4.9, reviews: 23 },
];

export const SIZES = [
  { id: "250", label: "250 g", k: 1 },
  { id: "500", label: "500 g", k: 1.85 },
  { id: "1000", label: "1 kg", k: 3.4 },
];
export const GRINDS = ["Zrno", "Espresso", "Filter / V60", "Džezva"];

export const reviewsFor = (p: Product) => [
  { name: "Merima", stars: 5, text: `${p.notes[0][0].toUpperCase() + p.notes[0].slice(1)} se osjeti od prvog gutljaja. Naručujem ponovo.` },
  { name: "Tarik", stars: 5, text: "Stigla za dva dana, pržena prije pet. Razlika u odnosu na kafu iz marketa je ogromna." },
  { name: "Ana", stars: 4, text: "Odlična, samo bih voljela i manje pakovanje za probu." },
];

export const faq = [
  { q: "Kada stiže narudžba?", a: "Pržimo utorkom i četvrtkom, šaljemo isti dan. Dostava u BiH traje 1–2 radna dana." },
  { q: "Koliko košta dostava?", a: "7 KM za cijelu BiH, besplatno za narudžbe iznad 60 KM i za sve pretplate." },
  { q: "Kako da izaberem mljevenje?", a: "Ako imate mlin, uzmite zrno. Za aparat espresso, za V60 i French press filter, a za bosansku kafu džezvu." },
  { q: "Mogu li vratiti kafu?", a: "Ako vam se kafa ne svidi, javite se u roku 14 dana i šaljemo drugu ili vraćamo novac." },
  { q: "Prodajete li veleprodajno kafićima?", a: "Da. Pišite nam za cjenovnik, probu i obuku baristi." },
];
