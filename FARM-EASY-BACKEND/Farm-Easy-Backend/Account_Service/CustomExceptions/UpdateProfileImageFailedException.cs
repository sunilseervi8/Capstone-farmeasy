namespace Account_Service.CustomExceptions
{
    public class UpdateProfileImageFailedException: AccountServiceCustomException
    {
        public UpdateProfileImageFailedException(string message = "Failed to update profile image.") : base(message) { }

    }
}
