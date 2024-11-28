using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Product_Services.DataConfig;
using Product_Services.IRepository;
using Product_Services.Model;

namespace Product_Services.Services
{
    public class ProductServices : IProductRepository
    {
        private readonly IMongoCollection<Product> _product;
        private readonly IEmailSender _emailSender;
        public ProductServices(IOptions<Product_DBConfig> productConfig, IEmailSender emailSender)
        {
            var mongoClient = new MongoClient(productConfig.Value.ServerURL);
            var mongoDB = mongoClient.GetDatabase(productConfig.Value.Database);
            _product = mongoDB.GetCollection<Product>(productConfig.Value.Collection);
            _emailSender = emailSender;
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            product.ProductDatePosted = DateTime.UtcNow; // Set date when product is added
            await _product.InsertOneAsync(product);
            return product;
        }

       

        public async Task<bool> DeleteProductAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return false; // Handle invalid ID
            }
            var filter = Builders<Product>.Filter.Eq("_id", objectId);
            var result = await _product.DeleteOneAsync(filter);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _product.Find(_ => true).ToListAsync(); // Retrieves all products in the list
        }

        //get all the product by seller id
        // Get products by SellerId
        public async Task<List<Product>> GetProductsBySellerIdAsync(string sellerId)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.SellerId, sellerId);
            return await _product.Find(filter).ToListAsync();
        }
        public async Task<Product> GetProductByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return null; // Handle invalid ID
            }
            var filter = Builders<Product>.Filter.Eq("_id", objectId);
            return await _product.Find(filter).FirstOrDefaultAsync();
        }


        public async Task<bool> UpdateProductAsync(string id, Product updateProduct)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return false; // Handle invalid ID
            }
            var filter = Builders<Product>.Filter.Eq("_id", objectId);
            // Dynamically updating only the provided fields
            var update = Builders<Product>.Update.Set(p => p.ProductDatePosted, DateTime.UtcNow); // Always update the date posted
            if (!string.IsNullOrEmpty(updateProduct.ProductName))
                update = update.Set(p => p.ProductName, updateProduct.ProductName);

            if (!string.IsNullOrEmpty(updateProduct.ProductDescription))
                update = update.Set(p => p.ProductDescription, updateProduct.ProductDescription);

            if (updateProduct.ProductPrice > 0)
                update = update.Set(p => p.ProductPrice, updateProduct.ProductPrice);

            if (!string.IsNullOrEmpty(updateProduct.Productcategory))
                update = update.Set(p => p.Productcategory, updateProduct.Productcategory);


            if (!string.IsNullOrEmpty(updateProduct.ProductImageUrl))
                update = update.Set(p => p.ProductImageUrl, updateProduct.ProductImageUrl);


            var result = await _product.UpdateOneAsync(filter, update);

            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

         public async   Task<(int, string)> SendEmailToSupplier(string email, string message)
        {
            await _emailSender.SendEmailAsync(email, "Account Verification Request", message);

            return (200, "Confirmation email has been sent to your email address.");

        }
    }
}
