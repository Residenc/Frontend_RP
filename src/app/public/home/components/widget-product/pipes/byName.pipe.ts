import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';

@Pipe({
    name: 'byName'
})

export class byNamePipe implements PipeTransform {
    transform(products: Product[]): Product[] {
        products.sort((a,b) => {
          let x = a.product_name.toLowerCase();
          let y = b.product_name.toLowerCase();
          if(x<y){
            return -1;
          }
          else{
            return 1;
          }
        });
          return products.slice(0,7);
    }
}