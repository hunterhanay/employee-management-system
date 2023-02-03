import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];
  searchTerm: string;
  searchResults: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
      this.searchResults = data;
    });
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((data) => {
      console.log(data);
      this.getEmployees();
    });
  }

  search() {
    this.searchResults = this.employees.filter((item) => {
      return [item.firstName, item.lastName, item.emailId].some((property) => {
        return property.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    });
  }
}
