using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace sc_admin.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FamilyName { get; set; }
        public string GivenName { get; set; }
        [NotMapped]
        public IList<string> Roles { get; set; }
    }
}
