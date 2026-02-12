import { Offer, Recipe } from "@/lib/types";

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: "r1",
    name: "Kyllingefad med rodfrugter",
    tags: ["standard", "børnevenlig"],
    basePricePerPerson: 28,
    ingredients: ["kylling", "kartofler", "gulerødder", "løg"]
  },
  {
    id: "r2",
    name: "Vegetarisk chili sin carne",
    tags: ["vegetar"],
    basePricePerPerson: 22,
    ingredients: ["bønner", "hakkede tomater", "løg", "peberfrugt"]
  },
  {
    id: "r3",
    name: "Laks med bulgur og grønt",
    tags: ["high-protein"],
    basePricePerPerson: 35,
    ingredients: ["laks", "bulgur", "broccoli", "citron"]
  },
  {
    id: "r4",
    name: "Pasta bolognese",
    tags: ["standard"],
    basePricePerPerson: 24,
    ingredients: ["oksekød", "pasta", "hakkede tomater", "løg"]
  },
  {
    id: "r5",
    name: "Wraps med kalkun og grønt",
    tags: ["high-protein", "standard"],
    basePricePerPerson: 26,
    ingredients: ["kalkun", "tortilla", "salat", "tomat"]
  },
  {
    id: "r6",
    name: "Dhal med ris",
    tags: ["vegetar"],
    basePricePerPerson: 20,
    ingredients: ["linser", "kokosmælk", "karry", "ris"]
  },
  {
    id: "r7",
    name: "Frikadeller med kartoffelsalat",
    tags: ["standard", "børnevenlig"],
    basePricePerPerson: 30,
    ingredients: ["svinekød", "kartofler", "æg", "agurk"]
  },
  {
    id: "r8",
    name: "Ovnbagte grøntsager med feta",
    tags: ["vegetar"],
    basePricePerPerson: 21,
    ingredients: ["squash", "peberfrugt", "feta", "kikærter"]
  }
];

export const SAMPLE_OFFERS: Offer[] = [
  { ingredient: "kylling", store: "Føtex Food", discountedPrice: 18, validUntil: "2026-12-31" },
  { ingredient: "laks", store: "Føtex Food", discountedPrice: 25, validUntil: "2026-12-31" },
  { ingredient: "hakkede tomater", store: "Føtex Food", discountedPrice: 5, validUntil: "2026-12-31" },
  { ingredient: "linser", store: "Bilka", discountedPrice: 8, validUntil: "2026-12-31" },
  { ingredient: "kartofler", store: "Netto", discountedPrice: 10, validUntil: "2026-12-31" }
];
