import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService implements OnInit {

    constructor(private shoppingListService:ShoppingListService){}
    //Store seleted recipe
    recipeSelected=new EventEmitter<Recipe>();
    private recipes:Recipe[]=[new Recipe("Biryani","Chicken Biryani","https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg",[new Ingridient("ingri1",5),new Ingridient("ingri2",7)]),
                            new Recipe("Shwarma","Chicken Shwarma","https://www.loveandotherspices.com/wp-content/uploads/2020/02/ChickenShawarma-Post.jpg",[new Ingridient("ingri1",5),new Ingridient("ingri2",7)])
                        ];
                    
    //ngOnInit
    ngOnInit() {
              
    }

    getRecipe() {
        return this.recipes.slice();
    }
    addRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
    }
    addIngridentsToShoppinglist(ingridients:Ingridient[]) {
        this.shoppingListService.addIngridients(ingridients);
    }

    //Get recipe by index posiotion
    getRecipeDetailByIndex(index:number) {
        return this.recipes.slice()[index];
    }
}