import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { BraintreeService } from './services/braintree.service';
import { ResponseComponent } from './components/response/response.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DefaultComponent } from './components/default/default.component';
import { HostedComponent } from './components/hosted/hosted.component';
import { ExpressComponent } from './components/express/express.component';
import { PpresponseComponent } from './components/ppresponse/ppresponse.component';

var appRoutes:Routes=[
  {path:'', component:DefaultComponent},
  {path:'braintree', component:HomeComponent},
  {path:'response', component:ResponseComponent},
  {path:'hosted', component:HostedComponent},
  {path:'express', component:ExpressComponent},
  {path:'ppresponse', component: PpresponseComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResponseComponent,
    NavbarComponent,
    DefaultComponent,
    HostedComponent,
    ExpressComponent,
    PpresponseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BraintreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
