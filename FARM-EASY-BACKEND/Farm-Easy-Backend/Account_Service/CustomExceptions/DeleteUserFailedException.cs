namespace Account_Service.CustomExceptions
{
    public class DeleteUserFailedException: AccountServiceCustomException
    {
        public DeleteUserFailedException(string message = "Failed to delete user.") : base(message) { }

    }
}
