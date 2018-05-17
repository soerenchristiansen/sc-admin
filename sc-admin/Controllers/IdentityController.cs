using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sc_admin.Models;
using Serilog;

namespace sc_admin.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Administration")]
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
            var users = await _userManager.Users.ToListAsync();
            foreach (var applicationUser in users)
            {
                applicationUser.Roles = await _userManager.GetRolesAsync(applicationUser);
            }
            return users;
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
                Email = model.Email,
                FamilyName = model.FamilyName,
                GivenName = model.GivenName
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return result;

            foreach (var modelRole in model.Roles)
            {
                if (!await _roleManager.RoleExistsAsync(modelRole))
                {
                    var role = new IdentityRole
                    {
                        Name = modelRole
                    };
                    var roleResult = await _roleManager.CreateAsync(role);
                    if (!roleResult.Succeeded)
                    {
                        Log.Error(string.Join(", ", roleResult.Errors.Select(x => x.Description)));
                    }
                }
            }

            await _userManager.AddToRolesAsync(user, model.Roles);

            await AddClaims(user.UserName);
            
            return result;
        }

        [HttpPut("[action]")]
        public async Task<IdentityResult> UpdateUser([FromBody]UserModel model) 
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null) return null;

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.FamilyName = model.FamilyName;
            user.GivenName = model.GivenName;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                var roles = _roleManager.Roles.Select(x => x.Name).ToList();
                foreach (var role in roles)
                {
                    if (await _userManager.IsInRoleAsync(user, role))
                    {
                        await _userManager.RemoveFromRoleAsync(user, role);
                    }
                }

                await _userManager.AddToRolesAsync(user, model.Roles);
                await AddClaims(user.UserName);
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

        private async Task AddClaims(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var claims = new List<Claim> {
                new Claim(JwtClaimTypes.GivenName, user.GivenName),
                new Claim(JwtClaimTypes.FamilyName, user.FamilyName),
            };
            var userClaims = await _userManager.GetClaimsAsync(user);
            foreach (var claim in claims)
            {
                var existingUserClaim = userClaims?.FirstOrDefault(x => x.Type == claim.Type);
                if (existingUserClaim == null)
                {
                    await _userManager.AddClaimAsync(user, claim);
                }
                else
                {
                    await _userManager.ReplaceClaimAsync(user, existingUserClaim, claim);
                }
            }
        }
    }
}