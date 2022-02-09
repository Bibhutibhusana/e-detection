import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VehicleDetailsListComponent } from './vehicle-details-list/vehicle-details-list.component';
import { InvalidVehiclesDetailsComponent } from './invalid-vehicles-details/invalid-vehicles-details.component';
import { VehicleDetailsRouting } from './vehicle-details-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VehicleDetailsListComponent,
    InvalidVehiclesDetailsComponent
  ],
  imports: [
    CommonModule,
    VehicleDetailsRouting,
    FormsModule,
    MaterialModule
  ],
  exports:[
	VehicleDetailsListComponent,
    InvalidVehiclesDetailsComponent
],
providers:[DatePipe],
})
export class VehicleDetailsModule { }
