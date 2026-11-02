import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreatePersonCommand } from '../../models/create-person-command.model';
import { PersonAstronautDTO } from '../../models/person-astronaut-dto.model';
import { UpdatePersonCommand } from '../../models/update-person-command.model';
import { UpdatePersonResult } from '../../models/update-person-result.model';
import { PersonService } from '../../services/person.service';
import { PeopleTable } from '../../components/people-table/people-table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PersonForm, PersonFormData } from '../../components/person-form/person-form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatePersonResult } from '../../models/create-person-result.model';
import { BaseResponse } from '../../models/base-reponse.model';

@Component({
  selector: 'app-people',
  imports: [PeopleTable, MatProgressBarModule, MatButtonModule, MatCardModule],
  templateUrl: './people.html',
  styleUrl: './people.css',
})
export class People {
  private readonly personService = inject(PersonService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly people = signal<PersonAstronautDTO[]>([]);
  protected readonly loading = signal(false);

  constructor() {
    this.loadPeople();
  }

  protected loadPeople(): void {
    this.loading.set(true);
    this.personService
      .getPeople()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.people.set(result.people);
          this.loading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          const result = error.error as BaseResponse | undefined;
          this.snackBar.open(result?.message ?? 'Could not load people.', undefined, {
            duration: 3000,
          });
          this.loading.set(false);
        },
      });
  }

  protected createPerson(command: CreatePersonCommand): void {
    this.loading.set(true);
    this.personService
      .createPerson(command)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.snackBar.open(result.message, undefined, { duration: 3000 });
          this.loadPeople();
        },
        error: (error: HttpErrorResponse) => {
          const result = error.error as CreatePersonResult | undefined;
          this.snackBar.open(result?.message ?? 'Could not save the person.', undefined, {
            duration: 3000,
          });
          this.loading.set(false);
        },
      });
  }

  protected openCreatePerson(): void {
    const dialogRef = this.dialog.open<PersonForm, PersonFormData, CreatePersonCommand>(
      PersonForm,
      {
        width: '480px',
      },
    );
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((command) => {
        if (!command) {
          return;
        }
        this.createPerson(command);
      });
  }

  protected openEditPerson(person: PersonAstronautDTO): void {
    const dialogRef = this.dialog.open<PersonForm, PersonFormData, CreatePersonCommand>(
      PersonForm,
      {
        width: '480px',
        data: { name: person.name },
      },
    );
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((command) => {
        if (!command) {
          return;
        }
        this.updatePerson({ name: person.name, newName: command.name });
      });
  }

  private updatePerson(command: UpdatePersonCommand): void {
    this.loading.set(true);
    this.personService
      .updatePerson(command)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.snackBar.open(result.message, undefined, { duration: 3000 });
          this.loadPeople();
        },
        error: (error: HttpErrorResponse) => {
          const result = error.error as UpdatePersonResult | undefined;
          this.snackBar.open(result?.message ?? 'Could not update the person.', undefined, {
            duration: 3000,
          });
          this.loading.set(false);
        },
      });
  }
}
