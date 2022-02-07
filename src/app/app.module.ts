import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './components/services/data.services';
import { HttpClientModule } from '@angular/common/http';
import { ClaimProcessComponent } from './components/claim-process/claim-process.component';
import { SuperClaimComponent } from './components/super-claim/super-claim.component';
import { InsuredComponent } from './components/insured/insured.component';
import { ContactPersonsComponent } from './components/contact-persons/contact-persons.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MaterialModule } from './modules/material-module.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhonePipe } from './components/shared/pipes/phone-pipe';

@NgModule({
  declarations: [
    SuperClaimComponent,
    InsuredComponent,
    ContactPersonsComponent,
    ClaimProcessComponent,
    AppComponent,
    PhonePipe
  ],
  imports: [
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
