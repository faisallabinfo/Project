import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  @Output() ingridientAdded = new EventEmitter<Ingridient>();

  onAdd() {
    const newIngrident=new Ingridient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value);
    this.ingridientAdded.emit(newIngrident);
  }

  onDelete() {
    
  }
}
