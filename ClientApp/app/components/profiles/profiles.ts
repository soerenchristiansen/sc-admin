import { EditUser } from './edit-user/edit-user';
import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';

@inject(DialogService)
export class Profiles {
    constructor(private dialogService: DialogService) {

    }


    openUserModal() {
        this.dialogService.open({ viewModel: EditUser, lock: false}).whenClosed(response => {
            if (!response.wasCancelled) {
                console.log("hello");
            }
        });
    }
}