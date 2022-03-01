import { AfterContentInit, Component, OnInit } from '@angular/core';
import { cartItemCustomer } from 'src/app/core/shared/models/cart-item-customer.model';
import { cartItemVendor } from 'src/app/core/shared/models/cart-item-vendor.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';

declare var paypal: any;

@Component({
  selector: 'cart-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit, AfterContentInit {
  cartVendor: cartItemVendor | any;
  cartCustomer: cartItemCustomer | any;
  totalpay: string = '';
  totalPaypal: number | any;
  name: string | any;
  paternal: string | any;
  maternal: string | any;
  email: string | any;
  phone1: string | any;
  phone2: string | any;
  address: string | any;
  roleLogged: string | any;

  constructor(private cookietoken: CookiesTokenService,private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
    this.roleLogged = this.cookietoken.getUser().role;
    /*

      sb-ew9qg12492308@personal.example.com
      {rN?P5f8

    */
  }

  ngAfterContentInit(): void {
    Promise.resolve().then(() => {
      paypal.Buttons({
        createOrder: function (data: any, actions: any) {
          var paypalTotal = (<HTMLInputElement>document.getElementById('paypal-total')).value;
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: paypalTotal
                }
              },
            ],
          });
        },
        onApprove: function (data: any, actions: any) {
          return actions.order.capture().then(function (orderData: any) {
            console.log(
              'Capture result',
              orderData,
              JSON.stringify(orderData, null, 2)
            );
            var transaction =
              orderData.purchase_units[0].payments.captures[0];
            console.log(data.orderID)
            console.log(transaction.id)
            console.log(transaction.status)
            let confirmButton : HTMLElement = document.getElementById('btn-step') as HTMLElement;
            confirmButton.click();
          });
        },
    
        onCancel: function (data: any) {
          alert('Proceso Cancelado');
          console.log(data);
        }
      }).render('#paypal-button-container');
    });
  }


  loadCartItems() {
    if (this.cookietoken.isLogged()) {
      if (this.cookietoken.getUser().vend != null) {
        this.cartService.getCartVendor().subscribe((cartItems) => {
          this.cartVendor = cartItems;
          let Total = 0;
          this.cartVendor.map((a: any) => {
            Total += parseInt(a.total);
          });
          this.totalPaypal = Total;
          this.totalpay = Total.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          );
        });
      }
      if (this.cookietoken.getUser().cust != null) {
        this.cartService.getCartCustomer().subscribe((cartItems) => {
          this.cartCustomer = cartItems;
          let Total = 0;
          this.cartCustomer.map((a: any) => {
            Total += parseInt(a.total);
          });
          this.totalPaypal = Total;
          this.totalpay = Total.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          );
        });
      }
    }
  }

  initUserInfo(data: any) {
    this.name = data.name;
    this.paternal = data.paternal;
    this.maternal = data.maternal;
    this.email = data.email;
    this.phone1 = data.phone1;
    this.phone2 = data.phone2;
    this.address = data.address;
  }
}
