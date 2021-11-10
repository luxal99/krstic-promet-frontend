import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {AdminComponent} from "./components/login/admin/admin.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: AdminComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
