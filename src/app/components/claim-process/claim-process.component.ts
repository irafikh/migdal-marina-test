import { AfterViewInit, Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactPerson } from 'src/app/models/contact-person.model';
import { InsuredDetails } from 'src/app/models/insured-details.model';
import { NameValuePair } from 'src/app/models/name-value-pairs.model';
import { IProcess } from '../../models/process.model';
import { ProcessService } from '../services/process.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-claim-process',
  templateUrl: './claim-process.component.html',
  styleUrls: ['./claim-process.component.css']
})

export class ClaimProcessComponent implements OnInit, AfterViewInit {

  process: IProcess[] = [];

  form: FormGroup = new FormGroup({});

  superClaimNum: number = 0;
  superClaimStatus: string ='';
  lblsuperClaimNum = " תביעת על: ";
  lblsuperClaimStatus = " מצב תביעה: ";
  optionFormGroup?: FormGroup;

  contactPersonTypeDDValue?: string = '';
  contactPersonTypeDDViewValue?: string = '';

  superClaimStatusSelectedValue: string = "";
  claimCauseSelectedValue: string = "";
  injuryTypeSelectedValue: string = "";
  submitedBySelectedValue: string = "";
  submitionMethodSelectedValue: string = "";
  eventDt: FormControl = new FormControl;

  insDetails: InsuredDetails[] = [];
  dataSource: ContactPerson[] = [];

  countContacts: number = 0;
/*   @ViewChild(SuperClaimComponent, { static: true }) child : SuperClaimComponent; */

  constructor(private processService: ProcessService,
              private fb: FormBuilder )
    {
      this.form = this.fb.group({
        superClaimNum: [''],
        superClaimStatus: [''],

        superClaimForm: this.fb.group({                            // first child
          insDetails: [null],
          contactPersonTypeDD: [[''] ,Validators.required ],
          claimCauseDD: [[''] ,Validators.required ],
          injuryTypeDD: [''],
          submitedByDD: [[''] ,Validators.required ],
          submitionMethodDD: [''],
          eventDate: [[null] ,Validators.required ]
        }),

        insuredForm: this.fb.group({                                // second child
          countContactPersons: [0]
        }),

        contactPersonsForm: this.fb.group({                         // third child
          ds: [null],
          selection: [null],
          checkArray: this.fb.array([])
        }),
      });
    }

  ngOnInit(): void {
    this.getProcess();
  }

  ngAfterViewInit(): void {
  }

  private getProcess() {

    this.processService.getProcess().subscribe((proc: IProcess[]) => {
      this.process = proc;

      this.populateData();

      this.setInitialDDValues();
    });
  }

  refreshProcess() {
    this.form.get("superClaimForm.contactPersonTypeDD")?.setValue("");
    this.form.get("superClaimForm.claimCauseDD")?.setValue("");
    this.form.get("superClaimForm.injuryTypeDD")?.setValue("");
    this.form.get("superClaimForm.submitedByDD")?.setValue("");
    this.form.get("superClaimForm.submitionMethodDD")?.setValue("");
    this.form.get("superClaimForm.eventDate")?.setValue(null);
    this.insDetails = [];
    this.dataSource = [];
    this.countContacts = 0;
  }

  addContact(countCon: any){
      console.log("לפני ההוספת איש קשר : " + countCon +  " אנשי קשר ");
      const newIns: ContactPerson = {
        id: +this.insDetails[0].identity,
        deliveryFlag: false,
        name: this.insDetails[0].fullName,
        typeCode: 0,
        typeValue: "עובד חברה-פקיד",
        address: this.insDetails[0].address,
        phoneNumber: 0,
        email: ""
      }

      this.dataSource.push(newIns);
      let cloned = this.dataSource.slice(); // OR IN ES6 // let cloned = [...dataSource]
      this.dataSource = cloned;
      console.log("אחרי ההוספת איש קשר : " + this.dataSource.length +  " אנשי קשר ");
  }

  clearAllContacts(countCon: any){
    // alert("clearAllContacts : " + " יש " + countCon +  " אנשי קשר ");
    this.dataSource = [];
  }

  clearContacts(countCon: any){
    let sel: any = this.form.get("contactPersonsForm.selection")?.value;
    this.onCheckboxChanged(sel);
    console.log("clearContacts : " + " יש " + countCon +  " אנשי קשר ");
  }

  onCheckboxChanged(ob: MatCheckboxChange) {
    const checkArray: FormArray = this.form.get("contactPersonsForm.checkArray") as FormArray;
    if (ob.source.checked == false) {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == ob.source.value) {
          checkArray.removeAt(i);
        }
        i++;
      });
    }
  }

  setInitialDDValues() {

      const superClaimStatusInitval: NameValuePair = {
        value: this.process[0]?.superClaim?.superClaimStatus?.code.toString(),
        viewValue: this.process[0]?.superClaim?.superClaimStatus?.value
      };
      this.superClaimStatusSelectedValue = superClaimStatusInitval.value;
      this.form.get("superClaimForm.contactPersonTypeDD")?.setValue(this.superClaimStatusSelectedValue);
      //console.log("this.superClaimStatusSelectedValue = " + this.superClaimStatusSelectedValue);

      const claimCauseInitval: NameValuePair = {
        value: "1",
        viewValue: "תאונה"
      };
      this.claimCauseSelectedValue = claimCauseInitval.value;
      this.form.get("superClaimForm.claimCauseDD")?.setValue(this.claimCauseSelectedValue);

      const injuryTypeInitval: NameValuePair = {
        value: "1",
        viewValue: "אגן"
      };
      this.injuryTypeSelectedValue = injuryTypeInitval.value;
      console.log("injuryTypeSelectedValue = " + this.injuryTypeSelectedValue);
      this.form.get("superClaimForm.injuryTypeDD")?.setValue(this.injuryTypeSelectedValue);

      const submitedByInitval: NameValuePair = {
        value: "1",
        viewValue: "מבוטח"
      };
      this.submitedBySelectedValue = submitedByInitval.value;
      this.form.get("superClaimForm.submitedByDD")?.setValue(this.submitedBySelectedValue);

      const submitionMethodInitval: NameValuePair = {
        value: "2",
        viewValue: "דיגיטל"
      };
      this.submitionMethodSelectedValue = submitionMethodInitval.value;
      this.form.get("superClaimForm.submitionMethodDD")?.setValue(this.submitionMethodSelectedValue);

      this.insDetails = [];
      const ins: InsuredDetails = {
        fullName: this.process[0]?.insured?.firstName + " " + this.process[0]?.insured?.lastName,
        age: this.process[0]?.insured?.age?.toString(),
        identity: this.process[0]?.insured?.identity?.toString(),
        address: this.process[0]?.insured?.address?.cityName + ", " + this.process[0]?.insured?.address?.streetName
      }
      if (ins != undefined)
        this.insDetails.push(ins);

      this.dataSource = [];
      const data1: ContactPerson = {
        id: this.process[0]?.contactPersons[0]?.id,
        deliveryFlag: this.process[0]?.contactPersons[0]?.deliveryFlag,
        name: this.process[0]?.contactPersons[0]?.name,
        typeCode: this.process[0]?.contactPersons[0]?.type.code,
        typeValue: this.process[0]?.contactPersons[0]?.type.value.toString(),
        address: this.process[0]?.contactPersons[0]?.address,
        phoneNumber: this.process[0]?.contactPersons[0]?.phoneNumber,
        email: this.process[0]?.contactPersons[0]?.email
      }
      if (data1 != undefined)
        this.dataSource.push(data1);

      const data2: ContactPerson = {
        "id": 234, "deliveryFlag": false, "name": "טוביה בצקי", "typeCode": 2, "typeValue": "סוכן", "address": "מחנה תל נוף", "phoneNumber": 525452203, "email": 'tb@gmail.com'
      };

      this.dataSource.push(data2);

      this.countContacts = this.dataSource.length; // כמות אנשי קשר

      this.eventDt = new FormControl( new Date().toISOString().split('T')[0]);
  }

  populateData(){

    this.lblsuperClaimNum += this.process[0].superClaim?.superClaimNum;
    this.lblsuperClaimStatus += this.process[0].superClaim.superClaimStatus.value;
    this.form.get("superClaimNum")?.setValue(this.superClaimNum);
    this.form.get("superClaimStatus")?.setValue(this.superClaimStatus);
  }

  finishProcess() {
  }
}

/* const contactPersonDataList: ContactPerson[] = [
  {id: 123, deliveryFlag: false, name: "ניקיטה ג'ין", typeCode: "3", typeValue: "מבוטח", address: "רחובות אופנהיימר", phoneNumber: 525816206, email: "nikita_jain@amat.com"},
  {id: 234, deliveryFlag: false, name: "טוביה בצקי", typeCode: "2", typeValue: "סוכן", address: "מחנה תל נוף", phoneNumber: 525452203, email: ""},
]; */
