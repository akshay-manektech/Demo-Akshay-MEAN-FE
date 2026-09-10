import { UserRole } from '../enums/user-role.enum';
import { UserNote } from './user-note.interface';

export interface AdminNote {
  userName: string;
  totalCount: number,
  notes: UserNote[];
}
