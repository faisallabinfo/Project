import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})


export class RecipesListComponent {

  recipes:Recipe[];
  constructor(private recipeService:RecipeService,private router:Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.recipes=this.recipeService.getRecipe();
    this.recipeService.recipeChanged.subscribe(
      (recipe:Recipe[])=>{
        this.recipes=recipe;
      }
    );
  }

  newRecipe(){
    this.router.navigate(['new-recipe'],{relativeTo:this.activatedRoute});
  }
}
