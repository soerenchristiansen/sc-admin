import { Aurelia, inject, PLATFORM } from 'aurelia-framework';
@inject(Aurelia)
export class Home {

    constructor(private aurelia: Aurelia) {
    }

    async test() {
        await this.aurelia.setRoot(PLATFORM.moduleName('app/components/login/login'));
    }
}
