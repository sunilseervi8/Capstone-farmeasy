namespace RentService.CustomException
{
    public class RentalServiceException : Exception
    {
       
            public RentalServiceException() { }

            public RentalServiceException(string message) : base(message) { }

            public RentalServiceException(string message, Exception innerException)
                : base(message, innerException) { }

    }
}
