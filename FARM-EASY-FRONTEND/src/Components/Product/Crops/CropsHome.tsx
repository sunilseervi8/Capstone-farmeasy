import React, { useState, useEffect } from 'react';
import './Crops.css';
import CropsCard from './CropsCard';
import AddCropModel from './AddCropsModel';
import { Grid } from '@mui/material';
import { GetAllCrops } from '../../../Service/CropService';
import Spinner from '../../Features/Spinner/Spinner';


// Define Crop type
interface Crop {
  price: any;
  currency: any;
  name: string;
  quantity: string;
  unit: string;
  imageUrl: string;
  category: string;
  user_id:any; // Added category field
}

const CropGrid: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]); // Remove localCrops, initialize with empty array
  const [selectedCategory, setSelectedCategory] = useState<string>('Food Grains'); // State to track selected category
  const [loading, setLoading] = useState(true);

  // Fetch data from server
  useEffect(() => {
    GetAllCrops()
      .then((serverCrops: Crop[]) => {
        setCrops(serverCrops); // Set the data from the server
      })
      .catch((error) => {
        console.error('Error fetching crops:', error);
      }).finally(() => {
        setLoading(false);
      })
  }, []);

  // Filter crops based on selected category
  const filteredCrops = crops.filter((crop) => crop.category === selectedCategory);

  return (
    <>
    { loading?(
      <Spinner imageUrl = "Videos/Spinner2.gif" altText = "Loading content..." />
    ): (
    <div className="min-h-screen w-full bg-[#E0F2FE] p-8">
      <div className="max-w-full mx-auto">
        <Grid className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#000d6b]">Crop Production</h1>
        </Grid>

        {/* Floating AddCropModel button in the bottom-right corner */}
        <div className="fixed bottom-8 right-8 z-30">
          <button>
            <AddCropModel />
          </button>
        </div>

        {/* Navigation buttons */}
        <Grid className="text-center mb-10">
          <div className="button-group flex justify-center space-x-6">
            <Grid>
              <button
                className={`px-6 py-3 rounded-full text-lg font-semibold ${
                  selectedCategory === 'Commercial Crops' ? 'bg-[#000d6b] text-white' : 'bg-white text-[#000d6b] border border-[#000d6b]'
                } hover:bg-[#000d6b] hover:text-white transition-all`}
                onClick={() => setSelectedCategory('Commercial Crops')}
              >
                COMMERCIAL CROPS
              </button>
            </Grid>
            <Grid>
              <button
                className={`px-6 py-3 rounded-full text-lg font-semibold ${
                  selectedCategory === 'Food Grains' ? 'bg-[#000d6b] text-white' : 'bg-white text-[#000d6b] border border-[#000d6b]'
                } hover:bg-[#000d6b] hover:text-white transition-all`}
                onClick={() => setSelectedCategory('Food Grains')}
              >
                FOOD GRAINS
              </button>
            </Grid>
            <Grid>
              <button
                className={`px-6 py-3 rounded-full text-lg font-semibold ${
                  selectedCategory === 'Oil Seeds' ? 'bg-[#000d6b] text-white' : 'bg-white text-[#000d6b] border border-[#000d6b]'
                } hover:bg-[#000d6b] hover:text-white transition-all`}
                onClick={() => setSelectedCategory('Oil Seeds')}
              >
                OIL SEEDS
              </button>
            </Grid>
          </div>
        </Grid>

        {/* Pass the filtered crops data to the CropsCard component */}
        <CropsCard cropsData={filteredCrops} />
      </div>
    </div>
    )}
    </>
    
  );
};

export default CropGrid;
