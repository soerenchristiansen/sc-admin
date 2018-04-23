export class User {
    public id: string;
    public userName: string;
    public givenName: string;
    public familyName: string;
    public email: string;
    public role: string;
    public password: string;
    public confirmPassword: string;

    constructor() {

    }
    
    public get name() : string {
        return this.givenName + ' ' + this.familyName;
    }
    
    public roles: string[];
}