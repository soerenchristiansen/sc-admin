using Microsoft.AspNetCore.Identity;

namespace sc_admin.Models
{
    public class Role
    {
        public Role(IdentityRole identityRole)
        {
            Id = identityRole.Id;
            RoleName = identityRole.Name;
        }

        public string Id { get; set; }
        public string RoleName { get; set; }
    }
}