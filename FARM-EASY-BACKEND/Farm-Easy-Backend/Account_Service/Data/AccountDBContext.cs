using Account_Service.Models;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Account_Service.Data
{
    public class AccountDBContext:IdentityDbContext<ApplicationUser>
    {
        public AccountDBContext(DbContextOptions<AccountDBContext> options): base(options)
        {
        }

        public DbSet<UserLocation> UserLocation { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>()
                .HasOne(u => u.UserLocation)
                .WithOne(l => l.ApplicationUser)
                .HasForeignKey<UserLocation>(l => l.UserId);
        }
    }
}
