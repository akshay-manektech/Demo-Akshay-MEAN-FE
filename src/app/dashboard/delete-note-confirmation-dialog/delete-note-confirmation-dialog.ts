import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../interfaces/confirmation-dialog.interface';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Confirm' }}</h2>
    <mat-dialog-content>
      <p *ngIf="data.warningText" class="warning">
        <mat-icon color="warn">warning</mat-icon>
        {{ data.warningText }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">{{ data.cancelText || 'Cancel' }}</button>
      <button mat-flat-button color="warn" (click)="onConfirm()">
        {{ data.confirmText || 'Delete' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .warning {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #d32f2f;
        font-weight: 500;
        margin-top: 10px;
      }
      mat-dialog-content p {
        margin: 0;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
