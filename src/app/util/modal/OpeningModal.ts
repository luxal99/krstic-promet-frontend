import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";

export function openDialog(
  component: ComponentType<any>,
  options: MatDialogConfig,
  dialog: MatDialog
): MatDialogRef<any> {
  return dialog.open<any>(component, options);
}
