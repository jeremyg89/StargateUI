import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetPeopleResult } from '../models/get-people-result.model';
import { GetPersonByNameResult } from '../models/get-person-by-name-result.model';
import { CreatePersonCommand } from '../models/create-person-command.model';
import { CreatePersonResult } from '../models/create-person-result.model';
import { UpdatePersonCommand } from '../models/update-person-command.model';
import { UpdatePersonResult } from '../models/update-person-result.model';

@Service()
export class PersonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getPeople(): Observable<GetPeopleResult> {
    const url = `${this.apiUrl}/People`;
    return this.http.get<GetPeopleResult>(url);
  }

  public getPersonByName(name: string): Observable<GetPersonByNameResult> {
    const url = `${this.apiUrl}/People/${encodeURIComponent(name)}`;
    return this.http.get<GetPersonByNameResult>(url);
  }

  public createPerson(formData: CreatePersonCommand): Observable<CreatePersonResult> {
    const url = `${this.apiUrl}/People`;
    return this.http.post<CreatePersonResult>(url, formData);
  }

  public updatePerson(formData: UpdatePersonCommand): Observable<UpdatePersonResult> {
    const url = `${this.apiUrl}/People/${encodeURIComponent(formData.name)}`;
    return this.http.put<UpdatePersonResult>(url, JSON.stringify(formData.newName), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
