import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';

@Component({
    selector: 'app-productsByName',
    templateUrl: './productsByName.component.html',
    styleUrls: ['productsByName.component.scss']
})

export class productsByNameComponent implements OnInit {

    products: Product | any;

    constructor(private productService: ProductsService) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(){
        this.productService.getAllProducts().subscribe(products => this.products = products);
    }
}