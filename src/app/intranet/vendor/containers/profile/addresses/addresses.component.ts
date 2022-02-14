import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/shared/models/address.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})

export class AddressesComponent implements OnInit {
    constructor(private userService: UsersService, private fb: FormBuilder) { }

    currentVendor: Vendor | any;
    addresses: Address | any;
    addressForm : FormGroup | any;
    ngOnInit() { 
        this.loadAddresses();
        this.addressForm = this.fb.group ({
            vendor_id: ['', Validators.required ],
            address: ['', Validators.required ]
        });
    }

    loadAddresses(){
        this.userService.getVendor().subscribe(res=>{
            this.currentVendor = res[0];
            this.userService.getVendorAddresses().subscribe(addresses =>this.addresses = addresses)
        });
    }

    registerAddress(){
        this.userService.insertVendorAddress(this.addressForm.value).subscribe(result =>{
            if(!result['insert']){
                Swal.fire({
                    title: 'Error Al Agregar, Intenta Nuevamente',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Direccion Agregada!',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }

    reloadPage(){
        window.location.reload();
    }
}