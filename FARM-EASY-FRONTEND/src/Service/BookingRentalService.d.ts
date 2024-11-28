export interface Booking {
    rentFrom: string;
    rentTill: string;
    rentalId: string;
    additionalNotes?: string;
}
declare const bookingService: {
    getAllBookings: () => Promise<Booking[]>;
    getBookingById: (id: number) => Promise<Booking>;
    fetchBookedDates: (rentalId: string) => Promise<any>;
    createBooking: (booking: Booking) => Promise<Booking>;
    updateBooking: (id: string, booking: Booking) => Promise<void>;
    deleteBooking: (id: string) => Promise<void>;
};
export default bookingService;
