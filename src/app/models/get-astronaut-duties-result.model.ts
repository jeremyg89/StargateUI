import { AstronautDutyDTO } from './astronaut-duty-dto.model';
import { BaseResponse } from './base-reponse.model';
import { PersonAstronautDTO } from './person-astronaut-dto.model';

export interface GetAstronautDutiesResult extends BaseResponse {
  person: PersonAstronautDTO | null;
  astronautDuties: AstronautDutyDTO[];
}
