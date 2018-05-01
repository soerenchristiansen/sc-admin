import { User } from './../../models/user';
import { ProfilesService } from './../../services/profiles.service';
import { EditUser } from './edit-user/edit-user';
import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';

@inject(DialogService, ProfilesService)
export class Profiles {
    users: User[] = [];
    chips = [{ tag: "Apple" }, { tag: "Microsoft" }, { tag: "Google" }];

    autocompleteData = {
        Apple: null,
        Google: null,
        Microsoft: null
    };

    constructor(private dialogService: DialogService, private profilesService: ProfilesService) {
    }

    activate() {
        this.profilesService.getAllUsers()
            .then(result => {
                this.users = result;
            });
    }

    openUserModal(user?: User) {
        this.dialogService.open({ viewModel: EditUser, model: user, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.profilesService.getAllUsers()
                    .then(result => this.users = result);
            }
        });
    }
}