import VideoBanner from '../Components/About/VideoBanner';
import Support from '../Components/About/Suppport';
import MachineryRentalSection from '../Components/About/Rentals';
import Equipments from '../Components/About/Seller';
import Footer from '../Components/Navigation/Footer'
import { useEffect, useState } from 'react';
import Spinner from '../Components/Features/Spinner/Spinner';

export default function about() {
  const [loading, setLoading] = useState<boolean>(true);  

  // For AOS Animation 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);

  return (
    <>
      {loading ? (
        <Spinner imageUrl="Videos/Spinner4.gif" altText="Loading content..." />
      ) : (
        <div>
          {/* Video Section */}
          <VideoBanner />
          {/* What we offer*/}
          <Support />
          {/* Section for the rentals */}
          <MachineryRentalSection />
          {/* selling */}
          <Equipments />
          {/* Footerb Section */}
          <Footer />
        </div>
      )
      }
    </>
  );
}
