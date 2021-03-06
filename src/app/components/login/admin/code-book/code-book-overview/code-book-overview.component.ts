import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SpinnerService } from "../../../../../util/spinner/spinner.service";
import { setDialogConfig } from "../../../../../util/modal/DialogConfig";
import { FormBuilderComponent } from "../../../../../util/form-components/form-builder/form-builder.component";
import { openDialog } from "../../../../../util/modal/OpeningModal";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilderConfig } from "../../../../../util/form-components/models/FormBuilderConfig";
import { MatSpinner } from "@angular/material/progress-spinner";
import { openConfirmDialog } from "../../../../../util/confirm-dialog/config/confirm-dialog-config";
import { Column } from "generic-material-table/lib/models/Column";
import { ResponsiveService } from "../../../../../service/util/responsive.service";

@Component({
  selector: "app-code-book-overview",
  templateUrl: "./code-book-overview.component.html",
  styleUrls: ["./code-book-overview.component.sass"],
})
export class CodeBookOverviewComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @Input() header = "";
  @Input() configData!: FormBuilderConfig;
  @Input() dataSource: any;
  @Input() displayedColumns: Column[] = [];
  @Output() otherCallAfterClose = new EventEmitter();

  @ViewChild("spinner") spinner!: MatSpinner;
  @ViewChild("optionBtnsTemplateRef") optionBtnsTemplateRef!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.dataSource) {
        this.spinnerService.hide(this.spinner);
      }
    }, 100);
  }

  ngAfterViewInit(): void {
    //@ts-ignore
    this.displayedColumns.find(
      (item) => item.columnType === "CUSTOM"
    ).templateRef = this.optionBtnsTemplateRef;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  openAddDialog() {
    openDialog(
      FormBuilderComponent,
      setDialogConfig({
        width: "30%",
        data: this.configData,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {
        this.otherCallAfterClose.emit(true);
      });
  }

  delete(id: any): void {
    openConfirmDialog(this.dialog, () => {
      this.configData.store?.dispatch(
        new this.configData.storeConfig.deleteAction(id)
      );
    });
  }

  openEditDialog(data: any): void {
    this.configData.formValues = data;
    openDialog(
      FormBuilderComponent,
      setDialogConfig({
        width: "30%",
        data: this.configData,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {
        this.otherCallAfterClose.emit(true);
      });
  }
}
