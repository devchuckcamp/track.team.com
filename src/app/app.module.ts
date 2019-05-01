// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgbModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guard/auth';
import { GlobalRoutesService } from './config/config';
import { ClientGlobalRoutesService } from './config/client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgbAlertModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  exports:[
  ],
  providers: [
    AuthGuard,
    GlobalRoutesService,
    ClientGlobalRoutesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
