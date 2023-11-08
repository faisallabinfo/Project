import { Component, Signal } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent {
  hour:string;
  minutes:string;
  seconds:string;

  private customTimeSubscription:Subscription;

  ngOnInit(){
    this.updateTime();
    setInterval(()=>{
      this.updateTime();
    },1000)    
  }

  updateTime() {
    this.hour=new Date().getHours()+'';
    this.minutes=new Date().getMinutes()+'';
    this.seconds=new Date().getSeconds()+'';
    if(this.minutes.length===1) {
      this.minutes="0"+this.minutes;
    }
    if(this.seconds.length===1) {
      this.seconds="0"+this.seconds;
    }
  }



}
