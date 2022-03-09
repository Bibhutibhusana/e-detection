import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VehicleDetailsListComponent } from './vehicle-details-list/vehicle-details-list.component';
import { InvalidVehiclesDetailsComponent } from './invalid-vehicles-details/invalid-vehicles-details.component';
import { VehicleDetailsRouting } from './vehicle-details-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from 'src/app/shared/page-header/page-header.module';
import { VehicleClassComparisionComponent } from './vehicle-class-comparision/vehicle-class-comparision.component';



@NgModule({
  declarations: [
    VehicleDetailsListComponent,
    InvalidVehiclesDetailsComponent,
    VehicleClassComparisionComponent
  ],
  imports: [
    CommonModule,
    VehicleDetailsRouting,
    FormsModule,
    MaterialModule,
    TranslateModule,
    PageHeaderModule
  ],
  exports:[
	VehicleDetailsListComponent,
    InvalidVehiclesDetailsComponent
],
providers:[DatePipe],
})
export class VehicleDetailsModule { }
