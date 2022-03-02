import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNoteOvervireComponent } from './delivery-note-overvire.component';

describe('DeliveryNoteOvervireComponent', () => {
  let component: DeliveryNoteOvervireComponent;
  let fixture: ComponentFixture<DeliveryNoteOvervireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryNoteOvervireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNoteOvervireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
