import {Component, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FieldConfig} from "../../util/form-components/models/FieldConfig";
import {Router} from "@angular/router";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarUtil} from "../../util/snackbar/snackbar-util";
import {MatSpinner} from "@angular/material/progress-spinner";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControlNames, Pages, TOKEN_NAME} from "src/app/constant/constant";
import {UserService} from "../../service/user.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {

    @ViewChild("spinner") spinner!: MatSpinner;

    loginForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(5)]),
        password: new FormControl("", [Validators.required, Validators.minLength(5)])
    });


    usernameInputConfig: FieldConfig = {
        type: "input",
        name: FormControlNames.USERNAME,
        value: "text", bindValue: ""
    };
    passwordInputConfig: FieldConfig = {
        type: "input",
        name: FormControlNames.PASSWORD,
        value: "password", bindValue: ""
    };

    constructor(private spinnerService: SpinnerService, private userService: UserService,
                private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    auth(): void {
        this.spinnerService.show(this.spinner);
        this.userService.auth(this.loginForm.getRawValue()).subscribe(async (resp) => {
            localStorage.setItem(TOKEN_NAME, resp.headers.get(TOKEN_NAME) as string);
            this.spinnerService.hide(this.spinner);
            await this.router.navigate([Pages.ADMIN]);
        }, (err: HttpErrorResponse) => {
            SnackBarUtil.openSnackBar(this.snackBar, err.error.message);
            this.spinnerService.hide(this.spinner);
        });
    }

}
