import { NgModule } from '@angular/core';
import { MyaccountComponent } from './containers/myaccount/myaccount.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { EditprofileComponent } from './containers/profile/edit-profile/editprofile.component';
import { AddressesComponent } from './containers/profile/addresses/addresses.component';
import { EditcredentialsComponent } from './containers/profile/edit-credentials/editcredentials.component';
import { AccountComponent } from './account.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { EditaddressComponent } from './containers/profile/addresses/edit-address/edit-address.component';

@NgModule({
    imports: [
        CustomerRoutingModule,
        SharedModule
    ],
    exports: [
        MyaccountComponent,
        ProfileComponent,
        EditprofileComponent,
        AddressesComponent,
        EditcredentialsComponent,
        EditaddressComponent
    ],
    declarations: [
        MyaccountComponent,
        ProfileComponent,
        EditprofileComponent,
        AddressesComponent,
        EditcredentialsComponent,
        AccountComponent,
        EditaddressComponent
    ],
    providers: [],
})
export class CustomerModule { }
