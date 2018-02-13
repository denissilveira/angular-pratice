import { Component, OnInit } from '@angular/core';
import { Company } from '../entity/company';
import { CompanyService } from '../service/company.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  companies : Company[] = [];

  constructor(private companyService : CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() : void {
    this.companyService.getTopCompanies()
      .subscribe(companies => this.companies = companies.slice(1,5));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { 
      return; 
    }
    
    this.companyService
      .addCompany({ name } as Company)
      .subscribe(company => {
        this.companies.push(company);
      });
  }
}