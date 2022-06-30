import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
  animations: [
    trigger('expand', [
      state(
        'small',
        style({
          width: '300px',
          height: '150px',
          'font-size': '1rem',
        })
      ),
      state(
        'big',
        style({
          width: '600px',
          height: '300px',
          'font-size': '2rem',
        })
      ),
      transition('small=>big', [animate(1000)]),
      transition('big=>small', [animate(1000)]),
    ]),
    trigger('showSubmit', [
      state(
        'hide',
        style({
          transform: 'translateX(-200px)',
        })
      ),
      state(
        'show',
        style({
          transform: 'translateX(100px)',
        })
      ),
      transition('show=>hide', [animate(1000)]),
      transition('hide=>show', [animate(1000)]),
    ]),
    trigger('ingredientAnimation', [
      state(
        'show',
        style({
          opacity: '1',
          height: '30px',
        })
      ),
      transition('void=>*', [
        style({
          opacity: '0',
          height: '0px',
        }),
        animate(
          500,
          style({
            height: '30px',
          })
        ),
        animate(
          750,
          style({
            opacity: '1',
          })
        ),
      ]),
      transition('*=>void', [
        style({
          opacity: '1',
          height: '30px',
        }),
        animate(
          750,
          style({
            transform: 'translateX(5000px)',
          })
        ),
        animate(
          500,
          style({
            height: '0px',
          })
        ),
      ]),
    ]),
  ],
})
export class NewRecipeComponent implements OnInit {
  public recipeForm: FormGroup;
  public allIngredients: { ingredient: string }[] = [];
  public animationState = 'small';
  public submitButton = 'hide';

  constructor(
    private recipeService: RecipeService,
    private ingredientsService: IngredientsService
  ) {
    this.recipeForm = new FormGroup({
      name: new FormControl(
        null,
        [Validators.required, Validators.maxLength(30)],
        this.newRecipeValidator()
      ),
      preparationTime: new FormControl(null, [
        Validators.required,
        this.timeValidator,
      ]),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, [Validators.required, this.urlValidator]),
      kcal: new FormControl(null),
      ingredients: new FormArray([]),
      allergies: new FormArray([]),
      mealTime: new FormControl(null),
    });
  }

  public onFocus() {
    this.animationState = 'big';
  }

  public onFocusOut() {
    this.animationState = 'small';
  }

  private getIngredients() {
    this.ingredientsService.getIngredients().subscribe((result) => {
      this.allIngredients = result;
    });
  }

  ngOnInit(): void {
    this.getIngredients();
    this.ingredientsService.newIngredient.subscribe(() => {
      this.getIngredients();
    });

    this.recipeForm.statusChanges.subscribe((response) => {
      if (response === 'VALID') {
        this.submitButton = 'show';
      } else {
        this.submitButton = 'hide';
      }
    });
  }

  newRecipeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.recipeService.getRecipe().pipe(
        map((response) => {
          let taken = false;
          response.forEach((recipe) => {
            if (
              recipe.name === control.value &&
              recipe.mealTime === this.recipeForm.get('mealTime')?.value
            ) {
              taken = true;
            }
          });
          if (taken) {
            return { error: 'Toks receptas jau egzistuoja' };
          } else {
            return null;
          }
        })
      );
    };
  }
  public outError() {
    let control = this.recipeForm.get('name');
    if (control?.errors != null) {
      return control.errors['error'];
    }
    return '';
  }

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
    this.recipeService.addRecipe(this.recipeForm.value).subscribe(() => {});
    this.recipeService.addMealTimeCount(this.recipeForm.value.mealTime);
  }
}
