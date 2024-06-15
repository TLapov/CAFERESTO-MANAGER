import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './components/input-fields/input-field.component';
import { CategoryService } from './core/api-services/category.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputFieldComponent, SpinnerComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    categoryService: CategoryService = inject(CategoryService);

    loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });

    ngOnInit() {
      // this.categoryService.getCategories().subscribe({next: (tasks) => {
      //   console.log(tasks);
      // }, error: (error) => {
      //   console.log(error);
      // }})
    }
    
    onSubmit() {
      console.log(this.loginForm.value);
    }
}
