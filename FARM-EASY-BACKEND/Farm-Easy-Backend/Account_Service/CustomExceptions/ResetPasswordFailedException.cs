namespace Account_Service.CustomExceptions
{
    public class ResetPasswordFailedException: AccountServiceCustomException
    {
        public ResetPasswordFailedException(string message = "Password reset failed.") : base(message) { }

    }
}
