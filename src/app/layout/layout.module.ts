import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from '../material/material.module';
import { LanguageTranslationModule } from '../shared/modules/language-translation.module';
import { PageHeaderModule } from '../shared/page-header/page-header.module';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    LanguageTranslationModule,
    PageHeaderModule
  ],
  exports:[LayoutComponent]
})
export class LayoutModule { }
