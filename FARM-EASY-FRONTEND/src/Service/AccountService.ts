import axios from "axios";
import { generateImageUrl } from "./ImageUrlService";

// Account servivce api gateway
const _url = import.meta.env.VITE_API_URL;
// Registration
export const registerUser = (user: any): Promise<any> => {
  console.log("user account", _url);
  return axios
    .post(`${_url}/Account/register`, {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      role: user.role,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

//login
export const loginUser = async (user: any): Promise<any> => {
  console.log("Logging in user", user);
  return await axios
    .post(`${_url}/Account/login`, {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      throw error;
    });
};

//forgot password
export const forgotPassword = async (email: any): Promise<any> => {
  console.log(email);
  return await axios
    .post(`${_url}/Account/forgot-password?email=${email}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error logging in:", error);
      throw error;
    });
};

// Function to reset the password by sending a POST request
export const resetPassword = async (data: any) => {
  try {
    const response = await axios.post(`${_url}/Account/reset-password`, {
      email: data.email,
      Token: data.token.replace(/\s/g, "+"),
      newPassword: data.newPassword,
    }); // Replace with your backend API URL
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface GoogleUserData {
  name: any;
  email: string;
  profileUrl: string;
}

export const sendGoogleDataToBackend = (googleUserData: GoogleUserData) => {
  return axios
    .post("https://localhost:8000/api/GoogleOuath/google-ouath", {
      fullName: googleUserData.name,
      email: googleUserData.email,
      ProfileImage: googleUserData.profileUrl,
      role: "buyer",
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error); // Return rejected promise to handle error
    });
};

// Function to get user details by ID
export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${_url}/Account/user/${userId}`);
    return response.data; // Assuming response.data contains the user details
  } catch (error) {
    throw new Error("Error fetching user details");
  }
};

//function to request to be seller
export const requestSellerRole = async (userId: string) => {
  try {
    const response = await axios.post(
      `https://localhost:8000/api/Account/request-seller-role/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//for the location update
export const updateUserLocation = async (
    userId: any,
    locationData: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
) => {
  try {
    const response = await axios.put(
      `https://localhost:8000/api/Account/update-location/${userId}`,
      locationData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user location");
  }
};

//update the profileimage
export const updateProfileImage = async (userId: any, image: File) => {
  // Assume generateImageUrl uploads the image and returns the URL
  const imageUrlFromCloud = await generateImageUrl(image);
  // Make a POST request with `userId` in the URL path and `profileImg` as a query parameter
  const response = await axios.post(
    `https://localhost:8000/api/Account/update-profile-image/${userId}`,
    null,
    {
      params: {
        profileImg: imageUrlFromCloud, // Send the image URL as a query parameter
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to update profile picture");
  }
  return response.data;
};
