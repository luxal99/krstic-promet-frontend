import { Column } from "generic-material-table/lib/models/Column";

export const ARTICLE_CATEGORY_TABLE: Column[] = [
  {
    name: "title",
    displayedName: "Naziv",
    value: "title",
    columnType: "GENERIC",
  },
  { name: "option", displayedName: "", value: "", columnType: "CUSTOM" },
];
export const ARTICLE_SUB_CATEGORY_TABLE: Column[] = [
  {
    name: "title",
    displayedName: "Naziv",
    value: "title",
    columnType: "GENERIC",
  },
  {
    name: "category",
    displayedName: "Naziv kategorije",
    value: "idArticleCategory.title",
    columnType: "GENERIC",
  },
  { name: "option", displayedName: "", value: "", columnType: "CUSTOM" },
];
export const WAREHOUSE_TABLE: Column[] = [
  {
    name: "name",
    displayedName: "Naziv",
    value: "name",
    columnType: "GENERIC",
  },
  { name: "option", displayedName: "", value: "", columnType: "CUSTOM" },
];

export const CONVERSION_TABLE: Column[] = [
  {
    name: "name",
    displayedName: "Naziv konverzije",
    value: "name",
    columnType: "GENERIC",
  },
  {
    name: "conversionFromValue",
    displayedName: "Vrednost",
    value: "conversionFromValue",
    columnType: "GENERIC",
  },
  {
    name: "conversionFromUnit",
    displayedName: "Jedinica konverzija",
    value: "conversionFromUnit",
    columnType: "GENERIC",
  },
  {
    name: "conversionToValue",
    displayedName: "Vrednost konverzije",
    value: "conversionToValue",
    columnType: "GENERIC",
  },
  {
    name: "conversionToUnit",
    displayedName: "Jedinica u kojoj se konvertuje",
    value: "conversionToUnit",
    columnType: "GENERIC",
  },
  {
    name: "option",
    displayedName: "",
    value: "",
    columnType: "CUSTOM",
  },
];

export const CLIENT_TABLE: Column[] = [
  {
    name: "firstName",
    displayedName: "Ime",
    value: "firstName",
    columnType: "GENERIC",
  },
  {
    name: "lastName",
    displayedName: "Prezime",
    value: "lastName",
    columnType: "GENERIC",
  },
  {
    name: "telephone",
    displayedName: "Telefon",
    value: "telephone",
    columnType: "GENERIC",
  },
];
export const ARTICLE_TABLE: Column[] = [
  {
    name: "name",
    displayedName: "Naziv",
    value: "name",
    columnType: "GENERIC",
  },
  {
    name: "code",
    displayedName: "Šifra",
    value: "code",
    columnType: "GENERIC",
  },
  {
    name: "purchasePrice",
    displayedName: "Nabavna cena",
    value: "purchasePrice",
    columnType: "GENERIC",
  },
  {
    name: "sellingPrice",
    displayedName: "Prodajna cena",
    value: "sellingPrice",
    columnType: "GENERIC",
  },
  {
    name: "amount",
    displayedName: "Na stanju",
    value: "amount",
    columnType: "GENERIC",
  },
  {
    name: "debit",
    displayedName: "Zaduženje",
    value: "debit",
    columnType: "GENERIC",
  },
];

export const ARTICLE_BEFORE_PURCHASE_TABLE: Column[] = [
  {
    name: "name",
    displayedName: "Naziv",
    value: "name",
    columnType: "GENERIC",
  },
  {
    name: "code",
    displayedName: "Šifra",
    value: "code",
    columnType: "GENERIC",
  },
  {
    name: "sellingPrice",
    displayedName: "Prodajna cena",
    value: "sellingPrice",
    columnType: "GENERIC",
  },
  {
    name: "amount",
    displayedName: "Poručena količina",
    value: "amount",
    columnType: "GENERIC",
  },
];
export const DELIVERY_NOTE_TABLE: Column[] = [
  {
    name: "gross",
    displayedName: "Ukupno",
    value: "gross",
    columnType: "GENERIC",
  },
];
