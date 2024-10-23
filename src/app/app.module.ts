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
import { FooterComponent } from './footer/footer.component'; // Ajout du footer
import { HttpClientModule } from '@angular/common/http';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AdminComponent } from './admin/admin.component';
import { LogAdminComponent } from './log-admin/log-admin.component'; // Importer HttpClientModule

// Import pour Google OAuth
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { NewPassComponent } from './new-pass/new-pass.component';

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
    FooterComponent,
    EmailVerificationComponent,
    AdminComponent,
    LogAdminComponent,
    ForgetPassComponent,
    NewPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule 
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Modifiez selon vos besoins
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('227936580507-vmrfhtno62vkofudvqsmit1916u1ng4n.apps.googleusercontent.com') // Remplacez par votre Client ID Google
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
