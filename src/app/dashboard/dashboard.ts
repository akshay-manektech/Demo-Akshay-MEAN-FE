import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserRole } from '../enums/user-role.enum';
import { AdminNote } from '../interfaces/admin-notest.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { NotePayloadInterface } from '../interfaces/note-payload.interface';
import { UserNote } from '../interfaces/user-note.interface';
import { UserNotesCountInterface } from '../interfaces/user-notes-count.interface';
import { UserInterface } from '../interfaces/user.interface';
import { AuthService } from '../services/auth-service';
import { NotesService } from '../services/notes-service';
import { SnackbarService } from '../services/snackbar-service';
import { AddEditNoteDialog } from './add-edit-note-dialog/add-edit-note-dialog';
import { NotesTable } from './notes-table/notes-table';
import { SearchUserPipe } from './search-user-pipe';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    NotesTable,
    MatAccordion,
    MatExpansionModule,
    SearchUserPipe,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  displayedColumns: string[] = ['title', 'content', 'actions'];
  private authService = inject(AuthService);
  private noteService = inject(NotesService);
  private snackbarService = inject(SnackbarService);
  private dialog = inject(MatDialog);
  noteData: UserNote[] = [];
  user: AuthResponse | null = null;
  role: string | null = null;
  UserRole = UserRole;
  tabIndex: number = 0;
  adminNotesList: AdminNote[] = [];
  notesCount: UserNotesCountInterface = {
    archived: 0,
    unarchived: 0,
  };
  userList: UserInterface[] = [];
  userSearch: string = '';
  userControl = new FormControl<string[]>([]);
  availableColors: string[] = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black'];

  ngOnInit() {
    this.user = this.authService.getUser();
    this.role = this.authService.getUserRole();
    // User API call
    if (this.role === UserRole.USER) {
      this.getNotes();
    } else if (this.role == UserRole.ADMIN) {
      // Admin API call.
      this.getAllNotesForAdmin();
      this.getUserList();
    }
  }

  async getNotes(): Promise<void> {
    this.noteService.getNotes().subscribe({
      next: (notes: UserNote[]) => {
        this.noteData = notes;
        this.snackbarService.show('Notes fetched', true);
        this.getNotesCount();
      },
      error: (error) => {
        if (error.error.message === 'invalid_or_expired_token') {
          this.snackbarService.show('Session expired, Login again!', false);
          this.authService.logout();
        } else {
          this.snackbarService.show('Internal server error', false);
        }
      },
      complete: () => {},
    });
  }

  async getArchivedNotes(): Promise<void> {
    this.noteService.getArchivedNotes().subscribe({
      next: (notes: UserNote[]) => {
        this.noteData = notes;
        this.getNotesCount();
      },
      error: (error) => {
        if (error.error.message === 'invalid_or_expired_token') {
          this.snackbarService.show('Session expired, Login again!', false);
          this.authService.logout();
        } else {
          this.snackbarService.show('Internal server error', false);
        }
      },
      complete: () => {},
    });
  }

  async getAllNotesForAdmin(userIds?: string[]): Promise<void> {
    this.noteService.getNotesForAdmin(userIds).subscribe({
      next: (adminNotes: AdminNote[]) => {
        this.adminNotesList = adminNotes;
        this.snackbarService.show('All notes fetched', true);
      },
      error: (error) => {
        if (error.error.message === 'invalid_or_expired_token') {
          this.snackbarService.show('Session expired, Login again!', false);
          this.authService.logout();
        } else {
          this.snackbarService.show('Internal server error', false);
        }
      },
      complete: () => {},
    });
  }

  getUserList(): void {
    this.authService.getUserList().subscribe({
      next: (userList: UserInterface[]) => {
        this.userList = userList;
      },
      error: (error) => {
        if (error.error.message === 'invalid_or_expired_token') {
          this.snackbarService.show('Session expired, Login again!', false);
          this.authService.logout();
        } else {
          this.snackbarService.show('Internal server error', false);
        }
      },
      complete: () => {},
    });
  }

  async getNotesCount(): Promise<void> {
    this.noteService.getUserNotesCount().subscribe({
      next: (notesCount: UserNotesCountInterface) => {
        this.notesCount = notesCount;
      },
      error: (error) => {
        if (error.error.message === 'invalid_or_expired_token') {
          this.snackbarService.show('Session expired, Login again!', false);
          this.authService.logout();
        } else {
          this.snackbarService.show('Internal server error', false);
        }
      },
      complete: () => {},
    });
  }

  getInitials(): string | undefined {
    return this.user?.fullName
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  onLogout(): void {
    this.authService.logout();
  }

  addNote(): void {
    const dialogRef = this.dialog.open(AddEditNoteDialog, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: NotePayloadInterface) => {
      if (result) {
        this.noteService.addNewNote(result).subscribe({
          next: (note: UserNote) => {
            this.snackbarService.show('Note added successfully', true);
            this.getNotes();
          },
          error: (error) => {
            this.snackbarService.show('Internal server error', false);
          },
          complete: () => {},
        });
      }
    });
  }

  onTabChange(index: number): void {
    this.tabIndex = index;
    if (index === 0) {
      this.getNotes();
    } else if (index === 1) {
      this.getArchivedNotes();
    }
  }

  noteChangeEvent(event: Event): void {
    if (this.tabIndex === 0) {
      this.getNotes();
    } else if (this.tabIndex === 1) {
      this.getArchivedNotes();
    }
  }

  getUserName(id: string) {
    return this.userList.find((u: UserInterface) => u._id.toString() === id)?.fullName ?? '';
  }

  remove(userId: string) {
    const selection = this.userControl.value ?? [];
    const index = selection.indexOf(userId.toString());

    if (index >= 0) {
      selection.splice(index, 1);
      this.userControl.setValue([...selection]);
      const userIds = this.userControl.getRawValue();
      if (userIds !== null) {
        this.getAllNotesForAdmin(userIds);
      }
    }
  }

  onSelectionChange() {
    this.userControl.setValue([...new Set(this.userControl.value)]);
    const userIds = this.userControl.getRawValue();
    if (userIds !== null) {
      this.getAllNotesForAdmin(userIds);
    }
  }
}
