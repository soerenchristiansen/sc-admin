import { AuthenticationService } from './../services/authentication.service';
import { Router, Redirect } from 'aurelia-router';
import { inject } from 'aurelia-framework';

@inject(Router, AuthenticationService)
export class AuthorizeStep {
    constructor(private router: Router, private authService: AuthenticationService) {
    }

    async run(navigationInstruction: any, next: any) {
        if (navigationInstruction.getAllInstructions().some((i: any) => i.config.auth)) {
            let isLoggedIn = await this.authService.isLoggedIn();
            if (!isLoggedIn) {
                return next.cancel(new Redirect(this.router.generate('login')));
            }
        }

        return next();
    }
}