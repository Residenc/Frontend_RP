import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/core/shared/models/business.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-editbusiness',
    templateUrl: './edit-business.component.html',
    styleUrls: ['./edit-business.component.scss']
})



export class EditbusinessComponent implements OnInit {


    constructor(private fb:FormBuilder, private userService: UsersService) { }

    currentVendor: Vendor | any;
    currentBusiness: Business | any;
    businessInfoForm : FormGroup | any;


    ngOnInit() {
        this.loadCurrentBusiness()
        this.businessInfoForm = this.fb.group({
            business_id: ['', Validators.required ],
            name: ['', Validators.required ],
            address: ['', Validators.required ],
            about: ['', Validators.required ],
            phone: ['', Validators.required ],
            email: ['', Validators.required ],
            image: ['', Validators.required ],
        });
    }


    updateBusiness(){
        this.userService.updateInfoBusiness(this.businessInfoForm.value).subscribe(result =>{
            if(!result['update']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Datos Actualizados',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }


    loadCurrentBusiness(){
        this.userService.getVendor().subscribe(res=>{
            this.currentVendor = res[0];
            this.userService.getBusiness().subscribe(business => this.currentBusiness = business[0]);
        });
    }


    reloadPage(){
        window.location.reload();
    }


}