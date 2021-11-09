import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Field} from "../models/Field";
import {FieldConfig} from "../models/FieldConfig";
import {FormGroup} from "@angular/forms";
import {MatFormFieldAppearance} from "@angular/material/form-field";

@Component({
    selector: "app-form-select",
    templateUrl: "./form-select.component.html",
    styleUrls: ["./form-select.component.sass"]
})
export class FormSelectComponent implements Field, OnInit {
    @Input() config!: FieldConfig;
    @Input() group!: FormGroup;
    @Input() bindValue = "name";
    @Input() model: any;
    @Input() width = "100%";
    @Input() disabled = false;
    @Input() label!: string;
    @Input() icon = "format_align_right";
    @Input() appearance: MatFormFieldAppearance = "standard";
    @Input() hint!: string;
    @Input() color!: string;
    @Input() required = false;
    @Output() clickOnSelect = new EventEmitter();
    @Output() selectionChange = new EventEmitter();

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onChange = new EventEmitter();
    @Input() isMultiple = false;

    compareObjects(o1: any, o2: any): boolean {
        if (o2 !== null && o2 !== undefined) {
            if (o1.id && o2.id) {
                return o1.id === o2.id;
            } else {
                return o1 === o2;
            }
        } else {
            return false;
        }
    }

    ngOnInit(): void {
    }
}
