import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
    public loader: LoaderService = inject(LoaderService);

}