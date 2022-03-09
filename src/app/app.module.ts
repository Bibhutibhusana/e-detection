import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './common/alert/alert.component';
import { PracticeFieldComponent } from './practice-field/practice-field.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { LanguageTranslationModule } from './shared/modules/language-translation.module';
import { InterceptorService } from './main/interceptor/interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    PracticeFieldComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    LanguageTranslationModule,
    FontAwesomeModule,
  ],
  providers: [{
	  provide: HTTP_INTERCEPTORS,
	useClass: InterceptorService,
	multi:true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
