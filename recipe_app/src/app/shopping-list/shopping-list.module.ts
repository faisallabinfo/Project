import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRouting } from './shopping-list-module.routing';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        ShoppingListRouting,
        FormsModule
    ],
    exports: [],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    providers: [],
})
export class ShoppingListModule { }
