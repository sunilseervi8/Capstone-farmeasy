import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const OfferSection: React.FC = () => {
  
  // Initialize AOS (Animate On Scroll) library with a duration of 1000ms (1s) when the component mounts
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    // Main container for the Offer Section with top and bottom padding and margin
    <div className="h-auto p-12 mt-24 mb-24">
      {/* Heading with animation effect */}
      <h1 className="text-2xl font-semibold uppercase text-center" data-aos="fade-up">
        What we offer
      </h1>
      {/* Subtitle text with slight delay on animation */}
      <p className="text-lg text-center mb-12 mt-3 opacity-90" data-aos="fade-up" data-aos-delay="200">
        Being a part of Farm Easy, this is what you get from us:
      </p>

      {/* Responsive grid to display four offer items in a row on larger screens and adjust to fewer columns on smaller screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
        
        {/* First offer item with fade-in effect from the right */}
        <div className="supportItem bg-white shadow-lg p-9 rounded-2xl" data-aos="fade-right">
          {/* Icon for the first offer */}
          <img className="supportImg w-20 mx-auto" src='Images/Vector11.png' alt="Customer Support" />
          {/* Title for the first offer */}
          <h3 className="text-xl mb-1 text-center font-semibold mt-5">
            24*7 customer support
          </h3>
          {/* Description for the first offer */}
          <p className="text-md text-center font-normal">
            We’re just one call away.
          </p>
        </div>

        {/* Second offer item with fade-in effect from the left and slight delay */}
        <div className="supportItem bg-white shadow-lg p-9 rounded-2xl" data-aos="fade-right"
         data-aos-delay="100">
          {/* Icon for the second offer */}
          <img className="SupportImg w-20 mx-auto" src='Images/Vector22.png' alt="Trusted Sellers/Buyers" />
          {/* Title for the second offer */}
          <h3 className="text-xl mb-1 text-center font-semibold mt-5">
            Trusted Sellers/Buyers
          </h3>
          {/* Description for the second offer */}
          <p className="text-md text-center font-normal">
            Your safety is our priority.
          </p>
        </div>

        {/* Third offer item with fade-in effect from the right and additional delay */}
        <div className="supportItem bg-white shadow-lg p-9 rounded-2xl" data-aos="fade-right"
         data-aos-delay="200">
          {/* Icon for the third offer */}
          <img className="SupportImg w-20 mx-auto" src='Images/Vector33.png' alt="One-click Booking"/>
          {/* Title for the third offer */}
          <h3 className="text-xl mb-1 text-center font-semibold mt-5">
            One-click Booking
          </h3>
          {/* Description for the third offer */}
          <p className="text-md text-center font-normal">
            Bookings made easy and fast.
          </p>
        </div>

        {/* Fourth offer item with fade-in effect from the left and maximum delay */}
        <div className="supportItem bg-white shadow-lg p-9 rounded-2xl" data-aos="fade-right" 
        data-aos-delay="300">
          {/* Icon for the fourth offer */}
          <img className="SupportImg w-20 mx-auto" src='Images/Vector44.png' alt="Wide Network" />
          {/* Title for the fourth offer */}
          <h3 className="text-xl mb-1 text-center font-semibold mt-5">
            Easy Rental
          </h3>
          {/* Description for the fourth offer */}
          <p className="text-md text-center font-normal">
            Rent high-quality agricultural machinery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
