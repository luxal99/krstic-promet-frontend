import {FieldConfig} from "./FieldConfig";
import {GenericService} from "../../../service/generic.service";
import {Store} from "@ngrx/store";

export interface FormBuilderConfig {
    service: GenericService<any>;
    formFields: FieldConfig[];
    formValues?: any;
    headerText?: any;
    data?: any;
    store?: Store;
    storeAction?: any;
}
