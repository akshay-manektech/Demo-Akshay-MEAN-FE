import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, isSuccess: boolean = true): void {
    const config: MatSnackBarConfig = {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    };

    this.snackBar.open(message, 'Close', config);
  }
}
