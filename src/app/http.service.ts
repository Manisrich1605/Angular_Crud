import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl="http://localhost:5281";
  http=inject(HttpClient);
  constructor() { }

  getAllEmployee(){
    return this.http.get<IEmployee[]>(this.apiUrl+"/api/LeaveTypess")
  }
  createEmployee(employee:IEmployee){
    return this.http.post(this.apiUrl+"/api/LeaveTypess",employee);
  }
  getEmployee(employeeId: number){
    return this.http.get<IEmployee>(this.apiUrl+"/api/LeaveTypess/"+employeeId);
  }
  updateEmployee(employeeId:number,employee:IEmployee){
    return this.http.put<IEmployee>(this.apiUrl+"/api/LeaveTypess/"+employeeId,employee);
  }
  deleteEmployee(employeeId:number){
    return this.http.delete(this.apiUrl+"/api/LeaveTypess/"+employeeId);
  } 
}
