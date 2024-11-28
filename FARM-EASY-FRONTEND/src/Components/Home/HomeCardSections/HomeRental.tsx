import React, { useState } from 'react';
import { useNavigate } from 'react-router';

interface Rental {
  rentalId: string;
  rentalTitle: string;
  rentalDescription: string;
  rentalPrice: number;
  image: string;
}

const RentalCardGrid: React.FC<{ rentalData: Rental[] }> = ({ rentalData }) => {
  const [visibleCards]= useState(3);
  const navigate = useNavigate();

  const loadMoreCards = () => {
      navigate('/rentals')
  };

  return (
    <section className="py-12 w-full bg-white relative"> {/* Updated bg-color to white */}
      <div className="flex items-center justify-center mb-6">
        {/* Centered Title with Blue Color */}
        <h2 className="text-4xl font-bold text-txt-blue">Available Rent Machineries</h2>
      </div>
      <div className="container bg-white mx-auto px-4">
        {/* Cards Grid */}
        <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalData.slice(0, visibleCards).map((rental, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border border-gray-200"
            >
              {/* Rental Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={rental.image}
                  alt={rental.rentalTitle}
                  className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                />
              </div>

              {/* Rental Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{rental.rentalTitle}</h3>
                <div className="text-xl font-bold text-gray-800">
                  INR.{rental.rentalPrice}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        
          <div className="text-center mt-10">
            <button
              onClick={loadMoreCards}
              className="px-8 py-3 bg-custom-blue text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              Load More
            </button>
          </div>
      </div>
    </section>
  );
};

export default RentalCardGrid;
