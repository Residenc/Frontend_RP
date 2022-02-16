import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/shared/models/product.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-allproducts',
    templateUrl: 'all-products.component.html',
    styleUrls:['all-products.component.scss']

})

export class AllproductsComponent implements OnInit {
    constructor(private productService:ProductsService, private router : Router, private cookietoken:CookiesTokenService, private fb:FormBuilder, private cartService: CartService) { }
    products: Product | any;
    cartCustomerForm: FormGroup | any;
    cartVendorForm: FormGroup | any;
    page: number = 0;
    ngOnInit() {
        this.loadProducts()
    }

    loadProducts(){
        this.productService.getAllProducts().subscribe(products =>this.products = products)
    }

    nextPage(){
        if(this.products != null){
            this.page += 9; 
        }
    }
    
    prevPage(){
        if(this.page > 0){
            this.page -=9;
        }
    }

    initPage(){
        this.page = 0; 
    }

    addCart(product_id:string, quantity:string){
        if(this.cookietoken.getUser().cust != null){
            this.cartCustomerForm = this.fb.group ({
                cust_id: this.cookietoken.getUser().cust,
                product_id: product_id,
                quantity: quantity
            });
            this.cartService.insertCartItemCustomer(this.cartCustomerForm.value).subscribe(result =>{
                if(!result['insertcartitem']){
                    Swal.fire({
                        title: 'Error Al Agregar, Intenta Nuevamente',
                        icon:'error'
                    })
                }
                else{
                    Swal.fire({
                        title: 'Producto Agregado!',
                        icon:'success'
                    })
                }
            });
        }
        if(this.cookietoken.getUser().vend != null){
            this.cartVendorForm = this.fb.group ({
                vendor_id: this.cookietoken.getUser().vend,
                product_id: product_id,
                quantity: quantity
            });
            this.cartService.insertCartItemVendor(this.cartVendorForm.value).subscribe(result =>{
                if(!result['insertcartitem']){
                    Swal.fire({
                        title: 'Error Al Agregar, Intenta Nuevamente',
                        icon:'error'
                    })
                }
                else{
                    Swal.fire({
                        title: 'Producto Agregado!',
                        icon:'success'
                    })
                }
            });
        }

    }
}