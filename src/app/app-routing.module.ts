import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CreateEventComponent } from './create-event/create-event.component'; // Importer le composant CreateEvent
import { ParticipateEventComponent } from './participate-event/participate-event.component'; // Importer le composant ParticipateEvent
import { PartnershipComponent } from './partnership/partnership.component'; // Importer le composant Partnership
import { ContactComponent } from './contact/contact.component'; // Importer le composant Contact
import { LogoutComponent } from './logout/logout.component'; // Importer le composant Logout

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'create-event', component: CreateEventComponent }, // Ajouter la route pour CreateEvent
  { path: 'participate-event', component: ParticipateEventComponent }, // Ajouter la route pour ParticipateEvent
  { path: 'partnership', component: PartnershipComponent }, // Ajouter la route pour Partnership
  { path: 'contact', component: ContactComponent }, // Ajouter la route pour Contact
  { path: 'logout', component: LogoutComponent }, // Ajouter la route pour Logout
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers la page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }