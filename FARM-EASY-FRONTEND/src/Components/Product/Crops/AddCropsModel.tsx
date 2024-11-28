import React, { useState } from 'react';
import { Dialog, Backdrop } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Use correct import for Grid2
import AddProductForm from './AddCrops'; // Import the form component
import { FaPlus } from "react-icons/fa";


const CropModal: React.FC = () => {
  const [open, setOpen] = useState(false); // Modal state
  // Open/Close modal handlers
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Button to open the modal */}
      <Grid2>
        <div onClick={handleClickOpen} >
          <div className="fixed bottom-8 right-8 z-30">
            <button className="bg-[#000d6b] text-xl text-white px-3 py-3 rounded-full shadow-lg hover:bg-[#000a56] transition-all flex items-center justify-center">
            <FaPlus />
            </button> 
          </div>
        </div>
      </Grid2>

      {/* Modal with backdrop blur */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: 'blur(5px)' }, // Apply blur effect
        }}
      >
        {/* Pass handleClose to AddProductForm to close the modal after form submission */}
        <AddProductForm handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default CropModal;
