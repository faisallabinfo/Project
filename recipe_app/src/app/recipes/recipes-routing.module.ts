import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../auth/auth.guard";
import { RecipeResolver } from "../recipe-resolver.resolver";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new-recipe', component: RecipeEditComponent },
            {
                path: ':id',
                component: RecipesDetailComponent,
                resolve: [RecipeResolver]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipeResolver]
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}