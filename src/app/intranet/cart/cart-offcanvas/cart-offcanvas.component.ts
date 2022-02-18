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
    totalpay!:number;
    ngOnInit() { 
        this.loadCartItems();
    }

    loadCartItems(){
      if(this.cookietoken.getUser().vend != null){
        this.cartService.getCartVendor().subscribe(cartItems => {
          this.cartItems = cartItems;
          this.allitems = cartItems.length;
          console.log(this.cartItems)

        });
      }
      if(this.cookietoken.getUser().cust != null){
        this.cartService.getCartCustomer().subscribe(cartItems => {
          this.cartItems = cartItems;
          this.allitems = cartItems.length;
          console.log(this.cartItems)
        });
      }
    }
}