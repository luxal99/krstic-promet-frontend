import { openDialog } from "../modal/OpeningModal";
import { ToastNotificationComponent } from "./toast-notification/toast-notification.component";
import { MatDialog } from "@angular/material/dialog";
import { ToastNotificationModel } from "./model/ToastNotificationModel";

export function openToastNotification(
  data: ToastNotificationModel,
  dialog: MatDialog
) {
  openDialog(
    ToastNotificationComponent,
    {
      position: { top: "1em", right: "1em" },
      width: "20%",
      height: "10%",
      data,
      hasBackdrop: false,
    },
    dialog
  );
}
