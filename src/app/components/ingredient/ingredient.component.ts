import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
})
export class IngredientComponent implements OnInit {
  public name: string = 'Skanėstai šuniui';
  public quantity: number = 125;
  public price: number | null = 1.99;
  constructor() {}

  ngOnInit(): void {}

  public totalPrice(): number | null {
    if (this.price !== null) {
      return this.quantity * this.price;
    } else {
      return null;
    }
  }
}
