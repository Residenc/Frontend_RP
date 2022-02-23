import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesTokenService } from '../cookies-token/cookiestoken.service';


@Injectable({providedIn: 'root'})
export class ServicsService {

    constructor(private http: HttpClient, private cookietoken:CookiesTokenService) { }

    insertService(service:any): Observable<any>{ 
        return this.http.post(`http://localhost/Backend_RP/api php/routes-servics/insertServics.php`,JSON.stringify(service));
    }
    getAllServices(): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-servics/getServicsGeneral.php`);
    }
    getAllServicesOfVendor(): Observable<any>{ 
        const vendor_id = this.cookietoken.getUser().vend;
        return this.http.get(`http://localhost/Backend_RP/api php/routes-servics/getServicsVendor.php?id=`+ vendor_id);
    }
    getAllServicesOfBusiness(vendor_id: string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-servics/getServicsVendor.php?id=`+ vendor_id);
    }
    getService(service_id:string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-servics/getServicsGeneral.php?id=`+ service_id);
    }
    updateService(service:any): Observable<any>{
        return this.http.put(`http://localhost/Backend_RP/api php/routes-servics/updateServics.php`, JSON.stringify(service));
    }
    deleteService(service_id:string): Observable<any>{ 
        return this.http.delete(`http://localhost/Backend_RP/api php/routes-servics/delete.php?id=`+service_id);
    }
    
}