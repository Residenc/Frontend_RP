import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { EditbusinessComponent } from './containers/edit-business/edit-business.component';
import { MyaccountComponent } from './containers/myaccount/myaccount.component';
import { EditproductComponent } from './containers/products/components/edit-product/editproduct.component';
import { ProductsComponent } from './containers/products/products.component';
import { EditaddressComponent } from './containers/profile/addresses/edit-address/edit-address.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { SaledetailsComponent } from './containers/saleshistory/sale-details/sale-details.component';
import { SalesComponent } from './containers/saleshistory/saleshistory.component';
import { PurchasedetailComponent } from './containers/shoppinghistory/purchase-detail/purchasedetail.component';
import { ShoppinghistoryComponent } from './containers/shoppinghistory/shoppinghistory.component';

const routes : Routes = [
  { path: '', component: AccountComponent, children:
    [
      { path: 'account-home', component: MyaccountComponent },
      { path: 'editprofile', component: ProfileComponent },
      { path: 'editaddress/:id', component: EditaddressComponent  },
      { path: 'editbusiness', component: EditbusinessComponent },
      { path: 'shoppinghistory', component: ShoppinghistoryComponent, 
        children: [
          { path: 'purchase-details', component: PurchasedetailComponent }
        ] 
      },
      { path: 'editproduct/:id', component: EditproductComponent},
      { path: 'products', component: ProductsComponent },
      { path: 'saleshistory', component: SalesComponent, 
      children: [
        { path: 'sale-details', component: SaledetailsComponent }
      ] 
      },
    ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class VendorRoutingModule {}