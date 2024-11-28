namespace Account_Service.CustomExceptions
{
    public class UserNotFoundException : AccountServiceCustomException
    {
        public UserNotFoundException(string message = "User not found.") : base(message) { }

    }
}
