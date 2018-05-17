using System.Collections.Generic;
using System.Threading.Tasks;
using sc_admin.Models;
using Xunit;

namespace sc_admin.tests.controllers
{
    public class IdentityControllerTests
    {
        private readonly HttpClientBase _httpClientBase;

        public IdentityControllerTests()
        {
            // Arrange
            _httpClientBase = new HttpClientBase();
        }

        [Fact]
        public async Task GetUsersTest()
        {
            // Act
            var response = await _httpClientBase.GetAsync<IList<ApplicationUser>>("Identity/GetAllUsers");

            // Assert
        }

        [Fact]
        public async Task CreateTestUserAndSetAsAdmin()
        {

        }
    }
}
