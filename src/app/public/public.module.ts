import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

import { HomeComponent } from './home/containers/home.component';
import { PublicComponent } from './public.component';
import { InfoComponent } from './footer-links/containers/info/info.component';
import { AboutusComponent } from './footer-links/components/about-us/about-us.component';
import { FaqsComponent } from './footer-links/components/faqs/faqs.component';
import { PrivacityComponent } from './footer-links/components/privacity/privacity.component';
import { TermsconditionsComponent } from './footer-links/components/termsconditions/termsconditions.component';
import { AssociatesComponent } from './footer-links/components/associates/associates.component';
import { ContactusComponent } from './footer-links/containers/contact-us/contact-us.component';
import { RegisterComponent } from './register/containers/register.component';
import { FormvendorComponent } from './register/components/form/vendors/form-vendor.component';
import { FormcustomerComponent } from './register/components/form/customers/form-customer.component';
import { ConfirmationdialogcustomerComponent } from './register/components/confirmation-dialog-customer/confirmation-dialog-customer.component';
import { ConfirmationdialogvendorComponent } from './register/components/confirmation-dialog-vendor/confirmation-dialog-vendor.component';
import { ViewproductComponent } from './products-views/view-product/view-product.component';
import { AllproductsComponent } from './products-views/all-products/all-products.component';
import { WidgetproductComponent } from './home/components/widget-product/widget-product.component';
import { BusinessComponent } from './products-views/business/business.component';

@NgModule({
    imports: [
        PublicRoutingModule,
        SharedModule
    ],
    exports: [        
        ViewproductComponent,
        AllproductsComponent,
        BusinessComponent
    ],
    declarations: [
        PublicComponent,
        HomeComponent,
        RegisterComponent,
        FormvendorComponent,
        FormcustomerComponent,
        InfoComponent,
        AboutusComponent,
        FaqsComponent,
        PrivacityComponent,
        TermsconditionsComponent,
        AssociatesComponent,
        ContactusComponent,
        ConfirmationdialogcustomerComponent,
        ConfirmationdialogvendorComponent,
        ViewproductComponent,
        AllproductsComponent,
        WidgetproductComponent,
        BusinessComponent
    ],
    providers: [],
})
export class PublicModule {
    constructor(){}
}
