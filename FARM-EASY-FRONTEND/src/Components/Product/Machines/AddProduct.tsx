import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { product } from '../../../Service/Productservice'; // Assuming this is the correct service for adding products
import {  useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
interface ProductFormValues {
  productName: string;
  productDescription: string;
  productPrice: string; // Fixed type here
  productcategory: string;
  sellerId: string; // Assign correct type
  image: File | null;
}

const AddProductForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(''); // State for image preview
 
  const category = [
    'Select',
    'Tractors',
    'Tillage Equipment',
    'Seeding Equipment',
    'Landscape',
    'Crop Protection',
    'Harvest Equipment',
    'Post Harvest',
    'Haulage',
  ];
  const{ user } = useSelector((state: RootState) => state.auth);
  const userId = user?.user_id;
  console.log(userId);

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      productName: '',
      productDescription: '',
      productPrice: '',
      productcategory: 'Select',
      sellerId: userId || '1', // Initialize seller ID properly
      image: null, // Initial value for the image file
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product Name is required'),
      productDescription: Yup.string(),
      productPrice: Yup.number().required('Product Price is required').typeError('Product Price must be a number'),
      image: Yup.mixed().required('Image is required'),
      sellerId: Yup.string(),
      productcategory: Yup.string().required('Product Category is required').notOneOf(['Select'], 'Please select a category'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Form Submitted:', values);
      product(values); // Send the form data instead of values
      resetForm();
      setImagePreview(''); // Reset the image preview


    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set image preview URL
        formik.setFieldValue('image', file); // Set the file into Formik field
      };
      reader.readAsDataURL(file); // Read file as data URL to display the preview
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center">Add New Product</h2>

        {/* Product Name */}
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formik.touched.productName && formik.errors.productName ? (
            <div className="text-red-600 text-sm">{formik.errors.productName}</div>
          ) : null}
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productDescription}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          ></textarea>
          {formik.touched.productDescription && formik.errors.productDescription ? (
            <div className="text-red-500 text-sm">{formik.errors.productDescription}</div>
          ) : null}
        </div>

        {/* Product Price */}
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productPrice}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formik.touched.productPrice && formik.errors.productPrice ? (
            <div className="text-red-600 text-sm">{formik.errors.productPrice}</div>
          ) : null}
        </div>

        {/* Product Category */}
        <div>
          <label htmlFor="productcategory" className="block text-sm font-medium text-gray-700">
            Product Category
          </label>
          <select
            id="productcategory"
            name="productcategory"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productcategory}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            {category.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {formik.touched.productcategory && formik.errors.productcategory ? (
            <div className="text-red-600 text-sm">{formik.errors.productcategory}</div>
          ) : null}
        </div>

        {/* Display Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview as string} alt="Preview" className="h-32 w-32 object-cover rounded-md shadow-md" />
          </div>
        )}

        {/* Upload Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <label className="border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-md p-4 flex justify-center items-center cursor-pointer transition-colors duration-200 ease-in-out">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-center">
              <span className="block text-lg">🖼️</span>
              <span className="mt-2">Upload Image</span>
            </div>
          </label>
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-custom-blue text-white font-bold rounded-md hover:bg-hover-blue focus:outline-none"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
