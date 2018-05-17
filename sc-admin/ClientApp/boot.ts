import { AuthenticationService } from './app/services/authentication.service';
import { Aurelia, PLATFORM, Container } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'bootstrap';
import 'materialize-css';
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-dialog'))
        .feature(PLATFORM.moduleName('app/resources/index'));

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    new HttpClient().configure(config => {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        config.withBaseUrl(baseUrl);
    });

    aurelia.start().then(() => {
        const authService = Container.instance.get(AuthenticationService);
        authService.isLoggedIn().then((isLoggedIn: boolean) => {
            const root = isLoggedIn
                ? PLATFORM.moduleName('app/components/app/app')
                : PLATFORM.moduleName('app/components/login/login');
            aurelia.setRoot(root);
        });
    });
}
