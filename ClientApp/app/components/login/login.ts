import { AuthenticationService } from './../../services/authentication.service';
import { inject } from 'aurelia-framework';

@inject(AuthenticationService)
export class Login {
    userName: string = "";
    password: string = "";
    error: string = "";
    hasError: boolean = false;

    constructor(private authenticationService: AuthenticationService) {

    }

    login() {
        this.authenticationService.login(this.userName, this.password)
            .then(result => this.hasError = false)
            .catch(error => {
                this.hasError = true;
                this.error = error.error_description;
            })
    }
}