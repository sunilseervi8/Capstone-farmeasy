import React, { useEffect, useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import dayjs, { Dayjs } from 'dayjs';
import bookingService from '../../../Service/BookingRentalService';
import BookRentals from './BookRentals';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import {RentalData as Rental} from '../../../Models/ProductsModel'


interface RentalsCardProps {
  rentalsData: Rental[];
}
const RentalsCard: React.FC<RentalsCardProps> = ({ rentalsData }) => {
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookedDates, setBookedDates] = useState<Dayjs[]>([]);
  const [maxLength, setMaxLength] = useState(50); // Initial max length
  const [expandedRentalIds, setExpandedRentalIds] = useState<Set<string>>(new Set());
  const {  user } = useSelector((state: RootState) => state.auth);
  const userId = user?.user_id;
  // Filter out rentals that belong to the logged-in user
  const filteredRentals = rentalsData.filter((rental) => rental.userId !== userId);
  const handleToggleExpand = (rentalId: string) => {
    setExpandedRentalIds((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(rentalId)) {
        newExpanded.delete(rentalId);
      } else {
        newExpanded.add(rentalId);
      }
      return newExpanded;
    });
  };

  const truncateText = (text: string, rentalId: string) => {
    if (expandedRentalIds.has(rentalId) || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMaxLength(30); // Small screens (e.g., mobile)
      } else if (width < 1024) {
        setMaxLength(50); // Medium screens (e.g., tablet)
      } else {
        setMaxLength(100); // Large screens (e.g., desktop)
      }
    };

    handleResize(); // Initial check on component mount
    window.addEventListener('resize', handleResize); // Update on resize

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBookNow = async (rental: Rental) => {
    setSelectedRental(rental);
    setShowBookingDialog(true);

    try {
      const dates:any= await bookingService.fetchBookedDates(rental.rentalId);
      setBookedDates(Array.isArray(dates) ? dates.map((date: string) => dayjs(date)) : []);
    } catch (error) {
      console.error("Error fetching booked dates:", error);
    }
  };

  const handleClose = () => {
    setSelectedRental(null);
    setShowBookingDialog(false);
  };

  const handleBookingConfirmed = (start: Dayjs, end: Dayjs) => {
    console.log("Booking confirmed from", start.format("YYYY-MM-DD"), "to", end.format("YYYY-MM-DD"));
  };


  return (
    <div className='mx-28'>
      {/* Rental cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx:auto gap-6">
        {filteredRentals.map((rent) => (
          <div key={rent.rentalId} className="shadow-xl rounded-lg overflow-hidden bg-white">
            {/* Responsive Image Container */}
            <div className="w-full flex justify-center items-center overflow-hidden p-3">
              <img
                src={rent.image}
                alt={rent.rentalTitle}
                className="object-cover w-full h-36"
                style={{ display: 'block' }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{rent.rentalTitle}</h3>
              <p className="text-sm text-gray-700 mb-4">
                {truncateText(rent.rentalDescription, rent.rentalId)}
                {rent.rentalDescription.length > maxLength && (
                  <span
                    onClick={() => handleToggleExpand(rent.rentalId)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {expandedRentalIds.has(rent.rentalId) ? ' Read less' : ' Read more'}
                  </span>
                )}              </p>
              <div className="text-gray-600 flex items-center mb-4">
                <CurrencyRupeeIcon sx={{ fontSize: 18, marginRight: 0.5 }} />
                <span className="text-lg font-semibold">{rent.rentalPrice}</span>
              </div>
              <button
                onClick={() => handleBookNow(rent)}
                className="flex items-center justify-center w-full py-2 bg-custom-blue text-white rounded hover:bg-blue-700 transition duration-200"
              >
                <EventIcon sx={{ fontSize: 16, mr: 1 }} />
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Conditional rendering for the booking dialog */}
      {showBookingDialog && selectedRental && (
        <BookRentals
          rentalData={selectedRental}
          onClose={handleClose}
          bookedDates={bookedDates}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}
    </div>
  );
};

export default RentalsCard;
