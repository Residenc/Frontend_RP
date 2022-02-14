import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';


interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-modalinsertproduct',
    templateUrl: './modal-insertproduct.component.html',
    styleUrls: ['./modal-insertproduct.component.scss']
})


export class InsertproductComponent implements OnInit {
    
    constructor(private userService:UsersService, private productsService:ProductsService ,private fb: FormBuilder) { }

    currentVendor: Vendor | any;
    insertProductForm : FormGroup | any;


    categories: Category[] = [
        {value: 'Accesorios de Telefonia y Tablets', viewValue: 'Accesorios de Telefonia y Tablets'},
        {value: 'Automotriz y Refacciones', viewValue: 'Automotriz y Refacciones'},
        {value: 'Belleza y Cuidado Personal', viewValue: 'Belleza y Cuidado Personal'},
        {value: 'Calzado', viewValue: 'Calzado'},
        {value: 'Celulares', viewValue: 'Celulares'},
        {value: 'Cocina y Electrodomesticos', viewValue: 'Cocina y Electrodomesticos'},
        {value: 'Computacion', viewValue: 'Computacion'},
        {value: 'Electronica', viewValue: 'Electronica'},
        {value: 'Ferreteria y Mejoras Del Hogar', viewValue: 'Ferreteria y Mejoras Del Hogar'},
        {value: 'Fiestas', viewValue: 'Fiestas'},
        {value: 'Juguetes', viewValue: 'Juguetes'},
        {value: 'Linea Blanca', viewValue: 'Linea Blanca'},
        {value: 'Maletas y Mochilas', viewValue: 'Maletas y Mochilas'},
        {value: 'Mascotas', viewValue: 'Mascotas'},
        {value: 'Materia Prima', viewValue: 'Materia Prima'},
        {value: 'Muebleria', viewValue: 'Muebleria'},
        {value: 'Ropa Para Caballero', viewValue: 'Ropa Para Caballero'},
        {value: 'Ropa Para Dama', viewValue: 'Ropa Para Dama'},
        {value: 'Ropa Para Niño', viewValue: 'Ropa Para Niño'},
        {value: 'Ropa Para Niña', viewValue: 'Ropa Para Niña'},
        {value: 'Ropa Para Bebe', viewValue: 'Ropa Para Bebe'},
        {value: 'Salud', viewValue: 'Salud'},
        {value: 'Tablets', viewValue: 'Tablets'},
        {value: 'Videojuegos y Consolas', viewValue: 'Videojuegos y Consolas'},
        {value: 'Otros', viewValue: 'Otros'},
    ];

    ngOnInit() { 
        this.loadCurrentVendor();    
        this.insertProductForm = this.fb.group ({
            vendor_id: ['', Validators.required ],
            product_name: ['', Validators.required ],
            description: ['', Validators.required ],
            price: ['', Validators.required ],
            brand: ['', Validators.required ],
            quantity: ['', Validators.required ],
            category: ['', Validators.required ],
            image: ['', Validators.required ],
        });
    }

    loadCurrentVendor(){
        this.userService.getVendor().subscribe(res=>{
            this.currentVendor = res[0];
        });
    }

    insertProduct(){
        this.productsService.insertProduct(this.insertProductForm.value).subscribe(result =>{
            if(!result['insert']){
                Swal.fire({
                    title: 'Error Al Agregar, Intent Nuevamente',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Producto Agregado!',
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