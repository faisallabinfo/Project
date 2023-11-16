import { Directive, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';

@Directive({
  selector: '[appMenuToggle]'
})
export class MenuToggleDirective {

  //@HostBinding('class.in') isOpen =false;
  //@ViewChild('')
  constructor(private elRef:ElementRef) { }

  @HostListener('click',['$event']) toggleOpener(event:Event) {
    const targetElement = this.elRef.nativeElement.querySelector('#headTrigger');
    targetElement.classList.toggle('in');
    console.log(targetElement);
    
    
    
  }
}
