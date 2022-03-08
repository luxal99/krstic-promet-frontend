import { ArticleSubCategory } from "./article-sub-category";
import { Warehouse } from "./warehouse";
import { Conversion } from "./conversion";

export interface Article {
  id?: number;
  name: string;
  createdDate?: string;
  code: string;
  purchasePrice: number;
  sellingPrice: number;
  amount: number;
  debit?: number;
  idArticleSubCategory: ArticleSubCategory;
  idWarehouse: Warehouse;
  idConversion: Conversion;
  priceType: priceType;
}

export type priceType = "PER_UNIT" | "PER_PIECE";
