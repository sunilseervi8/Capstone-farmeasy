using Awareness_Feedback_Notification.Models;
using Awareness_Feedback_Notification.Repository;
using Awareness_Feedback_Notification.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Awareness_Feedback_Notification.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IVideoRepository _videoService;

        public VideoController(IVideoRepository videoService)
        {
            _videoService = videoService;
        }
         // POST: api/Videos
        [HttpPost]
        public async Task<ActionResult> Add(Video video)
        {
            await _videoService.AddAsync(video);
            return Ok("Added Successfully");
        }

        // GET: api/Videos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Video>>> GetAll()
        {
            var videos = await _videoService.GetAllAsync();
            return Ok(videos);
        }

        // GET: api/Videos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Video>> GetById(string id)
        {
            var video = await _videoService.GetByIdAsync(id);

            if (video == null)
            {
                return NotFound();
            }

            return Ok(video);
        }

        // GET: api/Videos/category/{category}
        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<Video>>> GetByCategory(string category)
        {
            var videos = await _videoService.GetByCategoryAsync(category);

            if (videos == null || !videos.Any())
            {
                return NotFound();
            }

            return Ok(videos);
        }

       

        // PUT: api/Videos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Video video)
        {
            var existingVideo = await _videoService.GetByIdAsync(id);

            if (existingVideo == null)
            {
                return NotFound();
            }

            await _videoService.UpdateAsync(id, video);
            return Ok("Updated Succesfully");
        }

        // DELETE: api/Videos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var video = await _videoService.GetByIdAsync(id);

            if (video == null)
            {
                return NotFound();
            }

            await _videoService.DeleteAsync(id);
            return Ok("Deleted Successfully");
        }
    }
}
