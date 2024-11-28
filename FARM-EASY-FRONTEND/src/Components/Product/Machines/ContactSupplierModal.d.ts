import React from "react";
import "react-toastify/dist/ReactToastify.css";
interface ContactSupplierModalProps {
    open: boolean;
    onClose: () => void;
    product: {
        productName: string;
        productDescription: string;
        productPrice: string;
        sellerId: string;
        datePosted: string;
        productImageUrl: string;
        productcategory: string;
    };
    onConfirm: () => void;
}
declare const ContactSupplierModal: React.FC<ContactSupplierModalProps>;
export default ContactSupplierModal;
