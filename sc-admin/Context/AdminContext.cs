using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using sc_admin.Models;

namespace sc_admin.Context
{
    public class AdminContext : IdentityDbContext<ApplicationUser>
    {
        public AdminContext(DbContextOptions options) : base(options)
        {
        }
    }
}
