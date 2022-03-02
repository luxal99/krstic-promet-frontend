import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNoteOverviewComponent } from './delivery-note-overview.component';

describe('DeliveryNoteOverviewComponent', () => {
  let component: DeliveryNoteOverviewComponent;
  let fixture: ComponentFixture<DeliveryNoteOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryNoteOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNoteOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
