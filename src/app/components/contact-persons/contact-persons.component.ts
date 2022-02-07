import {SelectionModel} from '@angular/cdk/collections';
import {Component, EventEmitter, HostBinding, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ContactPerson } from 'src/app/models/contact-person.model';

/**
 * @title Table with selection
 */

@Component({
  selector: 'app-contact-persons',
  templateUrl: './contact-persons.component.html',
  styleUrls: ['./contact-persons.component.css']
})

export class ContactPersonsComponent implements OnInit  {

  @Input() formGroupName: string = '';
  @Input() contactPersonsForm: FormGroup = new FormGroup({});
  @Input() ds: ContactPerson[] = [];
  @Input() contactPersons: ContactPerson[] = [];
  @Input() selection = new SelectionModel<ContactPerson>(true, []);
  @Input() onCheckboxChange = new EventEmitter();
/*@Output() change: EventEmitter<MatCheckboxChange> = new EventEmitter<MatCheckboxChange>(); */

  displayedColumns: string[] = ['deliveryFlag', 'name', 'typeValue', 'address', 'phoneNumber', 'email'];

  lblPageTitle = "אנשי קשר";

  constructor ( private rootFormGroup: FormGroupDirective,
                private fb: FormBuilder
              ) {}

  ngOnInit(): void {
    this.contactPersonsForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;

    this.contactPersonsForm = new FormGroup({
      name: new FormControl(),
      id: new FormControl(),
      deliveryFlag: new FormControl(),
      typeValue: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
    });
  }

  addContactPerson(){
    console.log("הוספת שורה חדשה לא מומשה");
  }

  onCheckboxChanged(event: any){
    this.onCheckboxChange.emit();
  }

  selectedRow() {
    const rowNumber = this.selection.selected[0];
    console.log("ContactPersonsComponent: row number that is selected : " + rowNumber);
  }
}
