import React from 'react';
import { Product } from './ProductPage';
interface ProductTableProps {
    products: Product[];
    onEdit: (productId: string) => void;
    onDelete: (productId: string) => void;
}
declare const ProductTable: React.FC<ProductTableProps>;
export default ProductTable;
