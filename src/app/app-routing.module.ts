import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoggedInGuard } from "./shared/guards/loggedIn/loggedIn.guard";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "menu/event",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./modules/signup/signup.module").then((m) => m.SignupModule),
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./modules/menu/menu.module").then((m) => m.MenuModule),
    canActivate: [LoggedInGuard],
    runGuardsAndResolvers: "always",
  },
  {
    path: "edit-profile",
    loadChildren: () =>
      import("./modules/editProfile/editProfile.module").then(
        (m) => m.EditProfileModule
      ),
  },
  {
    path: "legal-info",
    loadChildren: () =>
      import("./modules/legalInfo/legalInfo.module").then(
        (m) => m.LegalInfoModule
      ),
  },
  {
    path: "change-password",
    loadChildren: () =>
      import("./modules/changePassword/changePassword.module").then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./modules/forgotPassword/forgotPassword.module").then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      initialNavigation: "enabledBlocking",
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
