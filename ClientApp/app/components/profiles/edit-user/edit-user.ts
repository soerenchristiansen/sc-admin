import { User } from './../../../models/user';
export class EditUser {
    user: User = new User();

    constructor() {

    }

    editUser() {
        console.log(this.user);
    }
}