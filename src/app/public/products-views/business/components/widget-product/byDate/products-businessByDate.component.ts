import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';

@Component({
    selector: 'app-products-businessByDate',
    templateUrl: './products-businessByDate.component.html',
    styleUrls: ['./products-businessByDate.component.scss']
})

export class ProductsbusinessByDateComponent implements OnInit {

    @Input() businessID:string | any;
    products: Product | any;

    constructor(private productService: ProductsService) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(){
        this.productService.getAllProductsOfBusiness(this.businessID).subscribe(products => this.products = products);
    }
}