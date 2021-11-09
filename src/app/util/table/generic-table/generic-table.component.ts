import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Column} from "../Column";

@Component({
    selector: "app-generic-table",
    templateUrl: "./generic-table.component.html",
    styleUrls: ["./generic-table.component.sass"]
})
export class GenericTableComponent implements OnInit {


    @Input() dataSource: any;
    @Input() displayedColumns: Column[] = [];
    @Output() onDelete = new EventEmitter()
    @Output() onOverview = new EventEmitter()
    @Output() openEdit = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }


}
