using RentService.Model;
using RentService.Model.Data;

namespace RentService.Repository
{
    public interface IBookingRepository
    {
        Task<IEnumerable<BookRentals>> GetAllBookingsAsync();
        Task<BookRentals> GetBookingByIdAsync(string id);
        Task<IEnumerable<BookRentalDto>> GetBookRentalsByUserIdAsync(string userId);
        Task CreateBookingAsync(BookRentals booking);
        Task UpdateBookingAsync(BookRentals booking);
        Task DeleteBookingAsync(string id);
        Task<List<DateTime>> GetBookedDatesByRentalId(string rentalId);
    }
}

