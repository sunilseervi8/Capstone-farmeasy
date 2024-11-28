import React from 'react';
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
declare const ProductPage: React.FC;
export default ProductPage;
