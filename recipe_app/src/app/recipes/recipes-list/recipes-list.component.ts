import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})


export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
    this.recipeSubscription = this.recipeService.recipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    );
  }

  newRecipe() {
    this.router.navigate(['new-recipe'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
