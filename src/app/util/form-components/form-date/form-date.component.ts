import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from "../models/Field";
import {FieldConfig} from "../models/FieldConfig";

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.sass']
})
export class FormDateComponent implements OnInit, Field {

  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() value: any;
  @Input() label!: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
