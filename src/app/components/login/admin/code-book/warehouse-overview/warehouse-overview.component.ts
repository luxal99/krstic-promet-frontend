import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ARTICLE_CATEGORY_TABLE} from "../../../../../constant/table-config/table-config";
import {Store} from "@ngrx/store";
import {FormBuilderConfig} from "../../../../../util/form-components/models/FormBuilderConfig";
import {FormControlNames} from "../../../../../constant/constant";
import {Validators} from "@angular/forms";
import {warehouseStoreConfig} from "../../../../../store/config/StoreConfig";
import {WarehouseState} from "../../../../../store/reducers/warehouse.reducer";

@Component({
    selector: "app-warehouse-overview",
    templateUrl: "./warehouse-overview.component.html",
    styleUrls: ["./warehouse-overview.component.sass"]
})
export class WarehouseOverviewComponent implements OnInit {

    listOfWarehouses$: Observable<any> = this.warehouseStore.select(state => state.warehouse.list);

    warehouseTableConfig = ARTICLE_CATEGORY_TABLE;

    constructor(private warehouseStore: Store<{ warehouse: WarehouseState }>) {
    }

    ngOnInit(): void {

    }


    warehouseDialogConfig: FormBuilderConfig = {
        formFields: [{
            name: FormControlNames.TITLE,
            type: "input",
            validation: [Validators.required],
            label: "Naziv",
            bindValue: ""
        }],
        headerText: "Dodaj kategoriju artikla",
        store: this.warehouseStore,
        storeConfig: warehouseStoreConfig
    };

}
