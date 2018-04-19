export class User {
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;
    public password: string;
    public confirmPassword: string;
    
    public get name() : string {
        return this.firstName + ' ' + this.lastName;
    }
    
    public roles: string[];
}