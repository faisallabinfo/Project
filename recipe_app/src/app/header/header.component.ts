import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() featureSelected=new EventEmitter<string>();
  selectedTab:string='recipe';
   constructor( private activatedRoute:ActivatedRoute) {
    
   }
}
