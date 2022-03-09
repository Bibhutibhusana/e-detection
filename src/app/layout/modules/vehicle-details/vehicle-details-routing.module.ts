import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvalidVehiclesDetailsComponent } from './invalid-vehicles-details/invalid-vehicles-details.component';
import { VehicleClassComparisionComponent } from './vehicle-class-comparision/vehicle-class-comparision.component';
import { VehicleDetailsListComponent } from './vehicle-details-list/vehicle-details-list.component';

const routes: Routes = [
	{path:'',component: VehicleDetailsListComponent },
	{path:'invalid-vehicles', component: InvalidVehiclesDetailsComponent},
  {path:'vehicle-class-comparision', component: VehicleClassComparisionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleDetailsRouting { }
