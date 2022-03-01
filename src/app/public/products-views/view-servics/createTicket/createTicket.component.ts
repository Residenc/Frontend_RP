import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Servics } from 'src/app/core/shared/models/service.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';

@Component({
    selector: 'app-createticket',
    templateUrl: './createTicket.component.html',
    styleUrls: ['./createTicket.component.scss']
})

export class createticketComponent implements OnInit {
    
    constructor(private cookietoken:CookiesTokenService, private fb: FormBuilder, private route: ActivatedRoute, private servicsServices: ServicsService) { }
    insertTicketCustomerForm : FormGroup | any;
    insertTicketVendorForm : FormGroup | any;
    isLogged: boolean | any;
    roleLogged: string | any;
    service_id: string | any;
    routeSub: Subscription | any; 
    currentService: Servics | any;
    ngOnInit() {

        this.routeSub = this.route.params.subscribe(params => {
            console.log(params['id'])
            this.service_id = params['id']
            this.servicsServices.getService(this.service_id).subscribe(res => this.currentService = res[0])
        });

        this.isLogged = this.cookietoken.isLogged();
        this.roleLogged = this.cookietoken.getUser().role;
    

        this.insertTicketCustomerForm = this.fb.group ({
            cust_id: ['', Validators.required],
            service_id: ['', Validators.required],
            seller_id: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            comment: ['', Validators.required],
        });

        this.insertTicketVendorForm = this.fb.group ({
            vendor_id: ['', Validators.required],
            service_id: ['', Validators.required],
            seller_id: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            comment: ['', Validators.required],
        });
    }


    insertTicket(){
        var orderValue = (<HTMLInputElement>document.getElementById('seller')).value;
        if(this.cookietoken.getUser().vend != null){
            this.insertTicketVendorForm = this.fb.group ({
                vendor_id: this.cookietoken.getUser().vend,
                service_id: this.service_id,
                seller_id: orderValue,
                name: ['', Validators.required],
                phone: ['', Validators.required],
                email: ['', Validators.required],
                comment: ['', Validators.required],
            });
            console.log(this.insertTicketVendorForm.value)
        }
        if(this.cookietoken.getUser().cust != null){
            this.insertTicketCustomerForm = this.fb.group ({
                cust_id: this.cookietoken.getUser().cust,
                service_id: this.service_id,
                seller_id: orderValue,
                name: ['', Validators.required],
                phone: ['', Validators.required],
                email: ['', Validators.required],
                comment: ['', Validators.required],
            });
            console.log(this.insertTicketCustomerForm.value)
        }
    }

}