using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Loan_and_Insurance_Service.Models
{
    public class Insurance
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InsuranceId { get; set; }

        [Required]
        [StringLength(100)]
        public string PolicyName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal PremiumAmount { get; set; }

        [Required]
        [StringLength(100)]
        public string ProviderName { get; set; }

        [Required]
        public bool IsEligible { get; set; }
    }
}
