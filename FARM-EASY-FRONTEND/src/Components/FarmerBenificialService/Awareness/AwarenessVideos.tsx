import { useState, useEffect } from 'react';
import VideoCards from './VideoCards'; 

const FarmingCourses = () => {
  // State to keep track of the active card and active button
  const [activeButton, setActiveButton] = useState<number | null>(1);
   const [query, setQuery] = useState<string>('Farming Machineries'); 

  const handleButtonClick = (index: number, newQuery: string) => {
    setActiveButton(index); 
    setQuery(newQuery); 
  };

  useEffect(() => {
    console.log(`Query updated: ${query}`);
  }, [query]); 

  return (
    <div className="bg-white text-gray-900 p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl  text-txt-blue font-bold">Unlock the Power of Modern Farming</h1>
        <p className="text-lg mt-2">Learn to Revolutionize Agriculture with the Latest Technology</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`py-2 px-4 rounded-full transition-transform duration-300 ${
            activeButton === 1 ? 'bg-blue-100 transform scale-105 text-txt-blue font-bold' : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleButtonClick(1, 'Farming Machineries using Techniques ')}
        >
          Machines
        </button>
        <button
          className={`py-2 px-4 rounded-full transition-transform duration-300 ${
            activeButton === 2 ? 'bg-blue-100 transform scale-105 text-txt-blue font-bold' : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleButtonClick(2,'Modern Farming Techniques')}
        >
          Crops
        </button>
        <button
          className={`py-2 px-4 rounded-full transition-transform duration-300 ${
            activeButton === 3 ? 'bg-blue-100 transform scale-105 text-txt-blue font-bold' : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleButtonClick(3, 'Loans For Farmers')}
        >
          Loan
        </button>
        <button
          className={`py-2 px-4 rounded-full transition-transform duration-300 ${
            activeButton === 4 ? 'bg-blue-100 transform scale-105 text-txt-blue' : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleButtonClick(4,' Insurance For Farmers')}
        >
          Insurance
        </button>
      </div>


      {/* Video Cards Section */}
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center">{query}</h1>
        <VideoCards query={query} /> {/* Pass the updated query to VideoCards */}
      </div>
    </div>
  );
};

export default FarmingCourses;
