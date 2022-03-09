import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleClassComparisionComponent } from './vehicle-class-comparision.component';

describe('VehicleClassComparisionComponent', () => {
  let component: VehicleClassComparisionComponent;
  let fixture: ComponentFixture<VehicleClassComparisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleClassComparisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleClassComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
