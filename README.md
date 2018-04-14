# sc-admin
Aurelia admin building blocks

#### Setup
* Create empty database `scadmin`
* Run `dotnet ef database update`
* Run `npm install`
* Run `dotnet run` or `dotnet watch run`

#### Add migrations
e.g. `dotnet ef migrations add InitialCreate`

#### Remove the last migration
e.g. `dotnet ef migrations remove`

#### To save git credentials
`git config credential.helper store`
