import axios from 'axios'
import { generateImageUrl } from './ImageUrlService';

const _url=import.meta.env.VITE_API_URL;
console.log(_url)
export const addCrop = async (crops: any) => {
    try {
      const imageUrlFromCloud = await generateImageUrl(crops.image);
      console.log(imageUrlFromCloud)
      const response = await axios.post(`${_url}/Crops`, {
        user_id: crops.user_id,
        Name: crops.cropName,
        Category: crops.category,
        Quantity: crops.quantity,
        Unit: crops.unit,
        Price: crops.price,
        ImageUrl: imageUrlFromCloud, 
      });
      console.log('Crop data posted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding crop:', error);
      throw error;
    }
   
}
export const GetAllCrops=async ()=>{
  try {
    const response = await axios.get(`${_url}/Crops`); 
    console.log("Fetched all Crops:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all Crops:", error);
    throw error;
  }
}
 


export const sendEmailToSupplier = async (email: string, message: string) => {
  try {
    console.log(email,message)
    // Send POST request to the server
    const response = await axios.post(`${_url}/Crops/send-to-supplier`, {
      email,
      message,
    }, {
      headers: {
        'Content-Type': 'application/json', // Explicitly set content type
      },
    });

    // Log and return success response data
    console.log("Response from server:", response.data);
    return response.data;
  } catch (error: any) {
    // Log error response or message if request fails
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }

    // Re-throw error to handle it in the calling function if needed
    throw error;
  }
};