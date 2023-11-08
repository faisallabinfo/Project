import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  constructor(private shoppingListService:ShoppingListService) {}
  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  
  onSubmit(data:NgForm) {
    data.valid?this.shoppingListService.addIngridient((data.value)):alert("Please add value!");
  }
  onDelete() {
    
  }
}
