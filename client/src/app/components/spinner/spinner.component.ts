import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  imports: [CommonModule]
})
export class SpinnerComponent {
    public loader: LoaderService = inject(LoaderService);

}