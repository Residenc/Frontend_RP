import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';
import * as _ from 'underscore';
@Pipe({
    name: 'orderBy'
})

export class orderByPipe implements PipeTransform {
    transform(products: Product[], page: number = 0, order: string = ''): Product[] {
        if(order == 'abc'){
            const outproducts = _.sortBy(products, function(product){ return product.product_name; })
            return outproducts.slice(page, page+9);
        }

        if(order == 'recent'){
            const outproducts = _.sortBy(products, function(product){ return product.registration_date; }).reverse()
            return outproducts.slice(page, page+9);
        }

        if(order == 'menorpr'){
            return products.slice(page, page+9);
        }

        if(order == 'mayorpr'){
            return products.slice(page, page+9);
        }
        else{
            const outproducts = _.sortBy(products, function(product){ return product.product_name; })
            return outproducts.slice(page, page+9);
        }
        
    }
}