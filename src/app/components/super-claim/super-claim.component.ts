import { Component, HostBinding, OnInit } from '@angular/core';
import { DropDownListModel } from 'src/app/models/drop-down-list.model';
import { NameValuePair } from 'src/app/models/name-value-pairs.model';
import { DrowDownListsService } from '../services/dropdown-lists-data.services';
import { Input} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormGroupDirective} from '@angular/forms';
import { InsuredDetails } from 'src/app/models/insured-details.model';
import { IProcess } from 'src/app/models/process.model';

@Component({
  selector: 'app-super-claim',
  templateUrl: './super-claim.component.html',
  styleUrls: ['./super-claim.component.css']
})

export class SuperClaimComponent implements OnInit, ControlValueAccessor {

  @Input() formGroupName: string = '';
  @Input() superClaimForm: FormGroup = new FormGroup({});
  @Input() insuredDetails: InsuredDetails[] = [];
  @Input() contactPersonTypeSelValue: string = "";
  @Input() claimCauseSelValue: string = "";
  @Input() injuryTypeSelValue: string = "";
  @Input() submitedBySelValue: string = "";
  @Input() submitionMethodSelValue: string = "";
  @Input() eventDate: FormControl = new FormControl;

  process: IProcess[] = [];

  identityType: NameValuePair[] = [];
  contactPersonType: NameValuePair[] = [];
  claimCause: NameValuePair[] = [];
  injuryType: NameValuePair[] = [];
  submitedBy: NameValuePair[] = [];
  submitionMethod: NameValuePair[] = [];

  lblPageTitle = "ריכוז מידע בתהליך ";
  lblDetails = "פרטי מבוטח: ";
  lblFullName = "שם ";
  lblIdentity = "ת.ז. "
  lblAge = "גיל ";
  lblAddress = "כתובת ";

  insuredAddress: string = "";
  insuredFullName: string = "";
  insuredIdentity: string = "";
  insuredAge: string = "";

  lblContactPersonType = "סוג תביעה על: ";
  lblEventDate = "תאריך אירוע: ";
  lblClaimCause = "סיבת אירוע:" ;
  lblInjuryType = "מהות האירוע:" ;
  lblSubmitedBy = " הוגשה באמצעות: ";
  lblSubmitionMethod = "אופן קבלת התביעה: ";

  contactPersonTypeSelectedValue: string = "";
  claimCauseSelectedValue: string = "";
  injuryTypeSelectedValue: string = "";
  submitedBySelectedValue: string = "";
  submitionMethodSelectedValue: string = "";

  contactPersonTypeDDValue?: string = '';
  contactPersonTypeDDViewValue?: string = '';

  constructor ( private rootFormGroup: FormGroupDirective,
                private dropDownListsService: DrowDownListsService )
      {}

  ngOnInit(): void {
    this.superClaimForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.getDDLists();
  }

  private getDDLists() {

    this.dropDownListsService.GetContactPersonTypeDDList().subscribe((contactPersonTypeDDModel: DropDownListModel[]) => {
      this.contactPersonType = [];
      contactPersonTypeDDModel.forEach(item => {
        const val1: NameValuePair = {
          value: item.code,
          viewValue: item.value
        };
      //console.log ("OK1 : " + this.contactPersonType[0]?.code + "~" + this.contactPersonType[0]?.value);
        if(item.value != '')
           this.contactPersonType.push(val1);
      })

      if (this.contactPersonTypeSelValue)
         this.contactPersonTypeSelectedValue= this.contactPersonTypeSelValue;
     }
    );

    this.dropDownListsService.GetClaimCauseDDList().subscribe((claimCauseDDModel: DropDownListModel[]) => {
      this.claimCause = [];
      claimCauseDDModel.forEach(item => {
        const val2: NameValuePair = {
          value: item.code,
          viewValue: item.value
        };
      //console.log ("OK1 : " + this.contactPersonType[0]?.code + "~" + this.contactPersonType[0]?.value);
        if(item.value != '')
           this.claimCause.push(val2);
      })
      if (this.claimCauseSelValue)
         this.claimCauseSelectedValue= this.claimCauseSelValue;
     }
    );

    this.dropDownListsService.GetInjuryTypeDDList().subscribe((injuryTypeDDModel: DropDownListModel[]) => {

      this.injuryType = [];
      injuryTypeDDModel.forEach(item => {
        const val3: NameValuePair = {
          value: item.code,
          viewValue: item.value
        };

        if(item.value != '')
           this.injuryType.push(val3);
      })

      if (this.injuryTypeSelValue)
         this.injuryTypeSelectedValue= this.injuryTypeSelValue;
     }
    );

    this.dropDownListsService.GetSubmitedByDDList().subscribe((submitedByDDModel: DropDownListModel[]) => {

      this.submitedBy = [];
      submitedByDDModel.forEach(item => {
        const val4: NameValuePair = {
          value: item.code,
          viewValue: item.value
        };
      //console.log ("OK1 : " + this.contactPersonType[0]?.code + "~" + this.contactPersonType[0]?.value);
        if(item.value != '')
           this.submitedBy.push(val4);
      })
      if (this.submitedBySelValue)
         this.submitedBySelectedValue= this.submitedBySelValue;
     }
    );

    this.dropDownListsService.GetSubmitionMethodDDList().subscribe((submitionMethodDDModel: DropDownListModel[]) => {

      this.submitionMethod = [];
      submitionMethodDDModel.forEach(item => {
        const val5: NameValuePair = {
          value: item.code,
          viewValue: item.value
        };
      //console.log ("OK1 : " + this.contactPersonType[0]?.code + "~" + this.contactPersonType[0]?.value);
        if(item.value != '')
           this.submitionMethod.push(val5);
      })
      if (this.submitionMethodSelValue)
         this.submitionMethodSelectedValue= this.submitionMethodSelValue;
     }
    );

    this.dropDownListsService.GetIdentityTypesDDList().subscribe((idType: DropDownListModel[]) => {

          this.identityType = [];
          idType.forEach(item => {
            const val6: NameValuePair = {
              value: item.code,
              viewValue: item.value
            };
            if(item.value != '')
               this.identityType.push(val6);

            //console.log ("OK1 : populateData in Super Claim : " + this.identityType[0]?.value);
          })
         }
        );
  }

  onSelectionChange(event: any) {
    //this.contactPersonTypeDDValue = event.value;
    //this.contactPersonTypeDDViewValue = this.contactPersonType.find(x => x.value == this.contactPersonTypeDDValue)?.viewValue;
  }

  public todayDeliveryDate(): string {
    return new Date().toISOString().split('T')[0];
  };

  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(value: string) {
    this._ID = value;
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  @Input('value') _value = false;
  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn :any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: boolean) {
    if (value) {
      this.value = value;
    }
  }
}
