import {StoreInterface} from "./StoreInterface";
import {
    AddArticleCategoryAction,
    DeleteArticleCategoryAction,
    GetArticleCategoryAction
} from "../actions/article-category.actions";

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
