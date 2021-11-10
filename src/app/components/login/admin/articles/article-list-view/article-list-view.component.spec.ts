import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListViewComponent } from './article-list-view.component';

describe('ArticleListViewComponent', () => {
  let component: ArticleListViewComponent;
  let fixture: ComponentFixture<ArticleListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
