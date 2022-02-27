import { Component, OnInit } from '@angular/core';
import { itemsCart } from 'src/app/core/shared/models/cart-items.info.model';

@Component({
    selector: 'cart-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss']
})

export class ResumeComponent implements OnInit {

    products: itemsCart | any;

    totalpay:string = '';
    
    name: string | any;
    paternal: string | any;
    maternal: string | any;
    email: string | any;
    phone1: string | any;
    phone2: string | any;
    address: string | any;

    constructor() { }

    ngOnInit() {     

    }

    initUserInfo(data:any){
        console.log('resume user info:', data)
        this.name = data.name;
        this.paternal = data.paternal;
        this.email = data.email;
        this.phone1 = data.phone1;
        this.phone2 = data.phone2;
        this.address = data.address;
    }

    initCartInfo(data:any){
        console.log('resume cart info:', data)
        this.products = data;
        let Total = 0;
        this.products.map((a:any)=>{
         Total += parseInt(a.total);
        })
        this.totalpay = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}