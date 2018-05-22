import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Products {
    pageSizes: number[] = [10, 20, 50, 100];
    pageSize = 10;

    constructor(private router: Router) {
    }

    products: any[] = [
        {
            id: 12314,
            name: 'Motorcykel 1',
            thumbnail: '',
            marketingReady: '50%',
            color: 'red',
            sku: 'SV1000',
            category: 'Suzuki',
            price: '75,000 kr'
        },
        {
            id: 234234,
            name: 'Motorcykel 2',
            thumbnail: '',
            marketingReady: '100%',
            color: 'black',
            sku: 'SV650',
            category: 'Suzuki',
            price: '50,000 kr'
        },
        {
            id: 55555,
            name: 'Motorcykel 3',
            thumbnail: '',
            marketingReady: '25%',
            color: 'blue',
            sku: 'CBR600',
            category: 'Honda',
            price: '100,000 kr'
        },
    ];

    openProduct(id: number) {
        this.router.navigateToRoute('product', {id: id});
    }
}