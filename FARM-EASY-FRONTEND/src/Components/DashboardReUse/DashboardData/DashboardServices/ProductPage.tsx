import React, { useEffect, useState } from 'react';
import ProductTable from '../DashboardProducts/ProductTable';
import { getAllProducts, getAllProductBy } from '../../../../Service/Productservice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

export interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  sellerId: string;
  productDatePosted: string;
  productImageUrl: string;
  productcategory: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user?.role === 'admin') {
          const data = await getAllProducts();
          setProducts(data);
        } else if (user?.user_id) {
          const data = await getAllProductBy(user.user_id);
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    if (isAuthenticated) {
      fetchProducts();
    }
  }, [user, isAuthenticated]);

  // Edit handler
  const handleEdit = (productId: string) => {
    console.log('Edit product with ID:', productId);
    // Add edit logic here (e.g., open edit form)
  };

  // Delete handler
  const handleDelete = async (productId: string) => {
    console.log('Delete product with ID:', productId);
    // Add delete logic here (e.g., call a service to delete product)
    // Optionally, update the product list state after deletion
    setProducts((prevProducts) => prevProducts.filter(product => product.productId !== productId));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ProductPage;
