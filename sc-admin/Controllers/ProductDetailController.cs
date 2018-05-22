using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace sc_admin.Controllers
{
    [Route("api/[controller]")]
    public class ProductDetailController : Controller
    {
        [HttpPost("[action]")]
        public async Task<string> SaveImages()
        {
            var files = Request.Form.Files;
            return files.ToString();
        }
    }
}