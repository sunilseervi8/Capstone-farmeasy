import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    FormControl,
    Box,
    Typography,
    IconButton,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addRental } from '../../../Service/RentalService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import toast from 'react-hot-toast';

// regex for validattion of number plate
const indianNumberPlateRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{1,4}$/;

// validation for the Add Rentals form using YUP
const validationSchema = Yup.object({
    rentalTitle: Yup.string().required('Rental name is required'),
    UserId: Yup.string(),
    rentalDescription: Yup.string().required('Description is required'),
    rentalLocation: Yup.string().required('Location is required'),
    rentalNumberPlate: Yup.string().matches(indianNumberPlateRegex, 'Invalid Indian number plate format (e.g., MH12 AB1234)'),
    rentalPrice: Yup.number().required('Price is required').positive('Price must be positive'),
    image: Yup.mixed().required('Image is required')
});

interface RentalFormProps {
    handleClose: () => void; // Function to close modal
}

const RentalForm: React.FC<RentalFormProps> = ({ handleClose }) => {
    // Set default image initially
    const [imageSrc, setImageSrc] = useState<string | null>('../../../public/Images/upload.webp');

    // to get the current userId
    const {  user } = useSelector((state: RootState) => state.auth);
    var userId = user?.user_id;

    const formik = useFormik({
        initialValues: {
            rentalTitle: '',
            UserId: userId,
            rentalDescription: '',
            rentalPrice: '',
            rentalLocation: '',
            rentalNumberPlate: '',
            image: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await addRental(values);// data posted to backend
                toast.success(`Rental added successfully`);
                formik.resetForm(); // Reset form on submit
                handleClose(); // Close modal after submission
            } catch (error) {
                toast.error(`Failed to add rental: ${error}`); // Log error if submission fails
            }
        }
    });

    // Handle image upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            const file = event.currentTarget.files[0];
            formik.setFieldValue('image', file); // Update the formik form state with the selected file as the value for the 'image' field
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);  // Once file reading is complete, set the resulting URL (as a string) to imageSrc
            };
            reader.readAsDataURL(file); // Start reading the file as a data URL to convert it for display purposes
        }
    };

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '20px' }}
        >
            {/* Close Button (Top-Left) */}
            <IconButton
                edge="start"
                onClick={handleClose}
                aria-label="close"
                sx={{ position: 'absolute', top: '10px', left: '10px' }}
            >
                <CloseIcon />
            </IconButton>

            {/* Form Title */}
            <Typography variant="h5" className="text-teal-600 text-center color-txt-blue">
                Add Rental Details
            </Typography>

            {/* Image Upload and Preview */}
            <FormControl>
                <img
                    src={imageSrc || '../../../public/Images/upload.webp'}
                    alt="Crop preview"
                    style={{ maxWidth: '100%', marginBottom: '20px', height: '200px' }}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {formik.touched.image && formik.errors.image && (
                    <Typography color="error">{formik.errors.image}</Typography>
                )}
            </FormControl>

            {/* Rental Name Field */}
            <TextField
                fullWidth
                id="rentalTitle"
                name="rentalTitle"
                label="Title"
                value={formik.values.rentalTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalTitle && Boolean(formik.errors.rentalTitle)}
                helperText={formik.touched.rentalTitle && formik.errors.rentalTitle}
                className="text-teal-600"
            />
            
            {/* Rental description Field */}
            <TextField
                fullWidth
                id="rentalDescription"
                name="rentalDescription"
                label="Description"
                value={formik.values.rentalDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalDescription && Boolean(formik.errors.rentalDescription)}
                helperText={formik.touched.rentalDescription && formik.errors.rentalDescription}
                className="text-teal-600"
            />

            {/* Location Field */}
            <TextField
                fullWidth
                id="rentalLocation"
                name="rentalLocation"
                label="Location"
                value={formik.values.rentalLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalLocation && Boolean(formik.errors.rentalLocation)}
                helperText={formik.touched.rentalLocation && formik.errors.rentalLocation}
            />

            {/* Rental Number Plate Field */}
            <TextField
                fullWidth
                id="rentalNumberPlate"
                name="rentalNumberPlate"
                label="Number Plate"
                value={formik.values.rentalNumberPlate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalNumberPlate && Boolean(formik.errors.rentalNumberPlate)}
                helperText={formik.touched.rentalNumberPlate && formik.errors.rentalNumberPlate}
                className="text-teal-600"
            />

            {/* Price Field */}
            <TextField
                fullWidth
                id="rentalPrice"
                name="rentalPrice"
                label="Price"
                type="number"
                value={formik.values.rentalPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalPrice && Boolean(formik.errors.rentalPrice)}
                helperText={formik.touched.rentalPrice && formik.errors.rentalPrice}
            />

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#000D6B', color: '#fff', mt: 2 }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default RentalForm;
