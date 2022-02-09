import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidVehiclesDetailsComponent } from './invalid-vehicles-details.component';

describe('InvalidVehiclesDetailsComponent', () => {
  let component: InvalidVehiclesDetailsComponent;
  let fixture: ComponentFixture<InvalidVehiclesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidVehiclesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidVehiclesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
