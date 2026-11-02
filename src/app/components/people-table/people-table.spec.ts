import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleTable } from './people-table';

describe('PeopleTable', () => {
  let component: PeopleTable;
  let fixture: ComponentFixture<PeopleTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleTable);
    fixture.componentRef.setInput('people', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
