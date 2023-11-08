import { Injectable } from "@angular/core";
import { Ingridient } from "../shared/ingridient.model";
import { Subject } from "rxjs";
@Injectable()
export class ShoppingListService {
    ingridientChanges=new Subject<Ingridient[]>();
    private ingridients:Ingridient[]=[
        new Ingridient("Rice",10),
        new Ingridient("Chicken",5),
        new Ingridient("Oil",5)
    ];

    constructor(){}
    getIngridients() {
        return this.ingridients.slice();
    }
    
    addIngridient(ingridient:Ingridient) {
        this.ingridients.push(ingridient);
        this.ingridientChanges.next(this.ingridients.slice());
    }

    addIngridients(ingridients:Ingridient[]) {
        this.ingridients.push(...ingridients);
        this.ingridientChanges.next(ingridients.slice());
    }
}
