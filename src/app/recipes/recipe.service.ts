import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
  recipesChanged=  new Subject<Recipe[]>();

//  private recipes: Recipe[] = [
//     new Recipe(
//       'Chocolate Cake',
//       'As yummy as ever!',
//       'https://p0.pikrepo.com/preview/1002/340/chocolate-cake-chocolate-cake-recipe.jpg',
//       [
//         new Ingredient('cocoa powder', 1),
//         new Ingredient('flour', 1),
//         new Ingredient('sugar', 1),
  
//       ]),
//     new Recipe(
//       'Vanilla Cake',
//       'With Butter',
//       'https://p1.pxfuel.com/preview/630/943/795/cakes-muffins-his-grandmother-cupcakes-pastries-food.jpg',
//       [
//         new Ingredient('butter', 1),
//         new Ingredient('flour', 1),
//         new Ingredient('sugar', 1),
  
//       ])
//   ];

private recipes: Recipe[] =[];

  constructor(private slService : ShoppingListService){}

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
      return this.recipes.slice();
  }

  getRecipe(index: number)
  {
    return this.recipes[index];
  }
  
  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index : number, newRecipe : Recipe){
    this.recipes[index]= newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

}