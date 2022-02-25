import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
    userForm: FormGroup = new FormGroup({
        userFormArray: new FormArray([]),
    });
    
      constructor(private fb: FormBuilder, private cartService: CartService, private cookietoken: CookiesTokenService) {
        
      }
    
      ngOnInit() {
        this.cartService.getCartVendor().subscribe((resp: any[]) => {
          const data = resp;
          if (data && data !== null) {
            //console.log('Cart received: ', resp);
            this.userForm = this.fb.group({
              userFormArray: this.getUserFA(resp),
            });
          }
        });
      }
    
    private getUserFA(resp: any[]): FormArray {
        return resp
        .map((param) => this.generateUserFormGroup(param))
        .reduce((acc, i) => (acc.push(i), acc), new FormArray([]));
    }
    
    get userGroupArray(): FormGroup[] {
        return (this.userForm.controls['userFormArray'] as FormArray)
        .controls as FormGroup[];
    }
    
    private generateUserFormGroup(param: any): FormGroup {
        return this.fb.group({
          cartitem_id: this.fb.control(param.cartitem_id),
          product_id: this.fb.control(param.product_id),
          product_name: this.fb.control(param.product_name),
          price: this.fb.control(param.price),
          stock: this.fb.control(param.stock),
          quantity: this.fb.control(param.quantity),
          total: this.fb.control(param.total),
        });
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
        //console.log(this.userForm.value)
        this.cartData.emit(this.userForm.value);
    }

    reloadPage(){
        window.location.reload()
    }
}