import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { toCapitalCase } from '../../pipes/capital-case.pipe';

export const NAME_SUFFIXES = [
  { value: '', label: 'None' },
  { value: 'jr', label: 'Jr' },
  { value: 'sr', label: 'Sr' },
  { value: 'ii', label: 'II' },
  { value: 'iii', label: 'III' },
  { value: 'iv', label: 'IV' },
] as const;

export function splitStoredName(value: string | null | undefined): {
  name: string;
  suffix: string;
} {
  const normalized = (value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
  const suffix = NAME_SUFFIXES.map((item) => item.value)
    .filter((item) => item.length > 0)
    .sort((left, right) => right.length - left.length)
    .find((item) => normalized === item || normalized.endsWith(` ${item}`));
  const givenName = suffix
    ? normalized.slice(0, normalized.length - suffix.length).trim()
    : normalized;

  return {
    name: toCapitalCase(givenName),
    suffix: suffix ?? '',
  };
}

@Component({
  selector: 'app-suffix-select',
  imports: [MatFormFieldModule, MatSelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SuffixSelect),
      multi: true,
    },
  ],
  templateUrl: './suffix-select.html',
  styleUrl: './suffix-select.css',
})
export class SuffixSelect implements ControlValueAccessor {
  protected readonly suffixes = NAME_SUFFIXES;
  protected value = '';
  protected disabled = false;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  public writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected select(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
