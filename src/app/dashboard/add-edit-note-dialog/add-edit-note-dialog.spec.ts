import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNoteDialog } from './add-edit-note-dialog';

describe('AddEditNoteDialog', () => {
  let component: AddEditNoteDialog;
  let fixture: ComponentFixture<AddEditNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditNoteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditNoteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
