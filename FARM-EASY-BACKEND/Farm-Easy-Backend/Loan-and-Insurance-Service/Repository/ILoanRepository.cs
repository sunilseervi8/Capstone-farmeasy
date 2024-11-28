using Loan_and_Insurance_Service.Models;

namespace Loan_and_Insurance_Service.Repository
{
    public interface ILoanRepository
    {
        Task<IEnumerable<Loan>> GetAllLoanApplicationsAsync();
        Task AddLoanApplicationAsync(Loan loanApplication);
    }
}
