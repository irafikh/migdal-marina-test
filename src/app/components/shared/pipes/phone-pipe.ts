import { Pipe} from "@angular/core";

@Pipe({
  name: "phone"
})

  export class PhonePipe {
      transform (phoneNumber:string) {
        if (phoneNumber != "0") {
          phoneNumber = "0"+ phoneNumber;
          const prefix = phoneNumber.slice(0,3);
          const num = phoneNumber.slice(3,9);
          return `${prefix}-${num}`;
        }
        return phoneNumber;
      }
  }
