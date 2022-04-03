import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-client-date-filter-dialog",
  templateUrl: "./client-date-filter-dialog.component.html",
  styleUrls: ["./client-date-filter-dialog.component.sass"],
})
export class ClientDateFilterDialogComponent implements OnInit {
  dateForm = new FormGroup({
    startDate: new FormControl(""),
    endDate: new FormControl(""),
  });

  constructor(
    private dialogRef: MatDialogRef<ClientDateFilterDialogComponent>
  ) {}

  ngOnInit(): void {}

  filter() {
    this.dialogRef.close(this.dateForm.getRawValue());
  }
}
