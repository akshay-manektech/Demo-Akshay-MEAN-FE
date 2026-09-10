import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { AdminNote } from '../interfaces/admin-notest.interface';
import { NotePayloadInterface } from '../interfaces/note-payload.interface';
import { UserNote } from '../interfaces/user-note.interface';
import { UserNotesCountInterface } from '../interfaces/user-notes-count.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseURL;

  getNotes(): Observable<UserNote[]> {
    return this.http.get<UserNote[]>(`${this.baseUrl}/notes`);
  }

  getNotesForAdmin(userIds?: string[]): Observable<AdminNote[]> {
    let params = new HttpParams();
    if (userIds && userIds.length) {
      params = params.set('userIds', userIds.join(','));
    }
    return this.http.get<AdminNote[]>(`${this.baseUrl}/notes/all`, { params });
  }

  addNewNote(payload: NotePayloadInterface): Observable<UserNote> {
    return this.http.post<UserNote>(`${this.baseUrl}/notes`, payload);
  }

  deleteNote(noteId: string): Observable<UserNote> {
    return this.http.delete<UserNote>(`${this.baseUrl}/notes/${noteId}`);
  }

  updateNote(noteId: string, updateNotePayload: NotePayloadInterface): Observable<UserNote> {
    return this.http.put<UserNote>(`${this.baseUrl}/notes/${noteId}`, updateNotePayload);
  }

  getArchivedNotes(): Observable<UserNote[]> {
    return this.http.get<UserNote[]>(`${this.baseUrl}/notes/archived`);
  }

  getUserNotesCount(): Observable<UserNotesCountInterface> {
    return this.http.get<UserNotesCountInterface>(`${this.baseUrl}/notes/noteCounts`);
  }
}
