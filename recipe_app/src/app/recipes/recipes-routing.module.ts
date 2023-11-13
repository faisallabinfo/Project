import { RecipesComponent } from "./recipes.component";
import { authGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipeResolver } from "../recipe-resolver.resolver";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes:Routes=[
    {
        path:'recipes',
        component:RecipesComponent,
        canActivate:[authGuard],
        children: [
            {path:'',component:RecipeStartComponent},
            {path:'new-recipe',component:RecipeEditComponent},
            {
                path:':id',
                component:RecipesDetailComponent,
                resolve:[RecipeResolver]
            },
            {
                path:':id/edit',
                component:RecipeEditComponent,
                resolve:[RecipeResolver]

            }

        ]
    }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule {

}