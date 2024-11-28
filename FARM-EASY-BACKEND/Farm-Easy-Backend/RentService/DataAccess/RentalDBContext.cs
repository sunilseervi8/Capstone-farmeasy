using Microsoft.EntityFrameworkCore;
using RentService.Model;

namespace RentService.DataAccess
{
    public class RentalDBContext : DbContext
    {
        public RentalDBContext(DbContextOptions<RentalDBContext> options): base(options) 
        {
        }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<BookRentals> BookRentals { get; set; }

      
    }
}
