using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using dotenv.net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cloud_Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CloudController : ControllerBase
    {
        private readonly Cloudinary _cloudinary;

        public CloudController()
        {
            // Load Cloudinary credentials from .env file
            DotEnv.Load(new DotEnvOptions(probeForEnv: true));
            var cloudinaryUrl = Environment.GetEnvironmentVariable("CLOUDINARY_URL");
            _cloudinary = new Cloudinary(cloudinaryUrl);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                Folder = "Farm-Easy-Crops",
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = true
            };

            var result = await _cloudinary.UploadAsync(uploadParams);
 

            return Ok(new { url = result.Url.ToString() });
        }

        }

    }

