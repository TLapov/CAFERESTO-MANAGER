import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './components/input-fields/input-field.component';
import { CategoryService } from './core/api-services/category.service';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputFieldComponent, SpinnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    categoryService: CategoryService = inject(CategoryService);

    ngOnInit() {
      this.categoryService.getCategories().subscribe(data => {
        console.log(data);
      })
    }
}
