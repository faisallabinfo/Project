import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({ selector: '[appDropdown ]' })
export class DropdownDirective {
    @HostListener('click') toggleOpener() {
        this.isOpen = !this.isOpen;
    }

    @HostBinding('class.open') isOpen =false;
    constructor() { }
}