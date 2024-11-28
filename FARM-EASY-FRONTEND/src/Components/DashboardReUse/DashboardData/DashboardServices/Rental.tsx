import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store'; // Ensure this is the correct path
import axios from 'axios';
import AddRentalModel from '../../../Product/Rentals/AddRentalsModel';
interface Rental {
  rentalId: number;
  rentalTitle: string;
  rentalDescription: string;
  rentalPrice: number;
  rentalLocation: string;
  rentalNumberPlate: string;
  rentalImage: string;
}

const RentalTable: React.FC = () => {

  
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // States for handling dialog and editing
  const [open, setOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!isAuthenticated) throw new Error("User is not authenticated.");

        const response = user?.role === 'buyer'
          ? await axios.get(`https://localhost:8006/api/Rental/user/${user?.user_id}`)
          : await axios.get('https://localhost:8006/api/Rental');

        setRentals(response.data);
      } catch (err) {
        setError('Failed to fetch rentals');
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [user, isAuthenticated]);

  const handleEdit = (rental: Rental) => {
    setSelectedRental(rental);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (selectedRental) {
      try {
        await axios.put(`https://localhost:8006/api/Rental/${selectedRental.rentalId}`, selectedRental);
        setRentals((prevRentals) =>
          prevRentals.map((rental) =>
            rental.rentalId === selectedRental.rentalId ? selectedRental : rental
          )
        );
        setOpen(false);
      } catch (err) {
        setError('Failed to update rental');
      }
    }
  };

  const handleDelete = async (rentalId: number) => {
    try {
      await axios.delete(`https://localhost:8006/api/Rental/${rentalId}`);
      setRentals((prevRentals) => prevRentals.filter((rental) => rental.rentalId !== rentalId));
    } catch (err) {
      setError('Failed to delete rental');
    }
  };

  

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedRental(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedRental) {
      setSelectedRental({ ...selectedRental, [e.target.name]: e.target.value });
    }
  };

  if (loading) {
    return <Typography>Loading rentals...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="rental table">
        <TableHead sx={{ backgroundColor: '#000d6b' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Rental Title</TableCell>
            <TableCell sx={{ color: 'white' }}>Description</TableCell>
            <TableCell sx={{ color: 'white' }}>Price</TableCell>
            <TableCell sx={{ color: 'white' }}>Location</TableCell>
            <TableCell sx={{ color: 'white' }}>Number Plate</TableCell>
            <TableCell sx={{ color: 'white' }}>Image</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentals.map((rental) => (
            <TableRow key={rental.rentalId}>
              <TableCell>{rental.rentalTitle}</TableCell>
              <TableCell>{rental.rentalDescription}</TableCell>
              <TableCell>{rental.rentalPrice}</TableCell>
              <TableCell>{rental.rentalLocation}</TableCell>
              <TableCell>{rental.rentalNumberPlate}</TableCell>
              <TableCell>
                <img src={rental.rentalImage} alt={rental.rentalTitle} style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(rental)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(rental.rentalId)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
         
      >
        <AddRentalModel/>
 
      </Button>

      {/* Edit Rental Dialog */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Edit Rental</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="rentalTitle"
            value={selectedRental?.rentalTitle || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="rentalDescription"
            value={selectedRental?.rentalDescription || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="rentalPrice"
            type="number"
            value={selectedRental?.rentalPrice || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Location"
            name="rentalLocation"
            value={selectedRental?.rentalLocation || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Number Plate"
            name="rentalNumberPlate"
            value={selectedRental?.rentalNumberPlate || ''}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default RentalTable;
