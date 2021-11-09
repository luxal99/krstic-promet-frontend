import {FieldConfig} from "./FieldConfig";
import {GenericService} from "../../../service/generic.service";
import {Store} from "@ngrx/store";
import {StoreConfig} from "../../../store/models/StoreConfig";

export interface FormBuilderConfig {
    service: GenericService<any>;
    formFields: FieldConfig[];
    formValues?: any;
    headerText?: any;
    data?: any;
    store?: Store;
    storeConfig?: StoreConfig;
}
