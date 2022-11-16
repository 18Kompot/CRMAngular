
export type ContactStatus = 0 | 1 | 2;
export class Contact {
    id: number;
    name: string;
    email: string;
    phones: string[];
    birthday: number;
    createdDate: number;
    status: ContactStatus;

    constructor (
        id: number = new Date().getTime(),
        name: string = '',
        email: string = '',
        phones: string[] = [],
        birthday: number = new Date().getTime(),
        createdDate: number = new Date().getTime(),
        status: ContactStatus = 1
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.phones = phones;
        this.createdDate = createdDate;
        this.status = status;
    }

    toFirebase() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phones: this.phones,
            birthday: this.birthday,
            createdDate: this.createdDate,
            status: this.status
        }
    }

    static fromFirebaseToClass(data: any) {
        return new Contact(
            data.id,
            data.name || '',
            data.email || '',
            data.phones || [],
            data.birthday || 0,
            data.createdDate || '',
            data.status || 0
        )
    }
}
