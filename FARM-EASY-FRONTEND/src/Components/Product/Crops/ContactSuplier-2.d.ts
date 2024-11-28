import React from "react";
import { FormData } from '../../../Models/ProductsModel';
interface OrderDetailsStepProps {
    open: boolean;
    handleClose: () => void;
    handlePrevious: () => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
declare const OrderDetailsStep: React.FC<OrderDetailsStepProps>;
export default OrderDetailsStep;
