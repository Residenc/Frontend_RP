import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-servics',
    templateUrl: './servics.component.html',
    styleUrls: ['./servics.component.scss']
})

export class ServicsComponent implements OnInit {
    constructor(private productService:ProductsService) { }
    products: Product | any;
    page: number = 0;
    ngOnInit() {
        this.loadProducts()
    }

    loadProducts(){
        this.productService.getAllProductsOfVendor().subscribe(products =>this.products = products)
    }

    nextPage(){
        if(this.products != null){
            this.page += 5; 
        }
    }
    
    prevPage(){
        if(this.page > 0){
            this.page -=5;
        }
    }
    
    initPage(){
        this.page = 0; 
    }

    deleteProduct(product_id : string){
        this.productService.deleteProduct(product_id).subscribe(result =>{
            if(!result['delete']){
                Swal.fire({
                    title: 'Error Intenta De Nuevo',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Producto Eliminado',
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