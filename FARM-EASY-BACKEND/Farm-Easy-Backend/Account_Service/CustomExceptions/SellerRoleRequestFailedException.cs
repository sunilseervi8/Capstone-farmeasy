namespace Account_Service.CustomExceptions
{
    public class SellerRoleRequestFailedException: AccountServiceCustomException
    {
        public SellerRoleRequestFailedException(string message = "Failed to request seller role.") : base(message) { }

    }
}
