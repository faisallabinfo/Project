import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipes/recipe.model';
import { DataStorageService } from './shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {
    constructor(private dataStorageService:DataStorageService){}
    resolve(route: ActivatedRouteSnapshot) {
        return this.dataStorageService.fetchRecipes();
    }
}