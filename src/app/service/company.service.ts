import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Company } from '../entity/company';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CompanyService {

  private companiesUrl = 'api/companies'; 

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getCompanies() : Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(companies => this.log('fetched companies')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getTopCompanies() : Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(companies => this.log('fetched companies')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET company by id. Return `undefined` when id not found */
  getCompanyNo404<Data>(id: number): Observable<Company> {
   
    const url = `${this.companiesUrl}/?id=${id}`;
   
    return this.http
    .get<Company[]>(url)
      .pipe(
        map(companies => companies[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} company id=${id}`);
        }),
        catchError(this.handleError<Company>(`getCompany id=${id}`))
      );
  }

  getCompany(id: number): Observable<Company> {
    const url = `${this.companiesUrl}/${id}`;
    return this.http
      .get<Company>(url)
        .pipe(
          tap(_ => this.log(`fetched company id=${id}`)),
          catchError(this.handleError<Company>(`getCompany id=${id}`))
        );
  }

  /* GET companies whose name contains search term */
  searchCompanies(term: string): Observable<Company[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Company[]>(`api/companies/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found companies matching "${term}"`)),
       catchError(this.handleError<Company[]>('searchCompanies', []))
      );
  }

  /** POST: add a new hero to the server */
  addCompany (company: Company): Observable<Company> {
    return this.http
      .post<Company>(this.companiesUrl,company, httpOptions)
      .pipe(
        tap((company: Company) => this.log(`added company w/ id=${company.id}`)),
        catchError(this.handleError<Company>('addCompany'))
      );
  }

  /** PUT: update the company on the server */
  updateCompany (company: Company): Observable<any> {
    return this.http
      .put(this.companiesUrl, company, httpOptions)
      .pipe(
        tap(_ => this.log(`updated company id=${company.id}`)),
        catchError(this.handleError<any>('updateCompany'))
      );
  }

  /** DELETE: delete the company from the server */
deleteCompany (company: Company | number): Observable<Company> {
  const id = typeof company === 'number' ? company : company.id;
  const url = `${this.companiesUrl}/${id}`;

  return this.http.delete<Company>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`deleted company id=${id}`)),
      catchError(this.handleError<Company>('deleteCompany'))
    );
  }

  private log(message: string) {
    this.messageService.add('CompanyService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}