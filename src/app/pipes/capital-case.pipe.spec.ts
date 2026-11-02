import { toCapitalCase } from './capital-case.pipe';

describe('toCapitalCase', () => {
  it('capitalizes each word of a stored lowercase name', () => {
    expect(toCapitalCase('john doe')).toBe('John Doe');
  });

  it('keeps a known suffix in display form', () => {
    expect(toCapitalCase('john doe the 3rd')).toBe('John Doe the 3rd');
    expect(toCapitalCase('john doe iii')).toBe('John Doe III');
  });

  it('capitalizes names with hyphens and apostrophes', () => {
    expect(toCapitalCase("mary-jane o'brien")).toBe("Mary-Jane O'Brien");
  });
});
