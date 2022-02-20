import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    constructor(private productService:ProductsService, private cookietoken:CookiesTokenService, private fb:FormBuilder, private cartService: CartService, private route: ActivatedRoute) { }
    products: Product | any;
    
    cartCustomerForm: FormGroup | any;
    cartVendorForm: FormGroup | any;

    page: number = 0;
    order!: string;
    category!: string;
    public search: string='';

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

    orderBy(order: string){
        this.order = order;
    }

    filterBy(category: string){
        this.category = category;
    }

    onSearch(search: string){
        this.search = search;
        console.log(this.search);
    }


    addCart(product_id:string, quantity:string){

        if(!this.cookietoken.isLogged()){
            let modalButton : HTMLElement = document.getElementById('modalButton') as HTMLElement;
            modalButton.click();
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'warning',
                title: 'Inicia Sesion Para Agregar Productos Al Carrito'
              })
        }


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
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 800,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      });
                      Toast.fire({
                        icon: 'success',
                        title: 'Producto Agregado'
                      })
                      .then(() => {
                        this.reloadPage();
                      });
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
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 800,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      });
                      Toast.fire({
                        icon: 'success',
                        title: 'Producto Agregado'
                      })
                      .then(() => {
                        this.reloadPage();
                      });
                }
            });
        }

    }

    reloadPage(){
        window.location.reload();
    }
}
