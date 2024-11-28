import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, TextField, IconButton } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import bookingService from '../../../Service/BookingRentalService'; // Ensure this path is correct
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {RentalData} from '../../../Models/ProductsModel'
const validationSchema = Yup.object().shape({
    rentFrom: Yup.date()
        .required("Rent From is required")
        .min(dayjs(), "Rent From date cannot be before today"),
    rentTill: Yup.date()
        .required("Rent Till is required")
        .min(Yup.ref('rentFrom'), "Rent Till must be after Rent From")
});
 
interface BookRentalsProps {
    rentalData: RentalData;
    onClose: () => void;
    bookedDates: Dayjs[]; // Add this line
    onBookingConfirmed: (start: Dayjs, end: Dayjs) => void;
}

const BookRentals: React.FC<BookRentalsProps> = ({ rentalData, onClose, onBookingConfirmed }) => {
    const [rentFrom, setRentFrom] = useState<Dayjs>(dayjs());
    const [rentTill, setRentTill] = useState<Dayjs>(dayjs().add(1, 'day'));
    const [additionalNotes, setAdditionalNotes] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [bookedDates, setBookedDates] = useState<Dayjs[]>([]);

    // Fetch booked dates when the component mounts or when the rental ID changes
    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
                // Retrieve booked dates from the booking service
                const dates = await bookingService.fetchBookedDates(rentalData.rentalId);
                // Convert each date to a Dayjs object for easier date handling
                const dayjsDates = dates.map((date: string) => dayjs(date, "DD-MM-YYYY"));
                setBookedDates(dayjsDates);
            } catch (error) {
                // Log any errors that occur during fetching
                console.error("Error fetching booked dates:", error);
            }
        };
        fetchBookedDates();
    }, [rentalData.rentalId]);

    const handleConfirmBooking = async () => {
        try {
            // Validate rentFrom and rentTill dates against the validation schema
            await validationSchema.validate({ rentFrom, rentTill });

            // Prepare booking data with formatted dates and any additional notes
            const bookingData = {
                rentalId: rentalData.rentalId,
                rentFrom: rentFrom.format("DD-MM-YYYY"),
                rentTill: rentTill.format("DD-MM-YYYY"),
                additionalNotes,
            };

            // Create the booking and trigger the confirmation callback on success
            await bookingService.createBooking(bookingData);
            onBookingConfirmed(rentFrom, rentTill);
            onClose();

        } catch (validationError) {
            if (validationError instanceof Yup.ValidationError) {
                // Set validation error message if validation fails
                setError(validationError.message);

            } else {
                // Handle any other errors in booking creation
                console.error("Failed to create booking:", validationError);
                toast.error("Booking failed. Please try again.");
            }
        }
    };

    // Disable dates that are either in the past or already booked
    const isDateBlocked = (date: Dayjs) => {
        return date.isBefore(dayjs(), 'day') || bookedDates.some((bookedDate) => date.isSame(bookedDate, 'day'));
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <div className="flex justify-between items-center">
                    <span>Book {rentalData.rentalTitle}</span>
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => { e.preventDefault(); handleConfirmBooking(); }}>
                    <img src={rentalData.image} alt={rentalData.rentalTitle} className="w-32 h-32 rounded-lg mb-4" />
                    {error && <p className="text-red-600 mb-2">{error}</p>}

                    {/* Provides Day.js as the date handling library for consistent date formatting and localization */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Rent From"
                            format = "DD-MM-YYYY"
                            value={rentFrom}
                            onChange={(newValue) => setRentFrom(newValue ?? dayjs())} // Update rentFrom date or set to today if null
                            shouldDisableDate={isDateBlocked} // Disable already booked dates
                            sx={{ width: "100%", marginBottom: "1rem" }}
                        />
                        <DatePicker
                            label="Rent Till"
                            format='DD-MM-YYYY'
                            value={rentTill}
                            onChange={(newValue) => setRentTill(newValue ?? dayjs())} // Update rentTill date or set to today if null
                            shouldDisableDate={isDateBlocked}
                            sx={{ width: "100%" }}
                        />
                    </LocalizationProvider>

                    {/* Field for additional notes if required */}
                    <TextField
                        label="Additional Notes"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#000d4b' }}>
                        Confirm Booking
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookRentals;

