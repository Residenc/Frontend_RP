import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'cart-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss']
})

export class ResumeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    initUserInfo(data:any){
        console.log('resume user info:', data)
    }

    initCartInfo(data:any){
        console.log('resume cart info:', data)
    }
}