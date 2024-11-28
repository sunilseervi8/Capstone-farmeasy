import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import axios from 'axios';

interface BookRentalDto {
    bookingId: string;
    rentFrom: string;
    rentTill: string;
    rentalId: string;
    additionalNotes?: string;
    rentalTitle: string;
    userId: string;
}

const BookingTable: React.FC = () => {
    const [bookings, setBookings] = useState<BookRentalDto[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state: RootState) => state.auth);
    const userId = user?.user_id;
    useEffect(() => {
        axios.get<BookRentalDto[]>(`https://localhost:8006/api/Booking/users/${userId}`)
            .then((response) => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        {/* <th className="py-2 px-4 border-b">Booking ID</th> */}
                        <th className="py-2 px-4 border-b">Rent From</th>
                        <th className="py-2 px-4 border-b">Rent Till</th>
                        <th className="py-2 px-4 border-b">Rental Title</th>
                        <th className="py-2 px-4 border-b">Additional Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.bookingId}>
                           {/*<td className="py-2 px-4 border-b">{booking.bookingId}</td> */} 
                            <td className="py-2 px-4 border-b">{new Date(booking.rentFrom).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{new Date(booking.rentTill).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{booking.rentalTitle}</td>
                            <td className="py-2 px-4 border-b">{booking.additionalNotes || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;
