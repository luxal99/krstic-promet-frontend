import { openDialog } from "../../modal/OpeningModal";
import { ConfirmDialogComponent } from "../confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";

export function openConfirmDialog(dialog: MatDialog, callBack: any) {
  openDialog(
    ConfirmDialogComponent,
    {
      width: "30%",
    },
    dialog
  )
    .afterClosed()
    .subscribe((resp) => {
      if (resp) {
        callBack();
      }
    });
}
