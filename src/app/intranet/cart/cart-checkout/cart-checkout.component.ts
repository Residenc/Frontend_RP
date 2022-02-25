import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ResumeComponent } from './components/resume/resume.component';

@Component({
    selector: 'app-checkout',
    templateUrl: './cart-checkout.component.html',
    styleUrls: ['./cart-checkout.component.scss'],
})

export class CartcheckoutComponent implements OnInit {
    @ViewChild(ResumeComponent, { static: true })
    resume: ResumeComponent = new ResumeComponent;

    stepperOrientation: Observable<StepperOrientation>;

    constructor(breakpointObserver: BreakpointObserver) {
      this.stepperOrientation = breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    }

    @Input() userToResume: any;
    @Input() cartToResume: any;
    
    ngOnInit() { 

    }

    receivedUser(data:any){
        this.userToResume = data;
        //console.log(this.userToResume)
        this.resume.initUserInfo(this.userToResume);
    }

    receivedCart(data:any){
        this.cartToResume = data;
        //console.log(this.cartToResume)
        this.resume.initCartInfo(this.cartToResume);
    }

}