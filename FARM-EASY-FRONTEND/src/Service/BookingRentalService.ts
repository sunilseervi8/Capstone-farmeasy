import axios from 'axios';

// Define the API base URL
const _url = import.meta.env.VITE_API_URL ;

// Define the Booking type
export interface Booking {
    rentFrom: string; // Format: 'YYYY-MM-DD'
    rentTill: string; // Format: 'YYYY-MM-DD'
    rentalId: string; // Foreign key referencing the rental item
    additionalNotes?: string; // Optional field
}

// Booking Service
const bookingService = {
    getAllBookings: async (): Promise<Booking[]> => {
        const response = await axios.get<Booking[]>(`${_url}/booking`);
        return response.data;
    },

    getBookingById: async (id: number): Promise<Booking> => {
        const response = await axios.get<Booking>(`${_url}/booking/${id}`);
        return response.data;
    },

    fetchBookedDates: async (rentalId: string) => {
        try {
            const response = await axios.get(`${_url}/Booking/booked-dates/${rentalId}`);
            console.log(response.data)
            return response.data; // Assuming the API returns an array of date strings
        } catch (error) {
            console.error("Error fetching booked dates:", error);
            throw error;
        }
    },

    createBooking: async (booking: Booking): Promise<Booking> => {
        console.log(booking);
    
        try {
            const response = await axios.post<Booking>(`${_url}/booking`, booking);
            console.log(response.data); // This log should be before the return statement
            return response.data;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error; // Rethrow error for further handling
        }
    },
    

    updateBooking: async (id: string, booking: Booking): Promise<void> => {
        await axios.put(`${_url}/booking/${id}`, booking);
    },

    deleteBooking: async (id: string): Promise<void> => {
        await axios.delete(`${_url}/booking/${id}`);
    }
};

export default bookingService;
