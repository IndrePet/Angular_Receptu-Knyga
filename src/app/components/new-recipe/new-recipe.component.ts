import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
      image: new FormControl(null, [Validators.required, this.urlValidator]),
      kcal: new FormControl(null),
      ingredients: new FormArray([]),
      allergies: new FormArray([]),
    });
  }

  ngOnInit(): void {}

  timeValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value % 5) {
      return { mustBe5MinIntervals: true };
    } else {
      return null;
    }
  }

  urlValidator(control: FormControl): { [s: string]: boolean } | null {
    const regex = new RegExp(
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      'g'
    );
    if (!regex.test(control.value)) {
      return { mustBeValidURL: true };
    } else {
      return null;
    }
  }

  public addAllergy() {
    const allergy = new FormControl(null);
    (<FormArray>this.recipeForm.get('allergies')).push(allergy);
  }
  public removeAllergy() {
    (<FormArray>this.recipeForm.get('allergies')).removeAt(-1);
  }
  public allergies() {
    return (<FormArray>this.recipeForm.get('allergies')).controls;
  }

  public addIngredient() {
    const ingredient = new FormGroup({
      ingredientName: new FormControl(null),
      amount: new FormControl(null),
      unit: new FormControl(null),
    });

    (<FormArray>this.recipeForm.get('ingredients')).push(ingredient);
  }

  public removeIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(-1);
  }

  public ingredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  public abstractToFormGroup(formGroup: AbstractControl) {
    return <FormGroup>formGroup;
  }

  public addRecipe() {
    console.log(this.recipeForm);
  }
}
