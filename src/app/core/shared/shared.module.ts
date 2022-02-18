import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/containers/header.component';
import { UserofflineComponent } from './components/header/components/user-offline/user-offline.component';
import { UseronlineComponent } from './components/header/components/user-online/user-online.component';
import { CartComponent } from './components/header/components/cart/cart.component';
import { LoginComponent } from 'src/app/public/login/containers/login.component';

import { PaginatePipe } from './pipes/paginate.pipe';
import { PaginateAllPipe } from './pipes/paginate-all.pipe';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';
import { BlockWriteDirective } from './directives/block-input.directive';
import { CartoffcanvasComponent } from 'src/app/intranet/cart/cart-offcanvas/cart-offcanvas.component';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatCardModule,
        MatBadgeModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSlideToggleModule,
    ],
    exports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatCardModule,
        MatBadgeModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        FooterComponent,
        NotFoundComponent,
        HeaderComponent,
        UserofflineComponent,
        UseronlineComponent,
        CartComponent,
        LoginComponent,
        PaginatePipe,
        PaginateAllPipe,
        BlockCopyPasteDirective,
        BlockWriteDirective,
        CartoffcanvasComponent
    ],
    declarations: [
        FooterComponent,
        NotFoundComponent,
        HeaderComponent,
        UserofflineComponent,
        UseronlineComponent,
        CartComponent,
        LoginComponent,
        PaginatePipe,
        PaginateAllPipe,
        BlockCopyPasteDirective,
        BlockWriteDirective,
        CartoffcanvasComponent

    ],
    providers: [],
})
export class SharedModule { }
