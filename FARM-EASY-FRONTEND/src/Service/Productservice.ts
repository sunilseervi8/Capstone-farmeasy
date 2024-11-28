import axios from "axios";
import { generateImageUrl } from './ImageUrlService';

//POST method for product
import toast from "react-hot-toast"
const _url = import.meta.env.VITE_API_URL;
export const product = async (productdata: any) => {
  console.log(productdata)
  try {

     const imageUrlFromCloud = await generateImageUrl(productdata.image);
     console.log(productdata.sellerId);
    const response = await axios.post(`${_url}/Product`, {
      productName: productdata.productName,
      productDescription: productdata.productDescription,
      productPrice: productdata.productPrice,
      productImageUrl:imageUrlFromCloud,
      productcategory: productdata.productcategory,
      sellerId:productdata.sellerId
       });
    console.log("response", response.data, "response", response);
    console.log(_url);
    toast.success("Added Successfully")

    // return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//get all product sellerid
export const getAllProductBy = async (sellerId: any) => {
  try {
    const response = await axios.get(`${_url}/Product/Seller/${sellerId}`);

    return response.data;
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching products by SellerId:', error);
    throw error;
  }
};

// GET method for fetching all products
 export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${_url}/Product`);

    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }

};
 
export const sendEmailToSupplier = async (email: any, message: string) => {
  try {
    console.log(email,message)
    // Send POST request to the server
    const response = await axios.post(`${_url}/Crops/send-to-supplier`, { email,message,},
       {
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


