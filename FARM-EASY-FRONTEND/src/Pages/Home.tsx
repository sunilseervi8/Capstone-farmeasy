import { useEffect, useState } from 'react';
import { getAllProducts } from '../Service/Productservice';
import { GetAllCrops } from '../Service/CropService';
import { GetAllRentals } from '../Service/RentalService';
import VisionMision from '../Components/Home/VisionMision';
import FloatingWhatsAppButton from '../Components/Home/FloatingWhatsAppButton';
import Hero from '../Components/Home/HeroSection';
import ProductPage from '../Components/Home/HomeCardSections/HomeProduct'
import CardGrid from '../Components/Home/HomeCardSections/HomeCrops';
import RentalCard from '../Components/Home/HomeCardSections/HomeRental';
import Footer from '../Components/Navigation/Footer';
import Spinner from '../Components/Features/Spinner/Spinner';
import { Product, Crop, Rental } from '../Models/ProductsModel'

//Home Component
const Home = () => {

  //State to manage Product, Crop, Rental Card Detaila in the Home page.
  const [productData, setProductData] = useState<Product[]>([]);
  const [cropsData, setCropsData] = useState<Crop[]>([]);
  const [rentalData, setRentalData] = useState<Rental[]>([]);
  // For the Spinner to manage wheather the data i sloaded or not.
  const [loading, setLoading] = useState(true);
  // UseEffect for seting the value for every change back to the state.

  useEffect(() => {
    // Define an asynchronous function to fetch data from multiple sources
    const fetchData = async () => {
      try {
        // Fetch product, crop, and rental data concurrently using Promise.all
        const [productData, cropData, rentalData] = await Promise.all([
          getAllProducts(),  // Fetch all products
          GetAllCrops(),     // Fetch all crops
          GetAllRentals(),   // Fetch all rentals
        ]);

        // Update the component's state with the fetched data
        setProductData(productData);  // Set the product data state
        setCropsData(cropData);       // Set the crops data state
        setRentalData(rentalData);    // Set the rental data state
      } catch (error) {
        // Log an error message if any of the data fetches fail
        console.error('Failed to fetch products:', error);
      } finally {
        // Set loading state to false after the data fetch attempt, regardless of success or failure
        setLoading(false);
      }
    };
    // Invoke the fetchData function to initiate data fetching
    fetchData();
  }, []);  // Empty dependency array to run this effect only once when the component mounts



  return (
    <>
      {loading ? (
        <Spinner imageUrl="Videos/Spinner2.gif" altText="Loading content..." />
      ) : (
        <div>
          {/* Coresoul section */}
          <Hero />
          {/* Floating whatsapp */}
          <FloatingWhatsAppButton />
          {/* Vision Mission section */}
          <VisionMision />
          {/* All th ecard for the diisplaying the data from */}
          <ProductPage productData={productData} />
          <CardGrid cropData={cropsData} />
          <RentalCard rentalData={rentalData} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
