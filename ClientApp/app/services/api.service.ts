import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ApiService {
    constructor(protected http: HttpClient) {
        http.configure(config => {
            config
            .withBaseUrl('api/')
            .withDefaults({
                credentials: 'same-origin',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Accept': 'application/json'
                }
            });
        });
    }

    protected get<T>(path: string): Promise<T> {
        return this.http.fetch(path).then(response => response.json() as Promise<T>);
    }

    protected post<T>(path: string, body: any = {}): Promise<T> {
        return this.http.fetch(path, { method: 'post', body: json(body) }).then(response => response.json() as Promise<T>);
    }
    
    protected put<T>(path: string, body: any = {}): Promise<T> {
        return this.http.fetch(path, { method: 'put', body: json(body) }).then(response => response.json() as Promise<T>);
    }

    protected delete<T>(path: string): Promise<T> {
        return this.http.fetch(path, { method: 'delete' }).then(response => response.json() as Promise<T>);
    }
}