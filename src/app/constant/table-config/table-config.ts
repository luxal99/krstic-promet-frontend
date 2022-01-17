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
  { name: "option", displayedName: "", value: "" },
];
