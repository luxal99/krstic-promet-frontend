import {Column} from "../../util/table/Column";

export const ARTICLE_CATEGORY_TABLE: Column[] = [
    {name: "title", displayedName: "Naziv", value: "title"},
    {name: "option", displayedName: "", value: ""}
];
export const ARTICLE_SUB_CATEGORY_TABLE: Column[] = [
    {name: "title", displayedName: "Naziv", value: "title"},
    {name: "category", displayedName: "Naziv kategorije", value: "idArticleCategory.title"},
    {name: "option", displayedName: "", value: ""}
];
export const WAREHOUSE_TABLE: Column[] = [
    {name: "name", displayedName: "Naziv", value: "title"},
    {name: "option", displayedName: "", value: ""}
];
