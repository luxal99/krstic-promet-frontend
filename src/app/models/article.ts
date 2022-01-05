import { ArticleSubCategory } from "./article-sub-category";
import { Warehouse } from "./warehouse";

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
  idConversion: any;
}
