import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AstronautDutyForm } from './astronaut-duty-form';

describe('AstronautDutyForm', () => {
  let component: AstronautDutyForm;
  let fixture: ComponentFixture<AstronautDutyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstronautDutyForm],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'jane doe' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AstronautDutyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
