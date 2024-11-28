import React from "react";
interface RequirementModalProps {
    open: boolean;
    handleClose: () => void;
    cropName: string;
    imageUrl: string;
    supplierId: string;
}
declare const ContactSupplier: React.FC<RequirementModalProps>;
export default ContactSupplier;
