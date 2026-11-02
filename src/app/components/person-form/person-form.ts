import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreatePersonCommand } from '../../models/create-person-command.model';
import { splitStoredName, SuffixSelect } from '../suffix-select/suffix-select';

export interface PersonFormData {
  name: string;
}

@Component({
  selector: 'app-person-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    SuffixSelect,
  ],
  templateUrl: './person-form.html',
  styleUrl: './person-form.css',
})
export class PersonForm {
  private readonly dialogRef = inject(MatDialogRef<PersonForm, CreatePersonCommand>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogData = inject<PersonFormData | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly nameParts = splitStoredName(this.dialogData?.name);

  protected readonly editing = !!this.dialogData?.name?.trim();
  protected readonly form = this.formBuilder.nonNullable.group({
    name: [this.nameParts.name, [Validators.required, Validators.pattern(/^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/)]],
    suffix: [this.nameParts.suffix],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, suffix } = this.form.getRawValue();
    const fullName = suffix ? `${name.trim()} ${suffix}` : name.trim();
    this.dialogRef.close({ name: fullName });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
