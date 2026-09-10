import { UserNote } from './user-note.interface';

export type NotePayloadInterface = Partial<Pick<UserNote, 'title' | 'content' | 'isArchived'>>;
