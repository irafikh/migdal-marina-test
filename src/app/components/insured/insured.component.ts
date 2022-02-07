import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.css']
})
export class InsuredComponent implements OnInit {

  @Input() formGroupName: string = '';
  @Input() insuredForm: FormGroup = new FormGroup({});
  @Input() countContactPersons: number = 0;
  @Output() addContactClicked = new EventEmitter();
  @Output() clearAllContactsClicked = new EventEmitter();
  @Output() clearContactsClicked = new EventEmitter();

  lblPageTitle = "ריכוז אנשי קשר";
  lblCountContactPersons = "מספר אנשי קשר בתאליך: ";
  lblActions = "פעולות אפשריות:";

  constructor ( private rootFormGroup: FormGroupDirective,
                private fb: FormBuilder
              )  { }

  ngOnInit(): void {
    this.insuredForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  addContactClick(): void {
    this.addContactClicked.emit(this.countContactPersons.toString());
  }

  clearAllContactsClick(){
    this.clearAllContactsClicked.emit(this.countContactPersons.toString());
  }

  clearContactsClick(){
    this.clearContactsClicked.emit(this.countContactPersons.toString());
  }
}
