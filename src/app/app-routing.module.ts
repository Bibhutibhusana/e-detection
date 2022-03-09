import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeFieldComponent } from './practice-field/practice-field.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
	{path:'login', loadChildren : () =>import ('./login/login.module').then((m) => m.LoginModule)},
  {path:'signup', loadChildren : () =>import ('./signup/signup.module').then((m) => m.SignupModule)},
  {path: 'practice',component: PracticeFieldComponent},
  {path:'dashboard', loadChildren : () =>import ('./layout/layout.module').then((m) => m.LayoutModule),canActivate: [AuthGuard]},
  {path:'**', redirectTo:'login',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
