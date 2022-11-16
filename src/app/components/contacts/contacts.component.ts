import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  subscribe: any;
  contacts: Contact[] = [];
  contactsToShow: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.subscribe = this.contactService.contactSubject.subscribe((data) => {
      this.contacts = data;
      this.search('');
    });
  }

  search(value: string) {
    value = value.toLowerCase();
    this.contactsToShow = this.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(value) ||
        contact.email.toLowerCase().includes(value) ||
        contact.phones
          .filter((number) => number.includes(value))
          .includes(value)
    );
  }

  error(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 5000,
    });
  }

  ngOnDestroy(): void {
    this.subscribe ? this.subscribe.unsubscribe() : null;
  }
}
