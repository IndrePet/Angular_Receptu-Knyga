import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private readonly url = environment.dbUrl;
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
