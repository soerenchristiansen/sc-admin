import { ApiService } from './api.service';
import { User } from './../models/user';
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

export class ProfilesService extends ApiService {

    getAllRoles(): Promise<any[]> {
        return this.get('Identity/GetAllRoles');
    }

    getAllUsers(): Promise<User[]> {
        return this.get<User[]>(`Identity/GetAllUsers`);
    }

    createUser(user: User): Promise<any> {
        return this.post('Identity/Register', user);
    }

    updateUser(user: User): Promise<any> {
        return this.put('Identity/UpdateUser', user);
    }
}