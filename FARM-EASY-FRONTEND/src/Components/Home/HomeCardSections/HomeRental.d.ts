import React from 'react';
interface Rental {
    rentalId: string;
    rentalTitle: string;
    rentalDescription: string;
    rentalPrice: number;
    image: string;
}
declare const RentalCardGrid: React.FC<{
    rentalData: Rental[];
}>;
export default RentalCardGrid;
