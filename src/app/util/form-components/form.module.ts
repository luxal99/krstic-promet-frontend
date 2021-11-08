import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFieldDirective} from "./directive/dynamic-field.directive";
import {FormBuilderComponent} from "./form-builder/form-builder.component";
import {FormDateComponent} from "./form-date/form-date.component";
import {FormInputComponent} from "./form-input/form-input.component";
import {FormSelectComponent} from "./form-select/form-select.component";
import {MaterialModule} from "../../material.module";


@NgModule({
    declarations: [
        DynamicFieldDirective, FormBuilderComponent,
        FormDateComponent, FormInputComponent,
        FormSelectComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    exports: [DynamicFieldDirective, FormBuilderComponent,
        FormDateComponent, FormInputComponent,
        FormSelectComponent]
})
export class FormModule {
}
