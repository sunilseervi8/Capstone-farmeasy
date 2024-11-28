using Microsoft.EntityFrameworkCore;
using RentService.DataAccess;
using RentService.Model;

namespace RentService.Repository
{
    public class RentalRepository : IRentalRepository
    {
        private readonly RentalDBContext _context;
        public RentalRepository(RentalDBContext context)
        {
            _context = context;
        }

        public async Task<Rental> AddRentalAsync(Rental rental)
        {
            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();
            return rental;
        }

        public async Task<Rental> GetRentalByIdAsync(string id)
        {
            return await _context.Rentals
                .FirstOrDefaultAsync(r => r.RentalId == id);
        }

        public async Task<IEnumerable<Rental>> GetRentalsByUserIdAsync(string userId)
        {
            return await _context.Rentals
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Rental>> GetRentalsBySellerIdAsync(string sellerId)
        {
            return await _context.Rentals
                .Where(r => r.UserId == sellerId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Rental>> GetAllRentalsAsync()
        {
            return await _context.Rentals.ToListAsync();
        }

        public async Task<Rental> UpdateRentalAsync(string rentalId, Rental updatedRental)
        {
            var existingRental = await _context.Rentals.FindAsync(rentalId);
            if (existingRental == null)
            {
                return null;
            }

            // Update properties
            existingRental.RentalTitle = updatedRental.RentalTitle;
            existingRental.RentalDescription = updatedRental.RentalDescription;
            existingRental.RentalPrice = updatedRental.RentalPrice;
            existingRental.PickUpLocation = updatedRental.PickUpLocation;
            existingRental.RentalNumberPlate = updatedRental.RentalNumberPlate;
            
            

            await _context.SaveChangesAsync();
            return existingRental;
        }

        public async Task<bool> DeleteRentalByIdAsync(string rentalId)
        {
            var rental = await _context.Rentals.FindAsync(rentalId);
            if (rental != null)
            {
                _context.Rentals.Remove(rental);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
