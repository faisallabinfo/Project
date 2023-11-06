import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {

  @Output() recipeWasSelected=new EventEmitter<Recipe>();
  recipes:Recipe[]=[
    new Recipe("Biryani","Chicken Biryani","https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg"),
    new Recipe("Shwarma","Chicken Shwarma","https://www.loveandotherspices.com/wp-content/uploads/2020/02/ChickenShawarma-Post.jpg")
  ];

  onRecipeSelected(recipe:Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
