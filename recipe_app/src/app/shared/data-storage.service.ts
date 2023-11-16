import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService) { }

  storeRecipes() {
    const recipes=this.recipeService.getRecipe();
    console.log(recipes);
    
    this.http.put('https://recipe-app-77-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(recipes=>{
      
    });
  }

  fetchRecipes() { 
    return this.http.get<Recipe[]>(
      'https://recipe-app-77-default-rtdb.firebaseio.com/recipes.json'
    ).pipe(map(recipes=>{
      //console.log(recipes);
      
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingridients:recipe.ingridients?recipe.ingridients:[]
        }
      });
    }),tap(recipes => {
      this.recipeService.setRecipe(recipes)
    })
    );
  }
}
