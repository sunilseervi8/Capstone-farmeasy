using Product_Services.Model;

namespace Product_Services.IRepository
{
    public interface IProductRepository
    {
        Task<Product> AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(string id, Product product);
        Task<bool> DeleteProductAsync(string id);
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(string id);
        Task<(int, string)> SendEmailToSupplier(string email, string message);
        Task<List<Product>> GetProductsBySellerIdAsync(string sellerId);
      

    }
}
