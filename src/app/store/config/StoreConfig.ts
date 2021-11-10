import {StoreInterface} from "./StoreInterface";
import {
    AddArticleCategoryAction,
    DeleteArticleCategoryAction,
    GetArticleCategoryAction
} from "../actions/article-category.actions";
import {
    AddArticleSubCategoryAction,
    DeleteArticleSubCategoryAction,
    GetArticleSubCategoryAction
} from "../actions/article-sub-category.actions";

export class StoreConfig implements StoreInterface {
    createAction: any;
    deleteAction: any;
    getAction: any;


    constructor(createAction: any, deleteAction: any, getAction: any) {
        this.createAction = createAction;
        this.deleteAction = deleteAction;
        this.getAction = getAction;
    }
}

export const articleStoreConfig: StoreConfig = new StoreConfig(AddArticleCategoryAction.bind(this), DeleteArticleCategoryAction.bind(this), GetArticleCategoryAction.bind(this));
export const articleSubStoreConfig: StoreConfig = new StoreConfig(AddArticleSubCategoryAction.bind(this), DeleteArticleSubCategoryAction.bind(this), GetArticleSubCategoryAction.bind(this));
