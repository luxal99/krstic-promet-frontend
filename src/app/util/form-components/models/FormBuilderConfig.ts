import {FieldConfig} from "./FieldConfig";
import {Store} from "@ngrx/store";
import {StoreConfig} from "../../../store/config/StoreConfig";

export interface FormBuilderConfig {
    formFields: FieldConfig[];
    formValues?: any;
    headerText: any;
    data?: any;
    store: Store;
    storeConfig: StoreConfig;
}
