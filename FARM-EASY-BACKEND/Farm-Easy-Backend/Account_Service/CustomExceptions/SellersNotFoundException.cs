namespace Account_Service.CustomExceptions
{
    public class SellersNotFoundException : AccountServiceCustomException
    {
        public SellersNotFoundException(string message = "No sellers found.") : base(message) { }

    }
}
