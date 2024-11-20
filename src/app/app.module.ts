import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavbarrComponent } from './navbarr/navbarr.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ParticipateEventComponent } from './participate-event/participate-event.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { ContactComponent } from './contact/contact.component';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AdminComponent } from './admin/admin.component';
import { LogAdminComponent } from './log-admin/log-admin.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { NewPassComponent } from './new-pass/new-pass.component';
import { IndexComponent } from './index/index.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { SpinnerService } from './spinner.service';
import { SpinnerInterceptor } from './spinner.interceptor';
import { DonationSuccessComponent } from './donation-success/donation-success.component';

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
    NewPassComponent,
    IndexComponent,
    SpinnerComponent,
    DonationSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleMapsModule,
    ReactiveFormsModule 
  ],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Modify according to your needs
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('227936580507-vmrfhtno62vkofudvqsmit1916u1ng4n.apps.googleusercontent.com') // Replace with your Google Client ID
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
