import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/core/shared/models/address.model';
import { UsersService } from 'src/app/core/shared/services/users/users.service';

@Component({
    selector: 'app-editaddress',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.scss'],
})

export class EditaddressComponent implements OnInit {
    constructor(private route: ActivatedRoute, private userService : UsersService, private fb: FormBuilder) { }
    addressID : string | any;
    currentAddress : Address | any;
    updateAddressForm : FormGroup | any;
    ngOnInit() { 
        this.addressID = this.route.snapshot.paramMap.get('id');
        this.loadAddress();
    }
    loadAddress(){
        this.userService.getVendorAddress(this.addressID).subscribe(res=>this.currentAddress = res[0]);
    }
    updateAddress(){

    }
}