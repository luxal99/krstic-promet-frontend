import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Field } from "../models/Field";
import { FieldConfig } from "../models/FieldConfig";
import { FormGroup } from "@angular/forms";
import { MatFormFieldAppearance } from "@angular/material/form-field";

@Component({
  selector: "app-form-input",
  templateUrl: "./form-input.component.html",
  styleUrls: ["./form-input.component.sass"],
})
export class FormInputComponent implements OnInit, Field {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() model!: any;
  @Input() width = "100%";
  @Input() disabled = false;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() appearance: MatFormFieldAppearance = "standard";
  @Input() hint!: string;
  @Input() color!: string;
  @Input() required = false;
  @Input() type = "text";
  @Output() change = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
