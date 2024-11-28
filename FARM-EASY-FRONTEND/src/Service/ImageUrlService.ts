import axios from "axios";
const _url=import.meta.env.VITE_API_URL
console.log(_url)

     export const generateImageUrl = async (imageFile: File): Promise<string> => {
       
        try {
          const response = await axios.post(`${_url}/Cloud/upload`,{ 'file':imageFile}, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          return response.data.url; 
      console.log('file',response.data.url)

        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
     }
    };
