import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private readonly url =
    'https://receptu-knygele-default-rtdb.europe-west1.firebasedatabase.app/';
  public newIngredient = new EventEmitter();

  constructor(private http: HttpClient) {}

  public addIngredient(ingredient: string) {
    return this.http.post(this.url + 'ingredients.json', { ingredient }).pipe(
      tap((response) => {
        this.newIngredient.emit();
      })
    );
  }

  getIngredients() {
    return this.http
      .get<{ [key: string]: { ingredient: string } }>(
        this.url + 'ingredients.json'
      )
      .pipe(
        map((response) => {
          let result: { ingredient: string }[] = [];
          for (let key in response) {
            result.push({ ingredient: response[key].ingredient });
          }
          return result;
        })
      );
  }
}
