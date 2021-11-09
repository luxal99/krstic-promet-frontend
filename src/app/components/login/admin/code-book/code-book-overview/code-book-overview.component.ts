import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerService} from "../../../../../util/spinner/spinner.service";
import {SnackBarUtil} from "../../../../../util/snackbar/snackbar-util";
import {setDialogConfig} from "../../../../../util/modal/DialogConfig";
import {Column} from "../../../../../util/table/Column";
import {FormBuilderComponent} from "../../../../../util/form-components/form-builder/form-builder.component";
import {openDialog} from "../../../../../util/modal/OpeningModal";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilderConfig} from "../../../../../util/form-components/models/FormBuilderConfig";

@Component({
  selector: 'app-code-book-overview',
  templateUrl: './code-book-overview.component.html',
  styleUrls: ['./code-book-overview.component.sass']
})
export class CodeBookOverviewComponent implements OnInit {

  @Input() header = "";
  @Input() configData!: FormBuilderConfig;
  @Input() dataSource: any;
  @Input() displayedColumns: Column[] = [];
  @Output() otherCallAfterClose = new EventEmitter();

  constructor(private dialog: MatDialog, private spinnerService: SpinnerService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  openAddDialog() {
    openDialog(FormBuilderComponent, setDialogConfig({data: this.configData}), this.dialog)
        .afterClosed().subscribe(() => {
      this.otherCallAfterClose.emit(true);
    });
  }

  delete(id: any): void {

  }

  openEditDialog(data: any): void {
    this.configData.formValues = data;
    openDialog(FormBuilderComponent, setDialogConfig({data: this.configData}), this.dialog)
        .afterClosed().subscribe(() => {
      this.otherCallAfterClose.emit(true);
    });
  }

}
