import { Component, OnInit } from '@angular/core';
import { Company } from '../entity/company';
import { COMPANIES } from '../mock/mock-company';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies: Company[];
  company : Company;

  constructor(private companyService: CompanyService) { }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => this.companies = companies);
  }

  onSelect(company: Company): void {
    this.company = company;
  }

  ngOnInit() {
    this.getCompanies();
  }

  delete(company: Company): void {
    this.companies = this.companies.filter(h => h !== company);
    this.companyService
      .deleteCompany(company)
      .subscribe();
  }

}