import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ParticipateEventComponent } from './participate-event/participate-event.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { ContactComponent } from './contact/contact.component';
import { LogoutComponent } from './logout/logout.component';
import { LogAdminComponent } from './log-admin/log-admin.component';
import { AdminComponent } from './admin/admin.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { NewPassComponent } from './new-pass/new-pass.component';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard
import { IndexComponent } from './index/index.component'; // Import the AppIndexComponent
import { DonationSuccessComponent } from './donation-success/donation-success.component'; // Ajoutez ce composant
import { UsermanagementComponent} from './usermanagement/usermanagement.component';
import { EventrequestComponent } from './eventrequest/eventrequest.component'; // Import the EventRequestComponent
import { EventmanagementComponent } from './eventmanagement/eventmanagement.component'; // Import the EventManagementComponent

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Default route
  { path: 'accueil', component: AccueilComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'participate-event', component: ParticipateEventComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'partnership', component: PartnershipComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'log-admin', component: LogAdminComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'forget-pass', component: ForgetPassComponent },
  { path: 'new-pass', component: NewPassComponent },
  { path: 'app-index', component: IndexComponent }, // New route for AppIndexComponent
  { path: 'donation-success', component: DonationSuccessComponent }, // Ajout de la route donation-success
  { path: 'user-management', component: UsermanagementComponent, canActivate: [AuthGuard] },
  { path: 'event-request', component: EventrequestComponent, canActivate: [AuthGuard] },
  { path: 'event-management', component: EventmanagementComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }