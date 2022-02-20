import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPeriodOverviewComponent } from './custom-period-overview.component';

describe('CustomPeriodOverviewComponent', () => {
  let component: CustomPeriodOverviewComponent;
  let fixture: ComponentFixture<CustomPeriodOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPeriodOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPeriodOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
