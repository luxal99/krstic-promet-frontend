import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSubCategoryGridViewComponent } from './article-sub-category-grid-view.component';

describe('ArticleSubCategoryGridViewComponent', () => {
  let component: ArticleSubCategoryGridViewComponent;
  let fixture: ComponentFixture<ArticleSubCategoryGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSubCategoryGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSubCategoryGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
