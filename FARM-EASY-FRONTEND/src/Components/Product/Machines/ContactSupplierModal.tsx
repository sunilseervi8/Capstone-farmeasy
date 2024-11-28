import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { getUserById } from "../../../Service/AccountService";
import { sendEmailToSupplier } from "../../../Service/Productservice";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { ToastContainer, toast } from "react-toastify";
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

const ContactSupplierModal: React.FC<ContactSupplierModalProps> = ({ open, onClose, product, onConfirm }) => {
  const email = useSelector((state: RootState) => state.auth?.user?.email);
  const [seller, setSeller] = useState<string | undefined>();
  const [sellerEmail , setSellerEmail] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await getUserById(product.sellerId);
      console.log(res);
      setSellerEmail(res?.email);
      setSeller(res.fullName);
    };
    if (product.sellerId) {
      getData();
    }
  }, [product.sellerId]);

  const handleSendInquiry = async () => {
    const buyermessage = `For further contact, please reach out via email: ${sellerEmail}
    and let me know if we can proceed with the order confirmation.`;

      const sellermessage = `I'M interested in your product: ${product.productName}, category: ${product.productcategory}
    For further contact, please reach out via email: ${email}.`;
    try {
      await sendEmailToSupplier(email, buyermessage);

      await sendEmailToSupplier(sellerEmail, sellermessage);

      toast.success("Inquiry sent successfully!");
      handleConfirm();
    } catch (err) {
      toast.error("Failed to send inquiry.");
      console.error(err);
    }
    
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Supplier</DialogTitle>
        <DialogContent>
          <img src={product.productImageUrl} alt={product.productName} className="w-full h-60 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-bold mb-2">{product.productName}</h3>
          <p className="text-gray-600 mb-2">Category: {product.productcategory}</p>
          <p className="text-xl text-green-700 font-semibold mb-2">Price: INR.{product.productPrice}</p>
          <p className="text-gray-600 mb-4">Posted by Seller: {seller}</p>
          <p className="text-gray-600 mb-4">{product.productDescription}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSendInquiry} variant="contained" color="primary">
            Send Inquiry
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactSupplierModal;
