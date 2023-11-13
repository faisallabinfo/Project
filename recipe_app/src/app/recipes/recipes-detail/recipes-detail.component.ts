import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit{
  @Input() recipeDetails:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,private router:Router,private activatedRoute:ActivatedRoute){}
  addToSoppingList() {
    this.recipeService.addIngridentsToShoppinglist(this.recipeDetails.ingridients);
    //this.router.navigate(['shopping-list']);
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recipeDetails=this.recipeService.getRecipeDetailByIndex(this.id);
      }
    );
  }

  editRecipe() {
    this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
