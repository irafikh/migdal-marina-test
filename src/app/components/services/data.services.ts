import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IProcess } from '../../models/process.model';

@Injectable({
  providedIn: 'root'
})

export class DataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    let process: IProcess[] = [
            {
        superClaim: {
            superClaimNum: 500038313,
            superClaimStatus: {
                code: 2,
                value: 'סוכן',
            }
        },
        insured: {
            address: {
                cityName: 'רעננה',
                streetName:'אחוזה',
            },
            identityType: 3,
            age: 35,
            lastName: "ג'ין",
            identity: 27854122145,
            firstName: 'מריה',
        },
        contactPersons: [
          {
            id: 123,
            deliveryFlag: false,
            type: {
                code: 3,
                value: 'מבוטח'
            },
            name: "ניקיטה ג'ין",
            phoneNumber: 525816206,
            email: 'nikita_jain@amat.com',
            address: 'רחובות אופנהיימר'
          }/* ,
          {
            id: 123,
            deliveryFlag: false,
            type: {
                code: 2,
                value: 'סוכן'
            },
            name: "טוביה בצקי",
            phoneNumber: 525452203,
            email: 'tb@gmail.com',
            address: 'מחנה תל נוף'
          } */
        ]
      }
    ];

return { process };
}
}


