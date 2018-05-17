import { AuthenticationService } from './../../services/authentication.service';
import { inject, Aurelia, PLATFORM } from 'aurelia-framework';

@inject(AuthenticationService, Aurelia)
export class Login {
    userName: string = "";
    password: string = "";
    error: string = "";

    constructor(private authenticationService: AuthenticationService, private aurelia: Aurelia) {

    }

    async login() {
        try {
            let result = await this.authenticationService.login(this.userName, this.password);
            if (result) {
                this.error = "";
                await this.aurelia.setRoot(PLATFORM.moduleName('app/components/app/app'));
            }
                
        } catch (error) {
            if (error.error = "invalid grant") {
                this.error = "Invalid username or password";
            }
        }
        
        // if (result.)
        // await this.aurelia.setRoot(PLATFORM.moduleName('app/components/app/app'));
        //     .then(result => {

        //     })
        //     .catch(error => {
        //         this.hasError = true;
        //         this.error = error.error_description;
        //     });

        
    }
}