import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  @Output() featureSelected=new EventEmitter<string>();
  selectedTab:string='recipe';
  isAuthenticated=false;
  private userSubs:Subscription;

  constructor( private activatedRoute:ActivatedRoute,private dataStorageService:DataStorageService,private authService:AuthService) {}

  ngOnInit() {
    this.userSubs = this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user;
    });
  }

  onSaveRecipe() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
