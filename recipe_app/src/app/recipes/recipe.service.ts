import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService implements OnInit {

    recipeChanged=new Subject<Recipe[]>();

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
        this.recipeChanged.next(this.recipes.slice());
    }
    addIngridentsToShoppinglist(ingridients:Ingridient[]) {
        this.shoppingListService.addIngridients(ingridients);
    }

    //Get recipe by index posiotion
    getRecipeDetailByIndex(index:number) {
        return this.recipes.slice()[index];
    }

    updateRecipe(index:number,recipe:Recipe) {
        this.recipes[index]=recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice())
    }
}