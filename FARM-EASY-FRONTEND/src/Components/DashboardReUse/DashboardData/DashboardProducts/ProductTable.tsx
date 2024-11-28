import React from 'react';
import { Product } from './ProductPage'; // Ensure Product interface is imported
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ProductTableProps {
  products: Product[];
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase">Product Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase">Description</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase">Price</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase">Date Posted</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase">Category</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{product.productName}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{product.productDescription.substring(0,25)}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{product.productPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                {new Date(product.productDatePosted).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{product.productcategory}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                <button
                  onClick={() => onEdit(product.productId)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(product.productId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
