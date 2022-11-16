import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Contact, ContactStatus } from '../models/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  unsubscribe: any = null;

  constructor(private afs: AngularFirestore) {
    this.subscribeToContactsCollection();
  }

  contactCollection: string = 'contacts';
  contacts: Contact[] = [];
  contactSubject = new BehaviorSubject<Contact[]>(this.contacts);

  createContact(contact: Contact) {
    const pathToDocument = this.contactCollection + '/' + contact.id;
    return this.afs.doc(pathToDocument).set(contact.toFirebase());
  }

  subscribeToContactsCollection(status: ContactStatus = 1) {
    //I already subscribe to contact collection can exist
    if (this.unsubscribe !== null) {
      return;
    }

    //Function to create a contact
    // this.createContact(
    //   new Contact(
    //     4,
    //     'Eric Smith',
    //     'smith944@mail.com',
    //     ['132454676', '02345588'],
    //     669669370000,
    //     1668539855,
    //     1
    //   )
    // );

    this.unsubscribe = this.afs
      .collection(this.contactCollection)
      .ref.where('status', '==', status)
      .onSnapshot(
        (documents) => {
          this.contacts = [];
          documents.forEach((doc) => {
            this.contacts.push(Contact.fromFirebaseToClass(doc.data()));
          });

          this.contactSubject.next(this.contacts);
        },
        (error) => console.error(error)
      );
  }
  removeContactById(id: number) {
    return this.afs
      .doc(this.contactCollection + '/' + id)
      .set({ status: 0 }, { merge: true });
  }
}
