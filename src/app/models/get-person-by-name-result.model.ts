import { BaseResponse } from './base-reponse.model';
import { PersonAstronautDTO } from './person-astronaut-dto.model';

export interface GetPersonByNameResult extends BaseResponse {
  person: PersonAstronautDTO | null;
}
