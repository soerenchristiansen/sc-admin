using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sc_admin.Models;
using Serilog;

namespace sc_admin.Controllers
{
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IdentityController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet("[action]")]
        public async Task<IList<ApplicationUser>> GetAllUsers()
        {
            return await _userManager.Users.ToListAsync();
        }

        [HttpGet("[action]")]
        public async Task<IList<Role>> GetAllRoles()
        {
            return await _roleManager.Roles.Select(x => new Role(x)).ToListAsync();
        }

        [HttpPost("[action]")]
        public async Task<IdentityResult> Register([FromBody]UserModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return result;

            if (await _roleManager.RoleExistsAsync(model.Role))
            {
                await AddToRole(user.UserName, model.Role);
                return result;
            }

            var role = new IdentityRole
            {
                Name = model.Role
            };
            var roleResult = await _roleManager.CreateAsync(role);
            if (!roleResult.Succeeded)
            {
                Log.Error(string.Join(", ", roleResult.Errors.Select(x => x.Description)));
            }

            return result;
        }

        [HttpPost("[action]/{userName}/{roleName}")]
        public async Task<IdentityResult> AddToRole(string userName, string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var result = await _userManager.AddToRoleAsync(user, roleName);

            return result;
        }
    }
}