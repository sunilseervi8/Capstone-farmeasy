import { useEffect, useState } from "react";
import { GetAllRentals } from "../../../Service/RentalService";
import AddRentalsModel from './AddRentalsModel';
import RentalsCard from './RentalsCard';
import { Grid } from '@mui/material';
import Spinner from '../../Features/Spinner/Spinner';
import toast from 'react-hot-toast';
import {RentalData as Rent} from '../../../Models/ProductsModel'

const RentGrid: React.FC = () => {
  const [rental, setRental] = useState<Rent[]>([]);
  // Initialize with an empty array
  const [loading, setLoading] = useState(true);

  // Fetch data from server and set the rental state
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const serverRentals: Rent[] = await GetAllRentals();
        setRental(serverRentals); // Use only server data
      } catch (error) {
        toast.error(`Error fetching rentals: ${error}`);
      } finally {
        setLoading(false)
      }
    };

    fetchRentals(); // Call the async function
  }, []);

  return (
    <>
      {/* Spinner added for the fetch time from server  */}
      {
        loading ? (
          <Spinner imageUrl="Videos/Spinner2.gif" altText="Loading content..." />
        ) : (
          <>
            <div className="min-h-screen bg-[#E0F2FE] p-8">
              <Grid className="text-center mb-8">
                <h1 className="text-4xl font-bold text-[#000d6b]">Rental Products</h1>
              </Grid >
              {/* dialog box for adding rentals presented as a + icon */}
              <div className="mb-10">
                <AddRentalsModel />
                {/* Pass the combined rental data to the RentalsCard component */}
                <div className="mt-[60px]">
                  <RentalsCard rentalsData={rental} />
                </div>
              </div>
            </div >
          </>
        )}
    </>
  );
};

export default RentGrid;
