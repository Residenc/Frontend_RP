import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/shared/models/product.model';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';

@Component({
    selector: 'app-viewproduct',
    templateUrl: 'view-product.component.html',
    styleUrls:['view-product.component.scss']

})

export class ViewproductComponent implements OnInit {
    constructor(private route : ActivatedRoute, private productService : ProductsService) { }
    product : Product | any;
    product_id: string | any;
    ngOnInit() { 
        this.product_id = this.route.snapshot.paramMap.get('id');
        this.productService.getProduct(this.product_id).subscribe(res=> this.product = res[0]);
    }
}