import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {decode} from "../util/jwt/jwt";
import * as moment from "moment";
import {Pages, TOKEN_NAME} from "../constant/constant";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const user = await decode(localStorage.getItem(TOKEN_NAME) as string);
        if (!user) {
            await this.router.navigate([Pages.LOGIN], {queryParams: {returnUrl: state.url}});
            return false;
        }
        // @ts-ignore
        if (moment(user.exp * 1000).format("YYYY-MM-DD HH:mm") > moment(new Date()).format("YYYY-MM-DD HH:mm")) {
            return true;
        } else {
            await this.router.navigate([Pages.LOGIN], {queryParams: {returnUrl: state.url}});
            return false;
        }
    }
}
