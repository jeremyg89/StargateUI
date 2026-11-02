import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AstronautDutyTable } from './astronaut-duty-table';

describe('AstronautDutyTable', () => {
  let component: AstronautDutyTable;
  let fixture: ComponentFixture<AstronautDutyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstronautDutyTable],
    }).compileComponents();

    fixture = TestBed.createComponent(AstronautDutyTable);
    fixture.componentRef.setInput('duties', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
