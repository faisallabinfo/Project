import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isInEdit: boolean = false;
  recipeForm: FormGroup;
  recipes: Recipe[];

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.isInEdit = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngridients = new FormArray([]);
    if (this.isInEdit) {
      const recipe = this.recipeService.getRecipeDetailByIndex(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingridients']) {
        recipe.ingridients.forEach((e) => {
          recipeIngridients.push(
            new FormGroup({
              'name': new FormControl(e.name, Validators.required),
              'amount': new FormControl(e.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]\d*$/)
              ])
            })
          );
        });
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingridients': recipeIngridients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingridients')).controls;
  }

  onAddIngridient() {
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }

  onSubmit() {
    if (this.isInEdit) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onRemoveIngridient(index: number) {
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
    //console.log(index);

  }
}
