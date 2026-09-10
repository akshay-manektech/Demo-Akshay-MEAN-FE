import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTable } from './notes-table';

describe('NotesTable', () => {
  let component: NotesTable;
  let fixture: ComponentFixture<NotesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
