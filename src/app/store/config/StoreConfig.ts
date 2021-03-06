import { StoreInterface } from "./StoreInterface";
import {
  AddArticleCategoryAction,
  DeleteArticleCategoryAction,
  GetArticleCategoryAction,
  UpdateArticleCategoryAction,
} from "../actions/article-category.actions";
import {
  AddArticleSubCategoryAction,
  DeleteArticleSubCategoryAction,
  GetArticleSubCategoryAction,
  UpdateArticleSubCategoryAction,
} from "../actions/article-sub-category.actions";
import {
  AddWarehouseAction,
  DeleteWarehouseAction,
  GetWarehouseAction,
  UpdateWarehouseAction,
} from "../actions/warehouse.actions";
import {
  AddArticleAction,
  DeleteArticleAction,
  GetArticleAction,
  UpdateArticleAction,
} from "../actions/article.actions";
import {
  AddConversionAction,
  DeleteConversionAction,
  GetConversionAction,
  UpdateConversionAction,
} from "../actions/conversion.actions";
import {
  AddClientAction,
  DeleteClientAction,
  GetClientAction,
  UpdateClientAction,
} from "../actions/client.actions";

export class StoreConfig implements StoreInterface {
  createAction: any;
  deleteAction: any;
  getAction: any;
  updateAction: any;

  constructor(
    createAction: any,
    deleteAction: any,
    getAction: any,
    updateAction: any
  ) {
    this.createAction = createAction;
    this.deleteAction = deleteAction;
    this.getAction = getAction;
    this.updateAction = updateAction;
  }
}

export const articleStoreConfig: StoreConfig = new StoreConfig(
  AddArticleAction.bind(this),
  DeleteArticleAction.bind(this),
  GetArticleAction.bind(this),
  UpdateArticleAction.bind(this)
);

export const articleCategoryStoreConfig: StoreConfig = new StoreConfig(
  AddArticleCategoryAction.bind(this),
  DeleteArticleCategoryAction.bind(this),
  GetArticleCategoryAction.bind(this),
  UpdateArticleCategoryAction.bind(this)
);

export const articleSubStoreConfig: StoreConfig = new StoreConfig(
  AddArticleSubCategoryAction.bind(this),
  DeleteArticleSubCategoryAction.bind(this),
  GetArticleSubCategoryAction.bind(this),
  UpdateArticleSubCategoryAction.bind(this)
);

export const warehouseStoreConfig: StoreConfig = new StoreConfig(
  AddWarehouseAction.bind(this),
  DeleteWarehouseAction.bind(this),
  GetWarehouseAction.bind(this),
  UpdateWarehouseAction.bind(this)
);

export const conversionStoreConfig: StoreConfig = new StoreConfig(
  AddConversionAction.bind(this),
  DeleteConversionAction.bind(this),
  GetConversionAction.bind(this),
  UpdateConversionAction.bind(this)
);
export const clientStoreConfig: StoreConfig = new StoreConfig(
  AddClientAction.bind(this),
  DeleteClientAction.bind(this),
  GetClientAction.bind(this),
  UpdateClientAction.bind(this)
);
