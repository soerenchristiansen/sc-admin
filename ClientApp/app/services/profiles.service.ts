import { User } from './../models/user';
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ProfilesService {
    constructor(private http: HttpClient) {
        http.configure(config => {
            config
                .withBaseUrl('api/Identity/')
                // .withDefaults({
                //     headers: {
                //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                //     }
                // });
        });
    }

    getAllUsers(): Promise<User[]> {
        return this.http.fetch(`GetAllUsers`)
            .then(response => response.json() as Promise<User[]>);
    }

    createUser(registerModel: User): Promise<any> {
        return this.http.fetch('Register', {
            method: 'post',
            body: json(registerModel)
        })
        .then(response => response.json() as Promise<any>);
    }
}