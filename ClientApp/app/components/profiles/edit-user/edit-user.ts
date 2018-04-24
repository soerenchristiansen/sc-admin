import { inject } from 'aurelia-framework';
import { ProfilesService } from './../../../services/profiles.service';
import { User } from './../../../models/user';
import { DialogController } from 'aurelia-dialog';


@inject(DialogController, ProfilesService)
export class EditUser {
    user: User = new User();
    roles: any[] = [];
    errors: any[] = [];

    constructor(private dialogController: DialogController, private profilesService: ProfilesService) {

    }

    activate(user: User) {
        this.profilesService.getAllRoles()
            .then(roles => {
                this.user = user;
                this.roles = roles;
            });


        
    }

    editUser() {
        if (this.user.id) {
            this.updateUser();
        } else {
            this.createUser();
        }
    }

    createUser() {
        this.profilesService.createUser(this.user)
            .then(result => {
                if (result.succeeded) {
                    this.errors = [];
                    this.dialogController.close(true);
                } else {
                    this.errors = result.errors;
                }
            });
    }

    updateUser() {
        this.profilesService.updateUser(this.user)
            .then(result => {
                if (result.succeeded) {
                    this.errors = [];
                    this.dialogController.close(true);
                } else {
                    this.errors = result.errors;
                }
            });
    }
}