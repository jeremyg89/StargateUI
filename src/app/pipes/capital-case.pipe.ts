import { Pipe, PipeTransform } from '@angular/core';

const NAME_SUFFIXES = [
  { stored: 'the 3rd', display: 'the 3rd' },
  { stored: 'iii', display: 'III' },
  { stored: 'ii', display: 'II' },
  { stored: 'iv', display: 'IV' },
  { stored: 'jr', display: 'Jr' },
  { stored: 'sr', display: 'Sr' },
];

export function toCapitalCase(value: string | null | undefined): string {
  const normalized = (value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (!normalized) {
    return '';
  }

  const suffix = NAME_SUFFIXES.find(
    (item) => normalized === item.stored || normalized.endsWith(` ${item.stored}`),
  );
  const givenName = suffix
    ? normalized.slice(0, normalized.length - suffix.stored.length).trim()
    : normalized;
  const displayName = givenName
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word.replace(/(^|['-])([a-z])/g, (_, boundary: string, letter: string) =>
      `${boundary}${letter.toUpperCase()}`,
    ))
    .join(' ');

  if (!suffix) {
    return displayName;
  }

  return displayName ? `${displayName} ${suffix.display}` : suffix.display;
}

@Pipe({
  name: 'capitalCase',
})
export class CapitalCasePipe implements PipeTransform {
  public transform(value: string | null | undefined): string {
    return toCapitalCase(value);
  }
}
