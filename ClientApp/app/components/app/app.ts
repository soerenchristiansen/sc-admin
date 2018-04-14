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
                route: '',
                moduleId: PLATFORM.moduleName('../layout/layout')
            },
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
                title: 'Fetch data'
            },
            {
                route: 'login',
                name: 'login',
                layoutView: 'app/components/login/login.html',
                layoutViewModel: PLATFORM.moduleName('app/components/login/login'),
                moduleId: PLATFORM.moduleName('app/components/login/login'),
                title: 'Login'
            },
        ]);

        this.router = router;
    }
}
