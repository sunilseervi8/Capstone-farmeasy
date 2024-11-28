using Loan_and_Insurance_Service.CustomException;
using Loan_and_Insurance_Service.DataAccess;
using Loan_and_Insurance_Service.Models;
using Loan_and_Insurance_Service.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace Loan_and_Insurance_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] // Protect with JWT token
    public class LoanController : ControllerBase
    {
        private readonly ILoanRepository _loanRepository;

        public LoanController(ILoanRepository loanRepository)
        {
            _loanRepository = loanRepository;
        }

        [HttpGet("loans")]
        public async Task<IActionResult> GetAllLoanApplications()
        {
            try
            {
                var loans = await _loanRepository.GetAllLoanApplicationsAsync();
                return Ok(loans);
            }
            catch (Exception ex)
            {
                throw new LoanApplicationException("Error retrieving loan applications.", ex);
            }
        }

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyForLoan([FromBody] Loan loanApplication)
        {
            if (loanApplication == null)
                return BadRequest("Invalid loan application data.");

            // Check for required fields
            if (loanApplication.Amount <= 0 || loanApplication.InterestRate <= 0 || string.IsNullOrWhiteSpace(loanApplication.ProviderName))
                return BadRequest("Loan application must include a valid amount, interest rate, and provider name.");

            try
            {
                loanApplication.IsApproved = false;
                await _loanRepository.AddLoanApplicationAsync(loanApplication);
                return Ok(new { status = "Application submitted" });
            }
            catch (Exception ex)
            {
                throw new LoanApplicationException("Error applying for loan.", ex);
            }
        }

    }
}
