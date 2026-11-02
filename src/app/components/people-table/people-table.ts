import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PersonAstronautDTO } from '../../models/person-astronaut-dto.model';
import { CapitalCasePipe } from '../../pipes/capital-case.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-people-table',
  imports: [DatePipe, MatButtonModule, MatIconModule, MatTableModule, RouterLink, CapitalCasePipe],
  templateUrl: './people-table.html',
  styleUrl: './people-table.css',
})
export class PeopleTable {
  protected readonly displayedColumns = [
    'name',
    'currentRank',
    'currentDutyTitle',
    'careerStartDate',
    'careerEndDate',
    'actions',
  ];

  public readonly people = input.required<PersonAstronautDTO[]>();
  public readonly editPerson = output<PersonAstronautDTO>();
}
