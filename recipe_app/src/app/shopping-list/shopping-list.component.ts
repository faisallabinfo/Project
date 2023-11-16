import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingridients$ = new Observable<{ ingridients: Ingridient[] }>;
  constructor(private shoppingListService: ShoppingListService, private store: Store<{ shoppingList: { ingridients: Ingridient[] } }>) { }

  ngOnInit() {
    this.ingridients$ = this.store.select('shoppingList');
  }

  onItemSelect(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {

  }


}
