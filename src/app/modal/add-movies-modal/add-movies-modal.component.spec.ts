import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoviesModalComponent } from './add-movies-modal.component';

describe('AddMoviesModalComponent', () => {
  let component: AddMoviesModalComponent;
  let fixture: ComponentFixture<AddMoviesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoviesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoviesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
