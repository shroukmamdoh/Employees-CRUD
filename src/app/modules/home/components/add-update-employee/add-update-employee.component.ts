import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.scss']
})
export class AddUpdateEmployeeComponent implements OnInit {
  @Input() employee: Employee = {
    empName: '',
    empEmail: '',
    empAddress: '',
    empPhone: ''
  }
  @Input() actionLoading:any
  @Input() isUpdateForm: any
  @Output()
  empUpdateChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output()
  empAddChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output()
  modalChanged: EventEmitter<any> = new EventEmitter<any>()
  constructor(private fb: FormBuilder) { }
  employeeForm: FormGroup = this.fb.group({
    empName: [this.employee.empName ? this.employee.empName : null, [Validators.required]],
    empEmail: [null, [Validators.required, Validators.email]],
    empAddress: [null, Validators.required],
    empPhone: [null, [Validators.required]],
  });
  ngOnInit(): void {
  }

  isValidators(controls: any) {
    return !!(
      this.employeeForm.controls[controls].errors?.required &&
      (this.employeeForm.controls[controls].touched || this.employeeForm.controls[controls].dirty)
    );
  }

  update() {
    this.empUpdateChanged.next(this.employeeForm.value)
  }

  add() {
    this.empAddChanged.next(this.employeeForm.value)
  }

  decline() {
    this.modalChanged.next()
  }

}
