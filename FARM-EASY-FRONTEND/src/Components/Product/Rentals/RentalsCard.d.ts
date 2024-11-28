import React from 'react';
import { RentalData as Rental } from '../../../Models/ProductsModel';
interface RentalsCardProps {
    rentalsData: Rental[];
}
declare const RentalsCard: React.FC<RentalsCardProps>;
export default RentalsCard;
