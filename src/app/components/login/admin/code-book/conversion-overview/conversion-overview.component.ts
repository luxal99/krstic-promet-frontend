import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  CONVERSION_TABLE,
  WAREHOUSE_TABLE,
} from "../../../../../constant/table-config/table-config";
import { Store } from "@ngrx/store";
import { FormBuilderConfig } from "../../../../../util/form-components/models/FormBuilderConfig";
import { FormControlNames } from "../../../../../constant/constant";
import { Validators } from "@angular/forms";
import { conversionStoreConfig } from "../../../../../store/config/StoreConfig";
import { ConversionState } from "../../../../../store/reducers/conversion.reducer";
import { UnitEnum } from "../../../../../enum/UnitEnum";

@Component({
  selector: "app-conversion-overview",
  templateUrl: "./conversion-overview.component.html",
  styleUrls: ["./conversion-overview.component.sass"],
})
export class ConversionOverviewComponent implements OnInit {
  listOfConversions$: Observable<any> = this.conversionStore.select(
    (state) => state.conversion.list
  );

  conversionTableConfig = CONVERSION_TABLE;

  constructor(
    private conversionStore: Store<{ conversion: ConversionState }>
  ) {}

  ngOnInit(): void {}

  conversionDialogConfig: FormBuilderConfig = {
    formFields: [
      {
        name: FormControlNames.CONVERSION_FROM_VALUE,
        type: "input",
        icon: "format_align_right",
        validation: [Validators.required],
        label: "Vrednost prve",
        bindValue: "",
      },
      {
        name: FormControlNames.CONVERSION_FROM_UNIT,
        type: "select",
        icon: "format_align_right",
        validation: [Validators.required],
        options: Object.values(UnitEnum),
        label: "Jedinica iz koje se pretvara",
        bindValue: "",
      },
      {
        name: FormControlNames.CONVERSION_TO_VALUE,
        type: "input",
        icon: "format_align_right",
        validation: [Validators.required],
        label: "Vrednost druge",
        bindValue: "",
      },
      {
        name: FormControlNames.CONVERSION_TO_UNIT,
        type: "select",
        icon: "format_align_right",
        validation: [Validators.required],
        options: Object.values(UnitEnum),
        label: "Jedinica u koju se pretvara",
        bindValue: "",
      },
    ],
    headerText: "Dodaj konverziju",
    store: this.conversionStore,
    storeConfig: conversionStoreConfig,
  };
}
