import { Component, OnInit } from '@angular/core';
import { cartItem } from 'src/app/core/shared/models/cart-item.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cartoffcanvas',
    templateUrl: './cart-offcanvas.component.html',
    styleUrls: ['./cart-offcanvas.component.scss']
})

export class CartoffcanvasComponent implements OnInit {
    constructor(private cookietoken: CookiesTokenService, private cartService: CartService) { }
    cartItems: cartItem | any;
    allitems!:number;
    totalpay:string = '';
    isLogged: boolean | any;
    ngOnInit() { 
        this.loadCartItems();
        this.isLogged = this.cookietoken.isLogged();
        this.getTotalPrice();
    }

    loadCartItems(){
      if(this.cookietoken.isLogged()){
        if(this.cookietoken.getUser().vend != null){
          this.cartService.getCartVendor().subscribe(cartItems => {
            this.cartItems = cartItems;
            this.allitems = cartItems.length;
            let Total = 0;
            this.cartItems.map((a:any)=>{
             Total += parseInt(a.total);
            })
            this.totalpay = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
        }
        if(this.cookietoken.getUser().cust != null){
          this.cartService.getCartCustomer().subscribe(cartItems => {
            this.cartItems = cartItems;
            this.allitems = cartItems.length;
            let Total = 0;
            this.cartItems.map((a:any)=>{
             Total += parseInt(a.total);
            })
            this.totalpay = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
        }
      }
    }

    deleteCartItem(cartitem_id:string){
      if(this.cookietoken.getUser().vend != null){
        this.cartService.deleteCartItemVendor(cartitem_id).subscribe(result =>{
        
            if(!result['delete']){
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
                timer: 900,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              });
              Toast.fire({
                icon: 'error',
                title: 'Eliminado Del Carrito'
              })
              .then(() => {
                this.reloadPage();
              });
            }
          
        })      
      }
      if(this.cookietoken.getUser().cust != null){
        this.cartService.deleteCartItemCustomer(cartitem_id).subscribe(result =>{
        
            if(!result['delete']){
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
                timer: 900,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              });
              Toast.fire({
                icon: 'error',
                title: 'Eliminado Del Carrito'
              })
              .then(() => {
                this.reloadPage();
              });
            }
          
        })        
      }
    }

    getTotalPrice(){

    }

    reloadPage(){
      window.location.reload()
    }
}