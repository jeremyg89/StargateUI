import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AstronautDutyDTO } from '../../models/astronaut-duty-dto.model';

@Component({
  selector: 'app-astronaut-duty-table',
  imports: [DatePipe, MatTableModule],
  templateUrl: './astronaut-duty-table.html',
  styleUrl: './astronaut-duty-table.css',
})
export class AstronautDutyTable {
  public readonly duties = input.required<AstronautDutyDTO[]>();

  protected readonly displayedColumns = ['rank', 'dutyTitle', 'dutyStartDate', 'dutyEndDate'];
}
