using Loan_and_Insurance_Service.Models;
using Microsoft.EntityFrameworkCore;

namespace Loan_and_Insurance_Service.DataAccess
{
    public class LoanAndInsuranceDBContext: DbContext
    {
        public LoanAndInsuranceDBContext(DbContextOptions<LoanAndInsuranceDBContext>options) : base(options){ }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<Insurance> Insurances { get; set; }
  


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Loan>()
            .Property(l => l.LoanId)
            .ValueGeneratedOnAdd();


            modelBuilder.Entity<Insurance>()
                .Property(i => i.InsuranceId)
                .ValueGeneratedOnAdd();

        }
 
    }
}
