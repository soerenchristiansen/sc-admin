import { AuthorizeStep } from './../../shared/authorize-step';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

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
                nav: true,
                title: 'Profiles'
            }
        ]);

        this.router = router;
    }
}
