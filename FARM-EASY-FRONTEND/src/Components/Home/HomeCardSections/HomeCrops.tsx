// Define Crop type
interface Crop {
    price: any;
    currency: any;
    name: string;
    quantity: string;
    unit: string;
    imageUrl: string;
    category: string;
    user_id: any;
  }
  
  // Import necessary libraries
  import React, { useState } from 'react';
import { useNavigate } from 'react-router';
 
  const CardGrid: React.FC<{ cropData: Crop[] }> = ({ cropData }) => {
    const [visibleCards] = useState(3);
    const navigate = useNavigate();
  
    const loadMoreCards = () => {
      navigate('/crops');
      
    };
  
    // Function to truncate the crop name if it's too long
    const truncateText = (text: string, maxLength: number) => {
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };
  
    return (
      <section className="py-12 w-full bg-white relative"> {/* Updated bg-color to white */}
      <div className="flex items-center justify-center mb-6">
      <h2 className="text-4xl font-bold text-txt-blue">Product-Crops</h2>
        </div>
        <div className="container bg-white mx-auto px-4">
          {/* Cards Grid */}
          <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cropData.slice(0, visibleCards).map((crop, index) => (
              <div
                key={index}
                onClick={() => alert(`Navigating to ${crop.name}`)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                {/* Crop Image */}
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  className="w-full h-48 object-cover"
                />
  
                <div className="p-6 relative">
                  {/* Date Placeholder and Like Button */}
                  <div className="flex justify-between items-center">
                    <span className="block text-sm text-txt-blue">
                      {crop.category}
                    </span>
                  </div>
  
                  {/* Truncated Title with Smaller Font Size */}
                  <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    {truncateText(crop.name, 26)} {/* Limit to 26 characters */}
                  </h3>
  
                  {/* Price and Quantity Details */}
                  <div className="flex justify-between mt-3 text-grey-700 text-sm">
                    <span className="flex items-center">
                      Price: {crop.price} {crop.currency}
                    </span>
                    <span className="flex items-center ml-4">
                      Quantity: {crop.quantity} {crop.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Load More Button */}
            <div className="absolute bottom-0 right-0 mb-8 mr-8">
              <button
                onClick={loadMoreCards}
                className="px-8 py-3 bg-custom-blue text-white rounded-full hover:bg-hover-blue transition duration-300"
              >
                Load More
              </button>
            </div>
        </div>
      </section>
    );
  };
  
  export default CardGrid;
  