namespace Account_Service.CustomExceptions
{
    public class UpdateUserLocationFailedException: AccountServiceCustomException
    {
        public UpdateUserLocationFailedException(string message = "Failed to update user location.") : base(message) { }

    }
}
