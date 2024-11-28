namespace Account_Service.CustomExceptions
{
    public class InvalidCredentialsException: AccountServiceCustomException
    {
        public InvalidCredentialsException(string message = "Invalid credentials provided.") : base(message) { }

    }
}
