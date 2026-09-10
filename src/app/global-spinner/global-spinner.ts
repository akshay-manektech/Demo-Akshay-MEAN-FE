import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading-service';

@Component({
  selector: 'app-global-spinner',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './global-spinner.html',
  styleUrl: './global-spinner.css',
})
export class GlobalSpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}
