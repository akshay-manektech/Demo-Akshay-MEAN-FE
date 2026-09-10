import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserRole } from '../../enums/user-role.enum';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { ConfirmDialogData } from '../../interfaces/confirmation-dialog.interface';
import { NotePayloadInterface } from '../../interfaces/note-payload.interface';
import { UserNote } from '../../interfaces/user-note.interface';
import { NotesService } from '../../services/notes-service';
import { SnackbarService } from '../../services/snackbar-service';
import { AddEditNoteDialog } from '../add-edit-note-dialog/add-edit-note-dialog';
import { ConfirmDialogComponent } from '../delete-note-confirmation-dialog/delete-note-confirmation-dialog';

@Component({
  selector: 'app-notes-table',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    DatePipe,
    MatChipsModule,
    NgClass,
  ],
  templateUrl: './notes-table.html',
  styleUrl: './notes-table.css',
})
export class NotesTable {
  @Input() set data(value: any[]) {
    this.tableData.data = value || [];
  }
  @Input() index: number = 0;
  @Input() role: string = '';
  @Output() noteChanges = new EventEmitter();
  displayedColumns: string[] = ['title', 'content', 'createdAt', 'actions'];
  private noteService = inject(NotesService);
  private snackbarService = inject(SnackbarService);
  private dialog = inject(MatDialog);
  tableData = new MatTableDataSource<UserNote>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  UserRole = UserRole;
  user: AuthResponse | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['index']) {
      this.index = changes['index'].currentValue;
    }
    if (changes && changes['data']) {
      this.data = changes['data'].currentValue;
    }
    if (changes && changes['role']) {
      this.role = changes['role'].currentValue;
    }
  }

  ngOnInit() {
    if (this.role === UserRole.ADMIN) {
      this.updateColumns();
    }
  }

  updateColumns() {
    this.displayedColumns = ['title', 'content', 'createdAt', 'archived'];
  }

  getInitials() {
    return this.user?.fullName
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  editNote(note: UserNote): void {
    const dialogRef = this.dialog.open(AddEditNoteDialog, {
      width: '450px',
      disableClose: true,
      data: note,
    });

    dialogRef.afterClosed().subscribe((result: NotePayloadInterface) => {
      if (result) {
        this.noteService.updateNote(note._id, result).subscribe({
          next: (note: UserNote) => {
            this.snackbarService.show('Note updated successfully', true);
            this.noteChanges.emit(true);
          },
          error: (error) => {
            this.snackbarService.show('Internal server error', false);
          },
          complete: () => {},
        });
      }
    });
  }

  deleteNote(note: UserNote): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Note',
        warningText:
          'Are you sure you want to delete the note? After successful delete, this note cannot be recovered.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.noteService.deleteNote(note._id).subscribe({
          next: (note: UserNote) => {
            this.snackbarService.show('Note deleted successfully', true);
            this.noteChanges.emit(true);
          },
          error: (error) => {
            this.snackbarService.show('Internal server error', false);
          },
          complete: () => {},
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.tableData.filter = input;
  }

  updateArchive(noteId: string, isArchived: boolean): void {
    this.noteService.updateNote(noteId, { isArchived: !isArchived }).subscribe({
      next: (note: UserNote) => {
        this.snackbarService.show('Note updated successfully', true);
        this.noteChanges.emit(true);
      },
      error: (error) => {
        this.snackbarService.show('Internal server error', false);
      },
      complete: () => {},
    });
  }
}
