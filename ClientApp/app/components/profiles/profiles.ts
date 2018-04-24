import { User } from './../../models/user';
import { ProfilesService } from './../../services/profiles.service';
import { EditUser } from './edit-user/edit-user';
import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import $ from 'jquery';

@inject(DialogService, ProfilesService)
export class Profiles {
    users: User[] = [];

    constructor(private dialogService: DialogService, private profilesService: ProfilesService) {
    }

    activate() {
        this.profilesService.getAllUsers()
            .then(result => {
                this.users = result;
            });

        const options = {
            autocompleteOptions: {
                data: {
                    'Apple': null,
                    'Microsoft': null,
                    'Google': null
                }
            },
            data: [{
                tag: 'Apple',
            }, {
                tag: 'Microsoft',
            }, {
                tag: 'Google',
            }],
            placeholder: "bente",
            // secondaryPlaceholder: this.secondaryPlaceholder
        };
        $('.chips').material_chip(options);
        // $('.chips-initial').chips({
        //     data: [{
        //       tag: 'Apple',
        //     }, {
        //       tag: 'Microsoft',
        //     }, {
        //       tag: 'Google',
        //     }],
        //   });
        //   $('.chips-autocomplete').chips({
        //     autocompleteOptions: {
        //       data: {
        //         'Apple': null,
        //         'Microsoft': null,
        //         'Google': null
        //       },
        //       limit: Infinity,
        //       minLength: 1
        //     }
        //   });
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