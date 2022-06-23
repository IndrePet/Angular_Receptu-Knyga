export interface Recipe {
  id?: string;
  name: string;
  preparationTime: string;
  description: string;
  image: string;
  kcal: string;
  ingredients: { ingredientName: string; amount: string; unit: string }[];
  allergies: string[];
}
