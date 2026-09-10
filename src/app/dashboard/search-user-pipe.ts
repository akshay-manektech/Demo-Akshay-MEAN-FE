import { Pipe, PipeTransform } from '@angular/core';
import { AdminNote } from '../interfaces/admin-notest.interface';

@Pipe({
  name: 'searchUser',
})
export class SearchUserPipe implements PipeTransform {
  transform(notes: AdminNote[], searchValie: string): AdminNote[] {
    return notes.filter((note: AdminNote) => note.userName.toLowerCase().includes(searchValie));
  }
}
