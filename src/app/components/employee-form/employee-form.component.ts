import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';
@Component({
 selector: 'app-employee-form',
 standalone: true,
 imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
 templateUrl: './employee-form.component.html',
 styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
 route = inject(ActivatedRoute);
 formBuilder = inject(FormBuilder);
 httpService = inject(HttpService);
 router = inject(Router);
 toaster = inject(ToastrService);
 employeeForm = this.formBuilder.group({
   name: ['', [Validators.required]],
   defaultDays: [0, [Validators.required, Validators.min(0)]], // Set default value to 0 and add min validator
   id: [0, [Validators.required]],
 });
 employeeId!: number;
 isEdit = false;
 ngOnInit() {
   this.employeeId = this.route.snapshot.params['id']; //edit by id
   if (this.employeeId) {
     this.isEdit = true;
     this.httpService.getEmployee(this.employeeId).subscribe(result => {
       console.log(result);
       this.employeeForm.patchValue(result);
     });
   }
 }
 save() {
   console.log(this.employeeForm.value);
   const employee: IEmployee = {
     name: this.employeeForm.value.name!,
     defaultDays: this.employeeForm.value.defaultDays!,
     id: this.employeeForm.value.id!
   };
   if (this.isEdit) 
   {
     this.httpService.updateEmployee(this.employeeId, employee).subscribe(() => {
      //alert("Hello")
       console.log("success");
       this.toaster.success("Leavetype updated successfully");
       this.router.navigateByUrl("/employee-list");
     });
   } else {
     this.httpService.createEmployee(employee).subscribe(() => {
       console.log("success");
       this.toaster.success("Leavetype added successfully");
       this.router.navigateByUrl("/employee-list");
     });
   }
 }
}