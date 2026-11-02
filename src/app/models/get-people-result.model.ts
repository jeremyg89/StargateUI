import { BaseResponse } from './base-reponse.model';
import { PersonAstronautDTO } from './person-astronaut-dto.model';

export interface GetPeopleResult extends BaseResponse {
  people: PersonAstronautDTO[];
}
