import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cartItem } from 'src/app/core/shared/models/cart-item.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'cart-items',
    templateUrl: './cart-items.component.html',
    styleUrls: ['./cart-items.component.scss']
})


export class CartItemsComponent implements OnInit {

  @Output() cartData = new EventEmitter<any>();
  cart:cartItem | any;
  allitems!:number;
  totalpay:string = '';
  updateItemFormC: FormGroup | any;
  updateItemFormV: FormGroup | any;
    
  constructor(private cartService: CartService, private cookietoken: CookiesTokenService,  private fb: FormBuilder) {}
    
  ngOnInit() {
    this.loadCartItems();
  }



  loadCartItems(){
    if(this.cookietoken.isLogged()){
      if(this.cookietoken.getUser().vend != null){
        this.cartService.getCartVendor().subscribe(cartItems => {
          this.cart = cartItems;
          this.allitems = cartItems.length;
          let Total = 0;
          this.cart.map((a:any)=>{
           Total += parseInt(a.total);
          })
          this.totalpay = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
      }
      if(this.cookietoken.getUser().cust != null){
        this.cartService.getCartCustomer().subscribe(cartItems => {
          this.cart = cartItems;
          this.allitems = cartItems.length;
          let Total = 0;
          this.cart.map((a:any)=>{
           Total += parseInt(a.total);
          })
          this.totalpay = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
      }
    }
  }


  updateCartItem(cartitem_id:string, quantity:string){
    if(this.cookietoken.isLogged()){
      if(this.cookietoken.getUser().vend != null){
        this.updateItemFormV = this.fb.group({
            cartitem_id: cartitem_id,
            vendor_id: this.cookietoken.getUser().vend,
            quantity: quantity
        });
        console.log(this.updateItemFormV.value)
        this.cartService.updateCartItemVendor(this.updateItemFormV.value).subscribe(result =>{
            if(!result['update']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Cantidad Actualizada!',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
      }
      if(this.cookietoken.getUser().cust != null){
        this.updateItemFormC = this.fb.group({
            cartitem_id: cartitem_id,
            cust_id: this.cookietoken.getUser().cust,
            quantity: quantity
        });
        console.log(this.updateItemFormC.value)
        this.cartService.updateCartItemCustomer(this.updateItemFormC.value).subscribe(result =>{
            if(!result['update']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Cantidad Actualizada!',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
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



  cartDataSend(){
    this.cartData.emit(this.cart);
  }



  reloadPage(){
    window.location.reload()
  }



}