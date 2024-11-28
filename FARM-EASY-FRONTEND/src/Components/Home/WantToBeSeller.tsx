import React, { useState } from 'react';
import { Button, Typography, Box, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { requestSellerRole } from '../../Service/AccountService';
import { updateUserSellerStatus } from '../../Redux/Slicer/AuthSlice';

const BecomeSellerRequest: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();

  // Fetch user details from Redux store
  const userId = useSelector((state: RootState) => state.auth.user?.user_id);
  const isSeller = useSelector((state: RootState) => state.auth.user?.isSeller);
  const roles = useSelector((state: RootState) => state.auth.user?.role); // Assuming role is an array

  const handleSellerRequest = async () => {
    if (!userId) {
      console.error("User ID not found in Redux store");
      return;
    }

    try {
      // If user is not a seller and isSeller is not yet set to "false", send the request
      if (!roles?.includes('seller') && isSeller !== "false") {
        await requestSellerRole(userId); // Send request to backend with userId
        dispatch(updateUserSellerStatus("false")); // Update isSeller to "false" in Redux
        setOpenSnackbar(true);
      } else if (isSeller === "false") {
        // If the request has already been sent (isSeller is "false"), just show the snackbar message
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error requesting seller role:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        px: 2,
      }}
    >
      {!roles?.includes('seller') && isSeller == "true" ? (
        <>
          <Typography variant="h4" gutterBottom>
            Want to become a seller?
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3, maxWidth: 600 }}>
            Click the button below to request seller access. An admin will review your request.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSellerRequest}
            sx={{ backgroundColor: '#000d6b', color: '#ffffff', py: 1.5, px: 4 }}
          >
            Request to be a Seller
          </Button>
        </>
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          Your request has been sent. Please wait for admin approval.
        </Typography>
      )}

      {/* Snackbar for confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={
          isSeller === "false"
            ? "Your request to become a seller is pending admin approval!"
            : "Your request to become a seller has been sent!"
        }
      />
    </Box>
  );
};

export default BecomeSellerRequest;
