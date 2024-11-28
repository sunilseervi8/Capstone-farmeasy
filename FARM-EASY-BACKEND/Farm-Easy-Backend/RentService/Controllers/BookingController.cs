using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentService.CustomException;
using RentService.Model;
using RentService.Model.Data;
using RentService.Repository;

namespace RentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingController(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookRentals>>> GetBookings()
        {
            var bookings = await _bookingRepository.GetAllBookingsAsync();
            return Ok(bookings);
        }

        // GET: api/bookings/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BookRentals>> GetBooking(string id)
        {
            var booking = await _bookingRepository.GetBookingByIdAsync(id);
            if (booking == null)
            {
                throw new BookingRentalsExceptionService("Booking not found.");
            }
            return Ok(booking);
        }

        [HttpGet("booked-dates/{rentalId}")]
        public async Task<IActionResult> GetBookedDatesByRentalId(string rentalId)
        {
            try
            {
                var bookedDates = await _bookingRepository.GetBookedDatesByRentalId(rentalId);

                if (bookedDates == null || bookedDates.Count == 0)
                {
                    return NotFound("No booked dates found for this rental.");
                }

                // Format dates to "dd-MM-yyyy"
                var formattedBookings = bookedDates.Select(date => date.ToString("dd-MM-yyyy")).ToList();

                return Ok(formattedBookings);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetBookedDatesByRentalId: {ex.Message}");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // POST: api/bookings
        [HttpPost]
        public async Task<ActionResult<BookRentals>> CreateBooking(BookRentals booking)
        {
            try
            {
                await _bookingRepository.CreateBookingAsync(booking);
                return CreatedAtAction(nameof(GetBooking), new { id = booking.BookingId }, booking);
            }
            catch (BookingRentalsExceptionService ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception) // Catching generic exceptions
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }


        // PUT: api/bookings/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(string id, BookRentals booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            try
            {
                await _bookingRepository.UpdateBookingAsync(booking);
                return NoContent();
            }
            catch (BookingRentalsExceptionService ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE: api/bookings/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(string id)
        {
            try
            {
                await _bookingRepository.DeleteBookingAsync(id);
                return NoContent();
            }
            catch (BookingRentalsExceptionService ex)
            {
                return NotFound(ex.Message);
            }
        }
        // GET: api/BookRentals/{rentalId}
        [HttpGet("users/{userId}")]
        public async Task<ActionResult<IEnumerable<BookRentalDto>>> GetBookRentalsByUserId(string userId)
        {
            var rentalData = await _bookingRepository.GetBookRentalsByUserIdAsync(userId);

            if (!rentalData.Any())
            {
                return NotFound("User id not found");
            }

            return Ok(rentalData);
        }
    }
}
