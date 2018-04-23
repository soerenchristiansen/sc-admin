import { ApiService } from './../../services/api.service';
import { User } from './../../models/user';
import { AuthenticationService } from './../../services/authentication.service';
import { LoginStatusUpdated } from './../../shared/messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthorizeStep } from './../../shared/authorize-step';
import { Aurelia, PLATFORM, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

@inject(AuthenticationService, ApiService, EventAggregator)
export class App {
    private router: Router;
    private signinStatus: boolean;
    private user: User;
    private isAdmin: boolean;

    constructor(private authService: AuthenticationService, private apiSerivce: ApiService, ea: EventAggregator) {
        ea.subscribe(LoginStatusUpdated, (msg: LoginStatusUpdated) => {
            this.signinStatus = msg.signinStatus;
            this.authService.getUser().then(user => {
                this.user = user;
                this.isAdmin = this.authService.isInRole('administrator');
            });
        });
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'SC Admin';
        config.options.pushState = true;
        config.addAuthorizeStep(AuthorizeStep);
        config.map([
            {
                route: ['', 'home'],
                name: 'home',
                settings: { icon: 'home' },
                moduleId: PLATFORM.moduleName('../home/home'),
                nav: true,
                title: 'Home'
            },
            {
                route: 'fetch-data',
                name: 'fetchdata',
                settings: { icon: 'th-list' },
                moduleId: PLATFORM.moduleName('../fetchdata/fetchdata'),
                nav: true,
                title: 'Fetch data',
                auth: true
            },
            {
                route: 'profiles',
                name: 'profiles',
                moduleId: PLATFORM.moduleName('../profiles/profiles'),
                title: 'Profiles',
                auth: true
            }
        ]);

        this.router = router;
    }

    signout() {
        this.authService.signOut();
    }
}
