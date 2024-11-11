import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service'; // Import the SpinnerService

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$ = this.spinnerService.isLoading$; // Use the isLoading$ observable from the SpinnerService

  constructor(private spinnerService: SpinnerService) {} // Inject the SpinnerService
}