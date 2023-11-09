import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/shared/ingridient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  shoppingEditSubscription:Subscription;
  editMode:boolean=false;
  seletedItemIndex:number;
  editIngrident:Ingridient;
  constructor(private shoppingListService:ShoppingListService) {}
  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  @ViewChild('f',{static:false}) formDataForEdit:NgForm;

  ngOnInit() {
    this.shoppingEditSubscription=this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.seletedItemIndex=index;
        this.editIngrident=this.shoppingListService.getIngridentForEdit(index);
        this.populateItemToFormForEdit();
      }
    );
  }

  populateItemToFormForEdit() {
    this.formDataForEdit.setValue({
      ['name']:this.editIngrident.name,
      ['amount']:this.editIngrident.amount
    });
  }
  
  onAddUpdateItem(data:NgForm) {
    if(this.editMode) {
      data.valid?this.shoppingListService.updateIngridient(this.seletedItemIndex,data.value):alert("Enter a valid dat");
    }
    else {
      data.valid?this.shoppingListService.addIngridient(data.value):alert("Please add value!");
    }
    this.editMode=false;
    data.reset();
    //console.log(data);
  }
  
  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngridient(this.seletedItemIndex);
  }

  onClear() {
    this.formDataForEdit.reset();
    this.editMode=false;
  }
}
