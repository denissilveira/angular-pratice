import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const companies = [
      { id: 11, name: 'Mr. Style' },
      { id: 12, name: 'ApudMi' },
      { id: 13, name: 'Pliigo' },
      { id: 14, name: 'Angular' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {companies};
  }
}