import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Company } from '../entity/company';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  @Input() company: Company;

  constructor(private route: ActivatedRoute, 
    private location: Location, 
    private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.companyService
      .getCompany(id)
      .subscribe(company => this.company = company);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.companyService
      .updateCompany(this.company)
      .subscribe(() => this.goBack());
  }
}