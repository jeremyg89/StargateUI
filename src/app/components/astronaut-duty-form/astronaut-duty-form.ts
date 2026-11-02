import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateAstronautDutyCommand } from '../../models/create-astronaut-duty-command.model';
import { CapitalCasePipe } from '../../pipes/capital-case.pipe';

export interface AstronautDutyFormData {
  name: string;
}

@Component({
  selector: 'app-astronaut-duty-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    CapitalCasePipe,
  ],
  templateUrl: './astronaut-duty-form.html',
  styleUrl: './astronaut-duty-form.css',
})
export class AstronautDutyForm {
  private readonly dialogRef = inject(MatDialogRef<AstronautDutyForm, CreateAstronautDutyCommand>);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly data = inject<AstronautDutyFormData>(MAT_DIALOG_DATA);

  protected readonly form = this.formBuilder.nonNullable.group({
    rank: ['', Validators.required],
    dutyTitle: ['', Validators.required],
    dutyStartDate: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      name: this.data.name,
      ...this.form.getRawValue(),
    });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
