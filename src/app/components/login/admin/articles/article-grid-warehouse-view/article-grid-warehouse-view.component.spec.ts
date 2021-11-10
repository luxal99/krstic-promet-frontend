import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleGridWarehouseViewComponent } from './article-grid-warehouse-view.component';

describe('ArticleGridWarehouseViewComponent', () => {
  let component: ArticleGridWarehouseViewComponent;
  let fixture: ComponentFixture<ArticleGridWarehouseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleGridWarehouseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleGridWarehouseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
