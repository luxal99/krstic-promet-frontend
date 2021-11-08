import {FieldConfig} from "./FieldConfig";
import {GenericService} from "../../../service/generic.service";

export interface FormBuilderConfig {
    service: GenericService<any>;
    formFields: FieldConfig[];
    formValues?: any;
    headerText?: any;
    data?: any;
}
