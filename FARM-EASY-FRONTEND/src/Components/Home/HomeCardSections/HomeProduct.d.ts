import React from 'react';
declare const CardGrid: React.FC<{
    productData: {
        productName: string;
        productDescription: string;
        productPrice: string;
        sellerId: string;
        productDatePosted: string;
        productImageUrl: string;
        productCategory: string;
        ProductStock: number;
    }[];
}>;
export default CardGrid;
