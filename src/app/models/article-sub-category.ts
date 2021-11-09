import {ArticleCategory} from "./article-category";

export interface ArticleSubCategory {
    id?: number;
    title?: string;
    idArticleCategory?: ArticleCategory;
}
