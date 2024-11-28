using Microsoft.EntityFrameworkCore;
using RentService.CustomException;
using RentService.DataAccess;
using RentService.Model;
using RentService.Model.Data;

namespace RentService.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly RentalDBContext _context;


        public BookingRepository(RentalDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookRentals>> GetAllBookingsAsync()
        {
            return await _context.BookRentals.ToListAsync();
        }

        public async Task<BookRentals> GetBookingByIdAsync(string id)
        {
            return await _context.BookRentals.FindAsync(id);
        }
        public async Task<IEnumerable<BookRentalDto>> GetBookRentalsByUserIdAsync(string userId)
        {
            // Step 1: Retrieve all rentals associated with the given UserId
            var rentals = await _context.Rentals
                .Where(r => r.UserId == userId)
                .ToListAsync();
            // If no rentals found for the user, return an empty list
            if (!rentals.Any())
            {
                return Enumerable.Empty<BookRentalDto>();
            }
            // Get the list of RentalIds for all rentals found
            var rentalIds = rentals.Select(r => r.RentalId).ToList();
            // Step 2: Retrieve all bookings associated with the retrieved RentalIds
            var bookings = await _context.BookRentals
                .Where(br => rentalIds.Contains(br.RentalId))
                .ToListAsync();
            // Step 3: Map each booking to BookRentalDto, including corresponding rental data
            var rentalDictionary = rentals.ToDictionary(r => r.RentalId);
            return bookings.Select(booking => new BookRentalDto
            {
                BookingId = booking.BookingId,
                RentFrom = booking.RentFrom,
                RentTill = booking.RentTill,
                RentalId = booking.RentalId,
                AdditionalNotes = booking.AdditionalNotes,
                // Rental data mapped from rental dictionary
                RentalTitle = rentalDictionary[booking.RentalId].RentalTitle,
                UserId = rentalDictionary[booking.RentalId].UserId
            }).ToList();
        }

        public async Task<List<DateTime>> GetBookedDatesByRentalId(string rentalId)
        {
            try
            {
                // Fetch RentFrom and RentTill dates from the database for the given rental ID
                var bookings = await _context.BookRentals
                    .Where(b => b.RentalId == rentalId)
                    .Select(b => new { b.RentFrom, b.RentTill })
                    .ToListAsync();

                // Generate a list of all booked dates in-memory
                var bookedDates = new List<DateTime>();
                foreach (var booking in bookings)
                {
                    if (booking.RentFrom != null && booking.RentTill != null)
                    {
                        // Ensure RentTill is not before RentFrom
                        if (booking.RentTill >= booking.RentFrom)
                        {
                            var days = (booking.RentTill - booking.RentFrom).Days + 1;
                            bookedDates.AddRange(Enumerable.Range(0, days).Select(offset => booking.RentFrom.AddDays(offset)));
                        }
                        else
                        {
                            Console.WriteLine($"Warning: Booking with ID {rentalId} has RentTill earlier than RentFrom.");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Warning: Booking with ID {rentalId} has null RentFrom or RentTill dates.");
                    }
                }

                return bookedDates;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetBookedDatesByRentalId: {ex.Message}");
                throw;
            }
        }


        public async Task CreateBookingAsync(BookRentals booking)
        {
           
            _context.BookRentals.Add(booking);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookingAsync(BookRentals booking)
        {
            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookingAsync(string id)
        {
            var booking = await _context.BookRentals.FindAsync(id);
            if (booking != null)
            {
                _context.BookRentals.Remove(booking);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new BookingRentalsExceptionService("Booking not found.");
            }
        }
    }
}
