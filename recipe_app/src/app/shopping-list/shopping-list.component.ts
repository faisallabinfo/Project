import { Component } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingridients:Ingridient[]=[
    new Ingridient("Rice",10),
    new Ingridient("Chicken",5),
    new Ingridient("Oil",5)
  ];

  onIngridientAdded(ingridient:Ingridient) {
    this.ingridients.push(ingridient);
  }
}
