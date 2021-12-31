import { Component, OnInit, TemplateRef } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AddUpdateEmployeeComponent } from '../add-update-employee/add-update-employee.component';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {
  employees: Employee[] = []
  employee: any
  empId: any
  returnedArray: Employee[] = []
  loading = false
  actionLoading = false
  startItem = 10
  endItem = 0
  indexNumber = 0;
  modalRef?: BsModalRef;
  isUpdateForm = false
  constructor(private employeeService: EmployeeService, private modalService: BsModalService) { }
  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.loading = true;
    this.indexNumber = 0;
    this.employeeService.getEmployees().subscribe(
      (res: any) => {
        this.employees = res
        this.returnedArray = this.employees.slice(0, 10);
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    )
  }

  /* Pagination */

  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.employees.slice(this.startItem, this.endItem);
  }

  /* TO DO */
  showingItems() {
  }

  /* Modal actions*/

  openModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template);
  }

  openUpdateModal(updateTemplate: TemplateRef<any>, isUpdateForm: any) {
    this.isUpdateForm = isUpdateForm
    if (!isUpdateForm) {
      this.employee = {
        empName: '',
        empEmail: '',
        empAddress: '',
        empPhone: ''
      }
    }
    this.modalRef = this.modalService.show(updateTemplate);
  }

  decline(): void {
    this.modalRef?.hide();
  }

  /* employee actions */

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe(
      (res: any) => {
        this.modalRef?.hide();
        this.getEmployees()
      }
    )
  }
  AddEmployee(employee: any) {
    this.actionLoading = true
    this.employeeService.addEmployee(employee).subscribe(
      (res) => {
        this.decline()
        this.getEmployees()
        this.actionLoading = false
      }
    )

  }
  updateEmployee(employee: any) {
    if (this.empId) {
      this.actionLoading = true
      this.employeeService.updateEmployee(employee, this.empId).subscribe(
        (res) => {
          this.decline()
          this.getEmployees()
          this.actionLoading = false
        }
      )
    }
  }

}
