import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
    name: 'paginate'
})

export class PaginatePipe implements PipeTransform {
    transform(products: Product[], page: number = 0): Product[] {
        return products.slice(page, page+5);
    }
}