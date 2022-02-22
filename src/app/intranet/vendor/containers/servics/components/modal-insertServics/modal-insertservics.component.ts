import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';


interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-modalinsertservics',
    templateUrl: './modal-insertservics.component.html',
    styleUrls: ['./modal-insertservics.component.scss']
})


export class InsertservicsComponent implements OnInit {
    
    constructor(private cookietoken:CookiesTokenService, private servicsService:ServicsService ,private fb: FormBuilder) { }

    insertServiceForm : FormGroup | any;


    categories: Category[] = [
        {value: 'Arquitectura e Ingenieria', viewValue: 'Arquitectura e Ingeniería'},
        {value: 'Audiovisual', viewValue: 'Audiovisual'},
        {value: 'Comunicacion', viewValue: 'Comunicacion'},
        {value: 'Contabilidad', viewValue: 'Contabilidad'},
        {value: 'Distribucion', viewValue: 'Distribucion'},
        {value: 'Enseñanza', viewValue: 'Enseñanza'},
        {value: 'Energia', viewValue: 'Energia'},
        {value: 'Financiero', viewValue: 'Financiero'},
        {value: 'Informatica y Computacion', viewValue: 'Informatica y Computacion'},
        {value: 'Juridico', viewValue: 'Juridico'},
        {value: 'Logistico', viewValue: 'Logistico'},
        {value: 'Mantenimiento', viewValue: 'Mantenimiento'},
        {value: 'Postal y Mensajeria', viewValue: 'Postal y Mensajeria'},
        {value: 'Reparacion', viewValue: 'Reparacion'},
        {value: 'Turismo', viewValue: 'Turismo'},
        {value: 'Transporte', viewValue: 'Transporte'},
        {value: 'Social', viewValue: 'Social'},
        {value: 'Salud', viewValue: 'Salud'},
    ];

    ngOnInit() {    
        this.insertServiceForm = this.fb.group ({
            vendor_id: this.cookietoken.getUser().vend,
            service_name: ['', Validators.required ],
            description: ['', Validators.required ],
            minprice: ['', Validators.required ],
            maxprice: ['', Validators.required ],
            category: ['', Validators.required ],
            image: ['', Validators.required ],
        });
    }

    

    insertService(){
        this.servicsService.insertService(this.insertServiceForm.value).subscribe(result =>{
            if(!result['insert']){
                Swal.fire({
                    title: 'Error Al Agregar, Intent Nuevamente',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Servicio Agregado!',
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