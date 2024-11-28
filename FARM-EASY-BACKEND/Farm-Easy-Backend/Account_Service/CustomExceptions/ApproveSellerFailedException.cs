namespace Account_Service.CustomExceptions
{
    public class ApproveSellerFailedException: AccountServiceCustomException
    {
        public ApproveSellerFailedException(string message = "Failed to approve seller role.") : base(message) { }

    }
}
