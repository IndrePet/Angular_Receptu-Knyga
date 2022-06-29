import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) {}

  private getRecipes() {
    this.recipeService.getRecipe().subscribe((response) => {
      this.recipes = response;
    });
  }

  ngOnInit(): void {
    this.getRecipes();
    this.recipeService.onRecipeUpdate.subscribe(() => {
      this.getRecipes();
    });
  }
}
