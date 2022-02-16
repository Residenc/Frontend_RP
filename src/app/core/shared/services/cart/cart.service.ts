import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesTokenService } from '../cookies-token/cookiestoken.service';


@Injectable({providedIn: 'root'})
export class CartService {
    constructor(private http: HttpClient, private cookietoken:CookiesTokenService) { }

    getCartCustomer(): Observable<any>{ 
        const cust_id = this.cookietoken.getUser().cust;
        return this.http.get(`http://localhost/Backend_RP/`, cust_id);
    }

    getCartVendor(): Observable<any>{ 
        const vendor_id = this.cookietoken.getUser().vend;
        return this.http.get(`http://localhost/Backend_RP/`, vendor_id);
    }

    insertCartItemCustomer(cartItem:any): Observable<any>{ 
        return this.http.post(`http://localhost/Backend_RP/api php/routes-cartCustomer/insertCartItemCustomer.php`,JSON.stringify(cartItem));
    }
    insertCartItemVendor(cartItem:any): Observable<any>{ 
        return this.http.post(`http://localhost/Backend_RP/api php/routes-cartVendor/insertCartItemVendor.php`,JSON.stringify(cartItem));
    }

    
}