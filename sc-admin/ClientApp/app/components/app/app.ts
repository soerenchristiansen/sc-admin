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
            this.authService.getUser().then(user => this.user = user);
            this.isAdmin = localStorage['isAdmin'];
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
                settings: { icon: 'th-list' },
                moduleId: PLATFORM.moduleName('../home/home'),
                nav: true,
                title: 'Dashboard',
                auth: true
            },
            {
                route: 'products',
                name: 'products',
                settings: { icon: 'th-list' },
                moduleId: PLATFORM.moduleName('../products/products'),
                nav: true,
                title: 'Products',
                auth: true
            },
            {
                route: 'product/:id',
                name: 'product',
                moduleId: PLATFORM.moduleName('../product-detail/product-detail'),
                title: 'Product detail',
                auth: true
            },
            {
                route: 'profiles',
                name: 'profiles',
                moduleId: PLATFORM.moduleName('../profiles/profiles'),
                title: 'Profiles',
                auth: true
            },
            {
                route: 'media',
                name: 'media',
                settings: { icon: 'home' },
                moduleId: PLATFORM.moduleName('../media/media'),
                nav: true,
                title: 'Media',
                auth: true
            },
        ]);

        this.router = router;
    }

    signout() {
        this.authService.signOut();
    }
}
