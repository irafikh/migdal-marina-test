import { FormControl, FormGroup, Validators } from "@angular/forms";

export class NameValuePair {
    value: string = '';
    viewValue: string = '';

    static asFormGroup(nameValuePair: NameValuePair): FormGroup {
      const fg = new FormGroup({
        value: new FormControl(nameValuePair.value, Validators.required),
        viewValue: new FormControl(nameValuePair.viewValue, Validators.required)
      });
      return fg;
    }
}

