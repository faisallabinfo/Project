import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-module.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AuthRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [AuthComponent],
    providers: [],
})
export class AuthModule { }
