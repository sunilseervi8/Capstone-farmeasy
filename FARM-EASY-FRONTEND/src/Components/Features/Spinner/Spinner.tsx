import React from 'react';

interface SpinnerProps {
    imageUrl: string;
    altText?: string;
  }

const Spinner: React.FC<SpinnerProps>  = ({ imageUrl, altText = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img 
        src={imageUrl} 
        alt={altText} 
        className="w-50 h-28" 
      />
    </div>
  );
};

export default Spinner;
