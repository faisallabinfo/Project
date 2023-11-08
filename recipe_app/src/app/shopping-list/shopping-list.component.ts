import { Component, OnInit } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{

  ingridients:Ingridient[];
  shoppingListSubscription:Subscription;
  constructor(private shoppingListService:ShoppingListService) {}

  ngOnInit() {
    this.ingridients=this.shoppingListService.getIngridients();
    this.shoppingListSubscription=this.shoppingListService.ingridientChanges.subscribe(
      (ingridients:Ingridient[]) => {
        this.ingridients=ingridients;
      }
    );
  }

  ngOnDestroy() {
    this.shoppingListSubscription.unsubscribe();
  }
  
  
}
