import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
