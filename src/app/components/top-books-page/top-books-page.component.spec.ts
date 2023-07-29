import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBooksPageComponent } from './top-books-page.component';

describe('TopBooksPageComponent', () => {
  let component: TopBooksPageComponent;
  let fixture: ComponentFixture<TopBooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBooksPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
