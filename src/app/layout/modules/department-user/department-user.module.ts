import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentUserRoutingModule } from './department-user-routing.module';
import { DepartmentUserComponent } from './department-user.component';
import { PageHeaderModule } from 'src/app/shared/page-header/page-header.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageTranslationModule } from 'src/app/shared/modules/language-translation.module';


@NgModule({
  declarations: [
    DepartmentUserComponent
  ],
  imports: [
    CommonModule,
    DepartmentUserRoutingModule,
    PageHeaderModule,
    MaterialModule,
    ReactiveFormsModule,
    LanguageTranslationModule
  ]
})
export class DepartmentUserModule { }
