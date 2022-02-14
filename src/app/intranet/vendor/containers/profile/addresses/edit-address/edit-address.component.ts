import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-editaddress',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.scss'],
})

export class EditaddressComponent implements OnInit {
    constructor(private route : ActivatedRoute) { }
    addressID : string | any;
    ngOnInit() { 
        this.addressID = this.route.snapshot.paramMap.get('id');
    }
}