import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';
import { addIngridient, deleteIngridient, updateIngridient } from '../store/shopping-list.actions';
import * as shoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingEditSubscription: Subscription;
  editMode: boolean = false;
  selectedItemIndex: number;
  editIngridient$: Observable<{ ingridients: Ingridient[] }>;

  ///Constructor
  constructor(private shoppingListService: ShoppingListService,
    private store: Store<shoppingList.AppState>) { }

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f', { static: false }) formDataForEdit: NgForm;

  ngOnInit() {
    this.shoppingEditSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.selectedItemIndex = index;
        //this.editIngrident = this.shoppingListService.getIngridentForEdit(index);
        this.editIngridient$ = this.store.select('shoppingList');
        let selectedIngridient: Ingridient;
        this.shoppingEditSubscription = this.editIngridient$.subscribe(data => selectedIngridient = data.ingridients[index]);
        this.populateItemToFormForEdit(selectedIngridient);
      }
    );
  }

  populateItemToFormForEdit(selectedIngridient: Ingridient) {
    this.formDataForEdit.setValue({
      ['name']: selectedIngridient.name,
      ['amount']: selectedIngridient.amount
    });
  }

  onAddUpdateItem(data: NgForm) {
    if (this.editMode) {
      //data.valid ? this.shoppingListService.updateIngridient(this.seletedItemIndex, data.value) : alert("Enter a valid dat");
      data.valid ? this.store.dispatch(updateIngridient({ index: this.selectedItemIndex, ingridient: data.value })) : alert("Enter a valid dat");
    }
    else {
      //data.valid ? this.shoppingListService.addIngridient(data.value) : alert("Please add value!");
      //console.log(data.value);
      let ingri: Ingridient = data.value;
      this.store.dispatch(addIngridient({ ingridient: ingri }));
    }
    this.editMode = false;
    data.reset();
    //console.log(data);
  }

  onDelete() {
    this.onClear();
    //this.shoppingListService.deleteIngridient(this.selectedItemIndex);
    this.store.dispatch(deleteIngridient({ index: this.selectedItemIndex }));
  }

  onClear() {
    this.formDataForEdit.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.shoppingEditSubscription.unsubscribe();
  }

}
