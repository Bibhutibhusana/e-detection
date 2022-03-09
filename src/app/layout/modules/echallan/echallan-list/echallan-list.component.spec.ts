import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchallanListComponent } from './echallan-list.component';

describe('EchallanListComponent', () => {
  let component: EchallanListComponent;
  let fixture: ComponentFixture<EchallanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchallanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchallanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
