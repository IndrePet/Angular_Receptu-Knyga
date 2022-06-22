import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  public recipeForm: FormGroup;

  constructor() {
    this.recipeForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      preparationTime: new FormControl(null, [
        Validators.required,
        this.timeValidator,
      ]),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null),
      kcal: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  timeValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value % 5) {
      return { 'Gaminimo trukme 5 min intervalais': true };
    } else {
      return null;
    }
  }

  public addRecipe() {
    console.log(this.recipeForm);
  }
}
