import React from 'react';
import { Dayjs } from 'dayjs';
import { RentalData } from '../../../Models/ProductsModel';
interface BookRentalsProps {
    rentalData: RentalData;
    onClose: () => void;
    bookedDates: Dayjs[];
    onBookingConfirmed: (start: Dayjs, end: Dayjs) => void;
}
declare const BookRentals: React.FC<BookRentalsProps>;
export default BookRentals;
