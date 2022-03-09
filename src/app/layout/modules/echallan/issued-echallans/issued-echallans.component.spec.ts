import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedEchallansComponent } from './issued-echallans.component';

describe('IssuedEchallansComponent', () => {
  let component: IssuedEchallansComponent;
  let fixture: ComponentFixture<IssuedEchallansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuedEchallansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedEchallansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
