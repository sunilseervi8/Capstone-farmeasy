import  { useState } from "react";
import {  useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store'; // Import the Redux store
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import ContactSupplier from "./ContactSuplier-1"; // Import the ContactSupplier component
import {Crop as CropData} from '../../../Models/ProductsModel'

const CropsCard = ({ cropsData }: { cropsData: CropData[] }) => {
  const [open, setOpen] = useState(false); // Modal state
  const [selectedCrop, setSelectedCrop] = useState({
    name: "",
    imageUrl: "",
    supplierId:""
   
  }); // Store selected crop's name and image URL

  // Get user authentication state
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate(); // Initialize useNavigate
  const userId = user?.user_id; // Assuming the user's ID is stored in user.id

  // Open/Close modal handlers
  const handleOpenModal = (cropName: string, imageUrl: string,supplierId:any) => {
    setSelectedCrop({ name: cropName, imageUrl,supplierId }); // Set crop name and image URL
    setOpen(true); // Open modal
  };

  const handleCloseModal = () => setOpen(false); // Close modal
  // Function to handle contact supplier click
  const handleContactSupplierClick = (cropName: string, imageUrl: string, supplierId: any) => {
    if (isAuthenticated) {
      if (supplierId === userId) {
        // Prevent opening modal or redirecting if supplier ID matches the logged-in user ID
        alert("You cannot contact yourself.");
      } else {
        console.log("asdfg",supplierId)
        handleOpenModal(cropName, imageUrl,supplierId); // Open modal if not the same ID
      }
    } else {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  };

  // Filter out crops belonging to the logged-in user
  const filteredCropsData = cropsData.filter(crop => crop.user_id !== userId);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCropsData.map((crop, index) => (
          <div key={index}
            className="shadow-lg rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition duration-300" >
            {/* Unique Image Section */}
            <div className="relative group">
              <img
                src={crop.imageUrl}
                alt={crop.name}
                className="w-full h-44 p-4 rounded-t-lg transform transition-transform duration-500 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-bold">{crop.name}</p>
                <p className="text-sm">{crop.quantity} {crop.unit}</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{crop.name}</h3>
              {/* Price and Quantity */}
              <p className="text-lg font-semibold text-green-600 mb-1">
                INR. {crop.price} {crop.currency}
              </p>
              <p className="text-sm text-gray-500">Quantity: {crop.quantity} {crop.unit}</p>

              {/* Contact Supplier Button */}
              <button
                className="mt-3 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
                onClick={() => handleContactSupplierClick(crop.name, crop.imageUrl, crop.user_id)} // Pass supplier ID
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6V5a2 2 0 10-4 0v9m0 4h10m0 0l-2 2m2-2l-2-2"
                  />
                </svg>
                Contact Supplier
              </button>
            </div>
          </div>
        ))}

        {/* Render the modal */}
        <ContactSupplier
          open={open}
          handleClose={handleCloseModal}
          cropName={selectedCrop.name}
          imageUrl={selectedCrop.imageUrl}
          supplierId={selectedCrop.supplierId}

           // Pass the image URL to the modal
        />
      </div>
    </>
  );
};

export default CropsCard;