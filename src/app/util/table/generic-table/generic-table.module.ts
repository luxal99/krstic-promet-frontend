import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MapColumnArrayPipe} from "./pipes/map-column-array.pipe";
import {DynamicPropertyPipe} from "./pipes/dynamic-property.pipe";
import {GenericTableComponent} from "./generic-table.component";
import {CapitalizePipe} from "../../../pipes/capitalize.pipe";
import {MatTableModule} from "@angular/material/table";


@NgModule({
    declarations: [
        MapColumnArrayPipe,
        DynamicPropertyPipe,
        GenericTableComponent,
        CapitalizePipe
    ],
    exports: [
        MapColumnArrayPipe,
        DynamicPropertyPipe,
        GenericTableComponent
    ],
    imports: [
        CommonModule,
        MatTableModule
    ]
})
export class GenericTableModule {
}
