interface Crop {
    price: any;
    currency: any;
    name: string;
    quantity: string;
    unit: string;
    imageUrl: string;
    category: string;
    user_id: any;
}
import React from 'react';
declare const CardGrid: React.FC<{
    cropData: Crop[];
}>;
export default CardGrid;
