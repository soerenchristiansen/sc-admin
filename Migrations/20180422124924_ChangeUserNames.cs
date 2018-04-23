using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace scadmin.Migrations
{
    public partial class ChangeUserNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "AspNetUsers",
                newName: "GivenName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "AspNetUsers",
                newName: "FamilyName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GivenName",
                table: "AspNetUsers",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "FamilyName",
                table: "AspNetUsers",
                newName: "FirstName");
        }
    }
}
