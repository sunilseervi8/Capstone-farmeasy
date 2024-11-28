using Microsoft.AspNetCore.Mvc;
using Product_Services.IRepository;
using Product_Services.Model;
using Product_Services.Services;

namespace Product_Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // POST: api/product
        [HttpPost]
        public async Task<IActionResult> AddProduct( Product product)
        {
            if (product == null)
            {
                return BadRequest(new { message = "Invalid product data" });
            }

            var addedProduct = await _productRepository.AddProductAsync(product);
            return Ok(new { message = "Product successfully added", product = addedProduct });
        }

        // GET: api/product
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return Ok(products);
        }

        // GET: api/product/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new { message = "Invalid ID" });
            }

            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }
            return Ok(product);
        }
        //get all product sellerid
        [HttpGet("Seller/{sellerId}")]
        public async Task<ActionResult<List<Product>>> GetProductsBySellerId(string sellerId)
        {
            var products = await _productRepository.GetProductsBySellerIdAsync(sellerId);

            if (products == null || products.Count == 0)
            {
                return NotFound($"No products found for seller with ID: {sellerId}");
            }
            return Ok(products);
        }
        // PUT: api/product/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, [FromBody] Product updateProduct)
        {
            if (updateProduct == null)
            {
                return BadRequest(new { message = "Invalid product data" });
            }

            var updateResult = await _productRepository.UpdateProductAsync(id, updateProduct);

            if (!updateResult)
            {
                return NotFound(new { message = "Product not found or could not be updated" });
            }

            return Ok(new { message = "Product successfully updated" });
        }

        // DELETE: api/product/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new { message = "Invalid ID" });
            }

            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            var deleteResult = await _productRepository.DeleteProductAsync(id);
            if (!deleteResult)
            {
                return NotFound(new { message = "Product could not be deleted" });
            }

            return Ok(new { message = "Product successfully deleted" });
        }

        [HttpPost("send-to-supplier")]
        public async Task<IActionResult> SendEmailToSupplier([FromBody] EmailRequestDto request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Message))
            {
                return BadRequest("Email and message are required.");
            }

            var (statusCode, resultMessage) = await _productRepository.SendEmailToSupplier(request.Email, request.Message);

            if (statusCode == 200)
            {
                return Ok(resultMessage);
            }

            return StatusCode(statusCode, resultMessage);
        }
    }
}
