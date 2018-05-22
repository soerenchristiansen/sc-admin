using sc_admin.Context;

namespace sc_admin.Services
{
    public class ProductService : IProductService
    {
        private readonly AdminContext _db;

        public ProductService(AdminContext db)
        {
            _db = db;
        }


    }
}
