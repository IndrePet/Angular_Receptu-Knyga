import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrls: ['./add-ingredients.component.css'],
})
export class AddIngredientsComponent implements OnInit {
  public ingredient: string = '';
  constructor(private ingredientsService: IngredientsService) {}

  ngOnInit(): void {}

  public addIngredient() {
    this.ingredientsService.addIngredient(this.ingredient).subscribe(() => {
      this.ingredient = '';
    });
  }
}
