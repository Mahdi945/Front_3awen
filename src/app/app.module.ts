import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavbarrComponent } from './navbarr/navbarr.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ParticipateEventComponent } from './participate-event/participate-event.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { ContactComponent } from './contact/contact.component';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component'; // Ajoutez ceci

@NgModule({
  declarations: [
    AppComponent,
  
    NavbarComponent,
    HomeComponent,
    EventsComponent,
    SignupComponent,
    LoginComponent,
    AccueilComponent,
    NavbarrComponent,
    CreateEventComponent,
    ParticipateEventComponent,
    PartnershipComponent,
    ContactComponent,
    LogoutComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
