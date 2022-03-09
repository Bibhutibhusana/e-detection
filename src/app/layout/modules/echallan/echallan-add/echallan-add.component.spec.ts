import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchallanAddComponent } from './echallan-add.component';

describe('EchallanAddComponent', () => {
  let component: EchallanAddComponent;
  let fixture: ComponentFixture<EchallanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchallanAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchallanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
