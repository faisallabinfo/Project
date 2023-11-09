import { Injectable } from "@angular/core";
import { Ingridient } from "../shared/ingridient.model";
import { Subject } from "rxjs";
@Injectable()
export class ShoppingListService {
    ingridientChanges=new Subject<Ingridient[]>();
    startedEditing=new Subject<number>();
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

    getIngridentForEdit(index:number) {
        return this.ingridients[index];
    }

    addIngridients(ingridients:Ingridient[]) {
        this.ingridients.push(...ingridients);
        this.ingridientChanges.next(ingridients.slice());
    }

    updateIngridient(index:number,ingridient:Ingridient) {
        this.ingridients[index]=ingridient;
        this.ingridientChanges.next(this.ingridients.slice());
    }

    deleteIngridient(index:number) {
        this.ingridients.splice(index,1);
        this.ingridientChanges.next(this.ingridients.slice());
    }
}
