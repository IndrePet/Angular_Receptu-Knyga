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
  public filteredRecipes: Recipe[] = [];
  public filterPusryciai = false;
  public filterPriespieciai = false;
  public filterPietus = false;
  public filterVakariene = false;
  public filterVisi = true;

  constructor(private recipeService: RecipeService) {}

  private filterRecipes() {
    this.filteredRecipes = [];
    this.recipes.forEach((e) => {
      if (this.filterVisi) {
        this.filteredRecipes.push(e);
      }
      if (this.filterPusryciai && e.mealTime === 'Pusryčiai') {
        this.filteredRecipes.push(e);
      }
      if (this.filterPriespieciai && e.mealTime === 'Priešpiečiai') {
        this.filteredRecipes.push(e);
      }
      if (this.filterPietus && e.mealTime === 'Pietūs') {
        this.filteredRecipes.push(e);
      }
      if (this.filterVakariene && e.mealTime === 'Vakarienė') {
        this.filteredRecipes.push(e);
      }
    });
  }

  private getRecipes() {
    this.recipeService.getRecipe().subscribe((response) => {
      this.recipes = response;
      this.filterRecipes();
    });
  }

  ngOnInit(): void {
    this.getRecipes();
    this.recipeService.onRecipeUpdate.subscribe(() => {
      this.getRecipes();
    });
  }

  public applyFilter() {
    this.filterRecipes();
  }
}
