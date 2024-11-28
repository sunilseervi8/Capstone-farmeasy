using LMS_User_Service.CustomExceptions;
using LMS_User_Service.Data;
using LMS_User_Service.IRepository;
using LMS_User_Service.Model;
using LMS_User_Service.Model.EmailDTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;

namespace LMS_User_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropsController : ControllerBase
    {
        
            private readonly CropIRepository _cropRepository;

            public CropsController(CropIRepository cropRepository)
            {
                _cropRepository = cropRepository;
            }

            [HttpGet]
            public IActionResult GetAllCrops()
            {
                try
                {
                    var crops = _cropRepository.GetAllCrops();
                    return Ok(crops);
                }
                catch (CropNotFoundException ex)
                {
                    return NotFound(new { Message = ex.Message });
                }
            }

            [HttpGet("{id}")]
            public IActionResult GetCropById(int id)
            {
                try
                {
                    var crop = _cropRepository.GetCropById(id);
                    return Ok(crop);
                }
                catch (CropNotFoundException ex)
                {
                    return NotFound(new { Message = ex.Message });
                }
            }

            [HttpGet("category/{category}")]
            public IActionResult GetCropsByCategory(string category)
            {
                try
                {
                    var crops = _cropRepository.GetCropsByCategory(category);
                    return Ok(crops);
                }
                catch (CropCategoryNotFoundException ex)
                {
                    return NotFound(new { Message = ex.Message });
                }
            }

            [HttpPost]
            public IActionResult AddCrop( Crop crop)
            {
                try
                {
                    var newCrop = _cropRepository.AddCrop(crop);
                    return CreatedAtAction(nameof(GetCropById), new { id = newCrop.Id }, newCrop);
                }
                catch (CropAdditionException ex)
                {
                    return BadRequest(new { Message = ex.Message });
                }
            }
      

  [HttpPost("send-to-supplier")]
        public async Task<IActionResult> SendEmailToSupplier([FromBody] EmailRequestDto request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Message))
            {
                return BadRequest("Email and message are required.");
            }

            var (statusCode, resultMessage) = await _cropRepository.SendEmailToSupplier(request.Email, request.Message);

            if (statusCode == 200)
            {
                return Ok(resultMessage);
            }

            return StatusCode(statusCode, resultMessage);
        }
        [HttpPut("{id}")]
            public IActionResult UpdateCrop(int id, [FromBody] Crop updatedCrop)
            {
                try
                {
                    var crop = _cropRepository.UpdateCrop(id, updatedCrop);
                    return Ok(crop);
                }
                catch (CropNotFoundException ex)
                {
                    return NotFound(new { Message = ex.Message });
                }
                catch (CropUpdateException ex)
                {
                    return BadRequest(new { Message = ex.Message });
                }
            }

            [HttpDelete("{id}")]
            public IActionResult DeleteCrop(int id)
            {
                try
                {
                    bool result = _cropRepository.DeleteCrop(id);
                    return result ? Ok(new { Message = "Crop deleted successfully." }) : BadRequest(new { Message = "Failed to delete crop." });
                }
                catch (CropNotFoundException ex)
                {
                    return NotFound(new { Message = ex.Message });
                }
                catch (CropDeletionException ex)
                {
                    return BadRequest(new { Message = ex.Message });
                }
            }
        }
    }
