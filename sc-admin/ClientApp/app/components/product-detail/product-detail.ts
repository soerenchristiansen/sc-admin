import { ApiService } from './../../services/api.service';
import { inject } from 'aurelia-framework';

export class ProductDetail extends ApiService {
    images: any;
    productId: number;

    activate(params) {
        this.productId = params.id;
    }

    saveImages() {
        let formdata = new FormData();
        for (let i = 0; i < this.images.length; i++) {
            formdata.append('images', this.images[i]);
        }

        this.postFile('ProductDetail/SaveImages', formdata).then((response) => {
            console.log(response);
        });
    }
}