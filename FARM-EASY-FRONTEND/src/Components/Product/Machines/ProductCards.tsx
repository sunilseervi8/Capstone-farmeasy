import React, { useState } from "react";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import ContactSupplierModal from "./ContactSupplierModal";

interface productData{
  productName: string;
  productDescription: string;
  productPrice: string;
  sellerId: string;
  datePosted: string;
  productImageUrl: string;
  productcategory: string;
}

const ProductCards: React.FC<{
  productData:productData [];
}> = ({ productData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | typeof productData[0]>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.user_id; // Assuming user_id is stored in Redux
  console.log(productData);

  const handleOpenModal = (product: typeof productData[0]) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleOpenConfirmation = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 xl:mr-[15px]">
      {productData.map((product, index) => (
        <div
          key={index}
          className="shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={product.productImageUrl}
            alt={product.productName}
            className="w-full p-3 bg-white h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-txt-blue truncate">
              {product.productName}
            </h3>
            <p className="text-xl font-semibold text-txt-blue mt-2">
              INR.{product.productPrice}
            </p>
            <p className="text-gray-500 mt-1">Category: {product.productcategory}</p>

            {/* Only show "Contact Supplier" button if userId does not match sellerId */}
            {userId !== product.sellerId && (
              <button
                className="flex items-center justify-center text-white py-2 px-4 mt-4 bg-custom-blue rounded-md hover:bg-hover-blue transition-all duration-200 ease-in-out w-full"
                onClick={() => handleOpenModal(product)}
              >
                <AddIcCallIcon sx={{ fontSize: 18, marginRight: "8px" }} />
                Contact Supplier
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Modal for Contact Supplier */}
      {selectedProduct && (
        <ContactSupplierModal
          open={openModal}
          onClose={handleCloseModal}
          product={selectedProduct}
          onConfirm={handleOpenConfirmation}
        />
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmation} maxWidth="xs" fullWidth>
        <DialogTitle>Inquiry Sent</DialogTitle>
        <DialogContent>
          <p>Thank you! Your inquiry has been sent to the supplier. They will get in touch with you shortly.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductCards;
