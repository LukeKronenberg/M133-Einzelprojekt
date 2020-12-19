import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "./interfaces.ts";

var products: Product[] = [
    {
        "id": v4.generate(),
        "name": "Nektarinen gelb",
        "description": "Herkunft: Spanien",
        "priceCurrent": 3.6,
        "priceBase": 5.2,
        "imageName": "nektarinen.jpg",
    },
    {
        "id": v4.generate(),
        "name": "Rispentomaten",
        "description": "Tomaten verfügen über einen hohen Gehalt an Vitamin C sowie Zucker und Mineralstoffen.",
        "priceCurrent": 2.65,
        "priceBase": 3.1,
        "imageName": "tomaten.jpg"
    },
    {
        "id": v4.generate(),
        "name": "Kalbs-Bratwürste",
        "description": "Terra Suisse Kalbs-Bratwurst 3x2 Stück",
        "priceCurrent": 8.25,
        "priceBase": 16.5,
        "imageName": "kalbsbratwuerste.jpg"
    },
    {
        "id": v4.generate(),
        "name": "Appenzeller Classic",
        "description": "Schweizer Halbhartkäse und  vollfett. aus Rohmilch",
        "priceCurrent": 2.7,
        "priceBase": 3.45,
        "imageName": "appenzeller.jpg"
    },
    {
        "id": v4.generate(),
        "name": "Eier",
        "description": "9 Schweizer Eier aus Frilandhaltung",
        "priceCurrent": 4.5,
        "priceBase": 5.4,
        "imageName": "eier.jpg"
    },
    {
        "id": v4.generate(),
        "name": "Krustenkranz",
        "description": "Terra Suisse",
        "priceCurrent": 2,
        "priceBase": 2.3,
        "imageName": "krustenkranz.jpg"
    },
    {
        "id": v4.generate(),
        "name": "Magunm Almond",
        "description": "Vanilleglace und Milchschokolade mit Mandeln",
        "priceCurrent": 7.9,
        "priceBase": 9.9,
        "imageName": "vanille_glace.jpg"
    },
    {
        "id": v4.generate(),
        "name": "Iced Green Tea",
        "description": "AriZona Green Tea - Grünteegrtränk",
        "priceCurrent": 7.5,
        "priceBase": 10.8,
        "imageName": "icedtea.jpg"
    },
    {
        "id": v4.generate(),
        "name": "Senf",
        "description": "Senf mild",
        "priceCurrent": 2.7,
        "priceBase": 3.4,
        "imageName": "senf.jpg"
    },
    {
        "id": v4.generate(),
        "name": "Olivenöl",
        "description": "Bertolli Olivenöl extra vergine originale",
        "priceCurrent": 14.35,
        "priceBase": 17.95,
        "imageName": "olivenoel.jpg"
    }
]

export default products;