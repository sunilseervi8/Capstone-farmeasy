namespace Account_Service.CustomExceptions
{
    public class UserAlreadyExistsException: AccountServiceCustomException
    {
        public UserAlreadyExistsException(string message = "User with this email already exists.") : base(message) { }

    }
}
