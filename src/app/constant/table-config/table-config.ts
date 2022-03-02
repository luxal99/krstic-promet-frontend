import { Column } from "../../util/table/Column";

export const ARTICLE_CATEGORY_TABLE: Column[] = [
  { name: "title", displayedName: "Naziv", value: "title" },
  { name: "option", displayedName: "", value: "" },
];
export const ARTICLE_SUB_CATEGORY_TABLE: Column[] = [
  { name: "title", displayedName: "Naziv", value: "title" },
  {
    name: "category",
    displayedName: "Naziv kategorije",
    value: "idArticleCategory.title",
  },
  { name: "option", displayedName: "", value: "" },
];
export const WAREHOUSE_TABLE: Column[] = [
  { name: "name", displayedName: "Naziv", value: "name" },
  { name: "option", displayedName: "", value: "" },
];

export const CONVERSION_TABLE: Column[] = [
  {
    name: "conversionFromValue",
    displayedName: "Vrednost",
    value: "conversionFromValue",
  },
  {
    name: "conversionFromUnit",
    displayedName: "Jedinica konverzija",
    value: "conversionFromUnit",
  },
  {
    name: "conversionToValue",
    displayedName: "Vrednost konverzije",
    value: "conversionToValue",
  },
  {
    name: "conversionToUnit",
    displayedName: "Jedinica u kojoj se konvertuje",
    value: "conversionToUnit",
  },
  { name: "option", displayedName: "", value: "" },
];

export const CLIENT_TABLE: Column[] = [
  { name: "firstName", displayedName: "Ime", value: "firstName" },
  { name: "lastName", displayedName: "Prezime", value: "lastName" },
  { name: "telephone", displayedName: "Telefon", value: "telephone" },
  { name: "option", displayedName: "", value: "" },
];
export const ARTICLE_TABLE: Column[] = [
  { name: "name", displayedName: "Naziv", value: "name" },
  { name: "code", displayedName: "Šifra", value: "code" },
  {
    name: "purchasePrice",
    displayedName: "Nabavna cena",
    value: "purchasePrice",
  },
  {
    name: "sellingPrice",
    displayedName: "Prodajna cena",
    value: "sellingPrice",
  },
  { name: "amount", displayedName: "Na stanju", value: "amount" },
  { name: "debit", displayedName: "Zaduženje", value: "debit" },
];
export const DELIVERY_NOTE_TABLE: Column[] = [
  {
    name: "date",
    displayedName: "Datum otpremnice",
    value: "dateOfDeliveryNote",
  },
  { name: "gross", displayedName: "Ukupno", value: "gross" },
  { name: "custom", displayedName: "Status", value: "paidStatus" },
];
