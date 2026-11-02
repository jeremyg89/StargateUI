import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GetAstronautDutiesResult } from '../models/get-astronaut-duties-result.model';
import { CreateAstronautDutyCommand } from '../models/create-astronaut-duty-command.model';
import { CreateAstronautDutyResult } from '../models/create-astronaut-duty-result.model';

@Service()
export class AstronautDutyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getAstronautDutiesByName(name: string): Observable<GetAstronautDutiesResult> {
    const url = `${this.apiUrl}/AstronautDuties/${encodeURIComponent(name)}`;
    return this.http.get<GetAstronautDutiesResult>(url);
  }

  public createAstronautDuty(
    formData: CreateAstronautDutyCommand,
  ): Observable<CreateAstronautDutyResult> {
    const url = `${this.apiUrl}/AstronautDuties`;
    return this.http.post<CreateAstronautDutyResult>(url, formData);
  }
}
