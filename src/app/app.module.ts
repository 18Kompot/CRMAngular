import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IfUserLogin } from './services/authGate.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AccordionSidebarComponent } from './components/accordion-sidebar/accordion-sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TestFirebaseComponent } from './components/test-firebase/test-firebase.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CustomersComponent } from './components/customers/customers.component';
import { TimeStampToDate } from './pipes/timeStampToDate';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ContactsComponent } from './components/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AccordionSidebarComponent,
    NavbarComponent,
    TestFirebaseComponent,
    EditUserComponent,
    CustomersComponent,
    TimeStampToDate,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    //add it to make the firebase to work
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [IfUserLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }