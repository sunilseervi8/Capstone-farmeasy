import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, Checkbox, Button,
  TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, IconButton, Grid2
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import OrderDetailsStep from "./ContactSuplier-2"; // Import the next step component
import { getUserById } from "../../../Service/AccountService";
import {FormData} from '../../../Models/ProductsModel'


interface RequirementModalProps {
  open: boolean;
  handleClose: () => void;
  cropName: string;
  imageUrl: string;
  supplierId: string
}
const ContactSupplier: React.FC<RequirementModalProps> = ({
  open,
  handleClose,
  cropName,
  imageUrl,
  supplierId
}) => {
  const [formData, setFormData] = useState<FormData>({
    cropName: cropName || "", // Initialize with empty string
    unit: "",
    frequency: "",
    sendToOtherSuppliers: false,
    quantity: '',
    orderValue: '',
    selectedCurrency: "",
    supplierEmail: "",
    sellerName: ""
  });

  const [step, setStep] = useState<number>(1); // Step state
  // Sync cropName prop with formData
  useEffect(() => {
    const getData = async () => {
      const res = await getUserById(supplierId);
      console.log(res)
      setFormData({ ...formData, supplierEmail: res?.email, sellerName: res?.fullName });
    }
    getData();
    setFormData((prevFormData) => ({ ...prevFormData, cropName }));
  }, [cropName]);

  // Handle frequency change
  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, frequency: event.target.value });
  };
  console.log(formData.sellerName)
  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, sendToOtherSuppliers: event.target.checked });
  };

  // Handle unit selection change
  const handleUnitChange = (event: SelectChangeEvent) => {
    setFormData({ ...formData, unit: event.target.value });
  };

  // Handle next step
  const handleNextStep = () => {
    setStep(2); // Move to next step
  };

  // Custom handleClose method with warning confirmation
  const handleFormClose = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit? All unsaved data will be lost."
    );
    if (confirmExit) {
      handleClose();
    }
  };

  return (
    <>
      {step === 1 && (
        <Dialog open={open} onClose={handleFormClose} maxWidth="sm" fullWidth>
          <DialogTitle className="font-bold text-lg text-gray-800">
            Add Details of Your Requirement
            {/* Close Icon */}
            <IconButton
              aria-label="close"
              onClick={handleFormClose}
              sx={{ position: 'absolute', right: 8, top: 8, color: 'gray' }} >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Progress Bar */}
          <Grid2 className="px-6 mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-orange-400 h-1 rounded-full w-1/2"></div>
            </div>
          </Grid2>

          <DialogContent dividers className="px-6 py-4">
            {/* Display Image */}
            <div className="mb-4 flex justify-center">
              <img src={imageUrl} alt={cropName} className="rounded-lg w-3/4 h-40 object-cover" />
            </div>

            {/* Requirement Details */}
            <div className="mb-4">
              <p className="font-semibold text-gray-700 mb-1">Requirement Details</p>
              <TextField disabled value={cropName} fullWidth className="mb-2" />
              <div className="bg-yellow-50 p-2 rounded-md border border-blue-900 text-gray-700">
                Hi, I am interested in {cropName}.
              </div>
            </div>

            {/* Unit Selection Dropdown */}
            <div className="mb-4">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="unit-label" shrink={!!formData.unit}>
                  Select Unit
                </InputLabel>
                <Select
                  labelId="unit-label"
                  id="unit"
                  value={formData.unit}
                  onChange={handleUnitChange}
                  label="Select Unit" >
                  <MenuItem value="Kilograms">Kilograms</MenuItem>
                  <MenuItem value="Grams">Grams</MenuItem>
                  <MenuItem value="Lakh Tonnes">Lakh Tonnes</MenuItem>
                  <MenuItem value="Pieces">Pieces</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Requirement Frequency */}
            <div className="mb-4">
              <p className="font-semibold text-gray-700 mb-2">Requirement Frequency</p>
              <RadioGroup row value={formData.frequency} onChange={handleFrequencyChange}>
                <FormControlLabel
                  value="One-Time"
                  control={<Radio sx={{ color: "#FFA500" }} />}
                  label="One-Time" />
                <FormControlLabel value="Recurring" control={<Radio />} label="Recurring" />
              </RadioGroup>
            </div>

            {/* Checkbox */}
            <div className="mb-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.sendToOtherSuppliers}
                    onChange={handleCheckboxChange}
                    sx={{ color: "#1D4ED8" }} />
                }
                label="Would you like to send this inquiry to other suppliers?" />
            </div>
          </DialogContent>

          {/* Modal Actions */}
          <DialogActions className="px-6 pb-4">
            <Button
              variant="contained"
              onClick={handleNextStep}
              className="bg-custom-blue hover:bg-hover-blue text-white"  >
              Continue →
            </Button>
            <Button
              variant="outlined"
              onClick={handleFormClose}
              className="text-gray-700" >
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Render the next step */}
      {step === 2 && (
        <OrderDetailsStep
          open={open}
          handleClose={handleFormClose}
          handlePrevious={() => setStep(1)}
          formData={formData} // Pass form data to Step 2
          setFormData={setFormData} // Allow Step 2 to modify form data
        />
      )}
    </>
  );
};

export default ContactSupplier;
