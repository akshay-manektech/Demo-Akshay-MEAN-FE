import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { GlobalSpinnerComponent } from './global-spinner/global-spinner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatSnackBarModule,
    GlobalSpinnerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('notes-management');
}
