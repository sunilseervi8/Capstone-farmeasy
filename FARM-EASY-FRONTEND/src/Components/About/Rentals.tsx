import './About.css'
import  { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MachineryRentalSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800 }); // Animation duration set to 1000ms
  }, []);
  return (

    <div className="bg-gray-100 pt-20 pb-28 px-4 mb-42 text-center custom-background-image">
      <div className="flex justify-center items-center mt-4" >
        {/* FOr the icon that one file and the back icon */}
        <div className="bg-custom-blue rounded-full p-4">
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-10 w-10 text-white" >
            {/* Replace with your desired icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h1l1-2h4l1 2h9v9H3V10z" />
          </svg>
        </div>
      </div>

      <h2 className="text-3xl   font-bold mb-2" data-aos="fade-up">
        Rent Machinery for Your Farm
      </h2>

      <p className="text-lg mb-6" data-aos="fade-up" data-aos-delay="100">
        Choose the best rental options for your farm needs, with or without additional resources.
      </p>

      <div className="flex  flex-col md:flex-row justify-center gap-6">
        {/* Machinery Only */}
        <div className="border-2 border-blue-950 rounded-lg p-6 w-full md:w-72 custom-rental-bg" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl font-semibold mb-4">Machinery Only</h3>
          <p className="text-lg mb-4">
            Access a variety of machinery for your farm without the need for additional operators or resources.
          </p>
          <button className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-950 transition duration-300">
            Discover Options
          </button>
        </div>

        {/* Machinery + Driver */}
        <div className="border-2 border-blue-950 rounded-lg p-6 w-full md:w-72 custom-rental-bg" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-2xl font-semibold mb-4">Rental </h3>
          <p className="text-lg mb-4">
            Rent machinery with  additional resources for hassle-free operations.
          </p>
          <button className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-950 transition duration-300">
            Explore Services
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default MachineryRentalSection;
