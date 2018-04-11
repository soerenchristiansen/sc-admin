export class User {
    public userName: string;
    public firstName: string;
    public lastName: string;
    
    public get name() : string {
        return this.firstName + ' ' + this.lastName;
    }
    
    public roles: string[];
}