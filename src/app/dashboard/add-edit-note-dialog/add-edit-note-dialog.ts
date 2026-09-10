import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserNote } from '../../interfaces/user-note.interface';

@Component({
  selector: 'app-add-edit-note-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-edit-note-dialog.html',
  styleUrl: './add-edit-note-dialog.css',
})
export class AddEditNoteDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddEditNoteDialog>);
  public noteForm;
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserNote) {
    this.noteForm = this.fb.nonNullable.group({
      title: [this.data ? this.data.title : '', [Validators.required]],
      content: [this.data ? this.data.content : '', [Validators.required]],
    });
  }

  submit() {
    if (this.noteForm.valid) {
      this.dialogRef.close(this.noteForm.value); // send data back
    }
  }

  close() {
    this.dialogRef.close(null);
  }
}
