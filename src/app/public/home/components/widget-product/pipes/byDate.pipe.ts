import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';

@Pipe({
    name: 'byDate'
})

export class byDatePipe implements PipeTransform {
    transform(products: Product[]): Product[] {
        products.sort((a,b) => {
            let x = a.registration_date;
            let y = b.registration_date;
            if (x > y) {
              return -1;
            } else if (x < y) {
              return 1;
            } else {
              return 0;
            }
          });
          return products.slice(0,8);
    }
}


/*
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
    name: 'widgetproduct'
})

export class WidgetProductsPipe implements PipeTransform {
    transform(products: Product[]): Product[] {
        const filteredProducts = products.filter( produc => produc.category.includes());
        return filteredProducts.slice(0,8);
    }
}*/