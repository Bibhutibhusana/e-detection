import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../shared/role.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
	{path:'',component:LayoutComponent,children:[
	{path:'vehicle-details',loadChildren: () => import('./modules/vehicle-details/vehicle-details.module').then((m) => m.VehicleDetailsModule),canActivateChild: [RoleGuard] },
	{path: 'echallan',loadChildren: () => import('./modules/echallan/echallan.module').then((m) => m.EchallanModule),canActivateChild: [RoleGuard]},
	{path: 'department-user', loadChildren: () => import('./modules/department-user/department-user.module').then((m) => m.DepartmentUserModule),canActivateChild:[RoleGuard]}]
	} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
