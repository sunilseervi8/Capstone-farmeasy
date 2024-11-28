using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentService.CustomException;
using RentService.Repository;
using RentService.Model;

namespace RentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly IRentalRepository _rentalRepository;
        public RentalController(IRentalRepository rentalRepository)
        {
            _rentalRepository = rentalRepository;
        }

        [HttpPost]
        public async Task<ActionResult<Rental>> PostRental(Rental rental)
        {
            try
            {
                var createdRental = await _rentalRepository.AddRentalAsync(rental);
                return CreatedAtAction(nameof(GetRental), new { id = createdRental.RentalId }, createdRental);
            }
            catch (RentalServiceException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> GetRental(string id)
        {
            try
            {
                var rental = await _rentalRepository.GetRentalByIdAsync(id);
                if (rental == null)
                {
                    throw new RentalServiceException("Rental not found.");
                }
                return Ok(rental);
            }
            catch (RentalServiceException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentalsByUserId(string userId)
        {
            try
            {
                var rentals = await _rentalRepository.GetRentalsByUserIdAsync(userId);
                return Ok(rentals);
            }
            catch (RentalServiceException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpGet("seller/{sellerId}")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentalsBySellerId(string sellerId)
        {
            try
            {
                var rentals = await _rentalRepository.GetRentalsBySellerIdAsync(sellerId);
                return Ok(rentals);
            }
            catch (RentalServiceException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rental>>> GetAllRentals()
        {
            try
            {
                var rentals = await _rentalRepository.GetAllRentalsAsync();
                return Ok(rentals);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRental(string id, Rental updatedRental)
        {
            try
            {
                var rental = await _rentalRepository.UpdateRentalAsync(id, updatedRental);
                if (rental == null)
                {
                    throw new RentalServiceException("Rental not found.");
                }
                return Ok(rental);
            }
            catch (RentalServiceException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(string id)
        {
            try
            {
                var isDeleted = await _rentalRepository.DeleteRentalByIdAsync(id);
                if (!isDeleted)
                {
                    throw new RentalServiceException("Rental not found.");
                }
                return Ok(new { Message = "Rental deleted successfully." });
            }
            catch (RentalServiceException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }
    }
}
