import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/core/shared/models/business.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-editbusiness',
    templateUrl: './edit-business.component.html',
    styleUrls: ['./edit-business.component.scss']
})



export class EditbusinessComponent implements OnInit {


    constructor(private fb:FormBuilder, private userService: UsersService, private cookietoken: CookiesTokenService) { }

    currentVendor: Vendor | any;
    currentBusiness: Business | any;
    businessInfoForm : FormGroup | any;


    ngOnInit() {
        this.loadCurrentBusiness()
        this.businessInfoForm = this.fb.group({
            vendor_id: this.cookietoken.getUser().vend,
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
            if(!result['updatebusiness']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Datos Empresariales Actualizados',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }


    loadCurrentBusiness(){
        this.userService.getBusiness().subscribe(business => this.currentBusiness = business[0]);
    }


    reloadPage(){
        window.location.reload();
    }


}