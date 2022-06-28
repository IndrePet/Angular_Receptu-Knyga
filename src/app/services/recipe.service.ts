import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly url =
    'https://receptu-knygele-default-rtdb.europe-west1.firebasedatabase.app/';
  constructor(private http: HttpClient) {}

  public addRecipe(recipe: Recipe) {
    return this.http.post(this.url + 'recipes.json', recipe);
  }

  public onRecipeUpdate = new EventEmitter();

  public getRecipe() {
    return this.http
      .get<{ [key: string]: Recipe }>(this.url + 'recipes.json')
      .pipe(
        map((response) => {
          let recipes: Recipe[] = [];
          for (let key in response) {
            recipes.push({ ...response[key], id: key });
          }
          return recipes;
        })
      );
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
