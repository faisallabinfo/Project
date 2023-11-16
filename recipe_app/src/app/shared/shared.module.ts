import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { NgModule } from '@angular/core';
import { MenuToggleDirective } from './menu-toggle.directive';



@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        LoadingSpinnerComponent,
        DropdownDirective,
        AlertComponent, 
        MenuToggleDirective
    ],
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective,
        AlertComponent,
        MenuToggleDirective,    
    ],
    providers: [],
    
})
export class SharedModule { }
