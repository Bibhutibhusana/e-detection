import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class AlertComponent implements OnInit,OnDestroy {

 private subscription: Subscription = new Subscription;

    message: any;
    constructor(private alertService: AlertService) { }

    ngOnInit() {
	//console.log(this.subscription," Before subscribe");
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
				//console.log(message)
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
       //console.log("This is after subscribe ",this.subscription)
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    closeAlert() {
        this.alertService.clear();
    }

}
