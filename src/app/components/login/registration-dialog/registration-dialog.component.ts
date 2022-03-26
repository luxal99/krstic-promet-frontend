import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../service/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FieldConfig } from "../../../util/form-components/models/FieldConfig";
import { FormControlNames } from "../../../constant/constant";
import { openToastNotification } from "../../../util/toast-notification/openToastNotification";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-registration-dialog",
  templateUrl: "./registration-dialog.component.html",
  styleUrls: ["./registration-dialog.component.sass"],
})
export class RegistrationDialogComponent implements OnInit {
  registrationForm = new FormGroup({
    username: new FormControl(Validators.required),
    password: new FormControl(Validators.required),
    confirmPassword: new FormControl([Validators.required]),
  });

  isPasswordMatched = false;
  usernameInputConfig: FieldConfig = {
    type: "input",
    bindValue: "",
    value: "text",
    name: FormControlNames.USERNAME,
    icon: "person",
    label: "Korisničko imee",
  };

  passwordInputConfig: FieldConfig = {
    type: "input",
    bindValue: "",
    value: "password",
    name: FormControlNames.PASSWORD,
    icon: "lock",
    label: "Šifra",
  };

  confirmPasswordInputConfig: FieldConfig = {
    type: "input",
    bindValue: "",
    value: "password",
    name: FormControlNames.CONFIRM_PASSWORD,
    icon: "lock",
    label: "Potvrda šifre",
  };
  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  registerUser() {
    this.userService
      .registerUser(this.registrationForm.getRawValue())
      .subscribe(
        (resp) => {
          openToastNotification(
            {
              notificationType: "SUCCESS",
              message: `Korisnik: ${resp.username} je uspešno registrovan`,
            },
            this.dialog
          );
        },
        () => {
          openToastNotification(
            {
              notificationType: "ERROR",
              message: `Greška prilikom kreiranja korisnika`,
            },
            this.dialog
          );
        }
      );
  }

  passwordMatching() {
    this.isPasswordMatched =
      this.registrationForm.get(FormControlNames.PASSWORD)?.value ===
        this.registrationForm.get(FormControlNames.CONFIRM_PASSWORD)?.value &&
      this.registrationForm.get(FormControlNames.PASSWORD)?.value.length > 6;
  }
}
