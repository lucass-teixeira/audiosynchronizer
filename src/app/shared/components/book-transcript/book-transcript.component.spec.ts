import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTranscriptComponent } from './book-transcript.component';

describe('BookTranscriptComponent', () => {
  let component: BookTranscriptComponent;
  let fixture: ComponentFixture<BookTranscriptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookTranscriptComponent]
    });
    fixture = TestBed.createComponent(BookTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
