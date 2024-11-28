using Awareness_Feedback_Notification.Models;
using Awareness_Feedback_Notification.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Awareness_Feedback_Notification.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeneralFeedbackController : ControllerBase
    {
        private readonly IFeedbackRepository<GeneralFeedback> _generalFeedbackRepository;

        public GeneralFeedbackController(IFeedbackRepository<GeneralFeedback> generalFeedbackRepository)
        {
            _generalFeedbackRepository = generalFeedbackRepository;
        }

        // POST: api/GeneralFeedback
        [HttpPost]
        public async Task<IActionResult> CreateGeneralFeedback([FromBody] GeneralFeedback feedback)
        {
            await _generalFeedbackRepository.CreateAsync(feedback);
            return Ok(new { message = "General feedback added successfully" });
        }

        // GET: api/GeneralFeedback
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GeneralFeedback>>> GetAllFeedback()
        {
            var feedbacks = await _generalFeedbackRepository.GetAllAsync();
            return Ok(feedbacks);
        }

        // GET: api/GeneralFeedback/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GeneralFeedback>> GetFeedbackById(string id)
        {
            var feedback = await _generalFeedbackRepository.GetByIdAsync(id);
            if (feedback == null)
                return NotFound(new { message = "General feedback not found" });

            return Ok(feedback);
        }

        // DELETE: api/GeneralFeedback/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(string id)
        {
            var feedback = await _generalFeedbackRepository.GetByIdAsync(id);
            if (feedback == null)
                return NotFound(new { message = "General feedback not found" });

            await _generalFeedbackRepository.DeleteAsync(id);
            return Ok(new { message = "General feedback deleted successfully" });
        }

      
    }
}
