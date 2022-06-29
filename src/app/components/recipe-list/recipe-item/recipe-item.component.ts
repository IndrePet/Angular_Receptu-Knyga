import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() public recipe: Recipe | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public recipeDetails(id?: string) {
    if (id != null) {
      this.router.navigate(['recipe', id]);
    }
  }
}
