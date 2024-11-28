import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RootState } from '../../../../Redux/Store';
import { useSelector } from 'react-redux';

interface Crop {
  id: number;
  user_id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  imageUrl: string;
}
const CropTable: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const buttonEnable = user?.role.includes("buyer");

  // Fetch the list of crops
  useEffect(() => {
    axios.get('https://localhost:8003/api/Crops')
      .then(response => {
        setCrops(response.data);
      })
      .catch(error => {
        console.error('Error fetching crops:', error);
      });
  }, []);

  // Handle Edit action
  const handleEdit = (id: number) => {
    // Logic for edit (e.g., navigate to edit page or open modal)
    console.log('Edit crop with ID:', id);
  };

  // Handle Delete action
  const handleDelete = (id: number) => {
    // Logic for delete (e.g., confirm delete and send delete request)
    console.log('Delete crop with ID:', id);
    axios.delete(`https://localhost:8003/api/Crops/${id}`)
      .then(() => {
        setCrops(prevCrops => prevCrops.filter(crop => crop.id !== id));
      })
      .catch(error => {
        console.error('Error deleting crop:', error);
      });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center mt-10">Crop List</h1>    <div className="container mx-auto p-4">

        <table className="w-full table-auto border-collapse border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border-b border-gray-200">Image</th>
              <th className="p-4 border-b border-gray-200">Name</th>
              <th className="p-4 border-b border-gray-200">Category</th>
              <th className="p-4 border-b border-gray-200">Quantity</th>
              <th className="p-4 border-b border-gray-200">Unit</th>
              <th className="p-4 border-b border-gray-200">Price</th>
              {
                    !buttonEnable && (<><th className="p-4 border-b border-gray-200">Actions</th></>)}
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop.id} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-200">
                  <img src={crop.imageUrl} alt={crop.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4 border-b border-gray-200">{crop.name}</td>
                <td className="p-4 border-b border-gray-200">{crop.category}</td>
                <td className="p-4 border-b border-gray-200">{crop.quantity}</td>
                <td className="p-4 border-b border-gray-200">{crop.unit}</td>
                <td className="p-4 border-b border-gray-200">INR{crop.price}</td>
                <td className="p-4 border-b border-gray-200">

                  {
                    !buttonEnable && (<><button
                      onClick={() => handleEdit(crop.id)}
                      className="text-blue-500 hover:text-blue-700 font-semibold mr-4"
                    >
                      Edit
                    </button>
                      <button
                        onClick={() => handleDelete(crop.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button></>)
                  }

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  );
};

export default CropTable;

