import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly url = environment.dbUrl;
  constructor(private http: HttpClient, private router: Router) {}

  public addRecipe(recipe: Recipe) {
    return this.http.post(this.url + 'recipes.json', recipe);
  }

  public onRecipeUpdate = new EventEmitter();
  public recipees: Recipe[] = [];

  public getRecipe() {
    return this.http
      .get<{ [key: string]: Recipe }>(this.url + 'recipes.json')
      .pipe(
        map((response) => {
          let recipes: Recipe[] = [];
          for (let key in response) {
            recipes.push({ ...response[key], id: key });
          }
          this.recipees = recipes;
          return recipes;
        })
      );
  }

  public getRecipeById(id: string): Recipe | null {
    let result: Recipe | null = null;
    this.recipees.forEach((recipe) => {
      if (recipe.id != null && recipe.id == id) {
        result = recipe;
      }
    });
    if (result == null) {
      this.router.navigate(['/']);
    }
    return result;
  }

  public addLike(id: string) {
    let likes = 0;
    this.http
      .get<number>(this.url + 'recipes/' + id + '/likes.json')
      .subscribe((response) => {
        likes = response;
        likes++;
        this.http
          .patch(this.url + 'recipes/' + id + '.json', {
            likes,
          })
          .subscribe(() => {
            this.onRecipeUpdate.emit();
          });
      });
  }
  public addMealTimeCount(mealTime: string) {
    let count = 0;
    this.http
      .get<number>(this.url + 'recipeTime/' + mealTime + '.json')
      .subscribe((response) => {
        count = response;
        count++;
        this.http
          .patch(this.url + 'recipeTime.json', {
            [mealTime]: count,
          })
          .subscribe(() => {});
      });
  }
}
