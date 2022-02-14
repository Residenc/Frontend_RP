import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/shared/models/product.model';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';

@Component({
    selector: 'app-allproducts',
    templateUrl: 'all-products.component.html',
    styleUrls:['all-products.component.scss']

})

export class AllproductsComponent implements OnInit {
    constructor(private productService:ProductsService, private router : Router) { }
    products: Product | any;
    page: number = 0;
    ngOnInit() {
        this.loadProducts()
    }

    loadProducts(){
        this.productService.getAllProducts().subscribe(products =>this.products = products)
    }

    nextPage(){
        if(this.products != null){
            this.page += 9; 
        }
    }
    
    prevPage(){
        if(this.page > 0){
            this.page -=9;
        }
    }

    initPage(){
        this.page = 0; 
    }
}