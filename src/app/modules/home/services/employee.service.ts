import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  /**
   * Gets a list of employees
   * @returns Observable
  */
  getEmployees() {
    return this.http.get(`${environment.baseApi}getAllEmployees`)
  }

  /**
   * Delete an employee by it's id
   * Params employee id
  */
  deleteEmployee(id: any) {
    return this.http.get(`${environment.baseApi}deleteEmpByID/${id}`)
  }

  /**
   * Add an employee
   * Params employee object
  */
  addEmployee(employee: any) {
    return this.http.post(`${environment.baseApi}addEmployee`, employee)
  }

  /**
    * update an employee
    * Params employee object after update, the employee id
  */
  updateEmployee(employee: any, id:any) {
    return this.http.post(`${environment.baseApi}editEmployee`, {
      empName: employee.empName,
      empEmail: employee.empEmail,
      empAddress: employee.empAddress,
      empPhone: employee.empPhone,
      empId: id
    })
  }
}
