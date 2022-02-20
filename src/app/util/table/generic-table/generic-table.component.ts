import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { Column } from "../Column";
import { openDialog } from "../../modal/OpeningModal";
import { FormBuilderComponent } from "../../form-components/form-builder/form-builder.component";
import { setDialogConfig } from "../../modal/DialogConfig";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilderConfig } from "../../form-components/models/FormBuilderConfig";
import { openConfirmDialog } from "../../confirm-dialog/config/confirm-dialog-config";

@Component({
  selector: "app-generic-table",
  templateUrl: "./generic-table.component.html",
  styleUrls: ["./generic-table.component.sass"],
})
export class GenericTableComponent implements OnInit {
  @Input() dataSource: any;
  @Input() displayedColumns: Column[] = [];
  @Output() onDelete = new EventEmitter();
  @Output() onOverview = new EventEmitter();
  @Output() openEdit = new EventEmitter();
  @Input() genericDialogConfig!: FormBuilderConfig;
  @Input() customColumnTemplate!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.customColumnTemplate);
  }

  openAddDialog(formValues: any) {
    this.genericDialogConfig.formValues = formValues;
    openDialog(
      FormBuilderComponent,
      setDialogConfig({
        width: "30%",
        data: this.genericDialogConfig,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {
        this.genericDialogConfig.formValues = null;
      });
  }

  delete(id: number) {
    openConfirmDialog(this.dialog, () => {
      this.genericDialogConfig.store?.dispatch(
        new this.genericDialogConfig.storeConfig.deleteAction(id)
      );
    });
  }
}
