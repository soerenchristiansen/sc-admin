import { AuthenticationService } from './../services/authentication.service';
import { Router, Redirect, NavigationInstruction, Next } from 'aurelia-router';
import { inject, Container, Aurelia, PLATFORM } from 'aurelia-framework';

@inject(Router, AuthenticationService, Aurelia)
export class AuthorizeStep {
    constructor(private router: Router, private authService: AuthenticationService, private aurelia: Aurelia) {
    }

    async run(navigationInstruction: NavigationInstruction, next: Next) {
        if (navigationInstruction.getAllInstructions().some((i: any) => i.config.auth)) {
            let isLoggedIn = await this.authService.isLoggedIn();
            if (!isLoggedIn) {
                this.router.navigate('/', { replace: true, trigger: false });
                await this.aurelia.setRoot(PLATFORM.moduleName('app/components/login/login'));
                return next.cancel(new Redirect('/'));
            }
        }

        return next();
    }
}