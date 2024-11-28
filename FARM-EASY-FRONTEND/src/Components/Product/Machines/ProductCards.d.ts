import React from "react";
interface productData {
    productName: string;
    productDescription: string;
    productPrice: string;
    sellerId: string;
    datePosted: string;
    productImageUrl: string;
    productcategory: string;
}
declare const ProductCards: React.FC<{
    productData: productData[];
}>;
export default ProductCards;
