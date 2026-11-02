import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AstronautDutyForm } from '../../components/astronaut-duty-form/astronaut-duty-form';
import { AstronautDutyTable } from '../../components/astronaut-duty-table/astronaut-duty-table';
import { AstronautDutyDTO } from '../../models/astronaut-duty-dto.model';
import { CreateAstronautDutyCommand } from '../../models/create-astronaut-duty-command.model';
import { CreateAstronautDutyResult } from '../../models/create-astronaut-duty-result.model';
import { PersonAstronautDTO } from '../../models/person-astronaut-dto.model';
import { CapitalCasePipe, toCapitalCase } from '../../pipes/capital-case.pipe';
import { AstronautDutyService } from '../../services/astronaut-duty.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PersonService } from '../../services/person.service';
import { BaseResponse } from '../../models/base-reponse.model';

@Component({
  selector: 'app-astronaut-duties',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    DatePipe,
    CapitalCasePipe,
    AstronautDutyTable,
    MatAutocompleteModule,
  ],
  templateUrl: './astronaut-duties.html',
  styleUrl: './astronaut-duties.css',
})
export class AstronautDuties {
  private readonly astronautDutyService = inject(AstronautDutyService);
  private readonly personService = inject(PersonService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly person = signal<PersonAstronautDTO | null>(null);
  protected readonly people = signal<PersonAstronautDTO[]>([]);
  protected readonly duties = signal<AstronautDutyDTO[]>([]);
  protected readonly loading = signal(false);
  protected readonly nameQuery = signal('');
  protected readonly searched = signal(false);

  protected readonly choices = computed(() => {
    const query = this.nameQuery().trim().toLowerCase();
    const people = this.people();
    if (!query) {
      return people;
    }
    return people.filter((person) => person.name.includes(query));
  });

  protected readonly displayName = (value: string | null): string => toCapitalCase(value);

  protected readonly searchForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
  });

  constructor() {
    this.searchForm.controls.name.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.nameQuery.set(value));
    this.personService
      .getPeople()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (result) => this.people.set(result.people),
        error: (error: HttpErrorResponse) => {
          const result = error.error as BaseResponse | undefined;
          this.snackBar.open(result?.message ?? 'Could not load duties.', undefined, {
            duration: 3000,
          });
          this.loading.set(false);
        },
      });

    const name = this.route.snapshot.queryParamMap.get('name');
    if (name) {
      this.searchForm.controls.name.setValue(toCapitalCase(name));
      this.loadDuties(name);
    }
  }

  protected findDuties(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const name = this.searchForm.controls.name.value.trim();
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { name },
      replaceUrl: true,
    });
    this.loadDuties(name);
  }

  protected openCreateDuty(): void {
    const person = this.person();
    if (!person) {
      return;
    }

    const dialogRef = this.dialog.open(AstronautDutyForm, {
      width: '480px',
      data: { name: person.name },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((command) => {
        if (!command) {
          return;
        }

        this.createDuty(command);
      });
  }

  private loadDuties(name: string): void {
    this.loading.set(true);
    this.searched.set(true);
    this.person.set(null);
    this.duties.set([]);

    this.astronautDutyService
      .getAstronautDutiesByName(name)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.person.set(result.person);
          this.duties.set(result.astronautDuties ?? []);
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

  private createDuty(command: CreateAstronautDutyCommand): void {
    this.loading.set(true);
    this.astronautDutyService
      .createAstronautDuty(command)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.snackBar.open(result.message, undefined, { duration: 3000 });
          this.loadDuties(command.name);
        },
        error: (error: HttpErrorResponse) => {
          const result = error.error as CreateAstronautDutyResult | undefined;
          this.snackBar.open(result?.message ?? 'Could not add the duty.', undefined, {
            duration: 3000,
          });
          this.loading.set(false);
        },
      });
  }

  protected selectPerson(name: string): void {
    this.searchForm.controls.name.setValue(name);
    this.findDuties();
  }
}
