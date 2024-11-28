using Loan_and_Insurance_Service.DataAccess;
using Loan_and_Insurance_Service.Models;
using Microsoft.EntityFrameworkCore;

namespace Loan_and_Insurance_Service.Repository
{
    public class LoanRepository: ILoanRepository
    {
        private readonly LoanAndInsuranceDBContext _context;

        public LoanRepository(LoanAndInsuranceDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Loan>> GetAllLoanApplicationsAsync()
        {
            return await _context.Loans.ToListAsync();
        }

        public async Task AddLoanApplicationAsync(Loan loan)
        {
            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();
        }
    }
}
