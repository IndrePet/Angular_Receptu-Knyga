export interface Recipe {
  id?: string;
  name: string;
  preparationTime: number;
  description: string;
  image: string;
  kcal: number;
  ingredients: { ingredientName: string; amount: number; unit: string }[];
  allergies: string[];
  mealTime: string;
}
