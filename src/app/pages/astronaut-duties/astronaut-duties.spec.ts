import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AstronautDuties } from './astronaut-duties';

describe('AstronautDuties', () => {
  let component: AstronautDuties;
  let fixture: ComponentFixture<AstronautDuties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstronautDuties],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AstronautDuties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
