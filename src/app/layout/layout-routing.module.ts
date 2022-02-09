import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
	{path:'',component:LayoutComponent},
	{path:'vehicle-details',loadChildren: () => import('./modules/vehicle-details/vehicle-details.module').then((m) => m.VehicleDetailsModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
