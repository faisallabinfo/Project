import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { addIngridients } from 'src/app/shopping-list/store/shopping-list.actions';
import * as shoppingList from 'src/app/shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input() recipeDetails: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute, private store:Store<shoppingList.AppState>) { }
  addToSoppingList() {
    //this.recipeService.addIngridentsToShoppinglist(this.recipeDetails.ingridients);
    this.store.dispatch(addIngridients({ingridients:this.recipeDetails.ingridients}))
    this.router.navigate(['shopping-list']);
    
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeDetails = this.recipeService.getRecipeDetailByIndex(this.id);
      }
    );
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
