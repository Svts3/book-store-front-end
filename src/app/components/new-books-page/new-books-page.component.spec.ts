import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBooksPageComponent } from './new-books-page.component';

describe('NewBooksPageComponent', () => {
  let component: NewBooksPageComponent;
  let fixture: ComponentFixture<NewBooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBooksPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
