import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EchallanListComponent } from './echallan-list/echallan-list.component';
import { EChallanRoutingModule } from './echallan-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from 'src/app/shared/page-header/page-header.module';
import { IssuedEchallansComponent } from './issued-echallans/issued-echallans.component';
import { TableUtils } from 'src/app/common/utils/table-utils';



@NgModule({
  declarations: [
    EchallanListComponent,
    IssuedEchallansComponent
  ],
  imports: [
    CommonModule,
    EChallanRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    PageHeaderModule,
    ReactiveFormsModule,

  ],
  exports:[EchallanListComponent],
  providers:[DatePipe]
})
export class EchallanModule { }
