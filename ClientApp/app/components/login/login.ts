import { AuthenticationService } from './../../services/authentication.service';
import { inject, Aurelia, PLATFORM } from 'aurelia-framework';

@inject(AuthenticationService, Aurelia)
export class Login {
    userName: string = "";
    password: string = "";
    error: string = "";
    hasError: boolean = false;

    constructor(private authenticationService: AuthenticationService, private aurelia: Aurelia) {

    }

    async login() {
        // this.authenticationService.login(this.userName, this.password)
        //     .then(result => this.hasError = false)
        //     .catch(error => {
        //         this.hasError = true;
        //         this.error = error.error_description;
        //     });

        await this.aurelia.setRoot(PLATFORM.moduleName('app/components/app/app'));
    }
}