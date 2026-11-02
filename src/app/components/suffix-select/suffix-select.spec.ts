import { ComponentFixture, TestBed } from '@angular/core/testing';
import { splitStoredName, SuffixSelect } from './suffix-select';

describe('SuffixSelect', () => {
  let component: SuffixSelect;
  let fixture: ComponentFixture<SuffixSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuffixSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(SuffixSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('splitStoredName', () => {
  it('capitalizes a name that has no suffix', () => {
    expect(splitStoredName('jane doe')).toEqual({ name: 'Jane Doe', suffix: '' });
  });

  it('moves a known suffix into the dropdown value', () => {
    expect(splitStoredName('jane doe sr')).toEqual({ name: 'Jane Doe', suffix: 'sr' });
    expect(splitStoredName("mary-jane o'neil iii")).toEqual({
      name: "Mary-Jane O'Neil",
      suffix: 'iii',
    });
  });
});
