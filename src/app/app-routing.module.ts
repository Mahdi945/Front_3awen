import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ParticipateEventComponent } from './participate-event/participate-event.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { ContactComponent } from './contact/contact.component';
import { LogoutComponent } from './logout/logout.component';
import { LogAdminComponent } from './log-admin/log-admin.component'; // Importer le composant LogAdmin
import { AdminComponent } from './admin/admin.component'; // Importer le composant Admin
import { ForgetPassComponent } from './forget-pass/forget-pass.component'; // Importer le composant ForgetPass
import { NewPassComponent } from './new-pass/new-pass.component'; // Importer le composant NewPass

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'participate-event', component: ParticipateEventComponent },
  { path: 'partnership', component: PartnershipComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'log-admin', component: LogAdminComponent }, // Ajouter la route pour LogAdmin
  { path: 'admin', component: AdminComponent }, // Ajouter la route pour Admin
  { path: 'forget-pass', component: ForgetPassComponent }, // Ajouter la route pour ForgetPass
  { path: 'new-pass', component: NewPassComponent }, // Ajouter la route pour NewPass
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers la page de login
  { path: '**', redirectTo: '/login' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }