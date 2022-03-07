import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastNotificationModel } from "../model/ToastNotificationModel";

@Component({
  selector: "app-toast-notification",
  templateUrl: "./toast-notification.component.html",
  styleUrls: ["./toast-notification.component.sass"],
})
export class ToastNotificationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ToastNotificationModel,
    private dialogRef: MatDialogRef<ToastNotificationComponent>
  ) {}

  ngOnInit(): void {
    this.closeNotification();
  }

  closeNotification() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }
}
